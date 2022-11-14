---
id: platforms
title: "Camunda Platform 8 officially supported Kubernetes platforms"
description: "An overview of Camunda Platform 8 officially supported Kubernetes platforms"
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

Generally speaking [deploying Camunda Platform 8 using Helm chart](../deploy.md) should work for all platforms and distributions, however, each platform or cloud provider could have some special prerequisites to prepare or pitfalls to avoid. So main goal of the platforms guides is to shed the light on some points to have a smooth Camunda Platform deployment on different platforms.

In additional to the Stock Kubernetes (which could be deployed on Cloud or On-premises), we only officially test and support the following platforms:

<DocCardList items={useCurrentSidebarCategory().items}/>
