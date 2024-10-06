# PowerShell

> powershell.exe<br></br>

* powershell分为两个版本，`Windows PowerShell`和`PowerShell Core`
    * `Windows PowerShell`是Windows系统自带的，目前已停止更新，最新版本为`5.1`
    * `PowerShell Core`是新版的PowerShell，是跨平台的，需要单独下载
* 当前文档基于`Windows PowerShell`进行编写，详情参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/scripting/overview?view=powershell-5.1)

## 基础概念

### PowerShell命令组成

* PowerShell的命令叫`cmdlet`，都是由**动词**-**名词**组成的
    * `Get-Service` 获取服务
    * `Set-Alias` 设置别名
    * `New-Item` 新建条目

### PSDrive

* PowerShell执行各种命令实际上是在PSDrive内进行操作
* PSDrive是类型为PSProvider的实例
    * 可以将PSProvider理解为模板，而PSDrive就是根据这个模板创建的实例
    * 以Java来类比的话，PSProvider就是定义的Class，PSDrive就是创建的对象
* `Get-PSProvider`查看有哪些PSProvider，`Get-PSDrive`查看有哪些PS-Drive
* 使用`Set-Location PSDrive名称:`可以切换到指定的PSDrive内进行操作
    * `Set-Location Env:`切换到环境变量的PSDrive
    * `Set-Location HKCU:`切换到注册表**HKEY_CURRENT_USER**下
    * `Set-Location C:`切换到C盘下
* 这样做的好处是可以通过同一套命令在不同的PSDrive内进行操作，`Get-ChildItem`就是查看PSDrive的内容，`Set-Item`就是修改PSDrive的内容
    * 在PSProvider为`FileSystem`的PSDrive下，`Get-ChildItem`，就是列出当前目录下的文件
    * 在PSProvider为`Registry`的PSDrive下，`Get-ChildItem`，就是列出当前项下面的所有值
* 我们大部分都会在PSProvider为`FileSystem`的PSDrive下进行操作

---

## 常用命令

### 文件管理

