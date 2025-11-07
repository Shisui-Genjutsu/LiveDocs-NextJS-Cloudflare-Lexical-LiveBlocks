// Cloudflare-compatible instrumentation without Sentry
// This file is used when DISABLE_SENTRY=true

export async function register() {
  // No Sentry initialization for Cloudflare deployments
}

export const onRequestError = undefined;

