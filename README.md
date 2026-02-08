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

Preview the Cloudflare build locally with Wrangler:

```bash
bun preview
```

To deploy to Cloudflare Pages/Workers, use Wrangler from the project root (e.g. `npx wrangler deploy`). See [wrangler.jsonc](./wrangler.jsonc) for config.

## Things to Add

Create a `.dev.vars` file at the root (copy from [.example.dev.vars](./.example.dev.vars)) and add your Resend keys for the contact form:

```
RESEND_API_KEY=re_xxxxx
RESEND_EMAIL_ADDRESS=your@email.com
```

For production on Cloudflare, set `RESEND_API_KEY` as a secret (`npx wrangler secret put RESEND_API_KEY`) and add `RESEND_EMAIL_ADDRESS` to `vars` in [wrangler.jsonc](./wrangler.jsonc) if you use it there.
