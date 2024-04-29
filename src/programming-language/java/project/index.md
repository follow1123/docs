# SunshineAirline项目制作过程

## 搭建基本的ssm框架

* 导入需要的jar包

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.2.7.RELEASE</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis-spring -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.3</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.5</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.7.RELEASE</version>
</dependency>
<!--        mysql驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.11</version>
</dependency>
<!--        junit jar包-->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13</version>
</dependency>
<!--        mybatis jar 包-->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.4.6</version>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>javax.servlet.jsp-api</artifactId>
    <version>2.3.3</version>
    <scope>provided</scope>
</dependency>
<!-- https://mvnrepository.com/artifact/javax.servlet.jsp.jstl/jstl-api -->
<dependency>
    <groupId>javax.servlet.jsp.jstl</groupId>
    <artifactId>jstl-api</artifactId>
    <version>1.2</version>
</dependency>
<!-- https://mvnrepository.com/artifact/taglibs/standard -->
<dependency>
    <groupId>taglibs</groupId>
    <artifactId>standard</artifactId>
    <version>1.1.2</version>
</dependency>
```

* 将java的语言环境设置为8

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

* 编写文件过滤防止资源导不出

```xml
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
        </resource>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
        </resource>
    </resources>
</build>
```

* 添加web框架依赖
* 在artifacts自行添加lib目录
* 编写dp.properties文件

```properties
jdbc.classDriver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/session1?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
jdbc.username=用户名
jdbc.password=密码
```

* 编写mybatis-conig配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <typeAliases>
        <package name="com.yang.pojo"/>
    </typeAliases>
</configuration>
```

* 编写spring-dao配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <context:property-placeholder location="db.properties"/>

    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="${jdbc.classDriver}"/>
        <property name="url"
                  value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <!--        <property name="configLocation" value="classpath:mybatis-config.xml"/>-->
        <!--        <property name="mapperLocations" value="classpath:com/yang/dao/*.xml"/>-->
    </bean>

    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
        <property name="basePackage" value="com.yang.dao"/>
    </bean>
</beans>
```

* 在web.xml内添加spring的调度器等

```xml
    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    <filter>
        <filter-name>characterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>characterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

