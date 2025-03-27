---
id: hubspot
title: HubSpot Connector
sidebar_label: HubSpot
description: Manage HubSpot contacts, companies and deals from your BPMN process. Learn about creating a HubSpot Connector task and get started.
---

The **Hubspot Connector** is an outbound Connector that allows you to connect your BPMN service with [HubSpot](https://hubspot.com/) to manage HubsSpot contacts, companies, and deals.

## Prerequisites

To use the **HubSpot Connector**, you must have a HubSpot account and an [Bearer token](https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key) to authenticate requests. When creating a private app make sure to grant the necessary permissions to access the HubSpot API. Different operations require different permissions. To use all operations this connector is capable of add these permissions to your app:

- `crm.objects.contacts.read`
- `crm.objects.contacts.write`
- `crm.objects.companies.read`
- `crm.objects.companies.write`
- `crm.objects.deals.read`
- `crm.objects.deals.write`
- `crm.lists.read`
- `crm.lists.write`

:::note
Use Camunda secrets to avoid exposing your token credentials as plain text. Refer to our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create a HubSpot Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Select operation to execute

The **HubSpot Connector** currently supports the following operations.

### Contacts

#### Get all contacts

- **Next page after object id:** HubSpot limits the number of results to 100 and provides pagination. To receive the first page keep this field empty, if you want to receive a following page, set it to `response.body.paging.next.after` from the previous page.

#### Get contact by id

- **Contact ID:** The ID of the contact.

#### Get multiple contacts by id

- **Contact ids:** The IDs of the contacts to receive. This is limited to 100 contacts.

#### Search contact

- **Search field:** The field to search for, e.g. "lastname"
- **Search value:** The value to search for, e.g. "Smith"
  All contacts that match the search criteria are returned.

#### Create contact

- **Properties:** The properties of the contact to create. Learn more about [properties](https://developers.hubspot.com/docs/guides/api/crm/properties) and [default properties of contacts](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties).
- **Company ID:** The ID of the company the contact is associated with. Hubspot automatically adds the contact to the company if the mail address domain matches the company domain, e.g. jane.doe@camunda.com is automatically added to the company with the domain camunda.com. If you set the company ID manually, the contact is added to the company with the given ID **AND** the company with the matching domain.

#### Update contact

- **Properties:** The properties of the contact to update. Learn more about [properties](https://developers.hubspot.com/docs/guides/api/crm/properties) and [default properties of contacts](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties). Only add properties you want to adjust to the properties field.
- **Contact ID:** The ID of the contact to update.

:::note
It is not possible to update associations to companies here. To do so use the `add contact to` or `remove contact from company` operations under `Companies`.
:::

#### Delete contact

- **Contact ID:** The ID of the contact to delete.

### Companies

#### Get all companies

- **Next page after object id:** HubSpot limits the number of results to 100 and provides pagination. To receive the first page keep this field empty, if you want to receive a following page, set it to `response.body.paging.next.after` from the previous page.

#### Get company by id

- **Company ID:** The ID of the company.

#### Search company

- **Search field:** The field to search for, e.g. "name"
- **Search value:** The value to search for, e.g. "Camunda"
  All companies that match the search criteria are returned.

#### Get all contacts of a company

- **Company ID:** The ID of the company.

#### Add contact to company

- **Contact ID:** The ID of the contact.
- **Company ID:** The ID of the company.

#### Remove contact from company

- **Contact ID:** The ID of the contact.
- **Company ID:** The ID of the company.

#### Create company

- **Properties:** The properties of the company to create. Learn more about [properties](https://developers.hubspot.com/docs/guides/api/crm/properties) and [default properties of companies](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties).

#### Delete company

- **Company ID:** The ID of the company to delete.

### Deals

#### Get all deals

- **Next page after object id:** HubSpot limits the number of results to 100 and provides pagination. To receive the first page keep this field empty, if you want to receive a following page, set it to `response.body.paging.next.after` from the previous page.

#### Get deal by id

- **Deal ID:** The ID of the deal.

#### Search deal

- **Search field:** The field to search for, e.g. "dealname"
- **Search value:** The value to search for, e.g. "Inital Deal for Camunda"
  All deals that match the search criteria are returned.

#### Delete deal

- **Deal ID:** The ID of the deal to delete.

### Miscellaneous

#### Submit form

- **Portal ID:** The HubSpot account that the form belongs to. [Learn more](https://knowledge.hubspot.com/account-management/manage-multiple-hubspot-accounts#check-your-current-account)
- **Form ID:** The unique ID of the form you're sending data to. [Learn more](https://knowledge.hubspot.com/forms/find-your-form-guid)
- **Form fields:** The value of the input fields of the form. [Learn more](https://developers.hubspot.com/docs/reference/api/marketing/forms/v3-legacy)

#### Add element to list

- **List ID:** The ID of the list.
- **Object IDs:** The IDs of the objects to add to the list.

:::note
Adding elements to list may take a few seconds to be reflected in the HubSpot UI.
:::

## Handle Connector response

The **HubSpot Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**, therefore
handling response is still applicable [as described](/components/connectors/protocol/rest.md#response).
