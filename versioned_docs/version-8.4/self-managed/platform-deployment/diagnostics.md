---
id: diagnostics
title: "Diagnostics"
sidebar_label: "Diagnostics"
description: "Get diagnostics and logs from a Helm chart deployment."
---

## Diagnostics collection script

This script automates the process of gathering logs and diagnostics from a Camunda Helm chart deployment running in a Kubernetes cluster. The script collects all relevant information (including pod logs, events, and resource details) into a single directory, and outputs it in a .zip file to make it easier to share this information with the Camunda Support team.

### What the script collects

The script outputs the following data from your namespace and creates a zip file containing the following:

- **Pod Information**: Current and previous logs and full pod descriptions.
- **Cluster Events**: Sorted by time to help identify recent issues.
- **Storage Details**: PV and PVC descriptions.
- **Cluster Nodes**: Node descriptions.
- **Network Resources**: Services, endpoints, and ingresses.
- **Configuration**: Config map information.

### Usage

1. Save the following script as `camunda-collect-diagnostics.sh` for example.
2. Make the script executable:

```bash
chmod +x camunda-collect-diagnostics.sh
```

3. Execute the script, replacing `<namespace>` with the namespace of your Camunda deployment:

```bash
./camunda-collect-diagnostics.sh --namespace <namespace>
```

4. Share the generated `.zip` archive with Camunda Support.

### Diagnostic collection script

```bash
#!/bin/bash

# Parse arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --namespace) namespace="$2"; shift ;;
    *) echo "Unknown parameter passed: $1"; exit 1 ;;
  esac
  shift
done

# Check if namespace is provided
if [[ -z "$namespace" ]]; then
  echo "ERROR: Namespace not provided. Please run the script with the --namespace parameter."
  echo "Example:"
  echo "  ./camunda-collect-diagnostics.sh --namespace camunda-platform"
  exit 1
fi

# Check if namespace exists
if ! kubectl get namespace "$namespace" > /dev/null 2>&1; then
  echo "ERROR: Namespace '$namespace' does not exist in the cluster."
  exit 1
fi

# Set output directory with timestamp
timestamp=$(date +"%Y%m%d-%H%M%S")
output_dir="camunda-diagnostics-logs-$timestamp"

# Start diagnostics collection
echo "========================================"
echo "Camunda Diagnostics Collection Script"
echo "========================================"
echo "Namespace: $namespace"
echo "Output Directory: $output_dir"
echo "Current kubectl context: $(kubectl config current-context)"
echo "========================================"

# Create output directory
mkdir -p "$output_dir" && cd "$output_dir"

# Collect general Kubernetes resources
echo "Collecting resource information..."

echo "  - Collecting pod information (current state of all pods in the namespace)."
kubectl get pod -n "$namespace" -o wide > pods.txt

echo "  - Collecting cluster events (recent events in the namespace)."
kubectl get events -n "$namespace" --sort-by='.lastTimestamp' > events.txt

echo "  - Collecting Persistent Volume Claims (PVCs) descriptions (storage claims in the namespace)."
kubectl describe pvc -n "$namespace" > pvc-describe.txt

echo "  - Collecting Persistent Volumes (PVs) descriptions (underlying storage volumes)."
for pvc in $(kubectl get pvc -n "$namespace" --no-headers -o custom-columns=":spec.volumeName"); do
  echo "    - Collecting information for PV: $pvc"
  kubectl describe pv "$pvc" >> pv-describe.txt
done

echo "  - Collecting service information (list of services in the namespace)."
kubectl get svc -n "$namespace" > services.txt

echo "  - Collecting detailed service descriptions (configuration of services)."
kubectl describe svc -n "$namespace" > services-describe.txt

echo "  - Collecting endpoint information (list of endpoints in the namespace)."
kubectl get ep -n "$namespace" > endpoints.txt

echo "  - Collecting detailed endpoint descriptions (configuration of endpoints)."
kubectl describe ep -n "$namespace" > endpoints-describe.txt

echo "  - Collecting ingress descriptions (configuration of ingress resources)."
kubectl describe ing -n "$namespace" > ingresses-describe.txt

echo "  - Collecting config map information (configuration data stored in the namespace)."
kubectl get cm -n "$namespace" -o yaml > configmaps.yaml

echo "  - Collecting node information:"
for node in $(kubectl get pods -n "$namespace" -o custom-columns=":spec.nodeName" --no-headers | sort | uniq); do
  echo "    - Collecting information for node: $node"
  kubectl describe node "$node" >> node-describe.txt
  echo "" >> node-describe.txt
done

echo "  - Collecting logs and descriptions for each pod..."
for pod in $(kubectl get pod -n "$namespace" --no-headers -o custom-columns=":metadata.name"); do
  echo "    - Collecting logs for pod: $pod"
  kubectl logs -n "$namespace" "$pod" > "$pod.log" 2>/dev/null
  kubectl logs -n "$namespace" "$pod" -p > "${pod}-previous.log" 2>/dev/null
  kubectl describe pod -n "$namespace" "$pod" > "describe-$pod.log" 2>/dev/null
done
echo "All logs and descriptions collected."

# Compress the output directory
echo "Compressing collected diagnostics into ${output_dir}.zip..."
cd ..
zip -r "${output_dir}.zip" "$output_dir" > /dev/null
echo "Diagnostics collected and compressed into ${output_dir}.zip."

# Final message
echo "========================================"
echo "Diagnostics collection completed."
echo "Please share the file '${output_dir}.zip' with the Camunda Support team."
echo ""
echo "To clean up the generated files and folder, run the following command:"
echo "  rm -rf $output_dir ${output_dir}.zip"
echo "========================================"
```
