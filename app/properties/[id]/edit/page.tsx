import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PropertyForm } from "@/components/property-form"

async function getProperty(id: string) {
  const supabase = await createClient()

  const { data } = await supabase
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
  const { id } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ❌ not logged
  if (!user) {
    redirect("/login")
  }

  // ❌ not admin
  if (user.email !== "newadmin@gmail.com") {
    redirect("/")
  }

  const property = await getProperty(id)

  if (!property) notFound()

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">

        {/* 🔥 Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Property
          </h1>
          <p className="mt-2 text-gray-500">
            Update property details and save changes.
          </p>
        </div>

        {/* 🔥 Form Card */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border">
          <PropertyForm property={property} isEdit />
        </div>

      </div>
    </div>
  )
}