| 命令 | 别名 | 描述 |
| --- | --- | --- |
| [Get-ChildItem](#get-childitem) | `ls` `dir` `gci` | 获取一个或多个指定位置中的项和子项 |
| [Set-Location](#set-location) | `cd` `chdir` `sl` | 将当前工作位置设置为指定的位置 |
| [Get-Location](#get-location) | `pwd` `gl` | 获取有关当前工作位置或某个位置堆栈的信息 |
| [Remove-Item](#remove-item) | `rm` `rmdir` `rd` `del` `erase` `ri` | 删除指定项 |
| [New-Item](#new-item) | `ni` | 创建新项 |
| [Move-Item](#move-item) | `mv` `move` `mi` | 将项从一个位置移动到另一个位置 |
| [Copy-Item](#copy-item) | `cp` `copy` `cpi` | 将项从一个位置复制到另一个位置 |
| [Set-ItemProperty](#set-itemproperty) | `sp` | 创建或更改某一项的属性值 |
| [Select-String](#select-string) | `sls` | 在字符串和文件中查找文本 |
| [Get-Content](#get-content) | `cat` `type` `gc` | 获取位于指定位置的项的内容 |

### 服务/进程管理

| 命令 | 别名 | 描述 |
| --- | --- | --- |
| [Get-Process](#get-process) | `ps` `gps` | 获取当前运行的进程信息 |
| [Start-Process](#start-process) | `start` `saps` | 启动新进程 |
| [Stop-Process](#stop-process) | `kill` `spps` | 停止一个或多个进程 |
| [Get-Service](#get-service) | `gsv` | 获取服务状态信息 |
| [Start-Service](#start-service) | `sasv` | 启动服务 |
| [Stop-Service](#stop-service) | `spsv` | 停止服务 |
| [Restart-Service](#restart-service) | - | 重启服务 |

### 系统管理

| 命令 | 别名 | 描述 |
| --- | --- | --- |
| [Get-ComputerInfo](#get-computerinfo) | `gin` | 获取计算机的详细信息 |
| [Get/Set-ExecutionPolicy](#getset-executionpolicy) | - | 执行策略 |
| [Get/Set-Date](#getset-date) | - | 日期 |
| [Get-Culture](#get-cuture) | - | 区域信息 |

### 网络管理

| 命令 | 描述 |
| --- | --- |
| [Get/Enable/Disable-NetAdapter](#getenabledisable-netadapter) | 网络适配器的详细信息 |
| [Get/New/Remove-NetIPAddress](#getnewremove-netipaddress) | 当前的IP地址信息 |
| [Get/New/Remove-NetRoute](#getnewremove-netroute) | 网络路由表信息 |
| [Get-DnsClient](#get-dnsclient) | 获取DNS客户端设置 |
| [Set-DnsClientServerAddress](#set-dnsclientserveraddress) | 设置DNS服务器地址 |
| [Resolve-DnsName](#resolve-dnsname) | 解析DNS名称 |
| [Test-Connection](#test-connection) | 测试网络连接 |
| [Test-NetConnection](#test-netconnection) | 测试TCP连接，并提供详细信息 |

### 数据流操作

| 命令 | 别名 | 描述 |
| --- | --- | --- |
| [ForEach-Object](#foreach-object) | `foreach` `%` | 针对输入对象集合中的每个项执行操作 |
| [Where-Object](#where-object) | `where` `?` | 根据属性值从集合中选择对象 |
| [Sort-Object](#sort-object) | `sort` | 按照属性值对对象进行排序 |
| [Group-Object](#group-object) | `group` | 包含相同指定属性的值的组对象 |
| [Measure-Object](#measure-object) | `measure` | 计算对象的数值属性，以及字符串对象（如文本文件）中的字符、单词和行 |
| [Select-Object](#select-object) | `select` | 选择对象或对象属性 |
| [Compare-Object](#compare-object) | `diff` `compare` | 将两组对象进行比较 |
| [Tee-Object](#tee-object) | `tee` | 将命令输出保存在文件或变量中，同时通过管道向下发送 |
| [Format-Table](#format-table) | `ft` | 将输出的格式设置为一个表 |
| [Format-List](#format-list) | `fl` | 将输出的格式设置为属性列表，其中每个属性都显示在一个新行上 |

### PowerShell相关

| 命令 | 别名 | 描述 |
| --- | --- | --- |
| [Get-Help](#get-help) | `man` `help` | 显示有关 PowerShell 命令和概念的信息 |
| [Get-Command](#get-command) | `gcm` | 获取所有命令 |
| [Get-Variable](#get-variable) | `gv` | 获取当前控制台中的变量 |
| [Get-Alias](#get-alias) | `gal` | 获取当前会话的别名 |
| [Get-History](#get-history) | `h` `history` `ghy` | 获取在当前会话过程中输入的命令列表 |

### 其他

---

### 命令说明

#### Get-Help

```powershell
# 查看Get-Command命令的帮助
Get-Help Get-Command

# 查看Get-Command命令的详细帮助
Get-Help Get-Command -Full

# 查看Get-Command命令的示例
Get-Help Get-Command -Examples

# 查看Get-Command命令Name选项的说明
Get-Help Get-Command -Parameter name

# 弹窗显示Get-Command命令的说明
Get-Help Get-Command -ShowWindow

# 显示Get-Command命令的在线文档
Get-Help Get-Command -Online
```

#### Get-Command

* 获取所有可执行的命令

```powershell
# 查看所有类型为Cmdlet的命令
Get-Command -Type Cmdlet

# 查看所有动词是New的命令，就是以New开头的命令
Get-Command -Verb New

# 查看所有命令名词部分包含path的命令
Get-Command -Noun *path*

# 查看所有命令名称包含file的命令
Get-Command *file*
```

---

## 常见问题

### 此系统禁止运行脚本问题

* 执行`ps1`脚本时报错：**无法加载文件 xxx.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies**
* 由于Windows默认执行策略是`Restricted`导致无法运行脚本等，需要修改执行策略

```powershell
# 给当前用户添加可执行本地脚本策略
# RemoteSigned代表可以执行本地的脚本，执行远程的脚本需要签名
# CurrentUser表示只修改当前用户的执行策略，如果要修改所有用户的改为LocalMachine
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
