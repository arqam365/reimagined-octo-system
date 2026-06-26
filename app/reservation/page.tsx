'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { reservationsApi } from '@/lib/api'
import {
  CheckCircle,
  Users,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  AlertCircle,
  Loader2,
  UtensilsCrossed,
} from 'lucide-react'

type Step = 'form' | 'availability' | 'submitting' | 'success'
type BookingType = 'table' | 'catering'

const LUNCH_SLOTS  = ['12:00 PM', '1:00 PM', '2:00 PM']
const DINNER_SLOTS = ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
const UNAVAILABLE_SLOTS = ['1:00 PM', '8:00 PM']

const PACKAGE_LABELS: Record<string, string> = {
  basic: 'Basic Package',
  premium: 'Premium Package',
  custom: 'Custom Package',
}

const inputClass =
  'w-full px-4 py-3.5 border border-[#0A0806]/12 bg-white text-[#0A0806] placeholder-[#0A0806]/35 focus:outline-none focus:ring-2 focus:ring-[#CC2229]/20 focus:border-[#CC2229]/40 transition-all text-sm font-body'

const labelClass =
  'block font-ui text-[10px] font-semibold uppercase tracking-[0.3em] text-[#0A0806]/60 mb-1.5'

function to24h(slot: string): string {
  const [time, meridiem] = slot.split(' ')
  const [h, m] = time.split(':').map(Number)
  const hour = meridiem === 'PM' && h !== 12 ? h + 12 : meridiem === 'AM' && h === 12 ? 0 : h
  return `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const VISIBLE_STEPS: Step[] = ['form', 'availability', 'success']
const stepLabels: Partial<Record<Step, string>> = {
  form: 'Details',
  availability: 'Review',
  success: 'Confirmed',
}

export default function Reservation() {
  const [step, setStep]         = useState<Step>('form')
  const [bookingType, setBookingType] = useState<BookingType>('table')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors]     = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')
  const [refNum, setRefNum]     = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: '',
    time: '',
    eventLocation: '',
    cateringPackage: 'basic',
    request: '',
  })

  const formatDate = (d: string) =>
    d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }) : ''

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = 'Full name is required.'
    if (!formData.phone.trim()) e.phone = 'Phone number is required.'
    if (!formData.date) e.date = 'Please select a date.'
    if (bookingType === 'table' && !formData.time) e.time = 'Please choose a time slot.'
    if (bookingType === 'catering' && !formData.eventLocation.trim())
      e.eventLocation = 'Event location is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setTimeout(() => { setIsLoading(false); setStep('availability') }, 1200)
  }

  const handleConfirm = async () => {
    setSubmitError('')
    setStep('submitting')
    try {
      const notes = [
        formData.request,
        bookingType === 'catering' ? `Location: ${formData.eventLocation}` : null,
        bookingType === 'catering' ? `Package: ${PACKAGE_LABELS[formData.cateringPackage]}` : null,
      ].filter(Boolean).join('\n') || undefined

      const r = await reservationsApi.create({
        outletSlug: process.env.NEXT_PUBLIC_OUTLET_SLUG ?? 'mazencito-jeddah',
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        date: formData.date,
        time: bookingType === 'table' ? to24h(formData.time) : '12:00',
        party: parseInt(formData.guests),
        type: bookingType === 'catering' ? 'CATERING' : 'TABLE',
        notes,
      })
      setRefNum(r.refNum)
      setStep('success')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setSubmitError(msg)
      setStep('availability')
    }
  }

  const handleReset = () => {
    setStep('form')
    setBookingType('table')
    setFormData({ name: '', phone: '', email: '', guests: '2', date: '', time: '',
      eventLocation: '', cateringPackage: 'basic', request: '' })
    setErrors({})
    setRefNum('')
    setSubmitError('')
  }

  const visibleIndex = VISIBLE_STEPS.indexOf(
    step === 'submitting' ? 'availability' : step
  )

  return (
    <>
      <Navigation />
      <main>

        {/* Dark Hero */}
        <section className="bg-[#0A0806] pt-36 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/25 mb-8">
              Mazencito Pizzeria
            </p>
            <h1
              className="elegant-text font-bold text-white leading-none mb-4"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
            >
              Make a<br />
              <span className="text-white/25">Booking</span>
            </h1>
            <p className="font-body text-white/40 text-lg max-w-sm">
              Reserve a table or arrange catering for your next event.
            </p>
          </div>
        </section>

        <div className="bg-[#FFFFFF] py-16 pb-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">

            {/* Booking type selector */}
            {step === 'form' && (
              <div className="grid grid-cols-2 gap-0 mb-8 border border-[#0A0806]/10">
                <button
                  type="button"
                  onClick={() => { setBookingType('table'); setErrors({}) }}
                  className={`flex flex-col items-center gap-2.5 p-6 transition-all border-r border-[#0A0806]/10 min-h-[44px] ${
                    bookingType === 'table' ? 'bg-[#0A0806] text-white' : 'bg-white text-[#0A0806]/60 hover:text-[#0A0806]'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span className="font-ui font-semibold text-xs tracking-[0.15em] uppercase">Table Reservation</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setBookingType('catering'); setErrors({}) }}
                  className={`flex flex-col items-center gap-2.5 p-6 transition-all min-h-[44px] ${
                    bookingType === 'catering' ? 'bg-[#0A0806] text-white' : 'bg-white text-[#0A0806]/60 hover:text-[#0A0806]'
                  }`}
                >
                  <UtensilsCrossed className="w-5 h-5" />
                  <span className="font-ui font-semibold text-xs tracking-[0.15em] uppercase">Catering Service</span>
                </button>
              </div>
            )}

            {/* Step indicator */}
            {step !== 'submitting' && (
              <div className="flex items-center justify-center gap-2 mb-10">
                {VISIBLE_STEPS.map((s, i) => {
                  const isDone = visibleIndex > i
                  const isActive = visibleIndex === i
                  return (
                    <React.Fragment key={s}>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className={`w-9 h-9 flex items-center justify-center text-xs font-bold transition-all border ${
                          isDone
                            ? 'bg-[#CC2229] border-[#CC2229] text-white'
                            : isActive
                            ? 'bg-white border-[#CC2229] text-[#CC2229]'
                            : 'bg-white border-[#0A0806]/15 text-[#0A0806]/40'
                        }`}>
                          {isDone ? <CheckCircle className="w-4 h-4" /> : i + 1}
                        </div>
                        <span className="font-ui text-[10px] text-[#0A0806]/50 hidden sm:block uppercase tracking-wide">
                          {stepLabels[s]}
                        </span>
                      </div>
                      {i < VISIBLE_STEPS.length - 1 && (
                        <div className={`h-0.5 w-12 mb-5 transition-all ${visibleIndex > i ? 'bg-[#CC2229]' : 'bg-[#0A0806]/12'}`} />
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            )}

            {/* ── STEP 1: Form ── */}
            {step === 'form' && (
              <form onSubmit={handleCheckAvailability} noValidate>
                <div className="bg-white border border-[#0A0806]/10 p-6 md:p-8 space-y-5">

                  <p className="font-ui text-xs font-bold uppercase tracking-widest text-[#0A0806]/40 pb-3 border-b border-[#0A0806]/8">
                    {bookingType === 'table' ? 'Table Reservation' : 'Catering Service'} &mdash; Contact Details
                  </p>

                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder="e.g. Ahmed Al-Rashidi"
                      className={`${inputClass} ${errors.name ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input
                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="+966 55 000 0000"
                        className={`${inputClass} ${errors.phone ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Email (Optional)</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                    </div>
                  </div>

                  <p className="font-ui text-xs font-bold uppercase tracking-widest text-[#0A0806]/40 pb-3 border-b border-[#0A0806]/8 pt-2">
                    {bookingType === 'table' ? 'Booking Details' : 'Event Details'}
                  </p>

                  {/* TABLE fields */}
                  {bookingType === 'table' && (
                    <>
                      <div>
                        <label className={labelClass}>Number of Guests *</label>
                        <select name="guests" value={formData.guests} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Reservation Date *</label>
                        <input
                          type="date" name="date" value={formData.date} onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`${inputClass} ${errors.date ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                        />
                        {errors.date && <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui"><AlertCircle className="w-3 h-3" /> {errors.date}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Time Slot *</label>
                        {errors.time && <p className="mb-2 text-xs text-red-500 flex items-center gap-1 font-ui"><AlertCircle className="w-3 h-3" /> {errors.time}</p>}
                        <div className="space-y-4">
                          {[{ label: 'Lunch', slots: LUNCH_SLOTS }, { label: 'Dinner', slots: DINNER_SLOTS }].map(({ label, slots }) => (
                            <div key={label}>
                              <p className="font-ui text-xs font-semibold text-[#0A0806]/50 uppercase tracking-widest mb-2">{label}</p>
                              <div className="flex flex-wrap gap-2">
                                {slots.map(slot => {
                                  const unavailable = UNAVAILABLE_SLOTS.includes(slot)
                                  return (
                                    <button
                                      key={slot} type="button" disabled={unavailable}
                                      onClick={() => { if (!unavailable) { setFormData(p => ({ ...p, time: slot })); setErrors(p => ({ ...p, time: '' })) } }}
                                      className={`px-4 py-2.5 font-ui text-sm font-medium border transition-all min-h-[44px] ${
                                        unavailable
                                          ? 'border-[#0A0806]/8 text-[#0A0806]/30 bg-[#FFFFFF] line-through cursor-not-allowed'
                                          : formData.time === slot
                                          ? 'border-[#CC2229] bg-[#CC2229] text-white'
                                          : 'border-[#0A0806]/12 bg-white hover:border-[#CC2229]/40 text-[#0A0806]'
                                      }`}
                                    >
                                      {slot}
                                      {unavailable && <span className="ml-1.5 text-[10px] text-[#0A0806]/30">Full</span>}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* CATERING fields */}
                  {bookingType === 'catering' && (
                    <>
                      <div>
                        <label className={labelClass}>Event Date *</label>
                        <input
                          type="date" name="date" value={formData.date} onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`${inputClass} ${errors.date ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                        />
                        {errors.date && <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui"><AlertCircle className="w-3 h-3" /> {errors.date}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Event Location *</label>
                        <input
                          type="text" name="eventLocation" value={formData.eventLocation} onChange={handleChange}
                          placeholder="e.g. Hilton Hotel Jeddah, Corniche Hall..."
                          className={`${inputClass} ${errors.eventLocation ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                        />
                        {errors.eventLocation && <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui"><AlertCircle className="w-3 h-3" /> {errors.eventLocation}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Number of Guests *</label>
                        <select name="guests" value={formData.guests} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
                          {[10, 20, 30, 50, 75, 100, 150, 200, 300].map(n => (
                            <option key={n} value={n}>{n} Guests</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Catering Package *</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { key: 'basic',   label: 'Basic',   price: '50 SAR/person',   desc: 'Appetizers, mains & soft drinks' },
                            { key: 'premium', label: 'Premium', price: '100 SAR/person',  desc: 'Full Italian buffet & beverages' },
                            { key: 'custom',  label: 'Custom',  price: 'Quote on request', desc: 'Fully tailored menu for your event' },
                          ].map(pkg => (
                            <button
                              key={pkg.key} type="button"
                              onClick={() => setFormData(p => ({ ...p, cateringPackage: pkg.key }))}
                              className={`p-3 border-2 text-left transition-all min-h-[44px] ${
                                formData.cateringPackage === pkg.key
                                  ? 'border-[#CC2229] bg-[#CC2229]/5'
                                  : 'border-[#0A0806]/10 bg-white hover:border-[#CC2229]/30'
                              }`}
                            >
                              <p className={`font-ui text-sm font-bold mb-0.5 ${formData.cateringPackage === pkg.key ? 'text-[#CC2229]' : 'text-[#0A0806]'}`}>{pkg.label}</p>
                              <p className="font-ui text-[11px] font-semibold text-[#CC2229]">{pkg.price}</p>
                              <p className="font-ui text-[11px] text-[#0A0806]/50 mt-1 leading-tight">{pkg.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className={labelClass}>Special Request (Optional)</label>
                    <textarea
                      name="request" value={formData.request} onChange={handleChange}
                      placeholder="Dietary restrictions, allergies, special occasions..."
                      rows={3} className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit" disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase hover:bg-[#B01E24] transition-all disabled:opacity-70 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    {isLoading
                      ? <><Loader2 className="w-5 h-5 animate-spin" /> Checking Availability...</>
                      : 'Check Availability'}
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 2: Review ── */}
            {step === 'availability' && (
              <div className="bg-white border border-[#0A0806]/10 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="elegant-text text-2xl font-bold text-[#0A0806]">Booking Summary</h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 font-ui text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                    <span className="w-2 h-2 bg-green-500 animate-pulse" />
                    Available
                  </span>
                </div>

                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="font-ui text-xs text-red-600">{submitError}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[#FFFFFF] border border-[#0A0806]/8">
                    <div className="w-8 h-8 bg-[#CC2229]/10 flex items-center justify-center flex-shrink-0">
                      {bookingType === 'table' ? <Clock className="w-4 h-4 text-[#CC2229]" /> : <UtensilsCrossed className="w-4 h-4 text-[#CC2229]" />}
                    </div>
                    <div>
                      <p className="font-ui text-xs text-[#0A0806]/50 uppercase tracking-wide">Booking Type</p>
                      <p className="font-ui font-semibold text-[#0A0806]">{bookingType === 'table' ? 'Table Reservation' : 'Catering Service'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#FFFFFF] border border-[#0A0806]/8">
                    <div className="w-8 h-8 bg-[#CC2229]/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-[#CC2229]" />
                    </div>
                    <div>
                      <p className="font-ui text-xs text-[#0A0806]/50 uppercase tracking-wide">Name</p>
                      <p className="font-ui font-semibold text-[#0A0806]">{formData.name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-[#FFFFFF] border border-[#0A0806]/8">
                      <div className="w-8 h-8 bg-[#CC2229]/10 flex items-center justify-center flex-shrink-0">
                        <CalendarDays className="w-4 h-4 text-[#CC2229]" />
                      </div>
                      <div>
                        <p className="font-ui text-xs text-[#0A0806]/50 uppercase tracking-wide">Date</p>
                        <p className="font-ui font-semibold text-[#0A0806] text-sm">{formatDate(formData.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#FFFFFF] border border-[#0A0806]/8">
                      <div className="w-8 h-8 bg-[#CC2229]/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-[#CC2229]" />
                      </div>
                      <div>
                        <p className="font-ui text-xs text-[#0A0806]/50 uppercase tracking-wide">Guests</p>
                        <p className="font-ui font-semibold text-[#0A0806]">{formData.guests}</p>
                      </div>
                    </div>
                  </div>
                  {bookingType === 'table' && (
                    <div className="flex items-center gap-3 p-3 bg-[#FFFFFF] border border-[#0A0806]/8">
                      <div className="w-8 h-8 bg-[#CC2229]/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-[#CC2229]" />
                      </div>
                      <div>
                        <p className="font-ui text-xs text-[#0A0806]/50 uppercase tracking-wide">Time Slot</p>
                        <p className="font-ui font-semibold text-[#0A0806]">{formData.time}</p>
                      </div>
                    </div>
                  )}
                  {bookingType === 'catering' && (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-[#FFFFFF] border border-[#0A0806]/8">
                        <div className="w-8 h-8 bg-[#CC2229]/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-[#CC2229]" />
                        </div>
                        <div>
                          <p className="font-ui text-xs text-[#0A0806]/50 uppercase tracking-wide">Event Location</p>
                          <p className="font-ui font-semibold text-[#0A0806]">{formData.eventLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#FFFFFF] border border-[#0A0806]/8">
                        <div className="w-8 h-8 bg-[#CC2229]/10 flex items-center justify-center flex-shrink-0">
                          <UtensilsCrossed className="w-4 h-4 text-[#CC2229]" />
                        </div>
                        <div>
                          <p className="font-ui text-xs text-[#0A0806]/50 uppercase tracking-wide">Package</p>
                          <p className="font-ui font-semibold text-[#0A0806]">{PACKAGE_LABELS[formData.cateringPackage]}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={handleConfirm}
                  className="mt-6 w-full px-6 py-4 bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase hover:bg-[#B01E24] transition-all min-h-[44px]"
                >
                  Confirm Reservation
                </button>
                <button
                  onClick={() => setStep('form')}
                  className="mt-3 w-full px-6 py-2.5 bg-transparent font-ui text-[#0A0806]/60 text-sm hover:text-[#0A0806] transition-colors min-h-[44px]"
                >
                  Edit Details
                </button>
              </div>
            )}

            {/* ── SUBMITTING ── */}
            {step === 'submitting' && (
              <div className="bg-white border border-[#0A0806]/10 p-12 text-center">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-[#0A0806]/8" />
                  <div className="absolute inset-0 border-4 border-[#CC2229] border-t-transparent animate-spin" />
                  <div className="absolute inset-2 bg-[#CC2229]/5 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-[#CC2229] animate-spin" />
                  </div>
                </div>
                <h2 className="elegant-text text-2xl font-bold text-[#0A0806] mb-3">Confirming your reservation…</h2>
                <p className="font-body text-[#0A0806]/60 text-sm max-w-xs mx-auto leading-relaxed">
                  Please wait while we secure your booking.
                </p>
              </div>
            )}

            {/* ── STEP 3: Success ── */}
            {step === 'success' && (
              <div className="bg-white border border-[#0A0806]/10 p-8 md:p-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-[#CC2229]/8 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-10 h-10 text-[#CC2229]" />
                  </div>
                  <span className="inline-block px-3 py-1 font-ui text-xs font-bold bg-[#CC2229]/8 text-[#CC2229] border border-[#CC2229]/25 mb-3">
                    Reservation Received
                  </span>
                  <h2 className="elegant-text text-3xl font-bold text-[#0A0806] mb-2">
                    Booking Confirmed
                  </h2>
                  <p className="font-body text-[#0A0806]/60 text-sm">
                    We&apos;ll confirm your reservation shortly. Our team will be in touch.
                  </p>
                </div>

                <div className="bg-[#FFFFFF] border border-[#0A0806]/8 divide-y divide-[#0A0806]/8 mb-6">
                  {[
                    { label: 'Reference', value: refNum },
                    { label: 'Booking Type', value: bookingType === 'table' ? 'Table Reservation' : 'Catering Service' },
                    { label: 'Name', value: formData.name },
                    { label: 'Phone', value: formData.phone },
                    { label: 'Date', value: formatDate(formData.date) },
                    ...(bookingType === 'table'
                      ? [{ label: 'Time', value: formData.time }]
                      : [{ label: 'Location', value: formData.eventLocation }]),
                    { label: 'Guests', value: `${formData.guests} ${Number(formData.guests) === 1 ? 'Guest' : 'Guests'}` },
                    { label: 'Status', value: 'Pending confirmation' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-4 py-3">
                      <span className="font-ui text-xs text-[#0A0806]/50 uppercase tracking-wide font-semibold">{label}</span>
                      <span className={`font-ui text-sm font-semibold text-[#0A0806] text-right max-w-[55%] ${
                        label === 'Reference' ? 'font-mono text-[#CC2229]' :
                        label === 'Status' ? 'text-amber-600' : ''
                      }`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {(formData.email || formData.phone) && (
                  <p className="font-ui text-xs text-[#0A0806]/50 text-center mb-6">
                    Keep your reference number: <span className="font-mono text-[#CC2229] font-bold">{refNum}</span>
                  </p>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleReset}
                    className="w-full px-6 py-3.5 bg-[#CC2229] text-white font-ui text-xs tracking-[0.25em] uppercase hover:bg-[#B01E24] transition-all min-h-[44px]"
                  >
                    New Reservation
                  </button>
                  <Link
                    href="/"
                    className="w-full px-6 py-3.5 bg-[#FFFFFF] border border-[#0A0806]/10 text-[#0A0806] font-ui text-xs tracking-[0.25em] uppercase hover:bg-[#E8E3DC] transition-all text-center min-h-[44px] flex items-center justify-center"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            )}

            {/* Info Bar */}
            {(step === 'form' || step === 'success') && (
              <div className="mt-8 grid sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 bg-white border border-[#0A0806]/10 p-4">
                  <MapPin className="w-5 h-5 text-[#CC2229] flex-shrink-0" />
                  <div>
                    <p className="font-ui text-xs font-bold text-[#0A0806]">Location</p>
                    <p className="font-ui text-xs text-[#0A0806]/60">Ash Shati, Atelier Lavie</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white border border-[#0A0806]/10 p-4">
                  <Clock className="w-5 h-5 text-[#CC2229] flex-shrink-0" />
                  <div>
                    <p className="font-ui text-xs font-bold text-[#0A0806]">Hours</p>
                    <p className="font-ui text-xs text-[#0A0806]/60">Daily: 12:00 PM &ndash; 1:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white border border-[#0A0806]/10 p-4">
                  <Phone className="w-5 h-5 text-[#CC2229] flex-shrink-0" />
                  <div>
                    <p className="font-ui text-xs font-bold text-[#0A0806]">Call Us</p>
                    <a href="tel:+966555674383" className="font-ui text-xs text-[#CC2229] hover:text-[#B01E24] transition-colors">
                      +966 55 567 4383
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
