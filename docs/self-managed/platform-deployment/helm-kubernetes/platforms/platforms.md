---
id: platforms
title: "Supported Kubernetes platforms"
description: "An overview of Camunda Platform 8 officially supported Kubernetes platforms"
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

Generally speaking [deploying Camunda Platform 8 using Helm chart](../deploy.md) should work for all Kubernetes platforms and distributions, however, each provider could have some special prerequisites to prepare or pitfalls to avoid. So the primary goal of this section is to shed light on some key points to have a smooth Camunda Platform 8 deployment on different Kubernetes platforms.

In additional to the Stock Kubernetes (which could be deployed on Cloud or On-premises), we only officially test and support the following Kubernetes platforms:

<DocCardList items={useCurrentSidebarCategory().items}/>
