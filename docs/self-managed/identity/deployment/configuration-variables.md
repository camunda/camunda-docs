---
id: configuration-variables
title: "Configuration variables"
sidebar_label: "Configuration variables"
---

As Identity is a Spring Boot application, you may use the standard Spring [configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config) methods.

### Functionality

| Environment variable               | Description                                          | Default value                                     |
|------------------------------------|------------------------------------------------------|---------------------------------------------------|
| KEYCLOAK_URL                       | The URL of the Keycloak instance to use              | http://keycloak:8080/auth                         |
| IDENTITY_AUTH_PROVIDER_BACKEND_URL | Used to support container to container communication | http://keycloak:8080/auth/realms/camunda-platform |  

