---
id: production
title: RPA production setup
description: Configure your RPA workers for production use cases.
---

Use the RPA worker’s production configuration options to run RPA scripts reliably at scale.

For the basics on getting started, visit the [getting started guide](./getting-started.md).

## Configuration options

### Transition from a development setup

When moving from development to production, consider the following:

- **Disable the local sandbox**: If the worker should only accept scripts from Zeebe and not from Desktop Modeler, disable local execution by setting `camunda.rpa.sandbox.enabled=false`.
- **Install required third-party tools**: Install any external tools your scripts rely on so the worker can access them.
- **Add tags to your workers and scripts**: Tag workers based on their capabilities, such as operating systems or installed applications. See [Labels](#labels) for details.

### Use secrets

When running an RPA worker with Camunda SaaS, you can access [connector secrets](/components/connectors/use-connectors/index.md#using-secrets).

To do this:

1. [Create client credentials](/components/console/manage-clusters/manage-api-clients.md#create-a-client) with both the `Orchestration Cluster API` and `Administration API - Resource: Secrets` scopes.
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
