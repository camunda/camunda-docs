---
title: Configuration
sidebar_label: Configuration
mdx:
  format: md
---

# Configuration

## Client

```python
class Client(base_url, , raise_on_unexpected_status=False, cookies=NOTHING, headers=NOTHING, timeout=None, verify_ssl=True, follow_redirects=False, httpx_args=NOTHING)
```

Bases: `object`

A class for keeping track of data related to the API

The following are accepted as keyword arguments and will be used to construct httpx Clients internally:

> `base_url`: The base URL for the API, all requests are made to a relative path to this URL

> `cookies`: A dictionary of cookies to be sent with every request

> `headers`: A dictionary of headers to be sent with every request

> `timeout`: The maximum amount of a time a request can take. API functions will raise
> httpx.TimeoutException if this is exceeded.

> `verify_ssl`: Whether or not to verify the SSL certificate of the API server. This should be True in production,
> but can be set to False for testing purposes.

> `follow_redirects`: Whether or not to follow redirects. Default value is False.

> `httpx_args`: A dictionary of additional arguments to be passed to the `httpx.Client` and `httpx.AsyncClient` constructor.

- **Parameters:**
  - **base_url** (_str_)
  - **raise_on_unexpected_status** (_bool_)
  - **cookies** (_dict_ _[\*\*str_ _,_ _str_ _]_)
  - **headers** (_dict_ _[\*\*str_ _,_ _str_ _]_)
  - **timeout** (_httpx.Timeout_ _|_ _None_)
  - **verify_ssl** (_str_ _|_ _bool_ _|_ _ssl.SSLContext_)
  - **follow_redirects** (_bool_)
  - **httpx_args** (_dict_ _[\*\*str_ _,_ _Any_ _]_)

### raise_on_unexpected_status

Whether or not to raise an errors.UnexpectedStatus if the API returns a
status code that was not documented in the source OpenAPI document. Can also be provided as a keyword
argument to the constructor.

- **Type:**
  bool

### get_async_httpx_client()

```python
def get_async_httpx_client()
```

Get the underlying httpx.AsyncClient, constructing a new one if not previously set

- **Return type:**
  _AsyncClient_

### get_httpx_client()

```python
def get_httpx_client()
```

Get the underlying httpx.Client, constructing a new one if not previously set

- **Return type:**
  _Client_

### raise_on_unexpected_status

```python
raise_on_unexpected_status: bool
```

### set_async_httpx_client()

```python
def set_async_httpx_client(async_client)
```

Manually set the underlying httpx.AsyncClient

**NOTE**: This will override any other settings on the client, including cookies, headers, and timeout.

- **Parameters:**
  **async_client** (_AsyncClient_)
