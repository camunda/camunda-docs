---
id: collaboration
title: Collaborate with your team
description: Collaboration features and access rights for Web Modeler.
---

<span class="badge badge--cloud">Camunda Platform 8 only</span>

## Projects

Files and folders are stored in projects.
The user access on files and folders is defined at the project level.

When you access Web Modeler via the Camunda Platform 8 dashboard, you see the **Home** page with all the projects you can access:
![home page](img/collaboration/web-modeler-home.png)

### Access rights and permissions

Users can have various levels of access to a project in Web Modeler, outlined in this section.

After creating a project, you can invite members of your Camunda Platform 8 organization to collaborate in Web Modeler.
There are four roles with different levels of access rights that can be assigned to each user:

- **Project Admin**: The user can edit the project itself, all folders and diagrams within the project, and invite more users to collaborate.
- **Editor**: The user can edit all folders and diagrams within the project.
- **Commenter**: the user cannot edit folders or diagrams nor invite users, but can view and leave comments on diagrams.
- **Viewer**: The user cannot edit folders or diagrams nor leave comments, but can only view diagrams.

### Inviting users to projects

:::note
Web Modeler expects users to have an email address associated with their account in the identity management system to receive invitations correctly.
:::

On the right side of a project, view a list of your collaborators and invite more by taking the steps below:

1. Click **Add user**.
   ![invite user](img/collaboration/web-modeler-collaborator-invite-modal-opened.png)

2. Choose a role for your new collaborator.
   ![invite choose role](img/collaboration/web-modeler-collaborator-invite-choose-role.png)

3. Begin typing the name of the individual and Web Modeler will suggest Camunda Platform 8 organization members that you can invite to the project.
   ![invite suggestions](img/collaboration/web-modeler-collaborator-invite-suggestions.png)

4. Write a message to your new collaborator about their invitation to the project.
   ![invite type message](img/collaboration/web-modeler-collaborator-invite-type-message.png)

5. Click **Send** and your new collaborator will receive an email with the invitation.
   ![invite sent](img/collaboration/web-modeler-collaborator-invite-sent.png)
   ![invite email](img/collaboration/web-modeler-collaborator-invite-email.png)

### Folders

You can create folders in a project to semantically group and organize your diagrams.
The user access on a folder is inherited from the project.

## Sharing and embedding diagrams

Diagrams can also be shared with others in read-only mode via a sharing link.
This link can also be protected with an additional password.

1. Navigate to a diagram and click on the share icon button.
   ![share button](img/collaboration/web-modeler-share-icon-button.png)

2. Click **Create link**.
   ![share create link](img/collaboration/web-modeler-share-modal.png)

3. Click **Copy** to copy the link to your clipboard.
   ![share copy link](img/collaboration/web-modeler-share-modal-create.png)

4. Click **Add** and type a new password to protect your link.
   ![share copy link](img/collaboration/web-modeler-share-modal-password-protect.png)

5. Click **Email** to share the new link with multiple recipients.
   ![share copy link](img/collaboration/web-modeler-share-modal-email.png)

Similar to the sharing link, a diagram can be embedded into HTML pages via an iframe tag. The iframe tag can be copied from the sharing dialog via the **Embed** button.

For wiki systems like [Confluence](https://www.atlassian.com/software/confluence), we recommend using the HTML macro and adding the iframe tag from the sharing dialog. This way, diagrams can be easily included in documentation pages. To adjust the dimensions of the diagram, the width and height values of the iframe tag can be modified.

## Comments

When selecting an element of the BPMN diagram, a discussion can be attached to this element. If no element is selected, the discussion will be attached directly to the diagram.
Switch between the **Properties Panel** and **Comments** using the two tabs present at the top of the right side panel.
![comment](img/collaboration/web-modeler-comment-type-here.png)

New comments can be added to the discussion by any collaborator with Admin, Editor, or Commenter access rights.

Afterwards, the comment can be edited or deleted via the context menu icon.
![comment context menu](img/collaboration/web-modeler-comment-with-context-menu.png)

Elements with discussions attached will always have a visible blue overlay, so you can easily identify discussion points.
![comment context menu](img/collaboration/web-modeler-comment-overlay-on-diagram.png)

### Mention others in comments

By typing the **@** character, you are able to filter the collaborators on the project and select one of them.
![comment suggestion](img/collaboration/web-modeler-comment-mention-suggestions.png)

When submitting the comment, this user will receive an email as a notification about the new comment.
![comment suggestion email](img/collaboration/web-modeler-comment-mention-email.png)

## Interact with your collaborators

### Model a diagram together

When others are opening the same diagram as you, the updates on the diagram are sent in real time. You can also see who is in the diagram with you.
![real time collaboration](img/real-time-collaboration.png)

### Draw other's attention

Whether you are in a presentation or if others are in the same diagram as you are, use the attention grabber pointer to draw attention to a specific part of the diagram. To do this, take the following steps:

1. Switch on the attention grabber pointer from the canvas tools.
   ![attention grabber](img/attention-grabber.png)

2. Drop the pointer by clicking anywhere on the canvas.
   ![attention grabber gif](img/attention-grabber-pointer-pulse.gif)

The pointer will pulsate to draw attention and will match your avatar color.
It can also be seen in real-time by others that are looking at the same diagram as you.
