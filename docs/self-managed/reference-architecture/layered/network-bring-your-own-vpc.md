---
id: network-bring-your-own-vpc
title: "Bring your own VPC"
sidebar_label: "Network: bring your own VPC"
description: "Use an existing AWS VPC for a Camunda 8 Self-Managed deployment by passing its IDs to the network layer instead of creating a new network."
---

You can deploy Camunda 8 into a VPC that you already have by passing its IDs to the network layer, which then creates nothing and checks your inputs. Every other layer reads the same outputs whether the VPC is new or yours.

## Choose a network source

| Option             | When to use it                                                                                | What you provide                                                              |
| ------------------ | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Create a VPC       | You have no network yet, or you're evaluating.                                                | A name and a CIDR block. Defaults create three availability zones.            |
| Bring your own VPC | You deploy into an existing AWS landing zone, with its own address plan, routing, and egress. | The VPC ID, its CIDR block, and subnet IDs, as described in the next section. |

Creating a VPC is the default. Bringing your own VPC doesn't change anything else in the deployment.

## Meet the requirements of your VPC

Camunda places ECS tasks, the database, and load balancers in your subnets. Check each requirement before you apply.

| Requirement                                                         | Why                                                                                                                   |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| At least three private subnets in three distinct availability zones | Brokers and the Aurora cluster spread over three zones.                                                               |
| At least three public subnets with a route to an internet gateway   | Only if you expose Camunda through an internet-facing load balancer. Leave them out for an internal-only setup.       |
| DNS support and DNS hostnames enabled on the VPC                    | Amazon EFS and AWS Cloud Map service discovery need them.                                                             |
| Outbound access from the private subnets                            | Tasks pull images and read AWS Secrets Manager. Use a NAT gateway or VPC endpoints.                                   |
| A CIDR block that doesn't overlap your other networks               | You need this to connect a second region later. See [grow from one region to two](./evolve-single-to-dual-region.md). |
| (Optional) One private route table ID                               | Only needed later, for routes to a peered or transit gateway network.                                                 |

Check the VPC attributes and the subnet zones with the AWS CLI:

```bash
aws ec2 describe-vpc-attribute --vpc-id vpc-0123456789abcdef0 --attribute enableDnsSupport
aws ec2 describe-vpc-attribute --vpc-id vpc-0123456789abcdef0 --attribute enableDnsHostnames
aws ec2 describe-subnets --subnet-ids subnet-0aaa subnet-0bbb subnet-0ccc \
  --query 'Subnets[].[SubnetId,AvailabilityZone,CidrBlock]' --output table
```

Both VPC attributes must return `true`, and the three subnets must list three different availability zones.

## Pass your VPC to the network layer

1. Write the variables of the network layer:

   ```hcl
   prefix  = "camunda-demo"
   byo_vpc = true

   vpc_id   = "vpc-0123456789abcdef0"
   vpc_cidr = "10.20.0.0/16"

   private_subnet_ids = ["subnet-0aaa", "subnet-0bbb", "subnet-0ccc"]
   public_subnet_ids  = ["subnet-0ddd", "subnet-0eee", "subnet-0fff"]

   private_route_table_ids = ["rtb-0123"]
   ```

1. From `aws/containers/ecs-layered` in the reference repository, copy `examples/byo-vpc` and put the variables above in its `network.tfvars`. Set the same `prefix` in the other files.
1. Apply the layers in order. The network layer creates no AWS resources: it validates the values and publishes them as outputs, and the helper script passes them to the next layers.

   ```bash
   export TF_STATE_BUCKET=my-state-bucket TF_STATE_REGION=eu-west-1
   ./procedure/compose.sh apply examples/byo-vpc
   ```

The outputs of the network layer are the contract that the next layers consume:

| Output                    | Used by                                                     |
| ------------------------- | ----------------------------------------------------------- |
| `vpc_id`                  | Compute, secondary storage, exposure, Camunda               |
| `vpc_cidr`                | Compute and secondary storage, for the security group rules |
| `private_subnet_ids`      | Secondary storage, Camunda, and the internal load balancer  |
| `public_subnet_ids`       | Exposure                                                    |
| `private_route_table_ids` | The interconnect, when you add a second region              |

## Use the same VPC for Amazon EKS

The network layer doesn't depend on the compute option. The contract above is the same for Amazon EKS, which needs subnets, a CIDR block, and DNS in the same way. The EKS reference architectures in the repository don't consume the network layer yet; they still create their own VPC.

## Troubleshoot the network layer

### byo_vpc = true requires vpc_id, vpc_cidr and at least 3 private_subnet_ids

You set `byo_vpc = true` but left out the VPC ID, the CIDR block, or fewer than three private subnets. The layer checks them before anything is created. Add the missing values, and make sure the three subnets are in three different availability zones.

### byo_vpc = false but BYO inputs (vpc_id, vpc_cidr, subnet or route table IDs) are set

You passed VPC values but didn't set `byo_vpc = true`. Terraform would ignore them and create a new VPC instead. Set `byo_vpc = true`, or remove the VPC values.

### At least 3 availability zones are required

You asked the layer to create a VPC with fewer than three zones. Brokers and Aurora spread over three zones, so set `az_count` to three or more.

## Next steps

- [Choose between Amazon EKS and Amazon ECS](./compute-eks-vs-ecs.md)
- [Grow from one region to two](./evolve-single-to-dual-region.md)
