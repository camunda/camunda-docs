---
id: multi-namespace-deployment
title: "Multi-namespace deployment"
description: "Deploy Camunda 8 Self-Managed across namespaces"
---

With version 8.4, now it is possible to deploy Camunda 8 Self-Managed across namespaces where we will have a single Management deployment (which includes Identity and WebModeler),and multiple Automation deployments (which includes Zeebe and the web apps like Operate, Tasklist, Optimize, etc.).

In this steup, each namespace still has its own Helm deployment independetly but each one using different values file based on if the deployment mode is `management` or `automation` deployment.

The following are three values files, one for the `managment` deployment and two for the `automation` deployment.

## Management deployment

This deployment will have Identity and WebModeler only and allows other two deployments to authenticate against Keycloak.

```yaml
# Namespace: camunda-main
global:
  identity:
    auth:
      connectors:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
      operate:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
        redirectUrl: "https://camunda-team1.example.com/operate,https://camunda-team2.example.com/operate"
      tasklist:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
        redirectUrl: "https://camunda-team1.example.com/tasklist,https://camunda-team2.example.com/tasklist"
      optimize:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
        redirectUrl: "https://camunda-team1.example.com/optimize,https://camunda-team2.example.com/optimize"
      zeebe:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
zeebe:
  enabled: false
zeebe-gateway:
  enabled: false
operate:
  enabled: false
tasklist:
  enabled: false
optimize:
  enabled: false
connectors:
  enabled: false
elasticsearch:
  enabled: false
```

## Team1 deployment

This deployment will have Zeebe and web apps and authenticates against the main Keycloak.

```yaml
# Namespace: camunda-team1
global:
  identity:
    auth:
      publicIssuerUrl: "https://camunda-main.example.com/auth/realms/camunda-platform"
      connectors:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
      operate:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
      tasklist:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
      optimize:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
      zeebe:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
    service:
      url: "http://camunda-main-identity.camunda-main.svc.cluster.local:80/identity"
    keycloak:
      url:
        protocol: "http"
        host: "camunda-main-keycloak.camunda-main.svc.cluster.local"
        port: "80"
identity:
  enabled: false
webModeler:
  enabled: false
postgresql:
  enabled: false
```

## Team2 deployment

This deployment will have Zeebe and web apps and authenticates against the main Keycloak.

```yaml
# Namespace: camunda-team2
global:
  identity:
    auth:
      publicIssuerUrl: "https://camunda-main.example.com/auth/realms/camunda-platform"
      connectors:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
      operate:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
      tasklist:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
      optimize:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
      zeebe:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
    service:
      url: "http://camunda-main-identity.camunda-main.svc.cluster.local:80/identity"
    keycloak:
      url:
        protocol: "http"
        host: "camunda-main-keycloak.camunda-main.svc.cluster.local"
        port: "80"
identity:
  enabled: false
webModeler:
  enabled: false
postgresql:
  enabled: false
```

Please note:

- The values mantioned above just highlight the values needed to setup the multi-namespace deployment but it's still needed to add other values as normal like for TLS and Ingress setup.
- The Machine-to-machine secrets should be the same across namespaces for each single app so it's possible to authenticate against Keycloak.
