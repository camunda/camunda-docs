:::note

- Different setup/authentication fields are shown depending on the provider you select.
- Use [connector secrets](/components/console/manage-clusters/manage-secrets.md) to store credentials and avoid exposing sensitive information directly from the process.

:::

#### Timeout handling

The default timeout for model API calls is set to three minutes by the runtime. Self-managed Spring connector runtime instances allow you to override this value by setting the `camunda.connector.agenticai.aiagent.chat-model.api.default-timeout` property in the Spring application properties file.

You can also specify a custom timeout per provider in the **Timeout** field below. This value takes precedence over the default timeout.

All values must be provided in the [ISO-8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations), for example, `PT60S` for a 60-second timeout.

For more details, see the individual provider sections below, especially for any provider-specific limitations.

:::important
The timeout setting must not exceed the job worker timeout; otherwise, the job may be reassigned by the engine while the model call is still in progress.
:::
