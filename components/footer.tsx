import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const linkStyle =
    "text-sm text-gray-300 px-1 rounded transition-all duration-200 hover:text-white hover:bg-white/10 hover:underline underline-offset-4"

  return (
    <footer className="relative overflow-hidden">
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 text-white sm:px-6 lg:px-8">
        
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="Creek Real Estates Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="text-lg font-bold tracking-tight">
                Creek Real Estates
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              Your trusted partner for finding the perfect property. Browse houses, flats, and land listings or post your own for free.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className={linkStyle}>Home</Link></li>
              <li><Link href="/properties" className={linkStyle}>Browse Properties</Link></li>
              <li><Link href="/post-property" className={linkStyle}>Post Property</Link></li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Property Types
            </h3>
            <ul className="space-y-3">
              <li><Link href="/properties?type=House" className={linkStyle}>Houses</Link></li>
              <li><Link href="/properties?type=Flat" className={linkStyle}>Flats</Link></li>
              <li><Link href="/properties?type=Land" className={linkStyle}>Land</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 9322393157</span>
              </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 9618331539</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@creekrealestates.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-gray-400">
            © {currentYear} Creek Real Estates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}