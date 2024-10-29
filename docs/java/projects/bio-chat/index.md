---
sidebar_position: 1
---

# 聊天室（BIO版）

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/net/minichat)

## 项目文件说明

```bash
minichat
│
├─core # 核心文件
│  │
│  ├─Client.java # 客户端
│  ├─ClientContext.java # 客户端上下文
│  ├─Message.java # 消息体
│  ├─MsgBus.java # 消息处理器
│  ├─MsgType.java # 消息类型
│  ├─Server.java # 服务端
│  ├─UserSocket.java # 用户Sokcet
│  │
│  └─ui # ui相关核心文件
│     │
│     ├─AngleBorder.java # 直角边框
│     ├─Border.java # 边框接口
│     ├─RoundedBorder.java # 圆角边框
│     ├─TextView.java # 文本视图
│     ├─UILauncher.java # UI启动器
│     ├─View.java # 视图接口
│     └─ViewRegistrar.java # 视图注册器
│
├─model # 模型，操作文本
│  │
│  ├─PropsModel.java # properties模型
│  ├─FileModel.java # 文件模型
│  └─UserModel.java # 用户模型
│
├─view # 视图
│  │
│  ├─ChatView.java # 聊天视图
│  ├─ContactView.java # 联系人视图
│  └─LoginView.java # 登录视图
│
├─service # 服务
│  │
│  └─UserService.java # 用户服务
│
├─utils # 工具类
│  │
│  ├─MsgUtil.java # 消息工具类
│  ├─RandomUtil.java # 随机数据工具类
│  ├─SocketUtil.java # Socket工具类
│  └─StrUtil.java # 字符串工具类
│
├─tests # 测试
│  │
│  ├─ChatTest.java # 聊天服务测试
│  ├─MessageTest.java # 消息测试
│  ├─ModelTest.java # 模型测试
│  ├─SocketTest.java # Socket测试
│  │
│  └─ui
│     │
│     └─TextViewTest.java # ui测试
│
├─StartClient.java # 客户端启动类
└─StartServer.java # 服务端启动类
```
