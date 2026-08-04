// Compilable usage examples for mapping rule operations.
// These examples are type-checked during build to guard against API regressions.

import { createCamundaClient, type MappingRuleId } from '@camunda8/orchestration-cluster-api';

//#region CreateMappingRule
async function createMappingRuleExample(mappingRuleId: MappingRuleId) {
  const camunda = createCamundaClient();

  const result = await camunda.createMappingRule({
    mappingRuleId,
    name: 'LDAP Group Mapping',
    claimName: 'groups',
    claimValue: 'engineering',
  });

  console.log(`Created mapping rule: ${result.mappingRuleId}`);
}
//#endregion CreateMappingRule

//#region GetMappingRule
async function getMappingRuleExample(mappingRuleId: MappingRuleId) {
  const camunda = createCamundaClient();

  const rule = await camunda.getMappingRule(
    { mappingRuleId },
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
async function updateMappingRuleExample(mappingRuleId: MappingRuleId) {
  const camunda = createCamundaClient();

  await camunda.updateMappingRule({
    mappingRuleId,
    name: 'LDAP Group Mapping',
    claimName: 'groups',
    claimValue: 'engineering-team',
  });
}
//#endregion UpdateMappingRule

//#region DeleteMappingRule
async function deleteMappingRuleExample(mappingRuleId: MappingRuleId) {
  const camunda = createCamundaClient();

  await camunda.deleteMappingRule({ mappingRuleId });
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
