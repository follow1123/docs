---
sidebar_position: 5
---

# 日志框架

## java.util.logging

> [详细代码](https://github.com/follow1123/java-frameworks/blob/main/logger/src/main/java/cn/y/java/jul)

* java原生日志框架

```java
public class UserService {

    private static final Logger log = Logger.getLogger(UserService.class.getName());

    public void addUser(){
        // 添加逻辑
        log.info("add user");
    }

    public void deleteUser(){
        try {
            // 删除逻辑
            log.severe("delete user succeed!");
        }catch (Exception e){
            log.severe("delete user error");
        }
    }
}
```

### 日志级别

```mermaid
flowchart LR
a(ALL/FINEST) --> b(FINER)
b --> c(FINE)
c --> d(CONFIG)
d --> e(INFO)
e --> f(WARNING)
f --> g(SEVERE)
g --> h(OFF)
```

* 使用`java.util.logging.Level`类指定
* 日志级别从左到右，设置日志级别也会显示右边所有日志级别

### Logger

```java
// 创建日志对象，一般使用当前class对象的name指定
Logger log = Logger.getLogger("test log");
```

### Handler

* 日志处理器

| 处理程序 | 使用 |
| --- | --- |
| StreamHandler | 写入OutputStream |
| ConsoleHandler | 写入控制台 |
| FileHandler | 写入文件 |
| SocketHandler | 写入到远程TCP端口 |
| MemoryHandler | 写入内存 |

```java
Logger log = Logger.getLogger("test log handler");
// 不使用父logger，自己指定handler
log.setUseParentHandlers(false);

// 创建日志处理器
ConsoleHandler handler = new ConsoleHandler();
/*
    设置日志处理器的级别
    这个日志级别是默认的最高级别
    在这里设置后，使用log.setLevel设置的日志级别不能超过这里的级别
 */
handler.setLevel(Level.ALL);

log.addHandler(handler);
```

#### 日志格式化

```java
// 日志默认日志格式化
handler.setFormatter(new SimpleFormatter());
```

* 继承`java.util.logging.Formatter`类实现`format()`方法

### 配置文件

* 默认配置文件
    * jdk8及之前：`%JAVA_HOME%/conf/logging.properties`
    * jdk8之后：`%JAVA_HOME%/jre/lib/logging.properties`

#### 加载自定义配置文件

* 配置文件模板

```properties
# 添加处理器
handlers= java.util.logging.ConsoleHandler

# 默认日志级别
.level= INFO

# 处理器配置
java.util.logging.ConsoleHandler.level = ALL
java.util.logging.ConsoleHandler.formatter = cn.y.java.jul.CustomFormatter

# 指定包的日志级别配置
cn.y.java.jul.warning_package.level = WARNING
cn.y.java.jul.fine_package.level = FINE
```

---

## Logback

> [详细代码](https://github.com/follow1123/java-frameworks/blob/main/logger/src/main/java/cn/y/java/logback)

* [官方文档](https://logback.qos.ch/manual/)

### 依赖

* `logback-core` - logback核心库
* `logback-classic` - 实现Slf4j，包含核心库，一般引入这个依赖

### 日志级别

```mermaid
flowchart LR
a(ALL/TRACE) --> b(DEBUG)
b --> c(INFO)
c --> d(WARN)
d --> e(ERROR)
e --> f(OFF)
```

### 配置文件

> [官方文档](https://logback.qos.ch/manual/configuration.html#syntax)

* 配置文件默认在类路径下的`logback.xml`文件
* 配置文件主要包含下面几个部分
    * **appender** - 控制日志输出行为
    * **logger** - 控制指定包或类的日志级别
    * **root** - 全局日志级别
    * **variable** - 定义变量

#### 基础配置

```xml
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} %M - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="debug">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

### Appender

> [官方文档](https://logback.qos.ch/manual/configuration.html#configuringAppenders)，[Appender文档](https://logback.qos.ch/manual/appenders.html)

| 类型   | 说明    |
|--------------- | --------------- |
| [ConsoleAppender](https://logback.qos.ch/manual/appenders.html#ConsoleAppender)   | 输出到控制台   |
| [FileAppender](https://logback.qos.ch/manual/appenders.html#FileAppender) | 输出到文件 |
| [RollingFileAppender](https://logback.qos.ch/manual/appenders.html#RollingFileAppender) | 输出到文件，并支持文件滚动 |
| [DBAppender](https://logback.qos.ch/manual/appenders.html#DBAppender) | 输出到数据库 |

```xml
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>testFile.log</file>
        <append>true</append>
        <!-- set immediateFlush to false for much higher logging throughput -->
        <immediateFlush>true</immediateFlush>
        <!-- encoders are assigned the type
             ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
        <encoder>
            <pattern>%-4relative [%thread] %-5level %logger{35} -%kvp- %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logFile.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- daily rollover -->
            <fileNamePattern>logFile.%d{yyyy-MM-dd}.log</fileNamePattern>

            <!-- keep 30 days' worth of history capped at 3GB total size -->
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>

        <encoder>
            <pattern>%-4relative [%thread] %-5level %logger{35} -%kvp- %msg%n</pattern>
        </encoder>
    </appender> 

    <root level="DEBUG">
        <appender-ref ref="CONSOLE" />
    </root>
</configuration>
```

#### Layouts

* 默认使用`PatternLayout`，部分转换词参考[官方文档](https://logback.qos.ch/manual/layouts.html#conversionWord)

### Logger/Root

```xml
<configuration>

    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- encoders are assigned the type
             ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
        <encoder>
          <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} -%kvp- %msg%n</pattern>
        </encoder>
    </appender>

    <!-- 指定cn.a.b下的日志级别 -->
    <logger name="cn.a.b" level="INFO"/>

    <!-- 指定cn.a.c下的日志级别，并指定Appender -->
    <logger name="cn.a.c">
        <appender-ref ref="STDOUT" />
    </logger>

    <!-- Strictly speaking, the level attribute is not necessary since -->
    <!-- the level of the root level is set to DEBUG by default.       -->
    <!-- 默认日志级别和对应的Appender -->
    <root level="DEBUG">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

### Variable

[官方文档](https://logback.qos.ch/manual/configuration.html#variableSubstitution)

```xml
<configuration>

    <!-- 定义变量 -->
    <variable name="USER_HOME" value="/home/sebastien" />

    <!-- 指定properties文件 -->
    <variable file="src/main/java/chapters/configuration/variables1.properties" />

    <!-- 指定类路径下的properties文件 -->
    <variable resource="resource1.properties" />
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">

        <!-- 使用变量 -->
        <file>${USER_HOME}/myApp.log</file>
        <encoder>
            <pattern>%kvp %msg%n</pattern>
        </encoder>
    </appender>

    <root level="debug">
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

### 使用

```xml
<configuration>
    <!-- 在resources目录下添加这个文件即可，添加log_path属性，文件保存路径 -->
    <variable resource="logback-file.properties"/>
    <!-- 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} %M - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- 文件输出 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log_path}/logFile.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- daily rollover -->
            <fileNamePattern>logFile.%d{yyyy-MM-dd}.log</fileNamePattern>

            <!-- keep 30 days' worth of history capped at 1GB total size -->
            <maxHistory>30</maxHistory>
            <totalSizeCap>1GB</totalSizeCap>
        </rollingPolicy>

        <encoder>
            <pattern>%-4relative [%thread] %-5level %logger{35} -%kvp- %msg%n</pattern>
        </encoder>
    </appender>

    <!-- 指定包日志级别 -->
    <logger name="cn.y.java.logback.info_package" level="WARN"/>
    <!-- 指定包日志级别并指定输出到文件 -->
    <logger name="cn.y.java.logback.file_package" level="DEBUG">
        <appender-ref ref="FILE"/>
    </logger>

    <!-- 默认日志级别 -->
    <root level="debug">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>
```

---

## Log4j2

> [详细代码](https://github.com/follow1123/java-frameworks/blob/main/logger/src/main/java/cn/y/java/log4j2)

* [官方文档](https://logging.apache.org/log4j/2.x/manual/getting-started.html)

### 依赖

* `log4j-core` - 核心库
* `log4j-api` - api，需要配合核心库使用，也相当于是一个日志门面
* `log4j-slf4j2-impl` - Slf4j适配器，一般直接引入这个依赖即可

### 日志级别

```mermaid
flowchart LR
a(ALL/TRACE) --> b(DEBUG)
b --> c(INFO)
c --> d(WARN)
d --> e(ERROR)
e --> f(FATAL)
f --> g(OFF)
```

### 配置文件

* 配置文件默认在类路径下的`log4j2.xml`，使用其他格式配置文件参考[官方文档](https://logging.apache.org/log4j/2.x/manual/configuration.html)
* 配置文件主要包含下面几个部分
    * `Appenders` - 控制日志输出行为
    * `Loggers` - 控制指定包或类的日志级别
    * `Properties` - 变量

### Appenders

> [官方文档](https://logging.apache.org/log4j/2.x/manual/configuration.html#configuring-appenderrefs)，[Appenders文档](https://logging.apache.org/log4j/2.x/manual/appenders.html)

| 类型   | 说明    |
|--------------- | --------------- |
| [File](https://logging.apache.org/log4j/2.x/manual/appenders/file.html) | 输出到文件 |
| [RollingFile](https://logging.apache.org/log4j/2.x/manual/appenders/rolling-file.html) | 输出到文件，并支持文件滚动 |
| [JDBC](https://logging.apache.org/log4j/2.x/manual/appenders/database.html#JdbcAppender) | 输出到数据库 |


```xml

<?xml version="1.0" encoding="UTF-8"?>
<Configuration xmlns="https://logging.apache.org/xml/ns"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="
                   https://logging.apache.org/xml/ns
                   https://logging.apache.org/xml/ns/log4j-config-2.xsd">
    <!-- 属性配置... -->

    <Appenders>
        <!-- 输出到控制台 -->
        <Console name="CONSOLE">
            <PatternLayout pattern="%-d{yyyy-MM-dd HH:mm:ss} [%t] %-5p %c %M - %m%n"/>
        </Console>
        <!-- 输出到文件 -->
        <File name="DEBUG_LOG" fileName="${log.dir}/logs/debug.log">
            <PatternLayout pattern="%d [%t] %p %c - %m%n"/>
        </File>

        <!-- 输出到文件，滚动更新 -->
        <RollingFile name="FILE"
                     fileName="${log.dir}/logs/app.log"
                     filePattern="${log.dir}/logs/app.%d{yyyy-MM-dd}.%i.log">
            <!-- 日志输出格式 -->
            <PatternLayout pattern="%-d{yyyy-MM-dd HH:mm:ss} [%t] %-5p %c %M - %m%n"/>
            <!-- 滚动策略 -->
            <Policies>
                <!-- 启动项目时就触发滚动，如果文件超过1字节，直接滚动 -->
                <OnStartupTriggeringPolicy/>
                <!-- 根据文件大小进行滚动，默认10MB -->
                <SizeBasedTriggeringPolicy/>

                <!-- 根据时间滚动，在RollingFile标签上的filePattern配置指定的日志格式
                    yyyy-MM-dd 每天更新
                    yyyy-MM-dd-HH 每小时更新 -->
                <TimeBasedTriggeringPolicy/>
            </Policies>
            <!-- 最多只存5份文件 -->
            <DefaultRolloverStrategy max="5"/>
        </RollingFile>
    </Appenders>

    <!-- Logger配置... -->
</Configuration>
```

### Loggers

```xml
<Configuration xmlns="https://logging.apache.org/xml/ns"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="
                   https://logging.apache.org/xml/ns
                   https://logging.apache.org/xml/ns/log4j-config-2.xsd">
    <!-- 属性配置... -->
    <!-- Appender配置... -->
    <Loggers>
        <!-- 默认日志级别 -->
        <Root level="INFO">
            <AppenderRef ref="CONSOLE" level="ALL"/>
        </Root>
        <!-- 指定文件日志 -->
        <Logger name="cn.y.java.log4j2.debug_package" level="DEBUG">
            <AppenderRef ref="DEBUG_LOG"/>
        </Logger>
        <!-- 指定滚动更新文件日志 -->
        <Logger name="cn.y.java.log4j2.file_package" level="INFO">
            <AppenderRef ref="FILE"/>
        </Logger>
    </Loggers>
</Configuration>
```

### Properties

* 如果需要引入其他配置属性，参考[官方文档](https://logging.apache.org/log4j/2.x/manual/lookups.html)
    * 使用[系统环境变量](https://logging.apache.org/log4j/2.x/manual/lookups.html#EnvironmentLookup)
    * 使用[Java变量](https://logging.apache.org/log4j/2.x/manual/lookups.html#JavaLookup)
    * 使用[Spring Boot变量](https://logging.apache.org/log4j/2.x/manual/lookups.html#SpringBootLookup)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration xmlns="https://logging.apache.org/xml/ns"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="
                   https://logging.apache.org/xml/ns
                   https://logging.apache.org/xml/ns/log4j-config-2.xsd">
    <Properties>
        <!-- 使用环境变量 -->
        <Property name="log.dir" value="${env:USERPROFILE}/Desktop"/>
    </Properties>
    <!-- Appender配置... -->
    <!-- Logger配置... -->
</Configuration>
```

### 使用

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration xmlns="https://logging.apache.org/xml/ns"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="
                   https://logging.apache.org/xml/ns
                   https://logging.apache.org/xml/ns/log4j-config-2.xsd">
    <Properties>
        <!-- 使用环境变量 -->
        <Property name="log.dir" value="${env:USERPROFILE}/Desktop"/>
    </Properties>
    <Appenders>
        <!-- 输出到控制台 -->
        <Console name="CONSOLE">
            <PatternLayout pattern="%-d{yyyy-MM-dd HH:mm:ss} [%t] %-5p %c %M - %m%n"/>
        </Console>
        <!-- 输出到文件 -->
        <File name="DEBUG_LOG" fileName="${log.dir}/logs/debug.log">
            <PatternLayout pattern="%d [%t] %p %c - %m%n"/>
        </File>

        <!-- 输出到文件，滚动更新 -->
        <RollingFile name="FILE"
                     fileName="${log.dir}/logs/app.log"
                     filePattern="${log.dir}/logs/app.%d{yyyy-MM-dd}.%i.log">
            <!-- 日志输出格式 -->
            <PatternLayout pattern="%-d{yyyy-MM-dd HH:mm:ss} [%t] %-5p %c %M - %m%n"/>
            <!-- 滚动策略 -->
            <Policies>
                <!-- 启动项目时就触发滚动，如果文件超过1字节，直接滚动 -->
                <OnStartupTriggeringPolicy/>
                <!-- 根据文件大小进行滚动，默认10MB -->
                <SizeBasedTriggeringPolicy/>

                <!-- 根据时间滚动，在RollingFile标签上的filePattern配置指定的日志格式
                    yyyy-MM-dd 每天更新
                    yyyy-MM-dd-HH 每小时更新 -->
                <TimeBasedTriggeringPolicy/>
            </Policies>
            <!-- 最多只存5份文件 -->
            <DefaultRolloverStrategy max="5"/>
        </RollingFile>
    </Appenders>
    <Loggers>
        <!-- 默认日志级别 -->
        <Root level="INFO">
            <AppenderRef ref="CONSOLE" level="ALL"/>
        </Root>
        <!-- 指定文件日志 -->
        <Logger name="cn.y.java.log4j2.debug_package" level="DEBUG">
            <AppenderRef ref="DEBUG_LOG"/>
        </Logger>
        <!-- 指定滚动更新文件日志 -->
        <Logger name="cn.y.java.log4j2.file_package" level="INFO">
            <AppenderRef ref="FILE"/>
        </Logger>
    </Loggers>
</Configuration>
```

---

## Slf4j

> [详细代码](https://github.com/follow1123/java-frameworks/blob/main/logger/src/main/java/cn/y/java/slf4j)

* 日志门面，[官方文档](https://www.slf4j.org/manual.html)

![门面结构图](/img/java/concrete-bindings.png)

* 使用

```java
private static final Logger log = LoggerFactory.getLogger(Slf4jTest.class);

public static void main(String[] args) {
    log.trace("trace");
    log.debug("debug");
    log.info("info");
    log.warn("warn");
    log.error("error");
}
```

### Marker使用

* 需要在pattern上添加`%marker`占位符来显示

```java
public class MarkerTest implements Runnable, Callable {

    private static final Logger log = LoggerFactory.getLogger(MarkerTest.class);
    private static final Marker marker = MarkerFactory.getMarker("TEST");

    @Test
    public void test() {
        ExecutorService pool = Executors.newFixedThreadPool(10);
        for (int i = 0; i < 100; i++) {
            pool.submit((Runnable) this);
            pool.submit((Callable<Object>) this);
        }
        pool.shutdown();
    }

    @Override
    public void run() {
        log.info(marker, new Random().nextInt() + "");
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Object call() throws Exception {
        log.info(marker, new Random().nextBoolean() + "");
        Thread.sleep(100);
        return "";
    }
}
```

### 使用jul日志实现

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-jdk14</artifactId>
    <version>2.0.13</version>
</dependency>
```

### 使用logback日志实现

```xml
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.5.6</version>
</dependency>
```

### 使用log4j2日志实现

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j2-impl</artifactId>
    <version>2.23.1</version>
</dependency>
```

## 常见问题

### 依赖了多个日志实现

```txt
SLF4J(W): Class path contains multiple SLF4J providers.
SLF4J(W): Found provider [org.apache.logging.slf4j.SLF4JServiceProvider@14514713]
SLF4J(W): Found provider [org.slf4j.jul.JULServiceProvider@69663380]
SLF4J(W): Found provider [ch.qos.logback.classic.spi.LogbackServiceProvider@5b37e0d2]
SLF4J(W): See https://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J(I): Actual provider is of type [org.apache.logging.slf4j.SLF4JServiceProvider@14514713]
```

* 如果出现了以上警告信息，就表示项目依赖了多个日志实现，需要排除其他日志实现

```xml
<dependencies>
  <dependency>
    <groupId> org.apache.cassandra</groupId>
    <artifactId>cassandra-all</artifactId>
    <version>0.8.1</version>

    <exclusions>
      <exclusion> 
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
      </exclusion>
      <exclusion> 
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
      </exclusion>
    </exclusions> 

  </dependency>
</dependencies>
```


## 参考

* [菜鸟教程](https://www.cainiaojc.com/java/java-logging.html)
* [带你掌握Java各种日志框架](https://www.cnblogs.com/antLaddie/p/15867893.html)
* [Java日志-总结](https://blog.csdn.net/imjcoder/article/details/121688831)
