---
id: zeebe-api-rest-overview
title: "Overview"
description: "Interact with Zeebe clusters. Run user task state operations for Zeebe user tasks."
---

## Introduction

The Zeebe REST API is a REST API designed to interact with the Zeebe workflow engine.

## Context paths

### SaaS

Find your region and cluster ID under **Connection information** in your client credentials (revealed when you click on your client under the **API** tab within your cluster).

Example path: `https://${REGION}.zeebe.camunda.io:443/${CLUSTER_ID}/v1/`

### Self-Managed

The context path should match the host and path defined in your Zeebe Gateway [configuration](/self-managed/setup/guides/ingress-setup.md). The path used here is the default.

Example path: `http://localhost:8080/v1/`
