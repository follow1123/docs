# Spring Cloud

```mermaid
flowchart TD
a(微服务组件) --> b(服务注册与发现)
a --> c(服务调用和负载均衡)
a --> d(分布式事务)
a --> e(服务熔断和降级)
a --> f(服务链路追踪)
a --> g(服务网关)
a --> h(分布式配置管理)
b --> b1(1.Eureka\n2.Consul\n3.Nacos\n4.ETcd)
c --> c1(1.Ribbon\n2.OpenFeign\n3.LoadBalancer)
d --> d1(1.Seata\n2.LCN\n3.Hmily)
e --> e1(Hystrix)
e --> e2(Circuit Breaker:规范)
e --> e3(Sentinel)
e2 --> e22(Resilience4J)
f --> f1(1.Sleuth+Zipkin\n2.Micrometer Tracing)
g --> g1(1.Zuul\n2.Gateway)
h --> h1(1.Config+Bus\n2.Consul\n3.Nacos)
```

## 项目搭建

### SQL语句

```sql
use clouddb;

drop table if exists `t_pay`;

CREATE TABLE `t_pay` (
    `id` INT(10) UNSIGNED NOT NULL auto_increment,
    `pay_no` VARCHAR(50) not null comment '支付流水号',
    `order_no` VARCHAR(50) not null comment '订单流水号',
    `user_id` INT(10) DEFAULT '1' COMMENT '用户账号ID',
    `amount` DECIMAL(8, 2) not null default '9.9' comment '交易金额',
    `deleted` TINYINT(4) unsigned not null default '0' comment '删除标志，默认0不删除，1删除',
    `create_time` timestamp not null default current_timestamp comment '创建时间',
    `update_time` timestamp not null default current_timestamp on update current_timestamp comment '更新时间',
    primary key (`id`)
) engine=innodb auto_increment=1 default charset=utf8mb4 comment='支付交易表';

insert into t_pay(pay_no, order_no) values('pay1209381920', '0982134jdag123');

select * from t_pay;
```

### 项目结构

<pre>
    <code>
<a href="#parent">spring-cloud-demo</a>
├─<a href="#submodule-code-generator">code-generator</a>
│  ├─src/main/java/cn.y.demo
│  │  └─<a href="#submodule-code-generator-main-java">Main.java</a>
│  ├─src/main/resources
│  │  └─<a href="#submodule-code-generator-resources-config-properties">config.properties</a>
│  └─<a href="#submodule-code-generator-pom-xml">pom.xml</a>
├─<a href="#parent-gitignore">.gitignore</a>
└─<a href="#parent-pom-xml">pom.xml</a>
    </code>
</pre>

<a id="parent"></a>
### 创建父工程

> 使用idea操作

1. File > New > Project
2. New Project弹框
    * 左侧选New Project
    * 右侧
    <a id="new-project-panel"></a>
        * **Name**: spring-cloud-demo
        * **Location**: 项目存放地址
        * **Language**: Java
        * **Build system**: Maven
        * **JDK**: 17
        * **Advanced Settings**
            * **GroupId**: cn.y.demo
            * **ArtifactId**: 根据项目名自动生成
3. 因为是父工程可以直接删除`src`文件夹
4. 修改`.gitignore`文件
<a id="parent-gitignore"></a>

```gitignore
HELP.md
target/
!.mvn/wrapper/maven-wrapper.jar
!**/src/main/**/target/
!**/src/test/**/target/

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/
build/
!**/src/main/**/build/
!**/src/test/**/build/

### VS Code ###
.vscode/
code-generator/src/main/resources/config.properties
```

<a id="parent-pom-xml"></a>
5. 修改`pom.xml`文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.y.demo</groupId>
    <artifactId>spring-cloud-demo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <!-- 子模块相关配置 -->