- **Return type:**
  [_Client_](#client)

### set_httpx_client()

```python
def set_httpx_client(client)
```

Manually set the underlying httpx.Client

**NOTE**: This will override any other settings on the client, including cookies, headers, and timeout.

- **Parameters:**
  **client** (_Client_)
- **Return type:**
  [_Client_](#client)

### with_cookies()

```python
def with_cookies(cookies)
```

Get a new client matching this one with additional cookies

- **Parameters:**
  **cookies** (_dict_ _[\*\*str_ _,_ _str_ _]_)
- **Return type:**
  [_Client_](#client)

### with_headers()

```python
def with_headers(headers)
```

Get a new client matching this one with additional headers

- **Parameters:**
  **headers** (_dict_ _[\*\*str_ _,_ _str_ _]_)
- **Return type:**
  [_Client_](#client)

### with_timeout()

```python
def with_timeout(timeout)
```

Get a new client matching this one with a new timeout configuration

- **Parameters:**
  **timeout** (_Timeout_)
- **Return type:**
  [_Client_](#client)

## AuthenticatedClient

```python
class AuthenticatedClient(base_url, token, prefix='Bearer', auth_header_name='Authorization', , raise_on_unexpected_status=False, cookies=NOTHING, headers=NOTHING, timeout=None, verify_ssl=True, follow_redirects=False, httpx_args=NOTHING)
```

Bases: `object`

A Client which has been authenticated for use on secured endpoints

The following are accepted as keyword arguments and will be used to construct httpx Clients internally:

> `base_url`: The base URL for the API, all requests are made to a relative path to this URL

> `cookies`: A dictionary of cookies to be sent with every request

> `headers`: A dictionary of headers to be sent with every request

> `timeout`: The maximum amount of a time a request can take. API functions will raise
> httpx.TimeoutException if this is exceeded.

> `verify_ssl`: Whether or not to verify the SSL certificate of the API server. This should be True in production,
> but can be set to False for testing purposes.

> `follow_redirects`: Whether or not to follow redirects. Default value is False.

> `httpx_args`: A dictionary of additional arguments to be passed to the `httpx.Client` and `httpx.AsyncClient` constructor.

- **Parameters:**
  - **base_url** (_str_)
  - **token** (_str_)
  - **prefix** (_str_)
  - **auth_header_name** (_str_)
  - **raise_on_unexpected_status** (_bool_)
  - **cookies** (_dict_ _[\*\*str_ _,_ _str_ _]_)
  - **headers** (_dict_ _[\*\*str_ _,_ _str_ _]_)
  - **timeout** (_httpx.Timeout_ _|_ _None_)
  - **verify_ssl** (_str_ _|_ _bool_ _|_ _ssl.SSLContext_)
  - **follow_redirects** (_bool_)
  - **httpx_args** (_dict_ _[\*\*str_ _,_ _Any_ _]_)

### raise_on_unexpected_status

Whether or not to raise an errors.UnexpectedStatus if the API returns a
status code that was not documented in the source OpenAPI document. Can also be provided as a keyword
argument to the constructor.

- **Type:**
  bool

### token

The token to use for authentication

- **Type:**
  str

### prefix

The prefix to use for the Authorization header

- **Type:**
  str

### auth_header_name

The name of the Authorization header

- **Type:**
  str

### auth_header_name

```python
auth_header_name: str
```

### get_async_httpx_client()

```python
def get_async_httpx_client()
```

Get the underlying httpx.AsyncClient, constructing a new one if not previously set

- **Return type:**
  _AsyncClient_

### get_httpx_client()

```python
def get_httpx_client()
```

Get the underlying httpx.Client, constructing a new one if not previously set

- **Return type:**
  _Client_

### prefix

```python
prefix: str
```

### raise_on_unexpected_status

```python
raise_on_unexpected_status: bool
```

### set_async_httpx_client()

```python
def set_async_httpx_client(async_client)
```

Manually set the underlying httpx.AsyncClient

**NOTE**: This will override any other settings on the client, including cookies, headers, and timeout.

- **Parameters:**
  **async_client** (_AsyncClient_)
- **Return type:**
  [_AuthenticatedClient_](#authenticatedclient)

### set_httpx_client()

```python
def set_httpx_client(client)
```

Manually set the underlying httpx.Client

**NOTE**: This will override any other settings on the client, including cookies, headers, and timeout.

- **Parameters:**
  **client** (_Client_)
- **Return type:**
  [_AuthenticatedClient_](#authenticatedclient)

### token

```python
token: str
```

### with_cookies()

```python
def with_cookies(cookies)
```

Get a new client matching this one with additional cookies

- **Parameters:**
  **cookies** (_dict_ _[\*\*str_ _,_ _str_ _]_)
- **Return type:**
  [_AuthenticatedClient_](#authenticatedclient)

### with_headers()

```python
def with_headers(headers)
```

Get a new client matching this one with additional headers

- **Parameters:**
  **headers** (_dict_ _[\*\*str_ _,_ _str_ _]_)
- **Return type:**
  [_AuthenticatedClient_](#authenticatedclient)

### with_timeout()

```python
def with_timeout(timeout)
```

Get a new client matching this one with a new timeout configuration

- **Parameters:**
  **timeout** (_Timeout_)
- **Return type:**
  [_AuthenticatedClient_](#authenticatedclient)
