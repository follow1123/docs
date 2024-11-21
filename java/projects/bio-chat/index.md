---
sidebar_position: 1
---

# 聊天室（BIO版）

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat)

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

## 项目架构

### 客户端

```mermaid
sequenceDiagram
    participant ui as 主线程/UI线程
    participant r as Read线程
    participant w as Write线程

    Note left of ui: 等待连接服务端
    ui ->> r: 启动Read线程
    loop 循环Read:
        r ->> r: Read Message
    end
    ui ->> w: 启动Write线程
    loop 循环Write:
        w ->> w: Write Message
    end
    loop 循环渲染:
        ui ->> ui: render
    end
```

### 服务端

```mermaid
sequenceDiagram
    participant m as 主线程

    box Socket Handler(Thread Pool)
    participant r as Read线程
    participant w as Write线程
    end

    loop 处理客户端连接
        Note right of m: 等待客户端连接
        m ->> r: 启动客户端Socket对应的Read线程
        m ->> w: 启动客户端Socket对应的Write线程
    end

```

## UI

> 点击类图里面的类跳转到详细代码

* 主要在客户端使用

### 基础UI结构

```mermaid
classDiagram
    class Border{
        + getBorderCharacters() char[]
    }
    <<Interface>> Border
    class RoundedBorder{ }
    class AngleBorder{ }
    link Border "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/ui/Border.java"
    link RoundedBorder "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/ui/RoundedBorder.java"
    link AngleBorder "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/ui/AngleBorder.java"

    RoundedBorder ..|> Border
    AngleBorder ..|> Border

    class View{
        + render() void
    }
    <<Interface>> View
    class TextView{
        + TextView() String...
        + setBorder(Border border) void
        + setTextDirection(int textDirection) void
        + setBorderWrapText(boolean borderWrapText) void
        + setCols(int cols) void
        + setRows(int rows) void
    }
    link View "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/ui/View.java"
    link TextView "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/ui/TextView.java"
    
    TextView ..|> View
    TextView *-- Border
```

* 其中TextView为基础的图像类，后面的相关视图继承这个类

### UI控制结构

```mermaid
classDiagram
    class View{
        + render() void
    }
    <<Interface>> View
    class ViewRegistrar{
        - views: List&lt;View&gt;
        + registerView(View view) void
        + nextView() View
        + previousView() View
        + getCurrView() View
    }
    class UILauncher{
        + start() void
    }
    link View "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/ui/View.java"
    link ViewRegistrar "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/ui/ViewRegistrar.java"
    link UILauncher "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/ui/UILauncher.java"
    
    ViewRegistrar *-- View
    UILauncher *-- ViewRegistrar
```

* UILauncher启动时将后面的业务视图注册进ViewRegistrar，实现业务视图之前的跳转和数据传递

### 业务视图

```mermaid
classDiagram
    class TextView{
        + TextView() String...
        + setBorder(Border border) void
        + setTextDirection(int textDirection) void
        + setBorderWrapText(boolean borderWrapText) void
        + setCols(int cols) void
        + setRows(int rows) void
    }
    class LoginView{ }
    class ContactView{ }
    class ChatView{ }
    link TextView "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/ui/TextView.java"
    link LoginView "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/view/LoginView.java"
    link ContactView "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/view/ContactView.java"
    link ChatView "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/view/ChatView.java"

    TextView <|-- LoginView
    TextView <|-- ContactView
    TextView <|-- ChatView
```

#### LoginView

* 登录视图
* 控制台输入`username,password`登录

```txt
┌────────────────────────────────────────────────┐
│ please input username and password             │
│ eg: username,password                          │
└────────────────────────────────────────────────┘
```

#### ContactView

* 联系人视图
* 登录成功后进入的视图
* 控制台输入`r`刷新，`q`退出，输入对应的数字进入聊天视图

```txt
┌────────────────────────────────────────────────┐
│ 0 - chat with zs                               │
│ [r]efresh [q]uit                               │
└────────────────────────────────────────────────┘
```

#### ChatView

* 聊天视图
* 输入消息直接发送
* `f`进入发送文件模式

```txt
┌────────────────────────────────────────────────┐
│                  chat with ls                  │
└────────────────────────────────────────────────┘

                                         ╭───────╮
                                         │ hello │
                                         ╰───────╯

╭────╮                                            
│ hi │                                            
╰────╯                                            

┌────────────────────────────────────────────────┐
│ [r]efresh [f]ile (type message to send)        │
└────────────────────────────────────────────────┘
```

* 发送文件模式
* 控制台输入**文件路径**发送
* 输入对应的**数字**下载文件
* 输入`m`返回消息模式

```txt
┌────────────────────────────────────────────────┐
│                  chat with zs                  │
└────────────────────────────────────────────────┘

                                         ╭───────╮
                                         │ hello │
                                         ╰───────╯

╭────╮                                            
│ hi │                                            
╰────╯                                            

                        ╭────────────────────────╮
                        │ upload file: readme.md │
                        │     type 0 to download │
                        ╰────────────────────────╯

┌────────────────────────────────────────────────┐
│ [r]efresh [m]essage (type a file path to up... │
└────────────────────────────────────────────────┘
```

