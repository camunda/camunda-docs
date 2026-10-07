# PR #9826 review resolution

## Review comments

- Add early access release details to the latest documentation as well as the maintained versioned docs.
- Use the suggested concise definition and lowercase "early access release."
- Add an early access release table label and distinguish the alpha and early access section headings.
- The reviewer also suggested defining early access and alpha releases in the release policy or glossary. This remains under discussion and was not changed.

## Changes

- Updated the latest docs and version 8.8 and 8.9 overview pages with the revised definition, headings, and table label.
- Removed a duplicate Management plane glossary entry left after merging `main`.

## Validation

- `npx prettier --check docs/components/early-access/overview.md versioned_docs/version-8.8/components/early-access/overview.md versioned_docs/version-8.9/components/early-access/overview.md docs/reference/glossary.md .tmp/9826-review-resolution.md` passed.
- `git diff --check` passed.
