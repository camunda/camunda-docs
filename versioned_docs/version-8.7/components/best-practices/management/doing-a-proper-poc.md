---
title: Doing a proper POC
tags:
  - POC
description: "When evaluating your process automation approach, a POC helps check if the method and technology suit your needs."
---

When evaluating your process automation approach, a **proof of concept (POC)** is often a good step to check if the process automation methodology, the standards of BPMN and DMN, as well as the Camunda technology suit your needs. It is vital for a POC to make up your mind about your goals, to select a suitable process, and to prepare it and carry it out properly.

## Understanding POC

With a POC, you create a prototype application within no more than _three to five days_. The result of a POC is intended to be thrown away after having served its purpose: to try and show that your project will "fly" - including all aspects relevant for your specific situation. Such aspects might be:

- Does Camunda _fit into your own architecture_?
- Does the _development approach_ fit into your own organization's approaches?
- How can you _model_ a specific business domain problem?
- Which kind of _know how_ is needed for the business and development teams?
- Which _effort_ will typically be needed for these kinds of projects?
- What are the impacts of process applications for _operations_?

Often, it does make sense to implement such a POC together with Camunda, our partners, or specialized consultants to get quick results and focused feedback with respect to your specific challenges. However, you should always at least _co-develop_ the POC yourself to really understand what is going on. A team size of two to four people has proven to be quite optimal.

## Defining and focusing on specific goals

Before planning and carrying out a POC, you should consciously clarify the specific goals you want the POC to achieve. Typical goals might be:

- To _verify_ the approach or the tool works under specific circumstances.
- To _show_ a case that _convinces_ internal stakeholders that the approach makes sense.
- To work through a complete _example_ and get specific _questions_ sorted out.
- To _learn_ about Camunda and _understand_ how it works.

:::note
When selecting your goal, keep in mind the needs of all relevant stakeholders.
:::

Do not just "collect" goals here, but try to make up your mind as to what really matters. Often, it is better to make a clear choice. For example, whether to show off a nice user interface at the end of the week or to have time to clarify all questions and to understand Camunda in depth, maybe even only using unit tests.

## Defining a scope relevant to your business

Select a _useful_ and _suitable_ process, case, or decision given your goals.

Typically, it should...

- Be _relevant_ to your _core business_ stakeholders.
- Make your organization's _return on investment_ on BPM more transparent.
- Be _feasible_ within the POC time box.

Avoid political mine fields when selecting the process for your POC.

## Planning the POC

### Involving the right people

It does make sense to implement a POC together with the software vendor and/or specialized consultants to get _quick results_ and _focused feedback_ with respect to your specific challenges. However, you should always at least _co-develop_ the POC to really understand what is going on.

When planning for your team, consider that successful process modeling requires not just knowledge about the business and the targeted technical solution, but experience with BPMN modeling and methodology as well as analytical and moderation skills. We therefore typically bring together _business people_ with _IT staff_ and internal _business analysts_, _train them properly_ and let them continue to _learn on the job_ by carrying out the POC together with an _experienced consultant_. A team size of up to a maximum of _four people_ has proven to be quite optimal.

In case you want to access _system interfaces_ during your POC, also determine who will be a technically knowledgeable and available _contact person_ for that system. To integrate into existing _user interfaces_, you might need help from colleagues within your organization.

Define a _moderator_ to avoid too many detours and keep your POC on track.

### Planning the technical environment

:::caution Camunda 8
This best practice targets Camunda 8. If you want to run a POC with Camunda 7, visit [deciding about your Camunda 7 stack](../../architecture/deciding-about-your-stack-c7/).
:::

Make the necessary technological choices. Typically, POCs _run on Camunda 8 SaaS_ unless your goal is to validate that Camunda 8 runs in your Kubernetes environment in a self-managed fashion. A simple test account is often sufficient, unless your goal is to do load or performance tests, for which you need bigger clusters. Reach out to us in such cases.

To access _third party systems_ during your POC, set up proper test systems for those and verify that they are usable.

