# Compilable usage examples for client construction and configuration.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

import logging

from camunda_orchestration_sdk import (
    CamundaAsyncClient,
    CamundaClient,
    NullLogger,
)


# region CreateClient
def create_client_example() -> None:
    # Uses environment variables for configuration (CAMUNDA_REST_ADDRESS, etc.)
    client = CamundaClient()

    topology = client.get_topology()
    print(f"Cluster size: {topology.cluster_size}")
# endregion CreateClient


# region CreateClientWithConfig
def create_client_with_config_example() -> None:
    client = CamundaClient(
        configuration={
            "CAMUNDA_REST_ADDRESS": "http://localhost:8080/v2",
            "CAMUNDA_AUTH_STRATEGY": "BASIC",
            "CAMUNDA_BASIC_AUTH_USERNAME": "demo",
            "CAMUNDA_BASIC_AUTH_PASSWORD": "demo",
        }
    )

    topology = client.get_topology()
    print(f"Partitions: {topology.partitions_count}")
# endregion CreateClientWithConfig


# region CreateClientOAuth
def create_client_oauth_example() -> None:
    client = CamundaClient(
        configuration={
            "CAMUNDA_REST_ADDRESS": "https://cluster.example/v2",
            "CAMUNDA_AUTH_STRATEGY": "OAUTH",
            "CAMUNDA_CLIENT_ID": "my-client-id",
            "CAMUNDA_CLIENT_SECRET": "my-client-secret",
            "CAMUNDA_OAUTH_URL": "https://login.cloud.camunda.io/oauth/token",
            "CAMUNDA_TOKEN_AUDIENCE": "zeebe.camunda.io",
        }
    )

    topology = client.get_topology()
    print(f"Brokers: {len(topology.brokers)}")
# endregion CreateClientOAuth


# region GetTopology
def get_topology_example() -> None:
    client = CamundaClient()

    topology = client.get_topology()

    print(f"Cluster size: {topology.cluster_size}")
    print(f"Partitions: {topology.partitions_count}")
    for broker in topology.brokers:
        print(f"  Broker {broker.node_id}: {broker.host}:{broker.port}")
# endregion GetTopology


# region AsyncClient
async def async_client_example() -> None:
    async with CamundaAsyncClient() as client:
        topology = await client.get_topology()
        print(f"Cluster size: {topology.cluster_size}")
# endregion AsyncClient


# region CustomLogger
def custom_logger_example() -> None:
    my_logger = logging.getLogger("my_app.camunda")
    my_logger.setLevel(logging.DEBUG)

    client = CamundaClient(logger=my_logger)

    topology = client.get_topology()
    print(f"Cluster size: {topology.cluster_size}")
# endregion CustomLogger


# region DisableLogging
def disable_logging_example() -> None:
    client = CamundaClient(logger=NullLogger())

    topology = client.get_topology()
    print(f"Cluster size: {topology.cluster_size}")
# endregion DisableLogging
