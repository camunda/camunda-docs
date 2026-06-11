---
id: c8run-troubleshooting
title: Troubleshoot Camunda 8 Run
sidebar_label: "Troubleshooting"
description: Identify and resolve common issues when starting, configuring, or using Camunda 8 Run.
---

Camunda 8 Run provides log files in the `c8run/logs` directory that can help diagnose most issues. Check these logs first when troubleshooting:

- `c8run.log` – main log for Camunda 8 Run
- `connectors.log` – Connectors component

If you configured external Elasticsearch, inspect that deployment's logs separately.

## Startup failures

### Port conflicts

**Problem:** Camunda 8 Run fails to start because ports are already in use.

**Solution:**

1. Check if the default ports are already occupied:
   - `8080` – Camunda core (Operate, Tasklist, Admin, APIs)
   - `8086` – Connectors API
   - `26500` – Zeebe gRPC gateway
   - `9600` – Prometheus metrics

2. Stop processes using these ports or change the Camunda core port:

   ```bash
   # macOS/Linux
   lsof -i :8080

   # Windows
   netstat -ano | findstr :8080

   # Start Camunda using a different port
   ./c8run start --port 8081
   ```

3. If you also run the Docker Compose quickstart or other local containers, ensure they are not using these ports:

   ```bash
   docker ps
   docker stop <container-name>
   ```

### Java version issues

**Problem:** Camunda 8 Run fails to start due to incorrect Java version or missing `JAVA_HOME`.

**Solution:**

1. Verify Java is installed (OpenJDK 21–25 required):

   ```bash
   java -version
   ```

2. Ensure `JAVA_HOME` is set:

   ```bash
   # macOS/Linux
   echo $JAVA_HOME

   # Windows
   echo %JAVA_HOME%
   ```

3. Set `JAVA_HOME` if needed:

   ```bash
   # macOS
   export JAVA_HOME=$(/usr/libexec/java_home -v 21)

   # Linux
   export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64

   # Windows (PowerShell)
   setx JAVA_HOME "C:\Program Files\Java\jdk-21"
   ```

Replace `21` in the examples with the version you installed (21–25), and open a new terminal after setting `JAVA_HOME`.

### Incomplete startup

**Problem:** Camunda 8 Run starts but some components fail to load or the browser does not open.

**Solution:**

1. Stop Camunda:

   ```bash
   # macOS/Linux
   ./c8run stop

   # Windows
   c8run.exe stop
   ```

2. Start it again:

   ```bash
   # macOS/Linux
   ./c8run start

   # Windows
   c8run.exe start
   ```

