---
sidebar_position: 20
---

# Spring Security

## 认证

cookie方式

浏览器登录系统，服务区返回一个session id并存储到服务器内，浏览器将session id存储到cookie内，进行操作时服务器判断是否有这session id

token方式

浏览器登录系统，服务器返回一个token令牌，服务器不用存储，浏览器可以将这个token令牌存储到浏览器的任意区域，，进行操作时时将token一起发送到服务器，服务器根据token的算法确认该用户想信息、

## 授权

使用户可以对某个资源进行操作的过程交授权，类似linux的组、用户、

文件之间的关系，spring security 通过投票决策的方式对资源进行授权
