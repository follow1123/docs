# Command Prompt

> windows默认shell(cmd.exe)</br>
> [官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/windows-commands)

## 常用命令
> cmd内置命令默认后面接`/?` 查看命令的帮助

### 文件管理

| 命令 | 描述 |
| --- | --- |
| <a href="#commands-file-dir">dir</a> | 显示当前目录下的子目录 |
| <a href="#commands-file-cd-chdir">cd/chdir</a> | 显示当前目录名或切换目录 |
| <a href="#commands-file-del">del</a> | 删除文件 |
| <a href="#commands-file-rd-rmdir">rd/rmdir</a> | 删除目录 |
| <a href="#commands-file-md-mkdir">md/mkdir</a> | 创建目录 |
| <a href="#commands-file-ren-rename">ren/rename</a> | 重命名文件 |
| <a href="#commands-file-move">move</a> | 移动或重命名文件或目录 |
| <a href="#commands-file-copy">copy</a> | 复制文件 |
| <a href="#commands-file-attrib">attrib</a> | 显示或修改文件属性 |
| <a href="#commands-file-mklink">mklink</a> | 创建符号链接 |
| <a href="#commands-file-find">find</a> | 过滤文件内容 |
| <a href="#commands-file-findstr">findstr</a> | 搜索文件内容 |
| <a href="#commands-file-tree">tree</a> | 以树型结构显示目录 |
| <a href="#commands-file-type">type</a> | 显示文件内容 |
| <a href="#commands-file-more">more</a> | 逐屏显示输出 |

### 服务/进程管理

| 命令 | 描述 |
| --- | --- |
| <a href="#commands-net">net</a> | 多功能命令，包括用户管理，服务管理，网络管理等 |
| <a href="#commands-service-sc">sc</a> | 服务管理 |
| <a href="#commands-service-tasklist">tasklist</a> | 显示进程列表 |
| <a href="#commands-service-taskkill">taskkill</a> | 关闭进程 |

### 系统管理

| 命令 | 描述 |
| --- | --- |
| <a href="#commands-system-whoami">whoami</a> | 显示当前登录用户 |
| <a href="#commands-system-hostname">hostname</a> | 显示主机名 |
| <a href="#commands-system-path">path</a> | 显示path环境变量 |
| <a href="#commands-system-where">where</a> | 显示指定程序所在路径 |
| <a href="#commands-system-date">date</a> | 显示或设置日期 |
| <a href="#commands-system-time">time</a> | 显示或设置时间 |
| <a href="#commands-system-ver">ver</a> | 显示系统版本 |
| <a href="#commands-system-systeminfo">systeminfo</a> | 显示系统详细信息 |
| <a href="#commands-net">net</a> | 多功能命令，包括用户管理，服务管理，网络管理等 |
| <a href="#commands-system-shutdown">shutdown</a> | 关机 |
| <a href="#commands-system-schtasks">schtasks</a> | 定时任务 |
| <a href="#commands-system-reg">reg</a> | 注册表操作 |
| <a href="#commands-system-setx">setx</a> | 设置系统环境变量 |

### 网络管理

| 命令 | 描述 |
| --- | --- |
| <a href="#commands-network-ping">ping</a> | ping |
| <a href="#commands-network-ipconfig">ipconfig</a> | ip配置信息 |
| <a href="#commands-network-tracert">tracert</a> | 网络诊断，追踪路由 |
| <a href="#commands-network-netstat">netstat</a> | 显示当前网络连接信息 |
| <a href="#commands-network-nslookup">nslookup</a> | DNS诊断 |
| <a href="#commands-network-route">route</a> | 操作路由表 |
| <a href="#commands-network-netsh">netsh</a> | 网络操作脚本工具 |
| <a href="#commands-network-telnet">telnet</a> | 计算机之间进行通信 |
| <a href="#commands-network-arp">arp</a> | 显示和修改地址解析协议 (ARP) 缓存中的条目 |
| <a href="#commands-network-getmac">getmac</a> | 显示MAC地址 |

### 设备管理

| 命令 | 描述 |
| --- | --- |
| <a href="#commands--diskpart">diskpart</a> | diskpart 命令解释器可帮助你管理计算机的驱动器（磁盘、分区、卷或虚拟硬盘） |
| <a href="#commands--chkdsk">chkdsk</a> | 检查磁盘 |
| <a href="#commands--convert">convert</a> | FAT转NTFS文件系统 |
| <a href="#commands--vol">vol</a> | 显示磁盘卷标和序列号 |

