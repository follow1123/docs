# Linux桌面环境

> 以debian为例

## 安装

* 制作一个微pe的u盘
* 设置电脑硬盘启动顺序为u盘启动
  * 以我的电脑为例dell笔记本，开机出现图标不停按F12，后续操作百度
* 进入后格式化所有电脑硬盘
* 使用debian制作启动盘
* 由于安装时可能会提示缺少固件，需要下载nofree的固件先放在u盘内的firmware文件夹内，没有就新建一个，固件官网：https://packages.debian.org/search?keywords=stable
* 安装过程参考https://www.cnblogs.com/Cylon/archive/2022/08/02/16544912.html

* 固件官网：`https://packages.debian.org/stable`
* 固件git网站：`https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git`
* 卸载桌面环境apt autoremove  --purge kde*

## 使用

## 连接wifi

* 查看网卡信息：`ifconfig -a`
* 启动网卡： `ifconfig wlan0 up`
* 生成wifi信息文件： `wpa_passphrase {SSID} {PASSWORD} > /etc/wpa_supplicant/{SSID}.conf`
* 连接wifi： `wpa_supplicant -i wlan0 -c /etc/wpa_supplicant/{SSID}.conf -B`
* 启动动态分配ip服务：`dhclient wlan0`

## 磁盘

* 查看磁盘大小 `df -h` ，`fdisk -l`

* ###### 查看SATA速度和具体设备`dmesg |grep SATA`

## 字体

* 设置字体大小 `dpkg-reconfigure console-setup`
* 设置字体`dpkg-reconfigure locales`
* 没有`ifconfig`命令时用`ip addr show`查看ip

## 内核

* 切换linux内核
  * 查看当前使用的内核和需要切换的内核`grep menuentry /boot/grub/grub.cfg`
  * 复制menuentry后面需要切换的内核的字符串信息
  * 开始引导配置 `nvim /etc/default/grub`
  * 修改`GRUB_DEFAULT=0`为GRUB_DEFAULT="Advanced options for Debian GNU/Linux>上一步复制的字符串"后保存退出
  * 执行更新引导配置命令`update-grub`
  * 重启后使用`uname -a`查看是否修改成功
* 删除多余的内核文件
  * 查看当前系统内安装的内核文件`ls /lib/modules`
  * `apt autoremove --purge linux-image-内核名字`删除内核
* 删除旧的内核

  * 使用`uname -a`查看正在使用的内核、
  * 使用` dpkg --get-selections |grep linux`查看内核列表
  * 找到多余的内核后使用`dpkg --purge --force-remove-essential linux-image-版本号`删除

## 用户

* `useradd 用户名` 创建用户
* `passwd 用户名` 设置用户名的密码
* `chmod -d 用户家目录 用户名` 设置用户的家目录
* `cp /etc/skel/.b* 用户家目录`、 `cp /etc/skel/.p* 用户家目录` 复制所需的命令行配置文件到用户的家目录下
* `chown -R 用户名:用户名 用户家目录` 设置用户家目录所以文件的拥有者
* `chmod 770 用户家目录` 设置用户家目录的权限
* `usermod -s /bin/bash 用户名` 配置相关操作 

## sudo

* `apt install sudo` 安装
* 让普通用户可以使用sudo 命令
  * 在`/etc/sudoers.d`目录下新建`用户名`文件
  * 编写`用户名 ALL=(ALL) ALL`保存退出，这个表示用户可以执行所有命令

## ssh

### ssh密钥登录
> 假如`a`需要连接到`b`

```bash
# 在`a`的终端下输入命令生成密钥，保存在当前用户目录下的.ssh文件夹内
ssh-keygen # 正常环境下有提示回车即可（生产环境下需要看一下提示）

# 将`a`机器下的~/.ssh/id_rsa.pub文件推送到服务器`b`上
scp ~/.ssh/id_rsa.pub 用户名@`b`的ip:需要登录的用户目录/.ssh/authorized_keys

# 使用ssh连接
ssh `b`
```
* 清理密钥 `ssh-keygen -R ip`


