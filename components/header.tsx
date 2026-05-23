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
  Menu,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase/client"

export function Header() {
  const pathname = usePathname()

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const {
      data: listener,
    } = supabase.auth.onAuthStateChange(
      (_event: unknown, session: any) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    supabase.auth
      .getUser()
      .then(({ data }: { data: any }) => {
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

          <div className="leading-tight">
            <span className="block text-lg font-bold text-slate-900 sm:text-2xl">
              Creek Real Estates
            </span>

            <span className="block text-[10px] font-medium tracking-[0.06em] text-emerald-500/80 sm:text-[11px]">
              Your Property Partner For Life
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-medium transition-all",
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">

          {!loading && (
            <Link
              href={
                user
                  ? "/post-property"
                  : "/login?redirect=/post-property"
              }
              className="hidden sm:block"
            >
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Post Property
              </Button>
            </Link>
          )}

          {!loading && user && (
            <Button
              variant="outline"
              onClick={handleLogout}
              className="hidden sm:flex"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}

          <button
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            className="rounded-xl p-2 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

        </div>
      </div>
    </header>
  )
}