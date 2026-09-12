/*
 * Dependency injection into an Effect worker handler.
 *
 * The Effect worker's DI story is the `R` channel: a handler is
 * `(job) => Effect<A, JobError, R>`, and `R` is threaded out through
 * `createCamundaEffectWorker` / `workerLayer` so a handler's own services become the
 * worker's requirements. That is what lets a user provide real services in production
 * and swap them for mocks in a test — the use case these tests pin.
 *
 * The other half is that `CamundaEffect` is itself a service, so the broker can be
 * mocked the same way. These tests provide *both* a fake client and a fake user
 * service, so a worker runs end-to-end with neither a broker nor the real dependency.
 *
 * Type-level coverage lives in `examples/effect.ts` (compiled by
 * hooks/post/950-typecheck-examples.ts), which annotates the worker layer's
 * requirements explicitly — unit tests are not type-checked by `npm run typecheck`,
 * so a regression in the `R` threading would not surface here alone.
 */
import { Context, Data, Effect, Fiber, Layer } from "effect";
import { TestClock } from "effect/testing";
import { describe, expect, it } from "vitest";
import { CamundaEffect, type CamundaEffectClient } from "../src/effect";
import {
  type Job,
  RetryableJobError,
  runWorkerLoop,
  workerLayer,
} from "../src/effect-worker";

/** The service's own failure — distinct from the worker's `JobError` channel. */
class GatewayDown extends Data.TaggedError("GatewayDown")<{
  readonly detail: string;
}> {}

// A user-defined service the handler depends on. Nothing Camunda-specific about it.
class PaymentGateway extends Context.Service<
  PaymentGateway,
  { readonly charge: (amount: number) => Effect.Effect<string, GatewayDown> }
>()("PaymentGateway") {}

const sampleJob = (over: Partial<Job> = {}): Job =>
  ({
    jobKey: "1",
    type: "pay",
    retries: 3,
    leaseToken: null,
    variables: { amount: 42 },
    customHeaders: {},
    processInstanceKey: "10",
    ...over,
  }) as unknown as Job;

/**
 * Charge through the injected gateway, mapping the *service's* failure onto the
 * worker's typed channel. A handler must produce `JobError` — letting `GatewayDown`
 * escape is a type error, which is the contract that keeps acknowledgement total.
 */
const chargeOrFailJob = (amount: number) =>
  Effect.gen(function* () {
    const gateway = yield* PaymentGateway;
    return yield* gateway.charge(amount).pipe(
      Effect.catchTag("GatewayDown", (e) =>
        Effect.fail(
          new RetryableJobError({ message: `gateway down: ${e.detail}` })
        )
      ),
      Effect.map((receipt) => ({ receipt }))
    );
  });

interface Acks {
  completed: Array<{ variables?: unknown }>;
  failed: Array<{ retries?: number; errorMessage?: string }>;
}

/** A fake client that serves one job on the first poll, then stays empty. */
function fakeCamunda(acks: Acks): Layer.Layer<CamundaEffect> {
  let served = false;
  const client = {
    activateJobs: () =>
      Effect.sync(() => {
        if (served) return { jobs: [] };
        served = true;
        return { jobs: [sampleJob()] };
      }),
    completeJob: (input: { variables?: unknown }) =>
      Effect.sync(() => {
        acks.completed.push(input);
      }),
    failJob: (input: { retries?: number; errorMessage?: string }) =>
      Effect.sync(() => {
        acks.failed.push(input);
      }),
    throwJobError: () => Effect.void,
  } as unknown as CamundaEffectClient;
  return Layer.succeed(CamundaEffect, client);
}

/** Drive the worker just far enough to process the single served job, then stop. */
function runOnce<R>(
  loop: Effect.Effect<void, unknown, CamundaEffect | R>,
  deps: Layer.Layer<CamundaEffect | R>
) {
  return Effect.gen(function* () {
    const fiber = yield* Effect.forkChild(loop);
    yield* TestClock.adjust("1 second");
    yield* Fiber.interrupt(fiber);
  }).pipe(Effect.provide(deps), Effect.provide(TestClock.layer()));
}

describe("injecting services into an Effect worker handler", () => {
  it("runs the handler against an injected mock and completes with its output", async () => {
    const acks: Acks = { completed: [], failed: [] };
    const charged: number[] = [];

    const mockGateway = Layer.succeed(PaymentGateway, {
      charge: (amount: number) =>
        Effect.sync(() => {
          charged.push(amount);
          return `receipt-${amount}`;
        }),
    });

    const loop = runWorkerLoop({
      type: "pay",
      concurrency: 1,
      handler: (job) => chargeOrFailJob(Number(job.variables.amount)),
    });

    await Effect.runPromise(
      runOnce(loop, Layer.mergeAll(fakeCamunda(acks), mockGateway))
    );

    // The mock was reached with the job's variables...
    expect(charged).toEqual([42]);
    // ...and its output became the job's completion variables.
    expect(acks.completed).toHaveLength(1);
    expect(acks.completed[0]?.variables).toEqual({ receipt: "receipt-42" });
  });

  it("lets a mock drive the typed failure path", async () => {
    const acks: Acks = { completed: [], failed: [] };

    // A mock standing in for an outage: the handler maps the service's own tagged
    // failure onto the worker's retryable channel.
    const downGateway = Layer.succeed(PaymentGateway, {
      charge: () =>
        Effect.fail(new GatewayDown({ detail: "connect ECONNREFUSED" })),
    });

    const loop = runWorkerLoop({
      type: "pay",
      concurrency: 1,
      handler: () => chargeOrFailJob(1),
    });

    await Effect.runPromise(
      runOnce(loop, Layer.mergeAll(fakeCamunda(acks), downGateway))
    );

    expect(acks.completed).toHaveLength(0);
    expect(acks.failed).toHaveLength(1);
    expect(acks.failed[0]?.retries).toBe(2); // 3 - 1
    expect(acks.failed[0]?.errorMessage).toBe(
      "gateway down: connect ECONNREFUSED"
    );
  });

  it("swaps the same worker between two service implementations", async () => {
    // The point of DI: one worker definition, different wiring per environment.
    const worker = workerLayer({
      type: "pay",
      concurrency: 1,
      handler: (job) => chargeOrFailJob(Number(job.variables.amount)),
    });

    const run = async (label: string) => {
      const acks: Acks = { completed: [], failed: [] };
      const gateway = Layer.succeed(PaymentGateway, {
        charge: (amount: number) => Effect.succeed(`${label}-${amount}`),
      });

      await Effect.runPromise(
        Effect.gen(function* () {
          yield* TestClock.adjust("1 second");
        }).pipe(
          Effect.provide(
            worker.pipe(
              Layer.provide(gateway),
              Layer.provide(fakeCamunda(acks))
            )
          ),
          Effect.provide(TestClock.layer())
        )
      );

      return acks;
    };

    expect((await run("sandbox")).completed[0]?.variables).toEqual({
      receipt: "sandbox-42",
    });
    expect((await run("live")).completed[0]?.variables).toEqual({
      receipt: "live-42",
    });
  });
});
