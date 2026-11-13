# Nihongo Month

A self-paced Japanese course with two paths, then a foundation for serious study. Everything you do is stored on your own device. Nothing is uploaded.

- **Work & life** (`…/#work`): for leading courier operations at Uber Japan, plus daily life.
- **Home & baby** (`…/#home`): for daily life at home with a baby.

Each path keeps its own progress, so two people can share a device. Kana and Go deeper are shared; the kanji sets and roadmap tips adapt to the path.

## What's in it

- **Month one, work** (`src/data/path.ts`): 25 units and 5 checkpoints, one step a day for 30 days. Work units cover greetings, meetings, Slack and email, keigo, phone calls and after-work drinks, plus four units for leading courier operations: couriers and onboarding, supply and earnings, safety and policy, and leading the team. Life units cover numbers, shopping, directions, eating out, home admin, small talk and emergencies. Each unit has phrases, a pattern note and one real-world task. Nothing is date-locked; it only shows how you compare with a 30-day pace.
- **Month one, home** (`src/data/home.ts`): 25 units and 5 checkpoints: greetings, the baby and kind strangers, the drugstore, the stroller, the paediatrician, eating out, the ward office, neighbours, parks and other parents, nursery and childcare, baby words, the supermarket, appointments by phone, asking for help, baby emergencies, milestones and festivals, family, and manners. Some life units are shared with the work path.
- **Kana**: 13 hiragana and katakana lessons with a quiz each.
- **Go deeper** (`src/data/deeper.ts`): 14 grammar modules (N5 to N4), four kanji sets, and a roadmap through about N2.

Phrases follow a spaced-repetition schedule (1, 3, 7, 16, 35 days), so reviews appear just before you'd forget.

## Run it

```
npm ci
npm run dev
```

Add `?date=2027-04-03` to the address to preview any date.

## Put it on your phone: GitHub Pages

`.github/workflows/pages.yml` builds and deploys the app on every push to `main`.

1. GitHub Pages needs a public repository, or a paid GitHub plan for a private one. Either way, the published site is reachable by anyone with its address.
2. In the repository, go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Run the workflow once from the **Actions** tab (or push to `main`).
4. The site is at `https://<your-username>.github.io/<repository-name>/`. Add `#work` or `#home` for each person's path.
5. Install it: iPhone: Safari > Share > Add to Home Screen. Android: Chrome > menu > Install app.

Cloudflare Pages also works: build command `npm run build`, output directory `dist`.

Clearing the browser's website data erases your progress on that device.

## Hosted copy

`npm run artifact` builds the whole app into one file, `artifact/nihongo-month.html`, which is published as a private claude.ai page. Progress there is kept in that page's browser storage, separately from a Cloudflare copy.

## Audio

Every phrase, kana character and practice word has a recording in `public/voice/`, made with Open JTalk (a free, offline Japanese voice), so audio works on any phone without a Japanese text-to-speech voice installed. After adding content, run `scripts/gen-voice.py` (instructions at the top of the file) to record the new text. Phrases with a human-voice clip in `public/audio/` use that instead; `npm run audio` on a Mac records more of those with the Kyoko voice. If neither exists, the app falls back to the device's own Japanese voice.

## Editing content

Everything is plain text in `src/data/`. Put each phrase on one line so the audio script can find it. The Japanese was written without a native speaker's review, so ask a colleague to check the work phrases.
