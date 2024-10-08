---
sidebar_position: 5
---

# Linux

## 组管理和权限管理

### 用户和组相关文件

* /etc/passwd文件
    * 用户( user)的配置文件，记录用户的各种信息
    * 每行的含义∶用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell
* /etc/shadow文件
    * 口令的配置文件
    * 每行的含义:登录名:加密口令:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志
* /etc/group文件
    * 组(group)的配置文件，记录Linux包含的组的信息每行含义∶组名:口令:组标识号:组内用户列表
* 在linux中的每个用户必须属于一个组，不能独立于组外。在linux中每个文件有所有者、所在组、其它组的概念。
    1. 所有者
    2. 所在组
    3. 其他组
    4. 改变用户所在组

### 文件目录所有者

* 一般为文件的创建者，创建了该文件
* 查看文件所有者
    * `ls -ahl`或`ll -ah`
* 修改文件所有者
    * `chown 用户名 文件名`
    * `chown 用户名:组名 文件名`这条命令可以连组名一起修改
* 修改所在组
    * `chgrp 组名 文件名`

### 权限

* 使用`ls -l`显示当前目录下的文件时，可用看到前面几位由`r`、`w`、`x`、`-`等符号组成的部分就是这个文件的权限

#### 0~9位说明

* 第0位确定文件类型（d, -,l,c,b）
    * I是链接,相当于windows的快捷方式
    * d是目录，相当于windows的文件夹
    * c是字符设备文件，鼠标，键盘
    * b是块设备，比如硬盘
* 第1-3位确定所有者（该文件的所有者）拥有该文件的权限。---User
* 第4-6位确定所属组（同用户组的）拥有该文件的权限，---Group
* 第7-9位确定其他用户拥有该文件的权限---Other

#### rwx权限

  * rwx作用到文件
    * `r`：可读（read），可以读取，查看
    * `w`：可写（write），可以修改，但是不代表可以删除该文件，删除一个文件的前提条件是对该文件所在的目录有写权限，才能删除该文件
    * `x`：可执行（execute），可以被执行
  * rwx作用到目录
    * `r`：可读（read），可以读取，ls查看目录内容
    * `w`：可写（write），可以修改，对目录内创建+删除+重命名目录
    * `x`：可执行（execute），可以进入该目录

#### 改变文件rwx权限

* `chmod`
    * u、g、o，分别代表所有者，组，和其他
    * a代表所有
    * 使用+、-对该文件的权限进行添加或删除
    * 具体使用方式
        * `chmod u+x,g+w,o-r 文件名`
        * `chmod a-r 文件名`表示该文件，所有者、组内成员和其他人都没有了读的权限
* 也可以使用数字方式对文件的权限进行修改
    * r=4，w=2，x=1，使用这三数组进行相加
    * 具体使用方式
        * `chmod 664 文件名`
        * 这里6或4都是上面三个数字相加得到的
        * 第一位该表所有者，第二位代表组，第三位代表其他

## 定时任务

### crond任务调度

* 任务调度:是指系统在某个时间执行的特定的命令或程序。
* 任务调度分类:1.系统工作:有些重要的工作必须周而复始地执行。如病毒扫描等个别用户工作:个别用户可能希望执行某些程序，比如对mysql数据库的备份。
* `crontab`
    * `crontab -e` 编辑定时任务
    * `crontab -l` 查看已有的任务
    * `crontab -r` 删除已有的任务
* 格式：

```bash
cron表达式 命令
```

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

### at定时任务

* at命令是一次性定时计划任务，at的守护进程atd会以后台模式运行，检查作业队列来运行。
* 默认情况下，atd守护进程每60秒检查作业队列，有作业时，会检查作业运行时间，如果时间与当肓时间匹配，则运行此作业。
* at命令是一次性定时计划任务，执行完一个任务后不再执行此任务了
* 在使用at命令的时候，一定要保证atd进程的启动，可以使用相关命令来查看
    * 使用`ps -ef | grep atd`查看atd是否运行
* 使用
    * `at now+1minutes`回车
    * 输入要执行的命令或脚本文件路径
    * 按两次`ctrl+d`保存
    * 表示一分钟后执行某个操作

## 磁盘分区、挂载

