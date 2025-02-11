---
id: bpmn-coverage
title: "BPMN coverage"
description: "List of BPMN symbols supported in Modelers"
---

export const Highlight = ({children, color}) => (
<span style={{ backgroundColor: color, borderRadius: '5px', color: '#fff', padding: '0.2rem', }}>
{children}
</span>
);

The following BPMN elements are supported by our modeling tools. Elements highlighted in <Highlight color="#11c399">green</Highlight> are supported for execution by Camunda 8. Click on an element to navigate to the documentation.

## Participants

import PoolSvg from './assets/bpmn-symbols/pool.svg';
import LaneSvg from './assets/bpmn-symbols/lane.svg';

<div className="bpmn-symbol-container">
    <a href="#">
        <PoolSvg className="implemented" />
    </a>
    <a href="#">
        <LaneSvg className="implemented" />
    </a>
</div>

## Subprocesses

import EmbeddedSubprocessSvg from './assets/bpmn-symbols/embedded-subprocess.svg';
import CallActivitySvg from './assets/bpmn-symbols/call-activity.svg';
import EventSubprocessSvg from './assets/bpmn-symbols/event-subprocess.svg'
import TransactionalSubprocessSvg from './assets/bpmn-symbols/transactional-subprocess.svg'

<div className="bpmn-symbol-container">
    <a href="../embedded-subprocesses/">
        <EmbeddedSubprocessSvg className="implemented" />
    </a>
    <a href="../call-activities/">
        <CallActivitySvg className="implemented" />
    </a>
    <a href="../event-subprocesses/">
        <EventSubprocessSvg className="implemented" />
    </a>
    <a href="#">
        <TransactionalSubprocessSvg />
    </a>
</div>

## Tasks

import ServiceTaskSvg from './assets/bpmn-symbols/service-task.svg'
import UserTaskSvg from './assets/bpmn-symbols/user-task.svg'
import ReceiveTaskSvg from './assets/bpmn-symbols/receive-task.svg'
import SendTaskSvg from './assets/bpmn-symbols/send-task.svg'
import BusinessRuleTaskSvg from './assets/bpmn-symbols/business-rule-task.svg'
import ScriptTaskSvg from './assets/bpmn-symbols/script-task.svg'
import ManualTaskSvg from './assets/bpmn-symbols/manual-task.svg'
import UndefinedTaskSvg from './assets/bpmn-symbols/undefined-task.svg'
import ReceiveTaskInstantiatedSvg from './assets/bpmn-symbols/receive-task-instantiated.svg'

<div className="bpmn-symbol-container">
    <a href="../service-tasks/">
        <ServiceTaskSvg className="implemented" />
    </a>
    <a href="../user-tasks/">
        <UserTaskSvg className="implemented" />
    </a>
    <a href="../receive-tasks/">
        <ReceiveTaskSvg className="implemented" />
    </a>
    <a href="../send-tasks/">
        <SendTaskSvg className="implemented" />
    </a>
    <a href="../business-rule-tasks/">
        <BusinessRuleTaskSvg className="implemented" />
    </a>
    <a href="../script-tasks/">
        <ScriptTaskSvg className="implemented" />
    </a>
    <a href="../manual-tasks/">
        <ManualTaskSvg className="implemented"/>
    </a>
    <a href="#">
        <ReceiveTaskInstantiatedSvg />
    </a>
    <a href="../undefined-tasks/">
        <UndefinedTaskSvg className="implemented" />
    </a>
</div>

## Gateways

import ExclusiveGatewaySvg from './assets/bpmn-symbols/exclusive-gateway.svg'
import InclusiveGatewaySvg from './assets/bpmn-symbols/inclusive-gateway.svg'
import ParallelGatewaySvg from './assets/bpmn-symbols/parallel-gateway.svg'
import EventBasedGatewaySvg from './assets/bpmn-symbols/event-based-gateway.svg'
import ComplexGatewaySvg from './assets/bpmn-symbols/complex-gateway.svg'

