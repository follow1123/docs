---
sidebar_position: 22
---

# Java Web

### web.xml里面的头文件信息
```xml
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="true">
</web-app>
```
### ServletContext类
```java
//servlet上下文对象所有servlet程序都可以获取到这个类
ServletContext context = getServletContext();       
```
#### setAttribute
```java
//在该上下对象内存一个对象使servlet程序之间互相通信更加方便
context.setAttribute("name", "张三");
```
#### getInitParameter
* 先在web.xml文件里面编写需要的信息
```xml
<!--    可以配置web应用初始化所首需要的信息-->
<context-param>
    <param-name>url</param-name>
    <param-value>需要的信息</param-value>
</context-param>
```
* 然后获取
```java
//获取在web.xml里面配置的信息
context.getInitParameter("url");
```
#### getRequestDispatcher
````java
//请求转发 将当前servlet获取到的的请求转发到指定的servlet进行处理
context.getRequestDispatcher("/w").forward(req, resp);
````
#### Maven配置的一个问题
```xml
<!--    在build里配置resources,防止支援导出失败的问题-->
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
#### getResourceAsStream
```java
//获取当前项目resource目录里面的资源文件
context.getResourceAsStream("/WEB-INF/classes/info.properties");
```

### HTTP响应
* 服务器-->响应-->客户端

百度：

```
Cache-Control:private   缓存控制
Connection:Keep-Alive   连接
Content-Encoding:gzip   编码
Content-Type:text/html  类型
```
1.响应体
```
Accept：             告诉浏览器，他支持所有的数据类型
Accept-Encoding：    支持那种编码格式：GBK、UTF-8、GB2312、ISO8895-1
Accept-language：    告诉浏览器语言环境
Cache-Control：      缓存控制
Connection：         告诉浏览器，请求完成后是断开还是保持连接
HOST：               主机
Refersh：            告诉客户端，多久刷新一次
Locatoin：           让网页重新定位
```
2. 响应的状态码
    * 200：请求响应成功
    * 3xx：请求重定向
        * 重定向： 你重新到我给你的新位置去
    * 4xx：资源找不到 404
        * 资源不存在
    * 5xx：服务器代码错误 500 502：网关错误



**web服务器接收到客户端的http请求，针对这个请求，分别创建一个代表请求的HttpServletRequest对象，和一个代表响应的HttpServletResponse对象**
* 如果要获取客户端请求过来的参数：找HttpServletRequest
* 如果要给客户端响应一些数据：找HttpServletResponse
### HttpServletResponse
**负责向浏览器发送数据的方法**

```java
public ServletOutputStream getOutputStream() throws IOException;
public PrintWriter getWriter() throws IOException;
```

**负责向浏览器发送响应头的方法**

```java
public void setCharacterEncoding(String charset);
public void setContentLength(int len);
public void setContentLengthLong(long len);
public void setContentType(String type);
public void setDateHeader(String name, long date);
public void addDateHeader(String name, long date);
public void setHeader(String name, String value);
public void addHeader(String name, String value);
public void setIntHeader(String name, int value);
public void addIntHeader(String name, int value);
```

####功能

1. 向页面输出信息	

2. 下载文件
```java
//获取文件路径
String realPath = getServletContext().getRealPath("/WEB-INF/classes/张三.png");
//获取文件名
String fileName = realPath.substring(realPath.lastIndexOf("\\") + 1);
//设置响应头文件名需要进行重新编码
resp.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(fileName, "UTF-8"));
//获取输入流
FileInputStream fis = new FileInputStream(realPath);
//获取输出流
ServletOutputStream os = resp.getOutputStream();
//输出操作
byte[] buffer = new byte[1024];
int len = 0;
while ((len = fis.read(buffer)) > 0){
    os.write(buffer, 0, len);
    os.flush();
}
//关闭流
fis.close();
os.close();
```
3. 验证码功能
```java
//设置页面每过5秒刷新一次
resp.setHeader("Refresh", "5");
//创建一张图片
BufferedImage bi = new BufferedImage(200, 70, BufferedImage.TYPE_INT_RGB);
//获取画笔
Graphics2D graphics = (Graphics2D) bi.getGraphics();
//设置画笔颜色
graphics.setColor(Color.WHITE);
//填充背景颜色
graphics.fillRect(0, 0, 200, 80);
//再次设置画笔颜色
graphics.setColor(Color.BLUE);
//设置字体类型
graphics.setFont(new Font(null, Font.BOLD, 30));
//画上一个字符串
graphics.drawString(getVerification(), 40, 40);
//设置浏览器打开的格式
resp.setHeader("Content-Type", "image/png");
//不让网站缓存
resp.setDateHeader("expires", -1);
resp.setHeader("Cache-Control", "no-cache");
resp.setHeader("Pragma", "no-cache");
//把图片写给浏览器
ImageIO.write(bi, "png", resp.getOutputStream());
```
4.实现重定向

一个web资源收到客户端请求后，它会通知客户端去访问另一个web资源，这个过程叫重定向
```java
/*重定向
        相当于：
        resp.setHeader("Location", "/st/img");
        resp.setStatus(302);*/
