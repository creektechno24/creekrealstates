"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get("redirect") || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    if (email !== "creektechno24@gmail.com") {
      alert("Only admin can login")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Invalid credentials")
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4
      bg-gradient-to-br from-slate-100 via-white to-slate-200">

      <div className="w-full max-w-5xl backdrop-blur-xl bg-white/80 border border-white/30
        rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="/images/login-bg.jpg"
            alt="Real Estate"
            className="h-full w-full object-cover"
          />

          {/* soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* text */}
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-2xl font-semibold mb-1">
              Find Your Dream Home
            </h2>
            <p className="text-sm opacity-80">
              Premium properties, trusted deals.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Login to your admin account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            <input
              type="email"
              placeholder="Enter your email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3
                focus:ring-2 focus:ring-primary outline-none transition bg-white/80"
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3
                focus:ring-2 focus:ring-primary outline-none transition bg-white/80"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold
                hover:opacity-90 transition shadow-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}