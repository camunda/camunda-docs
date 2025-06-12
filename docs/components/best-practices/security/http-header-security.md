---
title: HTTP Security Headers
tags:
  - Reporting
  - HTTP
  - Headers
  - OWASP
  - Webapps
  - Web applications
description: "Configure HTTP security headers for you Camunda instance."
---

# HTTP Security Headers Configuration

The HTTP Header Security mechanism allows you to add security-related response headers which enable browser-side security mechanisms.

## Overview

This document describes the security headers available in Camunda and their configuration options. Each header serves a specific security purpose and can be configured independently.

## Available Security Headers

### Cache-Control Headers

Controls browser and proxy caching behavior to prevent sensitive content from being cached.

| Header          | Purpose                            | Default                                          |
| --------------- | ---------------------------------- | ------------------------------------------------ |
| `Cache-Control` | Prevents caching of sensitive data | `no-cache, no-store, max-age=0, must-revalidate` |
| `Pragma`        | HTTP/1.0 backward compatibility    | `no-cache`                                       |
| `Expires`       | Indicates expired content          | `0`                                              |

**Configuration:**

- **`camunda.security.securityHeaders.cacheConfig.enabled`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_CACHECONFIG_ENABLED`
- **Type:** boolean
- **Default:** `true`
- **Description:** Controls whether cache prevention headers are sent

### Content Security Policy (CSP)

Prevents XSS and other content injection attacks by controlling which resources can be loaded.

| Header                                | Purpose                                    | Default                                           |
| ------------------------------------- | ------------------------------------------ | ------------------------------------------------- |
| `Content-Security-Policy`             | Fine-grained control over resource loading | Platform-specific defaults (SaaS or Self-Managed) |
| `Content-Security-Policy-Report-Only` | Testing mode for CSP without enforcement   | Used when `reportOnly` is true                    |

**Configuration:**

- **`camunda.security.securityHeaders.contentSecurityPolicyConfig.enabled`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_CONTENTSECURITYPOLICYCONFIG_ENABLED`
- **Type:** boolean
- **Default:** `true`
- **Description:** Controls whether CSP headers are sent

---

- **`camunda.security.securityHeaders.contentSecurityPolicyConfig.policyDirectives`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_CONTENTSECURITYPOLICYCONFIG_POLICYDIRECTIVES`
- **Type:** string
- **Default:** Platform-specific
- **Description:** Custom policy directives. When not defined, appropriate defaults are used

---

- **`camunda.security.securityHeaders.contentSecurityPolicyConfig.reportOnly`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_CONTENTSECURITYPOLICYCONFIG_REPORTONLY`
- **Type:** boolean
- **Default:** `false`
- **Description:** When true, violations are reported but not enforced

### X-Content-Type-Options

Prevents MIME type sniffing attacks.

| Header                   | Purpose                                        | Default   |
| ------------------------ | ---------------------------------------------- | --------- |
| `X-Content-Type-Options` | Prevents browsers from MIME-sniffing responses | `nosniff` |

**Configuration:**

- **`camunda.security.securityHeaders.contentTypeOptionsConfig.enabled`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_CONTENTTYPEOPTIONSCONFIG_ENABLED`
- **Type:** boolean
- **Default:** `true`
- **Description:** Controls whether the header is sent

### Cross-Origin-Embedder-Policy (COEP)

Controls whether the document can load cross-origin resources that don't explicitly grant permission.

| Header                         | Purpose                                                        | Default        |
| ------------------------------ | -------------------------------------------------------------- | -------------- |
| `Cross-Origin-Embedder-Policy` | Requires explicit permission for cross-origin resource loading | `require-corp` |

**Configuration:**

- **`camunda.security.securityHeaders.crossOriginEmbedderPolicyConfig.crossOriginEmbedderPolicy`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_CROSSORIGINEMBEDDERPOLICYCONFIG_CROSSORIGINEMBEDDERPOLICY`
- **Type:** enum
- **Default:** `REQUIRE_CORP`
- **Description:** Policy value: `REQUIRE_CORP` or `UNSAFE_NONE`

### Cross-Origin-Opener-Policy (COOP)

Controls window isolation to prevent cross-origin access.

| Header                       | Purpose                                    | Default                    |
| ---------------------------- | ------------------------------------------ | -------------------------- |
| `Cross-Origin-Opener-Policy` | Isolates windows from cross-origin openers | `same-origin-allow-popups` |

**Configuration:**

- **`camunda.security.securityHeaders.crossOriginOpenerPolicyConfig.crossOriginOpenerPolicy`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_CROSSORIGINOPENERPOLICYCONFIG_CROSSORIGINOPENERPOLICY`
- **Type:** enum
- **Default:** `SAME_ORIGIN_ALLOW_POPUPS`
- **Description:** Policy value: `UNSAFE_NONE`, `SAME_ORIGIN_ALLOW_POPUPS`, or `SAME_ORIGIN`

### Cross-Origin-Resource-Policy (CORP)

Declares that resources should not be loaded by other origins.

| Header                         | Purpose                                             | Default       |
| ------------------------------ | --------------------------------------------------- | ------------- |
| `Cross-Origin-Resource-Policy` | Prevents unauthorized cross-origin resource loading | `same-origin` |

**Configuration:**

- **`camunda.security.securityHeaders.crossOriginResourcePolicyConfig.crossOriginResourcePolicy`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_CROSSORIGINRESOURCEPOLICYCONFIG_CROSSORIGINRESOURCEPOLICY`
- **Type:** enum
- **Default:** `SAME_ORIGIN`
- **Description:** Policy value: `SAME_ORIGIN`, `SAME_SITE`, or `CROSS_ORIGIN`

