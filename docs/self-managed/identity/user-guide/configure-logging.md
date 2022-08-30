---
id: configure-logging
title: "Configuring logging"
sidebar_label: "Configuring logging"
---

The Identity component uses the [Log4j2](https://logging.apache.org/log4j/2.x/) framework to control
the log level and log format.

By default, Identity logs at the `info` and produces a log line with following format:

```
2022-06-27 15:05:21.442 INFO 34490 --- [main] i.c.i.Application: Started Application in 3.659 seconds (JVM running for 4.185)
```

Identity also provides support for configuring the log level and log pattern should it be required by
exposing two environmental variables, these are:

| Environment variable   | Accepted values                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `IDENTITY_LOG_LEVEL`   | OFF, FATAL, ERROR, WARN, INFO, DEBUG, TRACE, ALL                                                                                          |
| `IDENTITY_LOG_PATTERN` | _See the [Log4j2 pattern layout docs](https://logging.apache.org/log4j/2.x/manual/layouts.html#PatternLayout) for possible placeholders._ |
