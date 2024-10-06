---
sidebar_position: 5
---

# Spring

## idea创建module跳language level问题

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
<!-- 或在<build>标签里面添加-->
<plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.7.0</version>
        <configuration>
            <source>1.8</source>
            <target>1.8</target>
        </configuration>
    </plugin>
</plugins>
```



## xml文件骨架

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
      https://www.springframework.org/schema/beans/spring-beans.xsd">

</beans>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>

</beans>
```



## 简介

* 2002， 首次推出了Spring框架的雏形: interface21框架!
* Spring框架即以interface21框架为基础，经过重新设计，并不断丰富其内涵，于2004年3月24日发布了1.0正式版。
* Rod Johnson，Spring Framework创始人
* spring理念: 使现有的技术更加容易使用，本身是一 个大杂烩，整合了现有的技术框架!
* SSH : Struct2 + Spring + Hibernate

* SSM : SpringMvc + Spring + Mybatis
* 文档：https://docs.spring.io/spring/docs/5.2.0.RELEASE/spring-framework-reference/core.html#spring-core
* 官方下载地址: http://repo.spring.io/release/org/springframework/spring
* GitHub: https://github.com/spring:projects/spring-framework

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.7.RELEASE</version>
</dependency>
<!--spring整合mybatis-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.2.7.RELEASE</version>
</dependency>

```

* Spring是一 个开源的免费的框架(容器) 
* Spring是一 个轻量级的、非入侵式的框架
* 控制反转(IOC) ，面向切面编程(AOP) 
* 支持事务的处理, 对框架整合的支持
* **Spring就是一 个轻量级的控制反转(IOC) 和面向切面编程(AOP)的框架!**

### 组成

![spring模块](/img/java/spring模块.png)

* 扩展：
  * Spring Boot
    * 一个快速开发的脚手架。
    * 基于SpringBoot可以快速的开发单个微服务。
    * 约定大于配置!
  * Spring Cloud
    * SpringCloud 是基于SpringBoot实现的。
* 因为现在大多数公司都在使用SpringBoot进行快速开发,学习SpringBoot的前提， 需要完全掌握Spring及SpringMVC

## IOC理论

1. UserDao接口
2. UserDaoImpl实现类
3. UserService接口
4. UserServiceImpl业务实现类

在我们之前的业务中,用户的需求可能会影响我们原来的代码，我们需要根据用户的需求去修改原代码!如果程序代码量十分大，修改一次的成本代价十分昂贵!

使用set注入属性将将控制器交到用户手上用户向调用那个UserDao实现类直接在UserServiceImpl里面设置就行了

```java
private UserDao userDao;
//使用set实现属性的注入
public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
}
```

降低耦合性

![ioc](/img/java/ioc.png)

> **IOC**

* 控制反转loC(Inversion of Control),是一种设计思想，DI(依赖注入)是实现IoC的一种方法，也有人认为DI只是IoC的另一种说法。没有IoC的程序中，我们使用面向对象编程， 对象的创建与对象间的依赖关系完全硬编码在程序中，对象的创建由程序自己控制，控制反转后将对象的创建转移给第三方，个人认为所谓控制反转就是:获得依赖对象的方式反转了。
* 采用XML方式配置Bean的时候，Bean的定义信息 是和实现分离的，而采用注解的方式可以把两者合为一体，Bean的定义信息直接以注解的形式定义在实现类中，从而达到了零配置的目的。
* **控制反转是一种通过描述(XML或注解)并通过第三方去生产或获取特定对象的方式。在Spring中实现控制反转的是IoC容器，其实现方法是依赖注入(Dependency Injection,DI)**

### spring实现对象的托管

* 编写实体类gettersetter方法

```java
public class Hello {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Hello{" +
            "name='" + name + '\'' +
            '}';
    }
}
```

* 编写bean.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           https://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--    使用bean标签对对象进行托管-->
    <bean id="hello" class="com.yang.pojo.Hello">
        <!--        初始化属性的值-->
        <property name="name" value="hello java"/>
    </bean>
</beans>
```

