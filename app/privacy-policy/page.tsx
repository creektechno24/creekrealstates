import type { Metadata } from "next"
import { PageWrapper }
from "@/components/animations/page-wrapper"

import Link from "next/link"

import {
  CalendarDays,
  ShieldCheck,
  User,
  FileText,
  Users,
  Cookie,
  Lock,
  Headphones,
  ChevronRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Creek Real Estates",
  description:
    "Read the privacy policy of Creek Real Estates.",
}

const sections = [
  {
    id: "collection",
    title: "Information Collection",
    icon: User,
    content:
      "We collect personal information such as names, email addresses, phone numbers, and property preferences.",
  },
  {
    id: "usage",
    title: "Use of Information",
    icon: FileText,
    content:
      "Collected data is used to provide services, respond to inquiries, and improve user experience.",
  },
  {
    id: "sharing",
    title: "Data Sharing",
    icon: Users,
    content:
      "Information may be shared with partner agents but will not be sold to third parties.",
  },
  {
    id: "cookies",
    title: "Cookies",
    icon: Cookie,
    content:
      "Our website uses cookies to enhance browsing experience. Users may disable cookies in their browser settings.",
  },
  {
    id: "rights",
    title: "User Rights",
    icon: ShieldCheck,
    content:
      "You have the right to request access, correction, or deletion of your personal data.",
  },
  {
    id: "security",
    title: "Security",
    icon: Lock,
    content:
      "We employ reasonable safeguards to protect user data against unauthorized access or disclosure.",
  },
]

export default function PrivacyPolicyPage() {

  return (

    <PageWrapper>

      <div className="min-h-screen bg-[#f8fafc]">

        {/* HERO SECTION */}
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
                Privacy Policy
              </span>

            </div>

            {/* TITLE */}
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Privacy Policy
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

                {/* CONTACT BOX */}
                <div className="mt-8 rounded-3xl border bg-slate-50 p-5">

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-primary">

                    <Headphones className="h-6 w-6" />

                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    Need Help?
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    If you have questions regarding this policy,
                    feel free to contact our support team.
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

                      {/* TEXT */}
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

    </PageWrapper>

  )

}