<div className="bpmn-symbol-container">
    <a href="../exclusive-gateways/">
        <ExclusiveGatewaySvg className="implemented" />
    </a>
    <a href="../parallel-gateways/">
        <ParallelGatewaySvg className="implemented" />
    </a>
    <a href="../event-based-gateways/">
        <EventBasedGatewaySvg className="implemented" />
    </a>
    <a href="../inclusive-gateways/">
        <InclusiveGatewaySvg className="implemented" />
    </a>
    <a href="#">
        <ComplexGatewaySvg />
    </a>
</div>

## Markers

import MultiInstanceParallelSvg from './assets/bpmn-symbols/multi-instance-parallel.svg'
import MultiInstanceSequentialSvg from './assets/bpmn-symbols/multi-instance-sequential.svg'
import LoopSvg from './assets/bpmn-symbols/loop.svg'
import CompensationSvg from './assets/bpmn-symbols/compensation.svg'
import AdHocSvg from './assets/bpmn-symbols/ad-hoc.svg'

<div className="bpmn-symbol-container">
    <a href="../multi-instance/">
        <MultiInstanceParallelSvg className="implemented" />
    </a>
    <a href="../multi-instance/">
        <MultiInstanceSequentialSvg className="implemented" />
    </a>
    <a href="#">
        <LoopSvg />
    </a>
    <a href="../compensation-handler/">
        <CompensationSvg className="implemented" />
    </a>
    <a href="../ad-hoc/">
        <AdHocSvg className="implemented" />
    </a>
</div>

## Data

:::note
`DataObject` and `DataStore`, like other BPMN standard IO mappings, are supported by Camunda for modeling purposes only.
:::

import DataObjectSvg from './assets/bpmn-symbols/data-object.svg'
import DataStoreSvg from './assets/bpmn-symbols/data-store.svg'

<div className="bpmn-symbol-container">
    <a href="#">
        <DataObjectSvg className="implemented" />
    </a>
    <a href="#">
        <DataStoreSvg className="implemented" />
    </a>
</div>

## Artifacts

import AnnotationSvg from './assets/bpmn-symbols/annotation.svg'
import GroupSvg from './assets/bpmn-symbols/group.svg'

<div className="bpmn-symbol-container">
    <a href="#">
        <AnnotationSvg className="implemented" />
    </a>
    <a href="#">
        <GroupSvg className="implemented" />
    </a>
</div>

## Events

import NoneStartEventSvg from './assets/bpmn-symbols/none-start-event.svg'
import NoneThrowEventSvg from './assets/bpmn-symbols/none-throw-event.svg'
import NoneEndEventSvg from './assets/bpmn-symbols/none-end-event.svg'

import MessageStartEventSvg from './assets/bpmn-symbols/message-start-event.svg'
import MessageEventSubprocessSvg from './assets/bpmn-symbols/message-event-subprocess.svg'
import MessageEventSubprocessNonInterruptingSvg from './assets/bpmn-symbols/message-event-subprocess-non-interrupting.svg'
import MessageCatchEventSvg from './assets/bpmn-symbols/message-catch-event.svg'
import MessageBoundaryEventSvg from './assets/bpmn-symbols/message-boundary-event.svg'
import MessageBoundaryEventNonInterruptingSvg from './assets/bpmn-symbols/message-boundary-event-non-interrupting.svg'
import MessageThrowEventSvg from './assets/bpmn-symbols/message-throw-event.svg'
import MessageEndEventSvg from './assets/bpmn-symbols/message-end-event.svg'

import TimerStartEventSvg from './assets/bpmn-symbols/timer-start-event.svg'
import TimerEventSubprocessSvg from './assets/bpmn-symbols/timer-event-subprocess.svg'
import TimerEventSubprocessNonInterruptingSvg from './assets/bpmn-symbols/timer-event-subprocess-non-interrupting.svg'
import TimerCatchEventSvg from './assets/bpmn-symbols/timer-catch-event.svg'
import TimerBoundaryEventSvg from './assets/bpmn-symbols/timer-boundary-event.svg'
import TimerBoundaryEventNonInterruptingSvg from './assets/bpmn-symbols/timer-boundary-event-non-interrupting.svg'

