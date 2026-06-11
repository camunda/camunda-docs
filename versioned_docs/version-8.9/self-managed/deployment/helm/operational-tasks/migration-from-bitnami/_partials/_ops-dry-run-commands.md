The migration scripts support a `--dry-run` flag that shows what would be executed without making changes:

```bash
bash 1-deploy-targets.sh --dry-run
bash 2-backup.sh --dry-run
bash 3-cutover.sh --dry-run
```
