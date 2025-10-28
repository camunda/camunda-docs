---
id: external-oidc-provider
sidebar_label: External OIDC provider
title: Set up the Helm chart with an external OIDC provider
description: "Learn how to connect the Helm Chart to an external OIDC provider (such as Microsoft Entra or an external Keycloak instance)."
---

import ZeebeGrid from '../../../../../components/zeebe/react-components/\_zeebe-card';
import { overviewCards } from './react-components/\_card-data';

Instead of using internal Keycloak, you can configure Camunda to connect to an external IdP, such as an external Keycloak, Microsoft Entra ID, or Okta.

The Helm chart offers these options:

<ZeebeGrid zeebe={overviewCards} />
