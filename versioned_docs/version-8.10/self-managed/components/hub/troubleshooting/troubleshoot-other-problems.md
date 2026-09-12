---
id: troubleshoot-other-problems
title: "Troubleshoot other problems"
sidebar_label: "Other problems"
description: "Troubleshoot and resolve problems with Web Modeler that are not covered by the other troubleshooting guides."
---

Troubleshoot and resolve problems that are not covered by the other troubleshooting guides.

## Unable to create BPMN or DMN diagrams

### Issue

When creating a new BPMN or DMN diagram via the Web Modeler UI, the diagram creation request fails with a `HTTP 403 Forbidden` response.
Other requests to the application succeed.

### Cause

When your Web Modeler installation is running behind a web application firewall (WAF), the firewall may block the request.
Some WAF rules block requests that contain certain characters in the request body, such as XML payloads used in BPMN and DMN diagrams.

### Resolution

Ensure that your WAF doesn't block requests to Web Modeler.
A rule that is known to interfere with Web Modeler requests is AWS WAF's `CrossSiteScripting_Body` rule included in its [core rule set](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-baseline.html#aws-managed-rule-groups-baseline-crs).
Similar solutions like [ModSecurity](https://modsecurity.org/) may also block requests to Web Modeler based on the used rule set.
