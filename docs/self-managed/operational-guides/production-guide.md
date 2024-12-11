---
id: production-guide
title: "Helm Chart Production Guide"
sidebar_label: "Helm Chart Production Guide"
description: "Learn how to set up the helm chart in a production setting."
---

## Overview

The Base Production Setup provides a simplified and streamlined 3-pod deployment architecture for core Camunda 8 applications. This setup minimizes complexity while offering a reliable foundation for most production use cases.

## Architecture Overview

Below is the high-level architecture diagram for the Base Production Setup:

[Architecture Diagram Placeholder]

- Supported Components:
  Camunda Platform Core Applications: Zeebe, Tasklist, Operate
- Ingress Controller (e.g., Nginx)
- External Dependencies:
  PostgreSQL (for persistent data storage)
  Elasticsearch/OpenSearch (for indexing and analytics)
  Keycloak (for authentication/authorization)
- Other Notes:
  The Optimize importer requires to be in a separate pod.

## Step-by-Step Installation Guide

### TLS (terminated at ingress)

### DNS setup (exposing your domain)

### Deploying with OIDC

### External Elasticsearch

### External PostgreSQL

(all external charts should be disabled)

### Upgrading the chart (disable secret generation on upgrades)

Make sure auto-generated secrets are mentioned by default in all relevant components.
