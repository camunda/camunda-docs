---
id: c8run-troubleshooting
title: Troubleshoot Camunda 8 Run
sidebar_label: "Troubleshooting"
description: "Camunda 8 Run provides log files in the c8run/logs directory that can help diagnose most issues. Check these logs first when troubleshooting:"
---

Camunda 8 Run provides log files in the `c8run/logs` directory that can help diagnose most issues. Check these logs first when troubleshooting:

- `c8run.log` – main log for Camunda 8 Run
- `connectors.log` – Connectors component
- `elasticsearch.log` – embedded Elasticsearch instance (if used)

## Startup failures

### Port conflicts

**Problem:** Camunda 8 Run fails to start because ports are already in use.

**Solution:**

1. Check if the default ports are already occupied:
   - `8080` – Camunda core (Operate, Tasklist, Identity, APIs)
   - `8086` – Connectors API
   - `26500` – Zeebe gRPC gateway
   - `9600` – Prometheus metrics
   - `9200` – Elasticsearch (embedded)
   - `9300` – Elasticsearch cluster communication

2. Stop processes using these ports or change the Camunda core port:

   ```bash
   # macOS/Linux
   lsof -i :8080

   # Windows
   netstat -ano | findstr :8080

   # Start Camunda using a different port
   ./c8run start --port 8081
   ```

3. If using Docker mode, ensure no containers are using these ports:

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
   - Operate: http://localhost:8080/operate
   - Tasklist: http://localhost:8080/tasklist

## Memory and performance issues

### Out of memory errors

**Problem:** Camunda 8 Run becomes unresponsive, often due to Elasticsearch memory usage.

**Solution:**

1. Increase Elasticsearch heap size:

   ```bash
   # macOS/Linux
   export ES_JAVA_OPTS="-Xms2g -Xmx2g"
   ./start.sh

   # Windows (Command Prompt)
   set ES_JAVA_OPTS=-Xms2g -Xmx2g
   c8run.exe start

   # Windows (PowerShell)
   $env:ES_JAVA_OPTS="-Xms2g -Xmx2g"
   c8run.exe start
   ```

2. Increase JVM heap for Camunda:

   ```bash
   # macOS/Linux
   export JAVA_OPTS="-Xmx4g"

   # Windows (Command Prompt)
   set JAVA_OPTS=-Xmx4g

   # Windows (PowerShell)
   $env:JAVA_OPTS="-Xmx4g"
   ```

3. For resource-constrained environments, consider using H2 instead of Elasticsearch for testing.

### Slow performance

**Problem:** Camunda 8 Run is slow or processes take a long time to appear in Operate.

**Solution:**

1. Ensure the system meets the minimum requirements (8 GB RAM recommended).
2. Close unnecessary applications to free system resources.
3. Check Elasticsearch health:

   ```bash
   curl http://localhost:9200/_cluster/health
   ```

On Windows, open this page directly: [http://localhost:9200/\_cluster/health](http://localhost:9200/_cluster/health)

## Elasticsearch issues

### Elasticsearch fails to start

**Problem:** The embedded Elasticsearch instance fails to start, preventing Operate and Tasklist from functioning.

**Solution:**

1. Check Elasticsearch logs in the `c8run/logs` directory.
2. Ensure sufficient disk space is available.
3. Verify Elasticsearch ports (9200, 9300) are not in use.
4. If Elasticsearch continues to fail, consider using an external Elasticsearch instance:

   ```bash
   # macOS/Linux
   ./c8run start --disable-elasticsearch --config custom-application.yaml

   # Windows
   c8run.exe start --disable-elasticsearch --config custom-application.yaml
   ```

### Index creation errors

**Problem:** Operate or Tasklist show errors related to Elasticsearch indices.

**Solution:**

1. Stop Camunda:

   ```bash
   # macOS/Linux
   ./shutdown.sh

   # Windows
   c8run.exe stop
   ```

2. Clear Elasticsearch data (warning: this deletes all data):

   ```bash
   # macOS/Linux
   rm -rf data/elasticsearch

   # Windows (Command Prompt)
   rmdir /s /q data\elasticsearch

   # Windows (PowerShell)
   # Remove-Item -Path data\elasticsearch -Recurse -Force
   ```

3. Restart Camunda 8 Run.

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

## Docker-specific issues

### Docker Compose fails to start

**Problem:** Running Camunda 8 Run with the `--docker` option fails.

**Solution:**

1. Ensure Docker is running:

   ```bash
   docker --version
   docker ps
   ```

2. Verify that Docker has sufficient resources allocated (recommended: 4 CPU cores, 8 GB RAM).
3. Check for conflicting containers:

   ```bash
   docker ps -a
   docker rm <container-name>
   ```

4. Pull the latest images:

   ```bash
   docker compose -f docker-compose-8.8/docker-compose.yaml pull
   ```

5. If you suspect data corruption, remove old volumes before restarting:

   ```bash
   docker compose -f docker-compose-8.8/docker-compose.yaml down -v
   ```

### Cannot access services in Docker mode

**Problem:** Services are not reachable at the expected URLs when using Docker mode.

**Solution:**  
When Camunda 8 Run is started with `--docker`, services may run on different ports.

- Operate: http://localhost:8088/operate

Refer to the [Docker Compose documentation](./docker-compose.md) for the complete list of service URLs.

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

2. In Docker mode, avoid using the `-v` flag when stopping containers, as it removes all volumes and deletes persisted data:

   ```bash
   docker compose -f docker-compose-8.8/docker-compose.yaml down
   ```

3. Check that the application has permission to write to the data directory (for example, `camunda-data/` or any configured mount path).

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

2. For Docker mode, add secrets to the `connector-secrets.txt` file located in the Docker Compose folder.
3. Restart Camunda 8 Run after adding or modifying secrets.

## Ubuntu-specific issues

**Problem:** Camunda 8 Run fails to start or behaves unpredictably on older Ubuntu versions.

**Solution:**  
Use **Ubuntu 22.04 or newer**, as earlier versions may not support required Java versions or system dependencies required by Camunda 8 Run.
