// Builds the app as one self-contained HTML file (artifact/nihongo-month.html) for hosting as a private claude.ai page.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'

execFileSync('npx', ['vite', 'build', '--mode', 'artifact', '--outDir', 'dist-artifact', '--emptyOutDir'], { stdio: 'inherit' })
const files = readdirSync('dist-artifact/assets')
const js = files.filter(f => f.endsWith('.js'))
if (js.length !== 1) throw new Error(`expected one script, got ${js.join(', ')}`)
const css = files.filter(f => f.endsWith('.css')).map(f => readFileSync(`dist-artifact/assets/${f}`, 'utf8')).join('\n')
const script = readFileSync(`dist-artifact/assets/${js[0]}`, 'utf8').replace(/<\/script/gi, '<\\/script')
const page = `<title>Nihongo Month</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@700&family=Zen+Kaku+Gothic+New:wght@400;700&display=swap">
<style>${css}</style>
<div id="root"></div>
<script type="module">${script}</script>
`
mkdirSync('artifact', { recursive: true })
writeFileSync('artifact/nihongo-month.html', page)
console.log(`artifact/nihongo-month.html: ${(page.length / 1024).toFixed(0)} KB`)