## Service

* [UserService](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/service/UserService.java)
* 处理用户相关业务逻辑

## Model

```mermaid
classDiagram
    class PropsModel{
        - props Properties
        + PropsModel(String dataRootDir, String filename)
        + getProp(String name): String
        + setProp(String name, String value) void
        + store() void
    }
    class UserModel{ }
    class FileModel{ }
    link PropsModel "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/model/PropsModel.java"
    link UserModel "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/model/UserModel.java"
    link FileModel "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/model/FileModel.java"

    PropsModel <|-- UserModel
    PropsModel <|-- FileModel
```

### UserModel

* 保存用户数据

### FileModel

* 保存用户上传和下载的文件

## Core

### 消息

#### 报文

```mermaid
block-beta
    columns 5
    header:1
    len:1
    token:1
    serialNum:1
    msgType:1
    body:4
    eom:1
```

* 使用字符串组成，定义在[Message](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/Message.java)
* 使用`&`符号分割
* `header` - 消息头，就是字符串`header`
* `len` - 消息长度，处理消息粘包
* `token` - 判断用户使用登录
* `serialNum` - 由于消息的发送和接收都是异步的，使用这个字段确定是响应到哪个消息
* `msgType` - 定义消息类型，业务相关，详细类型定义在[MsgType](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/MsgType.java)
* `body` - 消息体
* `eom` - 消息结束符，就是字符串`eom`，End of Message的缩写

#### 消息总线

* 定义消息发送和接收逻辑
* 具体发送解析消息逻辑定义在[MsgUtil](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/utils/MsgUtil.java)

```mermaid
classDiagram
    class MsgBus{
        - socket Socket
        - readMap HashMap&lt;String, Consumer&lt;Message&gt;&gt;
        - writeQueue LinkedList&lt;Message&gt;
        - readTask Consumer&lt;Message&gt;
        - socketHandler ThreadPoolExecutor
        + setReadTask(Consumer&lt;Message&gt; readTask) void
        + sendMsg(Message message) void
        + sendMsgBlocked(Message message) Message
        + sendMsg(Message message, Consumer&lt;Message&gt onReceive) void
        - handleRead() void
        - handleWrite() void
        + disconnect() void
    }
    link MsgBus "https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/MsgBus.java"
```

##### 初始化

```mermaid
flowchart LR
a(创建时传入sokcet和socketHandler)--> b(使用socketHandler执行handleRead读取消息)
a --> c(使用socketHandler执行handleWrite写出消息)
```

##### handleRead

```mermaid
flowchart TD
a(socket.getInputStream) --> b(MsgUtil.readMsg)
b --> c{{msg.getSerialNum是否存在}}
c --存在--> d{{readMap内是否有serialNum的key}}
d --没有--> e(readTask.accept,处理消息)
c --不存在--> e
d --有--> f(获取readMap内对应的Consumer，执行accept并唤醒使用Consumer对象等待的线程)
e --> a
f --> a
```

##### handleWrite

```mermaid
flowchart TD
a(进入使用writeQueue锁定的代码块) --> b{{writeQueue.isEmpty}}
b --为空--> c(进入有限等待，默认10秒)
b --非空--> d{{writeQueue.isEmpty}}
d --为空--> e(跳出当次循环)
d --非空--> f(writeQueue.removeLast,并使用MsgUtil.writeMsg发送)
f --> a
e --> a
```

##### sendMsg

* 用于直接发送消息，不关心结果
1. 进入使用writeQueue锁定的代码块
2. 将消息添加进writeQueue
3. 唤醒使用writeQueue等待的线程，就是handleWrite线程，唤醒后处理消息

##### sendMsgBlocked

* 用于发送消息，阻塞等待结果
1. 生成随机serialNum，并存入消息内
2. 定义消息数字和Consumer，用于接收回调方法内的数据
3. readMap.put(serialNum, consumer)
4. 进入使用使用Consumer锁定的代码块
5. 发送消息
6. 等待，默认10秒


##### disconnect

* 用于关闭所有资源
1. 关闭Socket
2. 唤醒所有使用writeQueue等待的线程
3. 唤醒所有使用readMap内Consumer对象等待的线程
4. 如果线程池是内部创建，则关闭线程池

### 客户端

* [Client](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/Client.java)
* 连接客户端后将Socket传递给MsgBus，并启动UI

### 服务端

* [Server](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/Server.java)

```mermaid
flowchart TD
a(serverSocket.accept) --> b(new UserSocket)
b --> a
```

* [UserSocket](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/core/UserSocket.java)是每个客户端的实例，配合[UserService](#service)和[MsgBus](#消息总线)处理客户端请求

## 其他

### 工具类

* [MsgUtil](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/utils/MsgUtil.java) - 编解码消息并发送或接收
* [RandomUtil](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/utils/RandomUtil.java) - 生成token或serialNum
* [SocketUtil](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/utils/SocketUtil.java) - 判断Socket状态
* [StrUtil](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/utils/StrUtil.java) - 处理字符串

### 测试

> 由于是demo项目，所以测试文件直接放在项目目录下，方便测试

* [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/demo_projects/minichat/tests)
