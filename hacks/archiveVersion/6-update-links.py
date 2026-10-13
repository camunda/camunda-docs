from archive_common import get_versioned_docs_paths, commit_changes
import re
import os
import glob

ARCHIVED_VERSION = os.environ["ARCHIVED_VERSION"]
DOCS_ROOT = "../../"

def _remove_links_from_file(path, archived_version_reference):
    # In release announcements tables, we reference previous versions. We need to remove references to
    # the archived version.
    release_announcements_table_rows = rf"\<tr\>\n\<td\>.+?\<\/td\>\n\<td\>.+?\<\/td\>\n\<td\>.+?{archived_version_reference}.+?\<\/td\>\n\<td\>.+?{archived_version_reference}.+?\<\/td\>\n\<td\>.+?\<\/td\>\n\<\/tr\>"

    # It's common for release notes and docs to be linked from parentheticals if something changed in a particular version.
    # In these cases, it's more common to remove the entire admonition rather than just the link. Only counts sentences 
    # that start with particular prefixes, like "see" and "refer to".
    parenthetical_linking_to_archived_release_notes = rf"[ \t]\([^\(\)]*?\[(.+?)\]\(.+?{archived_version_reference}.+?\).*?\)"

    # Remove any remaining sentences that reference the archived release notes or archived documentation.
    # A sentence boundary is a period followed by whitespace or end of line, so periods inside version
    # numbers (8.9.18) or file names don't split sentences. Only counts sentences that start with particular prefixes, 
    # like "see" and "refer to".
    sentence_end = r"\.(?:[ \t]|$)"
    sentences_linking_to_archived_release_notes = re.compile(
        rf"(?:^|(?<=\.[ \t]))(?:[sS]ee |[rR]efer to )(?:(?!{sentence_end})[^\n])*?\[(.+?)\]\(.+?{archived_version_reference}.+?\)(?:(?!{sentence_end})[^\n])*\.?[ \t]*",
        flags=re.MULTILINE,
    )

    # After we've removed the links, we may be left with empty admonitions. Remove those, too.
    admonition_linking_to_release_notes = rf":::.+?\n[\n \t]*?:::"

    link_to_archived_release_notes = rf"\[(.+?)\]\(.+?{archived_version_reference}(.+?)\)"

    with open(path) as f:
        content = f.read()

        if archived_version_reference not in content:
            return False

        content, num_rows = re.subn(release_announcements_table_rows, "", content, flags=re.MULTILINE)
        content, num_parentheticals = re.subn(parenthetical_linking_to_archived_release_notes, "", content, flags=re.MULTILINE)
        content, num_sentences = sentences_linking_to_archived_release_notes.subn("", content)
        content, num_admonitions = re.subn(admonition_linking_to_release_notes, "", content, flags=re.MULTILINE)
        content, num_links = re.subn(
            link_to_archived_release_notes,
            rf"[\1](https://unsupported.docs.camunda.io/{ARCHIVED_VERSION}/docs/\2)", 
            content, 
            flags=re.MULTILINE,
        )

        should_write = bool(
            num_rows 
            + num_parentheticals 
            + num_sentences 
            + num_admonitions 
            + num_links
        )

    if should_write:                
        with open(path, "w") as f:
            f.write(content)

    return should_write

def remove_links_to_archived_version():
    """Remove all links to archived release notes"""
    changed_files = set()

    # Release notes reference
    undelimited_archive_version = "".join(ARCHIVED_VERSION.split(".")) + "0"
    release_notes_reference = f"{undelimited_archive_version}/"
    docs_reference = f"version-{ARCHIVED_VERSION}/"

    for docs_path in get_versioned_docs_paths():
        for dir_, _, files in os.walk(os.path.join(DOCS_ROOT, docs_path)):
            for file_ in files:
                if not file_.endswith((".md", ".mdx")):
                    continue

                path = os.path.join(dir_, file_)

                # Update links that reference release notes
                if _remove_links_from_file(path, release_notes_reference):
                    path_from_root = "/".join(path.split("/")[2:])
                    changed_files.add(path_from_root)

                # Update links that reference release notes
                if _remove_links_from_file(path, docs_reference):
                    path_from_root = "/".join(path.split("/")[2:])
                    changed_files.add(path_from_root)

    return list(changed_files)

def update_links_to_unsupported_site():
    """Update browser links 

    Typically, we link to documentation via local, file-based paths. These local
    links are removed or changed when we archive the version they point to.

    In a certain cases, usually in Self-Managed upgrade guides, we want to maintain
    the links to the docs even after the version has been archived. These use browser 
    link format in HTML anchor tags.

    This function updates the browser links to point to the unsupported docs site instead
    of removing them.
    """
    changed_files = []
    docs_paths = [os.path.join(DOCS_ROOT, "docs")] + [
        path
        for path in sorted(glob.glob(f"{DOCS_ROOT}versioned_docs/version-*"))
    ]

    # Only match root-relative paths, not `/docs/<version>/` inside an absolute URL.
    pattern = re.compile(rf'href="\/docs\/{re.escape(ARCHIVED_VERSION)}\/(.*?)"')
    replacement = rf'href="https://unsupported.docs.camunda.io/{ARCHIVED_VERSION}/docs/\1"'

    for docs_path in docs_paths:
        for root, _, files in os.walk(docs_path):
            for name in files:
                if not name.endswith((".md", ".mdx")):
                    continue

                path = os.path.join(root, name)
                with open(path) as f:
                    content = f.read()

                updated = pattern.sub(replacement, content)
                if updated != content:
                    with open(path, "w") as f:
                        f.write(updated)

                    path_from_root = "/".join(path.split("/")[2:])
                    changed_files.append(path_from_root)

    return changed_files

if __name__ == "__main__":
    changed_files = []

    changed_files += update_links_to_unsupported_site()
    changed_files += remove_links_to_archived_version()

    commit_changes(
    changed_files,
    f"""archive({ARCHIVED_VERSION}): Update links to archived release notes and documentation

Since release notes and documentation for the archived version have been removed, all links pointing to them must also be adjusted.

This commit is opinionated and makes the following changes:

- Update browser links to point to the unsupported docs site.
- Remove rows from release announcements tables that reference an archived release note.
- Remove parentheticals that reference an archived release note or archived documentation.
- Remove full sentences that start with "see" or "refer to" and reference an archived release note or archived documentation.
- Remove admonitions that, after the other removals, are now empty.
- Update any remaining links that reference an archived release note or archived documentation to an unsupported site link.

If this doesn't take an appropriate action for a particular link, feel free to edit the commit.
""")