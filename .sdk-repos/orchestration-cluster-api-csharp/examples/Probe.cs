// Compilable usage examples for probe operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class ProbeExamples
{
    #region CreateProbe
    // <CreateProbe>
    public static async Task CreateProbeExample(ProbeId probeId)
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateProbeAsync(new ProbeCreationRequest
        {
            ProbeId = probeId,
            Input = "={ question: \"health\", includeDetails: true }",
            RequestTimeout = 10000,
        });

        switch (result)
        {
            case ProbeOkResult ok:
                Console.WriteLine($"Probe answered by {ok.Worker}: {ok.Data}");
                break;
            case ProbeUnsupportedResult unsupported:
                Console.WriteLine($"Probe is unsupported by {unsupported.Worker}");
                break;
            case ProbeErrorResult error:
                Console.WriteLine($"Probe failed in {error.Worker}: {error.Message}");
                break;
        }
    }
    // </CreateProbe>
    #endregion CreateProbe

    #region ActivateProbes

    // <ActivateProbes>
    public static async Task ActivateProbesExample(ProbeId probeId)
    {
        using var client = CamundaClient.Create();

        var result = await client.ActivateProbesAsync(new ProbeActivationRequest
        {
            ProbeIds = new List<ProbeId> { probeId },
            Worker = "health-check-worker",
            MaxProbesToActivate = 10,
            RequestTimeout = 30000,
        });

        foreach (var probe in result.Probes)
        {
            Console.WriteLine(
                $"Probe {probe.ProbeKey} ({probe.ProbeId}) must be answered by {probe.Deadline}");
        }
    }
    // </ActivateProbes>
    #endregion ActivateProbes

    #region AnswerProbe

    // <AnswerProbe>
    public static async Task AnswerProbeExample(ProbeKey probeKey)
    {
        using var client = CamundaClient.Create();

        await client.AnswerProbeAsync(
            probeKey,
            new ProbeOkAnswerRequest
            {
                Data = new
                {
                    Status = "healthy",
                    CheckedAt = DateTimeOffset.UtcNow,
                },
            });
    }
    // </AnswerProbe>
    #endregion AnswerProbe
}
