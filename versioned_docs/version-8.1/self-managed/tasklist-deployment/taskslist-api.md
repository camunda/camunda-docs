---
id: tasklist-api
title: Tasklist API
description: "Tasklist offers an API (GraphQL) where clients authenticate via token. Users can use the API and integrate it into their own systems without having to use Tasklist UI."
---

Tasklist offers an API (GraphQL) where clients authenticate via token. Therefore, users can use the API and integrate it into their own systems without having to use Tasklist UI.

## Self-Managed API

As there are different authentication methods available for the Self-Managed Tasklist, we don't offer the machine-to-machine (m2m) token. The current approach requires the following:

- Clients must create a login request: `POST /api/login?username=<USERNAME>&password=<PASSWORD>`.
- Use response headers/cookies in the API GraphQL.

### Limitations

As in current Self-Managed versions, we can't differentiate a regular `User` request versus an `API User` request; this imposes some limitations to the Self-Managed Tasklist API:

- Tasks must be _claimed_ by `API User` before any changes are made.
- Tasks must be _assigned_ to `API User` itself. You cannot assign these tasks to someone else.
- Tasks can **only** be _completed_ if previously claimed/assigned to `API User`.
