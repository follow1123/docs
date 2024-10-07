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
| [New-Item](#new-item) | `ni` `mkdir` | 创建新项 |
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
| Get-ComputerInfo | `gin` | 获取计算机的详细信息 |
| [Get/Set-Date](#getset-date) | - | 日期 |
| Get-Culture | - | 区域信息 |
| Get-TimeZone | `gtc` | 时区信息 |

### 网络管理

| 命令 | 描述 |
| --- | --- |
| Get/Enable/Disable-NetAdapter | 网络适配器的详细信息 |
| Get/New/Remove-NetIPAddress | 当前的IP地址信息 |
| Get/New/Remove-NetRoute | 网络路由表信息 |
| Get-DnsClient | 获取DNS客户端设置 |
| Set-DnsClientServerAddress | 设置DNS服务器地址 |
| Resolve-DnsName | 解析DNS名称 |
| [Test-Connection](#test-connection) | 测试网络连接 |
| Test-NetConnection | 测试TCP连接，并提供详细信息 |

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
| [Get/Set-ExecutionPolicy](#getset-executionpolicy) | - | 执行策略 |

### 其他

| 命令 | 别名 | 描述 |
| --- | --- | --- |
| [ConvertTo-Html](#convertto-html) | - | 转换为html |
| [ConvertTo-Json](#convertto-json) | - | 转换为json |
| [Format-Hex](#format-hex) | `fhx` | 将文件以16进制格式显示 |
| [Get-FileHash](#get-filehash) | - | 计算文件的Hash值 |
| [Get-Unique](#get-unique) | `gu` | 获取唯一值 |
| [Read-Host](#read-host) | - | 读取终端的输入 |
| [Start-Sleep](#start-sleep) | `sleep` | 睡眠 |
| [Write-Output](#write-output) | `echo` `write` | 写出数据到终端 |

---

### 命令说明

#### Get-ChildItem

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-childitem?view=powershell-5.1)

```powershell
# 只显示目录
ls -Attributes d

# 显示所有的环境变量
ls env:

# 显示注册表HKEY_CURRENT_USER下的内容
ls hkcu:
```

#### Set-Location

```powershell
# 切换到C:\a目录下
cd C:\a

# 切换到环境变量的PSDrive下
cd env:

# 切换到注册表HKEY_CURRENT_USER的PSDrive下
cd hkcu:
```

#### Get-Location

```powershell
# 显示当前所在目录
pwd

# 显示当前HKEY_CURRENT_USER所在目录
pwd -PSDrive hkcu
```

#### Remove-Item

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/remove-item?view=powershell-5.1)

```powershell
# 强制递归删除某个目录
rm -Recurse -Force 目录

# 递归删除某个注册表项
rm hkcu:\注册表项路径 -Recurse
```

#### New-Item

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/new-item?view=powershell-5.1)

```powershell
# 新建一个文件
New-Item -Name 文件名 -ItemType file -Value "内容" -Force
ni a.txt -Value 12342

# 新建目录，可以使用mkdir创建目录
New-Item -Name 目录名 -ItemType Directory

# 创建软链接，需要管理员权限
ni -ItemType SymbolicLink -Path 链接路径 -Target 原文件路径
```

#### Move-Item

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/move-item?view=powershell-5.1)

```powershell
# 将文件移动到另一个目录，如果修改名称则重命名
Move-Item -Path 原文件 -Destination 目标文件
```

#### Copy-Item

```powershell
# 将目录递归的复制到另一个目录内
cp -Recurse 原目录 目标目录
```

#### Set-ItemProperty

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/set-itemproperty?view=powershell-5.1)

```powershell
# 修改文件的属性为只读
Set-ItemProperty -Path 文件 -Name IsReadOnly -Value $true
```

#### Select-String

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/select-string?view=powershell-5.1)

```powershell
# 在当前目录下所有的txt文件内搜索123内容
Select-String ./*.txt -Pattern "123"
```

#### Get-Content

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-content?view=powershell-5.1)

```powershell
# 显示文件前5行
cat a.txt -Head 5

# 显示文件后5行
cat a.txt -Tail 5

# 阻塞终端显示a.txt的内容，类似tail -f
cat a.txt -Wait
```

---

#### Get-Process

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-process?view=powershell-5.1)

```powershell
# 显示chrome和nginx进程的信息
ps chrome,nginx

# 显示进程命令包含win的进程
ps *win*
```

#### Start-Process

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/start-process?view=powershell-5.1)

```powershell
# 启动程序
Start-Process -FilePath "程序路径"

# 以最大窗口启动程序并等待
start -FilePath "程序路径" -Wait -WindowStyle Maximized

# 以管理员权限启动程序
start -FilePath "程序路径" -Verb RunAs

# 启动程序并指定参数
start -FilePath "程序路径" -ArgumentList "参数列表"
```

#### Stop-Process

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/stop-process?view=powershell-5.1)

```powershell
# 根据名称停止程序
Stop-Process -Name "程序名"

# 根据id停止程序
Stop-Process -id id
```

#### Get-Service

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-service?view=powershell-5.1)

```powershell
# 获取mysql服务
Get-Service mysql

# 获取名称包含win的服务
Get-Service *win*
```

#### Start-Service

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/start-service?view=powershell-5.1)

