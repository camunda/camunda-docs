// Document operations: upload, download, link, and delete documents.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func createDocumentExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateDocument
	// The document payload is attached via request options (functional opts) or
	// the Raw() client; here we call the ergonomic facade method.
	ref, err := client.CreateDocument(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", ref)
	// endregion CreateDocument
	return nil
}

func createDocumentsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateDocuments
	// Batch upload multiple documents in a single multipart request.
	result, err := client.CreateDocuments(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateDocuments
	return nil
}

func getDocumentExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetDocument
	file, err := client.GetDocument(ctx, "doc-123")
	if err != nil {
		return err
	}
	fmt.Printf("downloaded to %s\n", file.Name())
	// endregion GetDocument
	return nil
}

func deleteDocumentExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteDocument
	return client.DeleteDocument(ctx, "doc-123")
	// endregion DeleteDocument
}

func createDocumentLinkExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateDocumentLink
	// Create a short-lived, shareable download link for a stored document.
	link, err := client.CreateDocumentLink(ctx, "doc-123", *openapi.NewDocumentLinkRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", link)
	// endregion CreateDocumentLink
	return nil
}
