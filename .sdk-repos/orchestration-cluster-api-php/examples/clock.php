<?php

/**
 * Compilable usage examples for cluster clock operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region PinClock
/**
 * Pin internal clock (alpha).
 */
function pin_clock(CamundaClient $client, \Camunda\Orchestration\Api\Model\ClockPinRequest $clockPinRequest): void
{
    $client->pinClock($clockPinRequest);
}
// endregion PinClock

// region ResetClock
/**
 * Reset internal clock (alpha).
 */
function reset_clock(CamundaClient $client): void
{
    $client->resetClock();
}
// endregion ResetClock
