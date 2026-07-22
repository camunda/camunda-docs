// Sync Hub API spec with Postman.

const fs = require("fs");
const os = require("os");
const path = require("path");
const RefParser = require("@apidevtools/json-schema-ref-parser");
const Converter = require("openapi-to-postmanv2");

const BASE_URL = "https://api.getpostman.com";
const HEADERS = {
  "X-Api-Key": process.env.POSTMAN_API_KEY,
  "Content-type": "application/json",
};
const WORKSPACE_ID = process.env.WORKSPACE_ID;

/*
TARGET specifies which spec to sync.

Options: hubsm, hubsaas
Configuration method: node sync-hub-api.js <target>
*/
const targetArg =
  process.argv[2] && !process.argv[2].startsWith("--")
    ? process.argv[2]
    : undefined;
const TARGET = targetArg || "hubsm";
const HUB_API_SPEC_ENTRY = path.join(
  __dirname,
  "..",
  "..",
  "api",
  TARGET,
  "v2",
  "camunda-openapi.yaml"
);
const API_NAME_OVERRIDE = {
  hubsm: "Camunda Hub API (Self-Managed)",
  hubsaas: "Camunda Hub API (SaaS)",
};

// Usage: node sync-hub-api.js <target> --dry-run
const DRY_RUN = process.argv.includes("--dry-run");

if (!fs.existsSync(HUB_API_SPEC_ENTRY)) {
  console.error(
    `No spec found for target "${TARGET}" (expected ${HUB_API_SPEC_ENTRY}).`
  );
  process.exit(1);
}

async function getAllCollections(name) {
  const endpoint = "/collections";
  const params = new URLSearchParams({
    workspace: WORKSPACE_ID,
    name,
  });

  const res = await fetch(`${BASE_URL}${endpoint}?${params}`, {
    headers: HEADERS,
  });
  return res.json();
}

async function findCollectionByName(name) {
  const { collections } = await getAllCollections(name);

  // The API returns a list of collections, get the one that matches.
  // This should be unique, but if there are multiple matches, return
  // the first one.
  return collections.find((c) => c.name === name);
}

async function convertHubApiSpec() {
  // The Hub API spec is split across files. Bundle them together
  // before handing it to the Postman converter.
  const spec = await RefParser.bundle(HUB_API_SPEC_ENTRY);

  const collection = await new Promise((resolve, reject) => {
    Converter.convert({ type: "json", data: spec }, {}, (err, result) => {
      if (err) return reject(err);
      if (!result.result) return reject(new Error(result.reason));
      resolve(result.output[0].data);
    });
  });

  collection.info = {
    name: API_NAME_OVERRIDE[TARGET] || spec.info.title,
    description: spec.info.description,
    schema: collection.info.schema,
  };

  return collection;
}

async function sendCollectionRequest(method, endpoint, collection, dryRun) {
  const url = `${BASE_URL}${endpoint}`;
  const body = JSON.stringify({ collection }, null, 2);

  if (dryRun) {
    const outFile = path.join(
      os.tmpdir(),
      `${method.toLowerCase()}-collection-${TARGET}.json`
    );
    fs.writeFileSync(outFile, body);
    console.log(`[dry run] ${method} ${url}`);
    console.log(`Request body (${body.length} bytes) written to ${outFile}`);
    return null;
  }

  const res = await fetch(url, {
    method,
    headers: HEADERS,
    body,
  });
  return res.json();
}

async function createCollection(collection, dryRun = false) {
  const params = new URLSearchParams({ workspace: WORKSPACE_ID });
  return sendCollectionRequest(
    "POST",
    `/collections?${params}`,
    collection,
    dryRun
  );
}

async function updateCollection(uid, collection, dryRun = false) {
  return sendCollectionRequest(
    "PUT",
    `/collections/${uid}`,
    collection,
    dryRun
  );
}

async function main() {
  const collection = await convertHubApiSpec();
  const existing = await findCollectionByName(collection.info.name);

  const result = existing
    ? await updateCollection(existing.uid, collection, DRY_RUN)
    : await createCollection(collection, DRY_RUN);

  if (result) console.log(result);
}

main();
