:::tip Localhost development with kubefwd
For a richer localhost experience (and to avoid managing many individual port-forward commands), you can use [kubefwd](https://github.com/txn2/kubefwd) to forward all Services in the target namespace and make them resolvable by their in-cluster DNS names on your workstation.

Example (requires `sudo` to bind privileged ports and modify `/etc/hosts`):

```shell
sudo kubefwd services -n "$CAMUNDA_NAMESPACE"
```

After this runs, you can reach services directly, for example:

- Identity: `http://$CAMUNDA_RELEASE_NAME-identity/managementidentity`
- Zeebe Gateway gRPC: `$CAMUNDA_RELEASE_NAME-zeebe-gateway:26500`

You can still use localhost ports if you prefer traditional port-forwarding. Stop kubefwd with **Ctrl+C** when finished. Be aware kubefwd modifies your `/etc/hosts` temporarily; it restores the file when it exits.
:::
