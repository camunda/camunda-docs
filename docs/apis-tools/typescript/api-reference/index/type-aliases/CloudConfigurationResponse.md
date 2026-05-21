---
title: "Type Alias: CloudConfigurationResponse"
sidebar_label: "CloudConfigurationResponse"
mdx:
  format: md
---

# Type Alias: CloudConfigurationResponse

```ts
type CloudConfigurationResponse = object;
```

Configuration for SaaS/cloud-specific settings.

## Properties

### clusterId

```ts
clusterId: string | null;
```

The SaaS cluster ID, if applicable.

---

### mixpanelAPIHost

```ts
mixpanelAPIHost: string | null;
```

The Mixpanel API host URL.

---

### mixpanelToken

```ts
mixpanelToken: string | null;
```

The Mixpanel analytics token for the cloud UI.

---

### organizationId

```ts
organizationId: string | null;
```

The SaaS organization ID, if applicable.

---

### stage

```ts
stage: CloudStage | null;
```

The cloud deployment stage.
