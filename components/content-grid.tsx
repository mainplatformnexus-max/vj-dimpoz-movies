"use client"

import { useEffect, useState } from "react"
import { database } from "@/lib/firebase"
import { ref, onValue } from "firebase/database"
import { Star } from 'lucide-react'
import Link from "next/link"

interface ContentItem {
  id: string
  title: string
  year: number
  rating: number
  image: string
  category?: string
  isTrending?: boolean
  type: "movie" | "series" | "original"
  createdAt?: string
}

interface ContentGridProps {
  contentType: "movie" | "series" | "original"
  title: string
  selectedCategory?: string
}

export default function ContentGrid({ contentType, title, selectedCategory = "All" }: ContentGridProps) {
  const [content, setContent] = useState<ContentItem[]>([])
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const contentRef = ref(
      database,
      contentType === "movie" ? "movies" : contentType === "series" ? "series" : "originals",
    )
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const contentList = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          type: contentType,
          ...value,
        }))
        contentList.sort((a: any, b: any) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
        setContent(contentList)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [contentType])

  useEffect(() => {
    if (selectedCategory === "Trending") {
      setFilteredContent(content.filter((item) => item.isTrending))
    } else if (selectedCategory === "All") {
      setFilteredContent(content)
    } else {
      setFilteredContent(content.filter((item) => item.category === selectedCategory))
    }
  }, [selectedCategory, content])

  if (loading) {
    return (
      <div className="px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{title}</h2>
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (filteredContent.length === 0) {
    return (
      <div className="px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{title}</h2>
        <div className="bg-slate-800 rounded-lg p-8 text-center">
          <p className="text-slate-400">No {contentType}s in this category yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{title}</h2>
      <div className="trending-grid grid gap-3 sm:gap-4 lg:gap-5 w-full">
        <style>{`
          @media (max-width: 639px) {
            .trending-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (min-width: 640px) and (max-width: 1023px) {
            .trending-grid { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
          }
          @media (min-width: 1024px) {
            .trending-grid { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; }
          }
        `}</style>
        {filteredContent.map((item) => (
          <Link key={item.id} href={`/watch/${item.id}?type=${contentType}`}>
            <div
              className="group relative rounded-lg overflow-hidden cursor-pointer h-full"
              style={{ aspectRatio: "2/3" }}
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="absolute inset-0 w-full h-48 md:h-64 lg:h-80 object-cover"
              />

              {contentType !== "movie" && (
                <div className="absolute top-2 right-2 bg-black/90 px-2 py-1 rounded text-xs font-bold text-white uppercase z-10">
                  {contentType}
                </div>
              )}

              <div className="relative h-48 md:h-64 lg:h-80 flex flex-col justify-end">
                <div className="bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 sm:p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1">{item.title}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </span>
                      <span>{item.year}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button className="bg-white text-black px-4 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-slate-200 transition">
                  Play
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
