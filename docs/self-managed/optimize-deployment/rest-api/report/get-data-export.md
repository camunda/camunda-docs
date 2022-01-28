---
id: get-data-export
title: "Export Report Result Data"
description: "The REST API to export Report result data from Optimize."
---

<span class="badge badge--platform">Platform only</span>

## Purpose

The Data Export API allows users to export large amounts of data in a machine-readable format (JSON) from Optimize. 

## Functionality

Users can export all report types (except combined reports) from `Optimize` using the Data Export API. Moreover, 
raw data reports can be exported in a paginated fashion, so that large amounts of data can be consumed in chunks by the 
client. 

### Pagination

The simplest way to paginate through the results is to perform a search request with all the `REQUIRED` header/query 
parameters as described in the sections below (but without `searchRequestId`), then pass the `searchRequestId` 
returned in each response to the next request, until no more documents are returned. Please note 
that it's often the case, but not guaranteed, that the `searchRequestId` remains stable through the entire 
pagination, so always use the `searchRequestId` from the most current response to make your next request.

## Method & HTTP Target Resource

GET `/api/public/export/report/{report-ID}/result/json`

Where `report-ID` is the ID of the report you wish to export.

## Request Headers

The following request headers have to be provided with every data export request:

|Header|Constraints|Value|
|--- |--- |--- |
|Authorization|REQUIRED*|[Authorization](../../authorization)|

* Only required if not set as a query parameter

## Query Parameters

The following query parameters have to be provided with every data export request:

|Parameter|Constraints|Value|
|--- |--- |--- |
|access_token|REQUIRED*|[Authorization](../../authorization)|
|limit|REQUIRED|Maximum number of records per page. Please note that the limit will only be considered when performing the request for the first page of a raw data report. The following requests for a given searchRequestId will have the same page size as the first request.|
|paginationTimeout|REQUIRED|The amount of time (in seconds) for which a search context will be held in memory, so that the remaining pages of the result can be retrieved. For more information on how to paginate through the results, please refer to the section [Pagination](#pagination).|
|searchRequestId|Optional|The ID of a previous search for which you wish to retrieve the next page of results. For more information on how to get and use a searchRequestId please refer to the section [Pagination](#pagination).|

* Only required if not set as a request header

## Request Body

No request body is required.

## Result

|Content|Value|
|--- |--- |
|searchRequestId|The ID of the performed search. The following pages from this search can be retrieved by using this ID. For more information please refer to the section [Pagination](#pagination).|
|numberOfRecordsInResponse|Number of records in the JSON Response. This is a number between [0, limit]|
|totalNumberOfRecords|The total number of records (from all pages) for this report export|
|reportId|The ID of the exported report|
|message|In case there is additional information relevant to this request, this field will contain a message describing it. The response will only contain this field if there is a message to be shown|
|data [Array]|An array containing numberOfRecordsInResponse report data records in JSON Format|


## Response Codes

Possible HTTP Response Status codes:

|Code|Description|
|--- |--- |
|200|Request successful.|
|400|Returned if some of the properties from the request are invalid or missing.|
|401|Secret incorrect or missing in HTTP Header. See [Authorization](../../authorization) on how to authenticate.|
|404|The requested report was not found, please check the provided report-ID.|
|500|Some error occurred while processing the export request, best check the Optimize log.|


## Example

### Export a raw data report
Let's assume you want to export a report with the ID `e6c5abb1-6a18-44e7-8480-d562d511ba62`, with a maximum of two 
records per page, an access token `mySecret` and a pagination timeout of 60s, this is what it would look like

#### Initial API call

GET `/api/public/export/report/e6c5aaa1-6a18-44e7-8480-d562d511ba62/result/json?
paginationTimeout=60&access_token=mySecret&limit=2`

##### Response content:

    {
      "searchRequestId": "FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ",
      "numberOfRecordsInResponse": 2,
      "totalNumberOfRecords": 11,
      "reportId": "e6c5abb1-6a18-44e7-8480-d562d511ba62",
      "data": [
          {
              "processDefinitionKey": "aProcess",
              "processDefinitionId": "aProcess:1:1801",
              "processInstanceId": "1809",
              "businessKey": "aBusinessKey",
              "startDate": "2021-12-02T17:21:49.330+0200",
              "endDate": "2021-12-02T17:21:49.330+0200",
              "duration": 0,
              "engineName": "camunda-bpm",
              "tenantId": null,
              "variables": {}
          },
          {
              "processDefinitionKey": "aProcess",
              "processDefinitionId": "aProcess:1:1801",
              "processInstanceId": "1804",
              "businessKey": "aBusinessKey",
              "startDate": "2021-12-02T17:21:49.297+0200",
              "endDate": "2021-12-02T17:21:49.298+0200",
              "duration": 1,
              "engineName": "camunda-bpm",
              "tenantId": null,
              "variables": {}
          }
      ]
    }

##### Response

Status 200.

#### Subsequent API calls

Please note here the use of the query parameter `searchRequestId` to retrieve further pages from the initial search.

GET `/api/public/export/report/e6c5aaa1-6a18-44e7-8480-d562d511ba62/result/json?
paginationTimeout=60&access_token=mySecret&searchRequestId
=FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ&limit=2`

##### Response content:

    {
      "searchRequestId": "FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ",
      "numberOfRecordsInResponse": 2,
      "totalNumberOfRecords": 11,
      "reportId": "e6c5abb1-6a18-44e7-8480-d562d511ba62",
      "data": [
          {
              "processDefinitionKey": "aProcess",
              "processDefinitionId": "aProcess:1:1bc9474d-5762-11ec-8b2c-0242ac120003",
              "processInstanceId": "1bdafab8-5762-11ec-8b2c-0242ac120003",
              "businessKey": "aBusinessKey",
              "startDate": "2021-12-07T15:32:22.739+0200",
              "endDate": "2021-12-07T15:32:22.740+0200",
              "duration": 1,
              "engineName": "camunda-bpm",
              "tenantId": null,
              "variables": {}
          },
          {
              "processDefinitionKey": "aProcess",
              "processDefinitionId": "aProcess:1:1bc9474d-5762-11ec-8b2c-0242ac120003",
              "processInstanceId": "1bda3763-5762-11ec-8b2c-0242ac120003",
              "businessKey": "aBusinessKey",
              "startDate": "2021-12-07T15:32:22.735+0200",
              "endDate": "2021-12-07T15:32:22.735+0200",
              "duration": 0,
              "engineName": "camunda-bpm",
              "tenantId": null,
              "variables": {}
          }
      ]
    }

##### Response

Status 200.