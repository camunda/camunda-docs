function generateMermaidDiagrams(schema) {
  const entities = generateEntities(schema);

  return `\`\`\`mermaid
erDiagram
${entities.join("\n")}
\`\`\`
`;
}

function generateEntities(schema) {
  return Object.entries(schema.schema)
    .map(([schemaName, definition]) =>
      generateEntity(schemaName, definition.mappings.properties)
    )
    .flat();
  // for (const [schemaName, definition] of Object.entries(schema.schema)) {
  //   const properties = definition.mappings.properties;
  //   const entityName = schemaName.toUpperCase().replace(/-/g, '_');

  //   mermaid += generateEntity(entityName, properties);
  //   mermaid += generateClickEvent(entityName, schemaName);
  //   mermaid += '\n';
  // }

  // return mermaid;
}

function generateEntity(entityName, properties) {
  const mappedProperties = Object.entries(properties).reduce(
    (acc, currentProperty) => {
      const { currentEntityProps, extraEntities } = acc;

      const [propName, propDefinition] = currentProperty;
      const { type } = propDefinition;

      if (type === "object") {
        extraEntities.push(generateEntity(propName, propDefinition.properties));
        extraEntities.push(generateRelationship(propName, entityName));
      } else {
        currentEntityProps.push(`        ${type} ${propName}`);
      }

      return { currentEntityProps, extraEntities };
    },
    { currentEntityProps: [], extraEntities: [] }
  );

  const { currentEntityProps, extraEntities } = mappedProperties;
  const currentEntity = `
    ${entityName} {
${currentEntityProps.join("\n")}
    }`;

  return [currentEntity, ...extraEntities];
}

function generateRelationship(childEntity, parentEntity) {
  return `    ${parentEntity} ||--o{ ${childEntity} : has`;
}

// function convertProperties(properties, parentName = '') {
//   let result = '';
//   for (const [propName, propDef] of Object.entries(properties)) {
//     if (propDef.type === 'object' && propDef.properties) {
//       result += convertProperties(propDef.properties, `${propName}_`);
//     } else if (propDef.type !== 'join') {
//       result += `        ${propDef.type} ${parentName}${propName}\n`;
//     }
//   }
//   return result;
// }

// function generateEntity(entityName, properties) {
//   let entity = `    ${entityName} {\n`;
//   entity += convertProperties(properties);
//   entity += '    }\n';
//   return entity;
// }

module.exports = {
  generateMermaidDiagrams,
};
