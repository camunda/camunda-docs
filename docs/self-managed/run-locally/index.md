---
title: "Run Camunda Self-Managed locally"
description: "Review the options to run Camunda 8 Self-Managed locally."
keywords: ["local"]
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

This section helps you run Camunda 8 Self-Managed locally for development, testing, or evaluation purposes. These options are not intended for production use, but they’re ideal for exploring the platform, building prototypes, or verifying configurations before deploying to a production environment.

You can choose from different local deployment methods such as C8Run, Docker Compose or Helm with a local Kubernetes cluster.

:::info
For production-grade deployments, including configuration, scaling, and security best practices, see [**Production Installations**](../setup/overview.md).
:::

<DocCardList queryString items={useCurrentSidebarCategory().items}/>
