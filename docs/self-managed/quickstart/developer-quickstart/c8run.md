---
id: c8run
title: "Developer quickstart – Camunda 8 Run"
sidebar_label: "Camunda 8 Run"
description: "This quickstart guides application developers through deploying Camunda 8 Self-Managed to a local orchestration cluster using Camunda 8 Run."
---

import {C8Run} from "@site/src/components/CamundaDistributions";

:::note
Camunda 8 Run is not supported for production use.
:::

Camunda 8 Run enables you to run [Orchestration cluster](../../../../reference/glossary#orchestration-cluster), including Zeebe, Operate, Tasklist, Identity, and Elasticsearch, with minimal configuration. It is intended for developers who want to model BPMN diagrams, deploy them, and interact with running process instances in a simple environment. This guide explains how to get started on your local or virtual machine.

Camunda 8 Run includes the following:

- Orchestration Cluster
- Connectors
- Elasticsearch (default [secondary storage](/self-managed/concepts/secondary-storage/index.md))

Camunda 8 Run also supports document storage and management with [document handling](/self-managed/concepts/document-handling/overview.md).

## Prerequisites

- **OpenJDK 21–23**: Required for running Camunda 8 as a Java application.
- **Docker 20.10.21+**: Required for running Camunda 8 via Docker Compose.
- **[Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md)**
- **If using Ubuntu**: Ubuntu 22.04 or newer

:::note
After installing OpenJDK, ensure `JAVA_HOME` is set by running `java -version` in a **new** terminal.

If no version of Java is found, follow your chosen installation's instructions for setting `JAVA_HOME` before continuing.
:::

## Install and start Camunda 8 Run

1. Download the latest release of <C8Run/> for your operating system and architecture. Opening the `.tgz` file extracts the Camunda 8 Run script into a new directory.
2. Navigate to the new `c8run` directory.
3. Start Camunda 8 Run by running one of the following in your terminal:

- On Mac and Linux:
  - Run the helper script: `./start.sh`
  - Or use the CLI command: `./c8run start`
- On Windows:
  - Use the CLI command: `.\c8run.exe start`

If startup is successful, a browser window for Operate will open automatically. Alternatively, you can access Operate at [http://localhost:8080/operate](http://localhost:8080/operate).

To start Camunda 8 in Docker Compose using Camunda 8 Run you can use the following option. It is equivalent of running `docker compose up -d` :

- On Mac and Linux: `./start.sh --docker`
- On Windows: `.\c8run.exe start --docker`

When started with Docker, Operate will be available at [http://localhost:8088/operate](http://localhost:8088/operate).

:::note
If Camunda 8 Run fails to start, run the [shutdown script](#shut-down-camunda-8-run) to end the current processes, then run the start script again.
:::

### Configuration options

The following options provide a convenient way to override settings for quick tests and interactions in Camunda 8 Run.  
For more advanced or permanent configuration, modify the default `configuration/application.yaml` or supply a custom file using the `--config` flag (e.g., [to enable authentication and authorization](#enable-authentication-and-authorization)).

| Argument                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--config <path>`          | Applies the specified Zeebe [`application.yaml`](/self-managed/components/orchestration-cluster/zeebe/configuration/configuration.md).                                                                                                                                                                                                                                                                                                 |
| `--username <arg>`         | Configures the first user’s username as `<arg>`.                                                                                                                                                                                                                                                                                                                                                                                       |
| `--password <arg>`         | Configures the first user’s password as `<arg>`.                                                                                                                                                                                                                                                                                                                                                                                       |
| `--keystore <arg>`         | Configures the TLS certificate for HTTPS. If not specified, HTTP is used. For more information, see [enabling TLS](#enable-tls).                                                                                                                                                                                                                                                                                                       |
| `--keystorePassword <arg>` | Provides the password for the JKS keystore file.                                                                                                                                                                                                                                                                                                                                                                                       |
| `--port <arg>`             | Sets the Camunda core port (default: `8080`).                                                                                                                                                                                                                                                                                                                                                                                          |
| `--log-level <arg>`        | Sets the log level for the Camunda core.                                                                                                                                                                                                                                                                                                                                                                                               |
| `--docker`                 | Downloads and runs the Camunda Docker Compose distribution. This option provides an easy shortcut to run Camunda in Docker Compose. However, additional Camunda 8 Run options are not supported and will be ignored. For more information on running Camunda with Docker Compose see the [documentation](./docker-compose.md). See the [shutdown script](#shut-down-camunda-8-run) for information on stopping the Docker application. |
| `--disable-elasticsearch`  | Prevents the built-in Elasticsearch from starting. Ensure another Elasticsearch instance is provided via `--config`. See the [external Elasticsearch](#start-external-elasticsearch) section for details.                                                                                                                                                                                                                              |
| `--startup-url`            | The URL to open after startup (e.g., `'http://localhost:8080/operate'`). By default, Operate is opened.                                                                                                                                                                                                                                                                                                                                |

## Work with Camunda 8 Run

### Access Camunda components

Camunda 8 Run uses basic authentication with demo/demo for all web interfaces. OIDC/Keycloak is not included in this distribution.  
You can log in to all web interfaces using the default credentials:

- **Username:** `demo`
- **Password:** `demo`

These web interfaces are available at:

- **Operate:** http://localhost:8080/operate
- **Tasklist:** http://localhost:8080/tasklist
- **Identity:** http://localhost:8080/identity

The following components do not have a web interface, but their endpoints are useful for additional configuration:

- **Orchestration Cluster REST API:** http://localhost:8080/v2/
- **Inbound Connectors API:** http://localhost:8086/
- **Zeebe API (gRPC):** http://localhost:26500/
- **Metrics (Prometheus):** http://localhost:9600/actuator/prometheus
- **Swagger UI (API Explorer):** http://localhost:8080/swagger-ui/index.html

:::note

- The URLs for the Docker Compose application can be found in the [Docker Compose](#docker-compose) documentation.
- The Connectors API does not provide a web interface. If you access its URL in a browser, you may see a login page, but it cannot be used to sign in. Use the API endpoints directly instead.
  :::

### Deploy diagrams from Desktop Modeler

Make sure you have installed [Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md) before continuing.

To [deploy diagrams](/self-managed/components/modeler/desktop-modeler/deploy-to-self-managed.md) from Desktop Modeler, use the following configuration:

- **Target:** Self-Managed
- **Cluster endpoint:** `http://localhost:26500` (Zeebe Gateway)
- **Authentication:** None

A success notification will display when complete. [Start a new process instance](/components/modeler/desktop-modeler/start-instance.md) to view your running process in Operate.

### Use built-in and custom connectors

Desktop Modeler [automatically fetches](/components/modeler/desktop-modeler/use-connectors.md#automatic-connector-template-fetching) templates for pre-built connectors. [Custom connectors](/components/connectors/custom-built-connectors/connector-sdk.md) can also be added to your Camunda 8 Run distribution.

To add a custom connector:

1. Place the connector’s `.jar` file in the `/custom_connectors` folder within the `/c8run` directory.
2. Place the element template in the appropriate folder for your installation. See [Search Paths](/components/modeler/desktop-modeler/search-paths/search-paths.md) for more information.

Once configured, your connectors are available for use in Modeler.

### Configure Connector secrets

Connector Secrets can be provided as environment variables by adding them to the `.env` file in the root folder.  
When starting Camunda 8 Run with the `--docker` option, add the connector secrets to the `connector-secrets.txt` file in the docker-compose folder.

### Use Camunda APIs

All APIs **do not require authentication by default** in Camunda 8 Run and can be accessed without credentials or tokens.

Available APIs include:

- [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)
- [Zeebe gRPC](/apis-tools/zeebe-api/grpc.md)

### Enable authentication and authorization

By default, Camunda 8 Run configures authentication for web interfaces (demo/demo) but all API endpoints are open and do not require authentication.  
To secure APIs, enable authorization in `application.yaml`.

You can either:

- Update the existing `configuration/application.yaml`, or
- Create a new `application.yaml` in the `/c8run` folder and pass it at startup using the [`--config` flag](#configuration-options):

```yaml
camunda:
  security:
    authentication:
      # Require authentication for API requests
      unprotected-api: false
    authorizations:
      # Enable authorization checks
      enabled: true
```

Start Camunda 8 Run with the configuration:

```bash
./start.sh --config application.yaml
```

Once enabled, API requests must include valid credentials. For example:

```shell
curl --request GET 'http://localhost:8080/v2/topology'  \
  -u demo:demo \
  --header 'Content-Type: application/json' \
  --data-raw '{}'
```

To add additional users (e.g., an admin user), extend the configuration:

```yaml
camunda:
  security:
    initialization:
      users:
        - username: user
          password: user
          name: user
          email: user@example.com
      defaultRoles:
        admin:
          users:
            - user
```

## Shut down Camunda 8 Run

To shut down (non-Docker) Camunda 8 Run and end all running processes, run the following command from the `c8run` directory:

```bash
./shutdown.sh

# Windows:
# .\c8run.exe stop
```

If you started Camunda 8 Run with Docker `./start.sh --docker`, run the following command instead:

```bash
# Stop containers but keep existing data
docker compose -f docker-compose-8.8/docker-compose.yaml down
# (older bundles use: docker/docker-compose.yml)

# Stop containers and remove all data volumes
docker compose -f docker-compose-8.8/docker-compose.yaml down -v
```

The `-v` option removes all Docker volumes, including persisted data such as users and process instances. Omit `-v` if you want to keep your existing data for the next startup.

To confirm that Camunda 8 Run has stopped, check for active containers:

```bash
docker ps
```

## Advanced configuration

### Enable TLS

TLS can be enabled by providing a local keystore file using the `--keystore` argument at startup. Camunda 8 Run accepts `.jks` certificate files.  
Although Camunda 8 Run supports TLS, this is intended only for testing.

### Access metrics

Metrics are enabled in Camunda 8 Run by default and can be accessed at [http://localhost:9600/actuator/prometheus](http://localhost:9600/actuator/prometheus).  
For more information, see the [metrics](/self-managed/operational-guides/monitoring/metrics.md) documentation.

### Configure or switch secondary storage (Elasticsearch or H2)

Camunda 8 Run supports multiple secondary-storage options.  
By default, it uses **Elasticsearch**, but you can switch to **H2** for lightweight local development or testing.

#### Default: Elasticsearch

In version 8.9-alpha1 and later, Camunda 8 Run starts with **Elasticsearch** as the default secondary storage.

```yaml
data:
  secondary-storage:
    type: elasticsearch
```

#### Optional: H2 (for local testing)

To test Camunda 8 Run with an in-memory H2 database, configure `type: rdbms` as shown below.

:::note Important!
Disable Operate and webapp backup when using H2; otherwise, Camunda 8 Run will not start correctly.
:::

```yaml
camunda:
  backup:
    webapps:
      enabled: false
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:h2:mem:camunda
        username: sa
        password:
        flushInterval: PT0.5S
        queueSize: 1000

spring:
  profiles:
    active: "broker,consolidated-auth,identity,tasklist"
```

H2 runs in memory by default, so data is lost when you stop Camunda 8 Run.
To persist data locally, use a file-based configuration such as:

```yaml
url: jdbc:h2:file:./camunda-data/h2db
```

<details>

<summary>Full example configuration</summary>

```yaml
camunda:
  backup:
    webapps:
      enabled: false
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:h2:mem:camunda
        username: sa
        password:
        flushInterval: PT0.5S
        queueSize: 1000
  security:
    initialization:
      users:
        - username: demo
          password: demo
          name: Demo
          email: demo@example.com
      defaultRoles:
        admin:
          users:
            - demo
    authentication:
      method: BASIC
      unprotected-api: true
    authorizations:
      enabled: false

zeebe:
  broker:
    network:
      host: localhost
      advertisedHost: localhost
  gateway:
    cluster:
      initialContactPoints: zeebe:26502
      memberId: identity

spring:
  profiles:
    active: "broker,consolidated-auth,identity,tasklist"
```

</details>

:::note
Operate and Tasklist work with H2 only after both migrate to the v2 APIs.  
Use H2 for testing Camunda 8 Run only, and disable Operate and webapp backup.
:::

### Switching between storage types

To change storage in Camunda 8 Run:

- **Switch to Elasticsearch (default)** — remove or comment out the `data.secondary-storage` section.
- **Switch to H2** — add the H2 configuration shown above and restart Camunda 8 Run.
- **Switch back to Elasticsearch** — delete or comment out the H2 section and restart Camunda 8 Run.

Choose **H2** for quick local development with minimal setup,  
and **Elasticsearch** for production-like scenarios or when using Operate and Tasklist.

### Primary vs. secondary storage

Camunda 8 uses two layers of storage:

- **Primary storage** is handled by the Zeebe broker to store workflow execution data.
- **Secondary storage** is used by applications like Operate, Tasklist, and Identity to read and present that data.

For more details on how these layers interact, see [secondary storage architecture](/self-managed/concepts/secondary-storage/index.md).  
Camunda 8 Run uses v2 APIs by default, so no additional configuration is required when H2 becomes the default in a future release.

### Known limitations (8.9-alpha1)

- Operate and Tasklist are **not yet supported** when using H2.
- H2 is intended for **testing only** in this alpha release.
- Data stored in H2 is ephemeral unless configured as file-based.
- Performance and memory use may vary depending on local environment.

### Environment variables

The following advanced configuration options can be provided via environment variables:

| Variable       | Description                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ES_JAVA_OPTS` | Allows you to override Java command line parameters for Elasticsearch. This can allow you to increase memory limits. **Default:** `-Xms1g -Xmx1g` |
| `JAVA_OPTS`    | Allows you to override Java command line parameters for Camunda.                                                                                  |

## Troubleshooting

If you encounter issues while running Camunda 8 Run, check the common problems and solutions below. Camunda 8 run also writes log files to the `c8run/logs` directory, which can provide additional information about errors, it's recommended to check these logs first when troubleshooting:

- `c8run.log` - Main log file for Camunda 8 Run
- `connectors.log` - Log file for the Connectors component
- `elasticsearch.log` - Log file for the embedded Elasticsearch instance (if used)

### Startup failures

#### Port conflicts

**Problem:** Camunda 8 Run fails to start with errors indicating that ports are already in use.

**Solution:**

1. Check if the default ports are already occupied:
   - `8080` - Camunda core (Operate, Tasklist, Identity, APIs)
   - `8086` - Connectors API
   - `26500` - Zeebe gRPC Gateway
   - `9600` - Metrics (Prometheus)
   - `9200` - Elasticsearch (when using embedded Elasticsearch)
   - `9300` - Elasticsearch cluster communication

2. Stop any processes using these ports or change the port configuration:

   ```bash
   # Check which process is using a port
   # macOS/Linux:
   lsof -i :8080

   # Windows:
   netstat -ano | findstr :8080

   # Change the Camunda core port at startup
   # macOS/Linux:
   ./c8run start --port 8081

   # Windows:
   c8run.exe start --port 8081
   ```

3. If using Docker mode, ensure no other Docker containers are using these ports:
   ```bash
   docker ps
   docker stop <container-name>
   ```

#### Java version issues

**Problem:** Camunda 8 Run fails to start with Java-related errors or "JAVA_HOME not found".

**Solution:**

1. Verify Java is installed and the version is correct (OpenJDK 21–23 required):

```bash
java -version
```

2. Ensure `JAVA_HOME` is properly set:

```bash
# macOS/Linux:
echo $JAVA_HOME

# Windows (Command Prompt):
echo %JAVA_HOME%
```

If not set, add to your session (adjust path to match your Java installation):

```bash
# macOS:
export JAVA_HOME=$(/usr/libexec/java_home -v 21)

# Linux:
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64

# Windows (PowerShell):
setx JAVA_HOME "C:\Program Files\Java\jdk-21"
```

Alternatively you can set it in System Environment Variables on Windows. Then open a **new** terminal window after setting `JAVA_HOME` to ensure the environment variable is loaded

#### Incomplete startup

**Problem:** Camunda 8 Run starts but some components fail to load or the browser doesn't open automatically.

**Solution:**

1. Run the shutdown script to clean up any partial startup:

```bash
# macOS/Linux:
./c8run stop

# Windows:
c8run.exe stop
```

2. Start Camunda 8 Run again:

```bash
# macOS/Linux:
./c8run start

# Windows:
c8run.exe start
```

3. Manually access the web interfaces if the browser doesn't open automatically:
   - Operate: [http://localhost:8080/operate](http://localhost:8080/operate)
   - Tasklist: [http://localhost:8080/tasklist](http://localhost:8080/tasklist)

### Memory and performance issues

#### Out of memory errors

**Problem:** Camunda 8 Run crashes or becomes unresponsive due to insufficient memory, particularly with Elasticsearch.

**Solution:**

1. Increase the heap size for Elasticsearch by setting the `ES_JAVA_OPTS` environment variable:

   ```bash
   # macOS/Linux:
   export ES_JAVA_OPTS="-Xms2g -Xmx2g"
   ./start.sh

   # Windows (Command Prompt):
   set ES_JAVA_OPTS=-Xms2g -Xmx2g
   c8run.exe start

   # Windows (PowerShell):
   $env:ES_JAVA_OPTS="-Xms2g -Xmx2g"
   c8run.exe start
   ```

2. Increase heap size for Camunda components using `JAVA_OPTS`:

   ```bash
   # macOS/Linux:
   export JAVA_OPTS="-Xmx4g"

   # Windows (Command Prompt):
   set JAVA_OPTS=-Xmx4g

   # Windows (PowerShell):
   $env:JAVA_OPTS="-Xmx4g"
   ```

3. For resource-constrained environments, consider using H2 instead of Elasticsearch for testing (see [Configure or switch secondary storage](#configure-or-switch-secondary-storage-elasticsearch-or-h2)).

#### Slow performance

**Problem:** Camunda 8 Run is running slowly or processes take a long time to appear in Operate.

**Solution:**

1. Ensure your system meets the minimum requirements, particularly available RAM (recommend 8GB+).
2. Close unnecessary applications to free up system resources.
3. Check if Elasticsearch is running properly:
   ```bash
   # macOS/Linux/Windows (with curl installed):
   curl http://localhost:9200/_cluster/health
   ```
   On Windows, open the following page: [http://localhost:9200/\_cluster/health](http://localhost:9200/_cluster/health)

### Elasticsearch issues

#### Elasticsearch fails to start

**Problem:** Elasticsearch component fails to start, preventing Operate and Tasklist from functioning.

**Solution:**

1. Check Elasticsearch logs in the `c8run` directory for specific error messages.

2. Ensure sufficient disk space is available (Elasticsearch requires adequate space for indices).

3. Verify Elasticsearch ports (9200, 9300) are not in use by other applications.

4. If Elasticsearch continues to fail, consider using an external Elasticsearch instance:

   ```bash
   # macOS/Linux:
   ./c8run start --disable-elasticsearch --config custom-application.yaml

   # Windows:
   c8run.exe start --disable-elasticsearch --config custom-application.yaml
   ```

   Provide connection details to your external Elasticsearch in the configuration file.

#### Index creation errors

**Problem:** Operate or Tasklist show errors related to Elasticsearch indices.

**Solution:**

1. Stop Camunda 8 Run completely:

   ```bash
   # macOS/Linux:
   ./shutdown.sh

   # Windows:
   c8run.exe stop
   ```

2. Clear Elasticsearch data (warning: this deletes all data):

   ```bash
   # macOS/Linux:
   rm -rf data/elasticsearch

   # Windows (Command Prompt):
   rmdir /s /q data\elasticsearch

   # Windows (PowerShell):
   # Remove-Item -Path data\elasticsearch -Recurse -Force
   ```

3. Restart Camunda 8 Run to recreate indices from scratch.

### Authentication and access issues

#### Cannot log in to web interfaces

**Problem:** Default credentials (demo/demo) don't work or login page doesn't appear.

**Solution:**

1. Verify authentication is configured correctly. By default, web interfaces use basic authentication with demo/demo.

2. If you've enabled custom authentication in `application.yaml`, ensure the configuration is correct:

   ```yaml
   camunda:
     security:
       authentication:
         method: BASIC
       initialization:
         users:
           - username: demo
             password: demo
   ```

3. Clear browser cache and cookies, then try again.

4. Check if authentication settings were changed using command-line flags:

   ```bash
   # macOS/Linux:
   ./start.sh --username myuser --password mypassword

   # Windows:
   c8run.exe start --username myuser --password mypassword
   ```

#### API authentication errors

**Problem:** API calls fail with authentication errors even though authentication is disabled by default.

**Solution:**

1. Verify that `unprotected-api` is set to `true` in your configuration (this is the default):

   ```yaml
   camunda:
     security:
       authentication:
         unprotected-api: true
   ```

2. If you've enabled API authentication, include credentials in your API calls:

   ```bash
   # macOS/Linux/Windows (with curl installed):
   curl -u demo:demo http://localhost:8080/v2/topology

   # Windows (PowerShell alternative without curl):
   $pair = "demo:demo"
   $bytes = [System.Text.Encoding]::ASCII.GetBytes($pair)
   $base64 = [System.Convert]::ToBase64String($bytes)
   Invoke-WebRequest -Uri http://localhost:8080/v2/topology -Headers @{Authorization="Basic $base64"}
   ```

### Docker-specific issues

#### Docker Compose fails to start

**Problem:** Starting Camunda 8 Run with `--docker` option fails.

**Solution:**

1. Ensure Docker is running:

   ```bash
   docker --version
   docker ps
   ```

2. Verify Docker has sufficient resources allocated (recommended: 4 CPU cores, 8GB RAM).

3. Check for conflicting containers:

   ```bash
   docker ps -a
   docker rm <container-name>  # Remove conflicting containers
   ```

4. Pull the latest images:

   ```bash
   docker compose -f docker-compose-8.8/docker-compose.yaml pull
   ```

5. Remove old volumes if experiencing data corruption:
   ```bash
   docker compose -f docker-compose-8.8/docker-compose.yaml down -v
   ```

#### Cannot access services in Docker mode

**Problem:** Services are not accessible at the expected URLs when using Docker Compose.

**Solution:**

When using `--docker` mode, services are available on different ports:

- Operate: [http://localhost:8088/operate](http://localhost:8088/operate) (not 8080)
- Refer to the [Docker Compose documentation](./docker-compose.md) for all service URLs.

### Configuration issues

#### Custom configuration not loading

**Problem:** Changes in `application.yaml` are not being applied.

**Solution:**

1. Ensure you're passing the configuration file correctly:

   ```bash
   # macOS/Linux:
   ./start.sh --config /path/to/application.yaml

   # Windows:
   c8run.exe start --config C:\path\to\application.yaml
   ```

2. Verify the YAML syntax is correct (proper indentation, no tabs).

3. Check that the configuration file is in the correct location (either in `configuration/` directory or specify full path with `--config`).

4. Restart Camunda 8 Run completely after configuration changes.

#### TLS/HTTPS issues

**Problem:** HTTPS fails to work or certificate errors occur.

**Solution:**

1. Verify the keystore file is in JKS format and the path is correct:

   ```bash
   # macOS/Linux:
   ./start.sh --keystore /path/to/keystore.jks --keystorePassword yourpassword

   # Windows:
   c8run.exe start --keystore C:\path\to\keystore.jks --keystorePassword yourpassword
   ```

2. Remember that TLS in Camunda 8 Run is intended for testing only, not production use.

3. Check keystore validity:
   ```bash
   keytool -list -keystore keystore.jks
   ```

### Data and persistence issues

#### Lost data after restart

**Problem:** Process instances, deployments, or users disappear after restarting Camunda 8 Run.

**Solution:**

1. If using H2 in-memory mode, data is lost on shutdown. Configure file-based persistence:

   ```yaml
   camunda:
     data:
       secondary-storage:
         type: rdbms
         rdbms:
           url: jdbc:h2:file:./camunda-data/h2db
   ```

2. For Docker mode, ensure you're not using the `-v` flag when stopping:

   ```bash
   # Don't use -v if you want to keep data
   docker compose -f docker-compose-8.8/docker-compose.yaml down
   ```

3. Check that data directories have proper write permissions.

### Connector issues

#### Custom connectors not loading

**Problem:** Custom connector JARs are not recognized.

**Solution:**

1. Verify the connector JAR is placed in the correct location:

   ```
   # macOS/Linux:
   /c8run/custom_connectors/your-connector.jar
   # Windows:
   c8run\custom_connectors\your-connector.jar
   ```

2. Ensure the element template is placed in the correct Desktop Modeler search path.

3. Restart Camunda 8 Run after adding new connectors.

4. Check connector logs for specific error messages.

#### Connector secrets not working

**Problem:** Connectors cannot access configured secrets.

**Solution:**

1. For non-Docker mode, export secrets as environment variables:

   ```
   # macOS/Linux:
   export MY_SECRET_KEY=secret_value

   # Windows
   set MY_SECRET_KEY="secret_value"
   ```

2. For Docker mode, add secrets to `connector-secrets.txt` in the docker-compose folder.

3. Restart Camunda 8 Run after adding secrets.

### Ubuntu-specific issues

**Problem:** Camunda 8 Run fails on Ubuntu systems.

**Solution:**

Ensure you're using Ubuntu 22.04 or newer. Older versions may have compatibility issues with the required Java version or other dependencies.

## Next steps

<!-- - Learn how to [configure a relational database](/self-managed/concepts/databases/relational-db/configuration.md). -->

- Review [backup and restore for RDBMS](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
