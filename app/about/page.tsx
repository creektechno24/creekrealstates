import type { Metadata } from "next"
import Image from "next/image"

import Link from "next/link"

import {
  TrendingUp,
  Home,
  Briefcase,
  ShieldCheck,
  ChevronRight,
  Cpu,
} from "lucide-react"

export const metadata: Metadata = {

  title:
    "About Us | Creek Real Estates",

  description:
    "Learn more about Creek Real Estates and our mission to simplify property buying and selling.",

}

export default function AboutPage() {

  return (

    <div className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          {/* BREADCRUMB */}
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">

            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-emerald-400">

              About Us

            </span>

          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* LEFT */}
            <div>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">

                Creek Real Estates

              </p>

              <h4 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-5xl">

                Building Futures.
                <br />
                Delivering Trust.

              </h4>

              <p className="mt-8 max-w-xl text-lg leading-9 text-slate-300">

                At Creek Real Estates, a business vertical of Creek Techno Solutions Pvt. Ltd.,
                is dedicated exclusively to the buying and selling of properties.

              </p>

              <p className="mt-6 max-w-xl text-lg leading-9 text-slate-300">

                Our mission is to create a trusted marketplace where investors,
                homebuyers, and corporate professionals can achieve their goals
                with confidence, clarity, and ease.

              </p>

              {/* BUTTONS */}
              <div className="mt-10 flex flex-wrap gap-4">

                <Link
                  href="/properties"
                  className="rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600"
                >

                  Explore Properties

                </Link>

                <Link
                  href="/contact"
                  className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
                >

                  Contact Us

                </Link>

              </div>

            </div>

            {/* RIGHT */}
            <div className="relative">

              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-emerald-500/20 to-blue-500/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.3)]">

              <Image
  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"
  alt="Luxury Real Estate"
  fill
  className="object-cover"
  sizes="(max-width:768px) 100vw, 50vw"
/>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 py-14 md:py-20 sm:px-6 lg:px-8">

        {/* INVESTORS */}
        <div className="rounded-[36px] border border-white/10 bg-white p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_120px_rgba(0,0,0,0.12)]">

          <div className="flex items-start gap-6">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">

              <TrendingUp className="h-10 w-10" />

            </div>

            <div>

              <h2 className="text-4xl font-bold text-slate-900">

                For Investors

              </h2>

              <div className="mt-6 space-y-6 text-[16px] leading-9 text-gray-600">

                <p>

                  We provide access to properties that promise strong appreciation and rental yields.

                </p>

                <p>

                  Real estate remains one of the most reliable avenues for wealth creation,
                  and our team specializes in identifying opportunities that align with
                  long term financial growth.

                </p>

                <p>

                  Through market analysis, transparent valuations,
                  and strategic insights, we help investors make informed decisions
                  that maximize returns while minimizing risks.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* HOMEBUYERS */}
        <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-emerald-50 to-white p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_120px_rgba(0,0,0,0.12)]">

          <div className="flex items-start gap-6">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600">

              <Home className="h-10 w-10" />

            </div>

            <div>

              <h2 className="text-4xl font-bold text-slate-900">

                For Homebuyers

              </h2>

              <div className="mt-6 space-y-6 text-[16px] leading-9 text-gray-600">

                <p>

                  We recognize that purchasing a property is a deeply personal milestone.

                </p>

                <p>

                  It is about building a future,
                  creating memories, and securing stability.

                </p>

                <p>

                  That is why we prioritize personalized guidance,
                  clear communication, and honest advice.

                </p>

                <p>

                  From the first consultation to the final paperwork,
                  our professionals ensure that every step of the journey
                  is stress free and rewarding.

                </p>

                <p>

                  Families can rely on us to provide accurate information,
                  fair pricing, and unwavering support in finding their dream home.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* CORPORATE */}
        <div className="rounded-[36px] border border-white/10 bg-white p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_120px_rgba(0,0,0,0.12)]">

          <div className="flex items-start gap-6">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-orange-50 text-orange-600">

              <Briefcase className="h-10 w-10" />

            </div>

            <div>

              <h2 className="text-4xl font-bold text-slate-900">

                For Corporate Professionals

              </h2>

              <div className="mt-6 space-y-6 text-[16px] leading-9 text-gray-600">

                <p>

                  We understand the importance of efficiency,
                  convenience, and strategic location.

                </p>

                <p>

                  Whether it is acquiring office spaces,
                  commercial properties, or investment assets,
                  we deliver solutions that align with professional goals
                  and organizational growth.

                </p>

                <p>

                  Our streamlined processes,
                  digital tools, and expert negotiation strategies
                  save valuable time while ensuring optimal outcomes.

                </p>

                <p>

                  Corporate clients appreciate our ability to balance speed
                  with precision, making property transactions seamless and effective.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* OUR STRENGTH */}
          <div className="rounded-[40px] bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-12 text-slate-900 shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-emerald-100">
          <div className="flex items-start gap-6">

    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-emerald-100">

              <ShieldCheck className="h-10 w-10 text-emerald-400" />

            </div>

            <div>

              <h2 className="text-5xl font-bold text-slate-900">

                Our Strength

              </h2>

              <div className="mt-8 space-y-6 text-[17px] leading-9 text-slate-600">

                <p>

                  Our strength lies in this three fold focus:
                  serving investors, homebuyers,
                  and corporate professionals with equal dedication.

                </p>

                <p>

                  This balance allows us to create a vibrant ecosystem
                  where opportunities meet aspirations.

                </p>

                <p>

                  Sellers benefit from our wide network of buyers,
                  while buyers gain access to curated listings
                  that match their unique objectives.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* TECHNOLOGY */}
        <div className="rounded-[36px] border border-white/10 bg-white p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_120px_rgba(0,0,0,0.12)]">

          <div className="flex items-start gap-6">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-600">

              <Cpu className="h-10 w-10" />

            </div>

            <div>

              <h2 className="text-4xl font-bold text-slate-900">

                Technology Driven Approach

              </h2>

              <div className="mt-6 space-y-6 text-[16px] leading-9 text-gray-600">

                <p>

                  Technology is at the core of our operations.

                </p>

                <p>

                  As part of Creek Techno Solutions Pvt. Ltd.,
                  we leverage digital platforms to simplify property discovery and transactions.

                </p>

                <p>

                  Our systems make it easy to browse listings,
                  compare options, and connect with sellers quickly.

                </p>

                <p>

                  Investors value the efficiency of our data driven tools,
                  homebuyers enjoy the convenience of transparent processes,
                  and corporate professionals benefit from streamlined deal management.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* TRUST */}
        <div className="rounded-[36px] border border-white/10 bg-white p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

          <div className="flex items-start gap-6">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-green-50 text-green-600">

              <ShieldCheck className="h-10 w-10" />

            </div>

            <div>

              <h2 className="text-4xl font-bold text-slate-900">

                Trust & Reliability

              </h2>

              <div className="mt-6 space-y-6 text-[16px] leading-9 text-gray-600">

                <p>

                  We believe that trust is earned through honesty,
                  reliability, and consistent delivery.

                </p>

                <p>

                  Every transaction we facilitate is handled with professionalism,
                  ensuring that all parties walk away satisfied.

                </p>

                <p>

                  Our reputation is built on repeat clients and referrals,
                  a testament to the confidence people place in our services.

                </p>

              </div>

            </div>

          </div>

        </div>
        
