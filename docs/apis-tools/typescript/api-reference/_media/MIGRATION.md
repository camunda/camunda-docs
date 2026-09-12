---
title: "Migration guide: v9 → v10 (Camunda 8.9 → 8.10)"
sidebar_label: "v9 → v10 (Camunda 8.9 → 8.10)"
mdx:
  format: md
---

# Migration guide: v9 → v10 (Camunda 8.9 → 8.10)

`@camunda8/orchestration-cluster-api` v10 targets Camunda 8.10. This guide covers
**only the changes that require you to edit code**. The 8.10 API is overwhelmingly
additive — 60 new operations and no removals — so most upgrades touch a handful of
call sites.

```bash
npm install @camunda8/orchestration-cluster-api@^10
```

## At a glance

| #   | Change                                                                                                                                                 | Who is affected                                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| 1   | [Identifier fields are now branded types](#1-identifier-fields-are-now-branded-types)                                                                  | Anyone passing plain strings for group, role, client, mapping-rule, tenant, username or cluster-variable-name identifiers |
| 2   | [`getResourceContent` is deprecated, replaced by `getResourceContentBinary`](#2-getresourcecontent-is-deprecated-replaced-by-getresourcecontentbinary) | Callers of `getResourceContent`                                                                                           |
| 3   | [`BatchOperationItemResponse.processInstanceKey` is nullable](#3-batchoperationitemresponseprocessinstancekey-is-nullable)                             | Callers reading batch operation items                                                                                     |

Nothing else in the public surface was removed or renamed. See
[What does not change](#what-does-not-change).

---

## 1. Identifier fields are now branded types

Seven identifier types moved from plain `string` to branded types. Branded values
are still plain strings at runtime and remain assignable anywhere a `string` is
expected — template literals, logging, `JSON.stringify`. Only the **input** side
needs updating: you must brand a value before passing it in.

Use `.assumeExists()` at your application boundary. It validates the string and
returns the branded value, throwing if the input is malformed. Call it once when a
value enters your system (config parsing, an API response, a CLI argument) and pass
the branded value through your code from there.

```ts
// v9 — plain strings were accepted
await camunda.assignRoleToGroup({
  roleId: "developer",
  groupId: "engineering",
});

// v10 — brand at the boundary
await camunda.assignRoleToGroup({
  roleId: RoleId.assumeExists("developer"),
  groupId: GroupId.assumeExists("engineering"),
});
```

### Affected fields

| Brand                 | Fields changed from `string`                                                                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GroupId`             | `GroupCreateRequest.groupId`, `GroupCreateResult.groupId`, `GroupResult.groupId`, `GroupUpdateResult.groupId`, `RoleGroupResult.groupId`, `TenantGroupResult.groupId` |
| `RoleId`              | `RoleCreateRequest.roleId`, `RoleCreateResult.roleId`, `RoleResult.roleId`, `RoleUpdateResult.roleId`                                                                 |
| `ClientId`            | `GroupClientResult.clientId`, `RoleClientResult.clientId`, `TenantClientResult.clientId`                                                                              |
| `ClusterVariableName` | `ClusterVariableResultBase.name`, `CreateClusterVariableRequest.name`                                                                                                 |
| `MappingRuleId`       | `MappingRuleCreateUpdateResult.mappingRuleId`, `MappingRuleResult.mappingRuleId`                                                                                      |
| `TenantId`            | `TenantCreateRequest.tenantId`                                                                                                                                        |
| `Username`            | `UserRequest.username`                                                                                                                                                |

> `TenantId` and `Username` already existed as brands in v9 — v10 applies them to
> the _creation_ request types, which previously took plain strings. If you call
> `createTenant` or the user create/update operations, those call sites need
> branding even though the brand itself is not new.

Reading branded values needs no change: they are strings.

```ts
const group = await camunda.getGroup({
  groupId: GroupId.assumeExists("engineering"),
});
console.log(`group: ${group.groupId}`); // still a string at runtime
```

## 2. `getResourceContent` is deprecated, replaced by `getResourceContentBinary`

| Operation                                   | Path                                      | Scope                                             | 200 type in v10              |
| ------------------------------------------- | ----------------------------------------- | ------------------------------------------------- | ---------------------------- |
| `getResourceContent` _(deprecated in 8.10)_ | `/resources/{resourceKey}/content`        | RPA resources only                                | `{ [key: string]: unknown }` |
| `getResourceContentBinary` _(new in 8.10)_  | `/resources/{resourceKey}/content/binary` | all resource types **except** BPMN, DMN and forms | `Blob \| File`               |

**`getResourceContent` is now marked deprecated upstream**, and its 200 type changed
from `string` to an object:

```ts
// v9
GetResourceContentResponses         200: string;

// v10
GetResourceContentResponses         200: { [key: string]: unknown };
GetResourceContentBinaryResponses   200: Blob | File;
```

The type change is the generator becoming honest rather than a behaviour change: the
endpoint has always been declared `application/json`, so the v9 `string` was a
flattened JSON response, not resource bytes. Note also that this operation only ever
served RPA resources — in 8.9 its description already read _"Currently, this endpoint
only supports RPA resources"_.

**Migrate to `getResourceContentBinary`**, which returns octet-stream content:

```ts
const blob = await camunda.getResourceContentBinary({ resourceKey });
fs.writeFileSync("automation.rpa", Buffer.from(await blob.arrayBuffer()));
```

**Neither endpoint serves BPMN, DMN or forms.** The spec is explicit that
`/content/binary` "does not return BPMN process definitions, DMN decision definitions,
or form resources". Those have dedicated operations — not a v10 change, but it is the
question the deprecation tends to raise:

| To fetch                    | Use                                                      |
| --------------------------- | -------------------------------------------------------- |
| BPMN process definition XML | `getProcessDefinitionXML`                                |
| DMN decision definition XML | `getDecisionDefinitionXML`                               |
| A form                      | `getFormByKey`, `getStartProcessForm`, `getUserTaskForm` |

## 3. `BatchOperationItemResponse.processInstanceKey` is nullable

```ts
// v9
processInstanceKey: ProcessInstanceKey;

// v10
processInstanceKey: ProcessInstanceKey | null;
```

The field is `null` for batch operations that are not scoped to a process instance
(for example `DELETE_PROCESS_DEFINITION`). Under `strictNullChecks` this surfaces as
a compile error at the use site:

```ts
for (const item of page.items) {
  if (item.processInstanceKey === null) continue; // new guard
  await handle(item.processInstanceKey);
}
```

---

## What does not change

Verified by diffing the generated surface of `stable/9` against `main`:

- **No exported type was removed or renamed.** The type count went from 1,453 to
  2,042 — every change is additive.
- **No field was removed from an existing type, and no optional field became
  required.**
- **The wire format is unchanged.** Branded values serialise as the strings they
  already were.
- **Sort field unions gained members** (for example `businessId` on several
  `*SearchQuerySortRequest.field` types). These are request-side inputs, so
  accepting more values is not a breaking change — unless you exhaustively `switch`
  over one of those unions.
- **60 new operations** are available. They are additive and need no migration.

## How this guide was produced

The changes above were derived by comparing the generated SDK surface between the
`stable/9` branch and `main`, not from the changelog:

```bash
git show origin/stable/9:src/gen/types.gen.ts > /tmp/v9.ts
# then diff field-by-field against src/gen/types.gen.ts
```

The underlying OpenAPI specs were also compared directly (`stable/8.9` vs
`stable/8.10`): 183 → 243 operations, 547 → 753 schemas, with no operation, schema,
property or enum value removed.

One caveat worth recording for whoever writes the next one of these: 8.10 refactored
the search filters into `allOf: [XFilterFields, { $or }]`. A naive schema diff reports
every filter field as _removed_, because the fields now sit one level down in the
composition. They are not removed — `GroupFilterFields.properties` is identical to
v9's `GroupFilter.properties`. Flatten `allOf` before comparing.
