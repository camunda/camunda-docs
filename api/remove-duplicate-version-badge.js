const fs = require("fs");

function removeDuplicateVersionBadge(filePath) {
  console.log("removing duplicate version badge...");

  const content = fs.readFileSync(filePath, "utf8");

  const updated = content.replace(
    /<span[^>]*\s*children=\{"Version: [^"]*"\}\s*>\n<\/span>\n/m,
    ""
  );

  fs.writeFileSync(filePath, updated);
}

module.exports = removeDuplicateVersionBadge;
