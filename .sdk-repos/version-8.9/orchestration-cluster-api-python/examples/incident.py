# Compilable usage examples for incident management.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    IncidentKey,
    IncidentSearchQuery,
    Unset,
)


# region SearchIncidents
def search_incidents_example() -> None:
    client = CamundaClient()

    result = client.search_incidents(
        data=IncidentSearchQuery()
    )

    if not isinstance(result.items, Unset):
        for incident in result.items:
            print(f"Incident key: {incident.incident_key}")
# endregion SearchIncidents


# region GetIncident
def get_incident_example(incident_key: IncidentKey) -> None:
    client = CamundaClient()

    incident = client.get_incident(incident_key=incident_key)

    print(f"Incident error type: {incident.error_type}")
# endregion GetIncident


# region ResolveIncident
def resolve_incident_example(incident_key: IncidentKey) -> None:
    client = CamundaClient()

    client.resolve_incident(incident_key=incident_key)
# endregion ResolveIncident
