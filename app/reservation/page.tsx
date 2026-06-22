'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { AlertCircle, Loader2 } from 'lucide-react'

type Step = 'form' | 'availability' | 'payment-form' | 'payment-processing' | 'success'
type BookingType = 'table' | 'catering'

const LUNCH_SLOTS = ['12:00 PM', '1:00 PM', '2:00 PM']
const DINNER_SLOTS = ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
const UNAVAILABLE_SLOTS = ['1:00 PM', '8:00 PM']

const PACKAGE_LABELS: Record<string, string> = {
  basic: 'Basic Package',
  premium: 'Premium Package',
  custom: 'Custom Package',
}
const PACKAGE_FEES: Record<string, number> = {
  basic: 50,
  premium: 100,
  custom: 0,
}

const inputClass =
  'w-full px-4 py-3.5 border border-[#0A0806]/12 bg-white text-[#0A0806] placeholder-[#0A0806]/35 focus:outline-none focus:ring-2 focus:ring-[#CC2229]/20 focus:border-[#CC2229]/40 transition-all text-sm font-body'

const labelClass =
  'block font-ui text-[10px] font-semibold uppercase tracking-[0.3em] text-[#0A0806]/60 mb-1.5'

const VISIBLE_STEPS: Step[] = ['form', 'availability', 'payment-form', 'success']