* 编写spring-mvc配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           https://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/mvc
                           http://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <context:component-scan base-package="com.yang.dao"/>

    <mvc:default-servlet-handler/>
    <!--    <mvc:interceptors>-->
    <!--        <mvc:interceptor>-->
    <!--            &lt;!&ndash;         /**代表所有路径下的请求全部拦&ndash;&gt;-->
    <!--            <mvc:mapping path="/**"/>-->
    <!--            <bean class="com.yang.interceptor.MyInterceptor"/>-->
    <!--        </mvc:interceptor>-->
    <!--    </mvc:interceptors>-->
    <!--    解决json到前端页面的乱码问题-->
    <mvc:annotation-driven>
        <mvc:message-converters register-defaults="true">
            <bean class="org.springframework.http.converter.StringHttpMessageConverter">
                <constructor-arg value="UTF-8"/>
            </bean>
            <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
                <property name="objectMapper">
                    <bean class="org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean">
                        <property name="failOnEmptyBeans" value="false"/>
                    </bean>
                </property>
            </bean>
        </mvc:message-converters>
    </mvc:annotation-driven>


    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <property name="defaultEncoding" value="utf-8"/>
        <property name="maxUploadSize" value="10485760"/>
        <property name="maxInMemorySize" value="40960"/>
    </bean>
</beans>
```

* 编写spring-service配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <context:component-scan base-package="com.yang.service"/>
    <bean id="userServiceImpl" class="com.yang.service.UserServiceImpl">
        <property name="userMapper" ref="userMapper"/>
    </bean>
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
</beans>
```

## 前端页面框架

### 使用layui

导入

```html
<!--在body前导入-->
 <link href="${pageContext.request.contextPath}/static/layui/css/layui.css" rel="stylesheet"/>
<!--在body闭合标签前导入-->
<script src="${pageContext.request.contextPath}/static/layui/layui.all.js"></script>
<script src="${pageContext.request.contextPath}/static/js/jquery-3.4.1.js"></script>
```

* 编写登录页面

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
    <link href="${pageContext.request.contextPath}/static/layui/css/layui.css" rel="stylesheet"/>
</head>
<body style="background-color: #e2e2e2">
<div class="layui-row layui-col-space10">
    <div class="layui-col-md4">
    </div>
    <div class="layui-col-md4" style="margin-top: 10%">
        <form style="padding: 50px;" class="layui-form layui-form-pane" action="${pageContext.request.contextPath}/login" method="post">
            <div class="layui-form-item">
                <h2>Login</h2>
            </div>
            <div class="layui-form-item">
                <input type="text" name="email" required lay-verify="email" placeholder="Email" autocomplete="off"
                       class="layui-input">
            </div>
            <div class="layui-form-item">
                <input type="password" name="password" required lay-verify="password" placeholder="Password"
                       autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-item">
                <button class="layui-btn" lay-submit lay-filter="formDemo">login</button>
                <input type="checkbox" style="float: right" name="auto" title="AutoLogin">
            </div>
        </form>


    </div>
    <div class="layui-col-md4">
    </div>
</div>
<script src="${pageContext.request.contextPath}/static/js/jquery-3.4.1.js"></script>
<script src="${pageContext.request.contextPath}/static/layui/layui.all.js"></script>
<script>
    layui.use('form', function () {
        var form = layui.form;
        form.verify({
            email:function (value) {
                console.log(value);
                if (value == null || ''== value){
                    return '用户名不能为空！';
                }
            },
            password:function (value) {
            if (value == null || ''== value){
                    return '密码不能为空！';
                }
            }
        })
    });
</script>
</body>
</html>
```

* 编写dao层

```java
public interface UserMapper {
    Users getUser(String email, String password);

    List<Users> getAllUser();
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.yang.dao.UserMapper">
    <select id="getAllUser" resultType="users">
        select * from users limit 0, 10
    </select>
    <select id="getUser" resultType="users">
        select * from users where email= #{arg0} and password=#{arg1}
    </select>
</mapper>
```

* 编写service层

```java
public interface UserService {

    Users verification(String email, String password);

}
public class UserServiceImpl implements UserService {

    private UserMapper userMapper;
    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
    public Users verification(String email, String password) {
        return userMapper.getUser(email, password);
    }
}
```

```xml
<bean id="userServiceImpl" class="com.yang.service.UserServiceImpl">
    <property name="userMapper" ref="userMapper"/>
</bean>
```

* 编写controller层

```java
package com.yang.controller;

import com.yang.pojo.Users;
import com.yang.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

/**
 * @auther YF
 * @create 2020-08-23-18:00
 */
@Controller
public class LoginController {

    public UserServiceImpl userServiceImpl;

    @Autowired
    @Qualifier("userServiceImpl")
    public void setUserService(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @RequestMapping("/login")
    public String login(String email,
                        String password,
                        boolean auto,
                        HttpSession session){
        System.out.println(email+"----------"+password);
        Users users = userServiceImpl.verification(email, password);
        if (users != null){
            session.setAttribute("user", users);
            return "main";
        }
        return "login";
    }
}

```

* &lt;c:import/&gt; 标签引入文件的一些操作

* 引入一个页面是可以传递参数给被引入的页面，被引入的页在取是需要注意，需要使用`${param.名称}`进行取值

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!--需要引入的页面-->
<c:import url="../commont/head.jsp">
    <c:param name="importValues" value="12312321"/>
</c:import>
<h1>Office Menu</h1>
<script src="${pageContext.request.contextPath}/static/js/jquery-3.4.1.js"></script>
<script src="${pageContext.request.contextPath}/static/layui/layui.all.js"></script>
</body>
</html>
```

```jsp
<!--被引入的页面的驱取值方式 -->
<h1>${param.importValues}</h1>
```

