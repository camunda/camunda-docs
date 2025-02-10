---
title: "Following the customer success path"
tags:
  - Project Management
description: "Follow certain steps and Best Practices when evaluating and introducing process automation to help make it a success."
---

Following certain steps when evaluating and introducing process automation helps to make it a success. Ensure you review the appropriate best practices at the right time.

## Understanding the customer success path

When introducing Camunda as a new process automation platform inside your company, the following process has shown to work best:

<div bpmn="best-practices/following-the-customer-success-path-assets/customer-success.bpmn" callouts="Evaluate, Identify, Poc, DevelopPilot, PrepareOps, Review, ImplementNext, BuildPlatform, ProcessArchitecture" />

<span className="callout">1</span>

_Evaluation_: Take the philosophy of the evaluated products into greater consideration than working solely with feature matrices. Practical experience can be invaluable. You might be interested in our [Whitepaper: "Camunda compared to alternatives"](https://page.camunda.com/wp-camunda-compared-to-alternatives).

<span className="callout">2</span>

_Process selection_: It is very important to select a suitable pilot process. Use a relevant process where you can show benefits of BPM including a Return on Invest (ROI) calculation. However, avoid too big or too "political" processes to minimize the risk of failure due to avoidable reasons. Note that you can use this process in the proof of concept (PoC) or select a different process for the first PoC, depending on the goals you have.

<span className="callout">3</span>

_Proof of Concept_ (PoC): Model the process to a high standard. It should be clear, understandable, and precise, as it will have a high visibility. Include necessary technical proofs, like calling real services in your environment. Include human tasks if your process where appropriate. We suggest using Camunda Tasklist as a first step to save effort in developing your own tasklist, unless a tasklist is important for your overall proof. Include "eye candies" like reporting to make non-technical stakeholders happy. Concentrate on the important aspects to do the proof and prepare to throw away the code afterwards to start fresh for the pilot, as it is very valid for early POCs to be "hacky" in order to keep focus on the end goals.

<span className="callout">4</span>

_Development_: Model the process with the same standard described for a PoC. It should be clear, understandable, and precise. Again, the reason for this is that it will be the most visible part of the project. Develop the process application in an iterative manner to learn fast. Do proper testing to achieve a high quality.

<span className="callout">5</span>

_Operations_: Prepare for real operations, which includes setting up the real hardware as well as securing and monitoring the platform.

<span className="callout">6</span>

_Pilot review_ and _Pilot improvements_: Review the project after it has finished and gone live. Take some time to clean up, as the project normally serves as a "lighthouse" and "copy and paste" template for sequential projects, so it is worth the effort. It's better to plan time for this phase than try to make things perfect during early development, as you will have learned a lot once the pilot runs on the live system for a while.

<span className="callout">7</span>

_Next processes_: Try to avoid doing too many projects in parallel in the beginning to allow new learning to influence your future work. If you have parallel pilots, organize knowledge sharing between the teams. Ideally, let the team of the first pilot directly implement a sequential process.

<span className="callout">8</span>

_Custom BPM Platform_: In bigger organizations, you typically try to set up your custom BPM platform, meaning a common infrastructure for all upcoming Camunda projects. Try to do as little of this as possible during the first pilot and start building the platform afterwards, taking all learnings into account. At the same time, do what is necessary for the pilot project itself or for other stakeholders to feel comfortable (e.g. Enterprise Architecture).

<span className="callout">9</span>

_Process architecture_: BPM initiatives often start by drafting a process landscape and capture all relevant processes of the company. Try to avoid this, and do as little as possible during your first pilot project. Maybe do a quick process survey to capture relevant processes (by name) to identify a good candidate for the pilot. Especially do not model all processes in your company in depth before you experienced an "end-to-end" project, including automation of Camunda yourself. Then, you will have gained a deeper understanding of methodology and value around BPMN and DMN.

## Estimating effort

When starting your BPM project, it is often necessary to roughly estimate the expected effort. A process model can serve as a central artifact for estimation purposes. Avoid too fine-grained estimations as they typically are not worth the effort.

However, on a management level one often must have some estimations to secure budgets, get projects started, allocate needed resources, and communicate expected time frames. The success factor is to do estimations _on a very rough level_ and avoid spending too much time with details. More often than not, the details develop differently than expected anyway.

We often note customers successfully estimate _T-Shirt size categories (S, M, L, XL and XXL)_. Such an approach is sufficient for us to make roughly informed decisions about priority and return on investment.

![T-Shirts](following-the-customer-success-path-assets/t-shirts.png)

Having said that, your organization may demand that you _map_ such rough sizes to some measuring system already used; for example, _story points_ or _person days_. To preserve the rough character, consider mapping the sizes by using a series of sharply increasing numbers:

| S   | M   | L   | XL  | XXL |
| --- | --- | --- | --- | --- |
| 2   | 5   | 13  | 50  | 200 |

Much more important than concrete numbers is an educated gut feeling. Therefore, try to understand the influencing factors determining most of the effort by implementing your lighthouse process.

### Using the process model for estimation

A process model can be seen as a central artifact for estimation purpose, as it indicates and visually maintains a lot of the influencing factors mentioned above.

<div bpmn="best-practices/following-the-customer-success-path-assets/invoice.bpmn" callouts="invoiceReceived,assignApprover,approveInvoice,reviewInvoice,prepareBankTransfer,archiveInvoice" />

Here are the figures you could estimate:

1. Setting up development environment: **S**
2. Modeling and understanding requirements: **L**
3. Implementing the process solution:

- Implement UI for PDF upload: **S** <span className="callout">1</span>
- Implement forms: **S** <span className="callout">2</span> <span className="callout">3</span> <span className="callout">4</span> <span className="callout">5</span>
- Implement integrating the PDF archive: **S** <span className="callout">6</span>

4. Going live: **M**

Using the process model, you can also foresee potential effort drivers, for example:

- The legacy archive is really hard to integrate.
- The tasks need to be integrated into an existing legacy task list, which might not be straight forward to do.
- The metadata from the PDF shall be extracted, and a specialized form be shown to the user.
