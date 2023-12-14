const inputJson = process.env.INPUT_JSON;
const changedFiles = process.env.CHANGED_FILES;
const inputData = JSON.parse(inputJson.trim());

// const resultData = inputData;
const resultData = {
  files: changedFiles,
  versions: inputJson,
};
// Output the result as JSON to the standard output
console.log(JSON.stringify(resultData));
