# Escalation Policy — camunda-docs

## Rules

- Changes to pages under `docs/self-managed/reference-architecture/` or `versioned_docs/*/self-managed/reference-architecture/` ALWAYS require human review from the Infrastructure Experience team.
- Changes to pages that reference `camunda/camunda-deployment-references` or `camunda/c8-sm-checks` ALWAYS require human review from the Infrastructure Experience team.
- NEVER remove a documented installation, upgrade, failover, or failback step without a replacement step or a migration note.
- NEVER remove or rename a documented Helm value or configuration key without a note that tells the reader what to use instead.
- Changes to release notes, announcements, or supported-environment pages ALWAYS require human review.

## Threshold

escalation_threshold: 0.55

## Rationale

This repository holds user-facing documentation. Most changes are low risk, but errors in deployment, failover, and configuration pages cause outages in customer installations.
