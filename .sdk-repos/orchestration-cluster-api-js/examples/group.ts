// Compilable usage examples for group management operations.
// These examples are type-checked during build to guard against API regressions.

import { createCamundaClient, type Username } from '@camunda8/orchestration-cluster-api';

//#region CreateGroup
async function createGroupExample() {
  const camunda = createCamundaClient();

  const result = await camunda.createGroup({
    groupId: 'engineering-team',
    name: 'Engineering Team',
  });

  console.log(`Created group: ${result.groupId}`);
}
//#endregion CreateGroup

//#region GetGroup
async function getGroupExample() {
  const camunda = createCamundaClient();

  const group = await camunda.getGroup(
    { groupId: 'engineering-team' },
    { consistency: { waitUpToMs: 5000 } }
  );

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
async function updateGroupExample() {
  const camunda = createCamundaClient();

  await camunda.updateGroup({
    groupId: 'engineering-team',
    name: 'Engineering Team',
  });
}
//#endregion UpdateGroup

//#region DeleteGroup
async function deleteGroupExample() {
  const camunda = createCamundaClient();

  await camunda.deleteGroup({ groupId: 'engineering-team' });
}
//#endregion DeleteGroup

//#region AssignUserToGroup
async function assignUserToGroupExample(username: Username) {
  const camunda = createCamundaClient();

  await camunda.assignUserToGroup({
    groupId: 'engineering-team',
    username,
  });
}
//#endregion AssignUserToGroup

//#region UnassignUserFromGroup
async function unassignUserFromGroupExample(username: Username) {
  const camunda = createCamundaClient();

  await camunda.unassignUserFromGroup({
    groupId: 'engineering-team',
    username,
  });
}
//#endregion UnassignUserFromGroup

//#region AssignClientToGroup
async function assignClientToGroupExample() {
  const camunda = createCamundaClient();

  await camunda.assignClientToGroup({
    groupId: 'engineering-team',
    clientId: 'my-service-account',
  });
}
//#endregion AssignClientToGroup

//#region UnassignClientFromGroup
async function unassignClientFromGroupExample() {
  const camunda = createCamundaClient();

  await camunda.unassignClientFromGroup({
    groupId: 'engineering-team',
    clientId: 'my-service-account',
  });
}
//#endregion UnassignClientFromGroup

//#region SearchUsersForGroup
async function searchUsersForGroupExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchUsersForGroup(
    { groupId: 'engineering-team' },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const user of result.items ?? []) {
    console.log(`Member: ${user.username}`);
  }
}
//#endregion SearchUsersForGroup

//#region SearchClientsForGroup
async function searchClientsForGroupExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchClientsForGroup(
    { groupId: 'engineering-team' },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const client of result.items ?? []) {
    console.log(`Client: ${client.clientId}`);
  }
}
//#endregion SearchClientsForGroup

//#region SearchRolesForGroup
async function searchRolesForGroupExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchRolesForGroup(
    { groupId: 'engineering-team' },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const role of result.items ?? []) {
    console.log(`Role: ${role.name}`);
  }
}
//#endregion SearchRolesForGroup

//#region AssignMappingRuleToGroup
async function assignMappingRuleToGroupExample() {
  const camunda = createCamundaClient();

  await camunda.assignMappingRuleToGroup({
    groupId: 'engineering-team',
    mappingRuleId: 'rule-123',
  });
}
//#endregion AssignMappingRuleToGroup

//#region UnassignMappingRuleFromGroup
async function unassignMappingRuleFromGroupExample() {
  const camunda = createCamundaClient();

  await camunda.unassignMappingRuleFromGroup({
    groupId: 'engineering-team',
    mappingRuleId: 'rule-123',
  });
}
//#endregion UnassignMappingRuleFromGroup

//#region SearchMappingRulesForGroup
async function searchMappingRulesForGroupExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchMappingRulesForGroup(
    { groupId: 'engineering-team' },
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
