---
id: hubspot
title: HubSpot Connector
sidebar_label: HubSpot
description: Manage HubSpot contacts, companies and deals from your BPMN process. Learn about creating a HubSpot Connector task and get started.
---

The **Hubspot Connector** is an outbound Connector that allows you to connect your BPMN service with [HubSpot](https://hubspot.com/) to manage HubsSpot contacts, companies, and deals.

## Prerequisites

To use the **HubSpot Connector**, you must have a HubSpot account and a [Bearer token](https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key) to authenticate requests.

When creating a private app, you must grant the permissions required to access the HubSpot API. Different operations require different permissions. To use all HubSpot connector operations, add the following permissions to your app:

- `crm.objects.contacts.read`
- `crm.objects.contacts.write`
- `crm.objects.companies.read`
- `crm.objects.companies.write`
- `crm.objects.deals.read`
- `crm.objects.deals.write`
- `crm.lists.read`
- `crm.lists.write`
- `automation`

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

- **Next page after object id:** HubSpot limits the number of results to 100 and provides pagination. To retrieve the first page keep this field empty. To retrieve the following page, set it to `response.body.paging.next.after` from the previous page.

#### Get contact by id

- **Contact ID:** The ID of the contact.
- **Properties:** The properties of the contact to receive. Learn more about [properties](https://developers.hubspot.com/docs/reference/api/crm/properties/v1-contacts#get-all-contact-properties) and [default properties of contacts](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties).
  If you do not set this field, standard properties (firstname,lastname, and email) are returned.
  <details>
  <summary>To get all default properties, set properties to the following list:</summary>

            ```
            address, annualrevenue, associatedcompanyid, associatedcompanylastupdated, city, closedate, company, company_size, country, createdate, currentlyinworkflow, date_of_birth, days_to_close, degree, email, engagements_last_meeting_booked, engagements_last_meeting_booked_campaign, engagements_last_meeting_booked_medium, engagements_last_meeting_booked_source, favorite_content_topics, fax, field_of_study, first_conversion_date, first_conversion_event_name, first_deal_created_date, firstname, gender, graduation_date, hs_additional_emails, hs_all_accessible_team_ids, hs_all_contact_vids, hs_all_owner_ids, hs_all_team_ids, hs_analytics_average_page_views, hs_analytics_first_referrer, hs_analytics_first_timestamp, hs_analytics_first_touch_converting_campaign, hs_analytics_first_url, hs_analytics_first_visit_timestamp, hs_analytics_last_referrer, hs_analytics_last_timestamp, hs_analytics_last_touch_converting_campaign, hs_analytics_last_url, hs_analytics_last_visit_timestamp, hs_analytics_num_event_completions, hs_analytics_num_page_views, hs_analytics_num_visits, hs_analytics_revenue, hs_analytics_source, hs_analytics_source_data_1, hs_analytics_source_data_2, hs_associated_target_accounts, hs_avatar_filemanager_key, hs_buying_role, hs_calculated_form_submissions, hs_calculated_merged_vids, hs_calculated_mobile_number, hs_calculated_phone_number, hs_calculated_phone_number_area_code, hs_calculated_phone_number_country_code, hs_calculated_phone_number_region_code, hs_clicked_linkedin_ad, hs_contact_enrichment_opt_out, hs_contact_enrichment_opt_out_timestamp, hs_content_membership_email, hs_content_membership_email_confirmed, hs_content_membership_follow_up_enqueued_at, hs_content_membership_notes, hs_content_membership_registered_at, hs_content_membership_registration_domain_sent_to, hs_content_membership_registration_email_sent_at, hs_content_membership_status, hs_conversations_visitor_email, hs_count_is_unworked, hs_count_is_worked, hs_country_region_code, hs_created_by_conversations, hs_created_by_user_id, hs_createdate, hs_document_last_revisited, hs_email_bad_address, hs_email_bounce, hs_email_click, hs_email_customer_quarantined_reason, hs_email_delivered, hs_email_domain, hs_email_first_click_date, hs_email_first_open_date, hs_email_first_reply_date, hs_email_first_send_date, hs_email_hard_bounce_reason, hs_email_hard_bounce_reason_enum, hs_email_is_ineligible, hs_email_last_click_date, hs_email_last_email_name, hs_email_last_open_date, hs_email_last_reply_date, hs_email_last_send_date, hs_email_open, hs_email_optout, hs_email_optout_697354363, hs_email_optout_697354364, hs_email_quarantined, hs_email_quarantined_reason, hs_email_replied, hs_email_sends_since_last_engagement, hs_emailconfirmationstatus, hs_enriched_email_bounce_detected, hs_facebook_ad_clicked, hs_facebook_click_id, hs_first_closed_order_id, hs_first_engagement_object_id, hs_first_order_closed_date, hs_first_outreach_date, hs_first_subscription_create_date, hs_full_name_or_email, hs_google_click_id, hs_has_active_subscription, hs_ip_timezone, hs_is_contact, hs_is_enriched, hs_is_unworked, hs_language, hs_last_metered_enrichment_timestamp, hs_last_sales_activity_date, hs_last_sales_activity_timestamp, hs_last_sales_activity_type, hs_lastmodifieddate, hs_latest_disqualified_lead_date, hs_latest_meeting_activity, hs_latest_open_lead_date, hs_latest_qualified_lead_date, hs_latest_sequence_ended_date, hs_latest_sequence_enrolled, hs_latest_sequence_enrolled_date, hs_latest_sequence_finished_date, hs_latest_sequence_unenrolled_date, hs_latest_source, hs_latest_source_data_1, hs_latest_source_data_2, hs_latest_source_timestamp, hs_latest_subscription_create_date, hs_lead_status, hs_legal_basis, hs_linkedin_ad_clicked, hs_linkedin_url, hs_live_enrichment_deadline, hs_membership_has_accessed_private_content, hs_membership_last_private_content_access_date, hs_merged_object_ids, hs_mobile_sdk_push_tokens, hs_notes_last_activity, hs_notes_next_activity, hs_notes_next_activity_type, hs_object_id, hs_object_source, hs_object_source_detail_1, hs_object_source_detail_2, hs_object_source_detail_3, hs_object_source_id, hs_object_source_label, hs_object_source_user_id, hs_persona, hs_pinned_engagement_id, hs_pipeline, hs_prospecting_agent_actively_enrolled_count, hs_quarantined_emails, hs_read_only, hs_recent_closed_order_date, hs_registered_member, hs_registration_method, hs_role, hs_sa_first_engagement_date, hs_sa_first_engagement_descr, hs_sa_first_engagement_object_type, hs_sales_email_last_clicked, hs_sales_email_last_opened, hs_sales_email_last_replied, hs_searchable_calculated_international_mobile_number, hs_searchable_calculated_international_phone_number, hs_searchable_calculated_mobile_number, hs_searchable_calculated_phone_number, hs_seniority, hs_sequences_actively_enrolled_count, hs_sequences_enrolled_count, hs_sequences_is_enrolled, hs_state_code, hs_sub_role, hs_testpurge, hs_testrollback, hs_time_to_first_engagement, hs_timezone, hs_unique_creation_key, hs_updated_by_user_id, hs_user_ids_of_all_notification_followers, hs_user_ids_of_all_notification_unfollowers, hs_user_ids_of_all_owners, hs_v2_date_entered_customer, hs_v2_date_entered_evangelist, hs_v2_date_entered_lead, hs_v2_date_entered_marketingqualifiedlead, hs_v2_date_entered_opportunity, hs_v2_date_entered_other, hs_v2_date_entered_salesqualifiedlead, hs_v2_date_entered_subscriber, hs_v2_date_exited_customer, hs_v2_date_exited_evangelist, hs_v2_date_exited_lead, hs_v2_date_exited_marketingqualifiedlead, hs_v2_date_exited_opportunity, hs_v2_date_exited_other, hs_v2_date_exited_salesqualifiedlead, hs_v2_date_exited_subscriber, hs_was_imported, hs_whatsapp_phone_number, hubspot_owner_assigneddate, hubspot_owner_id, hubspot_team_id, hubspotscore, industry, ip_city, ip_country, ip_country_code, ip_latlon, ip_state, ip_state_code, ip_zipcode, job_function, jobtitle, lastmodifieddate, lastname, lifecyclestage, marital_status, message, military_status, mobilephone, notes_last_contacted, notes_last_updated, notes_next_activity_date, num_associated_deals, num_contacted_notes, num_conversion_events, num_notes, num_unique_conversion_events, numemployees, phone, preferred_channels, recent_conversion_date, recent_conversion_event_name, recent_deal_amount, recent_deal_close_date, relationship_status, salutation, school, seniority, start_date, state, surveymonkeyeventlastupdated, total_revenue, twitterhandle, webinareventlastupdated, website, work_email, zip
            ```

      </details>

#### Get multiple contacts by id

- **Contact ids:** The IDs of the contacts to retrieve. This is limited to 100 contacts.

#### Search contact

- **Search field:** The field to search for. For example, "lastname".
- **Search value:** The value to search for. For example, "Smith".

:::note
All contacts matching the search criteria are returned.
:::

#### Create contact

- **Properties:** The properties of the contact to create. Learn more about [properties](https://developers.hubspot.com/docs/guides/api/crm/properties) and [default properties of contacts](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties).
- **Company ID:** The ID of the company the contact is associated with. HubSpot automatically adds the contact to the company if the mail address domain matches the company domain. For example, "jane.doe@camunda.com" is automatically added to the company with the domain "camunda.com". If you set the company ID manually, the contact is added to the company with the given ID **AND** the company with the matching domain.

#### Update contact

- **Properties:** The properties of the contact to update. Learn more about [properties](https://developers.hubspot.com/docs/guides/api/crm/properties) and [default properties of contacts](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties). Only add properties you want to adjust to the properties field.
- **Contact ID:** The ID of the contact to update.

:::note
It is not possible to update associations to companies with this operation. To do so use the `add contact to` or `remove contact from company` operations under `Companies`.
:::

#### Delete contact

- **Contact ID:** The ID of the contact to delete.

### Companies

#### Get all companies

- **Next page after object id:** HubSpot limits the number of results to 100 and provides pagination. To retrieve the first page keep this field empty. To retrieve the following page, set it to `response.body.paging.next.after` from the previous page.

#### Get company by id

- **Company ID:** The ID of the company.

#### Search company

- **Search field:** The field to search for. For example, "name".
- **Search value:** The value to search for. For example, "Camunda".

:::note
All companies matching the search criteria are returned.
:::

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

- **Next page after object id:** HubSpot limits the number of results to 100 and provides pagination. To retrieve the first page keep this field empty. To retrieve the following page, set it to `response.body.paging.next.after` from the previous page.

#### Get deal by id

- **Deal ID:** The ID of the deal.

#### Search deal

- **Search field:** The field to search for. For example, "dealname".
- **Search value:** The value to search for. For example, "Inital Deal for Camunda".

:::note
All deals matching the search criteria are returned.
:::

#### Delete deal

- **Deal ID:** The ID of the deal to delete.

### Miscellaneous

#### Submit form

- **Portal ID:** The HubSpot account that the form belongs to. [Learn more](https://knowledge.hubspot.com/account-management/manage-multiple-hubspot-accounts#check-your-current-account)
- **Form ID:** The unique ID of the form you are sending data to. [Learn more](https://knowledge.hubspot.com/forms/find-your-form-guid)
- **Form fields:** The value of the input fields of the form. [Learn more](https://developers.hubspot.com/docs/reference/api/marketing/forms/v3-legacy)

#### Add element to list

- **List ID:** The ID of the list.
- **Object IDs:** The IDs of the objects to add to the list.

:::note
Adding elements to a list may take a few seconds to be reflected in the HubSpot UI.
:::

#### Enroll contact to workflow

- **Workflow ID:** The workflow ID. You can retrieve the ID by sending a request to the [get all workflows endpoint](https://developers.hubspot.com/docs/reference/api/automation/create-manage-workflows/v3#get-all-workflows).
- **Contact email:** The email of the contact to be enrolled to the workflow.

## Handle Connector response

As the **HubSpot Connector** is a protocol Connector (built on top of the **HTTP REST Connector**) the handling response is still applicable [as described](/components/connectors/protocol/rest.md#response).
