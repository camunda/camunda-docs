3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 240) 
e98e9fa620 (Mark Sellings           2025-04-17 13:23:52 +0100 241) Brokers can export optional execution latency metrics.
e98e9fa620 (Mark Sellings           2025-04-17 13:23:52 +0100 242) 
52201bb1c8 (hisImminence            2025-07-10 09:32:48 +0200 243) To enable export of execution metrics, set the `ZEEBE_BROKER_EXECUTION_METRICS_EXPORTER_ENABLED` environment variable to `true` in your Zeebe [configuration file](/self-managed/components/orchestration-cluster/zeebe/configuration/configuration.md).
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 244) 
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 245) ## Grafana
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 246) 
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 247) ### Zeebe
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 248) 
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 249) Zeebe comes with a pre-built dashboard, available in the repository:
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 250) [monitor/grafana/zeebe.json](https://github.com/camunda/camunda/blob/main/monitor/grafana/zeebe.json).
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 251) 
e98e9fa620 (Mark Sellings           2025-04-17 13:23:52 +0100 252) - [Import](https://grafana.com/docs/grafana/latest/reference/export_import/#importing-a-dashboard) the dashboard into your Grafana instance and select the correct Prometheus data source (if you have more than one).
e98e9fa620 (Mark Sellings           2025-04-17 13:23:52 +0100 253) - The dashboard displays a healthy cluster topology, general throughput metrics, handled requests, exported events per second, disk and memory usage, and more.
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 254) 
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 255) ![Grafana dashboard](assets/grafana-preview.png)
3ac446c3dc (Nicolas Pepin-Perreault 2025-03-13 11:50:35 +0100 256) 
e98e9fa620 (Mark Sellings           2025-04-17 13:23:52 +0100 257) :::tip
e98e9fa620 (Mark Sellings           2025-04-17 13:23:52 +0100 258) You can also try out an [interactive dashboard](https://snapshots.raintank.io/dashboard/snapshot/Vbu3EHQMTI5Onh5RKuiS5J7QSMd7Sp5V) to learn about each panel and get an understanding of available data.
e98e9fa620 (Mark Sellings           2025-04-17 13:23:52 +0100 259) :::
1a825fd61b (euro.lew                2025-08-21 11:11:12 +0100 260) 
e7776e167e (Christina Ausley        2025-08-21 13:15:19 -0700 261) ### Data layer
e7776e167e (Christina Ausley        2025-08-21 13:15:19 -0700 262) 
e7776e167e (Christina Ausley        2025-08-21 13:15:19 -0700 263) A pre-built Grafana dashboard is available for the data layer in the repository:
1a825fd61b (euro.lew                2025-08-21 11:11:12 +0100 264) 
1a825fd61b (euro.lew                2025-08-21 11:11:12 +0100 265) [monitor/grafana/data_layer.json](https://github.com/camunda/camunda/blob/main/monitor/grafana/dashboards/data_layer.json)
1a825fd61b (euro.lew                2025-08-21 11:11:12 +0100 266) 
e7776e167e (Christina Ausley        2025-08-21 13:15:19 -0700 267) To use it:
e7776e167e (Christina Ausley        2025-08-21 13:15:19 -0700 268) 
e7776e167e (Christina Ausley        2025-08-21 13:15:19 -0700 269) 1. [Import](https://grafana.com/docs/grafana/latest/reference/export_import/#importing-a-dashboard) the dashboard into your Grafana instance.
e7776e167e (Christina Ausley        2025-08-21 13:15:19 -0700 270) 2. When prompted, select the appropriate Prometheus data source (especially if multiple are configured).
e7776e167e (Christina Ausley        2025-08-21 13:15:19 -0700 271) 
e7776e167e (Christina Ausley        2025-08-21 13:15:19 -0700 272) The dashboard provides insights into key data layer components for Camunda versions `>= 8.8`, with a focus on the Camunda exporter through which all data flows.
1a825fd61b (euro.lew                2025-08-21 11:11:12 +0100 273) 
e7776e167e (Christina Ausley        2025-08-21 13:15:19 -0700 274) ![Example panels](assets/example-panels-data-layer.png)
