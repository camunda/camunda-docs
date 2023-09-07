---
id: external-sso
title: Connect your IDP with Camunda
keywords: [SSO, IDP, AzureAD, SAML]
description: "For enterprise customers, we support integrating external identity providers."
---

## Connecting your identity provider with Camunda

For customers in the Enterprise and Professional plans, we support integrating external identity providers (IdPs). Therefore, users within your organization do not need to sign up by creating an account with Camunda.

### Onboarding procedure

We currently support both SAML and Azure Active Directory (Azure AD). As this requires changes in our environment, first raise a ticket in the [support queue](https://jira.camunda.com/projects/SUPPORT/).

#### SAML

After opening the ticket in the support queue, we will provide you:

- **Assertion Customer URL** - e.g. `https://weblogin.cloud.camunda.io/login/callback?connection=CUSTOMER_CONNECTION`
- **Entity ID**: e.g. `urn:auth0:camunda:CUSTOMER_CONNECTION`

You will then need to provide:

- The domain used for the login email addresses
- A sign-in URL
- A x509 signing certificate

#### Azure AD

For Azure AD, you will need to provide:

- The domain used for the login email addresses
- The Microsoft Azure AD domain
- The generated client id
- The client secret value

To generate the client on your end, you will need to use the Camunda **Redirect URL** `https://weblogin.cloud.camunda.io/login/callback `. Ensure you attach the user permissions `Users > User.Read`.
