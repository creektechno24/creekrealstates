/** @type {import('next').NextConfig} */

/**const nextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {

    // ⚡ ENABLE NEXT IMAGE OPTIMIZATION
    unoptimized: false,

    remotePatterns: [

      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

    ],

  },

}

export default nextConfig */

/** @type {import('next').NextConfig} */

const nextConfig = {

  // ⚠️ keep only temporarily if needed
  // better to remove later after fixing TS errors
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {

    // ✅ Next.js image optimization ON
    unoptimized: false,

    // ✅ External image domains
    remotePatterns: [

      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

    ],

    // ✅ Modern image formats
    formats: [
      "image/avif",
      "image/webp",
    ],

    // ✅ Better caching
    minimumCacheTTL: 60,

  },

  // ⚡ Small production optimizations
  compress: true,

  poweredByHeader: false,

  reactStrictMode: true,

}

export default nextConfig