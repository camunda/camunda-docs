:::note Single namespace deployment
This guide uses a single Kubernetes namespace for simplicity, since the deployment uses a single Helm chart. This differs from the [reference architecture](/self-managed/reference-architecture/reference-architecture.md#camunda-hub-vs-orchestration-cluster), which recommends separating the Orchestration Cluster from the management plane (Camunda Hub and Management Identity) into different namespaces in production to improve isolation and enable independent scaling.
:::
