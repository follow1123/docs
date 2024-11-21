---
sidebar_position: 10
---

# Spring MVC

## 编写一个springMVC程序

* 配置web.xml，注册DispatcherServlet

```xml
<!--1.注册DispatcherServlet--> 
<servlet>
    <servlet-name>springmvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!--        关联springmvc的配置文件-->
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:springmvc-servlet.xml</param-value>
    </init-param>
    <!--        启动级别-->
    <load-on-startup>1</load-on-startup>
</servlet>
<!--    / 匹配所有请求不包括.jsp-->
<!--    /* 匹配所有请求包括.jsp-->  
<servlet-mapping>
    <servlet-name>springmvc</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

* 编写springmvc-servlet.xml文件
* 添加处理器映射器

```xml
<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>
```

* 添加处理器适配器

```xml
<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>
```

* 添加视图解析器

```xml
<!--    视图解析器: DispatcherServlet给他的ModeLAndView-->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="WEB-INF/jsp/"/>
    <property name="suffix" value=".jsp"/>
</bean>
```

* 编写controller类

```java
public class HelloController implements Controller {
    @Override
    public ModelAndView handleRequest(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg", "Hello SpringMVC");
        mv.setViewName("he");
        return mv;
    }
}
```

* 在WEB-INF目录下新建一个1文件夹再编写jsp页面获取controller类发送的数据

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
<title>Title</title>
</head>
<body>
${msg}
</body>
</html>
```

* 在spring的xml文件内托管该controller类
* 问题：

![问题](/img/java/问题.png)

