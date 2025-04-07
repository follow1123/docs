---
sidebar_position: 2
---

# Shell

Shell 是操作系统中提供给用户与内核进行交互的接口。它是你在终端中输入命令并获得结果的环境

简单来说，它是一个 命令解释器（Command Interpreter）

Shell 接收用户输入的命令，翻译成内核可以理解的系统调用，然后再把结果显示出来

## 常见的 Shell 

* Bash（最常用） - GNU 项目开发，功能强大，支持脚本、编程
* sh（Bourne Shell） - 最早的 Unix Shell，兼容性好
* Zsh - 功能丰富、美化强、适合交互式使用（很多人配合 oh-my-zsh 使用）
* Ksh（Korn Shell） - 兼容 Bourne Shell，适合脚本
* Fish - 用户友好、自动补全强，但不兼容 Bash 脚本

---

## 变量

```bash
# 定义变量
name=zhangsan

# 使用变量
echo $name
```

### 环境变量

在系统和所有 shell 中生效，一般都是大写

```bash
# 打印所有环境变量
printenv
# 或
env

# 导出环境变量，一般在配置文件处导出
MY_ENV_VAR=value
export $MY_ENV_VAR
```

---

### 变量操作

其他操作参考 `man bash` 的 **Parameter Expansion** 部分

```bash
a="Hello"
b="World"
c="$a $b"
echo "$c"     # 输出 Hello World

str="Linux"
echo ${#str}     # 输出 5

str="abcdef"
echo ${str:1:3}    # 输出 bcd（从第2个字符起，截取3个字符）

str="file.txt"
echo ${str/.txt/.md}    # 输出 file.md
```

---

### 变量默认值

```bash
# 如果变量 a 没有定义则输出 2
echo ${a:-2}
# 变量 a 没有被赋值
echo $a


# 如果变量 a 没有定义则输出 2，并赋值给 a
echo ${a:=2}
# 输出 2
echo $a


a=3
# 如果变量 a 已经定义，则输出 2
echo ${a:+2}
# 输出 3
echo $a


# 如果变量 a 没定义，则退出并输出错误信息
echo ${a:?a not defined}
# 这行不会执行
echo 5
```

---

### 位置参数变量

获取执行shell脚本时后面带的参数

* `$0` - 当前脚本文件名
* `$1~$9` - 文件后的 1～9 为参数
* `${10}` - 第十个参数和往后的参数都需要使用大括号包裹才能正常获取
* `$*` - 所有参数组成的字符串
* `$@` - 所有参数组成的集合
* `$#` - 所有参数的个数

---

### 特殊变量

* `$$` - 当前进程的进程号(PID ) 
* `$!` - 后台运行的最后一个进程的进程号（PID ) 
* `$?` - 上次执行命令的退出状态码，默认 0 表示命令正常执行完成，其他数字表示执行错误，具体错误使用帮助手册查看

---

## 表达式

```bash
# 将 date 命令输出的结果赋值给变量 a
a=$(date)

# 将表达式 1+9 计算后的结果赋值给变量 b
b=$((1+9))
# 或
b=$[1+9]

# 输出 1 + 1 的结果，表达式字符之间必须使用空格分割
expr 1 + 1
```

---

## 流程控制

### if

```bash
if [ 条件 ]; then
    分支一
elif [ 条件 ]; then
    分支二
else
    分支三
fi
```

数值比较

* `-lt` 小于
* `-le` 小于等于
* `-eq` 等于
* `-gt` 大于
* `-ge` 大于等于
* `-ne` 不等于

```bash
if [ 1 -lt 2 ]; then
    echo 1
else
    echo 2
fi
```

文件权限判断

* `-r` 是否有读的权限
* `-w` 是否有写的权限
* `-x` 是否有执行的权限

文件类型判断

* `-f` 文件是否存在并且是一个常规的文件
* `-e` 文件是否存在
* `-d` 文件是否存在并且是一个目录

:::note
其他参考 `man bash` 的 **CONDITIONAL EXPRESSIONS** 部分
:::

---

### case

* 语法

```bash
case 值 in
"匹配值1")
    echo one
;;
"匹配值2")
    echo two
;;
*)
    echo other
;;
esac
```

---

### for 循环

* 语法

```bash
for 变量 in 值; do
    循环体
done

# 遍历1到10
for(( i=1; i<=100; i++ )); do
      循环体
done
```

---

### while 循环

* 语法

```bash
while [ 条件 ]; do
    循环体
done
```

---

### read

读取控制台输入

* `-p` 指定读取值时的提示符;
* `-t` 指定读取值时等待的时间(秒）

---

## 函数

### 系统函数

* `basename 路径` 获取路径里的文件名
* `basename 路径 后缀` 获取路径里的文件名并去掉文件名的后缀
* `basedir 路径` 获取过文件的路径

---

### 自定义函数

```bash
# 定义函数
function fun1(){
    # 定义当前函数作用域的变量
    local var1=1
    # 函数体
}

# 调用函数
fun1 v1 v2 v3
```

---

## 任务控制

运行中的任务使用 ctrl+z 挂起

执行的命令后面接 `&` 将将命令转成后台执行

使用 `jobs` 命令查看所有挂起的进程

使用 `fg` 命令将挂起的进程恢复到前台执行，多个任务的情况下使用 `%` 选择，`%1` 表示第一个编号的任务，等

使用 `bg` 命令将挂起的进程恢复为后台执行，多个任务的情况下使用 `%` 选择，`%1` 表示第一个编号的任务，等

使用 `kill -9 %%` 强制结束上一个挂起的任务

---

## 配置文件

配置文件启动顺序，[参考](https://blog.flowblok.id.au/2013-02/shell-startup-scripts.html)

![配置文件启动顺序](/img/linux/shell-startup-actual.png) 

:::info
在使用 bash 的情况下，大部分个人配置放在 `~/.bashrc` 文件内即可，需要全局使用到的配置放在 `/etc/profile` 或 `/etc/profile.d/xxx.sh`（自定义脚本） 即可
:::

---

## 其他

### 快捷键

参考 `man bash` 的 **READLINE** 部分

### 历史命令

参考 `man bash` 的 **HISTORY EXPANSION** 部分

### 内置命令

参考 `man bash` 的 **SHELL BUILTIN COMMANDS** 部分
