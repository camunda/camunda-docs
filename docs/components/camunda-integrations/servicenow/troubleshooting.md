---
id: troubleshooting
title: Troubleshooting
description: "Common issues and troubleshooting tips for the Camunda ServiceNow integration."
---

This page lists common issues you may encounter while setting up or using the Camunda ServiceNow integration, along with recommended solutions.

---

## ServiceNow

| Issue | Possible Cause | Recommended Action |
|-------|---------------|---------------------|
| **Camunda Spoke not visible** | The spoke was not installed correctly or the user lacks permissions. | Check that the Camunda Spoke is installed from the [ServiceNow Store](https://store.servicenow.com/store/app/aac1b64fc3803290ef46d0af050131d0) and that you're logged in as an administrator. |
| **Flow doesn't trigger** | Trigger conditions are not configured or Integration Hub is not activated. | Review flow trigger settings and ensure the required Integration Hub plugins are active. |
| **Authentication failures** | OAuth profile misconfigured or invalid Camunda credentials. | Verify Client ID, Client Secret, and Token URL. Check the OAuth profile settings in ServiceNow. |
| **Missing required plugins** | IntegrationHub packs (e.g. Enterprise Pack) not installed. | Install the required plugins listed in [Prerequisites](./prerequisites.md). |

---

## Camunda

| Issue | Possible Cause | Recommended Action |
|-------|---------------|---------------------|
| **Connector task fails** | Incorrect credentials or network connectivity issues. | Confirm that Camunda API credentials are valid and the ServiceNow instance is reachable. |
| **Variables not mapped correctly** | Response fields from ServiceNow are not stored or referenced properly. | Map the entire response object and specific fields explicitly in your BPMN model. |
| **Process not started from ServiceNow** | Correlation keys or message names do not match. | Verify that message names and correlation variables are correctly configured in both ServiceNow and Camunda. |
| **Timeouts or unexpected errors** | Large payloads or network latency. | Check logs, increase timeout thresholds, and test the ServiceNow API call separately. |

---

## General Tips

- **Enable verbose flow logs in ServiceNow**  
  Navigate to **Flow Designer → Your flow name → Flow Reporting Settings** and enable Full verbose logging to debug flow execution.

- **Check Camunda Operate for connector errors**  
  Inspect failed connector tasks in [Camunda Operate](https://docs.camunda.io/docs/components/operate/) for detailed error messages and variable mappings.

- **Validate network connectivity**  
  Ensure that outbound calls from Camunda to ServiceNow (and vice-versa) are not blocked by firewalls, VPNs, or proxies.

- **Check version compatibility**  
  Make sure your Camunda and ServiceNow versions meet the [prerequisites](./prerequisites.md)

---

## Frequently Asked Questions

**Do I need IntegrationHub Enterprise Pack for all connectors?**  
No. It’s only required for starting ServiceNow flows from Camunda using the Flow Starter Connector.

**Why do I get 401 Unauthorized errors from ServiceNow?**  
This usually indicates a misconfigured OAuth profile. Double-check the Client ID, Secret, and Token URL.