---
id: migrate-to-zeebe-user-tasks
title: Migrate to Zeebe user tasks
description: "Learn how to migrate job worker-based user tasks to Zeebe user tasks."
---

import DocCardList from '@theme/DocCardList';
import FormViewer from "@site/src/mdx/FormViewer";
import YesItem from "../tasklist-api-rest/assets/react-components/YesItem";
import NoItem from "../tasklist-api-rest/assets/react-components/NoItem";
import TableTextSmall from "../tasklist-api-rest/assets/react-components/TableTextSmall";
import userTaskMigrationDecisionHelperForm from "../tasklist-api-rest/assets/forms/userTaskMigrationDecisionHelperForm.js";
import "../tasklist-api-rest/assets/css/condensedTable.module.css";
import styles from "../tasklist-api-rest/assets/css/cleanImages.module.css";
import ZeebeTaskSelectionImg from '../tasklist-api-rest/assets/img/zeebe-user-task-selection.png';

Camunda 8.5 introduced a new [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) implementation type: Zeebe user tasks.

Zeebe user tasks have several benefits compared to job worked-based user tasks (which while still supported, are now deprecated with 8.6). Such benefits include:

- Running directly on the automation engine for high performance.
- Removing dependencies and round trips to Tasklist.
- A powerful API that supports the full task lifecycle.

In this guide, you will learn:

- Under which circumstances and when you should migrate.
- How to estimate the impact on a project.
- Steps you need to take for a successful migration without interrupting your operations.

## Decide on your migration path

Zeebe user tasks require migration of the user tasks in both your diagrams and the task API.

With this in mind, you can migrate at your own pace. If you should migrate now or later, and what is required to migrate depends on your current setup and future plans.

### Task type differences

Learn the differences between both task types and make an informed decision, and understand the new capabilities of Zeebe user tasks. Refer to this table for important high-level differences of the two task types:

<table>
    <tr>
        <th></th>
        <th>
            <div>Job worker-based user tasks</div>
            <TableTextSmall>Existing implementation</TableTextSmall>
        </th>
        <th>
            <div>Zeebe user tasks</div>
            <TableTextSmall>Recommended for existing and new projects</TableTextSmall>
        </th>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Implementation location</th>
        <td>Tasklist</td>
        <td>
            <div>Zeebe</div>
            <TableTextSmall>Does not require Tasklist to run</TableTextSmall>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Compatible versions</th>
        <td>8.0 +</td>
        <td>8.5 +</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports Tasklist UI</th>
        <td><YesItem /></td>
        <td><YesItem /></td>
    </tr>
    <tr>
        <th style={{ textAlign: "center" }} colspan={3}>API</th>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports Tasklist API</th>
        <td>
            <YesItem />
            <TableTextSmall>Full support</TableTextSmall>
        </td>
        <td>
            <div>Partially</div>
            <TableTextSmall>Queries, GET tasks, forms, variables</TableTextSmall>
            <TableTextSmall>ℹ  Currently, you must use the Camunda 8 and Tasklist APIs to use Zeebe user tasks</TableTextSmall>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports Camunda 8 API</th>
        <td><NoItem /></td>
        <td>
            <YesItem />
            <TableTextSmall>Task state operations (assign/update/complete)</TableTextSmall>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports job workers</th>
        <td><YesItem /></td>
        <td><NoItem /></td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports task lifecycle events</th>
        <td>
            <NoItem />
            <TableTextSmall>Basic only: created/completed/canceled</TableTextSmall>
        </td>
        <td>
            <YesItem />
            <TableTextSmall>Full lifecycle events including custom actions</TableTextSmall>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports task listeners</th>
        <td><NoItem /></td>
        <td>
            <YesItem />
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "center" }} colspan={3}>Extras</th>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Custom actions/outcomes</th>
        <td><NoItem /></td>
        <td>
            <YesItem />
            <TableTextSmall>Custom actions can be defined on any operation excluding unassign (DELETE assignment, send update beforehand)</TableTextSmall>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports task reports in Optimize</th>
        <td><NoItem /></td>
        <td><YesItem /></td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Recommendations</th>
        <td>
            <TableTextSmall>You can continue to use this task type on existing projects when you have a custom task application running on it and do not require any of the above features.</TableTextSmall>
        </td>
        <td>
            <TableTextSmall>Recommended for existing and new projects when you run Tasklist.</TableTextSmall>
            <TableTextSmall>Migrate existing projects and task applications/clients to this task type when you require one of the features above, or the following use cases:</TableTextSmall>
            <TableTextSmall>
                <ul>
                    <li>Implement a full task lifecycle</li>
                    <li>React on any change/events in tasks, such as assignments, escalations, due date updates, or any custom actions</li>
                    <li>Send notifications</li>
                    <li>Track task or team performance</li>
                    <li>Build an audit log on task events</li>
                    <li>Enrich tasks with business data</li>
                </ul>
            </TableTextSmall>
        </td>
    </tr>
</table>

## Switch the implementation type of user tasks

We recommend you migrate process-by-process, allowing you to thoroughly test the processes in your test environments or via your [CI/CD](/guides/devops-lifecycle/integrate-web-modeler-in-ci-cd.md). To do this, take the following steps:

