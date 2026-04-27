"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Home, Building2, Plus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

export function Header() {
  const pathname = usePathname()
  const supabase = createClient()

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    supabase.auth.getUser().then(({ data }) => {
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.jpg"
            alt="Creek Real Estates"
            width={40}
            height={40}
            style={{ height: "auto" }}
          />
          <span className="text-xl font-bold">Creek Real Estates</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm",
              pathname === "/"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            href="/properties"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm",
              pathname === "/properties"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Building2 className="h-4 w-4" />
            Properties
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* 🔥 SAME AS HERO BUTTON */}
          {!loading && (
            <Link href={user ? "/post-property" : "/login?redirect=/post-property"}>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Post Property
              </Button>
            </Link>
          )}

          {/* Logout */}
          {/*{!loading && user && (
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
            */}
            

        </div>
      </div>
    </header>
  )
}