---
id: developer-quickstart
title: "Developer quickstart"
sidebar_label: "Developer"
description: "This quickstart guides application developers through deploying Camunda 8 Self-Managed to a local Orchestration cluster"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {DockerCompose, C8Run} from "@site/src/components/CamundaDistributions";

<Tabs groupId="distribution" defaultValue="c8run" queryString values={
[
{label: 'C8Run', value: 'c8run' },
{label: 'Docker Compose', value: 'compose' },
]}>

<TabItem value="c8run">

## C8Run

### Prerequisites

- **OpenJDK 21-23**: Required for running Camunda 8 as a Java application.
- **Docker 20.10.21+**: Required for running Camunda 8 via Docker Compose.
- **[Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md)**
- **If using Ubuntu**: Ubuntu 22.04 or newer

:::note
After installing OpenJDK, ensure `JAVA_HOME` is set by running `java -version` in a **new** terminal.

If no version of Java is found, follow your chosen installation's instructions for setting `JAVA_HOME` before continuing.
:::

### Step 1: Download and extract the latest release of C8Run

<C8Run />

### Step 2: Start the application

```shell
./c8run start
```

### Step 3: Deploy a sample process

1. [Download and open Camunda Modeler](https://camunda.com/download/modeler/).
2. Create a simple BPMN diagram:

```css
[Start Event] → [User Task: "Review Request"] → [End Event]
```

3. Set the user task properties with an ID of `reviewRequest` and an assignee of `demo`.
4. Save the diagram as `review-request.bpmn`.
5. Deploy the model by clicking the space-ship button with the following options

- Parameters:
  - Target: Camunda 8 Self-Managed
  - Cluster Endpoint: http://localhost:26500
  - Authentication: none

7. Create a process instance by clicking the play button and "Start Process Instance"

### Step 4: View the process in Operate

Go back to [http://localhost:8080/operate](http://localhost:8080/operate) and:

1. Log in with `demo` / `demo`.
2. Navigate to process instances.
3. Confirm your running instance is visible and waiting at the user task.

### Step 5: Complete the task in Tasklist

Visit [http://localhost:8080/tasklist](http://localhost:8080/tasklist)

1. Log in with `demo` / `demo`.
2. Find the review request task and complete it.

Once completed, go back to Operate to confirm the process has finished.

### Step 6: Shut down the cluster

When you're finished testing:

```bash
./c8run stop
```

### Next Steps

For more in-depth options, visit the [C8Run docs](/self-managed/setup/deploy/local/c8run.md).

</TabItem>

<TabItem value="compose">

## Docker Compose

### Prerequisites

- **Docker Compose:** Version 1.27.0+ (supports the [latest compose specification](https://docs.docker.com/compose/compose-file/)).
- **Docker:** Version 20.10.16+
- **Keycloak:** (Local development only). Add Keycloak to resolve to 127.0.0.1 on your local machine, and set `KEYCLOAK_HOST=keycloak` in the `.env` file for token refresh and logout functionality.

### Step 1: Download the latest release of the Camunda docker compose distribution

<DockerCompose />

### Step 2: Start the application

```shell
docker compose up -d
```

### Step 3: Deploy a sample process

1. [Download and open Camunda Modeler](https://camunda.com/download/modeler/).
2. Create a simple BPMN diagram:

```css
[Start Event] → [User Task: "Review Request"] → [End Event]
```

3. Set the user task properties with an ID of `reviewRequest` and an assignee of `demo`.
4. Save the diagram as `review-request.bpmn`.
5. Deploy the model by clicking the space-ship button with the following options

- Parameters:
  - Target: Camunda 8 Self-Managed
  - Cluster Endpoint: http://localhost:26500
  - Authentication: none

7. Create a process instance by clicking the play button and "Start Process Instance"

### Step 4: View the process in Operate

Go back to [http://localhost:8088/operate](http://localhost:8088/operate) and:

1. Log in with `demo` / `demo`.
2. Navigate to process instances.
3. Confirm your running instance is visible and waiting at the user task.

### Step 5: Complete the task in Tasklist

Visit [http://localhost:8088/tasklist](http://localhost:8088/tasklist)

1. Log in with `demo` / `demo`.
2. Find the review request task and complete it.

Once completed, go back to Operate to confirm the process has finished.

### Step 6: Shut down the cluster

When you're finished testing:

```bash
docker compose down -v
```

### Next Steps

For more in-depth options, visit the [Camunda Docker Compose docs](/self-managed/setup/deploy/local/docker-compose.md).

</TabItem>
</Tabs>
