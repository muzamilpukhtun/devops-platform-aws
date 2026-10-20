# Production-Style DevOps Platform on AWS

A small 3-tier notes app (React, Node.js, PostgreSQL) used as a vehicle to learn and demonstrate DevOps practices, built step by step and documented in public.

> **Honest note:** This is a production-style learning project, not real production. It has no real users or traffic. Limitations are documented in `docs/`.

## Architecture (current)


## What works today

- Node.js + Express backend: `GET/POST/DELETE /notes`, `GET /health` (pings the database, returns 503 if it is down)
- React frontend (Vite)
- PostgreSQL 17 with a named volume, data survives `docker compose down`
- Backend Dockerfile: pinned base image, `npm ci --omit=dev`, non-root numeric user, `HEALTHCHECK`
- Docker Compose: `db` + `backend`, `depends_on: service_healthy`, DB port not exposed to the host
- Secrets in `.env` (gitignored), `.env.example` committed
- Lint: Dockerfile checked with hadolint
- Frontend: multi-stage build, served by nginx-unprivileged (non-root)
## Run it locally

Requirements: Docker with the Compose plugin.

```bash
cp .env.example .env     # then set a real POSTGRES_PASSWORD in .env
docker compose up -d --build
curl -i localhost:3000/health
```

Stop (keeps data): `docker compose down`. Stop and delete data: `docker compose down -v`.

## Repo layout

| Path | Purpose |
|---|---|
| `app/backend/` | Express API and Dockerfile |
| `app/frontend/` | React app (Vite) |
| `docker-compose.yml` | Local stack: db + backend |
| `infra/terraform/` | AWS infrastructure (planned) |
| `ansible/` | Node configuration (planned) |
| `k8s/` | Helm chart and manifests (planned) |
| `.github/workflows/` | CI pipelines (planned) |
| `docs/` | Decisions, runbooks, incident reports |

## Roadmap

- [x] Phase 0: repo foundation, local app, compose
- [x] Phase 1: Dockerfiles (backend done, frontend with nginx next)
- [ ] Phase 2: CI with GitHub Actions (lint, test, build, Trivy, gitleaks)
- [ ] Phase 3: Terraform on AWS
- [ ] Phase 4: Ansible and kubeadm cluster
- [ ] Phase 5-6: Kubernetes, Helm, ArgoCD
- [ ] Phase 7-10: monitoring, security hardening, backups, failure drills

## Lessons learned so far

- An unhandled `error` event on the `pg` pool crashed the app when the database went down. Fixed with `pool.on('error')`, verified with a 200 -> 503 -> 200 test.
- A container being "Up" does not mean the app is healthy. Added a `HEALTHCHECK` and tested it by stopping the database.

## Author

Muzamil, software engineering graduate learning DevOps in public.
