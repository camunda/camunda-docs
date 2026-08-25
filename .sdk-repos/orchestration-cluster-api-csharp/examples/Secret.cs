// Compilable usage examples for secret operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class SecretExamples
{
    #region ResolveSecrets
    // <ResolveSecrets>
    public static async Task ResolveSecretsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.ResolveSecretsAsync(new SecretResolveRequest
        {
            References = new List<string>
            {
                "camunda.secrets.myApiToken",
                "camunda.secrets.dbPassword",
            },
        });

        // Successfully resolved references are returned in Resolved; references that
        // could not be resolved are returned in Errors, each with a typed error code.
        // Never log resolved.Value — it holds secret material. Pass it directly to the
        // consumer that needs it (HTTP client, DB driver, ...) instead.
        foreach (var resolved in result.Resolved)
        {
            Console.WriteLine($"Resolved {resolved.Reference} (value redacted)");
            UseSecret(resolved.Value);
        }

        foreach (var error in result.Errors)
        {
            Console.WriteLine($"Failed to resolve {error.Reference}: {error.Code} - {error.Message}");
        }
    }

    // Hands the resolved secret to whatever needs it, without logging it.
    private static void UseSecret(string value) { }
    // </ResolveSecrets>
    #endregion ResolveSecrets

    #region ListSecrets

    // <ListSecrets>
    public static async Task ListSecretsExample()
    {
        using var client = CamundaClient.Create();

        // The request body is reserved for future filtering options and currently
        // takes no properties.
        var result = await client.ListSecretsAsync(new SecretListRequest());

        // Only the references are returned — never the secret values. Use
        // ResolveSecretsAsync to fetch a value when one is actually needed.
        foreach (var reference in result.References)
        {
            Console.WriteLine($"Secret available: {reference}");
        }
    }
    // </ListSecrets>
    #endregion ListSecrets
}