* 测试

```java
@Test
public void test02(){
    //创建ClassPathXmlApplicationContext读取beans.xml文件
    ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
    //调用getBean("id")方法获取托管的对象
    Hello hello = context.getBean("hello", Hello.class);
    System.out.println(hello);
}
```

* 使用bean标签托管的对象默认使用单例模式创建，就是同一个id获取到的对象是同一个对象

```java
//创建ClassPathXmlApplicationContext读取beans.xml文件
ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
//调用getBean("id")方法获取托管的对象
Hello hello1 = context.getBean("hello", Hello.class);
Hello hello2 = context.getBean("hello", Hello.class);
System.out.println(hello1 == hello2);//true
```

* Hello对象是谁创建的?
  * hello对象是由Spring创建的
* Hello对象的属性是怎么设置的?
  * hello对象的属性是由Spring容器设置的,
* 这个过程就叫控制反转:
  * 控制：谁来控制对象的创建,传统应用程序的对象是由程序本身控制创建的,使用Spring后,对象是由Spring来创建的.
  * 反转：程序本身不创建对象,而变成被动的接收对象.
* 依赖注入:就是利用set方法来进行注入的.
* IOC是一种编程思想,由主动的编程变成被动的接收.
* 可以通过newClassPathXmlApplicationContext去浏览一下底层源码 .

* ,我们彻底不用再程序中去改动了,要实现不同的操作,只需要在xml配置文件中进行修改，IOC：对象由Spring来创建,管理,装配!

## IOC创建对象的方式

* 使用无参构造 默认
* 使用有参构造

```xml
<!-- 使用下标-->
<bean id="user" class="com.yang.pojo.User" scope="prototype">
    <constructor-arg name="0" value="张三"/>
    <constructor-arg name="1" value="18"/>    
</bean>
<!-- 使用参数名-->
<bean id="user" class="com.yang.pojo.User" scope="prototype">
    <constructor-arg name="name" value="张三"/>
    <constructor-arg name="age" value="18"/>    
</bean>
<!-- 使用参数类型-->
<bean id="user" class="com.yang.pojo.User" scope="prototype">
    <constructor-arg name="java.lang.String" value="张三"/>
    <constructor-arg name="int" value="18"/>    
</bean>
```

* 在配置文件加载的时候，容器中管理的对象就已经初始化了!

## Spring配置

### 别名

```xml
<!-- bean的name标签也可以取别名，并且可以一次取多个别名-->
<bean id="user" class="com.yang.pojo.User" scope="prototype"
      name="别名1,别名2,……">
    <property name="name" value="张三"/>	
    <property name="age" value="18"/>
</bean>
<!--取别名-->
<alias name="user" alias="别名"/>
```

### import

* 这个import,一般用于团队开发使用，他可以将多个配置文件，导入合并为-一个
* 假设，现在项目中有多个人开发,这三个人复制不同的类开发,不同的类需要注册在不同的bean中，我们可以利
* 用import将所有人的beans.xml合并为一个总的!
* applicationContext.xml文件里面导入其他文件

```xml
<import resource="beans.xm1"/>
<import resource="beans2.xm]"/>
<import resource="beans3.xm1"/>
```

* 使用的时候，直接使用总的配置就可以了



## 依赖注入

### 构造器注入（上面）

### set注入

* 复杂注入：
* java类

```java
public class Student {
    private String name;
    private int age;
    private Address address;
    private List<Integer> is;
    private Set<String> ss;
    private Map<String, Integer> ms;
    private int[] ins;
    ……getter和setter方法
}
public class Address {
    private String home;
    private List<String> v2;
    ……getter和setter方法
}
```

* xml

