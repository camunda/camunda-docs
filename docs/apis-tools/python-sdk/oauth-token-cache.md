---
id: oauth-token-cache
title: OAuth Token Cache
sidebar_label: OAuth Token Cache
sidebar_position: 18
mdx:
  format: md
---

# OAuth Token Cache

The OAuth token disk cache is **off unless you set `CAMUNDA_TOKEN_CACHE_DIR`**. Without it the SDK keeps tokens in memory only and writes nothing to disk. The cache files hold a bearer token (and, for Camunda SaaS, a marker file after a rejected login), so treat the directory like a credential store.

**On POSIX systems** (Linux, macOS) the SDK sets the cache files to owner-only (mode `0600`) on a best-effort basis: the file is created first and its mode tightened afterwards, so under a permissive umask it can be briefly readable by other users, and it stays readable if the permission change fails. A private per-user directory is the reliable protection on POSIX too.

**On Windows the SDK does not restrict access to the cache.** POSIX permission modes do not become Windows access-control lists (ACLs): Python maps a mode to the read-only attribute and nothing more. The directory and the files inherit the ACL of the location they are created in, and the SDK does not set an owner-only ACL. The protection on Windows is therefore the location you choose:

- Point `CAMUNDA_TOKEN_CACHE_DIR` at a directory inside the current user's profile, such as one under `%LOCALAPPDATA%` (on POSIX, a directory only you can access, such as one under your home directory). The profile's default ACL already limits it to that user, administrators and the system.
- Do not point it at a shared location (a shared drive, a world-readable folder, a directory used by several service accounts), where any account with read access to the directory can read the cached token.
- If you cannot guarantee a per-user location, leave `CAMUNDA_TOKEN_CACHE_DIR` unset or set `CAMUNDA_TOKEN_DISK_CACHE_DISABLE=true`; the only cost is a token request on the first use of each new client (each `CamundaClient` or `CamundaAsyncClient` creates its own OAuth provider, which keeps its token in memory), rather than reusing a token cached on disk.

The SDK does not choose a default cache location for you, so there is no default to rely on: the per-user location is your choice to make.
