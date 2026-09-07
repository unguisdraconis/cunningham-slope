# Preserved Cunningham source data

These files preserve source evidence for the Cunningham visualization experiments. They are unchanged copies of files published with:

> Clarisse Bardiot. *Merce Cunningham*. Version 1. Zenodo. [doi:10.5281/zenodo.3774548](https://doi.org/10.5281/zenodo.3774548). Published April 28, 2020.

The dataset is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). This dataset license does not apply to the application code, for which no separate repository software license is currently specified.

## File verification

The timestamps below are filesystem last-write times retained by the repository maintainer. They are documented as **original download timestamps preserved by the repository maintainer**; they are not the dataset publication date or the later Git commit date.

| File | Size | Preserved download timestamp | MD5 | SHA-256 | Zenodo verification |
| --- | ---: | --- | --- | --- | --- |
| `donnees-danseurs.csv` | 3,975 bytes | `2026-02-22T07:45:34.8777546-05:00` | `6df22832d9cf076bd9956170dcc1e7e0` | `48c16d7c453a00927c2a54bb6859364ca012aacf74d9e9b295e1d87e7ffe4f52` | Byte-identical to the Version 1 Zenodo artifact |
| `donnees-cunningham.csv` | 61,685 bytes | `2026-02-22T07:46:14.3001736-05:00` | `2fa9f8a4ab76d5a8c3fe163aa11e1709` | `9b922c8447c68e067e131cfdb5a5a99514047ecc7f655e1d5b59ea79eb2c0ca3` | Byte-identical to the Version 1 Zenodo artifact |

The files were added to Git in commit `4eac856655156d9278e3af2e3d7d85cf2d7652fa` on September 7, 2026. Their committed Git blobs and current working copies have the same byte counts and cryptographic hashes.

## Roles in this project

- `donnees-danseurs.csv` is a tab-separated table with 162 data rows and the columns `Nom`, `in`, and `out`. It is the source representation associated with the application's embedded dancer array.
- `donnees-cunningham.csv` is a tab-separated works-and-credits table. It contains 183 rows with a spectacle title plus continuation rows for additional credits. The slope-chart application does not parse or otherwise use this file at runtime.

The source files remain documentation and audit evidence. The application continues to use the separate `rawData` array embedded in `src/SlopeChart.tsx`.

## Embedded dancer comparison

The preserved dancer file and `rawData` can be reconciled completely at the current simplified-model level:

- both contain 162 records in the same order;
- all 162 `in` values exactly match `inYear`;
- all 162 `out` values exactly match `outYear`;
- 161 names match exactly;
- one source name was shortened in the embedded array.

| Source name | Embedded name | Classification | Analytical effect |
| --- | --- | --- | --- |
| `Frédéric (Foofwa d'Imobilité) Gafner` | `Frédéric Gafner` | Intentional-looking name shortening; original intent was not recorded | None; the years remain `1991`–`1998` |

`Stanton Schumutz` has the same spelling in the preserved Zenodo file and the embedded array. It is therefore not a source-to-application transcription error. Any discrepancy with other historical references is a source-level question and remains unresolved here.

## Transformation boundary

The comparison establishes a direct column mapping—`Nom` to `name`, `in` to `inYear`, and `out` to `outYear`—plus the single name shortening above. No executable extraction script was preserved, so the historical act of creating the array is documented rather than rerun.

The dancer CSV is itself already simplified to one numeric `in`/`out` pair per person. It contains no category, RUG/company distinction, or multi-period history fields. Consequently:

- interrupted histories cannot be identified or reconstructed from this file alone;
- RUG-only, RUG-to-company, company, and early-years categories cannot be recovered from its schema;
- the application inherits the source file's single first-to-last span representation;
- same-year rows remain zero under the application's `outYear - inYear` elapsed-span calculation.

This note documents the relationship without turning the preserved files into a new runtime data pipeline.
