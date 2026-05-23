"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo =
    searchParams.get("redirect") || "/";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errorMsg, setErrorMsg] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    try {

      // Admin restriction
      if (
        email !==
        "creektechno24@gmail.com"
      ) {
        setErrorMsg(
          "Only admin can login"
        );

        setLoading(false);
        return;
      }

      // LOGIN
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        setErrorMsg(
          "Invalid email or password"
        );

        setLoading(false);
        return;
      }

      // Session sync
     {/* if (data.session) {
        await supabase.auth.setSession({
          access_token:
            data.session.access_token,
          refresh_token:
            data.session.refresh_token,
        });
      } */}

      // Wait a little before redirect
      setTimeout(() => {
        router.replace(redirectTo);
        router.refresh();
      }, 500);

    } catch (error) {

      console.error(error);

      setErrorMsg(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 via-white to-slate-200">

      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/30 bg-white/80 shadow-2xl backdrop-blur-xl grid md:grid-cols-2">

        {/* IMAGE */}
        <div className="relative hidden md:block">

          <img
            src="/images/login-bg.jpg"
            alt="Real Estate"
            className="h-full w-full object-cover"
          />

        </div>

        {/* FORM */}
        <div className="flex flex-col justify-center p-10">

          <h2 className="mb-4 text-3xl font-bold">
            Admin Login
          </h2>

          {errorMsg && (
            <p className="mb-3 text-red-500">
              {errorMsg}
            </p>
          )}

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded border p-3"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded border p-3"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-black py-3 text-white"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}