### 批处理脚本

| 命令 | 描述 |
| --- | --- |
| <a href="#commands-batch-call">call</a> | 调用另一个批处理程序 |
| <a href="#commands-batch-color">color</a> | 修改终端颜色 |
| <a href="#commands-batch-cls">cls</a> | 清除屏幕 |
| <a href="#commands-batch-doskey">doskey</a> | 创建别名 |
| <a href="#commands-batch-for">for</a> | for循环 |
| <a href="#commands-batch-if">if</a> | if条件 |
| <a href="#commands-batch-goto">goto</a> | 跳转 |
| <a href="#commands-batch-rem">rem</a> | 注释 |
| <a href="#commands-batch-pause">pause</a> | 暂停 |
| <a href="#commands-batch-prompt">prompt</a> | 修改终端的命令提示符 |
| <a href="#commands-batch-set">set</a> | 设置当前环境变量 |
| <a href="#commands-batch-setlocal-endlocal">setlocal/endlocal</a> | 使用这对命令包裹的代码块所设置的环境变量都只能被当前批处理文件使用  |
| <a href="#commands-batch-echo">echo</a> | 回显消息 |
| <a href="#commands-batch-start">start</a> | 启动单独的窗口允许指定的程序或命令 |
| <a href="#commands-batch-timeout">timeout</a> | 睡眠 |
| <a href="#commands-batch-title">title</a> | 修改终端窗口标题 |
| <a href="#commands-batch-exit">exit</a> | 退出终端或当前脚本 |


### 命令说明

> 参数忽略大小写

<a id="commands-file-dir"></a>
#### dir

* `/a` 指定具体属性的文件显示
* `/o` 排序

```cmd
rem 显示隐藏文件
dir /a:h
rem 显示隐藏的文件夹
dir /a:hd

rem 按名称排序
dir /o:n
rem 按大小排序
dir /o:s
rem 按日期排序
dir /o:d

rem 根据创建时间排序
dir /t:c
rem 根据上次访问时间排序
dir /t:a
rem 根据最后写入时间排序
dir /t:w

rem 列出当前目录下的所有txt文件
dir *.txt
```

<a id="commands-file-cd-chdir"></a>
#### cd

```cmd
rem 切换到指定目录
cd C:\a\b\c

rem 切换到上一级目录
cd ..

rem 切换到E盘
cd \d E:\
```

<a id="commands-file-del"></a>
#### del

* `/p` 删除前确认
* `/f` 强制删除
* `/s` 递归删除
* `/q` 静默删除
* `/a` 按文件属性删除

```cmd
rem 强制静默删除C:\a目录及其子目录下的所有文件，不会删除文件夹
del /s/f/q C:\a
```

<a id="commands-file-rd-rmdir"></a>
#### rd

* `/s` 递归删除
* `/q` 静默删除

```cmd
rem 递归删除C:\a目录下的所有文件和目录
rd /s/q C:\a
```

<a id="commands-file-md-mkdir"></a>
#### md

```cmd
rem 在C盘下创建a目录，下面依次创建d、c目录
md C:\a\b\c
```

<a id="commands-file-ren-rename"></a>
#### ren

```cmd
rem 将C:\a\x.txt文件重命名为y.json，这个命令不会移动位置
ren C:\a\x.txt y.json
```
<a id="commands-file-move"></a>
#### move

```cmd
rem 将C:\a\x.txt文件重命名为C:\a\y.json，这个命令重命名时必须和之前文件路径相同，否则就是移动
move C:\a\x.txt C:\a\y.json

rem 将C:\a\y.txt文件移动到C:\b目录下
move C:\a\y.txt C:\b
```

<a id="commands-file-copy"></a>
#### copy

```cmd
rem 将C:\a\a.txt文件复制到C:\b目录下
copy C:\a\a.txt C:\b

rem 将C:\a\a.txt文件复制到C:\b目录下，不提示覆盖重复的文件
copy /y C:\a\a.txt C:\b

rem 将C:\a\a.txt文件和C:\a\b.txt合并成一个文件，并放入C:\c目录下，文件名称取第一个合并的文件
copy C:\a\a.txt+C:\a\b.txt C:\c
```
<a id="commands-file-attrib"></a>
#### attrib

