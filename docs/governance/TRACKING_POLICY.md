# Tracking Policy

This policy defines the minimum safeguards for learner tracking data.

## Scope
- Applies to `assets/shared/engine.js` and `assets/shared/engine_math.js`.
- Applies to local/session tracking and optional cloud sync payload.

## Default Mode
- IP tracking is OFF by default.
- Technical rule:
  - `TRACKING_INCLUDE_IP` must be explicitly set to `true` to include `ip`.
  - If the flag is absent, false, or invalid, `ip` must not be sent.

## Allowed Fields
- Required payload fields:
  - `child`
  - `subject`
  - `module`
  - `mission_id`
  - `mission_title`
  - `status`
  - `date`
  - `start_time`
  - `end_time`
  - `duration`
  - `actor_id`
  - `device_id`
  - `session_id`
  - `event_time`
  - `tracking_version`
- Optional payload field:
  - `ip` (opt-in only via `TRACKING_INCLUDE_IP === true`)

## Consent
- Consent is required before enabling IP tracking.
- In family usage, consent is managed by the parent/guardian.
- In non-family usage, consent must be explicit and documented.

## Retention
- Keep only the minimum duration needed for pedagogical follow-up.
- Suggested retention baseline:
  - Learning progress events: 12 months max.
  - IP records (if enabled): 30 days max.
- A periodic cleanup process must be defined and executed.

## Operational Rules
- Do not add personal fields beyond this schema without updating this policy.
- Any tracking schema change must update:
  - this policy file,
  - tests validating tracking behavior.

## Non-Regression Checks
- Tests must verify:
  - IP is absent by default.
  - IP appears only in opt-in mode.
  - `actor_id`, `device_id`, and `session_id` are always present in payload.
