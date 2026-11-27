---
id: production
title: RPA production setup
description: Configure your RPA workers for production use cases.
---

Use the RPA worker’s production configuration options to run RPA scripts reliably at scale.

## Secure the RPA worker

Treat the RPA worker as a code execution service and restrict access to its HTTP API.

### RPA worker security considerations

RPA scripts run with the worker’s operating system permissions and inherited environment, including any Camunda client credentials. The sandbox enables local script evaluation; it does not provide filesystem, process, or network isolation. Authentication does not make untrusted scripts safe.

Run only scripts from trusted authors. Restrict permission to deploy RPA scripts and start processes that invoke them. Use a dedicated operating system account with the minimum permissions required for the automation, and keep development workers separate from production credentials and data.

Keep the worker’s HTTP port, `36227` by default, inaccessible from untrusted networks. Desktop builds bind to loopback by default; container listeners can accept connections on all container interfaces. Do not expose the API through a public load balancer or publish the container port on all host interfaces.

Camunda client authentication protects requests from the worker to the cluster. It does not authenticate incoming requests to the worker’s HTTP API. Disabling local evaluation does not disable the runtime callbacks used for variables, documents, and BPMN errors, so network restrictions remain necessary.

### Upgrade and configure API access

Upgrade to RPA worker 1.3.3 or later with `camunda-utils` 1.3.0 or later and the bundled runtime 0.3.1 or later.

Older Python libraries don't send execution credentials, so their callbacks are rejected by the patched worker. Static runtimes must include the updated library. A Desktop Modeler release supporting worker API tokens is pending. Production workers can be upgraded now, but local testing requires the compatible Desktop Modeler release. Upgrade the worker first; the compatible Modeler integration can't test against older workers. Setting the new token property on an older worker doesn't secure its API.

| Property                        | Environment variable           | Behavior                                                                                                                                                    |
| ------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `camunda.rpa.api.token`         | `CAMUNDA_RPA_API_TOKEN`        | Required for evaluation and other privileged API requests. Without a configured token, these requests are rejected.                                         |
| `camunda.rpa.api.allowed-hosts` | `CAMUNDA_RPA_API_ALLOWEDHOSTS` | Additional exact Host authorities, including ports. By default, only loopback names with the actual listener port are accepted. Wildcards aren't supported. |
| `camunda.rpa.sandbox.enabled`   | `CAMUNDA_RPA_SANDBOX_ENABLED`  | Enables local evaluation. Set to `false` in production. Patched container images default to `false`; standalone builds default to `true`.                   |

Generate at least 32 random bytes for the API token, for example with `openssl rand -hex 32`. Tokens must contain at least 32 letters, digits, underscores, or hyphens. Store the token in protected configuration or a deployment secret. Don't reuse cluster credentials or put tokens in URLs, scripts, or source control.

Once the compatible Desktop Modeler release is available, enter the same token under **Additional configurations > API token**. Leave the field to apply it. The integration requires HTTPS for remote workers and permits HTTP only for loopback hosts. Modeler stores the token in plain JSON in its user-data `config.json`; the masked field doesn't encrypt it. Protect the directory and its backups.

Keep port `36227` inaccessible from untrusted networks. Desktop builds bind to loopback; container listeners accept connections on all container interfaces. Production scripts can reach callbacks inside the container, so leave the HTTP port unpublished unless a trusted external client needs it. For local testing, publish only to loopback:

```shell
-p 127.0.0.1:36227:36227
```

Don't use `-p 36227:36227`, which exposes the port on all host interfaces. Container evaluation also requires `CAMUNDA_RPA_SANDBOX_ENABLED=true` and an API token. For intentional remote access, use HTTPS, network controls, and the exact external authority in `camunda.rpa.api.allowed-hosts`. Preserve an allowed Host authority through proxies. Host validation reduces DNS-rebinding exposure but doesn't replace authentication or a firewall.

### Protect callbacks and monitoring

Each running script receives a separate execution credential through the worker-managed `RPA_CALLBACK_TOKEN` environment variable.

The bundled `Camunda` Python library automatically sends the credential for variable, document, and BPMN error callbacks. The credential authorizes access only to the execution’s workspace and associated job. The worker revokes it when the execution completes, fails, or is canceled. A job key alone cannot authorize a BPMN error, and the worker API token cannot authorize callbacks. Do not configure, persist, log, or reuse execution credentials yourself.

Workspace artifact URLs, including execution report URLs, remain read-only capability URLs: anyone who can reach the worker with a trusted Host authority and knows a URL can read the retained artifact without a bearer token. Keep these URLs private. Revoking the execution credential does not revoke access to artifacts while their workspace is retained.

Read-only `/actuator/health` requests and subpaths bypass Host checks and authentication, so Kubernetes probes can continue using pod IPs. Metrics and Prometheus scrapers must send the worker API bearer token and use a trusted Host authority. Configure the exact scrape target, including its port, in `camunda.rpa.api.allowed-hosts`. Use `GET /api/authentication` to check credentials; health success alone doesn't confirm API access.

The worker excludes `CAMUNDA_RPA_API_TOKEN`, `camunda.rpa.api.token`, `SPRING_APPLICATION_JSON`, and `spring.application.json` from script environments, regardless of case. Both application JSON variables are excluded entirely. This isn't isolation: trusted scripts may still read accessible configuration files.

### Troubleshoot API access

Use the response or Modeler status to identify the required action.

| Symptom                                                                                                         | Cause                                                                         | Action                                                                                                               |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **RPA worker API token required**, **RPA worker API token rejected**, or evaluation returns `401 Unauthorized`. | The API token is missing or doesn't match the running worker.                 | Configure the worker token, restart it, and enter the same token in the compatible Desktop Modeler release.          |
| **Upgrade RPA worker to 1.3.3 or later**.                                                                       | The worker lacks the authenticated connection endpoint.                       | Upgrade the worker and its compatible Python runtime.                                                                |
| **RPA worker Host authority rejected** or `403 Forbidden`.                                                      | The request's Host authority isn't trusted.                                   | Use loopback with the listener port or configure the exact external authority in `camunda.rpa.api.allowed-hosts`.    |
| A callback returns `401 Unauthorized`.                                                                          | Its execution credential is missing, expired, or scoped to another execution. | Upgrade the Python library/runtime and use only worker-managed credentials during active execution.                  |
| Authenticated evaluation returns `404 Not Found`.                                                               | Evaluation is disabled.                                                       | Keep it disabled in production; enable it only for trusted development with authentication and network restrictions. |

## Configuration options

### Transition from a development setup

When moving from development to production, consider the following:

- **Disable the local sandbox**: If the worker should only accept scripts from Zeebe and not from Desktop Modeler, disable local execution by setting `camunda.rpa.sandbox.enabled=false`.
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
