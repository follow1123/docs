---
sidebar_position: 15
---


# 常见问题

## NVIDIA 显卡驱动

### 安装显卡驱动

> [官网](https://www.nvidia.cn/drivers/lookup/) 下载驱动文件

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

---

### 更新Linux内核后NVIDIA驱动挂了

卸载驱动后安装新的Linux内核源码后重新安装

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

`sudo apt install build-essential libglvnd-dev` 时如果出现以下错误：

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

---

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

---

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

---

## 缺少ifconfig命令

`sudo apt install net-tools`

---

## 禁用 watchdog 程序

watchdog 是一个定期检查服务健康状态的进程，在服务出现故障时进行故障恢复操作，一般用于需要长期运行的服务器

但是在桌面环境下这个功能就没什么用，还会导致**挂起**或**休眠**等操作出现问题

```bash title="/etc/modprobe.d/disable-watchdog.conf"
sudo tee /etc/modprobe.d/disable-watchdog.conf << EOF
# intel CPU 的 watchdog
blacklist iTCO_wdt

# AMD CPU 的 watchdog
# blacklist iTCO_wdt
EOF
```

确认自己的 CPU 修改后还是没用，手动搜索模块名称

```bash
lsmod | grep tc
# 或
lsmod | grep wd

# 查看模块详细信息
# 在 description 处显示 watchdog timer driver 等字样的就是
# 在 lsmod 搜索后的第三列表示这个模块被哪个模块引用，只需要禁用那个引用其他模块的模块就可以了
modinfo <mod_name>
```
