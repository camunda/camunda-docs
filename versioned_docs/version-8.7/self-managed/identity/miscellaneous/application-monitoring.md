---
id: application-monitoring
title: "Monitoring Identity"
sidebar_label: "Monitoring Identity"
description: "Understand how the Identity component operates in exposing the following endpoints."
---

Monitor the health and operation of the Identity component in your Self-Managed deployment.

## Monitoring endpoints

You can use the following default exposed endpoints to monitor how the Identity component is operating.

| Endpoint               | Default port | Purpose                                                                    |
| :--------------------- | :----------- | :------------------------------------------------------------------------- |
| `/actuator/health`     | `8082`       | Provide the health status of the application, often used in health checks. |
| `/actuator/prometheus` | `8082`       | Provide operational application metrics.                                   |
