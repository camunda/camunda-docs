---
id: filter-process-instances
title: Filter process instances
description: Learn how to filter process instances by variables and other properties using single and multi-variable filters.
---

Narrow down large lists of process instances using filters. Combine multiple variable filters with `AND` logic to find the exact instances you need.

:::note Related pages

- **[Delete finished instances](./delete-finished-instances.md)** — Use filters to select instances for deletion.
- **[Resolve incidents and update variables](./resolve-incidents-update-variables.md)** — Use filters to locate instances that need action.

:::

## Filter panel

The **Filter** panel appears on the left side of the **Processes** page. Open it by clicking the **Filter** icon or expand existing filters to refine your instance list.

### Available filters

**Process filters**:

- **Finished Instances** — Completed or canceled instances
- **Process Name** — Filter by process definition name
- **Process Version** — Filter by process definition version
- **Parent Process Instance Key** — Filter by parent instance (for call activities)

**Instance filters**:

- **Batch Process Instance Key** — Filter by batch operation ID
- **Process Instance Key** — Filter by exact instance ID

**Variable filters** (new in 8.10):

- **Variable Filters** — Filter by variable name, value, and comparison operators (see [multi-variable filters](#multi-variable-filters) below)

## Single variable filters

For basic filtering by a single variable, use the inline variable filter in the sidebar.

### How to add a single variable filter

1. In the **Filter** panel, scroll to **Variable Filters**.
2. Click the **Add/Edit conditions** button in the sidebar to open the filter modal.
3. Enter the variable name and select an operator.
4. Enter the comparison value.
5. Click **Apply** to filter the instance list.

### Operators for single variables

All operators are also available for multi-variable filters (see table below).

## Multi-variable filters

Combine multiple variable filters with AND logic to find instances matching complex criteria in one step.

**Example**: Find all pending EMEA orders over €10,000 by filtering:

- `status` equals `"pending"` **AND**
- `region` equals `"EMEA"` **AND**
- `amount` equals `10000`

### How to add multi-variable filters

1. In the **Filter** panel, under **Variable Filters**, click the **Add/Edit conditions** button in the sidebar.
2. The **Variable Filters** modal opens.
3. Click **Add condition** to add the first variable filter.
4. Enter the **Variable name** (free text).
5. Select an **Operator** from the dropdown.
6. Enter the **Value** for comparison.
7. Click **Add condition** again to add more filters. AND indicators appear between filter rows, showing that all conditions must match.
8. Click **Apply** to filter the instance list.

The sidebar displays a count of active variable filter conditions. Click **Add/Edit conditions** again to modify existing filters.

### Operators reference

| Operator           | Behavior                                                                  | Example                                             |
| ------------------ | ------------------------------------------------------------------------- | --------------------------------------------------- |
| **equals**         | Exact match on variable value (searches truncated value only)             | Find instances where `status = "pending"`           |
| **not equal**      | Value does not match (searches truncated value only)                      | Find instances where `status ≠ "error"`             |
| **contains**       | Case-sensitive substring match (searches truncated value only)            | Find order IDs containing `"2024"`                  |
| **is one of**      | Match any value in a comma-separated list (searches truncated value only) | Find instances where `priority` in `(high, urgent)` |
| **exists**         | Variable is present (any value)                                           | Find instances with a specific variable set         |
| **does not exist** | Variable is not present                                                   | Find instances missing a required variable          |

:::caution
Value-based variable filters (`equals`, `not equal`, `is one of`, and `contains`) search only the first ~8,000 characters of a variable value. If a match exists beyond this boundary, it will not be returned.

In the Operate UI, the inline warning appears on **contains** only.
:::

### AND logic

All conditions are combined with AND logic — an instance must match **all** conditions to appear in results. AND indicators between filter rows make this logical combination explicit. OR logic and nested conditions are not supported.

## Smart value transformations

The filter automatically transforms entered values based on context:

| You enter    | Operator  | Interpreted as           | Behavior                                |
| ------------ | --------- | ------------------------ | --------------------------------------- |
| `hello`      | equals    | String `"hello"`         | Exact match on the string (with quotes) |
| `42`         | equals    | Number `42`              | Exact match on numeric value            |
| `true`       | equals    | Boolean `true`           | Exact match on boolean                  |
| `null`       | equals    | Null                     | Exact match on null value               |
| `val1, val2` | is one of | Array `["val1", "val2"]` | Match either value                      |
| `{"x":1}`    | equals    | Object `{"x":1}`         | Exact match on the JSON object          |

### Edge cases

- **Leading zeros** (for example, `01234`) are preserved as strings, not converted to numbers.
- **Comma-separated values** split into a list only with the **is one of** operator; otherwise, commas are treated as literal characters. To include a literal comma, wrap the value in quotes.
- **Null vs. "null"**: The exact string `null` (no quotes) is treated as null; the string `"null"` (with quotes) is treated as a text string.
- **Contains operator**: Does NOT transform values; it searches for the literal substring you entered.

## Nested JSON editor

For complex variable values (JSON objects), use the JSON editor to construct filters precisely.

### How to use the JSON editor

1. In the **Variable Filters** modal, click on a condition row.
2. In the modal, toggle the **JSON** tab to switch from **Fields** view to **JSON** view.
3. The JSON editor shows the filter structure (or paste valid JSON).
4. Use the **maximize** icon to open the editor in a focused modal for complex values. The parent modal dims for focus, and the JSON editor displays a contextual title indicating which variable/row is being edited.
5. Toggle back to **Fields** to confirm the transformation, or edit directly in JSON. Changes transform losslessly between Fields and JSON views.

The JSON structure mirrors the Camunda API filter schema, so you can share or reuse complex filters with teammates. The round-trip between Fields and JSON is lossless — no data is lost in translation.

## Performance considerations

Each variable condition adds filtering overhead. At **8+ conditions**, the filter interface displays an informational warning below the list of conditions: _"Filtering by many conditions can be slow. Add conditions only if you need them."_

This warning appears once per session and is informational only — you can add more conditions if needed, but be aware of potential performance impact on large process instance lists.

### Best practices

- Start with fewer conditions and add more if needed.
- Use **exists** / **does not exist** to check for variable presence before filtering on value.
- Combine with other filters (Process Name, Finished Instances) to reduce the initial instance list.

## Filter persistence

Filter conditions persist while you remain on the **Processes** page. If you:

- **Refresh the page**: Filters are preserved for the current session.
- **Navigate away and return**: Filters are cleared.
- **Click the reset icon**: All filters are removed.

:::note
Filter state is stored locally in your browser session; it cannot be shared via URL or exported.
:::

## Common workflows

### Find instances with missing variables

Use the **does not exist** operator to locate instances missing a critical variable:

1. Click **Add/Edit conditions**.
2. Enter the variable name (for example, `customerId`).
3. Select **does not exist**.
4. Click **Apply**.

### Find instances matching multiple status values

Use the **is one of** operator:

1. Enter variable name: `status`
2. Select **is one of**
3. Enter values: `pending, processing, review` (comma-separated)
4. Click **Apply**

### Find instances by numeric or date values

Enter the value as you would compare it (for example, `42` for numbers, `2024-01-15` for dates):

1. Enter variable name: `amount` or `createdDate`
2. Select **equals** or **contains**
3. Enter the value
4. Click **Apply**

:::note
Numeric comparison operators are not supported. Use **equals** or **contains** as alternatives.
:::

## Known limitations

- **Numeric operators**: Greater than, less than, and range operators are not available. Use exact match or prefix matching with **contains**.
- **OR logic**: Filters are combined with AND logic only; OR conditions are not supported.
- **Variable name autocomplete**: Variable names must be entered as free text. Variable name suggestions based on process definitions are a planned future enhancement.
- **Nested JSON path filtering**: Filtering on nested properties within JSON objects (for example, `customer.region`) is not supported; filter on the top-level variable only.
- **Value truncation**: Value-based operators (`equals`, `not equal`, `is one of`, and `contains`) search only the first ~8,000 characters of a variable value.
- **Filter sharing**: Filter state is stored in your browser session and cannot be shared via URL. See [filter persistence](#filter-persistence) for details.

## Related topics

- [Delete finished instances](./delete-finished-instances.md) — Use filters to find instances for bulk deletion
- [Resolve incidents and update variables](./resolve-incidents-update-variables.md) — Use filters to locate and fix problematic instances
- [Operate API](/apis-tools/operate-api/overview.md) — Advanced filtering via REST API
