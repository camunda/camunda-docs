import os
import shutil

from archive_common import get_versioned_docs_paths, commit_changes

DOCS_ROOT = "../../"
ARCHIVED_VERSION = os.environ["ARCHIVED_VERSION"]

def _get_archived_docs_paths():
    return [
        os.path.join("versioned_docs", f"version-{ARCHIVED_VERSION}"),
        os.path.join("versioned_sidebars", f"version-{ARCHIVED_VERSION}-sidebars.json"),
    ]

def _get_release_notes_paths():
    """The archived version's release notes and announcements directory in each other docs."""
    directory = ARCHIVED_VERSION.replace(".", "") + "0"
    return [
        os.path.join(docs_path, "reference", "announcements-release-notes", directory)
        for docs_path in get_versioned_docs_paths()
    ]

def delete_paths(paths_to_delete):
    for path in paths_to_delete:
        relative_path = os.path.join(DOCS_ROOT, path)

        if os.path.isdir(relative_path):
            shutil.rmtree(relative_path)
        elif os.path.isfile(relative_path):
            os.remove(relative_path)

if __name__ == "__main__":
    paths_to_delete = _get_archived_docs_paths() + _get_release_notes_paths()
    delete_paths(paths_to_delete)

    commit_changes(
        paths_to_delete, 
        f"""archive({ARCHIVED_VERSION}): Physically remove archived version files

No line-by-line review needed.

This removes the following content: 

- All archived version files that were already isolated in an `unsupported` branch in a previous step.
- The release notes associated with the archived version in all the remaining maintained version directories.
""")
