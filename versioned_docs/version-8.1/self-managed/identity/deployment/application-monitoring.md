---
id: application-monitoring
title: "Application monitoring"
sidebar_label: "Application monitoring"
---

To help understand how the Identity component operates, we expose the following endpoints as default:

| Endpoint               | Default port | Purpose                                                                       |
| ---------------------- | ------------ | ----------------------------------------------------------------------------- |
| `/actuator/health`     | `8082`       | To provide the health status of the application, often used in health checks. |
| `/actuator/prometheus` | `8082`       | To provide operational application metrics.                                   |
