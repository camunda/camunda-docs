"""Update redirects related to the archived version.

This is to be run against in a branch that targets main, not an unsupported branch.
"""

import re
import os
from archive_common import append_redirect_rules_to_section, commit_changes

DOCS_ROOT = "../../"
ARCHIVED_VERSION = os.environ["ARCHIVED_VERSION"]
HTACCESS_FILE = "static/.htaccess"

def _get_previous_archived_version():
    """Get the previous archived version based on the current one."""

    major, minor = map(int, ARCHIVED_VERSION.split("."))

    # When we increase the major version, we'll need to adjust this,
    # but that's not relevant for the foreseeable future. This is fine for now.
    return f"{major}.{minor - 1}"

def create_catchall_redirect():
    """Create a catchall redirect for the archived version."""

    previous_archived_version = re.escape(_get_previous_archived_version())

    # Append last catchall redirect with the new catchall redirect
    with open(os.path.join(DOCS_ROOT, HTACCESS_FILE)) as f:
        content = f.read()
        content = re.sub(
            rf"^(RewriteRule \^docs\/{previous_archived_version}\/\(\.\*\)\$ https:\/\/unsupported\.docs\.camunda\.io\/{previous_archived_version}\/docs\/\$1 \[R=301,L\])$", 
            (
                rf"\1\n"
                f"RewriteRule ^docs/{ARCHIVED_VERSION}/(.*)$ https://unsupported.docs.camunda.io/{ARCHIVED_VERSION}/docs/$1 [R=301,L]"
            ),
            content, 
            flags=re.MULTILINE
        )

        with open(os.path.join(DOCS_ROOT, HTACCESS_FILE), "w") as f:
            f.write(content)

def delete_redirects_from_archived_version():
    """Delete individual redirects for the archived version.
    
    We no longer need to maintain redirects from the archived version.
    For example, if we're archiving 8.7, we do not need to support:
    /docs/8.7/some-page -> /docs/8.7/some-other-page
    /docs/8.7/some-page -> /docs/8.8/some-other-page
    """

    with open(os.path.join(DOCS_ROOT, HTACCESS_FILE)) as f:
        pattern = rf"(?:#.*\n)*RewriteRule \^\/?docs\/{re.escape(ARCHIVED_VERSION)}.*? .*? \[R=30[12],L\]\n"

        content = f.read()
        content = re.sub(pattern, "", content, flags=re.MULTILINE)

        with open(os.path.join(DOCS_ROOT, HTACCESS_FILE), "w") as f:
            f.write(content)

def delete_redirects_section():
    """Delete section of redirects for the archived version."""

    with open(os.path.join(DOCS_ROOT, HTACCESS_FILE)) as f:
        content = f.read()
        content = re.sub(rf"^#-+\n#[ \t]*{re.escape(ARCHIVED_VERSION)}:.*?\n#-+\n[\s\S]*?(#[#-]+\n)", r"\1", content, flags=re.MULTILINE)

        with open(os.path.join(DOCS_ROOT, HTACCESS_FILE), "w") as f:
            f.write(content)

def add_redirect_rules_for_archived_release_notes():
    directory_name = "".join(ARCHIVED_VERSION.split(".")) + "0"

    append_redirect_rules_to_section(
        os.path.join(DOCS_ROOT, HTACCESS_FILE),
        section_heading="1. Universal rules",
        rules=f"""# Removal of {ARCHIVED_VERSION} announcements/release notes
RewriteRule ^docs/next/reference/announcements-release-notes/{directory_name}/(.*)$ /docs/next/reference/announcements-release-notes/overview/$1 [R=301,L]
RewriteRule ^docs/reference/announcements-release-notes/{directory_name}/{directory_name}-announcements/?$ /docs/next/reference/announcements-release-notes/overview/ [R=301,L]

"""
    )

if __name__ == "__main__":
    # Add new redirects for the archived version
    create_catchall_redirect()
    add_redirect_rules_for_archived_release_notes()

    # Delete redirects for the archived version
    delete_redirects_from_archived_version()
    delete_redirects_section()

    commit_changes(
        [HTACCESS_FILE], 
        f"""archive({ARCHIVED_VERSION}): Update redirects

1. Create a catchall redirect to send all requests for the archived version to the unsupported docs site.
2. Redirect all requests for the archived version's release notes in current and next docs to the corresponding overview page.
3. Delete redirects _from_ the archived version. Because of the catchall, these redirects are no longer necessary. They're handled by the unsupported site.
4. Delete the entire {ARCHIVED_VERSION} section. These are no longer necessary.
""")