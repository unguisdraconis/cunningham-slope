# Cunningham Dancer Spans

## Overview

Cunningham Dancer Spans is a learning visualization that uses a React, D3, and TypeScript slope chart to compare the first and last recorded years for 162 embedded dancer records associated with Merce Cunningham.

It is a secondary artifact in Jeremiah King's broader Cunningham visualization experiments. It preserves a particular visualization form and learning stage rather than presenting a comprehensive historical analysis.

## Live demo

[Open Cunningham Dancer Spans](https://unguisdraconis.github.io/cunningham-slope/)

![Interactive Cunningham Dance Spans comparison chart.](docs/images/cunningham-slope.png)

## What the chart shows

- The left endpoint is a dancer's first recorded year.
- The right endpoint is the dancer's last recorded year.
- Line slope represents the elapsed recorded-year span: last year minus first year.
- Color bins group spans into broad ranges.
- Era buttons filter records by first recorded year.
- Eight records with the longest calculated spans are highlighted. Because the fixed eight-record cutoff can divide a tie, it should not be read as including every dancer tied at the boundary.
- Donald McKayle is separately featured as an example of why a recorded span is not a measure of artistic significance.

## Why “tenure” is qualified

The visualization simplifies each dancer to one first-to-last recorded span. Interrupted periods are collapsed into a single span, and same-year records have a calculated span of zero. The chart therefore should not be read as a complete record of uninterrupted company tenure.

## Data provenance

The embedded dancer data is derived from Cunningham dancer records associated with:

> Clarisse Bardiot. _Merce Cunningham_. Version 1. Zenodo. [doi:10.5281/zenodo.3774548](https://doi.org/10.5281/zenodo.3774548).

The relevant upstream file is `donnees-danseurs.csv`. The source dataset is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

This repository does not contain the original CSV or preserve the original transformation process. The embedded `rawData` array should be treated as a simplified project representation rather than a complete reproduction of the source data. Exact row-for-row equivalence has not been independently verified.

## Data transformation

The current model keeps one object per dancer with a name, first recorded year, and last recorded year. It calculates elapsed span as:

```text
last recorded year - first recorded year
```

Important simplifications are preserved:

- interrupted histories collapse into one first-to-last span;
- RUG and company distinctions are not fully represented;
- early-years records may predate the formal 1953 formation of the Merce Cunningham Dance Company;
- some names were manually normalized;
- possible transcription issues remain in the embedded data.

## TypeScript

This project reflects emerging TypeScript use through a typed dancer interface, typed component props and state, typed era tuples, and D3 calculations within typed React code. It is best understood as TypeScript exposure within a learning visualization rather than a claim of advanced TypeScript expertise.

## AI assistance

Claude Opus 4.6 was used as an AI-assisted coding tool during the project. Jeremiah King directed and reviewed the visualization and made the final project decisions.

## Accessibility and limitations

- The SVG has a semantic title and description.
- A live text summary reports the active era filter, displayed dancer count, and recorded-span definition.
- Native era buttons expose their active state and have visible keyboard focus.
- Exact details for most individual lines remain pointer-oriented.
- The visualization retains its historical fixed desktop-size SVG.
- No formal WCAG conformance claim is made.

## Local use

```text
npm ci
npm run dev
npm run lint
npm run build
```

## Licensing

**Dataset:** CC BY 4.0 under the cited Zenodo record.

**Application code:** No separate repository software license is currently specified.
