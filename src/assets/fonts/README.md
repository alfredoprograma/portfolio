# Build-time fonts

Static TTF instances used **only** by the Open Graph card renderer
(`src/utils/og.ts`). Satori has no Brotli decompression, so it cannot read the
WOFF2 files that `@fontsource-variable/*` ships — those still power the actual
site rendering. These live under `src/` rather than `public/` so they are read
at build time and never served to browsers.

| File | Family / weight | Source |
| --- | --- | --- |
| `Archivo-SemiBold.ttf` | Archivo 600 | Google Fonts |
| `PublicSans-Regular.ttf` | Public Sans 400 | Google Fonts |
| `PublicSans-Medium.ttf` | Public Sans 500 | Google Fonts |

Both families are licensed under the SIL Open Font License 1.1; see
`OFL-Archivo.txt` and `OFL-PublicSans.txt`.
