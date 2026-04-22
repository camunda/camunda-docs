// @ts-check

/**
 * Integration tests for the check-versions data flow.
 *
 * These tests exercise the action scripts (identify-missing-changes.action.js
 * and build-messages.js) end-to-end via file-based I/O, matching how the
 * workflow YAML invokes them.
 *
 * The "large PR" test generates 2000+ changed files — the same scale that
 * caused ARG_MAX overflow when data was passed via environment variables.
 */

const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const SCRIPTS_DIR = __dirname;
const ACTION_SCRIPT = path.join(
  SCRIPTS_DIR,
  "identify-missing-changes.action.js"
);
const BUILD_MESSAGES_SCRIPT = path.join(SCRIPTS_DIR, "build-messages.js");

/**
 * Run a Node script with the given env and args, returning stdout.
 */
function runScript(script, args = [], env = {}) {
  const result = execFileSync("node", [script, ...args], {
    env: { ...process.env, ...env },
    encoding: "utf8",
    timeout: 10_000,
  });
  return result.trim();
}

describe("check-versions data flow (file-based)", () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "check-versions-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe("identify-missing-changes.action.js", () => {
    it("reads changed files from a file path argument", () => {
      const changedFilesPath = path.join(tmpDir, "changed-files.json");
      fs.writeFileSync(changedFilesPath, JSON.stringify(["docs/foo.md"]));

      const versionConfig = JSON.stringify([
        {
          version: "next",
          source: "docs/",
          suggestions: ["versioned_docs/version-8.8/"],
        },
      ]);

      const output = runScript(ACTION_SCRIPT, [changedFilesPath], {
        VERSION_CONFIG: versionConfig,
      });

      const result = JSON.parse(output);
      expect(result).toHaveLength(1);
      expect(result[0].source).toBe("docs/");
      expect(result[0].suggestion).toBe("versioned_docs/version-8.8/");
      expect(result[0].files).toContain("foo.md");
    });

    it("returns empty array when all versions are covered", () => {
      const changedFilesPath = path.join(tmpDir, "changed-files.json");
      fs.writeFileSync(
        changedFilesPath,
        JSON.stringify(["docs/foo.md", "versioned_docs/version-8.8/foo.md"])
      );

      const versionConfig = JSON.stringify([
        {
          version: "next",
          source: "docs/",
          suggestions: ["versioned_docs/version-8.8/"],
        },
      ]);

      const output = runScript(ACTION_SCRIPT, [changedFilesPath], {
        VERSION_CONFIG: versionConfig,
      });

      expect(JSON.parse(output)).toHaveLength(0);
    });
  });

  describe("build-messages.js", () => {
    it("reads missing changes from a file path argument", () => {
      const missingChangesPath = path.join(tmpDir, "missing-changes.json");
      fs.writeFileSync(
        missingChangesPath,
        JSON.stringify([
          {
            source: "docs/",
            suggestion: "versioned_docs/version-8.8/",
            files: ["foo.md"],
          },
        ])
      );

      const output = runScript(BUILD_MESSAGES_SCRIPT, [missingChangesPath]);

      expect(output).toContain("docs/");
      expect(output).toContain("versioned_docs/version-8.8/");
      expect(output).toContain("foo.md");
    });

    it("produces no output when there are no missing changes", () => {
      const missingChangesPath = path.join(tmpDir, "missing-changes.json");
      fs.writeFileSync(missingChangesPath, "[]");

      const output = runScript(BUILD_MESSAGES_SCRIPT, [missingChangesPath]);

      expect(output).toBe("");
    });
  });

  describe("end-to-end pipeline", () => {
    it("pipes identify → build-messages via temp files (simulates workflow)", () => {
      // Step 1: Write changed files (input)
      const changedFilesPath = path.join(tmpDir, "changed-files.json");
      fs.writeFileSync(changedFilesPath, JSON.stringify(["docs/guide.md"]));

      const versionConfig = JSON.stringify([
        {
          version: "next",
          source: "docs/",
          suggestions: ["versioned_docs/version-8.8/"],
        },
      ]);

      // Step 2: Run identify-missing-changes → write output to file
      const missingChangesPath = path.join(tmpDir, "missing-changes.json");
      const identifyOutput = runScript(ACTION_SCRIPT, [changedFilesPath], {
        VERSION_CONFIG: versionConfig,
      });
      fs.writeFileSync(missingChangesPath, identifyOutput);

      // Step 3: Run build-messages reading from the file
      const messages = runScript(BUILD_MESSAGES_SCRIPT, [missingChangesPath]);

      expect(messages).toContain("docs/guide.md");
      expect(messages).toContain("versioned_docs/version-8.8/");
    });

    it("handles 2000+ changed files without overflow", () => {
      // Generate a realistic large file list matching the TypeScript SDK
      // API reference pattern that triggered the original ARG_MAX failure.
      const files = [];
      for (let i = 0; i < 2000; i++) {
        files.push(
          `docs/apis-tools/typescript/api-reference/functions/fn${i}.md`
        );
      }

      const changedFilesPath = path.join(tmpDir, "changed-files.json");
      fs.writeFileSync(changedFilesPath, JSON.stringify(files));

      const versionConfig = JSON.stringify([
        {
          version: "next",
          source: "docs/",
          suggestions: ["versioned_docs/version-8.8/"],
        },
      ]);

      // Step 1: identify-missing-changes should handle large input
      const missingChangesPath = path.join(tmpDir, "missing-changes.json");
      const identifyOutput = runScript(ACTION_SCRIPT, [changedFilesPath], {
        VERSION_CONFIG: versionConfig,
      });
      fs.writeFileSync(missingChangesPath, identifyOutput);

      const missingChanges = JSON.parse(identifyOutput);
      expect(missingChanges).toHaveLength(1);
      expect(missingChanges[0].files).toHaveLength(2000);

      // Step 2: build-messages should handle large input
      const messages = runScript(BUILD_MESSAGES_SCRIPT, [missingChangesPath]);
      expect(messages).toContain("docs/");
      expect(messages).toContain("versioned_docs/version-8.8/");

      // Verify the output JSON is large enough to exercise a realistic
      // large-payload scenario if it were passed via an environment variable.
      const outputSize = Buffer.byteLength(identifyOutput, "utf8");
      expect(outputSize).toBeGreaterThan(100_000); // >100KB
    });
  });
});
