# Decisions

## 001: Development environment

- **Decision:** ...
- **Why:** ...
- **Alternatives:** ...
- **Trade-off:** ...

## 002: Ignore hadolint DL3025 on backend HEALTHCHECK

- **Decision:** Keep shell form for HEALTHCHECK CMD.
- **Why:** The command uses `|| exit 1`, which needs a shell.
- **Alternatives:** JSON form with `node -e` fetch, more verbose.
- **Trade-off:** One lint warning stays, accepted knowingly.
