---
id: configuration-variables
title: "Configuration variables"
sidebar_label: "Configuration variables"
---

As Identity is a Spring Boot application, you may use the standard
Spring [configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config)
methods.

### Core configuration

| Environment variable                 | Description                                          | Default value                                                                                                                                                            |
| ------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IDENTITY_URL`                       | The URL of the Identity service                      | http://localhost:8080                                                                                                                                                    |
| `KEYCLOAK_URL`                       | The URL of the Keycloak instance to use              | http://localhost:18080/auth                                                                                                                                              |
| `IDENTITY_AUTH_PROVIDER_BACKEND_URL` | Used to support container to container communication | http://localhost:18080/auth/realms/camunda-platform                                                                                                                      |
| `IDENTITY_LOG_LEVEL`                 | The level of which to log messages at                | INFO                                                                                                                                                                     |
| `IDENTITY_LOG_PATTERN`               | The pattern to use when logging                      | `%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %clr{%5p} %clr{${sys:PID}}{magenta} %clr{---}{faint} %clr{[%15.15t]}{faint} %clr{%-40.40c{1.}}{cyan} %clr{:}{faint} %m%n%xwEx` |

### Component configuration

Identity supports component configuration using preset values. This means to configure a
component for use within Identity, all that is required is to set two variables:

| Environment variable                 | Description                                   | Default value |
| ------------------------------------ | --------------------------------------------- | ------------- |
| `KEYCLOAK_INIT_<COMPONENT>_SECRET`   | The secret used for authentication flows      | No default    |
| `KEYCLOAK_INIT_<COMPONENT>_ROOT_URL` | The root URL of where the component is hosted | No default    |

:::note
Identity supports the following values for the `<COMPONENT>` placeholder: `OPERATE`,`TASKLIST`, and `OPTIMIZE`.
:::
