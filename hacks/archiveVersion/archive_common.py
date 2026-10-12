"""Shared helpers for the logical and physical removal steps."""

from git import Repo
import glob
import os
import re

ARCHIVED_VERSION = os.environ["ARCHIVED_VERSION"]
DOCS_ROOT = "../.."


def get_other_docs_paths():
    """Docs directories of every version."""
    return [os.path.join(DOCS_ROOT, "docs")] + sorted(glob.glob(os.path.join(DOCS_ROOT, "versioned_docs", "version-*")))


def get_release_notes_directory_name():
    """The version without the dot plus a patch of 0 (8.7 -> 870, 8.10 -> 8100)."""
    return ARCHIVED_VERSION.replace(".", "") + "0"


def get_release_notes_paths():
    """The archived version's release notes and announcements directory in each other docs."""
    directory = get_release_notes_directory_name()
    return [
        os.path.join(docs_path, "reference", "announcements-release-notes", directory)
        for docs_path in get_other_docs_paths()
    ]


def get_release_notes_files():
    """Every file in the archived version's release notes directories, as absolute paths."""
    files = set()
    for path in get_release_notes_paths():
        for root, _, names in os.walk(path):
            files.update(os.path.realpath(os.path.join(root, name)) for name in names)
    return files


def get_paths_to_delete():
    """Files and directories deleted by the physical removal step."""
    return [
        os.path.join(DOCS_ROOT, "versioned_docs", f"version-{ARCHIVED_VERSION}"),
        os.path.join(DOCS_ROOT, "versioned_sidebars", f"version-{ARCHIVED_VERSION}-sidebars.json"),
    ]

def append_redirect_rules_to_section(file_path, section_heading, rules):
    """Append redirect rules to a section in .htaccess."""

    with open(file_path) as f:
        content = f.read()
        content = re.sub(rf"^(#[#-]+\n#[ \t]*{re.escape(section_heading)}\n#[#-]+\n[\s\S]*?)(#[#-]+\n)", rf"\1{rules}\2", content, flags=re.MULTILINE)

    with open(file_path, "w") as f:
        f.write(content)

def commit_changes(add_files, message):
    """Commit the changes to the repository."""

    repo = Repo(DOCS_ROOT)
    repo.git.add(add_files)
    repo.index.commit(message)