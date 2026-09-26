---
id: data-collection
title: "Data collection"
description: "Learn what telemetry data Camunda collects, how Camunda ensures privacy, and what options you have to choose the telemetry data sent to Camunda."
---

import AnalyticsImg from './../img/analytics.png';
import CookiePrefsImg from './../img/cookie-preferences.png';
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About data collection

Camunda collects telemetry data to evaluate contractual usage, provide a better user experience, and improve its products.

This page describes which telemetry data is collected by Camunda, respectively for Self-Managed and SaaS, how Camunda implements privacy controls, and what options are available to modify which telemetry data is sent to Camunda.

This information is designed to help you understand what telemetry data includes and excludes, applies only to interactions with Camunda's products, and will be updated periodically as required. It reflects the current set-up for SaaS and Self-Managed customers and does not describe future product releases or planned changes to telemetry settings.

## Purposes

Camunda collects certain types of data we call “telemetry data” for the purposes described below:

- Billing
- Improving the user experience by tracking and analyzing usage of the software
- Ensuring the security, stability, and functionality of the software
- Providing support and guidance to customers to help optimize product usage and new functionalities.

“Telemetry Data” means the technical and usage information Camunda collects about how its products are operated and used.

Depending on the source (described in [Telemetry data collection](#telemetry-data-collection)), Telemetry Data may include deployment and version information, summary usage metrics, process metadata such as process instance starts, decision evaluations, user task assignments, tenant events, definition deployments, incidents and agent instance events, and information about product usage in the Camunda SaaS applications such as browser, client, and pages accessed. It may contain Personal Data, including account identifiers, cookie identifiers, and the email address and name of a Camunda SaaS user.

## Principles

The table below summarizes what telemetry data includes and does not include. The principles that follow explain how Camunda handles it.

| Area                   | Telemetry data includes                                                                                                                                                                                     | Telemetry data does not include                                                                                                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deployment             | Environment data: Camunda and Analytics Exporter versions, cluster and partition identifiers                                                                                                                | Your license key (the exporter sends only a fingerprint of it)                                                                                                                                                 |
| Commercial usage       | Summary usage metrics, for example the number of process instances used against the number purchased                                                                                                        | -                                                                                                                                                                                                              |
| Process execution      | Process metadata: root process instance starts, decision evaluations, user task creation and assignment, incidents raised and resolved, agent instance starts and completions, tenant creation and deletion | Process variables, job variables, and payloads; message content and correlation keys; incident error messages; tenant names and descriptions                                                                   |
| Process design         | Definition deployments and deletions, with user-provided identifiers such as the process ID                                                                                                                 | BPMN, DMN, and form resources, resource names, and version tags; how you develop processes, such as keystrokes                                                                                                 |
| Data in your processes | -                                                                                                                                                                                                           | Data entered by end users, such as form fills (for example a shipping address); any personal data, PII, or PHI uploaded to a customer cluster                                                                  |
| AI features            | Which AI feature was invoked and how often (SaaS); agent instance status (Orchestration Cluster)                                                                                                            | Conversation content submitted to an AI feature (collected separately, see [AI conversation content](#ai-conversation-content)); agent system prompts, tool definitions, model configuration, and token counts |
| Camunda SaaS usage     | Features used, browser and client information, pages accessed; for user actions, cursor activity, a device identifier, and coarse location                                                                  | Browser-based data (cookies, device, location) for actions taken through the API                                                                                                                               |
| Personal data          | SaaS only: account identifiers, cookie and device identifiers, and the name and email address of Camunda SaaS users                                                                                         | Orchestration Cluster telemetry: no user names, email addresses, or assignee data                                                                                                                              |
| Payment                | -                                                                                                                                                                                                           | Payment information                                                                                                                                                                                            |

Camunda follows certain principles in its collection and use of telemetry data to safeguard the privacy of its customers and the success of its product development efforts:

- Camunda will use telemetry data subject to applicable law (including maintaining opt-in and opt-out functionalities for personal data where necessary). Telemetry data is generally aggregated unless users opt-in for personalized use of their telemetry data (for example, to provide additional support or optimize product usage to customers) therefore telemetry data is generally not considered to be personal data with the exception of only limited subsets of telemetry data which may be linked to user identifiers.
- Telemetry data does not include any data shared in process instances or uploaded in customer clusters. Therefore, no end-user or end-customer personal data, personal information (PII), or protected health information (PHI) uploaded to a customer cluster is part of telemetry data.
- Telemetry data does not include payment information.
- Camunda does not sell any personal (user) information.
- Where identifiers are retained for a lawful purpose, such telemetry data is pseudonymized and to be treated as personal data, however, where no identifiers are present, telemetry data is otherwise aggregated and anonymized.
- Data collected from end-users such as form fills or process variables are not part of telemetry data. For example, if part of your process involves a user filling in a shipping address, that address is not telemetry data.
- Assets like the BPMN diagram describing how a process is defined and executed are not telemetry data. Telemetry data does not include information about how customers develop their processes, like keystrokes or BPMN diagrams. Instead, it includes user-provided identifiers like a process ID to track which Camunda software features are used when developing a process.
- Customers are responsible for avoiding sharing intellectual property, personal data or sensitive data through interaction with AI features. The data collected by different AI features is shared [below](#camunda-saas-application-telemetry).
- Camunda will not use telemetry data in any way that identifies the source of the telemetry data to third parties except as necessary for Camunda to enforce its rights and contractual obligations, such as charging fees for overage of usage metrics or complying with a lawful subpoena.

## Telemetry at a glance: SaaS and Self-Managed

What Camunda collects and how you control it depend on how Camunda is deployed. Each source is described in [Telemetry sources in detail](#telemetry-sources-in-detail).

Three terms are used throughout:

- **Commercial usage data:** the counts Camunda uses to verify usage against your agreement and bill for overages.
- **Non-commercial usage data:** product usage Camunda uses to improve the software and support your deployment.
- **Environment data:** technical information about the deployment itself, such as the Camunda version, the Analytics Exporter version, and cluster identifiers. Environment data is not usage data: it does not describe how the product is used. Camunda uses it to detect offline clusters and gaps in the data it receives.

| Source                                                                | SaaS                                                                                                                          | Self-Managed                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Usage metrics reporting (commercial)                                  | Collected automatically.                                                                                                      | Not sent to Camunda. Computed locally: you retrieve them through the usage metrics API and share them with Camunda as your agreement requires.                                                                                                       |
| Orchestration Cluster telemetry, commercial (`contractual`)           | Enabled by default. Required to operate the service and cannot be disabled.                                                   | Off by default. Sent only if your administrator enables the Analytics Exporter with the `contractual` category. See [Choose what is sent](/self-managed/components/orchestration-cluster/zeebe/exporters/analytics-exporter.md#choose-what-is-sent). |
| Orchestration Cluster telemetry, non-commercial (`optional`)          | Enabled by default. To disable it, contact your Camunda account team (CSM/TAM).                                               | Off by default. Sent only if your administrator enables the Analytics Exporter with the `optional` category.                                                                                                                                         |
| Environment data                                                      | Enabled by default. Sent with Orchestration Cluster telemetry and cannot be disabled.                                         | Sent whenever the Analytics Exporter is enabled, regardless of the categories selected. Not sent while the exporter is disabled.                                                                                                                     |
| SaaS application telemetry, system actions and backend-sourced events | Collected automatically. Not controlled by cookie preferences.                                                                | Not applicable.                                                                                                                                                                                                                                      |
| SaaS application telemetry, user actions                              | Controlled per user through cookie preferences. Accepting essential cookies stops browser-based collection.                   | Not applicable.                                                                                                                                                                                                                                      |
| AI feature usage                                                      | Controlled per organization: AI features are opt-in in the Console.                                                           | Not applicable.                                                                                                                                                                                                                                      |
| SaaS user-lifecycle events                                            | Enabled by default. Required to operate the service and collected under the Terms of Service. There is no individual opt-out. | Not applicable.                                                                                                                                                                                                                                      |
| Desktop Modeler telemetry                                             | Not applicable.                                                                                                               | Enabled at first run unless you turn it off. Controlled per installation.                                                                                                                                                                            |

## Telemetry data collection

Telemetry data is grouped by its source. Each source below states what it contains, whether the data is commercial or non-commercial, and how you control it.

| Source                                                                                                                                                                                                  | Commercial usage data                                                                                       | Non-commercial usage data                                                                                                                                                                        | Applies to            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| Usage metrics reporting                                                                                                                                                                                 | Contractually agreed usage metrics                                                                          | None                                                                                                                                                                                             | SaaS and Self-Managed |
| [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) telemetry, sent by the [Analytics Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/analytics-exporter.md) | Root process instance starts, decision evaluations, user task assignments, and tenant creation and deletion | Product usage and operational events. The full list is on the [Analytics Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/analytics-exporter.md#what-data-is-sent) page. | SaaS and Self-Managed |
| Camunda SaaS application telemetry                                                                                                                                                                      | None                                                                                                        | System actions, user actions, and AI feature usage                                                                                                                                               | SaaS only             |
| Camunda SaaS user-lifecycle events                                                                                                                                                                      | None                                                                                                        | Sign-ins, user records, invitations, and membership or role changes                                                                                                                              | SaaS only             |
| Desktop Modeler telemetry                                                                                                                                                                               | None                                                                                                        | Feature usage                                                                                                                                                                                    | Self-Managed only     |

Environment data is not usage data, so it is not listed in this table. How to control each source, for SaaS and for Self-Managed, is shown in [Telemetry at a glance](#telemetry-at-a-glance-saas-and-self-managed).

## Telemetry sources in detail

### Usage metrics reporting

**Data category:** Commercial usage data only. This source does not collect non-commercial usage data.

**Applies to:** SaaS and Self-Managed.

This is a limited set of contractually agreed [usage metrics](/reference/data-collection/usage-metrics.md) used to measure consumption against your agreement and calculate any applicable overage charges. One example is how many process instance usage metrics are used compared to the number of process instance usage metrics purchased by customers. These are summary usage metrics that contain no sensitive information. They are collected automatically for SaaS customers. On Self-Managed they are computed locally and do not leave your installation: you retrieve them through the usage metrics API and share them with Camunda as your agreement requires.

### Orchestration Cluster telemetry

**Data category:** Commercial usage data (`contractual`) and non-commercial usage data (`optional`), plus environment data.

**Applies to:** SaaS and Self-Managed.

The [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) can send product telemetry directly to Camunda through the [Analytics Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/analytics-exporter.md).

Usage telemetry is grouped into two categories, shown below. In addition, environment data is sent whenever the exporter runs, whichever categories you select. See [Always-on signals](/self-managed/components/orchestration-cluster/zeebe/exporters/analytics-exporter.md#always-on-signals).

| Category        | What it contains          | Why Camunda collects it                                                                      |
| --------------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| **Contractual** | Commercial usage data     | To verify usage against the metrics in your agreement.                                       |
| **Optional**    | Non-commercial usage data | To understand how the product is used, prioritize improvements, and support your deployment. |

For a complete field-level list of the data sent, see [what data is sent](/self-managed/components/orchestration-cluster/zeebe/exporters/analytics-exporter.md#what-data-is-sent).

### Camunda SaaS application telemetry

**Data category:** Non-commercial usage data only. This source does not collect commercial usage data.

**Applies to:** SaaS only.

This is limited product usage data from the Camunda SaaS applications, used to make better product improvement decisions and to enable outreach to support users.

- Feature Usage:
  - SaaS System Actions: All SaaS organizations submit basic information about which features are being used as part of telemetry data collection. When certain features are used, Camunda logs which feature is used and basic information about how it has been used. This information is tied to a pseudonymized organization.
  - SaaS User Actions: Users that opt-in to personalization cookies gain access to in-app tutorials, whereas analytics cookies cause data to be automatically submitted about which features they interact with in Camunda’s UI as part of telemetry data. In addition to the data collected from system actions described above, Camunda collects cursor activity, geographical area, browser information, a device identifier, and basic biographical information limited to email, name, and city/region/country for user actions. Interactions through the API do not trigger this browser-based collection.
  - Accepting essential cookies only stops this browser-based collection. Some events generated by the Camunda SaaS backends still reach the analytics platform, keyed by an internal user identifier and not gated by cookie preferences. These carry no browser or location data.

  <img src={CookiePrefsImg} alt="Cookie preferences in user settings" width="300px" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}}/>
  <img src={AnalyticsImg} alt="Analytics opt-in menu" width="500px" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}}/>

- AI Usage: Camunda's AI features, currently available in SaaS only, are clearly labeled as AI features. Usage telemetry for these features, meaning which feature was invoked and how often, is telemetry data. Conversation content submitted to an AI feature is not telemetry data: it is content you provide to the feature, and it is covered separately below. These features must be enabled by the customer via opt-in in [Camunda Hub](/components/hub/organization/manage-organization-settings/enable-alpha-features.md#enable-ai-powered-features). Depending on the feature, they may collect different information.

#### AI conversation content

The following is content users submit to an AI feature, and Camunda collects it:

- Camunda [Docs AI](/components/hub/workspace/modeler/modeling/advanced-modeling/camunda-docs-ai.md) records the entire conversation to provide ongoing support.
- Camunda [Copilots](/components/early-access/alpha/bpmn-copilot/bpmn-copilot.md) gather usage telemetry data. Camunda automatically logs all information sent to and from our AI models for system monitoring by a limited set of operators. Camunda will only use the data from free users for product and model improvement.

#### Example

Below is an example of user action data collected by the platform:

```json
{
  "event": "modeler:deploy:confirm",
  "properties": {
    "time": 1721228056.002,
    "distinct_id": "auth0|669533a8339ceebe5e8f7fed",
    "$browser": "Microsoft Edge",
    "$browser_version": 126,
    "$city": "Gotham City",
    "$current_url": "https://modeler.camunda.io/diagrams/a8c077ae-22d6-4be3-bebb-a847f40376fe--batsymbol-activate?v=736,217,1",
    "$device_id": "190b6d254651ec-0a7e1ef548a163-4c657b58-e1000-190b6d2518f1ec",
    "$initial_referrer": "https://console.camunda.io/",
    "$initial_referring_domain": "console.camunda.io",
    "$insert_id": "xjsmufevamu6v5y7",
    "$lib_version": "2.53.0",
    "$mp_api_endpoint": "api-js.mixpanel.com",
    "$mp_api_timestamp_ms": 1721228056805,
    "$os": "Windows",
    "$referrer": "https://dsm-1.operate.camunda.io/",
    "$referring_domain": "dsm-1.operate.camunda.io",
    "$region": "New Jersey",
    "$screen_height": 1080,
    "$screen_width": 1920,
    "$user_id": "auth0|669533a8339ceebe5e8f7fed",
    "clusterId": "ea9ddef9-f1e3-4241-a37c-655334c45de8",
    "clusterTag": "dev",
    "clusterVersion": "8.5",
    "connectors": ["io.camunda.connectors.HttpJson.v2"],
    "containsUserTasks": true,
    "deployType": "single-file",
    "deployedForms": {
      "Form_0ec4ghh": "764a75e7-85a8-448f-8a1f-4952cc8a189d"
    },
    "fileId": "a8c077ae-22d6-4be3-bebb-af97040123fe",
    "fileType": "bpmn",
    "license": "Free",
    "mp_country_code": "US",
    "mp_lib": "web",
    "mp_processing_time_ms": 1721228056937,
    "mp_sent_by_lib_version": "2.53.0",
    "orgId": "30ba73a-4b2f-433f-80e5-d41176874bb5",
    "org_id": "30ba73a-4b2f-433f-80e5-d41176874bb5",
    "organizationId": "30ba73a-4b2f-433f-80e5-d41176874bb5",
    "stage": "prod",
    "success": true,
    "userId": "auth0|669533a8339ceebe5e8f7fed",
    "version": "8.5.4"
  }
}
```

### Camunda SaaS user-lifecycle events

**Data category:** Non-commercial usage data only. This source does not collect commercial usage data.

**Applies to:** SaaS only.

The Camunda SaaS account and organization services record sign-ins, user records, invitations, and membership or role changes. These records include the name and email address of the Camunda SaaS user.

Unlike the application telemetry above, these events are not controlled through cookie preferences. They are required to operate the service and are collected under the Terms of Service, with no individual opt-out.

### Desktop Modeler telemetry

**Data category:** Non-commercial usage data only. This source does not collect commercial usage data.

**Applies to:** Self-Managed only.

Telemetry collection in [Desktop Modeler](/components/modeler/desktop-modeler/telemetry/telemetry.md) is enabled at first run unless you turn it off, and is controlled per installation. It tracks how certain features are used.

## Identifiability

The sections above describe each telemetry source. This section applies across all of them: it explains how identifiable the data from each source is.

Camunda distinguishes between three states and handles each differently:

| State                     | Meaning                                                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Anonymous**             | No individual can be distinguished, including by combining the data with other records. Aggregate counts fall into this category. |
| **Pseudonymized**         | Direct identifiers are replaced with substitute values, but an individual can still be distinguished across records.              |
| **Directly identifiable** | An individual can be identified directly, for example by name or email address.                                                   |

Pseudonymized data is personal data. Replacing an identifier with a substitute value does not make the data anonymous, because the individual can still be singled out.

Where each category of telemetry sits:

| Telemetry                                                                     | Identifiability       |
| ----------------------------------------------------------------------------- | --------------------- |
| Usage metrics reporting                                                       | Anonymous             |
| Environment data                                                              | Anonymous             |
| Orchestration Cluster telemetry (Analytics Exporter)                          | Anonymous             |
| Camunda SaaS application telemetry, system actions and backend-sourced events | Pseudonymized         |
| Camunda SaaS application telemetry, user actions                              | Directly identifiable |
| Camunda SaaS user-lifecycle events                                            | Directly identifiable |
| Desktop Modeler telemetry                                                     | Pseudonymized         |

### Where identifiers are retained

Identifiers that can distinguish an individual are retained in Camunda SaaS only, in three places:

- SaaS application telemetry, user actions. An account identifier, a device identifier, coarse location, and the email address and name of the Camunda SaaS user.
- SaaS application telemetry, backend-sourced events. An internal user identifier.
- SaaS user-lifecycle events. The name and email address of the Camunda SaaS user, recorded with sign-ins, user records, invitations, and membership or role changes.

No other telemetry described on this page retains an identifier that can distinguish an individual.

Desktop Modeler telemetry carries a randomly generated installation identifier. It is persistent, so it can distinguish one installation from another across records, but it is not linked to a Camunda account and does not identify an individual.

To object to processing, or to make a data subject request, contact Camunda through the route described in the [Privacy Policy](https://legal.camunda.com/privacy-and-data-protection#product-privacy-policy).
