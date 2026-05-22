/** @type {import('next').NextConfig} */

const nextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {

    // ✅ disable optimization for uploaded images
    unoptimized: true,

    remotePatterns: [

      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

    ],

    formats: [
      "image/avif",
      "image/webp",
    ],

    minimumCacheTTL: 60,

  },

  compress: true,

  poweredByHeader: false,

  reactStrictMode: true,

}

export default nextConfig