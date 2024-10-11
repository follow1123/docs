---
sidebar_position: 1
---

# 常用命令

> 使用`man`命令或参数加`--help`查看命令的帮助


## 文件目录

| 命令 | 描述 |
| --- | --- |
| [ls](#ls) | 列出当前目录下的文件 |
| pwd | 查看当前处于那个目录下 |
| [tree](#tree) | 使用树结构显示目录结构 |
| [stat](#stat) | 显示文件或目录的详细信息，包括权限、所有者和修改时间 |
| [cd](#cd) | 切换目录 |
| touch | 创建一个空文件 |
| [mkdir](#mkdir) | 创建目录 |
| [cp](#cp) | 拷贝 |
| [rm](#rm) | 删除文件或目录 |
| [rmdir](#rmdir) | 删除空目录 |
| [mv](#mv) | 移动文件或目录 |
| [ln](#ln) | 文件链接 |

## 文本处理

| 命令 | 描述 |
| --- | --- |
| [cat](#cat) | 显示文件内容 |
| more | 显示文件内容，空格翻页 |
| less | 显示文件内容，more增强版，支持vi按键操作 |
| [head](#head) | 显示文件起始部分内容 |
| [tail](#tail) | 显示文件结束部分内容 |
| [find](#find) | 查找文件 |
| [locate](#locate) | 查找文件 |
| [grep](#grep) | 过滤 |
| [awk](#awk) | 过滤，格式化 |
| [sed](#sed) | 编辑 |
| [sort](#sort) | 对文本行进行排序 |
| [uniq](#uniq) | 去除重复的行 |
| [wc](#wc) | 统计文件的行数、字数和字符数 |
| [cut](#cut) | 从文本行中提取字段 |
| [paste](#paste) | 将多个文件的行并排合并 |

## 压缩解压

| 命令 | 描述 |
| --- | --- |
| [gzip](#gzip) | 使用Lempel-Ziv编码（LZ77）进行压缩 |
| [gunzip](#gunzip) | 解压缩gzip压缩的文件 |
| zcat | 查看gzip压缩的文件 |
| [bzip2](#bzip2) | 用Burrows-Wheeler变换和Huffman编码进行压缩 |
| [bunzip2](#bunzip2) | 解压缩bzip2压缩的文件 |
| bzcat | 查看bzip2压缩的文件 |
| [xz](#xz) | 使用LZMA（Lempel-Ziv-Markov chain Algorithm）进行压缩 |
| [unxz](#unxz) | 解压缩xz压缩的文件 |
| xzcat | 查看xz压缩的文件 |
| [tar](#tar) | 打包，配合以上压缩算法使用 |
| [zip](#zip) | 跨平台压缩（在各个平台都有对于的实现） |
| [unzip](#unzip) | 解压缩zip压缩的文件 |

## 进程/服务

| 命令 | 描述 |
| --- | --- |
| [ps](#ps) | 查看当前运行的进程 |
| [top](#top) | 实时显示进程信息和系统资源使用情况 |
| [kill](#kill) | 终止指定的进程 |
| [pkill](#pkill) | 根据名称终止进程 |
| [killall](#killall) | 终止所有匹配指定名称的进程 |
| [bg](#bg) | 将后台任务放入后台运行 |
| [fg](#fg) | 将后台任务恢复到前台 |
| [systemctl](#systemctl) | systemd服务管理 |
| [service](#service) | SysVinit服务管理 |

## 网络

| 命令 | 描述 |
| --- | --- |
| [ping](#ping) | 测试与目标主机的网络连通性 |
| [ifconfig](#ifconfig) | 查看和配置网络接口 |
| [ip](#ip) | 更现代的网络配置工具，提供了更丰富的功能 |
| [netstat](#netstat) | 显示网络连接、路由表和网络接口统计 |
| [ss](#ss) | 查看当前的网络连接状态 |
| [wget](#wget) | 从网络下载文件 |
| [route](#route) | 路由 |
| [firewall-cmd](#firewall-cmd) | 用于管理 firewalld 防火墙服务 |
| [arp](#arp) | 查看和管理 ARP 缓存 |

## 用户/组/权限

| 命令 | 描述 |
| --- | --- |
| id | 查看用户信息 |
| whoami | 查看当前是那个用户登录 |
| who | 查看当前是那个用户登录，并显示登录时间 |
| [useradd](#useradd) | 添加用户 |
| [userdel](#userdel) | 删除用户 |
| [usermod](#usermod) | 修改用户信息 |
| passwd | 修改密码 |
| [chage](#chage) | 更改用户密码的过期信息 |
| [su](#su) | 切换用户 |
| groups | 显示当前用户再那些组下 |
| groupadd | 新增组 |
| groupmod | 修改组 |
| groupdel | 删除组 |
| [chmod](#chmod) | 更改文件或目录的权限 |
| [chown](#chown) | 更改文件或目录的所有者 |
| [chgrp](#chgrp) | 更改文件或目录的所属组 |
| [sudo](#sudo) | 以超级用户身份执行命令 |

## 系统

| 命令 | 描述 |
| --- | --- |
| [shutdown](#shutdown) | 关机/重启 |
| halt | 关机 |
| reboot | 重启 |
| logout | 注销用户 |
| hostname | 查看或设置主机名 |
| [uptime](#uptime) | 查看系统运行时间和负载 |
| [uname](#uname) | 显示系统信息 |
| [lsb_release](#lsb_release) | 查看 Linux 发行版信息 |
| [poweroff](#poweroff) | 关闭系统 |

## 定时任务

| 命令 | 描述 |
| --- | --- |
| [crontab](#crontab) | 设置定期执行的任务 |
| [at](#at) | 安排一次性任务 |

## 磁盘/设备

| 命令 | 描述 |
| --- | --- |
| [df](#df) | 查看文件系统的磁盘空间使用情况 |
| [du](#du) | 查看指定目录或文件的磁盘使用情况 |
| [lsblk](#lsblk) | 列出块设备，包括硬盘、分区和挂载点 |
| [blkid](#blkid) | 查看块设备的 UUID 和文件系统类型 |
| [lspci](#lspci) | 列出所有 PCI 设备 |
| [fdisk](#fdisk) | 管理磁盘分区 |
| [mkfs](#mkfs) | 创建文件系统 |
| [mount](#mount) | 挂载文件系统 |
| [umount](#umount) | 卸载文件系统 |
| [fsck](#fsck) | 检查和修复文件系统错误 |
| [sync](#sync) |  把内存的数据同步到磁盘 |

## 日志

| 命令 | 描述 |
| --- | --- |
| [dmesg](#dmesg) | 查看内核环缓冲区的消息 |
| [last](#last) | 显示用户的登录历史 |
| [lastb](#lastb) | 显示失败的登录尝试历史 |
| [lastlog](#lastlog) | 显示系统中所有用户的最后登录信 |
| [w](#w) | 显示当前登录用户及其活动状态 |
| [who](#who) | 查看当前登录的用户 |
| [users](#users) | 显示当前登录系统的用户列表 |
| [journalctl](#journalctl) | systemd日志管理 |

## 其他

| 命令 | 描述 |
| --- | --- |
| [date](#date) | 显示时间 |
| [cal](#cal) | 显示日历 |
| which | 显示输入的命令所在目录 |
| where | 显示输入的命令所在目录，目录是链接显示原始目录（这个命令好像只在的debian下才有） |
| whereis | 显示输入的命令所在目录、帮助文件目录等 |
| history | 历史命令 |
| [tee](#tee) | 从标准输入读取数据，并将其输出到标准输出和一个或多个文件中 |
| [xargs](#xargs) | 将标准输入的数据转换为命令行参数，并执行指定命令 |

---

## 命令说明

### ls

* `-a` - 显示所有文件，包括`.`和`..`
* `-A` - 显示所有文件，不包括`.`和`..`
* `-l` - 显示详细信息
* `-F` - 根据不同的文件格式添加`/`，`@`等后缀
* `--color` - 根据不同的文件格式显示不同颜色
* `--sort` - 根据文件属性排序：`size` `time` `version`等
* `--time` - 根据文件时间相关属性排序：`atime` `ctime`等

```bash
# 显示当前目录所有的文件和目录,包括隐藏的。
ls -a

# 以列表的方式显示信息
ls -l

# 以指定格式显示文件详细信息
ls -AlF --color

# 根据文件大小排序
ls -l --sort=size

# 根据文件上次访问时间排序
ls -l --time=atime
```

### tree

* `-d` - 只显示目录
* `-f` - 显示完整的相对路径
* `--gitfile=file` - 使用`.gitignore`文件对文件进行过滤

### stat

* `-f` - 跟随链接显示原始文件信息

### cd

```bash
# 切换到指定目录
cd <dir>

# 退回到上一级目录
cd ..

# 切换到该用户的家目录（直接使用`cd`不带参数也一样）
cd ~

# 切换到上次的目录
cd -
```

### mkdir

* `-p` - 创建目录时，如果父目录不存在则会先创建父目录
* `-v` - 创建目录时，显示详细信息

```bash
# 创建目录
mkdir <dirname>

# 创建多级目录
mkdir -p a/b/c/d/f/g
```

### cp

* `-r` - 如果复制的目录下面还有子文件或目录，则递归复制所有文件或目录
* `-f` - 如果复制的文件在目标地址已存在，则强制覆盖

```bash
# 复制a目录下的a.txt文件到当前目录下，并修改为b.txt
cp a/a.txt ./b.txt

# 将a目录下的所有文件都复制到当前目录下
cp a/* ./

# 递归复制整个目录
cp -r 原始目录 目标目录
```

### rm

* `-r` - 如果删除的目录下面还有子文件或目录，则递归删除所有文件或目录
* `-f` - 强制删除，不显示错误提示

```bash
# 递归删除文件夹
rm -r

# 强制删除，不提示
rm -f
```

### rmdir

* `-p` - 如果指定的目录有多级，则会删除所有
* `-v` - 显示详细信息

```bash
# 删除目录a/b/c，目录a/b，目录a
rmdir -p a/b/c
```

### mv

* `-f` - 不显示错误提示
* `-v` - 显示移动过程中的信息

```bash
# 将当前目录下的a.txt文件重命名为b.txt
mv ./a.txt ./b.txt
```

### ln

> 类似文件指针，和Windows下的快捷方式不同，和Windows下的`mklink`命令相同

#### 符号链接（软链接）/硬链接说明

* **符号链接（软链接）** - 可以链接目录，可以跨文件系统，原始文件删除时链接会失效，不会保留文件块
* **硬链接** - 只能链接文件，不能链接目录，不能跨文件系统，原始文件删除后链接仍然生效，因为硬链接会保留原始文件的文件块
* 推荐使用符号链接，更灵活

```bash
# 创建符号链接，不带`-s`参数则创建硬链接
ln -s 文件或目录 链接
```

---

### cat

* `-E` - 显示文件内的换行符号
* `-n` - 显示行号

```bash
# 显示文件内容
cat <filename>

# 显示行号
cat -n <filename>
```

### head

* `-c` - 显示前多少个字符
* `-n` - 显示前多少行内容

```bash
# 查看文件前20行内容
head -n 20 <filename>

# 查看文件前5个字符
head -c 5 <filename>
```

### tail

* `-c` - 显示后多少个字符
* `-n` - 显示后多少行内容
* `-f` - 阻塞终端实时显示文件尾部内容

```bash
# 查看文件后20行内容
tail -n 20 <filename>

# 实时显示文件尾部内容（ctrl+c退出）
tail -f <filename>
```

### find

```bash
# 显示指定目录下的所以文件和目录
find <dir>

# 在home目录下查找包含linux的文件或目录
find ~ -name '*linux*'

# 在当前目录下查找的文件大小大于10兆使用 `-`表示要查找的文件大小必须小于10m
find ~ -size +10m
```

### locate

> 使用前必须使用`updatedb`对当前文件系统创建一个文件索引，查找速度快

```bash
locate <content>
```

### grep

* `-i` - 搜索时忽略大小写
* `-v` - 显示不包含匹配项的所有行
* `-n` - 显示匹配内容在文件的行号
* `-E` - 支持正则表达式
* `-l` - 在多个文件内搜索时，只显示匹配到内容对应的文件名
* `-c` - 只显示匹配到的行数
* `--color` - 高亮显出匹配内容
* `-m [num]` - 在匹配到指定个数的搜索值后不进行搜索了
* `-A [num]` - 显示匹配行的前num行
* `-B [num]` - 显示匹配行的后num行
* `-C [num]` - 显示匹配行的前后num行
* `-r` - 递归搜索目录下的所有文件
* `--exclude` - 忽略指定文件

```bash
# 在a.txt文件内搜索包含abc字符串的行，并显示对应行号和前后3行内容
grep -in -C 3 --color 'abc' a.txt

# 搜索b.txt内所有不以abc字符串结尾的行
grep -vE 'abc$' b.txt

# 递归搜索当前目录下的所有包含abc字符串的文件，忽略log文件，只显示匹配的文件
grep -rl --exclude='*.log' 'abc' ./*
```

### awk

* `-F` - 指定字段分隔符
* `-v` - 传递Shell变量
* `-f` - 使用awk脚本文件

#### awk测试文件

```bash
tee users.txt <<eof
zs 20 1435123141234
ls 31 942109348430
ww 25 447934543523
zl 18 43543435345
eof
```

* 使用

```bash
# 只显示第一列和第三列
awk '{print $1, $3}' users.txt

# 第一列显示当前家目录
awk -v hm="$HOME" '{print hm, $1}' users.txt

# 将awk脚本写入文件内使用
echo "{print \$1, \$2}" > awk-script.awk
awk -f awk-script.awk users.txt

# 使用1作为字段分隔符
awk -F'1' '{print $1}' users.txt
```

#### 语法

* `awk 'pattern { action } file'`
* `pattern` - 用于匹配行
* `action` - 对匹配到的行进行的具体操作

```bash
# 只显示年龄大于20的用户
awk '$2 > 20{print $0}' users.txt

# 只显示第2条数据
awk 'NR == 2{print $0}' users.txt

# 搜索以z开头的数据处理
awk '/^z/{print $0}' users.txt
```

#### 字段和记录

* awk将每行文本所为记录，将每个单词（默认以空格分割）作为一个字段
* `$1`代表记录中的第一个字段，`$2`代表第二个，以此类推
* `$0`代表所有字段

#### 内置变量

* `NR` - 当前行号
* `NF` - 当前行的字段数量
* `FS` - 字段分隔符（默认是空格）
* `OFS` - 输出字符分隔符（默认是空格）
* `RS` - 记录分隔符（默认是换行符号）
* `ORS` - 输出记录分隔符（默认是换行符号）
* `FILENAME` - 当前处理的文件名
* `FNR` - 当前文件的行号
* `ENVIRON` - 一个数组，包含当前环境变量
* `ARGV` - 是一个数组，包含所有传递的参数
* `ARGC` - 传递给awk脚本的参数数量

```bash
# 显示行号和当前字段个数
awk '{print NR, $1, $2}' users.txt
awk '{print NR, NF, $1, $2}' users.txt

# 这种方式也可以修改字段分隔符
awk 'FS=1{print $1, $2}' users.txt

# 每个字段以，分割
awk 'OFS=","{print $1, $2}' users.txt

# 多个文件时可以显示对应的文件名
awk '{print FILENAME, $0}' filename1 filename2 ...

# 多个文件时区分各个文件的行号
# 在多个文件的情况下NR变量会将所有文件合并起来统一显示行号
# 而FNR只会显示这个记录在当前文件内的行号
awk '{print FNR, $0}' filename1 filename2 ...

# 显示环境变量
awk '{print ENVIRON["HOME"]}' users.txt

# 显示参数的个数，和具体的参数
awk '{print ARGC, ARGV[0], ARGV[1], ARGV[2]}' users.txt
```

#### 内置函数

##### 字符串

* `length(s)` - 返回字符串`s`的长度
* `substr(s, start, length)` - 返回字符串`s`从`start`开始的`length`个字符
* `index(s, t)` - 返回字符串`t`在字符串`s`中首次出现的位置（从 1 开始），未找到返回 0
* `toupper(s)` - 转换为大写
* `tolower(s)` - 转换为小写
* `gsub(regex, replacement, s)` - 在字符串`s`中，用`replacement`替换所有匹配`regex`的部分，返回替换的次数

```bash
awk '{print length($3)}' users.txt

awk '{print substr($3, 0, 3)}' users.txt

awk '{print toupper($1)}' users.txt
```

##### 数值

* `int(n)` - 返回数值`n`的整数部分
* `rand()` - 返回0到1之间的随机数
* `srand()` - 设置随机数生成器的种子，需要配合`rand()`使用
* `sqrt(n)` - 返回数值`n`的平方根
* `exp(n)` - 返回`e`的`n`次方
* `log(n)` - 返回数值 n 的自然对数

```bash
# 获取0~10之间的随机数
awk '{print int(rand() * 10)}' users.txt
```

##### 时间函数

* `systime()` - 返回当前的UNIX时间戳（自1970-01-01 00:00:00 UTC起的秒数）
* `strftime(format, timestamp)` - 将时间戳`timestamp`格式化为指定的字符串格式，`format`使用C语言的`strftime`函数的格式

```bash
awk '{print systime()}' users.txt

# 格式化时间
awk '{print strftime("%Y-%m-%d %H:%M:%S", systime())}' users.txt
```

##### 流程控制

* 和其他变量语言的流程控制语句类似，包含`if-elseif`，`for`，`while`，`do-while`
    * 其中可以使用`break`跳出当前循环，使用`continue`跳出当次循环

```bash
# 根据年龄判断新旧用户
awk '{ if($2 < 20)print $1, "new user"; else print $1, "old user" }' users.txt
```

#### BEGIN/END块

##### BEGIN

* BEGIN块中的代码在任何输入行被处理之前执行。通常用于初始化变量、设置输出格式或打印标题等

```bash
# 在处理前打印标题
awk 'BEGIN { print "Name Age Phone" } { print $1, $2, $3 }' users.txt
```
##### END

* END块中的代码在所有输入行处理完成后执行。通常用于输出总结、清理资源或打印最终结果

```bash
# 求和某age字段的数据
awk '{ total += $2 } END { print "Total:", total }' users.txt
```

### sed


```bash
TODO
```
---

### shutdown

```bash
# 立即关机
shutdown -h now

# 1分钟后会关机
shutdown -h 1

# 立即重启
shutdown -r now
```
---

### useradd

```bash
# 添加用户
useradd 用户名

# 添加用户并指定该用户的家目录地址
# 可以在/etc/skel目录下获取用户家目录模板文件
useradd -d 目录路径 用户名

# 添加用户并添加该用户到那个组内
useradd -g 组名 用户名
```

### userdel

```bash
# 删除用户
userdel 用户名

# 删除用户，并删除该用户的家目录
userdel -r 用户名
```

### usermod

```bash
# 修改用户组
usermod -g 组名 用户名

# 修改用户home目录
usermod -d 目录 用户名

# 指定用户的shell
usermod -s /bin/bash <username>
```

### su

> 登录时尽量少用root帐号登录，因为它是系统管理员，最大的权限，避免操作失误。可以利用普通用户登录，登录后再用`su 用户名`命令来切换成系统管理员身份，或者使用`sudo`以管理员权限执行相关命令

```bash
# 不带参数默认切换到root用户
# 切换到a用户
su a
```

### chmod

```bash
# 修改目录权限
chmod 700 <dir>

# 修改用户家目录
chmod -d <userhome> <username>
```

### chown

```bash
# 修改文件或目录的所属用户和组
chown -R <username>:<groupname>  <file>
```

---

### date

```bash
# 显示当前时间
date

# 格式化显示时间
date "+%Y-%m-%d %H:%M:%S"
```

### cal

```bash
# 显示当月日历
cal

# 显示2024年的日历
cal 2024
```
---

### gzip

```bash
# 压缩a.txt文件，会在当前目录下生成后的a.txt.gz覆盖掉a.txt文件
gzip a.txt

# 压缩a.txt文件，不覆盖原始文件
gzip -k a.txt

# 压缩a.txt文件，显示压缩时的信息
gzip -v a.txt
```

### gunzip

```bash
# 解压a.txt.gz文件，会在当前目录下生成后的a.txt覆盖掉a.txt.gz文件
gunzip a.txt.gz

# 解压a.txt.gz文件，不覆盖原始文件
gunzip -k a.txt.gz

# 解压a.txt.gz文件，显示解压时的信息
gunzip -v a.txt.gz
```

### bzip2

> 基础使用方法和[gzip](#gzip)一样，压缩文件以`bz2`结尾，相比`gzip`有更高的压缩率，但压缩速度相对较慢

### bunzip2

> 基础使用方法和[gunzip](#gunzip)一样

### xz

> 基础使用方法和[gzip](#gzip)一样，压缩文件以`xz`结尾，相比`gzip`和`bzip2`有更高的压缩率，但压缩速度相对较慢

### unxz

> 基础使用方法和[gunzip](#gunzip)一样

### tar

* 操作参数
    * `-c` 创建
    * `-r` 追加
    * `-t` 显示
    * `-u` 更新
    * `-x` 提取

* 参数选项
    * `-C` 指定解压目录
    * `-f` 后面接上压缩文件
    * `-z` 使用gzip命令算法
    * `-j` 使用bzip2命令算法
    * `-J` 使用xz命令算法
    * `-v` 操作时显示详细信息

* 打包、压缩

```bash
# 将a目录打包生成a.tar归档文件
tar -cvf a.tar a

# 将a目录打包并使用gzip命令算法压缩生成a.tar.gz文件
tar -czvf a.tar.gz a

# 将a目录打包并使用bzip2命令算法压缩生成a.tar.bz2文件
tar -cjvf a.tar.bz2 a

# 将a目录打包并使用xz命令算法压缩生成a.tar.xz文件
tar -cJvf a.tar.xz a
```

* 解压

```bash
# 将a.tar归档文件提取到~/Downloads目录下
tar -xvf a.tar -C ~/Downloads/

# 将a.tar.gz文件解压到~/Downloads目录下
tar -xzvf a.tar.gz -C ~/Downloads/

# 将a.tar.bz2文件解压到~/Downloads目录下
tar -xjvf a.tar.bz2 -C ~/Downloads/

# 将a.tar.xz文件解压到~/Downloads目录下
tar -xJvf a.tar.xz -C ~/Downloads/
```

* 显示

```bash
# a.tar.gz内目录结构
# ./a
# ├── 1.txt
# └── b
#     └── 2.txt

# 列出a.tar.gz压缩文件目录下的所有文件
tar -tf a.tar.gz

# 输出
# a/
# a/b/
# a/b/2.txt
# a/1.txt
```

* 提取

```bash
# a.tar.gz内目录结构
# ./a
# ├── 1.txt
# └── b
#     └── 2.txt

# 将a.tar.gz内的b目录下的2.txt文件单独提取出来
tar -xvf a.tar.gz a/b/2.txt

# 默认提取到当前目录下，提取后的目录结构
# ./a
# └── b
#     └── 2.txt

# 单独提取文件不支持-C参数指定提取到的目录，需要先进入到指定的目录再提取
```

* 追加

> 只能对归档文件进行操作，不能对压缩后的文件操作

```bash
# a.tar内目录结构
# ./a
# ├── 1.txt
# └── b
#     └── 2.txt

# 将3.txt追加到a.tar归档内
tar -rvf a.tar 3.txt

# 追加后的归档内容
# a/
# a/b/
# a/b/2.txt
# a/1.txt
# 3.txt

# 默认只能将将文件追加归档文件的根目录下，如果需要指定追加到归档文件的某个目录内需要提取后在操作
# 重复执行刚才的追加命令不会将归档内的3.txt文件覆盖

```

* 更新

> 和追加操作类似，不同的是更新会覆盖掉之前的文件

### zip

```bash
# 将a.txt压缩生成a.zip
zip a.zip a.txt

# 将a目录压缩生成a.zip文件
zip -r a.zip a
```

### unzip

```bash
# 将a.zip文件解压到~/Downloads目录下
unzip a.zip -d ~/Downloads

# 显示a.zip内的内容
unzip -l a.zip
```

### sudo

> 这个命令需要额外安装`apt install sudo`

* 让普通用户可以使用管理员权限执行指定的命令

```bash
# 创建用户文件
sudo touch /etc/sudoers.d/<username>

# 添加用户权限
echo "<username> ALL=(ALL) ALL" | sudo tee -a /etc/sudoers.d/<username>

# 安装软件
sudo apt install <softname>
```
