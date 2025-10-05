---
id: kind
title: "Install kind and set up a local Kubernetes cluster"
sidebar_label: "kind (local)"
description: "Learn how to install kind and deploy Camunda 8 Self-Managed to a local Kubernetes cluster for development purposes."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { HelmChartValuesFileLocalLink } from "@site/src/components/CamundaDistributions";

This tutorial guides platform engineers and DevOps practitioners through setting up a local Kubernetes development environment using [kind (Kubernetes in Docker)](https://kind.sigs.k8s.io/) and deploying **Camunda 8 Self-Managed** to it.

:::tip
If you already have a Kubernetes cluster and want to go straight to installing Camunda 8, see the [quick install guide](/self-managed/deployment/helm/install/quick-install.md).
:::

By the end of this tutorial, you will have:

- kind installed on your local machine
- A running local Kubernetes cluster
- Camunda 8 Self-Managed deployed and accessible
- The knowledge to verify and interact with your cluster

## Prerequisites

Before you begin, ensure you have:

- Docker installed and running on your machine ([Docker Desktop](https://www.docker.com/products/docker-desktop) or Docker Engine)
- At least 4 GB of RAM available for the cluster
- Terminal access with administrator/sudo privileges (for some installation steps)

## Step 1: Install required tools

You'll need three command-line tools to complete this tutorial. Follow the installation instructions for your operating system.

### Install kind

kind (Kubernetes in Docker) allows you to run Kubernetes clusters in Docker containers, making it perfect for local development and testing.

<Tabs groupId="os" defaultValue="macos" values={[
{label: 'macOS', value: 'macos'},
{label: 'Linux', value: 'linux'},
{label: 'Windows', value: 'windows'}
]}>

<TabItem value="macos">

Using Homebrew:

```shell
brew install kind
```

Or download the binary directly:

```shell
# For Intel Macs
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-darwin-amd64
# For M1/M2 Macs
[ $(uname -m) = arm64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-darwin-arm64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

</TabItem>

<TabItem value="linux">

```shell
# For AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
# For ARM64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-arm64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

</TabItem>

<TabItem value="windows">

Using PowerShell:

```powershell
curl.exe -Lo kind-windows-amd64.exe https://kind.sigs.k8s.io/dl/v0.20.0/kind-windows-amd64
Move-Item .\kind-windows-amd64.exe c:\some-dir-in-your-PATH\kind.exe
```

Or using [Chocolatey](https://chocolatey.org/packages/kind):

```powershell
choco install kind
```

</TabItem>

</Tabs>

Verify the installation:

```shell
kind version
```

You should see output similar to: `kind v0.20.0 go1.20.4 linux/amd64`

### Install kubectl

kubectl is the Kubernetes command-line tool that lets you interact with your cluster.

<Tabs groupId="os" defaultValue="macos" values={[
{label: 'macOS', value: 'macos'},
{label: 'Linux', value: 'linux'},
{label: 'Windows', value: 'windows'}
]}>

<TabItem value="macos">

Using Homebrew:

```shell
brew install kubectl
```

Or download the binary:

```shell
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/amd64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
```

</TabItem>

<TabItem value="linux">

```shell
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
```

</TabItem>

<TabItem value="windows">

Using PowerShell:

```powershell
curl.exe -LO "https://dl.k8s.io/release/v1.28.0/bin/windows/amd64/kubectl.exe"
```

Or using [Chocolatey](https://chocolatey.org/):

```powershell
choco install kubernetes-cli
```

</TabItem>

</Tabs>

Verify the installation:

```shell
kubectl version --client
```

### Install Helm

Helm is a package manager for Kubernetes that simplifies deploying applications.

<Tabs groupId="os" defaultValue="macos" values={[
{label: 'macOS', value: 'macos'},
{label: 'Linux', value: 'linux'},
{label: 'Windows', value: 'windows'}
]}>

<TabItem value="macos">

Using Homebrew:

```shell
brew install helm
```

</TabItem>

<TabItem value="linux">

```shell
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

</TabItem>

<TabItem value="windows">

Using [Chocolatey](https://chocolatey.org/):

```powershell
choco install kubernetes-helm
```

</TabItem>

</Tabs>

Verify the installation:

```shell
helm version
```

## Step 2: Create your local Kubernetes cluster

Now that you have all the required tools installed, you'll create a local Kubernetes cluster using kind.

### Choose your cluster configuration

Depending on how you plan to access Camunda 8, you can create either a basic cluster (recommended for first-time users) or a cluster with Ingress support (for more advanced networking).

<Tabs groupId="cluster-type" defaultValue="basic" queryString values={[
{label: 'Basic cluster (recommended)', value: 'basic'},
{label: 'Cluster with Ingress support', value: 'ingress'}
]}>

<TabItem value="basic">

For most users getting started with Camunda 8, a basic cluster is sufficient. You'll access services using port-forwarding.

Create the cluster with this command:

```shell
kind create cluster --name camunda-platform-local
```

This creates a single-node Kubernetes cluster running in a Docker container. The process takes about 1-2 minutes.

</TabItem>

<TabItem value="ingress">

If you want to access Camunda 8 services through proper domain names (like `camunda.local`), create a cluster with Ingress support.

First, create a configuration file named `kind-config.yaml`:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          kubeletExtraArgs:
            node-labels: "ingress-ready=true"
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
      - containerPort: 443
        hostPort: 443
      - containerPort: 26500
        hostPort: 26500
      - containerPort: 18080
        hostPort: 18080
```

Then create the cluster using this configuration:

```shell
kind create cluster --name camunda-platform-local --config kind-config.yaml
```

This configuration exposes additional ports that will be used by the Ingress controller and Camunda services.

</TabItem>

</Tabs>

### Verify your cluster is running

After creating the cluster, verify that it's working correctly:

1. Check the cluster information:

```shell
kubectl cluster-info --context kind-camunda-platform-local
```

You should see output showing the Kubernetes control plane is running, similar to:

```
Kubernetes control plane is running at https://127.0.0.1:xxxxx
CoreDNS is running at https://127.0.0.1:xxxxx/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

2. List all nodes in your cluster:

```shell
kubectl get nodes
```

You should see one node with the `Ready` status:

```
NAME                                    STATUS   ROLES           AGE   VERSION
camunda-platform-local-control-plane   Ready    control-plane   2m    v1.27.3
```

3. Check that system pods are running:

```shell
kubectl get pods -n kube-system
```

You should see several pods in the `Running` state, including `coredns`, `etcd`, `kube-apiserver`, and others.

4. View all namespaces:

```shell
kubectl get namespaces
```

You should see the default Kubernetes namespaces:

```
NAME              STATUS   AGE
default           Active   2m
kube-node-lease   Active   2m
kube-public       Active   2m
kube-system       Active   2m
```

Congratulations! Your local Kubernetes cluster is now ready.

## Step 3: (Optional) Set up Ingress controller

This step is optional and only required if you created your cluster with Ingress support in Step 2. If you created a basic cluster, skip to [Step 4](#step-4-deploy-camunda-8).

### Install the Ingress NGINX controller

The Ingress controller manages external access to services in your cluster.

1. Install the Ingress NGINX controller:

```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

2. Wait for the Ingress controller to be ready (this may take 2-3 minutes):

```shell
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
```

3. Verify the Ingress controller is running:

```shell
kubectl get pods -n ingress-nginx
```

You should see the `ingress-nginx-controller` pod in `Running` state.

4. Check the Ingress controller service:

```shell
kubectl get services -n ingress-nginx
```

### Configure local DNS resolution

To access Camunda services using friendly domain names, add local hostname mappings:

<Tabs groupId="os" defaultValue="macos" values={[
{label: 'macOS/Linux', value: 'macos'},
{label: 'Windows', value: 'windows'}
]}>

<TabItem value="macos">

Edit the `/etc/hosts` file with administrator privileges:

```shell
sudo nano /etc/hosts
```

Add these lines at the end:

```
127.0.0.1 camunda.local
127.0.0.1 zeebe.camunda.local
```

Save the file (Ctrl+O, Enter, Ctrl+X in nano).

</TabItem>

<TabItem value="windows">

Open Notepad as Administrator and open the file `C:\Windows\System32\drivers\etc\hosts`.

Add these lines at the end:

```
127.0.0.1 camunda.local
127.0.0.1 zeebe.camunda.local
```

Save the file.

</TabItem>

</Tabs>

Verify DNS resolution:

```shell
ping -c 1 camunda.local
```

## Step 4: Deploy Camunda 8

Now you'll deploy Camunda 8 to your Kubernetes cluster using Helm.

### Add the Camunda Helm repository

1. Add the Camunda 8 Helm repository:

```shell
helm repo add camunda https://helm.camunda.io
```

2. Update your Helm repositories to fetch the latest charts:

```shell
helm repo update
```

3. Verify the Camunda repository was added:

```shell
helm search repo camunda
```

You should see the available Camunda charts listed.

### Download and configure values

1. Download the Camunda 8 <HelmChartValuesFileLocalLink/> optimized for local development.

2. If you set up Ingress in Step 3, add the following Ingress configuration to your `values-local.yaml` file:

```yaml
global:
  ingress:
    enabled: true
    className: nginx
    host: "camunda.local"

operate:
  contextPath: "/operate"

tasklist:
  contextPath: "/tasklist"

zeebeGateway:
  ingress:
    enabled: true
    className: nginx
    host: "zeebe.camunda.local"
```

### Install Camunda 8

Install Camunda 8 using the Helm chart:

```shell
helm install camunda-platform camunda/camunda-platform \
    -f values-local.yaml
```

:::note
The installation will download Docker images for all Camunda 8 components. Depending on your internet connection, this may take 5-10 minutes.
:::

### Verify the deployment

Monitor the deployment progress:

1. Watch pods being created and starting:

```shell
kubectl get pods -w
```

Press Ctrl+C to stop watching once all pods are running.

2. Check the status of all pods:

```shell
kubectl get pods
```

Wait until all pods show `Running` status and are ready (e.g., `1/1` or `2/2` in the READY column):

```
NAME                                                   READY   STATUS    RESTARTS   AGE
camunda-platform-operate-xxx                          1/1     Running   0          5m
camunda-platform-tasklist-xxx                         1/1     Running   0          5m
camunda-platform-zeebe-0                              1/1     Running   0          5m
camunda-platform-zeebe-gateway-xxx                    1/1     Running   0          5m
...
```

3. If a pod is stuck in `Pending` state, check why:

```shell
kubectl describe pod <POD_NAME>
```

Look for events at the bottom of the output that explain the issue (usually insufficient resources).

4. Check all services that were created:

```shell
kubectl get services
```

5. Verify the Helm release:

```shell
helm list
```

You should see `camunda-platform` with a status of `deployed`.

## Step 5: Access Camunda 8 components

By default, Camunda services in Kubernetes are not accessible from outside the cluster. Depending on whether you set up Ingress, you'll access them differently.

:::note
This local setup uses simplified authentication with username and password `demo`/`demo` for all components.
:::

<Tabs groupId="cluster-type" defaultValue="basic" queryString values={[
{label: 'Basic cluster (port-forwarding)', value: 'basic'},
{label: 'Cluster with Ingress', value: 'ingress'}
]}>

<TabItem value="basic">

### Using port-forwarding

Port-forwarding tunnels traffic from your local machine to services running in the cluster. This is perfect for development and testing.

#### Access the Zeebe Gateway

The Zeebe Gateway handles workflow engine interactions. Forward port 26500:

```shell
kubectl port-forward svc/camunda-platform-zeebe-gateway 26500:26500
```

Keep this terminal open. The gateway is now accessible at `localhost:26500`.

You can test the connection:

```shell
# In a new terminal, check if the port is listening
curl -v telnet://localhost:26500
```

#### Access web applications

Get port-forward commands for all components:

```shell
helm status camunda-platform
```

This displays commands to access each component. Common examples:

**Operate** (monitor workflow instances):

```shell
kubectl port-forward svc/camunda-platform-operate 8081:80
```

Access at: http://localhost:8081

**Tasklist** (user task management):

```shell
kubectl port-forward svc/camunda-platform-tasklist 8082:80
```

Access at: http://localhost:8082

**Optimize** (analytics and reports):

```shell
kubectl port-forward svc/camunda-platform-optimize 8083:80
```

Access at: http://localhost:8083

:::tip
Open a separate terminal for each port-forward command, as they need to stay running. Alternatively, run them in the background or use a terminal multiplexer like `tmux`.
:::

#### Verify connectivity

1. List all services and their ports:

```shell
kubectl get services
```

2. Check which ports are currently forwarded on your machine:

```shell
lsof -i -P | grep kubectl
```

</TabItem>

<TabItem value="ingress">

### Using Ingress

With Ingress configured, you can access Camunda components using domain names.

#### Verify Ingress resources

Check that Ingress routes were created:

```shell
kubectl get ingress
```

You should see ingress resources for various Camunda components.

#### Access the components

The Camunda web applications are available at:

- **Operate**: http://camunda.local/operate
- **Tasklist**: http://camunda.local/tasklist
- **Optimize**: http://camunda.local/optimize

For the Zeebe Gateway (gRPC communication):

- **Zeebe Gateway**: zeebe.camunda.local:26500

#### Verify connectivity

Test web application access:

```shell
curl -I http://camunda.local/operate
```

You should receive an HTTP response (likely a redirect to a login page).

For more details on Ingress configuration, see the [Ingress setup guide](/self-managed/deployment/helm/configure/ingress-setup.md).

</TabItem>

</Tabs>

### Login to web applications

Open your browser and navigate to Operate, Tasklist, or Optimize using the URLs above. Login with:

- **Username**: `demo`
- **Password**: `demo`

## Step 6: Explore your cluster

Now that Camunda 8 is running, familiarize yourself with your Kubernetes environment using these commands.

### View cluster resources

List all resources in the default namespace:

```shell
kubectl get all
```

This shows pods, services, deployments, and other resources.

### Inspect pods

Get detailed information about a specific pod:

```shell
kubectl describe pod <POD_NAME>
```

View logs from a pod:

```shell
kubectl logs <POD_NAME>
```

For pods with multiple containers, specify the container:

```shell
kubectl logs <POD_NAME> -c <CONTAINER_NAME>
```

Follow logs in real-time:

```shell
kubectl logs -f <POD_NAME>
```

### Check resource usage

See CPU and memory usage (requires metrics-server, not installed by default in kind):

```shell
kubectl top nodes
kubectl top pods
```

### View deployments and statefulsets

```shell
kubectl get deployments
kubectl get statefulsets
```

### Explore namespaces

Check all namespaces in your cluster:

```shell
kubectl get namespaces
```

View resources in a specific namespace:

```shell
kubectl get all -n ingress-nginx
```

### Check persistent volumes

If using persistence:

```shell
kubectl get pv
kubectl get pvc
```

## Next steps

Congratulations! You now have a fully functional local Kubernetes cluster with Camunda 8 running. Here are some things you can do next:

- **Deploy your first process**: Visit the [getting started guide](/guides/getting-started/) to learn how to model and deploy a BPMN process.
- **Explore the APIs**: Check out the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) documentation.
- **Configure Identity**: Set up proper authentication by configuring [Camunda Identity](#todo).
- **Learn about production deployment**: Review the [production deployment guide](#todo) when you're ready to deploy to a real cluster.

## Troubleshooting

### Pods won't start

If pods are stuck in `Pending` or `CrashLoopBackOff`:

1. Check pod events:

   ```shell
   kubectl describe pod <POD_NAME>
   ```

2. Check logs:

   ```shell
   kubectl logs <POD_NAME>
   ```

3. Verify resources are available:
   ```shell
   docker stats
   ```

### Can't connect to services

1. Verify services exist:

   ```shell
   kubectl get services
   ```

2. Check that pods are running:

   ```shell
   kubectl get pods
   ```

3. For port-forwarding, ensure the terminal running the port-forward command is still active.

4. For Ingress, verify:
   ```shell
   kubectl get ingress
   kubectl get pods -n ingress-nginx
   ```

### Delete and recreate the cluster

If you need to start fresh:

:::warning
This is a destructive action and will delete all data in your local cluster.
:::

```shell
kind delete cluster --name camunda-platform-local
```

Then follow the tutorial again from [Step 2](#step-2-create-your-local-kubernetes-cluster).

## Additional resources

- [kind documentation](https://kind.sigs.k8s.io/)
- [kubectl cheat sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Helm deployment guide](/self-managed/deployment/helm/install/quick-install.md)
- [Camunda 8 architecture](#todo)
