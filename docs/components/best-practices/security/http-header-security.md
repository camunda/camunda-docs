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

- **`camunda.security.http-headers.cache-control.enabled`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_CACHE_CONTROL_ENABLED`
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

- **`camunda.security.http-headers.content-security-policy.enabled`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_ENABLED`
- **Type:** boolean
- **Default:** `true`
- **Description:** Controls whether CSP headers are sent

---

- **`camunda.security.http-headers.content-security-policy.policy-directives`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_POLICY_DIRECTIVES`
- **Type:** string
- **Default:** Platform-specific
- **Description:** Custom policy directives. When not defined, appropriate defaults are used

---

- **`camunda.security.http-headers.content-security-policy.report-only`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_REPORT_ONLY`
- **Type:** boolean
- **Default:** `false`
- **Description:** When true, violations are reported but not enforced

### X-Content-Type-Options

Prevents MIME type sniffing attacks.

| Header                   | Purpose                                        | Default   |
| ------------------------ | ---------------------------------------------- | --------- |
| `X-Content-Type-Options` | Prevents browsers from MIME-sniffing responses | `nosniff` |

**Configuration:**

- **`camunda.security.http-headers.content-type-options.enabled`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_TYPE_OPTIONS_ENABLED`
- **Type:** boolean
- **Default:** `true`
- **Description:** Controls whether the header is sent

### Cross-Origin-Embedder-Policy (COEP)

Controls whether the document can load cross-origin resources that don't explicitly grant permission.

| Header                         | Purpose                                                        | Default        |
| ------------------------------ | -------------------------------------------------------------- | -------------- |
| `Cross-Origin-Embedder-Policy` | Requires explicit permission for cross-origin resource loading | `REQUIRE_CORP` |

**Configuration:**

- **`camunda.security.http-headers.cross-origin-embedder-policy.value`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_CROSS_ORIGIN_EMBEDDER_POLICY_VALUE`
- **Type:** enum
- **Default:** `REQUIRE_CORP`
- **Description:** Policy value: `REQUIRE_CORP` or `UNSAFE_NONE`

### Cross-Origin-Opener-Policy (COOP)

Controls window isolation to prevent cross-origin access.

| Header                       | Purpose                                    | Default                    |
| ---------------------------- | ------------------------------------------ | -------------------------- |
| `Cross-Origin-Opener-Policy` | Isolates windows from cross-origin openers | `SAME_ORIGIN_ALLOW_POPUPS` |

**Configuration:**

- **`camunda.security.http-headers.cross-origin-opener-policy.value`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_CROSS_ORIGIN_OPENER_POLICY_VALUE`
- **Type:** enum
- **Default:** `SAME_ORIGIN_ALLOW_POPUPS`
- **Description:** Policy value: `UNSAFE_NONE`, `SAME_ORIGIN_ALLOW_POPUPS`, or `SAME_ORIGIN`

### Cross-Origin-Resource-Policy (CORP)

Declares that resources should not be loaded by other origins.

| Header                         | Purpose                                             | Default     |
| ------------------------------ | --------------------------------------------------- | ----------- |
| `Cross-Origin-Resource-Policy` | Prevents unauthorized cross-origin resource loading | `SAME_SITE` |

**Configuration:**

- **`camunda.security.http-headers.cross-origin-resource-policy.value`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_CROSS_ORIGIN_RESOURCE_POLICY_VALUE`
- **Type:** enum
- **Default:** `SAME_SITE`
- **Description:** Policy value: `SAME_ORIGIN`, `SAME_SITE`, or `CROSS_ORIGIN`

### X-Frame-Options

Prevents clickjacking attacks by controlling framing.

| Header            | Purpose                                              | Default      |
| ----------------- | ---------------------------------------------------- | ------------ |
| `X-Frame-Options` | Controls whether the page can be displayed in frames | `SAMEORIGIN` |

**Configuration:**

