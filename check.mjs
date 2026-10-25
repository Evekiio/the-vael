import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const html = await readFile(path.join(root,'dist/index.html'),'utf8');
assert.equal((html.match(/<h1\b/g)||[]).length,1,'Exactly one primary heading');
assert.ok(html.includes('https://evekiio.github.io/the-vael/'),'Canonical Pages path');
assert.ok(!html.includes('linktr.ee'),'No Linktree dependency');
assert.ok(!html.includes('<iframe'),'No embedded third-party tracking players');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const value=match[1];
  if (/^(https:|mailto:)/.test(value)) continue;
  assert.ok(!value.startsWith('/'),`Relative asset URL required: ${value}`);
  await stat(path.join(root,'dist',value));
}
for (const file of ['build.mjs','content.json','styles.css','app.js','privacy.html','404.html']) {
  assert.ok(!(await readFile(path.join(root,file),'utf8')).includes('\u2014'),`Prohibited punctuation: ${file}`);
}
const total=(await Promise.all((await readdir(path.join(root,'dist/assets'))).map(async f=>(await stat(path.join(root,'dist/assets',f))).size))).reduce((a,b)=>a+b,0);
assert.ok(total<2_500_000,`Image budget exceeded: ${total}`);
console.log(`Static checks passed. Assets: ${(total/1024).toFixed(0)} KiB. No runtime dependencies.`);
