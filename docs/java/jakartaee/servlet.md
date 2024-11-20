# Servlet

## Servlet 生命周期

| 生命周期    | 方法    | 执行时机    | 执行次数    |
|---------------- | --------------- | --------------- | --------------- |
| 构造对象    | 构造器    | 第一次请求或容器启动    | 1    |
| 初始化    | `init()`   |  构造完成后   | 1   |
| 处理服务   | `service(req, resp)`   | 每次请求   | 多次   |
| 销毁 | `destroy()` | 容器关闭| 1 |

Servlet 默认在请求时才会初始化，如果需要在 Tomcat 容器启动时就启动 Servlet，可以配置 `loadOnStartup` 参数

:::note
这个数值默认是安装从小到大启动，配置的数值越小，越先启动，推荐从6开始配置
:::

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

<Tabs>
  <TabItem value="annotation" label="Annotation" default>
     <CodeBlock language="java">
{
`@WebServlet(value = "/loadonstartup1", loadOnStartup = 101)
public class LoadOnStartup1Servlet extends HttpServlet {

// ...`
}
    </CodeBlock>
  </TabItem>
  <TabItem value="xml" label="XML">
    <CodeBlock language="xml">
{
`<servlet>
    <servlet-name>LoadOnStartup2Servlet</servlet-name>
    <servlet-class>cn.y.java.servlet.lifecycle.LoadOnStartup2Servlet</servlet-class>
    <!-- 配置启动时加载这个Servlet -->
    <load-on-startup>60</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>LoadOnStartup2Servlet</servlet-name>
    <url-pattern>/loadonstartup2</url-pattern>
</servlet-mapping>`
}
    </CodeBlock>
  </TabItem>
</Tabs>
```

## Servlet 继承结构

```mermaid
classDiagram
direction BT
class GenericServlet
class HttpServlet
class Servlet {
<<Interface>>

}

GenericServlet  ..>  Servlet 
HttpServlet  -->  GenericServlet 
```

* `Servlet` - 接口，顶级接口，提供 Servlet 生命周期相关方法
* `GenericServlet` -  抽象类，Servlet 接口的简单实现，用于配置 ServletConfig
* `HttpServlet` -  抽象类，封装HTTP协议基础操作

## Servlet Config

每个 Servlet **独立**的配置，在启动时加载

```mdx-code-block
<Tabs>
  <TabItem value="annotation" label="Annotation" default>
     <CodeBlock language="java">
{
`@WebServlet(value = "/annoconfig",
// highlight-start
        initParams = {
                @WebInitParam(name = "k1", value = "v1"),
                @WebInitParam(name = "k2", value = "v2")
        })
// highlight-end

// ...`
}
    </CodeBlock>
  </TabItem>
  <TabItem value="xml" label="XML">
    <CodeBlock language="xml">
{
`<servlet>
    <servlet-name>XmlServletConfigServlet</servlet-name>
    <servlet-class>cn.y.java.servlet.servlet_config.XmlServletConfigServlet</servlet-class>
// highlight-start
    <init-param>
        <param-name>k1</param-name>
        <param-value>v1</param-value>
    </init-param>
    <init-param>
        <param-name>k2</param-name>
        <param-value>v2</param-value>
    </init-param>
// highlight-end
</servlet>
<servlet-mapping>
    <servlet-name>XmlServletConfigServlet</servlet-name>
    <url-pattern>/xmlconfig</url-pattern>
</servlet-mapping>`
}
    </CodeBlock>
  </TabItem>
</Tabs>
```

:::info
继承 `GenericServlet` 或 `HttpServlet` 的 Servlet 才能调用 `getServletConfig()` 方法
:::

```java
ServletConfig servletConfig = getServletConfig();

// 获取指定key对应的数据
System.out.println(servletConfig.getInitParameter("k1"));

// 获取全部参数
Enumeration<String> params = getServletConfig().getInitParameterNames();
while (params.hasMoreElements()) {
    String key = params.nextElement();
    System.out.println(key + " - " + servletConfig.getInitParameter(key));
}
```

## Servlet Context

上下文对象（域对象）

Tomcat 容器会为每个应用创建一个 Servlet Context

### 初始化参数

```mdx-code-block
<Tabs>
  <TabItem value="xml" label="XML" default>
    <CodeBlock language="xml">
{
`<context-param>
    <param-name>ctx-k2</param-name>
    <param-value>v22</param-value>
</context-param>
<context-param>
    <param-name>ctx-k3</param-name>
    <param-value>v3</param-value>
</context-param>`
}
    </CodeBlock>
  </TabItem>
  <TabItem value="listener" label="Listener">
     <CodeBlock language="java">
{
`@WebListener
public class ServletContextTestListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("context initialized ------------------------");
        ServletContext servletContext = sce.getServletContext();
        servletContext.setInitParameter("ctx-k1", "v1");
        servletContext.setInitParameter("ctx-k2", "v2");
    }
}`
}
    </CodeBlock>
  </TabItem>
