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

Review the configuration details in the [properties documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundasecuritycsrf).

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
- `/v2/**` – Versioned API endpoints
- `/login` – The form-login endpoint (see [Logging in with CSRF protection](#logging-in-with-csrf-protection) below)
- All state-changing operations (POST, PUT, DELETE, PATCH)

### Unprotected paths (no CSRF token required)

- `/actuator/**` – Health and monitoring endpoints
- `/v2/license` – Public license endpoint
- `/error` – Error handling
- `/logout` – The logout endpoint
- Safe HTTP methods (GET, HEAD, OPTIONS, TRACE)

## Logging in with CSRF protection

`POST /login` requires a valid CSRF token like any other state-changing request — it is not exempt, even for a browser
that does not have a session yet. This prevents an attacker-controlled page from silently logging a victim's browser
into an attacker-chosen account ([login CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)).

A client driving login itself (a script, health check, or custom frontend) must fetch a token before submitting
credentials:

1. Send a `GET` request to `/login`. The response includes the token both as an `X-CSRF-TOKEN` cookie and as an
   `X-CSRF-TOKEN` response header.
2. Submit `POST /login` with `username` and `password`, echoing the value from step 1 back as an `X-CSRF-TOKEN`
   request header (in addition to sending the cookie the browser already stored from step 1).

Omitting the header on `POST /login` now fails with `401`/`403` instead of succeeding with `204`.

## Security considerations

- Always use HTTPS in production to prevent token interception.
- Consider additional security headers configured in the security settings.
- Regularly review and update the list of unprotected paths.