import ErrorEventSubprocessSvg from './assets/bpmn-symbols/error-event-subprocess.svg'
import ErrorBoundaryEventSvg from './assets/bpmn-symbols/error-boundary-event.svg'
import ErrorEndEventSvg from './assets/bpmn-symbols/error-end-event.svg'

import SignalStartEventSvg from './assets/bpmn-symbols/signal-start-event.svg'
import SignalEventSubprocessSvg from './assets/bpmn-symbols/signal-event-subprocess.svg'
import SignalEventSubprocessNonInterruptingSvg from './assets/bpmn-symbols/signal-event-subprocess-non-interrupting.svg'
import SignalCatchEventSvg from './assets/bpmn-symbols/signal-catch-event.svg'
import SignalBoundaryEventSvg from './assets/bpmn-symbols/signal-boundary-event.svg'
import SignalBoundaryEventNonInterruptingSvg from './assets/bpmn-symbols/signal-boundary-event-non-interrupting.svg'
import SignalThrowEventSvg from './assets/bpmn-symbols/signal-throw-event.svg'
import SignalEndEventSvg from './assets/bpmn-symbols/signal-end-event.svg'

import ConditionalStartEventSvg from './assets/bpmn-symbols/conditional-start-event.svg'
import ConditionalEventSubprocessSvg from './assets/bpmn-symbols/conditional-event-subprocess.svg'
import ConditionalEventSubprocessNonInterruptingSvg from './assets/bpmn-symbols/conditional-event-subprocess-non-interrupting.svg'
import ConditionalCatchEventSvg from './assets/bpmn-symbols/conditional-catch-event.svg'
import ConditionalBoundaryEventSvg from './assets/bpmn-symbols/conditional-boundary-event.svg'
import ConditionalBoundaryEventNonInterruptingSvg from './assets/bpmn-symbols/conditional-boundary-event-non-interrupting.svg'

import EscalationEventSubprocessSvg from './assets/bpmn-symbols/escalation-event-subprocess.svg'
import EscalationEventSubprocessNonInterruptingSvg from './assets/bpmn-symbols/escalation-event-subprocess-non-interrupting.svg'
import EscalationBoundaryEventSvg from './assets/bpmn-symbols/escalation-boundary-event.svg'
import EscalationBoundaryEventNonInterruptingSvg from './assets/bpmn-symbols/escalation-boundary-event-non-interrupting.svg'
import EscalationThrowEventSvg from './assets/bpmn-symbols/escalation-throw-event.svg'
import EscalationEndEventSvg from './assets/bpmn-symbols/escalation-end-event.svg'

import CompensationEventSubprocessSvg from './assets/bpmn-symbols/compensation-event-subprocess.svg'
import CompensationBoundaryEventSvg from './assets/bpmn-symbols/compensation-boundary-event.svg'
import CompensationThrowEventSvg from './assets/bpmn-symbols/compensation-throw-event.svg'
import CompensationEndEventSvg from './assets/bpmn-symbols/compensation-end-event.svg'

import CancelBoundaryEventSvg from './assets/bpmn-symbols/cancel-boundary-event.svg'
import CancelEndEventSvg from './assets/bpmn-symbols/cancel-end-event.svg'

import TerminationEndEventSvg from './assets/bpmn-symbols/termination-end-event.svg'

import LinkCatchEventSvg from './assets/bpmn-symbols/link-catch-event.svg'
import LinkThrowEventSvg from './assets/bpmn-symbols/link-throw-event.svg'

