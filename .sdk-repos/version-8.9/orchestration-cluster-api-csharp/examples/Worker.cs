// Compilable usage examples for job worker and backpressure operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class WorkerExamples
{
    #region CreateJobWorker

    // <CreateJobWorker>
    public static void CreateJobWorkerExample()
    {
        using var client = CamundaClient.Create();

        var worker = client.CreateJobWorker(
            new JobWorkerConfig { JobType = "payment-service" },
            async (job, ct) =>
            {
                Console.WriteLine($"Processing job {job.JobKey}");
                return new { Success = true };
            });
    }
    // </CreateJobWorker>
    #endregion CreateJobWorker

    #region RunWorkers

    // <RunWorkers>
    public static async Task RunWorkersExample(CancellationToken ct)
    {
        using var client = CamundaClient.Create();

        client.CreateJobWorker(
            new JobWorkerConfig { JobType = "payment-service" },
            async (job, jobCt) =>
            {
                Console.WriteLine($"Processing job {job.JobKey}");
                return null;
            });

        await client.RunWorkersAsync(gracePeriod: TimeSpan.FromSeconds(10), ct);
    }
    // </RunWorkers>
    #endregion RunWorkers

    #region StopAllWorkers

    // <StopAllWorkers>
    public static async Task StopAllWorkersExample()
    {
        using var client = CamundaClient.Create();

        client.CreateJobWorker(
            new JobWorkerConfig { JobType = "payment-service" },
            async (job, ct) =>
            {
                Console.WriteLine($"Processing job {job.JobKey}");
                return null;
            });

        await client.StopAllWorkersAsync(gracePeriod: TimeSpan.FromSeconds(5));
    }
    // </StopAllWorkers>
    #endregion StopAllWorkers

    #region GetWorkers

    // <GetWorkers>
    public static void GetWorkersExample()
    {
        using var client = CamundaClient.Create();

        client.CreateJobWorker(
            new JobWorkerConfig { JobType = "payment-service" },
            async (job, ct) =>
            {
                Console.WriteLine($"Processing job {job.JobKey}");
                return null;
            });

        var workers = client.GetWorkers();
        foreach (var worker in workers)
        {
            Console.WriteLine($"Worker: {worker.Name}, Active: {worker.ActiveJobs}");
        }
    }
    // </GetWorkers>
    #endregion GetWorkers

    #region GetBackpressureState

    // <GetBackpressureState>
    public static void GetBackpressureStateExample()
    {
        using var client = CamundaClient.Create();

        var state = client.GetBackpressureState();
        Console.WriteLine($"Severity: {state.Severity}, Permits: {state.PermitsMax}");
    }
    // </GetBackpressureState>
    #endregion GetBackpressureState
}
