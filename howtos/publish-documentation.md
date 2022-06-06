# Publish Documentation

## General

Putting the documentation online happens automatically. The source is always `main`.

## Staging

Every push to the `main` branch will update the stage environment at https://stage.docs.camunda.io

Technically [this Github Workflow](/.github/workflows/publish-stage.yaml) will be triggered by the Release to build and deploy the docs.

You can observe the progress of the Build under [https://github.com/camunda-cloud/camunda-cloud-documentation/actions](https://github.com/camunda-cloud/camunda-cloud-documentation/actions).

## Release to Production

### Steps

1. Make sure that all changes are in the `main` branch
2. Switch to the Releases view: [https://github.com/camunda-cloud/camunda-cloud-documentation/releases](https://github.com/camunda-cloud/camunda-cloud-documentation/releases)
3. Create a new release using the button _Draft a new release_.
4. Fill out the form: Tag version (semver: 'x.y.z'), Release title, Description
5. Click on _Publish release_

Technically [this Github Workflow](/.github/workflows/publish-prod.yaml) will be triggered by the Release to build and deploy the docs.

You can observe the progress of the Build under [https://github.com/camunda-cloud/camunda-cloud-documentation/actions](https://github.com/camunda-cloud/camunda-cloud-documentation/actions).
