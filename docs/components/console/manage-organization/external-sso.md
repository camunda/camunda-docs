---
id: external-sso
title: Connect your IDP with Camunda Platform
keywords: [SSO, IDP, AzureAD, SAML]
---

## Connecting your identity provider with Camunda Platform

For enterprise customers, we support integrating external identity providers, so users within your organization do not need to sign-up by creating an account with Camunda.

### Onboarding procedure

We currently support both SAML and AzureAD. As this requires changes in our environment, please raise a ticket in the [support queue](https://jira.camunda.com/projects/SUPPORT/).

#### SAML

After opening the ticket in the support queue, we will provide you:

- **Assertion Customer URL** - e.g. `https://weblogin.cloud.camunda.io/login/callback?connection=CUSTOMER_CONNECTION`
- **Entity ID**: e.g. `urn:auth0:camunda:CUSTOMER_CONNECTION`

You will then need to provide:

- the Domain used for the login email addresses
- a sign-in URL
- a x509 signing certificate

#### AzureAD

You will need to provide:

- the Domain used for the login email addresses
- the Microsoft Azure AD Domain
- generated Client ID
- the Client Secret Value

For generating the client on your side you will need to use the Camunda **Redirect Url** `https://weblogin.cloud.camunda.io/login/callback `.

Please make sure that you attach the user permissions `Users > User.Read`.
