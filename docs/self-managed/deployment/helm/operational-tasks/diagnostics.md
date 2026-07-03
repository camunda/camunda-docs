---
id: diagnostics
sidebar_label: Collecting diagnostics
title: Helm chart diagnostics
description: "Get diagnostics and logs from a Helm chart deployment."
---

## Diagnostics collection script

This script automates the process of gathering logs and diagnostics from a Camunda Helm chart deployment running in a Kubernetes cluster. The script collects all relevant information (including pod logs, events, resource details, and Elasticsearch/OpenSearch index data) into a single directory, and outputs it in a .zip file to make it easier to share this information with the Camunda Support team.

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
- **Elasticsearch/OpenSearch Data** (when an Elasticsearch or OpenSearch pod is deployed in the same namespace):
  - Cluster health, node stats, and allocation details.
  - Index list sorted by name, aliases, shards, and segments.
  - Index templates, component templates, and lifecycle policies (ILM for Elasticsearch, ISM for OpenSearch).
  - Camunda import position documents for Operate, Tasklist, and Optimize.
  - Operate post-importer queue document count and a sample of recent entries.
  - Zeebe exporter index statistics: document counts and min/max sequence numbers per value type and partition.

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

#### Required/Optional flags

| Flag | Description |
| --- | --- |
| `--namespace <namespace>` | **(Required)** Kubernetes namespace of your Camunda deployment. |
| `--skip-es-os` | Skip Elasticsearch/OpenSearch diagnostics entirely. |
| `--skip-data` | Skip exporting data from indexes (post-importer queue documents). |
| `--es-user <user>` | Username for Elasticsearch/OpenSearch basic authentication. |
| `--es-password <password>` | Password for Elasticsearch/OpenSearch basic authentication. |
| `--es-port <port>` | Elasticsearch/OpenSearch port (default: `9200`). |

### Diagnostic collection script