Prepare a location in a _version control system_ where you can develop your POC. Having a shared repository with history does make sense also (or especially) in a 2-day POC! Collaboration is simplified if the Camunda consultant can also access that repository. It may be worth just creating a repository with weaker access limitations for the POC.

If your organization cannot easily set up a repository for the POC, or access for externals is impossible, you can create a cloud repository. We typically recommend [GitHub](https://github.com/); a free account is sufficient. It gives you a Git repository and you can invite all necessary people for the POC. Afterwards, you can delete that repository.

### Selecting the time frame

As already mentioned above, we typically plan no more than _a focused week_ for the POC workshop itself. Sometimes it also works well to split up the POC into two weeks of 2-3 days each, which allows everybody to reflect on the POC over the weekend.

- Plan _1-3 days_ for _modeling_ the process with Camunda Modeler.
- Plan _2-3 days_ for _implementing_ the process solution.

When selecting the exact time frame, consider all the people involved, as well as any technical preparation you need to do up front. You also might want to plan for further steps, like a few more things you implement yourself internally in a second follow up week.

## Presenting the results

Before presenting the results of your POC to a wider audience of stakeholders, select a _speaker_ who is comfortable with presenting, prepare a set of focused _slides_ illustrating your progress and the lessons learned, and _test_ your solution and presentation at least once up front.

The speaker might also be your Camunda Consultant - they are used to presenting to a wide audience!

## Checklists

### Technical

- _Cloud Access_: Make sure you have an account for Camunda 8 with an active subscription or trial account.

- _Installations_: Make sure your _developer systems_, as well as any _target systems_ for the POC test and production you wish to use are set up. In particular install:

  - Camunda _Modeler_ (https://camunda.org/download/modeler/)
  - Java, Maven, and your favorite IDE (e.g. Eclipse)
  - Make sure _Maven_ runs and builds and it can access all necessary dependencies. [Download and build this project](https://github.com/camunda/camunda-platform-tutorials/tree/main/quick-start/microservice%20orchestration/worker-java) to verify that your build runs.

- _Developer Computers_: For maximum productivity, all participating developers should use the computer with which they work every day. Avoid using computers from a training room or shared laptops unless they allow a remote connection to the developer's personal computer. If the developer's computers are neither portable nor remotely accessible consider conducting the POC in the regular office space of the developers. If your company network is restricting access to Maven and Git repositories on the internet, consider using laptops that are not connected to the company network. Similarly, you should not force the external consultants to work on one of your computers. They will be twice as productive on their laptops and not lose time with software setup, configuration, and access restrictions. Obviously, you do not have to connect the consultant's laptop to your company network. Internet access and a shared code repository are enough to collaborate.

- _Files_ or _Version Control System_: Make sure we can easily exchange files and code during the POC, preferably via your own version control system (e.g. Git or SVN) or at least via shared folders, USB sticks, or email attachments.

- _Interfaces_: Clarify which technical systems' interfaces you want to access during your POC, make any _documentation_ for those available to the whole POC team, and make sure there is a technically knowledgeable _contact person_ for the interface available to the team during the POC. Set up a _test system_ and verify that it is usable. Verify with Camunda that everything is clear to the team, in particular from a technological perspective.

### Organizational

Inform all POC team members and other relevant stakeholders about the following:

- _Goals_ and the selected _scope_ for the POC
- _Start_ and _end times_, as well as any additional preparation/meet-up times
- _Names and roles_ of all involved _people_

- For onsite POCs:

  - Exact _location/address_ at which the POC is taking place as well as instructions about how to find together when arriving (for onsite POCs)
  - _Projector_, white-board, and flip-chart availability
  - _Internet_ availability for team members and external consultants

- For remote POCs:
  - Exact meeting setup. For example, links to the meeting room, passwords, etc. In case you can't easily host meetings for external participants, your Camunda consultant can setup a Zoom or Microsoft Teams call.
  - Ideally, some chat capability (e.g. a temporary Slack account)

Ideally, prepare a few _organizational_ and/or _project_ info slides to get everybody up to speed on day one of the workshop.