```xml
<!--    address注入-->
<bean id="address" class="com.yang.pojo.Address">
    <property name="home" value="湖北"/>
    <property name="v2">
        <list value-type="java.lang.String">
            <value>wqew</value>
            <value>wqeweww</value>
            <value>wqrewew</value>
        </list>
    </property>
</bean>
<!--    student注入-->
<bean id="student" class="com.yang.pojo.Student">
    <property name="name" value="小明"/>
    <property name="age" value="18"/>
    <property name="address" ref="address"/>
    <property name="is">
        <list value-type="java.lang.Integer">
            <value>43</value>
            <value>4232</value>
            <value>44</value>
        </list>
    </property>
    <property name="ins">
        <array>
            <value>34</value>
            <value>3767</value>
            <value>376564</value>
            <value>3435434</value>
        </array>
    </property>
    <property name="ss">
        <set value-type="java.lang.String">
            <value>weqwq</value>
            <value>weqwqerwer</value>
            <value>weqrrewrewrwrewq</value>
        </set>
    </property>
    <property name="ms">
        <map key-type="java.lang.String" value-type="java.lang.Integer">
            <entry key="a">
                <value>44</value>
            </entry>
            <entry key="b">
                <value>4324</value>
            </entry>
<!--            <entry key="a" value="44"/>-->
<!--            <entry key="b" value="4324"/>-->
        </map>
    </property>
</bean>
```

* map和properties的注入方式：

  * map：

  ```xml
  <map key-type="java.lang.String" value type="java.lang.Integer">
  </map>
  <entry key="键">
      <value>值</value>
  </entry>
  <entry key="键" value="值"/>
  ```

  * properties:

  ```xml
  <props>
      <prop key="键">值</prop>
      <prop key="键">值</prop>
      <prop key="键">值</prop>
  </props>
  ```

  

### 拓展方式注入

* 必须导入xml约束（在bean标签内导入）
  * p：xmlns:p="http://www.springframework.org/schema/p"
  * c：xmlns:c="http://www.springframework.org/schema/c"

* p命名空间：

```xml
<!--p命名空间注入-->
<bean id="user" class="com.yang.pojo.User" p:name="张三" p:age="18"/>
```

* c命名空间：

```xml
<!--c命名空间注入-->
<bean id="user3" class="com.yang.pojo.User" c:name="张三" c:age="18"/>
```

### bean的作用域

![bean作用域](/img/java/bean作用域.png)

* singleton：单例模式

  * 默认开启
  * 使用getbean()获取到的对象都是一个对象

  ```xml
  <!--    可以显示开启-->
  <bean name="user" class="com.yang.pojo.User" scope="singleton">
      <property name="name" value="张三"/>
      <property name="age" value="18"/>
  </bean>
  ```

* prototype：原型模式

  * 使用getbean()获取到的对象相当于new一个对象

  ```xml
  <bean name="user" class="com.yang.pojo.User" scope="prototype">
      <property name="name" value="张三"/>
      <property name="age" value="18"/>
  </bean>
  ```

* request、session、 application、 这些个只能在web开发中使用到

## bean的自动装配

