---
title: Doing a proper proof of concept
stakeholders: Project Management
tags:
    - POC
topics:
    - Customer Success Path
weight: 20

booksection: "A. Getting Started"
bookchapter: 2
---

When evaluating your BPM approach, a proof of concept (POC) is often a good step to check if the process automation methodology, the standards BPMN and DMN, as well as the Camunda technology suits your needs. It is vital for a proof of concept to make up your mind about your goals, to select a suitable process and to prepare it and carry it out properly.



## Understanding proof of concepts

With a proof of concept (*POC*) you create a prototype application within no more than *three to five days*. The result of a POC is intended to be thrown away after having served its purpose: to try and show that your project will "fly" - including all aspects relevant for your specific situation. Such aspects might be:

- Does Camunda *fit into your own architecture*?
- Does the *development approach* fit into your own organization's approaches?
- How can you *model* a specific business domain problem?
- Which kind of *know how* is needed for the business and development teams?
- Which *effort* will typically be needed for these kind of projects?
- What are the impacts of process applications for *operations*?

Often it does make sense to implement such a POC together with Camunda, our partners, or specialized consultants, in order to get quick results and focused feedback with respect to your specific challenges. However, you should always at least *co-develop* the proof of concept yourself, in order to really understand what is going on. A team size of two to four people has proven to be quite optimal.



## Defining and focusing on specific goals

Before planning and carrying out a proof of concept, you should consciously clarify the specific goals you want the PoC to achieve. Typical goals might be:

- to *verify* that the approach or the tool works under specific circumstances
- to *show* a case that *convinces* internal stakeholders that the approach makes sense
- to work through a complete *example* and get specific *questions* sorted out
- to *learn* about Camunda and *understand* how it works

When selecting your goal keep in mind the needs of all relevant stakeholders.

Do not just "collect" goals here, but try to make up your mind as to what really matters. Often it is better to make a clear choice, whether for example to show off a nice user interface at the end of the week or to have time to clarify all questions and to understand Camunda in depth, maybe even only using unit tests.



## Defining a scope relevant to your business

Select a *useful* and *suitable* process, case or decision in the light of your goals.

Typically, it should ...

- be *relevant* to your *core business* stakeholders
- make your organization's *return on investment* on BPM more transparent
- be *feasible* within the proof of concepts time box

Avoid political mine fields when selecting the process for your proof of concept.


## Planning the proof of concept


### Involving the right people

It does make sense to implement a POC together with the software vendor and/or specialized consultants, in order to get *quick results* and *focused feedback* with respect to your specific challenges. However, you should always at least *co-develop* the proof of concept, in order to really understand what is going on.

When planning for your team, consider that successful process modeling requires not just knowledge about the business and the targeted technical solution, but experience with BPMN modeling and methodology as well as analytical and moderation skills. We therefore typically bring together *business people* with *IT staff* and internal *business analysts*, *train them properly* and let them continue to *learn on the job* by carrying out the proof of concept together with an *experienced consultant*. A team size of up to a maximum of *four people* has proven to be quite optimal.

In case you want to access *systems interfaces* during your POC, also make up your mind who will be a technically knowledgeable and available *contact person* for that system. In order to integrate into existing *user interfaces* you might need help from colleagues within your organization.

Define a *moderator* to avoid too many detours and keep your POC on track.



### Planning the technical environment

:::caution Camunda Cloud
This best practice targets Camunda Cloud. If you want to run a POC with Camuna Platform 7 you might want to have a look into [deciding about your Camunda Platform 7 stack](../../architecture/deciding-about-your-stack-c7/).
:::

Make the necessary technological choices. Typically, POCs *run on Camunda Cloud SaaS* unless your goal is to validate that Camunda Cloud runs in your Kubernetes environment in a self-managed fashion. A simple test account is often sufficient, unless your goal is to do load or performance tests, for which you need bigger clusters. Please reach out to us in such cases.

In case you want to access *third party systems* during your POC, set up proper test systems for those and verify that they are usable.

