---
id: early-access
title: Early access
sidebar_label: Early access
description: "Use early access releases to quickly learn about upcoming features and components."
---

<!-- TODO: Discuss with docs team where's the right place for this doc -->

Use early access releases to quickly learn about upcoming features and components.

## Types of early access releases

Selected Camunda features and components are released upfront as alpha or preview versions, e.g., to provide users the opportunity to test a feature and participate in the development by giving feedback prior to market launch (general availability, GA).

Early access releases are made available outside of the [release policy](/reference/release-policy.md). 

### Alpha

Alpha features and components are introduced to gather early feedback from users. These releases are intended only for non-production usages in trying out recent, potentially yet unfinished new features. Characteristics are:

- Not for production use
- Unstable, potentially causing performance issues
- APIs, dependencies and configuration can potentially change
- Not neccessarily feature-complete
- May not be documented
- No update support guaranteed
- Not covered by service level agreements (SLAs), and no support obligations

While there are no support obligations, customers can file issues in the respective [GitHub repositories](https://github.com/camunda), as well as submit questions and suggestions in the [Camunda Forum](https://forum.camunda.io/).

Note: A feature or component released as a **Developer Preview** is considered an alpha release and shares the same characteristics as listed above. Not to be confused with below **Preview** features.

### Preview

<!-- TODO we need to resolve this naming conflict. This is too confusing -->

Preview features and components are introduced to get access to a subset of features already completed to be released with the upcoming next minor release. In contrast to alpha releases, preview releases also provide full update support, this means once updated to a preview release, an update to the next minor release is supported. Characteristics are:

- Allowed for production use
- Potentially unstable
- APIs, dependencies and configuration are not likely to change
- Potentially feature-complete
- Documented
- Full update support provided
- Covered by service level agreements (SLAs) and support obligations (depending on the customer's license)

<!-- TODO need to clarify support -->

### General Availability (GA)

All features and components launched on the market that are not considered early access are considered generally available. Characteristics are:

- Allowed for production use
- Fully documented and supported

:::note

There are also early access releases with **limited availability**, such as features that are only available to enterprise customers.

:::

<!-- They provide a short-term stability point to test new features and give feedback before they are released to the stable channel. Try these to ensure the upcoming release works with your infrastructure. These releases cannot be updated to a newer release, and therefore are not meant to be used in production. -->

<!-- Alpha Releases
These releases are intended for non-production usages in trying out recent, potentially yet unfinished new features. They serve the purpose of early customer feedback and don't offer any update paths going forward. This means from running an alpha version there is no update possible to either the following alpha or any other following releases of Camunda Optimize.

Preview Releases
Preview releases are intended for production use and allow to get access to a sub-set of features already completed to be released with the upcoming next minor release. In contrast to alpha releases, preview releases also provide full update support, this means once updated to a preview release, an update to the next minor release is supported. -->