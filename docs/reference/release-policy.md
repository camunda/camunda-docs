---
id: release-policy
title: "Release policy"
---

Components of Camunda Cloud follow the [Semantic Versioning standard](https://semver.org/), which defines a version number using the `MAJOR.MINOR.PATCH` pattern.

- `MAJOR` version can make incompatible API changes.
- `MINOR` version can add functionality in a backwards compatible manner.
- `PATCH` version can make backwards compatible bug fixes.

The Camunda Cloud team strives to release:
- A new minor version of the Camunda Cloud components every three months
- In between minor versions, two alpha releases (to preview the upcoming minor version)

Camunda Cloud supports the last two released minor versions with
patch releases. Patch releases are offered on a best effort basis for the
currently supported versions.


## Provisioning in SaaS
In our managed service, we differentiate between components that are part of a Camunda Platform Cluster and components that are outside of the cluster. 

A cluster usually consists of:
* Zeebe
* Operate
* Tasklist
* Optimize

For components outside of the cluster, we release new versions continuously and update customers to the latest version automatically whenever it is ready to be shipped.
These components include:
* Modeler (Web)
* Connectors
* Console

For components inside a cluster, Camunda provides two channels for provisioning and follows above release policy:
* Stable: Provides the latest feature and patch releases ready for most users at minimal risk. The releases follow semantic versioning and can be updated to the next minor or patch release without data loss.
* Alpha: Provides preview releases in preparation for the next stable release. They provide a short-term stability point to test new features and give feedback before they are released to the stable channel. Try these to ensure the upcoming release works with your infrastructure. These releases cannot be updated to a newer release, and therefore are not meant to be used in production.

On the stable channel, the last three supported minor versions are made available for provisioning.

### New Versions

Whenever a new Camunda Platform version is released, we do our best to provide the new version on our managed service at the same time. We add a notice to Console, recommending an update to the latest version. 

#### Updates or restart for critical issues
In our managed service we reserve the right to force update or restart a cluster immediately and without notice in advance if there is a critical security or stability issue. 


## Self-Managed

Whenever a new Camunda Platform version is released, Camunda Platform Self-Managed enterprise customers will be notified via email. 

If you are not an enterprise customer, you can stay up to date via release blogs, the announcements page, or releases on GitHub and Docker Hub.

### New Versions
If you are running Camunda Platform Self-Managed, you may follow our update guide.
