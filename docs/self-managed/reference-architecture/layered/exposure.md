---
id: exposure
title: "Expose the cluster to users and clients"
sidebar_label: "Exposure"
description: "Create the load balancers in front of a Camunda 8 deployment on AWS, add TLS with your own certificate, and point your DNS name at the cluster."
---

The exposure layer creates the load balancers that users and clients reach, and nothing else: it creates no routing rules. The components attach their own path rules to the listeners that the layer publishes.

## Choose what you expose

| Endpoint               | Load balancer                      | Port       | Default                                                            |
| ---------------------- | ---------------------------------- | ---------- | ------------------------------------------------------------------ |
| Web applications, REST | Application Load Balancer (public) | 80, or 443 | Plain HTTP on 80, open to the internet. Suited to a demonstration. |
| gRPC                   | Network Load Balancer (public)     | 26500      | Open to the CIDR blocks you allow                                  |
| Management             | The Application Load Balancer      | 9600       | A listener without a rule: the endpoint isn't reachable            |
| Broker traffic         | Network Load Balancer (internal)   | 26502      | Created when you set `enable_raft_nlb = true`                      |

### Keep the management endpoint private

The management endpoint on 9600 is unauthenticated. The Camunda layer leaves its rule off, and you shouldn't turn it on without a reason. Reach it from a jump host, a VPN connected to the VPC, or ECS Exec, as the [add-zone script](./evolve-single-to-dual-region.md#9-add-the-zone) does.

### Restrict access

`limit_access_to_cidrs` defaults to `0.0.0.0/0`. Set it to the CIDR blocks of your users and clients before you expose a real workload.

### Create the internal load balancer from the start

The internal load balancer carries the traffic between brokers on 26502. A single region doesn't use it. Brokers of a second region join the cluster through it, and adding it later can make Terraform replace the Orchestration Cluster ECS service. Set `enable_raft_nlb = true` and, in the Camunda layer, `enable_raft_listener = true`. The examples set both.

## Add TLS

TLS is opt-in. You bring a certificate and a DNS name, and the layer serves HTTPS.

1. Request or import a certificate in AWS Certificate Manager for the DNS name that clients will use, for example `camunda.example.com`, in the region of the load balancer.
1. Set both variables in `exposure.tfvars`:

   ```hcl
   alb_certificate_arn = "arn:aws:acm:eu-west-1:111111111111:certificate/abc"
   alb_public_hostname = "camunda.example.com"
   ```

1. Apply the layer. The load balancer serves HTTPS on 443, and port 80 redirects to it.
1. Create the DNS record yourself. Point `camunda.example.com` at the output `alb_dns_name`, with an alias or CNAME record in your DNS service. The layer doesn't manage DNS.

The hostname is required with a certificate. ACM doesn't issue certificates for the load balancer's own `*.elb.amazonaws.com` name, so every issuer and redirect URL is built from the hostname that you set.

## Create the exposure layer

1. Set the variables of the layer in `exposure.tfvars`:

   ```hcl
   prefix          = "camunda-demo"
   enable_raft_nlb = true

   # limit_access_to_cidrs = ["203.0.113.0/24"]
   ```

1. Apply the layers in order:

   ```bash
   ./procedure/compose.sh apply examples/greenfield
   ```

1. Read the address of the load balancer:

   ```bash
   terraform -chdir=terraform/exposure output alb_dns_name
   ```

## Use the layer inputs and outputs

| Input                             | Source        | Purpose                                                                 |
| --------------------------------- | ------------- | ----------------------------------------------------------------------- |
| `vpc_id`                          | Network layer | VPC of the load balancers and their security groups                     |
| `public_subnet_ids`               | Network layer | Subnets of the internet-facing load balancers                           |
| `private_subnet_ids`              | Network layer | Subnets of the internal load balancer. Required with `enable_raft_nlb`. |
| `camunda_ports_security_group_id` | Compute layer | Opens the Camunda ports inside the VPC                                  |

| Output                              | Used by                                                                    |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `alb_listener_http_webapp_arn`      | Camunda layer: HTTPS 443 with a certificate, HTTP 80 without               |
| `alb_listener_http_management_arn`  | Camunda layer: the management listener                                     |
| `nlb_grpc_arn`                      | Camunda layer: gRPC listener                                               |
| `nlb_raft_arn`, `nlb_raft_dns_name` | Camunda layer and the second region, empty unless `enable_raft_nlb` is set |
| `alb_dns_name`, `nlb_grpc_dns_name` | You: the targets of your DNS records                                       |
| `public_base_url`                   | Identity layer: the scheme and host that OIDC redirect URIs are built from |

## Troubleshoot the exposure layer

### alb_public_hostname must be set when alb_certificate_arn is set.

You set a certificate without a DNS name. Set `alb_public_hostname` to the name on the certificate. Without it, redirects and issuers would use the load balancer's own name, which no certificate can cover.

### enable_raft_nlb = true requires private_subnet_ids (at least 3).

The internal load balancer needs three private subnets. Pass the `private_subnet_ids` output of the network layer. The helper script does it for you.

### The browser reports a certificate name mismatch

The DNS record doesn't point at the load balancer, or you opened the load balancer's own name. Open the page with the hostname from `alb_public_hostname`, and check that the record points at `alb_dns_name`.

## Next steps

- [Configure Camunda](./camunda-configuration.md)
- [Grow from one region to two](./evolve-single-to-dual-region.md)