* **Linux分区**
    * Linux来说无论有几个分区，分给哪一目录使用，它归根结底就只有一个根目录，一个独立且唯一的文件结构，Linux中每个分区都是用来组成整个文件系统的一部分。
    * Linux采用了一种叫“载入”的处理方法，它的整个文件系统中包含了一整套的文件和目录，且将个分区和一个目录联系起来。这时要载入的一个分区将使它的存储空间在一个目录下获得、
* 硬盘说明
    * Linux硬盘分IDE硬盘和SCSI硬盘，目前基本上是SCSI硬盘
    * 对于IDE硬盘，驱动器标识符为“hdx~”，其中“hd”表明分区所在设备的类型，这里是指IDE硬盘了。“x”为盘号(a为基本盘，b为基本从属盘，c为辅助主盘，d为辅助从属盘)，”~”代表分区，前四个分区用数字1到4表示，它们是主分区或扩展分区，从5开始就是逻辑分区。例，hda3表示为第一个IDE硬盘上的第三个主分区或扩展分区,hdb2表示为第二个IDE硬盘上的第二个主分区或扩展分区。
    * 对于SCSI硬盘则标识为“sdx~"，SCSI硬盘是用“sd”来表示分区所在设备的类型的，其余则和IDE硬盘的表示方法一样。
### 挂载一块新硬盘

1. 插入一块新硬盘
2. 查看分区详细信息：`lsblk -f`，输出信息内会显示新硬盘对应的文件，以`/dev/sdb`为例
3. 使用`fdisk /dev/sdb`对新硬盘进行分区，`fdisk`是一个交互式命令，内置分区相关的命令
    * `m`：显示所有命令列表
    * `p`：显示磁盘分区
    * `n`：新增分区
    * `d`：删除分区
    * `w`：写入并退出
4. 进入交互式命令后输入`n`新建分区，再输入`p`选择新建主分区，输入`1`分成一个区，最后输入`w`保存退出
5. 此时新建的分区名称为`dev/sdb1`，使用`mkfs -t ext4 /dev/sdb2`格式化文件系统为`ext4`
6. 挂载磁盘：
    * 将`dev/sdb1`挂载到指定的目录下：`mount /dev/sdb1 目录`
    * 卸载：`unmount /dev/sdb1`
7. 永久挂载磁盘，上面使用命令挂载的方式只是临时挂载，重启后就失效了
    * 使用`blkid`命令查看`/dev/sdb1`磁盘对应的UUID
    * 编辑`/etc/fstab`文件
```bash
# 最后一行添加
UUID=blkid里面的UUID    挂载的目录  ext4    defaults    0   0
```

8. 重启系统

### 常用命令

#### df

```bash
# 查看磁盘详细信息
df -h
```
#### du

* 查看指定目录磁盘占用情况
* 部分选项：
    * `-h`：带计量单位
    * `-a`：包含文件
    * `--max-depth`：子目录深度
    * `-c`：汇总值

```bash
# 查看/home目录占用情况
du -hac --max-depth=1 /home
```

## 网络配置

### linux网络环境配置

#### 自动获取

* 登陆后，通过界面的来设置自动获取ip
* linux启动后会自动获取IP缺点是每次自动获取的ip地址可能不一样

#### 指定ip

* 直接修改配置文件来指定IP，并可以连接到外网
* 编辑`vim /etc/sysconfig/network-scripts/ifcfg-ens33`

```bash
PROXY_METHOD="none"
BROWSER_ONLY="no"
# 自动分配
# BOOTPROTO="dhcp"
# 静态分配
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME"ens33"
UUID="30734a5b-0ac8-4eba-903f-13c464dede24"
DEVICE="ens33"
ONBOOT="yes"
# 自定义ip地址
IPADDR=192.168.111.123
# 网关
GATEWAY=192.168.111.2
# 域名解析器
DNS1=192.168.111.2
DNS2=114.114.114.114
```
* 保存退出后重启网络服务`service network restart`或重启`reboot`即可

### 设置主机名和host映射

#### 设置主机名

* `hostname` 查看主机名
* 在`/etc/hostname`文件内修改主机名
* 修改后重启才生效

#### hosts映射

* 编辑`/etc/hosts`文件

```bash
ip 名称
```

* window下在C:\Windows\System32\drivers\etc目录下编辑hosts文件

### 主机名解析过程分析(Hosts、DNS)

* Hosts是什么：一个文本文件,用来记录IP和Hostname(主机名)的映射关系
* DNS：
    * DNS，就是Domain Name System的缩写，翻译过来就是域名系统
    * 是互联网上作为域名和IP地址相互映射的一个分布式数据库
