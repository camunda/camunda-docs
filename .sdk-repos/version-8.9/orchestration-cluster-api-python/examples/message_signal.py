# Compilable usage examples for message and signal operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    MessageCorrelationRequest,
    MessagePublicationRequest,
    SignalBroadcastRequest,
)

# region CorrelateMessage
def correlate_message_example() -> None:
    client = CamundaClient()

    result = client.correlate_message(
        data=MessageCorrelationRequest(
            name="payment-received",
            correlation_key="order-12345",
        )
    )

    print(f"Message key: {result.message_key}")
# endregion CorrelateMessage


# region PublishMessage
def publish_message_example() -> None:
    client = CamundaClient()

    result = client.publish_message(
        data=MessagePublicationRequest(
            name="order-created",
            correlation_key="order-12345",
            time_to_live=60000,
        )
    )

    print(f"Message key: {result.message_key}")
# endregion PublishMessage


# region BroadcastSignal
def broadcast_signal_example() -> None:
    client = CamundaClient()

    result = client.broadcast_signal(
        data=SignalBroadcastRequest(
            signal_name="order-cancelled",
        )
    )

    print(f"Signal key: {result.signal_key}")
# endregion BroadcastSignal
