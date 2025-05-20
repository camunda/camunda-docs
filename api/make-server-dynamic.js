function makeServerDynamic(specFile) {
  // The source spec has a hardcoded generated server URL.
  //   We can make it dynamic so that the user can edit it and get more accurate code samples.
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
  (async () => {
    const { replaceInFileSync } = await import("replace-in-file");
    replace.sync({
      files: specFile,
      // This regex includes the following `description` line, which becomes inaccurate when we make the server dynamic.
      from: /^. - url:.*\n.   description:.*$/m,
      to: dynamicServerDefinition,
    });
  })();
}
exports.makeServerDynamic = makeServerDynamic;