Prepare a location in a *version control system* where you can develop your POC. Having a shared repository with history does make sense also (or especially) in a two days POC! Collaboration is simplified if the Camunda consultant can also access that repository. It may worth just creating a repository with weaker access limitations for the POC.

If your organization cannot easily setup a repository for the POC, or access for externals is impossible, you can easily create a cloud repository. We typically recommend [GitHub](https://github.com/), a free account is sufficient. It gives you a Git repository and you can invite all necessary people for the POC. Afterwards you can simply delete that repository.



### Selecting the time frame

As already mentioned above, we typically plan no more than *a focused week* for the POC workshop itself. Sometimes it also works well to split up the POC into two weeks of 2-3 days each, which allows everybody to reflect on the POC over the weekend.

* Plan *1-3 days* for *modeling* the process with Camunda Modeler.
* Plan *2-3 days* for *implementing* the process solution.

When selecting the exact time frame, consider all the people involved as well as any technical preparation you need to do up front. You also might want to plan for further steps, like a few more things you implement yourself internally in a second follow up week.


## Presenting the results

Before presenting the results of your proof of concept to a wider audience of stakeholders, select a *speaker* who is comfortable with presenting, prepare a set of focused *slides* illustrating your progress and the lessons learned, and *test* your solution and presentation at least once up front.

The speaker might also be your Camunda Consultant - they are used to present to a wide audience!


## Checklists

### Technical

* *Cloud Access*: Make sure you have an account for Camunda Cloud with an active subscription or trial account

* *Installations*: Make sure your *developer systems*, as well as any *target systems* for the POC test and production you wish to use are set up. In particular install:

  * Camunda *Modeler* (https://camunda.org/download/modeler/)
  * Java, Maven and your favorite IDE (e.g. Eclipse)
  * Make sure *Maven* runs and builds and it can access all necessary dependencies. [Download und build this project](https://github.com/camunda-cloud/camunda-cloud-tutorials/tree/main/orchestrate-microservices/worker-java) can verify that your build runs.

* *Developer Computers*: For maximum productivity, all participating developers should use the computer with which they work every day. Avoid using computers from a training room or shared laptops unless they allow a remote connection to the developer's personal computer. If the developer's computers are neither portable nor remotely accessible consider conducting the POC in the regular office space of the developers. If your company network is restricting access to Maven and Git repositories on the Internet, consider using laptops that are not connected to the company network. Similarly, you should not force the external consultants to work on one of your computers. They will be twice as productive on their laptops and not lose time with software setup, configuration, and access restrictions. Obviously, you do not have to connect the consultant's laptop to your company network. Internet access and a shared code repository are enough to collaborate.

* *Files* or *Version Control System*: Make sure we can easily exchange files and code during the POC, preferably via your own version control system (e.g. Git or SVN) or at least via shared folders, USB sticks or email attachments.

* *Interfaces*: Clarify which technical systems interfaces you want to access during your POC, make any *documentation* for those available to the whole POC team and make sure there is a technically knowledgeable *contact person* for the interface available to the team during the POC. Set up a *test system* and verify that it is usable. Verify with Camunda that everything is clear to the team, in particular from a technological perspective.


### Organizational

Inform all POC team members and other relevant stakeholders about

* *goals* and the selected *scope* for the POC
* *start* and *end times*, as well as any additional preparation/meet-up times
* *names and roles* of all involved *people*

* for onsite POCs
  * exact *location/address* at which the POC is taking place as well as instructions about how to find together when arriving (for onsite POCs)
  * *projector*, white-board and flip-chart availability
  * *Internet* availability for team members and external consultants

* for remote POCs
  * exact meeting setup, e.g. links to the meeting room, passwords, etc.. In case you can't easily host meetings for external participants, your Camunda consultant can setup a Zoom or Microsoft Teams call
  * Ideally some chat capability, e.g. a temporary Slack account

Ideally, prepare a few *organizational* and/or *project* info slides to get everybody up to speed on day one of the workshop.