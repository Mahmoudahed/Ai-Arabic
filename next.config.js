/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      path: false,
      net: false,
      tls: false,
      "pg-native": false,
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    NEXT_EXPORT: 'true'
  },
  // Disable server code in static export
  serverRuntimeConfig: {
    isStaticExport: true
  }
};

module.exports = nextConfig; 