---
id: configure-oauth-with-entra
title: Configure OAuth with Microsoft Entra
sidebar_label: Configure OAuth with Microsoft Entra
slug: /guides/oauth-entra
description: "Learn how to configure OAuth with Microsoft Entra ID for authentication in Camunda 8.6"
---

Learn how to configure your Zeebe client to use OAuth with Microsoft Entra ID for authentication.

## Overview

This guide walks you through the steps to set up OAuth for your applications using Microsoft Entra ID as the identity provider. We'll cover setting up necessary environment variables and configuring Microsoft Entra.

## What is Microsoft Entra?

Microsoft Entra ID (previously known as Azure AD) is a cloud-based identity and access management service by Microsoft that provides a secure environment for authentication and identity management.

## What is the Zeebe client?

Zeebe is a workflow engine for microservices orchestration. The Zeebe Client allows applications to interact with the Zeebe broker to deploy workflows, create instances, and monitor execution.

## Communication diagram

Below is a diagram illustrating the communication between components when using Microsoft Entra for authentication:

```sh
┌──────────────────┐
│   User/Client    │
└──────────────────┘
         │
         │ 1. Request
         ▼
┌──────────────────┐       ┌──────────────────┐
│   Zeebe Client   │────2──│ Microsoft Entra  │
└──────────────────┘       └──────────────────┘
         │                           │
         │ 3. Token Response         |
         ◄───────────────────────────┘
         │
         │ 4. Authenticated Request
         ▼
┌──────────────────┐
│  Zeebe Gateway   │
└──────────────────┘
```

The diagram shows the OAuth flow where:

1. User/client makes a request to Zeebe client.
2. Zeebe client authenticates with Microsoft Entra.
3. Microsoft Entra returns an access token.
4. Zeebe client uses the token to make authenticated requests to Zeebe Gateway.

## Use cases

1. **Secure access to Zeebe workflows**: Use Microsoft Entra to authenticate and authorize access to Zeebe workflows, ensuring secure operations and compliance with security standards.

2. **Integration with enterprise identity**: Leverage existing Microsoft Entra configurations to integrate Zeebe with your organization's identity management system, streamlining user management and authentication processes.

3. **Enhanced security**: Utilize advanced security features of Microsoft Entra, like conditional access and multi-factor authentication, to protect sensitive workflows and operations performed through the Zeebe client.

4. **Simplified configuration for developers**: Allow developers to use standardized environment variables and authentication configurations, reducing the complexity and risk of manual security configurations.

## Prerequisites

Before configuring Microsoft Entra with Camunda, ensure you have:

- Administrative access to your Microsoft Entra ID tenant.
- Access to register applications in Microsoft Entra.
- Knowledge of your tenant ID.
- Understanding of OAuth 2.0 and OpenID Connect protocols.
- A Camunda 8.6 deployment.

## Detailed Microsoft Entra configuration

### Step 1: Register applications in Microsoft Entra

1. Navigate to the Microsoft Entra admin center: https://entra.microsoft.com/
2. Go to **Applications > App registrations**.
3. Click **New registration**.
4. Configure the application:
   - **Name**: Choose a descriptive name (e.g., "Camunda-Zeebe-client").
   - **Supported account types**: Select appropriate option based on your requirements.
   - **Redirect URI**: Leave blank for now (will be configured later).

### Step 2: Configure application settings

#### For Zeebe client applications

