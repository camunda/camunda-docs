---
id: administrator-quickstart
title: "Administrator quickstart"
sidebar_label: "For Administrators"
description: "Get started with Camunda 8 Self-Managed as an administrator."
---

import DocCard from "@theme/DocCard";

This quickstart guide helps administrators deploy Camunda 8 Self-Managed. Select the deployment approach that best fits your needs:

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<DocCard
  item={{
    type: "link",
    href: "../../deployment/helm/cloud-providers/kind/",
    label: "Local development (kind)",
    description: "Deploy on a local Kubernetes cluster using kind for testing, development, and learning purposes. Ideal for testing and evaluation.",
  }}
/>
<DocCard
  item={{
    type: "link",
    href: "../../deployment/helm/cloud-providers/",
    label: "Production deployment",
    description: "Deploy on cloud providers like Amazon, Azure, Google Cloud Platform, Red Hat and others for production workloads.",
  }}
/>
</div>
