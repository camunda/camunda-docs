# Compilable usage examples for decision evaluation and search.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    DecisionDefinitionId,
    DecisionDefinitionKey,
    DecisionDefinitionSearchQuery,
    DecisionEvaluationByID,
    DecisionEvaluationByKey,
    Unset,
)


# region EvaluateDecisionByKey
def evaluate_decision_by_key_example(decision_definition_key: DecisionDefinitionKey) -> None:
    client = CamundaClient()

    result = client.evaluate_decision(
        data=DecisionEvaluationByKey(
            decision_definition_key=decision_definition_key,
        )
    )

    print(f"Decision key: {result.decision_definition_key}")
# endregion EvaluateDecisionByKey


# region EvaluateDecisionById
def evaluate_decision_by_id_example(decision_definition_id: DecisionDefinitionId) -> None:
    client = CamundaClient()

    result = client.evaluate_decision(
        data=DecisionEvaluationByID(
            decision_definition_id=decision_definition_id,
        )
    )

    print(f"Decision key: {result.decision_definition_key}")
# endregion EvaluateDecisionById


# region SearchDecisionDefinitions
def search_decision_definitions_example() -> None:
    client = CamundaClient()

    result = client.search_decision_definitions(
        data=DecisionDefinitionSearchQuery()
    )

    if not isinstance(result.items, Unset):
        for definition in result.items:
            print(f"Decision: {definition.decision_definition_id}")
# endregion SearchDecisionDefinitions


# region GetDecisionDefinition
def get_decision_definition_example(decision_definition_key: DecisionDefinitionKey) -> None:
    client = CamundaClient()

    definition = client.get_decision_definition(
        decision_definition_key=decision_definition_key,
    )

    print(f"Decision: {definition.decision_definition_id}")
# endregion GetDecisionDefinition
