#!/usr/bin/env python3

import os 
import re
import json

from dataclasses import dataclass

from github import Github, GitRelease

GITHUB_TOKEN=os.getenv('GITHUB_TOKEN')

LATEST_VERSION="8.6"
EXPORT_FILENAME="c8_run_versions.json"

@dataclass
class C8RunReleaseArtifact:
    version: str  # x.y.z
    architecture: str
    download: str
    link: str

    def __dict__(self) -> dict:
        return {
            # "version": self.version,
            "system": self.architecture,
            # "operating_system": get_operating_system(self.architecture),
            "download": self.download,
            # "link": self.link,
            "links": [
                {"link": self.link, "description": "Release Notes"}
            ]
        }

@dataclass
class C8RunRelease:
    version: str # x.y.z
    artifacts: list[C8RunReleaseArtifact]

    def __dict__(self) -> dict:
        return [a.__dict__() for a in self.artifacts]

@dataclass 
class C8RunReleaseMinor:
    version: str  # minor version
    releases: list[C8RunRelease]


def get_minor_version(full_version: str) -> str:
    match = re.match(r"^(\d+\.\d+)\.\d+$", full_version)
    return match.group(1) if match else full_version

def get_operating_system(arch: str) -> str:
    if arch == 'linux':
        return 'Linux'
    if arch == 'windows':
        return 'Windows'
    if arch.startswith('darwin'):
        return 'MacOS'

def fetch_github_releases(repo_owner, repo_name, token):
    g = Github(token)
    repo = g.get_repo(f"{repo_owner}/{repo_name}")
    
    semver_pattern = re.compile(r"^\d+\.\d+\.\d+$")
    filtered_releases = []
    
    for release in repo.get_releases():
        if release.tag_name.startswith('8.6') and semver_pattern.match(release.tag_name):
            assets = release.get_assets()
            if any(asset.name.startswith("camunda8-run-") for asset in assets):
                filtered_releases.append(release)
    
    return filtered_releases


def get_c8_run_release_from_github_release(release: GitRelease) -> C8RunRelease:
    all_arches = ['linux', 'windows', 'darwin-x86_64', 'darwin-aarch64']
    releases: list[C8RunReleaseArtifact] = []
    for arch in all_arches:
        download_link = f'https://github.com/camunda/camunda/releases/download/{release.tag_name}/camunda8-run-{release.tag_name}-{arch}.tar.gz'
        rel = C8RunReleaseArtifact(version=release.tag_name, architecture=arch, link=release.html_url, download=download_link)
        releases.append(rel)
    return C8RunRelease(release.tag_name, releases)


def get_c8_run_releases() -> list[C8RunRelease]:
    repo_owner = "camunda"
    repo_name = "camunda"
    result: list[C8RunRelease] = []

    github_token = GITHUB_TOKEN
    releases = fetch_github_releases(repo_owner, repo_name, github_token)
    print("Filtered Releases:", releases)
    for release in releases:
        family = get_c8_run_release_from_github_release(release)
        result.append(family)
    return result

def group_by_minor_version(releases: list[C8RunRelease]) -> list[C8RunReleaseMinor]:
    minor_version_map = {}

    for release in releases:
        minor_version = get_minor_version(release.version)
        if minor_version not in minor_version_map:
            minor_version_map[minor_version] = []
        minor_version_map[minor_version].append(release)

    return [C8RunReleaseMinor(version=minor, releases=sorted(rels, key=lambda r: r.version, reverse=True))
            for minor, rels in minor_version_map.items()]

def dump_c8_versions(releases_minor: list[C8RunReleaseMinor]) -> dict:
    # breakpoint()
    return {
        minor.version: {
            release.version: release.__dict__() for release in minor.releases
        }
        for minor in releases_minor
    }

def save_dict_to_json(data, file_path):
    print(f"Saving to file {file_path}")

    directory = os.path.dirname(file_path)

    if directory and not os.path.exists(directory):
        print(f"Directory '{directory}' does not exist. Skipping JSON save.")
        return

    if not os.path.exists(file_path):
        with open(file_path, "w", encoding="utf-8") as f:
            f.write("{}")

    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

    print(f"JSON file '{file_path}' saved successfully!")

def main():
    c8_run_releases: list[C8RunReleaseArtifact] = get_c8_run_releases()
    c8_run_minor: list[C8RunReleaseMinor] = group_by_minor_version(c8_run_releases)
    c8_run_dump = dump_c8_versions(c8_run_minor)
    print(json.dumps(c8_run_dump,
        sort_keys=False,
        indent=4,
        separators=(',', ': ')
    ))
    
    for version in c8_run_minor:
        # breakpoint()
        export_filename = f"../versioned_docs/version-{version.version}/download-hub/{EXPORT_FILENAME}"
        print(f"Dumping version {version.version} to file {export_filename}")
        dump = {release.version: release.__dict__() for release in version.releases}
        save_dict_to_json(dump, export_filename)

        if version.version == LATEST_VERSION:
            export_filename = f"../docs/download-hub/{EXPORT_FILENAME}"
            print(f"Dumping version {version.version} to file {export_filename}")
            save_dict_to_json(dump, export_filename)

    # breakpoint()

if __name__ == '__main__':
    main()
