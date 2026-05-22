// Compilable usage examples for tenant management operations.
// These examples are type-checked during build to guard against API regressions.

import {
  type ClientId,
  createCamundaClient,
  type GroupId,
  type MappingRuleId,
  type RoleId,
  type TenantId,
  type Username,
} from '@camunda8/orchestration-cluster-api';

//#region CreateTenant
async function createTenantExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  const result = await camunda.createTenant({
    tenantId,
    name: 'Customer Service',
  });

  console.log(`Created tenant: ${result.tenantId}`);
}
//#endregion CreateTenant

//#region GetTenant
async function getTenantExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  const tenant = await camunda.getTenant({ tenantId }, { consistency: { waitUpToMs: 5000 } });

  console.log(`Tenant: ${tenant.name}`);
}
//#endregion GetTenant

//#region SearchTenants
async function searchTenantsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchTenants(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const tenant of result.items ?? []) {
    console.log(`${tenant.tenantId}: ${tenant.name}`);
  }
}
//#endregion SearchTenants

//#region UpdateTenant
async function updateTenantExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  await camunda.updateTenant({
    tenantId,
    name: 'Customer Service Team',
  });
}
//#endregion UpdateTenant

//#region DeleteTenant
async function deleteTenantExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  await camunda.deleteTenant({ tenantId });
}
//#endregion DeleteTenant

//#region AssignUserToTenant
async function assignUserToTenantExample(tenantId: TenantId, username: Username) {
  const camunda = createCamundaClient();

  await camunda.assignUserToTenant({
    tenantId,
    username,
  });
}
//#endregion AssignUserToTenant

//#region UnassignUserFromTenant
async function unassignUserFromTenantExample(tenantId: TenantId, username: Username) {
  const camunda = createCamundaClient();

  await camunda.unassignUserFromTenant({
    tenantId,
    username,
  });
}
//#endregion UnassignUserFromTenant

//#region AssignGroupToTenant
async function assignGroupToTenantExample(tenantId: TenantId, groupId: GroupId) {
  const camunda = createCamundaClient();

  await camunda.assignGroupToTenant({
    tenantId,
    groupId,
  });
}
//#endregion AssignGroupToTenant

//#region UnassignGroupFromTenant
async function unassignGroupFromTenantExample(tenantId: TenantId, groupId: GroupId) {
  const camunda = createCamundaClient();

  await camunda.unassignGroupFromTenant({
    tenantId,
    groupId,
  });
}
//#endregion UnassignGroupFromTenant

//#region AssignRoleToTenant
async function assignRoleToTenantExample(tenantId: TenantId, roleId: RoleId) {
  const camunda = createCamundaClient();

  await camunda.assignRoleToTenant({
    tenantId,
    roleId,
  });
}
//#endregion AssignRoleToTenant

//#region UnassignRoleFromTenant
async function unassignRoleFromTenantExample(tenantId: TenantId, roleId: RoleId) {
  const camunda = createCamundaClient();

  await camunda.unassignRoleFromTenant({
    tenantId,
    roleId,
  });
}
//#endregion UnassignRoleFromTenant

//#region AssignClientToTenant
async function assignClientToTenantExample(tenantId: TenantId, clientId: ClientId) {
  const camunda = createCamundaClient();

  await camunda.assignClientToTenant({
    tenantId,
    clientId,
  });
}
//#endregion AssignClientToTenant

//#region UnassignClientFromTenant
async function unassignClientFromTenantExample(tenantId: TenantId, clientId: ClientId) {
  const camunda = createCamundaClient();

  await camunda.unassignClientFromTenant({
    tenantId,
    clientId,
  });
}
//#endregion UnassignClientFromTenant

//#region AssignMappingRuleToTenant
async function assignMappingRuleToTenantExample(tenantId: TenantId, mappingRuleId: MappingRuleId) {
  const camunda = createCamundaClient();

  await camunda.assignMappingRuleToTenant({
    tenantId,
    mappingRuleId,
  });
}
//#endregion AssignMappingRuleToTenant

//#region UnassignMappingRuleFromTenant
async function unassignMappingRuleFromTenantExample(
  tenantId: TenantId,
  mappingRuleId: MappingRuleId
) {
  const camunda = createCamundaClient();

  await camunda.unassignMappingRuleFromTenant({
    tenantId,
    mappingRuleId,
  });
}
//#endregion UnassignMappingRuleFromTenant

//#region SearchUsersForTenant
async function searchUsersForTenantExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchUsersForTenant(
    { tenantId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const user of result.items ?? []) {
    console.log(`Tenant member: ${user.username}`);
  }
}
//#endregion SearchUsersForTenant

//#region SearchClientsForTenant
async function searchClientsForTenantExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchClientsForTenant(
    { tenantId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const client of result.items ?? []) {
    console.log(`Client: ${client.clientId}`);
  }
}
//#endregion SearchClientsForTenant

//#region SearchGroupIdsForTenant
async function searchGroupIdsForTenantExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchGroupIdsForTenant(
    { tenantId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const group of result.items ?? []) {
    console.log(`Group: ${group.groupId}`);
  }
}
//#endregion SearchGroupIdsForTenant

//#region SearchRolesForTenant
async function searchRolesForTenantExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchRolesForTenant(
    { tenantId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const role of result.items ?? []) {
    console.log(`Role: ${role.name}`);
  }
}
//#endregion SearchRolesForTenant

//#region SearchMappingRulesForTenant
async function searchMappingRulesForTenantExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchMappingRulesForTenant(
    { tenantId },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const rule of result.items ?? []) {
    console.log(`Mapping rule: ${rule.name}`);
  }
}
//#endregion SearchMappingRulesForTenant

// Suppress "declared but never read"
void createTenantExample;
void getTenantExample;
void searchTenantsExample;
void updateTenantExample;
void deleteTenantExample;
void assignUserToTenantExample;
void unassignUserFromTenantExample;
void assignGroupToTenantExample;
void unassignGroupFromTenantExample;
void assignRoleToTenantExample;
void unassignRoleFromTenantExample;
void assignClientToTenantExample;
void unassignClientFromTenantExample;
void assignMappingRuleToTenantExample;
void unassignMappingRuleFromTenantExample;
void searchUsersForTenantExample;
void searchClientsForTenantExample;
void searchGroupIdsForTenantExample;
void searchRolesForTenantExample;
void searchMappingRulesForTenantExample;

// Suppress "declared but never read"
void createTenantExample;
void getTenantExample;
void searchTenantsExample;
void updateTenantExample;
void deleteTenantExample;
void assignUserToTenantExample;
void unassignUserFromTenantExample;
void assignGroupToTenantExample;
void unassignGroupFromTenantExample;
void assignRoleToTenantExample;
void unassignRoleFromTenantExample;
void assignClientToTenantExample;
void unassignClientFromTenantExample;
void assignMappingRuleToTenantExample;
void unassignMappingRuleFromTenantExample;
void searchUsersForTenantExample;
void searchClientsForTenantExample;
void searchGroupIdsForTenantExample;
void searchRolesForTenantExample;
void searchMappingRulesForTenantExample;
