---
id: start-iam
title: "Start IAM"
sidebar_label: "Step 2: Start IAM"
---

:::caution
IAM has been replaced with Identity for version 1.4+. Please refer to the
[Identity documentation](../../../identity/what-is-identity.md) for ongoing support.
:::

### Starting the containers

There are several methods to start the containers. If you have Docker support within your IDE, consult their documentation on run configurations.

If you are using the command line, use the following global command:

```shell
docker compose -f /path/to/your/docker-compose.yml up -d
```

:::note
If you are using Docker Compose V1, you can use the command `docker-compose`.
:::

This command starts the `iam` and `database` services. The health of the services can be checked with the following command:

```shell
docker ps
```

Your output should look similar to the following:

```text
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS                    PORTS                     NAMES
9c46cfecca05   camunda/iam:latest   "java -jar iam.jar"      38 seconds ago   Up 35 seconds             0.0.0.0:8080->8080/tcp    iam_application_1
a2174c3fe0e9   postgres:13.3-alpine "docker-entrypoint.s…"   42 seconds ago   Up 38 seconds (healthy)   0.0.0.0:15432->5432/tcp   iam_database_1
```

:::tip
If the container for the IAM application does not remain healthy, you can use the `CONTAINER ID` to check the logs by running `docker logs <COMTAINER_ID>`.
:::

### Conclusion

Congratulations! You've now started the IAM application. Let's move on to logging in.
