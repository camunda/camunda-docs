---
id: network
title: "Network"
sidebar_label: "Network"
description: "Decide where the VPC comes from and how regions connect for a Camunda 8 Self-Managed deployment on AWS, and create the network stage."
---

The network stage provides the VPC and subnets that every other stage uses and, when you run more than one region, the link between the regions. You make two decisions: where the VPC comes from, and how regions connect.

## Choose the VPC source

| Option              | When to use it                                                                                | What you provide                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Create a VPC        | You have no network yet, or you're evaluating.                                                | A name and a CIDR block. The defaults create three availability zones.            |
| Use an existing VPC | You deploy into an existing AWS landing zone, with its own address plan, routing, and egress. | The VPC ID, its CIDR block, and the subnet IDs, as described in the next section. |

Creating a VPC is the default. Using an existing VPC doesn't change anything else in the deployment: the stage validates your values and publishes them as the same outputs.

## Choose how regions connect

You need a link between regions only when you grow beyond one region. Each region has its own network stage, and the link is a separate step on top of them. It doesn't change the VPCs.

| Option          | When to use it                                                                                                                                    | What it adds                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| VPC peering     | Two regions, and no cross-region network in place yet. Simpler to manage. This is the default.                                                    | A peering connection, routes in the private route tables, and Route 53 Resolver rules for service names. |
| Transit gateway | Three or more regions, an existing transit gateway, or a hub-and-spoke topology. Choose it only if you need it: it has hourly and per-GB charges. | A transit gateway in each region, peering attachments between them, and routes to the other CIDR blocks. |

Neither option encrypts traffic at the network stage. Raft replication between brokers crosses the AWS backbone in cleartext unless you add encryption, for example IPsec on a transit gateway attachment or TLS on the broker channel. Evaluate this before you choose, especially for regulated workloads.

The VPC CIDR blocks of the regions must not overlap. See [grow to two regions](./grow/single-to-dual-region.md) and [grow to three regions](./grow/dual-to-three-regions.md).

## Meet the requirements of your VPC

Camunda places ECS tasks, the database, and load balancers in your subnets. If you use an existing VPC, check each requirement before you apply.

| Requirement                                                         | Why                                                                                                             |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| At least three private subnets in three distinct availability zones | Brokers and the Aurora cluster spread over three zones.                                                         |
| At least three public subnets with a route to an internet gateway   | Only if you expose Camunda through an internet-facing load balancer. Leave them out for an internal-only setup. |
| DNS support and DNS hostnames enabled on the VPC                    | Amazon EFS and AWS Cloud Map service discovery need them.                                                       |
| Outbound access from the private subnets                            | Tasks pull images and read AWS Secrets Manager. Use a NAT gateway or VPC endpoints.                             |
| A CIDR block that doesn't overlap your other networks               | You need this to connect a second region later.                                                                 |
| (Optional) The private route table IDs                              | Only needed to add routes to a peered or transit gateway network later.                                         |

Check the VPC attributes and the subnet zones with the AWS CLI:

```bash
aws ec2 describe-vpc-attribute --vpc-id vpc-0123456789abcdef0 --attribute enableDnsSupport
aws ec2 describe-vpc-attribute --vpc-id vpc-0123456789abcdef0 --attribute enableDnsHostnames
aws ec2 describe-subnets --subnet-ids subnet-0aaa subnet-0bbb subnet-0ccc \
  --query 'Subnets[].[SubnetId,AvailabilityZone,CidrBlock]' --output table
```

Both VPC attributes must return `true`, and the three subnets must list three different availability zones.

## Create the network stage

From `aws/containers/ecs-guided` in the reference repository:

1. Write the variables of the network stage. To create a VPC:

   ```hcl
   prefix = "camunda-demo"
   cidr   = "10.190.0.0/16"
   ```

   To use an existing VPC:

   ```hcl
   prefix  = "camunda-demo"
   byo_vpc = true

   vpc_id   = "vpc-0123456789abcdef0"
   vpc_cidr = "10.20.0.0/16"

   private_subnet_ids = ["subnet-0aaa", "subnet-0bbb", "subnet-0ccc"]
   public_subnet_ids  = ["subnet-0ddd", "subnet-0eee", "subnet-0fff"]

   private_route_table_ids = ["rtb-0123"]
   ```

1. Put the variables in the `network.tfvars` of the example you copy: `examples/greenfield` creates a VPC, `examples/byo-vpc` uses an existing one. Set the same `prefix` in the other files.
1. Apply the stages in order. With an existing VPC, the network stage creates no AWS resources: it validates the values and publishes them as outputs, and the helper script passes them to the next stages.

   ```bash
   export TF_STATE_BUCKET=my-state-bucket TF_STATE_REGION=eu-west-1
   ./procedure/compose.sh apply examples/byo-vpc
   ```

The outputs of the network stage are the contract that the next stages consume:

| Output                    | Used by                                                     |
| ------------------------- | ----------------------------------------------------------- |
| `vpc_id`                  | Compute, secondary storage, exposure, Camunda               |
| `vpc_cidr`                | Compute and secondary storage, for the security group rules |
| `private_subnet_ids`      | Secondary storage, Camunda, and the internal load balancer  |
| `public_subnet_ids`       | Exposure                                                    |
| `private_route_table_ids` | The interconnect, when you add a second region              |

## Use the same network for other compute options

The network stage doesn't depend on the [compute option](./compute.md). The contract above is the same for Amazon EKS and Amazon EC2, which need subnets, a CIDR block, and DNS in the same way. Their reference architectures in the repository don't consume the network stage yet; they still create their own VPC.

## Troubleshoot the network stage

### byo_vpc = true requires vpc_id, vpc_cidr and at least 3 private_subnet_ids

You set `byo_vpc = true` but left out the VPC ID, the CIDR block, or fewer than three private subnets. The stage checks them before anything is created. Add the missing values, and make sure the three subnets are in three different availability zones.

### byo_vpc = false but BYO inputs (vpc_id, vpc_cidr, subnet or route table IDs) are set

You passed VPC values but didn't set `byo_vpc = true`. Terraform would ignore them and create a new VPC instead. Set `byo_vpc = true`, or remove the VPC values.

### At least 3 availability zones are required

You asked the stage to create a VPC with fewer than three zones. Brokers and Aurora spread over three zones, so set `az_count` to three or more.

## Next steps

- [Compute](./compute.md)
- [Grow to two regions](./grow/single-to-dual-region.md)
