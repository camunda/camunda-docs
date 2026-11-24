### Retries

Specify connector execution retry behavior if execution fails.

| Field         | Required | Description                                                                                                                                     |
| :------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| Retries       | No       | Specify the number of [retries](/components/connectors/use-connectors/outbound.md#retries) (times) the connector repeats execution if it fails. |
| Retry backoff | No       | Specify the interval between retries as an ISO-8601 duration. Defaults to `PT30S`.                                                              |
| Job timeout   | No       | Specify an ISO-8601 duration after which the job is considered timed out if it isn't completed. Leave empty to use the default timeout.         |
