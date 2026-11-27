---
id: production
title: RPA production setup
description: Configure your RPA workers for production use cases.
---

Use the RPA worker’s production configuration options to run RPA scripts reliably at scale.

## Secure the RPA worker

Treat the RPA worker as a code execution service and restrict who can submit scripts or access its HTTP API.

### RPA worker security considerations

RPA scripts run with the worker’s operating system permissions and inherited environment, including any Camunda client credentials. The sandbox enables local script evaluation; it does not provide filesystem, process, or network isolation. Authentication does not make untrusted scripts safe.

Run only scripts from trusted authors. Restrict permission to deploy RPA scripts and start processes that invoke them. Use a dedicated operating system account with the minimum permissions required for the automation, and keep development workers separate from production credentials and data.

Keep the worker’s HTTP port, `36227` by default, inaccessible from untrusted networks. Desktop builds bind to loopback by default; container listeners can accept connections on all container interfaces. Do not expose the API through a public load balancer or publish the container port on all host interfaces.

Camunda client authentication protects requests from the worker to the cluster. It does not authenticate incoming requests to the worker’s HTTP API. Disabling local evaluation does not disable the runtime callbacks used for variables, documents, and BPMN errors, so network restrictions remain necessary.

### Worker API security upgrade

The worker API security upgrade adds bearer authentication, Host validation, and execution-scoped callback credentials.

:::note
Upgrade to RPA worker 1.3.3 or later, including its compatible Python runtime, to remediate the worker API vulnerabilities. The configuration and behavior in this section describe the patched components, not older binaries or images. If you can't upgrade immediately, use network isolation and disable evaluation in production to reduce exposure; setting the new token property on an older worker does not secure its API.
:::

Use the following settings in `rpa-worker.properties` or their environment variable equivalents:

| Property                        | Environment variable           | Behavior                                                                                                                                                                            |
| ------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `camunda.rpa.api.token`         | `CAMUNDA_RPA_API_TOKEN`        | Required for script evaluation and other privileged worker API requests. No token is configured by default, so these requests are rejected until you configure one.                 |
| `camunda.rpa.api.allowed-hosts` | `CAMUNDA_RPA_API_ALLOWEDHOSTS` | Additional exact Host authorities, including ports. By default, only `localhost`, `127.0.0.1`, and `[::1]` with the actual listener port are accepted. Wildcards are not supported. |
| `camunda.rpa.sandbox.enabled`   | `CAMUNDA_RPA_SANDBOX_ENABLED`  | Enables direct script evaluation. Set to `false` in production. Upgraded container images default to `false`; standalone builds default to `true`.                                  |

Generate at least 32 random bytes for the worker API token, for example with `openssl rand -hex 32`. The configured token must contain at least 32 letters, digits, underscores, or hyphens. Store the token in protected configuration or supply it through your deployment's secret management. Don't reuse cluster credentials, put tokens in URLs or scripts, or commit them to source control.

For Desktop Modeler testing, a release supporting worker API tokens is pending. Once available, enter the same token under **Additional configurations > API token** in the RPA worker configuration. Clients authenticate with the `Authorization: Bearer <token>` header. The compatible Desktop Modeler integration requires HTTPS for remote workers and permits HTTP only for loopback hosts.

Desktop Modeler's current RPA configuration stores the worker token in plain JSON in its user-data `config.json`. The masked field does not encrypt the stored token. Restrict access to the user-data directory and backups, and don't reuse cluster credentials.

For intentional remote access, use HTTPS and network access controls in addition to the token. Configure the exact authority sent in the Host header, for example `rpa.example.com:443`, and ensure your reverse proxy preserves an allowed authority. If you map a container to a different host port, explicitly allow the authority clients use. Host validation reduces DNS-rebinding exposure; it does not replace authentication or a firewall. Forwarded headers do not authenticate a request.

Read-only requests to `/actuator/health` and its subpaths bypass both Host validation and bearer authentication. All other requests require a trusted Host authority. API documentation remains readable without a bearer token. Use the protected `GET /api/authentication` endpoint to check API credentials; a successful health check does not confirm authentication.

