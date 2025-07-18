---
title: HTTP security headers
tags:
  - Reporting
  - HTTP
  - Headers
  - OWASP
  - Webapps
  - Web applications
description: "Configure HTTP security headers for your Camunda instance."
---

The HTTP security headers mechanism allows you to add response headers that enable browser-side protections against common web vulnerabilities.

## Overview

This document describes the security headers available in Camunda and their configuration options. Each header addresses a specific security concern and can be configured independently.

## Available security headers

### Cache-Control headers

Controls browser and proxy caching behavior to prevent sensitive content from being cached.

| Header          | Purpose                            | Default                                          |
| --------------- | ---------------------------------- | ------------------------------------------------ |
| `Cache-Control` | Prevents caching of sensitive data | `no-cache, no-store, max-age=0, must-revalidate` |
| `Pragma`        | HTTP/1.0 backward compatibility    | `no-cache`                                       |
| `Expires`       | Indicates expired content          | `0`                                              |

**Configuration:**

- `camunda.security.http-headers.cache-control.enabled`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_CACHE_CONTROL_ENABLED`
- Type: `boolean`
- Default: `true`
- Description: Enables or disables cache prevention headers

### Content-Security-Policy (CSP)

Helps prevent cross-site scripting (XSS) and content injection attacks by restricting what resources can be loaded.

| Header                                | Purpose                                  | Default                                           |
| ------------------------------------- | ---------------------------------------- | ------------------------------------------------- |
| `Content-Security-Policy`             | Restricts resource loading               | Platform-specific defaults (SaaS or Self-Managed) |
| `Content-Security-Policy-Report-Only` | Logs policy violations without enforcing | Used when `reportOnly` is `true`                  |

**Configuration:**

- `camunda.security.http-headers.content-security-policy.enabled`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_ENABLED`
- Type: `boolean`
- Default: `true`
- Description: Enables or disables CSP headers

---

- `camunda.security.http-headers.content-security-policy.policy-directives`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_POLICY_DIRECTIVES`
- Type: `string`
- Default: not set (uses platform-specific defaults)
- Description: Custom CSP directives

---

- `camunda.security.http-headers.content-security-policy.report-only`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_REPORT_ONLY`
- Type: `boolean`
- Default: `false`
- Description: Enables reporting mode without enforcing policies

### X-Content-Type-Options

Prevents MIME type sniffing by instructing the browser to follow the declared content type.

| Header                   | Purpose                     | Default   |
| ------------------------ | --------------------------- | --------- |
| `X-Content-Type-Options` | Prevents MIME-type sniffing | `nosniff` |

**Configuration:**

- `camunda.security.http-headers.content-type-options.enabled`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_TYPE_OPTIONS_ENABLED`
- Type: `boolean`
- Default: `true`
- Description: Enables or disables the header

### Cross-Origin-Embedder-Policy (COEP)

Restricts loading of cross-origin resources that don’t explicitly grant permission.

| Header                         | Purpose                                   | Default       |
| ------------------------------ | ----------------------------------------- | ------------- |
| `Cross-Origin-Embedder-Policy` | Restricts embedded cross-origin resources | `UNSAFE_NONE` |

**Configuration:**

- `camunda.security.http-headers.cross-origin-embedder-policy.value`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_CROSS_ORIGIN_EMBEDDER_POLICY_VALUE`
- Type: `enum`
- Default: `UNSAFE_NONE`
- Options: `REQUIRE_CORP`, `UNSAFE_NONE`

### Cross-Origin-Opener-Policy (COOP)

Helps isolate browsing contexts to prevent cross-origin interactions.

| Header                       | Purpose                                    | Default                    |
| ---------------------------- | ------------------------------------------ | -------------------------- |
| `Cross-Origin-Opener-Policy` | Isolates windows from cross-origin openers | `SAME_ORIGIN_ALLOW_POPUPS` |

**Configuration:**

- `camunda.security.http-headers.cross-origin-opener-policy.value`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_CROSS_ORIGIN_OPENER_POLICY_VALUE`
- Type: `enum`
- Default: `SAME_ORIGIN_ALLOW_POPUPS`
- Options: `UNSAFE_NONE`, `SAME_ORIGIN_ALLOW_POPUPS`, `SAME_ORIGIN`

### Cross-Origin-Resource-Policy (CORP)

Declares whether resources can be loaded cross-origin.

| Header                         | Purpose                                           | Default     |
| ------------------------------ | ------------------------------------------------- | ----------- |
| `Cross-Origin-Resource-Policy` | Blocks unauthorized cross-origin resource loading | `SAME_SITE` |

**Configuration:**

- `camunda.security.http-headers.cross-origin-resource-policy.value`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_CROSS_ORIGIN_RESOURCE_POLICY_VALUE`
- Type: `enum`
- Default: `SAME_SITE`
- Options: `SAME_ORIGIN`, `SAME_SITE`, `CROSS_ORIGIN`

