// Compilable usage examples for exporting operations.
// These examples are type-checked during build to guard against API regressions.

import { createCamundaClient } from '@camunda8/orchestration-cluster-api';

//#region PauseExporting
async function pauseExportingExample() {
  const camunda = createCamundaClient();

  // With `soft: true` exporting keeps running but its position is not committed,
  // so the log is still not compacted — use it when exporting must keep
  // progressing, for example while a backup is taken.
  await camunda.pauseExporting({ soft: true });
}
//#endregion PauseExporting

//#region ResumeExporting
async function resumeExportingExample() {
  const camunda = createCamundaClient();

  await camunda.resumeExporting();
}
//#endregion ResumeExporting

//#region GetExportingStatus
async function getExportingStatusExample() {
  const camunda = createCamundaClient();

  // Reports the aggregated exporting status of the physical tenant — useful to
  // confirm exporting has actually paused before taking a backup, and that it
  // has resumed afterwards.
  const { status } = await camunda.getExportingStatus();
  console.log(`Exporting status: ${status}`);
}
//#endregion GetExportingStatus

//#region PauseClusterExporting
async function pauseClusterExportingExample() {
  const camunda = createCamundaClient();

  // Cluster-admin variant: pauses exporting on every physical tenant of the
  // cluster. With `soft: true` exporting keeps running but its position is not
  // committed, so the log is still not compacted.
  await camunda.pauseClusterExporting({ soft: true });
}
//#endregion PauseClusterExporting

//#region ResumeClusterExporting
async function resumeClusterExportingExample() {
  const camunda = createCamundaClient();

  await camunda.resumeClusterExporting();
}
//#endregion ResumeClusterExporting

//#region GetClusterExportingStatus
async function getClusterExportingStatusExample() {
  const camunda = createCamundaClient();

  // Reports the aggregated exporting status of the whole cluster — useful to
  // confirm exporting has paused everywhere before taking a cluster-wide backup.
  const { status } = await camunda.getClusterExportingStatus();
  console.log(`Cluster exporting status: ${status}`);
}
//#endregion GetClusterExportingStatus

// Suppress "declared but never read"
void pauseExportingExample;
void resumeExportingExample;
void getExportingStatusExample;
void pauseClusterExportingExample;
void resumeClusterExportingExample;
void getClusterExportingStatusExample;
