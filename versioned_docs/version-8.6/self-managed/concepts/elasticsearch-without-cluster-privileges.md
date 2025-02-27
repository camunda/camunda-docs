---
id: elasticsearch-without-cluster-privileges
title: "Elasticsearch without cluster privileges"
---

In case the camunda single application cannot access elasticsearch with cluster privileges due to business or technical constraints, it is possible to run the schema manager as a stand-alone application separate from the main application. With this setup, the single application does not need to have cluster privileges to work.

:::note Database Support
This feature is only available from 8.6.10 on and is also only supported for Elasticsearch installations (no OpenSearch support).
:::

:::note Essential privileges required by the single application
Index level privilege of at least `manage` is still required for the camunda single application to work properly
:::

## Setup

For this setup to work, the database schema needs to be initialized first (step 1). This requires cluster level privileges for the database. This only needs to be executed once. 
Once the schema is initialized, the application can be started without cluster level privileges (step 2). The steps are described in detail below.

### 1. Initialize the schema manager

The schema manager is started as a separate standalone java application and is responsible for creating and managing the database schema and applying database settings, such as e.g. retention policies.
This step requires cluster level privileges for the database and only needs to be executed once per installation.

#### 1.1 Configure Schema Manager

Create a configuration for the schema manager with the following values
```
zeebe.broker.exporters.elasticsearch:
  className: io.camunda.zeebe.exporter.ElasticsearchExporter
  args:
    index:
      createTemplate: true
    retention:
      enabled: true
    # Below is an example assuming an existing user called 'camunda-admin' who has 'superuser' privileges
    authentication: 
      username: camunda-admin
      password: camunda123
camunda:
  operate:
    elasticsearch:
      # Below is an example assuming an existing user called 'camunda-admin' who has 'superuser' privileges
      username: camunda-admin
      password: camunda123
      healthCheckEnabled: false
    archiver:
      ilmEnabled: true
  tasklist:
    elasticsearch:
      # Below is an example assuming an existing user called 'camunda-admin' who has 'superuser' privileges
      username: camunda-admin
      password: camunda123
      healthCheckEnabled: false
    archiver:
      ilmEnabled: true

```
#### 1.2 Start the Schema Manager with the config above

Start the java application `schema` (or `schema.bat` for Windows) provided in the `bin` folder of the delivered jar file. The schema manager will create the necessary indices and templates in the database and apply the respective settings.
Assuming the configuration above was saved in a file named `schema-manager.yaml`, you can start the application with the following command:
``` SPRING_CONFIG_ADDITIONALLOCATION=/path/to/schema-manager.yaml ./bin/schema
```

Wait some minutes and verify that the application executed successfully.

### 2. Start the camunda single application

The camunda single application can now be started without cluster level privileges. The application will connect to the database and use the schema created by the schema manager.

#### 2.1 Ensure there is an Elasticsearch user with sufficient privileges

The application requires a database user with at least `manage` privileges on the indices it is supposed to work with. 

Feel free to use an existing user with the required privileges. Alternatively the required privileges can be assigned to an example user called `camunda-app` with the following request to the database:
```
PUT _security/role/read_write_role
{
  "indices": [
    {
      "names": [
        "*"
      ],
      "privileges": [
        "read",
        "write",
        "view_index_metadata"
      ],
      "allow_restricted_indices": false
    },
    {
      "names": [
        "operate-*",
        "tasklist-*",
        "zeebe-*"
      ],
      "privileges": [
        "manage"
      ],
      "allow_restricted_indices": false
    }
  ],
  "applications": [],
  "run_as": [],
  "metadata": {},
  "transient_metadata": {
    "enabled": true
  }
}
```

Then assign the user to the role defined above (e.g. if Elasticsearch is running on docker, this can be achieved with the following command):
```
docker exec -t elasticsearch elasticsearch-users useradd camunda-app -p camunda123
docker exec -t elasticsearch elasticsearch-users roles camunda-app -a read_write_role
```

#### 2.2 Configure the Camunda Single Application

Create a configuration for the camunda single application with the following values:

```
zeebe.broker.exporters.elasticsearch:
  className: io.camunda.zeebe.exporter.ElasticsearchExporter
  args:
    index:
      createTemplate: false
    retention:
      enabled: false
      managePolicy: false
    # Below is an example assuming an existing user called 'camunda-app' with the privileges described in 2.1
    authentication:
      username: camunda-app
      password: camunda123
camunda:
  tasklist:
    elasticsearch:
      createSchema: false
      username: camunda-app
      password: camunda123
      healthCheckEnabled: false
    zeebeElasticsearch:
      # Below is an example assuming an existing user called 'camunda-app' with the privileges described in 2.1
      username: camunda-app
      password: camunda123
    archiver:
      ilmEnabled: false
      ilmManagePolicy: false
    migration:
      migrationEnabled: false
  operate:
    elasticsearch:
      createSchema: false
      username: camunda-app
      password: camunda123
      healthCheckEnabled: false
    zeebeElasticsearch:
      # Below is an example assuming an existing user called 'camunda-app' with the privileges described in 2.1
      username: camunda-app
      password: camunda123
    archiver:
      ilmEnabled: false
    migration:
      migrationEnabled: false
```

#### 2.3 Start the application with the config above

##### Starting the application from the jar file

Start the java application `camunda` (or `camunda.bat` for Windows) provided in the `bin` folder of the delivered jar file. 
Assuming the configuration above was saved in a file named `application-custom.yaml`, you can start the application with the following command:
``` SPRING_CONFIG_ADDITIONALLOCATION=/path/to/application-custom.yaml ./bin/camunda
```

##### Applying the configuration above when using helm charts
TBD

## Limitations

- Please note that this feature is only available for the Camunda `8.6.10` version and above. 
- It only works for installations using Elasticsearch. 
- Upgrades using the described setup are not yet supported.