resp.sendRedirect("/st/img");
```

### HttpServletRequest

HttpServletRequest代表客户端的请求，用户通过http协议访问服务器，http请求的所有信息会被封装到HttpServletRequest，
通过HttpServletRequest里面的方法，获得客户端的所有信息

1.获取前端传递的参数
```java
//获取一个参数
public String getParameter(String name);
//获取一组参数
public String[] getParameterValues(String name);
```

2.请求转发
```java
//转发
public RequestDispatcher getRequestDispatcher(String path);
```
* 重定向和转发的区别
    * 相同点：
        * 页面都会实现跳转
    * 不同点：
        * 请确转发是url不会发生变化 307
        * 重定向url会改变 302
 ### Cookie、Session
 #### 会话

* 会话：用户打开一个浏览器，点击了很多超链接，访问了多个web资源，关闭浏览器，这个过程称为会话 
* 有状态会话：一个同学来过教室，下次再来教室，我们知道它曾经来过这成为有状态会话
* 一个网站，怎么证明你来过
    * 服务端给客户端一个信件，客户端下次访问服务端时带上信件就可以了 cookie
    * 服务端登记你来过，下次来的时候进行匹配 session
    
#### 保存会话的两种技术
* cookie
    * 客户端技术（响应、请求）
* session
    * 服务器技术，利用这个技术可以保存用户的会话信息，我们可以把信息或数据存在session中
    

常见应用：网站登录后，下一次不需要登录，直接访问
#### Cookie
1.从请求中拿到cookie信息
2.服务器响应给客户端的cookie
```java
//获得cookie
req.getCookies();
//获得cookie里面的键
cookie.getName();
//获得cookie里面的值
cookie.getValue();
//创建cookie
new Cookie(key, value);
//设置cookie的有效期
cookie.setMaxAge(时间);
//给客户端响应一个cookie
resp.addCookie(目标cookie);   
```

cookie文件一般会保存在用户目录下的appdata文件夹里面

* 一个网站的cookie是否存在上限
    * 一个cookie只能保存一个信息
    * 一个web站点可以给浏览器发送多个cookie，最多存放20个cookie
    * cookie大小有限制20kb
    * cookie的浏览器上限未300个

* 删除cookie
    * 不设置cookie的有效期，关闭浏览器后cookie自动失效
    * 给cookie设置有效期为0
    
* 编码解码
```java
    //编码
    URLEncoder.encode(目标字符串, charset);
    //解码
    URLDecoder.decode(目标字符串, charset)
```

 #### Session

 * 什么是session
    * 服务器会给每个用户（浏览器）创建一个session对象
    * 一个session独占一个浏览器，只要浏览器没有关闭，这个session就存在
    * 用户登录后整个网站都可以访问  保存用户信息、保存购物车信息等
    
* session和cookie的区别
    * cookie是把用户的数据写给用户的浏览器，浏览器保存（可以保存多个）
    * session把用户的数据写到用户独占的session里，服务端保存（保存重要的信息，避免服务器资源浪费）
    * session对象由服务器创建
* 使用session
```java
//获取session
req.getSession();
//给session内存数据
session.setAttribute(key, value);
//获取session的id
session.getId();
//判断session是不是新创建的
session.isNew();
/*
    session创建的时候会把session的id放入cookie内，响应个客户端
    resp.addCookie(new Cookie("JSESSIONID", session.getId()));    
*/  
//移除session里面的数据
session.removeAttribute("数据对应的key");
//手动注销session
session.invalidate();
```

* 设置session的过期时间，在web.xml里面配置
```xml
<session-config>
    <session-timeout>时间单位为分钟</session-timeout>
