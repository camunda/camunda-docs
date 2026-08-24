// Resource operations: deploy resources and read/search/delete deployed resources.
package examples

import (
	"context"
	"fmt"
	"os"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func createDeploymentExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateDeployment
	// Multipart resource upload is done through the Raw() generated client.
	f, err := os.Open("order-process.bpmn")
	if err != nil {
		return err
	}
	defer func() { _ = f.Close() }()

	deployment, _, err := client.Raw().ResourceAPI.CreateDeployment(ctx).
		Resources([]*os.File{f}).
		Execute()
	if err != nil {
		return err
	}
	fmt.Printf("deployment key %v\n", deployment.GetDeploymentKey())
	// endregion CreateDeployment
	return nil
}

func searchResourcesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchResources
	result, err := client.SearchResources(ctx, *openapi.NewResourceSearchQuery())
	if err != nil {
		return err
	}
	for _, r := range result.GetItems() {
		fmt.Printf("%v\n", r)
	}
	// endregion SearchResources
	return nil
}

func getResourceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetResource
	resource, err := client.GetResource(ctx, openapi.MustResourceKey("2251799813685350"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", resource)
	// endregion GetResource
	return nil
}

func getResourceContentExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetResourceContent
	content, err := client.GetResourceContent(ctx, openapi.MustResourceKey("2251799813685350"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", content)
	// endregion GetResourceContent
	return nil
}

func getResourceContentBinaryExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetResourceContentBinary
	file, err := client.GetResourceContentBinary(ctx, openapi.MustResourceKey("2251799813685350"))
	if err != nil {
		return err
	}
	fmt.Printf("downloaded to %s\n", file.Name())
	// endregion GetResourceContentBinary
	return nil
}

func deleteResourceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteResource
	result, err := client.DeleteResource(ctx,
		openapi.MustResourceKey("2251799813685350"),
		*openapi.NewDeleteResourceRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion DeleteResource
	return nil
}