#### Stop-Service
    
* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/stop-service?view=powershell-5.1)

#### Restart-Service

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/restart-service?view=powershell-5.1)

---

#### Get/Set-Date

* Get-Date[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/get-date?view=powershell-5.1)
* Set-Date[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/set-date?view=powershell-5.1)

---

#### Test-Connection

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/test-connection?view=powershell-5.1)

---

#### ForEach-Object

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/foreach-object?view=powershell-5.1)

```powershell
# 只显示服务名
Get-Service | ForEach-Object ServiceName

# 每个数组乘10
1, 2, 3 | % -Process {$_ * 10}
```

#### Where-Object

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/where-object?view=powershell-5.1)

```powershell
# 显示正在运行的服务
Get-Service | Where-Object Status -EQ "Running"

# 只显示能被2整除的数
1, 2, 3, 4, 5 | ? { $_ % 2 -eq 0 }
```

#### Sort-Object

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/sort-object?view=powershell-5.1)

```powershell
# 根据文件大小升序排序
ls | Sort-Object -Property Length

# 根据程序占用大小降序排序
ps | sort -Property WS -Descending
```

#### Group-Object

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/group-object?view=powershell-5.1)

```powershell
# 根据当前目录下所有文件及其子文件的类型进行分组
ls -Path ./ -Recurse | group -Property Extension

# 统计正在运行和停止的服务
Get-Service | group -Property Status
```

#### Measure-Object

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/measure-object?view=powershell-5.1)

```powershell
# 根据当前目录下所有文件的大小进行计量信息
ls | Measure-Object -Property length -Minimum -Maximum -Sum -Average
```

#### Select-Object

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/select-object?view=powershell-5.1)

```powershell
# 只显示文件的名称和大小
ls | Select-Object -Property name,Length

# 显示前5个占用内存最大的进程
ps | sort -Property WS -Descending | select -First 5

# 去重
"a","b","c","a","a","a" | Select-Object -Unique
```

#### Compare-Object

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/compare-object?view=powershell-5.1)

#### Tee-Object

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/tee-object?view=powershell-5.1)

```powershell
# 终端显示nginx进程信息并将这些信息保存到对应的文件内
ps nginx | Tee-Object -FilePath nginx.txt
```

#### Format-Table

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/format-table?view=powershell-5.1)

```powershell
# 只显示文件的名称和大小
ls | Format-Table -Property name,Length

```

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/format-list?view=powershell-5.1)

#### Format-List

```powershell
# 以列表的方式显示服务名称和状态
Get-Service | Format-List -Property ServiceName,Status
```
---

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

#### Get-Variable

* 这个变量不是环境变量，只是powershell终端内的变量
* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/get-variable?view=powershell-5.1)

```powershell
# 获取变量名包含file的变量
Get-Variable *file*
```

#### Get-Alias

```powershell
# 获取别名命令包含ls的别名
Get-Alias *ls*
```

#### Get-History

* 获取所有历史命令
* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/get-history?view=powershell-5.1)

#### Get/Set-ExecutionPolicy

* Get-ExecutionPolicy[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.security/get-executionpolicy?view=powershell-5.1)
* Set-ExecutionPolicy[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-5.1)

```powershell
# 显示每个范围的脚本执行策略
Get-ExecutionPolicy -List

# 修改当前用户的脚本执行策略为远程脚本需要验证
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

#### ConvertTo-Html

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/convertto-html?view=powershell-5.1)

```powershell
# 将当前用户目录下所有文件信息导出为userhome.html文件
ls -Path $env:userprofile | ConvertTo-Html >> userhome.html
```

#### ConvertTo-Json

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/convertto-json?view=powershell-5.1)

```powershell
# 计量用户目录下的文件信息并使用json格式显示
ls -Path $env:userprofile | measure -Property Length -Maximum -Minimum -Average -Sum | ConvertTo-Json
```

#### Format-Hex

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/format-hex?view=powershell-5.1)

```powershell
# 将a.txt的内容以16进制格式显示
Format-Hex a.txt
```

#### Get-FileHash

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/get-filehash?view=powershell-5.1)

```powershell
计算a.txt文件的Hash值
Get-FileHash a.txt | Format-List
```

#### Get-Unique

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/get-unique?view=powershell-5.1)

```powershell
# 获取唯一值
"a","a", "b", "c","c","c" | Get-Unique
```

#### Read-Host

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/read-host?view=powershell-5.1)

```powershell
# 读取终端的输入存入变量
$Age = Read-Host "Please enter your age"
```

#### Start-Sleep

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/start-sleep?view=powershell-5.1)

```powershell
# 睡2秒
Start-Sleep -Seconds 2

