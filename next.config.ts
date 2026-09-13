import type { NextConfig } from 'next';
import { supabaseConfig } from './src/lib/config';
const backend = supabaseConfig();
const mediaOrigin = backend ? new URL(backend.url) : null;
const config: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: mediaOrigin ? [{
      protocol: mediaOrigin.protocol.slice(0, -1) as 'http' | 'https', hostname: mediaOrigin.hostname,
      port: mediaOrigin.port,
      pathname: '/storage/v1/object/sign/site-media/**',
    }] : [],
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }];
  },
};
export default config;
