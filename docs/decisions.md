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

## 003: Accept base-image CVEs found by Trivy (for now)

- **Decision:** Accept HIGH findings in base images for local development; revisit in CI.
- **Why:** Backend: 11 HIGH, all inside npm bundled with the node image (not used at runtime). Frontend: 44 HIGH, all Alpine OS packages in the nginx base image. 0 CRITICAL in both. A rebuild with --pull showed no newer base image yet.
- **Alternatives:** Multi-stage backend to drop npm from the final image; apk upgrade in the Dockerfile; distroless base.
- **Trade-off:** Known HIGH findings remain until upstream updates. Phase 2 adds scheduled rebuilds and a Trivy gate.
