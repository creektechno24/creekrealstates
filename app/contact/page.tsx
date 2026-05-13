"use client"

import Link from "next/link"

import { useState } from "react"

import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
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
      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16">

          {/* BREADCRUMB */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">

            <Link href="/">
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span>
              Contact
            </span>

          </div>

          {/* TITLE */}
          <h1 className="text-5xl font-bold text-slate-900">

            Contact Us

          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-600">

            Reach out to Creek Real Estates
            for property inquiries and support.

          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-16">

        <div className="grid gap-10 lg:grid-cols-2">

          {/* CONTACT FORM */}
          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <h2 className="text-3xl font-bold text-slate-900">

              Send a Message

            </h2>

            <p className="mt-3 text-gray-600">

              Fill out the form and our team will contact you shortly.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

              {/* NAME */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary"
              />

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary"
              />

              {/* PHONE */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary"
              />

              {/* MESSAGE */}
              <textarea
                rows={5}
                name="message"
                placeholder="Message"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary"
              />

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >

                {loading && !success
                  ? "Sending..."
                  : "Send Message"}

              </button>

              {/* SUCCESS */}
              {success && (

                <p className="text-sm font-medium text-green-600">

                  Message sent successfully.

                </p>

              )}

            </form>

          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">

            {/* PHONE */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <Phone className="h-8 w-8 text-primary" />

              <h2 className="mt-6 text-2xl font-bold text-slate-900">

                Phone

              </h2>

              <p className="mt-4 leading-8 text-gray-600">

                +91 9322393157
                <br />
                +91 9618331539

              </p>

            </div>

            {/* EMAIL */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <Mail className="h-8 w-8 text-primary" />

              <h2 className="mt-6 text-2xl font-bold text-slate-900">

                Email

              </h2>

              <p className="mt-4 leading-8 text-gray-600">

                info@creekrealestates.com

              </p>

            </div>

            {/* LOCATION */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <MapPin className="h-8 w-8 text-primary" />

              <h2 className="mt-6 text-2xl font-bold text-slate-900">

                Location

              </h2>

              <p className="mt-4 leading-8 text-gray-600">

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