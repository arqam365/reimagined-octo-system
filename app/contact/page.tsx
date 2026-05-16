'use client'

import React, { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

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
    'w-full px-4 py-3.5 border border-[#0A0806]/12 bg-white text-[#0A0806] placeholder-[#5C4A3A]/35 focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A]/40 transition-all font-body text-sm'

  const labelClass =
    'block font-ui text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5C4A3A]/60 mb-2'

  return (
    <>
      <Navigation />
      <main>

        {/* Dark Hero */}
        <section className="bg-[#0A0806] pt-36 pb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/25 mb-8">
              We&apos;d Love to Hear from You
            </p>
            <h1
              className="elegant-text font-bold text-white leading-none mb-8"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
            >
              Get in<br />
              <span className="text-white/20">Touch</span>
            </h1>
            <div className="h-px w-16 bg-white/10" />
          </div>
        </section>

        {/* Contact info bar — horizontal, not cards */}
        <section className="bg-[#F5F0E8] border-b border-[#0A0806]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:divide-x sm:divide-[#0A0806]/8">

              <div className="py-8 sm:pr-12">
                <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#5C4A3A]/40 mb-2">Address</p>
                <p className="font-body text-[#0A0806] text-base">
                  Ash Shati, Atelier Lavie<br />
                  Jeddah, Saudi Arabia
                </p>
              </div>

              <div className="py-8 sm:px-12">
                <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#5C4A3A]/40 mb-2">Phone</p>
                <a
                  href="tel:+966555674383"
                  className="font-body text-[#0A0806] hover:text-[#8B1A1A] transition-colors min-h-[44px] flex items-center"
                >
                  +966 55 567 4383
                </a>
                <a
                  href="tel:+966554430556"
                  className="font-body text-[#0A0806] hover:text-[#8B1A1A] transition-colors min-h-[44px] flex items-center"
                >
                  +966 55 443 0556
                </a>
              </div>

              <div className="py-8 sm:pl-12">
                <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#5C4A3A]/40 mb-2">Hours</p>
                <p className="font-body text-[#0A0806]">Open Daily &mdash; 12:00 PM &ndash; 1:00 AM</p>
                <p className="font-body text-[#5C4A3A]/60 text-sm mt-0.5">Weekends till 2:00 AM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Form + Map side by side */}
        <section className="bg-[#F5F0E8] py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Contact Form */}
              <div>
                <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-[#8B1A1A] mb-6">
                  Send a Message
                </p>
                <h2 className="elegant-text text-4xl font-bold text-[#0A0806] mb-10">
                  Write to Us
                </h2>

                {submitted ? (
                  <div className="border border-[#0A0806]/10 p-12 text-center bg-white">
                    <div className="w-14 h-14 bg-[#8B1A1A]/8 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-7 h-7 text-[#8B1A1A]" />
                    </div>
                    <h3 className="elegant-text text-2xl font-bold text-[#0A0806] mb-3">
                      Message Received
                    </h3>
                    <p className="font-body text-[#5C4A3A]">
                      We&apos;ll get back to you shortly.
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
                      className="w-full flex items-center justify-center gap-2 bg-[#8B1A1A] text-white font-ui text-xs tracking-[0.3em] uppercase px-6 py-4 hover:bg-[#701515] transition-colors min-h-[44px]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Map */}
              <div>
                <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-[#8B1A1A] mb-6">
                  Find Us
                </p>
                <h2 className="elegant-text text-4xl font-bold text-[#0A0806] mb-10">
                  On the Map
                </h2>

                <div className="overflow-hidden h-[400px] mb-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.872!2d39.1726!3d21.6226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d14e7e5c5555%3A0x0!2sMazencito%20Pizzeria!5e0!3m2!1sen!2ssa!4v1716900000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Mazencito Pizzeria — Ash Shati, Atelier Lavie, Jeddah"
                  />
                </div>

                <div className="border border-[#0A0806]/8 p-6 bg-white">
                  <p className="font-ui text-[10px] tracking-[0.3em] uppercase text-[#5C4A3A]/50 mb-2">
                    Opening Hours
                  </p>
                  <p className="font-body text-[#0A0806]">Open Daily &mdash; 12:00 PM &ndash; 1:00 AM</p>
                  <p className="font-body text-[#5C4A3A]/60 text-sm mt-0.5">Weekends till 2:00 AM</p>
                  <p className="font-ui text-[10px] text-[#5C4A3A]/40 tracking-wide mt-3">
                    Ash Shati, Atelier Lavie, Jeddah, Saudi Arabia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp strip */}
        <section className="bg-[#8B1A1A] py-20">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
              <div>
                <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/30 mb-4">
                  Instant Support
                </p>
                <h2
                  className="elegant-text font-bold text-white leading-none"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  Chat with us<br />
                  on WhatsApp
                </h2>
              </div>
              <a
                href="https://wa.me/966555674383"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs tracking-[0.3em] uppercase bg-amber-500 text-black px-8 py-4 hover:bg-amber-400 transition-colors min-h-[44px] flex items-center justify-center sm:flex-shrink-0"
              >
                Open WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
