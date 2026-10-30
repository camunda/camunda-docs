---
id: changelog
title: ProcessOS Harness changelog
sidebar_label: Changelog
description: "Changes in each ProcessOS Harness release, alpha and stable, newest first."
keywords: ["ProcessOS Harness", "changelog", "release notes"]
---

## 1.1.0-alpha.2 (2026-10-26)

### Features

- Implement color guideline for deliberate signaling

### Bug fixes

- Read AI Agent provider.type from the element template
- Check handedit-regenerated structurally, not by token

## 1.1.0-alpha.1 (2026-10-21)

### Features

- Add source field and show it as context in every projection
- Require c8ctl 4.6.0 and document instance migration and modification

### Bug fixes

- Keep plugin inputs away from the orchestrator and built-in specialists
- Enable provenance by default
- Pin the 8.10 java client and match the cpt engine image to it
- Keep a rejected answer unresolved and record why
- Verify c8ctl writes, re-check edit pass, cap fix loops, drop hardwired q2c
- Resolve activities from the per-phase discovery layout

## 1.0.0 (2026-10-13)

### Features

- Group generated bpmns
- Track source artifacts through transformation and artifact generation
- Redesign configure forms and align governance BPMN
- Remove transformation.config.md
- Add skip-system-context run config toggle
- Bundle process-os for opencode
- Raise c8ctl minimum version to 4.3.0
- Move python projects to src/&lt;package> layout
- Extract info from images, standalone and embedded
- Append the version to Download Center zip names
- Add a PROCESS_OS.md pointer to the docs at every bundle root
- Clean up the java and typescript blueprints
- Give every run-config key a concrete value

### Bug fixes

- Sort Python imports and align build gate guidance
- Source the system-category examples and update renamed products
- Remove Camunda Docs MCP from distributions
- Run plugin specialists on the session model unless a tier is mapped
- Add discovery skip settings and align discovery settings with the skill
- Wire process tests and drop dead implementation settings
- Ask for the camunda version once, on the transformation form
- Fix implementation settings after the first generation
- Report the python sdk fallback note once
- Strip skill test-fixtures/ directories from the dists
- Follow the project's camunda-version
- Use spring boot 4 camunda artifacts for 8.8 clients
- Stop the java build gate when no jdk or maven is available

## 1.0.0-alpha.1 (2026-10-13)

### Features

- Clean up the java and typescript blueprints
- Give every run-config key a concrete value
