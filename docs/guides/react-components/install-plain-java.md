---
---

**Starting in 8.6.0-alpha2**, you can install Camunda 8 Self-Managed as an integrated plain Java application.

For this installation, you must have:

- OpenJDK 21+ locally installed
- Camunda `8.6.0-alpha2` or later

1. Download the [latest release artifact](https://github.com/camunda/camunda/releases), starting with [8.6.0-alpha2](https://github.com/camunda/camunda/releases/tag/8.6.0-alpha2).
2. Enable the Zeebe Elasticsearch exporter by modifying `config/application.yaml` with the following at line 91:

```yaml
exporters:
  elasticsearch:
    className: io.camunda.zeebe.exporter.ElasticsearchExporter
    args:
      url: http://localhost:9200
      index:
        prefix: zeebe-record
```

3. Download [Elasticsearch 8.9.2](https://www.elastic.co/downloads/past-releases/elasticsearch-8-9-2).
4. For non-production cases, disable Elasticsearch's security packages by setting the `xpack.security.*` configuration options to `false` in `ELASTICSEARCH_HOME/config/elasticsearch.yml`.
5. Start Elasticsearch by running `ELASTICSEARCH_HOME/bin/elasticsearch` (or `ELASTICSEARCH_HOME\bin\elasticsearch.bat` on Windows).
6. To start Camunda, run `bin/camunda` (or `bin\camunda.bat` on Windows).
