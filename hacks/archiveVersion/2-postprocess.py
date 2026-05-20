"""Postprocess the docs.

After isolating the documentation, we need to do some more processing.
This includes:

1. remove_root_references: Remove links to /docs, as that directory no longer exists.
2. update_version_banner: Update the unmaintained version banner text.
3. remove_build_with_camunda: Remove build with Camunda page.
"""


import os
import re

def update_version_banner():
    with open("../../src/theme/DocVersionBanner/index.tsx") as f:
        content = f.read()
        content = re.sub(r"to=\{latestVersionSuggestedDoc\.path\}", "to='https://docs.camunda.io/'", content)
        content = re.sub(r"see \{latestVersionLink\} \(\{versionLabel\}\)", "see {latestVersionLink}", content)

    with open("../../src/theme/DocVersionBanner/index.tsx", "w") as f:
        f.write(content) 

def _replace_if_root_reference(match):
    if match.group(2).startswith("/docs"):
        return match.group(1)
    return match.group(0)

def remove_root_references():
    for dir_, _, files in os.walk("../../versioned_docs"):
        for file_ in files:
            if file_.endswith(".md"):
                with open(f"{dir_}/{file_}") as f:
                    content = f.read()
                    content = re.sub(r"\[(.+?)\]\((.+?)\)", _replace_if_root_reference, content)

                with open(f"{dir_}/{file_}", "w") as f:
                    f.write(content)

def remove_build_with_camunda():
    """Remove build-with-camunda files.

    They aren't rendered or needed in this context, and they link to root docs, causing build errors.
    """
    os.remove("../../src/pages/build-with-camunda.js")
    os.remove("../../src/pages/build-with-camunda.module.css")

if __name__ == "__main__":
    remove_root_references()
    update_version_banner()
    remove_build_with_camunda()
