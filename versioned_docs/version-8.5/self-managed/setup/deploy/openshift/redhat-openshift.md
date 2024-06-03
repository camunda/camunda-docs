---
id: redhat-openshift
title: "Red Hat OpenShift"
description: "Deploy Camunda 8 Self-Managed on Red Hat OpenShift"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';


Red Hat OpenShift, a Kubernetes distribution maintained by [Red Hat](https://www.redhat.com/en/technologies/cloud-computing/openshift), offers both managed and on-premise hosting options.

Camunda 8 can be deployed on Red Hat OpenShift using Helm, provided with appropriate configurations. However, the Security Context Constraints (SCCs) and Routes configuration may deviate slightly from the guidelines outlined in the [general Helm deployment guide](/self-managed/setup/install.md).


## Cluster Specification

When deploying Camunda 8 on an OpenShift cluster, the cluster specification should align with your specific requirements and workload characteristics. Here's a suggested configuration to begin with:

- **Instance type:** 4 vCPUs (x86_64, >3.1 GHz), 16 GiB Memory (e.g. [m5.xlarge on AWS](https://aws.amazon.com/en/ebs/general-purpose/))
- **Number of dedicated nodes:** 4
- **Volume type:** SSD volumes (between 1000 and 3000 IOPS per volume, throughput of 1,000 MB/s per volume, e.g. [gp3 on AWS](https://aws.amazon.com/en/ebs/general-purpose/))


We test against the following OpenShift versions and guarantee compatibility with the versions supported by Red Hat, in accordance with [Red Hat's OpenShift Lifecycle Policy](https://access.redhat.com/support/policy/updates/openshift), which generally includes the last four versions.

| OpenShift Version | 
| ----------------- | 
| 4.15.x            |
| 4.14.x            |

Any version not explicitly marked in the table above is not tested, and we cannot guarantee compatibility.

## Deploying C8 in OpenShift

Depending of your OpenShift cluster SCCs configuration, the deployment might differs

<Tabs>
  <TabItem value="scc" label="Security Context Constraints (SCCs)" default>
    
OpenShift uses by default the more restrictive SCCs, the helm chart must assign `null` to the user than runs in all the components and the dependencies. Due to a null [bug](https://github.com/helm/helm/issues/9136) [in helm](https://github.com/helm/helm/issues/12490), this operation must be performed with a [a post-renderer](https://helm.sh/docs/topics/advanced/#post-rendering).

To deploy Camunda 8 on OpenShift, please follow those installation steps:

1. Install [helm, and other cli tools](docs/self-managed/setup/install/#prerequisites)
2. Make sure that `bash` and `sed` are available locally, it will be necessary for the [post-render needed to patch the values of OpenShift](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform/openshift/patch.sh).
3. Install the [Camunda Helm chart repository](docs/self-managed/setup/install/#helm-repository)
4. Download the exact chart version that you want to install and untar it in a directory:
```shell
# Ensure set CHART_VERSION to match the chart you want to install.
helm pull camunda/camunda-platform --version CHART_VERSION --untar --untardir /tmp/camunda-platform-CHART_VERSION
```
5. Configure the chart values: 
```shell
cp /tmp/camunda-platform-CHART_VERSION/values.yml  /tmp/camunda-platform-CHART_VERSION/my-values.yml
```
6. Install Camunda chart
:::warning
If using a post-renderer, you **must** use the post-renderer whenever you are updating your release, not only during the initial installation. If you do not, the default values will be used again, which will prevent some services from starting.
:::

```shell
helm install camunda camunda/camunda-platform --skip-crds       \
    --values /tmp/camunda-platform-CHART_VERSION/my-values.yml   \
    --post-renderer bash --post-renderer-args /tmp/camunda-platform-CHART_VERSION/openshift/patch.sh
```
  </TabItem>
  <TabItem value="no-scc" label="Permissive SCCs">
    To use permissive SCCs, install the charts as they are. Follow the [general Helm deployment guide](/self-managed/setup/install.md).
  </TabItem>
</Tabs>

## Available configurations of OpenShift Components

### Security Context Constraints (SCCs)

[SCCs]((https://docs.openshift.com/container-platform/latest/authentication/managing-security-context-constraints.html)) are a set of conditions that a pod must run with in order to be accepted into the system. They are used to define the security conditions under which a pod operates.

Much like how roles control the permissions of users, Security Context Constraints (SCCs) are a way to control the permissions of the applications deployed, both at the pod and container level. It's generally recommended deploying your application with the most restricted SCCs possible. If you're not familiar with security context constraints, refer to the [OpenShift documentation](https://docs.openshift.com/container-platform/latest/authentication/managing-security-context-constraints.html).

<Tabs>
  <TabItem value="scc" label="Restrictive SCCs (default)" default>
    
The following is the most restrictive SCCs you can use to deploy Camunda 8. Note that this is, in OpenShift 4.10, equivalent to the built-in `restricted` SCCs (which is the default SCCs).

```yaml
Allow Privileged: false
Default Add Capabilities: <none>
Required Drop Capabilities: KILL,MKNOD,SYS_CHROOT,SETUID,SETGID
Allowed Capabilities: <none>
Allowed Seccomp Profiles: <none>
Allowed Volume Types: configMap,downwardAPI,emptyDir,persistentVolumeClaim,projected,secret
Allow Host Network: false
Allow Host Ports: false
Allow Host PID: false
Allow Host IPC: false
Read Only Root Filesystem: false
Run As User Strategy: MustRunAsRange
SELinux Context Strategy: MustRunAs
FSGroup Strategy: MustRunAs
Supplemental Groups Strategy: RunAsAny
```

When using this, you must take care not to specify _any_ `runAsUser` or `fsGroup` in either the pod or container security context. Instead, let OpenShift assign arbitrary IDs.

:::note
If you are providing the ID ranges yourself, you can configure the `runAsUser` and `fsGroup` values yourself as well.
:::

The Camunda Helm chart can be deployed to OpenShift with a few modifications, primarily revolving around your desired security context constraints. You can find out more about this in the next section.
  </TabItem>
  <TabItem value="no-scc" label="Non-root SCCs">
    
If you wish to deploy Camunda 8 but restrict the applications from running as root (e.g. the `nonroot` built-in SCCs), you will need to configure each pod and container to run as a non-root user. For example, when deploying Zeebe using a stateful set, you would add the following, replacing `1000` with the user ID you wish to use:

```yaml
spec:
  template:
    spec:
      securityContext:
        runAsUser: 1000
      containers:
        securityContext:
          runAsUser: 1000
```

:::note
As the container user in OpenShift is always part of the root group, it's not necessary to define a `fsGroup` for any Camunda 8 applications pod security context.
:::

This is necessary for all Camunda 8 applications, as well as related ones (e.g. Keycloak, PostgreSQL, etc.). This is notably crucial for stateful applications which will write to persistent volumes, but it's also generally a good idea to set.
  </TabItem>
  <TabItem value="no-scc" label="Permissive SCCs">
    Out of the box, if you deploy Camunda 8 (and related infrastructure) with a permissive SCCs, there is nothing particular for you to configure. Here, a permissive SCCs refers to one where the strategy for `RunAsUser` is defined as `RunAsAny` (including root).
  </TabItem>
</Tabs>

## Ingress Configuration

Before exposing services outside the cluster, we need an ingress component. Here's how you can configure it:

<Accordion>
  <AccordionSummary defaultExpanded id="panel-header-kubernetes-ingress" aria-controls="panel-content">
    Using Kubernetes Ingress
  </AccordionSummary>
  <AccordionDetails>

### Using Kubernetes Ingress

[Routes](https://docs.openshift.com/container-platform/latest/networking/routes/route-configuration.html) serve as OpenShift's default Ingress implementation. 

If you find that its features aren't suitable for your needs, or if you prefer to use a Kubernetes-native Ingress controller, such as the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx), [you have that option](https://www.redhat.com/en/blog/a-guide-to-using-routes-ingress-and-gateway-apis-in-kubernetes-without-vendor-lock-in). 

For guidance on installing an Ingress controller, you can refer to the [Ingress Setup documentation](docs/self-managed/setup/guides/ingress-setup/).


:::note

Do not confuse the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx) with the [NGINX Ingress Controller](https://www.redhat.com/en/blog/using-nginx-ingress-controller-red-hat-openshift) that is endorsed by Red Hat for usage with OpenShift. Despite very similar names, they are two different products.

If you should decide to use the Red Hat endorsed [NGINX Ingress Controller](https://www.redhat.com/en/blog/using-nginx-ingress-controller-red-hat-openshift), you would require additional adjustments done to the Camunda 8 ingress objects and the NGINX Ingress Controller itself to make `gRPC` and `HTTP/2` connections work. In that case, please refer to the [example and the prerequisites](https://github.com/nginxinc/kubernetes-ingress/blob/main/examples/ingress-resources/grpc-services/README.md).

:::
  </AccordionDetails>
    <AccordionSummary id="panel-header-openshift-routes" aria-controls="panel-content">
    Using OpenShift Routes
  </AccordionSummary>
  <AccordionDetails>

### Using OpenShift Routes


[Routes](https://docs.openshift.com/container-platform/latest/networking/routes/route-configuration.html) expose services externally by linking a URL to a service within the cluster. [OpenShift supports both the standard Kubernetes Ingress and routes](https://docs.openshift.com/container-platform/latest/networking/ingress-operator.html), giving cluster users the flexibility to choose. 

The presence of routes is rooted in their specification predating Ingress. It's worth noting that the functionality of routes differs from Ingress; for example, unlike Ingress, routes don't allow multiple services to be linked to a single route or the use of paths.

To use these routes for the Zeebe Gateway, configure this through Ingress as well.

#### Prerequisite

As the Zeebe Gateway also uses `gRPC` (which relies on `HTTP/2`), [HTTP/2 Ingress Connectivity has to be enabled](https://docs.openshift.com/container-platform/latest/networking/ingress-operator.html#nw-http2-haproxy_configuring-ingress).

#### Required steps

1. Provide [TLS secrets](https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets) for the Zeebe Gateway, the [Cert Manager](https://docs.openshift.com/container-platform/latest/security/cert_manager_operator/index.html) might be helpful here:

- One issued to the Zeebe Gateway Service Name. This must use the [pkcs8 syntax](https://www.openssl.org/docs/man3.1/man1/openssl-pkcs8.html) or [pkcs1 syntax](https://en.wikipedia.org/wiki/PKCS_1) as Zeebe only supports these, referenced as **Service Certificate Secret** or `<SERVICE_CERTIFICATE_SECRET_NAME>`. For more details, review the [OpenShift documentation](https://docs.openshift.com/container-platform/latest/networking/routes/secured-routes.html#nw-ingress-creating-a-reencrypt-route-with-a-custom-certificate_secured-routes).
- One that is used on the exposed route, referenced as **External URL Certificate Secret** or `<EXTERNAL_URL_CERTIFICATE_SECRET_NAME>`.

1. Configure your Zeebe Gateway Ingress to create a [Re-encrypt Route](https://docs.openshift.com/container-platform/latest/networking/routes/route-configuration.html#nw-ingress-creating-a-route-via-an-ingress_route-configuration):

```yaml
zeebeGateway:
  ingress:
    grpc:
      annotations:
        route.openshift.io/termination: reencrypt
        route.openshift.io/destination-ca-certificate-secret: <SERVICE_CERTIFICATE_SECRET_NAME>
      className: openshift-default
      tls:
        enabled: true
        secretName: <EXTERNAL_URL_CERTIFICATE_SECRET_NAME>
```

3. Mount the **Service Certificate Secret** to the Zeebe Gateway Pod:

```yaml
zeebeGateway:
  env:
    - name: ZEEBE_GATEWAY_SECURITY_ENABLED
      value: "true"
    - name: ZEEBE_GATEWAY_SECURITY_CERTIFICATECHAINPATH
      value: /usr/local/zeebe/config/tls.crt
    - name: ZEEBE_GATEWAY_SECURITY_PRIVATEKEYPATH
      value: /usr/local/zeebe/config/tls.key
  extraVolumeMounts:
    - name: certificate
      mountPath: /usr/local/zeebe/config/tls.crt
      subPath: tls.crt
    - name: key
      mountPath: /usr/local/zeebe/config/tls.key
      subPath: tls.key
  extraVolumes:
    - name: certificate
      secret:
        secretName: <SERVICE_CERTIFICATE_SECRET_NAME>
        items:
          - key: tls.crt
            path: tls.crt
        defaultMode: 420
    - name: key
      secret:
        secretName: <SERVICE_CERTIFICATE_SECRET_NAME>
        items:
          - key: tls.key
            path: tls.key
        defaultMode: 420
```

4. Mount the **Service Certificate Secret** to the Operate and Tasklist pods and configure the secure TLS connection. Here, only the `tls.crt` file is required.

For Operate:

```yaml
operate:
  env:
    - name: CAMUNDA_OPERATE_ZEEBE_SECURE
      value: "true"
    - name: CAMUNDA_OPERATE_ZEEBE_CERTIFICATEPATH
      value: /usr/local/operate/config/tls.crt
  extraVolumeMounts:
    - name: certificate
      mountPath: /usr/local/operate/config/tls.crt
      subPath: tls.crt
  extraVolumes:
    - name: certificate
      secret:
        secretName: <SERVICE_CERTIFICATE_SECRET_NAME>
        items:
          - key: tls.crt
            path: tls.crt
        defaultMode: 420
```

The actual configuration properties can be reviewed [in the Operate configuration documentation](docs/self-managed/operate-deployment/operate-configuration.md#zeebe-broker-connection).

For Tasklist:

```yaml
tasklist:
  env:
    - name: CAMUNDA_TASKLIST_ZEEBE_SECURE
      value: "true"
    - name: CAMUNDA_TASKLIST_ZEEBE_CERTIFICATEPATH
      value: /usr/local/tasklist/config/tls.crt
  extraVolumeMounts:
    - name: certificate
      mountPath: /usr/local/tasklist/config/tls.crt
      subPath: tls.crt
  extraVolumes:
    - name: certificate
      secret:
        secretName: <SERVICE_CERTIFICATE_SECRET_NAME>
        items:
          - key: tls.crt
            path: tls.crt
        defaultMode: 420
```

The actual configuration properties can be reviewed [in the Tasklist configuration documentation](docs/self-managed/tasklist-deployment/tasklist-configuration.md#zeebe-broker-connection).

5. Configure all other applications running inside the cluster and connecting to the Zeebe Gateway to also use TLS.
  </AccordionDetails>
</Accordion>


## Pitfalls to avoid

For general deployment pitfalls, visit the [deployment troubleshooting guide](/self-managed/operational-guides/troubleshooting/troubleshooting.md).