1. Open a diagram you want to migrate.
2. Click on a user task.
3. Check if the task has an embedded form.
   - If a form is embedded, [transform it into a linked form](/components/modeler/bpmn/user-tasks/user-tasks.md#camunda-form-linked) before you change the task type implementation. Press `Ctrl+Z` or `⌘+Z` to undo if you accidentally removed your embedded form.
4. Open the **Implementation** section in the properties panel.
5. Click the **Type** dropdown and select **Zeebe user task**. The linked form or external form reference will be preserved.

<img src={ZeebeTaskSelectionImg} className={styles.noShadow} style={{width: 341}} alt="Task Type Selection" />

Repeat these steps for all user tasks in the process. Then, deploy the process to your development cluster and test it by running the process and ensuring your custom task applications work.

## Use the Camunda 8 API

:::note
The Tasklist REST API is not deprecated, and you still need it for queries on both task types.
:::

The following table provides a breakdown of which operations are supported in which API, and for which user tasks.

<table style={{ textAlign: "center" }}>
    <tr>
        <th style={{ textAlign: "end" }}>Operation</th>
        <th>Tasklist API</th>
        <th>Camunda 8 API</th>
    </tr>
    <tr>
        <th></th>
        <td style={{color: "gray"}}>Supported from 8.6+</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Query user task</th>
        <td><span style={{ color: "green" }}>✔</span> Job worker-based user tasks</td>
        <td><span style={{ color: "green" }}>✔</span> Zeebe user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Get user task</th>
        <td><span style={{ color: "green" }}>✔</span> Job worker-based user tasks</td>
        <td><span style={{ color: "green" }}>✔</span> Zeebe user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Retrieve task variables</th>
        <td><span style={{ color: "green" }}>✔</span> Job worker-based user tasks</td>
        <td><span style={{ color: "green" }}>✔</span> Zeebe user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Get user task form</th>
        <td><span style={{ color: "green" }}>✔</span> Job worker-based user tasks</td>
        <td><span style={{ color: "green" }}>✔</span> Zeebe user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Change task assignment</th>
        <td><span style={{ color: "green" }}>✔</span> Job worker-based user tasks</td>
        <td><span style={{ color: "green" }}>✔</span> Zeebe user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Complete task</th>
        <td><span style={{ color: "green" }}>✔</span> Job worker-based user tasks</td>
        <td><span style={{ color: "green" }}>✔</span> Zeebe user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Update task</th>
        <td>-</td>
        <td><span style={{ color: "green" }}>✔</span> Zeebe user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Save and retrieve draft variables</th>
        <td><span style={{ color: "green" }}>✔</span> Job worker-based user tasks</td>
        <td style={{color: "gray"}}> -</td>
    </tr>
</table>

The following table outlines the respective endpoints. Click the endpoints to follow to the API documentation and inspect the differences in the request and response objects.

<table style={{ textAlign: "center" }}>
    <tr>
        <th style={{ textAlign: "end" }}>Operation</th>
        <th>Tasklist API</th>
        <th>Camunda 8 API</th>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Assign a task</th>
        <td>
            <a href="../../tasklist-api-rest/specifications/assign-task/">
                <code>PATCH /tasks/:taskId/assign</code>
            </a>
        </td>
        <td>
            <a href="../../camunda-api-rest/specifications/assign-user-task">
                <code>POST /user-tasks/:userTaskKey/assignment</code>
            </a>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Unassign a task</th>
        <td>
            <a href="../../tasklist-api-rest/specifications/unassign-task/">
                <code>PATCH /tasks/:taskId/unassign</code>
            </a>
        </td>
        <td>
            <a href="../../camunda-api-rest/specifications/unassign-user-task">
                <code>DELETE /user-tasks/:userTaskKey/assignee</code>
            </a>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Complete task</th>
        <td>
            <a href="../../tasklist-api-rest/specifications/complete-task/">
                <code>PATCH /tasks/:taskId/complete</code>
            </a>
        </td>
        <td>
            <a href="../../camunda-api-rest/specifications/complete-user-task">
                <code>POST /user-tasks/:userTaskKey/completion</code>
            </a>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Update task</th>
        <td style={{color: "gray"}}>-</td>
        <td>
            <a href="../../camunda-api-rest/specifications/update-user-task">
                <code>PATCH /user-tasks/:userTaskKey</code>
            </a>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Save and retrieve draft variables</th>
        <td>
            <a href="../../tasklist-api-rest/specifications/save-draft-task-variables/">
                <code>POST /tasks/:taskId/variables</code>
            </a>
        </td>
        <td style={{color: "gray"}}>-</td>
    </tr>
</table>

### Zeebe Java client

Use the Zeebe Java client when you are building your task application in Java. The client assists with managing authentication and request/response objects.

### API differences

<!-- TODO two cards to link to boh API docs, once available -->

Refer to the dedicated sections and API explorers to learn details about the APIs.

<DocCardList items={[
{
type:"link",
href:"../../tasklist-api-rest/tasklist-api-rest-overview/",
label: "Tasklist API (REST)",
docId:"apis-tools/tasklist-api-rest/tasklist-api-rest-overview"
},
{
type:"link",
href:"../../camunda-api-rest/camunda-api-rest-overview/",
label: "Camunda 8 API (REST)",
docId:"apis-tools/camunda-api-rest/camunda-api-rest-overview"
}
]}/>

## Troubleshooting and common issues

If your task application does not work properly after migration, check the following:

- **The endpoints return specific error messages when you run them on the wrong task type**: Ensure to call the right endpoint for the right task type, c.f. above [table](#use-the-new-camunda-8-api).
- **Forms do not appear**: Ensure you have extracted embedded forms, if any, and [transformed them into linked forms](/components/modeler/bpmn/user-tasks/user-tasks.md#camunda-form-linked), before you change the task type implementation.
- **Task update operation does not work**: The update operation is only available to Zeebe user tasks.
