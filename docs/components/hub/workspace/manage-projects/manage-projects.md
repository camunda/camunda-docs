---
id: manage-projects
title: Projects
description: In Camunda Hub, a project is a type of folder that contains a set of related files you can work on and deploy as a single bundle.
---

import DocsIcon from "@site/docs/components/assets/icon-docs.png";
import AoGrid from '../../../react-components/\_ao-card';
import FileListImg from './img/file-list.png'
import { RocketIcon, FolderGit2Icon, FolderPlusIcon, FlaskConicalIcon, FileStackIcon } from "@site/docs/components/assets/hub-icons";

In Camunda Hub, a [project](/components/concepts/projects.md) contains a set of files. You can consider a project as a bundle of related files you can version and deploy together. You can also consider a project as a container of individual files meant to be versioned and deployed independently.

## About

A project can contain:

- [BPMN diagrams](/components/modeler/bpmn/bpmn.md)
- [DMN diagrams](/components/modeler/dmn/dmn.md)
- [Forms](/components/hub/workspace/modeler/modeling/utilize-forms.md)
- [RPA scripts](/components/rpa/overview.md)
- [Element templates](../modeler/element-templates/manage-element-templates.md)
- [READMEs](../modeler/modeling/advanced-modeling/process-documentation-with-readme-files.md)
- Folders

For example, a project for a consumer loan application might consist of a BPMN diagram as an entry point and a number of additional supporting files, such as DMN diagrams and forms.

<p><img src={FileListImg} alt="Project file list" /></p>

## Project development lifecycle

In Camunda Hub, you can quickly develop project releases through the stages of a typical project development lifecycle:

<AoGrid ao={[
{
link: "./create-a-project",
title: "Set up a new project",
image: FolderPlusIcon,
description: "Get started by setting up a new project.",
},
{
link: "../modeler/modeling/model-your-first-diagram",
title: "Model your first diagram",
image: DocsIcon,
description: "Design and implement your first diagram using Camunda Hub",
},
{
link: "./validate-project",
title: "Validate your project",
image: FlaskConicalIcon,
description: "Validate your project in development before deploying it to your target environment.",
},
{
link: "./project-versioning",
title: "Manage and review project snapshots",
image: FileStackIcon,
description: "Create and review distinct snapshots for the entire project.",
},
{
link: "./deploy-project",
title: "Deploy your project",
image: RocketIcon,
description: "Deploy your project to an environment assigned to your workspace.",
},
{
link: "./git-sync",
title: "Sync your Git repository",
image: FolderGit2Icon,
description: "Connect Camunda Hub to your Git repositories to keep your projects synced.",
},
]} columns={3}/>

For business-critical and higher-risk processes that require strict governance and/or quality requirements, you can [integrate Camunda Hub into your CI/CD pipelines](/components/hub/workspace/modeler/integrate-modeler-in-ci-cd.md).

## Known limitations

You should be aware of the following limitations when working with projects.

### Deployment limitations

- Projects can only be deployed to a Zeebe cluster in version 8.4.0 or higher.
- The overall size of the deployment bundle is limited due to a maximum [record](/components/zeebe/technical-concepts/internal-processing.md) size of 4 MB in Zeebe.
  - The limit is effectively between 2 and 3 MB, as Zeebe writes more data to the log stream than just the raw deployment.
  - If you exceed the limit, you are shown an [error message](deploy-project.md#deployment-errors):<br/>
    `Command 'CREATE' rejected with code 'EXCEEDED_BATCH_RECORD_SIZE'`.
