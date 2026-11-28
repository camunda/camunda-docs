---
id: elevenlabs
title: ElevenLabs connector
sidebar_label: ElevenLabs
description: Generate speech, transcribe audio, and run AI voice agent calls with ElevenLabs from your BPMN process. Learn how to configure the ElevenLabs connector and get started.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Connect your BPMN process with [ElevenLabs](https://elevenlabs.io/) to generate speech from text, transcribe audio, and let ElevenLabs voice agents call a list of phone numbers.

## About this connector

The ElevenLabs connector is an outbound protocol connector built on top of the [REST connector](/components/connectors/protocol/rest.md). It calls the [ElevenLabs API](https://elevenlabs.io/docs/api-reference/) for you, so you select an operation and fill in its parameters instead of building the HTTP request yourself.

For example, use this connector to:

- Generate a spoken message with **Text to speech**, store it as a document, and send it to a customer.
- Transcribe a recorded call or voice message with **Transcribe audio** and route the process on its content.
- Let an ElevenLabs voice agent call a list of customers with **Submit batch call**, then read each call's transcript and outcome with **Get batch call** and **Get conversation**.

## Prerequisites

To use the ElevenLabs connector, you need:

| Prerequisite                     | Description                                                                                                                                                                    |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda 8.11 or later            | The connector template requires Camunda 8.11 or later.                                                                                                                         |
| ElevenLabs API key               | An [ElevenLabs API key](https://elevenlabs.io/app/settings/api-keys), stored as a [connector secret](/components/saas/clusters/manage-secrets.md) or in a reusable credential. |
| Document storage                 | **Text to speech** stores the generated audio as a document. See [document handling](/components/document-handling/getting-started.md) to configure document storage.          |
| ElevenLabs agent (batch calls)   | For **Submit batch call**, an [ElevenLabs agent](https://elevenlabs.io/docs/agents-platform/overview) and a phone number connected to ElevenLabs that the agent calls from.    |
| Enterprise plan (data residency) | To use a data residency server, an ElevenLabs enterprise plan with [data residency](https://elevenlabs.io/docs/overview/administration/data-residency).                        |

:::note
Use secrets to avoid exposing your ElevenLabs API key as plain text. Refer to our documentation on [managing secrets](/components/saas/clusters/manage-secrets.md) to learn more.
:::

<OutboundConnectorBasics />

## Configuration

### Operation

Select the operation to run in the **Operation** dropdown. Each operation is described in [operations](#operations).

| Property  | Type     | Required | Description                                                                                                                                               | Example        |
| :-------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| Operation | Dropdown | Yes      | One of **Text to speech**, **List voices**, **Submit batch call**, **Get batch call**, **Get conversation**, **Transcribe audio**, or **Get transcript**. | Text to speech |

### Server

| Property | Type     | Required | Description                                                                                                                                                                                                                                                                                                           | Example |
| :------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Server   | Dropdown | Yes      | The ElevenLabs API endpoint: **Global** (`https://api.elevenlabs.io`), **EU data residency**, **India data residency**, or **Singapore data residency**. The data residency endpoints require an ElevenLabs enterprise plan with [data residency](https://elevenlabs.io/docs/overview/administration/data-residency). | Global  |

### Authentication

Choose a reusable credential, or enter an API key in the task. The connector sends the key in the `xi-api-key` header.

| Property                  | Type          | Required    | Description                                                                                                                                                                                                                             | Example                          |
| :------------------------ | :------------ | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------- |
| Authentication credential | Configuration | No          | A reusable **ElevenLabs Authentication** credential. If you select a credential, its API key is used and the **API key** property is hidden. See [using credentials](/components/connectors/use-connectors/index.md#using-credentials). |                                  |
| API key                   | String        | Conditional | Your ElevenLabs API key. Required if you do not select an **Authentication credential**. Use a secret to avoid exposing the key.                                                                                                        | `{{secrets.ELEVENLABS_API_KEY}}` |

### Timeout

| Property                      | Type   | Required | Description                                                                                | Example |
| :---------------------------- | :----- | :------- | :----------------------------------------------------------------------------------------- | :------ |
| Connection timeout in seconds | Number | No       | Time to establish the connection. Defaults to 20 seconds. Use `0` for an infinite timeout. | `20`    |
| Read timeout in seconds       | Number | No       | Time to wait for the response. Defaults to 20 seconds. Use `0` for an infinite timeout.    | `120`   |

:::tip
Increase the **Read timeout in seconds** for **Text to speech** on long text, and for **Transcribe audio** on long audio.
:::

### Retries

**Retries** defaults to `0`. A retried **Submit batch call** places the calls again, and a retried **Text to speech** or **Transcribe audio** is billed again. Only increase the retries if a repeated request is acceptable for your use case.

## Operations

### Text to speech

Generates audio from text with an ElevenLabs voice and stores it as a document. Uses the ElevenLabs API operation [Create speech](https://elevenlabs.io/docs/api-reference/text-to-speech/convert).

The audio is always stored in the document store, and the document reference is returned in `response.document`. See [output](#output).

#### Input parameters

| Property                   | Type     | Required | Description                                                                                                                                                                                                     | Example                |
| :------------------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| Voice ID                   | String   | Yes      | The ID of the voice to use. Use [List voices](#list-voices) to find a voice ID.                                                                                                                                 | `21m00Tcm4TlvDq8ikWAM` |
| Enable logging             | Dropdown | No       | Set to `false` to use zero retention mode, which disables history features for this request. Zero retention mode is only available to ElevenLabs enterprise customers.                                          |                        |
| Optimize streaming latency | String   | No       | Latency optimization level from `0` (none) to `4` (maximum, with the text normalizer turned off). Higher values reduce latency at some cost of quality.                                                         |                        |
| Output format              | String   | No       | The audio format, as `codec_sample_rate_bitrate`. Some formats require a higher ElevenLabs subscription tier.                                                                                                   | `mp3_44100_128`        |
| Request body               | String   | Yes      | The request as a FEEL context. Requires `text`. See [Create speech](https://elevenlabs.io/docs/api-reference/text-to-speech/convert) for all fields, such as `model_id`, `language_code`, and `voice_settings`. | See below.             |

For example:

```feel
={
  text: "Your order has shipped.",
  model_id: "eleven_multilingual_v2"
}
```

### List voices

Lists the voices available to your ElevenLabs account, for example to find a voice ID for **Text to speech**. Uses the ElevenLabs API operation [List voices](https://elevenlabs.io/docs/api-reference/voices/search).

All parameters are optional. A parameter you leave empty is not sent.

#### Input parameters

| Property               | Type     | Required | Description                                                                                                                    | Example    |
| :--------------------- | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------- | :--------- |
| Next page token        | String   | No       | The `next_page_token` returned by the previous request, to get the next page. Use it with the `has_more` flag of the response. |            |
| Page size              | String   | No       | The maximum number of voices to return, up to `100`. Defaults to `10`.                                                         | `25`       |
| Search                 | String   | No       | A search term, matched against the voice name, description, labels, and category.                                              | `narrator` |
| Sort                   | String   | No       | The field to sort by: `created_at_unix` or `name`.                                                                             | `name`     |
| Sort direction         | String   | No       | `asc` or `desc`.                                                                                                               | `asc`      |
| Voice type             | String   | No       | One of `personal`, `community`, `default`, `workspace`, `non-default`, `non-community`, or `saved`.                            | `default`  |
| Category               | String   | No       | One of `premade`, `cloned`, `generated`, or `professional`.                                                                    | `premade`  |
| Fine tuning state      | String   | No       | The fine tuning state of professional voice clones, such as `fine_tuned`.                                                      |            |
| Collection ID          | String   | No       | A collection ID to filter by.                                                                                                  |            |
| Gender                 | String   | No       | Filters on the voice's `gender` label.                                                                                         | `female`   |
| Age                    | String   | No       | Filters on the voice's `age` label.                                                                                            | `young`    |
| Language               | String   | No       | Filters on the voice's `language` label. Enter a single value.                                                                 | `en`       |
| Accent                 | String   | No       | Filters on the voice's `accent` label.                                                                                         | `american` |
| Use cases              | String   | No       | Filters on the voice's `use_case` label. Enter a single value.                                                                 |            |
| Min notice period days | String   | No       | Returns voices whose sharing notice period is at least this number of days.                                                    |            |
| Include custom rates   | String   | No       | Whether to include voices with a custom sharing rate. Defaults to including them.                                              |            |
| Include live moderated | String   | No       | Whether to include voices with live moderation enabled. Defaults to including them.                                            |            |
| High quality           | String   | No       | Set to `true` to return only studio-quality voices.                                                                            |            |
| Include total count    | Dropdown | No       | Whether to include `total_count` in the response. The count is a live snapshot, so rely on `has_more` for pagination.          |            |
| Voice IDs              | String   | No       | A voice ID to look up. Enter a single value.                                                                                   |            |

:::note
**Language**, **Use cases**, and **Voice IDs** accept one value. To filter by several values, run the operation once per value.
:::

### Submit batch call

Lets an ElevenLabs agent call a list of phone numbers. Uses the ElevenLabs API operation [Submit batch calling job](https://elevenlabs.io/docs/api-reference/batch-calling/create).

The operation returns as soon as ElevenLabs accepts the batch. It does not wait for the calls to finish. Keep the batch ID from the response, and use [Get batch call](#get-batch-call) to follow the progress.

#### Input parameters

| Property     | Type   | Required | Description                                                                                                                                                                                                                     | Example    |
| :----------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------- |
| Request body | String | Yes      | The request as a FEEL context. Requires `call_name`, `agent_id`, and `recipients`. See [Submit batch calling job](https://elevenlabs.io/docs/api-reference/batch-calling/create) for all fields, such as `scheduled_time_unix`. | See below. |

For example:

```feel
={
  call_name: "Renewal reminders",
  agent_id: "your-agent-id",
  agent_phone_number_id: "your-phone-number-id",
  recipients: [{phone_number: "+15551234567"}]
}
```

To pass data to the agent for each call, add `conversation_initiation_client_data` to a recipient. See the ElevenLabs API reference for its fields.

### Get batch call

Returns the progress of a batch call and the status of each recipient. Uses the ElevenLabs API operation [Get batch call information](https://elevenlabs.io/docs/api-reference/batch-calling/get).

The batch `status` is one of `pending`, `in_progress`, `completed`, `failed`, or `cancelled`. Each entry in `recipients` has its own `status` and, once the call starts, a `conversation_id` to use with [Get conversation](#get-conversation).

#### Input parameters

| Property | Type   | Required | Description                                                                | Example |
| :------- | :----- | :------- | :------------------------------------------------------------------------- | :------ |
| Batch ID | String | Yes      | The batch ID, returned in `id` by [Submit batch call](#submit-batch-call). |         |

### Get conversation

Returns the transcript, analysis, and metadata of an ElevenLabs agent conversation, such as one call of a batch call. Uses the ElevenLabs API operation [Get conversation details](https://elevenlabs.io/docs/api-reference/conversations/get).

#### Input parameters

| Property        | Type   | Required | Description                                                                                                          | Example |
| :-------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------- | :------ |
| Conversation ID | String | Yes      | The conversation ID, for example the `conversation_id` of a recipient returned by [Get batch call](#get-batch-call). |         |
| Format          | String | No       | The response format: `json` or `opentelemetry`, which returns an OTLP-compatible trace payload.                      |         |

### Transcribe audio

Transcribes an audio or video document to text. Uses the ElevenLabs API operation [Create transcript](https://elevenlabs.io/docs/api-reference/speech-to-text/convert).

The request is sent as `multipart/form-data`. Pass the audio as a [document reference](/components/document-handling/getting-started.md) in the `file` field, for example the `response.document` of a **Text to speech** task or a document uploaded through a form. Alternatively, pass a `source_url` with the URL of a hosted audio or video file instead of a `file`.

#### Input parameters

| Property       | Type     | Required | Description                                                                                                                                                                                                                                         | Example    |
| :------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| Token          | String   | No       | A single-use ElevenLabs token. Not needed when the task authenticates with an API key or a credential.                                                                                                                                              |            |
| Enable logging | Dropdown | No       | Set to `false` to use zero retention mode, which disables log and transcript storage for this request. Zero retention mode is only available to ElevenLabs enterprise customers.                                                                    |            |
| Request body   | String   | Yes      | The request as a FEEL context. Requires `model_id`, and either `file` (a document) or `source_url`. See [Create transcript](https://elevenlabs.io/docs/api-reference/speech-to-text/convert) for all fields, such as `language_code` and `diarize`. | See below. |

For example, where `audioDocument` is a process variable that holds a document reference:

```feel
={
  model_id: "scribe_v1",
  file: audioDocument
}
```

### Get transcript

Returns the result of a transcription by its ID, for example a transcription requested with `webhook: true`. Uses the ElevenLabs API operation [Get transcript](https://elevenlabs.io/docs/api-reference/speech-to-text/get).

#### Input parameters

| Property         | Type   | Required | Description                           | Example |
| :--------------- | :----- | :------- | :------------------------------------ | :------ |
| Transcription ID | String | Yes      | The ID of the transcript to retrieve. |         |

## Output

The ElevenLabs connector is built on top of the REST connector, so the response is the HTTP response of the ElevenLabs API call. In the **Result expression**, you can use `response.status`, `response.headers`, `response.body`, and `response.document`. Read the [REST connector response](/components/connectors/protocol/rest.md#response) for details.

**Text to speech** returns binary audio, so its response is always stored as a document, and the reference is returned in `response.document`. The **Response format** is fixed for this connector, because decoding the audio as text or JSON would corrupt it. All other operations return JSON in `response.body`.

The following result expressions show common mappings:

| Operation         | Result expression                                                            |
| :---------------- | :--------------------------------------------------------------------------- |
| Text to speech    | `={audioDocument: response.document}`                                        |
| List voices       | `={voiceId: response.body.voices[1].voice_id}`                               |
| Submit batch call | `={batchId: response.body.id}`                                               |
| Get batch call    | `={batchStatus: response.body.status, recipients: response.body.recipients}` |
| Get conversation  | `={callStatus: response.body.status, transcript: response.body.transcript}`  |
| Transcribe audio  | `={transcript: response.body.text}`                                          |
| Get transcript    | `={transcript: response.body.text}`                                          |

## Example: generate and transcribe speech

The following process generates speech and transcribes it back to text:

1. A **List voices** task with **Page size** `1` and the result expression `={voiceId: response.body.voices[1].voice_id}`.
2. A **Text to speech** task with **Voice ID** `=voiceId`, a request body such as `={text: "Your order has shipped."}`, and the result expression `={audioDocument: response.document}`.
3. A **Transcribe audio** task with the request body `={model_id: "scribe_v1", file: audioDocument}` and the result expression `={transcript: response.body.text}`.

<ErrorHandling />

## Further resources

- [ElevenLabs API reference](https://elevenlabs.io/docs/api-reference/)
- [ElevenAgents](https://elevenlabs.io/docs/agents-platform/overview)
- [Document handling](/components/document-handling/getting-started.md)
