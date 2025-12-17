---
id: notices
title: "Security notices"
description: "Let's take a closer look at security notices, reporting vulnerabilities, and additional security information."
toc_max_heading_level: 2
---

Camunda publishes security notices after fixes are available.

:::tip Subscribe to security notices
Stay informed about security updates by subscribing to our [RSS feed](pathname:///rss/security/notices.xml). Get automatic notifications when new security notices are published.
:::

## Report a security issue or vulnerability

Report security vulnerabilities to Camunda immediately, following the instructions at [Camunda Security](https://camunda.com/security#report-a-vulnerability).

:::info
To learn more about security at Camunda, including our security policy, security issue management, and more, see [Camunda.com/security](https://camunda.com/security).
:::

## Notice 37

### Publication date

December 12, 2025

### Products affected

- Camunda Tasklist
- Camunda Zeebe
- Camunda Operate

### Impact

The application is vulnerable to [CVE-2025-12183](https://nvd.nist.gov/vuln/detail/CVE-2025-12183), which allows remote attackers to cause denial of service and read adjacent memory via untrusted compressed input.

### How to determine if the installation is affected

You are using:

- Tasklist/Zeebe/Operate ≤ 8.8.6, ≤ 8.7.20, or ≤ 8.6.32

### Solution

Camunda has provided the following releases which contain the fix:

- Tasklist/Zeebe/Operate 8.8.7, 8.7.21, 8.6.33

## Notice 36

### Publication date

December 03, 2025

### Products affected

- Management Identity

### Impact

The application is vulnerable to [CVE-2025-53066](https://nvd.nist.gov/vuln/detail/CVE-2025-53066), which allows an unauthenticated attacker with network access via multiple protocols to compromise Oracle Java SE, Oracle GraalVM for JDK, Oracle GraalVM Enterprise Edition. Successful attacks of this vulnerability can result in unauthorized access to critical data or complete access to all Oracle Java SE, Oracle GraalVM for JDK, Oracle GraalVM Enterprise Edition accessible data.

### How to determine if the installation is affected

You are using:

- Management Identity ≤ 8.8.2, ≤ 8.7.10, or ≤ 8.6.22

### Solution

Camunda has provided the following releases which contain the fix:

- Management Identity 8.8.3, 8.7.11, 8.6.23

## Notice 35

### Publication date

November 26, 2025

### Products affected

- Camunda Web Modeler Self-Managed
- Camunda Management Identity

### Impact

The embedded JDBC driver for Amazon Aurora PostgreSQL (`software.amazon.jdbc:aws-advanced-jdbc-wrapper`) was affected by
[CVE-2025-12967](https://nvd.nist.gov/vuln/detail/CVE-2025-12967), which may allow for privilege escalation to the `rds_superuser` role.
A low privilege authenticated user can create a crafted function that could be executed with permissions of other Amazon Relational Database Service (RDS) users.

### How to determine if the installation is affected

You are using:

- Web Modeler Self-Managed ≤ 8.8.2, ≤ 8.7.12, or ≤ 8.6.21 with Amazon Aurora PostgreSQL
- Management Identity ≤ 8.8.1, ≤ 8.7.9, or ≤ 8.6.21 with Amazon Aurora PostgreSQL

### Solution

Camunda has provided the following releases which contain the fix:

- Web Modeler Self-Managed 8.8.3, 8.7.13, 8.6.22
- Management Identity 8.8.2, 8.7.10, 8.6.22

## Notice 34

### Publication date

November 11, 2025

### Products affected

- Camunda Web Modeler Self-Managed

### Impact

The version of the MSSQL JDBC driver `com.microsoft.sqlserver:mssql-jdbc` used by Web Modeler was affected by [CVE-2025-59250](https://nvd.nist.gov/vuln/detail/CVE-2025-59250), which allows improper input validation that could enable an attacker to perform spoofing over a network.

### How to determine if the installation is affected

You are using Web Modeler Self-Managed version &lt;= 8.8.1 and Microsoft SQL Server as database vendor.

### Solution

Camunda has provided the following release which contains the fix:

- Web Modeler Self-Managed 8.8.2

## Notice 33

### Publication date

October 22, 2025

### Products affected

- Camunda Orchestration Cluster

### Impact

A bug in signal broadcast command processing allowed unauthorized users to trigger signal start events or signal intermediate catch events in certain process definitions without the required create or update permissions.

This did not allow users to access process definitions of other tenants, or leak any information about these process instances back to the unauthorized users.

### How to determine if the installation is affected

You are using:

- Orchestration Cluster 8.8.0

### Solution

Camunda has provided the following release which contains the fix:

- Orchestration Cluster 8.8.1

## Notice 32

### Publication date

October 21, 2025

### Products affected

- Camunda Identity

### Impact

The embedded Apache Tomcat was affected by [CVE-2025-48989](https://nvd.nist.gov/vuln/detail/CVE-2025-48989) which made Tomcat vulnerable to the MadeYouReset attack.

### How to determine if the installation is affected

You are using:

- Identity 8.7.0 - 8.7.4 or 8.7.6 - 8.7.7

### Solution

Camunda has provided the following release which contains the fix:

- Identity 8.7.8

## Notice 31

### Publication date

October 16, 2025

### Products affected

- Camunda Web Modeler

### Impact

The embedded Undertow web server was affected by [CVE-2025-9784](https://nvd.nist.gov/vuln/detail/CVE-2025-9784),
a flaw where malformed client requests can trigger server-side stream resets without incrementing abuse counters.

This issue, referred to as the "MadeYouReset" attack, allows malicious clients to induce excessive server workload by
repeatedly causing server-side stream aborts and could be exploited to cause a denial of service (DoS).

### How to determine if the installation is affected

You are using:

- Web Modeler Self-Managed 8.8.0, ≤ 8.7.10, or ≤ 8.6.19

### Solution

Camunda has provided the following releases which contain the fix:

- Web Modeler Self-Managed 8.8.1, 8.7.11, 8.6.20

The fix was deployed to Web Modeler SaaS on October 14, 2025, 14:26 CET.

## Notice 30

### Publication date

October 7th, 2025

### Products affected

- Camunda Tasklist
- Camunda Zeebe
- Camunda Operate
- Camunda Optimize
- Camunda Identity

### Impact

The embedded Netty was affected by [CVE-2025-58056](https://nvd.nist.gov/vuln/detail/CVE-2025-58056), an HTTP request
smuggling vulnerability in Netty. Incorrect parsing of chunked transfer encoding could allow attackers to craft
malicious requests that are interpreted inconsistently by proxies and Netty.

### How to determine if the installation is affected

You are using:

- Tasklist 8.7.0 - 8.7.12 or 8.5.0 - 8.5.22
- Zeebe 8.7.0 - 8.7.12 or 8.5.0 - 8.5.24
- Operate 8.7.0 - 8.7.12 or 8.5.0 - 8.5.20
- Optimize 8.7.0 - 8.7.9 or 8.6.0 - 8.6.16
- Identity 8.7.0 - 8.7.6 or 8.6.0 - 8.6.19 or 8.5.0 - 8.5.21

### Solution

Camunda has provided the following releases which contain the fix:

- Tasklist 8.7.13, 8.5.23
- Zeebe 8.7.13, 8.5.25
- Operate 8.7.13, 8.5.21
- Optimize 8.7.10, 8.6.17
- Identity 8.7.7, 8.6.20, 8.5.22

## Notice 29

### Publication date

October 3, 2025

### Products affected

- Camunda Zeebe

### Impact

Zeebe may be affected by [CVE-2024-41996](https://nvd.nist.gov/vuln/detail/CVE-2024-41996), which allows remote attackers to trigger expensive server-side DHE modular-exponentiation calculations, potentially causing asymmetric resource consumption and DoS attacks.

### How to determine if the installation is affected

You are potentially affected if you have configured Zeebe to accept DHE or ECDHE cipher suites through the `server.ssl.ciphers` property or `SERVER_SSL_CIPHERS` environment variable.

Default Zeebe installations are not affected.

### Solution

Configure the `server.ssl.ciphers` property or `SERVER_SSL_CIPHERS` environment variable to exclude DHE and ECDHE cipher suites. For example:

```
server.ssl.ciphers=TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256,TLS_RSA_WITH_AES_256_CBC_SHA256,TLS_RSA_WITH_AES_128_CBC_SHA256,TLS_RSA_WITH_AES_256_CBC_SHA
```

There is no known mitigation other than disabling the use of DHE and ECDHE cipher suites.

## Notice 28

### Publication date

September 9, 2025

### Products affected

- Camunda Optimize

### Impact

Optimize was affected by [CVE-2025-5115](https://nvd.nist.gov/vuln/detail/CVE-2025-5115), which allows a remote attacker to repeatedly send malformed HTTP/2 frames that exhaust a Jetty server’s CPU and memory, causing a denial-of-service.

### How to determine if the installation is affected

You are using:

- Optimize 8.7.0 - 8.7.8 or 8.6.0 - 8.6.15

### Solution

Camunda has provided the following releases which contain the fix:

- Optimize 8.7.9, 8.6.16

## Notice 27

### Publication date

August 27, 2025

### Products affected

- Camunda Optimize

### Impact

Optimize's email functionality was affected by [CVE-2025-7962](https://nvd.nist.gov/vuln/detail/CVE-2025-7962), which allowed for SMTP injection by providing forged email recipient addresses that could lead to malicious content being sent to arbitrary recipients.

### How to determine if the installation is affected

You are using:

- Optimize 8.7.0 - 8.7.7 or 8.6.0 - 8.6.14

### Solution

Camunda has provided the following releases which contain the fix:

- Optimize 8.7.8, 8.6.15

## Notice 26

### Publication date

August 27, 2025

### Products affected

- Camunda Optimize

### Impact

Optimize was affected by [CVE-2025-53864](https://nvd.nist.gov/vuln/detail/CVE-2025-53864) which allows a remote attacker to cause a denial of service via a deeply nested JSON object supplied in a JWT claim set, because of uncontrolled recursion.

### How to determine if the installation is affected

You are using:

- Optimize 8.7.0 - 8.7.7 or 8.6.0 - 8.6.14

### Solution

Camunda has provided the following releases which contain the fix:

- Optimize 8.7.8, 8.6.15

## Notice 25

### Publication date

August 27, 2025

### Products affected

- Camunda Tasklist
- Camunda Zeebe
- Camunda Operate
- Camunda Optimize

### Impact

The embedded Apache Tomcat was affected by [CVE-2025-48989](https://nvd.nist.gov/vuln/detail/CVE-2025-48989) which made Tomcat vulnerable to the MadeYouReset attack.

### How to determine if the installation is affected

You are using:

- Tasklist 8.7.0 - 8.7.10 or 8.6.0 - 8.6.24 or 8.5.0 - 8.5.20
- Zeebe 8.7.0 - 8.7.10 or 8.6.0 - 8.6.24
- Operate 8.7.0 - 8.7.10 or 8.6.0 - 8.6.24 or 8.5.0 - 8.5.18
- Optimize 8.7.0 - 8.7.7 or 8.6.0 - 8.6.14

### Solution

Camunda has provided the following releases which contain the fix:

- Tasklist 8.7.11, 8.6.25, 8.5.21
- Zeebe 8.7.11, 8.6.25
- Operate 8.7.11, 8.6.25, 8.5.19
- Optimize 8.7.8, 8.6.15

## Notice 24

### Publication date

August 27, 2025

### Products affected

- Camunda Tasklist
- Camunda Zeebe
- Camunda Operate
- Camunda Identity
- Camunda Optimize

### Impact

The embedded Netty was affected by [CVE-2025-55163](https://nvd.nist.gov/vuln/detail/CVE-2025-55163) which allows malformed HTTP/2 control frames usage that results in resource exhaustion and distributed denial of service.

### How to determine if the installation is affected

You are using:

- Tasklist 8.7.0 - 8.7.10 or 8.6.0 - 8.6.24 or 8.5.0 - 8.5.20
- Zeebe 8.7.0 - 8.7.10 or 8.6.0 - 8.6.24 or 8.5.0 - 8.5.22
- Operate 8.7.0 - 8.7.10 or 8.6.0 - 8.6.24 or 8.5.0 - 8.5.18
- Identity 8.7.0 - 8.7.5 or 8.6.0 - 8.6.18 or 8.5.0 - 8.5.19
- Optimize 8.7.0 - 8.7.7 or 8.6.0 - 8.6.14

### Solution

Camunda has provided the following releases which contain the fix:

- Tasklist 8.7.11, 8.6.25, 8.5.21
- Zeebe 8.7.11, 8.6.25, 8.5.23
- Operate 8.7.11, 8.6.25, 8.5.19
- Identity 8.7.6, 8.6.19, 8.5.20
- Optimize 8.7.8, 8.6.15

## Notice 23

### Publication date

July 31, 2025

### Products affected

- Camunda Tasklist
- Camunda Zeebe
- Camunda Operate
- Camunda Identity
- Camunda Optimize

### Impact

The embedded Spring Boot Tomcat was affected by [CVE-2025-53506](https://nvd.nist.gov/vuln/detail/CVE-2025-53506) which allowed for uncontrolled resource consumption that could be used to exhaust system resources in a potential DoS (denial of service) attack.

### How to determine if the installation is affected

You are using:

- Tasklist 8.7.0 - 8.7.8 or 8.6.0 - 8.6.22 or 8.5.0 - 8.5.18
- Zeebe 8.7.0 - 8.7.8 or 8.6.0 - 8.6.22
- Operate 8.7.0 - 8.7.8 or 8.6.0 - 8.6.22 or 8.5.0 - 8.5.16
- Identity 8.7.0 - 8.7.4 or 8.6.0 - 8.6.17 or 8.5.0 - 8.5.18
- Optimize 8.7.0 - 8.7.6 or 8.6.0 - 8.6.12

### Solution

Camunda has provided the following releases which contain the fix:

- Tasklist 8.7.9, 8.6.23, 8.5.19
- Zeebe 8.7.9, 8.6.23
- Operate 8.7.9, 8.6.23, 8.5.17
- Identity 8.7.5, 8.6.18, 8.5.19
- Optimize 8.7.7, 8.6.13

## Notice 22

### Publication date

July 31, 2025

### Products affected

- Camunda Tasklist
- Camunda Zeebe
- Camunda Operate

### Impact

Part of our RESTful API that supported multipart file uploads was affected by [CVE-2025-52520](https://nvd.nist.gov/vuln/detail/CVE-2025-52520), which could lead to potential DoS (denial of service) attacks.

### How to determine if the installation is affected

You are using:

- Tasklist 8.6.0 - 8.6.22 or 8.7.0 - 8.7.8
- Zeebe 8.6.0 - 8.6.22 or 8.7.0 - 8.7.8
- Operate 8.6.0 - 8.6.22 or 8.7.0 - 8.7.8

### Solution

Camunda has provided the following releases which contain the fix:

- Tasklist 8.6.22
- Tasklist 8.7.9
- Zeebe 8.6.23
- Zeebe 8.7.9
- Operate 8.6.23
- Operate 8.7.9

## Notice 21

### Publication date

June 18, 2025

### Products affected

Camunda Web Modeler Self-Managed

### Impact

The version of `org.postgresql:postgresql` used by Camunda Web Modeler Self-Managed was affected by [CVE-2025-49146](https://nvd.nist.gov/vuln/detail/CVE-2025-49146) potentially allowing a man-in-the-middle attacker to intercept connections when the PostgreSQL JDBC driver was configured with channel binding set to required.

### How to determine if the installation is affected

You are using Camunda Web Modeler Self-Managed version 8.6.0 - 8.6.12, or 8.7.0 - 8.7.3.

### Solution

Camunda has provided the following releases which contain the fix:

- Camunda Web Modeler Self-Managed 8.6.12
- Camunda Web Modeler Self-Managed 8.7.3

## Notice 20

### Publication date

June 17, 2025

### Products affected

Camunda Optimize

### Impact

Camunda Optimize was affected by a vulnerability that allowed an attacker to gain improper access to Optimize data by using a modified JWT (JSON Web Token).

### How to determine if the installation is affected

You are using Camunda Optimize ≤ 8.6.9 or ≤ 8.7.2.

### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Optimize 8.6.10](https://github.com/camunda/camunda/releases/tag/8.6.10-optimize)
- [Camunda Optimize 8.7.3](https://github.com/camunda/camunda/releases/tag/8.7.3-optimize)

## Notice 19

### Publication date

May 21, 2025

### Products affected

Camunda Web Modeler

### Impact

The version of `nodejs` used by Camunda Web Modeler was affected by [CVE-2025-23166](https://nvd.nist.gov/vuln/detail/CVE-2025-23166) potentially allowing an adversary to remotely crash the Node.js runtime.

### How to determine if the installation is affected

You are using Camunda Web Modeler Self-Managed version ≤ 8.4.17, ≤ 8.5.18, ≤ 8.6.10, or ≤ 8.7.1.

### Solution

Camunda has provided the following releases which contain the fix:

- Camunda Web Modeler Self-Managed 8.4.18
- Camunda Web Modeler Self-Managed 8.5.19
- Camunda Web Modeler Self-Managed 8.6.11
- Camunda Web Modeler Self-Managed 8.7.2

The fix was deployed to Web Modeler SaaS on May 19, 2025, 15:10 CET.

## Notice 18

### Publication date

April 8, 2025

### Products affected

Camunda Optimize

### Impact

Camunda Optimize was affected by a vulnerability that allowed an attacker to modify a JWT (JSON Web Token) so that they would be given improper access to Optimize.

### How to determine if the installation is affected

You are using Camunda Optimize ≤ 8.4.15, ≤ 8.5.12, ≤ 8.6.6, ≤ 8.7.0, ≤ 3.11.20, ≤ 3.12.15, ≤ 3.13.12, ≤ 3.14.3, ≤ 3.15.1.

### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Optimize 8.4.16](https://github.com/camunda/camunda-optimize/releases/tag/3.12.16)
- [Camunda Optimize 8.5.13](https://github.com/camunda/camunda-optimize/releases/tag/3.13.13)
- [Camunda Optimize 8.6.7](https://github.com/camunda/camunda/releases/tag/8.6.7-optimize)
- [Camunda Optimize 8.7.0](https://github.com/camunda/camunda/releases/tag/8.7.0-optimize)
- [Camunda Optimize 3.12.16](https://github.com/camunda/camunda-optimize/releases/tag/3.12.16)
- [Camunda Optimize 3.13.13](https://github.com/camunda/camunda-optimize/releases/tag/3.13.13)
- [Camunda Optimize 3.14.4](https://github.com/camunda/camunda-optimize/releases/tag/3.14.4)
- [Camunda Optimize 3.15.2](https://github.com/camunda/camunda-optimize/releases/tag/3.15.2)

## Notice 17

### Publication date

April 8, 2025

### Products affected

Camunda Zeebe

### Impact

When parsing unknown fields in the Protobuf Java Lite and Full library, a maliciously crafted message can cause a StackOverflow error and lead to a
program crash.

- As Zeebe makes extensive use of Protobuf, this could lead to denial-of-service (DoS) issues on the server side.
- This issue allows an attacker to send specific payloads that will always result in `StackOverflowException`. This could lead to gateway performance issues and affect system availability.
- Although the gateway will not crash, it will spend more time working on these requests. An attacker could use this opportunity to slow it down and make it unusable by sending a large number of requests within a short time frame.

No data is leaked, lost, or corrupted. This issue only affects application availability.

[Learn more about this CVE at the GitHub Advisory Database](https://github.com/advisories/GHSA-735f-pc8j-v9w8).

### How to determine if the installation is affected

You are using Camunda Zeebe 8.6.11.

### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Zeebe 8.6.13](https://github.com/camunda/camunda/releases/tag/8.6.13)

## Notice 16

### Publication date

March 14, 2025

### Products affected

Camunda Zeebe

### Impact

Some Camunda Zeebe versions were affected by a vulnerability that allowed a malicious attacker to craft network packets that could crash the gateway.

### How to determine if the installation is affected

You are using Camunda Zeebe 8.6.0 - 8.6.11

### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Zeebe 8.6.12](https://github.com/camunda/camunda/releases/tag/8.6.12)

## Notice 15

### Publication date

March 11, 2025

### Products affected

Camunda Optimize

### Impact

Some Camunda Optimize versions were affected by a vulnerability that allowed a malicious attacker to craft Camunda URLs that could execute JavaScript code.

### How to determine if the installation is affected

You are using Camunda Optimize ≤ 8.6.5.

### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Optimize 8.6.6](https://github.com/camunda/camunda/releases/tag/8.6.6-optimize)

## Notice 14

### Publication date

March 11, 2025

### Products affected

Camunda Web Modeler

### Impact

The version of `koa` used by Camunda Web Modeler was affected by the following vulnerability:

- https://nvd.nist.gov/vuln/detail/CVE-2025-25200

### How to determine if the installation is affected

You are using Camunda Web Modeler Self-Managed version ≤ 8.3.16, ≤ 8.4.14, ≤ 8.5.15, or ≤ 8.6.7.

### Solution

Camunda has provided the following releases which contain the fix:

- Camunda Web Modeler Self-Managed 8.3.17
- Camunda Web Modeler Self-Managed 8.4.15
- Camunda Web Modeler Self-Managed 8.5.16
- Camunda Web Modeler Self-Managed 8.6.8

The fix was deployed to Web Modeler SaaS on February 14, 2025, 08:50 CET.

## Notice 13

### Publication date

July 18, 2024

### Products affected

Camunda Identity

### Impact

The version of `Apache Tomcat` used by Camunda Identity was affected by the following vulnerability:

- https://nvd.nist.gov/vuln/detail/CVE-2024-34750

### How to determine if the installation is affected

You are using Camunda Identity version 8.5.3 or previous.

### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Identity 8.5.4](https://github.com/camunda/identity/releases/tag/8.5.4)

## Notice 12

### Publication date

October 3, 2023

### Products affected

Camunda Desktop Modeler

### Impact

The version of `libwebp` shipped with Camunda Desktop Modeler was affected by the following vulnerability:

- https://nvd.nist.gov/vuln/detail/CVE-2023-4863

### How to determine if the installation is affected

You are using Camunda Desktop Modeler version 5.15.1 or previous.

### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Desktop Modeler 5.15.2](https://downloads.camunda.cloud/release/camunda-modeler/5.15.2/)

## Notice 11

### Publication date

April 17, 2023

### Products affected

Tasklist

### Impact

The Tasklist REST API functionality of Tasklist 8.2.0 and 8.2.1 allows unauthenticated access to the following methods/URLs:

- GET /v1/tasks/\{taskId}
- POST /v1/tasks/search
- POST /v1/tasks/\{taskId}/variables/search
- POST /v1/forms/\{formId}
- POST /v1/variables/\{variableId}

Find more information about the methods in our [Tasklist REST API documentation](/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md).

Therefore, if you use Tasklist 8.2.0 or 8.2.1, and if you have sensible data stored in process variables (accessed by user tasks), this data could have been accessed by users knowing the endpoint of the Tasklist instance without authentication.

### How to determine if the installation is affected

You are using Tasklist version 8.2.0 or 8.2.1.

### Solution

Camunda has provided the following releases which contain a fix

- [Tasklist 8.2.2](https://github.com/camunda/camunda-platform/releases/tag/8.2.2)

## Notice 10

### Publication Date:

November 10, 2022

### Products affected:

Tasklist

### Impact:

The Tasklist Docker image contain an OpenSSL version 3.0.2 for which the following CVEs have been published:

- https://nvd.nist.gov/vuln/detail/CVE-2022-3602
- https://nvd.nist.gov/vuln/detail/CVE-2022-3786

At this point, Camunda is not aware of any specific attack vector in Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

### How to determine if the installation is affected

You are Tasklist version (8.0.3 ≥ version ≤ 8.0.7) or ≤ 8.1.2

### Solution

Camunda has provided the following releases which contain a fix

- [Tasklist 8.1.3](https://github.com/camunda/camunda-platform/releases/tag/8.1.3)
- [Tasklist 8.0.8](https://github.com/camunda/camunda-platform/releases/tag/8.0.8)

## Notice 9

### Publication Date:

April 11, 2022

### Products affected:

Zeebe, Operate, Tasklist, IAM

### Impact:

Zeebe, Operate, Tasklist and IAM are using the Spring framework for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2022-22965

At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate, Tasklist or IAM allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version ≤ 1.2.11 or ≤ 1.3.6

### Solution

Camunda has provided the following releases which contain a fix

- [Zeebe, Operate and Tasklist 1.3.7](https://github.com/camunda-cloud/zeebe/releases/tag/1.3.7)
- [Zeebe, Operate and Tasklist 1.2.12](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.12)

## Notice 8

### Publication Date:

December 31, 2021

### Products affected:

Zeebe, Operate, Tasklist

### Impact:

Zeebe, Operate and Tasklist bundle log4j-core for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-44832.
At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate or Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version ≤ 1.2.8 or ≤ 1.1.9

### Solution

Camunda has provided the following releases which contain a fix

- [Zeebe, Operate and Tasklist 1.2.9](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.9)
- [Zeebe, Operate and Tasklist 1.1.10](https://github.com/camunda-cloud/zeebe/releases/tag/1.1.10)

## Notice 7

### Publication Date:

December 31, 2021

### Products affected:

IAM

### Impact:

IAM bundles log4j libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-44832.
Specifically, IAM bundles log4j-api and log4j-to-slf4j. However, IAM does not bundle the log4j-core library which contains the vulnerability referred to by the CVE. As a result, Camunda does not consider IAM to be affected by the vulnerability. Still, Camunda recommends applying fixes as mentioned in the Solution section below.

### How to determine if the installation is affected

You are using IAM version ≤ 1.2.8

### Solution

Camunda has provided the following releases which contain a fix

- [IAM 1.2.9](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.9)

## Notice 6

### Publication Date:

December 22, 2021

### Products affected:

Zeebe, Operate, Tasklist

### Impact:

Zeebe, Operate and Tasklist bundle log4j-core for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-45105.
At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate or Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version ≤ 1.2.7 or ≤ 1.1.8

### Solution

Camunda has provided the following releases which contain a fix

- [Zeebe, Operate and Tasklist 1.2.8](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.8)
- [Zeebe, Operate and Tasklist 1.1.9](https://github.com/camunda-cloud/zeebe/releases/tag/1.1.9)

## Notice 5

### Publication Date:

December 22, 2021

### Products affected:

IAM

### Impact:

IAM bundles log4j libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-45105.
Specifically, IAM bundles log4j-api and log4j-to-slf4j. However, IAM does not bundle the log4j-core library which contains the vulnerability referred to by the CVE. As a result, Camunda does not consider IAM to be affected by the vulnerability. Still, Camunda recommends applying fixes as mentioned in the Solution section below.

IAM bundles logback libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-42550.
At this point, Camunda is not aware of any specific attack vector in IAM allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

### How to determine if the installation is affected

You are using IAM version ≤ 1.2.7

### Solution

Camunda has provided the following releases which contain a fix

- [IAM 1.2.8](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.8)

## Notice 4

### Publication Date:

December 17, 2021

### Products affected:

Zeebe, Operate, Tasklist

### Impact:

Zeebe, Operate and Tasklist bundle log4j-core for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-45046.
At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate or Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version ≤ 1.2.6 or ≤ 1.1.7

### Solution

Camunda has provided the following releases which contain a fix

- [Zeebe, Operate and Tasklist 1.2.7](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.7)
- [Zeebe, Operate and Tasklist 1.1.8](https://github.com/camunda-cloud/zeebe/releases/tag/1.1.8)

## Notice 3

### Publication Date:

December 17, 2021

### Products affected:

IAM

### Impact:

IAM bundles log4j libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-45046.
Specifically, IAM bundles log4j-api and log4j-to-slf4j. However, IAM does not bundle the log4j-core library which contains the vulnerability referred to by the CVE. As a result, Camunda does not consider IAM to be affected by the vulnerability. Still, Camunda recommends applying fixes as mentioned in the Solution section below.

IAM bundles logback libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-42550.
At this point, Camunda is not aware of any specific attack vector in IAM allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

### How to determine if the installation is affected

You are using IAM version ≤ 1.2.6

### Solution

Camunda has provided the following releases which contain a fix

- [IAM 1.2.7](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.7)

## Notice 2

### Publication Date:

December 14, 2021

### Products affected:

Zeebe, Operate, Tasklist

### Impact:

Zeebe, Operate and Tasklist bundle log4j-core for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-44228.
At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate or Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version ≤ 1.2.5 or ≤ 1.1.6

### Solution

Camunda has provided the following releases which contain a fix

- [Zeebe, Operate and Tasklist 1.2.6](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.6)
- [Zeebe, Operate and Tasklist 1.1.7](https://github.com/camunda-cloud/zeebe/releases/tag/1.1.7)

Apply the patches mentioned above or set the JVM option `-Dlog4j2.formatMsgNoLookups=true`

## Notice 1

### Publication Date:

December 14, 2021

### Products affected:

IAM

### Impact:

IAM bundles log4j libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-44228.
Specifically, IAM bundles log4j-api and log4j-to-slf4j. However, IAM does not bundle the log4j-core library which contains the vulnerability referred to by the CVE. As a result, Camunda does not consider IAM to be affected by the vulnerability.

Still, Camunda recommends applying fixes as mentioned in the Solution section below.

### How to determine if the installation is affected

You are using IAM version ≤ 1.2.5

### Solution

Camunda has provided the following releases which contain a fix

- [IAM 1.2.6](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.6)
