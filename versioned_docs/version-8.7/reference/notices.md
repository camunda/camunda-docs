---
id: notices
title: "Security notices"
description: "Let's take a closer look at security notices, reporting vulnerabilities, and additional security information."
---

## Security notices

Camunda publishes security notices after fixes are available.

### Notice 21

#### Publication date

June 18th, 2025

#### Product affected

Camunda Web Modeler Self-Managed

#### Impact

The version of `org.postgresql:postgresql` used by Camunda Web Modeler Self-Managed was affected by [CVE-2025-49146](https://nvd.nist.gov/vuln/detail/CVE-2025-49146) potentially allowing a man-in-the-middle attacker to intercept connections when the PostgreSQL JDBC driver was configured with channel binding set to required.

#### How to determine if the installation is affected

You are using Camunda Web Modeler Self-Managed version 8.6.0 - 8.6.12, or 8.7.0 - 8.7.3.

#### Solution

Camunda has provided the following releases which contain the fix:

- Camunda Web Modeler Self-Managed 8.6.12
- Camunda Web Modeler Self-Managed 8.7.3

### Notice 20

#### Publication date

June 17th, 2025

#### Product affected

Camunda Optimize

#### Impact

Camunda Optimize was affected by a vulnerability that allowed an attacker to gain improper access to Optimize data by using a modified JWT (JSON Web Token).

#### How to determine if the installation is affected

You are using Camunda Optimize ≤ 8.6.9 or ≤ 8.7.2.

#### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Optimize 8.6.10](https://github.com/camunda/camunda/releases/tag/8.6.10-optimize)
- [Camunda Optimize 8.7.3](https://github.com/camunda/camunda/releases/tag/8.7.3-optimize)

### Notice 19

#### Publication date

May 21st, 2025

#### Product affected

Camunda Web Modeler

#### Impact

The version of `nodejs` used by Camunda Web Modeler was affected by [CVE-2025-23166](https://nvd.nist.gov/vuln/detail/CVE-2025-23166) potentially allowing an adversary to remotely crash the Node.js runtime.

#### How to determine if the installation is affected

You are using Camunda Web Modeler Self-Managed version ≤ 8.4.17, ≤ 8.5.18, ≤ 8.6.10, or ≤ 8.7.1.

#### Solution

Camunda has provided the following releases which contain the fix:

- Camunda Web Modeler Self-Managed 8.4.18
- Camunda Web Modeler Self-Managed 8.5.19
- Camunda Web Modeler Self-Managed 8.6.11
- Camunda Web Modeler Self-Managed 8.7.2

The fix was deployed to Web Modeler SaaS on May 19, 2025, 15:10 CET.

### Notice 18

#### Publication date

April 8th, 2025

#### Product affected

Camunda Optimize

#### Impact

Camunda Optimize was affected by a vulnerability that allowed an attacker to modify a JWT (JSON Web Token) so that they would be given improper access to Optimize.

#### How to determine if the installation is affected

You are using Camunda Optimize ≤ 8.4.15, ≤ 8.5.12, ≤ 8.6.6, ≤ 8.7.0, ≤ 3.11.20, ≤ 3.12.15, ≤ 3.13.12, ≤ 3.14.3, ≤ 3.15.1.

#### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Optimize 8.4.16](https://github.com/camunda/camunda-optimize/releases/tag/3.12.16)
- [Camunda Optimize 8.5.13](https://github.com/camunda/camunda-optimize/releases/tag/3.13.13)
- [Camunda Optimize 8.6.7](https://github.com/camunda/camunda/releases/tag/8.6.7-optimize)
- [Camunda Optimize 8.7.0](https://github.com/camunda/camunda/releases/tag/8.7.0-optimize)
- [Camunda Optimize 3.12.16](https://github.com/camunda/camunda-optimize/releases/tag/3.12.16)
- [Camunda Optimize 3.13.13](https://github.com/camunda/camunda-optimize/releases/tag/3.13.13)
- [Camunda Optimize 3.14.4](https://github.com/camunda/camunda-optimize/releases/tag/3.14.4)
- [Camunda Optimize 3.15.2](https://github.com/camunda/camunda-optimize/releases/tag/3.15.2)

### Notice 17

#### Publication date

April 8th, 2025

#### Product affected

Camunda Zeebe

#### Impact

When parsing unknown fields in the Protobuf Java Lite and Full library, a maliciously crafted message can cause a StackOverflow error and lead to a
program crash.

- As Zeebe makes extensive use of Protobuf, this could lead to denial-of-service (DoS) issues on the server side.
- This issue allows an attacker to send specific payloads that will always result in `StackOverflowException`. This could lead to gateway performance issues and affect system availability.
- Although the gateway will not crash, it will spend more time working on these requests. An attacker could use this opportunity to slow it down and make it unusable by sending a large number of requests within a short time frame.

No data is leaked, lost, or corrupted. This issue only affects application availability.

[Learn more about this CVE at the GitHub Advisory Database](https://github.com/advisories/GHSA-735f-pc8j-v9w8).

#### How to determine if the installation is affected

You are using Camunda Zeebe 8.6.11.

#### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Zeebe 8.6.13](https://github.com/camunda/camunda/releases/tag/8.6.13)

### Notice 16

#### Publication date

March 14th, 2025

#### Product affected

Camunda Zeebe

#### Impact

Some Camunda Zeebe versions were affected by a vulnerability that allowed a malicious attacker to craft network packets that could crash the gateway.

#### How to determine if the installation is affected

You are using Camunda Zeebe 8.6.0 - 8.6.11

#### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Zeebe 8.6.12](https://github.com/camunda/camunda/releases/tag/8.6.12)

### Notice 15

#### Publication date

March 11th, 2025

#### Product affected

Camunda Optimize

#### Impact

Some Camunda Optimize versions were affected by a vulnerability that allowed a malicious attacker to craft Camunda URLs that could execute JavaScript code.

#### How to determine if the installation is affected

You are using Camunda Optimize ≤ 8.6.5.

#### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Optimize 8.6.6](https://github.com/camunda/camunda/releases/tag/8.6.6-optimize)

### Notice 14

#### Publication date

March 11th, 2025

#### Product affected

Camunda Web Modeler

#### Impact

The version of `koa` used by Camunda Web Modeler was affected by the following vulnerability:

- https://nvd.nist.gov/vuln/detail/CVE-2025-25200

#### How to determine if the installation is affected

You are using Camunda Web Modeler Self-Managed version ≤ 8.3.16, ≤ 8.4.14, ≤ 8.5.15, or ≤ 8.6.7.

#### Solution

Camunda has provided the following releases which contain the fix:

- Camunda Web Modeler Self-Managed 8.3.17
- Camunda Web Modeler Self-Managed 8.4.15
- Camunda Web Modeler Self-Managed 8.5.16
- Camunda Web Modeler Self-Managed 8.6.8

The fix was deployed to Web Modeler SaaS on February 14, 2025, 08:50 CET.

### Notice 13

#### Publication date

July 18th, 2024

#### Product affected

Camunda Identity

#### Impact

The version of `Apache Tomcat` used by Camunda Identity was affected by the following vulnerability:

- https://nvd.nist.gov/vuln/detail/CVE-2024-34750

#### How to determine if the installation is affected

You are using Camunda Identity version 8.5.3 or previous.

#### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Identity 8.5.4](https://github.com/camunda-cloud/identity/releases/tag/8.5.4)

### Notice 12

#### Publication date

October 3rd, 2023

#### Product affected

Camunda Desktop Modeler

#### Impact

The version of `libwebp` shipped with Camunda Desktop Modeler was affected by the following vulnerability:

- https://nvd.nist.gov/vuln/detail/CVE-2023-4863

#### How to determine if the installation is affected

You are using Camunda Desktop Modeler version 5.15.1 or previous.

#### Solution

Camunda has provided the following release which contains a fix:

- [Camunda Desktop Modeler 5.15.2](https://downloads.camunda.cloud/release/camunda-modeler/5.15.2/)

### Notice 11

#### Publication date

April 17, 2023

#### Product affected

Tasklist

#### Impact

The Tasklist REST API functionality of Tasklist 8.2.0 and 8.2.1 allows unauthenticated access to the following methods/URLs:

- GET /v1/tasks/\{taskId}
- POST /v1/tasks/search
- POST /v1/tasks/\{taskId}/variables/search
- POST /v1/forms/\{formId}
- POST /v1/variables/\{variableId}

Find more information about the methods in our [Tasklist REST API documentation](/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md).

Therefore, if you use Tasklist 8.2.0 or 8.2.1, and if you have sensible data stored in process variables (accessed by user tasks), this data could have been accessed by users knowing the endpoint of the Tasklist instance without authentication.

#### How to determine if the installation is affected

You are using Tasklist version 8.2.0 or 8.2.1.

#### Solution

Camunda has provided the following releases which contain a fix

- [Tasklist 8.2.2](https://github.com/camunda/camunda-platform/releases/tag/8.2.2)

### Notice 10

#### Publication Date:

November 10th, 2022

#### Product affected:

Tasklist

#### Impact:

The Tasklist Docker image contain an OpenSSL version 3.0.2 for which the following CVEs have been published:

- https://nvd.nist.gov/vuln/detail/CVE-2022-3602
- https://nvd.nist.gov/vuln/detail/CVE-2022-3786

At this point, Camunda is not aware of any specific attack vector in Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

#### How to determine if the installation is affected

You are Tasklist version (8.0.3 ≥ version ≤ 8.0.7) or ≤ 8.1.2

#### Solution

Camunda has provided the following releases which contain a fix

- [Tasklist 8.1.3](https://github.com/camunda/camunda-platform/releases/tag/8.1.3)
- [Tasklist 8.0.8](https://github.com/camunda/camunda-platform/releases/tag/8.0.8)

### Notice 9

#### Publication Date:

April 11th, 2022

#### Product affected:

Zeebe, Operate, Tasklist, IAM

#### Impact:

Zeebe, Operate, Tasklist and IAM are using the Spring framework for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2022-22965

At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate, Tasklist or IAM allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

#### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version ≤ 1.2.11 or ≤ 1.3.6

#### Solution

Camunda has provided the following releases which contain a fix

- [Zeebe, Operate and Tasklist 1.3.7](https://github.com/camunda-cloud/zeebe/releases/tag/1.3.7)
- [Zeebe, Operate and Tasklist 1.2.12](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.12)

### Notice 8

#### Publication Date:

December 31th, 2021

#### Product affected:

Zeebe, Operate, Tasklist

#### Impact:

Zeebe, Operate and Tasklist bundle log4j-core for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-44832.
At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate or Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

#### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version ≤ 1.2.8 or ≤ 1.1.9

#### Solution

Camunda has provided the following releases which contain a fix

- [Zeebe, Operate and Tasklist 1.2.9](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.9)
- [Zeebe, Operate and Tasklist 1.1.10](https://github.com/camunda-cloud/zeebe/releases/tag/1.1.10)

### Notice 7

#### Publication Date:

December 31th, 2021

#### Product affected:

IAM

#### Impact:

IAM bundles log4j libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-44832.
Specifically, IAM bundles log4j-api and log4j-to-slf4j. However, IAM does not bundle the log4j-core library which contains the vulnerability referred to by the CVE. As a result, Camunda does not consider IAM to be affected by the vulnerability. Still, Camunda recommends applying fixes as mentioned in the Solution section below.

#### How to determine if the installation is affected

You are using IAM version ≤ 1.2.8

#### Solution

Camunda has provided the following releases which contain a fix

- [IAM 1.2.9](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.9)

### Notice 6

#### Publication Date:

December 22th, 2021

#### Product affected:

Zeebe, Operate, Tasklist

#### Impact:

Zeebe, Operate and Tasklist bundle log4j-core for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-45105.
At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate or Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

#### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version ≤ 1.2.7 or ≤ 1.1.8

#### Solution

Camunda has provided the following releases which contain a fix

- [Zeebe, Operate and Tasklist 1.2.8](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.8)
- [Zeebe, Operate and Tasklist 1.1.9](https://github.com/camunda-cloud/zeebe/releases/tag/1.1.9)

### Notice 5

#### Publication Date:

December 22th, 2021

#### Product affected:

IAM

#### Impact:

IAM bundles log4j libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-45105.
Specifically, IAM bundles log4j-api and log4j-to-slf4j. However, IAM does not bundle the log4j-core library which contains the vulnerability referred to by the CVE. As a result, Camunda does not consider IAM to be affected by the vulnerability. Still, Camunda recommends applying fixes as mentioned in the Solution section below.

IAM bundles logback libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-42550.
At this point, Camunda is not aware of any specific attack vector in IAM allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

#### How to determine if the installation is affected

You are using IAM version ≤ 1.2.7

#### Solution

Camunda has provided the following releases which contain a fix

- [IAM 1.2.8](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.8)

### Notice 4

#### Publication Date:

December 17th, 2021

#### Product affected:

Zeebe, Operate, Tasklist

#### Impact:

Zeebe, Operate and Tasklist bundle log4j-core for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-45046.
At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate or Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

#### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version ≤ 1.2.6 or ≤ 1.1.7

#### Solution

Camunda has provided the following releases which contain a fix

- [Zeebe, Operate and Tasklist 1.2.7](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.7)
- [Zeebe, Operate and Tasklist 1.1.8](https://github.com/camunda-cloud/zeebe/releases/tag/1.1.8)

### Notice 3

#### Publication Date:

December 17th, 2021

#### Product affected:

IAM

#### Impact:

IAM bundles log4j libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-45046.
Specifically, IAM bundles log4j-api and log4j-to-slf4j. However, IAM does not bundle the log4j-core library which contains the vulnerability referred to by the CVE. As a result, Camunda does not consider IAM to be affected by the vulnerability. Still, Camunda recommends applying fixes as mentioned in the Solution section below.

IAM bundles logback libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-42550.
At this point, Camunda is not aware of any specific attack vector in IAM allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

#### How to determine if the installation is affected

You are using IAM version ≤ 1.2.6

#### Solution

Camunda has provided the following releases which contain a fix

- [IAM 1.2.7](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.7)

### Notice 2

#### Publication Date:

December 14th, 2021

#### Product affected:

Zeebe, Operate, Tasklist

#### Impact:

Zeebe, Operate and Tasklist bundle log4j-core for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-44228.
At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate or Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.

#### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version ≤ 1.2.5 or ≤ 1.1.6

#### Solution

Camunda has provided the following releases which contain a fix

- [Zeebe, Operate and Tasklist 1.2.6](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.6)
- [Zeebe, Operate and Tasklist 1.1.7](https://github.com/camunda-cloud/zeebe/releases/tag/1.1.7)

Apply the patches mentioned above or set the JVM option `-Dlog4j2.formatMsgNoLookups=true`

### Notice 1

#### Publication Date:

December 14th, 2021

#### Product affected:

IAM

#### Impact:

IAM bundles log4j libraries for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-44228.
Specifically, IAM bundles log4j-api and log4j-to-slf4j. However, IAM does not bundle the log4j-core library which contains the vulnerability referred to by the CVE. As a result, Camunda does not consider IAM to be affected by the vulnerability.

Still, Camunda recommends applying fixes as mentioned in the Solution section below.

#### How to determine if the installation is affected

You are using IAM version ≤ 1.2.5

#### Solution

Camunda has provided the following releases which contain a fix

- [IAM 1.2.6](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.6)

## Report a vulnerability

Please report security vulnerabilities to Camunda immediately. Please follow the steps on our [Camunda Security page](https://camunda.com/security#report-a-vulnerability) to report a vulnerability.

## Additional security information

For more information about security at Camunda, including our security policy, security issue management, and more, see [Camunda.com/security](https://camunda.com/security).
