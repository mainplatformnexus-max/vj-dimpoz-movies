"use client"

import { AlertTriangle } from "lucide-react"

export function SuspensionOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      {/* Content container */}
      <div className="mx-4 max-w-2xl rounded-lg bg-black border border-red-600/30 p-8 shadow-2xl">
        {/* Header with icon */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          <h1 className="text-2xl font-bold text-red-600">Website Suspended</h1>
        </div>

        {/* Main message */}
        <div className="mb-8 space-y-4 text-center text-gray-300">
          <p className="text-lg">
            This website has been temporarily suspended by{" "}
            <span className="font-semibold text-white">Nexus Platform</span> due to detected unauthorized activity.
          </p>
          <p className="text-base">
            Access will remain restricted until the issue is resolved with the platform administrator.
          </p>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-red-600/20"></div>

        {/* Contact information */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">For Support, Please Contact:</h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-red-600 font-bold">📞</span>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <a href="tel:0760734679" className="text-white hover:text-red-600 transition-colors">
                  0760734679
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-red-600 font-bold">🏢</span>
              <div>
                <p className="text-sm text-gray-400">Office</p>
                <p className="text-white">Namaganda Plaza, Luwum Street, Room F27, Kampala</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-red-600 font-bold">🌐</span>
              <div>
                <p className="text-sm text-gray-400">Website</p>
                <a
                  href="https://nexusplatform.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-600 transition-colors"
                >
                  nexusplatform.site
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <div className="mt-8 border-t border-red-600/20 pt-6 text-center text-sm text-gray-400">
          <p>Our team will help review the issue and guide you through the reinstatement process.</p>
          <p className="mt-2 text-xs">Administrative service fees may apply depending on the nature of the case.</p>
        </div>
      </div>
    </div>
  )
}
