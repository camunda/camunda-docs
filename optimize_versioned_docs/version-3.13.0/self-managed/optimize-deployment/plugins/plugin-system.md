---
id: plugin-system
title: "Optimize plugin system"
description: "Explains the principle of plugins in Optimize and how they can be added."
---

Optimize allows you to adapt the behavior of Optimize, e.g. to decide which kind of data should be analyzed and to tackle technical issues.

Have a look at the [Optimize Examples Repository](https://github.com/camunda/camunda-optimize-examples) to see some use cases for the plugin system and how plugins can be implemented and used.

## Set up your environment

First, add the Optimize plugin to your project via maven:

```xml
<dependency>
  <groupId>org.camunda.optimize</groupId>
  <artifactId>plugin</artifactId>
  <version>{{< currentVersionAlias >}}</version>
</dependency>
```

:::note
It is important to use the same plugin environment version as the Optimize version you plan to use.
Optimize rejects plugins that are built with different Optimize versions to avoid compatibility problems.
This also means that to update to newer Optimize versions it is necessary to build the plugin again with the new version.
:::

To tell Maven where to find the plugin environment, add the following repository to your project:

```xml
<repositories>
  <repository>
    <id>camunda-bpm-nexus</id>
    <name>camunda-bpm-nexus</name>
    <url>
      https://artifacts.camunda.com/artifactory/camunda-optimize/
    </url>
  </repository>
</repositories>
```

:::note
To make this work, you need to add your nexus credentials and the server to your `settings.xml`.
:::

It is required to create an uber `jar` so Optimize can load third-party dependencies and to validate the used Optimize version.
You can add the following to your project:

```xml
 <build>
    <defaultGoal>install</defaultGoal>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-assembly-plugin</artifactId>
        <version>3.1.0</version>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>single</goal>
            </goals>
            <configuration>
              <finalName>${project.artifactId}</finalName>
              <descriptorRefs>
                <descriptorRef>jar-with-dependencies</descriptorRef>
              </descriptorRefs>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
```

:::note
By default, Optimize loads plugin classes isolated from the classes used in Optimize.
This allows you to use library versions for the plugin that differ from those used in Optimize.
:::

If you want to use the provided Optimize dependencies instead, it is possible to exclude them from
the uber `jar` by setting the scope of those dependencies to `provided`. Then, Optimize does not load them from the plugin.
This might have side effects if the used version in the plugin is different to the one provided by Optimize.
To get an overview of what is already provided by Optimize, have a look at
the [third-party libraries]($docs$/reference/dependencies).

## Debug your plugin

To start Optimize in debug mode, execute the Optimize start script with a debug parameter.

On Unix systems, this could look like the following

- For the demo distribution:

```
./optimize-demo.sh --debug
```

- For the production distribution:

```
./optimize-startup.sh --debug
```

On a Windows system this could look like the following:

- For the demo distribution:

```
.\optimize-demo.bat --debug
```

- For the production distribution:

```
.\optimize-startup.bat --debug
```

By default, this will open up a debug port on 9999. Once you have set this up, you need to open the project where you implemented the plugin in your favorite IDE and connect to the debug port.

To change the default debug port, have a look into `optimize-startup.sh` on Linux/Mac or `optimize-startup.bat` on Windows systems. There, you should find a variable called `DEBUG_PORT` which allows you to customize the port.
