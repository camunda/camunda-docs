Typically, `sync-hub-api.js` is used in the `update-postman.yaml` GitHub Actions workflow. This runs when a tech writer publishes the docs site.

## Script overview

1. Checks if the Postman workspace already has the collection you're trying to sync.
2. If the collection exists, update it with the latest specs.
3. If the collection doesn't exist, create it with the latest specs.

## Sync an API with the official Camunda Postman workspace

1. Set the following environment variables:

```bash
export POSTMAN_API_KEY=""
export WORKSPACE_ID=""
```

2. Run the sync script:

```bash
node sync-hub-api.js <API_TARGET> --dry-run
```

Remove the `--dry-run` flag when the output looks correct.

The possible values for `<API_TARGET>` are:

- `hubsm`
- `hubsaas`
