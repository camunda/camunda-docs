---
id: multi-namespace-deployment
title: "Multi-namespace deployment"
description: "Deploy Camunda 8 Self-Managed across namespaces for better resources utilization and to reduce redundancy"
---

You can deploy Camunda 8 Self-Managed across namespaces, where we have a single management deployment (Identity and Web Modeler), and multiple automation deployments (Zeebe, Operate, Tasklist, Optimize).

In this setup, each namespace has its own Helm deployment independently, but each one uses a different values file based on whether the deployment mode is `management` or `automation`.

The following are three value files, one for the `management` deployment and two for the `automation` deployment:

## Preparation

If you plan to use Console in a multi-namespace setup, then you need first to get the release info config for all namespaces/deployments.

Assuming all the values files have been created according to multi-deployment (next sections), then run the following script to get the release info for all deployments.

```bash
DEPLOYMENTS="camunda-main camunda-team01 camunda-team02"

for DEPLOYMENT in ${DEPLOYMENTS}; do
  helm template camunda camunda/camunda-platform \
    -n ${DEPLOYMENT} -f ${DEPLOYMENT}.yaml \
    --show-only templates/camunda/configmap-release.yaml |
      kubectl apply --dry-run=client -o jsonpath='{.data.info}' -f -
done
```

Finally, in the management values file `camunda-main.yaml` add the following section:

```yaml
console:
  configuration: |
    camunda:
      console:
        managed:
          method: plain
          releases:
          # This is the output of the script above.
          - name: camunda
            namespace: camunda-main
            version: 9.1.2
            components:
            - name: Keycloak
              url: http://camunda-main.example.com/auth
            - name: Identity
              url: http://camunda-main.example.com
              readiness: http://camunda-identity.camunda-main:80/actuator/health
              metrics: http://camunda-identity.camunda-main:82/actuator/prometheus- name: camunda
            namespace: camunda-team01
            version: 9.1.2
            components:
            - name: Operate
              url: http://camunda-team01.example.com
              readiness: http://camunda-operate.camunda-team01:80/actuator/health/readiness
              metrics: http://camunda-operate.camunda-team01:80/actuator/prometheus
            - name: Optimize
              url: http://camunda-team01.example.com
              readiness: http://camunda-optimize.camunda-team01:80/api/readyz
              metrics: http://camunda-optimize.camunda-team01:8092/actuator/prometheus
            - name: Tasklist
              url: http://camunda-team01.example.com
              readiness: http://camunda-tasklist.camunda-team01:80/actuator/health/readiness
              metrics: http://camunda-tasklist.camunda-team01:80/actuator/prometheus
            - name: Zeebe Gateway
              url: grpc://
              readiness: http://camunda-zeebe-gateway.camunda-team01:9600/actuator/health/readiness
              metrics: http://camunda-zeebe-gateway.camunda-team01:9600/actuator/prometheus
            - name: Zeebe
              readiness: http://camunda-zeebe.camunda-team01:9600/ready
              metrics: http://camunda-zeebe.camunda-team01:9600/actuator/prometheus- name: camunda
            namespace: camunda-team02
            version: 9.1.2
            components:
            - name: Operate
              url: http://camunda-team02.example.com
              readiness: http://camunda-operate.camunda-team02:80/actuator/health/readiness
              metrics: http://camunda-operate.camunda-team02:80/actuator/prometheus
            - name: Optimize
              url: http://camunda-team02.example.com
              readiness: http://camunda-optimize.camunda-team02:80/api/readyz
              metrics: http://camunda-optimize.camunda-team02:8092/actuator/prometheus
            - name: Tasklist
              url: http://camunda-team02.example.com
              readiness: http://camunda-tasklist.camunda-team02:80/actuator/health/readiness
              metrics: http://camunda-tasklist.camunda-team02:80/actuator/prometheus
            - name: Zeebe Gateway
              url: grpc://
              readiness: http://camunda-zeebe-gateway.camunda-team02:9600/actuator/health/readiness
              metrics: http://camunda-zeebe-gateway.camunda-team02:9600/actuator/prometheus
            - name: Zeebe
              readiness: http://camunda-zeebe.camunda-team02:9600/ready
              metrics: http://camunda-zeebe.camunda-team02:9600/actuator/prometheus
```

Now follow the next steps.

## Management deployment

This deployment includes Identity and Web Modeler only, and allows the other two deployments to authenticate against Keycloak:

```yaml
# File: camunda-main.yaml
global:
  ingress:
    host: camunda-main.example.com
  identity:
    auth:
      connectors:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
      operate:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
        redirectUrl: "https://camunda-team01.example.com/operate,https://camunda-team02.example.com/operate"
      tasklist:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
        redirectUrl: "https://camunda-team01.example.com/tasklist,https://camunda-team02.example.com/tasklist"
      optimize:
        existingSecret: <APP_MACHINE2MACHINE_SECRET>
        redirectUrl: "https://camunda-team01.example.com/optimize,https://camunda-team02.example.com/optimize"
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

Then install as normal:

```bash
helm install camunda camunda/camunda-platform \
  -n camunda-main \
  -f camunda-main.yaml
```

## Team one deployment

This deployment includes Zeebe, Operate, Tasklist, and Optimize, and authenticates against Keycloak in the management deployment:

```yaml
# File: camunda-team01.yaml
global:
  ingress:
    host: camunda-team01.example.com
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

Then install as normal:

```bash
helm template camunda camunda/camunda-platform \
  -n camunda-team01 \
  -f camunda-team01.yaml
```

## Team two deployment

This deployment includes Zeebe, Operate, Tasklist, and Optimize, and authenticates against Keycloak in the management deployment:

```yaml
# File: camunda-team02.yaml
global:
  ingress:
    host: camunda-team02.example.com
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

Then install as normal:

```bash
helm install camunda camunda/camunda-platform \
  -n camunda-team02 \
  -f camunda-team02.yaml
```

:::note
The values mentioned above only highlight the values needed to set up the multi-namespace deployment, but it's still needed to add other values as usual (for TLS and Ingress setup, for example).

Additionally, the machine-to-machine secrets should be the same across namespaces for each application to authenticate against Keycloak.

For more details, check the full [Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters).
:::