import MultipleStartEventSvg from './assets/bpmn-symbols/multiple-start-event.svg'
import MultipleEventSubprocessSvg from './assets/bpmn-symbols/multiple-event-subprocess.svg'
import MultipleEventSubprocessNonInterruptingSvg from './assets/bpmn-symbols/multiple-event-subprocess-non-interrupting.svg'
import MultipleCatchEventSvg from './assets/bpmn-symbols/multiple-catch-event.svg'
import MultipleBoundaryEventSvg from './assets/bpmn-symbols/multiple-boundary-event.svg'
import MultipleBoundaryEventNonInterruptingSvg from './assets/bpmn-symbols/multiple-boundary-event-non-interrupting.svg'
import MultipleThrowEventSvg from './assets/bpmn-symbols/multiple-throw-event.svg'
import MultipleEndEventSvg from './assets/bpmn-symbols/multiple-end-event.svg'

import MultipleParallelStartEventSvg from './assets/bpmn-symbols/multiple-parallel-start-event.svg'
import MultipleParallelEventSubprocessSvg from './assets/bpmn-symbols/multiple-parallel-event-subprocess.svg'
import MultipleParallelEventSubprocessNonInterruptingSvg from './assets/bpmn-symbols/multiple-parallel-event-subprocess-non-interrupting.svg'
import MultipleParallelCatchEventSvg from './assets/bpmn-symbols/multiple-parallel-catch-event.svg'
import MultipleParallelBoundaryEventSvg from './assets/bpmn-symbols/multiple-parallel-boundary-event.svg'
import MultipleParallelBoundaryEventNonInterruptingSvg from './assets/bpmn-symbols/multiple-parallel-boundary-event-non-interrupting.svg'

