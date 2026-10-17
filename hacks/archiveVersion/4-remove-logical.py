"""Logically remove the archived version from the docs.

This script is intended to be run against the main branch and will handle
the logical removal of the archived version from the documentation.
"""

import glob
import json
import os
import re
import shutil

from archive_common import commit_changes

ARCHIVED_VERSION = os.environ["ARCHIVED_VERSION"]
DOCS_ROOT = "../../"

def _get_previous_archived_version():
    """Get the previous archived version based on the current one."""

    major, minor = map(int, ARCHIVED_VERSION.split("."))

    # When we increase the major version, we'll need to adjust this,
    # but that's not relevant for the foreseeable future. This is fine for now.
    return f"{major}.{minor - 1}"

def remove_version_from_versions_list():
    FILEPATH = "versions.json"

    with open(os.path.join(DOCS_ROOT, FILEPATH), "r") as f:
        versions = json.load(f)

    if ARCHIVED_VERSION in versions:
        versions.remove(ARCHIVED_VERSION)

    with open(os.path.join(DOCS_ROOT, FILEPATH), "w") as f:
        json.dump(versions, f)

    commit_changes(
        [FILEPATH],
        f"""archive({ARCHIVED_VERSION}): Remove archived version from versions list

This removes the archived version from the docs site dropdown menu.
""")

def define_unmaintained():
    previous_archived_version = _get_previous_archived_version()
    FILEPATH = "src/versions.js"

    with open(os.path.join(DOCS_ROOT, FILEPATH)) as f:
        content = f.read()
        content = re.sub(
            rf'^(\s*?)({{ label: "{previous_archived_version}", urlSuffix: "{previous_archived_version}" }},)', 
            (
                rf'\1{{ label: "{ARCHIVED_VERSION}", urlSuffix: "{ARCHIVED_VERSION}" }},\n'
                rf'\1\2'
            ),
            content,
            flags=re.MULTILINE,
        )

    with open(os.path.join(DOCS_ROOT, FILEPATH), "w") as f:
        f.write(content)

    commit_changes(
        [FILEPATH],
        f"""archive({ARCHIVED_VERSION}): Add the archived version to the unmaintained versions list

This adds the archived version to the docs site dropdown menu under "Unmaintained versions".
""")

def remove_version_config_block():
    FILEPATH = "docusaurus.config.js"

    with open(os.path.join(DOCS_ROOT, FILEPATH)) as f:
        content = f.read()

    # The config block holds flat key/value pairs only, so `[^{}]*` stops safely at its closing curly brace.
    content = re.sub(
        rf'^[ \t]*{re.escape(ARCHIVED_VERSION)}: \{{[^{{}}]*\}},[ \t]*\n',
        "",
        content,
        flags=re.MULTILINE,
    )

    with open(os.path.join(DOCS_ROOT, FILEPATH), "w") as f:
        f.write(content)

    commit_changes(
        [FILEPATH],
        f"""archive({ARCHIVED_VERSION}): Remove version config block

This removes certain configurations related to the archived version, including:

- The config that prevents the banner from being shown for the archived version.
- API docs generator configs for the archived version.
""")

def remove_sitemap_ignore_pattern():
    FILEPATH = "docusaurus.config.js"

    with open(os.path.join(DOCS_ROOT, FILEPATH)) as f:
        content = f.read()

    content = re.sub(
        rf'^[ \t]*"/docs/{re.escape(ARCHIVED_VERSION)}/\*\*",[ \t]*\n',
        "",
        content,
        flags=re.MULTILINE,
    )

    with open(os.path.join(DOCS_ROOT, FILEPATH), "w") as f:
        f.write(content)

    commit_changes(
        [FILEPATH],
        f"""archive({ARCHIVED_VERSION}): Remove sitemap ignore pattern

Since the archived version is no longer maintained and its files have been removed from the docs site, we no longer need to explicitly ignore its files when indexing the site. 
""")

def remove_release_notes_sidebar_category():
    """Remove the `{ type: "category", label: "<version>", ... }` entry from the sidebars.

    Handles both sidebars.js (unquoted keys) and the versioned sidebars JSON (quoted keys).
    The archived version's own sidebars file is skipped, as it's deleted by a later step.
    """

    own_sidebars = f"version-{ARCHIVED_VERSION}-sidebars.json"
    paths = ["../../sidebars.js"] + [
        path
        for path in sorted(glob.glob("../../versioned_sidebars/version-*-sidebars.json"))
        if os.path.basename(path) != own_sidebars
    ]

    # The category's `link` is the only nested object and `items` is a flat list of doc IDs,
    # so `[^{}]*` and `[^\]]*` safely stop at their closing brackets.
    pattern = re.compile(
        r'^[ \t]*\{\s*"?type"?: "category",\s*"?label"?: "' + re.escape(ARCHIVED_VERSION) + r'",'
        r'\s*"?link"?: \{[^{}]*\},\s*"?items"?: \[[^\]]*\],?\s*\},?[ \t]*\n',
        flags=re.MULTILINE,
    )

    for path in paths:
        with open(path) as f:
            content = f.read()

        content = pattern.sub("", content)

        with open(path, "w") as f:
            f.write(content)

    commit_changes(
        ["/".join(path.split("/")[2:]) for path in paths],
        f"""archive({ARCHIVED_VERSION}): Remove release notes sidebar category

Every maintained version of the docs includes a reference to the archived version's release notes. Since the version is archived, we no longer need to maintain those references.
This commit removes the references from all relevant sidebars.
""")

if __name__ == "__main__":
    remove_version_from_versions_list()
    define_unmaintained()
    remove_version_config_block()
    remove_sitemap_ignore_pattern()
    remove_release_notes_sidebar_category()
    # remove_links_to_release_notes()
    # update_links_to_unsupported_site()
