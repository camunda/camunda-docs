---
id: notices
title: "Security notices"
description: "Let's take a closer look at security notices, reporting vulnerabilities, and addiitonal security information."
---

## Security notices

Camunda publishes security notices after fixes are available.

### Notice 8

#### Publication Date:

December 31th, 2021

#### Product affected:

Zeebe, Operate, Tasklist

#### Impact:

Zeebe, Operate and Tasklist bundle log4j-core for which the following CVE has been published: https://nvd.nist.gov/vuln/detail/CVE-2021-44832.
At this point, Camunda is not aware of any specific attack vector in Zeebe, Operate or Tasklist allowing attackers to exploit the vulnerability but recommends applying fixes as mentioned in the Solution section below.


#### How to determine if the installation is affected

You are using Zeebe, Operate or Tasklist version <= 1.2.8 or <= 1.1.9

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

You are using IAM version <= 1.2.8

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

You are using Zeebe, Operate or Tasklist version <= 1.2.7 or <= 1.1.8

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

You are using IAM version <= 1.2.7

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

You are using Zeebe, Operate or Tasklist version <= 1.2.6 or <= 1.1.7

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

You are using IAM version <= 1.2.6

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

You are using Zeebe, Operate or Tasklist version <= 1.2.5 or <= 1.1.6

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

You are using IAM version <= 1.2.5

#### Solution

Camunda has provided the following releases which contain a fix

- [IAM 1.2.6](https://github.com/camunda-cloud/zeebe/releases/tag/1.2.6)


## Report a vulnerability

Please report security vulnerabilities to Camunda immediately. Please follow the steps on our [Camunda Security page](https://camunda.com/security#report-a-vulnerability) to report a vulnerability.

## Additional security information

For more information about security at Camunda, including our security policy, security issue management, and more, see [Camunda.com/security](https://camunda.com/security).
