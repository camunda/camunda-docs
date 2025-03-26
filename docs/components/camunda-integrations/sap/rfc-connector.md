---
id: rfc-connector
title: SAP RFC Connector
description: "The SAP RFC Connector is a Java Spring Boot application that runs on SAP BTP."
---

The SAP RFC [Connector](/components/connectors/introduction.md) is a [protocol and outbound Connector](/components/connectors/connector-types.md). This Connector is a Java Spring Boot application that runs as a `.war` on SAP Business Technology Platform (BTP).

It connects to Camunda 8 SaaS, and utilizes SAP BTP's [Destination](https://learning.sap.com/learning-journeys/administrating-sap-business-technology-platform/using-destinations) and [Connectivity](https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/what-is-sap-btp-connectivity) concepts to query a SAP system via the RFC protocol to interact with remote-enabled Function Modules and BAPIs.

:::note Important!
This Connector is an alpha feature available upon request. Visit [our contact page](/reference/contact.md) to contact us.
:::

## Overview

For a standard overview of the steps involved in the SAP RFC Connector, see the following diagram:

![RFC overview](./img/rfc-overview.png)

## Prerequisites

To run the SAP RFC Connector, the following SAP infrastructure setup is required:

- [Cloud Foundry CLI](https://github.com/cloudfoundry/cli) with the [multiapps plugin](https://github.com/cloudfoundry/multiapps-cli-plugin) installed on the machine executing the deployment.
- SAP BTP subaccount with a [Cloud Foundry environment](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all) enabled and a [created space](https://help.sap.com/docs/btp/sap-business-technology-platform/create-spaces).
- A minimum of [1 GB storage quota and 2 GB runtime memory](https://help.sap.com/docs/btp/sap-business-technology-platform/managing-space-quota-plans).
- [Entitlements](https://help.sap.com/docs/btp/sap-business-technology-platform/managing-entitlements-and-quotas-using-cockpit) for:
  - [Connectivity Service](https://discovery-center.cloud.sap/serviceCatalog/connectivity-service?region=all), `lite` plan (to connect to the SAP is on-premises).
  - [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=btpea), `lite` plan.
  - [Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all), `application` plan.
- One or more instance- or subaccount-level Destinations, pointing to the SAP systems to communicate with.
  ![btp-destination-rfc](./img/btp-destination-rfc.png)
- Ensure `Additional Properties` set on the Destination are aligned with those of your Connector or remote SAP system.

## Deployment to BTP

Unlike other Camunda Connectors, the SAP RFC Connector must be deployed as a Java `.war` archive. This is because it uses SAP's [JCo Java library](https://support.sap.com/en/product/connectors/jco.html) to connect via RFC to the configured SAP system. the JCo library's license prohibits redistribution, but it is available at runtime on BTP and auto-discovered by Camunda's RFC Connector.

A descriptor file is required to deploy the SAP RFC Connector to a space in a SAP BTP subaccount. An exemplary deployment descriptor `mtad.yaml.example` is provided by Camunda. This is a standard format in SAP BTP's Cloud Foundry environment to describe the application that needs deployment.

### Deploying to BTP

1. Find the matching `.war` archive for the targeted Camunda 8 SaaS version.  
    The version follows the format `<C8 version major>.<C8 version minor>.<RFC connector version>`.  
   Examples:

   - `rfc-8.6.0.war` is the RFC Connector in version `0` for C8 SaaS version `8.6`
   - `rfc-8.5.1.war` is the RFC Connector in version `1` for C8 SaaS version `8.5`

2. Adjust the values for the credentials (client ID, client secret, etc.) to match those of the API client of the targeted Camunda 8 SaaS environment and rename it to `mtad.yaml`.
3. Log into the desired SAP BTP subaccount via the [Cloud Foundry `cli`](https://github.com/cloudfoundry/cli) (cf-cli):

```shell
$> cf login
API endpoint: https://api.cf. ...
...
```

4. Deploy the SAP RFC Connector via the `cf-cli`. Note that this requires [the "multiapps" plugin of Cloud Foundry](https://github.com/cloudfoundry/multiapps-cli-plugin) to be installed on the machine the deployment runs on.

```shell
$> cf deploy ./ # append the -f flag to shortcircuit ongoing deployments
Deploying multi-target app archive /some/path/sap-rfc-connector in org <your-org> / space <your-space> as you@example.org ..
...
Application "sap-rfc-connector" started and available at "some.url.hana.ondemand.com"
```

### Deployment in Camunda 8 SaaS

- If using Web Modeler, [import the SAP RFC Connector's element template](/components/connectors/manage-connector-templates.md#importing-existing-connector-templates) contained in the repository in `element-templates/sap-rfc-connector.json` for design use.

![sap-rfc-connector-task-in-model](./img/sap-rfc-connector-task-in-model.png)

- If using Desktop Modeler, [follow the standard importing procedure](/components/modeler/desktop-modeler/element-templates/configuring-templates.md).

## Working with the SAP RFC Connector in Camunda Modeler

### Modeling options

To use the **SAP RFC Connector** in your process, either change the type of existing task by clicking on it and using the **wrench-shaped** change type context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide to using Connectors](/components/connectors/use-connectors/index.md) to learn more.

![sap-rfc-connector-task-in-model](./img/sap-rfc-connector-element-template.png)

First, choose whether to call a `BAPI` or a Function Module (`FM`).

Then, provide the `exporting`-, `importing-`, and `tables` parameters as lists of objects.

All object entries in the list look similar to `[{name:"param", type:"type"}]`, pointing to the parameter name of the BAPI/FM and its type. For example, `[{name:"PERSON_IN_CHARGE_FROM", type:"BAPI0012_GEN-PERS_IN_CHRG"}]`.

For those with experience in `ABAP`, the configuration options are similar.

### Sending variables to the RFC target

The `exporting parameter` is sent to the RFC target. The object structure generally looks like `[{name: "param", type: "type", value: <value> }]`.

Example:

```json
[
  {
    "name": "CONTROLLINGAREA",
    "type": "BAPI0012_GEN-CO_AREA",
    "value": "1000"
  }
]
```

This corresponds with the BAPI's/FM's `importing` definition, meaning it imports these variables from the RFC call:

```ABAP
*"  IMPORTING <-- this is the BAPI/FM - don't be confused! In Camunda, this is "exporting" :)
*"     VALUE(CONTROLLINGAREA) LIKE  BAPI0012_GEN-CO_AREA
```

### Receiving variables from the RFC target

`Importing parameter` is what is expected back from the RFC target. They are configured in the same "list of objects" style pattern in the element template as the other parameters and generally look like `[{name: "param", type: "type"}]`.

Example:

```json
[
  {
    "name": "DETAIL_DATA",
    "type": " BAPI1079_DETAIL"
  }
]
```

This corresponds with the BAPI's/FM's `exporting` definition, meaning it exports these variables to the caller:

```ABAP
*"       EXPORTING
*"             VALUE(DETAIL_DATA) LIKE  BAPI1079_DETAIL
```

### Special cases: sending and/or receiving a "table" and a "changing" structure

#### tables

The `tables parameter` can be both "exporting" and "importing".

:::danger
Sending tables as tabular data to an RFC target is not yet supported.
:::

```json
{
  "name": "COSTCENTERLIST",
  "type": "BAPI0012_CCLIST"
}
```

The above example is an object parameter in the `tables parameter` section that describes a result table to be received back from the RFC call. In conforms with the BAPI `BAPI_COSTCENTER_GETLIST1` parameter definition on the SAP system:

```ABAP
*"  TABLES
*"      COSTCENTERLIST STRUCTURE  BAPI0012_CCLIST
```

The same is applicable for the return structure `BAPIRET2` that denotes the result status of the RFC call:

```json
{
  "name": "BAPIRET2",
  "isReturn": true
}
```

This aligns with the BAPI definition:

```ABAP
*"  TABLES
*"      ....
*"      RETURN STRUCTURE  BAPIRET2
```

#### changing

A `changing parameter` is a variable received by an RFC target that is processed, changed, and returned. It is only available for `FM`-type RFC targets in the SAP RFC Connector. The overall structure is `[{name: "param", type: "type", value: <value> }]`.

Example:

```json
[
  {
    "name": "CV_RESULT",
    "type": "I",
    "value": "100"
  }
]
```

The value `100` is sent to the Fuction Module and sent back as `CV_RESULT`.

## Query result structure

### BAPI

The result of a call to a BAPI holds the following JSON structure:

```json
{
  tables: [
  	{ ... }
	],
  importing: {
    { ... }
  }
]
```

`tables` holds a representation of the result tables configured.

`importing` is the result of what was sent to the BAPI in the `exporting` section above.

### Function Module

The result of a call to a Function Module holds the following JSON structure:

```json
{
  tables: [
  	{ ... }
	],
  importing: [
    { ... }
  ],
  changing: [
    { ... }
  ]
]
```

- `tables` holds a representation of the result tables configured.
- `importing` is the result of what was sent to the Function Module in the `exporting` section above.
- `changing` is the result of what was sent to the Function Module in the `changing` section above.

## Error handling

The SAP RFC Connector allows handling of query errors directly in the model. This means an RFC error is relayed to the process instance in the reserved variables `bpmnError` and `error` and can be processed accordingly:

```
DESTINATION_ERROR,
REQUEST_EXECUTION_ERROR,
REQUEST_SERIALIZATION_ERROR,
JCO_RUNTIME_ERROR,
GENERIC_ERROR
```
