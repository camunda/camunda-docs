---
id: external-sso
title: Connect your IdP with Camunda
keywords: [SSO, IDP, AzureAD, SAML]
description: "For enterprise customers, we support integrating external identity providers."
---

For customers in the Enterprise and Starter plans, we support integrating external identity providers (IdPs). Therefore, users within your organization do not need to sign up by creating an account with Camunda.

## Onboarding procedure

We currently support both SAML and Azure Active Directory (Azure AD). As this requires changes in our environment, first raise a ticket in the [support queue](https://jira.camunda.com/projects/SUPPORT/).

:::info
Expiring certificates or secrets must be renewed prior to their expiration date to avoid a service interruption.
:::

### SAML

After opening the ticket in the support queue, we will provide you:

- **Assertion Customer URL**: e.g. `https://weblogin.cloud.camunda.io/login/callback?connection=CUSTOMER_CONNECTION`
- **Entity ID**: e.g. `urn:auth0:camunda:CUSTOMER_CONNECTION`

You will then need to provide:

- The domain used for the login email addresses
- A sign-in URL
- A x509 signing certificate

### Azure AD

For Azure AD, you will need to provide:

- The domain used for the login email addresses
- The Microsoft Azure AD domain
- The generated client id
- The client secret value

To generate the client on your end, you will need to use the Camunda **Redirect URL** `https://weblogin.cloud.camunda.io/login/callback `. Ensure you attach the user permissions `Users > User.Read`.

### Default organizations <span class="badge badge--enterprise-only">Enterprise only</span>

:::info
Default organizations for external identity providers are only available for organizations on an Enterprise plan.
:::

By setting up an external identity provider, it is possible to configure up to 10 default organizations. The following information must be added in the ticket so that the support team can configure the default organizations:

- Organization Id
- Default organization roles

If a user logs in with the configured connection, the user is automatically assigned to these organizations with the corresponding roles.

### Additional information

In some situations, you might need to access `openid-configuration` to establish the connection from your end. See [this OpenID configuration](https://weblogin.cloud.camunda.io/.well-known/openid-configuration) as an example.

## Login

If your organization is using social login procedures (like GitHub or Google), these procedures will not work when using your own IdP with Camunda. Users must log in by providing their email address on the login screen.
