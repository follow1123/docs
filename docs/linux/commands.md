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
| tree | 使用树结构显示目录结构 |
| [stat](#stat) | 显示文件或目录的详细信息，包括权限、所有者和修改时间 |
| [cd](#cd) | 切换目录 |
| touch | 创建一个空文件 |
| [mkdir](#mkdir) | 创建目录 |
| [cp](#cp) | 拷贝 |
| [rm](#rm) | 删除文件或目录 |
| [mv](#mv) | 移动文件或目录 |
| [ln](#ln) | 文件链接 |
| rmdir | 删除空目录 |

## 文本处理

| 命令 | 描述 |
| --- | --- |
| [cat](#cat) | 显示文件内容 |
| more | 显示文件内容（上下移动查看，一页一页显示） |
| less | 显示文件内容（上下移动查看，一行一行显示） |
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

#### shutdown

```bash
# 立即关机
shutdown -h now

# 1分钟后会关机
shudown -h 1

# 立即重启
shutdown -r now
```
---

#### useradd

```bash
# 添加用户
useradd 用户名

# 添加用户并指定该用户的家目录地址
# 可以在/etc/skel目录下获取用户家目录模板文件
useradd -d 目录路径 用户名

# 添加用户并添加该用户到那个组内
useradd -g 组名 用户名
```

#### userdel

```bash
# 删除用户
userdel 用户名

# 删除用户，并删除该用户的家目录
userdel -r 用户名
```

#### usermod

```bash
# 修改用户组
usermod -g 组名 用户名

# 修改用户home目录
usermod -d 目录 用户名

# 指定用户的shell
usermod -s /bin/bash <username>
```

#### su

> 登录时尽量少用root帐号登录，因为它是系统管理员，最大的权限，避免操作失误。可以利用普通用户登录，登录后再用`su 用户名`命令来切换成系统管理员身份，或者使用`sudo`以管理员权限执行相关命令

```bash
# 不带参数默认切换到root用户
# 切换到a用户
su a
```

#### chmod

```bash
# 修改目录权限
chmod 700 <dir>

# 修改用户家目录
chmod -d <userhome> <username>
```

#### chown

```bash
# 修改文件或目录的所属用户和组
chown -R <username>:<groupname>  <file>
```

---

#### ls

```bash
# 显示当前目录所有的文件和目录,包括隐藏的。
ls -a

# 以列表的方式显示信息
ls -l
```

#### cd

```bash
# 切换到指定目录
cd 目录路径

# 退回到上一级目录
cd ..

# 切换到该用户的家目录（直接使用`cd`不带参数也一样）
cd ~
```

#### mkdir

```bash
# 创建目录
mkdir 目录名

# 创建多级目录
mkdir -p a/b/c/d/f/g
```

#### cp

```bash
# 复制a目录下的a.txt文件到当前目录下，并修改为b.txt
cp a/a.txt ./b.txt

# 将a目录下的所有文件都复制到当前目录下
cp a/* ./

# 递归复制整个目录
cp -r 原始目录 目标目录
```

#### rm

```bash
# 递归删除文件夹
rm -r

# 强制删除，不提示
rm -f
```

#### mv

> 基础操作和[cp](#cp)命令类似

```bash
# 将当前目录下的a.txt文件重命名为b.txt
mv ./a.txt ./b.txt
```

#### cat

```bash
# 显示文件内容
cat 文件名

# 显示行号
cat -n 文件名
```

#### head

```bash
# 查看文件前20行内容
head -n 20 文件
```

#### tail

```bash
# 查看文件后20行内容
tail -n 20 文件

# 实时显示文件尾部内容（ctrl+c退出）
tail -f 文件
```

#### ln

> 类似文件指针，和Windows下的快捷方式不同，和Windows下的`mklink`命令相同

* **符号链接（软链接）/硬链接说明**

* **符号链接（软链接）**： 可以链接目录，可以跨文件系统，原始文件删除时链接会失效，不会保留文件块
* **硬链接**：只能链接文件，不能链接目录，不能跨文件系统，原始文件删除后链接仍然生效，因为硬链接会保留原始文件的文件块
* 推荐使用符号链接，更灵活

```bash
# 创建符号链接，不带`-s`参数则创建硬链接
ln -s 文件或目录 链接
```
---

#### find

```bash
# 显示指定目录下的所以文件和目录
find 目录

# 在home目录下查找包含linux的文件或目录
find ~ -name '*linux*'

# 在当前目录下查找的文件大小大于10兆使用 `-`表示要查找的文件大小必须小于10m
find ~ -size +10m
```

#### locate

> 使用前必须使用`updatedb`对当前文件系统创建一个文件索引，查找速度快

```bash
locate 内容
```

#### grep

```bash
* grep 内容 文件

# 在a.txt内搜索包含linux文本的行
grep linux a.txt
```

#### awk

```bash
TODO
```

#### sed

```bash
TODO
```
---

#### date

```bash
# 显示当前时间
date

# 格式化显示时间
date "+%Y-%m-%d %H:%M:%S"
```

#### cal

```bash
# 显示当月日历
cal

# 显示2024年的日历
cal 2024
```
---

#### gzip

```bash
# 压缩a.txt文件，会在当前目录下生成后的a.txt.gz覆盖掉a.txt文件
gzip a.txt

# 压缩a.txt文件，不覆盖原始文件
gzip -k a.txt

# 压缩a.txt文件，显示压缩时的信息
gzip -v a.txt
```

#### gunzip

```bash
# 解压a.txt.gz文件，会在当前目录下生成后的a.txt覆盖掉a.txt.gz文件
gunzip a.txt.gz

# 解压a.txt.gz文件，不覆盖原始文件
gunzip -k a.txt.gz

# 解压a.txt.gz文件，显示解压时的信息
gunzip -v a.txt.gz
```

#### bzip2

> 基础使用方法和[gzip](#gzip)一样，压缩文件以`bz2`结尾，相比`gzip`有更高的压缩率，但压缩速度相对较慢

#### bunzip2

> 基础使用方法和[gunzip](#gunzip)一样

#### xz

> 基础使用方法和[gzip](#gzip)一样，压缩文件以`xz`结尾，相比`gzip`和`bzip2`有更高的压缩率，但压缩速度相对较慢

#### unxz

> 基础使用方法和[gunzip](#gunzip)一样

#### tar

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

#### zip

```bash
# 将a.txt压缩生成a.zip
zip a.zip a.txt

# 将a目录压缩生成a.zip文件
zip -r a.zip a
```

#### unzip

```bash
# 将a.zip文件解压到~/Downloads目录下
unzip a.zip -d ~/Downloads

# 显示a.zip内的内容
unzip -l a.zip
```

#### sudo

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
