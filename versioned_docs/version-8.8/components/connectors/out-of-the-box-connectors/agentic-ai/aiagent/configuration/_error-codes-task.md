The AI Agent Task emits the following error codes when generating the tools schema from the process definition XML:

| Error code                           | Description                                                                                              |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `AD_HOC_SUB_PROCESS_XML_FETCH_ERROR` | The process definition XML could not be fetched.                                                         |
| `AD_HOC_SUB_PROCESS_NOT_FOUND`       | The ad-hoc sub-process with the configured ID could not be found in the process definition XML.          |
| `AD_HOC_TOOL_DEFINITION_INVALID`     | The ad-hoc sub-process contains invalid tool definitions which can't be transformed into a tools schema. |
