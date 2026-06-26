---
id: diagnostics
sidebar_label: Collecting diagnostics
title: Helm chart diagnostics
description: "Get diagnostics and logs from a Helm chart deployment."
---

## Diagnostics collection script

This script automates the process of gathering logs and diagnostics from a Camunda Helm chart deployment running in a Kubernetes cluster. The script collects all relevant information (including pod logs, events, and resource details) into a single directory, and outputs it in a .zip file to make it easier to share this information with the Camunda Support team.

:::caution Data privacy notice
Before sharing the generated diagnostics file with Camunda Support, review and remove any sensitive information such as passwords, API keys, personal data, or business-sensitive data from the collected logs and configuration data. This includes the collected actuator outputs: the `configprops` endpoint masks credential-like values, but connection URLs, hostnames, and bucket names are not redacted.
:::

### What the script collects

The script outputs the following data from your namespace and creates a zip file containing the following:

- **Pod Information**: Current and previous logs and full pod descriptions.
- **Cluster Events**: Sorted by time to help identify recent issues.
- **Storage Details**: PV and PVC descriptions.
- **Cluster Nodes**: Node descriptions.
- **Network Resources**: Services, endpoints, and ingresses.
- **Configuration**: Config map information.
- **Actuator endpoints**: Read-only Zeebe and Spring Boot actuator outputs from Camunda pods (partition status, cluster topology, exporters, flow control, job streams, backup state, Prometheus metrics, and configuration properties).

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

4. **Review the generated `.zip` archive** and remove any sensitive or personally identifiable information (PII) before sharing.

5. Share the reviewed `.zip` archive with Camunda Support.

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

echo "  - Collecting Kubernetes version."
kubectl version -o yaml > kubernetes-version.txt

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

echo "  - Collecting Storage Classes information:"
kubectl get storageclass -o yaml > storageclasses.txt
kubectl describe storageclass > storageclasses-describe.txt

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

# Collect Helm resources
echo "  - Collecting information via Helm..."
release_name=`helm list -n "$namespace" --no-headers -q` 2>/dev/null
if [[ -z "$release_name" ]]; then
  echo "    INFO: unable to detect Camunda release name, so Helm values.yaml will not be collected. Install \"helm\" command, make it available in the PATH and re-run the script. (Alternatively, upload \"values.yaml\" separately)"
else
  helm version > helm-version.txt
  helm history -n "$namespace" "$release_name" > helm-history.txt
  helm get values -n "$namespace" "$release_name" > helm-values.yaml
fi

# Collect read-only actuator endpoints from Camunda pods
echo "  - Collecting actuator endpoints from Camunda pods..."
if ! command -v curl > /dev/null 2>&1; then
  echo "    INFO: 'curl' not found in PATH; skipping actuator collection. Install \"curl\", make it available in the PATH and re-run the script to include actuator data."
  # Leave a breadcrumb in the archive so Support can tell this newer script ran but curl was
  # missing, rather than the actuator data being a partial or failed collection.
  printf '%s\n' \
    "Actuator collection was attempted but skipped: the 'curl' command was not found in the PATH" \
    "on the machine that ran this script." \
    "" \
    "As a result, no '<pod>-actuator-*' files are included in this archive. This is not a partial" \
    "or failed collection of actuator data - it was not attempted at all. There is no need to" \
    "re-run the script for this reason unless the actuator outputs are specifically required;" \
    "in that case, install \"curl\", make it available in the PATH, and run the script again." \
    > actuator-collection-skipped.txt
else
  # The management endpoint defaults to port 9600 on Camunda orchestration-cluster / Zeebe pods.
  # We port-forward it per pod (no in-pod tooling required) and collect only read-only GET endpoints.
  # The custom Zeebe actuators exist only on broker/gateway pods; "prometheus" and "configprops"
  # exist on all Camunda Spring Boot components. Mutating endpoints (exporting, banning, rebalance,
  # backup take/delete, and the cluster/exporters/partitions write operations) are intentionally
  # NOT collected, as they would change cluster state.
  management_port=9600
  actuators="partitions:json cluster:json exporters:json flowControl:json jobstreams:json backupRuntime/state:json prometheus:txt configprops:json"

  # Only Camunda components expose actuators, so restrict the loop to them via the chart label.
  # Fall back to all pods if the label is absent (e.g. a non-Helm install).
  actuator_pods=$(kubectl get pod -n "$namespace" -l app.kubernetes.io/part-of=camunda-platform --no-headers -o custom-columns=":metadata.name" 2>/dev/null)
  if [[ -z "$actuator_pods" ]]; then
    actuator_pods=$(kubectl get pod -n "$namespace" --no-headers -o custom-columns=":metadata.name")
  fi

  # Make sure any port-forward we start is torn down, even on Ctrl-C or an error.
  pf_pid=""
  pf_log=""
  cleanup_port_forward() {
    [[ -n "$pf_pid" ]] && kill "$pf_pid" 2>/dev/null
    [[ -n "$pf_pid" ]] && wait "$pf_pid" 2>/dev/null
    [[ -n "$pf_log" ]] && rm -f "$pf_log"
    pf_pid=""
    pf_log=""
  }
  trap cleanup_port_forward EXIT INT TERM

  for pod in $actuator_pods; do
    # Open a port-forward on an ephemeral local port chosen by kubectl (no clash with bound ports).
    # kubectl can fail to establish the tunnel transiently, so retry a few times; a pod that never
    # establishes is skipped after the attempts and the rest of the run continues.
    local_port=""
    attempt=0
    while [[ -z "$local_port" && "$attempt" -lt 3 ]]; do
      attempt=$((attempt + 1))
      # mktemp without a template is not portable (fails on macOS), so fall back progressively.
      pf_log=$(mktemp 2>/dev/null || mktemp -t camunda-diag 2>/dev/null || echo "./.actuator-pf.$$.${attempt}")
      kubectl port-forward -n "$namespace" "$pod" ":${management_port}" > "$pf_log" 2>&1 &
      pf_pid=$!
      # Wait until the tunnel is established (kubectl prints the chosen port), or give up early if
      # the forward dies first (e.g. the pod does not expose the management port).
      for _ in $(seq 1 10); do
        local_port=$(sed -n 's/.*Forwarding from 127.0.0.1:\([0-9]*\) ->.*/\1/p' "$pf_log" | head -1)
        [[ -n "$local_port" ]] && break
        kill -0 "$pf_pid" 2>/dev/null || break
        sleep 1
      done
      [[ -z "$local_port" ]] && cleanup_port_forward
    done

    if [[ -n "$local_port" ]]; then
      collected=""
      for entry in $actuators; do
        actuator_path="${entry%%:*}"
        ext="${entry##*:}"
        name=$(echo "$actuator_path" | tr '/' '-')
        if curl -sf -m 10 "http://localhost:${local_port}/actuator/${actuator_path}" -o "${pod}-actuator-${name}.${ext}" 2>/dev/null; then
          collected="${collected} ${name}"
        fi
      done
      if [[ -n "$collected" ]]; then
        echo "    - Collected actuators from pod ${pod}:${collected}"
      fi
      cleanup_port_forward
    fi
  done

  trap - EXIT INT TERM
fi

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
