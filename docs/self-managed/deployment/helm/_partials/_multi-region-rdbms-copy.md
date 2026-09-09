You need a local copy of the [`aws/kubernetes/eks-multi-region-rdbms`](https://github.com/camunda/camunda-deployment-references/tree/fb0e87ac97909e6b6142a2bc27e75be79dcce94d/aws/kubernetes/eks-multi-region-rdbms) reference architecture, from the [camunda-deployment-references](https://github.com/camunda/camunda-deployment-references) repository. It holds the Terraform modules, the Helm values, and every procedure script this documentation refers to.

The following clones the repository and changes into the architecture directory. Every command in this documentation runs from there.

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/fb0e87ac97909e6b6142a2bc27e75be79dcce94d/aws/kubernetes/eks-multi-region-rdbms/procedure/get-your-copy.sh
```

The reference architecture is a starting point you own and extend, not a module you consume, so the workflow is to copy it into your own repository rather than reference it remotely.
