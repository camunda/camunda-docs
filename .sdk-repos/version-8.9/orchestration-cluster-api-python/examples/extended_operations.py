# Compilable usage examples for extended process instance, definition, variable, and element operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    AdHocSubProcessActivateActivitiesInstruction,
    AdHocSubProcessActivateActivityReference,
    CamundaClient,
    ElementId,
    ElementInstanceKey,
    ElementInstanceSearchQuery,
    IncidentSearchQuery,
    MigrateProcessInstanceMappingInstruction,
    ProcessDefinitionId,
    ProcessDefinitionInstanceStatisticsQuery,
    ProcessDefinitionInstanceVersionStatisticsQuery,
    ProcessDefinitionInstanceVersionStatisticsQueryFilter,
    ProcessDefinitionKey,
    ProcessDefinitionMessageSubscriptionStatisticsQuery,
    ProcessDefinitionSearchQuery,
    ProcessInstanceKey,
    ProcessInstanceMigrationInstruction,
    ProcessInstanceModificationInstruction,
    SetVariableRequest,
    SetVariableRequestVariables,
    Unset,
    VariableKey,
)


# region GetProcessInstance
def get_process_instance_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_process_instance(
        process_instance_key=process_instance_key,
    )

    print(f"Process instance: {result.process_definition_id}")
# endregion GetProcessInstance


# region DeleteProcessInstance
def delete_process_instance_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    client.delete_process_instance(
        process_instance_key=process_instance_key,
    )
# endregion DeleteProcessInstance


# region MigrateProcessInstance
def migrate_process_instance_example(process_instance_key: ProcessInstanceKey, target_process_definition_key: ProcessDefinitionKey, source_element_id: ElementId, target_element_id: ElementId) -> None:
    client = CamundaClient()

    client.migrate_process_instance(
        process_instance_key=process_instance_key,
        data=ProcessInstanceMigrationInstruction(
            target_process_definition_key=target_process_definition_key,
            mapping_instructions=[
                MigrateProcessInstanceMappingInstruction(
                    source_element_id=source_element_id,
                    target_element_id=target_element_id,
                ),
            ],
        ),
    )
# endregion MigrateProcessInstance


# region ModifyProcessInstance
def modify_process_instance_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    client.modify_process_instance(
        process_instance_key=process_instance_key,
        data=ProcessInstanceModificationInstruction(),
    )
# endregion ModifyProcessInstance


