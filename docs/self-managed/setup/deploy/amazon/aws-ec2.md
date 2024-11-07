---
id: aws-ec2
title: "Amazon EC2"
description: "Learn how to install Camunda 8 on AWS EC2 instances."
---

This guide provides a detailed walkthrough for installing the Camunda 8 monorepo architecture on AWS EC2 instances. It focuses on managed services by AWS and their cloud offering. Finally, you will verify that the connection to your Self-Managed Camunda 8 environment is working.

## Architecture

The architecture as depicted focuses on a three-node setup distributed over 3 [availability zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) within an AWS region. The focus is on a highly available setup and redundancy in case a zone should fail. Alternatively, one can run the same setup with a single AWS EC2 instance as well but should be aware that in case of a zone failure, their whole setup would be unreachable.

<!--
  The diagram can be found in the folder (InfraEx - Arch - AWS)
  https://drive.google.com/drive/u/0/folders/1-4mLeGDSw8i10wfLo32AQAG4ynJFwT99
  https://drive.google.com/file/d/1TA0EDhZYmnpq9kM5L6u9oftndaCQoDD0/view?usp=sharing
-->

![AWS EC2 Architecture](../../assets/aws-ec2-arch.png)

The setup consists of:

- [Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) (VPC) is a logically isolated virtual network.
  - a [Public Subnet](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html), which allows direct access to the Internet via an [Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html).
  - a [Private Subnet](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html), which does not have direct access to the internet and can not easily be reached.

Both types of subnets are distributed over three availability zones of a single AWS region, allowing for a highly available setup.

The private subnet contains:

