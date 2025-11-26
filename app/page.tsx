export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-black/60 border border-red-600/30 rounded-lg p-8 sm:p-12 text-center">
        {/* Warning Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">Website Temporarily Suspended</h1>

        {/* Main Message */}
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          This website has been temporarily suspended by{" "}
          <span className="font-semibold text-white">Nexus Platform</span> due to detected unauthorized activity.
        </p>

        <p className="text-base text-gray-400 mb-8">
          Access will remain restricted until the issue is resolved with the platform administrator.
        </p>

        {/* Contact Information */}
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold text-red-600 mb-4">For Support, Please Contact:</h2>

          <div className="space-y-3 text-gray-300">
            <div className="flex items-start">
              <span className="font-semibold text-red-600 min-w-fit pr-3">Platform:</span>
              <span>Nexus Platform</span>
            </div>

            <div className="flex items-start">
              <span className="font-semibold text-red-600 min-w-fit pr-3">Phone:</span>
              <a href="tel:0760734679" className="hover:text-red-600 transition-colors">
                0760734679
              </a>
            </div>

            <div className="flex items-start">
              <span className="font-semibold text-red-600 min-w-fit pr-3">Office:</span>
              <span>Namaganda Plaza, Luwum Street, Room F27, Kampala</span>
            </div>

            <div className="flex items-start">
              <span className="font-semibold text-red-600 min-w-fit pr-3">Website:</span>
              <a
                href="https://nexusplatform.site"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors"
              >
                nexusplatform.site
              </a>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <p className="text-sm text-gray-500">
          Our team will help review the issue and guide you through the reinstatement process.
          <br className="hidden sm:block" />
          <span className="text-red-600">Administrative service fees may apply</span> depending on the nature of the
          case.
        </p>
      </div>
    </main>
  )
}
