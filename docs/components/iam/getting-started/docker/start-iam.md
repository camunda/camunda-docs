---
id: start-iam
title: "Start IAM"
sidebar_label: "Step 2: Start IAM"
---

### Starting the containers
To start the containers we can use a couple of methods, you may have Docker support within your IDE, if so please consult their documentation on run configurations.
If you are using the command line you can use the following global command:

```shell
docker compose -f /path/to/your/docker-compose.yml up -d
```
:::note
If you are using Docker Compose V1 you can use the command docker-compose
:::

This command will start the `iam` and `database` services, the health of the services can be checked with:
```shell
docker ps
```

Your output should look similar to:

```text
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS                    PORTS                     NAMES
9c46cfecca05   camunda/iam:latest   "java -jar iam.jar"      38 seconds ago   Up 35 seconds             0.0.0.0:8080->8080/tcp    iam_application_1
a2174c3fe0e9   postgres:13.3-alpine "docker-entrypoint.s…"   42 seconds ago   Up 38 seconds (healthy)   0.0.0.0:15432->5432/tcp   iam_database_1
```

:::tip
If the container for the IAM application does not remain healthy, you can use the `CONTAINER ID` to check the logs by running `docker logs <COMTAINER_ID>`
:::

### Conclusion
Congratulations! You've now started the IAM application, lets move on to logging in. 