* 使用注解方式：

  * 将springxml文件更改

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:context="http://www.springframework.org/schema/context"
         xmlns:mvc="http://www.springframework.org/schema/mvc"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
         http://www.springframework.org/schema/context
          https://www.springframework.org/schema/context/spring-context.xsd
           http://www.springframework.org/schema/mvc
            https://www.springframework.org/schema/mvc/spring-mvc.xsd">
  <!--    扫描包-->
      <context:component-scan base-package="com.yang.controller"/>
  <!--    过滤静态资源-->
      <mvc:default-servlet-handler/>
      <!--
          支持mvc注解驱动
          在spring中一般采用@RequestMapping注解来完成映射关系
          要想仪@Reques tMapping注解生效必须向上下文中注DefaultAnnotationHandlerMapping
          和一个AnnotationMethodHandlerAdapter实例
          这两个实例分别在类级别和方法级别处理。
          而annotation-driven配置帮助我们自动完成上述两个实例的注入。
      -->
      <mvc:annotation-driven/>
      <!--    视图解析器: DispatcherServlet给他的ModeLAndView-->
      <bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
          <property name="prefix" value="WEB-INF/jsp/"/>
          <property name="suffix" value=".jsp"/>
      </bean>
  </beans>
  ```

  * 编写对应controller类

  ```java
  @Controller
  public class HelloController {
      @RequestMapping(../../assets/java/hello")
      public String hello(Model model){
          model.addAttribute("msg", "Hello SpringMVCAnnotation!");
          return "test";
      }
  }
  
  ```

  * 在WEB-INF目录下新建一个1文件夹再编写jsp页面获取controller类发送的数据

  ```jsp
  <%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <html>
  <head>
  <title>Title</title>
  </head>
  <body>
  ${msg}
  </body>
  </html>
  ```

* Restful风格

  * 默认的资源拦截器可能拦截restful风格的输入方式
  * 在配置了视图解析器后使用视图解析器方式可能会出现404（自己遇见的问题待解决

```java
@Controller
public class OperationController {
    //url使用{}符号取值
    @RequestMapping(../../assets/java/add/{num1}/{num2}")
    			//添加@PathVariable指定参数对应的名称
    public String add(@PathVariable("num1") int a,@PathVariable("num2") int b, Model model){
        model.addAttribute("result", a + b);
        return "forward:/WEB-INFO/jsp/result.jsp";
    }
}
```

* 不使用视图解析器实现页面转发和重定向的方式

* 页面转发

  * 返回值填写项目下资源的完整路径
  * 可以前缀加上forward:标识为页面转发
  * 不加默认为页面转发

  ```java
  @RequestMapping(../../assets/java/test")
  public String tets(){
      return "/WEB-INF/jsp/te.jsp";
  }
  ```

* 重定向（重定向不能访问web-inf下的文件）

  * 在文件前面加redirect:标识为重定向

  ```java
  @RequestMapping(../../assets/java/redirect")
  public String reTest(){
      System.out.println("-----------------");
      return "redirect:/index.jsp";
  }
  ```

## 获取前端表单的参数

* 参数名称与mapping方法的形参名称一致
  * 如果不一致需要在方法参数的前面加上@RequestParam("名称")与前端页面的名称一致

```jsp
<form action="${pageContext.request.contextPath}/param1" method="get">
    <input type="text" name="username" value="${username}"><br>
    <input type="submit">
</form>
```

```java
@RequestMapping(../../assets/java/param1")
public String pa1Test(@RequestParam("username") String username){
    System.out.println(username);
    return "forward:/testParam1.jsp";
}
```

* 如果前端放回的数据刚好是一个对象则mapping方法内可以直接将该对象作为参数，如果对象的属性名与前端页面的参数不一致则不会赋值

```jsp
<form action="${pageContext.request.contextPath}/param2">
    <input type="text" name="name"><br>
    <input type="password" name="password"><br>
    <input type="number" name="phone"><br>
    <input type="submit">
</form>
```

```java
@RequestMapping(../../assets/java/param2")
public String pa1Test(User user){
    System.out.println(user);
    return "forward:/testParam.jsp";
}
```

## Model、ModelMap、ModelAndView

* model：适用于数据储存，简化了用户对model的操作
* modelmap：继承了LinkedHashMap，可以使用likedhashmap的操作
* modelandview：可以储存数据，可以设置放回的逻辑视图，进行控制展示层跳转

## 处理乱码问题

* 方式一：自己编写字符过滤器
* 方式二：配置spring自己实现的characterEncdingFilter

```xml
<filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/</url-pattern>
</filter-mapping>
```

## Json

#### 使用Jackson

* JavaScript解析和转换json

  * 将js里面的对象转换为json字符串

  ```javascript
  //定义一个js对象
  var obj = {
      name:"张三",
      age:18,
      id:"1001"
  };
  //使用JSON对象的stringify方法将该js对象转换为json字符串
  let objStr = JSON.stringify(obj);
  ```

  * 将json字符串解析为js里面的对象

  ```javascript
  var jsonStr = '{"name":"张三","age":18,"id":"1001"}';
  var jsonObj = JSON.parse(jsonStr);
  ```

* java里面解析和转换json

  * 导包

  ```xml
  <!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
  <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.11.2</version>
  </dependency>
  ```

  * 在方法前面加上@ReponseBody是这个方法不走视图解析器而是直接在页面显示返回的字符串
  * 如果需要该类里面的所有方法都不走视图解析器，返回字符串的话，将该类的@Controller注解替换为@RestControler

  ```java
  @ResponseBody
  @RequestMapping(../../assets/java/j1")
  public String testJson01(){
      return "123";
  }
  ```

  * 创建ObjectMapper对象，调用writeValueAsString方法将一个java对象转换为json字符串

    * 解决json转到前端的的乱码问题

      * 方式一：在Mapping里面添加一个参数produces = "application/json;charset=utf-8",如果有多的mapping这种发视会非常麻烦
      * 方式二：springmvc提供的，在xml文件里面添加如下代码，可以全局使用

      ```xml
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
      ```

      

  ```java
  @ResponseBody
  @RequestMapping(value = "/j1", produces = "application/json;charset=utf-8")
  public String testJson01() throws JsonProcessingException, UnsupportedEncodingException {
      User user = new User("张三", "qwqe", "1111111");
      //        HashMap<String, String> user = new HashMap<>();
      //        user.put("name", "张三");
      //        user.put("age", "12");
      ObjectMapper mapper = new ObjectMapper();
      String jsonObj = mapper.writeValueAsString(user);
      return jsonObj;
  }
  ```

* 将集合解析为json字串

  * 解析Map
    * 和解析对象后的结果一样

  ```java
  @RequestMapping(../../assets/java/j2")
  public String testJ2() throws JsonProcessingException {
      HashMap<String, Object> map = new HashMap<>();
      map.put("name","张三") ;
      map.put("age", 18);
      ObjectMapper mapper = new ObjectMapper();
      String jObj = mapper.writeValueAsString(map);
      return jObj;
  }
  ```

  * 解析List，数组和list的解决结果一样
    * 解析后的果为：`["张三","李四","王五","赵六"]`

  ```java
  @RequestMapping(../../assets/java/j3")
  public String testJ3() throws JsonProcessingException {
      ArrayList<String> list = new ArrayList<>();
      list.add("张三");
      list.add("李四");
      list.add("王五");
      list.add("赵六");
      ObjectMapper mapper = new ObjectMapper();
      String jObj = mapper.writeValueAsString(list);
      return jObj;
  }
  ```

  * 嵌套解析
    * 解析后的果为：`{"name":"张三","朋友":["李四","王五","赵六"],"age":18}`

  ```java
  @RequestMapping(../../assets/java/j4")
  public String testJ4() throws JsonProcessingException {
      HashMap<String, Object> map = new HashMap<>();
      map.put("name","张三") ;
      map.put("age", 18);
      ArrayList<String> list = new ArrayList<>();
      list.add("李四");
      list.add("王五");
      list.add("赵六");
      map.put("朋友", list);
      ObjectMapper mapper = new ObjectMapper();
      String jObj = mapper.writeValueAsString(map);
      return jObj;
  }
  ```

#### 使用FastJson

* 导包

  ```xml
  <!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
  <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>fastjson</artifactId>
      <version>1.2.73</version>
  </dependency>
  ```

* 调用

  * 直接调用JSON的静态方法toJsonString转换json

```java
@RequestMapping(../../assets/java/j5")
public String testJ5() {
    HashMap<String, Object> map = new HashMap<>();
    map.put("name","张三") ;
    map.put("age", 18);
    ArrayList<String> list = new ArrayList<>();
    list.add("李四");
    list.add("王五");
    list.add("赵六");
    map.put("朋友", list);
    return JSON.toJSONString(map);
}
```

## Ajax

* 编写后端操作

```java
@RestController
public class AjaxController {
    @RequestMapping(../../assets/java/testAjax/{value}")
    public boolean testAjax(@PathVariable("value") String value){
        return "123".equals(value);
    }
}
```

* 编写前端页面

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Title</title>
    </head>
    <script src="${pageContext.request.contextPath}/static/js/jquery-3.4.1.js"></script>
    <body>
        <input type="text" id="in"><br>
        <input type="button" id="bt" value="提交"/>
        <script type="text/javascript">
            $(function () {
                $('#bt').click(function () {
                    //使用ajax实现异步请求
                    $.post('${pageContext.request.contextPath}/testAjax/'+$('#in').val(), function (data) {
                        alert(data);
                    })
                });
            });
        </script>
    </body>
</html>
```

## 拦截器

* 自定义类实现HandlerInterceptor接口

```java
public class MyInterceptor implements HandlerInterceptor {
     //拦截前
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //这里返回true说明通过
        //返回false说明被拦截
        return false;
    }
 	//拦截后
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }
	//清理
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
```

* spring 配置文件内添加：

```xml
<mvc:interceptors>
    <mvc:interceptor>
        <!--         /**代表所有路径下的请求全部拦-->
        <mvc:mapping path="/**"/>
        <bean class="com.yang.interceptor.MyInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

## 文件上传

* 前端页面

```jsp

```

* springxml文件里面配置文件上传的工具

```xml
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <property name="defaultEncoding" value="utf-8"/>
        <property name="maxUploadSize" value="10485760"/>
        <property name="maxInMemorySize" value="40960"/>
</bean>
```

## 常见问题

### 后端解决跨域的三种方式

* 1. 方法上添加`@CrossOrigin`注解

```java
@PostMapping("/testCors")
@CrossOrigin
public Map<String, String> testCors(){
    return Map.of("name", "123", "age", "123");
}
```

* 2. 配置`CorFilter`滤器

```java
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(source);
    }
}
```

* 3. 实现`WebMvcConfigurer`接口的`addCorsMappings`方法进行配置

```java
@Configuration
public class CorsConfigure implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedHeaders("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
```

* 配合安全框架的情况下推荐使用`CorFilter`的方式，过滤器会最先执行
