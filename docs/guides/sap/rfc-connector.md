# SAP RFC protocol outbound connector

The SAP RFC protocol outbound connector (or short: SAP RFC connector) is a Java Spring Boot application that runs on BTP. It connects to Camunda 8 SaaS, and utilizes BTP's Destination  and Connectivity concept to query an SAP system via the RFC protocol to interact with remote-enabled Function Modules and BAPIs.

> [!IMPORTANT]
>
> The connector is in alpha phase available upon request - please use the https://camunda.com/contact to get in touch.

## For the impatient User

Here's a BPMN visualization of the steps necessary to get going with the SAP RFC connector:

(embed diagram from https://modeler.camunda.io/share/5b375c7c-1ad7-46c3-bc17-36ff3230c166)

## Prerequisites

The Connector integrates into a standard BTP landscape and doesn't need any proprietary setup.

Yet a minimum set of SAP infrastructure requirements need to be in place for the SAP OData connector docker image to run:

- [Cloud Foundry cli](https://github.com/cloudfoundry/cli) with [multiapps plugin](https://github.com/cloudfoundry/multiapps-cli-plugin) installed on the machine doing the deployment
- BTP subaccount with a [Cloud Foundry environment](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all) enabled and a [Space created](https://help.sap.com/docs/btp/sap-business-technology-platform/create-spaces)
- minimum [1GB storage quota, 2 GB runtime memory](https://help.sap.com/docs/btp/sap-business-technology-platform/managing-space-quota-plans)
- [Entitlements](https://help.sap.com/docs/btp/sap-business-technology-platform/managing-entitlements-and-quotas-using-cockpit) for

  - [Connectivity Service](https://discovery-center.cloud.sap/serviceCatalog/connectivity-service?region=all), `lite` plan (to connect to the SAP is on-premises)
  - [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=btpea), `lite` plan
  - [Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all), `application` plan
- one or more instance- or subaccount-level destinations, pointing to the SAP systems to communicate with.
  ![btp-destination-rfc](./images/btp-destination-rfc.png)
  :warning: check that `Additional Properties` are set on the Destination are aligned with those of your Cloud Connector or remote SAP System

## Deployment to BTP

Unlike all other Camunda connectors, the SAP RFC connector needs to be deployed as a Java Application. Sole reason is that it uses SAP's JCo Java library to connect via RFC to the configured SAP System. The JCo library's license prohibits redistribution. So we can't prebuild for you, but you need to build the application yourself. But hang on, we've prepared a long way for you already, so you're already on the finishing straight :)

### Building the Java Application

In the application folder, navigate to `src/main/resources/application.properties` and put in the credentials for the cluster the SAP RFC connector should connect to.

```properties
zeebe.client.cloud.region=xxx
zeebe.client.cloud.clusterId=guid
zeebe.client.cloud.clientId=yyy
zeebe.client.cloud.clientSecret=zzz
camunda.connector.polling.enabled=false
```

Copy the deployment descriptor `mta.yaml.example` to `mta.yaml` and fill in the same credentials in the `modules.properties` scope:

```yaml
_schema-version: 3.3.0
ID: sap-rfc-connector
# ...
modules:
  - name: sap-rfc-connector
  # ...
  	properties:
			ZEEBE_CLIENT_CLOUD_CLUSTERID: 'guid'
      ZEEBE_CLIENT_CLOUD_CLIENTID: 'xxx'
      ZEEBE_CLIENT_CLOUD_CLIENT_SECRET: 'yyy'
      ZEEBE_CLIENT_CLOUD_REGION: 'zzz'
```



Also, adjust any property describing an infrastructure setting to your requirements. For example, if a pre-existing destination instance is to be used, adjust the respective resource name. Otherwise, the deployment will create any of the services listed in `resources` for you.

Then, build the deployable archive via

`$> mbt build`

### Deploying the Java Application

Log into the desired BTP subaccount via the [Cloud Foundry `cli`](https://github.com/cloudfoundry/cli) (cf-cli):

```shell
$> cf login
API endpoint: https://api.cf. ...
...
```

Then deploy the SAP RFC connector via the `cf-cli`. Note that this requires t[he "multiapps" plugin of Cloud Foundry](https://github.com/cloudfoundry/multiapps-cli-plugin) to be installed on the machine the deployment runs on. 

```shell
$> cf deploy mta_archives/*.mtar # append the -f flag to shortcircuit ongoing deployments
Deploying multi-target app archive <path/to/>.mtar in org <your-org> / space <your-space> as you@example.org ..
...
Application "sap-rfc-connector" started and available at "some.url.hana.ondemand.com"
```

### Deployment in Camunda 8 SaaS

If using the Web Modeler,  [import the SAP RFC connector's Element Template](https://docs.camunda.io/docs/components/connectors/manage-connector-templates/#importing-existing-connector-templates) contained in the repository in `element-templates/sap-rfc-connector.json` for use at design time.



![sap-rfc-connector-task-in-model](./images/sap-rfc-connector-task-in-model.png)

If using the Desktop Modeler, [follow the standard importing procedure](https://docs.camunda.io/docs/components/modeler/desktop-modeler/element-templates/configuring-templates/).

## Working with the SAP RFC connector in Camunda Modeler

### Modeling Options

The modeling of the "SAP RFC connector" task is similar to any other Camunda connector. When the BPMN task is selected, the properties pane in the modeler shows the respective options. 

![sap-rfc-connector-task-in-model](./images/sap-rfc-connector-element-template.png)

First, choose whether to call a `BAPI` or a Function Module (`FM`).

Then, provide the `exporting`-, `importing-` and `tables`-parameter as lists of objects. 
All object entries in the list look similar to `[{name:"param", type:"type"}]`, pointing to the parameter name of the BAPI/FM and its type. Example: `[{name:"PERSON_IN_CHARGE_FROM", type:"BAPI0012_GEN-PERS_IN_CHRG"}]`.

For those with experience in `ABAP`, the configuration options sound familiar.

### Sending variables to the RFC target

The `exporting parameter` is what is sent to the RFC target. The object structure generally looks like

`[{name: "param", type: "type", value: <value> }]`

Example: 

```json
[
  {
    name: "CONTROLLINGAREA", 
    type: "BAPI0012_GEN-CO_AREA", 
    value: "1000"
  }
]
```

This corresponds with the BAPI's/FM's `importing` definition, meaning it imports these variables from the RFC call:

```ABAP
*"  IMPORTING <-- this is the BAPI/FM - don't be confused! In Camunda, this is "exporting" :)
*"     VALUE(CONTROLLINGAREA) LIKE  BAPI0012_GEN-CO_AREA
```

### Receiving variables from the RFC target

`Importing parameter` is what is expected back from the RFC target. They are configured in the same "list of objects" style pattern in the element template as the other parameters and generally look like:

`[{name: "param", type: "type"}]`

Example:

```json
[
  {
    name: "DETAIL_DATA", 
    type: " BAPI1079_DETAIL"
  }
]
```

This corresponds with the BAPI's/FM's `exporting` definition, meaning it exports these variables to the caller:

```ABAP
*"       EXPORTING
*"             VALUE(DETAIL_DATA) LIKE  BAPI1079_DETAIL
```



### Special cases: sending and/or receving a "table" and a "changing" structure

#### tables

The `tables parameter` can be both "exporting" and "importing".

> [!WARNING]
>
> Sending tables as tabular data to an RFC target is not supported yet.

```json
{
  name: "COSTCENTERLIST",
  type: "BAPI0012_CCLIST"
}
```

The above example is an object parameter in the `tables parameter` section that describes an result table to be received back from the RFC call. In conforms with the BAPI `BAPI_COSTCENTER_GETLIST1` parameter definition on the SAP system:

```ABAP
*"  TABLES
*"      COSTCENTERLIST STRUCTURE  BAPI0012_CCLIST
```

Same goes for the return structure `BAPIRET2` that denotes the result status of the RFC call. Configured as

```json
{
  name: "BAPIRET2",
  isReturn: true
}
```

It aligns with the BAPI definition:

```ABAP
*"  TABLES
*"      ....
*"      RETURN STRUCTURE  BAPIRET2
```

#### changing

A `changing parameter` is a variable received by an RFC target that is processed, changed and returned back. It is only available for `FM`-type RFC targets in the SAP RFC connector. The overall structure is

`[{name: "param", type: "type", value: <value> }]`

Example:

```json
[
  {
    name: "CV_RESULT", 
    type: "I", 
    value: "100"
  }
]
```

The value `100` is sent to the Fuction Module, might be changed on the SAP system and sent back as `CV_RESULT` again.

## Query result structure

### BAPI

The result of a call to a BAPI holds this JSON structure:

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

The result of a call to a Function Module holds this JSON structure:

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

`tables` holds a representation of the result tables configured.

`importing` is the result of what was sent to the Function Module in the `exporting` section above.

`changing` is the result of what was sent to the Function Module in the `changing` section above.

## Error handling

(same as the section in the OData connector, please insert with adjusted wording.
The error codes can be one of

```
DESTINATION_ERROR,
REQUEST_EXECUTION_ERROR,
REQUEST_SERIALIZATION_ERROR,
JCO_RUNTIME_ERROR,
GENERIC_ERROR
```

)