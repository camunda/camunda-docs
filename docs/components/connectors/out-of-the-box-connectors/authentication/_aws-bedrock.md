import BedrockApiKeyAuth from './\_aws-bedrock-api-key.md'

The following authentication methods are currently supported:

- Choose **Credentials** in the **Authentication** dropdown if you have a valid pair of access and secret keys provided by your AWS account administrator. This option is applicable for both SaaS and Self-Managed users.
  { props.showApiKeyAuth && <BedrockApiKeyAuth/>}
- Choose **Default Credentials Chain (Hybrid/Self-Managed only)** in the **Authentication** dropdown if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This option is applicable only for Self-Managed or hybrid distributions. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

If you select **Credentials** to access the **Amazon Bedrock connector**, the connector requires the appropriate
credentials. The following authentication options are available:

- **Access key**: Provide an access key of a user with permissions to the Amazon SageMaker `InvokeModel` and/or `Converse` actions.
- **Secret key**: Provide the secret key of the user with the access key provided above.

The **Access key** and the **Secret key** are required properties and must be provided to use the connector.

For more information on authentication and security in Amazon Bedrock, refer to
the [Amazon Bedrock security and privacy documentation](https://aws.amazon.com/bedrock/security-compliance/).
