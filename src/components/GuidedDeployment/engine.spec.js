// @ts-check

const model = require("./model");
const engine = require("./engine");

/** @param {import("./engine").Choices} choices @param {string} question */
const optionStates = (choices, question) =>
  Object.fromEntries(
    engine
      .resolve(choices)
      .questions[question].options.map((o) => [o.option.id, o])
  );

describe("model", () => {
  const order = model.questionOrder;
  /** @param {import("./model").Condition | undefined} condition */
  const keys = (condition) => Object.keys(condition ?? {});

  it("only lets questions depend on earlier questions", () => {
    for (const question of model.questions) {
      const position = order.indexOf(question.id);
      const referenced = [
        ...keys(question.appliesWhen),
        ...question.options.flatMap((o) =>
          (o.requires ?? []).flatMap((r) => [...keys(r.needs), ...keys(r.when)])
        ),
      ];
      for (const id of referenced) {
        expect(order.indexOf(id)).toBeGreaterThanOrEqual(0);
        expect(order.indexOf(id)).toBeLessThan(position);
      }
      for (const option of question.options) {
        for (const id of keys(option.excludes)) {
          expect(order.indexOf(id)).toBeGreaterThan(position);
        }
      }
    }
  });

  it("references existing questions, options, steps, and pages", () => {
    /** @param {import("./model").Condition | undefined} condition */
    const check = (condition) => {
      for (const [question, options] of Object.entries(condition ?? {})) {
        for (const option of options) {
          expect(engine.findOption(question, option)).toBeDefined();
        }
      }
    };
    for (const question of model.questions) {
      expect(model.stepsById[question.step].questions).toContain(question.id);
      expect(model.pagesById[question.page]).toBeDefined();
      check(question.appliesWhen);
      for (const option of question.options) {
        check(option.excludes);
        for (const r of option.requires ?? []) {
          check(r.needs);
          check(r.when);
        }
      }
    }
    for (const step of model.steps) {
      expect(model.pagesById[step.page].step).toBe(step.id);
    }
    for (const page of model.pages) check(page.shownWhen);
  });

  it("has one entry per question for every step and unique option ids", () => {
    expect(new Set(order).size).toBe(order.length);
    expect([...order].sort()).toEqual(model.questions.map((q) => q.id).sort());
    for (const question of model.questions) {
      const ids = question.options.map((o) => o.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe("option filtering", () => {
  it("enables every available option when nothing is chosen", () => {
    const compute = optionStates({}, "compute");
    expect(compute.eks.enabled).toBe(true);
    expect(compute.ecs.enabled).toBe(true);
    expect(compute.ec2.enabled).toBe(true);
    const storage = optionStates({}, "storage");
    expect(storage.aurora.enabled).toBe(true);
    expect(storage.opensearch.enabled).toBe(true);
  });

  it("keeps unavailable cloud providers visible but disabled", () => {
    const cloud = optionStates({}, "cloud");
    expect(Object.keys(cloud)).toEqual(["aws", "openshift", "azure", "gcp"]);
    expect(cloud.aws.enabled).toBe(true);
    expect(cloud.azure.enabled).toBe(false);
    expect(cloud.azure.reasons).toEqual(["Not part of the guided deployment"]);
  });

  it("disables Amazon EC2 for more than one region, with the reason", () => {
    const compute = optionStates({ regions: "2" }, "compute");
    expect(compute.ec2.enabled).toBe(false);
    expect(compute.ec2.reasons).toEqual(["Requires a single region"]);
    expect(compute.eks.enabled).toBe(true);
  });

  it("disables the document store after Amazon ECS, and Aurora after Amazon EC2", () => {
    expect(
      optionStates({ compute: "ecs" }, "storage").opensearch
    ).toMatchObject({
      enabled: false,
      reasons: ["Not available with Amazon ECS with Fargate"],
    });
    expect(optionStates({ compute: "ec2" }, "storage").aurora).toMatchObject({
      enabled: false,
      reasons: ["Not available with Amazon EC2"],
    });
  });

  it("requires relational storage for three regions", () => {
    const storage = optionStates({ regions: "3", compute: "eks" }, "storage");
    expect(storage.opensearch.enabled).toBe(false);
    expect(storage.aurora.enabled).toBe(true);
  });

  it("asks a question only when earlier choices raise it", () => {
    const one = engine.resolve({ regions: "1" });
    expect(one.questions.link.applicable).toBe(false);
    expect(one.questions.link.source).toBe("not-applicable");
    const two = engine.resolve({ regions: "2" });
    expect(two.questions.link.applicable).toBe(true);
    expect(two.values.link).toBe("peering");
    expect(
      engine.resolve({ compute: "eks" }).questions.raftNlb.applicable
    ).toBe(false);
    expect(engine.resolve({ compute: "ecs" }).values.raftNlb).toBe("yes");
  });

  it("falls back to the only option left", () => {
    const three = engine.resolve({ regions: "3" });
    expect(three.values.link).toBe("tgw");
    expect(three.questions.link.source).toBe("only");
    expect(engine.resolve({ regions: "2" }).values.zones).toBe("3-3");
  });

  it("applies the management plane rules", () => {
    // Sign-in is decided after the management plane, so it never blocks it.
    const basic = optionStates(
      { compute: "ecs", auth: "basic" },
      "managementPlane"
    );
    expect(basic.deploy.enabled).toBe(true);
    const ecsDual = optionStates(
      { regions: "2", compute: "ecs" },
      "managementPlane"
    );
    expect(ecsDual.deploy.reasons).toEqual([
      "With Amazon ECS, requires a single region",
    ]);
    const eksDual = optionStates(
      { regions: "2", compute: "eks" },
      "managementPlane"
    );
    expect(eksDual.deploy.enabled).toBe(true);
    const ec2 = optionStates({ compute: "ec2" }, "managementPlane");
    expect(ec2.deploy.reasons).toEqual([
      "Camunda Hub isn't supported on Amazon EC2",
    ]);
  });
});

describe("identity after the management plane", () => {
  it("greys out basic authentication with the management plane, and applies OIDC", () => {
    const auth = optionStates({ managementPlane: "deploy" }, "auth");
    expect(auth.basic).toMatchObject({
      enabled: false,
      reasons: ["Camunda Hub and Management Identity need an OIDC provider"],
    });
    const resolution = engine.resolve({ managementPlane: "deploy" });
    expect(resolution.values.auth).toBe("oidc");
    expect(resolution.questions.auth.source).toBe("only");
  });

  it("switches a basic choice to OIDC when the reader deploys the management plane, and says so", () => {
    const { choices, cleared } = engine.choose(
      { compute: "ecs", auth: "basic" },
      "managementPlane",
      "deploy"
    );
    expect(choices).toEqual({ compute: "ecs", managementPlane: "deploy" });
    expect(cleared).toEqual([
      {
        question: "auth",
        option: "basic",
        reason: "Camunda Hub and Management Identity need an OIDC provider",
        now: "oidc",
      },
    ]);
    expect(engine.describeCleared(cleared[0])).toBe(
      'Identity: "Basic: built-in users" was cleared. Camunda Hub and Management Identity need an OIDC provider. It\'s now "OIDC: an identity provider".'
    );
  });
});

describe("invalidation of later choices", () => {
  it("clears the choices that an earlier change rules out, and says why", () => {
    const start = {
      regions: "1",
      compute: "ec2",
      storage: "opensearch",
      auth: "oidc",
    };
    expect(engine.resolve(start).dropped).toEqual([]);

    const { choices, cleared } = engine.choose(start, "regions", "2");
    expect(choices).toEqual({
      regions: "2",
      auth: "oidc",
      storage: "opensearch",
    });
    expect(cleared).toEqual([
      {
        question: "compute",
        option: "ec2",
        reason: "Requires a single region",
      },
    ]);
    expect(engine.describeCleared(cleared[0])).toBe(
      'Compute: "Amazon EC2" was cleared. Requires a single region.'
    );
  });

  it("cascades: a cleared answer can clear the answers after it", () => {
    const start = {
      compute: "ecs",
      storage: "aurora",
      dbClass: "t3",
      raftNlb: "no",
      auth: "oidc",
      managementPlane: "deploy",
      idp: "own",
    };
    const { choices, cleared } = engine.choose(start, "regions", "2");
    expect(choices).toEqual({
      regions: "2",
      compute: "ecs",
      storage: "aurora",
      auth: "oidc",
    });
    expect(cleared.map((c) => c.question)).toEqual([
      "dbClass",
      "raftNlb",
      "managementPlane",
      "idp",
    ]);
    expect(cleared[3].reason).toBe("Only with the management plane");
  });

  it("clears an answer to a question that no longer applies", () => {
    const { choices, cleared } = engine.choose(
      { compute: "ecs", raftNlb: "no" },
      "compute",
      "eks"
    );
    expect(choices).toEqual({ compute: "eks" });
    expect(cleared).toEqual([
      { question: "raftNlb", option: "no", reason: "Only with Amazon ECS" },
    ]);
  });

  it("clears one answer without touching the others", () => {
    const { choices, cleared } = engine.choose(
      { regions: "1", compute: "ecs" },
      "regions",
      undefined
    );
    expect(choices).toEqual({ compute: "ecs" });
    expect(cleared).toEqual([]);
  });
});

describe("URL encoding", () => {
  it("encodes choices in the order of the guide", () => {
    expect(
      engine.encodeChoices({ compute: "ecs", regions: "2", cloud: "aws" })
    ).toBe("cloud=aws&regions=2&compute=ecs");
  });

  it("round-trips valid choices", () => {
    const choices = {
      regions: "2",
      vpc: "existing",
      link: "tgw",
      compute: "eks",
      storage: "aurora",
      dbClass: "serverless",
      tls: "https",
      auth: "oidc",
      zones: "3-3",
      managementPlane: "deploy",
      idp: "own",
    };
    expect(engine.decodeChoices(engine.encodeChoices(choices))).toEqual(
      choices
    );
  });

  it("ignores unknown keys and values, and drops forbidden combinations", () => {
    expect(
      engine.decodeChoices("?regions=2&compute=ec2&storage=nope&utm_source=x")
    ).toEqual({ regions: "2" });
  });

  it("returns undefined when the query string has no choices", () => {
    expect(engine.decodeChoices("?utm_source=x")).toBeUndefined();
    expect(engine.decodeChoices("")).toBeUndefined();
  });

  it("keeps other parameters when writing the choices", () => {
    expect(
      engine.searchWithChoices("?utm_source=x&compute=eks", { compute: "ecs" })
    ).toBe("?utm_source=x&compute=ecs");
    expect(engine.searchWithChoices("?compute=eks", {})).toBe("");
  });
});

describe("flow and progress", () => {
  it("skips the management plane pages when there is no management plane", () => {
    expect(engine.nextPage("management-plane", {})?.id).toBe(
      "identity-provider"
    );
    expect(
      engine.nextPage("management-plane", { managementPlane: "none" })?.id
    ).toBe("identity");
    expect(
      engine.nextPage("camunda-hub", { managementPlane: "deploy" })?.id
    ).toBe("identity");
    expect(engine.nextPage("identity", {})?.id).toBe("your-architecture");
    expect(
      engine.nextPage("management-plane", {
        managementPlane: "deploy",
        idp: "own",
      })?.id
    ).toBe("management-identity");
    expect(
      engine.previousPage("identity", { managementPlane: "none" })?.id
    ).toBe("management-plane");
  });

  it("marks steps done once every question that applies is answered", () => {
    const steps = engine.progress(
      engine.resolve({ cloud: "aws", regions: "1", vpc: "create" })
    );
    const status = Object.fromEntries(steps.map((s) => [s.step.id, s.status]));
    expect(status["cloud-provider"]).toBe("done");
    expect(status.network).toBe("done");
    expect(status.compute).toBe("open");
    expect(status["object-storage"]).toBe("info");
  });

  it("shows content for unanswered questions and hides it for other answers", () => {
    expect(engine.contentApplies({ compute: ["ecs"] }, {})).toBe(true);
    expect(
      engine.contentApplies({ compute: ["ecs"] }, { compute: "ecs" })
    ).toBe(true);
    expect(
      engine.contentApplies({ compute: ["ecs"] }, { compute: "eks" })
    ).toBe(false);
  });

  it("lists the buckets that follow from the choices", () => {
    const notes = (choices) =>
      engine
        .billOfMaterials(engine.resolve(choices))
        .find((s) => s.step.id === "object-storage")?.notes;
    expect(notes({ compute: "eks" })).toEqual([
      "One backup bucket for the cluster, in the first region",
    ]);
    expect(notes({ compute: "ecs" })).toHaveLength(2);
  });
});
