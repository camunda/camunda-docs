---
id: test-scenario-files
title: Test scenario files
description: Define shareable, low-code tests for your BPMN processes
---

<span class="badge badge--cloud">Camunda 8 only</span>

Test scenario files allow you to define shareable, low-code tests for your BPMN processes.

These files are stored in JSON format and can be created, edited, and managed directly within Web Modeler. You can also download these files or synchronize them with your Git repository using Git Sync.

## Creating a test scenario file

Create a test scenario file by [saving a scenario in Play](../play-your-process.md#save-scenario), or by manually creating a **test scenario file** in Web Modeler.

## Manual editing

### Test case structure

Test scenario files are organized as follows:

```json
{
  "processId": "order-fulfillment-process",
  "testCases": [
    {
      "name": "Happy path order processing",
      "instructions": [
        // Array of instruction objects
      ],
      "metadata": {
        // Optional - for use in Play only
        "processInstanceId": 12345,
        "coveredFlowNodes": [
          { "flowNodeId": "startEvent", "elementType": "START_EVENT" },
          { "flowNodeId": "processOrder", "elementType": "SERVICE_TASK" }
        ],
        "coveredSequenceFlows": ["flow1", "flow2"]
      }
    },
    {
      "name": "Error handling scenario",
      "instructions": [
        // Array of instruction objects for error case
      ]
    }
  ]
}
```

**Top-level fields:**

- `processId` (required): The ID of the BPMN process definition that these test cases will execute against
- `testCases` (required): Array of test case objects

**Test case fields:**

- `name` (optional): Descriptive name for the test case scenario
- `instructions` (required): Array of instruction objects that define the test steps
- `metadata` (optional): Used by Play to show coverage and process instance information. Camunda does not recommend editing this field.

### Linking a process (processId)

To show the file's scenarios in Play, you first need to link the file to the process.

Add a `processId` field with the process ID of the BPMN process you want to test.

```json
{
  "processId": "Process_1"
}
```

:::note
Play will only run the first executable process within the BPMN diagram. Ensure the process ID you link to is the first executable process.
:::

### Unlinking a process

Remove the `processId` field or set it to null to unlink the file from the process.

## Instructions

### Common patterns

- **Variables**: When specified, variables should be provided as JSON strings
- **Element IDs**: Reference specific BPMN elements in your process definition
- **Process definition IDs**: Identify which process definition to interact with

---

### Update variables

Updates process variables during test execution.

**Fields:**

- `type` (required): Must be `"update-variables"`
- `variables` (required): JSON string containing the variables to update

**Example:**

```json
{
  "type": "update-variables",
  "variables": "{\"customerId\": \"12345\", \"amount\": 100.50}"
}
```

---

### Create process instance

Creates a new process instance from a process definition.

**Fields:**

- `type` (required): Must be `"create-process-instance"`
- `processDefinitionId` (required): The ID of the process definition to instantiate
- `variables` (optional): JSON string containing initial process variables

**Example:**

```json
{
  "type": "create-process-instance",
  "processDefinitionId": "order-process",
  "variables": "{\"orderId\": \"ORD-001\", \"priority\": \"high\"}"
}
```

---

### Create process instance by message

Creates a new process instance by sending a message to a message start event.

**Fields:**

- `type` (required): Must be `"create-process-instance-by-message"`
- `processDefinitionId` (required): The ID of the process definition to instantiate
- `messageName` (required): The name of the message that triggers the process start
- `variables` (optional): JSON string containing initial process variables

**Example:**

```json
{
  "type": "create-process-instance-by-message",
  "processDefinitionId": "message-triggered-process",
  "messageName": "OrderReceived",
  "variables": "{\"orderData\": \"sample data\"}"
}
```

---

### Create process instance by signal

Creates a new process instance by broadcasting a signal to a signal start event.

**Fields:**

- `type` (required): Must be `"create-process-instance-by-signal"`
- `processDefinitionId` (required): The ID of the process definition to instantiate
- `signalName` (required): The name of the signal that triggers the process start
- `variables` (optional): JSON string containing initial process variables

**Example:**

```json
{
  "type": "create-process-instance-by-signal",
  "processDefinitionId": "signal-triggered-process",
  "signalName": "MarketOpened",
  "variables": "{\"marketData\": \"current rates\"}"
}
```

---

### Complete job

Completes a service task job during process execution.

**Fields:**

- `type` (required): Must be `"complete-job"`
- `jobType` (required): The task's job type (also known as task definition type)
- `elementId` (required): The ID of the BPMN element (service task) to complete
- `variables` (optional): JSON string containing variables to set when completing the job

**Example:**

```json
{
  "type": "complete-job",
  "jobType": "payment-service",
  "elementId": "processPayment",
  "variables": "{\"paymentResult\": \"success\", \"transactionId\": \"TXN-123\"}"
}
```

---

### Broadcast signal

Broadcasts a signal that can be caught by signal intermediate catch events or signal boundary events.

**Fields:**

- `type` (required): Must be `"broadcast-signal"`
- `elementId` (required): The ID of the BPMN element that will catch the signal
- `signalName` (required): The name of the signal to broadcast
- `variables` (optional): JSON string containing variables to pass with the signal

**Example:**

```json
{
  "type": "broadcast-signal",
  "elementId": "waitForApproval",
  "signalName": "ApprovalReceived",
  "variables": "{\"approved\": true, \"approver\": \"manager@company.com\"}"
}
```

---

### Complete user task

Completes a user task with optional form data or variables.

**Fields:**

- `type` (required): Must be `"complete-user-task"`
- `elementId` (required): The ID of the BPMN user task element to complete
- `variables` (optional): JSON string containing form data or variables to submit

**Example:**

```json
{
  "type": "complete-user-task",
  "elementId": "reviewOrder",
  "variables": "{\"reviewComment\": \"Order looks good\", \"approved\": true}"
}
```

---

### Publish message

Publishes a message that can be caught by message intermediate catch events or message boundary events.

**Fields:**

- `type` (required): Must be `"publish-message"`
- `elementId` (required): The ID of the BPMN element that will catch the message
- `messageName` (required): The name of the message to publish
- `correlationKey` (required): The correlation key used to match the message to the correct process instance
- `variables` (optional): JSON string containing variables to pass with the message
- `timeToLive` (optional): How long the message should remain available for correlation, specified in milliseconds as a string (for example, "300000" for five minutes)
- `messageId` (optional): Unique identifier for the message to prevent duplicate processing

**Example:**

```json
{
  "type": "publish-message",
  "elementId": "waitForPayment",
  "messageName": "PaymentConfirmed",
  "correlationKey": "order-12345",
  "variables": "{\"paymentAmount\": 99.99, \"paymentMethod\": \"credit_card\"}",
  "timeToLive": "300000",
  "messageId": "payment-msg-001"
}
```

---

### Throw job error

Simulates a job failure by throwing an error during service task execution.

**Fields:**

- `type` (required): Must be `"throw-job-error"`
- `elementId` (required): The ID of the BPMN service task element where the error occurs
- `errorCode` (required): The error code that will be matched with an error catch event
- `jobType` (optional): The type of job that failed (useful when multiple job types exist for the same element)
- `errorMessage` (optional): Human-readable description of the error

**Example:**

```json
{
  "type": "throw-job-error",
  "elementId": "processPayment",
  "errorCode": "PAYMENT_FAILED",
  "jobType": "payment-service",
  "errorMessage": "Insufficient funds in customer account"
}
```

---

### Resolve incident

Resolves an incident that was created due to a job failure or other process issue.

**Fields:**

- `type` (required): Must be `"resolve-incident"`
- `elementId` (required): The ID of the BPMN element where the incident occurred
- `hasJob` (required): Boolean indicating whether the incident is related to a job that should be retried after resolution

**Example:**

```json
{
  "type": "resolve-incident",
  "elementId": "processPayment",
  "hasJob": true
}
```

---

## Usage tips

- Always specify meaningful `elementId` values that match your BPMN diagram.
- Use descriptive test case names to clearly indicate what scenario is being tested.
- Include error scenarios alongside happy path tests.
- Leverage optional `variables` fields to test different data conditions.
- When using correlation keys, ensure they uniquely identify process instances.
- For `timeToLive` values, remember to specify milliseconds as a string (for example, "60000" for one minute, "300000" for five minutes).
