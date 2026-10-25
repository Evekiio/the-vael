import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(await readFile(path.join(root, 'content.json'), 'utf8'));
const escape = (value) => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const external = (url) => {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:') throw new Error(`HTTPS link required: ${url}`);
  return escape(parsed.href);
};
const youtube = data.socials.find(s => s.label === 'YouTube');
if (!youtube) throw new Error('YouTube channel required for follow action');
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const play = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7z" fill="currentColor"/></svg>';
const icons = {
  spotify: '<circle cx="12" cy="12" r="9"/><path d="M6 9c4-1.5 8-1 12 1M7 12c4-1 7-.5 10 1M8 15c3-.7 5-.4 8 1"/>',
  youtube: '<rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
  music: '<path d="M10 17V5l10-2v12M10 8l10-2"/><ellipse cx="7" cy="17" rx="3" ry="2"/><ellipse cx="17" cy="15" rx="3" ry="2"/>',
  headphones: '<path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="12" width="4" height="8" rx="2"/><rect x="17" y="12" width="4" height="8" rx="2"/>'
};
const icon = (name) => `<svg class="platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The Vael | Official Music & Full Videos</title>
  <meta name="description" content="${escape(data.description)}">
  <meta name="theme-color" content="#0b1016">
  <meta name="color-scheme" content="dark">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <link rel="canonical" href="${external(data.url)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="The Vael">
  <meta property="og:title" content="The Vael | Official Music & Full Videos">
  <meta property="og:description" content="${escape(data.description)}">
  <meta property="og:url" content="${external(data.url)}">
  <meta property="og:image" content="${external(data.url)}assets/share.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675">
  <meta property="og:image:alt" content="The Vael's golden skyline and violet storm artwork.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="The Vael | Official Music & Full Videos">
  <meta name="twitter:description" content="${escape(data.description)}">
  <meta name="twitter:image" content="${external(data.url)}assets/share.jpg">
  <link rel="icon" href="assets/favicon.png" type="image/png">
  <link rel="preload" as="image" href="assets/hero.webp" fetchpriority="high">
  <link rel="stylesheet" href="styles.css">
  <script type="application/ld+json">${JSON.stringify({ '@context':'https://schema.org', '@type':'MusicGroup', name:data.name, url:data.url, description:data.description, image:`${data.url}assets/share.jpg`, sameAs:data.socials.map(s=>s.url) }).replace(/</g,'\\u003c')}</script>
  <script src="app.js" defer></script>
</head>
<body id="top">
<a class="skip-link" href="#main">Skip to music</a>
<header class="site-header wrap">
  <a class="brand" href="#top" aria-label="The Vael home"><img src="assets/logo.svg" alt="The Vael" width="210" height="70"></a>
  <nav aria-label="Main"><a href="#listen">Listen</a><a href="#discover">Discover</a><a href="#connect">Connect</a></nav>
  <button class="share-button" type="button" aria-label="Share The Vael" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 15V3m-4 4 4-4 4 4M5 12v8h14v-8"/></svg><span>Share</span></button>
</header>
<main id="main">
  <section class="hero" aria-labelledby="hero-title">
    <img class="hero-art" src="assets/hero.webp" alt="" width="1672" height="941" fetchpriority="high">
    <div class="hero-shade"></div>
    <div class="hero-content wrap">
      <p class="eyebrow"><span class="small-diamond" aria-hidden="true"></span> The official listening room</p>
      <h1 id="hero-title">Heavy sound.<br>Soulful vocals.<br><em>A mind of its own.</em></h1>
      <p class="hero-description">Melodic metalcore meets conscious hip-hop.<br>Dark humor. Human contradictions. Joy in the cracks.</p>
      <div class="hero-listen"><p class="hero-song">Start here: ${escape(data.feature.title)}</p><div class="hero-actions"><a class="button gold" href="${external(data.feature.watch)}" aria-label="Watch ${escape(data.feature.title)} on YouTube (${escape(data.feature.duration)})">${play} Watch Blueprints (${escape(data.feature.duration)})</a><a class="text-link" href="${external(data.feature.listen)}">Listen on Spotify ${arrow}</a></div></div>
      <div class="hero-note"><span class="line" aria-hidden="true"></span><span>Music & a world to get lost in.</span></div>
    </div>
    <div class="hero-caption" aria-hidden="true">Light. Shadow. Room for both.</div>
  </section>

  <section id="listen" class="listening-section wrap" aria-labelledby="listen-title">
    <div class="section-heading"><div><p class="eyebrow">01 / Start here</p><h2 id="listen-title">One song. A way in.</h2></div><p>No homework required.<br>Just press play.</p></div>
    <div class="listening-grid">
      <article class="feature-card">
        <a class="feature-image" href="${external(data.feature.watch)}" aria-label="Watch ${escape(data.feature.title)} on YouTube"><img src="${escape(data.feature.image)}" alt="${escape(data.feature.alt)}" width="1280" height="720" loading="lazy"><span class="play-disc">${play}</span><span class="image-label">Full song / Official visualizer</span></a>
        <div class="feature-copy"><p class="eyebrow">Your first listen</p><h3>${escape(data.feature.title)}</h3><p>${escape(data.feature.description)}</p><div class="feature-actions"><a class="button gold" href="${external(data.feature.watch)}">${play} Watch the full song</a><a class="text-link" href="${external(data.feature.listen)}">Listen on Spotify ${arrow}</a></div><a class="text-link follow-link" href="${external(youtube.url)}">Subscribe on YouTube for the next release ${arrow}</a></div>
      </article>
      <article class="album-panel"><p class="eyebrow">Stay for the album</p><h3>${escape(data.album.title)}</h3><p class="album-description">${escape(data.album.description)}</p><div class="platform-list">${data.album.links.map(p=>`<a class="platform-link" href="${external(p.url)}">${icon(p.icon)}<span><strong>${escape(p.label)}</strong><small>${escape(p.detail)}</small></span>${arrow}</a>`).join('')}</div><p class="album-footnote">The album, on your terms.</p></article>
    </div>
  </section>

  <section id="discover" class="discover-section wrap" aria-labelledby="discover-title">
    <div class="section-heading"><div><p class="eyebrow">02 / Follow a different feeling</p><h2 id="discover-title">There’s more than one way in.</h2></div><a class="text-link" href="https://www.youtube.com/playlist?list=PLE-0phvl3zcE">The starter playlist ${arrow}</a></div>
    <div class="song-grid">${data.songs.map((s,i)=>`<a class="song-card" href="${external(s.url)}"><div class="song-image"><img src="${escape(s.image)}" alt="${escape(s.alt)}" width="960" height="540" loading="lazy"><span class="song-play">${play}</span></div><div class="song-copy"><div><p class="eyebrow">${escape(s.label)}</p><h3>${escape(s.title)}</h3></div>${arrow}</div></a>`).join('')}</div>
  </section>

  <section id="connect" class="connect-section wrap" aria-labelledby="connect-title">
    <div class="section-heading"><div><p class="eyebrow">03 / Keep in touch</p><h2 id="connect-title">Find The Vael.</h2></div><p>The music. The art.<br>The occasional inner argument.</p></div>
    <div class="social-grid">${data.socials.map(s=>`<a class="social-link" href="${external(s.url)}"><span><strong>${escape(s.label)}</strong><small>${escape(s.detail)}</small></span>${arrow}</a>`).join('')}</div>
  </section>

  <section class="about-section wrap" aria-label="About The Vael">
    <div><p class="eyebrow">Behind the music</p><p class="about-lead">A human perspective.<br>An illustrated world.</p></div>
    <div class="about-copy"><p>The Vael is Mr. Riddle’s artist project: everyday struggles, sharp contradictions and the choices in between, told through music and an expressive 2D anime world.</p><p>Human-led, AI-assisted. The creator writes the lyrics and directs each release. Vocals and instrumentation are AI-generated; AI also contributes to language and visuals. Vael is fictional. Song narrators are not automatically autobiographical.</p><a class="text-link" href="mailto:${escape(data.contact)}">Get in touch ${arrow}</a></div>
  </section>
</main>
<footer class="site-footer wrap"><a class="brand" href="#top" aria-label="Back to top"><img src="assets/logo.svg" alt="The Vael" width="156" height="52" loading="lazy"></a><p>© ${new Date().getUTCFullYear()} The Vael</p><a href="privacy.html">Privacy</a><a class="back-top" href="#top">Back to top ↑</a></footer>
<p id="share-status" class="share-status" role="status" aria-live="polite"></p>
</body></html>`;
await mkdir(path.join(root,'dist'),{recursive:true});
await writeFile(path.join(root,'dist','index.html'),html);
for (const file of ['styles.css','app.js','privacy.html','404.html','robots.txt','.nojekyll']) await cp(path.join(root,file),path.join(root,'dist',file));
await cp(path.join(root,'assets'),path.join(root,'dist','assets'),{recursive:true});
await writeFile(path.join(root,'dist','sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${data.url}</loc></url><url><loc>${data.url}privacy.html</loc></url></urlset>`);
console.log('Built dependency-free static hub in dist/');

