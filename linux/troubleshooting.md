---
sidebar_position: 15
---


# 常见问题

## 包管理器相关

### `apt install/upgrade`时出现`installed initramfs-tools package post-installation script subprocess returned error exit status 1`错误

```bash
rm /var/lib/dpkg/info/报错的包名

dpkg --configure -D 777 报错的包名

apt -f install
```

### PPA错误`E: The repository ‘http://ppa.launchpad.net/jonathonf/xxx/ubuntu focal Release’ no longer has a Release file.`


```bash
# 这里换成自己报错的仓库
sudo apt-add-repository -r ppa:jonathonf/vim

# 更新仓库包列表
sudo apt update
```

### 处理软件包`initramfs-tools (--configure) installed initramfs-tools package post-installation script subprocess returned error exit status 1`或`E: Sub-process /usr/bin/dpkg returned an error code (1)`错误


```bash
# 备份info文件夹
sudo mv /var/lib/dpkg/info /var/lib/dpkg/info_old

# 新建info文件夹
sudo mkdir /var/lib/dpkg/info

# 更新安装
sudo apt-get update
apt-get -f install

# 将info文件夹内生成的内容移动到info_old文件夹内
sudo mv /var/lib/dpkg/info/* /var/lib/dpkg/info_old

# 删除info文件夹，并使用info_old替换
sudo rm -rf /var/lib/dpkg/info
sudo mv /var/lib/dpkg/info_old /var/lib/dpkg/info
```

## NVIDIA显卡驱动相关

### 安装显卡驱动

> [官网](https://www.nvidia.cn/drivers/lookup/)下载驱动文件

```bash
# 安装依赖
sudo apt install build-essential libglvnd-dev linux-source linux-headers-$(uname -r) -y

# 禁用nouveau驱动
echo "blacklist nouveau" | sudo tee -a /etc/modprobe.d/blacklist.conf

# 安装驱动
# 如果提示X server相关则加上 -no-x-check参数
# 卸载，加上--uninstall 参数
sudo bash 驱动文件 -no-x-check
```

### 更新Linux内核后NVIDIA驱动挂了

* 卸载驱动后安装新的Linux内核源码后重新安装

```bash
# 进入驱动文件目录

# 卸载
sudo bash 驱动文件 --uninstall

# 安装内核源码包、内核头文件包
sudo apt install linux-source
sudo apt install linux-headers-$(uname -r)

# 安装
sudo bash 驱动文件 -no-x-check
```


### `Unable to find the kernel source tree for the currently running kernel.`

* `sudo apt install build-essential libglvnd-dev`时如果出现以下错误：

```txt
Unable to find the kernel source tree for the currently running kernel.  Please make sure you have installed the kernel source files for
your kernel and that they are properly configured; on Red Hat Linux systems, for example, be sure you have the 'kernel-source' or
'kernel-devel' RPM installed.  If you know the correct kernel source files are installed, you may specify the kernel source path with
the '--kernel-source-path' command line option
```

```bash
# 安装内核源码包
sudo apt install linux-source

# 安装内核头文件包
sudo apt install linux-headers-$(uname -r)
```
## 内核相关

### 切换Linux内核

```bash
# 查看当前使用的内核和需要切换的内核
# 复制menuentry后面需要切换的内核的字符串信息
grep menuentry /boot/grub/grub.cfg

# 打开引导配置，修改GRUB_DEFAULT=0为GRUB_DEFAULT=上一步复制的字符串
nvim /etc/default/grub

# 执行更新引导配置命令
update-grub

# 重启
systemctl reboot

# 重启后查看是否修改成功
uname -a
```

### 删除多余的内核文件

```bash
# 查看正在使用的内核、
uname -a
# 或
ls /lib/modules

# 删除内核
apt remove --purge linux-image-内核名字
apt remove --purge linux-headers-内核名字
```

## 缺少ifconfig命令

* `sudo apt install net-tools`

## 禁用watchdog程序，导致系统关机或重启时卡死

```bash
# 打开grub文件
sudo nvim /etc/default/grub

# 添加或修改
GRUB_CMDLINE_LINUX="nmi_watchdog=0"

# 更新grub配置
sudo update-grub
```

## Ubuntu合并状态栏和dock栏

1. 浏览器安装`gnome shell integration`插件
2. 进入[gnome扩展网址](https://extensions.gnome.org/)
3. 搜索`dash to panel`插件 打开即可


## ssh密钥登录

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