### Configure probes and monitoring after upgrading

Health probes remain unauthenticated, but metrics scrapers require the worker API token and a trusted Host authority.

Kubernetes HTTP probes can continue using pod IPs without a custom Host header. This exemption covers read-only requests to `/actuator/health`, `/actuator/health/liveness`, and `/actuator/health/readiness`. Enable health groups with `management.endpoint.health.probes.enabled=true` if your setup doesn't enable them automatically.

Before upgrading, configure scrapers for `/actuator/prometheus`, `/actuator/metrics`, and metrics subpaths to send the worker API bearer token. Use a stable internal DNS authority, including its port, in `camunda.rpa.api.allowed-hosts` and as the scrape target. If you use a reverse proxy, preserve an allowed authority.

For example, allow `rpa-worker.monitoring.svc:36227` on the worker and configure Prometheus:

```yaml
scrape_configs:
  - job_name: rpa-worker
    metrics_path: /actuator/prometheus
    authorization:
      type: Bearer
      credentials_file: /etc/prometheus/secrets/rpa-worker-api-token
    static_configs:
      - targets: ["rpa-worker.monitoring.svc:36227"]
```

Provision the credentials file securely with the worker API token. The example assumes a trusted internal network; use HTTPS for remote connections. Without the token, metrics requests return `401 Unauthorized`; an untrusted Host returns `403 Forbidden`.

The worker excludes `CAMUNDA_RPA_API_TOKEN`, `camunda.rpa.api.token`, and the entire `SPRING_APPLICATION_JSON` and `spring.application.json` variables from inherited script environments, regardless of case. Scripts must not rely on inheriting other settings from either application JSON variable. This filtering does not isolate credentials from scripts that can read the worker's configuration files; run only trusted scripts and protect configuration access.

### Protect runtime callbacks and artifacts

Each running script receives a separate execution credential through the worker-managed `RPA_CALLBACK_TOKEN` environment variable.

The bundled `Camunda` Python library automatically sends the credential for variable, document, and BPMN error callbacks. The credential authorizes access only to the execution’s workspace and associated job. The worker revokes it when the execution completes, fails, or is canceled. A job key alone cannot authorize a BPMN error, and the worker API token cannot authorize callbacks. Do not configure, persist, log, or reuse execution credentials yourself.

Workspace artifact URLs, including execution report URLs, remain read-only capability URLs: anyone who can reach the worker with a trusted Host authority and knows a URL can read the retained artifact without a bearer token. Keep these URLs private. Revoking the execution credential does not revoke access to artifacts while their workspace is retained.

### Restrict container networking

Production jobs don't require a published worker HTTP port; scripts can reach runtime callbacks inside the container.

Leave the port unpublished unless a trusted external client needs it. For local development, bind a published port only to loopback:

```shell
-p 127.0.0.1:36227:36227
```

Don't use `-p 36227:36227`, which publishes the port on all host interfaces by default. Local testing with an upgraded container also requires explicitly setting `CAMUNDA_RPA_SANDBOX_ENABLED=true` and supplying `CAMUNDA_RPA_API_TOKEN`. Leave evaluation disabled in production.

### Upgrade compatible components together

The worker, Python library, bundled runtime, and Desktop Modeler integration must support the same authentication contract.

Upgrade to RPA worker 1.3.3 or later with `camunda-utils` 1.3.0 or later and the bundled runtime 0.3.1 or later. A Desktop Modeler release containing `@camunda/rpa-integration` 2.1.0 or later is pending. Production workers can be upgraded without waiting for Desktop Modeler, but local testing against the patched worker requires the compatible Desktop Modeler release.

Older Python libraries don't send execution credentials, so their callbacks are rejected by an upgraded worker. Static runtimes must be rebuilt with the updated library. Older Desktop Modeler integrations cannot authenticate evaluation requests. An updated integration also cannot test against a worker older than 1.3.3, because the worker lacks the authenticated connection endpoint; upgrade the worker first. There is no unauthenticated compatibility mode; don't remove authentication to work around an incompatible client.