3. Access components manually if the browser does not open automatically:
   - Operate: [http://localhost:8080/operate](http://localhost:8080/operate)
   - Tasklist: [http://localhost:8080/tasklist](http://localhost:8080/tasklist)

## Memory and performance issues

### Out of memory errors

**Problem:** Camunda 8 Run becomes unresponsive.

**Solution:**

1. Increase JVM heap for Camunda:

   ```bash
   # macOS/Linux
   export JAVA_OPTS="-Xmx4g"

   # Windows (Command Prompt)
   set JAVA_OPTS=-Xmx4g

   # Windows (PowerShell)
   $env:JAVA_OPTS="-Xmx4g"
   ```

2. For resource-constrained environments, consider using H2 instead of Elasticsearch for testing.

### Slow performance

**Problem:** Camunda 8 Run is slow or processes take a long time to appear in Operate.

**Solution:**

1. Ensure the system meets the minimum requirements (8 GB RAM recommended).
2. Close unnecessary applications to free system resources.
3. If you use external Elasticsearch, check cluster health:

   ```bash
   curl http://localhost:9200/_cluster/health
   ```

On Windows, open this page directly: [http://localhost:9200/\_cluster/health](http://localhost:9200/_cluster/health)

## External Elasticsearch issues

### Cannot connect to Elasticsearch

**Problem:** Camunda 8 Run starts with Elasticsearch configured as secondary storage, but search-backed features do not work or startup fails.

**Solution:**

1. Verify the Elasticsearch cluster is reachable:

   ```bash
   curl http://localhost:9200
   ```

2. Confirm `application.yaml` points Camunda 8 Run to that cluster:

   ```yaml
   camunda:
     data:
       secondary-storage:
         type: elasticsearch
         elasticsearch:
           url: http://localhost:9200/
   ```

3. If the cluster requires authentication or TLS, add the corresponding credentials and security settings to the same configuration block.
4. Start Camunda 8 Run with the configuration file:

   ```bash
   # macOS/Linux
   ./c8run start --config custom-application.yaml

   # Windows
   c8run.exe start --config custom-application.yaml
   ```

### Elasticsearch index or permission errors

**Problem:** Operate or Tasklist show errors related to Elasticsearch indices.

**Solution:**

1. Ensure the Elasticsearch user has permission to create, read, and write the required Camunda indices. For restricted setups, see [Configure Elasticsearch without cluster privileges](/self-managed/concepts/databases/elasticsearch/elasticsearch-without-cluster-privileges.md).
2. Verify the Elasticsearch cluster is healthy and has sufficient free disk space.
3. For local development, if you need to recreate the secondary store, stop Camunda 8 Run, delete the Camunda indices from your external Elasticsearch instance using your Elasticsearch tooling, and start Camunda 8 Run again. This rebuilds the secondary store from scratch.

## Authentication and access issues

### Cannot log in to web interfaces

**Problem:** Default credentials (demo/demo) do not work or the login page does not appear.

**Solution:**

1. Verify authentication settings (default: demo/demo).

2. If custom authentication is configured in `application.yaml`, ensure it is correct:

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
4. If you used command-line overrides at startup (such as `--username` or `--password`), ensure the values are correct:

   ```bash
   # macOS/Linux
   ./start.sh --username myuser --password mypassword

   # Windows
   c8run.exe start --username myuser --password mypassword
   ```

### API authentication errors

**Problem:** API calls fail with authentication errors even when authentication is disabled by default.

**Solution:**

1. Verify that API authentication is disabled (this is the default):

   ```yaml
   camunda:
     security:
       authentication:
         unprotected-api: true
   ```

2. If API authentication is enabled, include credentials in your API requests:

   ```bash
   curl -u demo:demo http://localhost:8080/v2/topology
   ```

   Windows (PowerShell alternative without curl):

   ```powershell
   $pair = "demo:demo"
   bytes = [System.Text.Encoding]::ASCII.GetBytes($pair)
   $base64 = [System.Convert]::ToBase64String($bytes)
   Invoke-WebRequest -Uri http://localhost:8080/v2/topology -Headers @{Authorization="Basic $base64"}
   ```

## Configuration issues

### Custom configuration not loading

**Problem:** Changes in `application.yaml` do not take effect.

**Solution:**

1. Pass the configuration file explicitly:

   ```bash
   # macOS/Linux
   ./start.sh --config /path/to/application.yaml

   # Windows
   c8run.exe start --config C:\path\to\application.yaml
   ```

2. Verify that the YAML syntax is correct (spacing, indentation, no tabs).
3. Fully restart Camunda 8 Run after making configuration changes.

### TLS/HTTPS issues

**Problem:** HTTPS is not working or certificate errors occur.

**Solution:**

1. Verify the keystore file path, format, and password:

   ```bash
   # macOS/Linux
   ./start.sh --keystore /path/to/keystore.jks --keystorePassword yourpassword

   # Windows
   c8run.exe start --keystore C:\path\to\keystore.jks --keystorePassword yourpassword
   ```

2. Remember that TLS support in Camunda 8 Run is intended for testing only, not for production environments.
3. Validate the keystore:

   ```bash
   keytool -list -keystore keystore.jks
   ```

## Data and persistence issues

### Lost data after restart

**Problem:** Data such as deployments, process instances, or users disappears after restarting Camunda 8 Run.

**Solution:**

1. If using H2 in-memory mode, switch to file-based persistence so data is written to disk:

   ```yaml
   camunda:
     data:
       secondary-storage:
         type: rdbms
         rdbms:
           url: jdbc:h2:file:./camunda-data/h2db
   ```

2. Check that the application has permission to write to the data directory (for example, `camunda-data/` or any configured mount path).

## Connector issues

### Custom connectors not loading

**Problem:** Custom connector JARs are not recognized by Camunda 8 Run.

**Solution:**

1. Verify that the connector JAR file is placed in the correct directory:

   ```bash
   # macOS/Linux
   c8run/custom_connectors/your-connector.jar

   # Windows
   c8run\custom_connectors\your-connector.jar
   ```

2. Ensure that the corresponding element template is available in a valid Desktop Modeler search path.

3. Restart Camunda 8 Run after adding or updating connectors.

4. Check the `connectors.log` file for specific error messages that may explain why the connector failed to load.

### Connector secrets not working

**Problem:** Connectors cannot access configured secrets.

**Solution:**

1. For non-Docker mode, export connector secrets as environment variables:

   ```bash
   export MY_SECRET_KEY=secret_value
   ```

2. For the Docker Compose setup, add secrets to the `connector-secrets.txt` file located in the Docker Compose folder.
3. Restart Camunda 8 Run after adding or modifying secrets.

## Ubuntu-specific issues

**Problem:** Camunda 8 Run fails to start or behaves unpredictably on older Ubuntu versions.

**Solution:**  
Use **Ubuntu 22.04 or newer**, as earlier versions may not support required Java versions or system dependencies required by Camunda 8 Run.
