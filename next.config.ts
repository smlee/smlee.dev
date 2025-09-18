import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'host', value: '^www\\.smlee\\.dev$' }],
        destination: 'https://smlee.dev/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
