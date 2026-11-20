---
---

An Avro union lets a field, an array item, or a whole topic carry values of different types. For example, a topic can carry several event types if its value subject holds the union `["test.CreateTask", "test.CancelTask"]`.

Union handling applies only to the Kafka producer connector when you use **Schema registry** with the Avro schema type. The Kafka consumer connector doesn't use a schema to read messages, and the **No schema** and **Inline schema** strategies don't support unions of records.

#### Top-level unions

To publish several record types to one topic, register the union as the value subject (`<topic>-value`) in the schema registry, and set the schema source to **From registry**. The union can reference other subjects.

The connector uses the schema ID of the registered union and never registers an individual record as the subject's schema.

A union schema with the **Inline** schema source fails with an error that asks you to register the union and select **From registry**. With **Inline**, the serializer would register a single record as the subject's schema and replace the union for all later messages.

#### How the connector selects the record type

The connector selects the record type of a union value as follows. This applies to top-level unions, union fields in a record, and array items whose type is a union.

1. **Type name wrapper (recommended)**: If the value is an object with exactly one key, and that key is the name of a type in the union, the connector uses that type. For example:

   ```json
   { "test.CancelTask": { "taskId": "1", "reason": "duplicate" } }
   ```

   The short name, such as `{"CancelTask": {...}}`, also works if only one type in the union has that name.

2. **Inference from fields**: Without a wrapper, the connector selects the record that has a field for every key in the value and receives all its required fields. A field is required if it has no default value and isn't nullable. If no record has a field for every key, the connector ignores unknown keys and applies the required-fields rule only.

3. **No unique match**: If the value fits several records or none, the task fails. The error lists the types of the union and shows the wrapper to use. For example:

   ```
   The value matches several types of the union [test.CreateTask, test.CancelTask]. Wrap it with the type name as the only key, for example {"test.CreateTask": {...}}.
   ```

The following rules also apply:

- A `null` value goes to the `null` branch of the union.
- A list goes to the array type of the union.
- The connector passes strings, numbers, and booleans to Avro unchanged. A wrapped scalar, such as `{"long": 5}`, is converted to the named type. If the number doesn't fit that type, for example a fraction for `int` or a value out of range, the task fails.
- If the union has only one record type, for example `["null", "Address"]`, the connector uses that record.

The following examples use the records `CreateTask {taskId, title, priority (default 0)}` and `CancelTask {taskId, reason}`:

| Message value                                        | Result                                      |
| :--------------------------------------------------- | :------------------------------------------ |
| `{"taskId": "3", "title": "t", "priority": 5}`       | `CreateTask`                                |
| `{"taskId": "4", "reason": "r"}`                     | `CancelTask`                                |
| `{"taskId": "11", "reason": "r", "extra": 1}`        | `CancelTask`, the connector ignores `extra` |
| `{"taskId": "6", "title": "t", "reason": "r"}`       | Fails: the value matches several types      |
| `{"foo": "bar"}`                                     | Fails: the value matches none of the types  |
| `{"test.CreateTask": {"taskId": "6", "title": "t"}}` | `CreateTask`, `priority` is `0`             |

#### Defaults, arrays, and maps

- If you omit a field from the message value, the connector uses the default value from the schema, including defaults of array and record fields.
- The connector converts each item of an array whose items are a union, and each value of a map whose values are records or unions, using the rules above.
