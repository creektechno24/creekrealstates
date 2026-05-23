import { Suspense } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import LoginContent from "./LoginContent";

async function LoginWrapper() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // already logged in
  if (session) {
    redirect("/post-property");
  }

  return <LoginContent />;
}

function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4">

      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_80px_rgba(0,0,0,0.08)] sm:p-8">

        <div className="animate-pulse space-y-5">
          <div className="h-10 w-48 rounded-xl bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-12 rounded-2xl bg-slate-100" />
          <div className="h-12 rounded-2xl bg-slate-100" />
          <div className="h-12 rounded-2xl bg-slate-200" />
        </div>

      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginWrapper />
    </Suspense>
  );
}