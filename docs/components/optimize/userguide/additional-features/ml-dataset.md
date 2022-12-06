---
id: ml-dataset
title: Machine Learning Ready Dataset
description: Export a raw data report in JSON format, which can be used for training a machine learning model.
---

The Machine Learning Ready Dataset feature, allows the export of data into a single dataset, which make it easier to perform advanced analysis off Optimize. The data set generated can contain information, which relate to processes and can be assembled by generating a raw data report. 
The data contained in the raw data reports, is already organized and pre-processed in such a way, that it would allow a trained model to make predictions for future instances, based on already existent instances for a given definition.
It is important to note, that in addition to the previously existed columns in the raw data reports, we have added some extra columns for better machine learning capabilities. These columns allow a user to access information such as: the total number of incidents per process instance, the amount of open incidents, the number of user tasks and the total duration of an event. 
This would allow for instance to predict how long an instance will take to complete, based on the number of incidents or user tasks, which it has.
To use this feature, navigate to a raw data report. The added columns should now be displayed there:

![Raw Data Report](./img/raw-data-report-ml-ready-dataset.png)

In most cases, when training a machine learning model, the data can be fed to common libraries, such as pandas or scikit-learn in CSV or JSON format. In order to export all data contained in a raw data report and use it as input for model training, we recommend exporting the raw data reports in JSON format.
That can be done after saving the report and utilizing the external Optimize endpoint provided to export it to JSON. More information on how to use the JSON export endpoint can be found [here](../../../../../self-managed/optimize-deployment/rest-api/report/get-data-export).
