// `wrangler types` regenerates worker-configuration.d.ts from wrangler.jsonc.
// Secrets and vars that are not declared there (RESEND_API_KEY is set via
// `wrangler secret put`) are not picked up, so they are declared here instead.
declare namespace Cloudflare {
  interface Env {
    RESEND_API_KEY: string;
    RESEND_EMAIL_ADDRESS: string;
  }
}
