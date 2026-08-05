# Compilable usage examples for secret operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    SecretResolveRequest,
)

# region ResolveSecrets
def resolve_secrets_example() -> None:
    client = CamundaClient()

    # Hands the resolved secret to whatever needs it (an HTTP client, a DB
    # driver, ...) without logging it.
    def use_secret(value: str) -> None: ...

    result = client.resolve_secrets(
        data=SecretResolveRequest(
            references=[
                "camunda.secrets.my_api_token",
                "camunda.secrets.db_password",
            ],
        )
    )

    # Successfully resolved references are returned in `resolved`; references that
    # could not be resolved are returned in `errors`, each with a typed error code.
    # Never log a resolved value -- it holds secret material. Pass it straight to
    # the consumer that needs it instead.
    for resolved in result.resolved:
        print(f"Resolved {resolved.reference} (value redacted)")
        use_secret(resolved.value)

    for error in result.errors:
        print(f"Failed to resolve {error.reference}: {error.code.value} - {error.message}")
# endregion ResolveSecrets
