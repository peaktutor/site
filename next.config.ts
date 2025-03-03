import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Disable all development indicators
  devIndicators: false,
  // Disable error overlays
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Disable React DevTools in production
  compiler: {
    // Suppress development-only features in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable React error overlay in development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Disable React error overlay in development
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js'] && !entries['main.js'].includes('./dev/error-overlay-disabled')) {
          entries['main.js'].push('./dev/error-overlay-disabled');
        }
        return entries;
      };
    }
    return config;
  },
};

export default nextConfig;