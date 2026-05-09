import type { Metadata } from "next"

import Link from "next/link"

import {
  CalendarDays,
  ShieldCheck,
  UserCheck,
  Briefcase,
  Ban,
  Scale,
  Gavel,
  FileText,
  Headphones,
  ChevronRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Terms and Conditions | Creek Real Estates",
  description:
    "Read the Terms and Conditions of Creek Real Estates.",
}

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: FileText,
    content:
      "By using this website, www.creekrealestates.com you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions.",
  },
  {
    id: "eligibility",
    title: "Eligibility",
    icon: UserCheck,
    content:
      "You must be at least 18 years of age and legally capable of entering into binding contracts to use our services.",
  },
  {
    id: "services",
    title: "Services",
    icon: Briefcase,
    content:
      "Creek Real Estates provides property listings, real estate information, and related services. All listings are subject to availability and may be modified or removed without notice.",
  },
  {
    id: "obligations",
    title: "User Obligations",
    icon: ShieldCheck,
    content: [
      "You agree not to misuse the website or engage in unlawful activities.",
      "You shall not upload false, misleading, or fraudulent information.",
      "You are responsible for maintaining the confidentiality of your account credentials.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: Ban,
    content:
      "Creek Real Estates shall not be liable for any inaccuracies in property listings or damages arising from the use of this website.",
  },
  {
    id: "termination",
    title: "Termination",
    icon: Gavel,
    content:
      "We reserve the right to suspend or terminate your access to the website for violations of these Terms.",
  },
  {
    id: "law",
    title: "Governing Law",
    icon: Scale,
    content:
      "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.",
  },
]

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-blue-50 to-white">

        <div className="absolute inset-0 opacity-40">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
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
              Terms and Conditions
            </span>

          </div>

          {/* TITLE */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Terms and Conditions
          </h1>

          {/* DATE */}
          <div className="mt-6 flex items-center gap-2 text-gray-600">
            <CalendarDays className="h-5 w-5 text-primary" />

            <span className="text-sm font-medium">
              Effective Date: May 2026
            </span>
          </div>

        </div>

      </section>

      {/* MAIN */}
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
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-primary"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">
                      {index + 1}
                    </span>

                    {section.title}
                  </a>
                ))}

              </div>

              {/* CONTACT */}
              <div className="mt-8 rounded-3xl border bg-slate-50 p-5">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-primary">
                  <Headphones className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  Need Help?
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Contact us if you have any questions regarding our Terms and Conditions.
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

          {/* CONTENT */}
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
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                      <Icon className="h-8 w-8" />
                    </div>

                    {/* TEXT */}
                    <div className="w-full">

                      <h2 className="text-2xl font-bold text-slate-900">
                        {index + 1}. {section.title}
                      </h2>

                      {Array.isArray(section.content) ? (
                        <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-8 text-gray-600">
                          {section.content.map((item, idx) => (
                            <li key={idx}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-4 text-[15px] leading-8 text-gray-600">
                          {section.content}
                        </p>
                      )}

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