* autowire

  * byName：根据容器类的id查找跟该属性名相同的bean	
  * 使用byname的时候，需要保证所有bean的id唯一， 并且这个bean需要和自动注入的属性的set方法的值一致!

  ```xml
  <bean id="dog" class="com.yang.pojo.Dog" p:name="小黑"/>
  <bean id="cat" class="com.yang.pojo.Cat" p:name="小花"/>
  <bean id="people" class="com.yang.pojo.People" p:name="小明" autowire="byName"/>
  ```

  * byType：查找容器内的bean的类型是否符该属性的类型相同，相同则装配
  * 使用bytype的时候，需要保证所有bean的class唯一 , 并且这个bean需要和自动注入的属性的类型一致!

  ```xml
  <bean id="dog" class="com.yang.pojo.Dog" p:name="小黑"/>
  <bean id="cat" class="com.yang.pojo.Cat" p:name="小花"/>
  <bean id="people" class="com.yang.pojo.People" p:name="小明" autowire="byName"/>
  ```

  * ##### 使用注解实现自动装配

    * 导入约束，配置注解的支持：

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            https://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            https://www.springframework.org/schema/context/spring-context.xsd">
    
        <context:annotation-config/>
    
    </beans>
    ```

    * @Autowired
      * required属性：指定为false说明该字段可以为空

    ```java
    public class People {
        private String name;
        @Autowired
        private Dog dog;
        @Autowired
        private Cat cat;
    }
    ```

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:context="http://www.springframework.org/schema/context"
           xsi:schemaLocation="http://www.springframework.org/schema/beans
            https://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            https://www.springframework.org/schema/context/spring-context.xsd">
        <context:annotation-config/>
        <bean id="dog" class="com.yang.pojo.Dog"/>
        <bean id="cat" class="com.yang.pojo.Cat"/>
        <bean id="people" class="com.yang.pojo.People"/>
    </beans>
    ```

    * 如果@Autowired自动装配的环境比较复杂，自动装配无法通过一个注解[@Autowired] 完成的时候、我们可以
    * 使用@Qualifier(value="xx")去配置@Autowired的使用，指定一个唯一 的bean对象注入!

    ```java
    public class People {
        private String name;
        @Autowired
        @Qualifier("dog")
        private Dog dog;
        @Autowired
        @Qualifier("cat")
        private Cat cat;
    }
    ```

    * java自带的@Resources注解也可以使用这个注解相当于@Autowired+@Qualifier(value="xx")

## 使用注解开发

##### 在Spring4之后，要使用注解开发，必须要保证aop的包导入了

##### 使用注解需要导入context约束,增加注解的支持!

* bean

* 属性如何注入
  * 在类上面加@Component注解

```java
@Component
public class People {
    private String name;
    private Dog dog;
    private Cat cat;
}
```

* 衍生的注解
  * @Component有几个衍生注解, 我们在web开发中，会按照mvc三层架构分层
    * dao [@Repository]
    * service[ @Service]
    * controller [ @Controller ]
  * 这四个注解功能都是一 样的，都是代表将某个类注册到Spring中，装配Bean

* 自动装配置
  * @Autowired
  * @Qualifier("")

* 作用域

  * @Scope("模式")

  ```java
  @Component
  @Scope("prototype")
  public class People {
      private String name;
      private Dog dog;
      private Cat cat;
  }
  ```

  

* 小结

  * xml与注解:

    * xml更加万能，适用于任何场合!维护简单方便
    * 注解不是自己类使用不了，维护相对复杂!

  * xml与注解最佳实践: 

    *  xml用来管理bean;
    * 注解只负责完成属性的注入;
    * 我们在使用的过程中，只需要注意一个问题: 必须让注解生效，就需要开启注解的支持

    ```xml
    <context:component-scan base-package="包名"/>
    <context:annotation-config/>
    ```

## 使用Java的方式配置Spring

##### 我们现在要完全不使用Spring的xml配置了，全权交给Java来做! 

##### JavaConfig是Spring的一-个子项目，在Spring4之后, 它成为了一个核心功能!

```java
@Configuration
//扫描包
@ComponentScan("com.yang.pojo")
//合并两个Configuration配置类
@Import(CustomConfig2.class)
public class CustomConfig {
    @Bean
    public User user(){
        return new User();
    }
}
```

## AOP

AOP (Aspect Oriented Programming)意为:面向切面编程，通过预编译方式和运行期动态代理实现程序功能的统- -维护的一种技术。AOP是OOP的延续,是软件开发中的一个热点，也是Spring框架中的一个重要内容,是函数式编程的一种衍生范型。利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

### AOP在Spring中的作用

##### 提供声明式事务允许用户自定义切面

