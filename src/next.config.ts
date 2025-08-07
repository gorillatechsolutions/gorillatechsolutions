
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions.poll = 300;
      // In a containerized dev environment, the HMR connection may be unstable.
      // Setting this to false disables HMR and opts for full-page reloads, which is more reliable.
      config.cache = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This is to allow cross-origin requests in the development environment.
    // The need for this is specific to the Firebase Studio environment.
    allowedDevOrigins: [
      'https://*.cloudworkstations.dev',
    ],
    crossOrigin: 'anonymous',
  },
};

export default nextConfig;
