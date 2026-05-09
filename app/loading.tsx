export default function Loading() {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">

      {/* BACKGROUND BLUR */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50" />

      {/* CONTENT */}
      <div className="relative flex flex-col items-center">

        {/* SPINNER */}
        <div className="relative">

          <div className="h-16 w-16 rounded-full border-4 border-slate-200" />

          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />

        </div>

        {/* TEXT */}
        <p className="mt-6 text-sm font-medium tracking-wide text-slate-600">

          Loading Creek Real Estates...

        </p>

      </div>

    </div>

  )

}