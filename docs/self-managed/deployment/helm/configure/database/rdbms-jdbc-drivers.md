---
id: rdbms-jdbc-drivers
sidebar_label: JDBC driver management
title: JDBC driver management for RDBMS
description: "Understand bundled JDBC drivers, when to supply custom drivers, and how to load them in Kubernetes."
---

This page covers JDBC driver management for RDBMS deployments in Kubernetes. For configuration and troubleshooting, see [configure RDBMS in Helm charts](/self-managed/deployment/helm/configure/database/rdbms.md).

## Bundled vs. custom JDBC drivers

### Which drivers are included?

Camunda bundles JDBC drivers for databases where licensing permits:

| Database   | Bundled | Version | When to supply custom drivers                                                                |
| ---------- | ------- | ------- | -------------------------------------------------------------------------------------------- |
| PostgreSQL | Yes     | 42.7.8  | Patches, extensions, or compatibility with older server versions.                            |
| MariaDB    | Yes     | 3.5.7   | Custom JDBC features or compliance requirements.                                             |
| SQL Server | Yes     | 12.10.2 | Custom features or version-specific requirements.                                            |
| H2         | Yes     | 2.3.232 | Development and testing only; not recommended for production due to scalability limitations. |
| Oracle     | No      | —       | Always; licensing prevents bundling.                                                         |
| MySQL      | No      | —       | Always; licensing prevents bundling.                                                         |

### When to supply a custom driver

Consider supplying a custom JDBC driver in these scenarios:

1. **Oracle or MySQL databases**: No bundled drivers available; custom drivers recommended.
2. **Version compatibility**: Your database version is not compatible with the bundled driver.
3. **Security patches**: A critical patch is available for the bundled driver before the next Camunda release.
4. **Custom extensions**: You use database-specific features not covered by bundled drivers.
5. **Compliance or licensing**: Your organization policy requires specific driver versions or sources.

### Driver provisioning strategies

Choose one of the three approaches below. **Init container is recommended for production.**

| Strategy             | Pros                                    | Cons                               | Best for                |
| -------------------- | --------------------------------------- | ---------------------------------- | ----------------------- |
| **Init container**   | Automatic at pod startup; reproducible. | Requires external download source. | Production (standard)   |
| **Custom image**     | Simple for teams with image registries. | Not yet validated in production.   | Dev/test only           |
| **ConfigMap/Volume** | GitOps-friendly; no external downloads. | Requires manual driver management. | Teams with restrictions |

## Loading JDBC drivers into pods

Some databases—such as Oracle—require JDBC drivers that cannot be included in the Camunda image due to licensing restrictions. You must provide these drivers at runtime using one of the following approaches.

### Option 1: Using an init container

:::note
This example uses `/driver-lib`, which the Orchestration Cluster automatically adds to the classpath. If you use a different directory, additional override configuration may be required.
:::

```yaml
orchestration:
  exporters:
    camunda:
      enabled: false
    rdbms:
      enabled: true
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:oracle:thin:@//hostname:1521/FREEPDB1
        username: myuser
        secret:
          inlineSecret: mypassword
  extraVolumeMounts:
    - name: jdbcdrivers
      mountPath: /driver-lib
  extraVolumes:
    - name: jdbcdrivers
      emptyDir: {}
  initContainers:
    - name: fetch-jdbc-drivers
      image: alpine:3.19
      imagePullPolicy: Always
      command:
        - sh
        - -c
        - >
          wget https://repo1.maven.org/maven2/com/oracle/database/jdbc/ojdbc11/23.9.0.25.07/ojdbc11-23.9.0.25.07.jar
          -O /driver-lib/ojdbc.jar
      volumeMounts:
        - name: jdbcdrivers
          mountPath: /driver-lib
      securityContext:
        runAsUser: 1001
```

After loading JDBC drivers into pods, run the validation checklist in [validate RDBMS connectivity](/self-managed/deployment/helm/configure/database/validate-rdbms.md) to confirm the application can load the driver, reach the database, and initialize schema.

### Option 2: Using a custom Docker image

:::warning Important
This approach has not yet been validated in production.
:::

```dockerfile
FROM camunda/camunda-platform:8.9.0
ADD ojdbc8.jar /driver-lib/ojdbc8.jar
```

Build and push:

```sh
docker build -t internal-registry/orchestration:8.9.0 .
docker push internal-registry/orchestration:8.9.0
```

Configure in Helm:

```yaml
orchestration:
  exporters:
    camunda:
      enabled: false
    rdbms:
      enabled: true
  image:
    repository: internal-registry/orchestration
    tag: 8.9.0
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:oracle:thin:@//hostname:1521/FREEPDB1
        username: myuser
        secret:
          inlineSecret: mypassword
```

### Option 3: Mounting a JDBC driver from a volume

:::warning Important
Mounting an `emptyDir volume` does not persist across pod restarts. Use a ConfigMap, PersistentVolume, or custom image for production.
:::

```yaml
orchestration:
  exporters:
    camunda:
      enabled: false
    rdbms:
      enabled: true
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:oracle:thin:@//hostname:1521/FREEPDB1
        username: myuser
        secret:
          inlineSecret: mypassword
  extraVolumeMounts:
    - name: jdbcdrivers
      mountPath: /driver-lib
  extraVolumes:
    - name: jdbcdrivers
      emptyDir: {}
```

Copy the driver manually to the pod:

```sh
kubectl cp /path/to/ojdbc8.jar <pod-name>:/driver-lib/ojdbc8.jar
```

## Verifying driver loading

After deployment, verify the JDBC driver was loaded:

```bash
# Check that the driver JAR exists
kubectl exec <pod-name> -- ls -la /driver-lib/

# Check logs for successful driver initialization
kubectl logs <pod-name> | grep -i "driver\|jdbc"
```

Common success indicators in logs:

```
org.springframework.boot.StartupInfoLogger - Started Application in X seconds
io.camunda.exporter.rdbms.RdbmsExporter - RdbmsExporter created with Configuration
```

Common failure indicators:

```
java.lang.ClassNotFoundException: oracle.jdbc.OracleDriver
java.sql.SQLException: No suitable driver found
```

If you see failures, verify:

1. The driver JAR file is present in `/driver-lib/`.
2. The init container or custom image executed successfully.
3. The JDBC URL in your configuration matches the driver (for example, Oracle URL with Oracle driver).

## JDBC driver updates

### Updating bundled drivers

Bundled drivers are updated with new Camunda releases. To update:

1. Identify the new Camunda version with the updated driver.
2. Upgrade Camunda: `helm upgrade camunda camunda/camunda-platform --version X.Y.Z -f values.yaml -n camunda`.

### Updating custom drivers

If you're supplying a custom driver, update it by:

1. **Init container approach**: Update the driver download URL or image in your Helm values.
2. **Custom image approach**: Rebuild and push a new image with the updated driver.
3. **ConfigMap/Volume approach**: Update the driver JAR in your ConfigMap or PersistentVolume.

Then redeploy:

```bash
helm upgrade camunda camunda/camunda-platform -f values.yaml -n camunda
```

Kubernetes will recreate the pods with the new driver.
