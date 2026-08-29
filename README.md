# My Astro Photo Blog

A photo blog built with Astro and Vue to learn more about web technologies, share my film photography, and learn in public. Posts are written in MDX so I can drop Vue components straight into the content when I need them. View the website [here](https://www.coreydamocles.com).

## How It's Made

**Tech used:**

- Astro
- Vue
- TypeScript
- TailwindCSS
- MDX
- Cloudinary (image hosting)
- Cloudflare (deploy and edge)
- Wrangler (Cloudflare worker/deployment tool)
- Resend (contact form emails)

## Run Locally

Using bun:

Install dependencies:

```bash
bun i
```

Start the dev server:

```bash
bun dev
```

Build for Cloudflare (static + worker):

```bash
bun build:cloudflare
```

Preview the build locally. This runs on Cloudflare's `workerd` runtime, so it
closely mirrors production:

```bash
bun preview
```

To deploy to Cloudflare Workers, build first, then run Wrangler from the project
root (`npx wrangler deploy`). The build writes the deployable Wrangler config to
`dist/server/wrangler.json` and points Wrangler at it, so a deploy always needs a
preceding build. See [wrangler.jsonc](./wrangler.jsonc) for the settings you own
(name, routes, compatibility flags); the adapter fills in `main` and the assets
binding automatically.

## Things to Add

Create a `.dev.vars` file at the root (copy from [.example.dev.vars](./.example.dev.vars)) and add your Resend keys for the contact form:

```
RESEND_API_KEY=re_xxxxx
RESEND_EMAIL_ADDRESS=your@email.com
```

For production on Cloudflare, set `RESEND_API_KEY` as a secret (`npx wrangler secret put RESEND_API_KEY`) and add `RESEND_EMAIL_ADDRESS` to `vars` in [wrangler.jsonc](./wrangler.jsonc) if you use it there.
