# Compilable usage examples for agent instance operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

import datetime

from camunda_orchestration_sdk import (
    AgentInstanceCreationRequest,
    AgentInstanceHistoryItem,
    AgentInstanceHistoryItemLimits,
    AgentInstanceHistoryItemRole,
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
def create_agent_instance_example(
    element_instance_key: ElementInstanceKey,
    job_key: JobKey,
) -> None:
    client = CamundaClient()

    result = client.create_agent_instance(
        data=AgentInstanceCreationRequest(
            element_instance_key=element_instance_key,
            job_key=job_key,
            job_lease="lease-token",
            history=[
                # A CONFIGURATION item is mandatory on creation; it carries the model,
                # provider and system prompt in role-specific fields, not in content.
                AgentInstanceHistoryItem(
                    history_item_id="configuration-1",
                    loop_iteration=1,
                    role=AgentInstanceHistoryItemRole.CONFIGURATION,
                    content=[],
                    produced_at=datetime.datetime.now(datetime.timezone.utc),
                    model="gpt-4o",
                    provider="openai",
                    system_prompt=[
                        TextContent(content_type="TEXT", text="You are a helpful assistant."),
                    ],
                    limits=AgentInstanceHistoryItemLimits(
                        max_model_calls=10,
                        max_tool_calls=20,
                        max_tokens=100_000,
                    ),
                ),
            ],
        ),
    )

    print(f"Created agent instance: {result.agent_instance_key}")


# endregion CreateAgentInstance


# region UpdateAgentInstance
def update_agent_instance_example(
    agent_instance_key: AgentInstanceKey,
    element_instance_key: ElementInstanceKey,
    job_key: JobKey,
) -> None:
    client = CamundaClient()

    # Appending conversation history is part of an update; there is no separate
    # history-item endpoint.
    result = client.update_agent_instance(
        agent_instance_key=agent_instance_key,
        data=AgentInstanceUpdateRequest(
            element_instance_key=element_instance_key,
            job_key=job_key,
            job_lease="lease-token",
            status=AgentInstanceUpdateRequestStatus.THINKING,
            history=[
                AgentInstanceHistoryItem(
                    history_item_id="assistant-1",
                    loop_iteration=1,
                    role=AgentInstanceHistoryItemRole.ASSISTANT,
                    content=[
                        TextContent(content_type="TEXT", text="How can I help you today?"),
                    ],
                    produced_at=datetime.datetime.now(datetime.timezone.utc),
                ),
            ],
        ),
    )

    for item in result.created_history:
        print(f"Appended history item {item.history_item_id}: {item.history_item_key}")


# endregion UpdateAgentInstance


# region SearchAgentInstanceHistory
def search_agent_instance_history_example(agent_instance_key: AgentInstanceKey) -> None:
    client = CamundaClient()

    result = client.search_agent_instance_history(
        agent_instance_key=agent_instance_key,
        data=AgentInstanceHistorySearchQuery(),
    )

    print(f"Found {len(result.items)} history items")


# endregion SearchAgentInstanceHistory
