# Travel_Web

Luxury editorial travel website built with React + Vite + TypeScript.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Scroll sequence configuration

`ScrollSequenceHero` supports configurable frame loading:

- `frameCount` (default: `90`)
- `framePadding` (default: `4`)
- `frameStart` (default: `1`)
- `framePath` + `frameExtension` (default: `/frames/frame_0001.jpg ... frame_0090.jpg`)
- `framePathBuilder(index)` for custom naming patterns

Current app usage in `src/App.tsx` points to the exported sequence in `public/frames-source`.