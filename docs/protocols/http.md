---
sidebar_position: 15
---

# HTTP

HTTP（Hypertext Transfer Protocol） 是一种用于客户端与服务器之间通信的协议，最常用于万维网（WWW）的数据传输

## 组成部分

### HTTP 请求

HTTP 请求由三个主要部分组成：

* **请求行** - 包含[请求方法](#http-方法request-methods)、请求 URL 和 HTTP 版本
* **请求头** - 包括请求的一些元数据，例如内容类型、授权信息、缓存控制等
* **请求体（可选）** - 在 POST、PUT 等请求中，用于发送数据到服务器

```bash
GET /index.html HTTP/1.1 # 请求行
Host: www.example.com    # 请求头
User-Agent: Mozilla/5.0
Accept: text/html

                         # 请求体
```

### HTTP 响应

HTTP 响应由三个部分组成：

* **状态行** - 包含 HTTP 版本、状态码和状态消息
* **响应头** - 包含关于响应的一些元数据，例如内容类型、服务器信息、缓存控制等
* **响应体** - 服务器返回的数据，通常是 HTML、JSON、图片或其他内容

```bash
HTTP/1.1 200 OK                             # 状态行
Content-Type: text/html                     # 响应头
Content-Length: 138
Date: Tue, 10 Nov 2024 14:00:00 GMT

<html>                                      # 响应体
  <head><title>Example Page</title></head>
  <body>
    <h1>Welcome to the Example Page</h1>
  </body>
</html>
```

## HTTP 方法（Request Methods）

HTTP 协议定义了几种请求方法（也叫做 HTTP 动词），每种方法代表不同的操作：

* **GET** - 请求指定资源的内容。通常用于获取网页或 API 数据。不会改变资源的状态
* **POST** - 向服务器提交数据，通常用于创建新的资源。例如提交表单数据或上传文件
* **PUT** - 更新资源的完整内容。通常用于替换现有资源
* **DELETE** - 删除指定的资源
* **PATCH** - 部分更新资源，通常用于更新资源的部分字段
* **HEAD** - 与 GET 类似，但服务器不会返回响应体，仅返回响应头，用于获取元数据
* **OPTIONS** - 请求资源支持的 HTTP 方法，用于检测服务器支持哪些方法
* **TRACE** - 回显服务器接收到的请求，用于调试

## HTTP 状态码（Status Code）

> 参考[mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

状态码表示服务器对请求的处理结果，按类别可以分为 5 类：

* **1xx（信息性状态码）** - 表示请求已接收，正在处理
* **2xx（成功状态码）** - 表示请求已成功
* **3xx（重定向状态码）** - 表示客户端需要进一步操作
* **4xx（客户端错误状态码）** - 表示请求有语法错误或请求无法完成
* **5xx（服务器错误状态码）** - 表示服务器未能完成有效请求

## HTTP 头部（Headers）

HTTP 头部包含了请求和响应的元数据

> 参考[mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

### 请求头

* `User-Agent` - 客户端的信息（浏览器、操作系统等）
* `Accept` - 客户端可接受的内容类型（如 application/json、text/html）
* `Content-Type` - 请求体的内容类型（如 application/x-www-form-urlencoded）
* `Authorization` - 身份验证信息，通常为 token 或用户名密码
* `Cache-Control` - 缓存控制，指定缓存策略

### 响应头

* `Content-Type` - 响应体的内容类型（如 text/html）
* `Content-Length` - 响应体的长度（以字节为单位）
* `Location` - 通常用于重定向，指示新资源的 URL
* `Set-Cookie` - 设置浏览器中的 cookies
* `Cache-Control` - 指定响应是否可缓存

## HTTP 版本

### HTTP/1.1

是当前最常用的版本，支持持久连接（即多个请求可以通过同一个 TCP 连接发送）和管道化（即多个请求可以同时发送，不需要等待响应）

然而，它存在 头部冗余 和 队头阻塞 问题

### HTTP/2

* **多路复用** - 通过单一连接同时发送多个请求和响应，避免了 HTTP/1.1 中的队头阻塞
* **头部压缩** - 对请求和响应头部进行压缩，减少了网络带宽的消耗
* **服务器推送** - 服务器可以主动向客户端推送资源，提前加载客户端可能需要的内容

### HTTP/3（基于 QUIC）

HTTP/3 基于 QUIC 协议，采用了 UDP（而不是 TCP）作为传输层协议，进一步优化了网络性能

QUIC 提供了更快的连接建立、低延迟和更好的网络恢复能力，适用于现代互联网应用

### HTTPS（HTTP over SSL/TLS）


HTTPS 是 HTTP 的安全版本，通过 SSL/TLS 协议加密通信内容，保证数据的保密性、完整性和身份验证。HTTPS 常用于传输敏感数据，如在线支付和身份验证
