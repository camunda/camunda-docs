const fs = require("fs");

function makeServerDynamic(specFile) {
  console.log("making server dynamic....");

  // Note that `v1` is included in this path.
  const dynamicServerDefinition = `  - url: "{schema}://{host}:{port}"
    variables:
      host:
        default: localhost
        description: The hostname of the API server.
      port:
        default: "8080"
        description: The port of the API server.
      schema:
        default: http
        description: The schema of the API server.`;

  const content = fs.readFileSync(specFile, "utf8");
  const updated = content.replace(
    /^. - url:.*\n.   description:.*$/m,
    dynamicServerDefinition
  );

  fs.writeFileSync(specFile, updated);
}

exports.makeServerDynamic = makeServerDynamic;
