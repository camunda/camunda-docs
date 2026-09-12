### Model

Select the model you want to use for the selected provider, and specify any additional model parameters.

| Field                     | Required | Description                                                                                                                                           |
| :------------------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Model                     | Yes      | <p>Specify the model ID for the model you want to use.</p><p>Example: `anthropic.claude-3-5-sonnet-20240620-v1:0`</p>                                 |
| Maximum tokens            | No       | The maximum number of tokens per request to allow in the generated response.                                                                          |
| Maximum completion tokens | No       | The maximum number of tokens per request to generate before stopping.                                                                                 |
| Temperature               | No       | Floating point number, typically between 0 and 1 (0 and 2 for OpenAI). The higher the number, the more randomness will be injected into the response. |
| top P                     | No       | Floating point number, typically between 0 and 1. Recommended for advanced use cases only (usually you only need to use temperature).                 |
| top K                     | No       | Integer greater than 0. Recommended for advanced use cases only (you usually only need to use temperature).                                           |

:::note

- Different model parameter fields are shown depending on the provider/model you select. Additionally, some parameters may be different or have different value ranges (for example, OpenAI Temperature uses a number range between 0 to 2, whereas other models use a range between 0 to 1).
- For more information on each model parameter, refer to the provider documentation links in the element template.
- Parameters that set maximum values (such as maximum tokens) are considered **per LLM request**, not for the whole conversation. Depending on the provider, the exact meaning of these parameters may vary.

:::
