---
id: ms-entra-certificate-authentication
title: "Microsoft Entra certificate-based authentication"
sidebar_label: "MS Entra certificate authentication"
description: "Configure Microsoft Entra ID certificate-based authentication for secure service-to-service authentication using X.509 certificates."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Configure Microsoft Entra ID certificate-based authentication for Camunda 8 Self-Managed using X.509 certificates instead of client secrets. This provides enhanced security through certificate ownership validation and supports automated authentication flows.

## Overview

Microsoft Entra certificate-based authentication enables secure service-to-service authentication using **OAuth 2.0 Client Credentials flow with JWT Client Assertion** (RFC 7523). Instead of using client secrets, your Camunda Identity service proves its identity to Microsoft Entra by signing JWT assertions with an X.509 certificate private key.

### Key benefits

- **Enhanced security**: Certificate-based authentication eliminates shared secrets
- **Automated authentication**: No user interaction required for service-to-service communication
- **Microsoft compliance**: Follows Microsoft's recommended patterns for enterprise authentication
- **Certificate rotation**: Support for certificate lifecycle management

### Architecture

Camunda Identity acts as both an **OAuth2 Client** (to Microsoft Entra) and a **Resource Server** (for frontend/APIs):

```
Frontend → Identity (Resource Server) → MS Entra (Authorization Server)
   ↑                                            ↓
   └─── JWT Token ←── Identity (OAuth2 Client) ←┘
```

#### Identity as OAuth2 Client (to MS Entra)

- **Role**: Requests access tokens from Microsoft Entra using certificate-based authentication
- **Flow**: OAuth2 Client Credentials with JWT Client Assertion (RFC 7523)
- **Certificate use**: Signs JWT assertions to prove identity to MS Entra
- **Token endpoint**: `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token`
- **Authentication**: Creates JWT assertions signed with X.509 certificate private key

#### Identity as Resource Server (for Frontend/APIs)

- **Role**: Validates and accepts JWT tokens for API access
- **Protected endpoints**: `/v2/**` APIs (mapping rules, applications, users, etc.)
- **Token validation**: Uses MS Entra access tokens as Spring Security `JwtAuthenticationToken`
- **Authorization**: Extracts user authorities from JWT claims (`roles`, `app_roles`)
- **Session management**: Stores authentication in HTTP sessions for thread safety

## Prerequisites

Before configuring certificate-based authentication, ensure you have:

