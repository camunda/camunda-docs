# Compilable usage examples for mapping rule operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    MappingRuleCreateRequest,
    MappingRuleSearchQueryRequest,
    MappingRuleUpdateRequest,
    Unset,
)


# region CreateMappingRule
def create_mapping_rule_example() -> None:
    client = CamundaClient()

    result = client.create_mapping_rule(
        data=MappingRuleCreateRequest(
            mapping_rule_id="engineering-group-mapping",
            claim_name="groups",
            claim_value="engineering",
            name="Engineering Group Mapping",
        ),
    )

    print(f"Mapping rule: {result.mapping_rule_id}")
# endregion CreateMappingRule


# region GetMappingRule
def get_mapping_rule_example() -> None:
    client = CamundaClient()

    result = client.get_mapping_rule(mapping_rule_id="rule-123")

    print(f"Mapping rule: {result.name}")
# endregion GetMappingRule


# region SearchMappingRule
def search_mapping_rule_example() -> None:
    client = CamundaClient()

    result = client.search_mapping_rule(
        data=MappingRuleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for rule in result.items:
            print(f"Mapping rule: {rule.name}")
# endregion SearchMappingRule


# region UpdateMappingRule
def update_mapping_rule_example() -> None:
    client = CamundaClient()

    client.update_mapping_rule(
        mapping_rule_id="rule-123",
        data=MappingRuleUpdateRequest(
            claim_name="groups",
            claim_value="senior-engineering",
            name="Senior Engineering Mapping",
        ),
    )
# endregion UpdateMappingRule


# region DeleteMappingRule
def delete_mapping_rule_example() -> None:
    client = CamundaClient()

    client.delete_mapping_rule(mapping_rule_id="rule-123")
# endregion DeleteMappingRule
