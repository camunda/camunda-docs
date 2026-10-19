---
id: saas
title: Camunda 8 SaaS
description: "Learn about Camunda 8 SaaS, the fully managed cloud-based service requiring no technical setup or installation, with maintenance and scaling is handled by Camunda."
---

import AoGrid from '../react-components/\_ao-card';
import { RocketIcon, BriefcaseIcon, FileStackIcon, BoxesIcon, BuildingComplexIcon, KeyRoundIcon, ServerIcon, MonitorCloudIcon } from "@site/docs/components/assets/hub-icons";
import OverviewImg from './img/hero-saas.png';

<h3 class="subheading">Run Camunda 8 as a fully managed, cloud-based service.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left"  style={{marginRight: '50px', flex: '1.35'}}>

No technical setup or installation is needed. Camunda handles maintenance, updates, and scaling, so you can focus on building and running your processes.

<a class="button button--outline button--secondary button--md button--hero--topic" title="Create an account" href="./organization/manage-plan/create-account/" style={{marginBottom: '30px', marginTop: '20px'}}>Create an account</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={OverviewImg} alt="Image showing Camunda 8 SaaS components and features" title="Run Camunda 8 as a fully managed, cloud-based service" class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

:::tip[Self-Managed or SaaS?]
Use [Camunda 8 Self-Managed](/self-managed/about-self-managed.md) if you want to deploy and manage Camunda on your own infrastructure, with responsibility for updates, security, and scaling.
:::

## Get started

Create your account, choose a plan, and find help:

<AoGrid ao={[
{
link: "./organization/manage-plan/create-account",
title: "Create an account",
image: RocketIcon,
description: "Sign up for Camunda 8 SaaS and log in to Camunda Hub.",
},
{
link: "./organization/manage-plan/available-plans",
title: "Available plans",
image: BriefcaseIcon,
description: "Compare what each Camunda 8 plan includes.",
},
{
link: "./help-center",
title: "Help Center",
image: FileStackIcon,
description: "Find learning resources, the automation project guide, Camunda Academy, and ways to share feedback.",
},
]} columns={3}/>

## Manage Camunda 8 SaaS

Set up and manage your Camunda 8 SaaS account:

<AoGrid ao={[
{
link: "./clusters",
title: "Clusters",
image: BoxesIcon,
description: "Create and manage the clusters that host your environments, and learn about cluster types and sizes.",
},
{
link: "./organization",
title: "Organization",
image: BuildingComplexIcon,
description: "Manage your organization, its users, usage, and plan.",
},
{
link: "./security",
title: "Security",
image: KeyRoundIcon,
description: "Protect your data with encryption, secure connectivity, and access controls.",
},
{
link: "./data-overview",
title: "Data",
image: ServerIcon,
description: "Choose where your data is hosted, how long it is kept, and how to back up and restore it.",
},
{
link: "./monitoring",
title: "Monitoring",
image: MonitorCloudIcon,
description: "Track your processes, cluster health, usage, and service availability.",
},
]} columns={3}/>

To learn how the platform is built, see [SaaS architecture](./architecture.md).

## Organization

Manage your organization's [users and access](/components/saas/organization/index.md), review usage, and update your plan and billing reservations.

## Security

Protect your data with encryption, secure connectivity, and access controls. See [SaaS security](./security.md) for encryption, access controls, and compliance.

## Data

Choose where your data is hosted, how long it is kept, and how to back it up and restore it. See the [SaaS data overview](./data-overview.md).

## Monitoring

Track your processes, cluster health, usage, and service availability. See [Monitoring](./monitoring/index.md).