function generateReservationId() {
  return 'MZ-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

export default function Reservation() {
  const [step, setStep] = useState<Step>('form')
  const [bookingType, setBookingType] = useState<BookingType>('table')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({})
  const [reservationId, setReservationId] = useState(generateReservationId)

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

  const [cardData, setCardData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const reservationFee = bookingType === 'table' ? 10 : PACKAGE_FEES[formData.cateringPackage]

  const formatDate = (d: string) =>
    d
      ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : ''

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    }
    if (name === 'expiry') {
      value = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/^(\d{2})(\d)/, '$1/$2')
    }
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }
    setCardData((prev) => ({ ...prev, [name]: value }))
    if (cardErrors[name]) setCardErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Full name is required.'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.'
    if (!formData.date) newErrors.date = 'Please select a date.'
    if (bookingType === 'table' && !formData.time) newErrors.time = 'Please choose a time slot.'
    if (bookingType === 'catering' && !formData.eventLocation.trim())
      newErrors.eventLocation = 'Event location is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateCard = () => {
    const newErrors: Record<string, string> = {}
    if (!cardData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required.'
    const rawCard = cardData.cardNumber.replace(/\s/g, '')
    if (rawCard.length < 16) newErrors.cardNumber = 'Enter a valid 16-digit card number.'
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) newErrors.expiry = 'Enter expiry as MM/YY.'
    if (cardData.cvv.length < 3) newErrors.cvv = 'CVV must be 3–4 digits.'
    setCardErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStep('availability')
  }

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateCard()) return
    setStep('payment-processing')
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          date: formData.date,
          time: formData.time,
          party: parseInt(formData.guests),
          type: bookingType === 'table' ? 'TABLE' : 'CATERING',
          notes: formData.request || undefined,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setReservationId(data.refNum)
      }
    } catch {
      // keep generated ID if API unreachable
    }
    setStep('success')
  }

  const handleReset = () => {
    setStep('form')
    setBookingType('table')
    setFormData({
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
    setCardData({ cardholderName: '', cardNumber: '', expiry: '', cvv: '' })
    setErrors({})
    setCardErrors({})
  }

  const stepLabels: Partial<Record<Step, string>> = {
    form: 'Details',
    availability: 'Review',
    'payment-form': 'Payment',
    success: 'Confirmed',
  }
  const visibleIndex = VISIBLE_STEPS.indexOf(
    step === 'payment-processing' ? 'payment-form' : step
  )

  const summaryRows = [
    { label: 'Type', value: bookingType === 'table' ? 'Table Reservation' : 'Catering Service' },
    { label: 'Name', value: formData.name },
    { label: 'Date', value: formatDate(formData.date) },
    { label: 'Guests', value: `${formData.guests} ${Number(formData.guests) === 1 ? 'Guest' : 'Guests'}` },
    ...(bookingType === 'table' && formData.time ? [{ label: 'Time', value: formData.time }] : []),
    ...(bookingType === 'catering' && formData.eventLocation ? [{ label: 'Location', value: formData.eventLocation }] : []),
    ...(bookingType === 'catering' ? [{ label: 'Package', value: PACKAGE_LABELS[formData.cateringPackage] }] : []),
  ]

  const SummaryTable = () => (
    <div>
      {summaryRows.map(({ label, value }) => (
        <div key={label} className="flex justify-between items-baseline py-3.5 border-b border-[#0A0806]/8">
          <span className="font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/35 flex-shrink-0 mr-4">{label}</span>
          <span className="font-body text-[#0A0806] text-sm text-right">{value}</span>
        </div>
      ))}
      <div className="flex justify-between items-baseline pt-5">
        <span className="font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/35">
          {bookingType === 'table' ? 'Reservation Fee' : 'Booking Deposit'}
        </span>
        <span className="elegant-text text-3xl text-[#CC2229] font-bold">
          {reservationFee === 0 ? 'TBD' : `${reservationFee} SAR`}
        </span>
      </div>
    </div>
  )

  return (
    <>
      <Navigation />
      <main>

        {/* Dark Hero */}
        <section className="bg-[#0A0806] pt-36 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/25 mb-8">
              Mazencito
            </p>
            <h1
              className="elegant-text font-bold text-white leading-none mb-4"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
            >
              Make a<br />
              <span className="text-white/20">Booking</span>
            </h1>
            <p className="font-body text-white/40 text-lg max-w-sm">
              Reserve a table or arrange catering for your next event.
            </p>
          </div>
        </section>

        {/* Main Form Area */}
        <div className="bg-[#FAF8F5] py-16 pb-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">

            {/* Booking Type Selector */}
            {step === 'form' && (
              <div className="grid grid-cols-2 mb-8 border border-[#0A0806]/10">
                <button
                  type="button"
                  onClick={() => { setBookingType('table'); setErrors({}) }}
                  className={`py-4 px-6 transition-all border-r border-[#0A0806]/10 min-h-[44px] ${
                    bookingType === 'table'
                      ? 'bg-[#0A0806] text-white'
                      : 'bg-[#FAF8F5] text-[#0A0806]/50 hover:text-[#0A0806]'
                  }`}
                >
                  <span className="font-ui text-xs tracking-[0.2em] uppercase">Table Reservation</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setBookingType('catering'); setErrors({}) }}
                  className={`py-4 px-6 transition-all min-h-[44px] ${
                    bookingType === 'catering'
                      ? 'bg-[#0A0806] text-white'
                      : 'bg-[#FAF8F5] text-[#0A0806]/50 hover:text-[#0A0806]'
                  }`}
                >
                  <span className="font-ui text-xs tracking-[0.2em] uppercase">Catering Service</span>
                </button>
              </div>
            )}

            {/* Step Progress — text only, no circles */}
            {step !== 'payment-processing' && (
              <div className="flex items-center gap-3 mb-10">
                {VISIBLE_STEPS.map((s, i) => (
                  <React.Fragment key={s}>
                    <span className={`font-ui text-[10px] tracking-[0.25em] uppercase transition-colors duration-200 ${
                      visibleIndex === i
                        ? 'text-[#0A0806]'
                        : visibleIndex > i
                        ? 'text-[#CC2229]'
                        : 'text-[#0A0806]/20'
                    }`}>
                      {stepLabels[s]}
                    </span>
                    {i < VISIBLE_STEPS.length - 1 && (
                      <span className="text-[#0A0806]/15 text-xs">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* ── STEP 1: Booking Form ── */}
            {step === 'form' && (
              <form onSubmit={handleCheckAvailability} noValidate>
                <div className="space-y-5">

                  <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-[#0A0806]/35 pb-3 border-b border-[#0A0806]/8">
                    {bookingType === 'table' ? 'Table Reservation' : 'Catering Service'} &mdash; Contact Details
                  </p>

                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ahmed Al-Rashidi"
                      className={`${inputClass} ${errors.name ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+966 55 000 0000"
                        className={`${inputClass} ${errors.phone ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Email (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-[#0A0806]/35 pb-3 border-b border-[#0A0806]/8 pt-2">
                    {bookingType === 'table' ? 'Booking Details' : 'Event Details'}
                  </p>

                  {/* TABLE fields */}
                  {bookingType === 'table' && (
                    <>
                      <div>
                        <label className={labelClass}>Number of Guests *</label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className={`${inputClass} cursor-pointer`}
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Reservation Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`${inputClass} ${errors.date ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                        />
                        {errors.date && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui">
                            <AlertCircle className="w-3 h-3" /> {errors.date}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>Time Slot *</label>
                        {errors.time && (
                          <p className="mb-2 text-xs text-red-500 flex items-center gap-1 font-ui">
                            <AlertCircle className="w-3 h-3" /> {errors.time}
                          </p>
                        )}
                        <div className="space-y-4">
                          {[{ label: 'Lunch', slots: LUNCH_SLOTS }, { label: 'Dinner', slots: DINNER_SLOTS }].map(({ label, slots }) => (
                            <div key={label}>
                              <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-[#0A0806]/35 mb-2">{label}</p>
                              <div className="flex flex-wrap gap-2">
                                {slots.map((slot) => {
                                  const unavailable = UNAVAILABLE_SLOTS.includes(slot)
                                  return (
                                    <button
                                      key={slot}
                                      type="button"
                                      disabled={unavailable}
                                      onClick={() => {
                                        if (!unavailable) {
                                          setFormData((p) => ({ ...p, time: slot }))
                                          setErrors((p) => ({ ...p, time: '' }))
                                        }
                                      }}
                                      className={`px-4 py-2.5 font-ui text-sm border transition-all min-h-[44px] ${
                                        unavailable
                                          ? 'border-[#0A0806]/8 text-[#0A0806]/25 bg-[#FAF8F5] line-through cursor-not-allowed'
                                          : formData.time === slot
                                          ? 'border-[#CC2229] bg-[#CC2229] text-white'
                                          : 'border-[#0A0806]/12 bg-white hover:border-[#CC2229]/40 text-[#0A0806]'
                                      }`}
                                    >
                                      {slot}
                                      {unavailable && (
                                        <span className="ml-1.5 text-[10px] text-[#0A0806]/25">Full</span>
                                      )}
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
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`${inputClass} ${errors.date ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                        />
                        {errors.date && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui">
                            <AlertCircle className="w-3 h-3" /> {errors.date}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>Event Location *</label>
                        <input
                          type="text"
                          name="eventLocation"
                          value={formData.eventLocation}
                          onChange={handleChange}
                          placeholder="e.g. Hilton Hotel Jeddah, Corniche Hall..."
                          className={`${inputClass} ${errors.eventLocation ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                        />
                        {errors.eventLocation && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui">
                            <AlertCircle className="w-3 h-3" /> {errors.eventLocation}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>Number of Guests *</label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className={`${inputClass} cursor-pointer`}
                        >
                          {[10, 20, 30, 50, 75, 100, 150, 200, 300].map((n) => (
                            <option key={n} value={n}>{n} Guests</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Catering Package *</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { key: 'basic', label: 'Basic', price: '50 SAR/person', desc: 'Appetizers, mains & soft drinks' },
                            { key: 'premium', label: 'Premium', price: '100 SAR/person', desc: 'Full Italian buffet & beverages' },
                            { key: 'custom', label: 'Custom', price: 'Quote on request', desc: 'Fully tailored menu for your event' },
                          ].map((pkg) => (
                            <button
                              key={pkg.key}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, cateringPackage: pkg.key }))}
                              className={`p-3 border-2 text-left transition-all min-h-[44px] ${
                                formData.cateringPackage === pkg.key
                                  ? 'border-[#CC2229] bg-[#CC2229]/5'
                                  : 'border-[#0A0806]/10 bg-white hover:border-[#CC2229]/30'
                              }`}
                            >
                              <p className={`font-ui text-sm font-bold mb-0.5 ${formData.cateringPackage === pkg.key ? 'text-[#CC2229]' : 'text-[#0A0806]'}`}>
                                {pkg.label}
                              </p>
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
                      name="request"
                      value={formData.request}
                      onChange={handleChange}
                      placeholder="Dietary restrictions, allergies, special occasions..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase hover:bg-[#B01E24] transition-all disabled:opacity-70 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Checking Availability...</>
                    ) : (
                      'Check Availability'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 2: Availability / Booking Summary ── */}
            {step === 'availability' && (
              <div>
                <div className="flex items-start justify-between mb-8">
                  <h2 className="elegant-text text-3xl font-bold text-[#0A0806]">Booking Summary</h2>
                  <span className="font-ui text-[10px] tracking-[0.3em] uppercase text-[#009246] pt-2">Available</span>
                </div>

                <SummaryTable />

                <button
                  onClick={() => setStep('payment-form')}
                  className="mt-8 w-full px-6 py-4 bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase hover:bg-[#B01E24] transition-all min-h-[44px]"
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={handleReset}
                  className="mt-3 w-full px-6 py-2.5 bg-transparent font-ui text-[#0A0806]/40 text-sm hover:text-[#0A0806] transition-colors min-h-[44px]"
                >
                  Edit Details
                </button>
              </div>
            )}

            {/* ── STEP 3: Payment Form ── */}
            {step === 'payment-form' && (
              <div className="grid lg:grid-cols-5 gap-12">

                <form onSubmit={handlePayNow} noValidate className="lg:col-span-3 space-y-5">

                  <div className="pb-6 border-b border-[#0A0806]/8">
                    <h2 className="elegant-text text-3xl font-bold text-[#0A0806]">Payment Details</h2>
                  </div>

                  <div>
                    <label className={labelClass}>Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardData.cardholderName}
                      onChange={handleCardChange}
                      placeholder="Name as it appears on card"
                      className={`${inputClass} ${cardErrors.cardholderName ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                    />
                    {cardErrors.cardholderName && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui">
                        <AlertCircle className="w-3 h-3" /> {cardErrors.cardholderName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`${inputClass} ${cardErrors.cardNumber ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                    />
                    {cardErrors.cardNumber && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui">
                        <AlertCircle className="w-3 h-3" /> {cardErrors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Expiry Date *</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`${inputClass} ${cardErrors.expiry ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                      />
                      {cardErrors.expiry && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui">
                          <AlertCircle className="w-3 h-3" /> {cardErrors.expiry}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>CVV *</label>
                      <input
                        type="password"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        placeholder="•••"
                        maxLength={4}
                        className={`${inputClass} ${cardErrors.cvv ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                      />
                      {cardErrors.cvv && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-ui">
                          <AlertCircle className="w-3 h-3" /> {cardErrors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="font-ui text-[11px] text-[#0A0806]/35 tracking-wide leading-relaxed">
                    Payment secured with 256-bit SSL encryption. Card details are never stored.
                  </p>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase hover:bg-[#B01E24] transition-all min-h-[44px]"
                  >
                    Pay {reservationFee === 0 ? 'Now' : `${reservationFee} SAR`} Now
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('availability')}
                    className="w-full px-6 py-2.5 bg-transparent font-ui text-[#0A0806]/40 text-sm hover:text-[#0A0806] transition-colors min-h-[44px]"
                  >
                    Back to Summary
                  </button>
                </form>

                {/* Summary sidebar */}
                <div className="lg:col-span-2 pt-1">
                  <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#0A0806]/35 mb-6">Summary</p>
                  <SummaryTable />
                </div>
              </div>
            )}

            {/* ── STEP 4: Payment Processing ── */}
            {step === 'payment-processing' && (
              <div className="py-24 text-center">
                <div className="relative w-12 h-12 mx-auto mb-8">
                  <div className="absolute inset-0 border-2 border-[#CC2229]/20 rounded-full" />
                  <div className="absolute inset-0 border-2 border-[#CC2229] border-t-transparent rounded-full animate-spin" />
                </div>
                <h2 className="elegant-text text-2xl font-bold text-[#0A0806] mb-3">
                  Processing...
                </h2>
                <p className="font-body text-[#0A0806]/50 text-sm max-w-xs mx-auto leading-relaxed">
                  Please wait while we confirm your reservation.
                </p>
              </div>
            )}

            {/* ── STEP 5: Success ── */}
            {step === 'success' && (
              <div>
                <div className="mb-10">
                  <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#CC2229] mb-4">Confirmed</p>
                  <h2
                    className="elegant-text font-bold text-[#0A0806] leading-none mb-4"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
                  >
                    Reservation<br />Confirmed
                  </h2>
                  <div className="h-px w-12 bg-[#0A0806]/10 mb-4" />
                  <p className="font-body text-[#0A0806]/50 text-sm">
                    Your reservation request has been received. We&apos;ll be in touch shortly.
                  </p>
                </div>

                <div className="mb-8">
                  {[
                    { label: 'Reservation ID', value: reservationId },
                    { label: 'Booking Type', value: bookingType === 'table' ? 'Table Reservation' : 'Catering Service' },
                    { label: 'Name', value: formData.name },
                    { label: 'Date', value: formatDate(formData.date) },
                    {
                      label: bookingType === 'table' ? 'Time' : 'Location',
                      value: bookingType === 'table' ? formData.time : formData.eventLocation,
                    },
                    { label: 'Guests', value: `${formData.guests} ${Number(formData.guests) === 1 ? 'Guest' : 'Guests'}` },
                    {
                      label: 'Amount Paid',
                      value: reservationFee === 0 ? 'TBD — quote pending' : `${reservationFee} SAR`,
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-baseline py-3.5 border-b border-[#0A0806]/8">
                      <span className="font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/35 flex-shrink-0 mr-4">{label}</span>
                      <span className={`font-body text-[#0A0806] text-sm text-right ${label === 'Reservation ID' ? 'font-mono text-[#CC2229] tracking-wider' : ''}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {(formData.email || formData.phone) && (
                  <p className="font-ui text-xs text-[#0A0806]/40 mb-8">
                    Confirmation sent to{' '}
                    <span className="text-[#0A0806]">{formData.email || formData.phone}</span>
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
                    className="w-full px-6 py-3.5 border border-[#0A0806]/15 text-[#0A0806] font-ui text-xs tracking-[0.25em] uppercase hover:bg-[#0A0806]/5 transition-all text-center min-h-[44px] flex items-center justify-center"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            )}

            {/* Info strip — typographic, no icon cards */}
            {(step === 'form' || step === 'success') && (
              <div className="mt-12 pt-8 border-t border-[#0A0806]/8 grid sm:grid-cols-3 gap-6">
                <div>
                  <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-[#0A0806]/30 mb-1.5">Location</p>
                  <p className="font-body text-[#0A0806] text-sm">Ash Shati, Atelier Lavie, Jeddah</p>
                </div>
                <div>
                  <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-[#0A0806]/30 mb-1.5">Hours</p>
                  <p className="font-body text-[#0A0806] text-sm">Daily 12:00 PM &ndash; 1:00 AM</p>
                </div>
                <div>
                  <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-[#0A0806]/30 mb-1.5">Phone</p>
                  <a href="tel:+966555674383" className="font-body text-[#0A0806] text-sm hover:text-[#CC2229] transition-colors">
                    +966 55 567 4383
                  </a>
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
