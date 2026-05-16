'use client'

import React, { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', phone: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const inputClass =
    'w-full px-4 py-3 border border-[#E8DFD0] rounded-lg bg-white text-[#1A0D0D] placeholder-[#5C4A3A]/40 focus:outline-none focus:ring-2 focus:ring-[#7A1A1A]/30 focus:border-[#7A1A1A]/50 transition-all font-body text-sm'

  const labelClass = 'block font-ui text-xs font-semibold uppercase tracking-widest text-[#5C4A3A]/70 mb-2'

  return (
    <>
      <Navigation />
      <main>

        {/* Dark Hero */}
        <section className="bg-[#0C0907] pt-36 pb-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0C0907]/90" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <p className="font-ui text-xs tracking-[0.35em] uppercase text-amber-400/80 mb-5">
              We&apos;d Love to Hear from You
            </p>
            <h1 className="elegant-text text-6xl md:text-7xl font-bold text-white leading-tight mb-5">
              Get in Touch
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-amber-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
              <div className="h-px w-16 bg-amber-500/40" />
            </div>
            <p className="font-body text-white/55 text-lg">
              Contact Mazencito Pizzeria — we&apos;re always happy to help.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="bg-[#F9F5EE] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Phone */}
              <div className="bg-white border border-[#E8DFD0] rounded-2xl p-10 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-7 h-7 text-[#7A1A1A]" />
                </div>
                <h3 className="elegant-text text-2xl font-bold text-[#1A0D0D] mb-4">
                  Call Us
                </h3>
                <div className="space-y-2 mb-4">
                  <a
                    href="tel:+966555674383"
                    className="block font-body text-[#7A1A1A] hover:text-[#5a1414] text-lg font-medium transition-colors"
                  >
                    +966 55 567 4383
                  </a>
                  <a
                    href="tel:+966554430556"
                    className="block font-body text-[#7A1A1A] hover:text-[#5a1414] text-lg font-medium transition-colors"
                  >
                    +966 55 443 0556
                  </a>
                </div>
                <p className="font-ui text-xs text-[#5C4A3A]/60 uppercase tracking-wide">
                  Open Daily 1:00 PM &ndash; 1:00 AM
                </p>
              </div>

              {/* WhatsApp */}
              <div className="bg-white border border-[#E8DFD0] rounded-2xl p-10 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-7 h-7 text-[#7A1A1A]" />
                </div>
                <h3 className="elegant-text text-2xl font-bold text-[#1A0D0D] mb-4">
                  WhatsApp
                </h3>
                <p className="font-body text-[#5C4A3A] text-sm mb-6 leading-relaxed">
                  Quick responses and instant support for reservations, menu questions, and more.
                </p>
                <a
                  href="https://wa.me/966555674383"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-500 text-black font-ui font-bold text-sm px-6 py-3 rounded hover:bg-amber-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message Us
                </a>
              </div>

              {/* Location */}
              <div className="bg-white border border-[#E8DFD0] rounded-2xl p-10 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-7 h-7 text-[#7A1A1A]" />
                </div>
                <h3 className="elegant-text text-2xl font-bold text-[#1A0D0D] mb-4">
                  Location
                </h3>
                <p className="font-body text-[#5C4A3A] text-lg mb-2">
                  King Abdulaziz Branch Road
                </p>
                <p className="font-body text-[#5C4A3A]/70 text-sm">
                  Jeddah, Saudi Arabia
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-[#5C4A3A]/60">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-ui text-xs">Daily 1:00 PM &ndash; 1:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form + Map */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

              {/* Contact Form */}
              <div>
                <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-600 mb-4">
                  Send a Message
                </p>
                <h2 className="elegant-text text-4xl font-bold text-[#1A0D0D] mb-8">
                  Write to Us
                </h2>

                {submitted ? (
                  <div className="bg-[#F9F5EE] border border-[#E8DFD0] rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#7A1A1A]/10 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8 text-[#7A1A1A]" />
                    </div>
                    <h3 className="elegant-text text-2xl font-bold text-[#1A0D0D] mb-3">
                      Thank You!
                    </h3>
                    <p className="font-body text-[#5C4A3A]">
                      We&apos;ve received your message and will get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className={labelClass}>Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+966 55 000 0000"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Message subject"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Your message"
                        rows={5}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#7A1A1A] text-white font-ui font-bold text-sm px-6 py-4 rounded hover:bg-[#6a1616] transition-colors shadow-md hover:shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Map */}
              <div>
                <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-600 mb-4">
                  Find Us
                </p>
                <h2 className="elegant-text text-4xl font-bold text-[#1A0D0D] mb-8">
                  On the Map
                </h2>
                <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] mb-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.8372839174876!2d39.17224!3d21.543915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sKing+Abdulaziz+Branch+Road!2sJeddah+Saudi+Arabia!5e0!3m2!1sen!2ssa!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Mazencito Pizzeria Location"
                  />
                </div>
                <div className="bg-[#F9F5EE] border border-[#E8DFD0] rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#7A1A1A] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-ui text-sm font-semibold text-[#1A0D0D] mb-1">Opening Hours</p>
                      <p className="font-body text-[#5C4A3A] text-sm">
                        Open Daily &nbsp;1:00 PM &ndash; 1:00 AM
                      </p>
                      <p className="font-ui text-xs text-[#5C4A3A]/60 mt-2">
                        King Abdulaziz Branch Road, Jeddah, Saudi Arabia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA Banner */}
        <section className="bg-[#0C0907] py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="elegant-text text-4xl md:text-5xl font-bold text-white mb-4">
              Get Instant Support on WhatsApp
            </h2>
            <p className="font-body text-white/55 text-lg mb-10 max-w-2xl mx-auto">
              Have a quick question about our menu, reservations, or services? Message us on WhatsApp for fast and friendly support.
            </p>
            <a
              href="https://wa.me/966555674383"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 text-black font-ui font-bold text-sm px-10 py-4 uppercase tracking-widest rounded hover:bg-amber-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Message on WhatsApp
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
