// Compilable usage examples for role management operations.
// These examples are type-checked during build to guard against API regressions.

import { createCamundaClient, type Username } from '@camunda8/orchestration-cluster-api';

//#region CreateRole
async function createRoleExample() {
  const camunda = createCamundaClient();

  const result = await camunda.createRole({
    roleId: 'process-admin',
    name: 'Process Admin',
  });

  console.log(`Created role: ${result.roleId}`);
}
//#endregion CreateRole

//#region GetRole
async function getRoleExample() {
  const camunda = createCamundaClient();

  const role = await camunda.getRole(
    { roleId: 'process-admin' },
    { consistency: { waitUpToMs: 5000 } }
  );

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
async function updateRoleExample() {
  const camunda = createCamundaClient();

  await camunda.updateRole({
    roleId: 'process-admin',
    name: 'Process Administrator',
  });
}
//#endregion UpdateRole

//#region DeleteRole
async function deleteRoleExample() {
  const camunda = createCamundaClient();

  await camunda.deleteRole({ roleId: 'process-admin' });
}
//#endregion DeleteRole

//#region AssignRoleToUser
async function assignRoleToUserExample(username: Username) {
  const camunda = createCamundaClient();

  await camunda.assignRoleToUser({
    roleId: 'process-admin',
    username,
  });
}
//#endregion AssignRoleToUser

//#region UnassignRoleFromUser
async function unassignRoleFromUserExample(username: Username) {
  const camunda = createCamundaClient();

  await camunda.unassignRoleFromUser({
    roleId: 'process-admin',
    username,
  });
}
//#endregion UnassignRoleFromUser

//#region AssignRoleToGroup
async function assignRoleToGroupExample() {
  const camunda = createCamundaClient();

  await camunda.assignRoleToGroup({
    roleId: 'process-admin',
    groupId: 'engineering-team',
  });
}
//#endregion AssignRoleToGroup

//#region UnassignRoleFromGroup
async function unassignRoleFromGroupExample() {
  const camunda = createCamundaClient();

  await camunda.unassignRoleFromGroup({
    roleId: 'process-admin',
    groupId: 'engineering-team',
  });
}
//#endregion UnassignRoleFromGroup

//#region AssignRoleToClient
async function assignRoleToClientExample() {
  const camunda = createCamundaClient();

  await camunda.assignRoleToClient({
    roleId: 'process-admin',
    clientId: 'my-service-account',
  });
}
//#endregion AssignRoleToClient

//#region UnassignRoleFromClient
async function unassignRoleFromClientExample() {
  const camunda = createCamundaClient();

  await camunda.unassignRoleFromClient({
    roleId: 'process-admin',
    clientId: 'my-service-account',
  });
}
//#endregion UnassignRoleFromClient

//#region AssignRoleToMappingRule
async function assignRoleToMappingRuleExample() {
  const camunda = createCamundaClient();

  await camunda.assignRoleToMappingRule({
    roleId: 'process-admin',
    mappingRuleId: 'rule-123',
  });
}
//#endregion AssignRoleToMappingRule

//#region UnassignRoleFromMappingRule
async function unassignRoleFromMappingRuleExample() {
  const camunda = createCamundaClient();

  await camunda.unassignRoleFromMappingRule({
    roleId: 'process-admin',
    mappingRuleId: 'rule-123',
  });
}
//#endregion UnassignRoleFromMappingRule

//#region SearchUsersForRole
async function searchUsersForRoleExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchUsersForRole(
    { roleId: 'process-admin' },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const user of result.items ?? []) {
    console.log(`User: ${user.username}`);
  }
}
//#endregion SearchUsersForRole

//#region SearchGroupsForRole
async function searchGroupsForRoleExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchGroupsForRole(
    { roleId: 'process-admin' },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const group of result.items ?? []) {
    console.log(`Group: ${group.groupId}`);
  }
}
//#endregion SearchGroupsForRole

//#region SearchClientsForRole
async function searchClientsForRoleExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchClientsForRole(
    { roleId: 'process-admin' },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const client of result.items ?? []) {
    console.log(`Client: ${client.clientId}`);
  }
}
//#endregion SearchClientsForRole

//#region SearchMappingRulesForRole
async function searchMappingRulesForRoleExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchMappingRulesForRole(
    { roleId: 'process-admin' },
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