### X-Frame-Options

Prevents clickjacking attacks by controlling framing.

| Header            | Purpose                                              | Default      |
| ----------------- | ---------------------------------------------------- | ------------ |
| `X-Frame-Options` | Controls whether the page can be displayed in frames | `SAMEORIGIN` |

**Configuration:**

- **`camunda.security.securityHeaders.frameOptionsConfig.enabled`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_FRAMEOPTIONSCONFIG_ENABLED`
- **Type:** boolean
- **Default:** `true`
- **Description:** Controls whether the header is sent

---

- **`camunda.security.securityHeaders.frameOptionsConfig.mode`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_FRAMEOPTIONSCONFIG_MODE`
- **Type:** enum
- **Default:** `SAMEORIGIN`
- **Description:** Framing policy: `DENY` or `SAMEORIGIN`

### Strict-Transport-Security (HSTS)

Enforces HTTPS connections to prevent protocol downgrade attacks.

| Header                      | Purpose                  | Default            |
| --------------------------- | ------------------------ | ------------------ |
| `Strict-Transport-Security` | Forces HTTPS connections | `max-age=31536000` |

**Configuration:**

- **`camunda.security.securityHeaders.hstsConfig.enabled`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_HSTSCONFIG_ENABLED`
- **Type:** boolean
- **Default:** `true`
- **Description:** Controls whether the header is sent

---

- **`camunda.security.securityHeaders.hstsConfig.maxAgeInSeconds`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_HSTSCONFIG_MAXAGEINSECONDS`
- **Type:** long
- **Default:** `31536000` (1 year)
- **Description:** How long browsers remember to force HTTPS

---

- **`camunda.security.securityHeaders.hstsConfig.includeSubDomains`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_HSTSCONFIG_INCLUDESUBDOMAINS`
- **Type:** boolean
- **Default:** `false`
- **Description:** Applies HSTS to all subdomains

---

- **`camunda.security.securityHeaders.hstsConfig.preload`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_HSTSCONFIG_PRELOAD`
- **Type:** boolean
- **Default:** `false`
- **Description:** Indicates eligibility for browser preload lists

---

**Important Notes:**

- HSTS headers are only sent over HTTPS connections
- Enabling `includeSubDomains` affects ALL subdomains - ensure they support HTTPS
- Preload list inclusion is practically permanent - removal can take months

### Permissions-Policy

Controls access to browser features and APIs.

| Header               | Purpose                                    | Default            |
| -------------------- | ------------------------------------------ | ------------------ |
| `Permissions-Policy` | Fine-grained control over browser features | Not set by default |

**Configuration:**

- **`camunda.security.securityHeaders.permissionsPolicyConfig.policy`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_PERMISSIONSPOLICYCONFIG_POLICY`
- **Type:** string
- **Default:** not set
- **Description:** Policy directives (e.g., `"camera=() microphone=() geolocation=(self)"`)

### Referrer-Policy

Controls how much referrer information is shared when navigating to other pages.

| Header            | Purpose                               | Default                           |
| ----------------- | ------------------------------------- | --------------------------------- |
| `Referrer-Policy` | Controls referrer information leakage | `strict-origin-when-cross-origin` |

**Configuration:**

- **`camunda.security.securityHeaders.referrerPolicyConfig.referrerPolicy`**
- **Environment Variable:** `CAMUNDA_SECURITY_SECURITYHEADERS_REFERRERPOLICYCONFIG_REFERRERPOLICY`
- **Type:** enum
- **Default:** `STRICT_ORIGIN_WHEN_CROSS_ORIGIN`
- **Description:** Policy controlling referrer information

**Available Policies:**

- `NO_REFERRER`: Never send referrer
- `NO_REFERRER_WHEN_DOWNGRADE`: Don't send referrer on HTTPS→HTTP
- `ORIGIN`: Send only origin (no path/query)
- `ORIGIN_WHEN_CROSS_ORIGIN`: Full URL same-origin, origin only cross-origin
- `SAME_ORIGIN`: Full URL same-origin only
- `STRICT_ORIGIN`: Origin only, nothing on downgrade
- `STRICT_ORIGIN_WHEN_CROSS_ORIGIN`: Full URL same-origin, origin cross-origin, nothing on downgrade
- `UNSAFE_URL`: Always send full URL (not recommended)

## Configuration Examples

### Using Properties File

```properties
# Enable strict security headers
camunda.security.securityHeaders.contentSecurityPolicy.policyDirectives=default-src 'self'; script-src 'self' 'unsafe-inline';
```

### Using Environment Variables

```bash
# Enable strict security headers
export CAMUNDA_SECURITY_SECURITYHEADERS_CONTENTSECURITYPOLICY_POLICYDIRECTIVES="default-src 'self'; script-src 'self' 'unsafe-inline';"
```

## References

- [MDN Web Docs - HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
