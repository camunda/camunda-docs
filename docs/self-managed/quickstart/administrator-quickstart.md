---
id: administrator-quickstart
title: "Administrator quickstart"
sidebar_label: "For Administrators"
description: "Learn how to deploy Camunda 8 Self-Managed as an administrator. Choose your deployment approach."
---

import DocCardList from '@theme/DocCardList';
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

<DocCardList items={[
{
type: "link",
href: "../../deployment/helm/cloud-providers/kind/",
label: "Local development (kind)",
description: "Deploy to a local Kubernetes-in-Docker cluster. Ideal for testing and evaluation.",
},
{
type: "link",
href: "../../deployment/helm/cloud-providers/",
label: "Production deployment",
description: "Deploy to cloud providers like Amazon, Azure, and others for production workloads.",
}
]}/>
