# Production-Style DevOps Platform on AWS

A 3-tier notes app (React + Node.js + PostgreSQL) that goes from `git push` to a live Kubernetes deployment automatically.

> **Honest note:** This is a production-style learning project, not real production. It has no real users or traffic, and limitations are documented in `docs/`.

## Planned stack

- CI: GitHub Actions (lint, test, build, Trivy, gitleaks, push to GHCR)
- Infrastructure: Terraform on AWS (VPC, EC2, IAM, S3 remote state)
- Configuration: Ansible
- Orchestration: self-managed Kubernetes (kubeadm), Helm, ArgoCD (GitOps)
- Ingress and TLS: ingress-nginx, cert-manager
- Observability: Prometheus, Grafana, Loki, Alertmanager
- Security: GitHub OIDC to AWS, sealed secrets, NetworkPolicies, RBAC

## Repo layout

| Path | Purpose |
|---|---|
| `app/` | Frontend and backend source |
| `infra/terraform/` | AWS infrastructure |
| `ansible/` | Node configuration and cluster bootstrap |
| `k8s/` | Helm chart and manifests |
| `.github/workflows/` | CI/CD pipelines |
| `docs/` | Architecture, decisions, runbooks, incidents |

## Status

Phase 0 (repo foundation) in progress.
