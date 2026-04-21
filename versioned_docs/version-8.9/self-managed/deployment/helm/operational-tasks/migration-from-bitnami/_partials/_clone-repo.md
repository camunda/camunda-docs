The migration scripts are part of the [Camunda deployment references](https://github.com/camunda/camunda-deployment-references) repository. Clone the repository and navigate to the migration directory:

```bash
git clone --branch stable/8.9 https://github.com/camunda/camunda-deployment-references.git
cd camunda-deployment-references/generic/kubernetes/migration
```

The migration reuses the operator-based reference architecture scripts for deploying target infrastructure, ensuring consistency:

```
generic/kubernetes/
├── operator-based/                  # Reference architecture (reused by migration)
│   ├── postgresql/
│   │   ├── deploy.sh               #   CNPG operator + cluster deployment
│   │   ├── set-secrets.sh          #   PostgreSQL secret management
│   │   ├── postgresql-clusters.yml #   ★ CUSTOMIZE: PG cluster specs
│   │   ├── camunda-identity-values.yml
│   │   └── camunda-webmodeler-values.yml
│   ├── elasticsearch/
│   │   ├── deploy.sh               #   ECK operator + cluster deployment
│   │   ├── elasticsearch-cluster.yml #   ★ CUSTOMIZE: ES cluster specs
│   │   └── camunda-elastic-values.yml
│   └── keycloak/
│       ├── deploy.sh               #   Keycloak operator + CR deployment
│       ├── keycloak-instance-*.yml #   ★ CUSTOMIZE: Keycloak CR specs
│       ├── camunda-keycloak-domain-values.yml
│       └── camunda-keycloak-no-domain-values.yml
│
└── migration/                       # Migration scripts
    ├── env.sh                       # Configuration variables
    ├── lib.sh                       # Shared library (do not edit)
    ├── 1-deploy-targets.sh          # Phase 1: Deploy operators + clusters
    ├── 2-backup.sh                  # Phase 2: Initial backup
    ├── 3-cutover.sh                 # Phase 3: Freeze → Restore → Switch
    ├── 4-validate.sh                # Phase 4: Validate everything
    ├── 5-cleanup-bitnami.sh         # Phase 5: Remove old Bitnami resources
    ├── rollback.sh                  # Emergency rollback
    ├── .state/                      # Migration state tracking (auto-generated)
    ├── hooks/                       # Custom hook scripts (optional)
    ├── jobs/                        # Kubernetes Job templates
    │   ├── pg-backup.job.yml
    │   ├── pg-restore.job.yml
    │   ├── es-backup.job.yml        #   ES health verification
    │   └── es-restore.job.yml       #   ES reindex-from-remote restore
    └── manifests/
        ├── backup-pvc.yml           # Shared backup PVC
        └── eck-migration-patch.yml  # ES reindex.remote.whitelist patch
```
