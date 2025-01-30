function generateMermaidDiagrams(schema) {
  return `\`\`\`mermaid
erDiagram
${generateEntities(schema)}
\`\`\`
`;
}

function generateEntities(schema) {
  return Object.entries(schema.schema).map(([schemaName, definition]) =>
    generateEntity(schemaName, definition)
  );
  // for (const [schemaName, definition] of Object.entries(schema.schema)) {
  //   const properties = definition.mappings.properties;
  //   const entityName = schemaName.toUpperCase().replace(/-/g, '_');

  //   mermaid += generateEntity(entityName, properties);
  //   mermaid += generateClickEvent(entityName, schemaName);
  //   mermaid += '\n';
  // }

  // return mermaid;
}

function generateEntity(entityName, schema) {
  return `
    ${entityName} {
${generateProperties(schema.mappings.properties)}
    }
`;
}

function generateProperties(properties) {
  return Object.entries(properties)
    .map(([propName, { type }]) => `        ${type} ${propName}`)
    .join("\n");
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
