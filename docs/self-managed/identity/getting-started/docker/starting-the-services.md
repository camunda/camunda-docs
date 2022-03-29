---
id: starting-the-services
title: "Starting the services"
sidebar_label: "Step 2: Start the services"
---

### Starting the services

There are several methods to start the containers. If you have Docker support within your IDE, consult their documentation on run configurations.

If you are using the command line, use the following global command:

```shell
docker compose -f /path/to/your/docker-compose.yml up -d
```

:::note
If you are using Docker Compose V1, you can use the command `docker-compose`.
:::

This command starts the `identity` and `keycloak` services. The health of the services can be checked with the following command:

```shell
docker ps
```

Your output should look similar to the following:

```text
CONTAINER ID   IMAGE                   COMMAND                  CREATED       STATUS                 PORTS                               NAMES
e15d9e80f18d   identity:latest         "java -jar identity.…"   5 hours ago   Up 5 hours             0.0.0.0:8080->8080/tcp              identity
9e209e46b4df   jboss/keycloak:16.1.1   "/opt/jboss/tools/do…"   5 hours ago   Up 5 hours (healthy)   8443/tcp, 0.0.0.0:18080->8080/tcp   keycloak
```

:::tip
If the container for the Identity application does not remain healthy, you can use the `CONTAINER ID` to check the logs by running `docker logs <COMTAINER_ID>`.
:::

### Conclusion

You've now started the Identity application. Let's move on to [logging in](../logging-in).
