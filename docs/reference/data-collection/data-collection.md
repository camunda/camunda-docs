---
id: data-collection
title: "Data Collection"
description: "Learn about the data collected by Camunda."
---

Camunda collects a variety of data to evaluate contractual usage, provide a better user experience, and improve its products. This section describes which data is collected, how Camunda ensures privacy, and what options you have to modify which data is sent to Camunda. This document applies only to interactions with Camunda's products.

## Principles

Camunda follows certain principles to ensure the privacy of its customers and the success of its product development efforts.

- Camunda minimizes automatic collection of personally identifiable information (PII) to information required to identify the user like name and email. Where PII is collected, customers have the option to opt-out of sharing this data with Camunda.
- Camunda avoids automatic collection of protected health information (PHI).
  - Data collected from end-users such as form fills or process variables are not tracked.
- Camunda avoids automatic collection of intellectual property (IP).
  - Assets describing how a process is defined and executed are not automatically shared with Camunda.
- Camunda does not collect payment information nor sell user information.

## Data Collection

Camunda collects data through a variety of methods.

### Contractual Usage

Camunda collects a limited set of contractually-agreed [usage metrics](/docs/reference/data-collection/usage-metrics.md) to evaluate billing. These are summary metrics that contain no sensitive information.

### Environment Data

Camunda collects information about customer installations to enable better support and product improvement decisions.

Self-Managed customers may choose to send a very limited set of information through the Console component's telemetry mechanism. View the [telemetry](/docs/self-managed/console-deployment/telemetry.md) page for an example of this data.

### Usage Data

Camunda collects product usage data from SaaS and Desktop Modeler users to help make better product improvement decisions and enable outreach to support users.

- Feature Usage:
  - SaaS System Actions: All SaaS organizations submit basic information about which features are being used. When certain features are used, Camunda logs which feature is used and basic information about how it has been used. This information is tied to an pseudonymized organization.
  - SaaS User Actions: Users that opt-in to analytics cookies
    (!!!!!!!!!!!!TO CONFIRM- https://camunda.slack.com/archives/C034F8NA1G8/p1736857938619039!!!!!!!!!!!!!!)
    gain access to in-app tutorials and automatically submit information about the actions they take in Camunda. In addition to the data collected from system actions described above, Camunda collects cursor activity, geographical area, browser information, and basic biographical information like email and name for user actions.
  - Desktop Modeler User Actions: Users opting into collection of [telemetry data in Desktop Modeler](docs/components/modeler/desktop-modeler/telemetry/) send certain data to Camunda.
- Shared Data: Data intentionally shared with Camunda, such as survey information, feedback, or bug reports.
- AI Usage: Camunda's AI features, currently available in SaaS only, collect anonymized inputs, outputs, and feedback to improve their quality. All AI features are clearly labeled as AI features and, with the exception of the AI Form Generator, require opt-in in the Console to [enable AI-powered features](/docs/components/console/manage-organization/enable-alpha-features/#enable-ai-powered-features).

### Example

Below is an example of user action data collected by the platform.

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