* 主机名解析机制分析(Hosts、DNS)：用户在浏览器输入了www.baidu.com
    1. 浏览器先检查浏览器缓存中有没有该域名解析IP地址，有就先调用这个IP完成解析;如果没有检查操作系统DNS解析器缓存，如果有直接返回IP完成解析。这两个缓存，可以理解为本地解析器缓存
    2. 一般来说，当电脑第一次成功访问某一网站后，在一定时间内，浏览器或操作系统会缓存他的IP地址（DNS解析记录)
       * 如在cmd窗口中输入
         * `ipconfig /displaydns`  DNS域名解析缓存
         * `ipconfig /flushdns`  手动清理dns缓存
    3. 如果本地解析器缓存没有找到对应映射，检查系统中hosts文件中有没有配置对应的域名IP映射，如果有，则完成解析并返回.
    4. 如果本地DNS解析器缓存和hosts文件中均没有找到对应的IP，则到域名服务DNS进行解析域

## 进程管理

* 在LINUX中，每个执行的程序都称为一个进程。每一个进程都分配一个ID号(pid,进程号)。
* 每个进程都可能以两种方式存在的。前台与后台，所谓前台进程就是用户目前的屏幕上可以进行操的。后台进程则是实际在操作，但由于屏幕上无法看到的进程，通常使用后台方式执行。
* 一般系统的服务都是以后台进程的方式存在，而且都会常驻在系统中。直到关机才才结束。

### 常用命令

#### ps

* 两种风格

##### 标准风格

* `ps -ef`
* 列说明
    * `UID`：用户id
    * `PID`：进程id
    * `PPID`：父进程id
    * `C：`cpu用于计算执行优先级因子。值越大，表明进程是cpu密集型运算，执行优先级会降低，值越小，表明进程是I/O密集型运算，必须优先级会提高
    * `STIME`：进程启动的时间
    * `TTY`：终端名称
    * `TIME`：cpu时间
    * `CMD`：启动进程的命令和参数

##### BSD风格

* `ps -aux`
* 列说明
    * `USER`：用户名称
    * `PID`：进程号
    * `%CPU`：进程占用CPU的百分比
    * `%MEM`：进程占用物理内存的百分比
    * `VSZ`：进程占用的虚拟内存大小(单位:KB)
    * `RSS`：进程占用的物理内存大小(单位:KB )
    * `TTY`：终端名称,缩写．
    * `STAT`：进程状态，其中S-睡眠，s-表示该进程是会话的先导进程，N-表示进程拥有比普通优先级更低的优先级，R-正在运行，D-短期等待，Z-僵死进程，T-被跟踪或者被停止等等
    * `STARTED`：进程的启动时间
    * `TIME`：CPU时间，即进程使用CPU的总时间
    * `COMMAND`：启动进程所用的命令和参数，如果过长会被截断显示
  * 以全格式显示当前进程

#### kill
  
* 终止进程

```bash
# 杀死对应id的进程 
kill 进程id

# 强制杀死一个进程
kill -9 进程id

# 杀死对应进程名的进程
killall 进程名
```

#### pstree

```bash
# 以树状形式显示进程信息并显示进程id
pstree -p

# 以树状形式显示进程信息并显示进程登录的用户
pstree -u
```

### 服务管理

* 服务（service）本质就是进程，但是运行在后台，通常会监听某个端口，等待其他程序的请求，比如（mysqld，sshd，防火墙等），因此我们又称为守护进程

#### Service管理命令

* 格式：`service 服务名 [start | stop | restart | reload | statue]`
* `service`命令管理的服务再`/etc/init.d`下查看
* `service`大部分Linux发行版都不再使用，使用`systemd`替换

#### 其他命令

* 使用`setup`命令查看全部服务，管理开机自启的服务
* `chkconfig`命令
  * `chkconfig 服务名 --list` 查看服务
  * `chkconfig --level 系统级别 服务名 on/off `设置某个服务在那个系统级别自启动

* `systemctl`命令
  * `systemctl [start|stop|restart|status] 服务名`
  * `systemctl list-unit-files` 查看开机启动的状态
  * `systemctl ebable 服务名` 设置服务开机启动
  * `systemctl disable 服务名` 关闭服务开机启动
  * `systemctl is-enabled` 查看某个服务是否开机自启 

