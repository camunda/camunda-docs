:::warning
Once you delete the old Bitnami PVCs (during post-migration cleanup), rollback is no longer trivial. Keep the old resources until your team has observed the system under production load through at least one full business cycle (for example, a complete weekday with peak traffic). Only proceed with cleanup once you are confident the new infrastructure is stable.
:::
