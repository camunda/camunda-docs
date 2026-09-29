// Compilable usage examples for search pagination (issue #3).
// These examples are type-checked during build to guard against API regressions.

import { createCamundaClient, type ProcessDefinitionId } from '@camunda8/orchestration-cluster-api';

//#region PaginateItems
// Stream every matching process instance across all pages. Cursors are advanced
// internally; the loop stops when the server runs out of pages.
async function everyActiveInstanceExample() {
  const camunda = createCamundaClient();

  const stream = camunda.searchProcessInstances.paginate({
    filter: { state: 'ACTIVE' },
    page: { limit: 100 },
  });

  for await (const instance of stream.items()) {
    console.log(instance.processInstanceKey);
  }
}
//#endregion PaginateItems

//#region PaginatePages
// Process results a page at a time (batch handling / progress reporting).
async function incidentsByPageExample() {
  const camunda = createCamundaClient();

  for await (const page of camunda.searchIncidents.paginate({ page: { limit: 50 } }).pages()) {
    console.log(`${page.items.length} of ${page.page.totalItems}`);
  }
}
//#endregion PaginatePages

//#region PaginateBounded
// Bound the stream with an AbortSignal and a hard page cap. A non-zero
// `consistency` window is applied to the first page only, so freshly-written
// data can be waited for without the terminal empty page timing out.
async function boundedPaginationExample(processDefinitionId: ProcessDefinitionId) {
  const camunda = createCamundaClient();
  const ac = new AbortController();
  setTimeout(() => ac.abort(), 30_000);

  const stream = camunda.searchProcessInstances.paginate(
    { filter: { processDefinitionId }, page: { limit: 100 } },
    { signal: ac.signal, maxPages: 10, consistency: { waitUpToMs: 5000 } }
  );

  for await (const instance of stream.items()) {
    console.log(instance.processInstanceKey);
  }
}
//#endregion PaginateBounded

//#region PaginateToArray
// Drain a bounded result set into an array.
async function collectIncidentsExample() {
  const camunda = createCamundaClient();

  const incidents = await camunda.searchIncidents.paginate({ page: { limit: 100 } }).toArray();

  return incidents;
}
//#endregion PaginateToArray

void everyActiveInstanceExample;
void incidentsByPageExample;
void boundedPaginationExample;
void collectIncidentsExample;