* `firewall`命令
  * `firewall-cmd --permanent --add-port=端口号/协议` 打开端口
  * `firewall-cmd --permanent --remove-port=端口号/协议` 关闭端口
  * `firewall-cmd --reload` 重载端口，打开和关闭端口后必须重载才能生效
  * `firewall-cmd --query-port=端口号/协议` 查询端口号是否打开

* `top`命令
  * `top -d 秒数` 每隔多少秒更新一次
  * `top -i` 不显示闲置和僵死进程
  * `top -p 进程id` 通过id监控某个指定的进程

* **动态监控进程**
* 输入`top`命令后可以输入以下命令进行交互
  * `P` 以CPU使用率排序（默认）
  * `M` 以内存使用率排序
  * `N` 以进程id排序
  * `q` 退出

* 查看网络情况
  * `netstat -an` 按顺序排序输出
  * `netstat -p` 显示那个进程在调用
  * 常用使用直接输入`netstat -anp` 


## 包管理器

### apt

#### 配置源

* Debian11

```bash
## tencentyun
deb http://mirrors.tencentyun.com/debian bullseye main contrib non-free
deb http://mirrors.tencentyun.com/debian bullseye-updates main contrib non-free
deb http://mirrors.tencentyun.com/debian bullseye-backports main contrib non-free
deb http://mirrors.tencentyun.com/debian bullseye-proposed-updates main contrib non-free

## 163
deb http://mirrors.163.com/debian/ bullseye main non-free contrib
deb https://mirrors.163.com/debian-security/ bullseye-security main
deb http://mirrors.163.com/debian/ bullseye-updates main non-free contrib
deb http://mirrors.163.com/debian/ bullseye-backports main non-free contrib

## huawei
deb https://mirrors.huaweicloud.com/debian/ bullseye main non-free contrib
deb https://mirrors.huaweicloud.com/debian-security/ bullseye-security main
deb https://mirrors.huaweicloud.com/debian/ bullseye-updates main non-free contrib
deb https://mirrors.huaweicloud.com/debian/ bullseye-backports main non-free contrib

## tsinghua.edu
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free

## ustc.edu
deb https://mirrors.ustc.edu.cn/debian/ bullseye main contrib non-free
deb https://mirrors.ustc.edu.cn/debian/ bullseye-updates main contrib non-free
deb https://mirrors.ustc.edu.cn/debian/ bullseye-backports main contrib non-free
deb https://mirrors.ustc.edu.cn/debian-security/ bullseye-security main contrib non-free
```

* Debian12

```txt
deb https://mirrors.aliyun.com/debian/ bookworm main non-free non-free-firmware contrib
deb https://mirrors.aliyun.com/debian/ bookworm-updates main non-free non-free-firmware contrib
deb https://mirrors.aliyun.com/debian/ bookworm-backports main non-free non-free-firmware contrib
deb https://mirrors.aliyun.com/debian-security/ bookworm-security main

deb https://mirrors.163.com/debian/ bookworm main non-free non-free-firmware contrib
deb https://mirrors.163.com/debian-security/ bookworm-security main
deb https://mirrors.163.com/debian/ bookworm-updates main non-free non-free-firmware contrib
deb https://mirrors.163.com/debian/ bookworm-backports main non-free non-free-firmware contrib

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bookworm-security main contrib non-free non-free-firmware
```
* ppa源
    * `apt install software-properties-common` - 软件安装
    * `add-apt-repository "url"` - 添加ppa源
    * `add-apt-repository -r "url"` - 删除ppa源

#### 常用命令

* `apt serach <name>` - 搜索软件
* `apt install <name>` - 安装软件
* `apt update` - 从配置的源内更新包信息
* `apt upgrade` - 更新所有软件
* `apt list --upgradable` - 查看所有可以更新的软件
* `apt list --installed` - 查看所有已经安装的软件
* `apt remove <name>` - 删除软件
* `apt list <name> --all-versions` - 查看软件所有版本
* `apt show <name>` - 查看软件详细信息

### rpm包管理

* rpm用于互联网下载包的打包及安装工具，它包含在某些Linux分发版中。它生成具有.RPM扩展名的文件。RPM是RedHat Package Manager（RedHat软件包管理工具）的缩写，类似windows的setup.exe，这一文件格式名称虽然打上了RedHat的标志，但理念是通用的。
* Linux的分发版本都有采用（suse,redhat, centos等等），可以算是公认的行业标准了。