{/* BOTTOM SECTION */}
<div className="mt-12 grid gap-8 lg:grid-cols-2">

  
{/* LEFT CARD */}
<div className="group rounded-[36px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-10 shadow-[0_10px_40px_rgba(16,185,129,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)]">
    <div className="flex flex-col gap-8">

      {/* TOP */}
      <div className="flex items-center gap-5">

        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100">

          <ShieldCheck className="h-10 w-10 text-emerald-600" />

        </div>

        <div>

          <h3 className="text-3xl font-bold text-slate-900">

            Vision & Mission

          </h3>

          <p className="mt-2 text-slate-500">

            Our foundation and purpose

          </p>

        </div>

      </div>

      {/* CONTENT */}
      <div className="space-y-10 text-[17px] leading-10 text-slate-700">

        <p>

          Our vision is to be the most trusted name in property transactions,
          bridging the gap between investment opportunities,
          personal aspirations, and corporate needs.

        </p>

        <p>

          Our mission is to make buying and selling properties simple,
          transparent, and value driven.

        </p>

      </div>

      {/* BUTTONS */}
<div className="mt-10 flex flex-wrap gap-4">

  <Link
    href="/properties"
    className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-7 py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
  >

    Explore Properties

  </Link>

  <Link
    href="/contact"
    className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition duration-300 hover:border-slate-400 hover:bg-slate-50"
  >

    Contact Us

  </Link>

</div>

    </div>

  </div>

  
{/* RIGHT CARD */}
<div className="group rounded-[36px] border border-blue-100 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-10 shadow-[0_10px_40px_rgba(59,130,246,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]">
    <div className="flex flex-col gap-8">

      {/* TOP */}
      <div className="flex items-center gap-5">

        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">

          <TrendingUp className="h-10 w-10 text-blue-600" />

        </div>

        <div>

          <h3 className="text-3xl font-bold text-slate-900">

            Our Commitment

          </h3>

          <p className="mt-2 text-slate-500">

            Enabling progress through trust

          </p>

        </div>

      </div>

      {/* CONTENT */}
      <div className="space-y-7 text-[17px] leading-10 text-slate-700">

        <p>

          At Creek Real Estates,
          we are not just facilitating deals — we are enabling progress.

        </p>

        <p>

          For investors, we unlock profitable ventures.

        </p>

        <p>

          For homebuyers, we open doors to cherished homes.

        </p>

        <p>

          For corporate professionals,
          we deliver spaces that empower growth.

        </p>

        <p className="font-bold text-slate-900">

          Together, we are building futures,
          fulfilling dreams, and shaping success.

        </p>

      </div>

    </div>

  </div>

</div>

      </section>

    </div>

  )

}