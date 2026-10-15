"""Automate step one of the version archival process.

1. Load the prod deploy workflow.
2. Add the to-be-archived version to the list of ignored tags.
"""


from ruamel.yaml import YAML
from ruamel.yaml.scalarstring import DoubleQuotedScalarString
from archive_common import commit_changes
import os
import re

DOCS_ROOT = "../../"

def load_prod_deploy_workflow(archived_version):
    yaml = YAML()
    yaml.default_flow_style = False
    yaml.indent(mapping=2, sequence=4, offset=2)
    yaml.preserve_quotes = True
    yaml.width = 200

    publish_prod_path = os.path.join(DOCS_ROOT, ".github/workflows/publish-prod.yaml")
    with open(publish_prod_path) as f:
        data = yaml.load(f)

    # Ignore archived_version
    data["on"]["push"]["tags"].append(DoubleQuotedScalarString(f"!{archived_version}.[0-9]+"))

    with open(publish_prod_path, "w") as f:
        yaml.dump(data, f)

def get_archived_version():
    """Get the archived version from environment variables.

    Assert the version is in the correct format.
    """

    archived_version = os.environ["ARCHIVED_VERSION"]
    assert re.match("^8.[0-9]+$", archived_version), "Set the archive version: `export ARCHIVED_VERSION=8.x`"

    return archived_version

if __name__ == "__main__":
    archived_version = get_archived_version()
    load_prod_deploy_workflow(archived_version)

    commit_changes(
        [".github/workflows/publish-prod.yaml"],
        f"""archive({archived_version}): Ignore archived version in prod deploy workflow.

We publish our documentation to production by creating a new tag from maintained versions.
This change prevents production deployments for tags for the archived version.
"""
    )
