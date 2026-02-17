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
- Cloud tracking is disabled in local runtime by default (`file://`, `localhost`) unless explicitly allowed.
  - `TRACKING_ALLOW_LOCAL === true` is required to allow local sync.
  - `TRACKING_DISABLED === true` forces full tracking off.

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

## Tracking Context Source
- `subject` and `module` should be provided explicitly by module configuration when possible:
  - `APP_CONFIG.TRACKING_SUBJECT`
  - `APP_CONFIG.TRACKING_MODULE`
- URL parsing is fallback only.
- Device identity can be pinned with:
  - `APP_CONFIG.TRACKING_DEVICE_ID` (optional stable override per trusted device)
- Test devices can be excluded from cloud tracking:
  - default exclusion prefix: `dev_tester_`
  - optional explicit list: `APP_CONFIG.TRACKING_TEST_DEVICE_IDS`
  - optional custom prefix: `APP_CONFIG.TRACKING_TEST_DEVICE_PREFIX`

## Consent
- Consent is required before enabling IP tracking.
- In family usage, consent is managed by the parent/guardian.
- In non-family usage, consent must be explicit and documented.

### Technical Consent Proof (when IP is enabled)
- If `TRACKING_INCLUDE_IP === true`, consent proof fields must be configured:
  - `TRACKING_CONSENT_MODE`
  - `TRACKING_CONSENT_AT`
  - `TRACKING_CONSENT_ACTOR`
- If one of these fields is missing/invalid, IP must not be sent.

### Private Family Mode (project decision)
- This project is operated in private family mode.
- Parent/guardian acts as data controller and grants consent by configuration.
- No separate in-app consent collection step is required in this mode.

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
- A session without timely completion/abandon signal must be treated as null and must not be sent.
  - Technical rule:
    - `TRACKING_NULL_SESSION_TIMEOUT_MIN` (optional) defines the max session age before nullification.
    - Default fallback is 360 minutes (6h) if not configured.
- Tester sessions must be neutralized at source (not sent to cloud tracking endpoint).

## Non-Regression Checks
- Tests must verify:
  - IP is absent by default.
  - IP appears only in opt-in mode.
  - `actor_id`, `device_id`, and `session_id` are always present in payload.
