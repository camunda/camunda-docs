---
id: aws-ec2
title: "Amazon EC2"
description: "Learn how to install Camunda 8 on AWS EC2 instances."
---

This guide provides a detailed walkthrough for installing the Camunda 8 single JAR on AWS EC2 instances. It focuses on managed services by AWS and their cloud offering. Finally, you will verify that the connection to your Self-Managed Camunda 8 environment is working.

This guide focuses on setting up the [orchestration cluster](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster-vs-web-modeler-and-console) for Camunda 8. The Web Modeler and Console are not covered in this manual deployment approach. These components are not supported on virtual machines. Explore the available options to deploy Web Modeler and Console [on Kubernetes](/self-managed/installation-methods/helm/install.md#install-web-modeler).

:::note Using other Cloud providers
This guide is built around the available tools and services that AWS offers, but is not limited to AWS. The scripts and ideas included can be adjusted for any other cloud provider and use case.

When using this guide with a different cloud provider, note that you will be responsible for configuring and maintaining the resulting infrastructure. Our support is limited to questions related to the guide itself, not to the specific tools and services of the chosen cloud provider.
:::

:::danger Cost management
Following this guide will incur costs on your Cloud provider account, namely for the EC2 instances, and OpenSearch. More information can be found on AWS and their [pricing calculator](https://calculator.aws/#/) as the total cost varies per region.

To get an estimate, you can refer to this [example calculation](https://calculator.aws/#/estimate?id=ca54a43f3b3b7eb42fe8836854775e60d8c7e04d), which can be further optimized to suit your specific use cases.
:::

## Architecture

The architecture as depicted focuses on a standard deployment consisting of a three-node setup distributed over 3 [availability zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) within an AWS region, as well as an OpenSearch domain with the same conditions. The focus is on a highly available setup and redundancy in case a zone should fail.

<!-- The following diagram should be exported as an image and as a PDF from the sources https://miro.com/app/board/uXjVL-6SrPc=/ --->
<!-- To export: click on the frame > "Export Image" > as PDF and as JPG (low res), then save it in the ./assets/ folder --->

_Infrastructure diagram for a 3 node EC2 architecture (click on the image to open the PDF version)_
[![AWS EC2 Architecture](./assets/aws-ec2-arch.jpg)](./assets/aws-ec2-arch.pdf)

The setup consists of:

- [Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) (VPC) is a logically isolated virtual network.
  - a [Private Subnet](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html), which does not have direct access to the internet and cannot be easily reached.
    - three [EC2](https://aws.amazon.com/ec2/) instances using Ubuntu, one within each availability zone, which will run Camunda 8.
    - a [managed OpenSearch](https://aws.amazon.com/what-is/opensearch/) cluster stretched over the three availability zones.
  - a [Public Subnet](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html), which allows direct access to the Internet via an [Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html).
    - (optional) an [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) (ALB) is used to expose the WebUIs like Operate, Tasklist, and connectors, as well as the Orchestration cluster REST API to the outside world. This is done using sticky sessions, as generally requests are distributed round-robin across all EC2 instances.
    - (optional) a [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html) (NLB) is used to expose the gRPC endpoint of the Zeebe Gateway, in case external applications require it.
    - (optional) a [Bastion Host](https://en.wikipedia.org/wiki/Bastion_host) to allow access to the private EC2 instances since they're not publicly exposed.
      - Alternatively, utilize the [AWS Client VPN](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html) instead to reach the private subnet within the VPC. The setup requires extra work and certificates, but can be set up by following the [getting started tutorial by AWS](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-getting-started.html).
    - a NAT Gateway that allows the private EC2 instances to reach the internet to download and update software packages. This cannot be used to access the EC2 instances.
- [Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html) to handle traffic flow to the VMs.
- an [Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html) to allow traffic between the VPC and the Internet.

Both types of subnets are distributed over three availability zones of a single AWS region, allowing for a highly available setup.

:::note Single Deployment
Alternatively, the same setup can run with a single AWS EC2 instance, but be aware that in case of a zone failure, the whole setup would be unreachable.
:::

## Requirements

- An AWS account to create any resources within AWS.
  - On a high level, permissions are required on the **ec2**, **iam**, **elasticloadbalancing**, **kms**, **logs**, and **es** level.
  - For a more fine-grained view of the permissions, check this [example policy](https://github.com/camunda/camunda-deployment-references/tree/main/aws/ec2/example/policy.json).
- Terraform (1.7+)
- Unix based Operating System (OS) with ssh and sftp
  - Windows may be used with [Cygwin](https://www.cygwin.com/) or [Windows WSL](https://learn.microsoft.com/en-us/windows/wsl/install) but has not been tested

### Outcome

The outcome is a fully working Camunda orchestration cluster running in a high availability setup using AWS EC2 and utilizing a managed OpenSearch domain.
The EC2 instances come with an extra disk meant for Camunda to ensure that the content is separated from the operating system.

## 1. Configure AWS and initialize Terraform

:::note Terraform infrastructure example
We do not recommend using the below Terraform related infrastructure as module as we do not guarantee compatibility.
Therefore, we recommend extending or reusing some elements of the Terraform example to ensure compatibility with your environments.
:::

### Obtain a copy of the reference architecture

The first step is to download a copy of the reference architecture from the GitHub repository. This material will be used throughout the rest of this documentation. The reference architectures are versioned using the same Camunda versions (stable/8.x).

The provided reference architecture repository allows you to directly reuse and extend the existing Terraform example base. This sample implementation is flexible to extend to your own needs without the potential limitations of a Terraform module maintained by a third party.

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/compute/ec2-single-region/procedure/get-your-copy.sh
```

With the reference architecture copied, you can proceed with the remaining steps outlined in this documentation. Ensure that you are in the correct directory before continuing with further instructions.

### Terraform prerequisites

To manage the infrastructure for Camunda 8 on AWS using Terraform, we need to set up Terraform's backend to store the state file remotely in an S3 bucket. This ensures secure and persistent storage of the state file.

:::note
Advanced users may want to handle this part differently and use a different backend. The backend setup provided is an example for new users.
:::

#### Set up AWS authentication

The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. Before you can use the provider, you must authenticate it using your AWS credentials.

:::caution Ownership of the created resources

A user who creates resources in AWS will always retain administrative access to those resources. It is recommended to create a dedicated [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) for Terraform purposes, ensuring that the resources are managed and owned by that user.

:::

You can further change the region and other preferences and explore different [authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) methods:

- For development or testing purposes you can use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html). If you have configured your AWS CLI, Terraform will automatically detect and use those credentials.
  To configure the AWS CLI:

  ```bash
  aws configure
  ```

  Enter your `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, region, and output format. These can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

- For production environments, we recommend the use of a dedicated IAM user. Create [access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for the new IAM user via the console, and export them as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

#### Create an S3 bucket for Terraform state management

Before setting up Terraform, you need to create an S3 bucket that will store the state file. This is important for collaboration and to prevent issues like state file corruption.

To start, set the region as an environment variable upfront to avoid repeating it in each command:

```bash
export AWS_REGION=<your-region>
```

Replace `<your-region>` with your chosen AWS region (for example, `eu-central-1`).

Now, follow these steps to create the S3 bucket with versioning enabled:

1. Open your terminal and ensure the AWS CLI is installed and configured.

2. Run the following command to create an S3 bucket for storing your Terraform state. Make sure to use a unique bucket name and set the `AWS_REGION` environment variable beforehand:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-creation.sh
   ```

3. Enable versioning on the S3 bucket to track changes and protect the state file from accidental deletions or overwrites:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-versioning.sh
   ```

4. Secure the bucket by blocking public access:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-private.sh
   ```

5. Verify versioning is enabled on the bucket:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-verify.sh
   ```

This S3 bucket will now securely store your Terraform state files with versioning enabled.

#### Initialize Terraform

Once your authentication is set up, you can initialize your Terraform project. The previous steps configured a dedicated S3 Bucket (`S3_TF_BUCKET_NAME`) to store your state, and the following creates a bucket key that will be used by your configuration.

Configure the backend and download the necessary provider plugins:

:::note
Ensure you are in the `terraform` subfolder `camunda-deployment-references/aws/compute/ec2-single-region/terraform`.
:::

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-tf-init.sh
```

Terraform will connect to the S3 bucket to manage the state file, ensuring remote and persistent storage.

### EC2 setup

The `ec2.tf` takes are of creating compute instances and an optional bastion host. You can configure in here the disk size, instance type, enable or disable the bastion host, as well as configure the [Amazon Machine Image](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (AMI) to overwrite the use of the latest image available.

The following file shows what resources are created and can be adjusted within your copied reference. The code embedding is limited to 30 lines. For the complete file, please refer to the link provided at the bottom of the embedded snippet.

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/compute/ec2-single-region/terraform/cluster/ec2.tf#L1-L30
```

### Security setup

The `security.tf` contains multiple security groups that handle different use cases. Among those:

- Allow internal VPC traffic for Camunda ports
- Allow EC2 instances to access external traffic on port 80 / 443 to download dependencies (Java, Camunda, ...)
- Allow remote traffic for the LoadBalancer on different ports.
- Allow SSH for the bastion host.

Besides the security groups to handle traffic. It also contains a KMS key to encrypt disks and OpenSearch, as well as the SSH Key pair to trust a remote ssh connection.

The following file shows what resources are created and can be adjusted within your copied reference. The code embedding is limited to 30 lines. For the complete file, please refer to the link provided at the bottom of the embedded snippet.

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/compute/ec2-single-region/terraform/cluster/security.tf#L1-L30
```

### Load balancer setup

The `lb.tf` contains a load balancer setup to expose Camunda 8 to the public or within your company network. One can restrict the access further if required.

It's divided into a Network and an Application load balancer.

- Network load balancer to expose the gRPC endpoint
- Application load balancer to expose the Camunda WebApps and REST API

The following file shows what resources are created and can be adjusted within your copied reference. The code embedding is limited to 30 lines. For the complete file, please refer to the link provided at the bottom of the embedded snippet.

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/compute/ec2-single-region/terraform/cluster/lb.tf#L1-L30
```

### OpenSearch module setup

:::info Optional module

If you don't want to use this module, you can skip this section. However, you may need to adjust the remaining instructions to remove references to this module.

If you choose not to use this module, you'll need to either provide an Elasticsearch or OpenSearch service.

Additionally, you must delete the `opensearch.tf` file within your chosen reference as it will otherwise create the resources.
:::

The OpenSearch module creates an OpenSearch domain intended for Camunda platform. OpenSearch is a powerful alternative to Elasticsearch.

:::note Migration to OpenSearch is not supported

Using Amazon OpenSearch Service requires [setting up a new Camunda installation](/self-managed/setup/overview.md). Migration from previous Camunda versions using Elasticsearch environments is currently not supported. Switching between Elasticsearch and OpenSearch, in either direction, is also not supported.

:::

#### Set up the OpenSearch domain module

1. The `opensearch.tf` in your chosen reference is containing a basic AWS OpenSearch setup referencing a local Terraform module. The following shows said file, which you can within your cloned setup adjust to your needs.

   :::caution Network based security
   The standard deployment for OpenSearch relies on the first layer of security, which is the Network.
   While this setup allows easy access, it may expose sensitive data within the VPC. To enhance security, consider [fine-grained access control](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html).
   :::

   ```hcl reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/compute/ec2-single-region/terraform/opensearch.tf#L1-L30
   ```

2. Customize the cluster setup using various input options. For a full list of available parameters, see the [OpenSearch module documentation](https://github.com/camunda/camunda-deployment-references/blob/main/aws/modules/opensearch/README.md).

:::tip

The instance type `m7i.large.search` in the above example is a suggestion, and can be changed depending on your needs.

:::

### Define outputs

**Terraform** allows you to define outputs, which make it easier to retrieve important values generated during execution, such as database endpoints and other necessary configurations for the setup.

Each Terraform definition set up in the reference contains an output definition at the end of the file. You can adjust them to your needs. A necessary default is provided to make use of in scripts.

Outputs allow you to easily reference the resources in subsequent steps or scripts, streamlining your deployment process.

### Execution

:::note Secret management

We strongly recommend managing sensitive information using a secure secrets management solution like HashiCorp Vault. For details on how to inject secrets directly into Terraform via Vault, see the [Terraform Vault Secrets Injection Guide](https://developer.hashicorp.com/terraform/tutorials/secrets/secrets-vault).

:::

1. Open a terminal in the chosen reference folder where `config.tf` and other `.tf` files are.

2. Preform a final initialization for anything changed throughout the guide:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-tf-init.sh#L7
   ```

3. Plan the configuration files:

   ```bash
   terraform plan -out cluster.plan # describe what will be created
   ```

4. After reviewing the plan, you can confirm and apply the changes.

   ```bash
   terraform apply cluster.plan     # apply the creation
   ```

Terraform will now create the Amazon EC2 resources and OpenSearch with all the necessary configurations. The completion of this process may require approximately 20-30 minutes in total.

### Connect to remote machines via Bastion host (optional)

The EC2 instances are not public and have to be reached via a Bastion host. Alternatively, utilize the [AWS VPN Client](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html) to connect securely to a private VPC. This step is not described, as setup requires specific manual user interaction.

```sh
export BASTION_HOST=$(terraform output -raw bastion_ip)
# retrieves the first IP from the camunda_ips array
export CAMUNDA_IP=$(tf output -json camunda_ips | jq -r '.[0]')

ssh -J admin@${BASTION_HOST} admin@${CAMUNDA_IP}
```

## 2. Deploy Camunda 8

### Configure and run the installation script

1. Navigate to the script directory:

```sh
cd camunda-deployment-references-main/aws/ec2/scripts
```

The script directory contains bash scripts that can be used to install and configure Camunda 8.

2. Configure any script features using the following environment variables:

   - `CLOUDWATCH_ENABLED`: The default is false. If set to true will install the CloudWatch agent on each EC2 instance and export Camunda logs and Prometheus metrics to AWS CloudWatch.

3. Configure any variables in the `camunda-install.sh` script to overwrite the default for Camunda and Java versions:

   - `OPENJDK_VERSION`: The Temurin Java version.
   - `CAMUNDA_VERSION`: The Camunda 8 version.
   - `CAMUNDA_CONNECTORS_VERSION`: The Camunda 8 connectors version.

   :::note
   The above variables must be set in `camunda-install.sh` . They cannot be set as environment variables.
   :::

4. Execute the `all-in-one-install.sh` script.

This script installs all required dependencies. Additionally, it configures Camunda 8 to run in a highly available setup by using a managed OpenSearch instance.

The script will pull all required IPs and other information from the Terraform state via Terraform outputs.

During the first installation, you will be asked to confirm the connection to each EC2 instance by typing `yes`.

### Connect and use Camunda 8

The Application Load Balancer (ALB) and the Network Load Balancer (NLB) can be accessed via the following Terraform outputs:

- `terraform output alb_endpoint`: Access Operate (or the connectors instance on port `9090`). The ALB is designed for handling Web UIs, such as Operate, Tasklist, Optimize, and connectors.
- `terraform output nlb_endpoint`: Access the gRPC endpoint of the Zeebe gateway. The NLB is intended for managing the gRPC endpoint of the Zeebe Gateway. This is due to the difference of protocols with ALB focusing on HTTP and NLB on TCP.

The two endpoints above use the publicly assigned hostname of AWS. Add your domain via CNAME records or use [Route53](https://aws.amazon.com/route53/) to map to the load balancers, allowing them to easily enable SSL. This will require extra work in the Terraform blueprint as it listens to HTTP by default.

Alternatively, if you have decided not to expose your environment, you can use the jump host to access relevant services on your local machine via port-forwarding.

For an enterprise grade solution, you can utilize the [AWS Client VPN](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html) instead to reach the private subnet within the VPC. The setup requires extra work and certificates, described in the [getting started tutorial by AWS](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-getting-started.html).

The following can be executed from within the Terraform folder to bind the remote ports to your local machine:

```sh
export BASTION_HOST=$(terraform output -raw bastion_ip)
# retrieves the first IP from the camunda_ips array
export CAMUNDA_IP=$(tf output -json camunda_ips | jq -r '.[0]')

# 26500 - gRPC; 8080 - WebUI; 9090 - Connectors
ssh -L 26500:${CAMUNDA_IP}:26500 -L 8080:${CAMUNDA_IP}:8080 -L 9090:${CAMUNDA_IP}:9090 admin@${BASTION_HOST}
```

### Turn off bastion host (optional)

If you used the [bastion host](#turn-off-bastion-host-optional) for access, it can be turned off when longer needed for direct access to the EC2 instances.

To turn off the bastion host, set the `enable_jump_host` variable to `false` in the `variables.tf` file, and reapply Terraform.

## 3. Verify connectivity to Camunda 8

Using Terraform, you can obtain the HTTP endpoint of the Application Load Balancer and interact with Camunda through the [REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

1. Navigate to the Terraform folder:

```sh
cd camunda-deployment-references-main/aws/ec2/terraform
```

2. Retrieve the Application Load Balancer output:

```sh
terraform output -raw alb_endpoint
```

3. Use the [Orchestration cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) to communicate with Camunda:

Follow the example in the [REST API documentation](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md) to authenticate and retrieve the cluster topology.

## Manage Camunda 8

### Upgrade Camunda 8

:::info Direct upgrade not supported
Upgrading directly from a Camunda 8.6 release to 8.7 is not supported and cannot be performed.
:::

To update to a new patch release, the recommended approach is as follows:

1. Remove the `jars` folder: This step ensures that outdated dependencies from previous versions are completely removed.
2. Overwrite remaining files: Replace the existing files with those from the downloaded patch release package.
3. Restart Camunda 8.

The update process can be automated using the `all-in-one-install.sh` script, which performs the following steps:

- Detects an existing Camunda 8 installation.
- Deletes the jars folder to clear outdated dependencies.
- Overwrites the remaining files with the updated version.
- Regenerates configuration files.
- Restarts the application to apply the updates.

### Monitoring

Camunda metrics are exposed by default using the Prometheus format. To learn more about how to scrape Camunda 8, see [metrics](/self-managed/operational-guides/monitoring/metrics.md).

In an AWS environment, you can leverage CloudWatch not only for log collection but also for gathering [Prometheus metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights-Prometheus-metrics.html). It's important to note that while Camunda natively supports Grafana and Prometheus, integrating CloudWatch for metric visualization is possible but requires additional configuration.

### Backups

Please conduct the general topic of backups in the [documentation](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

With AWS as chosen platform you can utilize [S3](https://aws.amazon.com/s3/) for the backups both for Zeebe and Elasticsearch.

If you are using a managed OpenSearch domain instead, you should check out the [official documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/managedomains-snapshots.html) on creating backups and snapshots in OpenSearch.

## Troubleshooting

Please conduct the general topic of troubleshooting in the [documentation](/self-managed/operational-guides/troubleshooting.md).
