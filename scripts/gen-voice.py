"""Record every phrase, kana character and practice word in src/data/*.ts to public/voice/<key>.mp3.

Uses Open JTalk (pyopenjtalk), a free offline Japanese voice, so phones don't need a Japanese
text-to-speech voice of their own. Existing files are kept, so re-run it after adding content:

    python3 -m venv .venv && .venv/bin/pip install pyopenjtalk numpy
    .venv/bin/python scripts/gen-voice.py        (needs ffmpeg on the PATH)

The file key is voiceKey() in src/store.ts: FNV-1a over the UTF-8 text, as 8 hex digits.
"""
import glob, os, re, subprocess, tempfile, wave
import numpy as np
import pyopenjtalk

OUT = 'public/voice'


def voice_key(text: str) -> str:
    h = 0x811C9DC5
    for b in text.encode('utf-8'):
        h ^= b
        h = (h * 0x01000193) & 0xFFFFFFFF
    return f'{h:08x}'


def texts():
    found = []
    for f in sorted(glob.glob('src/data/*.ts')):
        src = open(f, encoding='utf-8').read()
        # Phrases: { id: '…', ja: '…', … say: '…' } on one line. The reading (say) is what gets spoken.
        for line in src.splitlines():
            m = re.search(r"\{ id: '[a-z]+-[a-z0-9-]+', ja: '([^']+)'", line)
            if m:
                say = re.search(r"say: '([^']+)'", line)
                found.append(say.group(1) if say else m.group(1))
        # Kana characters: k('あ:a い:i …'). Marks like っ:(pause) are not spoken.
        for m in re.finditer(r"k\('([^']+)'\)", src):
            for pair in m.group(1).split():
                c, r = pair.split(':')
                if not r.startswith('('):
                    found.append(c)
        # Kana practice words: { w: 'あい', r: … }
        found += re.findall(r"\{ w: '([^']+)'", src)
    return list(dict.fromkeys(found))


def speakable(text: str) -> str:
    # Open JTalk reads … and placeholder dots badly, so pause there instead.
    return text.replace('…', '、').replace('〇〇', 'なになに')


def main():
    os.makedirs(OUT, exist_ok=True)
    made = 0
    all_texts = texts()
    for text in all_texts:
        out = f'{OUT}/{voice_key(text)}.mp3'
        if os.path.exists(out):
            continue
        x, sr = pyopenjtalk.tts(speakable(text))
        peak = float(np.abs(x).max()) or 1.0
        y = (x / peak * 29000).astype(np.int16)  # about -1 dBFS
        with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
            with wave.open(tmp.name, 'wb') as w:
                w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(y.tobytes())
            subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', tmp.name, '-ac', '1', '-ar', '24000', '-b:a', '40k', out], check=True)
        made += 1
    print(f'{len(all_texts)} texts, {made} new recordings in {OUT}')


if __name__ == '__main__':
    main()
