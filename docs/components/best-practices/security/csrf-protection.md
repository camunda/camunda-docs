---
title: CSRF protection configuration
tags:
  - CSRF
  - Security
  - HTTP
  - Headers
  - OWASP
  - Webapps
  - Web applications
description: "Configure CSRF protection for you Camunda instance."
---

# About CSRF

Cross-Site Request Forgery (CSRF) is a type of malicious exploit where unauthorized commands are
transmitted from a user that the web application trusts. In a CSRF attack, an attacker tricks a victim's
browser into making unwanted requests to a web application where the victim is authenticated.

For a comprehensive understanding of CSRF attacks and prevention methods, refer to the
[MDN Web Docs on CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF).

## How CSRF Protection Works in Camunda

- **Token Generation**: A unique CSRF token is generated and stored in a secure, HTTP-only cookie named `X-CSRF-TOKEN`
- **Token Validation**: For state-changing requests (POST, PUT, DELETE, etc.), the server validates that the CSRF token
  in the request header matches the one in the cookie
- **Safe Methods**: GET, HEAD, TRACE, and OPTIONS requests are considered safe and don't require CSRF validation

## Configuration

### Enabling/Disabling CSRF Protection

CSRF protection is enabled by default for security. You can configure it using:

**Application property:** `camunda.security.csrf.enabled: true  # Set to 'false' to disable CSRF protection`

**Environment variable:** `CAMUNDA_SECURITY_CSRF_ENABLED=true  # Set to false to disable CSRF protection`

:::caution
Disabling CSRF protection is not recommended for production environments as it leaves your application vulnerable to cross-site request forgery attacks.
:::

## Authentication Method Differences

### Basic Authentication

- CSRF tokens are generated upon successful login via the `/login` endpoint
- The token is included in the response header and stored in a secure cookie
- Subsequent requests must include the token in the `X-CSRF-TOKEN` header
- Tokens are cleared on logout

### OIDC (OpenID Connect) Authentication

- CSRF protection works similarly to Basic Auth
- Tokens are generated after successful OAuth2/OIDC authentication
- The same `X-CSRF-TOKEN` header mechanism applies
- Compatible with both JWT bearer tokens and session-based authentication

## Protected vs Unprotected Paths

### Protected Paths (Require CSRF Token)

- `/api/**` - API endpoints (except specifically excluded paths)
- `/v1/**`, `/v2/**` - Versioned API endpoints
- All state-changing operations (POST, PUT, DELETE, PATCH)

### Unprotected Paths (No CSRF Token Required)

- `/actuator/**` - Health and monitoring endpoints
- `/swagger-ui/**` - API documentation
- `/v2/license` - Public license endpoint
- `/error` - Error handling
- Authentication endpoints (`/login`, `/logout`)
- Safe HTTP methods (GET, HEAD, OPTIONS, TRACE)

## Implementation Details

### Request Matching Logic

The implementation determines whether CSRF protection should be applied based on:

- **HTTP Method**: Safe methods (GET, HEAD, TRACE, OPTIONS) bypass CSRF checks
- **Request Path**: Unprotected paths are excluded from CSRF validation
- **Session Presence**: API calls with active browser sessions require CSRF tokens
- **Swagger UI**: Requests originating from Swagger UI are exempt

## Troubleshooting

### Common Issues

**403 Forbidden on POST/PUT/DELETE requests**

- Ensure the `X-CSRF-TOKEN` header is included
- Verify the token matches the one in the cookie
- Check that cookies are being sent with requests

**Token not received**

- Make an authenticated GET request first to receive a token
- Ensure cookies are enabled in the client
- Check for CORS issues if making cross-origin requests

**Token mismatch errors**

- Tokens may expire with the session
- Re-authenticate to get a new token
- Ensure you're using the most recent token

## Security Considerations

- Always use HTTPS in production to prevent token interception
- CSRF protection complements but doesn't replace proper authentication
- Consider additional security headers configured in the security settings
- Regularly review and update the list of unprotected paths