</session-config>
```

### JSP
* 什么是JSP
    * Java Server Pages: java服务器端页面，也和Servlet一样，用于动态web技术
    * 特点
        * 写jsp就像是在写Html代码
        * 区别;
            * HTML只给用户提供静态数据
            * jsp页面中可以嵌入java代码，为用户提供动态数据
* JSP原理
    * jsp是怎么执行的
        * 代码层面没有任何问题
        * 服务器内部工作
            * tomcat中有一个work目录
            * IDEA使用tomcat会在tomcat中生成一个work目录（在C盘用户目录下idea配置文件里面）
            * C:\Users\yf\.IntelliJIdea2019.3\system\tomcat\Unnamed_projectTest\work\Catalina\localhost\st\org\apache\jsp
        * 浏览器不论访问什么资源，都是在访问Servlet
            * jsp最终会被转换为一个java类
            * jsp本质上就是一个servlet
```java
//初始化
public void _jspInit() {
}
//销毁
public void _jspDestroy() {
}
//jspservice
public void _jspService(HttpServletRequest request, HttpServletResponse response){
}
```
1. 请求判断
2. 内置的一些对象
```java
    final javax.servlet.jsp.PageContext pageContext;    //页面上下文   
    javax.servlet.http.HttpSession session = null;      //session
    final javax.servlet.ServletContext application;     //applicationContext
    final javax.servlet.ServletConfig config;           //config
    javax.servlet.jsp.JspWriter out = null;             //out
    final java.lang.Object page = this;                 //当前页面
    HttpServletRequest request                          //请求
    HttpServletResponse response                        //响应     
```
3. 页面输出前增加的代码
```java
      response.setContentType("text/html;charset=UTF-8");       //设置相应页面的类型
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
```

### JSP语法
* jsp表达式
```jsp
输出到客户端
<%= 变量或表达式%>
```
* jsp脚本片段
```jsp
<%java代码%>
```
* jsp声明
```jsp
<%!字段、方法、代码块%>
```
* jsp标签
```
拼接页面
//将导入的页面与当前页面和二为一
//会导致多个页面里定义的变量冲突
<%@include file=路径%>
//页面拼接，本质上还是多个页面
<jsp:include page=路径/>
```

* 9大内置对象
    * PageContext
    * Request
    * Response
    * Session
    * Application 就是ServletContext
    * config
    * out
    * page
    * exception
* 四大域里面保存的数据的范围
```
    //保存的数据，只存在当前页面有效
    pageContext.setAttribute("key01", "value01");
    //保存的数据，在请求中有效，请求转发1会携带这个数据
    request.setAttribute("key02", "value02");
    //保存的数据，在一次会话中有效，从打开浏览器到关闭浏览器
    session.setAttribute("key03", "value03");
    //保存的数据，在服务器中有效，从打开服务器到关闭服务器
    application.setAttribute("key04", "value04");
```
### MVC三层架构

MVC：Model、View、Controller，模型、视图、控制器

* 早些年：
    * 用户直接访问控制层，控制层就可以直接操作数据库
    * servlet-->CRUD-->数据库
    * 弊端：
        * 程序臃肿、不利于维护
        * servlet的代码中：处理请求、响应、视图跳转、处理JDBC、处理业务代码、处理逻辑代码
* MVC三层架构
    * Model
        * 业务处理：业务逻辑（service）
        * 数据持久层：CRUD（Dao）
    * View
        * 展示数据
        * 提供链接发起servlet请求
    * Controller
        * 接收用户的请求：（request的请求参数、session信息）
        * 交给业务层处理对应的代码
        
### Filter

1. 编写过滤器
```java
public class CharacterFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");

        System.out.println("过滤前");
        chain.doFilter(request, response);
        System.out.println("过滤后");
    }
}
```
2. web.xml下配置
```xml
    <filter>
            <filter-name>CharacterFilter</filter-name>
            <filter-class>com.hb.filter.CharacterFilter</filter-class>
        </filter>
        <filter-mapping>
            <filter-name>CharacterFilter</filter-name>
            <url-pattern>/service/*</url-pattern>
        </filter-mapping>
```
