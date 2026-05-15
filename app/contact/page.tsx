"use client"

import Link from "next/link"
import Image from "next/image"

import { useState } from "react"

import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  PhoneCall,
  MessageCircle,
} from "lucide-react"

import { createClient }
from "@/lib/supabase/client"

export default function ContactPage() {

  const supabase = createClient()

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault()

    const form =
      e.currentTarget

    setLoading(true)

    setSuccess(false)

    const formData =
      new FormData(form)

    const payload = {

      name:
        formData.get("name"),

      email:
        formData.get("email"),

      phone:
        formData.get("phone"),

      message:
        formData.get("message"),

    }

    const { error } =
      await supabase
        .from("contact_messages")
        .insert([payload])

    if (!error) {

      form.reset()

      setSuccess(true)

    }

    setLoading(false)

  }

  return (

    <div className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute -left-10 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:items-center lg:px-8">

          {/* LEFT */}
          <div>

            {/* BREADCRUMB */}
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">

              <Link
                href="/"
                className="transition hover:text-white"
              >

                Home

              </Link>

              <ChevronRight className="h-4 w-4" />

              <span className="text-emerald-400">

                Contact

              </span>

            </div>

            {/* TITLE */}
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-6xl">

              Get In Touch
              <br />
              With Our Team

            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">

              Connect with Creek Real Estates
              for property inquiries,
              investment opportunities,
              and expert real estate guidance.

            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <a
                href="tel:+919322393157"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-emerald-600 sm:w-auto"
              >

                <PhoneCall className="h-5 w-5" />

                Call Now

              </a>

              <a
                href="https://wa.me/919322393157"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white backdrop-blur-xl transition hover:bg-white/10 sm:w-auto"
              >

                <MessageCircle className="h-5 w-5" />

                WhatsApp

              </a>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-emerald-500/20 to-blue-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-3 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:rounded-[40px] sm:p-4">
<Image
  src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1600&auto=format&fit=crop"
  alt="Contact Creek Real Estates"
  fill
  className="object-cover"
  sizes="(max-width:768px) 100vw, 50vw"
/>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* CONTACT FORM */}
          <div className="rounded-[32px] border border-white/10 bg-white p-6 shadow-[0_20px_80px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">

            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">

              Send a Message

            </h2>

            <p className="mt-3 leading-7 text-gray-600 sm:leading-8">

              Fill out the form and
              our team will get back
              to you shortly.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5 sm:space-y-6"
            >

              {/* NAME */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none transition focus:border-primary focus:bg-white sm:h-14"
              />

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none transition focus:border-primary focus:bg-white sm:h-14"
              />

              {/* PHONE */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none transition focus:border-primary focus:bg-white sm:h-14"
              />

              {/* MESSAGE */}
              <textarea
                rows={6}
                name="message"
                placeholder="Write your message..."
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-primary focus:bg-white"
              />

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition hover:scale-[1.01] hover:opacity-95 disabled:opacity-50 sm:text-lg"
              >

                {loading && !success
                  ? "Sending..."
                  : "Send Message"}

              </button>

              {/* SUCCESS */}
              {success && (

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">

                  <p className="text-sm font-medium text-emerald-700">

                    Message sent successfully.

                  </p>

                </div>

              )}

            </form>

          </div>

          {/* CONTACT INFO */}
          <div className="space-y-5 sm:space-y-6">

            {/* PHONE */}
            <div className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] sm:rounded-[32px] sm:p-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 sm:h-16 sm:w-16">

                <Phone className="h-7 w-7 text-emerald-600 sm:h-8 sm:w-8" />

              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 sm:mt-6 sm:text-2xl">

                Phone

              </h2>

              <p className="mt-4 leading-7 text-gray-600 sm:leading-8">

                +91 9322393157
                <br />
                +91 9618331539

              </p>

            </div>

            {/* EMAIL */}
            <div className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] sm:rounded-[32px] sm:p-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 sm:h-16 sm:w-16">

                <Mail className="h-7 w-7 text-blue-600 sm:h-8 sm:w-8" />

              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 sm:mt-6 sm:text-2xl">

                Email

              </h2>

              <p className="mt-4 leading-7 text-gray-600 sm:leading-8">

                info@creekrealestates.com

              </p>

            </div>

            {/* LOCATION */}
            <div className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] sm:rounded-[32px] sm:p-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 sm:h-16 sm:w-16">

                <MapPin className="h-7 w-7 text-orange-600 sm:h-8 sm:w-8" />

              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 sm:mt-6 sm:text-2xl">

                Location

              </h2>

              <p className="mt-4 leading-7 text-gray-600 sm:leading-8">

                Hyderabad,
                Telangana,
                India

              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}