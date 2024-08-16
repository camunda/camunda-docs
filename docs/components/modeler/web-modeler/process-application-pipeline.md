---
id: process-application-pipeline
title: Process application development pipeline
description: The Web Modeler provides a lightweight development pipeline you can use to quickly develop and progress low-risk process application releases through the stages of a standard development life cycle.
---

import DeployProcessApplicationDiagramImg from './img/process-applications/diagram-process-application-pipeline.png'

The Web Modeler provides a lightweight development pipeline you can use to quickly develop and progress low-risk process application releases through the stages of a standard development life cycle.

<p><img src={DeployProcessApplicationDiagramImg} alt="Process application file list" /></p>

:::caution
For business-critical and higher-risk processes that require strict governance and/or quality requirements, you can [integrate Web Modeler into your CI/CD pipelines](/docs/guides/devops-lifecycle/integrate-web-modeler-in-ci-cd.md).
:::

### Deployment stages

When you create a process application, you select a default development cluster to deploy to during development.

You can also choose to define and deploy to different stages/clusters, allowing you to promote an application process version between stages in a development life cycle. You can define and deploy to the following stages:

| Stage       | Description                                                                                                     |
| :---------- | :-------------------------------------------------------------------------------------------------------------- |
| Development | Use to create and test new software features and changes.                                                       |
| Testing     | Use for quality checks, ensuring software meets defined standards before release.                               |
| Staging     | Use for controlled testing where changes are validated before deployment to production.                         |
| Production  | The live system with the latest software. Only administrators and organization owners can deploy to this stage. |

:::note

- An administrator should define the stages and clusters within Web Modeler.
- During deployment, the next stage is not automatically selected. You must choose the stage you want to promote to.

:::

### Design and modeling

If you choose to use this pipeline, the following features are helpful during design and modeling.

- Use token simulation to correct and optimize your process flow.
- Use Play mode to quickly validate the process behavior after you have added implementation details.
- Use versioning to track and review changes across assets in the process application.
  - For example, visually review changes between two versions of a BPPMN file, or view code changes for other files.
  - Add a comment to the main process diagram to indicate that a review is complete and that the process application can be promoted to the next stage.

### Process governance

The Web Modeler development pipeline offers the following process governance:

| Governance         | Description                                                                                                                                                                                                                                                                                                     |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Change control     | Users can announce a review is complete by adding a comment to the main process diagram.                                                                                                                                                                                                                        |
| Deployment control | <p><ul><li><p>Deployments can only be made to the pre-defined set of approved clusters.</p></li><li>Only users with the right privileges can deploy, and only org admins can deploy to prod-tagged clusters.</li><li>Each deployment action is logged with the user and stage it was deployed to.</li></ul></p> |