## apt

* debian11源
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

* ppa源
  * 软件安装`apt install software-properties-common`
  * 添加ppa源`add-apt-repository "url"`
  * 删除ppa源`add-apt-repository -r "url"`

## 其它

### windows远程dwm桌面环境

在用户目录下新建.xsession文件，里面添加以下命令

```bash
exec dwm
```

安装xrdp：`apt install xrdp`

启动：`sudo /etc/init.d/xrdp start`

### 笔记本电源管理相关

* 笔记本合盖休眠配置文件：/etc/systemd/logind.conf
* linux 引导页面配置文件：/etc/default/grub
* 将GRUB_TIMEOUT设置为0则可以跳过引导页面

### 输入法

* fcitx5：`sudo apt install fcitx5 fcitx5-frontend-qt5 fcitx5-frontend-gtk3 fcitx5-frontend-gtk2 fcitx5-chinese-addons`

### linux设置键盘速率

`xset r rate 250 60`

250毫秒后开始重复，每60毫秒重复一次

## DWM

* 基础桌面环境：`apt install libx11-dev libxft-dev libxinerama-dev xorg`
* 系统托盘：`apt install trayer`
* 壁纸软件：`apt install feh`
* 复制配置文件`cp /etc/X11/xinit/xinitrc ~/.xinitrc`
* 基础命令：
  * killall：`psmisc`
* 使用git clone dwm源码官网https://tools.suckless.org/
* 进入dwm目录`make clean instal`编译安装dwm
  * 安装编译依赖`sudo apt install make gcc`
  * 编译xinitrc文件 `nvim ~/.xinitrc`
  * 文件最后加上`exec dwm`
* 文件上面有些目录可能需要注释才能启动
* 安装输入法`apt install fcitx fcitx-pinyin`
* 用dmenu打开`fcitx-config-gtk3`应用，配置双拼
* 安装nerd fonts图标字体
  * nerd fonts 字体下载页面：https://www.nerdfonts.com/font-downloads
  * 选择一个字体下载，我这里选择一个只有图标的字体
  * 解压字体压缩包到系统字体目录下：`sudo unzip 压缩包名称 -d /usr/share/fonts/压缩包名称`
  * 进入到解压的字体目录下：`cd /usr/share/fonts/压缩包名称`
    * 生成核心字体信息：`sudo mkfontscale`
    * 生成字体文件夹：`sudo mkfontdir`
    * 刷新系统字体缓存：`sudo fc-cache -fv`
  * 打开dwm配置文件
    * 查找字体名称：`fc-list | grep 安装的字体名称`
    * 复制出对应的字体名称，在grep出结果里面，一般在 `:style=xxx`前面，`xxx.ttf：`后面
    * 找到`*fonts[]`常量，将上一步复制的字体名称粘贴在这里，后面加上`pixelsize=图标大小:type=上一步style后面的值:antialise=true:autohint=true`后面两个是抗锯齿之类的属性
    * 保存退出后`sudo make clean install` 重新编译安装dwm
    * 重启后就可以设置nerd fonts的字体了，字体网址：https://www.nerdfonts.com/cheat-sheet

## 问题

## apt相关

apt install 或upgrade 时 installed initramfs-tools package post-installation script subprocess returned error exit status 1错误

* `rm /var/lib/dpkg/info/报错的包名`
* `dpkg --configure -D 777 报错的包名`
* `apt -f install`

### PPA错误

#### E: The repository ‘http://ppa.launchpad.net/jonathonf/[vim](https://so.csdn.net/so/search?q=vim&spm=1001.2101.3001.7020)/ubuntu focal Release’ no longer has a Release file.

* 删除仓库，-r 后面的参数表示要删除的仓库，取值如下图所示，记得换成自己报错的仓库

