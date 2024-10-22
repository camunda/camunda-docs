---
id: troubleshoot-proxy-configuration
title: "Troubleshoot proxy configuration issues"
sidebar_label: "Proxy configuration"
description: "Troubleshooting guide for issues caused by incorrect proxy configuration in Web Modeler."
---

Troubleshoot and resolve issues in Web Modeler caused by incorrect or incomplete proxy configuration.

## Issue

Users experience a variety of failures when Web Modeler attempts to communicate with external services. These issues can manifest as:

- Failed authentication due to the inability to access the JWKS (JSON Web Key Set) endpoint. Error message: “Expected 200 OK from the JSON Web Key Set HTTP response.”
- Failure to reach other external services, such as the Camunda Marketplace.

## Cause

Proxy settings must be correctly configured for Web Modeler to route outgoing requests through a network proxy. Common issues occur when:

- The proxy server is not properly configured or unreachable.
- Requests to external services are being blocked by the proxy configuration.
- Authentication requests, such as those to the OIDC provider, fail when the JWKS endpoint is unreachable via the proxy.

## Resolution

Ensure correct proxy configuration for both `webapp` and `restapi` components.

- For the `webapp` component, proxy configuration is handled via environment variables (`http_proxy`, `https_proxy`, `no_proxy`).
- For the `restapi` component, proxy configuration is handled via JVM settings, such as JAVA_OPTS (e.g., -Dhttp.proxyHost, -Dhttps.proxyPort).
