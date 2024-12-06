---
id: google-gemini
title: Google Gemini Connector
sidebar_label: Google Gemini Connector
description: The Gemini large language models (LLMs) that are used by Gemini for Google Cloud are trained on datasets of publicly available code, Google Cloud-specific material, and other relevant technical information in addition to the datasets used to train the Gemini [foundation models](https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf).
---

:::info
The **Google Gemini Connector** is available for `8.7.0` or later.
:::

The **Google Gemini Connector** in an outbound Connector that allows you to access to Gemini multimodal models from Google, capable of understanding virtually any input, combining different types of information in BPMN process.

## Create a Google Gemini Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Google Gemini Connector executable

To execute the Google Gemini Connector, ensure all mandatory fields are correctly filled.

:::note
All the mandatory and non-mandatory fields and required settings depending on the operation selection you choose are covered in the upcoming sections.
:::

## 1. Authentication

Choose an authentication type from the **Type** dropdown. For details on the different authentication types, refer to the [appendix](#google-authentication-types).

## 2. Project ID

Input your google cloud project identifier.

## 3. Region

Input region where you project located (for example, `us-central1 (lowa)`, `us-west1 (Oregon)`).

## 4. Model

Select model from dropdown, list of supported models below.

- _gemini-1.5-flash-001_
- _gemini-1.5-flash-002_
- _gemini-1.5-pro-001_
- _gemini-1.5-pro-002_
- _gemini-1.0-pro-001_
- _gemini-1.0-pro-002_
- _gemini-1.0-pro-vision-001_

## 5. Prompt

Prompt should be inserted as feel expression where you can provide text and media.

- If you want to provide text to gemini, then expression should contains key _"text"_ and text data. Like _"text"_ : _"your text"_
- If you want to provide media to gemini, then expression should contains key _"mime"_ and mime type text, key _"uri"_ and media uri.
  Like _"mime"_: _"mime type"_, _"uri"_: _"your uri"_.

**Example:**

```feel
= [{"text": "who is this video about"},
{"mime": "video/*", "uri": "https://youtu.be/..."}]
```

## 6. System instructions

Input system instructions as string. System instructions inform how the model should respond. More info [here](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instructions?hl=en).

## 7. Grounding

Grounding connects model output to verifiable sources of information. This is useful in situations where accuracy and reliability are important. [Learn more about grounding](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview?hl=en).

If you want to use grounding, select the _Grounding_ checkbox and input the path to the data store.

## 8. Safety Filter Settings

You can adjust the likelihood of receiving a model response that could contain harmful content. Content is blocked based on the probability that it's harmful.
[Learn more](https://cloud.google.com/vertex-ai/docs/generative-ai/learn/responsible-ai?hl=en#safety_filters_and_attributes).

If you want to use safety filter settings, select the _Safety Filter Settings_ checkbox and select the desired level from dropdown.

:::note
By default, all filters are set to OFF.
:::

## 9. Add stop sequence

A stop sequence is a series of characters (including spaces) that stops response generation if the model encounters it.
Stop sequence should be inserted as list of string.

**Example:**

```feel
= ["text 1", "text 2"]
```

## 10. Temperature

**Temperature** controls the randomness in token selection.

- A lower temperature is good when you expect a true or correct response. A temperature of 0 means the highest probability token is usually selected.
- A higher temperature can lead to diverse or unexpected results. Some models have a higher temperature max to encourage more random responses.

## 11. Output token limit

**Output token limit** determines the maximum amount of text output from one prompt. A token is approximately four characters.

## 12. Seed

Setting a **Seed** value is useful when you make repeated requests and want the same model response.

Deterministic outcome isn’t guaranteed. Changing the model or other settings can cause variations in the response
even when you use the same seed value.

## 13. Top-K

**Top-K** specifies the number of candidate tokens when the model is selecting an output token.
Use a lower value for less random responses and a higher value for more random responses.

:::note
Only _gemini-1.0-pro-vision-001_ model supports Top-K .
:::

## 14. Top-P

**Top-P** changes how the model selects tokens for output. Tokens are selected from most probable to least until the sum of their probabilities equals the top-p value.
For example, if tokens A, B, and C have a probability of .3, .2, and .1 and the top-p value is .5, then the model will select either A or B as the next token (using temperature).
For the least variable results, set top-P to 0.

## 15 Functional call description

**Function calling** is a feature of Gemini models that makes it easier for developers to get structured data outputs from generative models.
**Functional call description** must be provided in fell format. [More info here](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling).

:::note
It is important that all types must be registered with capslock.
:::

**Example:**

```fell
[
  {
    "name": "get_exchange_rate",
    "description":"Get the exchange rate for currencies between countries",
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
      "required":[
        "currency_date",
        "currency_from",
        "currency_to"
      ]
    }
  }
]
```

### Google authentication types

The **Google Gemini Connector** currently supports two methods for authentication and authorization: based on short-lived JWT bearer token, and based on refresh token.

Google supports multiple ways to obtain both. Refer to the [official Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2) to get up-to-date instructions or refer to the examples below.

#### Example 1: Obtaining JWT bearer token with a service account

:::warning
The following code snippet is for demonstration purposes only and must not be used for real production systems due to security concerns.
For production usage, follow the [official Google guidelines](https://developers.google.com/identity/protocols/oauth2/service-account).
:::

Assuming you have created a service account and downloaded a JSON file with keys, run the following Python 3 snippet that prints the JWT token in the terminal:

```python
import google.auth
import google.auth.transport.requests
from google.oauth2 import service_account
# Scopes required to execute 'create' endpoind with Google Drive API
SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata']
# File with keys
SERVICE_ACCOUNT_FILE = 'google-service-account-creds.json'
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
auth_req = google.auth.transport.requests.Request()
credentials.refresh(auth_req)
# Print token
print(credentials.token)
```

#### Example 2: Obtaining bearer and refresh tokens with OAuth client

:::warning
The following code snippet is for demonstration purposes only and must not be used for real production systems due to security concerns.
For production usage, follow the [official Google guidelines](https://developers.google.com/identity/protocols/oauth2/web-server).
:::

Assuming you have created an OAuth client, you can download key files from the Google [Console](https://console.cloud.google.com/apis/credentials). Run the following Python 3 snippet that prints the refresh token in the terminal:

```python
from google_auth_oauthlib.flow import InstalledAppFlow
import pprint

SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents']
OAUTH_KEYS = './oauth-keys.json' # path to your file with OAuth credentials

def main():
    flow = InstalledAppFlow.from_client_secrets_file(OAUTH_KEYS, SCOPES)
    creds = flow.run_local_server(port=54948)
    pprint.pprint(vars(creds))

if __name__ == "__main__":
    main()
```
