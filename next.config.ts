import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "img.clerk.com"
    }]
  },
  experimental: {
    optimizePackageImports: [
      '@clerk/nextjs', 
      'lucide-react', 
      '@liveblocks/react',
      '@liveblocks/react-lexical',
      '@lexical/react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-label',
    ],
  },
  // Optimize for Cloudflare Workers - moved from experimental
  serverExternalPackages: ['@sentry/nextjs'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// Only wrap with Sentry if not deploying to Cloudflare
const shouldUseSentry = process.env.DISABLE_SENTRY !== 'true';

// Conditionally import and wrap with Sentry config
// Use require() to avoid top-level import that gets bundled
let finalConfig: NextConfig = nextConfig;

if (shouldUseSentry) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { withSentryConfig } = require("@sentry/nextjs");
    finalConfig = withSentryConfig(nextConfig, {
      // For all available options, see:
      // https://www.npmjs.com/package/@sentry/webpack-plugin#options

      org: "bhaskar-pt",
      project: "javascript-nextjs",

      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,

      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: false, // Disabled to reduce bundle size

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: false, // Disabled for Cloudflare
    });
  } catch (e) {
    // Sentry not available, use base config
    console.warn("Sentry not available, using base config:", e);
  }
}

export default finalConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();