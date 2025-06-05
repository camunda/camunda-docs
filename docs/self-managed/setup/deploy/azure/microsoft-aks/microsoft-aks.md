---
id: microsoft-aks
title: "Microsoft AKS"
description: "Deploy Camunda 8 Self-Managed on Microsoft AKS"
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

Azure Kubernetes Service ([Microsoft AKS](https://azure.microsoft.com/products/kubernetes-service/)) is a managed
container orchestration service for deploying and scaling Kubernetes applications in the cloud.

Camunda 8 Self-Managed can be deployed on any supported Kubernetes cluster using [Helm charts](/self-managed/setup/install.md). A list of supported environments is available on our [supported environments page](../../../../../reference/supported-environments). Deployment requirements, including cloud provider-specific information, are available in our [Kubernetes deployment reference](/self-managed/reference-architecture/kubernetes.md).

## Guides

<DocCardList queryString items={useCurrentSidebarCategory().items}/>