| Prerequisite                  | Description                                                    |
|:------------------------------|:---------------------------------------------------------------|
| **Microsoft Entra ID tenant** | Administrative access to your Entra ID tenant                  |
| **X.509 certificate**         | Certificate with private key for JWT signing (PKCS#12 format)  |
| **Application registration**  | Entra ID application configured for certificate authentication |
| **Camunda 8.8+**              | Self-managed deployment with Identity service                  |
| **OIDC configuration**        | Basic OIDC setup completed                                     |

## Configuration steps

### Step 1: Configure Microsoft Entra ID application

1. **Register application** in your Microsoft Entra ID tenant:
   - Navigate to **Azure Portal** > **Microsoft Entra ID** > **App registrations**
   - Click **New registration**
   - Configure as **Web application** with appropriate redirect URIs
2. **Upload certificate**:
   - Navigate to **Certificates & secrets** > **Certificates**
   - Click **Upload certificate**
   - Upload your X.509 certificate (.cer file)
   - Note the **thumbprint** (certificate identifier)
3. **Configure API permissions**:
   - Add required Microsoft Graph permissions
   - Grant admin consent for organization
4. **Note configuration values**:
   - **Application (client) ID**
   - **Directory (tenant) ID**
   - **Certificate thumbprint**

### Step 2: Prepare certificate files

Ensure your certificate is in PKCS#12 format (.p12 or .pfx) with both certificate and private key:

```bash
# Convert PEM to PKCS#12 if needed
openssl pkcs12 -export -out identity.p12 \
  -inkey private-key.pem \
  -in certificate.pem \
  -password pass:your-password
```

Store the certificate file securely with appropriate file permissions:

```bash
chmod 600 /path/to/identity.p12
chown camunda:camunda /path/to/identity.p12
```

### Step 3: Configure Camunda Identity

<Tabs groupId="deploymentType" defaultValue="docker" queryString values={[{label: 'Docker Compose', value: 'docker'}, {label: 'Helm', value: 'helm'}, {label: 'Manual', value: 'manual'}]}>

<TabItem value="docker">

Configure the following environment variables in your Docker Compose setup:

```yaml
identity:
  environment:
    # Core Configuration
    CAMUNDA_DATABASE_CLUSTERNAME: elasticsearch
    CAMUNDA_DATABASE_TYPE: elasticsearch
    CAMUNDA_DATABASE_URL: "http://localhost:9200"

    # Basic OIDC Configuration
    CAMUNDA_IDENTITY_TYPE: MICROSOFT
    CAMUNDA_IDENTITY_ISSUER: "https://login.microsoftonline.com/ea952511-6a7f-40b8-af71-6c1be6f0dade/v2.0"
    CAMUNDA_IDENTITY_ISSUER_BACKEND_URL: "https://login.microsoftonline.com/ea952511-6a7f-40b8-af71-6c1be6f0dade/v2.0"
    CAMUNDA_IDENTITY_CLIENT_ID: "6fe432f2-7dc3-4e13-b1b4-4cc8480c80b7"
    CAMUNDA_IDENTITY_AUDIENCE: "6fe432f2-7dc3-4e13-b1b4-4cc8480c80b7"
    
    # Certificate Authentication Configuration
    CAMUNDA_SECURITY_AUTHENTICATION_METHOD: OIDC
    CAMUNDA_SECURITY_CERT_AUTH_ENABLED: true
    CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GRANTTYPE: client_credentials
    CAMUNDA_SECURITY_AUTHENTICATION_OIDC_SCOPES: "2622078b-0164-41ee-8794-3ff8d9f8e402/.default"
    CAMUNDA_SECURITY_AUTHENTICATION_OIDC_JWK_SET_URI: "https://login.microsoftonline.com/ea952511-6a7f-40b8-af71-6c1be6f0dade/discovery/v2.0/keys"
    
    # Certificate Path and Credentials
    CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_PATH: "/certs/identity.p12"
    CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_PASSWORD: "password"
    CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_KEY_ALIAS: "identity"
    CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_KEY_PASSWORD: "password"

    # Security Configuration
    CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED: false
    CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI: true
    
    # Optional Features
    CAMUNDA_PERSISTENT_SESSIONS_ENABLED: true
    INITIAL_CLAIM_VALUE: "aaa3a5e0-1479-477b-af0e-4747374b9ed6"

    # Profile Activation
    SPRING_PROFILES_ACTIVE: oidc
  volumes:
    - "/host/path/to/certs:/certs:ro"
```

</TabItem>

<TabItem value="helm">

Configure certificate authentication using Helm values:

```yaml
global:
  identity:
    auth:
      type: "MICROSOFT"
      issuer: "https://login.microsoftonline.com/{tenant-id}/v2.0"
      issuerBackendUrl: "https://login.microsoftonline.com/{tenant-id}/v2.0"
      tokenUrl: "https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token"
      jwksUrl: "https://login.microsoftonline.com/{tenant-id}/discovery/v2.0/keys"
      identity:
        clientId: "{client-id}"
        audience: "{client-id}"
        existingSecret: "identity-client-secret"

identity:
  env:
    - name: CAMUNDA_SECURITY_AUTHENTICATION_METHOD
      value: "OIDC"
    - name: CAMUNDA_SECURITY_CERT_AUTH_ENABLED
      value: "true"
    - name: CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GRANTTYPE
      value: "client_credentials"
    - name: CAMUNDA_SECURITY_AUTHENTICATION_OIDC_SCOPES
      value: "{client-id}/.default"
    - name: CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_PATH
      value: "/certs/identity.p12"
    - name: CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_PASSWORD
      valueFrom:
        secretKeyRef:
          name: identity-certificate-secret
          key: keystore-password
    - name: CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_KEY_ALIAS
      value: "identity"
    - name: CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_KEY_PASSWORD
      valueFrom:
        secretKeyRef:
          name: identity-certificate-secret
          key: key-password
    - name: CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED
      value: "false"
    - name: SPRING_PROFILES_ACTIVE
      value: "oidc"
  
  extraVolumes:
    - name: certificate-volume
      secret:
        secretName: identity-certificate-secret
        items:
          - key: identity.p12
            path: identity.p12
  
  extraVolumeMounts:
    - name: certificate-volume
      mountPath: /certs
      readOnly: true
```

Create Kubernetes secrets for certificate and passwords:

```bash
# Create certificate secret
kubectl create secret generic identity-certificate-secret \
  --from-file=identity.p12=/path/to/identity.p12 \
  --from-literal=keystore-password=your-password \
  --from-literal=key-password=your-password
```

</TabItem>

<TabItem value="manual">

For manual installations, configure the following environment variables or application properties:

```bash
# Core Configuration
export CAMUNDA_DATABASE_CLUSTERNAME=elasticsearch
export CAMUNDA_DATABASE_TYPE=elasticsearch
export CAMUNDA_DATABASE_URL=http://localhost:9200

# Basic OIDC Configuration
export CAMUNDA_IDENTITY_TYPE=MICROSOFT
export CAMUNDA_IDENTITY_ISSUER=https://login.microsoftonline.com/ea952511-6a7f-40b8-af71-6c1be6f0dade/v2.0
export CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=https://login.microsoftonline.com/ea952511-6a7f-40b8-af71-6c1be6f0dade/v2.0
export CAMUNDA_IDENTITY_CLIENT_ID=6fe432f2-7dc3-4e13-b1b4-4cc8480c80b7
export CAMUNDA_IDENTITY_AUDIENCE=6fe432f2-7dc3-4e13-b1b4-4cc8480c80b7

# Certificate Authentication
export CAMUNDA_SECURITY_AUTHENTICATION_METHOD=OIDC
export CAMUNDA_SECURITY_CERT_AUTH_ENABLED=true
export CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GRANTTYPE=client_credentials
export CAMUNDA_SECURITY_AUTHENTICATION_OIDC_SCOPES="2622078b-0164-41ee-8794-3ff8d9f8e402/.default"
export CAMUNDA_SECURITY_AUTHENTICATION_OIDC_JWK_SET_URI=https://login.microsoftonline.com/ea952511-6a7f-40b8-af71-6c1be6f0dade/discovery/v2.0/keys

# Certificate Configuration
export CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_PATH=/path/to/identity.p12
export CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_PASSWORD=password
export CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_KEY_ALIAS=identity
export CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_KEY_PASSWORD=password

# Zeebe Configuration
export ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CONNECT_TYPE=elasticsearch
export ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CONNECT_URL=http://localhost:9200
export ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_CLASSNAME=io.camunda.exporter.CamundaExporter
export ZEEBE_GATEWAY_CLUSTER_INITIALCONTACTPOINTS=zeebe:26502
export ZEEBE_CLIENT_ASSERTION_KEYSTORE_PATH=/path/to/zeebe.p12
export ZEEBE_CLIENT_ASSERTION_KEYSTORE_PASSWORD=password
export ZEEBE_CLIENT_ASSERTION_KEYSTORE_KEY_ALIAS=zeebe

# Security Configuration
export CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED=false
export CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI=true

# Optional Features
export CAMUNDA_PERSISTENT_SESSIONS_ENABLED=true
export INITIAL_CLAIM_VALUE=aaa3a5e0-1479-477b-af0e-4747374b9ed6

# Activate OIDC Profile
export SPRING_PROFILES_ACTIVE=oidc
```

</TabItem>

</Tabs>

### Step 4: Verify configuration

1. **Start Identity service** with the new configuration
2. **Check logs** for successful certificate loading:

   ```
   INFO  Loading certificate from keystore: /path/to/identity.p12
   INFO  Certificate loaded successfully with alias: identity
   ```
3. **Test authentication** by accessing Identity endpoints:

   ```bash
   curl -X GET "http://localhost:8080/identity/api/authentication/me"
   ```

## Authentication flow

The certificate-based authentication demonstrates Identity's dual role through this sequence:

### Complete Request Flow

1. **Request initiated**: Frontend makes API call to Identity service (e.g., `POST /v2/mapping-rules/search`)
2. **Resource Server role**: Identity service determines authentication is required for protected endpoint
3. **OAuth2 Client role begins**: Service detects no valid authentication exists
4. **JWT assertion created**: Identity (as OAuth2 Client) creates signed JWT using certificate private key
5. **Token request**: JWT assertion sent to Microsoft Entra token endpoint
6. **Certificate validation**: Microsoft Entra validates JWT signature against uploaded certificate
7. **Access token issued**: Microsoft Entra returns access token upon successful validation
8. **Resource Server role resumes**: Identity decodes access token into `JwtAuthenticationToken`
9. **Authorization check**: Service extracts authorities from JWT claims and validates permissions
10. **Request authorized**: Original API request proceeds with proper authentication context

### Dual Role Interaction

- **Steps 1-2, 8-10**: Identity acts as **Resource Server** (validating and authorizing API requests)
- **Steps 3-7**: Identity acts as **OAuth2 Client** (requesting tokens from MS Entra)
- **Session storage**: Authentication cached for subsequent requests to avoid repeated OAuth2 flows

### JWT Client Assertion structure

The JWT assertion includes the following claims:

```json
{
  "aud": "https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token",
  "iss": "{client-id}",
  "sub": "{client-id}",
  "jti": "{unique-identifier}",
  "iat": 1234567890,
  "exp": 1234567890,
  "kid": "{certificate-thumbprint}"
}
```

## Configuration reference

### Required environment variables

| Variable                                                                      | Description                          | Example               |
|:------------------------------------------------------------------------------|:-------------------------------------|:----------------------|
| `CAMUNDA_SECURITY_CERT_AUTH_ENABLED`                                         | **Enable certificate authentication** | `true`                |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_PATH`         | Path to PKCS#12 certificate file     | `/certs/identity.p12` |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_PASSWORD`     | Password for certificate keystore    | `your-password`       |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_KEY_ALIAS`    | Alias of the certificate in keystore | `identity`            |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_ASSERTION_KEYSTORE_KEY_PASSWORD` | Password for certificate private key | `your-password`       |

### Microsoft Entra specific configuration

| Variable                                         | Value                  | Description                                   |
|:-------------------------------------------------|:-----------------------|:----------------------------------------------|
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GRANTTYPE` | `client_credentials`   | OAuth2 grant type for service-to-service auth |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_SCOPES`    | `{client-id}/.default` | Microsoft Entra requires `.default` suffix    |
| `CAMUNDA_IDENTITY_TYPE`                          | `MICROSOFT`            | Configures Microsoft-specific OIDC behavior   |

## Complementary authentication: mTLS support

**✅ New in Camunda 8.8**: Generic mutual TLS (mTLS) authentication support alongside MS Entra certificate authentication

Camunda 8.8 introduces dual certificate authentication capabilities:

### Authentication methods comparison

| Feature                    | MS Entra Certificate Auth                 | mTLS Authentication                        |
|:---------------------------|:------------------------------------------|:-------------------------------------------|
| **Use Case**               | OAuth2 service-to-service with MS Entra   | Direct certificate authentication (any CA) |
| **Authentication Flow**    | OAuth2 Client Credentials + JWT assertion | Direct X.509 certificate validation        |
| **Protocol**               | OIDC/OAuth2                               | mutual TLS (mTLS)                          |
| **Certificate Validation** | Via Microsoft Entra ID                    | Via configured trusted CAs                 |
| **Session Management**     | HTTP sessions + SecurityContext           | Spring Security authentication             |
| **Supported Endpoints**    | `/v2/**` APIs (mapping rules, etc.)       | All API endpoints                          |
| **Configuration Method**   | OIDC environment variables                | mTLS-specific environment variables        |

### mTLS Configuration

Enable mTLS authentication alongside MS Entra support:

```bash
# Authentication Method (BASIC required for mTLS)
CAMUNDA_SECURITY_AUTHENTICATION_METHOD=BASIC

# SSL/TLS Server Configuration  
SERVER_SSL_ENABLED=true
SERVER_SSL_KEY_STORE=/path/to/server-keystore.p12
SERVER_SSL_KEY_STORE_PASSWORD=changeit
SERVER_SSL_KEY_STORE_TYPE=PKCS12
SERVER_SSL_KEY_ALIAS=tomcat
SERVER_SSL_CLIENT_AUTH=need
SERVER_SSL_TRUST_STORE=/path/to/truststore.p12
SERVER_SSL_TRUST_STORE_PASSWORD=changeit
SERVER_SSL_TRUST_STORE_TYPE=PKCS12
SERVER_PORT=8443

# mTLS Authentication
CAMUNDA_SECURITY_AUTHENTICATION_MTLS_ENABLED=true
CAMUNDA_SECURITY_AUTHENTICATION_MTLS_TRUSTEDCERTIFICATES=/path/to/ca-cert.pem
CAMUNDA_SECURITY_AUTHENTICATION_MTLS_REQUIREVALIDCHAIN=true
CAMUNDA_SECURITY_AUTHENTICATION_MTLS_DEFAULT_ROLES=ROLE_USER,ROLE_ADMIN

# Security Settings
CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI=true
CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED=false
CAMUNDA_SECURITY_CSRF_ENABLED=false
```

### Architecture with dual authentication

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   MS Entra      │    │    Camunda       │    │   mTLS Client   │
│   OAuth2 Flow   │    │    Identity      │    │   (Direct TLS)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
    JWT Client                   │               X.509 Certificate
    Assertion                    │               Authentication
         │                       │                       │
         └─── OAuth2 Token ──────┤───── mTLS Auth ──────┘
                                 │
                            Spring Security
                          (Multiple Auth Methods)
```

### Use cases for each method

**MS Entra Certificate Authentication**:
- Integration with Microsoft ecosystem
- Enterprise identity management
- OAuth2 compliance requirements
- Service-to-service authentication with Entra ID

**mTLS Authentication**:
- Direct certificate authentication without external IdP
- Microservices communication
- API client authentication
- Legacy system integration
- Development/testing with self-signed certificates

## Security considerations

### Certificate management

- **Store certificates securely** with appropriate file permissions (600 or 400)
- **Use strong passwords** for certificate keystores
- **Implement certificate rotation** before expiration
- **Monitor certificate validity** with automated alerts

### Network security

- **Use HTTPS** for all Identity service endpoints
- **Restrict network access** to certificate files
- **Configure firewall rules** for Microsoft Entra endpoints

### Security implementation (Camunda 8.8)

**Security Architecture**: MS Entra certificate authentication implements comprehensive security controls:

**Role Management**:
- **Configuration-Based Assignment**: All role assignments require explicit configuration via environment variables
- **Security Audit Logging**: Admin role assignments are logged with security warnings for monitoring
- **Minimal Default Access**: Users receive only explicitly configured roles, no automatic privilege escalation

**Authentication Security**:
- **JWT Token Validation**: Proper token validation with authority extraction from MS Entra JWT claims
- **Session Management**: Thread-safe authentication storage using HTTP sessions and SecurityContext
- **Certificate Validation**: JWT client assertions validated against certificates uploaded to MS Entra

**Access Control**:
- **Endpoint Protection**: `/v2/**` APIs protected with proper authentication requirements
- **Authorization Checks**: Spring Security integration with role-based access control
- **Thread Safety**: MODE_INHERITABLETHREADLOCAL ensures authentication context preservation across request processing

## Troubleshooting

### Common issues

**Issue**: Certificate not loading

```
ERROR Certificate keystore not found: /path/to/identity.p12
```

**Solution**: Verify file path, permissions, and password

**Issue**: JWT signature verification fails

```
ERROR Microsoft Entra returned: invalid_client_assertion
```

**Solution**: Ensure certificate uploaded to Entra matches local certificate

**Issue**: Scope validation error

```
ERROR Invalid scope: missing .default suffix
```

**Solution**: Ensure scope ends with `/.default` for client_credentials flow

### Debug logging

Enable debug logging for detailed troubleshooting:

```bash
export LOGGING_LEVEL_IO_CAMUNDA_AUTHENTICATION=DEBUG
export LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_SECURITY=DEBUG
```

### Health checks

Monitor service health with these endpoints:

- **Authentication status**: `GET /v2/authentication/me`
- **Token validation**: `GET /v2/applications` (requires valid token)
- **Service health**: `GET /actuator/health`

## Limitations

When using Microsoft Entra certificate authentication, the following limitations apply:

- **Certificate rotation**: Requires application restart to load new certificates
- **Multiple certificates**: Only one certificate per Identity service instance
- **Algorithm support**: Currently supports RS256 (RSA with SHA-256)
- **Certificate validation**: No OCSP or CRL validation implemented

## Migration from client secrets

To migrate from client secret to certificate authentication:

1. **Generate and upload certificate** to Microsoft Entra
2. **Update configuration** with certificate-specific environment variables
3. **Remove client secret** configuration
4. **Restart Identity service** with new configuration
5. **Verify authentication** functionality

:::tip Production deployment
For production deployments, consider implementing:
- Certificate rotation automation
- Monitoring and alerting for authentication failures
- Backup authentication methods during certificate rotation
- Load balancer health checks for authentication endpoints
:::

## Additional resources

- [Microsoft Entra certificate credentials documentation](https://learn.microsoft.com/en-us/entra/identity-platform/certificate-credentials)
- [RFC 7523: JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication](https://tools.ietf.org/html/rfc7523)
- [Camunda 8 Identity configuration reference](/self-managed/components/management-identity/configuration/identity-configuration-overview.md)
- [OAuth 2.0 Client Credentials flow](https://oauth.net/2/grant-types/client-credentials/)