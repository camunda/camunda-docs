---
id: platforms
title: "Supported Kubernetes platforms"
description: "An overview of Camunda 8 officially-supported Kubernetes platforms."
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

[Deploying Camunda 8 using Helm charts](../deploy.md) will work for all platforms and distributions. However, each platform or cloud provider may have special prerequisites or pitfalls to avoid. This section highlights important notes for a smooth Camunda 8 deployment on different Kubernetes platforms.

In addition to Stock Kubernetes (which could be deployed on cloud or on-premise), Camunda only officially tests and supports the following platforms:

<DocCardList items={useCurrentSidebarCategory().items}/>

:::caution Web Modeler
While it is likely Web Modeler Beta will work on your cloud platform, we do not guarantee functionality and currently offer no dedicated support for these cloud platforms.
:::
