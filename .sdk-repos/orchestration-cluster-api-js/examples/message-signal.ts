// Compilable usage examples for message and signal operations.
// These examples are type-checked during build to guard against API regressions.

import { createCamundaClient } from '@camunda8/orchestration-cluster-api';

//#region CorrelateMessage
async function correlateMessageExample() {
  const camunda = createCamundaClient();

  const result = await camunda.correlateMessage({
    name: 'order-payment-received',
    correlationKey: 'ORD-12345',
    variables: {
      paymentId: 'PAY-123',
      amount: 99.95,
    },
  });

  console.log(`Message correlated to: ${result.processInstanceKey}`);
}
//#endregion CorrelateMessage

//#region PublishMessage
async function publishMessageExample() {
  const camunda = createCamundaClient();

  await camunda.publishMessage({
    name: 'order-payment-received',
    correlationKey: 'ORD-12345',
    timeToLive: 60000,
    variables: {
      paymentId: 'PAY-123',
    },
  });
}
//#endregion PublishMessage

//#region BroadcastSignal
async function broadcastSignalExample() {
  const camunda = createCamundaClient();

  const result = await camunda.broadcastSignal({
    signalName: 'system-shutdown',
    variables: {
      reason: 'Scheduled maintenance',
    },
  });

  console.log(`Signal broadcast key: ${result.signalKey}`);
}
//#endregion BroadcastSignal

// Suppress "declared but never read"
void correlateMessageExample;
void publishMessageExample;
void broadcastSignalExample;
