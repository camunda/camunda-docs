// @ts-check

const fs = require("fs");

// Read missing changes from a file path (passed as CLI arg) to avoid
// exceeding ARG_MAX when the output is large.
const missingChangesPath = process.argv[2];
const missingChangesRaw = missingChangesPath
  ? fs.readFileSync(missingChangesPath, "utf8")
  : process.env.MISSING_CHANGES || "";

const missingChangesJson = missingChangesRaw.trim();

/** @type {Array<import("./identify-missing-changes").SuggestedChanges>} */
const missingChanges = JSON.parse(
  missingChangesJson === "" ? "[]" : missingChangesJson
);

missingChanges.forEach((missingChange) => {
  console.log(`These files were changed only in *${
    missingChange.source
  }*. You might want to duplicate these changes in *${
    missingChange.suggestion
  }*.<br/><ul>
${missingChange.files
  .map((file) => `<li>${missingChange.source}${file}</li>`)
  .join("\n")} 
</ul>
`);
});
