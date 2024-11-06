---
id: decision-evaluate
title: "Evaluate a decision"
description: "Let's dive deeper into Zeebe and Java to evaluate a decision."
---

## Prerequisites

1. Run the Zeebe Broker with endpoint `localhost:26500` (default).
1. Run the [deploy a process example](process-deploy.md). Deploy [`demoDecision.dmn`](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/zeebe-client-plain-java/src/main/resources/demoDecision.dmn) instead of `demoProcess.bpmn`.

## EvaluateDecisionCreator.java

[Source on GitHub](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/zeebe-client-plain-java/src/main/java/io/camunda/zeebe/example/decision/EvaluateDecisionCreator.java)

```java
final EvaluateDecisionResponse decisionEvaluation =
    client
        .newEvaluateDecisionCommand()
        .decisionId(decisionId)
        .variables("{\"lightsaberColor\": \"blue\"}")
        .send()
        .join();

System.out.println("Decision evaluation result: " + decisionEvaluation.getDecisionOutput());
```
