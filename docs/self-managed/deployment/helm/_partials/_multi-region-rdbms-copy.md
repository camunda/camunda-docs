You need a local copy of the [`aws/kubernetes/eks-multi-region-rdbms`](https://github.com/camunda/camunda-deployment-references/tree/c7f3918205404ce28c7e4324fcdd1791c857b141/aws/kubernetes/eks-multi-region-rdbms) reference architecture, from the [camunda-deployment-references](https://github.com/camunda/camunda-deployment-references) repository. It holds the Terraform modules, the Helm values, and every procedure script this documentation refers to.

The following clones the repository and changes into the architecture directory. Every command in this documentation runs from there.

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/c7f3918205404ce28c7e4324fcdd1791c857b141/aws/kubernetes/eks-multi-region-rdbms/procedure/get-your-copy.sh
```

The reference architecture is a starting point you own and extend, not a module you consume, so the workflow is to copy it into your own repository rather than reference it remotely.
