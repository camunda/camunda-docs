---
id: known-limitations
title: "Known limitations"
sidebar_label: "Known limitations"
---

While we make every effort to ensure Identity can run free of limitations, occasionally it is unavoidable. The currently known limitations are:

### Identity shows all clients from my Keycloak realm in the UI

When connecting Identity to a shared realm, we are unable to accurately determine what clients should and should not be displayed in the Identity UI. This means the clients in the realm you connect Identity to will be shown in the Identity UI.
