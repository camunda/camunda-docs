---
id: google-gemini
title: Google Gemini connector
sidebar_label: Google Gemini
description: Generate text and multimodal content with Google Gemini models on Vertex AI from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the Google Gemini connector to send text and media prompts to Gemini models from your BPMN process and use the generated content in your process.

## About this connector

The **Google Gemini connector** is an outbound connector that calls Gemini models from Google through Vertex AI. Gemini models are multimodal, so a prompt can combine text with media such as images, audio, and video. For example, use this connector to summarize a video, answer questions about a document, or call a function that returns structured data.

The connector supports system instructions, grounding with a Vertex AI data store, safety filter settings, generation settings such as temperature and output token limit, and function calling.

## Prerequisites

To use the **Google Gemini connector**, you need:

- A Google Cloud project with access to Vertex AI. You enter the project ID and region in the connector.
- Credentials for Google Cloud: a short-lived JWT bearer token, or an OAuth client ID, client secret, and refresh token. See [Google authentication types](#google-authentication-types).
- (Optional) A Vertex AI data store, if you want to use grounding.

:::note
Use secrets to store credentials and avoid exposing sensitive information from the process.
See [managing secrets](/components/saas/clusters/manage-secrets.md).
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

Choose an authentication type and enter the authentication details on the element.

| Property      | Type     | Required                              | Description                                                                                                                                                        | Example                            |
| :------------ | :------- | :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| Type          | Dropdown | Yes                                   | The authentication type: **Bearer token** or **Refresh token**. The default is **Refresh token**. See [Google authentication types](#google-authentication-types). |                                    |
| Bearer token  | String   | Yes, if **Type** is **Bearer token**  | A short-lived JWT bearer token with access to Vertex AI.                                                                                                           | `{{secrets.GOOGLE_BEARER_TOKEN}}`  |
| Client ID     | String   | Yes, if **Type** is **Refresh token** | The client ID of your OAuth client.                                                                                                                                |                                    |
| Client secret | String   | Yes, if **Type** is **Refresh token** | The client secret of your OAuth client.                                                                                                                            | `{{secrets.GOOGLE_CLIENT_SECRET}}` |
| Refresh token | String   | Yes, if **Type** is **Refresh token** | The refresh token of your OAuth client.                                                                                                                            | `{{secrets.GOOGLE_REFRESH_TOKEN}}` |

#### Google authentication types

The **Google Gemini connector** supports two methods for authentication and authorization:

- A short-lived JWT bearer token.
- A refresh token.

Google supports multiple ways to obtain both types of token. Refer to the [official Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2) for current instructions, or see the following examples.

##### Example 1: Obtain a JWT bearer token with a service account

:::danger
The following code snippet is for demonstration purposes only and must not be used for real production systems due to security concerns.
For production usage, follow the [official Google guidelines](https://developers.google.com/identity/protocols/oauth2/service-account).
:::

Assuming you have created a service account and downloaded a JSON file with keys, run the following Python 3 snippet to print the JWT token in the terminal:

```python
import google.auth
import google.auth.transport.requests
from google.oauth2 import service_account
# Scope required to call the Vertex AI API.
SCOPES = ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/generative-language.retriever']
# File with keys
SERVICE_ACCOUNT_FILE = 'google-service-account-creds.json'
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
auth_req = google.auth.transport.requests.Request()
credentials.refresh(auth_req)
# Print token
print(credentials.token)
```

##### Example 2: Obtain a bearer and refresh token with an OAuth client

:::danger
The following code snippet is for demonstration purposes only and must not be used for real production systems due to security concerns.
For production usage, follow the [official Google guidelines](https://developers.google.com/identity/protocols/oauth2/web-server).
:::

Assuming you have created an OAuth client, you can download key files from the Google [Console](https://console.cloud.google.com/apis/credentials). Run the following Python 3 snippet to print the refresh token in the terminal:

```python
from google_auth_oauthlib.flow import InstalledAppFlow
import pprint

SCOPES = ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/generative-language.retriever']
OAUTH_KEYS = './oauth-keys.json' # path to your file with OAuth credentials

def main():
    flow = InstalledAppFlow.from_client_secrets_file(OAUTH_KEYS, SCOPES)
    creds = flow.run_local_server(port=54948)
    pprint.pprint(vars(creds))

if __name__ == "__main__":
    main()
```

### Project and region

| Property   | Type   | Required | Description                                            | Example                   |
| :--------- | :----- | :------- | :----------------------------------------------------- | :------------------------ |
| Project ID | String | Yes      | The identifier of your Google Cloud project.           |                           |
| Region     | String | Yes      | The region where your Google Cloud project is located. | `us-central1`, `us-west1` |

## Operations

### Generate content

Send a prompt to a Gemini model and return the generated content.

#### Input parameters

Select the model and enter the prompt.

| Property            | Type     | Required                        | Description                                                                                                                                                                                           | Example |
| :------------------ | :------- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Model               | Dropdown | Yes                             | The Gemini model to use: **gemini-2.5-pro**, **gemini-2.5-flash**, **gemini-2.5-flash-image**, **gemini-2.5-flash-lite**, **gemini-2.0-flash**, **gemini-2.0-flash-lite**, or **Custom**.             |         |
| Custom model name   | String   | Yes, if **Model** is **Custom** | The name of the model to use. Supports [FEEL](/components/modeler/feel/what-is-feel.md) expressions.                                                                                                  |         |
| Prompts             | String   | Yes                             | A [FEEL](/components/modeler/feel/what-is-feel.md) expression that returns a list of prompts with text and media. See [prompts](#prompts).                                                            |         |
| System instructions | String   | No                              | Instructions that tell the model how to respond. Use them to give the model context, get more custom responses, and follow specific guidelines. They apply each time you send a request to the model. |         |

Learn more about [Google system instructions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instructions?hl=en).

##### Prompts

The **Prompts** property is a FEEL expression that returns a list. Each entry in the list is one of the following:

- A text prompt: an object with a single `text` key and the text as its value.
- A media prompt: an object with exactly two keys, `mime` for the MIME type and `uri` for the media URI.

For example:

```feel
= [{"text": "Who is this video about?"},
{"mime": "video/*", "uri": "https://youtu.be/..."}]
```

#### Grounding

Grounding connects the model output to verifiable sources of information. This is useful when accuracy and reliability are important.

| Property                  | Type    | Required | Description                                                                                                                                               | Example |
| :------------------------ | :------ | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Grounding                 | Boolean | No       | Select this to connect the model output to your data. It is cleared by default.                                                                           |         |
| Vertex AI data store path | String  | No       | The path of the Vertex AI data store. Shown when **Grounding** is selected. The value must match `projects/{}/locations/{}/collections/{}/dataStores/{}`. |         |

Learn more about [Google grounding](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview?hl=en).

#### Safety filter settings

Adjust the likelihood of receiving a model response that might contain harmful content. Content is blocked based on the probability that it's harmful.

| Property                  | Type     | Required | Description                                                                                                                  | Example |
| :------------------------ | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------- | :------ |
| Safety Filter Settings    | Boolean  | No       | Select this to configure the filters below. It is cleared by default.                                                        |         |
| Hate speech               | Dropdown | No       | The blocking level for hate speech. Shown when **Safety Filter Settings** is selected. The default is **OFF**.               |         |
| Dangerous content         | Dropdown | No       | The blocking level for dangerous content. Shown when **Safety Filter Settings** is selected. The default is **OFF**.         |         |
| Sexually explicit content | Dropdown | No       | The blocking level for sexually explicit content. Shown when **Safety Filter Settings** is selected. The default is **OFF**. |         |
| Harassment content        | Dropdown | No       | The blocking level for harassment content. Shown when **Safety Filter Settings** is selected. The default is **OFF**.        |         |

Each filter has the following levels:

| Level          | Behavior                                     |
| :------------- | :------------------------------------------- |
| **OFF**        | Blocks nothing.                              |
| **Block few**  | Blocks only high-probability content.        |
| **Block some** | Blocks medium-probability content and above. |
| **Block most** | Blocks low-probability content and above.    |

Learn more about [Google safety filters and attributes](https://cloud.google.com/vertex-ai/docs/generative-ai/learn/responsible-ai?hl=en#safety_filters_and_attributes).

#### Generation settings

| Property                          | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                          | Example                  |
| :-------------------------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- |
| Add stop sequence                 | String | No       | A [FEEL](/components/modeler/feel/what-is-feel.md) expression that returns a list of strings. A stop sequence is a series of characters, including spaces, that stops response generation when the model encounters it. The sequence isn't included in the response. You can add up to five stop sequences.                                                                                                                                          | `= ["text 1", "text 2"]` |
| Temperature                       | Number | No       | Controls the randomness in token selection. A lower temperature is good when you expect a true or correct response, and `0` means the highest probability token is usually selected. A higher temperature can lead to diverse or unexpected results. Enter a value from 0 to 2 in increments of 0.1.                                                                                                                                                 |                          |
| Output token limit from 1 to 8192 | Number | Yes      | The maximum amount of text output from one prompt. A token is approximately four characters. Enter a whole number from 1 to 8192.                                                                                                                                                                                                                                                                                                                    |                          |
| Seed                              | Number | No       | Use a seed value if you make repeated requests and want the same model response. A deterministic outcome isn't guaranteed. Changing the model or other settings can cause variations in the response, even with the same seed value. Enter a whole number from -2,147,483,647 to 2,147,483,647.                                                                                                                                                      |                          |
| Top-K                             | Number | No       | The number of candidate tokens when the model selects an output token. Use a lower value for less random responses and a higher value for more random responses. Enter an integer from 1 to 40.                                                                                                                                                                                                                                                      |                          |
| Top-P                             | Number | No       | Changes how the model selects tokens for output. Tokens are selected from most probable to least probable until the sum of their probabilities equals the Top-P value. For example, if tokens A, B, and C have a probability of 0.3, 0.2, and 0.1 and the Top-P value is 0.5, the model selects either A or B as the next token (using temperature). For the least variable results, set Top-P to 0. Enter a value from 0 to 1 in increments of 0.1. |                          |

#### Function calling

Function calling is a feature of Gemini models that makes it easier to get structured data outputs from generative models.

| Property                  | Type   | Required | Description                                                                                                                                                                     | Example |
| :------------------------ | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| Function call description | String | No       | A [FEEL](/components/modeler/feel/what-is-feel.md) expression that returns a list of function declarations. Register all types in uppercase, for example `OBJECT` and `STRING`. |         |

For example:

```feel
= [
  {
    "name": "get_exchange_rate",
    "description": "Get the exchange rate for currencies between countries",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "currency_date": {
          "type": "STRING",
          "description": "A date that must always be in YYYY-MM-DD format or the value 'latest' if a time period is not specified"
        },
        "currency_from": {
          "type": "STRING",
          "description": "The currency to convert from in ISO 4217 format"
        },
        "currency_to": {
          "type": "STRING",
          "description": "The currency to convert to in ISO 4217 format"
        }
      },
      "required": [
        "currency_date",
        "currency_from",
        "currency_to"
      ]
    }
  }
]
```

Learn more about [Google function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling).

#### Output

The connector returns the content generated by the model as a JSON object. The object contains the role and a list of parts, such as the generated text:

```json
{
  "role": "model",
  "parts": [
    {
      "text": "The video is about ..."
    }
  ]
}
```

To use the generated text in your process, store the response with **Result variable**, or map it with **Result expression**. For example, the following expression stores the text of the first part in the `generatedText` process variable:

```feel
= {
  "generatedText": response.parts[1].text
}
```

<ErrorHandling />

### Invalid prompt format

**Error:** `Invalid prompt format: <prompt>`

A prompt entry doesn't match the supported format. Each entry must be an object with only a `text` key, or only the `mime` and `uri` keys, and the values can't be blank. An empty object (`{}`) also causes this error. Correct the entry in **Prompts**. See [prompts](#prompts).

### Prompt can not be empty

**Error:** `Prompt can not be empty`

The **Prompts** list contains a `null` entry. Remove the `null` entry from the list.

### Function call deserialization

**Error:** `Exception during function call deserialization`

The **Function call description** can't be read as a function declaration. Check that the expression returns a list of valid function declarations, and that all types are in uppercase. See [function calling](#function-calling).

## Further resources

- [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2)
