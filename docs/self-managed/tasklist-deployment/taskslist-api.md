---
id: tasklist-api
title: Tasklist API
---

Tasklist offers an API (GraphQL) where clients authenticate via token, so that users can use it and integrate to their own systems without having to use Tasklist UI.

## Self-Managed API

As there are different authentication methods available for the Self Managed Tasklist, we don't offer the Machine-to-machine (m2m) token, the current approach requires:

1. Clients must create a login Request 
   `POST /api/login?username=<USERNAME>&password=<PASSWORD>`
2. Use response headers/cookies in the API GraphQL

### Limitations

As in current Self Managed versions we can't differentiate a regular `User` request vs an `API User` request, this imposes some limitations to the Self Managed Tasklist API.

1. Tasks must be claimed by `API User` before any change
2. Tasks can only be claimed/assigned to `API User` itself (can't assign to someone else)
3. Tasks can ONLY be Completed if previously claimed/assigned to `API User`