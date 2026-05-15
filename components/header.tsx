"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import {
  Home,
  Building2,
  Plus,
  LogOut,
  Info,
  Phone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

export function Header() {

  const pathname =
    usePathname()

  const supabase =
    createClient()

  const [user, setUser] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {

          setUser(
            session?.user ?? null
          )

          setLoading(false)

        }
      )

    supabase.auth
      .getUser()
      .then(({ data }) => {

        setUser(data.user)

        setLoading(false)

      })

    return () => {

      listener.subscription.unsubscribe()

    }

  }, [])

  async function handleLogout() {

    await supabase.auth.signOut()

    window.location.href = "/"

  }

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/properties",
      label: "Properties",
      icon: Building2,
    },
    {
      href: "/about",
      label: "About",
      icon: Info,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: Phone,
    },
  ]

  return (

    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <Image
            src="/favicon-32x32.png"
            alt="Creek Real Estates"
            width={42}
            height={42}
            className="rounded-full"
          />

          <span className="text-2xl font-bold text-slate-900">

            Creek Real Estates

          </span>

        </Link>

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-2 md:flex">

          {navItems.map((item) => {

            const Icon =
              item.icon

            const isActive =
              pathname === item.href

            return (

              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-medium transition-all duration-300",
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >

                <Icon className="h-5 w-5" />

                {item.label}

              </Link>

            )

          })}

        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* POST PROPERTY */}
          {!loading && (

            <Link
              href={
                user
                  ? "/post-property"
                  : "/login?redirect=/post-property"
              }
            >

              <Button className="h-14 gap-2 rounded-2xl px-6 text-base font-semibold shadow-sm">

                <Plus className="h-5 w-5" />

                Post Property

              </Button>

            </Link>

          )}

          {/* LOGOUT */}
          {!loading && user && (

            <Button
              variant="outline"
              onClick={handleLogout}
              className="h-14 gap-2 rounded-2xl px-5 text-base font-medium"
            >

              <LogOut className="h-5 w-5" />

              Logout

            </Button>

          )}

        </div>

      </div>

    </header>

  )

}