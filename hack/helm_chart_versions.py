import csv
import re
from collections import defaultdict
from dataclasses import dataclass

import json

SOURCE_FILE="helm_chart_mappings.csv"  # exported from https://github.com/camunda/camunda-platform-helm/blob/main/version-matrix.sqlite, POC

@dataclass
class HelmChartArtifact:
    version: str  # x.y.z | example: 11.1.0
    camunda_version: str # x.y | example: 8.6
    download: str  # GitHub | example: https://github.com/camunda/camunda-platform-helm/releases/tag/camunda-platform-11.1.0
    link: str  # ArtifactHub, values.yaml deep link | example: https://artifacthub.io/packages/helm/camunda/camunda-platform/11.1.0#parameters

    def __dict__(self) -> dict:
        return {
            # "version": self.version,
            # "camunda_version": self.camunda_version,
            "release_notes": self.download,
            "link": self.link
        }

@dataclass
class CamundaVersion:
    version: str # x.y | example: 8.6
    charts: list[HelmChartArtifact]

def parse_csv(file_path):
    parsed_data = defaultdict(list)
    
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip header
        
        for row in reader:
            if len(row) != 2:
                continue  # Skip malformed rows
            chart_version, output = row
            
            # Convert the output field into a proper list format
            images = [line.strip('- ') for line in output.split('\n') if line.strip()]
            parsed_data[chart_version] = images
    
    return parsed_data

def display_parsed_data(parsed_data):
    for chart_version, images in parsed_data.items():
        print(f"Chart Version: {chart_version}")
        for image in images:
            print(f"  - {image}")
        print("\n")

def extract_camunda_version(images):
    for image in images:
        if "camunda/zeebe" in image:
            match = re.search(r'camunda/zeebe:(\d+\.\d+)\.\d+', image)
            if match:
                return match.group(1)  # Extracts the x.y version
    return "Unknown"

def extract_helm_chart_artifacts(parsed_data):
    artifacts = []
    base_github_url = "https://github.com/camunda/camunda-platform-helm/releases/tag/camunda-platform-"
    base_artifacthub_url = "https://artifacthub.io/packages/helm/camunda/camunda-platform/"
    
    for version, images in parsed_data.items():
        camunda_version = extract_camunda_version(images)
        download_link = f"{base_github_url}{version}"
        artifacthub_link = f"{base_artifacthub_url}{version}#parameters"
        artifact = HelmChartArtifact(version, camunda_version, download_link, artifacthub_link)
        artifacts.append(artifact)
    
    return artifacts

def display_parsed_data(parsed_data):
    for chart_version, images in parsed_data.items():
        print(f"Chart Version: {chart_version}")
        for image in images:
            print(f"  - {image}")
        print("\n")


def group_by_camunda_version(artifacts) -> list[CamundaVersion]:
    camunda_versions = defaultdict(list)
    for artifact in artifacts:
        if artifact.camunda_version != "Unknown":
            camunda_versions[artifact.camunda_version].append(artifact)
    
    return [CamundaVersion(version, charts) for version, charts in camunda_versions.items()]


def dump_c8_versions(releases_minor: list[CamundaVersion]) -> dict:
    return {
        minor.version: {
            chart.version: chart.__dict__() for chart in minor.charts
        }
        for minor in releases_minor
    }

if __name__ == "__main__":
    parsed_data = parse_csv(SOURCE_FILE)
    display_parsed_data(parsed_data)
    artifacts: list[HelmChartArtifact] = extract_helm_chart_artifacts(parsed_data)
    for artifact in artifacts:
        print(artifact)

    result: list[CamundaVersion] = group_by_camunda_version(artifacts)
    c8_dump = dump_c8_versions(result)

    print(json.dumps(c8_dump,
        sort_keys=False,
        indent=4,
        separators=(',', ': ')
    ))

    # breakpoint()
