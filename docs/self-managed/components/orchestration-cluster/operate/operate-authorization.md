---
id: operate-authorization
title: Authorization for using Operate
description: "Authorizations needed for Clients to see data in the Operate UI and perform actions."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Authorization concept

With Camunda 8.8 we are implementing a new permission concept that impacts the access to Operate UI components. The new Camunda permissions allow for more fine-grained access controle, which can limit the visibility of data in Operate depending on the specific user and client permissions, as well as prevent users from performing operations.

## Mapping previous Operate roles to new permissions

To maintain the same access and views in the Operate UI as in previous versions, the following permissions need to be granted for the user:

**`OWNER`** (full access) is replaced by:
No replacement on Operate level. Permissions are now granted by admin users via Camunda permissions.

**`OPERATOR`** (read and write) is replaced by:

- `PROCESS_DEFINITION:*:READ_PROCESS_DEFINITION`
- `PROCESS_DEFINITION:*:READ_PROCESS_INSTANCE`
- `DECISION_DEFINITION:*:READ_DECISION_DEFINITION`
- `PROCESS_DEFINITION:*:CANCEL_PROCESS_INSTANCE`
- `PROCESS_DEFINITION:*:UPDATE_PROCESS_INSTANCE`
- `PROCESS_DEFINITION:*:MODIFY_PROCESS_INSTANCE`
- `PROCESS_DEFINITION:*:DELETE_PROCESS_INSTANCE`
- `RESOURCE:*:DELETE_DECISION_INSTANCE`
- `RESOURCE:*:DELETE_PROCESS`

**`USER`** (read only) is replaced by:

- `PROCESS_DEFINITION:*:READ_PROCESS_DEFINITION`
- `PROCESS_DEFINITION:*:READ_PROCESS_INSTANCE`
- `DECISION_DEFINITION:*:READ_DECISION_DEFINITION`

## Leveraging the new permissions in Operate

The new permissions concept allows for more fine-grained access controle via the Operate API that can be used to give users permissions for only specific processes or only specific actions. This section details the specific permissions needed for viewing information in Operate, as well as performing actions.

### READ access and Visibility

- **Process Definitions**: `PROCESS_DEFINITION:{bpmnProcessId}:READ_PROCESS_DEFINITION`
- **Process Instances** and related resources (Flownode Instances, Variables, Incidents, Sequence Flows, Listeners, Statistics): `PROCESS_DEFINITION:{bpmnProcessId}:READ_PROCESS_INSTANCE`
- **Incident Statistics for Processes**: `PROCESS_DEFINITION:{bpmnProcessId}:READ_PROCESS_DEFINITION` and `PROCESS_DEFINITION:{bpmnProcessId}:READ_PROCESS_INSTANCE`
- **Operations and Batch Operations**: Users only see Operations created by them
- **Decision Definitions, Instances and Requirements**: `DECISION_DEFINITION:{decisionId}:READ_DECISION_DEFINITION `

### Modification and Deletion:

To perform operations on process definitions, decision definitions and process instances, the following permissions are required.

- **Cancel Process Instances**: `PROCESS_DEFINITION:{processInstanceKey}:CANCEL_PROCESS_INSTANCE`
- **Add and Update Variables**: `PROCESS_DEFINITION:{processInstanceKey}:UPDATE_PROCESS_INSTANCE`
- **Migrate Process Instances**: `PROCESS_DEFINITION:{processInstanceKey}:UPDATE_PROCESS_INSTANCE`
- **Resolve Incidents**: `PROCESS_DEFINITION:{processInstanceKey}:UPDATE_PROCESS_INSTANCE`
- **Modify Process Instances**: `PROCESS_DEFINITION:{processInstanceKey}:MODIFY_PROCESS_INSTANCE`
- **Delete Process Instances**: `PROCESS_DEFINITION:{processInstanceKey}:DELETE_PROCESS_INSTANCE`
- **Delete Process Definitions**: `RESOURCE:{processDefinitionKey}:DELETE_PROCESS`
- **Delete Decision**: `RESOURCE:{decisionId}:DELETE_DECISION_INSTANCE`
