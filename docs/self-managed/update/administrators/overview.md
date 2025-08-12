---
id: admin-update-overview
title: "Update to Camunda 8.8 "
description: "Administrator overview for preparing and running a Camunda 8.8 Self-Managed update."
---

import DocCardList from '@theme/DocCardList';

# Administrator update overview

Updating a self-managed Camunda 8 installation requires both preparation and execution steps.  
This section provides a single entry point for administrators, linking to the two core guides:

- **Prepare for update** – how to assess readiness and plan your upgrade.
- **Run the update** – how to execute the upgrade safely and verify results.

## When to use this section

Use these guides if you:
- Maintain the infrastructure running Camunda 8.
- Need to upgrade from Camunda 8.7.x to 8.8.x (direct updates from earlier versions are not supported).
- Want to understand both pre-update planning and the technical steps for the upgrade.

---

<DocCardList items={[
  {type: 'link', href: './prepare-for-admin-update', label: 'Prepare for update', docId: 'self-managed/update/administrators/prepare-for-admin-update'},
  {type: 'link', href: './run-admin-update', label: 'Run the update', docId: 'self-managed/update/administrators/run-admin-update'}
]} />