- **`camunda.security.http-headers.frame-options.enabled`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_FRAME_OPTIONS_ENABLED`
- **Type:** boolean
- **Default:** `true`
- **Description:** Controls whether the header is sent

---

- **`camunda.security.http-headers.frame-options.mode`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_FRAME_OPTIONS_MODE`
- **Type:** enum
- **Default:** `SAMEORIGIN`
- **Description:** Framing policy: `DENY` or `SAMEORIGIN`

### Strict-Transport-Security (HSTS)

Enforces HTTPS connections to prevent protocol downgrade attacks.

| Header                      | Purpose                  | Default            |
| --------------------------- | ------------------------ | ------------------ |
| `Strict-Transport-Security` | Forces HTTPS connections | `max-age=31536000` |

**Configuration:**

- **`camunda.security.http-headers.hsts.enabled`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_ENABLED`
- **Type:** boolean
- **Default:** `true`
- **Description:** Controls whether the header is sent

---

- **`camunda.security.http-headers.hsts.max-age-in-seconds`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_MAX_AGE_IN_SECONDS`
- **Type:** long
- **Default:** `31536000` (1 year)
- **Description:** How long browsers remember to force HTTPS

---

- **`camunda.security.http-headers.hsts.include-subdomains`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_INCLUDE_SUBDOMAINS`
- **Type:** boolean
- **Default:** `false`
- **Description:** Applies HSTS to all subdomains

---

- **`camunda.security.http-headers.hsts.preload`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_PRELOAD`
- **Type:** boolean
- **Default:** `false`
- **Description:** Indicates eligibility for browser preload lists

---

**Important Notes:**

- HSTS headers are only sent over HTTPS connections
- Enabling `include-subdomains` affects ALL subdomains - ensure they support HTTPS
- Preload list inclusion is practically permanent - removal can take months

### Permissions-Policy

Controls access to browser features and APIs.

| Header               | Purpose                                    | Default                          |
| -------------------- | ------------------------------------------ | -------------------------------- |
| `Permissions-Policy` | Fine-grained control over browser features | Disables all policies by default |

**Configuration:**

- **`camunda.security.http-headers.permissions-policy.value`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_PERMISSIONS_POLICY_VALUE`
- **Type:** string
- **Default:** `"accelerometer=(), ambient-light-sensor=(), attribution-reporting=(), autoplay=(), bluetooth=(), browsing-topics=(), camera=(), compute-pressure=(), cross-origin-isolated=(), deferred-fetch=(), deferred-fetch-minimal=(), display-capture=(), encrypted-media=(), fullscreen=(), gamepad=(), geolocation=(), gyroscope=(), hid=(), identity-credentials-get=(), idle-detection=(), language-detector=(), local-fonts=(), magnetometer=(), microphone=(), midi=(), otp-credentials=(), payment=(), picture-in-picture=(), publickey-credentials-create=(), publickey-credentials-get=(), screen-wake-lock=(), serial=(), speaker-selection=(), storage-access=(), summarizer=(), translator=(), usb=(), web-share=(), window-management=(), xr-spatial-tracking=()"`
- **Description:** Policy directives (e.g., `"camera=() microphone=() geolocation=(self)"`)

### Referrer-Policy

Controls how much referrer information is shared when navigating to other pages.

| Header            | Purpose                               | Default                           |
| ----------------- | ------------------------------------- | --------------------------------- |
| `Referrer-Policy` | Controls referrer information leakage | `STRICT_ORIGIN_WHEN_CROSS_ORIGIN` |

**Configuration:**

- **`camunda.security.http-headers.referrer-policy.value`**
- **Environment Variable:** `CAMUNDA_SECURITY_HTTP_HEADERS_REFERRER_POLICY_VALUE`
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
# Disable specific security headers
camunda.security.http-headers.cache-control.enabled=false
```

### Using Environment Variables

```bash
export CAMUNDA_SECURITY_HTTP_HEADERS_CACHE_CONTROL_ENABLED=false
```

## References

- [MDN Web Docs - HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
