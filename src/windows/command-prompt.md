# Command Prompt

> windows默认shell(cmd.exe)

## 常用命令
> cmd内置命令默认后面接`/?` 查看命令的帮助

| 命令 | 描述 |
| --- | --- |
| **[dir](#dir)** | 列出当前目录下的子目录 |
| **cls** | 清屏 |
| **echo** | 回显消息|
| **cd** | 切换目录 |
| **[copy](#copy)** | 复制文件 |
| **[del](#del)** | 删除文件 |
| **md/mkdir** | 创建文件夹 |
| **[rd](#rd)** | 删除目录 |
| **[date](#date)** | 查看当前日期 |
| **[mklink](#mklink)** | 创建软链接(类似linux的`ln`命令 ) |
| **[timeout](#timeout)** | 睡眠 |
| **[start](#start)** | 启动一个程序 |
| **exit** | 退出终端 |

### 命令说明

> 参数忽略大小写

#### dir

* `/A` 指定具体属性的文件显示
    ```cmd
    REM 显示隐藏文件
    dir /A:H
    REM 显示隐藏的文件夹
    dir /A:HD
    ```
* `/O` 排序
    ```cmd
    REM 按名称排序
    dir /O:N
    REM 按大小排序
    dir /O:S
    REM 按日期排序
    dir /O:D
    ```

#### copy

* "/Y" 如果文件存在则覆盖
* TODO
#### del

* TODO 详细说明
* `/P` 删除前确认
* `/F` 强制删除
* `/S` 递归删除
* `/Q` 静默删除
* `/A` 按文件属性删除

### rd

* `/S` 递归删除
* `/Q` 静默删除

#### date

* `/T` 显示当前日期不提示输入新的日期 (默认`date`不带参数会提示输入新的日期)

#### mklink

> 参数默认都使用绝对路径

* 不带参数默认创建文件链接
    ```cmd
    REM 第一个参数是创建的链接，第二个参数是目标文件
    mklink /a/b/d /a/b/c
    ```
* TODO 详细说明
* `/D` 创建目录链接
* `/H` 创建硬链接
* `/J` 创建目录联接

### timeout

### start

* TODO

## 其他命令

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

* 睡眠：`timeout 秒数	`

* 修改当前编码为UTF-8：`chcp 65001`

## 参考

* [Windows批处理(cmd/bat)常用命令教程](https://www.cnblogs.com/xpwi/p/9626959.html)
* [cmd命令](https://ss64.com/nt/)
* [判断字符串是否包含某字符串](https://blog.csdn.net/tjcwt2011/article/details/120508290)
* [批处理之字符串操作](https://blog.csdn.net/peng_cao/article/details/74170979)
* [for命令用法](https://blog.csdn.net/weixin_43165135/article/details/127702841)
