// Compilable usage examples for document operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class DocumentExamples
{
    #region CreateDocumentLink
    // <CreateDocumentLink>
    public static async Task CreateDocumentLinkExample(DocumentId documentId)
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateDocumentLinkAsync(
            documentId,
            new DocumentLinkRequest());

        Console.WriteLine($"Document link: {result.Url}");
    }
    // </CreateDocumentLink>
    #endregion CreateDocumentLink

    #region DeleteDocument

    // <DeleteDocument>
    public static async Task DeleteDocumentExample(DocumentId documentId)
    {
        using var client = CamundaClient.Create();

        await client.DeleteDocumentAsync(documentId);
    }
    // </DeleteDocument>
    #endregion DeleteDocument

    #region CreateDocument

    // <CreateDocument>
    public static async Task CreateDocumentExample()
    {
        using var client = CamundaClient.Create();

        using var content = new MultipartFormDataContent();
        content.Add(new ByteArrayContent(System.Text.Encoding.UTF8.GetBytes("Hello, world!")), "file", "hello.txt");

        var result = await client.CreateDocumentAsync(content);

        Console.WriteLine($"Document ID: {result.DocumentId}");
    }
    // </CreateDocument>
    #endregion CreateDocument

    #region CreateDocuments

    // <CreateDocuments>
    public static async Task CreateDocumentsExample()
    {
        using var client = CamundaClient.Create();

        using var content = new MultipartFormDataContent();
        content.Add(new ByteArrayContent(System.Text.Encoding.UTF8.GetBytes("File one")), "files", "one.txt");
        content.Add(new ByteArrayContent(System.Text.Encoding.UTF8.GetBytes("File two")), "files", "two.txt");

        var result = await client.CreateDocumentsAsync(content);

        foreach (var doc in result.CreatedDocuments)
        {
            Console.WriteLine($"Created: {doc.DocumentId}");
        }
    }
    // </CreateDocuments>
    #endregion CreateDocuments

    #region GetDocument

    // <GetDocument>
    public static async Task GetDocumentExample(DocumentId documentId)
    {
        using var client = CamundaClient.Create();

        var content = await client.GetDocumentAsync(documentId);

        Console.WriteLine($"Downloaded document: {documentId}");
    }
    // </GetDocument>
    #endregion GetDocument
}
