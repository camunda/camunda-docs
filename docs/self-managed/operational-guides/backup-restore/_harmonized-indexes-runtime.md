```mermaid
erDiagram
    "operate-metric-*" {
        keyword id
        date eventTime
        keyword event
        keyword value
        keyword tenantId
    }

    "tasklist-process-*" {
        keyword id
        keyword key
        keyword name
        integer partitionId
        keyword bpmnProcessId
        boolean startedByForm
        keyword formKey
        keyword formId
        boolean isFormEmbedded
        integer version
        keyword tenantId
        text bpmnXml
        keyword flowNodes_id
        keyword flowNodes_name
        keyword userTaskForms_id
        text userTaskForms_definition
    }

```
