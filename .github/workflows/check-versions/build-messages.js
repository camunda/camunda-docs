// @ts-check

const missingChangesRaw = process.env.MISSING_CHANGES || "";

/** @type {Array<import("./identify-missing-changes").SuggestedChanges>} */
const missingChanges = JSON.parse(missingChangesRaw.trim());

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
