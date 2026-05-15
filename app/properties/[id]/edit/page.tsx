import {
  notFound,
  redirect,
} from "next/navigation"

import { createClient }
from "@/lib/supabase/server"

import { PropertyForm }
from "@/components/property-form"

async function getProperty(
  id: string
) {

  const supabase =
    await createClient()

  const { data } =
    await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single()

  return data

}

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } =
    await params

  const supabase =
    await createClient()

  const {
    data: { user },
  } =
    await supabase.auth.getUser()

  // ❌ NOT LOGGED IN
  if (!user) {

    redirect("/login")

  }

  // ❌ NOT ADMIN
  if (
    user.email !==
    "newadmin@gmail.com"
  ) {

    redirect("/")

  }

  const property =
    await getProperty(id)

  if (!property)
    notFound()

  return (

    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">

      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 md:py-10 lg:px-8">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-500">

            Creek Real Estates

          </p>

          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">

            Edit Property

          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">

            Update property details,
            upload images or videos,
            and save your changes professionally.

          </p>

        </div>

        {/* FORM CARD */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_80px_rgba(0,0,0,0.08)] sm:rounded-[32px] sm:p-6 lg:p-8">

          <PropertyForm
            property={property}
            isEdit
          />

        </div>

      </main>

    </div>

  )

}