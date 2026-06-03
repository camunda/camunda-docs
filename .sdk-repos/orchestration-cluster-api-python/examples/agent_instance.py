# Compilable usage examples for agent instance operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    AgentInstanceCreationRequest,
    AgentInstanceCreationRequestDefinition,
    AgentInstanceKey,
    AgentInstanceSearchQuery,
    AgentInstanceUpdateRequest,
    AgentInstanceUpdateRequestStatus,
    CamundaClient,
    ElementInstanceKey,
    Unset,
)


# region GetAgentInstance
def get_agent_instance_example(agent_instance_key: AgentInstanceKey) -> None:
    client = CamundaClient()

    agent_instance = client.get_agent_instance(agent_instance_key=agent_instance_key)

    print(f"Agent instance status: {agent_instance.status}")
# endregion GetAgentInstance


# region SearchAgentInstances
def search_agent_instances_example() -> None:
    client = CamundaClient()

    result = client.search_agent_instances(
        data=AgentInstanceSearchQuery()
    )

    if not isinstance(result.items, Unset):
        for agent_instance in result.items:
            print(f"Agent instance key: {agent_instance.agent_instance_key}")
# endregion SearchAgentInstances


# region CreateAgentInstance
def create_agent_instance_example(element_instance_key: ElementInstanceKey) -> None:
    client = CamundaClient()

    result = client.create_agent_instance(
        data=AgentInstanceCreationRequest(
            element_instance_key=element_instance_key,
            definition=AgentInstanceCreationRequestDefinition(
                model="gpt-4o",
                provider="openai",
                system_prompt="You are a helpful assistant.",
            ),
        ),
    )

    print(f"Created agent instance: {result.agent_instance_key}")
# endregion CreateAgentInstance


# region UpdateAgentInstance
def update_agent_instance_example(agent_instance_key: AgentInstanceKey) -> None:
    client = CamundaClient()

    client.update_agent_instance(
        agent_instance_key=agent_instance_key,
        data=AgentInstanceUpdateRequest(
            status=AgentInstanceUpdateRequestStatus.THINKING,
        ),
    )
# endregion UpdateAgentInstance
