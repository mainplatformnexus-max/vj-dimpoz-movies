import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { SubscriptionProvider } from "@/lib/subscription-context"
import { SuspensionOverlay } from "@/components/suspension-overlay"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DIMPOZ MOVIES - Stream & Download",
  description: "Stream and download your favorite movies and shows on DIMPOZ MOVIES",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DIMPOZ MOVIES",
  },
  applicationName: "DIMPOZ MOVIES",
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`font-sans antialiased`}>
        <SuspensionOverlay />
        <AuthProvider>
          <SubscriptionProvider>{children}</SubscriptionProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