### X-Frame-Options

Prevents clickjacking by controlling how pages are framed.

| Header            | Purpose                                             | Default      |
| ----------------- | --------------------------------------------------- | ------------ |
| `X-Frame-Options` | Prevents the page from being displayed in an iframe | `SAMEORIGIN` |

**Configuration:**

- `camunda.security.http-headers.frame-options.enabled`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_FRAME_OPTIONS_ENABLED`
- Type: `boolean`
- Default: `true`

---

- `camunda.security.http-headers.frame-options.mode`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_FRAME_OPTIONS_MODE`
- Type: `enum`
- Default: `SAMEORIGIN`
- Options: `DENY`, `SAMEORIGIN`

### Strict-Transport-Security (HSTS)

Forces browsers to use HTTPS and avoid protocol downgrade attacks.

| Header                      | Purpose        | Default            |
| --------------------------- | -------------- | ------------------ |
| `Strict-Transport-Security` | Enforces HTTPS | `max-age=31536000` |

**Configuration:**

- `camunda.security.http-headers.hsts.enabled`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_ENABLED`
- Type: `boolean`
- Default: `true`

---

- `camunda.security.http-headers.hsts.max-age-in-seconds`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_MAX_AGE_IN_SECONDS`
- Type: `long`
- Default: `31536000`

---

- `camunda.security.http-headers.hsts.include-subdomains`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_INCLUDE_SUBDOMAINS`
- Type: `boolean`
- Default: `false`

---

- `camunda.security.http-headers.hsts.preload`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_PRELOAD`
- Type: `boolean`
- Default: `false`

**Important notes:**

- HSTS headers are only sent over HTTPS
- `include-subdomains` applies HSTS to all subdomains—ensure they support HTTPS
- Preloading HSTS into browsers is difficult to reverse—use with caution

### Permissions-Policy

Enables or disables access to specific browser features and APIs.

| Header               | Purpose                                  | Default                 |
| -------------------- | ---------------------------------------- | ----------------------- |
| `Permissions-Policy` | Restricts access to browser capabilities | Disables all by default |

**Configuration:**

- `camunda.security.http-headers.permissions-policy.value`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_PERMISSIONS_POLICY_VALUE`
- Type: `string`
- Default: A full list of browser features with `=()` (disabled)
- Description: Use syntax like `"camera=(), microphone=(), geolocation=(self)"`

### Referrer-Policy

Controls how much referrer information is shared when navigating between pages.

| Header            | Purpose                      | Default                           |
| ----------------- | ---------------------------- | --------------------------------- |
| `Referrer-Policy` | Limits referrer data leakage | `STRICT_ORIGIN_WHEN_CROSS_ORIGIN` |

**Configuration:**

- `camunda.security.http-headers.referrer-policy.value`
- Environment variable: `CAMUNDA_SECURITY_HTTP_HEADERS_REFERRER_POLICY_VALUE`
- Type: `enum`
- Default: `STRICT_ORIGIN_WHEN_CROSS_ORIGIN`

**Available values:**

- `NO_REFERRER`
- `NO_REFERRER_WHEN_DOWNGRADE`
- `ORIGIN`
- `ORIGIN_WHEN_CROSS_ORIGIN`
- `SAME_ORIGIN`
- `STRICT_ORIGIN`
- `STRICT_ORIGIN_WHEN_CROSS_ORIGIN`
- `UNSAFE_URL` (not recommended)

## Configuration examples

### Using a properties file

```properties
# Disable specific security headers
camunda.security.http-headers.cache-control.enabled=false

# Set custom CSP policy
camunda.security.http-headers.content-security-policy.policy-directives=default-src 'self'; script-src 'self' 'unsafe-inline';

# Configure HSTS with subdomains
camunda.security.http-headers.hsts.include-subdomains=true
camunda.security.http-headers.hsts.max-age-in-seconds=63072000
```

### Using environment variables

```bash
# Disable cache control
export CAMUNDA_SECURITY_HTTP_HEADERS_CACHE_CONTROL_ENABLED=false

# Set COEP to require CORP
export CAMUNDA_SECURITY_HTTP_HEADERS_CROSS_ORIGIN_EMBEDDER_POLICY_VALUE=REQUIRE_CORP

# Enable CSP report-only mode
export CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_REPORT_ONLY=true
```

## References

- [MDN Web Docs - HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
