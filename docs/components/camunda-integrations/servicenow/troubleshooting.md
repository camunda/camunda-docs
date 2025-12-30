---
id: troubleshooting
title: Troubleshooting
description: "Resolve common issues encountered while setting up or using the Camunda–ServiceNow integration and follow recommended actions to fix them."
---

Resolve common issues encountered while setting up or using the Camunda–ServiceNow integration and follow recommended actions to fix them.

## ServiceNow

| Issue                     | Possible cause                                                | Recommended action                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda Spoke not visible | Spoke not installed correctly or insufficient permissions.    | Confirm the Camunda Spoke is installed from the [ServiceNow Store](https://store.servicenow.com/store/app/aac1b64fc3803290ef46d0af050131d0) and that you are logged in as an administrator. |
| Flow doesn’t trigger      | Trigger conditions misconfigured or Integration Hub inactive. | Review flow trigger settings and ensure the required Integration Hub plugins are active.                                                                                                    |
| Authentication failures   | OAuth profile misconfigured or invalid Camunda credentials.   | Verify the Client ID, Client Secret, and Token URL. Check the OAuth profile settings in ServiceNow.                                                                                         |
| Missing required plugins  | IntegrationHub packs (e.g., Enterprise Pack) not installed.   | Install the required plugins listed in [Prerequisites](./prerequisites.md).                                                                                                                 |

## Camunda

| Issue                               | Possible cause                                                         | Recommended action                                                                                           |
| ----------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Connector task fails                | Invalid credentials or network connectivity issues.                    | Confirm Camunda API credentials are valid and that the ServiceNow instance is reachable.                     |
| Variables not mapped correctly      | Response fields from ServiceNow are not stored or referenced properly. | Map the entire response object and specific fields explicitly in your BPMN model.                            |
| Process not started from ServiceNow | Correlation keys or message names do not match.                        | Verify that message names and correlation variables are configured correctly in both ServiceNow and Camunda. |
| Timeouts or unexpected errors       | Large payloads or network latency.                                     | Check logs, increase timeout thresholds, and test the ServiceNow API call separately.                        |

## General tips

- Enable verbose flow logs in ServiceNow  
  Navigate to **Flow Designer → Your flow name → Flow Reporting Settings** and enable full verbose logging to debug flow execution.

- Check Camunda Operate for connector errors  
  Inspect failed connector tasks in [Camunda Operate](/components/operate/operate-introduction.md) for detailed error messages and variable mappings.

- Validate network connectivity  
  Ensure outbound calls between Camunda and ServiceNow are not blocked by firewalls, VPNs, or proxies.

- Check version compatibility  
  Verify that Camunda and ServiceNow versions meet the [prerequisites](./prerequisites.md).

## Frequently asked questions

**Do I need IntegrationHub Enterprise Pack for all connectors?**  
No. It is only required to start ServiceNow flows from Camunda using the Flow Starter connector.

**Why do I get 401 Unauthorized errors from ServiceNow?**  
This usually indicates a misconfigured OAuth profile. Verify the Client ID, Client Secret, and Token URL.
