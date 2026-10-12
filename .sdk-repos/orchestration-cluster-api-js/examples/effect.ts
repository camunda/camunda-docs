// Compilable usage examples for the opt-in `/effect` subpath that appear in README.md.
// These snippets are synced into README.md by scripts/sync-readme-snippets.ts and are
// type-checked during build (via hooks/post/950-typecheck-examples.ts) to guard against
// API drift — the same contract the Promise-first examples in `readme.ts` are held to.
//
// `effect` is an optional peer dependency of the SDK; it is a devDependency of this repo,
// so these examples compile here. Consumers install it alongside the SDK.

// The per-block import lists rendered in README.md live in `readme-imports.txt` (the
// repo-wide convention — one organized import block per example file cannot also be
// split per snippet). Every symbol they name is imported here too, so removing an
// export breaks this file's type-check.
import {
  CamundaEffect,
  type CamundaEffectClient,
  createCamundaEffectClient,
  createCamundaEffectWorker,
  type EventualConsistencyTimeout,
  eventually,
  layer,
  RetryableJobError,
  TerminalJobError,
  workerLayer,
} from '@camunda8/orchestration-cluster-api/effect';
import { Context, Effect, Layer, Schedule, Stream } from 'effect';

// ---------------------------------------------------------------------------
// Effect client
// ---------------------------------------------------------------------------

async function _readmeEffectClient() {
  //#region ReadmeEffectClient
  const camunda = createCamundaEffectClient();

  const program = Effect.gen(function* () {
    const deployment = yield* camunda.deployResourcesFromFiles(['./bpmn/process.bpmn']);
    const { processInstanceKey } = yield* camunda.createProcessInstance({
      processDefinitionKey: deployment.processes[0].processDefinitionKey,
    });
    // Poll on the Effect Clock until the instance is searchable, timing out deterministically.
    // waitUpToMs: 0 asks the SDK for the latest available state without its own wall-clock
    // wait, so the Effect `eventually` combinator owns the predicate + timeout horizon —
    // making the eventual-consistency wait deterministic under TestClock.
    const search = yield* eventually(
      camunda.searchProcessInstances(
        { filter: { processInstanceKey } },
        { consistency: { waitUpToMs: 0 } }
      ),
      (s) => s.items.some((i) => i.processInstanceKey === processInstanceKey),
      { waitUpTo: '30 seconds', interval: '750 millis' }
    );
    return { processInstanceKey, search };
  }).pipe(
    // Tagged errors → discriminate with catchTag / catchTags instead of a manual switch.
    Effect.catchTag('EventualConsistencyTimeout', (e: EventualConsistencyTimeout) =>
      Effect.logError(`Timed out: ${e.message}`).pipe(Effect.andThen(Effect.fail(e)))
    )
  );

  const result = await Effect.runPromise(program);
  //#endregion ReadmeEffectClient
  console.log(result.processInstanceKey);
}

// ---------------------------------------------------------------------------
// Paginated search as a Stream
// ---------------------------------------------------------------------------

async function _readmeEffectPaginate() {
  //#region ReadmeEffectPaginate
  const camunda = createCamundaEffectClient();

  // Walk every ACTIVE process instance, 100 per request, without ever holding more
  // than one page in memory. `Stream.take` stops pulling — and so stops fetching.
  const activeKeys = await Effect.runPromise(
    camunda.searchProcessInstances
      .paginate({ filter: { state: 'ACTIVE' }, page: { limit: 100 } })
      .items()
      .pipe(
        Stream.map((instance) => instance.processInstanceKey),
        Stream.take(500),
        Stream.runCollect
      )
  );
  //#endregion ReadmeEffectPaginate
  console.log(activeKeys.length);
}

// ---------------------------------------------------------------------------
// Effect job worker
// ---------------------------------------------------------------------------

/** Stand-in for a real downstream health probe. */
const isServiceDown = (): Effect.Effect<boolean> => Effect.succeed(false);

