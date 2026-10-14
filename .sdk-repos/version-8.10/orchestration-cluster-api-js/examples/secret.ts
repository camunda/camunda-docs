// Compilable usage examples for secret operations.
// These examples are type-checked during build to guard against API regressions.

import { createCamundaClient } from '@camunda8/orchestration-cluster-api';

//#region ResolveSecrets
async function resolveSecretsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.resolveSecrets({
    references: ['camunda.secrets.myApiToken', 'camunda.secrets.dbPassword'],
  });

  // Successfully resolved references are returned in `resolved`; references that
  // could not be resolved are returned in `errors`, each with a typed error code.
  // Never log a resolved value — it holds secret material. Pass it straight to the
  // consumer that needs it (HTTP client, DB driver, ...) instead.
  for (const resolved of result.resolved) {
    console.log(`Resolved ${resolved.reference} (value redacted)`);
    useSecret(resolved.value);
  }

  for (const error of result.errors) {
    console.log(`Failed to resolve ${error.reference}: ${error.code} - ${error.message}`);
  }
}

// Hands the resolved secret to whatever needs it, without logging it.
function useSecret(_value: string) {}
//#endregion ResolveSecrets

//#region ListSecrets
async function listSecretsExample() {
  const camunda = createCamundaClient();

  // The request body is reserved for future filtering options and currently
  // takes no properties.
  const result = await camunda.listSecrets({});

  // Only the references are returned — never the secret values. Use
  // `resolveSecrets` to fetch a value when one is actually needed.
  for (const reference of result.references) {
    console.log(`Secret available: ${reference}`);
  }
}
//#endregion ListSecrets

// Suppress "declared but never read"
void resolveSecretsExample;
void listSecretsExample;
