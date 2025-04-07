---
id: odata-connector
title: SAP OData Connector
description: "The SAP OData Connector is a protocol and outbound Connector that runs as a Docker image on the SAP Business Technology Platform (BTP)."
---

The SAP OData Connector is a protocol and outbound [connector](/components/connectors/introduction.md) that runs as a Docker image on the SAP Business Technology Platform (BTP).

This connector is designed to run in [hybrid mode](/guides/use-connectors-in-hybrid-mode.md), hosted in the customer's SAP BTP sub-account in the [Cloud Foundry environment](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all).

This connector works with Camunda 8 SaaS, and utilizes SAP BTP's [Destination](https://learning.sap.com/learning-journeys/administrating-sap-business-technology-platform/using-destinations) and [Connectivity](https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/what-is-sap-btp-connectivity) concepts to query a SAP system via both OData v2 and v4.

## Overview

For a standard overview of the steps involved in the SAP OData Connector, see the following diagram:

![OData steps](./img/odata-connector-ops.png)

## Prerequisites

[Create an API client](/components/console/manage-clusters/manage-api-clients.md) for your Camunda SaaS cluster with the full scope: `Zeebe,Tasklist,Operate,Optimize,Secrets`

To run the SAP OData Connector Docker image, the following SAP infrastructure setup is required:

