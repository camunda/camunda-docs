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

// Suppress "declared but never read"
void pauseExportingExample;
void resumeExportingExample;
