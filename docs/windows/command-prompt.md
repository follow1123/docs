# Command Prompt

> windows默认shell(cmd.exe)<br></br>
> [官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/windows-commands)

## 常用命令
> cmd内置命令默认后面接`/?` 查看命令的帮助

### 文件管理

| 命令 | 描述 |
| --- | --- |
| [dir](#dir) | 显示当前目录下的子目录 |
| [cd/chdir](#cd) | 显示当前目录名或切换目录 |
| [del](#del) | 删除文件 |
| [rd/rmdir](#rd) | 删除目录 |
| [md/mkdir](#md) | 创建目录 |
| [ren/rename](#ren) | 重命名文件 |
| [move](#move) | 移动或重命名文件或目录 |
| [copy](#copy) | 复制文件 |
| [attrib](#attrib) | 显示或修改文件属性 |
| [mklink](#mklink) | 创建符号链接 |
| [find](#find) | 搜索文件内容 |
| [findstr](#findstr) | 搜索文件内容 |
| [tree](#tree) | 以树型结构显示目录 |
| type | 显示文件内容 |
| [more](#more) | 逐屏显示输出 |

### 服务/进程管理

| 命令 | 描述 |
| --- | --- |
| [net](#net) | 多功能命令，包括用户管理，服务管理，网络管理等 |
| [sc](#sc) | 服务管理 |
| [tasklist](#tasklist) | 显示进程列表 |
| [taskkill](#taskkill) | 关闭进程 |

### 系统管理

| 命令 | 描述 |
| --- | --- |
| [whoami](#whoami) | 显示当前登录用户 |
| hostname | 显示主机名 |
| path | 显示path环境变量 |
| [where](#where) | 显示指定程序所在路径 |
| [date](#date) | 显示或设置日期 |
| [time](#time) | 显示或设置时间 |
| ver | 显示系统版本 |
| [systeminfo](#systeminfo) | 显示系统详细信息 |
| [net](#net) | 多功能命令，包括用户管理，服务管理，网络管理等 |
| [shutdown](#shutdown) | 关机 |
| [schtasks](#schtasks) | 定时任务 |
| [reg](#reg) | 注册表操作 |
| [setx](#setx) | 设置系统环境变量 |

### 网络管理

| 命令 | 描述 |
| --- | --- |
| [ping](#ping) | ping |
| [ipconfig](#ipconfig) | ip配置信息 |
| [tracert](#tracert) | 网络诊断，追踪路由 |
| [netstat](#netstat) | 显示当前网络连接信息 |
| [nslookup](#nslookup) | DNS诊断 |
| [route](#route) | 操作路由表 |
| [netsh](#netsh) | 网络操作脚本工具 |
| [telnet](#telnet) | 计算机之间进行通信 |
| [arp](#arp) | 显示和修改地址解析协议 (ARP) 缓存中的条目 |
| getmac | 显示MAC地址 |

### 设备管理

| 命令 | 描述 |
| --- | --- |
| [diskpart](#diskpart) | diskpart 命令解释器可帮助你管理计算机的驱动器（磁盘、分区、卷或虚拟硬盘） |
| [chkdsk](#chkdsk) | 检查磁盘 |
| [convert](#convert) | FAT转NTFS文件系统 |
| vol | 显示磁盘卷标和序列号 |

### 批处理脚本

| 命令 | 描述 |
| --- | --- |
| [call](#call) | 调用另一个批处理程序 |
| [color](#color) | 修改终端颜色 |
| cls | 清除屏幕 |
| [doskey](#doskey) | 创建别名 |
| [echo](#echo) | 回显消息 |
| [for](#for) | for循环 |
| [if](#if) | if条件 |
| [goto](#goto) | 跳转 |
| rem | 注释 |
| pause | 暂停 |
| [prompt](#prompt) | 修改终端的命令提示符 |
| [set](#set) | 设置当前环境变量 |
| [setlocal/endlocal](#setlocalendlocal) | 使用这对命令包裹的代码块所设置的环境变量都只能被当前批处理文件使用  |
| [start](#start) | 启动单独的窗口允许指定的程序或命令 |
| [timeout](#timeout) | 睡眠 |
| [title](#title) | 修改终端窗口标题 |
| [exit](#exit) | 退出终端或当前脚本 |


### 命令说明

> 参数忽略大小写

#### dir

* `/a` 指定具体属性的文件显示
* `/o` 排序

```batch
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

#### cd

```batch
rem 显示当前目录
cd

rem 切换到指定目录
cd C:\a\b\c

rem 切换到上一级目录
cd ..

rem 切换到E盘
cd \d E:\
```

#### del

* `/p` 删除前确认
* `/f` 强制删除
* `/s` 递归删除
* `/q` 静默删除
* `/a` 按文件属性删除

```batch
rem 强制静默删除C:\a目录及其子目录下的所有文件，不会删除文件夹
del /s/f/q C:\a
```

#### rd

* `/s` 递归删除
* `/q` 静默删除

```batch
rem 递归删除C:\a目录下的所有文件和目录
rd /s/q C:\a
```

#### md

```batch
rem 在C盘下创建a目录，下面依次创建d、c目录
md C:\a\b\c
```

#### ren

```batch
rem 将C:\a\x.txt文件重命名为y.json，这个命令不会移动位置
ren C:\a\x.txt y.json
```
#### move

```batch
rem 将C:\a\x.txt文件重命名为C:\a\y.json，这个命令重命名时必须和之前文件路径相同，否则就是移动
move C:\a\x.txt C:\a\y.json

rem 将C:\a\y.txt文件移动到C:\b目录下
move C:\a\y.txt C:\b
```

#### copy

```batch
rem 将C:\a\a.txt文件复制到C:\b目录下
copy C:\a\a.txt C:\b

rem 将C:\a\a.txt文件复制到C:\b目录下，不提示覆盖重复的文件
copy /y C:\a\a.txt C:\b

rem 将C:\a\a.txt文件和C:\a\b.txt合并成一个文件，并放入C:\c目录下，文件名称取第一个合并的文件
copy C:\a\a.txt+C:\a\b.txt C:\c
```
#### attrib

```batch
rem 查看C:\a\a.txt文件的属性，具体属性说明参考attrib /?
attrib C:\a\a.txt

rem 将C:\a\a.txt文件修改为只读文件
attrib +r C:\a\a.txt
```

#### mklink

> 需要管理员权限运行

* `/d` 创建目录链接
* `/h` 创建硬链接
* `/j` 创建目录联接，和`/d`参数类似，不能跨磁盘使用

```batch
rem 为C:\a\a.txt创建一个软链接C:\b\a.txt，第一个参数是链接，第二个参数是原文件
mklink C:\b\a.txt C:\a\a.txt

rem 为C:\a目录创建一个软链接C:\b\c
mklink C:\b\c C:\a
```

#### find

* `/v` 显示不包含搜索内容的所有行
* `/c` 统计搜索内容匹配到的次数
* `/n` 显示行号
* `/i` 搜索时不区分大小写

```batch
rem 从C:\a\a.txt文件内搜索abc字符串
find "abc" C:\a\a.txt

rem 从C:\a\a.txt文件内搜索abc字符串，并显示行号
find /n "abc" C:\a\a.txt

rem 显示C:\a\a.txt文件内除了包含abc的行以外的所有行
find /v "abc" C:\a\a.txt

rem 统计abc在C:\a\a.txt出现的次数
find /c "abc" C:\a\a.txt
```

#### findstr

* **find**命令增强版，支持正则表达式
* 参考[官网](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/findstr)

#### tree

* 树形结构显示目录下的文件

```batch
rem 树形结构显示C:\a目录下的所有文件
tree /f C:\a
```

#### more

* 交互式命令，打开指定文件后，交互式浏览文件，部分快捷键：
    * <kbd>Space</kbd>：翻页，一整屏
    * <kbd>Enter</kbd>：翻页，一行
    * <kbd>=</kbd>：显示行号，屏幕最下面一行的行号
    * <kbd>q</kbd>：退出交互式命令

```batch
rem 从10行开始预览C:\a\a.txt文件
more +10 C:\a\a.txt
```

---

#### net

* 多功能命令，包含服务管理，账户管理等

##### 服务管理相关

```batch
rem 启动服务
net start 服务名

rem 关闭服务
net stop 服务名

rem 暂停服务
net pause 服务名

rem 继续暂停的服务
net continue 服务名
```

##### 其他

```batch
rem 显示或修改账户配置
net accounts

rem 查看当前计算机信息
net config workstation

rem 管理本地组
net localgroup

rem 管理共享资源
net share
```

#### sc

* 服务管理命令
* 详细操作参考官方文档：
    * <code>[sc config](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/sc-config)</code>
    * <code>[sc create](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/sc-create)</code>
    * <code>[sc delete](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/sc-delete)</code>
    * <code>[sc query](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/sc-query)</code>

```batch
rem 创建服务，服务必须是一个exe可执行程序，不能是cmd或ps1脚本
sc create 服务名称 binpath= "服务路径"

rem 删除服务
sc delete 服务名称

rem 启动服务，也可以使用net start 服务名称启动服务
sc start 服务命令

rem 查询指定服务
sc query type= all state= all | find /i "服务名"
```

#### tasklist

* 进程列表
* 详细操作参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/tasklist)

```batch
rem 查看进程详细信息
tasklist /v

rem 查看正在运行的进程
tasklist /v /fi "status eq running"
```

#### taskkill

```batch
rem 停止进程
taskkill /pid 进程id
```

---

#### whoami

```batch
rem 查看当前登录用户
whoami

rem 查看当前登录用户的详细信息
whoami /all
```

#### where

```batch
rem 显示程序所在位置
where 程序名称
```

#### date

```batch
rem 更改系统日期
date 月-日-年

rem 显示当前系统日期
date /t
```

#### time

```batch
rem 更改系统日期
time 时:分:秒

rem 显示当前系统时间
time /t
```

#### systeminfo

* 查看系统详细信息，可以查看远程计算机配置信息，参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/systeminfo)

#### shutdown

* 关闭或重启一台本地或远程计算机，详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/shutdown)

```batch
rem 立即关机
shutdown /s /t 0

rem 立即重启
shutdown /r /t 0

rem 1分钟后关机
shutdown /s /t 60

rem 重启并进入高级启动选项，就是选择硬盘启动顺序的界面
shutdown /r /o /t 0
```

#### schtasks

> 需要管理员权限运行

* 对应`计算机管理>系统工具>任务计划程序`界面
* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/schtasks)

```batch
rem 每分钟执行一次指定的程序，可以是脚本
schtasks /create /sc minute /mo 1 /tn "任务名称" /tr "程序位置"

rem 立即运行这个任务
schtasks /run /tn "任务名称"

rem 立即结束这个任务
schtasks /end /tn "任务名称"

rem 修改指定任务的执行程序
schtasks /change /tn "任务名称" /tr "程序位置"

rem 删除这个任务
schtasks /delete /tn "任务名称"

rem 查询所有任务
schtasks /query
```

#### reg

> 需要管理员权限运行<br></br>
> <strong>操作注册表可能会导致系统出现问题，谨慎操作</strong>

* 注册表管理
* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/reg)

```batch
rem 添加一个新项
reg add HKCR\Directory\shell\项名

rem 添加一个新项，并指定其默认值
reg add HKCR\Directory\shell\项名 /d "值"

rem 在项下面创建一个新的值
reg add HKCR\Directory\shell\项名 /v "值名称" /d "值"

rem 删除指定的项及其下的所有子项
reg delete HKCR\Directory\shell\项名
```

#### setx

> <strong>先在高级系统设置内查看环境变量是否存在后添加，谨慎修改PATH环境变量，谨慎操作</strong>

* 环境变量操作
* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/setx)

```batch
rem 添加一个用户环境变量
setx 名称 值

rem 添加一个系统环境变量，需要管理员权限
setx /m 名称 值
```

---

#### ping

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/ping)

```batch
rem ping指定网址
ping 网址

rem ping指定网址，ping10次就结束
ping 网址 -n 10
```

#### ipconfig

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/ipconfig)

```batch
rem 显示TCP/IP信息
ipconfig

rem 显示完整TCP/IP信息
ipconfig /all

rem 刷新dns缓存
ipconfig /flushdns
```

#### tracert

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/tracert)

```batch
rem 跟踪网址经过的路由器
tracert 网址

rem 跟踪网址经过的路由器，只跟踪5个就停止，默认30个
tracert /h 5 网址
```

#### netstat

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/netstat)

```batch
rem 查看所有TCP连接数和进程id
netstat -ano
```

#### nslookup

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/nslookup)

```batch
rem 在默认DNS服务器上查询网址对应的ip
nslookup 网址

rem 在指定DNS服务器上查询网址对应的ip
nslookup 网址 DNS服务器ip
```

#### route

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/route_ws2008)

#### netsh

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/networking/technologies/netsh/netsh)

#### telnet

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/telnet)

```batch
rem 连接到指定网址的某个端口
telnet 网址 端口
```

#### arp

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/arp)

```batch
rem 显示所有地址解析协议 (ARP) 缓存
arp /a
```

---

#### diskpart

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/diskpart)

#### chkdsk

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/chkdsk)

#### convert

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/convert)

---

#### call

```batch
call 批处理程序 参数

call 标签 参数
```

#### color

```batch
rem 终端字符颜色改为绿色
color 02
```

#### doskey

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/doskey)

```batch
rem 指定dir /w的别名为ls
doskey ls=dir /w
```

#### echo

```batch
rem 回显字符串
echo aaa

rem 显示环境变量
echo %USERPROFILE%

rem 输出空行
echo.

rem 关闭命令行回显命令
echo off

rem 批处理脚本内关闭回显，在文件第一行加入以下命令
@echo off
```

#### for

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/for)
* 变量前面一个`%`和两个`%`的区别：一个在终端下使用for命令，两个是在批处理脚本内使用for命令

##### 基础用法

```batch
rem 普通用法：依次输出a,b,c
for %i in (a,b,c) do echo %i

rem /d用法：输出用户目录下的所有文件
for /d %i in (%USERPROFILE%\*) do echo %i

rem /r用法：输出用户目录下的所有cmd脚本
for /r %USERPROFILE% %i in (*.cmd) do echo %i

rem /l用法：依次输出1~10
for /l %i in (1,1,10) do echo %i
```

##### 高级用法

* 类似Linux下的`awk`
* 准备`a.txt`文件，内容如下：

```txt
a,11,aaa
b,13,bbb
c,53,4245
```

* 以下命令在`a.txt`文件同级目录下执行

```batch
rem 输出a.txt文件内的所有行
for /f %i in (./a.txt) do echo %i

rem 只显示内容以逗号分割的2列
for /f "tokens=2 delims=," %i in (./a.txt) do echo %i

rem 只显示内容以逗号分割的2,3列，变量按字母顺序取，tokens=*则显示全部列
for /f "tokens=2,3 delims=," %i in (./a.txt) do echo %i %j
```

#### if

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/if)

```batch
rem 如果存在a.txt这个文件则输出1否则输出2
if exist a.txt ( echo 1 ) else ( echo 2 )

rem 如果字符串1和字符串2不相同则输出1否则输出2
if not "字符串1"=="字符串2" ( echo 1 ) else ( echo 2 )

rem 忽略大小写匹配字符串
if /i "a"=="A" ( echo 1 ) else ( echo 2 )

rem 比较数字大小
if 2 gtr 1 ( echo 1 ) else ( echo 2 )

rem 判断环境变量是否存在
if defined 环境变量名 ( echo 1 ) else ( echo 2 )
```

#### goto

* 以下脚本会先输出1再遍历a，b，c最后退出

```batch
@echo off

goto :echo_number

:foreach_word

for %%i in (a,b,c) do echo %%i

goto :eof

:echo_number

echo 1

goto :foreach_word
```

#### prompt

* 修改终端命令提示符，就是光标左边的部分

```batch
rem 修改为显示日期样式
prompt $d$s$s$t$_$g

rem 修改为这样：-->
prompt --$g

rem 改回默认样式
prompt $p$g
```

#### set

* 临时环境变量相关操作，详细操作使用`set /?`查看

```batch
rem 替换变量内的符号
set a=1,2,3
set b=%a:,=-%
rem 1,2,3
echo %a%
rem 1-2-3
echo %b%

rem 截取变量，丢弃最后一位
set a=C:\a\b\
set b=%a:~0,-1%
rem C:\a\b\
echo %a%
rem C:\a\b
echo %b%

rem 计算表达式
set /a n=(2+3)*10
rem 50
echo %n%

rem 获取用户输入
set /p name=

rem 显示所有以j开头的环境变量
set j
```

#### setlocal/endlocal

* 创建一个`b.cmd`脚本，添加以下内容

```batch
@echo off

set name=zs
set age=11
```

* 打开终端调用`b.cmd`脚本后，此时使用`echo %name%`或`echo %age%`会显示已经定义的值
* 在`b.cmd`内添加`setlocal/endlocal`命令

```batch
@echo off

setlocal

set name=zs
set age=11

endlocal
```

* 此时再执行这个脚本后就无法输出里面定义的变量了（需要先清空之前的变量）

#### start

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/start)

```batch
rem 启动一个新程序或脚本
start "title信息" /d 启动目录 脚本或程序

rem 启动一个程序或脚本，并等待这个程序或脚本执行完成
start "title信息" /wait 脚本或程序
```

#### timeout

```batch
rem 等待5秒
timeout /t 5

rem 无限等待
timeout /t -1
```

#### title

```batch
rem 指定终端的新标题
title new title
```

#### exit

```batch
rem 退出终端
exit

rem 在批处理脚本内使用以下命令，表示脚本正常退出
exit /b 0

rem 在批处理脚本内使用以下命令，表示脚本异常退出，错误码为2
exit /b 2
```

## 批处理脚本

> 后缀为.bat或.cmd的文件

### 变量

* 参考[set](#set)

#### 实现Array

```batch
@echo off

chcp 65001 >nul
setlocal

rem 定义数组
set arr[0]=zs
set arr[1]=ls
set arr[2]=ww

rem 遍历数组
set idx=0

:startLoop

if defined arr[%idx%] (
	call echo 下标%idx%的数据为：%%arr[%idx%]%%
	set /a idx=%idx% + 1
	goto :startLoop
)

endlocal
```

#### 实现Map

```batch
@echo off

chcp 65001 >nul
setlocal

rem 定义Map
set map[id1].name=zs
set map[id1].age=11
set map[id2].name=ls
set map[id2].age=12
set map[id3].name=ww
set map[id3].age=13

rem 打印key为id1的数据
call :get id1

call :get id2
rem 修改key为id2的数据
call :put id2 ls1 20
call :get id2

goto :eof

rem 函数定义处

rem 修改
:put

if defined map[%1].name (
	set map[%1].name=%2
	set map[%1].age=%3
) else (
	echo key为%1的数据不存在
)

goto :eof

rem 获取
:get

if defined map[%1].name (
	call echo name=%%map[%1].name%%
	call echo age=%%map[%1].age%%
) else (
	echo key为%1的数据不存在
)

goto :eof

endlocal
```

---

### 流程控制

* 参考[if](#if)

#### goto实现switch

```batch
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

---

### 逻辑运算符

#### &&

* 左边的命令执行成功后，右边的命令才会执行

```batch
rem a.txt存在，输出find的匹配项并行输出1
find "a" a.txt && echo 1

rem c.txt不存在，不会输出1
find "a" c.txt && echo 1
```

#### ||

* 左边的命令执行失败后，右边的命令才会执行

```batch
rem a.txt存在，不会输出1
find "a" a.txt || echo 1

rem c.txt不存在，会输出1
find "a" c.txt || echo 1
```

#### &

* 无论左边的命令是否执行成功，右边的命令都会执行

```batch
rem c.txt不存在，会输出1
find "a" c.txt & echo 1
```

#### 条件组合

```batch
rem 当a.txt内存在a字符或b字符时才会输出1
(find "a" a.txt || find "b" a.txt) && echo 1
```

---

### 函数

* cmd内没有函数的概念，但可以使用[goto](#goto)配合[call](#call)实现简易的函数，或者直接编写另一个批处理脚本作为函数

#### 参数说明

* `%1~%n` 调用时输入的参数，`%1`是第一个参数，`%2`是第二个参数等
* `%*` 所有参数，一般配合[for](#for)命令使用
* 部分扩展参数（详细参考`call /?`）：
    * `%~1` 如果参数被双引号包裹，则去除双引号
    * `%~f1` 将参数前面拼接当前执行脚本所在路径
    * `%~n1` 如果参数是文件，获取文件名称
    * `%~x1` 如果参数是文件，获取文件后缀
    * `%~a1` 如果参数是文件，获取文件属性
    * `%~t1` 如果参数是文件，获取文件修改时间
    * `%~z1` 如果参数是文件，获取文件修改大小
* [call](#call)命令不止可以调用其他脚本，还可以调用当前脚本内的标签
    * 在使用`call`命令调用标签并传入参数时，标签下面的代码内获取的参数就是`call`命令传递的参数，这个参数不会覆盖当前文件的参数

##### 示例

* 创建`params.cmd`脚本，内容如下，确保a.txt文件存在
* 在其他脚本内使用`call params.cmd "a b" a.txt a.txt a.txt`调用该脚本

```batch
@echo off

rem 设置终端编码为utf8
chcp 65001 >nul

echo -----删除双引号-----
echo %1
echo %~1

echo -----拼接当前文件路径-----
echo %2
echo %~f2

echo -----获取文件名和文件后缀-----
echo %3
echo %~n3
echo %~x3

echo -----获取文件的属性日期和大小-----
echo %4
echo %~a4
echo %~t4
echo %~z4

echo -----遍历所有参数-----
for %%i in (%*) do echo %%i
```

#### goto实现函数

* 实现两个数相加

```batch
@echo off
setlocal

call :add 1 2
call :add 5 5

goto :eof

:add
set /a result=%1 + %2
echo %result%
goto :eof

endlocal
```

* 判断当前目录下文件是否存在

```batch
@echo off
setlocal

chcp 65001 >nul

for %%i in (%*) do call :checkFile %%i

goto :eof

:checkFile

if exist %1 (
	echo %1存在
)else (
	echo %1不存在
)

goto :eof

endlocal
```

#### 批处理实现函数

* 把上面脚本内goto下面的逻辑单独放在另一个批处理脚本内就行了

---

### 循环

#### for循环

* 参考[for](#for)

#### goto实现循环

```batch
@echo off

set i=1

:start_loop

if %i% equ 10 goto :eof 

echo %i%
set /a i=%i%+1

goto :start_loop
```

---

### 管道和重定向

#### 管道

* 将前面命令的结果作为后面命令的输入

```batch
rem 将tasklist命令的结果作为find命令的输入，实现查询chrome是否在运行
tasklist | find "chrome"
```

#### 重定向

* 相关符号：
    * `>` 覆盖
    * `>>` 追加
    * `<` 输入

```batch
rem 将dir的输出写入到dirinfo.txt文件内
dir > dirinfo.txt

rem 将time /t的输出追加到time.txt文件内
time /t >> time.txt

rem 将time.txt文件内的第一行写入进变量var内
set /p var=< time.txt
```

##### 标准输入/标准输出/标准错误

* 标准输入对应一个程序的输入，标准输出对应程序正常的输出，标准错误对应程序的异常输出
    * 标准输入（standard input）的描述符是 0
    * 标准输出（standard output）是 1
    * 标准错误（standard error）是 2

```batch
rem 将find "a" a.txt这个命令的标准输出写入进info.txt文件内，将这个命令的标准错误追加进error.txt文件内
find "a" a.txt > info.txt 2>> error.txt


rem 将find "a" a.txt这个命令的标准输出追加进all.txt文件内，将这个命令的标准错误输出到标准输出
find "a" a.txt >> all.txt 2>&1

rem 将休眠命令的标准输出写入进空设备处，意思就是不处理标准输出
timeout /t 1 > nul
```

---

### 其他

* 转义字符是`^`
* 在批处理脚本内设置编码使脚本内的中文正常显示：`chcp 65001 >nul`

## 参考

* [Windows批处理(cmd/bat)常用命令教程](https://www.cnblogs.com/xpwi/p/9626959.html)
* [cmd命令](https://ss64.com/nt/)
* [判断字符串是否包含某字符串](https://blog.csdn.net/tjcwt2011/article/details/120508290)
* [批处理之字符串操作](https://blog.csdn.net/peng_cao/article/details/74170979)
* [for命令用法](https://blog.csdn.net/weixin_43165135/article/details/127702841)
* [批处理中屏蔽错误信息 nul 2>nul 的用法 ](https://www.cnblogs.com/wzihan/p/15792344.html)
