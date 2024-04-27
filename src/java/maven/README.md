# Maven

* [官网](https://maven.apache.org/)

* [历史版本下载地址](https://archive.apache.org/dist/maven/)

# [settings.xml](../../assets/java/settings.xml)


## Maven坐标

> 定位jar包，简称`gav`

* `groupId` 公司/项目
* `artifactId` 模块
* `version` 版本

## 常用命令

> 构建相关命令要在pom.xml路径下执行

* `mvn -v` 插件maven的版本信息

* `mvn clean` 清理target目录

* `mvn compile` 编译项目

    * 编译后的文件在target目录下

* `mvn test-compile` 编译测试目录

    * 编译后的文件在target目录下

* `mvn test` 执行测试代码

* `mvn package` 项目打包，jar或war包

    * 打包后的文件在target目录下

* `mvn install` 安装当前项目到本地仓库

    * `mvn install -Dmaven.test.skip=true` 跳过测试

> 根据gav(Maven坐标可)以找到本地对应的位置

* `mvn dependency:list` 列出当前项目的jar包依赖

* `mvn dependency:tree` 以树型方式列出当前项目的jar包依赖

## 依赖

### 依赖范围, scope标签

> 在dependencies/dependency/scope标签内

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

> scope标签可选值：compile,test,provided,system,runtime,import

* `compile` 默认值，在所有情况下都有用

* `test` 只在test目录下可以使用

* `provided` 除了不会被打包，其他情况都可以使用

### 依赖传递

依赖的scope为compile才能传递

### 依赖排除

* 在需要排除依赖的标签内添加以下标签

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
    <exclusions>
        <!-- 排除junit包-->
        <exclusion>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

## 继承

> 当前工程的打包方式为pom的工程才能是工程

## 依赖管理

* 在父工程内添加dependencyManagement标签添加依赖管理

```xml
<dependencyManagement>
    <dependencies>
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
  </dependency>
    </dependencies>
</dependencyManagement>
```

* 然后在子工程内添加对应的依赖信息就可以使用，可以不添加version标签

* 在properties标签内可以添加某个jar包内具体的版本号信息，在dependency标签内可以使用表达式使用

```xml
<properties>
    <java.version>11</java.version>
    <!-- 在这里定义 --> 
    <javax.servlet-api.version>3.1.0</javax.servlet-api.version>
</properties>

<dependencies>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <!-- 在这里使用 --> 
        <version>${javax.servlet-api.version}</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

