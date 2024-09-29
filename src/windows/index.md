# Windows

> 以下操作大部分以Windows10为例

## 目录

1. <a href="#filesystem-hierarchy">文件层次说明</a>
2. <a href="#package-manager">包管理器</a>
    1. <a href="#package-manager-winget">WinGet</a>
    2. <a href="#package-manager-scoop">Scoop</a>
3. <a href="#Registry">注册表</a>
4. <a href="#windows-subsystem-for-linux">WSL</a>
5. <a href="#troubleshooting">常见问题</a>
    1. <a href="#troubleshooting-1">禁用CapsLock键</a>
    2. <a href="#troubleshooting-2">自定义右键菜单</a>
    3. <a href="#troubleshooting-3">还原旧版右键菜单样式（Windows11）</a>
    4. <a href="#troubleshooting-4">禁用蓝牙绝对音量（Windows11）</a>
    5. <a href="#troubleshooting-5">Windows开机启动文件夹</a>
    6. <a href="#troubleshooting-6">安装MinGW环境</a>
6. <a href="#references">参考</a>

---

<a id="filesystem-hierarchy"></a>
## 文件层次说明

**TODO**

---

<a id="package-manager"></a>
## 包管理器

<a id="package-manager-winget"></a>
### WinGet

> [官方文档](https://learn.microsoft.com/zh-cn/windows/package-manager/winget/)

#### 安装

* 默认已经安装，如果没有在**Microsoft Store**内安装

#### 常用命令

| 命令   | 说明    |
|--------------- | --------------- |
| **winget --help** | 帮助   |
| **winget search** | 搜索软件 |
| **winget install** | 安装 |
| **winget update** | 更新 |
| **winget uninstall** | 卸载 |
| **winget show** | 查看软件的详细信息 |
| **winget list** | 列出所有安装的软件 |

* 示例

```cmd
winget install 软件名

REM 一般使用这种方式安装
winget install --id 软件id

REM 安装指定的版本
winget install --id 软件id -v 版本

REM 查看所有软件是否有更新，winget update其实是winget upgrade的别名
winget update

REM 更新指定软件
winget update --id 软件id

REM 卸载指定软件
winget uninstall --id 软件id

REM 查看所有安装的软件，显示前10个
winget list -n 10
```

<a id="package-manager-scoop"></a>
### Scoop

> [github](https://github.com/ScoopInstaller/Scoop)</br>
> [wiki](https://github.com/ScoopInstaller/Scoop/wiki)</br>
> [官网](https://scoop.sh/)

#### 安装

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

#### 常用命令

| 命令   | 说明    |
|--------------- | --------------- |
| **scoop help** | 帮助   |
| **scoop search** | 搜索软件 |
| **scoop install** | 安装 |
| **scoop update** | 更新 |
| **scoop uninstall** | 卸载 |
| **scoop info** | 查看软件的详细信息 |
| **scoop prefix** | 查看软件当前版本的安装路径 |
| **scoop home** | 打开软件官网 |
| **scoop list** | 列出所有安装的软件 |
| **scoop status** | 查看软件版本状态，是否有更新可用 |
| **scoop which** | 查看可执行文件的位置 |
| **scoop cleanup** | 清理软件 |
| **scoop cache** | 查看所有软件的所有版本 |

* 示例

```cmd
REM 安装指定软件
scoop install 软件名

REM 安装指定软件的指定版本
scoop install 软件名@版本

REM 更新scoop软件本体
scoop update

REM 更新指定软件
scoop update 软件名

REM 更新所有软件
scoop update *

REM 删除指定软件的所有历史版本
scoop cleanup 软件名

REM 删除所有软件的所有历史版本
scoop cleanup -a

REM 查看所有软件的所有版本
scoop cache

REM 删除指定软件的所有历史版本
scoop cache rm 软件名
```

---

<a id="Registry"></a>
## 注册表

TODO
---

<a id="windows-subsystem-for-linux"></a>
## WSL

> [官方文档](https://learn.microsoft.com/zh-cn/windows/wsl)

### 安装

* 默认已经安装，如果没有则参考[旧版 WSL 的手动安装步骤](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual)

#### 安装Linux发行版

```cmd
REM 查询可用的发行版
wsl -l -o

REM 安装Debian
wsl --install -d Debian

REM 查看已安装的发行版信息
wsl -l -v

REM 关闭wsl
wsl --shutdown
```

<a id="troubleshooting"></a>
## 常见问题

<a id="troubleshooting-1"></a>
### 禁用CapsLock键

1. 打开注册表编辑器：<kbd>Win</kbd>+<kbd>r</kbd> regedit
2. 进入下路径：`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout`
3. **右键点击** 在空白处，单击 **New** 然后点击 **Binary Value**(二进制值). 将新的二进制值命名为 **ScanCode Map**.
4. 设置值为`00 00 00 00 00 00 00 00 02 00 00 00 00 00 3A 00 00 00 00 00`
5. 保存后重启电脑

<a id="troubleshooting-2"></a>
### 自定义右键菜单

* **选中文件时的右键菜单**

1. 进入`\HKEY_LOCAL_MACHINE\SOFTWARE\Classes`路径
2. 路径下第一个项`*`代表所有类型的文件，其它已`.`开头的项是某个具体类型的文件，根据具体情况在这个项下面的shell项内添加就可以了
3. 其它步骤和添加选中文件夹时的右键菜单一样

* **选中文件夹时的右键菜单**

1. 打开注册表
2. 进入`\HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\shell`路径
3. 新建项，
4. 设置默认名称的值为右键显示的字符串
5. 新建icon字符串，值设置为使用软件的路径
6. 新建项command
7. 设置默认值为 `软件的路径 "%1"`,其中%1为选中文件夹的路径

* **选中文件夹空白处的右键菜单**

1. 进入`\HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\background\shell`路径
2. 其它步骤和添加选中文件夹时的右键菜单一样，第7步时将`%1`改为`%v.`，同样表示当前文件夹的路径

<a id="troubleshooting-3"></a>
### 还原旧版右键菜单样式（Windows11）

1. 打开命令行窗口：<kbd>Win</kbd>+<kbd>r</kbd> cmd
2. 执行命令：
```cmd
reg add 'HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32' /f /ve
```
3. 打开任务管理器：<kbd>Win</kbd>+<kbd>Shift</kbd>+<kbd>Esc</kbd>
4. 找到`Windows 资源管理器`，右键重新启动

<a id="troubleshooting-4"></a>
### 禁用蓝牙绝对音量（Windows11）

1. 打开注册表编辑器：<kbd>Win</kbd>+<kbd>r</kbd> regedit
2. 进入下路径： `\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Bluetooth\Audio\AVRCP\CT`
3. 找到`DisableAbsoluteVolume`变量，将里面的值修改为1

<a id="troubleshooting-5"></a>
### Windows开机启动文件夹

* `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup`

<a id="troubleshooting-6"></a>
### 安装MinGW环境
1. [下载地址](https://github.com/niXman/mingw-builds-binaries/releases)
    * 版本选择：
        * **平台**：`x86_64`(64位)、`i686`(32位)
        * **多线程方案**：`posix`、`win32`
        * **异常处理方案**：`seh`、`dwarf`、`sjlj`
        * **c运行时与c库**：`ucrt`、`msvcrt`
    * 我选择`x86_64-14.2.0-release-posix-seh-ucrt-rt_v12-rev0.7z`
2. 打开powershell终端：<kbd>Win</kbd>+<kbd>r</kbd> powershell

```powershell
# 下载
Invoke-WebRequest -Uri 'https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/x86_64-14.2.0-release-posix-seh-ucrt-rt_v12-rev0.7z' -OutFile $Env:USERPROFILE/Downloads/mingw.7z

# 解压，需要安装7-zip，我这里解压到当前用户目录下的software文件夹内
7z x $Env:USERPROFILE\Downloads\mingw.7z -o"$Env:USERPROFILE\software"

# 拼接mingw的bin目录到PATH环境变量上
$UserPath=[System.Environment]::GetEnvironmentVariable("PATH", [System.EnvironmentVariableTarget]::User) + ";$Env:USERPROFILE\software\mingw64\bin"

# 修改PATH环境变量
[System.Environment]::SetEnvironmentVariable("PATH", $UserPath, [System.EnvironmentVariableTarget]::User)
```

3. 退出powershell终端后重新进入，输入`gcc -v` 查看版本

---

<a id="references"></a>
## 参考

* [Windows长安装GCC方案](https://www.cnblogs.com/feipeng8848/p/15227688.html)
* [MinGW-w64 C/C++编译器各版本说明](https://blog.csdn.net/weixin_42880082/article/details/120097989)
* [MinGW离线安装包安装教程](https://blog.csdn.net/m0_52733659/article/details/121527947)
* [windows下安装gcc12（mingw-w64）](https://zhuanlan.zhihu.com/p/565370467)
