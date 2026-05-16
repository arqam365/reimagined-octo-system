'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
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
  ShieldCheck,
  CreditCard,
  Lock,
} from 'lucide-react'

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
  'w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm'
const labelClass = 'block text-xs font-bold uppercase tracking-wide text-foreground/60 mb-1.5'

const STEPS: Step[] = ['form', 'availability', 'payment-form', 'payment-processing', 'success']
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
  const [reservationId] = useState(generateReservationId)

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

  // ── Form handlers ──────────────────────────────────────────────────────────

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
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('availability')
    }, 1800)
  }

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateCard()) return
    setStep('payment-processing')
    setTimeout(() => {
      setStep('success')
    }, 2500)
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

  // ── Step indicator ──────────────────────────────────────────────────────────

  const stepLabels: Partial<Record<Step, string>> = {
    form: 'Details',
    availability: 'Review',
    'payment-form': 'Payment',
    success: 'Confirmed',
  }
  const visibleIndex = VISIBLE_STEPS.indexOf(
    step === 'payment-processing' ? 'payment-form' : step
  )

  // ── Mini booking summary (reused in payment form sidebar) ──────────────────

  const BookingSummaryCard = ({ compact = false }: { compact?: boolean }) => (
    <div className={`space-y-2 ${compact ? '' : 'space-y-3'}`}>
      <div className="flex items-center gap-2.5 p-2.5 bg-background rounded-lg border border-border">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          {bookingType === 'table'
            ? <Clock className="w-3.5 h-3.5 text-primary" />
            : <UtensilsCrossed className="w-3.5 h-3.5 text-primary" />}
        </div>
        <div>
          <p className="text-[10px] text-foreground/50 uppercase tracking-wide">Type</p>
          <p className="text-sm font-semibold text-foreground">
            {bookingType === 'table' ? 'Table Reservation' : 'Catering Service'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 p-2.5 bg-background rounded-lg border border-border">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Users className="w-3.5 h-3.5 text-primary" />
        </div>
        <div>
          <p className="text-[10px] text-foreground/50 uppercase tracking-wide">Name</p>
          <p className="text-sm font-semibold text-foreground">{formData.name}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 p-2.5 bg-background rounded-lg border border-border">
          <CalendarDays className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <div>
            <p className="text-[10px] text-foreground/50 uppercase tracking-wide">Date</p>
            <p className="text-xs font-semibold text-foreground leading-tight">{formatDate(formData.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2.5 bg-background rounded-lg border border-border">
          <Users className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <div>
            <p className="text-[10px] text-foreground/50 uppercase tracking-wide">Guests</p>
            <p className="text-xs font-semibold text-foreground">{formData.guests}</p>
          </div>
        </div>
      </div>
      {bookingType === 'table' && (
        <div className="flex items-center gap-2.5 p-2.5 bg-background rounded-lg border border-border">
          <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <div>
            <p className="text-[10px] text-foreground/50 uppercase tracking-wide">Time</p>
            <p className="text-sm font-semibold text-foreground">{formData.time}</p>
          </div>
        </div>
      )}
      {bookingType === 'catering' && (
        <>
          <div className="flex items-center gap-2.5 p-2.5 bg-background rounded-lg border border-border">
            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <div>
              <p className="text-[10px] text-foreground/50 uppercase tracking-wide">Location</p>
              <p className="text-sm font-semibold text-foreground">{formData.eventLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 bg-background rounded-lg border border-border">
            <UtensilsCrossed className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <div>
              <p className="text-[10px] text-foreground/50 uppercase tracking-wide">Package</p>
              <p className="text-sm font-semibold text-foreground">{PACKAGE_LABELS[formData.cateringPackage]}</p>
            </div>
          </div>
        </>
      )}
      <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-xl">
        <div>
          <p className="text-xs font-bold text-foreground">
            {bookingType === 'table' ? 'Reservation Fee' : 'Booking Deposit'}
          </p>
          <p className="text-[11px] text-foreground/50">
            {bookingType === 'table'
              ? 'Deducted from final bill'
              : reservationFee === 0
              ? 'Quote on request'
              : 'Per-person rate applies'}
          </p>
        </div>
        <span className="text-xl font-bold text-accent">
          {reservationFee === 0 ? 'TBD' : `${reservationFee} SAR`}
        </span>
      </div>
    </div>
  )

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-background min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="elegant-text text-4xl md:text-5xl font-bold text-primary mb-3">
              Make a Booking
            </h1>
            <p className="text-foreground/60 text-base">
              Reserve a table or arrange catering for your next event
            </p>
          </div>

          {/* Booking Type Selector */}
          {step === 'form' && (
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button
                type="button"
                onClick={() => { setBookingType('table'); setErrors({}) }}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all font-medium text-sm ${
                  bookingType === 'table'
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-border bg-card text-foreground/60 hover:border-primary/40'
                }`}
              >
                <Clock className="w-6 h-6" />
                <span>Table Reservation</span>
              </button>
              <button
                type="button"
                onClick={() => { setBookingType('catering'); setErrors({}) }}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all font-medium text-sm ${
                  bookingType === 'catering'
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-border bg-card text-foreground/60 hover:border-primary/40'
                }`}
              >
                <UtensilsCrossed className="w-6 h-6" />
                <span>Catering Service</span>
              </button>
            </div>
          )}

          {/* Step Indicator */}
          {step !== 'payment-processing' && (
            <div className="flex items-center justify-center gap-2 mb-10">
              {VISIBLE_STEPS.map((s, i) => {
                const isDone = visibleIndex > i
                const isActive = visibleIndex === i
                return (
                  <React.Fragment key={s}>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-secondary text-secondary-foreground'
                            : isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {isDone ? <CheckCircle className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className="text-[10px] text-foreground/50 hidden sm:block">
                        {stepLabels[s]}
                      </span>
                    </div>
                    {i < VISIBLE_STEPS.length - 1 && (
                      <div
                        className={`h-0.5 w-10 mb-4 transition-all ${
                          visibleIndex > i ? 'bg-secondary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          )}

          {/* ── STEP 1: Booking Form ────────────────────────────────────────── */}
          {step === 'form' && (
            <form onSubmit={handleCheckAvailability} noValidate>
              <div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8 space-y-5">

                <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 pb-1 border-b border-border">
                  {bookingType === 'table' ? 'Table Reservation' : 'Catering Service'} — Contact Details
                </p>

                {/* Name */}
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ahmed Al-Rashidi"
                    className={`${inputClass} ${errors.name ? 'border-destructive ring-1 ring-destructive' : ''}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+966 55 000 0000"
                      className={`${inputClass} ${errors.phone ? 'border-destructive ring-1 ring-destructive' : ''}`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
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

                <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 pb-1 border-b border-border pt-2">
                  {bookingType === 'table' ? 'Booking Details' : 'Event Details'}
                </p>

                {/* ── TABLE fields ── */}
                {bookingType === 'table' && (
                  <>
                    <div>
                      <label className={labelClass}>Number of Guests *</label>
                      <select name="guests" value={formData.guests} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
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
                        className={`${inputClass} ${errors.date ? 'border-destructive ring-1 ring-destructive' : ''}`}
                      />
                      {errors.date && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.date}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Time Slot *</label>
                      {errors.time && <p className="mb-2 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.time}</p>}
                      <div className="space-y-3">
                        {[{ label: 'Lunch', slots: LUNCH_SLOTS }, { label: 'Dinner', slots: DINNER_SLOTS }].map(({ label, slots }) => (
                          <div key={label}>
                            <p className="text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-2">{label}</p>
                            <div className="flex flex-wrap gap-2">
                              {slots.map((slot) => {
                                const unavailable = UNAVAILABLE_SLOTS.includes(slot)
                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    disabled={unavailable}
                                    onClick={() => { if (!unavailable) { setFormData((p) => ({ ...p, time: slot })); setErrors((p) => ({ ...p, time: '' })) } }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                      unavailable
                                        ? 'border-border text-foreground/30 bg-muted/50 line-through cursor-not-allowed'
                                        : formData.time === slot
                                        ? 'border-primary bg-primary text-primary-foreground shadow-md'
                                        : 'border-border bg-background hover:border-primary/60 text-foreground'
                                    }`}
                                  >
                                    {slot}
                                    {unavailable && <span className="ml-1.5 text-[10px] text-foreground/30">Full</span>}
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

                {/* ── CATERING fields ── */}
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
                        className={`${inputClass} ${errors.date ? 'border-destructive ring-1 ring-destructive' : ''}`}
                      />
                      {errors.date && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.date}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Event Location *</label>
                      <input
                        type="text"
                        name="eventLocation"
                        value={formData.eventLocation}
                        onChange={handleChange}
                        placeholder="e.g. Hilton Hotel Jeddah, Corniche Hall..."
                        className={`${inputClass} ${errors.eventLocation ? 'border-destructive ring-1 ring-destructive' : ''}`}
                      />
                      {errors.eventLocation && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.eventLocation}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Number of Guests *</label>
                      <select name="guests" value={formData.guests} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
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
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              formData.cateringPackage === pkg.key
                                ? 'border-primary bg-primary/5'
                                : 'border-border bg-background hover:border-primary/40'
                            }`}
                          >
                            <p className={`text-sm font-bold mb-0.5 ${formData.cateringPackage === pkg.key ? 'text-primary' : 'text-foreground'}`}>{pkg.label}</p>
                            <p className="text-[11px] font-semibold text-accent">{pkg.price}</p>
                            <p className="text-[11px] text-foreground/50 mt-1 leading-tight">{pkg.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Special Request */}
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
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Checking Availability...</>
                  ) : (
                    'Check Availability'
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2: Availability / Booking Summary ──────────────────────── */}
          {step === 'availability' && (
            <div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="elegant-text text-2xl font-bold text-primary">Booking Summary</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary/15 text-secondary border border-secondary/30">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Available
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {bookingType === 'table' ? <Clock className="w-4 h-4 text-primary" /> : <UtensilsCrossed className="w-4 h-4 text-primary" />}
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 uppercase tracking-wide">Booking Type</p>
                    <p className="font-semibold text-foreground">{bookingType === 'table' ? 'Table Reservation' : 'Catering Service'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 uppercase tracking-wide">Name</p>
                    <p className="font-semibold text-foreground">{formData.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CalendarDays className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase tracking-wide">Date</p>
                      <p className="font-semibold text-foreground text-sm">{formatDate(formData.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase tracking-wide">Guests</p>
                      <p className="font-semibold text-foreground">{formData.guests}</p>
                    </div>
                  </div>
                </div>
                {bookingType === 'table' && (
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase tracking-wide">Time Slot</p>
                      <p className="font-semibold text-foreground">{formData.time}</p>
                    </div>
                  </div>
                )}
                {bookingType === 'catering' && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wide">Event Location</p>
                        <p className="font-semibold text-foreground">{formData.eventLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <UtensilsCrossed className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wide">Package</p>
                        <p className="font-semibold text-foreground">{PACKAGE_LABELS[formData.cateringPackage]}</p>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {bookingType === 'table' ? 'Reservation Fee' : 'Booking Deposit'}
                    </p>
                    <p className="text-xs text-foreground/50">
                      {bookingType === 'table'
                        ? 'Deducted from your final bill'
                        : reservationFee === 0
                        ? 'Final quote provided after review'
                        : 'Per-person rate applies on the event day'}
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-accent">
                    {reservationFee === 0 ? 'TBD' : `${reservationFee} SAR`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setStep('payment-form')}
                className="mt-6 w-full px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
              >
                Proceed to Payment
              </button>
              <button
                onClick={handleReset}
                className="mt-3 w-full px-6 py-2.5 bg-transparent text-foreground/60 rounded-xl text-sm hover:text-foreground transition-colors"
              >
                Edit Details
              </button>
            </div>
          )}

          {/* ── STEP 3: Payment Form ─────────────────────────────────────────── */}
          {step === 'payment-form' && (
            <div className="grid lg:grid-cols-5 gap-6">

              {/* Card form — left / main */}
              <form onSubmit={handlePayNow} noValidate className="lg:col-span-3">
                <div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8 space-y-5">

                  {/* Header */}
                  <div className="flex items-center justify-between pb-1 border-b border-border">
                    <h2 className="elegant-text text-xl font-bold text-primary">Payment Details</h2>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                      <Lock className="w-3.5 h-3.5" />
                      Secured
                    </div>
                  </div>

                  {/* Mock card visual */}
                  <div className="relative h-44 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 p-5 flex flex-col justify-between overflow-hidden shadow-lg select-none">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white" />
                      <div className="absolute top-8 right-8 w-32 h-32 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex items-center justify-between">
                      <CreditCard className="w-8 h-8 text-primary-foreground/80" />
                      <span className="text-primary-foreground/70 text-xs font-bold tracking-widest uppercase">
                        {cardData.cardNumber
                          ? cardData.cardNumber.replace(/\d(?=.{5})/g, '*')
                          : '**** **** **** ****'}
                      </span>
                    </div>
                    <div>
                      <p className="text-primary-foreground/60 text-[10px] uppercase tracking-widest mb-0.5">Cardholder</p>
                      <p className="text-primary-foreground font-semibold text-sm">
                        {cardData.cardholderName || 'Your Name'}
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-primary-foreground/60 text-[10px] uppercase tracking-widest mb-0.5">Expires</p>
                        <p className="text-primary-foreground font-semibold text-sm">{cardData.expiry || 'MM/YY'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary-foreground/70 font-bold text-lg">
                          {reservationFee === 0 ? 'TBD' : `${reservationFee} SAR`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className={labelClass}>Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardData.cardholderName}
                      onChange={handleCardChange}
                      placeholder="Name as it appears on card"
                      className={`${inputClass} ${cardErrors.cardholderName ? 'border-destructive ring-1 ring-destructive' : ''}`}
                    />
                    {cardErrors.cardholderName && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {cardErrors.cardholderName}
                      </p>
                    )}
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className={labelClass}>Card Number *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`${inputClass} pl-10 ${cardErrors.cardNumber ? 'border-destructive ring-1 ring-destructive' : ''}`}
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    </div>
                    {cardErrors.cardNumber && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {cardErrors.cardNumber}
                      </p>
                    )}
                  </div>

                  {/* Expiry + CVV */}
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
                        className={`${inputClass} ${cardErrors.expiry ? 'border-destructive ring-1 ring-destructive' : ''}`}
                      />
                      {cardErrors.expiry && (
                        <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {cardErrors.expiry}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>CVV *</label>
                      <div className="relative">
                        <input
                          type="password"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="•••"
                          maxLength={4}
                          className={`${inputClass} ${cardErrors.cvv ? 'border-destructive ring-1 ring-destructive' : ''}`}
                        />
                      </div>
                      {cardErrors.cvv && (
                        <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {cardErrors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Secure badge */}
                  <div className="flex items-center gap-2 p-3 bg-secondary/5 border border-secondary/20 rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0" />
                    <p className="text-xs text-foreground/60">
                      Your payment is secured with 256-bit SSL encryption. Card details are never stored.
                    </p>
                  </div>

                  {/* Pay Now */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                  >
                    <Lock className="w-4 h-4" />
                    Pay {reservationFee === 0 ? 'Now' : `${reservationFee} SAR`} Now
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('availability')}
                    className="w-full px-6 py-2.5 bg-transparent text-foreground/60 rounded-xl text-sm hover:text-foreground transition-colors"
                  >
                    Back to Summary
                  </button>
                </div>
              </form>

              {/* Order summary sidebar — right */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-2xl shadow-lg p-5 sticky top-28">
                  <h3 className="elegant-text text-lg font-bold text-primary mb-4">Order Summary</h3>
                  <BookingSummaryCard compact />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Payment Processing ───────────────────────────────────── */}
          {step === 'payment-processing' && (
            <div className="bg-card border border-border rounded-2xl shadow-lg p-12 text-center">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <div className="absolute inset-2 rounded-full bg-primary/5 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h2 className="elegant-text text-2xl font-bold text-primary mb-3">
                Processing your payment...
              </h2>
              <p className="text-foreground/60 text-sm max-w-xs mx-auto leading-relaxed">
                Please wait while we securely process your transaction. Do not close this window.
              </p>
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-foreground/40">
                <ShieldCheck className="w-4 h-4" />
                256-bit SSL encrypted
              </div>
            </div>
          )}

          {/* ── STEP 5: Success ──────────────────────────────────────────────── */}
          {step === 'success' && (
            <div className="bg-card border border-border rounded-2xl shadow-lg p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10 text-secondary" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/25 mb-3">
                  Payment Successful
                </span>
                <h2 className="elegant-text text-3xl font-bold text-primary mb-2">
                  Reservation Confirmed
                </h2>
                <p className="text-foreground/60 text-sm">
                  Your reservation request has been received. We'll be in touch shortly.
                </p>
              </div>

              {/* Booking details card */}
              <div className="bg-background border border-border rounded-xl divide-y divide-border mb-6">
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
                  <div key={label} className="flex items-center justify-between px-4 py-3">
                    <span className="text-xs text-foreground/50 uppercase tracking-wide font-semibold">{label}</span>
                    <span className={`text-sm font-semibold text-foreground text-right max-w-[55%] ${label === 'Reservation ID' ? 'font-mono text-primary' : ''}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {formData.email || formData.phone ? (
                <p className="text-xs text-foreground/50 text-center mb-6">
                  Confirmation sent to{' '}
                  <span className="text-foreground font-medium">{formData.email || formData.phone}</span>
                </p>
              ) : null}

              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={handleReset}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-md"
                >
                  View Reservation
                </button>
                <Link
                  href="/"
                  className="w-full px-6 py-3 bg-card border border-border text-foreground rounded-xl font-bold text-sm hover:bg-muted/50 transition-all text-center"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}

          {/* Info Bar */}
          {(step === 'form' || step === 'success') && (
            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-foreground">Location</p>
                  <p className="text-xs text-foreground/60">King Abdulaziz Rd, Jeddah</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-foreground">Hours</p>
                  <p className="text-xs text-foreground/60">Daily: 1:00 PM – 1:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-foreground">Call Us</p>
                  <a href="tel:+966555674383" className="text-xs text-primary hover:text-primary/80 transition-colors">
                    +966 55 567 4383
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
