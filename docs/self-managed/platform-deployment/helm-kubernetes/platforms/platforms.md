---
id: platforms
title: "Camunda Platform 8 officially supported Kubernetes platforms"
description: "An overview of Camunda Platform 8 officially supported Kubernetes platforms"
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

[Deploying Camunda Platform 8 using Helm charts](../deploy.md) will work for all platforms and distributions. However, each platform or cloud provider may have some special prerequisites or pitfalls to avoid. The platforms guides highlights important notes for a smooth Camunda Platform deployment on various platforms.

In addition to Stock Kubernetes (which could be deployed on cloud or on-premise), Camunda only officially tests and supports the following platforms:

<DocCardList items={useCurrentSidebarCategory().items}/>
