import { PropertyForm } from "@/components/property-form"

export default function PostPropertyPage() {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      
      {/* 🔹 Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/post-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover blur-2xl scale-110"
        />
      </div>

      {/* 🔹 Dark Overlay (contrast kosam) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />

      {/* 🔹 Content */}
      <div className="relative z-10 w-full max-w-3xl px-4 py-12">
        
        {/* Heading */}
        <div className="mb-8 text-center text-white">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Post Your Property
          </h1>
          <p className="mt-2 text-white/80">
            List your property and reach thousands of buyers instantly
          </p>
        </div>

        {/* 🔥 Glass Card Form */}
        <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
          
          {/* Subtle inner gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

          {/* Form */}
          <div className="relative p-6 sm:p-8">
            <PropertyForm />
          </div>
        </div>

      </div>
    </section>
  )
}