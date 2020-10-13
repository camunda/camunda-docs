---
id: index
title: "Overview"
---

In addition to BPMN, Zeebe provides a YAML format to define workflows. Creating a YAML workflow can be done with a regular text editor and does not require a graphical modelling tool. It is inspired by imperative programming concepts and aims to be easily understandable by programmers. Internally, Zeebe transforms a deployed YAML file to BPMN.

```yaml
name: order-process

tasks:
    - id: collect-money
      type: payment-service

    - id: fetch-items
      type: inventory-service

    - id: ship-parcel
      type: shipment-service
```

Read more about:

* [Tasks](tasks.md)
* [Control Flow](control-flow.md)
* [Data Flow](data-flow.md)
