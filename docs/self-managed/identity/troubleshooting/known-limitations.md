---
id: known-limitations
title: "Known limitations"
sidebar_label: "Known limitations"
---

Whilst we make every effort to ensure that Identity can run free of limitations, occasionally it is unavoidable. The
limitations that we know to exist are:

### Identity shows all clients from my Keycloak realm in the UI

When connecting Identity to a shared realm we are unable to accurately determine what clients should and should not be
displayed in the Identity UI, this means that the Clients that are in the realm you connect Identity to will be shown in the Identity UI.