function _readmeEffectWorker() {
  //#region ReadmeEffectWorker
  const program = Effect.gen(function* () {
    // Forked into the current Scope: interrupted (with a best-effort lease release) when
    // the scope closes. Let both type parameters infer — supplying only the completion-
    // variable type (`createCamundaEffectWorker<{ ok: boolean }>(…)`) makes TypeScript
    // fall back to the *default* for the handler's requirements (`R = never`) rather
    // than inferring it, so a handler with dependencies would stop compiling. See
    // "Injecting Services into a Handler".
    yield* createCamundaEffectWorker({
      type: 'payment-processing',
      maxJobsToActivate: 10, // activation batch size
      concurrency: 10, // max jobs handled in parallel (backpressure)
      pollInterval: '1 second', // between empty polls, on the Effect Clock
      // Optional: retry the handler in-process on a RetryableJobError before failing the job.
      handlerRetrySchedule: Schedule.spaced('2 seconds'),
      handler: (job) =>
        Effect.gen(function* () {
          if (!job.variables.amount) {
            // Terminal → raise a BPMN error / incident.
            return yield* Effect.fail(
              new TerminalJobError({ code: 'INVALID_INPUT', message: 'amount is required' })
            );
          }
          if (yield* isServiceDown()) {
            // Retryable → failJob(retries - 1) with a re-activation backoff.
            return yield* Effect.fail(
              new RetryableJobError({
                message: 'downstream unavailable',
                retryBackoff: '5 seconds',
              })
            );
          }
          return { ok: true }; // success → completeJob(variables)
        }),
    });

    // ... the worker runs for the lifetime of this scope.
    yield* Effect.never;
  }).pipe(
    Effect.scoped,
    Effect.provide(layer()) // provides the `/effect` client the worker depends on
  );

  void program;
  //#endregion ReadmeEffectWorker
}

// ---------------------------------------------------------------------------
// Injecting services into a worker handler
// ---------------------------------------------------------------------------

//#region ReadmeEffectWorkerServices
// A service the handler depends on. Nothing about it is Camunda-specific — it is an
// ordinary Effect service.
class PaymentGateway extends Context.Service<
  PaymentGateway,
  { readonly charge: (amount: number) => Effect.Effect<string> }
>()('PaymentGateway') {}

// The handler's requirements flow out through the worker's own requirements, so the
// worker layer asks for `PaymentGateway` just like it asks for the Camunda client.
const paymentWorker = workerLayer({
  type: 'payment-processing',
  handler: (job) =>
    Effect.gen(function* () {
      const gateway = yield* PaymentGateway;
      return { receipt: yield* gateway.charge(Number(job.variables.amount)) };
    }),
});
// paymentWorker: Layer<never, never, CamundaEffect | PaymentGateway>

// Production: the real gateway and a real client.
const liveWorker = paymentWorker.pipe(
  Layer.provide(
    Layer.succeed(PaymentGateway, {
      charge: (amount) => Effect.succeed(`live-receipt-${amount}`),
    })
  ),
  Layer.provide(layer())
);

// Tests: the same worker with *both* dependencies swapped. `CamundaEffect` is a service
// too, so the broker is mocked exactly like the gateway — the worker runs end-to-end
// with neither a payment provider nor a broker.
const fakeClient = {
  activateJobs: () => Effect.succeed({ jobs: [] }),
  completeJob: () => Effect.void,
  failJob: () => Effect.void,
  throwJobError: () => Effect.void,
} as unknown as CamundaEffectClient;

const mockedWorker = paymentWorker.pipe(
  Layer.provide(Layer.succeed(PaymentGateway, { charge: () => Effect.succeed('mock-receipt') })),
  Layer.provide(Layer.succeed(CamundaEffect, fakeClient))
);
//#endregion ReadmeEffectWorkerServices

// Type-level guard, compiled by hooks/post/950-typecheck-examples.ts: a handler's
// requirement must surface in the worker layer's requirements. If `R` ever stopped
// threading from handler to worker, DI would silently break for users and this
// annotation would stop compiling. Complements the runtime coverage in
// tests/effect-worker-di.test.ts.
const _threadsHandlerRequirements: Layer.Layer<never, never, CamundaEffect | PaymentGateway> =
  paymentWorker;

void _readmeEffectClient;
void _readmeEffectPaginate;
void _readmeEffectWorker;
void liveWorker;
void mockedWorker;
void _threadsHandlerRequirements;