- [Cloud Foundry CLI](https://github.com/cloudfoundry/cli) with [multiapps plugin](https://github.com/cloudfoundry/multiapps-cli-plugin) installed on the machine executing the deployment.
- SAP BTP subaccount with a [Cloud Foundry environment](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all) enabled and a [created space](https://help.sap.com/docs/btp/sap-business-technology-platform/create-spaces).
- Minimum of [1 GB storage quota and 2 GB runtime memory](https://help.sap.com/docs/btp/sap-business-technology-platform/managing-space-quota-plans).
- [Entitlements](https://help.sap.com/docs/btp/sap-business-technology-platform/managing-entitlements-and-quotas-using-cockpit) for:
  - [Connectivity Service](https://discovery-center.cloud.sap/serviceCatalog/connectivity-service?region=all), `lite` plan (to connect to the SAP on-premises).
  - [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=btpea), `lite` plan.
- One or more instance- or subaccount-level destinations, pointing to the SAP systems to communicate with.
  ![sample BTP destination configuration](./img/btp-destination.png)
- Ensure `Additional Properties` are correctly set on the Destination.<br/>
  For example:

```json
HTML5.DynamicDestination: true
sap-client: <client/"Mandant" to work with on the SAP system>
WebIDEEnabled: true
WebIDESystem: <SAP system ID>
WebIDEUsage: odata_gen
```

:::danger
Currently, only `BasicAuthentication` is supported on the Destination by the SAP OData Connector.
:::

## Configuration and deployment

A descriptor file is required to deploy the SAP OData Connector to a space in a SAP BTP subaccount. An exemplary deployment descriptor `mtad.yaml.example` is provided by Camunda. This is a standard format in SAP BTP's Cloud Foundry environment to describe the application requiring deployment.

### Using `csap`

Use CSAP CLI in either:

**Interactive mode**: Follow the on-screen prompts.
**Non-interactive mode**: Provide all required parameters directly to the CLI.

Configure the OData Connector via [the `csap` cli](./csap-cli.md) (recommended) or manually. The advantage of using `csap` is that it pulls together all necessary files and adjusts them to your BTP environment automatically, using the information you provided in the prompts or via command line switches.

Use the command `csap setup` to guide you interactively.

- Assuming your [Camunda cluster's API credentials](/guides/setup-client-connection-credentials.md) are sourced in your shell environment, this will do the configuration for you:

```shell
csap setup --for odata \
  --camunda 8.7 \
  --deployment SaaS
```

### Manual configuration

Follow these steps:

1. Find the matching [Docker image](https://hub.docker.com/r/camunda/sap-odata-connector/tags) for the targeted Camunda 8 SaaS version.  
   The version follows the format `<C8 version major>.<C8 version minor>.<OData Connector version>`.  
   Examples:

   - `8.6.0` is the OData Connector in version `0` for C8 SaaS version `8.6`
   - `8.5.1` is the OData Connector in version `1` for C8 SaaS version `8.5`

2. Download the matching `mtad.yaml.example` from [the OData Connector's GitHub release page](https://github.com/camunda/sap-odata-connector/releases). Adjust the values for the credentials (`client ID`, client secret, etc.) to match those of the API client of the targeted Camunda 8 SaaS environment and rename it to `mtad.yaml`.
3. Customize the names of the SAP BTP Destination and Connectivity instances as needed—both will be automatically created during deployment. If instances with the same names already exist in your subaccount, they will be reused.
4. Download the Connector template from the [OData Connector's GitHub release page](https://github.com/camunda/sap-odata-connector/releases).

### Deploying to SAP BTP

1. Log into the desired SAP BTP subaccount via the [Cloud Foundry `cf-cli`](https://github.com/cloudfoundry/cli):

```shell
$> cf login
API endpoint: https://api.cf. ...
...
```

2. Deploy the SAP OData Connector via the `cf-cli`.<br/>
   Note that this requires [the "multiapps" plugin of Cloud Foundry](https://github.com/cloudfoundry/multiapps-cli-plugin) to be installed on the machine the deployment runs on:

```shell
$> cf deploy ./ # append the -f flag to shortcircuit ongoing deployments
Deploying multi-target app archive /some/path/sap-odata-connector in org <your-org> / space <your-space> as you@example.org ..
...
Application "sap-odata-connector" started and available at "some.url.hana.ondemand.com"
```

### Deployment in Camunda 8 SaaS

- If using Web Modeler, [import the SAP OData Connector's element template](/components/connectors/manage-connector-templates.md#importing-existing-connector-templates) for use in your process design.

![sample BPMN diagram with SAP OData Connector](./img/sap-odata-connector-task-in-model.png)

- If using Desktop Modeler, [follow the standard importing procedure](/components/modeler/desktop-modeler/element-templates/configuring-templates.md).

## Working with the SAP OData Connector in Camunda Modeler

### Modeling options

To use the **SAP OData Connector** in your process, either change the type of existing task by clicking on it and using the **wrench-shaped** change type context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide to using Connectors](/components/connectors/use-connectors/index.md) to learn more.

:::note
The configuration options will dynamically change with the selected HTTP method and the OData protocol version. For example, a `payload` field is only displayed when the HTTP method is something other than "GET".
:::

![SAP OData Connector element template](./img/sap-odata-connector-template.png)

Specifying the `BTP destination name` allows you to reuse existing Destinations from the subaccount or instance level. Authentication and authorizations are maintained at this level, which is why it's not necessary to maintain credentials for the Connector.

### Advanced capabilities

In addition to the basic OData settings such as Service, Entity, EntitySet, Method, and OData version, the **Advanced** section allows you to fine tune `GET` queries to the SAP method with all standard parameters.

For example, supplying `$filter` and `$select` parameters helps in reducing data transferred over the wire, while `$expand` helps in retrieving additional entities with a single query.

![Advanced options of the SAP OData Connector element template](./img/sap-odata-connector-element-template-advanced.png)

### $batch requests

The capabilities are in sync with [https://me.sap.com/notes/1869434](https://me.sap.com/notes/1869434), with the exception of XML over the wire. The OData Connector uses `JSON` only.

When `Batch Request` is selected as **Request type**, the available query options change and reveal the choice of the OData protocol and the input area for the individual requests. Note that the **Batch Request Payload** field requires the mandatory use of `FEEL`.

![batch connector template](./img/sap-odata-connector-batch-connector-template.png)

The **Batch Request** payload is an array of objects that can either be of `"type": "batch"` or `"type": "changeset"` - `batch` (denotes read requests), and `changeset` (denotes write operations, including `DELETE`).

```jsonc
[
  {
    "type": "batch",
    "requests": [...]
  },
  {
    "type": "changeset",
    "requests": [...]
  }
]
```

Both `batch` and `changeset` contain a `requests` node that holds the individual requests that should occur within a `batch` (read) or a `changeset` (write, update, delete). Together, they constitute the entirety of the batch request.

The `requests` node is also an array of `objects`. Regardless of if a request is inside a `batch` or a `changeset`, it always has `method` and `resourcePath` as mandatory fields.

```jsonc
[
  {
    "type": "batch",
    "requests": [
      {
        "method": "GET",
        "resourcePath": "A_BusinessPartner('" + bp1 + "')",
        "options": {
          "format": "json",
          "select": "FirstName"
        }
      }
    ]
  },
  {
    "type": "changeset",
    "requests": [
      {
        "method": "PATCH",
        "resourcePath": "A_BusinessPartner('" + bp1 + "')",
        "payload": {
          "FirstName": "Bernd (" + string(now()) + ")"
        }
      }
    ]
  }
]
```

`batch` request entries can contain an additional `options` block, allowing the same query options as the Connector template has in [advanced capabilities](#advanced-capabilities), with the `$` prefix omitted.

`changeset` request entries are modifying operations and thus require a `payload` in JSON format.

### Query result structure

The result of any query, whether it is reading or writing to the SAP system, is in JSON format in the following structure:

```json
{
  result: <further json>,
  statusCode: <http status code>,
  countOrInlineCount: <integer, optional!>
}
```

- `result` contains the result of the query, whether it is content retrieved from a SAP system via `GET` or the result of a write or update operation via `POST`, `PUT`, `PATCH`, or `DELETE`. (Note that with the latter, the `result` is always empty.)
- `statusCode` holds the [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) of the operation.
- `countOrInlineCount` is only present in the response when the corresponding option `$inlinecount` (for OData v2) or `$count` (for OData v4) was checked in the design time of the BPMN task. It then shows the number of results from the `GET` query to the SAP system.

![the output mapping of the SAP OData element template](./img/sap-odata-connector-element-template-result.png)

The query result can either be mapped to a single result variable or worked on [via FEEL with an expression](/components/connectors/use-connectors/index.md#result-expression). The same is applicable to `getResponse`, as a result variable contains the described query JSON in its entirety. The result expression `{getStatusCode: statusCode}` would only hold the HTTP status code in the `getStatusCode` process variable.

For `$batch` requests, the query result is an array of the result structure above. This is an example for an OData v2 batch request, consisting of one `Read` and one `Update` operation:

```json
{
  "<your output mapping result variable>": [
    {
      "result": {
        "d": {
          "__metadata": {
            "id": "<host>/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('...')",
            "uri": "<host>/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('...')",
            "type": "API_BUSINESS_PARTNER.A_BusinessPartnerType"
          },
          "FirstName": "..."
        }
      },
      "statusCode": 200
    },
    { "result": null, "statusCode": 204 }
  ]
}
```

If one of the operations in the batch request fails, the error is relayed to the `result` node for the request. For example, the second request in this sample result where the business partner with number `0000000` couldn't be found:

```jsonc
{
  "<your output mapping result variable>": [
    {
      "result": {
        "d": {
          "__count": "4",
          "results": [
            {...}
          ]
        }
      },
      "statusCode": 200,
      "countOrInlineCount": 4
    },
    {
      "result": {
        "target": "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('0000000')?$format=json&$select=FirstName%2CLastName",
        "odata": {
          "error": {
            "code": "/IWBEP/CM_MGW_RT/020",
            "message": {
              "lang": "en",
              "value": "Resource not found for segment 'A_BusinessPartnerType'"
            },
            "innererror": {
              "application": {
                "component_id": "LO-MD-BP",
                "service_namespace": "/SAP/",
                "service_id": "API_BUSINESS_PARTNER",
                "service_version": "0001"
              },
              "transactionid": "D25C6A8CF4D30020E0067DD0610AFCCA",
              "timestamp": "",
              "Error_Resolution": {
                "SAP_Transaction": "",
                "SAP_Note": "See SAP Note 1797736 for error analysis (https://service.sap.com/sap/support/notes/1797736)",
                "Batch_SAP_Note": "See SAP Note 1869434 for details about working with $batch (https://service.sap.com/sap/support/notes/1869434)"
              },
              "longtext_url": "/sap/opu/odata/iwbep/message_text/T100_longtexts(MSGID='%2FIWBEP%2FCM_MGW_RT',MSGNO='020',MESSAGE_V1='A_BusinessPartnerType',MESSAGE_V2='',MESSAGE_V3='',MESSAGE_V4='')/$value",
              "errordetails": [
                {
                  "ContentID": "",
                  "code": "/IWBEP/CX_MGW_BUSI_EXCEPTION",
                  "message": "Resource not found for segment 'A_BusinessPartnerType'",
                  "longtext_url": "/sap/opu/odata/iwbep/message_text/T100_longtexts(MSGID='%2FIWBEP%2FCM_MGW_RT',MSGNO='020',MESSAGE_V1='A_BusinessPartnerType',MESSAGE_V2='',MESSAGE_V3='',MESSAGE_V4='')/$value",
                  "propertyref": "",
                  "severity": "error",
                  "transition": false,
                  "target": ""
                }
              ]
            }
          }
        }
      },
      "statusCode": 404
    }
  ]
}

```

### Error handling

The SAP OData Connector allows handling of query errors directly in the model. This means an OData error is relayed to the process instance in the reserved variables `bpmnError` and `error` and can be processed accordingly.

1. Equip the Connector task with an error handling expression such as:

```js
if error.code = "400" then
  bpmnError("400", "client request is bad", { errorMessage: error.message, errorCode: error.code })
else if error.code = "404" then
  bpmnError("404", "queried resource not found", { errorMessage: error.message, errorCode: error.code })
else if error.code = "500" then
  bpmnError("500", "server error", { errorMessage: error.message, errorCode: error.code })
else if error.code = "503" then
  bpmnError("503", "I'm just an proxy teapot", { errorMessage: error.message, errorCode: error.code })
else
  null
```

![image-20241010160419616](./img/odata-connector-error-expression.png)

2. Specifically note the third parameter to `bpmnError`:

```js
{ errorMessage: error.message, errorCode: error.code }
```

This relays the error message and code to the next step in the process flow.

3. Equip the BPMN task with an error boundary event:

![error boundary event on SAP OData Connector](./img/sap-odata-connector-task-error-handling2.png)

If the SAP OData Connector encounters an error, the boundary event will catch the error and continue the process flow. The error boundary event can receive these configuration parameters to contain further error details:

![error output mapping](./img/sap-odata-connector-task-error-handling1.png)

- `errorMessage`: Contains a verbose version of the error message and cause and relays it into the process scope as `ov_errorMessage`.
- `errorCode`: Holds a predefined value describing the scope of the error, relaying it to the process scope as `errorCode`. It can be one of the following:
  - `INVALID_PAYLOAD`: The payload of the request was detected as erroneous by the server.
  - `REQUEST_ERROR`: The request contained an error, for example, a wrong combination of `GET` query parameters.
  - `GENERIC_ERROR`
  - `DESTINATION_ERROR`: An error occurred while claiming the Destination from the runtime environment.
- `error`: The serialized Error object, available in the example above as `ov_error`.

## Tips

- Ensure the connection from the Cloud Foundry environment via the destination to the SAP systems works. Using the [Terminal in Business Application Studio](https://community.sap.com/t5/technology-blogs-by-sap/how-to-check-the-connectivity-to-your-backend-system-in-business/ba-p/13479832) is a quick way to verify this.
- Validate requests first in an API client before trying with the SAP OData Connector in Modeler. Then, copy over to the element template fields. This saves time and reduces potential error.
- Any payload size less than or equal to 2.5 MB can be considered safe.
