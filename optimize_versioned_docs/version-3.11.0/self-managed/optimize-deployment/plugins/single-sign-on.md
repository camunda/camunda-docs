---
id: single-sign-on
title: "Single sign on"
description: "Register your own hook into the Optimize authentication system such that you can integrate Optimize with your single sign on system."
---

<span class="badge badge--platform">Camunda 7 only</span>

Before implementing the plugin, make sure that you have [set up your environment](./plugin-system.md/#setup-your-environment).

This feature allows you to register your own hook into the Optimize authentication system such that you can
integrate Optimize with your single sign on system. This allows you to skip the log in via the Optimize interface.

For that, the Optimize plugin system provides the following interface:

```java
public interface AuthenticationExtractor {

  AuthenticationResult extractAuthenticatedUser(HttpServletRequest servletRequest);
}
```

Implement this interface to extract your custom auth header from the JAX-RS servlet request, which is represented by `servletRequest`.
With the given request you are able to extract your information both from the request header and from the request cookies.

The following example extracts a header with the name `user` and if the header exists, the user name from the header is authenticated:

```java
package com.example.optimize.security.authentication;

import org.camunda.optimize.plugin.security.authentication.AuthenticationExtractor;
import org.camunda.optimize.plugin.security.authentication.AuthenticationResult;

import jakarta.servlet.http.HttpServletRequest;

public class AutomaticallySignInUserFromHeaderPlugin implements AuthenticationExtractor {

  @Override
  public AuthenticationResult extractAuthenticatedUser(HttpServletRequest servletRequest) {
    String userToAuthenticate = servletRequest.getHeader("user");
    AuthenticationResult result = new AuthenticationResult();
    result.setAuthenticatedUser(userToAuthenticate);
    result.setAuthenticated(userToAuthenticate != null);
    return result;
  }
}
```

Similar to the other plugins' setup, you have to package your plugin in a `jar`, add it to Optimize's `plugin` folder, and make Optimize find it by adding the following configuration to `environment-config.yaml`:

```yaml
plugin:
  authenticationExtractor:
    # Looks in the given base package list for authentication extractor plugins.
    # If empty, the standard Optimize authentication mechanism is used.
    basePackages: ["com.example.optimize.security.authentication"]
```

For more information and example implementations, have a look at the [Optimize Examples Repository](https://github.com/camunda/camunda-optimize-examples#getting-started-with-sso-plugins).
