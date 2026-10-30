---
id: security
title: SaaS security
sidebar_label: Security
description: "Learn about encryption, secure connectivity, access controls, and compliance in Camunda 8 SaaS."
---

import SaasComplianceImg from './img/saas-compliance.png';
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

Camunda 8 SaaS protects your data with encryption, secure connectivity, access controls, and compliance certifications.

## Encryption and connectivity

| Security option                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Encryption at rest](/components/saas/encryption-at-rest.md)                           | <p>Cluster data is encrypted at rest to provide data security and protection.</p><p><ul><li><p>By default, Camunda 8 SaaS GCP and AWS cluster data at rest is protected with a provider-managed encryption key using GCP encryption. The encryption key is owned and managed by GCP.</p></li><li><p>Enterprise customers requiring a higher level of protection can select a dedicated Camunda-managed software or hardware (HSM) encryption key when creating a new GCP cluster. The encryption key is managed by Camunda using Google Cloud Key Management Service (KMS).</p></li><li><p>Camunda-managed encryption is not currently supported for AWS region clusters.</p></li></ul></p> |
| [Secure connectivity (AWS PrivateLink)](/components/saas/secure-connectivity/index.md) | Enable private inbound connectivity from your VPC to AWS-hosted Orchestration Clusters using AWS PrivateLink. Available for Enterprise plans.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## Access controls

Camunda 8 SaaS supports the following access controls.

| Access control type                                                                  | Description                                                                                                                                                                                                                                      |
| :----------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Single sign-on (SSO)](/components/saas/organization/external-sso.md)                | SSO is available for Enterprise plans, using Identity as a bridge between an OpenID Connect (OIDC) provider and the Camunda platform.                                                                                                            |
| [OAuth](/components/saas/clusters/manage-api-clients.md)                             | The OAuth service is used to allow client applications to interact with Zeebe in SaaS from the outside. Every client application must authenticate itself using an OAuth Flow.                                                                   |
| [Role based access (RBAC)](/components/hub/organization/users-and-roles.md)          | <p>Camunda 8 SaaS supports RBAC through a system of roles and permissions.</p><p>Each role provides a different level of access to Camunda 8 components, allowing organizations to control user permissions based on their responsibilities.</p> |
| [Resource-based authorization](/components/saas/organization/resource-based-auth.md) | Legacy feature for clusters before version 8.8. Resource authorizations allow you to control the level of access a user has to a particular resource in the system.                                                                              |

:::note
In Enterprise plans, the hostname section of the email address for invites can be restricted to meet your internal security policies. To learn more, [contact Camunda support](https://camunda.com/services/support/).
:::

## Compliance

<p><a title="Find a built-in connector" href="https://camunda.com/trust-center/" target="_new"><img src={SaasComplianceImg} alt="Visit the Camunda Trust Center" style={{border:0,padding:0,paddingLeft:20,margin:0,float: 'right', width: '25%'}} className="fade-in-top-image" title="Visit the Camunda Trust Center"/></a>At Camunda, we're committed to Information Security, Privacy and Compliance. Our mission is to establish trust through transparency.</p>

- Visit the [Camunda Trust Center](https://camunda.com/trust-center/) to learn more about our standards and certifications, including SOC 2 compliance, ISO/IEC 27001 certification, and GDPR Compliance.
- Camunda is a member of the [Cloud Security Alliance](https://cloudsecurityalliance.org/star/registry/camunda/services/camunda).
