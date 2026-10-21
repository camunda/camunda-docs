The application exits after restore and Kubernetes restarts the pod, which appears as `CrashLoopBackOff`. This is expected behavior. The restore application does not restore state again once partitions are already restored to persistent disk.

After removing the temporary restore command, or unsetting `ZEEBE_RESTORE` and the related restore environment variables to restore Zeebe's default behavior, you may optionally restart the StatefulSet to ensure the changes take effect immediately. This can be done by [scaling](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) the StatefulSet down and back up, or by [deleting](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/) the pods so they are recreated with the newly deployed revision.

:::tip
In Kubernetes, Zeebe runs as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), which is intended for long-running, persistent applications. Because StatefulSet pods are restarted automatically, restore-mode pods can appear in `CrashLoopBackOff` after a successful restore. Observe Zeebe Broker logs during restore. If a pod has already restarted, use `--previous` to view logs from the completed restore run:

```bash
kubectl logs <zeebe-pod-name> --previous
```

The restore app will not import or overwrite data again, but you may miss the first successful run if you are not observing logs actively.
:::
