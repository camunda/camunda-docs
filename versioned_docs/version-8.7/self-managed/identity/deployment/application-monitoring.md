---
id: application-monitoring
title: "Application monitoring"
sidebar_label: "Application monitoring"
description: "Understand how the Identity component operates in exposing the following endpoints."
---

To help understand how the Identity component operates, we expose the following endpoints as default:

| Endpoint               | Default port | Purpose                                                                    |
| ---------------------- | ------------ | -------------------------------------------------------------------------- |
| `/actuator/health`     | `8082`       | Provide the health status of the application, often used in health checks. |
| `/actuator/prometheus` | `8082`       | Provide operational application metrics.                                   |
