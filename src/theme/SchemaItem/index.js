// Why is this swizzled?
//   The OpenAPI plugin does not properly handle the `additionalProperties` property on a schema --
//    it duplicates the parent description into the additional properties map, which is confusing.
//   This component overrides the schema description when it looks like
//    the additional properties map is being rendered.
// Swizzled from docusaurus-theme-openapi-docs version 2.0.4.

import React from "react";
import SchemaItem from "@theme-original/SchemaItem";

export default function SchemaItemWrapper(props) {
  const { name, schema } = props;
  if (name === "property name*" && schema.additionalProperties) {
    schema.description = "Additional properties allowed.";
  }

  return (
    <>
      <SchemaItem {...props} schema={schema} />
    </>
  );
}
