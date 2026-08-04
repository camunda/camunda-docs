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
}
