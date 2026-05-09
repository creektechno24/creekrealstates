import type { Metadata } from "next"

import Link from "next/link"

import {
  CalendarDays,
  Globe,
  Ban,
  ShieldCheck,
  FileSearch,
  ExternalLink,
  Headphones,
  ChevronRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Website Usage Policy | Creek Real Estates",
  description:
    "Read the Website Usage Policy of Creek Real Estates.",
}

const sections = [
  {
    id: "permitted-use",
    title: "Permitted Use",
    icon: Globe,
    content:
      "Users may browse property listings, contact agents, and access real estate information for personal use.",
  },
  {
    id: "prohibited-use",
    title: "Prohibited Use",
    icon: Ban,
    content: [
      "Unauthorized commercial use of website content.",
      "Data scraping, mining, or automated collection of information.",
      "Uploading harmful or malicious code.",
    ],
  },
  {
    id: "account-security",
    title: "Account Security",
    icon: ShieldCheck,
    content:
      "Users are responsible for safeguarding their login credentials. Creek Real Estates is not liable for unauthorized account access.",
  },
  {
    id: "content-accuracy",
    title: "Content Accuracy",
    icon: FileSearch,
    content:
      "While we strive for accuracy, property details are subject to change and should be independently verified.",
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    icon: ExternalLink,
    content:
      "Our website may contain links to external sites. Creek Real Estates is not responsible for their content or practices.",
  },
]

export default function WebsiteUsagePolicyPage() {
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
              Website Usage Policy
            </span>

          </div>

          {/* TITLE */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Website Usage Policy
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
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-primary"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">
                      {index + 1}
                    </span>

                    {section.title}
                  </a>
                ))}

              </div>

              {/* SUPPORT */}
              <div className="mt-8 rounded-3xl border bg-slate-50 p-5">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-primary">
                  <Headphones className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  Need Help?
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Contact our team if you have any questions about website usage policies.
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
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                      <Icon className="h-8 w-8" />
                    </div>

                    {/* CONTENT */}
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