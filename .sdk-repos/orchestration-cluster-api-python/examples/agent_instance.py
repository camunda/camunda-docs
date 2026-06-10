# Compilable usage examples for agent instance operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

import datetime

from camunda_orchestration_sdk import (
    AgentInstanceCreationRequest,
    AgentInstanceCreationRequestDefinition,
    AgentInstanceHistoryItemRequest,
    AgentInstanceHistoryItemRequestRole,
    AgentInstanceHistorySearchQuery,
    AgentInstanceKey,
    AgentInstanceSearchQuery,
    AgentInstanceUpdateRequest,
    AgentInstanceUpdateRequestStatus,
    CamundaClient,
    ElementInstanceKey,
    JobKey,
    TextContent,
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

    result = client.search_agent_instances(data=AgentInstanceSearchQuery())

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
def update_agent_instance_example(
    agent_instance_key: AgentInstanceKey,
    element_instance_key: ElementInstanceKey,
) -> None:
    client = CamundaClient()

    client.update_agent_instance(
        agent_instance_key=agent_instance_key,
        data=AgentInstanceUpdateRequest(
            element_instance_key=element_instance_key,
            status=AgentInstanceUpdateRequestStatus.THINKING,
        ),
    )


# endregion UpdateAgentInstance


# region CreateAgentInstanceHistoryItem
def create_agent_instance_history_item_example(
    agent_instance_key: AgentInstanceKey,
    element_instance_key: ElementInstanceKey,
    job_key: JobKey,
) -> None:
    client = CamundaClient()

    result = client.create_agent_instance_history_item(
        agent_instance_key=agent_instance_key,
        data=AgentInstanceHistoryItemRequest(
            element_instance_key=element_instance_key,
            job_key=job_key,
            job_lease="lease-token",
            role=AgentInstanceHistoryItemRequestRole.ASSISTANT,
            content=[TextContent(content_type="TEXT", text="How can I help you today?")],
            produced_at=datetime.datetime.now(datetime.timezone.utc),
        ),
    )

    print(f"Created history item: {result.history_item_key}")


# endregion CreateAgentInstanceHistoryItem


# region SearchAgentInstanceHistory
def search_agent_instance_history_example(agent_instance_key: AgentInstanceKey) -> None:
    client = CamundaClient()

    result = client.search_agent_instance_history(
        agent_instance_key=agent_instance_key,
        data=AgentInstanceHistorySearchQuery(),
    )

    print(f"Found {len(result.items)} history items")


# endregion SearchAgentInstanceHistory
