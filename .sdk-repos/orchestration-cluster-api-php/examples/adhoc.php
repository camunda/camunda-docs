<?php

/**
 * Compilable usage examples for ad-hoc sub-process operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region ActivateAdHocSubProcessActivities
/**
 * Activate activities within an ad-hoc sub-process.
 */
function activate_ad_hoc_sub_process_activities(CamundaClient $client, string $adHocSubProcessInstanceKey, \Camunda\Orchestration\Api\Model\AdHocSubProcessActivateActivitiesInstruction $adHocSubProcessActivateActivitiesInstruction): void
{
    $client->activateAdHocSubProcessActivities($adHocSubProcessInstanceKey, $adHocSubProcessActivateActivitiesInstruction);
}
// endregion ActivateAdHocSubProcessActivities
