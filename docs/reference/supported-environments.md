---
id: supported-environments
title: "Supported environments"
description: "Find out where to run Camunda Cloud components for SaaS and Self-Managed, including Optimize for both Camunda Cloud and Camunda Platform 7."
---

## Camunda Cloud SaaS & Self-Managed



### Clients

- **Zeebe Java Client**: OpenJDK 8+
- **Zeebe Go Client**: Go 1.13+
- **zbctl**: Windows, MacOS, and Linux (latest)

_Hint: There are more [community-maintained Camunda Platform 8 clients](./apis-clients/community-clients/)._

### Web Browser

- Google Chrome latest [recommended]
- Mozilla Firefox latest
- Microsoft Edge latest

### Desktop Modeler
- Windows 7 / 10
- Mac OS X 10.11
- Ubuntu LTS (latest)

## Camunda Cloud Self-Managed

We highly recommend running Camunda Platform 8 Self-Managed in a Kubernetes environment. 
We provide officially supported [Helm Charts](./self-managed/zeebe-deployment/kubernetes/helm/installing-helm/) for this.

If you cannot run in a Kubernetes environment, you may [run the distribution](https://github.com/camunda-cloud/zeebe/releases) with Java directly. 

Requirements for the components can be seen below:

|  | Java Version | Elastic |
|---|---|---|
| Zeebe Broker and Gateway | OpenJDK 17+ | Elasticsearch 7.16.x(only if Elastic exporter is used) |
| Operate | OpenJDK 11+ | Elasticsearch 7.16.x |
| Tasklist | OpenJDK 11+ | Elasticsearch 7.16.x |
| Optimize | OpenJDK 11+ | Elasticsearch 7.8.x - 7.16.x |

### Version Matrix

This overview shows which Zeebe version works with which Modeler, Operate, Tasklist and Optimize:

| Design | Automate |  | Improve |
|---|---|---|---|
| Desktop Modeler 4.7+ | Zeebe 1.0.x | Operate 1.0.x Tasklist 1.0.x | - |
| Desktop Modeler 4.9+ | Zeebe 1.1.x | Operate 1.1.x Tasklist 1.1.x | - |
| Desktop Modeler 4.11+ | Zeebe 1.2.x | Operate 1.2.x Tasklist 1.2.x IAM 1.2.x | - |
| Desktop Modeler 4.12+ | Zeebe 1.3.x | Operate 1.3.x Tasklist 1.3.x IAM 1.3.x | Optimize 3.7.x |
| Desktop Modeler 5.0+ | Zeebe 8.0.x | Operate 8.0.x Tasklist 8.0.x Identity 8.0.x | Optimize 3.8.x |

_Note: You can use newer Modeler versions with older Zeebe versions too._

## Camunda Platform 7 & Optimize Version Matrix

| Improve | Automate |
|---|---|
| Optimize 3.4.x | Camunda Platform 7.13.5, 7.14.x, 7.15.x |
| Optimize 3.5.x | Camunda Platform 7.13.5, 7.14.x, 7.15.x |
| Optimize 3.6.x | Camunda Platform 7.14.x, 7.15.x, 7.16.x |
| Optimize 3.7.x | Camunda Platform 7.14.x, 7.15.x, 7.16.x |
| Optimize 3.8.x | Camunda Platform 7.15.x, 7.16.x, 7.17.x |
