---
id: irsa
title: "Troubleshooting IAM Roles for Service Accounts (IRSA)"
description: "Learn how to configure IAM roles for service accounts (IRSA) within AWS to authenticate workloads."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- TODO: future work reference usage of SM C8 Check for IRSA (https://github.com/camunda/team-infrastructure-experience/issues/25) -->

## Instance Metadata Service (IMDS)

[Instance Metadata Service](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html) is a default fallback for the AWS SDK due to the [default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html). Within the context of Amazon EKS, it means a pod will automatically assume the role of a node. This can hide many problems, including whether IRSA was set up correctly or not, since it will fall back to IMDS in case of failure and hide the actual error.

Thus, if nothing within your cluster relies on the implicit node role, we recommend disabling it by defining in Terraform the `http_put_response_hop_limit`, for example.

Using a Terraform module like the [Amazon EKS module](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest), one can define the following to decrease the default value of two to one, which results in pods not being allowed to assume the role of the node anymore.

```json
eks_managed_node_group_defaults {
    metadata_options = {
        http_put_response_hop_limit = 1
    }
}
```

Overall, this will disable the role assumption of the node for the Kubernetes pod. Depending on the resulting error within Operate, Zeebe, and Web-Modeler, you'll get a clearer error, which is helpful to debug the error more easily.
