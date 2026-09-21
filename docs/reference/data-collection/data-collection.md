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

This page describes which telemetry data is collected by Camunda Enterprise 8.10, respectively for Self-Managed and SaaS, how Camunda implements privacy controls, and what options you have to modify which telemetry data is sent to Camunda.

This information is designed to help you understand what telemetry data includes and excludes, applies only to interactions with Camunda's products, and will be updated periodically as required. It reflects the current set-up for SaaS and Self-Managed customers and does not describe future product releases or planned changes to telemetry settings.

## Purposes

Camunda collects certain types of data we call “telemetry data” for the purposes described below:

- Billing
- Improving the user experience by tracking and analyzing usage of the software
- Ensuring the security, stability, and functionality of the software
- Providing support and guidance to customers to help optimize product usage and new functionalities.

“Telemetry Data” means the technical and usage information Camunda collects about how its products are operated and used. It covers the five sources described in [Telemetry data collection](#telemetry-data-collection) below: usage metrics reporting, Orchestration Cluster telemetry, Camunda SaaS application telemetry, Camunda SaaS user-lifecycle events, and Desktop Modeler telemetry. Each of these applies to SaaS, to Self-Managed, or to both, as set out in that section.

Depending on the source, Telemetry Data may include deployment and version information, summary usage metrics, process metadata such as process instance starts, decision evaluations, user task assignments, tenant events, definition deployments, incidents and agent instance events, and information about product usage in the Camunda SaaS applications such as browser, client, and pages accessed. It may contain Personal Data, including account identifiers, cookie identifiers, and the email address and name of a Camunda SaaS user.

Telemetry Data does not include the content your processes handle. It never includes process variables, payloads, message content, incident error messages, or BPMN, DMN, and form resources, and it does not include payment information.

## Principles

Camunda follows certain principles in its collection and use of telemetry data to safeguard the privacy of its customers and the success of its product development efforts:

- Camunda will use telemetry data subject to applicable law (including maintaining opt-in and opt-out functionalities for personal data where necessary). Telemetry data is generally aggregated unless users opt-in for personalized use of their telemetry data (for example, to provide additional support or optimize product usage to customers), therefore telemetry data is generally not considered to be personal data, with the exception of only limited subsets of telemetry data which may be linked to user identifiers.
- Telemetry data does not include any data shared in process instances or uploaded in customer clusters. Therefore, **no end-user or end-customer personal data**, personal information (PII), or protected health information (PHI) uploaded to a customer cluster is part of telemetry data.
- Telemetry data does **not include payment information**.
- Camunda does **not sell any personal (user) information.**
- **Telemetry data is pseudonymized where identifiers are retained for a lawful purpose, and otherwise aggregated and anonymized.** Where an identifier can distinguish one individual from others, Camunda treats the data as personal data and handles it accordingly. See [Identifiability and lawful basis](#identifiability-and-lawful-basis).
- **Telemetry is used for product improvement, diagnostics, performance, billing, and account-level analytics.** Camunda does not use telemetry data for automated decision-making producing legal or similarly significant effects on natural persons.
- **For Self-Managed customers, telemetry from the [Orchestration Cluster](/reference/glossary.md#orchestration-cluster), the Camunda 8 runtime that executes your processes, is disabled by default.** This data is sent only after an administrator enables it. See [Orchestration Cluster telemetry](#orchestration-cluster-telemetry-analytics-exporter).
- Data collected from end-users such as form fills or process variables are not part of telemetry data. For example, if part of your process involves a user filling in a shipping address, that address is not telemetry data.
- Assets like the BPMN diagram describing how a process is defined and executed are not telemetry data. Telemetry data does not include information about how customers develop their processes, like keystrokes or BPMN diagrams. Instead, it includes user-provided identifiers like a process ID to track which Camunda software features are used when developing a process.
- Customers are responsible for avoiding sharing intellectual property, personal data or sensitive data through interaction with AI features. The data collected by different AI features is shared [below](#camunda-saas-application-telemetry).
- Camunda will not use telemetry data in any way that identifies the source of the telemetry data to third parties except as necessary for Camunda to enforce its rights and contractual obligations, such as charging fees for overage of usage metrics or complying with a lawful subpoena.

## Telemetry data collection

Telemetry data is grouped by where it comes from. Each source below states what it contains, whether the data is commercial or non-commercial, and how you control it.

Two terms are used throughout:

- **Commercial usage data**: the counts Camunda uses to verify usage against your agreement and bill for overages.
- **Non-commercial usage data**: product usage Camunda uses to improve the software and support your deployment. It is never billed.

Environment data, meaning deployment and version information such as the Camunda version, accompanies both.

| Source                                                          | Commercial usage data                                                                                       | Non-commercial usage data                                                                                                          | How it is controlled                                                                      |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Usage metrics reporting                                         | Contractually agreed usage metrics                                                                          | None                                                                                                                               | SaaS: collected automatically. Self-Managed: sent in a report you generate.               |
| Orchestration Cluster telemetry, sent by the Analytics Exporter | Root process instance starts, decision evaluations, user task assignments, and tenant creation and deletion | Definition deployments and deletions, incidents raised and resolved, user task creation, and agent instance starts and completions | Self-Managed: off until an administrator enables it. SaaS: on, contact your account team. |
| Camunda SaaS application telemetry                              | None                                                                                                        | System actions, user actions, and AI feature usage                                                                                 | Per user, through cookie preferences.                                                     |
| Camunda SaaS user-lifecycle events                              | None                                                                                                        | Sign-ins, user records, invitations, and membership or role changes                                                                | Required under the Terms of Service. No individual opt-out.                               |
| Desktop Modeler telemetry                                       | None                                                                                                        | Feature usage                                                                                                                      | Per installation.                                                                         |

### Usage metrics reporting

Commercial usage data. This is a limited set of contractually agreed [usage metrics](/reference/data-collection/usage-metrics.md) used to evaluate usage metric use and bill for overages. One example is how many process instance usage metrics are used compared to the number of process instance usage metrics purchased by customers. These are summary usage metrics that contain no sensitive information. They are collected automatically for SaaS customers and sent in a report generated by Self-Managed customers.

### Orchestration Cluster telemetry (Analytics Exporter)

Starting with Camunda 8.10, the [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) can send product telemetry directly to Camunda through the [Analytics Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/analytics-exporter.md), an optional component inside the cluster. This telemetry contains process metadata only. It never includes process variables, payloads, message content, incident error messages, or BPMN, DMN, or form resources.

It carries both commercial and non-commercial usage data. On Self-Managed, an administrator selects which of the two is sent, using the values `contractual` and `optional` in the exporter's `categories` configuration option. These are configuration values, not a separate category system.

| `categories` value | Type                      | What it contains                                                                                                                                                | Why Camunda collects it                                                                      |
| ------------------ | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `contractual`      | Commercial usage data     | Root process instance starts, decision evaluations, user task assignments, and tenant creation and deletion.                                                    | To verify usage against the metrics in your agreement and to bill for overages.              |
| `optional`         | Non-commercial usage data | Process, decision, and form definition deployments and deletions; incidents raised and resolved; user task creation; and agent instance starts and completions. | To understand how the product is used, prioritize improvements, and support your deployment. |

Whichever values are set, Camunda receives a periodic heartbeat: a liveness signal carrying only the Camunda version and the exporter version, and no usage or customer data. Camunda uses it to detect gaps in the data and offline clusters.

For a complete field-level list of the data sent, see [what data is sent](/self-managed/components/orchestration-cluster/zeebe/exporters/analytics-exporter.md#what-data-is-sent).

### Camunda SaaS application telemetry

Non-commercial usage data only. This is limited product usage data from the Camunda SaaS applications, used to make better product improvement decisions and to enable outreach to support users.

- Feature Usage:
  - SaaS System Actions: All SaaS organizations submit basic information about which features are being used as part of telemetry data collection. When certain features are used, Camunda logs which feature is used and basic information about how it has been used. This information is tied to a pseudonymized organization.
  - SaaS User Actions: Users that opt-in to personalization cookies gain access to in-app tutorials, whereas analytics cookies cause data to be automatically submitted about which features they interact with in Camunda’s UI as part of telemetry data. In addition to the data collected from system actions described above, Camunda collects cursor activity, geographical area, browser information, a device identifier, and basic biographical information limited to email, name, and city/region/country for user actions. If a user interacts through an API, then personal data is not collected.

  <img src={CookiePrefsImg} alt="Cookie preferences in user settings" width="300px" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}}/>
  <img src={AnalyticsImg} alt="Analytics opt-in menu" width="500px" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}}/>

- AI Usage: Camunda's AI features, currently available in SaaS only, are clearly labeled as AI features. For Enterprise organizations, these features must be enabled by the customer via opt-in in the [Console](/components/hub/organization/manage-organization-settings/enable-alpha-features.md#enable-ai-powered-features). Depending on the feature, they may collect different information.
  - Camunda [Docs AI](/components/hub/workspace/modeler/modeling/advanced-modeling/camunda-docs-ai.md) records the entire conversation to provide ongoing support.
  - Camunda [Copilots](/components/early-access/alpha/bpmn-copilot/bpmn-copilot.md) only gather usage telemetry data. Camunda automatically logs all information sent to and from our AI models for system monitoring by a limited set of operators. Camunda will only use the data from free users for product and model improvement.

#### Example

Below is an example of SaaS user action data collected by the platform:

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

Non-commercial usage data only. The Camunda SaaS account and organization services record sign-ins, user records, invitations, and membership or role changes. These records include the name and email address of the Camunda SaaS user.

Unlike the application telemetry above, these events are not controlled through cookie preferences. They are required to operate the service and are collected under the Terms of Service, with no individual opt-out.

### Desktop Modeler telemetry

Non-commercial usage data only. Users opting into collection of telemetry data in [Desktop Modeler](/components/modeler/desktop-modeler/telemetry/telemetry.md) send data to Camunda to track how certain features are used, as described in the linked document. Events carry a randomly generated, persistent installation identifier rather than a user identifier. Collection is controlled per installation.

## Identifiability and lawful basis

Camunda distinguishes between three states and handles each differently:

| State                     | Meaning                                                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Anonymous**             | No individual can be distinguished, including by combining the data with other records. Aggregate counts fall into this category. |
| **Pseudonymized**         | Direct identifiers are replaced with substitute values, but an individual can still be distinguished across records.              |
| **Directly identifiable** | An individual can be identified directly, for example by name or email address.                                                   |

Pseudonymized data is personal data. Replacing an identifier with a substitute value does not make the data anonymous, because the individual can still be singled out.

Where each category of telemetry sits, and the basis Camunda relies on to process it:

| Telemetry                                            | Identifiability       | Lawful basis                                                                                                                   |
| ---------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Usage metrics reporting and environment data         | Anonymous             | Not personal data, and therefore outside the scope of the GDPR. Processed under the contract between Camunda and the customer. |
| Orchestration Cluster telemetry (Analytics Exporter) | Anonymous             | Not personal data, and therefore outside the scope of the GDPR. Processed under the contract between Camunda and the customer. |
| Camunda SaaS application telemetry, system actions   | Pseudonymized         | Tied to a pseudonymized organization rather than to a person. Processed under the contract between Camunda and the customer.   |
| Camunda SaaS application telemetry, user actions     | Directly identifiable | Consent under Article 5(3) of the ePrivacy Directive, given through cookie and telemetry preferences.                          |
| Camunda SaaS user-lifecycle events                   | Directly identifiable | Required to operate the service. Processed under the Terms of Service between Camunda and the customer.                        |
| Desktop Modeler telemetry                            | Pseudonymized         | Consent, given at the first-run prompt and controlled per installation.                                                        |

### Where identifiers are retained

Identifiers that can distinguish an individual are retained in Camunda SaaS only, in two places:

- **SaaS application telemetry, user actions.** An account identifier, a device identifier, coarse location, and the email address and name of the Camunda SaaS user.
- **SaaS user-lifecycle events.** The name and email address of the Camunda SaaS user, recorded with sign-ins, user records, invitations, and membership or role changes.

No other telemetry described on this page retains an identifier that can distinguish an individual:

- **Usage metrics reporting** is summary counts at organization and cluster level.
- **Orchestration Cluster telemetry** carries no user identifier. It carries cluster, tenant, process, and definition keys. The `camunda.user_task.assigned` signal counts assignment events and does not carry the assignee value, a hash of it, or any other value derived from it, so it cannot distinguish one individual from another. The exporter never sends raw user names, email addresses, or your license key. See [what data is sent](/self-managed/components/orchestration-cluster/zeebe/exporters/analytics-exporter.md#what-data-is-sent) for the complete field-level list.
- **Desktop Modeler telemetry** carries a randomly generated installation identifier. It is persistent, so it can distinguish one installation from another across records, but it is not linked to a Camunda account and does not identify an individual.

### Lawful basis

Camunda SaaS application telemetry and Desktop Modeler telemetry rely on consent, as set out in the table above. Camunda SaaS user-lifecycle events are required to operate the service and are processed under the Terms of Service. Where Camunda otherwise retains an identifier that distinguishes an individual, it relies on its legitimate interests under Article 6(1)(f) GDPR in operating, securing, supporting, and improving the software, and provides a route to object. No other category described on this page retains such an identifier.

To object to processing, or to make a data subject request, contact Camunda through the route described in the [Privacy Policy](https://legal.camunda.com/privacy-and-data-protection#product-privacy-policy).

## How to control telemetry

| Deployment                     | Control                                                                                                                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Self-Managed**               | The Analytics Exporter is off by default. Enable it, and narrow what it sends, with the `categories` option. See [Choose what is sent](/self-managed/components/orchestration-cluster/zeebe/exporters/analytics-exporter.md#choose-what-is-sent).            |
| **SaaS**                       | Both the commercial and non-commercial categories of Orchestration Cluster telemetry are enabled by default, and there is no self-service control to disable the non-commercial category. To disable telemetry, contact your Camunda account team (CSM/TAM). |
| **SaaS user actions**          | Controlled per user through cookie preferences, shown in [Camunda SaaS application telemetry](#camunda-saas-application-telemetry).                                                                                                                          |
| **SaaS user-lifecycle events** | Required to operate the service and collected under the Terms of Service. There is no individual opt-out.                                                                                                                                                    |
| **Desktop Modeler**            | Controlled per installation. See [Desktop Modeler telemetry](/components/modeler/desktop-modeler/telemetry/telemetry.md).                                                                                                                                    |
