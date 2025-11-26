"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/carousel", label: "Carousel" },
    { href: "/admin/movies", label: "Movies" },
    { href: "/admin/series", label: "Series" },
    { href: "/admin/originals", label: "Originals" },
    { href: "/admin/wallet", label: "Wallet" },
  ]

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="text-2xl font-bold text-white">
          🎬 VJ Dimpoz Admin
        </Link>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className={`${pathname === item.href ? "bg-blue-600 text-white" : "text-white hover:bg-white/20"}`}
              >
                {item.label}
              </Button>
            </Link>
          ))}

          <Button onClick={handleLogout} className="ml-4 bg-red-600 hover:bg-red-700 text-white">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
