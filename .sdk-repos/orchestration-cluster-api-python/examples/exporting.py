# Compilable usage examples for exporting operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import CamundaClient


# region PauseExporting
def pause_exporting_example() -> None:
    client = CamundaClient()

    # With `soft=True` exporting keeps running but its position is not committed,
    # so the log is still not compacted. Use it when exporting must keep
    # progressing -- for example while a backup is taken.
    client.pause_exporting(soft=True)
# endregion PauseExporting


# region ResumeExporting
def resume_exporting_example() -> None:
    client = CamundaClient()

    client.resume_exporting()
# endregion ResumeExporting


# region GetExportingStatus
def get_exporting_status_example() -> None:
    client = CamundaClient()

    result = client.get_exporting_status()

    # The status is aggregated over every replica of every partition, so `MIXED`
    # means a pause or resume is still in flight or was only partially applied.
    # Only `PAUSED` and `SOFT_PAUSED` confirm that exporting has stopped.
    print(f"Status: {result.status}")
# endregion GetExportingStatus


# region GetClusterExportingStatus
def get_cluster_exporting_status_example() -> None:
    client = CamundaClient()

    # Requires the cluster-admin security chain — not the Orchestration Cluster
    # user credentials. Only `PAUSED` and `SOFT_PAUSED` confirm a cluster-wide
    # pause; any other value means at least one physical tenant is still active.
    result = client.get_cluster_exporting_status()

    print(f"Cluster exporting status: {result.status}")
# endregion GetClusterExportingStatus


# region PauseClusterExporting
def pause_cluster_exporting_example() -> None:
    client = CamundaClient()

    # Pauses exporting on every physical tenant in one call.
    # With `soft=True` the position is not committed, so the log is not compacted,
    # which is the right mode for taking a consistent backup without stopping
    # real processing work.
    client.pause_cluster_exporting(soft=True)
# endregion PauseClusterExporting


# region ResumeClusterExporting
def resume_cluster_exporting_example() -> None:
    client = CamundaClient()

    # Resumes exporting on every physical tenant after a pause or soft pause.
    client.resume_cluster_exporting()
# endregion ResumeClusterExporting
