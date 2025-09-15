const helmValuesMap = {
  "camunda.security.authentication.method":
    "orchestration.security.authentication.method",
};

function getOutputDir(version) {
  if (version === undefined) {
    return ""; // return the path to your version next output dir
  } else {
    return ""; // return the path to your versioned output dir
  }
}
const getMetadata = (version) => {
  if (version === undefined) {
    return myMetadata; // return metadata json for next version
  } else {
    return myVersionedMetadata; // return metadata json for versioned version
  }
};
const getFilename = (version) => {
  return "properties-reference.md"; // return the file name for your markdown
};
const preGenerateDocs = async (generationConfig) => {
  generationConfig.metadata.properties.forEach((property) => {
    property.helm = helmValuesMap[property.name];
  });
}; // apply some customizations upfront
const postGenerateDocs = async (generationConfig) => {}; // apply some customizations after the generation

const downloadReference = async (version) => {}; // ensure that the reference you return in `getMetadata(version)` is in place and up-to-date

const componentName = "Orchestration Cluster"; // the name of your component
const useHelm = true;

module.exports = {
  getOutputDir,
  getMetadata,
  getFilename,
  preGenerateDocs,
  postGenerateDocs,
  downloadReference,
  componentName,
  useHelm,
};
