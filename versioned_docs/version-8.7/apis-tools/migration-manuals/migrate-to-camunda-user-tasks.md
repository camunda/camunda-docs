---
id: migrate-to-camunda-user-tasks
title: Migrate to Camunda user tasks
description: "Learn how to migrate job worker-based user tasks to Camunda user tasks."
---

import DocCardList from '@theme/DocCardList';
import FormViewer from "@site/src/mdx/FormViewer";
import YesItem from "../tasklist-api-rest/assets/react-components/YesItem";
import NoItem from "../tasklist-api-rest/assets/react-components/NoItem";
import TableTextSmall from "../tasklist-api-rest/assets/react-components/TableTextSmall";
import userTaskMigrationDecisionHelperForm from "../tasklist-api-rest/assets/forms/userTaskMigrationDecisionHelperForm.js";
import "../tasklist-api-rest/assets/css/condensedTable.module.css";
import styles from "../tasklist-api-rest/assets/css/cleanImages.module.css";
import CamundaUserTaskSelectionImg from '../tasklist-api-rest/assets/img/camunda-user-task-selection.png';

Camunda 8.5 introduced a new [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) implementation type: Camunda user task.

Camunda user tasks have several benefits compared to Job worked-based user tasks, including:

- Running directly on the automation engine for high performance.
- Removing dependencies and round trips to Tasklist.
- A powerful API that supports the full task lifecycle.

In this guide, you will learn:

- Under which circumstances and when you should migrate.
- How to estimate the impact on a project.
- Steps you need to take for a successful migration without interrupting your operations.

## Decide on your migration path

Camunda user tasks require migration of the user tasks in both your diagrams and the task API.

With this in mind, you can migrate at your own pace. If you should migrate now or later, and what is required to migrate depends on your current setup and future plans.

### Task type differences

To make an informed decision, you should understand the differences between both task types and the new capabilities of Camunda user tasks. Refer to this table for important high-level differences between the two task types:

<table>
    <tr>
        <th></th>
        <th>
            <div>Camunda user tasks</div>
            <TableTextSmall>Recommended for new and existing projects</TableTextSmall>
        </th>
        <th>
            <div>Job worker-based user tasks</div>
            <TableTextSmall>Existing implementation</TableTextSmall>
        </th>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Implementation location</th>
        <td>
            <div>Zeebe</div>
            <TableTextSmall>Does not require Tasklist to run</TableTextSmall>
        </td>
        <td>Tasklist</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Compatible versions</th>
        <td>8.5 +</td>
        <td>8.0 +</td>
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
        <th style={{ textAlign: "end" }}>Supports Camunda 8 API</th>
        <td>
            <YesItem />
            <TableTextSmall>Full support</TableTextSmall>
        </td>
        <td><NoItem /></td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports Tasklist API (deprecated)</th>
        <td>
            <div>Partially</div>
            <TableTextSmall>Queries, GET tasks, forms, variables</TableTextSmall>
            <TableTextSmall>ℹ  You must use Zeebe and Tasklist APIs to manage Camunda user tasks</TableTextSmall>
        </td>
        <td>
            <YesItem />
            <TableTextSmall>Full support</TableTextSmall>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports job workers</th>
        <td><NoItem /></td>
        <td><YesItem /></td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports task lifecycle events</th>
        <td>
            <YesItem />
            <TableTextSmall>Full lifecycle events including custom actions</TableTextSmall>
        </td>
        <td>
            <NoItem />
            <TableTextSmall>Basic only: created/completed/canceled</TableTextSmall>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports task listeners</th>
        <td>
            <YesItem />
        </td>
        <td><NoItem /></td>
    </tr>
    <tr>
        <th style={{ textAlign: "center" }} colspan={3}>Extras</th>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Custom actions/outcomes</th>
        <td>
            <YesItem />
            <TableTextSmall>Custom actions can be defined on any operation excluding unassign (DELETE assignment, send update beforehand)</TableTextSmall>
        </td>
        <td><NoItem /></td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Supports task reports in Optimize</th>
        <td><YesItem /></td>
        <td><NoItem /></td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Recommendations</th>
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
        <td>
            <TableTextSmall>You can continue to use this task type on existing projects when you have a custom task application running on it and do not require any of the above features.</TableTextSmall>
        </td>
    </tr>
</table>

## Change the implementation type of user tasks

We recommend you migrate process-by-process, allowing you to thoroughly test the processes in your test environments or via your [CI/CD](/guides/devops-lifecycle/integrate-web-modeler-in-ci-cd.md). To do this, take the following steps:

1. Open a diagram you want to migrate.
2. Click on a user task.
3. Check if the task has an embedded form.
   - If a form is embedded, [transform it into a linked form](/components/modeler/bpmn/user-tasks/user-tasks.md#camunda-form-linked) before you change the task type implementation. Press `Ctrl+Z` or `⌘+Z` to undo if you accidentally removed your embedded form.
4. Open the **Implementation** section in the properties panel.
5. Click the **Type** dropdown and select **Camunda user task**. The linked form or external form reference will be preserved.

<img src={CamundaUserTaskSelectionImg} className={styles.noShadow} style={{width: 341}} alt="Task Type Selection" />

Repeat these steps for all user tasks in the process. Then, deploy the process to your development cluster and test it by running the process and ensuring your custom task applications work.

## How Tasklist API (V1) compares to Camunda 8 API (V2)

:::note
The Tasklist REST API is deprecated and will be deleted with the 8.9 release.
:::

The following table provides a breakdown of which operations are supported in which API, and for which user tasks.

<table style={{ textAlign: "center" }}>
    <tr>
        <th style={{ textAlign: "end" }}>Operation</th>
        <th>Tasklist API</th>
        <th>Camunda 8 API</th>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Query tasks</th>
        <td><span style={{ color: "green" }}>✔</span> All types</td>
        <td><span style={{ color: "green" }}>✔</span> Camunda user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Get task</th>
        <td><span style={{ color: "green" }}>✔</span> All types</td>
        <td><span style={{ color: "green" }}>✔</span> Camunda user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Retrieve task variables</th>
        <td><span style={{ color: "green" }}>✔</span> All types</td>
        <td><span style={{ color: "green" }}>✔</span> Camunda user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Get task form</th>
        <td><span style={{ color: "green" }}>✔</span> All types</td>
        <td><span style={{ color: "green" }}>✔</span> Camunda user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Change task assignment</th>
        <td><span style={{ color: "green" }}>✔</span> Job worker-based tasks</td>
        <td><span style={{ color: "green" }}>✔</span> Camunda user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Complete task</th>
        <td><span style={{ color: "green" }}>✔</span> Job worker-based tasks</td>
        <td><span style={{ color: "green" }}>✔</span> Camunda user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Update task</th>
        <td style={{ color: "gray" }}>Not supported</td>
        <td><span style={{ color: "green" }}>✔</span> Camunda user tasks</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Safe and retrieve draft variables</th>
        <td><span style={{ color: "green" }}>✔</span> Job worker-based tasks</td>
        <td style={{ color: "gray" }}>Not supported</td>
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
        <th style={{ textAlign: "end" }}>Query user tasks</th>
        <td>
            <a href="../../tasklist-api-rest/specifications/search-tasks">
                <code>POST /tasks/search</code>
            </a>
        </td>
        <td>
            <a href="../../camunda-api-rest/specifications/query-user-tasks-alpha">
                <code>POST /user-tasks/search</code>
            </a>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Get user task</th>
        <td>
            <a href="../../tasklist-api-rest/specifications/get-task-by-id/">
                <code>GET /tasks/:taskId</code>
            </a>
        </td>
        <td style={{color: "gray"}}>-</td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Retrieve task variables</th>
        <td>
            <a href="../../tasklist-api-rest/specifications/get-variable-by-id/">
                <code>GET /variables/:variableId</code>
            </a>
        </td>
        <td>
            <a href="../../tasklist-api-rest/specifications/search-task-variables">
                <code>POST /tasks/:taskId/variables/search</code>
            </a>
        </td>
    </tr>
    <tr>
        <th style={{ textAlign: "end" }}>Get task form</th>
        <td>
            <a href="../../tasklist-api-rest/specifications/get-form/">
                <code>GET /forms/:formId</code>
            </a>
        </td>
        <td style={{color: "gray"}}>-</td>
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
        <td style={{color: "gray"}}>Not supported</td>
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
href:"/docs/next/apis-tools/tasklist-api-rest/tasklist-api-rest-overview/",
label: "Tasklist API (REST)",
docId:"apis-tools/tasklist-api-rest/tasklist-api-rest-overview"
},
{
type:"link",
href:"/docs/next/apis-tools/camunda-api-rest/camunda-api-rest-overview/",
label: "Camunda 8 API (REST)",
docId:"apis-tools/camunda-api-rest/camunda-api-rest-overview"
}
]}/>

## Troubleshooting and common issues

If your task application does not work properly after migration, check the following:

- **The endpoints return specific error messages when you run them on the wrong task type**: Ensure to call the right endpoint for the right task type, c.f. above [table](#use-the-new-camunda-8-api).
- **Forms do not appear**: Ensure you have extracted embedded forms, if any, and [transformed them into linked forms](/components/modeler/bpmn/user-tasks/user-tasks.md#camunda-form-linked), before you change the task type implementation.
- **Task update operation does not work**: The update operation is only available to Camunda user tasks.
