"""Automate step one of the version archival process.

1. Load the prod deploy workflow.
2. Add the to-be-archived version to the list of ignored tags.
"""

from ruamel.yaml import YAML
from ruamel.yaml.scalarstring import DoubleQuotedScalarString
import os
import re

def load_prod_deploy_workflow(archive_version):
    yaml = YAML()
    yaml.default_flow_style = False
    yaml.indent(mapping=2, sequence=4, offset=2)
    yaml.preserve_quotes = True
    yaml.width = 200

    publish_prod_path = "../../.github/workflows/publish-prod.yaml"
    with open(publish_prod_path) as f:
        data = yaml.load(f)

    # Ignore archive_version
    data["on"]["push"]["tags"].append(DoubleQuotedScalarString(f"!{archive_version}.[0-9]+"))
    data["on"]["push"]["tags"].append(DoubleQuotedScalarString(f"!{archive_version}.123.[0-9]+"))

    with open(publish_prod_path, "w") as f:
        yaml.dump(data, f)

def get_archive_version():
    """Get the archive version from environment variables.

    Assert the version is in the correct format.
    """

    archive_version = os.environ["ARCHIVED_VERSION"]
    assert re.match("^8.[0-9]+$", archive_version), "Set the archive version: `export ARCHIVED_VERSION=8.x`"

    return archive_version

if __name__ == "__main__":
    archive_version = get_archive_version()
    load_prod_deploy_workflow(archive_version)
