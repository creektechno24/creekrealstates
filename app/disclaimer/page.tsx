import type { Metadata } from "next"

import Link from "next/link"

import {
  AlertTriangle,
  CalendarDays,
  ShieldAlert,
  BadgeInfo,
  SearchCheck,
  Scale,
  Headphones,
  ChevronRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Disclaimer | Creek Real Estates",
  description:
    "Read the Disclaimer of Creek Real Estates.",
}

const sections = [
  {
    id: "informational-purpose",
    title: "Informational Purpose",
    icon: BadgeInfo,
    content:
      "Property listings and information provided on this website are for informational purposes only.",
  },
  {
    id: "accuracy",
    title: "Accuracy of Listings",
    icon: SearchCheck,
    content:
      "Creek Real Estates does not guarantee the accuracy, completeness, availability, or reliability of property listings displayed on this website.",
  },
  {
    id: "independent-verification",
    title: "Independent Verification",
    icon: ShieldAlert,
    content:
      "Users are advised to independently verify all property details, legal documents, pricing, and ownership information before making any financial or legal decisions.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: Scale,
    content:
      "Creek Real Estates shall not be held responsible for any direct or indirect losses, damages, or disputes arising from the use of this website or reliance on property information.",
  },
]

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-orange-50 to-white">

        <div className="absolute inset-0 opacity-40">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-100 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-yellow-100 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          {/* BREADCRUMB */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">

            <Link
              href="/"
              className="transition hover:text-primary"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span>
              Legal
            </span>

            <ChevronRight className="h-4 w-4" />

            <span className="font-medium text-primary">
              Disclaimer
            </span>

          </div>

          {/* TITLE */}
          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Disclaimer
              </h1>

              <div className="mt-4 flex items-center gap-2 text-gray-600">

                <CalendarDays className="h-5 w-5 text-primary" />

                <span className="text-sm font-medium">
                  Effective Date: May 2026
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">

          {/* SIDEBAR */}
          <aside className="h-fit lg:sticky lg:top-24">

            <div className="rounded-3xl border bg-white p-6 shadow-sm">

              <h2 className="mb-6 text-xl font-bold text-slate-900">
                On this page
              </h2>

              <div className="space-y-2">

                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">
                      {index + 1}
                    </span>

                    {section.title}
                  </a>
                ))}

              </div>

              {/* HELP BOX */}
              <div className="mt-8 rounded-3xl border bg-slate-50 p-5">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <Headphones className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  Need Clarification?
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Contact our support team for additional information regarding this disclaimer.
                </p>

                <div className="mt-5 space-y-3 text-sm">

                  <p className="font-medium text-primary">
                    info@creekrealestates.com
                  </p>

                  <p className="font-medium text-slate-700">
                    +91 9322393157
                  </p>

                </div>

              </div>

            </div>

          </aside>

          {/* MAIN CONTENT */}
          <div className="space-y-6">

            {sections.map((section, index) => {
              const Icon = section.icon

              return (
                <div
                  key={section.id}
                  id={section.id}
                  className="rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-md"
                >

                  <div className="flex gap-5">

                    {/* ICON */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                      <Icon className="h-8 w-8" />
                    </div>

                    {/* CONTENT */}
                    <div>

                      <h2 className="text-2xl font-bold text-slate-900">
                        {index + 1}. {section.title}
                      </h2>

                      <p className="mt-4 text-[15px] leading-8 text-gray-600">
                        {section.content}
                      </p>

                    </div>

                  </div>

                </div>
              )
            })}

          </div>

        </div>

      </section>

    </div>
  )
}