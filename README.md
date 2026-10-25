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

The committed `dist/` directory is the complete public site. Configure GitHub Pages to deploy via GitHub Actions using the included workflow. The workflow builds, validates and uploads only `dist/`. A push to `main` deploys the site. `workflow_dispatch` supports a manual deployment. No third-party credentials are required.

If uploading through GitHub's web UI instead, publish the **contents** of `dist/` to `main` and configure Pages to deploy from `main` and `/ (root)`.

## Artwork and rights

Existing The Vael artwork is reused with responsive format/size exports. The primary logo is the exact approved outlined SVG. This public repository does not grant a license to reproduce the artist name, music, artwork, logo or character. All rights are retained by their respective rights holders. No font binaries, unreleased songs or private library records are included.

## Validation

`npm run check` verifies local resources, the project-site base path, primary heading, metadata and asset budget. Browser checks should cover desktop and narrow layouts, keyboard access, reduced motion, sharing and all destination links before a release is called verified. A build or a deployment alone does not prove audience growth.
