import type { NextConfig } from "next"
import type { Configuration as WebpackConfiguration } from "webpack"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["ucarecdn.com", "cryptologos.cc", "raw.githubusercontent.com"],
  },
  webpack: (config: WebpackConfiguration, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...(config.resolve?.fallback || {}),
          fs: false,
          net: false,
          tls: false,
          crypto: require.resolve("crypto-browserify"),
        },
      }
    }

    config.module = {
      ...config.module,
      rules: [
        ...(config.module?.rules || []),
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    }

    return config
  },
}

export default nextConfig