# 睡2秒，使用毫秒单位
sleep -Milliseconds 2000
```

#### Write-Output

* 参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/write-output?view=powershell-5.1)

---

## PowerShell脚本

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/scripting/lang-spec/chapter-01?view=powershell-5.1)

### 变量

* PowerShell内的变量都是以`$`开头的

```powershell
# 定义
$var=1

使用
echo $var
```

#### 变量类型

##### 数组

```powershell
# 定义数组
$array=@(1, 2, 3)

# 使用数组
# 获取
echo $array[1]

# 修改
$array[0] = 4
```

##### Map

```powershell
# 定义
$map=@{
    name="zs"
    age=11
}

# 使用
$map.name
```

#### 变量作用域

* 全局作用域 (Global)：在整个会话中可见，适用于所有脚本和函数。
* 脚本作用域 (Script)：仅在当前脚本文件中可见，适用于脚本内的所有代码。
* 函数作用域 (Local)：在特定函数中可见，函数外无法访问。
* 私有作用域 (Private)：在定义它的函数内可见，其他函数和脚本无法访问。

```powershell
$Script:name="zs"

function fun1 {
    $Private:name="fun1"
    Write-Output $name
    Write-Output $Private:name
    Write-Output $Local:name
    Write-Output $Script:name
    Write-Output $Global:name
}

function fun2 {
    $Private:name="fun2"
    Write-Output $name
    Write-Output $Private:name
    Write-Output $Local:name
    Write-Output $Script:name
    Write-Output $Global:name
}

Write-Output "fun1------------"
fun1
Write-Output "fun2------------"
fun2

Write-Output "out------------"

Write-Output $name
Write-Output $Private:name
Write-Output $Local:name
Write-Output $Script:name
Write-Output $Global:name
```

#### 特殊变量

##### $null

* 空值，用于条件判断

##### $?

* 上一条命令执行的结果

##### $LASTEXITCODE

* 上一条命令的退出代码

##### $_

* 管道中当前的对象

```powershell
# 用$_代表目录对象
ls | % {$_.Length}
```

##### $Error

* 错误信息集合

### 流程控制

#### if

```powershell
$state=1
if ($state -eq 1){
    Write-Output 1
} elseif ($state -eq 2) {
    Write-Output 2
} else {
    Write-Output 3
}
```

#### switch

```powershell
switch ($state) {
    1 { Write-Output 1 }
    2 { Write-Output 2 }
    default { Write-Output 3 }
}
```

#### for

```powershell
for ($i = 0; $i -lt 10; $i++) {
    Write-Output $i
}
```

#### foreach

```powershell
$collection = 1..5
foreach ($item in $collection) {
    Write-Output $item
}
```

#### while

```powershell
$i = 0
while ($i -lt 5) {
    Write-Output $i
    $i++
}
```

### 逻辑运算符

* `-and` 与
* `-or` 或
* `-not` 非
* `-xor` 异或

```powershell
Write-Output ($true -and $true) # true
Write-Output ($true -and $false) # false
Write-Output ($false -and $true) # false
Write-Output ($false -and $false) # false

Write-Output ($true -or $true) # true
Write-Output ($true -or $false) # true
Write-Output ($false -or $true) # true
Write-Output ($false -or $false) # false

Write-Output (-not $true) # false
Write-Output (-not $false) # true

Write-Output ($true -xor $true) # false
Write-Output ($true -xor $false) # true
Write-Output ($false -xor $true) # true
Write-Output ($false -xor $false) # false
```

### 函数

* 详细参考[官方文档](https://learn.microsoft.com/zh-cn/powershell/scripting/learn/ps101/09-functions?view=powershell-5.1)

```powershell
function add {
	param (
		[Int32]$a = 1,
		[Int32]$b = 2
	)
	
	return $a + $b;
}

Write-Output (add)
Write-Output (add 5 5)

```

### 其他

* 转义字符是<code>&#96;</code>

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
