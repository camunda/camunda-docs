---
id: document-handling
title: "Document handling"
description: "Learn more about integration, secure management, and efficient storage and retrieval of documents across development and production environments."
keywords: ["document handling"]
---

Offering a more comprehensive approach to document handling, Camunda now allows for easier integration, secure management, and efficient storage and retrieval of documents across both development and production environments.

Whether you are working across Connectors, Modeler, Forms, Operate, or Tasklist, document handling may be beneficial for users who want the following:

- [AWS S3](https://aws.amazon.com/s3/) storage and bucket creation per cluster to securely store and retrieve documents in an external, scalable storage solution, and to ensure storage is properly isolated and managed for each environment.
- Set document limitations and access permissions, ensuring compliance and secure handling of sensitive documents within workflows.
- Support for the local file system as a storage option for development and testing purposes to set up and manage documents in local environments.
- Preview, track, and manage documents associated with process instances.

Below, learn about capabilities with document handling for each related component:

## Console

A cluster version 8.7 and above will have a default cloud storage created for users.
Users with the management permissions in Console (admin, operations engineer) can connect a cluster to an external AWS S3 storage, which will replace the default storage.
On Self-Managed, non-production environment users with the management permissions in Console can setup a local file storage pointing to a folder on their device.

## Modeler

When modeling a process, a user task can be configured to support files.

Form picker component in forms will be extended to support multiple files (currently it supports picking only a single file).

## Connectors

Inbound (Webhook) and outbound (REST, IDP-related) connectors support documents

## Tasklist

Tasklist users can access, preview, and download files related to a user task.

## Document limitations

Maximum file size
File expiration time, Time-to-live (TTL) policy of a file
Storage space limit of the default file storage
