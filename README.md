# The Vael

The official listening hub: full songs, cinematic visualizers and direct album links. Designed for GitHub Pages at **https://evekiio.github.io/the-vael/**.

## Maintain

Edit `content.json` for destinations and song copy, `styles.css` for presentation, and `build.mjs` for the HTML template. Node.js 22 or newer is the only build requirement. No package installation is needed.

```sh
npm run build
npm run check
npm run preview
```

Open `http://127.0.0.1:4173/the-vael/`. Every listening link works without JavaScript. JavaScript only adds native sharing or clipboard sharing. The page uses no trackers, cookies, remote fonts, autoplay or embedded players.

## Publish

The generated `dist/` directory is the complete public site. The existing Pages configuration stays unchanged. The included workflow builds, validates and uploads only `dist/`, but **runs only when explicitly started**. Pushes and PR merges do not publish the site automatically. No third-party credentials are required.

Use a focused feature branch, meaningful commits and a draft PR; run `npm run build` and `npm run check` locally, review the result, mark ready and merge normally. When publication is explicitly requested, start **Publish listening hub** from GitHub's Actions UI on `main`, or run:

```sh
gh workflow run pages.yml --repo Evekiio/the-vael --ref main
```

Then inspect that run and the live site before claiming publication succeeded. The current site stays live until a later successful manual publication. Do not change Pages hosting settings as part of ordinary source updates. This manually started publisher is an explicit exception to the no-automatic-Actions policy.

## Artwork and rights

Existing The Vael artwork is reused with responsive format/size exports. The primary logo is the exact approved outlined SVG. This public repository does not grant a license to reproduce the artist name, music, artwork, logo or character. All rights are retained by their respective rights holders. No font binaries, unreleased songs or private library records are included.

## Validation

`npm run check` verifies local resources, the project-site base path, primary heading, metadata and asset budget. Browser checks should cover desktop and narrow layouts, keyboard access, reduced motion, sharing and all destination links before a release is called verified. A build or a deployment alone does not prove audience growth.
