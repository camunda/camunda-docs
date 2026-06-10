# Catalog Collection Repository

This is an example collection repository for syncing element templates to the [Camunda Hub Catalog](https://docs.camunda.io).

## How it works

Each subdirectory represents a single catalog asset and contains:

- A `README.md` with metadata in the frontmatter and a description in the body.
- An element template file (`.json`).

When changes are pushed to `main`, a GitHub Actions workflow authenticates with Camunda 8 and submits all assets to the Hub Catalog ingestion endpoint (`PUT /api/v2/catalog/assets/ingestion`) as a single `multipart/form-data` request representing the full desired state of the Catalog.

## Repository structure

```
├── .github/workflows/
│   └── sync-catalog.yml        # GitHub Actions workflow
├── scripts/
│   └── sync-to-hub.sh          # Script to authenticate and submit assets
├── payment-connector/
│   ├── README.md
│   └── payment-connector.json
└── approval-task/
    ├── README.md
    └── approval-task.json
```

## Setup

### 1. Create API credentials

1. In Camunda Console, go to **Organization > Administration API > Create new credentials**.
2. Add permissions for the **Web Modeler API**, including the `create` and `update` permissions (required by the ingestion endpoint).
3. Note the **Client ID** and **Client Secret**.

> On Self-Managed, create an M2M application in Management Identity instead, and point `CAMUNDA_OAUTH_URL` / `CAMUNDA_CATALOG_BASE_URL` at your own installation. See the [getting started guide](https://docs.camunda.io) for the Self-Managed configuration.

### 2. Configure GitHub secrets

Add the following secrets to your GitHub repository under **Settings > Secrets and variables > Actions**:

| Secret                          | Description               |
| ------------------------------- | ------------------------- |
| `CAMUNDA_CONSOLE_CLIENT_ID`     | Client ID from step 1     |
| `CAMUNDA_CONSOLE_CLIENT_SECRET` | Client secret from step 1 |

### 3. Add assets

Create a directory for each element template with a `README.md` and the `.json` template file. Push to `main` to trigger the sync.

## Adding assets from project repositories

Configure CI/CD in each project repository to copy element templates into this collection repository. See the [getting started guide](https://docs.camunda.io) for details.
