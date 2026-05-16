"use client"

import Link from "next/link"
import Image from "next/image"

import {
  usePathname,
} from "next/navigation"

import {
  useEffect,
  useState,
} from "react"

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

import { Button }
from "@/components/ui/button"

import { cn }
from "@/lib/utils"

import { createClient }
from "@/lib/supabase/client"

export function Header() {

  const pathname =
    usePathname()

  const supabase =
    createClient()

  const [user, setUser] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false)

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

         <div className="leading-tight">

  <span className="block text-lg font-bold text-slate-900 sm:text-2xl">

    Creek Real Estates

  </span>

 <span className="hidden text-[11px] font-medium tracking-[0.08em] text-emerald-500/80 sm:block">  

    Your Property Partner For Life

  </span>

</div>

        </Link>

        {/* DESKTOP NAVIGATION */}
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
              className="hidden sm:block"
            >

              <Button className="h-12 gap-2 rounded-2xl px-5 text-sm font-semibold shadow-sm sm:h-14 sm:px-6 sm:text-base">

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
              className="hidden h-12 gap-2 rounded-2xl px-4 text-sm font-medium sm:flex sm:h-14 sm:px-5 sm:text-base"
            >

              <LogOut className="h-5 w-5" />

              Logout

            </Button>

          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          >

            {mobileMenuOpen ? (

              <X className="h-6 w-6" />

            ) : (

              <Menu className="h-6 w-6" />

            )}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (

        <div className="border-t bg-white px-4 py-4 shadow-lg md:hidden">

          <nav className="flex flex-col gap-2">

            {navItems.map((item) => {

              const Icon =
                item.icon

              const isActive =
                pathname === item.href

              return (

                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium transition",
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

            {/* MOBILE POST PROPERTY */}
            {!loading && (

              <Link
                href={
                  user
                    ? "/post-property"
                    : "/login?redirect=/post-property"
                }
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >

                <Button className="mt-3 h-12 w-full gap-2 rounded-2xl text-base font-semibold">

                  <Plus className="h-5 w-5" />

                  Post Property

                </Button>

              </Link>

            )}

            {/* MOBILE LOGOUT */}
            {!loading && user && (

              <Button
                variant="outline"
                onClick={handleLogout}
                className="mt-2 h-12 w-full gap-2 rounded-2xl text-base font-medium"
              >

                <LogOut className="h-5 w-5" />

                Logout

              </Button>

            )}

          </nav>

        </div>

      )}

    </header>

  )

}