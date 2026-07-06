// Compilable usage examples for mapping rule operations.
// These examples are type-checked during build to guard against API regressions.

import { createCamundaClient } from '@camunda8/orchestration-cluster-api';

//#region CreateMappingRule
async function createMappingRuleExample() {
  const camunda = createCamundaClient();

  const result = await camunda.createMappingRule({
    mappingRuleId: 'ldap-group-mapping',
    name: 'LDAP Group Mapping',
    claimName: 'groups',
    claimValue: 'engineering',
  });

  console.log(`Created mapping rule: ${result.mappingRuleId}`);
}
//#endregion CreateMappingRule

//#region GetMappingRule
async function getMappingRuleExample() {
  const camunda = createCamundaClient();

  const rule = await camunda.getMappingRule(
    { mappingRuleId: 'ldap-group-mapping' },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Rule: ${rule.name} (${rule.claimName}=${rule.claimValue})`);
}
//#endregion GetMappingRule

//#region SearchMappingRule
async function searchMappingRulesExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchMappingRule(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const rule of result.items ?? []) {
    console.log(`${rule.mappingRuleId}: ${rule.name}`);
  }
}
//#endregion SearchMappingRule

//#region UpdateMappingRule
async function updateMappingRuleExample() {
  const camunda = createCamundaClient();

  await camunda.updateMappingRule({
    mappingRuleId: 'ldap-group-mapping',
    name: 'LDAP Group Mapping',
    claimName: 'groups',
    claimValue: 'engineering-team',
  });
}
//#endregion UpdateMappingRule

//#region DeleteMappingRule
async function deleteMappingRuleExample() {
  const camunda = createCamundaClient();

  await camunda.deleteMappingRule({ mappingRuleId: 'ldap-group-mapping' });
}
//#endregion DeleteMappingRule

// Suppress "declared but never read"
void createMappingRuleExample;
void getMappingRuleExample;
void searchMappingRulesExample;
void updateMappingRuleExample;
void deleteMappingRuleExample;

// Suppress "declared but never read"
void createMappingRuleExample;
void getMappingRuleExample;
void searchMappingRulesExample;
void updateMappingRuleExample;
void deleteMappingRuleExample;
