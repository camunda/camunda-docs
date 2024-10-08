---
title: "Operating Camunda 7"
tags:
  - Save Point
  - Retry
  - Incident
  - Monitoring
  - Alarming
  - Backup
description: "To successfully operate Camunda 7.x, you need to take into account operation requirements when modeling business processes."
---

To successfully operate Camunda 7.x, you need to take into account operation requirements when modeling business processes. Use your existing tools and infrastructure for technical monitoring and alarming. When appropriate, use Camunda Cockpit and consider extending it with plugins instead of writing your own tooling.

:::caution Camunda 7 only
This best practice targets Camunda 7.x only! The Camunda 8 stacks differs and operating it is discussed in [Camunda 8 Self-Managed](/self-managed/about-self-managed.md).
:::

## Installing Camunda 7.x

For a quick start, especially during development, follow [our greenfield recommendation for Camunda 7](../../architecture/deciding-about-your-stack-c7).

For _production_ usage we recommend setting up the container of your choice yourself, as we do not make sure we always ship the latest stable patched container version in our distribution. Additionally, we cannot ship some containers for licensing reasons. Install Camunda into this container following the [installation guide](https://docs.camunda.org/manual/latest/installation/). Add required JDBC drivers for the database of your choice and configure data sources accordingly. Make sure to [secure Camunda](../securing-camunda-c7/) if required.

We recommend to _script_ the installation process, to allow for an _automated installation_. Typical steps include:

1. Set up (or extract) the container and install Camunda into it. As an alternative, you might use the Camunda distribution and remove the example application.
2. Add JDBC drivers and configure the data source for Camunda.
3. Configure identity management (e.g. to use LDAP) or add required users and groups to the database-based identity management.
4. Set up Maven build for Camunda webapp in case you want to add your own plugins or customizations.
5. Install the Camunda license.

To script the installation, you can retrieve all required artifacts also from our Maven repositories. This way, it is easy to switch to new Camunda versions. Integrate all pieces by leveraging a scripted configuration management and server automation tool such as [Docker](http://www.docker.com/), [Puppet](https://puppet.com/), [Chef](https://www.chef.io/), or [Ansible](http://www.ansible.com/).

## Setting up monitoring and alarming

Certain situations have to be recognized quickly in order to take appropriate action during the runtime of the system. Therefore, consider monitoring and alarming up front when planning for production operations.

Distinguish between process execution-related monitoring and basic systems monitoring. Do systems monitoring via normal Java or Container Tools - nothing Camunda specific is needed in that area.

### Recognizing and managing incidents

In case a service call initiated by Camunda fails, a _retry_ strategy will be used. By default, a service task is retried three times. Learn more about [retrying failed transactions](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#failed-jobs) with your custom retry strategy.

In case the problem persists after those retries, an _incident_ is created and Camunda will not recover without intervention from a human operator. Therefore, make sure somebody is notified whenever there are any (new) incidents.

**You can build an _active_ solution**, where Camunda actively notifies somebody when there is a new incident. For example, you could send an email or create a user task in Camunda. To achieve this, you can hook in your own [incident handler](https://docs.camunda.org/manual/latest/reference/javadoc/?org/camunda/bpm/engine/impl/incident/IncidentHandler.html) as shown in [this example](https://github.com/camunda/camunda-consulting/tree/master/snippets/incidents-as-tasks). The upside is that sending emails like this is very easy, the downside is that you have to implement Camunda specific classes.

However, if a crucial system goes down you might end up spamming people with thousands of process instances running into the same incident.

This is why typically **a passive solution is preferred**, which queries for (new) incidents from the outside, leveraging the Camunda (Java or REST) API and taking the desired action. The most common way is to query the number of incidents by the tool of your choice using the REST API: `GET incident/count`. More information can be found in the [REST API](https://docs.camunda.org/manual/latest/reference/rest/incident/get-query-count/). We prefer the REST API over more low level technologies (like JMX or PMI), as this typically works best in any environment.

Now you can easily batch multiple incidents into one email or delegate alarming to existing tools like Nagios or Icinga. An additional advantage is that you eventually already have proper alarming groups defined in such a tool.

### Monitoring performance indicators

Monitor the following typical performance indicators _over all process definitions_ at once:

- Number of _open executable jobs_: `GET /job/count?executable=true` ([REST API](https://docs.camunda.org/manual/latest/reference/rest/job/get-query-count/)), as these are jobs that should be executed, but are not yet.
- Number of _open incidents_: `GET /incident/count` ([REST API](https://docs.camunda.org/manual/latest/reference/rest/incident/get-query-count)), as somebody has to manually clear incidents and increasing numbers point to problems.
- Number of _running process instances_: `GET /process-instance/count` ([REST API](https://docs.camunda.org/manual/latest/reference/rest/process-instance/get-query-count/)). Increasing numbers might be a trigger to check the reasons, even if it can be perfectly fine (e.g. increased business).

:::note
If you want to monitor _process definition-specific_ performance indicators, you can either iterate over the process definitions - e.g. by using `GET /process-definition/{id}/statistics` ([REST API](https://docs.camunda.org/manual/latest/reference/rest/process-definition/get-activity-statistics/)), or leverage `GET /process-definition/statistics` ([REST API](https://docs.camunda.org/manual/latest/reference/rest/process-definition/get-statistics/)), which groups overall performance indicators by process definitions. Beware that you eventually need to take into account older versions of process definitions, too.
:::

### Organizing dedicated teams for monitoring

In general, the performance indicators mentioned above can and should be _monitored generically_ and independent of specific process applications. However, you may want to set up _dedicated alarming_ for different operating teams with more knowledge about specific process application characteristics. For example, one of those teams might already know what the typical number of open user tasks for a certain process definition is during normal runtime. There are two approaches to achieve this:

**The recommended approach is to configure dedicated alarming directly in your monitoring tool** by creating separate monitoring jobs querying the performance indicators for specific process definitions. This approach does not need any operation centric adjustments in Camunda and is easy to set up and handle.

An alternative approach is to define team-specific bundles of process definitions in Camunda by leveraging the process definition "category" or even your own BPMN extension elements. However, this information cannot be directly used in the queries mentioned above. Hence, you have to implement additional logic to do so. We typically advise that you do not do so unless you have very good reasons to invest the effort.

### Creating your own alarming mechanism

In case you do not have a monitoring and alarming tool or cannot create new jobs there, build an easy alarming scheduler yourself. This could be a Java component called every couple of minutes to query the current performance indicators by Java API generating custom emails afterwards.

```java
public void scheduledCheck() {
  // Query for incidents
  List<Incident> incidents = processEngine.getRuntimeService()
    .createIncidentQuery().list();
  // Prepare mailing text
  String emailContent = "There are " + incidents.size() + " incidents:<br>";
  for (Incident incident : incidents) {
    emailContent += "<a href=\""
      + cockpitBaseUrl
      + incident.getId() + "\">"
      + incident.getIncidentMessage() + "</a><br>";
  }
  emailContent += "Please have a look into Camunda Cockpit for details.";
  // Send mailing, e.g. via SimpleMail
  sendEmail(emailContent);
}
```

### Defining custom service level agreements

Apart from generic monitoring, you might want to define _business oriented service level agreements (SLAs)_ for very specific aspects of your processes, like for instance, overdue tasks, missed deadlines or similar. You can achieve that by:

1. Adding custom extension attributes in your BPMN process definition, e.g. for specific tasks, message events, etc., which serve to define your specific business performance indicators.
2. Reading deployed process definitions and their _custom extension attributes_, e.g. by means of Camunda's [BPMN Model API](https://docs.camunda.org/manual/latest/user-guide/model-api/bpmn-model-api/) and _interpreting_ their meaning for your _business performance indicators_, e.g. by calculating deadlines for tasks.
3. _Querying_ for (e.g. task or other) instances within/without the borders of your service level agreement.

This is normally implemented similar to the Java Scheduler we described above.

## Intervening with human operator actions

### Handling incidents

Incidents are ultimately [failed jobs](https://docs.camunda.org/manual/latest/webapps/cockpit/bpmn/failed-jobs/), for which no automatic recovery can take place anymore. Hence, a human operator has to deal with incidents. Check for incidents within Camunda Cockpit and take action there. You might, for example, want to:

- [Edit process variables](https://docs.camunda.org/manual/latest/webapps/cockpit/bpmn/process-instance-view/#edit-variables).
- [Modify the process instance ("move" the tokens)](https://docs.camunda.org/manual/latest/webapps/cockpit/bpmn/process-instance-modification/).
- [Trigger additional retries](https://docs.camunda.org/manual/latest/webapps/cockpit/bpmn/failed-jobs/#retry-a-failed-job).

Camunda Enterprise Edition offers a [bulk retry](https://docs.camunda.org/manual/latest/webapps/cockpit/bpmn/failed-jobs/#bulk-retry) feature allowing you to retry jobs which failed for a common reason (e.g. a remote system being down for a longer time) with a single human operator action.

:::note
If you have a failing _call activity_ in your process, you _retry "bottom-up"_ (in the failing subprocess instance), but you _cancel "top-down"_ (the parent process instance to be canceled). Consider the following example incident visualized in Camunda Cockpit.
:::

![Cockpit call activity](operating-camunda-c7-assets/insurance-application-failed-with-detail.png)

You eventually observe the incident first on the parent process call activity **Request documents**, but it is actually caused by the failing activity **Request documents** in the subprocess. For better comprehensibility, this is directly visualized in the picture above. In Cockpit, you can navigate to the call activity in the **called process instance** pane to the bottom of the screen. There you could now _retry_ the failing step of the _subprocess_ instance:

![Cockpit failed task](operating-camunda-c7-assets/document-request-failed.png)

<span className="callout">1</span>

By clicking on this button, you can _retry_ the failing step of the _subprocess_ instance. Note that a successful retry will also resolve the incident you observe on the parent process instance.

On the other hand, you might also want to _cancel_ the failing _parent process_ instance:

![Cockpit cancel](operating-camunda-c7-assets/insurance-application-failed.png)

<span className="callout">1</span>

By clicking on this button, you can _cancel_ the failing _parent process_ instance. The cancellation will also cancel the subprocess instances running in the scope of the parent process instance.

### Turning on/off all job execution

Sometimes you might want to _prevent jobs being executed at all_. When starting up a cluster, for example, you might want to turn off the job executor and start it up later manually when everything is up and running.

1. Configure the [jobExecutorActivate](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/process-engine/#configuration-properties) property to `false`.
2. Start the job executor manually by writing a piece of Java code and making it accessible, e.g. via a REST API:

```java
@POST
public void startJobExecutor() {
  ((ProcessEngineConfigurationImpl) processEngine
    .getProcessEngineConfiguration())
    .getJobExecutor()
    .start();
}
```

A similar piece of code can be implemented to allow to stop the job executor.

### Suspending specific service calls

When you want to _avoid certain services to be called_ because they are down or faulty, you can suspend the corresponding job definitions, either using [Cockpit](https://docs.camunda.org/manual/latest/webapps/cockpit/bpmn/suspension/#job-definition-suspension) or using an API ([Java](https://docs.camunda.org/manual/latest/reference/javadoc/?org/camunda/bpm/engine/ManagementService.html) or [REST](https://docs.camunda.org/manual/latest/reference/rest/job/put-activate-suspend-by-job-def-id/)).

By using the API, you can even _automate suspension_, e.g. by monitoring and recognizing when a target system goes down. By using naming conventions and accordingly customized job definition queries, you can then find all job definitions for that target system (e.g. "SAP") and suspend them until the target system goes up again.

### Suspending whole processes

Sometimes, you may want an _emergency stop_ for a specific process instance or all process instances of a specific process definition, because something behaves strange. Suspend it using [Cockpit](https://docs.camunda.org/manual/latest/webapps/cockpit/bpmn/suspension/#process-definition-suspension) or using an API ([Java](https://docs.camunda.org/manual/latest/reference/javadoc/?org/camunda/bpm/engine/RuntimeService.html) or [REST](https://docs.camunda.org/manual/latest/reference/rest/process-definition/put-activate-suspend-by-id/)) until you have clarified what's going on.

## Create backups

1. Camunda stores all state information in its _database_. Therefore, backup your database by means of your database vendors tools or your favorite tools.
2. The Camunda _container installation_, as well as the _process application deployments_, are fully static from the point of view of Camunda. Instead of backing up this data, we recommend doing a script-based, automated installation of containers, as well as process applications in order to recover easily in case anything goes wrong.

## Updating Camunda

For updating Camunda to a new version, follow the guide for [patch level updates](https://docs.camunda.org/manual/latest/update/patch-level/) or one of the dedicated [minor version update guides](https://docs.camunda.org/manual/latest/update/minor/) provided for each minor version release.

A [rolling update](https://docs.camunda.org/manual/latest/update/rolling-update) feature has been introduced in version 7.6. This allows users to update Camunda _without having to stop the system_. Outdated engine versions are able to continue to access an already updated database, allowing updates to clustered application servers one by one, without any downtime.

### Preparation

1. Before touching the servers, all unit tests should be executed with the desired Camunda version.
2. Check running processes in Cockpit

- Handle open incidents
- Cancel undesired process instances if any

3. Make a backup (refer above)

### Rollout

- Shut down all application server(s) (unless performing a rolling update in which only one cluster node is taken down at a time after the database has been updated).

- Update database using SQL scripts provided in the distro (all distros contain the same scripts)
  - Ensure you also execute all patch level scripts
  - Run all update scripts
  - To check which version is in the database, check for missing tables, indexes, or columns from the update scripts

```SQL
SELECT TABLE_NAME, INDEX_NAME FROM SYS.USER_INDEXES WHERE INDEX_NAME like 'ACT_IDX_%' ORDER BY TABLE_NAME, INDEX_NAME;
SELECT TABLE_NAME FROM SYS.USER_TABLES WHERE TABLE_NAME LIKE 'ACT_%' ORDER BY TABLE_NAME;
```

- Update applications and application server(s) or container(s)
- Start application server(s) or container(s)
- Check logfile for exceptions
- Check Cockpit for incidents
- Test application using UI or API
- Repeat in all stages
