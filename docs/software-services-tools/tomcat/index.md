# Tomcat

> [官网](https://tomcat.apache.org/)<br />
> [各版本说明](https://tomcat.apache.org/whichversion.html)

## 安装

> 在 Windows 下使用压缩包安装

1. 在官网下载指定压缩包，官网左侧 `Download` 处选择版本
2. 解压到指定目录
3. 配置环境变量 `CATALINA_HOME`
4. 将 `%CATALINA_HOME%\bin` 添加到 `PATH` 环境变量

## 常用命令

> Windows 平台下的命令都以 `.bat` 结尾

Tomcat 命令相关文件在安装目录下 `bin` 目录下

| 命令   | 说明    |
|--------------- | --------------- |
| [catalina](#catalina)   | 主命令   |
| startup | 启动服务，对应 `catalina start` 命令 |
| shutdown | 停止服务，对应 `catalina stop` 命令 |

### catalina


```powershell
# 显示帮助信息
catalina

# 查看版本信息
catalina version

# 启动服务，新开启一个终端
catalina start

# 关闭服务
catalina stop

# 启动服务，在当前终端启动
catalina run
```

## 目录

安装Tomcat后的目录格式

* `bin/` - 存放启动和停止脚本
* `conf/` - 存放配置文件，控制 Tomcat 的行为
* `lib/` - 存放 Tomcat 运行所需的 Java 类库
* `logs/` - 存放运行时生成的日志文件
* `webapps/` - 存放部署的 Web 应用
* `work/` - 存放 Tomcat 的临时工作文件
* `temp/` - 存放临时文件

## 配置文件

Tomcat 配置相关文件在安装目录下 `conf` 目录下

* `server.xml` - 核心配置文件，配置了 Tomcat 的服务器和连接器以及虚拟主机等
* `web.xml` - Web 应用的部署描述文件，用来配置 Web 应用的上下文（servlet、JSP、过滤器、监听器等）
* `context.xml` - 用于配置 Web 应用的特定上下文信息
* `catalina.properties` - 用于设置 Tomcat 容器的属性，例如类加载器的设置、JVM 参数、文件编码、系统属性等
* `logging.properties` - 记录日志，logging.properties 文件用于配置日志记录的级别、日志输出的格式和位置
* `tomcat-users.xml` - 用于配置 Tomcat 用户的权限和角色，通常用于设置管理界面（如 manager 或 host-manager）的用户及其权限

作为开发人员，我们主要关注 `server.xml` 和 `web.xml`，[官方文档（tomcat9为例）](https://tomcat.apache.org/tomcat-9.0-doc/config/index.html)

## 常见问题

### Windows 下启动后终端乱码问题

这个主要是 Windows 的锅，Windows 10 默认情况下 cmd 终端的默认编码格式是 GBK，而 tomcat 启动后输出的日志格式是 UTF-8，所以导致乱码

这里提供一个影响最小的解决方式：使用`catalina run` 代替 `startup` 或 `catalina start` 命令

1. 手动打开 cmd
2. 输入 `chcp 65001 >nul && catalina run`

当然这比较麻烦，还可以将 `chcp 65001 >nul` 命令直接放入 `catalina.bat` 脚本内

脚本一般放在：`Tomcat安装目录/bin/catalina.bat`，在脚本的第二行添加 `chcp 65001 >nul`

```batch
@echo off
chcp 65001 >nul

...
```

然后就可以 <kbd>Win</kbd>+<kbd>r</kbd> `catalina run`
