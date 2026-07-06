// Compilable usage examples for group management operations.
// These examples are type-checked during build to guard against API regressions.

import {
  type ClientId,
  createCamundaClient,
  type GroupId,
  type MappingRuleId,
  type Username,
} from '@camunda8/orchestration-cluster-api';

//#region CreateGroup
async function createGroupExample(groupId: GroupId) {
  const camunda = createCamundaClient();

  const result = await camunda.createGroup({
    groupId,
    name: 'Engineering Team',
  });

  console.log(`Created group: ${result.groupId}`);
}
//#endregion CreateGroup

//#region GetGroup
async function getGroupExample(groupId: GroupId) {
  const camunda = createCamundaClient();

  const group = await camunda.getGroup({ groupId }, { consistency: { waitUpToMs: 5000 } });

  console.log(`Group: ${group.name}`);
}
//#endregion GetGroup

//#region SearchGroups
async function searchGroupsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchGroups(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const group of result.items ?? []) {
    console.log(`${group.groupId}: ${group.name}`);
  }
}
//#endregion SearchGroups

//#region UpdateGroup
async function updateGroupExample(groupId: GroupId) {
  const camunda = createCamundaClient();

  await camunda.updateGroup({
    groupId,
    name: 'Engineering Team',
  });
}
//#endregion UpdateGroup

//#region DeleteGroup
async function deleteGroupExample(groupId: GroupId) {
  const camunda = createCamundaClient();

  await camunda.deleteGroup({ groupId });
}
//#endregion DeleteGroup

//#region AssignUserToGroup
async function assignUserToGroupExample(groupId: GroupId, username: Username) {
  const camunda = createCamundaClient();

  await camunda.assignUserToGroup({
    groupId,
    username,
  });
}
//#endregion AssignUserToGroup

//#region UnassignUserFromGroup
async function unassignUserFromGroupExample(groupId: GroupId, username: Username) {
  const camunda = createCamundaClient();

  await camunda.unassignUserFromGroup({
    groupId,
    username,
  });
}
//#endregion UnassignUserFromGroup

//#region AssignClientToGroup
async function assignClientToGroupExample(groupId: GroupId, clientId: ClientId) {
  const camunda = createCamundaClient();

  await camunda.assignClientToGroup({
    groupId,
    clientId,
  });
}
//#endregion AssignClientToGroup

//#region UnassignClientFromGroup
async function unassignClientFromGroupExample(groupId: GroupId, clientId: ClientId) {
  const camunda = createCamundaClient();

  await camunda.unassignClientFromGroup({
    groupId,
    clientId,
  });
}
//#endregion UnassignClientFromGroup

//#region SearchUsersForGroup
async function searchUsersForGroupExample(groupId: GroupId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchUsersForGroup(
    { groupId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const user of result.items ?? []) {
    console.log(`Member: ${user.username}`);
  }
}
//#endregion SearchUsersForGroup

//#region SearchClientsForGroup
async function searchClientsForGroupExample(groupId: GroupId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchClientsForGroup(
    { groupId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const client of result.items ?? []) {
    console.log(`Client: ${client.clientId}`);
  }
}
//#endregion SearchClientsForGroup

//#region SearchRolesForGroup
async function searchRolesForGroupExample(groupId: GroupId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchRolesForGroup(
    { groupId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const role of result.items ?? []) {
    console.log(`Role: ${role.name}`);
  }
}
//#endregion SearchRolesForGroup

//#region AssignMappingRuleToGroup
async function assignMappingRuleToGroupExample(groupId: GroupId, mappingRuleId: MappingRuleId) {
  const camunda = createCamundaClient();

  await camunda.assignMappingRuleToGroup({
    groupId,
    mappingRuleId,
  });
}
//#endregion AssignMappingRuleToGroup

//#region UnassignMappingRuleFromGroup
async function unassignMappingRuleFromGroupExample(groupId: GroupId, mappingRuleId: MappingRuleId) {
  const camunda = createCamundaClient();

  await camunda.unassignMappingRuleFromGroup({
    groupId,
    mappingRuleId,
  });
}
//#endregion UnassignMappingRuleFromGroup

//#region SearchMappingRulesForGroup
async function searchMappingRulesForGroupExample(groupId: GroupId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchMappingRulesForGroup(
    { groupId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const rule of result.items ?? []) {
    console.log(`Mapping rule: ${rule.name}`);
  }
}
//#endregion SearchMappingRulesForGroup

// Suppress "declared but never read"
void createGroupExample;
void getGroupExample;
void searchGroupsExample;
void updateGroupExample;
void deleteGroupExample;
void assignUserToGroupExample;
void unassignUserFromGroupExample;
void assignClientToGroupExample;
void unassignClientFromGroupExample;
void searchUsersForGroupExample;
void searchClientsForGroupExample;
void searchRolesForGroupExample;
void assignMappingRuleToGroupExample;
void unassignMappingRuleFromGroupExample;
void searchMappingRulesForGroupExample;

// Suppress "declared but never read"
void createGroupExample;
void getGroupExample;
void searchGroupsExample;
void updateGroupExample;
void deleteGroupExample;
void assignUserToGroupExample;
void unassignUserFromGroupExample;
void assignClientToGroupExample;
void unassignClientFromGroupExample;
void searchUsersForGroupExample;
void searchClientsForGroupExample;
void searchRolesForGroupExample;
void assignMappingRuleToGroupExample;
void unassignMappingRuleFromGroupExample;
void searchMappingRulesForGroupExample;
