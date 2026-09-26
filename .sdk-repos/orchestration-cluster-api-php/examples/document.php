<?php

/**
 * Compilable usage examples for document operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Semantic\DocumentId;

// region CreateDocument
/**
 * Upload document.
 */
function create_document(CamundaClient $client, \SplFileObject $file, ?string $storeId = null, ?DocumentId $documentId = null, ?\Camunda\Orchestration\Api\Model\DocumentMetadata $metadata = null): void
{
    $client->createDocument($file, $storeId, $documentId?->value(), $metadata);
}
// endregion CreateDocument

// region CreateDocuments
/**
 * Upload multiple documents.
 *
 * @param list<\SplFileObject> $files
 * @param list<\Camunda\Orchestration\Api\Model\DocumentMetadata>|null $metadataList
 */
function create_documents(CamundaClient $client, array $files, ?string $storeId = null, ?array $metadataList = null): void
{
    $client->createDocuments($files, $storeId, $metadataList);
}
// endregion CreateDocuments

// region GetDocument
/**
 * Download document.
 */
function get_document(CamundaClient $client, DocumentId $documentId, ?string $storeId = null, ?string $contentHash = null): void
{
    $client->getDocument((string) $documentId, $storeId, $contentHash);
}
// endregion GetDocument

// region DeleteDocument
/**
 * Delete document.
 */
function delete_document(CamundaClient $client, DocumentId $documentId, ?string $storeId = null): void
{
    $client->deleteDocument((string) $documentId, $storeId);
}
// endregion DeleteDocument

// region CreateDocumentLink
/**
 * Create document link.
 */
function create_document_link(CamundaClient $client, DocumentId $documentId, ?string $storeId = null, ?string $contentHash = null, ?\Camunda\Orchestration\Api\Model\DocumentLinkRequest $documentLinkRequest = null): void
{
    $client->createDocumentLink((string) $documentId, $storeId, $contentHash, $documentLinkRequest);
}
// endregion CreateDocumentLink
