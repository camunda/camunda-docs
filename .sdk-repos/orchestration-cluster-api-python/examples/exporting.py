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