### Troubleshoot worker API access

Use the HTTP response and the request type to identify the required configuration.

| Symptom                                                                  | Cause                                                                               | Action                                                                                                                                                               |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desktop Modeler displays **Upgrade RPA worker to 1.3.3 or later**.       | The worker lacks the authenticated connection endpoint.                             | Upgrade the worker to 1.3.3 or later with its compatible Python runtime.                                                                                             |
| Desktop Modeler displays **RPA worker API token required**.              | No worker API token is configured in Desktop Modeler.                               | Configure `camunda.rpa.api.token` on the worker, restart it, and enter the same token in Desktop Modeler. Leave the token field to apply it.                         |
| Desktop Modeler displays **RPA worker API token rejected**.              | The configured token doesn't match the running worker's token.                      | Confirm the worker's effective token configuration, restart it after configuration changes, and enter the same token in Desktop Modeler.                             |
| Desktop Modeler displays **RPA worker Host authority rejected**.         | The configured base URL sends an untrusted Host authority.                          | Use the worker's loopback authority and listener port, or configure the exact external authority in `camunda.rpa.api.allowed-hosts`.                                 |
| Evaluation or `GET /api/authentication` returns `401 Unauthorized`.      | The worker API token is missing or incorrect.                                       | Configure a token on the worker, restart it, and enter the same token in a compatible Desktop Modeler.                                                               |
| A variable, document, or BPMN-error callback returns `401 Unauthorized`. | The callback credential is missing, expired, or scoped to another execution or job. | Upgrade the Python library and runtime together with the worker. Use the worker-managed credential only during its execution; don't substitute the worker API token. |
| A request returns `403 Forbidden`.                                       | The Host authority is not trusted or does not match the listener port.              | Use the loopback authority and actual port, or explicitly configure the externally visible authority and preserve it through your proxy.                             |
| Authenticated evaluation returns `404 Not Found`.                        | Local evaluation is disabled.                                                       | Keep evaluation disabled in production. Enable it only on a development worker with authentication and restricted network access.                                    |

## Configuration options

### Transition from a development setup

When moving from development to production, consider the following:

