<?php

/**
 * Compilable usage examples that back the snippets in README.md.
 *
 * Every example is static-analysed at `max` level during CI, so the snippets in
 * the documentation are guaranteed to reflect the real, current API surface.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\Api\Api\ProcessInstanceApi;
use Camunda\Orchestration\Api\Model\ActivatedJobResult;
use Camunda\Orchestration\Api\Model\ProcessDefinitionSearchQueryResult;
use Camunda\Orchestration\Api\Model\ProcessInstanceCreationInstructionById;
use Camunda\Orchestration\Api\Model\TopologyResponse;
use Camunda\Orchestration\Auth\AuthProviderFactory;
use Camunda\Orchestration\CamundaAsyncClient;
use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Config\CamundaConfiguration;
use Camunda\Orchestration\Http\AuthMiddleware;
use Camunda\Orchestration\Semantic\ProcessDefinitionId;
use Camunda\Orchestration\Worker\JobActionClient;
use Camunda\Orchestration\Worker\JobHandler;
use Camunda\Orchestration\Worker\JobWorkerOptions;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\HandlerStack;

// region ReadmeSyncClient
function readme_sync_client(): void
{
    $client = CamundaClient::fromEnvironment();

    $result = $client->deployResourcesFromFiles(__DIR__ . '/resources/order-process.bpmn');
    // ...
}
// endregion ReadmeSyncClient

// region ReadmeAsyncClient
function readme_async_client(): void
{
    $client = CamundaAsyncClient::fromEnvironment();

    $client->deployResourcesFromFilesAsync(__DIR__ . '/resources/order-process.bpmn')
        ->then(static function ($result): void {
            // handle the DeploymentResult once the request resolves
        })
        ->wait();
}
// endregion ReadmeAsyncClient

// region ReadmeParallelAsyncReads
function parallel_async_reads(CamundaAsyncClient $client): void
{
    // Requests are issued before either promise is awaited.
    $topologyPromise = $client->getTopology();
    $definitionsPromise = $client->searchProcessDefinitions();

    $topology = $topologyPromise->wait();
    $definitions = $definitionsPromise->wait();

    if ($topology instanceof TopologyResponse) {
        printf("Connected to %d broker(s).\n", count($topology->getBrokers()));
    }
    if ($definitions instanceof ProcessDefinitionSearchQueryResult) {
        printf("Found %d process definitions.\n", count($definitions->getItems()));
    }
}
// endregion ReadmeParallelAsyncReads

// region ReadmeSemanticTypes
function readme_semantic_types(): void
{
    // Identifiers are distinct value objects — you cannot accidentally pass a
    // process-definition id where a tenant id is expected.
    $instruction = (new ProcessInstanceCreationInstructionById())
        ->setProcessDefinitionId(ProcessDefinitionId::of('order-process'))
        ->setVariables(['orderId' => 'ORD-42']);

    // Value objects validate their format on construction and stringify cleanly.
    $definitionId = new ProcessDefinitionId('order-process');
    echo (string) $definitionId, "\n";
}
// endregion ReadmeSemanticTypes

// region ReadmeZeroConfig
function readme_zero_config(): void
{
    // Reads CAMUNDA_REST_ADDRESS and auto-detects the auth strategy from the
    // ambient environment (NONE / BASIC / OAUTH).
    $client = CamundaClient::fromEnvironment();
}
// endregion ReadmeZeroConfig

// region ReadmeProgrammaticConfig
function readme_programmatic_config(): void
{
    $config = new CamundaConfiguration(
        restAddress: 'https://my-cluster.example.com/v2',
        authStrategy: 'OAUTH',
        clientId: 'my-client-id',
        clientSecret: 'my-client-secret',
    );

    $client = CamundaClient::fromConfiguration($config);
}
// endregion ReadmeProgrammaticConfig

// region ReadmeBasicAuth
function readme_basic_auth(): void
{
    $client = CamundaClient::fromEnvironment([
        'CAMUNDA_AUTH_STRATEGY' => 'BASIC',
        'CAMUNDA_BASIC_AUTH_USERNAME' => 'demo',
        'CAMUNDA_BASIC_AUTH_PASSWORD' => 'demo',
    ]);
}
// endregion ReadmeBasicAuth

// region ReadmeEnvFileClient
function env_file_client(): CamundaClient
{
    // Set CAMUNDA_LOAD_ENVFILE=true (or a path) before starting PHP. Real
    // environment variables and explicit overrides still take precedence.
    return CamundaClient::fromEnvironment();
}
// endregion ReadmeEnvFileClient

// region ReadmeMtlsClient
function mtls_client(): CamundaClient
{
    return CamundaClient::fromConfiguration(new CamundaConfiguration(
        restAddress: 'https://my-cluster.example.com/v2',
        authStrategy: 'OAUTH',
        clientId: 'my-client-id',
        clientSecret: 'my-client-secret',
        mtlsCertPath: '/run/secrets/client.crt',
        mtlsKeyPath: '/run/secrets/client.key',
        mtlsCaPath: '/run/secrets/cluster-ca.pem',
    ));
}
// endregion ReadmeMtlsClient

// region ReadmeCustomHttpClient
function custom_http_client(CamundaConfiguration $configuration): CamundaClient
{
    // Supplying a Guzzle client replaces the SDK-built stack. Add the SDK auth
    // middleware and any proxy, tracing, or mTLS options your application needs.
    $stack = HandlerStack::create();
    $stack->push(new AuthMiddleware(AuthProviderFactory::fromConfiguration($configuration)), 'camunda_auth');

    return CamundaClient::fromConfiguration(
        $configuration,
        new GuzzleClient(['handler' => $stack, 'http_errors' => false]),
    );
}
// endregion ReadmeCustomHttpClient

// region ReadmeDeployResources
function readme_deploy_resources(): void
{
    $client = CamundaClient::fromEnvironment();

    $result = $client->deployResourcesFromFiles(
        __DIR__ . '/resources/order-process.bpmn',
        __DIR__ . '/resources/pricing.dmn',
    );
    // $result is a DeploymentResult (or ProblemDetail on a handled error).
}
// endregion ReadmeDeployResources

// region ReadmeJobWorker
function readme_job_worker(): void
{
    $client = CamundaClient::fromEnvironment();

    $worker = $client->createJobWorker(new JobWorkerOptions(
        type: 'payment-processing',
        maxJobs: 5,
        timeoutMs: 30_000,
    ));

    $worker->run(function (ActivatedJobResult $job, JobActionClient $action): array {
        // ... perform the work ...
        return ['status' => 'paid'];
    });
}
// endregion ReadmeJobWorker

// region ReadmeObjectJobHandler
final class PaymentJobHandler implements JobHandler
{
    public function handle(ActivatedJobResult $job, JobActionClient $action): ?array
    {
        $variables = $job->getVariables();
        if (!isset($variables['paymentId'])) {
            $action->error('MISSING_PAYMENT_ID', 'The payment job has no payment id.');
            return null;
        }

        return ['paymentStatus' => 'approved'];
    }
}

function object_job_handler(CamundaClient $client): void
{
    $worker = $client->createJobWorker(new JobWorkerOptions(type: 'process-payment'));
    $worker->run(new PaymentJobHandler());
}
// endregion ReadmeObjectJobHandler

// region ReadmeFlatFacade
function readme_flat_facade(): void
{
    $client = CamundaClient::fromEnvironment();
    $instruction = new ProcessInstanceCreationInstructionById([
        'processDefinitionId' => 'order-process',
    ]);

    $topology = $client->getTopology();
    $result = $client->createProcessInstance($instruction);

    $async = CamundaAsyncClient::fromEnvironment();
    $async->getTopology()
        ->then(static function ($asyncTopology): void {
            // handle the asynchronous topology response
        })
        ->wait();
}
// endregion ReadmeFlatFacade

// region ReadmeApiAccessor
function readme_api_accessor(): void
{
    $client = CamundaClient::fromEnvironment();
    $instruction = new ProcessInstanceCreationInstructionById([
        'processDefinitionId' => 'order-process',
    ]);

    $processInstances = $client->api(ProcessInstanceApi::class);
    $result = $processInstances->createProcessInstance($instruction);
}
// endregion ReadmeApiAccessor
