const fs = require("fs");
const { execSync } = require("child_process");
const metadataNext = require("./spring-configuration-metadata.json");
const metadataForVersion = {};

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
const getFilename = (version) => {
  return "properties-reference.md";
};
const preGenerateDocs = async (generationConfig) => {};
const postGenerateDocs = async (generationConfig) => {};

const downloadReference = async (version) => {
  if (version === undefined) {
    execSync("mvn -f ./config-reference/spring-sdk/pom.xml");
    fs.copyFileSync(
      "./config-reference/spring-sdk/target/dependency/META-INF/spring-configuration-metadata.json",
      "./config-reference/spring-sdk/spring-configuration-metadata.json"
    );
    fs.rmSync("./config-reference/spring-sdk/target", {
      recursive: true,
      force: true,
    });
  } else {
    execSync(`mvn -f ./config-reference/spring-sdk/${version}/pom.xml`);
    fs.copyFileSync(
      `./config-reference/spring-sdk/${version}/target/dependency/META-INF/spring-configuration-metadata.json`,
      `./config-reference/spring-sdk/${version}/spring-configuration-metadata.json`
    );
    fs.rmSync(`./config-reference/spring-sdk/${version}/target`, {
      recursive: true,
      force: true,
    });
  }
};

module.exports = {
  getOutputDir,
  getMetadata,
  getFilename,
  preGenerateDocs,
  postGenerateDocs,
  downloadReference,
};
