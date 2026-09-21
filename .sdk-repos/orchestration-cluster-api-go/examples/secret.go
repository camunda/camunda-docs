// Secret operations: resolve connector secret references to their values.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func resolveSecretsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ResolveSecrets
	// References take the form `camunda.secrets.<name>`.
	req := openapi.NewSecretResolveRequest([]string{"camunda.secrets.MY_API_KEY", "camunda.secrets.MY_TOKEN"})

	result, err := client.ResolveSecrets(ctx, *req)
	if err != nil {
		return err
	}
	for _, secret := range result.GetResolved() {
		fmt.Printf("%v = %v\n", secret.GetReference(), secret.GetValue())
	}
	// endregion ResolveSecrets
	return nil
}

func listSecretsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ListSecrets
	// Returns only the references the caller is authorized to see — never values.
	result, err := client.ListSecrets(ctx)
	if err != nil {
		return err
	}
	for _, reference := range result.GetReferences() {
		fmt.Printf("%v\n", reference)
	}
	// endregion ListSecrets
	return nil
}