<table className="bpmn-coverage-event-table">
  <thead>
      <tr>
        <th>Type</th>
        <th colspan="3">Start</th>
        <th colspan="4">Intermediate</th>
        <th>End</th>
      </tr>
      <tr>
        <th></th>
        <th>Normal</th>
        <th>Event Subprocess</th>
        <th>Event Subprocess non-interrupting</th>
        <th>Catch</th>
        <th>Boundary</th>
        <th>Boundary non-interrupting</th>
        <th>Throw</th>
        <th></th>
      </tr>
  </thead>
  <tbody>
    <tr>
        <td>
            <a href="../none-events/">None</a>
        </td>
        <td>
            <a href="../none-events/">
                <NoneStartEventSvg className="implemented" />
            </a>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <a href="../none-events/">
                <NoneThrowEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../none-events/">
                <NoneEndEventSvg className="implemented" />
            </a>
        </td>
    </tr>
    <tr>
        <td>
            <a href="../message-events/">Message</a>
        </td>
        <td>
            <a href="../message-events/">
                <MessageStartEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../message-events/">
                <MessageEventSubprocessSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../message-events/">
                <MessageEventSubprocessNonInterruptingSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../message-events/">
                <MessageCatchEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../message-events/">
                <MessageBoundaryEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../message-events/">
                <MessageBoundaryEventNonInterruptingSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../message-events/">
                <MessageThrowEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../message-events/">
                <MessageEndEventSvg className="implemented" />
            </a>
        </td>
    </tr>
    <tr>
        <td>
            <a href="../timer-events/">Timer</a>
        </td>
        <td>
            <a href="../timer-events/">
                <TimerStartEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../timer-events/">
                <TimerEventSubprocessSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../timer-events/">
                <TimerEventSubprocessNonInterruptingSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../timer-events/">
                <TimerCatchEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../timer-events/">
                <TimerBoundaryEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../timer-events/">
                <TimerBoundaryEventNonInterruptingSvg className="implemented" />
            </a>
        </td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>
            <a href="../error-events/">Error</a>
        </td>
        <td></td>
        <td>
            <a href="../error-events/">
                <ErrorEventSubprocessSvg className="implemented" />
            </a>
        </td>
        <td></td>
        <td></td>
        <td>
            <a href="../error-events/">
                <ErrorBoundaryEventSvg className="implemented" />
            </a>
        </td>
        <td></td>
        <td></td>
        <td>
            <a href="../error-events/">
                <ErrorEndEventSvg className="implemented" />
            </a>
        </td>
    </tr>
    <tr>
        <td>
            <a href="../signal-events/">Signal</a>
        </td>
        <td>
            <a href="../signal-events/">
                <SignalStartEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../signal-events/">
                <SignalEventSubprocessSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../signal-events/">
                <SignalEventSubprocessNonInterruptingSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../signal-events/">
                <SignalCatchEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../signal-events/">
                <SignalBoundaryEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../signal-events/">
                <SignalBoundaryEventNonInterruptingSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../signal-events/">
                <SignalThrowEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../signal-events/">
                <SignalEndEventSvg className="implemented" />
            </a>
        </td>
    </tr>
    <tr>
        <td>
            Conditional
        </td>
        <td>
            <a href="#">
                <ConditionalStartEventSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <ConditionalEventSubprocessSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <ConditionalEventSubprocessNonInterruptingSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <ConditionalCatchEventSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <ConditionalBoundaryEventSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <ConditionalBoundaryEventNonInterruptingSvg />
            </a>
        </td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>
            <a href="../escalation-events/">Escalation</a>
        </td>
        <td></td>
        <td>
            <a href="../escalation-events/">
                <EscalationEventSubprocessSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../escalation-events">
                <EscalationEventSubprocessNonInterruptingSvg className="implemented" />
            </a>
        </td>
        <td></td>
        <td>
            <a href="../escalation-events">
                <EscalationBoundaryEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../escalation-events">
                <EscalationBoundaryEventNonInterruptingSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../escalation-events">
                <EscalationThrowEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../escalation-events">
                <EscalationEndEventSvg className="implemented" />
            </a>
        </td>
    </tr>
    <tr>
        <td>
            <a href="../compensation-events/">Compensation</a>
        </td>
        <td></td>
        <td>
            <a href="#">
                <CompensationEventSubprocessSvg />
            </a>
        </td>
        <td></td>
        <td></td>
        <td>
            <a href="../compensation-events/">
                <CompensationBoundaryEventSvg className="implemented" />
            </a>
        </td>
        <td></td>
        <td>
            <a href="../compensation-events/">
                <CompensationThrowEventSvg className="implemented" />
            </a>
        </td>
        <td>
            <a href="../compensation-events/">
                <CompensationEndEventSvg className="implemented" />
            </a>
        </td>
    </tr>
    <tr>
        <td>
            Cancel
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <a href="#">
                <CancelBoundaryEventSvg />
            </a>
        </td>
        <td></td>
        <td></td>
        <td>
            <a href="#">
                <CancelEndEventSvg />
            </a>
        </td>
    </tr>
    <tr>
        <td>
            <a href="../terminate-events/">Terminate</a>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <a href="../terminate-events/">
                <TerminationEndEventSvg className="implemented" />
            </a>
        </td>
    </tr>
    <tr>
        <td>
            <a href="../link-events">Link</a>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <a href="../link-events/">
                <LinkCatchEventSvg className="implemented"/>
            </a>
        </td>
        <td></td>
        <td></td>
        <td>
            <a href="../link-events">
                <LinkThrowEventSvg className="implemented"/>
            </a>
        </td>
        <td></td>
    </tr>
    <tr>
        <td>
            Multiple
        </td>
        <td>
            <a href="#">
                <MultipleStartEventSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleEventSubprocessSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleEventSubprocessNonInterruptingSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleCatchEventSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleBoundaryEventSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleBoundaryEventNonInterruptingSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleThrowEventSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleEndEventSvg />
            </a>
        </td>
    </tr>
    <tr>
        <td>
            Multiple Parallel
        </td>
        <td>
            <a href="#">
                <MultipleParallelStartEventSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleParallelEventSubprocessSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleParallelEventSubprocessNonInterruptingSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleParallelCatchEventSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleParallelBoundaryEventSvg />
            </a>
        </td>
        <td>
            <a href="#">
                <MultipleParallelBoundaryEventNonInterruptingSvg />
            </a>
        </td>
        <td></td>
        <td></td>
    </tr>

  </tbody>
</table>
