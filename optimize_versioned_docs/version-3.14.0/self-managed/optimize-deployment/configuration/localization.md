---
id: localization
title: "Localization"
description: "Localization of Optimize."
---

To present a localized version of Optimize to users corresponding to their default browser language, Optimize provides the possibility to configure localizations.

## Default locale configuration

The distributions of Optimize contain the default localization files under `./config/localization/`.

The default localizations available are `en` for English and `de` for German. You can also find community maintained localizations in [this repository](https://github.com/camunda/camunda-optimize-translations).

Additionally, English is configured as the default `fallbackLocale`. Fallback in this case means whenever a user has a browser configured with a language that is not present in the `availableLocales` list, Optimize will use the `fallbackLocale`.

The default locale configuration in `./config/environment-config.yaml` looks like the following:

```
locales:
  availableLocales: ['en', 'de']
  fallbackLocale: 'en'
```

For more details on the configuration keys, refer to the [localization configuration section](./system-configuration.md#localization).

## Custom locale configuration

Custom locales can be added by creating a locale file under `./config/localization/` and adding it to the `availableLocales` configuration.

:::note
Configuring a custom locale means you have to maintain it yourself and update it in the context of an Optimize update.

There is currently no changelog of new localization entries available, and it is required that each localization file contains an entry for each key used by Optimize.
:::

As an example, a custom localization can be created by making a copy of the `./config/localization/en.json` named `/config/localization/es.json` and adding it to the available locales in `./config/environment-config.yaml`

```
locales:
  availableLocales: ['en', 'de', 'es']
  fallbackLocale: 'en'
```
