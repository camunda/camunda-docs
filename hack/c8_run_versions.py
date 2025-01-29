import os 
import re
import requests
import json

from dataclasses import dataclass

from github import Github, GitRelease

GITHUB_TOKEN=os.getenv('GITHUB_TOKEN')

@dataclass
class C8RunReleaseArtifact:
    version: str  # x.y.z
    architecture: str
    download: str
    link: str

    def __dict__(self) -> dict:
        return {
            # "version": self.version,
            "architecture": self.architecture,
            "download": self.download,
            "link": self.link
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

def main():
    c8_run_releases: list[C8RunReleaseArtifact] = get_c8_run_releases()
    c8_run_minor: list[C8RunReleaseMinor] = group_by_minor_version(c8_run_releases)
    c8_run_dump = dump_c8_versions(c8_run_minor)
    print(json.dumps(c8_run_dump,
        sort_keys=False,
        indent=4,
        separators=(',', ': ')
    ))
    # breakpoint()

if __name__ == '__main__':
    main()
