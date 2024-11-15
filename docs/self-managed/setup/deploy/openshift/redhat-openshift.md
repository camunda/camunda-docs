---
id: redhat-openshift
title: "Red Hat OpenShift"
description: "Deploy Camunda 8 Self-Managed on Red Hat OpenShift"
---

<!-- (!) Note: please keep this guide aligned with docs/self-managed/setup/deploy/amazon/amazon-eks/eks-helm.md -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Red Hat OpenShift, a Kubernetes distribution maintained by [Red Hat](https://www.redhat.com/en/technologies/cloud-computing/openshift), provides options for both managed and on-premises hosting.

Deploying Camunda 8 on Red Hat OpenShift is supported using Helm, given the appropriate configurations.

However, it's important to note that the [Security Context Constraints (SCCs)](#security-context-constraints-sccs) and [Routes](./redhat-openshift.md?current-ingress=openshift-routes#using-openshift-routes) configurations might require slight deviations from the guidelines provided in the [general Helm deployment guide](/self-managed/setup/install.md).

## Cluster Specification

When deploying Camunda 8 on an OpenShift cluster, the cluster specification should align with your specific requirements and workload characteristics. Here's a suggested configuration to begin with:

- **Instance type:** 4 vCPUs (x86_64, >3.1 GHz), 16 GiB Memory (for example, [mi6.xlarge on AWS](https://aws.amazon.com/en/ebs/general-purpose/))
- **Number of dedicated nodes:** 4
- **Volume type:** SSD volumes (with between 1000 and 3000 IOPS per volume, and a throughput of 1,000 MB/s per volume, for instance, [gp3 on AWS](https://aws.amazon.com/en/ebs/general-purpose/))

If you need to set up an OpenShift cluster on a cloud provider, we recommend our [guide to deploying a ROSA cluster](/self-managed/setup/deploy/amazon/openshift/terraform-setup.md).

### Supported Versions

We conduct testing and ensure compatibility against the following OpenShift versions:

| OpenShift Version | [End of Support Date](https://access.redhat.com/support/policy/updates/openshift) |
| ----------------- | --------------------------------------------------------------------------------- |
| 4.17.x            | June 27, 2025                                                                     |
| 4.16.x            | December 27, 2025                                                                 |
| 4.15.x            | August 27, 2025                                                                   |
| 4.14.x            | May 1, 2025                                                                       |

:::caution Older versions are not guaranteed

Compatibility is not guaranteed for OpenShift versions no longer supported by Red Hat, as per the End of Support Date. For more information, refer to the [Red Hat OpenShift Container Platform Life Cycle Policy](https://access.redhat.com/support/policy/updates/openshift).

:::

## Requirements

- [Helm (3.16+)](https://helm.sh/docs/intro/install/)
- [kubectl (1.30+)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- [jq (1.7+)](https://jqlang.github.io/jq/download/) to interact with some variables.
- [GNU envsubst](https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html) to generate manifests.
- A namespace to host the Camunda Platform, in this guide we will reference `camunda` as the target namespace.

## Deploying Camunda 8 via Helm charts

### 1. Create the `values.yml` file

Start by creating a `values.yml` file to store the configuration for your environment. This file will contain key-value pairs that will be substituted using `envsubst`. You can find a reference example of this file here:

Depending on your OpenShift cluster's Security Context Constraints (SCCs) configuration, the deployment process may vary.
By default, OpenShift employs more restrictive SCCs. The Helm chart must assign `null` to the user running all components and dependencies.

<!-- TODO: add ingress configuration, route configuration and domainless configuration -->

<Tabs queryString="current-scc">
<TabItem value="w-scc" label="Restrictive SCCs" default>

The `global.compatibility.openshift.adaptSecurityContext` variable in your values.yaml can be used to set the following possible values:

- `force`: The `runAsUser` and `fsGroup` values will be null in all components.
- `disabled`: The `runAsUser` and `fsGroup` values will not be modified (default).

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/feature/openshift-ra-standard/aws/rosa-hcp/camunda-versions/8.7/procedure/install/helm-values/values-no-domain-scc.yml
```

</TabItem>
<TabItem value="no-scc" label="Permissive SCCs">

To use permissive SCCs, simply install the charts as they are. Follow the [general Helm deployment guide](/self-managed/setup/install.md).

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/feature/openshift-ra-standard/aws/rosa-hcp/camunda-versions/8.7/procedure/install/helm-values/values-no-domain-no-scc.yml
```

</TabItem>
</Tabs>

### 2. Configure your deployment

#### Enable Enterprise components

Some components are not enabled by default in this deployment. For more information on how to configure and enable these components, refer to [configuring Enterprise components and Connectors](/self-managed/setup/install.md#configuring-enterprise-components-and-connectors).

<!-- TODO: Here document route usage vs ingress usage -->

#### Fill your deployment with actual values

Once you've prepared the `values.yml` file, run the following `envsubst` command to substitute the environment variables with their actual values:

```bash
# generate the final values
envsubst < values.yml > generated-values.yml

# print the result
cat generated-values.yml
```

:::info Camunda Helm chart no longer automatically generates passwords

Starting from **Camunda 8.6**, the Helm chart deprecated the automatic generation of secrets, and this feature has been fully removed in **Camunda 8.7**.

:::

Next, store various passwords in a Kubernetes secret, which will be used by the Helm chart. Below is an example of how to set up the required secret. You can use `openssl` to generate random secrets and store them in environment variables:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/openshift-ra-standard/aws/rosa-hcp/camunda-versions/8.7/procedure/install/generate-passwords.sh
```

Use these environment variables in the `kubectl` command to create the secret.

- The values for `postgres-password` and `password` are not required if you are using an external database. If you choose not to use an external database, you must provide those values.
- The `smtp-password` should be replaced with the appropriate external value ([see how it's used by Web Modeler](/self-managed/modeler/web-modeler/configuration/configuration.md#smtp--email)).

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/openshift-ra-standard/aws/rosa-hcp/camunda-versions/8.7/procedure/install/create-identity-secret.sh
```

### 3. Install Camunda 8 using Helm

Now that the `generated-values.yml` is ready, you can install Camunda 8 using Helm. Run the following command:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/openshift-ra-standard/aws/rosa-hcp/camunda-versions/8.7/procedure/install/install-chart.sh
```

This command:

- Installs (or upgrades) the Camunda platform using the Helm chart.
- Substitutes the appropriate version using the `$CAMUNDA_HELM_CHART_VERSION` environment variable.
- Applies the configuration from `generated-values.yml`.

:::note

This guide uses `helm upgrade --install` as it runs install on initial deployment and upgrades future usage. This may make it easier for future [Camunda 8 Helm upgrades](/self-managed/setup/upgrade.md) or any other component upgrades.

:::

You can track the progress of the installation using the following command:

```bash
watch -n 5 '
  kubectl get pods -n camunda --output=wide;
  if [ $(kubectl get pods -n camunda --field-selector=status.phase!=Running -o name | wc -l) -eq 0 ] &&
     [ $(kubectl get pods -n camunda -o json | jq -r ".items[] | select(.status.containerStatuses[]?.ready == false)" | wc -l) -eq 0 ];
  then
    echo "All pods are Running and Healthy - Installation completed!";
  else
    echo "Some pods are not Running or Healthy";
  fi
'
```

## Available Configurations of OpenShift Components

<!-- TODO: rework this part, it should introduced as an explaination and should not contains any setup part -->

### Security Context Constraints (SCCs)

[Security Context Constraints (SCCs)](https://docs.openshift.com/container-platform/latest/authentication/managing-security-context-constraints.html) are a set of conditions that a pod must adhere to in order to be accepted into the system. They define the security conditions under which a pod operates.

Similar to how roles control user permissions, SCCs regulate the permissions of deployed applications, both at the pod and container level. It's generally recommended to deploy applications with the most restrictive SCCs possible. If you're unfamiliar with security context constraints, you can refer to the [OpenShift documentation](https://docs.openshift.com/container-platform/latest/authentication/managing-security-context-constraints.html).

<Tabs queryString="current-scc">
  <TabItem value="scc" label="Restrictive SCCs (default)" default>

#### Restrictive SCCs

The following represents the most restrictive SCCs that can be used to deploy Camunda 8. Note that in OpenShift 4.10, these are equivalent to the built-in `restricted` SCCs (which are the default SCCs).

```yaml
Allow Privileged: false
Default Add Capabilities: <none>
Required Drop Capabilities: KILL, MKNOD, SYS_CHROOT, SETUID, SETGID
Allowed Capabilities: <none>
Allowed Seccomp Profiles: <none>
Allowed Volume Types: configMap, downwardAPI, emptyDir, persistentVolumeClaim, projected, secret
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

When using these SCCs, be sure not to specify _any_ `runAsUser` or `fsGroup` values in either the pod or container security context. Instead, allow OpenShift to assign arbitrary IDs.

:::note
If you are providing the ID ranges yourself, you can also configure the `runAsUser` and `fsGroup` values accordingly.
:::

The Camunda Helm chart can be deployed to OpenShift with a few modifications, primarily revolving around your desired security context constraints.
</TabItem>
<TabItem value="no-root-scc" label="Non-root SCCs">

#### Non-root SCCs

If you intend to deploy Camunda 8 while restricting applications from running as root (e.g., using the `nonroot` built-in SCCs), you'll need to configure each pod and container to run as a non-root user. For example, when deploying Zeebe using a stateful set, you would include the following YAML, replacing `1000` with the desired user ID:

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
As the container user in OpenShift is always part of the root group, defining a `fsGroup` for any Camunda 8 application pod security context is unnecessary.
:::

This configuration is necessary for all Camunda 8 applications, as well as related ones (e.g., Keycloak, PostgreSQL, etc.). It's particularly crucial for stateful applications that will write to persistent volumes, but it's also generally a good security practice.
</TabItem>
<TabItem value="permissive-scc" label="Permissive SCCs">

#### Permissive SCCs

If you deploy Camunda 8 (and related infrastructure) with permissive SCCs out of the box, there's nothing specific for you to configure. Here, permissive SCCs refer to those where the strategy for `RunAsUser` is defined as `RunAsAny` (including root).

  </TabItem>
</Tabs>

### Ingress Configuration

Before exposing services outside the cluster, we need an Ingress component. Here's how you can configure it:

<Tabs queryString="current-ingress">

<TabItem value="openshift-routes" label="Using OpenShift Routes" default>

[Routes](https://docs.openshift.com/container-platform/latest/networking/routes/route-configuration.html) expose services externally by linking a URL to a service within the cluster. [OpenShift supports both the standard Kubernetes Ingress and routes](https://docs.openshift.com/container-platform/latest/networking/ingress-operator.html), giving cluster users the flexibility to choose.

The presence of routes is rooted in their specification predating Ingress. It's worth noting that the functionality of routes differs from Ingress; for example, unlike Ingress, routes don't allow multiple services to be linked to a single route or the use of paths.

To use these routes for the Zeebe Gateway, configure this through Ingress as well.

#### Prerequisite

As the Zeebe Gateway also uses `gRPC` (which relies on `HTTP/2`), [HTTP/2 Ingress Connectivity has to be enabled](https://docs.openshift.com/container-platform/latest/networking/ingress-operator.html#nw-http2-haproxy_configuring-ingress).

Additionally, the Zeebe Gateway should be configured to use an encrypted connection with TLS. In OpenShift, the connection from HAProxy to the Zeebe Gateway service can use HTTP/2 only for re-encryption or pass-through routes, and not for edge-terminated or insecure routes.

#### Required Steps

1. Provide two [TLS secrets](https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets) for the Zeebe Gateway.

   - The first TLS secret is issued to the Zeebe Gateway Service Name. This must use the [PKCS #8 syntax](https://en.wikipedia.org/wiki/PKCS_8) or [PKCS #1 syntax](https://en.wikipedia.org/wiki/PKCS_1) as Zeebe only supports these, referenced as `camunda-platform-internal-service-certificate`.

   In the example below, a TLS certificate is generated for the Zeebe Gateway service with an [annotation](https://docs.openshift.com/container-platform/latest/security/certificates/service-serving-certificate.html). The generated certificate will be in the form of a secret.

   ```yaml
   zeebeGateway:
     service:
       annotations:
         service.beta.openshift.io/serving-cert-secret-name: camunda-platform-internal-service-certificate
   ```

   Another option is [Cert Manager](https://docs.openshift.com/container-platform/latest/security/cert_manager_operator/index.html). For more details, review the [OpenShift documentation](https://docs.openshift.com/container-platform/latest/networking/routes/secured-routes.html#nw-ingress-creating-a-reencrypt-route-with-a-custom-certificate_secured-routes).

    <details>
      <summary>PKCS #8, PKCS #1 syntax</summary>

   > PKCS #1 private key encoding. PKCS #1 produces a PEM block that contains the private key algorithm in the header and the private key in the body. A key that uses this can be recognised by its BEGIN RSA PRIVATE KEY or BEGIN EC PRIVATE KEY header. NOTE: This encoding is not supported for Ed25519 keys. Attempting to use this encoding with an Ed25519 key will be ignored and default to PKCS #8.

   > PKCS #8 private key encoding. PKCS #8 produces a PEM block with a static header and both the private key algorithm and the private key in the body. A key that uses this encoding can be recognised by its BEGIN PRIVATE KEY header.

   [PKCS #1, PKCS #8 syntax definitionfrom cert-manager](https://cert-manager.io/docs/reference/api-docs/#cert-manager.io/v1.PrivateKeyEncoding)

    </details>

   - The second TLS secret is used on the exposed route, referenced as `camunda-platform-external-certificate`. For example, this would be the same TLS secret used for Ingress.

1. Configure your Zeebe Gateway Ingress to create a [Re-encrypt Route](https://docs.openshift.com/container-platform/latest/networking/routes/route-configuration.html#nw-ingress-creating-a-route-via-an-ingress_route-configuration):

   ```yaml
   zeebeGateway:
     ingress:
       grpc:
         annotations:
           route.openshift.io/termination: reencrypt
           route.openshift.io/destination-ca-certificate-secret: camunda-platform-internal-service-certificate
         className: openshift-default
         tls:
           enabled: true
           secretName: camunda-platform-external-certificate
   ```

1. Mount the **Service Certificate Secret** to the Zeebe Gateway Pod:

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
           secretName: camunda-platform-internal-service-certificate
           items:
             - key: tls.crt
               path: tls.crt
           defaultMode: 420
       - name: key
         secret:
           secretName: camunda-platform-internal-service-certificate
           items:
             - key: tls.key
               path: tls.key
           defaultMode: 420
   ```

1. Mount the **Service Certificate Secret** to the Operate and Tasklist pods and configure the secure TLS connection. Here, only the `tls.crt` file is required.

   For Operate:

   ```yaml
   operate:
     env:
       - name: CAMUNDA_OPERATE_ZEEBE_SECURE
         value: "true"
       - name: CAMUNDA_OPERATE_ZEEBE_CERTIFICATEPATH
         value: /usr/local/operate/config/tls.crt
       - name: CAMUNDA_OPERATE_ZEEBE_BROKERCONTACTPOINT
         value: camunda-zeebe-gateway.camunda.svc.cluster.local:26500
     extraVolumeMounts:
       - name: certificate
         mountPath: /usr/local/operate/config/tls.crt
         subPath: tls.crt
     extraVolumes:
       - name: certificate
         secret:
           secretName: camunda-platform-internal-service-certificate
           items:
             - key: tls.crt
               path: tls.crt
           defaultMode: 420
   ```

   The actual configuration properties can be reviewed [in the Operate configuration documentation](/self-managed/operate-deployment/operate-configuration.md#zeebe-broker-connection).

   For Tasklist:

   ```yaml
   tasklist:
     env:
       - name: CAMUNDA_TASKLIST_ZEEBE_SECURE
         value: "true"
       - name: CAMUNDA_TASKLIST_ZEEBE_CERTIFICATEPATH
         value: /usr/local/tasklist/config/tls.crt
       - name: CAMUNDA_TASKLIST_ZEEBE_BROKERCONTACTPOINT
         value: camunda-zeebe-gateway.camunda.svc.cluster.local:26500
     extraVolumeMounts:
       - name: certificate
         mountPath: /usr/local/tasklist/config/tls.crt
         subPath: tls.crt
     extraVolumes:
       - name: certificate
         secret:
           secretName: camunda-platform-internal-service-certificate
           items:
             - key: tls.crt
               path: tls.crt
           defaultMode: 420
   ```

   The actual configuration properties can be reviewed [in the Tasklist configuration documentation](/self-managed/tasklist-deployment/tasklist-configuration.md#zeebe-broker-connection).

1. Configure Connectors:

   ```yaml
   connectors:
     inbound:
       mode: oauth
     env:
       - name: ZEEBE_CLIENT_BROKER_GATEWAY-ADDRESS
         value: "camunda-zeebe-gateway.camunda.svc.cluster.local:26500"
       - name: ZEEBE_CLIENT_SECURITY_PLAINTEXT
         value: "false"
       - name: CAMUNDA_CLIENT_ZEEBE_CACERTIFICATEPATH
         value: /usr/local/certificates/tls.crt
     extraVolumeMounts:
       - name: certificate
         mountPath: /usr/local/certificates/tls.crt
         subPath: tls.crt
     extraVolumes:
       - name: certificate
         secret:
           secretName: camunda-platform-internal-service-certificate
           items:
             - key: tls.crt
               path: tls.crt
           defaultMode: 420
   ```

   The actual configuration properties can be reviewed [in the Connectors configuration documentation](/self-managed/connectors-deployment/connectors-configuration.md#zeebe-broker-connection).

1. Configure all other applications running inside the cluster and connecting to the Zeebe Gateway to also use TLS.

<!--Intended space left for not breaking the build!-->

<!--Intended space left for not breaking the build!-->
  </TabItem>

  <TabItem value="kubernetes-ingress" label="Using Kubernetes Ingress">

[Routes](https://docs.openshift.com/container-platform/latest/networking/routes/route-configuration.html) serve as OpenShift's default Ingress implementation.

If you find that its features aren't suitable for your needs, or if you prefer to use a Kubernetes-native Ingress controller, such as the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx), [you have that option](https://www.redhat.com/en/blog/a-guide-to-using-routes-ingress-and-gateway-apis-in-kubernetes-without-vendor-lock-in).

For guidance on installing an Ingress controller, you can refer to the [Ingress Setup documentation](/self-managed/setup/guides/ingress-setup.md).

:::note Difference between ingress-nginx and NGINX Ingress

Do not confuse the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx) with the [NGINX Ingress Controller](https://www.redhat.com/en/blog/using-nginx-ingress-controller-red-hat-openshift) that is endorsed by Red Hat for usage with OpenShift. Despite very similar names, they are two different products.

If you should decide to use the Red Hat endorsed [NGINX Ingress Controller](https://www.redhat.com/en/blog/using-nginx-ingress-controller-red-hat-openshift), you would require additional adjustments done to the Camunda 8 Ingress objects and the NGINX Ingress Controller itself to make `gRPC` and `HTTP/2` connections work. In that case, please refer to the [example and the prerequisites](https://github.com/nginxinc/kubernetes-ingress/blob/main/examples/ingress-resources/grpc-services/README.md).

:::

  </TabItem>
</Tabs>

## Verify connectivity to Camunda 8

Please follow our [guide to verify connectivity to Camunda 8](/self-managed/setup/deploy/amazon/amazon-eks/eks-helm.md#verify-connectivity-to-camunda-8)

## Pitfalls to avoid

For general deployment pitfalls, visit the [deployment troubleshooting guide](/self-managed/operational-guides/troubleshooting/troubleshooting.md).