* sudo apt-add-repository -r ppa:jonathonf/vim	# 这里换成自己报错的仓库

* 更新仓库包列表

* sudo apt update

### 更新错误

* 错误：

  dpkg: 处理软件包 initramfs-tools (--configure)时出错：
   installed initramfs-tools package post-installation script subprocess returned error exit status 1
  在处理时有错误发生：
   initramfs-tools
  E: Sub-process /usr/bin/dpkg returned an error code (1)

* 解决方法：

  * 现将info文件夹更名：`sudo mv /var/lib/dpkg/info /var/lib/dpkg/info_old`
  * 再新建一个新的info文件夹：`sudo mkdir /var/lib/dpkg/info`
  *  `sudo apt-get update`
  * `apt-get -f install` 
  * 执行完上一步操作后会在新的info文件夹下生成一些文件，现将这些文件全部移到info_old文件夹下：`sudo mv /var/lib/dpkg/info/* /var/lib/dpkg/info_old` 
  * 把自己新建的info文件夹删掉：`sudo rm -rf /var/lib/dpkg/info`
  * 把以前的info文件夹重新改回名字：`sudo mv /var/lib/dpkg/info_old /var/lib/dpkg/info`


## nvidia显卡驱动相关

* `sudo apt install build-essential libglvnd-dev`
* 如果出现以下错误
```
Unable to find the kernel source tree for the currently running kernel.  Please make sure you have installed the kernel source files for
your kernel and that they are properly configured; on Red Hat Linux systems, for example, be sure you have the 'kernel-source' or
'kernel-devel' RPM installed.  If you know the correct kernel source files are installed, you may specify the kernel source path with
the '--kernel-source-path' command line option
```
    * 安装内核源码包：`sudo apt install linux-source`
    * 安装内核头文件包：`sudo apt install linux-headers-$(uname -r)`
    * 这些操作以debian为例

## 网络工具相关
* `sudo apt install net-tools`

## 安装typora
* [linux官方安装教程](https://typoraio.cn/#linux)
* 适合debian系linux
* `wget -qO - https://typoraio.cn/linux/public-key.asc | sudo tee /etc/apt/trusted.gpg.d/typora.asc`
* `sudo add-apt-repository 'deb https://typoraio.cn/linux ./'`
* `sudo apt-get update`
* `sudo apt-get install typora`

## 缺少ifconfig命令
* `sudo apt install net-tools`

## 禁用watchdog程序，导致系统关机或重启时卡死
* 打开grub文件 `sudo nvim /etc/default/grub`
* 添加或修改`GRUB_CMDLINE_LINUX="nmi_watchdog=0"`
* 更新grub配置 `sudo update-grub`

## Ubuntu相关操作

###  linux 安装显卡驱动

* 修改 blacklist.conf文件：`sudo vim /etc/modprobe.d/blacklist.conf`，在最后一行添加，添加后需要重启

  ```shell
  blacklist nouveau
  ```

* 执行命令安装必要的库：

  * `sudo apt update && sudo apt install build-essential`
  * `sudo apt-get install libglvnd-dev`

* 从Nvidia官网下载驱动文件

  * 使用命令行进入下载的文件的目录

* 安装命令：`sudo bash 文件名`

  * 如果提示X server相关则加上 `-no-x-check`参数
  * 卸载，加上`--uninstall` 参数

### ubuntu 合并状态栏和dock栏

* ​	浏览器安装`gnome shell integration`插件
* 进入[gnome扩展网址](https://extensions.gnome.org/)
  * 搜索`dash to panel`插件 打开即可

## linux 音频相关

### alsa
* 音频底层

### pulseaudio
* 音频服务

### pipewire
* 音频服务，可以替代pulseaudio

### wireplumber
* pipewire 客户端

### qpwgraph
* pipewire的图形界面客户端


### bluez
* 蓝牙协议底层


### bluetooth
* 蓝牙服务，自带bluetoothctl交互命令
