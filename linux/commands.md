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
| [route](#route) | 路由 |
| [arp](#arp) | 查看和管理 ARP 缓存 |
| [firewall-cmd](#firewall-cmd) | 用于管理 firewalld 防火墙服务 |
| [wget](#wget) | 从网络下载文件 |

## 用户/组/权限

| 命令 | 描述 |
| --- | --- |
| id | 查看用户信息 |
| whoami | 查看当前是那个用户登录 |
| [who](#who) | 查看当前登录的用户 |
| [w](#w) | 显示当前登录用户及其活动状态 |
| users | 显示当前登录系统的所有用户 |
| [useradd](#useradd) | 添加用户 |
| [userdel](#userdel) | 删除用户 |
| [usermod](#usermod) | 修改用户信息 |
| [gpasswd](#gpasswd) | 修改用户的组信息 |
| passwd | 修改密码 |
| [chage](#chage) | 更改用户密码的过期信息 |
| [su](#su) | 切换用户 |
| groups | 显示当前用户再那些组下 |
| [groupadd](#groupadd) | 新增组 |
| [groupmod](#groupmod) | 修改组 |
| [groupdel](#groupdel) | 删除组 |
| [chmod](#chmod) | 更改文件或目录的权限 |
| [chown](#chown) | 更改文件或目录的所有者 |
| [chgrp](#chgrp) | 更改文件或目录的所属组 |
| [sudo](#sudo) | 以指定用户执行命令 |

## 系统

| 命令 | 描述 |
| --- | --- |
| halt | 强制关机 |
| poweroff | 关机 |
| reboot | 重启 |
| [shutdown](#shutdown) | 关机/重启 |
| logout | 注销用户 |
| [hostname](#hostname) | 查看或设置主机名 |
| [uptime](#uptime) | 查看系统运行时间和负载 |
| [uname](#uname) | 显示系统信息 |
| [lsb_release](#lsb_release) | 查看 Linux 发行版信息 |

## 定时任务

| 命令 | 描述 |
| --- | --- |
| [crontab](#crontab) | 设置定期执行的任务 |
| [at](#at) | 一次性执行任务 |
| [systemd-timer](#systemd-timer) | systemd配置定时任务 |

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

#### 选项

* `-n` - 禁止输出模式空间内容，通常与`p`命令结合使用来打印特定行
* `-e` - 允许同时输入多个脚本命令
* `-f` - 从文件中读取sed脚本
* `-i` - 直接在输入文件中进行替换（编辑原文件）

#### 命令

* `i` - 插入
* `a` - 追加
* `d` - 删除
* `s` - 替换
* `p` - 打印

```bash
# 测试文件
tee users.txt <<eof
zs 20 1435123141234
ls 31 942109348430
ww 25 447934543523
zl 18 43543435345
eof

# 在第二行插入一条新数据
sed '2i\zs1 21 342543523' users.txt

# 在第一行的后面添加test文本
sed '1a\test' users.txt

# 删除第3行数据
sed '3d' users.txt

# 修改第2行数据的名字
sed 's/ls/lisi/g' users.txt

# 只打印第3行数据，需要配合-n使用
sed -n '3p' users.txt

# 修改第一行数据的名字，配合-i选项直接修改原文件
sed -i 's/zs/zhangsan/g' users.txt

# 删除第2到4行
sed '2,4d' users.txt

# 删除第一行并修改ww的名字，一个命令要执行多个操作可以使用-e选项
sed -e '1d' -e 's/ww/wangwu/g' users.txt

# 删除以z开头的行
sed '/^z/d' users.txt
```

### sort

* `-n` - 按数字排序
* `-r` - 逆序排序
* `-u` - 只输出唯一的行

```bash
# 按数字排序，只是对比每行第一列的字符，不会完全对比数字
sort -n <filename>

# 按数字排序，降序排序
sort -nr <filename>

# 输出所有唯一的行
sort -u <filename>
```

### uniq

> 常与`sort`命令结合使用，因为`uniq`只会删除相邻的重复行，单独使用`uniq`时要保证文件是有序的

* `-c` - 计数每个唯一行的出现次数，并在前面显示该计数
* `-d` - 只显示重复的行
* `-u` - 只输出唯一的行
* `-i` - 忽略大小写进行比较

```bash
# 统计文件内重复行的数量，文件必须有序
uniq -c <filename>

# 忽略大小写匹配行，并只显示重复的行
uniq -id <filename>
```

### wc

* `-l` - 统计行
* `-w` - 统计word
* `-c` - 统计字节（byte）
* `-m` - 统计字符（char）
* `-L` - 显示最长的行的长度

### paste

* `-d` - 指定分隔符，默认为制表符（`\t`）

```bash
# 准备两个文件
tee a.txt <<eof
a
b
c
eof

tee b.txt <<eof
1
2
3
eof

# 合并两个文件
paste -d ',' a.txt b.txt
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
---

### ps

* `ps -ef` - 标准风格显示
* `ps axu` - BSD风格显示
* `ps axjf` - 树形结构显示

#### 字段说明

##### `ps -ef`

* `UID` - 用户id
* `PID` - 进程id
* `PPID` - 父进程id
* `C` - CPU使用率
* `STIME` - 进程启动的时间，`时:分`
* `TTY` - 终端名称
* `TIME` - 该进程占用CPU累计的总时间
* `CMD` - 启动进程的命令和参数

##### `ps axu`

* `USER` - 用户id
* `PID` - 进程id
* `%CPU` - CPU使用率
* `%MEM` - 进程占用物理内存的百分比
* `VSZ` - 进程占用的虚拟内存大小(单位:KB)
* `RSS` - 进程占用的物理内存大小(单位:KB )
* `TTY` - 终端名称,缩写．
* `STAT` - 进程状态
    * `D` - 不可中断睡眠（通常为 IO）
    * `I` - 空闲内核线程
    * `R` - 正在运行或可运行（在运行队列中）
    * `S` - 可中断睡眠（等待事件完成）
    * `T` - 由作业控制信号停止
    * `t` - 在跟踪期间由调试器停止
    * `W` - 分页（自 2.6.xx 内核起无效）
    * `X` - 已死（永远不应出现）
    * `Z` - 已停止（"僵尸"）进程，已终止但未被其父进程收割
    * BSD风格额外信息：
        * `<` - 高优先级（对其他用户不好）
        * `N` - 低优先级（对其他用户好）
        * `L` - 将页面锁定在内存中（用于实时和自定义 IO）
        * `s` - 是会话领导者
        * `l` - 是多线程的（使用 CLONE_THREAD，就像 NPTL pthreads 一样）
        * `+` - 位于前台进程组中
* `STARTED` - 进程启动的时间，`时:分`
* `TIME` - 该进程占用CPU累计的总时间
* `COMMAND` - 启动进程的命令和参数

##### `ps axjf`

* `PPID` - 父进程id
* `PID` - 进程id
* `PGID` - 进程组id，标识进程所属的进程组
* `SID` - 会话id，标识进程所属的会话
* `TTY` - 终端名称,缩写．
* `TPGID` - 终端进程组id，标识当前终端的前台进程组
* `STAT` - 进程状态
* `UID` - 用户id
* `TIME` - 该进程占用CPU累计的总时间
* `COMMAND` - 启动进程的命令和参数

#### 常用命令

```bash
# 查询指定进程id的进程信息
ps <pid>

# 查询指定命令的进程信息
ps -C <cmd>

# 查询指定用户的进程信息
ps -u <username>

# 查询指定组的进程信息
ps -g <groupname>

# 查看指定进程下的所有子进程
ps --ppid <parentpid>
```

### top

> 一个交互式命令

#### 界面说明

##### 顶部信息（第一行）

* 当前系统时间
* 系统运行时间
* 登录用户数
* 负载平均值
    * 过去1分钟、5 分钟和15分钟的平均负载

##### 任务信息（第二行）

* 进程总数
* 运行状态
* 休眠状态
* 停止状态
* 僵尸进程

##### CPU使用情况（第三行）

* `us` -  用户空间占用的CPU百分比
* `sy` -  内核空间占用的CPU 百分比
* `ni` -  用户进程的优先级调整所占用的CPU百分比
* `id` -  空闲CPU百分比
* `wa` -  等待I/O操作所占用的CPU百分比
* `hi` -  硬件中断处理时间
* `si` -  软件中断处理时间
* `st` -  在虚拟化环境中，CPU 被其他虚拟机使用的时间

##### 内存和交换区信息（第四、五行）

* 总内存
* 空闲内存
* 已用内存
* 缓存

##### 进程列表

* `PID` - 进程ID
* `USER` - 进程所有者的用户名
* `PR` - 进程的优先级
* `NI` - 进程的nice值，影响优先级
* `VIRT` - 进程使用的虚拟内存总量
* `RES` - 进程使用的实际物理内存量
* `SHR` - 进程使用的共享内存量
* `S` - 进程状态（如 R: 运行, S: 睡眠, Z: 僵尸等）
* `%CPU` - 进程占用的CPU百分比
* `%MEM` - 进程占用的内存百分比
* `TIME+` - 进程使用的CPU时间总和
* `COMMAND` - 运行的命令或进程名称

#### 快捷键

* `q` - 退出
* `?/h` - 显示帮助信息
* `E` - 修改第四、五行内存单位
* `e` - 修改进程列表处的单位
* `l` - 显示或隐藏第一行信息
* `t` - 显示、隐藏或修改CPU信息样式
* `m` - 显示、隐藏或修改内存交换区信息样式
* `1` - 显示所有CPU线程信息
* `L` - 搜索进程信息
* `c` - `COMMAND`列显示详细命令
* `i` - 显示空间进程
* `u` - 输入用户名搜索进程
* `V` - 以树结构显示进程列表
* `d` - 修改更新间隔
* `k` - 给指定进程发送信号（默认sigterm）

#### 常用命令

```bash
# 只显示指定用户的进程信息
top -u <username>

# 设置信息更新间隔
top -d <seconds>
```

### kill

* `-l` - 列出所有信号
* `-s <signal>` - 指定发送的信号

```bash
# 终止进程，默认是发送的SIGTERM(15)信号
kill <pid>

# 强制终止进程，发送的SIGKILL(9)信号
kill -9 <pid>

# 和上面一样
kill -s SIGKILL <pid>

# 显示所有可以发送的信号
kill -l
```

#### 信号

| 信号名称 |  信号编号 |  描述 |
| --- | --- | --- |
| `SIGHUP`    | 1 | 挂起信号，通常用于通知进程重新加载配置 |
| `SIGINT`    | 2 | 中断信号，通常由用户按<kbd>Ctrl</kbd>+<kbd>c</kbd>发送 |
| `SIGQUIT`   | 3 | 退出信号，通常由用户按<kbd>Ctrl</kbd>+<kbd>{'\\'}</kbd>发送 |
| `SIGILL`    | 4 | 非法指令信号，程序执行了非法操作 |
| `SIGTRAP`   | 5 | 调试信号，通常用于断点调试 |
| `SIGABRT`   | 6 | 中止信号，由`abort()`函数发送 |
| `SIGBUS`    | 7 | 总线错误信号，通常由于内存访问错误引起 |
| `SIGFPE`    | 8 | 算术错误信号（如除零错误） |
| `SIGKILL`   | 9 | 强制终止信号，无法被捕获或忽略 |
| `SIGUSR1`   | 10    | 用户定义信号 1，用户可以自定义用途 |
| `SIGSEGV`   | 11    | 段错误信号，通常由于无效内存访问引起 |
| `SIGUSR2`   | 12    | 用户定义信号 2，用户可以自定义用途 |
| `SIGPIPE`   | 13    | 管道破裂信号，尝试写入已关闭的管道 |
| `SIGALRM`   | 14    | 定时器到期信号，通常用于定时操作 |
| `SIGTERM`   | 15    | 请求终止信号，允许进程优雅地关闭 |
| `SIGSTKFLT` | 16    | 堆栈错误信号 |
| `SIGCHLD`   | 17    | 子进程停止或退出信号 |
| `SIGCONT`   | 18    | 继续执行信号，恢复被暂停的进程 |
| `SIGSTOP`   | 19    | 暂停信号，无法被捕获或忽略 |
| `SIGTSTP`   | 20    | 终端停止信号，通常由用户按<kbd>Ctrl</kbd>+<kbd>Z</kbd>发送 |
| `SIGTTIN`   | 21    | 后台进程尝试读取终端信号 |
| `SIGTTOU`   | 22    | 后台进程尝试写入终端信号 |
| `SIGBUS`    | 23    | 错误信号，通常由于访问无效内存引起 |
| `SIGPOLL`   | 24    | 轮询信号，通常用于文件描述符 |
| `SIGPROF`   | 25    | 进程的统计信息到达 |
| `SIGSYS`    | 26    | 无效系统调用信号 |
| `SIGUNUSED` | 27    | 未使用的信号 |


### pkill

* 指定进程名称发送终止信号

```bash
# 发送终止信号到指定名称的进程
pkill <pname>

# 指定父进程id发送终止信号到其下得所有子进程
pkill -P <ppid>
```

### systemctl

* 参考[systemctl](./systemd#服务)

### service

```bash
# 启动服务
service <servicename> start

# 重启服务
service <servicename> restart

# 查看服务状态
service <servicename> status

# 重新加载服务配置文件
service <servicename> reload

# 停止服务
service <servicename> stop
```

---

### ping

* `-c` - 指定发送请求次数
* `-i` - 指定发送请求时间间隔
* `-s` - 指定发送得数据包大小
* `-4/-6` - 指定IPV4或IPV6

```bash
# 测试ip或主机是否可以访问
ping <ip>

# 测试ip或主机是否可以访问，指定请求次数
ping -c 4 <ip>
```

### ifconfig

```bash
# 查看所有网络接口信息
ifconfig

# 查看指定接口信息
ifconfig <interfacename>

# 启用接口
ifconfig <interfacename> up

# 禁用接口
ifconfig <interfacename> down
```

### ip

#### 网络接口

```bash
# 查看所有网络接口
ip link

# 启用
ip link set <interfacename> up

# 禁用
ip link set <interfacename> down
```

#### IP地址

* `ip addr` - 查看所有ip地址信息

#### 路由

* `ip route` - 查看路由信息

#### 策略路由

* `ip rule` - 查看路由规则信息


### netstat

* `-a` - 显示所有连接信息
* `-l` - 只显正在监听的服务
* `-n` - 以数字形式显示地址和端口号，不解析域名

#### 字段说明

* **Proto** - 协议类型（TCP/UDP）
* **Recv-Q** - 接收队列中未处理的数据字节数
* **Send-Q** - 发送队列中等待发送的数据字节数
* **Local Address** - 本地地址和端口
* **Foreign Address** - 远程地址和端口
* **State** - 连接状态（如ESTABLISHED、LISTEN、CLOSE_WAIT等）


```bash
# 查看详细信息
netstat -ano
```

### ss

* `-a` - 显示所有连接信息
* `-l` - 只显正在监听的服务
* `-n` - 以数字形式显示地址和端口号，不解析域名
* `-4/-6` - 分别显示IPv4或IPv6的套接字信息

### route

```bash
# 以数字形式显示地址和端口号的路由信息
route -n
```

### arp

* `-a` - 显示所有缓存信息
* `-n` - 以数字形式显示地址和端口号，不解析域名

#### 字段说明

* **Address** - 表示设备的IP地址（IPv4地址），这是ARP缓存中记录的网络地址
* **HWtype** - 表示硬件类型，通常为ether，表示以太网。此字段指示所使用的网络协议类型
* **HWaddress** - 表示设备的MAC地址，这是通过ARP协议解析得来的物理地址。它以六个两位十六进制数字的形式显示，例如00:1A:2B:3C:4D:5E
* **Flags** - 表示ARP条目的状态标志。常见标志包括：
    * **C** - 示此条目是缓存条目（即已存储的ARP条目）
    * **M** - 示此条目是手动设置的条目
* **Mask** - 表示网络掩码，通常在使用ARP的上下文中不常用，但如果存在，可能会指示该条目所属的子网掩码

### firewall-cmd

> 可能需要手动安装sudo apt install firewalld

* `--state` - 显示firewalld的当前状态
* `--list-all` - 列出当前区域的所有设置
* `--add-port=<port>/[protocol]` - 开放指定端口
* `--remove-port=<port>/[protocol]` - 关闭指定端口
* `--permanent` - 使更改永久生效，防止在防火墙重启时丢失
* `--reload` - 重新加载防火墙配置，使永久更改生效
* `--query-port=<port>/[protocol]` - 查询指定端口是否开放

```bash
# 开放22端口流程

# 查询22端口是否开放
firewall-cmd --query-port=22/tcp

# 如果不存在则添加
firewall-cmd --permanent --add-port=22/tcp

# 重新加载配置
firewall-cmd --reload

# 再次查询
firewall-cmd --query-port=22/tcp
```

### wget

* `-O` - 指定下载文件的名称
* `-P` - 指定下载文件保存的目录
* `-q` - 不显示输出信息
* `--limit-rate=<rate>` - 下载限速，单位k、m等
* `-b` - 后台下载，日志文件在当前目录`wget-log`文件

```bash
# 下载文件
wget <url> -O <filename>

# 将下载速度限制在100k/s
wget --limit-rate=100k <url>
```

---

### who

* `-a` - 显示所有信息，包括用户的登录时间、活动状态等
* `-b` - 显示系统上次重启的时间
* `-m` - 仅显示当前终端的用户
* `-q` - 只显示用户的名字和数量
* `-H` - 在输出中显示列标题

### w

#### 字段说明

* **USER** - 用户名
* **TTY** - 终端
* **FROM** - 用户登录的主机
* **LOGIN** - ：登录时间
* **IDLE** - 用户在当前会话中空闲的时间
* **JCPU** - 用户在该终端上运行的所有进程的 CPU 时间
* **PCPU** - 当前进程的 CPU 时间
* **WHAT** - 当前正在执行的命令

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

# 添加用户到多个组
usermod -aG <groupname> <username>
```

### gpasswd

```bash
# 将用户从指定组内移除
gpasswd -d <username> <groupname>
```

### chage

* `-l` - 列出指定用户的密码过期信息
* `-m <days>` - 设置用户密码的最小使用天数（密码在这段时间内无法更改）
* `-M <days>` - 设置用户密码的最大有效天数（超过此天数需要更改密码）
* `-I <days>` - 设置密码过期后，用户在此天数内未使用账户将被锁定
* `-E <date>` - 设置用户账户的到期日期（格式为YYYY-MM-DD）
* `-W <days>` - 设置在密码到期前的警告天数（用户在此期间会收到通知）

```bash
# 查看指定用户密码过期信息
chage -l <username>

# 指定用户的密码30天后过期
chage -M 30 <username>
```

### su

> 登录时尽量少用root帐号登录，因为它是系统管理员，最大的权限，避免操作失误。可以利用普通用户登录，登录后再用`su 用户名`命令来切换成系统管理员身份，或者使用`sudo`以管理员权限执行相关命令

```bash
# 不带参数默认切换到root用户
# 切换到a用户
su a
```

### groupadd

```bash
# 创建一个新组
groupadd <groupname>

# 创建一个新组，并指定组id
groupadd -g <groupid> <groupname>

# 强制创建一个新组
groupadd -f <groupname>
```

### groupmod

```bash
# 修改组名称
groupmod -n <newgroupname> <groupname>

# 修改组id
groupmod -g <groupid> <groupname>
```

### groupdel

```bash
# 删除指定的组
groupdel <groupname>
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
# 修改指定文件的所属用户
chown <username> <filename>

# 递归修改指定目录及其下面的所有文件和目录的所属用户和组
chown -R <username>:<groupname> <dir>
```

### chgrp

* `-R` - 递归修改
* `-v` - 显示修改的详细信息

```bash
# 修改文件所属组
chgrp <groupname> <filename>

# 递归修改指定目录及其下面的所有文件和目录的组，并显示详细信息
chgrp -R -v <groupname> <dir>
```

### sudo

> 这个命令可能需要额外安装`sudo apt install sudo`

* `-l` - 查看当前用户可以使用的权限
* `-k` - 时当前会话的密码过期
* `-u <username>` - 以指定用户的身份指定命令

```bash
# 查看当前用户可以使用的权限
sudo -l

# 以指定用户指定ping命令
sudo -u <username> /bin/ping

# 使用管理员权限执行指定命令
sudo /bin/ls /root
```

#### `/etc/sudoers`文件

* 使用`visudo`命令直接打开并编辑这个文件
* 配置用户权限
* 用户权限配置：`username ALL(ALL:ALL) ALL`，用户可以在**任意主机**用**任意用户:组**的身份执行**任意命令**
    * 第一个ALL表示主机
    * 第二个ALL表示用户
    * 第三个ALL表示组
    * 最后一个ALL表示命令，多个以`,`分割
* 组权限配置：`%groupname ALL(ALL:ALL) ALL`
* 一般在`/etc/sudoers.d`目录下创建对应用户名称的文件并配置权限

```bash
# 创建用户文件
sudo touch /etc/sudoers.d/<username>

# 添加用户权限
echo "<username> ALL=(ALL) ALL" | sudo tee -a /etc/sudoers.d/<username>

# 安装软件
sudo apt install <softname>
```

---

### shutdown

> 可以代替`halt` `reboot` `poweroff`命令

* `-H` - 类似`halt`命令，强制关机
* `-P` - 类似`poweroff`命令，安全的关机（默认行为）
* `-r` - 重启
* `--show` - 显示关机任务
* `-c` - 取消关机任务

```bash
# 立即关机
shutdown now

# 1分钟后会关机
shutdown 1

# 立即重启
shutdown -r now
```

### hostname

* `-i` - 查看当前主机的IP地址，一般是loopback
* `-I` - 查看当前主机的IP地址

### uptime

* 参考`top`命令的[第一行信息](#顶部信息第一行)


### uname

* `-a` - 显示所有可用的信息，包括操作系统名称、主机名、内核版本、发布日期、处理器架构等
* `-s` - 显示操作系统名称（默认）
* `-n` - 显示网络节点的主机名
* `-r` - 显示内核版本
* `-v` - 显示内核版本的发布日期
* `-m` - 显示机器硬件名称（架构）
* `-p` - 显示处理器架构（如果可用）
* `-i` - 显示硬件平台（如果可用）
* `-o` - 显示操作系统名称（通常是 GNU/Linux）


### lsb_release

* `-a` - 显示所有可用的信息，包括发行版名称、版本号、代号和描述
* `-d` - 仅显示发行版的描述
* `-r` - 仅显示发行版的版本号
* `-c` - 仅显示发行版的代号

---

### crontab

* `-e` - 编辑当前用户的crontab文件
* `-l` - 列出当前用户的crontab内容
* `-r` - 删除当前用户的crontab文件

#### cron表达式

* cron表达式由5个特殊符号组成

##### 位置说明

| 位置    | 含义    | 范围    |
|---------------- | --------------- | --------------- |
| 第一位    | 一小时当中的第几分钟    | 0~59    |
| 第二位    | 一天当中的第几小时    | 0~23    |
| 第三位 | 一个月当中的第几天 | 1~31 |
| 第四位 | 一年当中的第几月 | 1~12 |
| 第五位 | 一周当中的星期几 | 0~7（0和7都代表星期日）|

##### 占位符说明

| 符号   | 含义    |
|--------------- | --------------- |
| `*`   | 任何时间。比如第一个`*`就代表一小时中的每分钟都执行一次   |
| `,` | 不连续的时间。比如`0 8,12,16 * * * command`，就代表在每天的8点，12点，16点都执行一次 |
| `-` | 连续的时间范围。比如`0 5 * * 1-6 command`，代表周一到周六的5点0分执行 |
| `*/n` | 每隔多久执行一次。比如`*/10 * * * * command`，代表每隔10分钟就执行一次 |

#### 常见定时任务

| 时间   | 含义    |
|--------------- | --------------- |
| `45 22 * * * command`   | 在22点45分执行   |
| `0 17 * * 1 command` | 每周一的17点0分执行 |
| `0 5 1,15 * * command` | 每月1号到15号的5点0分执行 |
| `40 4 * * 1-5 command` | 每周一到周五的4点40分执行 |
| `*/10 4 * * * command` | 每天4点，每隔10分钟执行一次 |
| `0 0 1,15 * 1 command` | 每月1号到15号，每周1的0点0分执行 |

* 创建定时任务流程

```bash
# 编辑crontab文件，此时会进入指定的编辑器
# 输入0 0 1,15 * 1 command后保存退出
crontab -e

# 查看定时任务是否添加成功
crontab -l
```

### at

> 这个命令可能需要额外安装`sudo apt install at`，并保证`atd`后台服务已启动<br></br>
> 由于at是每60秒扫描一次任务，所以执行时机可能有出入

* `-f FILE` - 从指定的文件读取命令
* `-l` - 列出当前用户的所有计划任务
* `-r` - 删除指定的任务

#### 时间格式

* `now + 5 minutes` - 在当前时间后 5 分钟
* `1:00 PM` - 指定具体时间
* `today` - 今天
* `tomorrow` - 明天
* `Dec 25 10:00` - 指定日期和时间


```bash
# 1分钟后执行指定的脚本
at now+1minutes -f <scriptfile>

# 明天执行指定的脚本
at tomorrow -f <scriptfile>
```

### systemd-timer

* TODO

---

### df

* `-h` - 以人类可读的格式显示（例如，以 KB、MB、GB 为单位）
* `-a` - 包括所有文件系统，包括大小为 0 的文件系统
* `-T` - 显示文件系统类型
* `-i` - 显示 inode 使用情况，而不是磁盘空间
* `--total` - 显示所有文件系统的总计

```bash
# 以可读的方式显示所有文件系统信息
df -h

# 显示home目录的文件系统信息
df -h /home
```

### du

* `-h` - 以人类可读的格式显示（例如，以 KB、MB、GB 为单位）
* `-s` - 仅显示总计，不递归显示每个子目录
* `-c` - 显示总计
* `--max-depth=N` - 限制显示的子目录层级，N 为深度

```bash
# 显示home目录下所有文件的磁盘占用情况
du -h /home

# 显示home目录下深度3层的所有文件信息，并统计
du -hc --max-depth=3 /home
```

### lsblk

* `-a` - 显示所有设备，包括未挂载的设备
* `-f` - 显示文件系统类型和UUID等信息
* `-l` - 以列表形式显示输出
* `-p` - 显示完整的设备路径

### blkid

* `-o` - 指定输出格式，常见的选项有value、udev和full
* `-s` - 指定要显示的属性，例如UUID、LABEL等
* `-c` - 指定一个缓存文件，以避免频繁访问设备
* `-p` - 在查找设备之前查看设备的状态

### lspci

* `-v` - 显示详细信息
* `-vv` - 显示更详细的信息
* `-s` - 只显示特定设备的信息，例如 lspci -s 00:1f.2
* `-n` - 以数字格式显示设备 ID，而不是名称
* `-k` - 显示设备驱动程序信息
* `-t` - 以树形结构显示设备关系

### fdisk

* TODO

### mkfs

* `-t FSTYPE` - 指定文件系统类型，例如 ext4、xfs、vfat 等
* `-n` - 不执行格式化，只显示所需的操作

```bash
# 将指定磁盘格式化为ext4文件系统
mkfs -t ext4 /dev/<devname>
```

### mount

* `-t FSTYPE` - 指定文件系统类型（如 ext4、xfs、ntfs 等）
* `-o OPTIONS` - 指定挂载选项，例如 ro（只读）、rw（读写）、noexec（禁止执行文件）
* `-v` - 显示详细输出

```bash
# 将某个设备挂载到指定路径下
mount /dev/<devname> <dir>

# 将某个设备挂载到指定路径下，并指定ext4文件系统
mount -t ext4 /dev/<devname> <dir>
```

### umount

* `-a` - 卸载`/etc/mtab`中列出的所有文件系统
* `-r` - 在卸载失败时，尝试以只读方式卸载
* `-l` - 懒惰卸载，即在文件系统不再被使用后再真正卸载
* `-f` - 强制卸载，即使设备处于忙碌状态

```bash
# 卸载指定目录
umount <dir>
```

### fsck

* `-a` - 自动修复文件系统中的错误（可能会忽略一些问题）
* `-y` - 对所有问题自动回答“是”，进行修复
* `-n` - 不进行修复，只显示问题
* `-t` - 指定检查的文件系统类型（如 ext4、xfs 等）
* `-f` - 强制检查，即使文件系统看起来是干净的

```bash
# 检查指定磁盘设备
fsck /dev/<devname>
```

### sync

* 通常在关机或卸载文件系统前执行，用于保存数据都被写入

---

### dmesg

* `-f` - 显示特定类型的日志
    * `kern` - kernel messages
    * `user` - random user-level messages
    * `mail` - mail system
    * `daemon` - system daemons
    * `auth` - security/authorization messages
    * `syslog` - messages generated internally by syslogd
    * `lpr` - line printer subsystem
    * `news` - network news subsystem
* `-l` - 显示指定级别的日志
    * `emerg` - system is unusable
    * `alert` - action must be taken immediately
    * `crit` - critical conditions
    * `err` - error conditions
    * `warn` - warning conditions
    * `notice` - normal but significant condition
    * `info` - informational
    * `debug` - debug-level messages
* `-u` - 只显用户空间的日志
* `-T` - 将时间戳转换为可读格式
* `-J` - 输出json格式信息
* `--help` - 显示详细帮助

```bash
# 只显示错误日志，并将日志转换为可读
dmesg -T -l err

# 只显示邮件相关信息
dmesg -f mail
```

### last

* `-a` - 显示最后登录的主机名
* `-n N` - 显示最近 N 条记录
* `-x` - 显示系统重启和运行级别变化的信息
* `-R` - 不显示主机名
* `-F` - 显示完整的时间信息，包括日期和时间

```bash
# 显示最后10条登录信息
last -F -n 10
```

### lastb

* 选项参数和[last](#last)类似，只显示失败的登录记录，需要管理员权限执行


### lastlog

* `-u USER` - 显示特定用户的最后登录信息
* `-t DAYS` - 显示在指定天数内登录的用户信息

```bash
# 查看系统内所有用户的登录记录
lastlog

# 查看10天内登录系统的用户
lastlog -t 10
```

### journalctl

* 参考[systemctl](./systemd#日志)

---

### date

```bash
# 显示当前时间
date

# 格式化显示时间
date "+%Y-%m-%d %H:%M:%S"

# 显示UTC时间
date -u
```

### cal

> 可能需要手动安装sudo apt install bsdmainutils

```bash
# 显示当月日历
cal

# 显示2024年的日历
cal 2024
```

### tee

* `-a` - 追加文件

```bash
# 将文本打印到终端并且写入到a.txt文件内
echo 'this is line' | tee a.txt

# 将所有进程信息保存到b.txt文件内并过滤指定服务打印到终端
ps -ef | tee b.txt | grep <servicename>

# 将文件追加到root目录下的c.txt文件内
echo 111 | tee -a /root/c.txt
```

### xargs

* `-n N` - 每次调用命令时传递N个参数
* `-d DELIMITER` - 指定输入项的使用指定分隔符（默认是空格或换行）

```bash
# 显示当前目录下所有txt文件的内容
ls *.txt | xargs cat

# 依次输出1到4
echo "1,2,3,4" | xargs -d "," -n 1 echo
```
