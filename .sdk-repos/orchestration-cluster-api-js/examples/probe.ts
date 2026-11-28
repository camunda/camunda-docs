// Compilable usage examples for probe operations (alpha).
// These examples are type-checked during build to guard against API regressions.

import {
  createCamundaClient,
  isSdkError,
  ProbeId,
  type ProbeKey,
} from "@camunda8/orchestration-cluster-api";

//#region CreateProbe
async function createProbeExample() {
  const camunda = createCamundaClient();

  try {
    // Ask the worker registered for this probe ID a question and wait for its answer.
    // `input` is a FEEL expression; secrets are injected by the engine, never by the client.
    const result = await camunda.createProbe({
      probeId: ProbeId.assumeExists(
        "validate-configuration/io.camunda:aws-credential:1"
      ),
      input: '={region: "eu-west-1", accessKey: camunda.secrets.awsKey}',
      requestTimeout: 10000,
    });

    switch (result.outcome) {
      case "OK":
        console.log(`Worker ${result.worker} answered:`, result.data);
        break;
      case "UNSUPPORTED":
        console.log(`Worker ${result.worker} does not support this probe`);
        break;
      case "ERROR":
        console.log(`Worker ${result.worker} failed: ${result.message}`);
        break;
    }
  } catch (e) {
    // A 404 means no worker collected the probe before its deadline.
    if (isSdkError(e) && e.name === "HttpSdkError" && e.status === 404) {
      console.log("No worker is polling this probe ID");
    } else {
      throw e;
    }
  }
}
//#endregion CreateProbe

//#region ActivateProbes
async function activateProbesExample() {
  const camunda = createCamundaClient();

  const result = await camunda.activateProbes({
    probeIds: [
      ProbeId.assumeExists(
        "validate-configuration/io.camunda:aws-credential:1"
      ),
      ProbeId.assumeExists("validate-configuration/io.camunda:slack:1"),
    ],
    worker: "connectors-runtime",
    maxProbesToActivate: 10,
    // A negative timeout turns long polling off: the request returns at once,
    // with an empty list when no probe is waiting.
    requestTimeout: -1,
  });

  for (const probe of result.probes) {
    console.log(
      `Probe ${probe.probeKey} (${probe.probeId}) must be answered by ${probe.deadline}`
    );

    // Answer before the deadline with POST /probes/{probeKey}/answer
    await camunda.answerProbe({
      probeKey: probe.probeKey,
      outcome: "OK",
      data: { valid: true },
    });
  }
}
//#endregion ActivateProbes

//#region AnswerProbe
async function answerProbeExample(probeKey: ProbeKey) {
  const camunda = createCamundaClient();

  // Answer with `UNSUPPORTED`, or with `ERROR` and a `message`, when the worker
  // cannot produce a result.
  await camunda.answerProbe({
    probeKey,
    outcome: "OK",
    data: {
      valid: true,
      region: "eu-west-1",
    },
  });
}
//#endregion AnswerProbe

// Suppress "declared but never read"
void createProbeExample;
void activateProbesExample;
void answerProbeExample;
