"""Postprocess the docs.

After isolating the documentation, we need to do some more processing.
This includes:

1. remove_root_references: Remove links to /docs, as that directory no longer exists.
2. update_version_banner: Update the unmaintained version banner text.
"""


import os
import re

def update_version_banner():
    with open("../../src/theme/DocVersionBanner/index.tsx") as f:
        content = f.read()
        content = re.sub(r"to=\{latestVersionSuggestedDoc\.path\}", "to='https://docs.camunda.io/'", content)
        content = re.sub(r"see \{latestVersionLink\} \(\{versionLabel\}\)", r"see \{latestVersionLink\}", content)

    with open("../../src/theme/DocVersionBanner/index.tsx", "w") as f:
        f.write(content) 

def remove_root_references():
    for dir_, _, files in os.walk("../../versioned_docs"):
        for file_ in files:
            if file_.endswith(".md"):
                with open(f"{dir_}/{file_}") as f:
                    content = f.read()
                    content = re.sub(r"\[(.+?)\]\(/docs.+?\)", r"\1", content)

                with open(f"{dir_}/{file_}", "w") as f:
                    f.write(content)

if __name__ == "__main__":
    remove_root_references()
