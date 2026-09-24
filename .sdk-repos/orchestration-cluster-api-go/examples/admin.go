// Authentication, license, and cluster-level metadata reads.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
)

func getAuthenticationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetAuthentication
	// Return the authenticated user derived from the current credentials.
	me, err := client.GetAuthentication(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("authenticated as %s\n", me.GetUsername())
	// endregion GetAuthentication
	return nil
}

func getLicenseExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetLicense
	license, err := client.GetLicense(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("license type=%s valid=%v\n", license.GetLicenseType(), license.GetValidLicense())
	// endregion GetLicense
	return nil
}
