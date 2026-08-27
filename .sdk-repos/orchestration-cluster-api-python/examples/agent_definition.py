# Compilable usage examples for agent definition operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    AgentDefinitionKey,
    AgentDefinitionSearchQuery,
    CamundaClient,
)


# region GetAgentDefinition
def get_agent_definition_example(agent_definition_key: AgentDefinitionKey) -> None:
    client = CamundaClient()

    agent_definition = client.get_agent_definition(
        agent_definition_key=agent_definition_key
    )

    print(f"Agent definition name: {agent_definition.name}")


# endregion GetAgentDefinition


# region SearchAgentDefinitions
def search_agent_definitions_example() -> None:
    client = CamundaClient()

    result = client.search_agent_definitions(data=AgentDefinitionSearchQuery())

    for agent_definition in result.items:
        print(f"Agent definition key: {agent_definition.agent_definition_key}")


# endregion SearchAgentDefinitions
