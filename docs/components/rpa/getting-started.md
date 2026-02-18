---
id: getting-started
title: Get started with RPA
description: Learn how to create, test, and automate RPA scripts.
---

import RpaEditorInitial from './img/rpa-editor-initial.png';
import RpaEditorResults from './img/rpa-editor-results.png';
import RpaTaskAppend from './img/create-new-task.png';
import RpaTaskConfig from './img/rpa-task-configuration.png';

Use the RPA worker and Camunda Modeler to create, test, and automate RPA scripts.

## About the RPA worker

The RPA worker is available on all major platforms (Windows, Linux, and macOS). This lets you automate applications on their native platforms, which is typically Windows. For console applications or browser automation, you can use a lightweight distribution such as this [Docker image](../../../self-managed/deployment/docker/).

## Create your first script

Get started with RPA by creating your first RPA script. [Camunda Modeler](/components/modeler/about-modeler.md) offers an interface for editing and testing your scripts:

1. **Download Camunda Modeler**: Download the latest version of Camunda Modeler from the [Camunda website](https://camunda.com/download/modeler/). Because RPA scripts run locally, the RPA editor is only available in [Desktop Modeler](../../modeler/desktop-modeler/).
2. **Open the RPA script editor**: Open Desktop Modeler and navigate to the RPA script editor under **Testing**.
   <img src={RpaEditorInitial} alt="RPA editor interface showing the initial script view in Desktop Modeler" class="img-noborder img-transparent" style={{padding:0,margin:0}} />

3. **Write your RPA script using Robot Framework**: Use the editor to create your first RPA script. Scripts use the [Robot Framework](https://robotframework.org/) syntax.

## Test your script

Once you have written your script, you can test it on a local RPA worker.

1. **Start the RPA worker**:
   1. Download the latest version of the [RPA worker](https://github.com/camunda/rpa-worker/releases).
   2. Unpack the `rpa-worker_*.zip` file. The zip archive contains the worker executable and an example configuration file.
   3. Start the worker by running the executable.

2. **Check Desktop Modeler**: Ensure the RPA worker is connected to Desktop Modeler. The worker should automatically connect. If not, click on the connection status to display additional configuration options.

3. **Test the script**:
   1. Click the test tube (🧪) icon in the footer of Desktop Modeler to open the run dialog. Add any variables required by the process in JSON format. Once you start the execution, the execution tab will open.
   2. Review the execution log and the variables created during the script execution within Modeler.

      <img src={RpaEditorResults} alt="RPA testing panel in Desktop Modeler showing execution results" class="img-noborder img-transparent" style={{padding:0,margin:0}} />

## Automate execution

Once you are happy with your script and have tested it locally, you can start automating it with Camunda.

### Link RPA task to BPMN

1. **Deploy the RPA file**:
   1. If you have not already, [set up client connection credentials](../../console/manage-clusters/manage-api-clients/#create-a-client) for your Modeler.
   2. Assign the **RPA role** to the client in the [Orchestration Cluster Identity](../../identity/role/#assign-client-to-a-role).
   3. Deploy your RPA script file by clicking on the rocket (🚀) icon in Modeler.
   4. Note the ID of your RPA script. You will need this in the next step.

2. **Add RPA to your process**:
   1. In Camunda Modeler, create a new BPMN file or open an existing one.
   2. Add a new task and change the type to an RPA connector.
      <img src={RpaTaskAppend} alt="Appending an RPA task in Camunda Modeler" class="img-noborder img-transparent" style={{padding:0,margin:0}} />

   3. Configure the task with the script ID from the previous step. Add any input mappings required for your script to work.
      <img src={RpaTaskConfig} alt="Configuring an RPA task in Camunda Modeler" class="img-noborder img-transparent" style={{padding:0,margin:0}} />

3. **Deploy and run the process**:
   1. Deploy the BPMN model with the configured RPA task by clicking on the rocket (🚀) icon in Modeler.
   2. Start an instance of your process.

### Connect worker to Zeebe

The last step is to configure the RPA worker to pick up the jobs from Camunda.

1. **Create credentials for the worker**:
   1. Create the necessary worker credentials in Console. You can follow the same steps as for the Modeler credentials. Give your new client the `Zeebe` and `Secrets` scopes.
   2. Add the generated credentials to your `application.properties` in the same directory as your RPA worker executable.

2. **Restart the worker**: If your worker is still running, restart it to apply the new credentials. The RPA worker should now be connected and ready to execute scripts from Zeebe.

## Interact with the process

Now that you have integrated your first script, it can be part of a larger BPMN process. The main interaction between the script and your process will be the variables and documents.

### Variables

Process variables will be mapped to robot variables automatically. Use the `Camunda` library and the `Set Output Variable` keyword to set return variables.

In this example, the input would be the following:

```Robot
*** Settings ***
Library             Camunda

*** Tasks ***
Log X
    Log                    Process variable 'x' is set to ${x}
    Set Output Variable    result    We logged x
```

### Documents

:::note
Multiple Camunda components can create documents. Visit our [concepts page](/components/document-handling/getting-started.md) to learn how Camunda handles binary data.
:::

Documents managed by Camunda can be consumed or created by an RPA script. Use `Download Documents` to resolve a document descriptor to a file and `Upload Documents` to create a document descriptor from a file.

The script below downloads a file, appends a line, and uploads the document with the same variable name:

```Robot
*** Settings ***
Library             Camunda
Library             Camunda.FileSystem

*** Tasks ***
Log Operation
    ${path}=    Download Documents     ${operationLog}
    Append To File    ${path}     new Line, appended by RPA script
    Upload Documents    ${path}     operationLog
```

### Handling exceptions

You can handle problems in your tasks in two ways: exceptions and errors. See Camunda [best practices](/components/best-practices/development/dealing-with-problems-and-exceptions.md) to understand which strategy is best for your case.

#### Incidents

If your RPA script runs into an unexpected error during execution, this error (alongside the output) will be reported to Zeebe. If the job retries are exceeded, an [incident](/components/concepts/incidents.md) will be created in [Operate](/components/operate/operate-introduction.md).

To ensure your environment is always clean and all open applications are closed, create a cleanup step and tag it as `[Teardown]`. See the [Robot Framework documentation](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#user-keyword-setup-and-teardown) for details on setup and teardown.

```
*** Settings ***
Library             Camunda
Library             Camunda.Browser.Selenium

*** Tasks ***
Main
    Perform Work
    [Teardown]    Cleanup

*** Keywords ***
Perform Work
    Open Browser      about:blank
    Fail

Cleanup
    # Close your application, even when encountering errors
    Close All Browsers
```

#### BPMN errors

If you encounter an error that should be handled as a BPMN error, you can use the `Throw BPMN Error` keyword. Instead of creating an incident, this will create a [BPMN error](/components/best-practices/development/dealing-with-problems-and-exceptions.md#handling-errors-on-the-process-level).

:::note
A BPMN error cannot be caught in the script. It always stops the script execution and initiates the teardown procedure.
:::

```robot
*** Settings ***
Library             Camunda

*** Tasks ***
Log Operation
    Throw BPMN Error     MY_ERROR_CODE       We encountered a business error
    [Teardown]    Log    Teardown is still executed
```

### Shared script resources

Multiple script files are not supported. Each task should be contained within a single script. You can use [pre-run and post-run scripts](/components/rpa/production.md#pre--and-post-run-scripts) for environment setup and cleanup.
