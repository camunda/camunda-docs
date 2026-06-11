// Compilable usage examples for role management operations.
// These examples are type-checked during build to guard against API regressions.

import {
  type ClientId,
  createCamundaClient,
  type GroupId,
  type MappingRuleId,
  type RoleId,
  type Username,
} from '@camunda8/orchestration-cluster-api';

//#region CreateRole
async function createRoleExample(roleId: RoleId) {
  const camunda = createCamundaClient();

  const result = await camunda.createRole({
    roleId,
    name: 'Process Admin',
  });

  console.log(`Created role: ${result.roleId}`);
}
//#endregion CreateRole

//#region GetRole
async function getRoleExample(roleId: RoleId) {
  const camunda = createCamundaClient();

  const role = await camunda.getRole({ roleId }, { consistency: { waitUpToMs: 5000 } });

  console.log(`Role: ${role.name}`);
}
//#endregion GetRole

//#region SearchRoles
async function searchRolesExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchRoles(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const role of result.items ?? []) {
    console.log(`${role.roleId}: ${role.name}`);
  }
}
//#endregion SearchRoles

//#region UpdateRole
async function updateRoleExample(roleId: RoleId) {
  const camunda = createCamundaClient();

  await camunda.updateRole({
    roleId,
    name: 'Process Administrator',
  });
}
//#endregion UpdateRole

//#region DeleteRole
async function deleteRoleExample(roleId: RoleId) {
  const camunda = createCamundaClient();

  await camunda.deleteRole({ roleId });
}
//#endregion DeleteRole

//#region AssignRoleToUser
async function assignRoleToUserExample(roleId: RoleId, username: Username) {
  const camunda = createCamundaClient();

  await camunda.assignRoleToUser({
    roleId,
    username,
  });
}
//#endregion AssignRoleToUser

//#region UnassignRoleFromUser
async function unassignRoleFromUserExample(roleId: RoleId, username: Username) {
  const camunda = createCamundaClient();

  await camunda.unassignRoleFromUser({
    roleId,
    username,
  });
}
//#endregion UnassignRoleFromUser

//#region AssignRoleToGroup
async function assignRoleToGroupExample(roleId: RoleId, groupId: GroupId) {
  const camunda = createCamundaClient();

  await camunda.assignRoleToGroup({
    roleId,
    groupId,
  });
}
//#endregion AssignRoleToGroup

//#region UnassignRoleFromGroup
async function unassignRoleFromGroupExample(roleId: RoleId, groupId: GroupId) {
  const camunda = createCamundaClient();

  await camunda.unassignRoleFromGroup({
    roleId,
    groupId,
  });
}
//#endregion UnassignRoleFromGroup

//#region AssignRoleToClient
async function assignRoleToClientExample(roleId: RoleId, clientId: ClientId) {
  const camunda = createCamundaClient();

  await camunda.assignRoleToClient({
    roleId,
    clientId,
  });
}
//#endregion AssignRoleToClient

//#region UnassignRoleFromClient
async function unassignRoleFromClientExample(roleId: RoleId, clientId: ClientId) {
  const camunda = createCamundaClient();

  await camunda.unassignRoleFromClient({
    roleId,
    clientId,
  });
}
//#endregion UnassignRoleFromClient

//#region AssignRoleToMappingRule
async function assignRoleToMappingRuleExample(roleId: RoleId, mappingRuleId: MappingRuleId) {
  const camunda = createCamundaClient();

  await camunda.assignRoleToMappingRule({
    roleId,
    mappingRuleId,
  });
}
//#endregion AssignRoleToMappingRule

//#region UnassignRoleFromMappingRule
async function unassignRoleFromMappingRuleExample(roleId: RoleId, mappingRuleId: MappingRuleId) {
  const camunda = createCamundaClient();

  await camunda.unassignRoleFromMappingRule({
    roleId,
    mappingRuleId,
  });
}
//#endregion UnassignRoleFromMappingRule

//#region SearchUsersForRole
async function searchUsersForRoleExample(roleId: RoleId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchUsersForRole(
    { roleId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const user of result.items ?? []) {
    console.log(`User: ${user.username}`);
  }
}
//#endregion SearchUsersForRole

//#region SearchGroupsForRole
async function searchGroupsForRoleExample(roleId: RoleId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchGroupsForRole(
    { roleId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const group of result.items ?? []) {
    console.log(`Group: ${group.groupId}`);
  }
}
//#endregion SearchGroupsForRole

//#region SearchClientsForRole
async function searchClientsForRoleExample(roleId: RoleId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchClientsForRole(
    { roleId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const client of result.items ?? []) {
    console.log(`Client: ${client.clientId}`);
  }
}
//#endregion SearchClientsForRole

//#region SearchMappingRulesForRole
async function searchMappingRulesForRoleExample(roleId: RoleId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchMappingRulesForRole(
    { roleId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const rule of result.items ?? []) {
    console.log(`Mapping rule: ${rule.name}`);
  }
}
//#endregion SearchMappingRulesForRole

// Suppress "declared but never read"
void createRoleExample;
void getRoleExample;
void searchRolesExample;
void updateRoleExample;
void deleteRoleExample;
void assignRoleToUserExample;
void unassignRoleFromUserExample;
void assignRoleToGroupExample;
void unassignRoleFromGroupExample;
void assignRoleToClientExample;
void unassignRoleFromClientExample;
void assignRoleToMappingRuleExample;
void unassignRoleFromMappingRuleExample;
void searchUsersForRoleExample;
void searchGroupsForRoleExample;
void searchClientsForRoleExample;
void searchMappingRulesForRoleExample;

// Suppress "declared but never read"
void createRoleExample;
void getRoleExample;
void searchRolesExample;
void updateRoleExample;
void deleteRoleExample;
void assignRoleToUserExample;
void unassignRoleFromUserExample;
void assignRoleToGroupExample;
void unassignRoleFromGroupExample;
void assignRoleToClientExample;
void unassignRoleFromClientExample;
void assignRoleToMappingRuleExample;
void unassignRoleFromMappingRuleExample;
void searchUsersForRoleExample;
void searchGroupsForRoleExample;
void searchClientsForRoleExample;
void searchMappingRulesForRoleExample;
