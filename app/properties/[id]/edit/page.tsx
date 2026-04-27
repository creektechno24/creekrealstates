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

  // ❌ not admin (CHANGE EMAIL)
  if (user.email !== "newadmin@gmail.com") {
    redirect("/")
  }

  const property = await getProperty(id)

  if (!property) notFound()

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Property</h1>

      <div className="rounded-xl bg-white p-6 shadow-xl">
        <PropertyForm property={property} isEdit />
      </div>
    </div>
  )
}