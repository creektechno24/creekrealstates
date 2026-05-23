import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PropertyForm } from "@/components/property-form";

export default async function PostPropertyPage() {

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log("USER:", user);

  // NOT LOGGED IN
  if (error || !user) {
    redirect("/login?redirect=/post-property");
  }

  // NOT ADMIN
  if (
    user.email !==
    "creektechno24@gmail.com"
  ) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">

      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 md:py-10 lg:px-8">

        <div className="mb-8 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-500">
            Creek Real Estates
          </p>

          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Post Property
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Add property details,
            upload images and videos,
            and publish your listing professionally.
          </p>

        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_80px_rgba(0,0,0,0.08)] sm:rounded-[32px] sm:p-6 lg:p-8">

          <PropertyForm />

        </div>

      </main>

    </div>
  );
}