1. Note the Application (client) ID — this will be your `ZEEBE_CLIENT_ID`.
2. Navigate to **Certificates & secrets**.
3. Create a new client secret:
   - Click **New client secret**.
   - Add description and set expiration.
   - **Copy the secret value immediately** (you won't be able to see it again).

#### For web applications (Operate, Tasklist, Optimize)

1. Go to **Authentication**.
2. Add platform > **Web**.
3. Configure redirect URIs:
   - Operate: `https://<OPERATE_URL>/callback`
   - Tasklist: `https://<TASKLIST_URL>/callback`
   - Optimize: `https://<OPTIMIZE_URL>/api/authentication/callback`
   - Identity: `https://<IDENTITY_URL>/identity`

Also ensure that Connectors are registered in Microsoft Entra.
For Camunda 8.6, it is advised to use the Connectors client in Microsoft Entra to obtain tokens for communication with Zeebe and Operate.

#### For single page applications (Console, Web Modeler UI)

1. Go to **Authentication**.
2. Add platform > **Single-page application**.
3. Configure redirect URIs:
   - Console: `https://<CONSOLE_URL>`
   - Web Modeler: `https://<WEB_MODELER_URL>/login-callback`

### Step 3: Configure API permissions

1. Navigate to **API permissions**.
2. Add the following Microsoft Graph permissions:
   - `email` (Delegated)
   - `openid` (Delegated)
   - `profile` (Delegated)
   - `offline_access` (Delegated)
3. Grant admin consent for your organization.

### Step 4: Configure app manifest

1. Go to **Manifest**.
2. Set the following properties:
   ```json
   {
     "requestedAccessTokenVersion": 2,
     "accessTokenAcceptedVersion": 2
   }
   ```
3. Save the manifest.

## Complete environment variable configuration

### For Zeebe client with client assertion (certificate-based authentication)

```bash
# Core OAuth settings
export ZEEBE_CLIENT_ID='your-entra-application-id'
export ZEEBE_AUTHORIZATION_SERVER_URL='https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token'
export ZEEBE_TOKEN_AUDIENCE='your-entra-application-id'

# Client assertion settings (for certificate-based auth)
export CAMUNDA_CLIENT_AUTH_CLIENT_ASSERTION_KEYSTORE_PATH='/path/to/your/keystore.p12'
export CAMUNDA_CLIENT_AUTH_CLIENT_ASSERTION_KEYSTORE_PASSWORD='your-keystore-password'
```

### For Zeebe client with client secret

```bash
# Core OAuth settings
export ZEEBE_CLIENT_ID='your-entra-application-id'
export ZEEBE_CLIENT_SECRET='your-entra-client-secret'
export ZEEBE_AUTHORIZATION_SERVER_URL='https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token'
export ZEEBE_TOKEN_AUDIENCE='your-entra-application-id'
export ZEEBE_TOKEN_SCOPE='your-entra-application-id/.default'
```

### For Camunda components

#### Operate

The **Camunda Operate connector** allows you to interact with [Camunda Operate](https://camunda.com/platform/operate/) in your BPMN process to fetch process execution data.

#### Tasklist

Tasklist is a ready-to-use application to rapidly implement business processes alongside.

#### Optimize

Optimize offers business intelligence tooling for Camunda customers. By leveraging data collected during process execution, you can access reports, share process intelligence, analyze bottlenecks, and examine areas in business processes for improvement.

```bash
# Operate client
export OPERATE_CLIENT_CLIENT_ASSERTION_KEYSTORE_PATH='/path/to/your/keystore.p12'
export OPERATE_CLIENT_CLIENT_ASSERTION_KEYSTORE_PASSWORD='your-keystore-password'

# Spring profile
export SPRING_PROFILES_ACTIVE='oidc'
```

## Certificate setup for client assertion

### Generating a self-signed certificate

```bash
# Generate private key and certificate
openssl req -x509 -newkey rsa:2048 -keyout private-key.pem -out certificate.pem -days 365 -nodes

# Create PKCS12 keystore
openssl pkcs12 -export -out keystore.p12 -inkey private-key.pem -in certificate.pem -name "camunda-client"
```

### Uploading certificate to Microsoft Entra

1. Go to your app registration in Microsoft Entra.
2. Navigate to **Certificates & secrets**.
3. Click **Upload certificate**.
4. Select your `certificate.pem` file.
5. Add a description and click **Add**.

## Troubleshooting

### Common issues and solutions

#### 1. Invalid client error

- **Cause**: Incorrect client ID or the application is not properly registered.
- **Solution**: Verify the client ID matches your Microsoft Entra application ID.

#### 2. Invalid client secret error

- **Cause**: Expired or incorrect client secret.
- **Solution**: Generate a new client secret in Microsoft Entra and update your configuration.

#### 3. Invalid scope error

- **Cause**: The requested scope is not configured or granted.
- **Solution**: Ensure the scope follows the pattern `{client-id}/.default` for Microsoft Entra.

#### 4. Certificate validation failed error

- **Cause**: Certificate is not properly uploaded or expired.
- **Solution**: Verify the certificate is uploaded to Microsoft Entra and not expired.

#### 5. Token audience validation failed error

- **Cause**: Mismatch between requested audience and configured audience.
- **Solution**: Ensure `ZEEBE_TOKEN_AUDIENCE` matches your application ID.

### Debug tips

1. **Enable debug logging** for OAuth components:

   ```bash
   export ZEEBE_LOG_LEVEL=debug
   ```

2. **Verify token contents** using JWT debugging tools like jwt.io.

3. **Check Microsoft Entra sign-in logs** for detailed error information.

## Security best practices

1. **Use certificate-based authentication** (client assertion) when possible for enhanced security.
2. **Regularly rotate client secrets** and certificates.
3. **Use least privilege principle** - only grant necessary permissions.
4. **Enable conditional access policies** in Microsoft Entra for additional security.
5. **Monitor authentication logs** for suspicious activities.
6. **Store secrets securely** using environment variables or secret management systems.
7. **Use HTTPS** for all communications.
8. **Implement proper error handling** to avoid exposing sensitive information.

## Testing your configuration

### Quick connection test

```bash
# Test OAuth token retrieval
curl -X POST https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id={your-client-id}" \
  -d "client_secret={your-client-secret}" \
  -d "scope={your-client-id}/.default"
```

## Additional resources

- [Microsoft Entra ID Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)
- [OAuth 2.0 Client Credentials Flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow)
- [Camunda 8 Self-Managed Documentation](/self-managed/about-self-managed.md)
- [Zeebe Client Java Documentation](https://camunda.com/platform/zeebe/)

For additional support, refer to the Camunda documentation and ensure all configurations comply with your organization's security policies.
