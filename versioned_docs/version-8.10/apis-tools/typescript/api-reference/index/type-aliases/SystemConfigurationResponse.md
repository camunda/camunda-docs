---
title: "Type Alias: SystemConfigurationResponse"
sidebar_label: "SystemConfigurationResponse"
mdx:
  format: md
---

# Type Alias: SystemConfigurationResponse

```ts
type SystemConfigurationResponse = object;
```

Envelope for all system configuration sections. Each property
represents a feature area.

## Properties

### authentication

```ts
authentication: AuthenticationConfigurationResponse;
```

---

### cloud

```ts
cloud: CloudConfigurationResponse;
```

---

### components

```ts
components: ComponentsConfigurationResponse;
```

---

### deployment

```ts
deployment: DeploymentConfigurationResponse;
```

---

### jobMetrics

```ts
jobMetrics: JobMetricsConfigurationResponse;
```