</Tabs>
```

:::note
`web.xml` 内的参数配置会覆盖 Listener 内添加的配置
:::

```java
// 单独获取
System.out.println(servletContext.getInitParameter("ctx-k1"));

// 获取全部参数
Enumeration<String> params = servletContext.getInitParameterNames();
while (params.hasMoreElements()){
    String key = params.nextElement();
    System.out.println(key + " - " + servletContext.getInitParameter(key));
}
```

### 域对象

* `setAttribute(name, object)` - 添加数据
* `getAttribute(name)` - 获取数据
* `getAttributeNames()` - 获取所有数据的key
* `removeAttribute(name)` - 移除数据

:::info
Servlet Context 域内的数据添加后所有 Servlet 内都可以使用
:::

其他

* `getRealPath(path)` - 获取项目运行时的实际路径
* `getContextPath()` - 获取应用上下文路径，（url的前缀）
* `getMimeType(file)` - 获取项目内文件的媒体类型

## HttpServletRequest

Tomcat 在接口客户端的请求后会将 HTTP 协议的报文和封装成 `HttpServletRequest` 对象，对象内可以获取所有HTTP协议相关信息

请求行

* `getRequestURL()` - 获取URL
* `getRequestURI()` - 获取URI
* `getServerPort()` - 获取客户端发送请求时的端口
* `getLocalPort()` - 获取当前应用所在容器的端口
* `getRemotePort()` - 获取客户端程序的端口
* `getScheme()` - 获取请求协议
* `getProtocol()` - 获取请求协议和版本号
* `getMethod()` - 获取请求方法

:::info[URL和URI的区别]
URL 相当于身份证号，URI 相当于电话号码
:::

请求头

* `getHeader(name)` - 获取请求头
* `getHeaderNames()` - 获取所有请求头的key
* `getContentType()` - 获取ContentType请求头

请求参数

* `getQueryString()` - 获取URL上拼接的请求参数
* `getParameter(name)` - 根据名称获取参数的值
* `getParameterValues(name)` - 根据名称获取参数的值，多个值
* `getParameterNames()` - 根据名称获取参数的值，所有值
* `getParameterMap()` - 以Map结构获取请求参数
* `getReader()` - 获取请求内容的Reader
* `getInputStream()` - 获取请求内容的InputStream
* `getContentLength()` - 获取请求长度

其他

* `getServletPath()` - 获取请求的 Servlet 路径
* `getServletContext()` - 获取 Servlet Context 对象
* `getCookies()` - 获取 Cookie
* `getSession()` - 获取 Session
* `setCharacterEncoding(env)` - 设置请求字符集

## HttpServletResponse

Tomcat 在接口客户端的请求后，封装 `HttpServletRequest` 对象的同时会创建一个 `HttpServletResponse` 对象用于存储响应数据，在请求结束时服务器会根据这个对象编码成 HTTP 协议对应的响应报文返回给客户端

响应行

* `setStatus(sc)` - 设置响应状态码

响应头

* `setHeader(name,` - value) 设置响应头信息
* `setContentType(type)` - 设置响应头的content-type，（媒体类型设置）

响应体

* `getWriter()` - 获取响应的 Writer 用于写出数据
* `getOutputStream()` - 获取响应的 OutputStream 用于写出数据
* `setContentLength(len)` - 设置响应内容长度，就是设置 content-length 响应头

其他

* `sendError(sc,` - msg) 响应错误信息
* `addCookie(cookie)` - 设置 Cookie
* `setCharacterEncoding(charset)` - 设置响应字符集

## Content Type

Content Type 是请求和响应头中很重要的一个头信息，参考[请求头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)，[MIME Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/MIME_types)

常见的 Content Type 和其使用位置

| Content Type | 说明 | 请求 | 响应 |
| --- | --- | --- | --- |
| `application/json` |  请求或响应 json 数据 | √ |  √|
| `application/xml` | 请求或响应 xml 数据 | √ |  √ |
| `text/plain` | 请求或响应纯文本数据 | √ |  √ |
| `multipart/form-data` | 请求文件 | √ | |
| `application/x-www-form-urlencoded` | 请求表单 | √ | |
| `text/html` | 响应 html 文件| | √ |
| `application/pdf` | 响应 pdf 文件 | | √ |
| `image/png或image/jpeg` | 响应图片文件 | | √ |
| `text/css` | 响应 css 文件 | | √ |


## 转发和重定向

转发和重定向是 web 应用间接访问项目资源的方式

转发通过 `HttpServletRequest` 实现，重定向通过 `HttpServletResponse` 实现

### 请求转发

```mermaid
sequenceDiagram
participant client as 客户端 
box 服务器
participant sa as ServletA
participant sb as ServletB
end

client ->> sa: 请求
sa ->> sb: 转发
sb ->> client: 响应
```

```java
/*
    转发路径如果填写webapp下的资源路径，则可以直接转发到资源
    可以转发到WEB-INF目录下的受保护资源 "WEB-INF/private.html"
*/
req.getRequestDispatcher("转发地址").forward(req, resp);
```

:::info
请求转发是服务器内部行为，对客户端是屏蔽的，客户端地址栏不会发生变化

由于客户端只发送了一次请求，所以 req resp 对象只有一对

客户端的请求参数在转发到的 Servlet 内可以使用

转发的资源可以是 Servlet 动态资源，也可以是 webapp 目录下的静态资源，也可以是 WEB-INF 目录下的受保护资源

无法转发外部资源，比如一个网址
:::

:::note
可以通过 `req.getAttribute(RequestDispatcher.FORWARD_REQUEST_URI)` 获取是从哪个路径转发过来的
:::

### 响应重定向

```mermaid
sequenceDiagram
participant client as 客户端 
box 服务器
participant sa as ServletA
participant sb as ServletB
end

client ->> sa: 请求
sa ->> client: 响应（code: 302 Location: ServletB）
client ->> sb: 请求
sb ->> client: 响应
```

```java
/*
    转发路径如果填写webapp下的资源路径，则可以直接转发到资源，不可以访问 WEB-INF 目录下的受保护资源
    可以转发到外部资源
*/
resp.sendRedirect("资源路径");
```

:::info
重定向时服务端会响应302响应码，并添加 `Location` 响应头，指定重定向的路径

客户端至少发送了两次请求，地址栏会发生变化

服务器内第一次请求的相关数据不会跟着重定向给指定的路径，因为发送了多次请求，req resp 对象有多个

重定向也可以访问静态资源，但是不能访问 WEB-INF 目录下的受保护资源

重定向可以访问外部资源
:::

## 会话管理

HTTP 协议是一个无状态的协议，这意味着每个请求都是独立的，服务器不会自动记住之前请求的状态或用户的身份

为了在多次请求之间保持状态，尤其是在用户登录后需要维护会话信息时，会话管理（Session Management）就显得非常重要

:::info[Cookie 和 Session 配合实现会话管理]
cookie 是在客户端保少量数据的技术，主要通过响应头向客户端响应一些客户端要保的信息

session 是茌服务端保更多数据的技术，主要通过 HttpSession 对保存一些和客户端相关的信息
:::

### Cookie

```mermaid
sequenceDiagram
participant client as 客户端 
participant server as 服务器


client ->> server: 请求1
server ->> client: Set-Cookie: aaa=111
client ->> server: 请求2(cookie: aaa=111)
```

```java title="响应时添加 Cookie"
resp.addCookie(new Cookie("aaa", "111"));
```

```java title="客户端请求时携带的 Cookie"
Cookie[] cookies = req.getCookies();
if (cookies != null) {
    for (Cookie cookie : cookies) {
        System.out.println(cookie.getName() + " - " + cookie.getValue());
    }
}
```

#### 相关方法

* `setComment(purpose)` - 添加 Cookie 的注释
* `setDomain(domain)` - 指定 Cookie 可以被哪个域名访问
* `setMaxAge(expiry)` - 设置 Cookie 过期时间，单位秒
* `setPath(uri)` - 指定 Cookie 可以被哪些路径访问
* `setSecure(flag)` - 指定只有使用 **SSL/TLS** 加密的协议才能访问，例如 **HTTPS**
* `setHttpOnly(isHttpOnly)` - 指定 Cookie 是否无法在 JavaScript 内获取，防止 XSS 攻击

## 常见问题

### 乱码问题

#### 在 Idea 内启动 Tomcat `Localhost Log` 和 `Catalina Log` 控制台乱码

1. 确保 Tomcat 安装目录的 `conf/logging.properties` 内所有的 `encoding` 属性都是 **UTF-8**
2. 找到 Idea 窗口上面的 `Help` 选项，点击 `Edit Custom VM Options...` 在文件内添加：`-Dfile.encoding=UTF-8`
3. 重启 Idea

#### 编写 `System.out.println` 输出中文时乱码

1. 确保 Idea 设置的 `File Encoding` 选项内配置的都是 `UTF-8`
2. 编辑 Tomcat 启动配置，在 `-Dfile.encoding=UTF-8`
3. 重启 Tomcat

## 参考

* [尚硅谷](https://www.bilibili.com/video/BV1UN411x7xe)
