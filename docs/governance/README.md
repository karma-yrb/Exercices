# Governance Baseline (Versioned)

This folder contains the minimum governance baseline that must stay versioned in git.

Why:
- `.github/agents/`, `.github/context/`, and `.github/copilot-instructions.md` are local-only in this project.
- Audits still need a reproducible public baseline in the repository.

Contents:
- `AGENTS_BASELINE.md`: required roles and responsibilities.
- `CONTEXT_BASELINE.md`: minimum context contract needed by agents.

Rule:
- Keep private/family details in local-only files.
- Keep process-critical governance here so a clean clone remains auditable.
