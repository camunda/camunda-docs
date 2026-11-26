# Compilable usage examples for probe operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    ErrorProbeResult,
    OKProbeAnswer,
    OKProbeResult,
    ProbeActivationRequest,
    ProbeCreationRequest,
    ProbeId,
    ProbeKey,
    ProbeOkResultData,
)


# region CreateProbe
def create_probe_example() -> None:
    client = CamundaClient()

    # The request is held until a worker polling this probe ID answers, or the
    # request times out.
    result = client.create_probe(
        data=ProbeCreationRequest(
            probe_id=ProbeId("validate-configuration/io.camunda:aws-credential:1"),
            input_='={region: "eu-west-1"}',
            request_timeout=10000,
        )
    )

    if isinstance(result, OKProbeResult):
        print(f"{result.worker} answered: {result.data.to_dict()}")
    elif isinstance(result, ErrorProbeResult):
        print(f"{result.worker} failed: {result.message}")
    else:
        print(f"{result.worker} does not support this probe")


# endregion CreateProbe


# region ActivateProbes
def activate_probes_example() -> None:
    client = CamundaClient()

    # Held for up to 5 seconds, then returns with no probes if none was created.
    result = client.activate_probes(
        data=ProbeActivationRequest(
            probe_ids=["validate-configuration/io.camunda:aws-credential:1"],
            max_probes_to_activate=10,
            worker="connectors-runtime",
            request_timeout=5000,
        )
    )

    # The activated input holds resolved secret values, so log identifiers only.
    for probe in result.probes:
        print(f"Probe {probe.probe_key} for {probe.probe_id}")


# endregion ActivateProbes


# region AnswerProbe
def answer_probe_example(probe_key: ProbeKey) -> None:
    client = CamundaClient()

    client.answer_probe(
        probe_key=probe_key,
        data=OKProbeAnswer(
            outcome="OK",
            data=ProbeOkResultData.from_dict({"valid": True}),
        ),
    )


# endregion AnswerProbe
