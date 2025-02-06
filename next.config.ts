import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ucarecdn.com", "cryptologos.cc"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
      }
    }
    return config
  },
  eslint: {
    // Disable eslint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds even if there are TypeScript errors
    ignoreBuildErrors: true,
  },
}

export default nextConfig