#### 常用命令

* `rpm -qa` 查询安装的所有软件包
* `rpm - q 软件名` 查询该软件是否安装
* `rpm -qi 软件名` 查询该软件的详细信息
* `rpm -ql 软件名` 查询该软件包包含哪些文件
* `rpm -qf 文件全路径` 查询该文件输入那个软件
* `rpm -e 软件包名` 卸载相命令
* `rpm -ivh 软件包全明` 安装软件包
    * `-i` 安装
    * `-v` 提示
    * `-h` 进度条

### yum包管理

* Yum是一Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包。

#### 配置源

1. `cd /etc/yum.repos.d/` 切到/etc/yum.	.d目录
2. `mv CentOS-Base.repo CentOS-Base.repo.backup` 备份CentOS-Base.repo文件
3. `wget http://mirrors.aliyun.com/repo/Centos-7.repo` 使用`wget`下载阿里的源文件
   1. 使用`wget`如果报无法解析主机名则需要手动配置DNS
   2. `vim /etc/resolv.conf` 编辑/etc/resolv.conf文件
      1. `service resatrt network`重启网络服务后`wget`就可以使用了
      2. 如果重启网络后/etc/resolv.conf内的数据恢复原样，就看文件头是否有Generated by NetworkManager注释字样
      3. 有则需要关闭NetworkManager服务，因为DNS被NetworkManager服务自动生成了
      4. `systemctl stop NetworkManager` 关闭NetworkManager服务
      5. `systemctl disable NetworkManager` 关闭NetworkManager服务的开机自启
4. `mv Centos-7.repo CentOS-Base.repo`将下载好的Centos-7.repo文件重命名为CentOS-Base.repo
5. `yum clean all` 清理缓存
6. `yum makecache` 生成缓存

#### 常用命令

* `yum listlgrep 软件列表` 查询yum服务器是否有需要安装的软件
* `yum install 软件包名` 安装指定软件

## 运行级别

### 基本介绍
* 0：关机
* 1：单用户【找回丢失密码】
* 2：多用户状态没有网络服务
* 3：多用户状态有网络服务
* 4：系统未使用保留给用户5:图形界面
* 6：系统重启
* 常用运行级别是3和5,也可以指定默认运行级别
* 命令:`init[0123456]`应用案例:通过`init`来切换不同的运行级别，比如动5-3，然后关机。

### 指定运行级别
* CentOS7后运行级别说明
* 在centos7以前,/etc/inittab文件中
* 进行了简化，如下:
    * multi-user.target: analogous to runlevel 3
    * graphical.target: analogous to runlevel 5
    * `systemctl get-default` 查看当前气筒处于那个运行级别
    * `systemctl set-default xxx.target` 设置系统为那个运行级别

## 安装jdk

1. 在/opt目录下创建jdk目录存放jdk压缩文件`mkdir /opt/jdk`
2. 在/usr/local目录下创建java目录存放解压后的文件`mkdir /usr/local/java`
3. 将/opt/jdk目录下的压缩文件解压到/usr/local/java目录下`tar -zxvf 压缩包名 -C /usr/local/java`
4. 配置环境变量`vim /etc/profile`
5. 添加如下代码

```bash
export JAVA_HOME=/usr/local/java/jdk1.8.0_281
export PATH=$JAVA_HOME/bin:$PATH
```

## Shell编程

* Shell是一个命令行解释器，它为用户提供了一个向Linux内核发送请求以便运行程序的界面系统级程序，用户可以用Shell来启动、挂起、停止甚至是编写一些程序。
* 创建一个以.sh结尾的文件，编写相应的bash脚本并保存
* 修改所有者拥有执行权限使用`./文件名`执行文件
* 或者不用修改权限直接使用`sh 文件名` 执行文件

### 变量

`$HOME`、`$PATH`、`$PWD`等为系统变量

#### 位置参数变量

* 获取执行shell脚本时后面带的参数
* 例如`var.sh 100`后面的100就是参数
    * 文件内使用`$1~$9`获取文件后的1~9位参数而`$0`为文件名本身
    * 第十个参数往后使用大括号包裹数组`${11}`来获取
    * 使用`$*`是将参数看作一个整体获取，相当于获取到一个所有参数组成的字符串
    * 使用`$@`获取到所有参数组成的集合
    * 使用`$#`获取所有参数的个数

