//#region ReadmeDefaultImport
import createCamundaClient from '@camunda8/orchestration-cluster-api';
//#endregion ReadmeDefaultImport

//#region ReadmeJobWorkerImport
import createCamundaClient from '@camunda8/orchestration-cluster-api';
import { z } from 'zod';
//#endregion ReadmeJobWorkerImport

//#region ReadmeThreadedWorkerImport
import createCamundaClient from '@camunda8/orchestration-cluster-api';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
//#endregion ReadmeThreadedWorkerImport

//#region ReadmeBrandedKeysImport
import { ProcessDefinitionKey, ProcessInstanceKey } from '@camunda8/orchestration-cluster-api';
//#endregion ReadmeBrandedKeysImport

//#region ReadmeErrorHandlingImport
import { createCamundaClient, isSdkError } from '@camunda8/orchestration-cluster-api';
//#endregion ReadmeErrorHandlingImport

//#region ReadmeResultClientImport
import { createCamundaResultClient, isOk } from '@camunda8/orchestration-cluster-api';
//#endregion ReadmeResultClientImport

//#region ReadmeReceiptImport
import type { JobActionReceipt } from '@camunda8/orchestration-cluster-api';
//#endregion ReadmeReceiptImport

//#region ReadmeJobCorrectionsImport
import type { JobResult } from '@camunda8/orchestration-cluster-api';
//#endregion ReadmeJobCorrectionsImport

//#region ReadmeEffectClientImport
import { Effect } from 'effect';
import {
  createCamundaEffectClient,
  eventually,
  EventualConsistencyTimeout,
} from '@camunda8/orchestration-cluster-api/effect';
//#endregion ReadmeEffectClientImport

//#region ReadmeEffectPaginateImport
import { Effect, Stream } from 'effect';
import { createCamundaEffectClient } from '@camunda8/orchestration-cluster-api/effect';
//#endregion ReadmeEffectPaginateImport

//#region ReadmeEffectWorkerImport
import { Effect, Schedule } from 'effect';
import {
  createCamundaEffectWorker,
  layer,
  RetryableJobError,
  TerminalJobError,
} from '@camunda8/orchestration-cluster-api/effect';
//#endregion ReadmeEffectWorkerImport

//#region ReadmeEffectWorkerServicesImport
import { Context, Effect, Layer } from 'effect';
import {
  CamundaEffect,
  type CamundaEffectClient,
  layer,
  workerLayer,
} from '@camunda8/orchestration-cluster-api/effect';
//#endregion ReadmeEffectWorkerServicesImport
