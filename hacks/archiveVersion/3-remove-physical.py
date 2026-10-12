import os
import shutil

from archive_common import get_paths_to_delete, get_release_notes_paths, commit_changes

DOCS_ROOT = "../../"
ARCHIVED_VERSION = os.environ["ARCHIVED_VERSION"]

def delete_paths(paths_to_delete):
    for path in paths_to_delete:
        if os.path.isdir(path):
            shutil.rmtree(path)
        elif os.path.isfile(path):
            os.remove(path)

def remove_release_notes_directories(release_notes_paths):
    """Delete the archived version's release notes and announcements directory in the other docs."""
    for path in release_notes_paths:
        if os.path.isdir(path):
            shutil.rmtree(path)

if __name__ == "__main__":
    archived_docs_paths = get_paths_to_delete()
    release_notes_paths = get_release_notes_paths()

    delete_paths(archived_docs_paths)
    remove_release_notes_directories(release_notes_paths)

    commit_changes(
        archived_docs_paths + release_notes_paths, 
        f"""archive({ARCHIVED_VERSION}): Physically remove archived version files

No line-by-line review needed.

This removes the following content: 

- All archived version files that were already isolated in an `unsupported` branch in a previous step.
- The release notes associated with the archived version in all the remaining maintained version directories.
""")