<!--     <modules>
        <module>code-generator</module>
        <module>cloud-provider-payment01</module>
        <module>cloud-consumer-order01</module>
        <module>cloud-api-commons</module>
    </modules> -->

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <hutool.version>5.8.22</hutool.version>
        <lombok.version>1.18.26</lombok.version>
        <druid.version>1.1.20</druid.version>
        <mybatis.springboot.version>3.0.2</mybatis.springboot.version>
        <mysql.version>8.0.11</mysql.version>
        <swagger3.version>2.2.0</swagger3.version>
        <mybatis-plus.version>3.5.7</mybatis-plus.version>
        <fastjson2.version>2.0.40</fastjson2.version>
        <persistence-api.version>1.0.2</persistence-api.version>
        <spring.boot.test.version>3.1.5</spring.boot.test.version>
        <spring.boot.version>3.2.0</spring.boot.version>
        <spring.cloud.version>2023.0.0</spring.cloud.version>
        <spring.cloud.alibaba.version>2022.0.0.0</spring.cloud.alibaba.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>${spring.boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring.cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>${spring.cloud.alibaba.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
                <version>${mybatis-plus.version}</version>
            </dependency>
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql.version}</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid-spring-boot-starter</artifactId>
                <version>${druid.version}</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba.fastjson2</groupId>
                <artifactId>fastjson2</artifactId>
                <version>${fastjson2.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springdoc</groupId>
                <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
                <version>${swagger3.version}</version>
            </dependency>
            <dependency>
                <groupId>cn.hutool</groupId>
                <artifactId>hutool-all</artifactId>
                <version>${hutool.version}</version>
            </dependency>
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
                <optional>true</optional>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-test</artifactId>
                <version>${spring.boot.test.version}</version>
                <scope>test</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

</project>
```

<a id="submodule-code-generator"></a>
### 创建代码生成器子模块

1. 邮件父模块文件夹 > New > Module
2. New Module弹框和<a href="#new-project-panel">New Project</a>弹框类似，修改名称即可
    * 在idea内新建模块会自动在父项目的`pom.xml`内生成子模块配置，如果没用则添加`modules`标签即可
<a id="submodule-code-generator-pom-xml"></a>
3. 修改`pom.xml`文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>cn.y.demo</groupId>
        <artifactId>spring-cloud-demo</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <artifactId>code-generator</artifactId>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
            <version>${mybatis-plus.version}</version>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>${mybatis-plus.version}</version>
        </dependency>
        <!-- 代码生成器模板引擎 -->
        <dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
            <version>2.3</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>${hutool.version}</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
            <optional>true</optional>
        </dependency>
    </dependencies>
</project>
```

<a id="submodule-code-generator-resources-config-properties"></a>
4. 在**src/main/resources**目录下添加`config.properties`文件

```properties
package.name=cn.y.demo
jdbc.url=jdbc:mysql://localhost:3306/clouddb?useUnicode=true&characterEncoding=UTF-8&nullCatalogMeansCurrent=true&useSSL=false&serverTimezone=GMT%2B8
jdbc.username=用户名
jdbc.password=密码
```

<a id="submodule-code-generator-main-java"></a>
5. 在**src/main/java**目录下新建包名**cn.y.demo**并添加`Main.java`文件

```java
package cn.y.demo;

import cn.hutool.setting.dialect.Props;
import cn.hutool.setting.dialect.PropsUtil;
import cn.hutool.system.SystemUtil;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;

import java.io.File;
import java.util.Collections;

public class Main {

    public static void main(String[] args) {

        Props props = PropsUtil.get("config.properties");
        String url = props.getStr("jdbc.url");
        String username = props.getStr("jdbc.username");
        String password = props.getStr("jdbc.password");
        String packageName = props.getStr("package.name");

        String projectPath = SystemUtil.get(SystemUtil.USER_DIR) + File.separator + "code-generator";
        String codeOutPath = projectPath + "/src/main/java/";
        String mapperOutPath = projectPath + "/src/main/resources/mapper";

        String[] tableNames = new String[]{"t_pay"};



        FastAutoGenerator.create(url, username, password)
                .globalConfig(builder -> {
                    builder.author("yf") // 设置作者
                            .disableOpenDir() // 禁止生成代码后打开文件夹
                            // .enableSwagger()
                            .enableSpringdoc()
                            .outputDir(codeOutPath); // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent(packageName) // 设置父包名
                            .pathInfo(Collections.singletonMap(OutputFile.xml, mapperOutPath)); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.addInclude(tableNames) // 设置需要生成的表名
                            .addTablePrefix("t_", "r_") // 设置过滤表前缀
                            // 设置生成实体类时的属性
                            .entityBuilder()
                            .disableSerialVersionUID()
                            .enableChainModel()
                            // .superClass(BasEntity.class)
                            // .addSuperEntityColumns("id", "creator_id", "create_time", "updator_id", "update_time", "del")
                            // .addIgnoreColumns("id", "creator_id", "create_time", "updator_id", "update_time", "del")
                            .enableLombok()
                            // 添加RestController注解
                            .controllerBuilder()
                            .enableRestStyle();
                })
                .execute();
    }
}
```
