#### Set up ROSA authentication

To set up a ROSA cluster, certain prerequisites must be configured on your AWS account. Below is an excerpt from the [official ROSA planning prerequisites checklist](https://docs.openshift.com/rosa/rosa_planning/rosa-cloud-expert-prereq-checklist.html):

1. Verify that your AWS account is correctly configured:

   ```bash
   aws sts get-caller-identity
   ```

1. Check if the ELB service role exists, as if you have never created a load balancer in your AWS account, the role for Elastic Load Balancing (ELB) might not exist yet:

   ```bash
   aws iam get-role --role-name "AWSServiceRoleForElasticLoadBalancing"
   ```

   If it doesn't exist, create it:

   ```bash
   aws iam create-service-linked-role --aws-service-name "elasticloadbalancing.amazonaws.com"
   ```

1. Create a Red Hat Hybrid Cloud Console account if you don't already have one: [Red Hat Hybrid Cloud Console](https://console.redhat.com/).

1. Enable ROSA on your AWS account via the [AWS Console](https://console.aws.amazon.com/rosa/).

1. Enable HCP ROSA on [AWS Marketplace](https://docs.openshift.com/rosa/cloud_experts_tutorials/cloud-experts-rosa-hcp-activation-and-account-linking-tutorial.html):
   - Navigate to the ROSA console: [AWS ROSA Console](https://console.aws.amazon.com/rosa).
   - Choose **Get started**.
   - On the **Verify ROSA prerequisites** page, select **I agree to share my contact information with Red Hat**.
   - Choose **Enable ROSA**.

   :::note AWS billing account vs. associated AWS infrastructure account

   Only a single AWS billing account can be associated with a Red Hat account for ROSA service billing. This is the account linked through the [AWS Marketplace](https://docs.openshift.com/rosa/cloud_experts_tutorials/cloud-experts-rosa-hcp-activation-and-account-linking-tutorial.html) activation step above.

   However, the associated AWS infrastructure account — the account where the ROSA cluster resources (EC2 instances, VPCs, etc.) are actually deployed — can be a different AWS account. This allows organizations to separate billing ownership from infrastructure management. For more details, see the [ROSA billing FAQ](https://docs.openshift.com/rosa/rosa_architecture/rosa_policy_service_definition/rosa-policy-understand-availability.html).

   :::

1. Install the ROSA CLI from the [OpenShift AWS Console](https://console.redhat.com/openshift/downloads#tool-rosa).

1. Get an API token, go to the [OpenShift Cluster Management API Token](https://console.redhat.com/openshift/token/rosa), click **Load token**, and save it. Use the token to log in with ROSA CLI:

   ```bash
   export RHCS_TOKEN="<yourToken>"
   rosa login --token="$RHCS_TOKEN"

   # Verify the login
   rosa whoami
   ```

1. Create the required account and OCM roles using [AWS STS (Security Token Service)](https://docs.openshift.com/rosa/rosa_architecture/rosa-sts-about-iam-resources.html):

   ```bash
   rosa create account-roles --mode auto
   rosa create ocm-role --mode auto
   ```

   :::tip STS mode (recommended)

   ROSA HCP uses [AWS STS](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html) by default. STS provides short-lived, temporary credentials through IAM roles instead of long-lived access keys, following [AWS security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).
   - **`account-roles`**: Creates the account-wide IAM roles that ROSA needs to manage AWS resources (installer, support, control plane, and worker roles).
   - **`ocm-role`**: Links the [OpenShift Cluster Manager (OCM)](https://console.redhat.com/openshift) to your AWS account, enabling OCM to manage clusters on your behalf.

   The `--mode auto` flag allows the ROSA CLI to create and link the roles automatically. For environments with stricter IAM policies, use `--mode manual` to review and apply the IAM policies yourself. See the [ROSA STS IAM documentation](https://docs.openshift.com/rosa/rosa_architecture/rosa-sts-about-iam-resources.html) for details.

   :::

1. If quotas are insufficient, consult the following:
   - [Provisioned AWS Infrastructure](https://docs.openshift.com/rosa/rosa_planning/rosa-sts-aws-prereqs.html#rosa-aws-policy-provisioned_rosa-sts-aws-prereqs)
   - [Required AWS Service Quotas](https://docs.openshift.com/rosa/rosa_planning/rosa-sts-required-aws-service-quotas.html#rosa-sts-required-aws-service-quotas)

1. Ensure the `oc` CLI is installed. If it's not already installed, follow the [official ROSA oc installation guide](https://docs.openshift.com/rosa/cli_reference/openshift_cli/getting-started-cli.html#cli-getting-started):

   ```bash
   rosa verify openshift-client
   ```
