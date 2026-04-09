---
---

<span class="badge badge--platform">Camunda 8 Self-Managed only</span>

Installations of Camunda 8 Self-Managed which require a license can provide their license key to the components as an environment variable:

| Environment variable  | Description                                                          | Default value |
| --------------------- | -------------------------------------------------------------------- | ------------- |
| `CAMUNDA_LICENSE_KEY` | Your Camunda 8 license key, if your installation requires a license. | None          |

For Helm installations, license keys can be configured globally in your `values.yaml` file. See the [Helm installation documentation](/self-managed/setup/install.md#configure-license-key) for more details.

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and issue warnings in the logs. These warnings have no impact on startup or functionality.

**Web Modeler without a license:** Web Modeler is limited to **five concurrent users** when running without a valid enterprise license. This applies to Self-Managed installations used for testing or development purposes. To support additional users or for production use, obtain a Camunda Self-Managed Enterprise Edition license by visiting the [Camunda Enterprise page](https://camunda.com/platform/camunda-platform-enterprise-contact/).
:::
