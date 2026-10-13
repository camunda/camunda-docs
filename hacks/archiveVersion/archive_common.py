"""Shared helpers for the logical and physical removal steps."""

from git import Repo
import glob
import os
import re

ARCHIVED_VERSION = os.environ["ARCHIVED_VERSION"]
DOCS_ROOT = "../.."


def get_versioned_docs_paths():
    """Docs directories of every version."""
    return [os.path.join("docs")] + sorted(glob.glob(os.path.join("versioned_docs", "version-*")))

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