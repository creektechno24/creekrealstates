"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const supabase = createClient();

    if (email !== "creektechno24@gmail.com") {
      setErrorMsg("Only admin can login");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 via-white to-slate-200">

      <div className="w-full max-w-5xl backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        <div className="hidden md:block relative">
          <img
            src="/images/login-bg.jpg"
            alt="Real Estate"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Admin Login</h2>

          {errorMsg && (
            <p className="text-red-500 mb-3">{errorMsg}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}