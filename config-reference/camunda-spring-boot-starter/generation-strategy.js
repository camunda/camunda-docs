const fs = require("fs");
const { execSync } = require("child_process");
const metadataNext = require("./spring-configuration-metadata.json");
const additionalProperties = require("./additional-properties.json");

const baseDir = "./config-reference/camunda-spring-boot-starter";

function getOutputDir(version) {
  if (version === undefined) {
    return "docs/apis-tools/camunda-spring-boot-starter";
  } else {
    return `versioned_docs/version-${version}/apis-tools/camunda-spring-boot-starter`;
  }
}
const getMetadata = (version) => {
  if (version === undefined) {
    return metadataNext;
  } else {
    return require(`./${version}/spring-configuration-metadata.json`);
  }
};
const getAdditionalProperties = (version) => {
  let result;
  if (version === undefined) {
    result = additionalProperties;
  } else {
    result = require(`./${version}/additional-properties.json`);
  }
  // add camunda.client.worker.override properties to the metadata to ensure they are included in the docs
  const currentProperties = getMetadata(version).properties;
  const group = {
    name: "camunda.client.worker.override",
    sourceType:
      "io.camunda.client.spring.properties.CamundaClientJobWorkerProperties",
    placeHolderName: "job-type",
    properties: currentProperties
      .filter(
        (property) =>
          property.sourceType ===
          "io.camunda.client.spring.properties.CamundaClientJobWorkerProperties"
      )
      .map((property) => {
        return {
          name: property.name.replace(
            "camunda.client.worker.defaults.",
            "camunda.client.worker.override.<job-type>."
          ),
          type: property.type,
          description: property.description,
          sourceType: property.sourceType,
        };
      }),
  };
  result.properties.push(group);
  return result;
  // end of custom handling for camunda.client.worker.override properties
};
const getFilename = (version) => {
  return "properties-reference.md";
};
const preGenerateDocs = async (generationConfig) => {};
const postGenerateDocs = async (generationConfig) => {};

const downloadReference = async (version) => {
  if (version === undefined) {
    execSync(`mvn -f ${baseDir}/pom.xml`);
    fs.copyFileSync(
      `${baseDir}/target/dependency/META-INF/spring-configuration-metadata.json`,
      `${baseDir}/spring-configuration-metadata.json`
    );
    if (
      fs.existsSync(
        `${baseDir}/target/dependency/META-INF/additional-properties.json`
      )
    ) {
      fs.copyFileSync(
        `${baseDir}/target/dependency/META-INF/additional-properties.json`,
        `${baseDir}/additional-properties.json`
      );
    }
    fs.rmSync(`${baseDir}/target`, {
      recursive: true,
      force: true,
    });
  } else {
    execSync(`mvn -f ${baseDir}/${version}/pom.xml`);
    fs.copyFileSync(
      `${baseDir}/${version}/target/dependency/META-INF/spring-configuration-metadata.json`,
      `${baseDir}/${version}/spring-configuration-metadata.json`
    );
    if (
      fs.existsSync(
        `${baseDir}/${version}/target/dependency/META-INF/additional-properties.json`
      )
    ) {
      fs.copyFileSync(
        `${baseDir}/${version}/target/dependency/META-INF/additional-properties.json`,
        `${baseDir}/${version}/additional-properties.json`
      );
    }

    fs.rmSync(`${baseDir}/${version}/target`, {
      recursive: true,
      force: true,
    });
  }
};

const componentName = "Camunda Spring Boot Starter";

module.exports = {
  getOutputDir,
  getMetadata,
  getFilename,
  preGenerateDocs,
  postGenerateDocs,
  downloadReference,
  componentName,
  baseDir,
  getAdditionalProperties,
};
