import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PropertyForm } from "@/components/property-form"

export default async function PostPropertyPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ❌ Not logged
  if (!user) {
    redirect("/login?redirect=/post-property")
  }

  // ❌ Not admin (UPDATED)
  if (user.email !== "creektechno24@gmail.com") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10">
      
      <main className="mx-auto max-w-2xl px-4 py-10">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Post Property
        </h1>

        <div className="rounded-xl bg-white p-6 shadow-xl">
          <PropertyForm />
        </div>

      </main>
    </div>
  )
}