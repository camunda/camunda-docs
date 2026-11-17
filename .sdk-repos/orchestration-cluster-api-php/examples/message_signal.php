<?php

/**
 * Compilable usage examples for message, signal, and message-subscription operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region SearchCorrelatedMessageSubscriptions
/**
 * Search correlated message subscriptions.
 */
function search_correlated_message_subscriptions(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\CorrelatedMessageSubscriptionSearchQuery $correlatedMessageSubscriptionSearchQuery = null): void
{
    $client->searchCorrelatedMessageSubscriptions($correlatedMessageSubscriptionSearchQuery);
}
// endregion SearchCorrelatedMessageSubscriptions

// region SearchMessageSubscriptions
/**
 * Search message subscriptions.
 */
function search_message_subscriptions(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\MessageSubscriptionSearchQuery $messageSubscriptionSearchQuery = null): void
{
    $client->searchMessageSubscriptions($messageSubscriptionSearchQuery);
}
// endregion SearchMessageSubscriptions

// region CorrelateMessage
/**
 * Correlate message.
 */
function correlate_message(CamundaClient $client, \Camunda\Orchestration\Api\Model\MessageCorrelationRequest $messageCorrelationRequest): void
{
    $client->correlateMessage($messageCorrelationRequest);
}
// endregion CorrelateMessage

// region PublishMessage
/**
 * Publish message.
 */
function publish_message(CamundaClient $client, \Camunda\Orchestration\Api\Model\MessagePublicationRequest $messagePublicationRequest): void
{
    $client->publishMessage($messagePublicationRequest);
}
// endregion PublishMessage

// region BroadcastSignal
/**
 * Broadcast signal.
 */
function broadcast_signal(CamundaClient $client, \Camunda\Orchestration\Api\Model\SignalBroadcastRequest $signalBroadcastRequest): void
{
    $client->broadcastSignal($signalBroadcastRequest);
}
// endregion BroadcastSignal
