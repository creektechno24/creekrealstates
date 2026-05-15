import Link from "next/link"

import Image from "next/image"

import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

export function Footer() {

  const currentYear =
    new Date().getFullYear()

  const linkStyle =
    "text-xs sm:text-sm text-gray-300 px-1 rounded transition-all duration-200 hover:text-white hover:bg-white/10 hover:underline underline-offset-4"

  return (

    <footer className="relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* CONTENT */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 text-white sm:px-6 md:py-20 lg:px-8">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">

            <Link
              href="/"
              className="flex items-center gap-3"
            >

              <Image
                src="/favicon-32x32.png"
                alt="Creek Real Estates Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-cover"
              />

              <span className="text-xl font-bold tracking-tight sm:text-2xl">

                Creek Real Estates

              </span>

            </Link>

            <p className="mt-4 text-sm leading-7 text-gray-300 sm:leading-relaxed">

              Your trusted partner for finding the perfect property.
              Browse houses, flats, and land listings or post your
              own for free.

            </p>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="mb-4 text-lg font-semibold uppercase tracking-wider text-gray-400 sm:text-xl">

              Quick Links

            </h3>

            <ul className="space-y-3 sm:space-y-4">

              <li>

                <Link
                  href="/"
                  className={linkStyle}
                >

                  Home

                </Link>

              </li>

              <li>

                <Link
                  href="/properties"
                  className={linkStyle}
                >

                  Browse Properties

                </Link>

              </li>

              <li>

                <Link
                  href="/post-property"
                  className={linkStyle}
                >

                  Post Property

                </Link>

              </li>

            </ul>

          </div>

          {/* PROPERTY TYPES */}
          <div>

            <h3 className="mb-4 text-lg font-semibold uppercase tracking-wider text-gray-400 sm:text-xl">

              Property Types

            </h3>

            <ul className="space-y-3 sm:space-y-4">

              <li>

                <Link
                  href="/properties?type=House"
                  className={linkStyle}
                >

                  Houses

                </Link>

              </li>

              <li>

                <Link
                  href="/properties?type=Flat"
                  className={linkStyle}
                >

                  Flats

                </Link>

              </li>

              <li>

                <Link
                  href="/properties?type=Land"
                  className={linkStyle}
                >

                  Land

                </Link>

              </li>

            </ul>

          </div>

          {/* CONTACT INFO */}
          <div>

            <h3 className="mb-4 text-lg font-semibold uppercase tracking-wider text-gray-400 sm:text-xl">

              Contact Us

            </h3>

            <ul className="space-y-3 sm:space-y-4">

              <li className="flex items-center gap-3 text-xs text-gray-300 sm:text-sm">

                <Phone className="h-4 w-4 text-primary" />

                <span>

                  +91 9322393157

                </span>

              </li>

              <li className="flex items-center gap-3 text-xs text-gray-300 sm:text-sm">

                <Phone className="h-4 w-4 text-primary" />

                <span>

                  +91 9618331539

                </span>

              </li>

              <li className="flex items-center gap-3 text-xs text-gray-300 sm:text-sm">

                <Mail className="h-4 w-4 text-primary" />

                <span className="break-all">

                  info@creekrealestates.com

                </span>

              </li>

              <li className="flex items-start gap-3 text-xs text-gray-300 sm:text-sm">

                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <span>

                  Hyderabad,
                  Telangana,
                  India

                </span>

              </li>

            </ul>

          </div>

        </div>

        {/* LEGAL LINKS */}
        <div className="mt-10 border-t border-white/10 pt-6">

          <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:flex-wrap sm:gap-4">

            <Link
              href="/privacy-policy"
              className={linkStyle}
            >

              Privacy Policy

            </Link>

            <Link
              href="/terms-and-conditions"
              className={linkStyle}
            >

              Terms & Conditions

            </Link>

            <Link
              href="/disclaimer"
              className={linkStyle}
            >

              Disclaimer

            </Link>

            <Link
              href="/website-usage-policy"
              className={linkStyle}
            >

              Website Usage Policy

            </Link>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-6 border-t border-white/10 pt-6">

          <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

            <p className="text-xs text-gray-400 sm:text-sm">

              © {currentYear} Creek Real Estates.
              All rights reserved.

            </p>

            <p className="text-xs text-gray-500 sm:text-sm">

              Designed for modern real estate experiences.

            </p>

          </div>

        </div>

      </div>

    </footer>

  )

}