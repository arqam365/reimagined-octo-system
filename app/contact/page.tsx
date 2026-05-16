'use client'

import React from "react"

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from 'lucide-react'

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Frontend only - just show success message
    setSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        subject: '',
        message: '',
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <>
      <Navigation />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="elegant-text text-5xl md:text-6xl font-bold mb-4 text-primary">
              Get In Touch
            </h1>
            <p className="text-xl text-foreground/70">
              We'd love to hear from you. Contact Mazencito Pizzeria anytime.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <div className="bg-card p-8 rounded-lg shadow-lg text-center border border-border">
              <div className="inline-block p-4 bg-primary/10 rounded-lg mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="elegant-text text-2xl font-bold mb-3 text-primary">
                Call Us
              </h3>
              <div className="space-y-2">
                <a
                  href="tel:+966555674383"
                  className="block text-primary hover:text-primary/80 text-lg font-medium transition-colors"
                >
                  +966 55 567 4383
                </a>
                <a
                  href="tel:+966554430556"
                  className="block text-primary hover:text-primary/80 text-lg font-medium transition-colors"
                >
                  +966 55 443 0556
                </a>
              </div>
              <p className="text-sm text-foreground/60 mt-3">
                Open Daily 1:00 PM - 1:00 AM
              </p>
            </div>

            {/* WhatsApp */}
            <div className="bg-card p-8 rounded-lg shadow-lg text-center border border-border">
              <div className="inline-block p-4 bg-secondary/10 rounded-lg mb-4">
                <MessageCircle className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="elegant-text text-2xl font-bold mb-3 text-primary">
                WhatsApp
              </h3>
              <a
                href="https://wa.me/966555674383"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary hover:text-primary/80 text-lg font-medium transition-colors mb-3"
              >
                Message Us
              </a>
              <p className="text-sm text-foreground/60">
                Quick response & instant support
              </p>
            </div>

            {/* Location */}
            <div className="bg-card p-8 rounded-lg shadow-lg text-center border border-border">
              <div className="inline-block p-4 bg-primary/10 rounded-lg mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="elegant-text text-2xl font-bold mb-3 text-primary">
                Location
              </h3>
              <p className="text-foreground/80 text-lg mb-2">
                King Abdulaziz Branch Road
              </p>
              <p className="text-sm text-foreground/60">
                Jeddah, Saudi Arabia
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div>
              <h2 className="elegant-text text-3xl font-bold mb-6 text-primary">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="bg-secondary/10 border-2 border-secondary p-8 rounded-lg text-center">
                  <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="elegant-text text-2xl font-bold text-primary mb-3">
                    Thank You!
                  </h3>
                  <p className="text-foreground/80">
                    We've received your message and will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border border-border">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+966 55 000 0000"
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Message subject"
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Your message"
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map & Info */}
            <div>
              <h2 className="elegant-text text-3xl font-bold mb-6 text-primary">
                Find Us on the Map
              </h2>

              {/* Map */}
              <div className="rounded-lg overflow-hidden shadow-lg h-[400px] mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.8372839174876!2d39.17224!3d21.543915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sKing+Abdulaziz+Branch+Road!2sJeddah+Saudi+Arabia!5e0!3m2!1sen!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Mazencito Pizzeria Location"
                />
              </div>

              {/* Hours */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="elegant-text text-xl font-bold mb-4 text-primary">
                  Opening Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">Open Daily</span>
                    <span className="text-foreground/70 font-bold">
                      1:00 PM - 1:00 AM
                    </span>
                  </div>
                  <div className="pt-3 border-t border-border text-sm text-foreground/60">
                    <p>We're located on King Abdulaziz Branch Road in Jeddah</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-gradient-to-r from-secondary to-secondary/80 text-primary-foreground p-8 rounded-lg text-center shadow-lg">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h2 className="elegant-text text-3xl font-bold mb-4">
              Get Instant Support on WhatsApp
            </h2>
            <p className="text-lg mb-6 text-primary-foreground/90 max-w-2xl mx-auto">
              Have a quick question about our menu, reservations, or services? Message us on WhatsApp for fast and friendly support!
            </p>
            <a
              href="https://wa.me/966555674383"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-white text-secondary rounded font-bold hover:bg-gray-100 transition-all shadow-md"
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
