---
id: version-policy
title: "Version policy"
description: "Learn about the Versioning policy for Camunda Optimize."
---

## Version Policy

Camunda Optimize versions are denoted as X.Y.Z as well as by an optional [pre-release](https://semver.org/spec/v2.0.0.html#spec-item-9) version being either '-alpha-[0-9]' or '-preview-[0-9]'. X is the [major version](https://semver.org/spec/v2.0.0.html#spec-item-4), Y is the [minor version](https://semver.org/spec/v2.0.0.html#spec-item-7), Z is the [patch version](https://semver.org/spec/v2.0.0.html#spec-item-6) as defined by the [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) specification.

## Release Cadence

Camunda Optimize has a new release every month. Every six months, a new minor/major is published, while all other months an alpha and/or patch release are released. The release dates are aligned with the rest of the [Camunda 8 Platform](/reference/release-policy.md).

## Pre-Release Versions

There are two types of [pre-release](https://semver.org/spec/v2.0.0.html#spec-item-9) versions of Camunda Optimize that are published.

### Alpha Releases

There is an Optimize alpha release every month, excluding those in which a minor version is released. Alpha releases are intended for non-production usages in trying out recent, potentially yet unfinished new features.
They serve the purpose of early customer feedback and don't offer any update paths going forward. This means from running an alpha version there is no update possible to either the following alpha or any other following releases of Camunda Optimize.
