# Agents Baseline

Minimum roles expected in this project:

1. Architecture owner
- Defines module structure and technical constraints.

2. Subject experts
- French, Maths/Sciences, SES content quality and level alignment.

3. Technical pedagogical consultant
- Aligns validation logic with pedagogical goals.

4. Global project auditor
- Performs periodic project-level audits (workflow, tests, security, accessibility, pedagogy).

Mandatory behaviors:
- Use drafts in `docs/modules/*.md` as source of truth for content.
- Keep HTML synchronized with drafts.
- Run test suite before release.
- Respect global audit gate on important releases.
- Keep validation policies separated by subject:
  - French modules: enforce accents, leading uppercase, and ending punctuation for sentence answers.
  - French `write` steps can use progressive hints in 3 phases:
    - `hint`/`hint1` or `hintLight` (light clue),
    - `hint2` or `hintGuided` (clearer guidance after failures),
    - `hint3` or `hintSolution`/`solutionHint` (copyable model answer, late fallback).
  - Non-French modules: keep tolerance on form when not explicitly targeted by the exercise objective.
