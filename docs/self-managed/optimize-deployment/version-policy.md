---
id: version-policy
title: "Version policy"
description: "Learn about the Versioning policy for Camunda Optimize."
---

## Version Policy

Camunda Optimize versions are denoted as X.Y.Z as well as by an optional [pre-release](https://semver.org/spec/v2.0.0.html#spec-item-9) version being either '-alpha-[0-9]' or '-preview-[0-9]'. X is the [major version](https://semver.org/spec/v2.0.0.html#spec-item-4), Y is the [minor version](https://semver.org/spec/v2.0.0.html#spec-item-7), Z is the [patch version](https://semver.org/spec/v2.0.0.html#spec-item-6) as defined by the [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) specification.

## Release Cadence

Camunda Optimize will get new releases every month being at least an alpha release and/or a patch release. At the end of a quarter either a new minor or a preview release will be published. The following table illustrates when to expect which type of release.

| Quarter | Type of Release |
| ------- | --------------- |
| Q1      | Minor           |
| Q2      | Preview         |
| Q3      | Minor           |
| Q4      | Preview         |

## Pre-Release Versions

There are two types of [pre-release](https://semver.org/spec/v2.0.0.html#spec-item-9) versions of Camunda Optimize getting published.

### Alpha Releases

These releases are intended for non-production usages in trying out recent, potentially yet unfinished new features.
They serve the purpose of early customer feedback and don't offer any update paths going forward. This means from running an alpha version there is no update possible to either the following alpha or any other following releases of Camunda Optimize.

## Preview Releases

Preview releases are intended for production use and allow to get access to a sub-set of features already completed to be released with the upcoming next minor release. In contrast to alpha releases, preview releases also provide full update support, this means once updated to a preview release, an update to the next minor release is supported.
