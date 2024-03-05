---
id: multi-namespace-deployment
title: "Multi-namespace deployment"
description: "Deploy Camunda 8 Self-Managed across namespaces for better resources utilization and to reduce redundancy"
---

You can deploy Camunda 8 Self-Managed across namespaces, where we have a single management deployment (Identity and Web Modeler), and multiple automation deployments (Zeebe, Operate, Tasklist, Optimize).

In this set up each namespace has its own Helm deployment independently, but each one uses a different values file based on if the deployment mode is `management` or `automation`.

The following are three values files, one for the `managment` deployment and two for the `automation` deployment:

## Management deployment

This deployment includes Identity and Web Modeler only, and allows the other two deployments to authenticate against Keycloak:

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

This deployment includes Zeebe, Operate, Tasklist, and Optimize, and authenticates against Keycloak in the management deployment:

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

This deployment includes Zeebe, Operate, Tasklist, and Optimize, and authenticates against Keycloak in the management deployment:

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

:::note
The values mentioned above only highlight the values needed to set up the multi-namespace deployment, but it's still needed to add other values as usual (for TLS and Ingress set up, for example).

Additionally, the machine-to-machine secrets should be the same across namespaces for each application to authenticate against Keycloak.
:::
