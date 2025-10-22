---
id: csrf-protection
title: "CSRF protection"
description: "Cross-Site Request Forgery (CSRF) is a type of malicious exploit where unauthorized commands are transmitted from a user that the web application trusts."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cross-Site Request Forgery (CSRF) is a type of malicious exploit where unauthorized commands are
transmitted from a user that the web application trusts. In a CSRF attack, an attacker tricks a victim's
browser into making unwanted requests to a web application where the victim is authenticated.

For a comprehensive understanding of CSRF attacks and prevention methods, refer to the
[MDN Web Docs on CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF).

Review the configuration details in the [properties documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#csrf-protection).

:::caution
Disabling CSRF protection is not recommended for production environments as it leaves your application vulnerable to cross-site request forgery attacks.
:::

## How CSRF protection works in Camunda

- **Token generation**: A unique CSRF token is generated and stored in a secure, HTTP-only cookie named `X-CSRF-TOKEN`.
- **Token validation**: For state-changing requests (POST, PUT, DELETE, etc.), the server validates that the CSRF token
  in the request header `X-CSRF-TOKEN` matches the one in the cookie.
- **Safe methods**: GET, HEAD, TRACE, and OPTIONS requests are considered safe and don't require CSRF validation.

## Protected vs unprotected paths

### Protected paths (require CSRF token)

- `/api/**` – API endpoints (except specifically excluded paths)
- `/v1/**`, `/v2/**` – Versioned API endpoints
- All state-changing operations (POST, PUT, DELETE, PATCH)

### Unprotected paths (no CSRF token required)

- `/actuator/**` – Health and monitoring endpoints
- `/v2/license` – Public license endpoint
- `/error` – Error handling
- Authentication endpoints (`/login`, `/logout`)
- Safe HTTP methods (GET, HEAD, OPTIONS, TRACE)

## Security considerations

- Always use HTTPS in production to prevent token interception.
- Consider additional security headers configured in the security settings.
- Regularly review and update the list of unprotected paths.
