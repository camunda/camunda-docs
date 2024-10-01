---
id: collaboration
title: Collaborate with your team
description: Collaboration features and access rights for Web Modeler.
---

import SuperUserModeImg from './img/super-user-mode.png';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<span class="badge badge--cloud">Camunda 8 only</span>

## Projects

Files and folders are stored in projects.
The user access on files and folders is defined at the project level.

When you access Web Modeler via the Camunda 8 dashboard, you can note the **Home** page with all the projects you can access:
![home page](img/collaboration/web-modeler-home.png)

### Access rights and permissions

Users can have various levels of access to a project in Web Modeler, outlined in this section.

After creating a project, you can invite members of your Camunda 8 organization to collaborate in Web Modeler.
There are four roles with different levels of access rights that can be assigned to each user:

- **Project Admin**: The user can edit the project itself, all folders and diagrams within the project, and invite more users to collaborate.
- **Editor**: The user can edit all folders and diagrams within the project.
- **Commenter**: The user cannot edit folders or diagrams or invite users, but can view diagrams and properties and leave comments.
- **Viewer**: The user cannot edit folders or diagrams nor leave comments, but can only view diagrams.

Additionally, users with elevated access have special privileges to do administrative tasks in **super-user mode**.

#### Super-user mode

Super-user mode is only available to users with elevated access and can be enabled via the user menu in Web Modeler:

<p><img src={SuperUserModeImg} style={{width: 280}} alt="Enable super-user mode in Web Modeler's user menu" /></p>

The main purpose of this mode is to assign collaborators to orphaned projects (which have no collaborators).
Ordinarily, these projects would not be accessible or visible to any users.

When a user activates super-user mode, they are temporarily granted **Project Admin** access to all projects
of the organization. This allows them to assign collaborators to orphaned projects and gives them
full access when none of the ordinary collaborators are available.

##### Required roles/permissions for super-user mode access {#elevated-access}

<Tabs groupId="permissions" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

The user must be assigned the organization **Owner** or **Admin** role.

</TabItem>

<TabItem value='self-managed'>

The user must be assigned the **Web Modeler Admin** role.

If the role is not pre-existing, it can be created with the following permissions:

- Web Modeler Internal API - `write:*`
- Web Modeler Internal API - `admin:*`
- Camunda Identity Resource Server - `read:users`

Refer to the documentation pages about [assigning roles](../../../self-managed/identity/user-guide/roles/add-assign-role.md) and [adding permissions](../../../self-managed/identity/user-guide/roles/add-assign-permission.md) for detailed instructions.
</TabItem>

</Tabs>

### Inviting users to projects

:::note
Users without email addresses will not receive any kind of notification about project invitations.
:::

On the right side of a project, view a list of your collaborators and invite more by taking the steps below:

1. Click **Add user**.
   ![invite user](img/collaboration/web-modeler-collaborator-invite-modal-opened.png)

2. Choose a role for your new collaborator.
   ![invite choose role](img/collaboration/web-modeler-collaborator-invite-choose-role.png)

3. Begin typing the name or email of the individual and Web Modeler will suggest Camunda 8 organization members that you can invite to the project.
   ![invite suggestions](img/collaboration/web-modeler-collaborator-invite-suggestions.png)

4. Write a message to your new collaborator about their invitation to the project.
   ![invite type message](img/collaboration/web-modeler-collaborator-invite-type-message.png)

5. Click **Send** and your new collaborator will receive an email with the invitation.
   ![invite sent](img/collaboration/web-modeler-collaborator-invite-sent.png)
   ![invite email](img/collaboration/web-modeler-collaborator-invite-email.png)

:::info Self-Managed license restrictions
For Self-Managed non-production installations, the number of collaborators per project is limited to **five**, including the project administrator.

For more information, refer to the [licensing documentation](/reference/licenses.md#web-modeler).
:::

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

:::note
Users without email addresses will not receive any kind of notification about being mentioned in a comment.
:::

![comment suggestion email](img/collaboration/web-modeler-comment-mention-email.png)

## Interact with your collaborators

### Model a diagram together

When others are opening the same diagram as you, the updates on the diagram are sent in real time. You can also note who is in the diagram with you.
![real time collaboration](img/real-time-collaboration.png)

### Undo/redo management limitations

When collaborating with others on a diagram, you can only undo or redo your own actions until another collaborator makes a change, as the undo/redo history is reset each time another collaborator makes a change.

### Draw other's attention

Whether you are in a presentation or if others are in the same diagram as you are, use the attention grabber pointer to draw attention to a specific part of the diagram. To do this, take the following steps:

1. Switch on the attention grabber pointer from the canvas tools.
   ![attention grabber](img/attention-grabber.png)

2. Drop the pointer by clicking anywhere on the canvas.
   ![attention grabber gif](img/attention-grabber-pointer-pulse.gif)

The pointer will pulsate to draw attention and will match your avatar color.
It can also be seen in real-time by others that are looking at the same diagram as you.