# region GetProcessInstanceStatistics
def get_process_instance_statistics_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_process_instance_statistics(
        process_instance_key=process_instance_key,
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Element: {stat.element_id}, Active: {stat.active}")
# endregion GetProcessInstanceStatistics


# region GetProcessInstanceSequenceFlows
def get_process_instance_sequence_flows_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_process_instance_sequence_flows(
        process_instance_key=process_instance_key,
    )

    if not isinstance(result.items, Unset):
        for flow in result.items:
            print(f"Sequence flow: {flow}")
# endregion GetProcessInstanceSequenceFlows


# region GetProcessInstanceCallHierarchy
def get_process_instance_call_hierarchy_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_process_instance_call_hierarchy(
        process_instance_key=process_instance_key,
    )

    for entry in result:
        print(f"Call hierarchy entry: {entry}")
# endregion GetProcessInstanceCallHierarchy


# region SearchProcessInstanceIncidents
def search_process_instance_incidents_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.search_process_instance_incidents(
        process_instance_key=process_instance_key,
        data=IncidentSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for incident in result.items:
            print(f"Incident: {incident.incident_key}")
# endregion SearchProcessInstanceIncidents


# region ResolveProcessInstanceIncidents
def resolve_process_instance_incidents_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.resolve_process_instance_incidents(
        process_instance_key=process_instance_key,
    )

    print(f"Batch operation key: {result.batch_operation_key}")
# endregion ResolveProcessInstanceIncidents


# region GetProcessDefinition
def get_process_definition_example(process_definition_key: ProcessDefinitionKey) -> None:
    client = CamundaClient()

    result = client.get_process_definition(
        process_definition_key=process_definition_key,
    )

    print(f"Process definition: {result.name}")
# endregion GetProcessDefinition


# region GetProcessDefinitionXml
def get_process_definition_xml_example(process_definition_key: ProcessDefinitionKey) -> None:
    client = CamundaClient()

    xml = client.get_process_definition_xml(
        process_definition_key=process_definition_key,
    )

    print(f"XML length: {len(xml)}")
# endregion GetProcessDefinitionXml


# region SearchProcessDefinitions
def search_process_definitions_example() -> None:
    client = CamundaClient()

    result = client.search_process_definitions(
        data=ProcessDefinitionSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for pd in result.items:
            print(f"Process definition: {pd.name}")
# endregion SearchProcessDefinitions


# region GetProcessDefinitionStatistics
def get_process_definition_statistics_example(process_definition_key: ProcessDefinitionKey) -> None:
    client = CamundaClient()

    result = client.get_process_definition_statistics(
        process_definition_key=process_definition_key,
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Element: {stat.element_id}")
# endregion GetProcessDefinitionStatistics


# region GetProcessDefinitionInstanceStatistics
def get_process_definition_instance_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_process_definition_instance_statistics(
        data=ProcessDefinitionInstanceStatisticsQuery(),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Definition: {stat.process_definition_id}")
# endregion GetProcessDefinitionInstanceStatistics


# region GetProcessDefinitionInstanceVersionStatistics
def get_process_definition_instance_version_statistics_example(process_definition_id: ProcessDefinitionId) -> None:
    client = CamundaClient()

    result = client.get_process_definition_instance_version_statistics(
        data=ProcessDefinitionInstanceVersionStatisticsQuery(
            filter_=ProcessDefinitionInstanceVersionStatisticsQueryFilter(
                process_definition_id=process_definition_id,
            ),
        ),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Version: {stat.process_definition_version}")
# endregion GetProcessDefinitionInstanceVersionStatistics


# region GetProcessDefinitionMessageSubscriptionStatistics
def get_process_definition_message_subscription_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_process_definition_message_subscription_statistics(
        data=ProcessDefinitionMessageSubscriptionStatisticsQuery(),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Definition: {stat.process_definition_id}, subscriptions: {stat.active_subscriptions}")
# endregion GetProcessDefinitionMessageSubscriptionStatistics


# region GetStartProcessForm
def get_start_process_form_example(process_definition_key: ProcessDefinitionKey) -> None:
    client = CamundaClient()

    result = client.get_start_process_form(
        process_definition_key=process_definition_key,
    )

    print(f"Form: {result.form_key}")
# endregion GetStartProcessForm


# region GetVariable
def get_variable_example(variable_key: VariableKey) -> None:
    client = CamundaClient()

    result = client.get_variable(
        variable_key=variable_key,
    )

    print(f"Variable: {result.name} = {result.value}")
# endregion GetVariable


# region SearchVariables
def search_variables_example() -> None:
    client = CamundaClient()

    result = client.search_variables()

    if not isinstance(result.items, Unset):
        for var in result.items:
            print(f"Variable: {var.name}")
# endregion SearchVariables


# region GetElementInstance
def get_element_instance_example(element_instance_key: ElementInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_element_instance(
        element_instance_key=element_instance_key,
    )

    print(f"Element: {result.element_id}")
# endregion GetElementInstance


# region SearchElementInstances
def search_element_instances_example() -> None:
    client = CamundaClient()

    result = client.search_element_instances(
        data=ElementInstanceSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for ei in result.items:
            print(f"Element instance: {ei.element_instance_key}")
# endregion SearchElementInstances


# region SearchElementInstanceIncidents
def search_element_instance_incidents_example(element_instance_key: ElementInstanceKey) -> None:
    client = CamundaClient()

    result = client.search_element_instance_incidents(
        element_instance_key=element_instance_key,
        data=IncidentSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for incident in result.items:
            print(f"Incident: {incident.incident_key}")
# endregion SearchElementInstanceIncidents


# region CreateElementInstanceVariables
def create_element_instance_variables_example(element_instance_key: ElementInstanceKey) -> None:
    client = CamundaClient()

    variables = SetVariableRequestVariables.from_dict({"myVar": "myValue"})
    client.create_element_instance_variables(
        element_instance_key=element_instance_key,
        data=SetVariableRequest(
            variables=variables,
        ),
    )
# endregion CreateElementInstanceVariables


# region ActivateAdHocSubProcessActivities
def activate_ad_hoc_sub_process_activities_example(element_id: ElementId) -> None:
    client = CamundaClient()

    client.activate_ad_hoc_sub_process_activities(
        ad_hoc_sub_process_instance_key="123456",
        data=AdHocSubProcessActivateActivitiesInstruction(
            elements=[
                AdHocSubProcessActivateActivityReference(element_id=element_id),
                AdHocSubProcessActivateActivityReference(element_id=element_id),
            ],
        ),
    )
# endregion ActivateAdHocSubProcessActivities
