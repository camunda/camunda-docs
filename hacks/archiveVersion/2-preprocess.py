"""Preprocess the docs.

After isolating the documentation, we need to do some more processing.
This includes:

1. remove_root_references: Remove links to /docs.
2. update_version_banner: Update the unmaintained version banner text.
3. remove_build_with_camunda: Remove build with Camunda page.
4. replace_homepage: Replace the homepage with a simplified version, removing problematic components and links.
5. fix_image_references: Fix invalid image references.
"""


import os
import re
import shutil

ARCHIVED_VERSION = os.environ["ARCHIVED_VERSION"]

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

def _replace_if_another_version(match):
    m = re.search(r"/version-(8\.\d+)/", match.group(2))
    if m and m.group(1) != ARCHIVED_VERSION:
        return match.group(1)
    return match.group(0)

def remove_root_references():
    markdown_link_pattern = r"\[(.+?)\]\((.+?)\)"

    for dir_, _, files in os.walk("../../versioned_docs"):
        for file_ in files:
            if file_.endswith(".md"):
                with open(f"{dir_}/{file_}") as f:
                    content = f.read()
                    content = re.sub(markdown_link_pattern, _replace_if_root_reference, content)
                    content = re.sub(markdown_link_pattern, _replace_if_another_version, content)
                    content = re.sub(r"href:\s*\"\/docs\/8.6\/(.+?)\"", "href:\"/docs/\\1\"", content)
                    content = re.sub(r"href:\s*\"\/docs\/next\/(.+?)\"", "href:\"/docs/\\1\"", content)

                with open(f"{dir_}/{file_}", "w") as f:
                    f.write(content)

def fix_image_references():
    with open("../../docusaurus.config.js") as f:
        content = f.read()
        content = re.sub(r'img src="/8\.\d+/img/twitter\.svg"', 'img src="/img/twitter.svg"', content)
        content = re.sub(r'img src="/8\.\d+/img/github-mark-white\.svg"', 'img src="/img/github-mark-white.svg"', content)

    with open("../../docusaurus.config.js", "w") as f:
        f.write(content)

def remove_build_with_camunda():
    """Remove build-with-camunda files.

    They aren't rendered or needed in this context, and they link to root docs, causing build errors.
    """
    os.remove("../../src/pages/build-with-camunda.js")
    os.remove("../../src/pages/build-with-camunda.module.css")

def replace_homepage():
    shutil.copyfile("./templates/homepage.js", "../../src/pages/index.js")

if __name__ == "__main__":
    remove_root_references()
    update_version_banner()
    remove_build_with_camunda()
    replace_homepage()
    fix_image_references()
