### Terraform prerequisites

To manage the infrastructure for Camunda 8 on AWS using Terraform, we need to set up Terraform's backend to store the state file remotely in an S3 bucket. This ensures secure and persistent storage of the state file.

:::note
Advanced users may want to handle this part differently and use a different backend. The backend setup provided is an example for new users.
:::

#### Set up AWS authentication

The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. Before you can use the provider, you must authenticate it using your AWS credentials.

:::caution Ownership of the created resources

A user who creates resources in AWS will always retain administrative access to those resources, including any Kubernetes clusters created. It is recommended to create a dedicated [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) for Terraform purposes, ensuring that the resources are managed and owned by that user.

:::

The Terraform AWS provider supports [multiple authentication methods](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration). If you have configured the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html), Terraform will automatically detect and use those credentials:

```bash
aws configure
```

For production environments, avoid long-lived access keys. Prefer short-lived credentials such as [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html), [IAM Identity Center (SSO)](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html), or [environment variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) sourced from a secrets manager. See the [provider documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) for the full list of supported methods.
