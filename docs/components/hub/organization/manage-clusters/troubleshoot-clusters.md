---
id: troubleshoot-clusters
title: Troubleshoot clusters
description: "Review common issues and how to resolve them."
---

Review common issues and how to resolve them.

## I cannot connect to Zeebe

- Check if your [API client](./manage-api-clients.md) has the necessary rights. To interact with Zeebe, the **Scope** `Zeebe` must be set.
- Check if your credentials are configured correctly. There is a community-supported CLI tool that allows you to check the status: [`zbctl`](https://www.npmjs.com/package/zbctl). With the command `zbctl status`, you can read the topology. If this command works, the connection can be established.
- Check if your cluster is **Healthy**: A Zeebe cluster may be temporarily unavailable. To check if your cluster is healthy, navigate to the **Clusters** tab in the top navigation. Click on the cluster to view its details for a closer view of the status over all components (Zeebe, Operate, Tasklist, Optimize).