* 横切关注点:跨越应用程序多个模块的方法或功能。即是，与我们业务逻辑无关的，但是我们需要关注的部‘分，就是横切关注点。如日志，安全,缓存,事务等等...
* 切面(ASPECT) :横切关注点被模块化的特殊对象。即，它是一-个类。
* 通知(Advice) :切面必须要完成的工作。即，它是类中的-一个方法。
* 目标(Target) :被通知对象。
* 代理(Proxy) :向目标对象应用通知之后创建的对象。
* 切入点(PointCut) :切面通知执行的“地点"的定义。
* 连接点(JointPoint) :与切入点匹配的执行点。

![aop](/img/java/aop.png)

### 使用Spring实现Aop

导包

```xml
<!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.5</version>
</dependency>
```

#### 使用spring的api接口实现

* 编写service层

```java
//接口
public interface UserService {
    void add();
    void update();
    void select();
    void delete();
}
//实现类
public class UserServiceImpl implements UserService {
    @Override
    public void add() {
        System.out.println("添加了一个用户");
    }
    @Override
    public void update() {
        System.out.println("修改了一个用户");
    }
    @Override
    public void select() {
        System.out.println("查询了一个用户");
    }
    @Override
    public void delete() {
        System.out.println("删除了一个用户");
    }
}
```

* 编写日志类
  * 前置日志实现MethodBeforeAdvice接口，在该方法执行前执行

```java
public class Log  implements MethodBeforeAdvice {
    @Override
    public void before(Method method, Object[] objects, Object o) throws Throwable {
        System.out.println(method.getName()+" is start to invoked!");
    }
}
```

* 后置日志实现AfterReturningAdvice，在该方法执行后执行

```java
public class AfterLog implements AfterReturningAdvice {
    @Override
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        System.out.println(method.getName()+" is invoked! result is: " + returnValue);
    }
}
```

* 编写xml文件注册bean

```xml
<bean id="userService" class="com.yang.service.UserServiceImpl"/>
<bean id="log" class="com.yang.log.Log"/>
<bean id="afterLog" class="com.yang.log.AfterLog"/>
```

* 在xml文件内加入`<aop:config>`标签，实现对类进行切面编程

```xml
<aop:config>
    <aop:pointcut id="point" expression="execution(* com.yang.service.UserService.*(..))"/>
    <aop:advisor advice-ref="log" pointcut-ref="point"/>
    <aop:advisor advice-ref="afterLog" pointcut-ref="point"/>
</aop:config>
```

#### 自定义方式实现AOP

* 编写自定义切面类

```java
public class CustomLog {
    public void before(){
        System.out.println("方法执行前");
    }
    public void after(){
        System.out.println("方法执行后");
    }
}
```

* 在xml文件里面注册

```xml
<bean id="customLog" class="com.yang.custom.CustomLog"/>
```

* xml文件里面添加`<aop:config>`标签

```xml
<aop:config>
    <aop:aspect ref="customLog">
        <aop:pointcut id="userServicePoint" expression="execution(* com.yang.service.UserService.*(..))"/>
        <aop:before method="before" pointcut-ref="userServicePoint"/>
        <aop:after method="after" pointcut-ref="userServicePoint"/>
    </aop:aspect>
</aop:config>
```

#### 使用注解方式

* 编写自定义切面类并添加注解

```java
@Aspect
public class CustomAnnoPoint {
    @Before("execution(* com.yang.service.UserService.*(..))")
    public void before(){
        System.out.println("注解实现--方法执行前");
    }
    @After("execution(* com.yang.service.UserService.*(..))")
    public void after(){
        System.out.println("注解实现--方法执行后");
    }
}
```

* xml文件里注册该类

  ```xml
  <bean id="customAnnoPoint" class="com.yang.custom.CustomAnnoPoint"/>
  ```

* xml文件内添加`<aop:aspectj-autoproxy/>`标签自动代理切面类

* `<aop:aspectj-autoproxy/>`标签的proxy-target-class
  * false（默认）：JDK实现
  * true：cglib实现

## 整合mybatis

### 方式一

