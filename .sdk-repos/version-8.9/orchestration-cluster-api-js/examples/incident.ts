// Compilable usage examples for incident operations.
// These examples are type-checked during build to guard against API regressions.

import { createCamundaClient, type IncidentKey } from '@camunda8/orchestration-cluster-api';

//#region GetIncident
async function getIncidentExample(incidentKey: IncidentKey) {
  const camunda = createCamundaClient();

  const incident = await camunda.getIncident(
    { incidentKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Type: ${incident.errorType}`);
  console.log(`State: ${incident.state}`);
  console.log(`Message: ${incident.errorMessage}`);
}
//#endregion GetIncident

//#region ResolveIncident
async function resolveIncidentExample(incidentKey: IncidentKey) {
  const camunda = createCamundaClient();

  await camunda.resolveIncident({ incidentKey });
}
//#endregion ResolveIncident

//#region SearchIncidents
async function searchIncidentsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchIncidents(
    {
      filter: { state: 'ACTIVE' },
      sort: [{ field: 'creationTime', order: 'DESC' }],
      page: { limit: 20 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const incident of result.items ?? []) {
    console.log(`${incident.incidentKey}: ${incident.errorType} — ${incident.errorMessage}`);
  }
  console.log(`Total active incidents: ${result.page.totalItems}`);
}
//#endregion SearchIncidents

// Suppress "declared but never read"
void getIncidentExample;
void resolveIncidentExample;
void searchIncidentsExample;