```bash
#!/bin/bash

# Parse arguments
skip_es_os=false
skip_data=false
es_user=""
es_password=""
es_port=9200

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --namespace) namespace="$2"; shift ;;
    --skip-es-os) skip_es_os=true ;;
    --skip-data) skip_data=true ;;
    --es-user) es_user="$2"; shift ;;
    --es-password) es_password="$2"; shift ;;
    --es-port) es_port="$2"; shift ;;
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

echo "  - Collecting java threaddumps ..."
for pod in $(kubectl get pod -n "$namespace" --no-headers -o custom-columns=":metadata.name"); do
  if ! kubectl exec -n "$namespace" "$pod" -- which java > /dev/null 2>&1; then
    echo "    - Skipping pod: $pod as java not installed"
    continue
  fi
  if ! kubectl exec -n "$namespace" "$pod" -- which jattach > /dev/null 2>&1; then
    echo "    - Skipping pod: $pod as jattach not installed"
    continue
  fi
  if ! kubectl exec -n "$namespace" "$pod" -- which pgrep > /dev/null 2>&1; then
    echo "    - Skipping pod: $pod as pgrep not installed"
    continue
  fi
  java_pids=$(kubectl exec -n "$namespace" "$pod" -- pgrep java 2> /dev/null)
  for java_pid in $java_pids; do
    echo "    - Collecting threaddump from pod: ${pod}, java process: ${java_pid}"
    kubectl exec -n "$namespace" "$pod" -- jattach $java_pid threaddump > "${pod}-pid-${java_pid}.jstack" 2>/dev/null
  done
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

# ==============================================
# Collect Elasticsearch / OpenSearch diagnostics
# ==============================================

if [[ "$skip_es_os" == "true" ]]; then
  echo "Skipping Elasticsearch/OpenSearch diagnostics (--skip-es-os)."
else
  echo "========================================"
  echo "Elasticsearch/OpenSearch Diagnostics"
  echo "========================================"

  search_pod=""
  search_backend=""
  search_container=""

  es_pod=$(kubectl get pod -n "$namespace" -l "app.kubernetes.io/name=elasticsearch" \
    --no-headers -o custom-columns=":metadata.name" 2>/dev/null | grep -v "^$" | head -1)
  os_pod=$(kubectl get pod -n "$namespace" -l "app.kubernetes.io/name=opensearch" \
    --no-headers -o custom-columns=":metadata.name" 2>/dev/null | grep -v "^$" | head -1)

  if [[ -n "$es_pod" ]]; then
    search_pod="$es_pod"
    search_backend="Elasticsearch"
    search_container="elasticsearch"
    echo "Detected Elasticsearch pod: $search_pod"
  elif [[ -n "$os_pod" ]]; then
    search_pod="$os_pod"
    search_backend="OpenSearch"
    search_container="opensearch"
    echo "Detected OpenSearch pod: $search_pod"
  else
    echo "INFO: No Elasticsearch or OpenSearch pod detected in namespace '$namespace' — skipping search diagnostics."
    echo "  If you use an externally-managed cluster, collect and attach those diagnostics separately."
  fi

  if [[ -n "$search_pod" ]]; then
    search_dir="$search_container"
    mkdir -p "$search_dir"

    es_base="http://localhost:$es_port"

    auth_args=()
    if [[ -n "$es_user" ]]; then
      auth_args=(-u "$es_user:$es_password")
    fi

    run_es_curl() {
      kubectl exec -n "$namespace" "$search_pod" -c "$search_container" -- \
        curl -s --connect-timeout 10 "${auth_args[@]}" "$@" 2>/dev/null
    }

    echo "  - Testing connectivity to $search_backend..."
    if ! run_es_curl "$es_base/_cat/health" > /dev/null 2>&1; then
      echo "  WARNING: Cannot reach $search_backend at localhost:$es_port inside pod $search_pod."
      echo "           Skipping search diagnostics. Check that the pod is Running and healthy."
    else
      echo "  Connected to $search_backend. Collecting diagnostics..."

      echo "  - Collecting cluster health."
      run_es_curl "$es_base/_cluster/health?pretty" \
        > "$search_dir/cluster-health.json"
      run_es_curl "$es_base/_cluster/health?level=shards&pretty" \
        > "$search_dir/cluster-health-shards.txt"

      echo "  - Collecting cluster stats."
      run_es_curl "$es_base/_cluster/stats?pretty" \
        > "$search_dir/cluster-stats.json"

      echo "  - Collecting index information."
      run_es_curl "$es_base/_cat/aliases?v=true&format=json" \
        > "$search_dir/all-aliases.json"
      run_es_curl "$es_base/_cat/indices?v=true&s=index&h=health,status,index,id,pri,rep,docs.count,docs.deleted,store.size,creation.date.string&pretty" \
        > "$search_dir/all-indices.txt"
      run_es_curl "$es_base/_cat/shards?v" \
        > "$search_dir/shards.txt"
      run_es_curl "$es_base/_cat/segments?v&h=index,shard,segment,size,docs.count" \
        > "$search_dir/segments.txt"

      echo "  - Collecting node information."
      run_es_curl "$es_base/_cat/nodes?v&h=name,ip,heap.percent,heap.current,heap.max,ram.percent,cpu,load_1m,load_5m,load_15m,node.role,master" \
        > "$search_dir/nodes.txt"
      run_es_curl "$es_base/_nodes/stats/jvm,os,fs,indices,process,breaker?pretty" \
        > "$search_dir/nodes-stats.json"
      run_es_curl "$es_base/_cat/allocation?v=true&h=node,shards,disk.*" \
        > "$search_dir/nodes-allocation.txt"
      run_es_curl "$es_base/_nodes/hot_threads" \
        > "$search_dir/hot-threads.txt"

      echo "  - Collecting performance diagnostics."
      run_es_curl "$es_base/_tasks?pretty&detailed=true" \
        > "$search_dir/tasks.json"
      run_es_curl "$es_base/_cat/thread_pool?v" \
        > "$search_dir/thread-pool.txt"
      run_es_curl "$es_base/_stats/indexing,search?pretty" \
        > "$search_dir/stats-indexing-search.json"

      echo "  - Collecting index templates and lifecycle policies."
      run_es_curl "$es_base/_index_template?pretty" \
        > "$search_dir/index-templates.json"
      run_es_curl "$es_base/_component_template?pretty" \
        > "$search_dir/component-templates.json"
      if [[ "$search_backend" == "Elasticsearch" ]]; then
        run_es_curl "$es_base/_ilm/policy?pretty" \
          > "$search_dir/ilm-policies.json"
      else
        run_es_curl "$es_base/_plugins/_ism/policies?pretty" \
          > "$search_dir/ism-policies.json"
      fi

      echo "  - Collecting Camunda import position documents."
      run_es_curl "$es_base/operate-import-position*/_search?size=10000&pretty" \
        > "$search_dir/operate-import-position.json"
      run_es_curl "$es_base/tasklist-import-position*/_search?size=10000&pretty" \
        > "$search_dir/tasklist-import-position.json"
      run_es_curl "$es_base/optimize-position-based-import-index*/_search?size=10000&pretty" \
        > "$search_dir/optimize-import-position.json"

      echo "  - Collecting Operate post-importer queue."
      run_es_curl "$es_base/operate-post-importer-queue*/_count?pretty" \
        > "$search_dir/operate-post-importer-queue-count.json"
      if [[ "$skip_data" != "true" ]]; then
        run_es_curl "$es_base/operate-post-importer-queue*/_search?size=1000&pretty" \
          > "$search_dir/operate-post-importer-queue.json"
      fi

      echo "  - Collecting Zeebe exporter index statistics."
      run_es_curl -X POST "$es_base/zeebe-record*/_search?pretty" \
        -H "Content-Type: application/json" \
        -d '{"size":0,"aggs":{"value_types":{"terms":{"field":"valueType","size":100},"aggs":{"partitions":{"terms":{"field":"partitionId"},"aggs":{"min_sequence":{"min":{"field":"sequence"}},"max_sequence":{"max":{"field":"sequence"}}}}}}}}' \
        > "$search_dir/zeebe-record-stats.json"

      echo "$search_backend diagnostics collected into $search_dir/."
    fi
  fi
fi

echo "All logs, descriptions, and diagnostic data collected."

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
