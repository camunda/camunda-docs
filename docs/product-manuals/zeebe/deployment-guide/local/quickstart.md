---
id: quickstart
title: "Quickstart"
---

This quickstart guide introduces you the main concepts of Zeebe without
the need to write a single line of code in 5 steps.

## Step 1: Download the Zeebe distribution

You can download the latest distribution from the [Zeebe release page](https://github.com/camunda-cloud/zeebe/releases).

Extract the archive and enter the Zeebe directory.

```
tar -xzvf zeebe-distribution-X.Y.Z.tar.gz
cd zeebe-broker-X.Y.Z/
```

**Note:** Some command examples might not work on Windows if you use cmd or
Powershell. For Windows users we recommend to use a bash-like shell, i.e. Git
Bash, Cygwin or MinGW for this guide.

Inside the Zeebe directory you will find multiple directories.

```
tree -d
```

```
.
├── bin     - Binaries and start scripts of the distribution
├── conf    - Zeebe and logging configuration
└── lib     - Shared java libraries
```

## Step 2: Start the Zeebe broker

To start a Zeebe broker use the `broker` or `broker.bat` file located in the
`bin/` folder.

```
./bin/broker
```

```
23:39:13.246 [] [main] INFO  io.camunda.zeebe.broker.system - Scheduler configuration: Threads{cpu-bound: 2, io-bound: 2}.
23:39:13.270 [] [main] INFO  io.camunda.zeebe.broker.system - Version: X.Y.Z
23:39:13.273 [] [main] INFO  io.camunda.zeebe.broker.system - Starting broker with configuration {
```

You will see some output which contains the version of the broker and
configuration parameters like directory locations and API socket addresses.

To continue this guide open another terminal to execute commands using the
Zeebe CLI `zbctl`.

We can now check the status of the Zeebe broker.

> **Note:** By default, the embedded gateway listens to a plaintext connection but the clients are configured to use TLS. Therefore, all `zbctl` commands in the quickstart will specify the `--insecure` flag.

```
./bin/zbctl --insecure status
```

```
Cluster size: 1
Partitions count: 1
Replication factor: 1
Brokers:
  Broker 0 - 0.0.0.0:26501
    Partition 1 : Leader
```

## Step 3: Deploy a process

A [process](/product-manuals/concepts/processes.md) is used to orchestrate loosely coupled job
workers and the flow of data between them.

In this guide we will use an example process `order-process.bpmn`. You can
download it with the following link:
[order-process.bpmn](assets/order-process.bpmn).

![order-process](assets/order-process.png)

The process describes a sequential flow of three tasks _Collect Money_, _Fetch
Items_ and _Ship Parcel_. If you open the `order-process.bpmn` file in a text
editor you will see that every task has an attribute `type` defined in the XML
which is later used as job type.

```
<!-- [...] -->
<bpmn:serviceTask id="collect-money" name="Collect Money">
  <bpmn:extensionElements>
    <zeebe:taskDefinition type="payment-service" />
  </bpmn:extensionElements>
</bpmn:serviceTask>
<!-- [...] -->
<bpmn:serviceTask id="fetch-items" name="Fetch Items">
  <bpmn:extensionElements>
    <zeebe:taskDefinition type="inventory-service" />
  </bpmn:extensionElements>
</bpmn:serviceTask>
<!-- [...] -->
<bpmn:serviceTask id="ship-parcel" name="Ship Parcel">
  <bpmn:extensionElements>
    <zeebe:taskDefinition type="shipment-service" />
  </bpmn:extensionElements>
</bpmn:serviceTask>
<!-- [...] -->
```

To complete an instance of this process we would need to activate and complete one job for each of
the types `payment-service`, `inventory-service` and `shipment-service`.

But first let's deploy the process to the Zeebe broker.

```
./bin/zbctl --insecure deploy order-process.bpmn
```

```
{
  "key": 2251799813685250,
  "processes": [
    {
      "bpmnProcessId": "order-process",
      "version": 1,
      "processKey": 2251799813685249,
      "resourceName": "order-process.bpmn"
    }
  ]
}
```

## Step 4: Create a process instance

After the process is deployed we can create new instances of it. Every
instance of a process is a single execution of the process. To create a new
instance we have to specify the process ID from the BPMN file, in
our case the ID is `order-process` as defined in the `order-process.bpmn`:

```
<bpmn:process id="order-process" isExecutable="true">
```

Every instance of a process normally processes some kind of data. We can
specify the initial data of the instance as variables when we start the instance.

> **Note:** Windows users who want to execute this command using cmd or Powershell
> have to escape the variables differently.
>
> - cmd: `"{\"orderId\": 1234}"`
> - Powershell: `'{"\"orderId"\": 1234}'`

```
./bin/zbctl --insecure create instance order-process --variables '{"orderId": 1234}'
```

```
{
  "processKey": 2251799813685249,
  "bpmnProcessId": "order-process",
  "version": 1,
  "processInstanceKey": 2251799813685251
}
```

## Step 5: Complete a process instance

To complete the instance all three tasks have to be executed. In Zeebe a job is
created for every task which is reached during process instance execution. In
order to finish a job and thereby the corresponding task it has to be activated
and completed by a [job worker](/product-manuals/concepts/job-workers.md). A job worker is a
long living process which repeatedly tries to activate jobs for a given job
type and completes them after executing its business logic. The `zbctl` also
provides a command to spawn simple job workers using an external command or
script. The job worker will receive for every job the process instance variables as JSON object on
`stdin` and has to return its result also as JSON object on `stdout` if it
handled the job successfully.

In this example we use the unix command `cat` which just outputs what it receives
on `stdin`. To complete a process instance we now have to create a job worker for
each of the three task types from the process definition: `payment-service`,
`inventory-service` and `shipment-service`.

> **Note:** For Windows users this command does not work with cmd as the `cat`
> command does not exist. We recommend to use Powershell or a bash-like shell
> to execute this command.

```
./bin/zbctl --insecure create worker payment-service --handler cat &
./bin/zbctl --insecure create worker inventory-service --handler cat &
./bin/zbctl --insecure create worker shipment-service --handler cat &
```

```
2019/06/06 20:54:36 Handler completed job 2251799813685257 with variables
{"orderId":1234}
2019/06/06 20:54:36 Activated job 2251799813685264 with variables
{"orderId":1234}
2019/06/06 20:54:36 Handler completed job 2251799813685264 with variables
{"orderId":1234}
2019/06/06 20:54:36 Activated job 2251799813685271 with variables
{"orderId":1234}
2019/06/06 20:54:36 Handler completed job 2251799813685271 with variables
{"orderId":1234}
```

After the job workers are running in the background we can create more instances
of our process to observe how the workers will complete them.

```
./bin/zbctl --insecure create instance order-process --variables '{"orderId": 12345}'
```

To close all job workers use the `kill` command to stop the background processes.

```
kill %1 %2 %3
```

If you want to visualize the state of the process instances you can start the
[Zeebe simple monitor](https://github.com/camunda-community-hub/zeebe-simple-monitor), a community maintained project.