- **Disable local evaluation**: Set `camunda.rpa.sandbox.enabled=false` so scripts are accepted only through cluster jobs. This leaves runtime callbacks available; follow the [worker security guidance](#secure-the-rpa-worker) to protect the HTTP API.
- **Install required third-party tools**: Install any external tools your scripts rely on so the worker can access them.
- **Add tags to your workers and scripts**: Tag workers based on their capabilities, such as operating systems or installed applications. See [Labels](#labels) for details.

### Use secrets

When running an RPA worker with Camunda SaaS, you can access [connector secrets](/components/connectors/use-connectors/index.md#using-secrets).

To do this:

1. [Create client credentials](/components/saas/clusters/manage-api-clients.md#create-a-client) with both the `Orchestration Cluster API` and `Administration API - Resource: Secrets` scopes.
2. Use them in the worker config by adding the secrets endpoint to your `rpa-worker.properties` file:

```properties
camunda.rpa.zeebe.secrets.secrets-endpoint=https://cluster-api.cloud.camunda.io
```

In the RPA script, your secrets are stored in the `${secrets}` variable. You can reference a secret like `MY_API_KEY` with `${secrets.MY_API_KEY}`.

### Labels

Use tags and labels to differentiate worker capabilities.

1. In the `rpa-worker.properties`, add:

   ```properties
   camunda.rpa.zeebe.worker-tags=accounting-system
   ```

2. If you also want the worker to work on unlabeled tasks, use:

   ```properties
   camunda.rpa.zeebe.worker-tags=default,accounting-system
   ```

3. Add a label to your script when configuring the RPA task in your diagram.

Labels describe capabilities. If you want your worker to only pick up a specific script, use a unique label on both the worker and the RPA task.

If no label is defined, both the task and worker will use the label `default`.

### Pre- and post-run scripts

Some scripts require environment setup before they run. To use pre- or post-run scripts:

1. Create and deploy separate RPA scripts.
2. Reference them in the properties panel of the RPA task.

:::note
The worker removes the job’s working directory after the job completes.
:::

### Timeouts

To set timeouts:

- **On the RPA task (recommended)**: Set the timeout when configuring the RPA task in your diagram.
- **In the worker**: Use the default timeout in `rpa-worker.properties` as a fallback.

### Concurrent jobs

To enable concurrent jobs, set `camunda.rpa.zeebe.max-concurrent-jobs` in the worker config. Enable this only if your scripts, such as browser automation, can run safely in parallel.

### Additional libraries

To install additional dependencies:

1. Create a `requirements.txt` file listing required packages.
2. Set `camunda.rpa.python.extra-requirements=extra-requirements.txt` in the properties file.
3. Restart the worker to install them.

Use [labels](#labels) to ensure scripts run only on compatible workers.

For example, to use Playwright:

```txt
## requirements.txt
robotframework-browser
```

```properties
## application.properties
camunda.rpa.python.extra-requirements=extra-requirements.txt
camunda.rpa.zeebe.worker-tags=default,playwright
```

## Installation and setup guide

An RPA worker is a specialized job worker that runs outside the main Camunda Orchestration Cluster.

### Prerequisites

RPA workers are supported on Windows, Linux, macOS, and in Docker for headless automation.

#### Hardware requirements

The RPA worker runs on bare metal, virtualized, or containerized systems. Use hardware suitable for your automated applications.

#### Software requirements

The RPA worker is a standalone binary.

| Operating system | Required software | Optional software |
| ---------------- | ----------------- | ----------------- |
| Windows          | RPA worker        | -                 |
| Linux and macOS  | RPA worker        | Python 3.12 + pip |

#### Network configurations

- Ensure connectivity to your Camunda cluster.
- Allow internet access if downloading external libraries.

### Installation and configuration

This section describes how to set up the RPA host machine.

#### Scaling and operation

Each machine hosts one RPA worker.

For scalable workloads:

- Use VMs to quickly spin up new workers.
- Use [max-concurrent-jobs](https://github.com/camunda/rpa-worker/?tab=readme-ov-file#configuration-reference) if safe for your use case.

#### Setting up a VM

Use virtualization to create scalable and repeatable worker deployments.

##### Create a template VM

1. Start with a clean Windows VM.
2. Install and configure the RPA worker.
3. Install all required third-party applications.
4. Test connectivity by running a process in Camunda.
5. Add the RPA worker to run **automatically on startup**.
6. **Configure Windows autologon**.
7. Disable screen saver, sleep, and lock.
8. Set the VM's time zone to match business requirements.
9. Save the configured VM as a **template**.
10. Keep a separate local administrator account and password in escrow for emergency access, and audit all RDP and console logons.

##### Monitoring and scaling

To scale using your VM template:

1. **Provision new VMs** from the template.
2. Start the VMs to allow them to connect to Zeebe and begin executing tasks.
3. Use **Operate** and **Optimize** to monitor task execution, wait times, and incidents.

If jobs are waiting too long, create additional VMs.

Operational tips:

1. **Script handling and versioning**: RPA workers fetch the latest script version automatically.
2. **Labels**: Use them to route tasks to the right worker types.
3. **Maintenance and monitoring**:
   - Enable OS updates during a maintenance window.
   - Take regular snapshots.
   - Monitor health, disk space, and RPA service status.
   - Surface alerts into your monitoring tools.

## FAQ

**My RPA task is never picked up.**  
Ensure your RPA worker is connected to the correct Zeebe instance and has the correct [label](#labels) configured for the task.

**My first script run succeeds, but any subsequent runs fail. I always need to restart the machine.**  
Your script might not clean up properly. Use [teardown scripts](./getting-started.md#incidents) to close apps after execution.

**How do I handle errors and exceptions within RPA scripts?**  
Use setup and teardown steps in the Robot Framework. Optionally, use `Throw BPMN Error` for BPMN-specific handling.