- three [EC2](https://aws.amazon.com/ec2/) instances, which will run Camunda 8.
- a [managed OpenSearch](https://aws.amazon.com/what-is/opensearch/) cluster stretched over the three availability zones.

The public subnet contains:

- (optional) an [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) (ALB) is used to expose the WebUIs like Operate, Tasklist, and Connectors to the outside world. This is done using sticky sessions as generally requests are distributed round-robin across all EC2 instances. This component is stretched over all three availability zones.
- (optional) a [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html) (NLB) is used to expose the gRPC endpoint of the Zeebe Gateway. This will eventually be superseded and integrated via the unified REST API into the ALB. This component is stretched over all three availability zones.
- (optional) a [Bastion Host](https://en.wikipedia.org/wiki/Bastion_host) to allow access to the private EC2 instances since they're not publicly exposed.
  - Alternatively, one can utilize the [AWS Client VPN](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html) instead to reach the private subnet within the VPC. The setup requires a lot of extra work and certificates, but one can follow the [getting started tutorial by AWS](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-getting-started.html).
- a NAT Gateway that allows the private EC2 instances to reach the internet to download and update software packages. This can not be used to access the EC2 instances.

Lastly, an [Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html) as glue component between the VPC and the Internet, to allow traffic between those.

## Prerequisites

- An AWS account to create any resources within AWS.
- Terraform (1.7+)
- Unix based Operating System (OS) with ssh and sftp
  - Windows may be used with [Cygwin](https://www.cygwin.com/) or [Windows WSL](https://learn.microsoft.com/en-us/windows/wsl/install) but has not been tested

## Considerations

- TODO: reference official limitations as outlined as part of [this announcement](https://camunda.slack.com/archives/C02GZDWP45T/p1720033663512759)
- Current state:
  - Identity?
  - Optimize?
  - Tasklist? Alpha3 was initially broken
  - Highly available, some stuff but not everything, e.g. importers / archivers

## Outcome

The outcome as pictured in [architecture](#architecture) consists of the underlying infrastructure consisting of a VPC containing 3 EC2 instances, a managed Database, security rules, and optional exposure of the Camunda 8 distribution.
The EC2 instances come with an extra disk meant for Camunda to ensure that the content is separated from the operating system.

Lastly, Camunda 8 will be installed in a highly available setup using the all-in-one distribution and Zeebe is configured to act as a multi-node cluster.

## Usage

1. Clone the repository

```
git clone https://github.com/camunda/camunda-deployment-references.git
```

### Infrastructure

1. Go to directory

```
cd camunda-deployment-references/aws/ec2/terraform
```

2. Configure Variables

Edit the `variables.tf` file to customize the settings such as the prefix for resource names and CIDR blocks. Example:

```hcl
variable "prefix" {
  default = "example"
}

variable "cidr_blocks" {
  default = "10.0.1.0/24"
}
```

Alternatively, you can also define variables from the CLI by adding `-var "myvar=value"` to the command.

For example `terraform apply -var "prefix=camunda"`.

Be aware that you will have to manually supply those every time you apply or plan; therefore, consider manifesting it by editing the `variables.tf`.

3. Configure AWS provider

:::note
It's recommended to use a different backend than `local`. More information can be found in the [Terraform documentation](https://developer.hashicorp.com/terraform/language/settings/backends/configuration).
:::

:::note
The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. You must configure the provider with the proper credentials before using it. You can further change the region and other preferences and explore different authentication methods.

There are several ways to authenticate the AWS provider.

- (Recommended) Use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) to configure access. Terraform will automatically default to AWS CLI configuration when present.
- Set environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, which can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

Ensure to have exported an environment variable with your desired region `AWS_REGION`, configured AWS CLI, or explicitly set the value in the Terraform provider config to ensure that your infrastructure is deployed in the targeted region and not your default, which may mismatch.
:::

:::danger
Do not store sensitive information (credentials) in your Terraform files.
:::

4. Initialize Terraform

Initialize the Terraform working directory. This step downloads the necessary provider plugins.

```sh
terraform init
```

5. Deploy the Infrastructure

Apply the Terraform configuration to create the resources.

```sh
terraform apply
```

The execution takes roughly 1h15min of which the majority of time ~ 1h is solely the creation of a managed highly available OpenSearch cluster.

6. Access outputs

After the infrastructure is created, you can access the outputs defined in `outputs.tf`. For example, to get the OpenSearch endpoint:

```sh
terraform output aws_opensearch_domain
```

7. (optional) Connect to remote machines via Bastion host

The EC2 instances are not public and have to be reached via the Bastion host.
Alternatively one can utilize the [AWS VPN Client](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html) to connect securely to a private VPC. This is not covered here as the setup requires a lot more manual user interaction.

```
export BASTION_HOST=$(terraform output -raw bastion_ip)
# retrieves the first IP from the camunda_ips array
export CAMUNDA_IP=$(tf output -json camunda_ips | jq -r '.[0]')

ssh -J admin@${BASTION_HOST} admin@${CAMUNDA_IP}
```

### Deploy Camunda 8

1. Go to directory

```
cd camunda-deployment-references/aws/ec2/scripts
```

2. Consider optional features

There are certain features hidden behind a feature flag. Those are the following:

- `CLOUDWATCH_ENABLED`: The default is false. If set to true will install the CloudWatch agent on each EC2 instance and export Camunda logs and Prometheus metrics to AWS CloudWatch.
- `SECURITY`: The default is false. If set to true will use self-signed certificates to secure cluster communication, based on the procedure described in the [documentation](/self-managed/zeebe-deployment/security/secure-cluster-communication.md). This requires a manual step as a prerequisite as described below in step 3.

Additionally, certain variables can be configured in the `camunda-install.sh` script to overwrite the default for Camunda and Java versions:

- `OPENJDK_VERSION`: The Temurin Java version.
- `CAMUNDA_VERSION`: The Camunda 8 version.
- `CAMUNDA_CONNECTORS_VERSION`: The Camunda 8 connectors version.

Setting those as environment variables will not take effect since the scripts are executed on the remote host with no access to your local environment.

1. (optional) Security

If you decide to enable `SECURITY`, please execute the `generate-self-signed-cert-authority.sh` script to once create a certificate authority. It would be wise to save those somewhere securely as you'll require those if you want to upgrade or change configs in an automated way. Worst case, you'll have to recreate the certificate authority certs via the script and all manually created client certificates.

3. Execute script `all-in-one-install.sh`

Run the `all-in-one-install.sh` script.

It will install all required dependencies. Additionally, it configures Camunda 8 to run in a highly available setup by using a managed OpenSearch instance.

The script will pull all required IPs and other information from the Terraform state via Terraform outputs.

During the first installation, you will be asked to confirm the connection to each EC2 instance by typing `yes`.

4. Use the setup

Via the Terraform output `alb_endpoint` one can access Operate or on port `9090` the Connectors instance.

Via the Terraform output `nlb_endpoint` one can access the gRPC endpoint of the Zeebe gateway.

The two endpoints above use the publicly assigned hostname of AWS. One may add their domain via CNAME records or use [Route53](https://aws.amazon.com/route53/) to map to the load balancers, allowing them to easily enable SSL. This will require extra work in the Terraform blueprint as it listens to HTTP by default.

Alternatively, if you have decided not to expose your environment, you can use the jump host to access relevant services on your local machine via port-forwarding.

The following can be executed from within the Terraform folder to bind the remote ports to your local machine.

```
export BASTION_HOST=$(terraform output -raw bastion_ip)
# retrieves the first IP from the camunda_ips array
export CAMUNDA_IP=$(tf output -json camunda_ips | jq -r '.[0]')

# 26500 - gRPC; 8080 - WebUI; 9090 - Connectors
ssh -L 26500:${CAMUNDA_IP}:26500 -L 8080:${CAMUNDA_IP}:8080 -L 9090:${CAMUNDA_IP}:9090 admin@${BASTION_HOST}
```

5: (optional) turn off bastion host

### Upgrade Camunda 8

TODO: We can give more guidance when 8.6 is more stable. The current state is that rerunning the script is sufficient to replace libs and restart apps.

### Verify connectivity to Camunda 8

TODO: Ideally we have a single page to link to "dry principle" as we keep repeating ourselves.