#### 预定义变量

* 就是shell设计者事先已经定义好的变量，可以直接在shell脚本中使用
    * `$$` 当前进程的进程号(PID ) 
    * `$!` 后台运行的最后一个进程的进程号（PID ) 
    * `$?`（最后一次执行的命令的返回状态。如果这个变量的值为0，证明上一个命令正确执行;如果这个变量的值为非0(具体是哪个数，由命令自己来决定），则证明上一个命令执行不正确了

### 运算符

* 使用`$((运算式))`或者`$[运算式]`
* 或者`expr 运算式`这里的运算式必须有空格

### 流程控制

#### if

* 语法：

```bash
if [ 条件 ]
then
    分支一
elif [ 条件 ]
then
    分支二
else
    分支三
fi
```

* 数值比较
    * `-lt` 小于、`-le` 小于等于、`-eq` 等于、`-gt` 大于、`-ge` 大于等于、`-ne` 不等于
* 文件权限判断
    * `-r` 是否有读的权限
    * `-w` 是否有写的权限
    * `-x` 是否有执行的权限
* 文件类型判断
    * `-f` 文件是否存在并且是一个常规的文件
    * `-e` 文件是否存在
    * `-d` 文件是否存在并且是一个目录

#### case

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

#### for循环

* 语法

```bash
for 变量 in 值
do
    循环体
done

# 遍历1到100
for(( i=1; i<=100; i++ ))
do
      循环体
done
```

#### while循环

* 语法

```bash
while [ 条件 ]
do
    循环体
done
```

#### read

* 读取控制台输入
* 选项：
    * `-p` 指定读取值时的提示符;
    * `-t` 指定读取值时等待的时间(秒），如果没有在指定的时间内输入，就不再等待了。.参数

### 函数

#### 系统函数

* `basename 路径` 获取路径里的文件名
* `basename 路径 后缀` 获取路径里的文件名并去掉文件名的后缀
* `basedir 路径` 获取过文件的路径

#### 自定义函数

```bash
# 定义函数
function 函数名(){
    函数体
}

# 调用函数
函数名 参数……
```

##  日志管理

* 日志文件是重要的系统信息文件，其中记录了许多重要的系统事件，包括用户的登录信息、系统的启动信息、系统的安全信息、邮件相关信息、各种服务相关信息等。
* 日志对于安全来说也很重要，它记录了系统每天发生的各种事情，通过日志来检查错误发生的原因或者受到攻击时攻击者留下的痕迹。

### 系统常用的日志说明

* `/var/log/boot.log`：系统启动日志
* `/var/log/cron`：记录云系统定时任务相关的日志
* `/var/log/cups/`：打印信息日志
* `/var/log/dmesg`：系统开机时内核自检的信息，使用`dmesg`命令查看
* `/var/log/btmp`：记录错误登录的日志，这个日志时二进制文件，需要使用`lastb`命令查看
* `/var/log/lastlog`：系统中所有用户最后一次的登录时间日志，这个文件也是二进制文件，使用`lastlog`命令查看
* `/var/log/mailog`：邮件信息日志
* `/var/log/messages`：系统重要消息日志，如果系统出现问题，可以先检查这个文件
* `/var/log/secure`：认证授权信息，系统登录、ssh登录、su切换用户、sudo授权、添加用户、修改密码等操作都会记录在这个日志内
* `/var/log/wtmp`：永久记录所有用户的登录、注销信息，同时记录系统的启动、重启、关机事件，使用`last`命令查看
* `/var/tun/ulmp`：当前已经登录的用户信息，这个文件会随着用户的登录和注销而不断变化，只是记录当前登录用户的信息，十四爷`w`、`who`、`users`等命令查看
* `rsyslogd`服务管理这常用的系统日志
* `/etc/rsyslog.conf`文件为`rsyslog`日志进程的配置文件

### 常用命令

* `journalctl` 可以查看内存日志,这里我们看看常用的命令journalctl##查看全部
* `journalctl -n3` ##查看最新3条
* `journalctl --since 19:00 --until 19:10:10` #查看起始时间到结束时间的日志可加日期journalctl -p err ##报错日志
* `journalctl -o verbose` ##日志详细内容
* `journalctl_PiD=1245_COMM=sshd` ##查看包含这些参数的日志（在详细日志查看)
