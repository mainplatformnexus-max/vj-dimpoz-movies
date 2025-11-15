"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import FeaturedCarousel from "@/components/featured-carousel"
import GenreFilters from "@/components/genre-filters"
import TrendingGrid from "@/components/trending-grid"

export default function Home() {
  const { loading } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState("Trending")
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-400 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
      <Header />
      <div className="pt-6 sm:pt-8">
        <FeaturedCarousel />
      </div>
      <div className="px-0 py-6 sm:py-8">
        <GenreFilters onCategoryChange={setSelectedCategory} />
      </div>
      <div className="py-8 sm:py-12">
        <TrendingGrid selectedCategory={selectedCategory} />
      </div>
    </main>
  )
}