```cmd
rem 查看C:\a\a.txt文件的属性，具体属性说明参考attrib /?
attrib C:\a\a.txt

rem 将C:\a\a.txt文件修改为只读文件
attrib +r C:\a\a.txt
```

<a id="commands-file-mklink"></a>
#### mklink

> 需要管理员权限运行

* `/d` 创建目录链接
* `/h` 创建硬链接
* `/j` 创建目录联接，和`/d`参数类似，不能跨磁盘使用

```cmd
rem 为C:\a\a.txt创建一个软链接C:\b\a.txt，第一个参数是链接，第二个参数是原文件
mklink C:\b\a.txt C:\a\a.txt

rem 为C:\a目录创建一个软链接C:\b\c
mklink C:\b\c C:\a
```

<a id="commands-file-find"></a>
#### find

* `/v` 显示不包含搜索内容的所有行
* `/c` 统计搜索内容匹配到的次数
* `/n` 显示行号
* `/i` 搜索时不区分大小写

```cmd
rem 从C:\a\a.txt文件内搜索abc字符串
find "abc" C:\a\a.txt

rem 从C:\a\a.txt文件内搜索abc字符串，并显示行号
find /n "abc" C:\a\a.txt

rem 显示C:\a\a.txt文件内除了包含abc的行以外的所有行
find /v "abc" C:\a\a.txt

rem 统计abc在C:\a\a.txt出现的次数
find /c "abc" C:\a\a.txt
```

#### date

* `/T` 显示当前日期不提示输入新的日期 (默认`date`不带参数会提示输入新的日期)


### timeout

### start

* TODO

## 批处理脚本

> .bat/.cmd文件

### 变量

```cmd
REM 定义变量
set a=1
REM 使用变量
echo %a%
```

### 条件

#### 数字

```bash
REM == 相等
if 1 == 1 (echo 1)
REM neq 不相等
if 1 neq 2 (echo 1)
REM lss 小于
if 1 lss 2 (echo 1)
REM leq 小于等于
if 1 lss 1 (echo 1)
REM gtr 大于
if 2 gtr 1 (echo 1)
REM geq 大于等于
if 1 geq 1 (echo 1)
```

#### 字符串

> 匹配方式和数字的一样

```cmd
REM 忽略大小写匹配
if /i "a" == "A" (echo 1)
```

#### 文件

```cmd
REM 判断文件是否存在
if exist filename (echo 1)
REM 判断文件不存在
if not exist filename (echo 1)
```
#### 逻辑运算符

* TODO

### 结构控制

#### if

```cmd
if 1==1 (
    echo 1 
) else (
    echo 2
)
```

#### goto

##### 实现函数定义

> 函数必须定义在脚本的最后，由于是用goto实现，函数就是一部分脚本，定义在前面会先执行一遍  
> :EOF 表示跳转到文件末尾

```cmd
REM 实现根据不同参数输出不同字符功能
set param=1
if %param%==1 (goto :print_a)
if %param%==2 (goto :print_b)
goto :EOF

:print_a
echo a
goto :EOF

:print_b
echo b
goto :EOF
```

### 循环

* TODO

#### for

##### 实现获取路径中的文件名
```cmd
set path="C:\a\b\a\d.txt"

REM ~n 表示文件名
for %%i in (%path%) do echo %%~ni
REM 输出 d

REM ~x 表示文件扩展名
for %%i in (%path%) do echo %%~xi
REM 输出 .txt

REM ~nx 表示文件名和文件扩展名
for %%i in (%path%) do echo %%~nxi
REM 输出 d.txt

```

* TODO

#### while (使用goto实现)

* TODO


```cmd
echo 123^
456^
789^
# 输出
123456789
```

## 参考

* [Windows批处理(cmd/bat)常用命令教程](https://www.cnblogs.com/xpwi/p/9626959.html)
* [cmd命令](https://ss64.com/nt/)
* [判断字符串是否包含某字符串](https://blog.csdn.net/tjcwt2011/article/details/120508290)
* [批处理之字符串操作](https://blog.csdn.net/peng_cao/article/details/74170979)
* [for命令用法](https://blog.csdn.net/weixin_43165135/article/details/127702841)
