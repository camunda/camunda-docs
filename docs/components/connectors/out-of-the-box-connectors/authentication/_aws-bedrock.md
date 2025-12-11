To authenticate, choose one of the methods from the **Authentication** dropdown. The supported options are:

- Use **Credentials** if you have a valid pair of access and secret keys provided by your AWS account administrator. The access key provides permissions to the Amazon SageMaker `InvokeModel` and/or `Converse` actions.

:::note
This option is applicable for both SaaS and Self-Managed users.
:::

- Use **API Key** if you have a valid long-term API Key for Amazon Bedrock. See [Amazon Bedrock API Keys](https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys.html) for more details.

:::note
This option is applicable for both SaaS and Self-Managed users.
:::

- Choose **Default Credentials Chain** if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

:::note
This option is applicable only for Self-Managed or hybrid distributions.
:::

For more information on authentication and security in Amazon Bedrock, see [Amazon Bedrock security and privacy](https://aws.amazon.com/bedrock/security-compliance/).
