# Publish Documentation

## General

Putting the documentation online happens automatically. The source is always `Master`.

## Steps

1. Make sure that all changes are in the `Master`
2. Switch to the Releases view: [https://github.com/camunda-cloud/camunda-cloud-documentation/releases](https://github.com/camunda-cloud/camunda-cloud-documentation/releases)
3. Create a new release using the button _Draft a new release_.
4. Fill out the form: Tag version (semver: 'x.y.z'), Release title, Description
5. Click on _Publish release_

Technically [this Github Workflow](./.github/workflows/publish.yaml) will be triggered by the Release to build and deploy the docs.

You can observe the progress of the Build under [https://github.com/camunda-cloud/camunda-cloud-documentation/actions](https://github.com/camunda-cloud/camunda-cloud-documentation/actions).