* 导包

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.2.7.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.3</version>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.5</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.7.RELEASE</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13</version>
</dependency>
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.4.6</version>
</dependency>
```

* 编写spring的xml文件
* spring自带的数据源DriverManagerDataSource

```xml
<bean id="dateSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
    <property name="url"
              value="jdbc:mysql://localhost:3306/session1?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=Asia/Shanghai"/>
    <property name="username" value="root"/>
    <property name="password" value="112358"/>
</bean>
```

* spring自带的SqlSessionFactoryBean

```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <!--        注入数据源-->
    <property name="dataSource" ref="dateSource"/>
    <!--        获取mybatis的配置文件-->
    <property name="configLocation" value="classpath:mybatis-config.xml"/>
    <!--        扫描对应的xml配置文件-->
    <property name="mapperLocations" value="classpath:com/yang/dao/*.xml"/>
</bean>
```

* spring自带的SqlSessionTemplate

```xml
<bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
    <constructor-arg index="0" ref="sqlSessionFactory"/>
</bean>
```

* 编写对应的mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.yang.dao.UserMapper">
    <select id="getUser" resultType="users">
        select * from users limit 0, 10
    </select>
</mapper>
```

* 编写对应的Mapper实现类

```java
public class UserMapperImpl implements UserMapper {

    private SqlSessionTemplate sqlSession;

    private UserMapper userMapper;

    public void setSqlSession(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
        userMapper = this.sqlSession.getMapper(UserMapper.class);
    }

    @Override
    public List<Users> getUser() {
        //        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        return userMapper.getUser();
    }
}
```

* 对应的实现类属性注入sqlSession类

```xml
<bean id="userMapper" class="com.yang.dao.UserMapperImpl">
    <property name="sqlSession" ref="sqlSession"/>
</bean>
```

* 测试

```java
@Test
public void test03(){
    UserMapper userMapper = context.getBean("userMapper", UserMapper.class);
    List<Users> user = userMapper.getUser();
    for (Users users : user) {
        System.out.println(users);
    }
}
```

### 方式二

* 将方式一的托管spring自带的SqlSessionTemplate替换为对应的Mpper实现类继承SqlSessionDaoSupport接口sqlSession就可以使用父类的`getSession()`获取
* 托管实现类事需要注入SqlSessioinFactory接口

```xml
<bean id="userMapper2" class="com.yang.dao.UserMapperImpl2">
    <property name="sqlSessionFactory" ref="sqlSessionFactory"/>
</bean>
```

## Spring中的事务

#### 声明式事务：AOP

* 使用Aop实现事务

* xml文件内编写

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <constructor-arg name="dataSource" ref="dataSource"/>
    <!--        <property name="dataSource" ref="dataSource"/>-->
</bean>
```

```xml
<tx:advice id="mapperTransaction" transaction-manager="transactionManager">
    <tx:attributes>
        <tx:method name="update" propagation="REQUIRED"/>
        <tx:method name="delete" propagation="REQUIRED"/>
        <tx:method name="*" propagation="REQUIRED"/>
    </tx:attributes>
</tx:advice>
```

```xml
<aop:config>
    <aop:pointcut id="userMapperPointCut" expression="execution(* com.yang.dao.UserMapper.*(..))"/>
    <aop:advisor advice-ref="mapperTransaction" pointcut-ref="userMapperPointCut"/>
</aop:config>
```

* 使用注解实现的事务
* 在需要使用事务的方法上加上@Transactional注解

```java
@Transactional
public List<Users> getUser() {
    HashMap<String, Object> map = new HashMap<>();
    map.put("userId", 1001);
    map.put("email", "wqeqe@qq.com");
    map.put("password", "1111111");
    userMapper.insertUser(map);
    userMapper.deleteUser(103);

    return userMapper.getUser();
}
```

* 在xml文件内配置

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <constructor-arg name="dataSource" ref="dataSource"/>
    <!--        <property name="dataSource" ref="dataSource"/>-->
</bean>

<!--注解实现事务的标签-->
<tx:annotation-driven transaction-manager="transactionManager"/>
```



#### 编程式事务：需要在代码里实现事务的管理

