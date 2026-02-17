# AUDIT ENCODING 2026-02-17

## Update (Post-Fix)
- Date: `2026-02-17`
- Action: conversion des 5 fichiers `Zyvah/SES/Module_1/mission_1..5.html` en UTF-8 (décodage mixte robuste UTF-8/CP-1252).
- Vérification stricte: `mission_1..5` => `utf8=OK`, `U+FFFD=0`.
- Vérification validateur officiel: `tests/validators/encoding-validator.js` => `valid=true`, `errors=0`, `warnings=0`.

## Scope
- Target scope (same as CI encoding validator): `index.html`, `assets/`, `Lovyc/`, `Zyvah/`, `docs/modules/`
- Full repo spot-check on text files: `.html`, `.js`, `.css`, `.md`, `.json`

## Methods
- Official validator: `tests/validators/encoding-validator.js`
- Strict UTF-8 decode scan (no replacement fallback)
- Replacement character inventory (`U+FFFD`)

## Executive Summary
- Status: `KO` for production scope
- Root issue: mixed encoding in 5 files (`Zyvah/SES/Module_1/mission_1..5.html`)
- Severity: `P1` (user-facing text corruption in live pages)
- Outside these 5 files, no mojibake pattern found in UTF-8-valid files from target scope

## Findings

### 1) Official validator (production scope)
- Result: `valid=false`, `errors=200` (max cap reached), `warnings=1`
- Error stream starts on:
  - `Zyvah/SES/Module_1/mission_1.html:96:31`
  - with repeated `sequence suspecte "U+FFFD"` entries

### 2) Strict UTF-8 decode (target scope)
- Target files scanned: `57`
- Invalid UTF-8 files: `5`
  - `Zyvah/SES/Module_1/mission_1.html` (first invalid byte `E9` at index `4707`)
  - `Zyvah/SES/Module_1/mission_2.html` (first invalid byte `E9` at index `5265`)
  - `Zyvah/SES/Module_1/mission_3.html` (first invalid byte `E0` at index `4638`)
  - `Zyvah/SES/Module_1/mission_4.html` (first invalid byte `E9` at index `5511`)
  - `Zyvah/SES/Module_1/mission_5.html` (first invalid byte `E9` at index `4522`)

### 3) Replacement character inventory
- `mission_1.html`: `89`
- `mission_2.html`: `95`
- `mission_3.html`: `70`
- `mission_4.html`: `64`
- `mission_5.html`: `77`

First impacted lines:
- `mission_1.html`: lines `96, 104, 116, 123, 125`
- `mission_2.html`: lines `114, 121, 123, 126, 130`
- `mission_3.html`: lines `96, 102, 103, 108, 114`
- `mission_4.html`: lines `116, 120, 121, 127, 129`
- `mission_5.html`: lines `95, 98, 103, 106, 110`

### 4) UTF-8-valid files with mojibake patterns
- In target scope, UTF-8-valid files with mojibake regex matches: `0`

### 5) Full repo (non-production debt)
- Text files scanned: `199`
- Invalid UTF-8 files: `5` (same 5 SES files as above)
- Extra files containing literal replacement chars (`U+FFFD`) in docs/context:
  - `README.md` (`3`)
  - `.github/context/CURRICULUM.md` (`3`)
  - `.github/context/profils.md` (`6`)
- Note: pattern hits inside `tests/validators/*.js` include intentional tokens used by validators and normalization rules.

## Impact
- Browser renders UTF-8 because pages declare `<meta charset="UTF-8">`.
- Non-UTF-8 bytes inside the 5 SES files are decoded as replacement characters (`U+FFFD`).
- This explains persistent broken accents and symbols on-screen.

## Recommendation (next actions)
1. Convert the 5 files to UTF-8 and repair already-corrupted strings.
2. Re-run `node tests/test-runner.js` and confirm `ENCODAGE UTF-8: OK`.
3. Add a pre-commit gate for strict UTF-8 decode on `.html/.js/.css/.md/.json`.

## Commands Used
- `node -e "const V=require('./tests/validators/encoding-validator'); ..."`
- PowerShell strict decode scan with `System.Text.UTF8Encoding($false,$true)`
- PowerShell `U+FFFD` count per file
