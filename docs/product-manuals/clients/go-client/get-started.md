---
id: get-started
title: "Go Client - Get Started Guide"
sidebar_label: "Get Started Guide"
---

In this tutorial, you will learn to use the Go client in a Go application to interact with Camunda Cloud.

You can find the complete source code, on [GitHub](https://github.com/zeebe-io/zeebe-get-started-go-client).

## Prerequisites

- [Camunda Cloud Account](/guides/getting-started/create-camunda-cloud-account.md)
- [Cluster](/guides/getting-started/create-cluster.md) and [Client Credentials](/guides/getting-started/setup-client-connection-credentials.md)
- [Modeler](/guides/getting-started/model-your-first-process.md)
- Go v1.13+ environment installed

## Set up a project

First, we need a new Go project.
Create a new project using your IDE, or create new Go module with:

```
mkdir -p $GOPATH/src/github.com/zb-user/zb-example
cd $GOPATH/src/github.com/zb-user/zb-example
go mod init
```

To use the Zeebe Go client library, add the following dependency to your `go.mod`:

```
module github.com/zb-user/zb-example

go 1.13

require github.com/zeebe-io/zeebe/clients/go v0.24.1
```

Set the connection settings and client credentials as environment variables:

```bash
export ZEEBE_ADDRESS='[Zeebe API]'
export ZEEBE_CLIENT_ID='[Client ID]'
export ZEEBE_CLIENT_SECRET='[Client Secret]'
export ZEEBE_AUTHORIZATION_SERVER_URL='[OAuth API]'
```

**Hint:** When you create client credentials in Camunda Cloud you have the option to download a file with above lines filled out for you.

Create a `main.go` file inside the module and add the following lines to bootstrap the Zeebe client:

```go
package main

import (
	"context"
	"fmt"
	"github.com/zeebe-io/zeebe/clients/go/pkg/zbc"
	"github.com/zeebe-io/zeebe/clients/go/pkg/pb"
	"os"
)

func main() {
    client, err := zbc.NewClient(&zbc.ClientConfig{
        GatewayAddress: os.Getenv("ZEEBE_ADDRESS"),
    })

	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	topology, err := client.NewTopologyCommand().Send(ctx)
	if err != nil {
		panic(err)
	}

	for _, broker := range topology.Brokers {
		fmt.Println("Broker", broker.Host, ":", broker.Port)
		for _, partition := range broker.Partitions {
			fmt.Println("  Partition", partition.PartitionId, ":", roleToString(partition.Role))
		}
	}
}

func roleToString(role pb.Partition_PartitionBrokerRole) string {
	switch role {
	case pb.Partition_LEADER:
		return "Leader"
	case pb.Partition_FOLLOWER:
		return "Follower"
	default:
		return "Unknown"
	}
}
```

Run the program.

```bash
go run main.go
```

You should see similar output:

```
Broker 0.0.0.0 : 26501
  Partition 1 : Leader
```

## Model a workflow

Now, we need a first workflow which can then be deployed.
Later, we will extend the workflow with more functionality.

Open the Zeebe Modeler and create a new BPMN diagram.
Add a start event and an end event to the diagram and connect the events.

![model-workflow-step-1](assets/order-process-simple.png)

Set the id to `order-process` (i.e., the BPMN process id) and mark the diagram
as executable. Save the diagram in the project's source folder.

## Deploy a workflow

Next, we want to deploy the modeled workflow to the broker.
The broker stores the workflow under its BPMN process id and assigns a version (i.e., the revision).

```go
// After the client is created
ctx := context.Background()
response, err := client.NewDeployWorkflowCommand().AddResourceFile("order-process.bpmn").Send(ctx)
if err != nil {
	panic(err)
}

fmt.Println(response.String())}
```

Run the program and verify that the workflow is deployed successfully.
You should see similar the output:

```
key:2251799813686743 workflows:<bpmnProcessId:"order-process" version:3 workflowKey:2251799813686742 resourceName:"order-process.bpmn" >
```

## Create a workflow instance

Finally, we are ready to create a first instance of the deployed workflow. A
workflow instance is created of a specific version of the workflow, which can
be set on creation.

```go
// After the workflow is deployed.
variables := make(map[string]interface{})
variables["orderId"] = "31243"

request, err := client.NewCreateInstanceCommand().BPMNProcessId("order-process").LatestVersion().VariablesFromMap(variables)
if err != nil {
	panic(err)
}

ctx := context.Background()
msg, err := request.Send(ctx)
if err != nil {
	panic(err)
}

fmt.Println(msg.String())
```

Run the program and verify that the workflow instance is created. You should see the output:

```
workflowKey:2251799813686742 bpmnProcessId:"order-process" version:3 workflowInstanceKey:2251799813686744
```

You did it!

## See the Workflow in Action

You want to see how the workflow instance is executed?

1. Go to the cluster in Camunda Cloud and select it
1. Click on the link to [Operate](/product-manuals/operate/userguide/basic-operate-navigation.md)
1. Select the workflow _order process_

As you can see, a workflow instance has been started and finished.

## Work on a task

Now we want to do some work within your workflow. First, add a few service
tasks to the BPMN diagram and set the required attributes. Then extend your
`main.go` file and activate a job which are created when the workflow instance
reaches a service task.

Open the BPMN diagram in the Zeebe Modeler.
Insert a few service tasks between the start and the end event.

![model-workflow-step-2](assets/order-process.png)

You need to set the type of each task, which identifies the nature of the work to be performed.
Set the type of the first task to `payment-service`.

Add the following lines to redeploy the modified process, then activate and
complete a job of the first task type:

```go
	...
	//After instance is created
	jobWorker := client.NewJobWorker().JobType("payment-service").Handler(handleJob).Open()

	<-readyClose
	jobWorker.Close()
	jobWorker.AwaitClose()
}

func handleJob(client worker.JobClient, job entities.Job) {
	jobKey := job.GetKey()

	headers, err := job.GetCustomHeadersAsMap()
	if err != nil {
		// failed to handle job as we require the custom job headers
		failJob(client, job)
		return
	}

	variables, err := job.GetVariablesAsMap()
	if err != nil {
		// failed to handle job as we require the variables
		failJob(client, job)
		return
	}

	variables["totalPrice"] = 46.50
	request, err := client.NewCompleteJobCommand().JobKey(jobKey).VariablesFromMap(variables)
	if err != nil {
		// failed to set the updated variables
		failJob(client, job)
		return
	}

	log.Println("Complete job", jobKey, "of type", job.Type)
	log.Println("Processing order:", variables["orderId"])
	log.Println("Collect money using payment method:", headers["method"])

	ctx := context.Background()
	_, err = request.Send(ctx)
	if err != nil {
		panic(err)
	}

	log.Println("Successfully completed job")
	close(readyClose)
}

func failJob(client worker.JobClient, job entities.Job) {
	log.Println("Failed to complete job", job.GetKey())

	ctx := context.Background()
	_, err := client.NewFailJobCommand().JobKey(job.GetKey()).Retries(job.Retries - 1).Send(ctx)
	if err != nil {
		panic(err)
	}
}
```

In this example we open a [job worker](/product-manuals/concepts/job-workers.md) for jobs of type `payment-service`.
The job worker will repeatedly poll for new jobs of the type `payment-service` and activate them
subsequently. Each activated job will then be passed to the job handler which implements the business
logic of the job worker. The handler will then complete the job with its result or fail the job if
it encounters a problem while processing the job.

When you have a look at the Zeebe Monitor, then you can see that the workflow instance moved from the first service task to the next one:

When you run the above example you should see similar output:

```
key:2251799813686751 workflows:<bpmnProcessId:"order-process" version:4 workflowKey:2251799813686750 resourceName:"order-process.bpmn" >
workflowKey:2251799813686750 bpmnProcessId:"order-process" version:4 workflowInstanceKey:22517998136
86752
2019/06/06 20:59:50 Complete job 2251799813686760 of type payment-service
2019/06/06 20:59:50 Processing order: 31243
2019/06/06 20:59:50 Collect money using payment method: VISA
```

## What's next?

Yay! You finished this tutorial and learned the basic usage of the Go client.

Next steps:

- Learn more about the [concepts behind Zeebe](/product-manuals/concepts/what-is-camunda-cloud.md)
- Learn more about [BPMN workflows](/reference/bpmn-workflows/bpmn-primer.md)
