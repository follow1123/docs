---
sidebar_position: 5
---

# Systemd

linux 服务管理

## 服务

服务启停

```bash
#   start   启动
#   stop    停止
#   restart 重启
#   reload  重新加载
#   status  查看服务状态
systemctl start <unit_name>`
```

服务自启动

```bash
#   enable      启用
#   disable     禁用
#   is-enabled  是否启用
# 启用或禁用后需要执行 systemctl daemon-reload 重新加载配置才生效
systemctl enable <unit_name>
```

服务列表

```bash
#   list-units          列出已经启动的单元
#   list-dependencies   列出单元依赖
#   list-unit-files     列出所有单元自启动配置
#   list-timers         列出所有定时任务
systemctl list-unit-files
```

其他

```bash
#   help 显示帮助信息
#   show 显示配置项
#   cat  查看单元配置文件
#   edit 编辑单元配置文件
systemctl show
```

## 日志

```bash
# 查看某个服务的日志
journalctl -u <unit_name>

# 当前系统启动日志
#
# 上次系统启动日志 -2 就是上上次
# journalctl -b -1
journalctl -b
```

## 网络管理

### systemd-networkd

systemd 集成的网络管理工具

#### 基础配置

配置文件开头的数字越低，启动的优先级就越高

```ini title="/etc/systemd/network/10-wireless-dhcp.network"
[Match]
Name=wlp*

[Network]
DHCP=yes
```

如果配置了 DHCP 又需要使用 systemd-resolved 本地的 DNS 解析服务，可以添加以下配置

```ini
[Match]
Name=wlp*

[Network]
DHCP=yes
# 本地的 systemd-resolved 默认监听 127.0.0.53 作为 DNS 解析服务
DNS=127.0.0.53

[DHCPv4]
# 不使用从 DHCP 获取的 DNS
UseDNS=false
```

#### 常用命令

```bash
# 列出所有的网络接口
networkctl

# 查看某个接口的详细信息
networkctl status <device>
```

### systemd-resolved

可能需要单独安装 `sudo apt install systemd-resolved`

systemd 集成的DNS解析工具，这个服务可以单独使用，和 systemd-networkd 互相不依赖

#### 基础配置

```ini title="/etc/systemd/resolved.conf"
[Resolve]
# DNS 服务，多个使用空格分割
DNS=114.114.114.114 223.5.5.5
# 开启缓存
Cache=yes
```

#### 常用命令

```bash
# 列出所有 DNS 配置
resolvectl

# 查询网址 ip 和 nslookup 一样
resolvectl query <url>

# 清空 DNS 缓存
resolvectl flush-caches

# 监控 DNS 访问操作
resolvectl monitor

# 统计 DNS 的解析信息
resolvectl statistics
```

### 网络管理工具迁移

#### 从 ipupdown（Debian默认网络管理工具）迁移至 systemd-networkd

```bash
# 移动默认配置文件，防止相关依赖服务根据配置自启动
sudo mv /etc/network/interfaces /etc/network/interfaces.save
sudo mv /etc/network/interfaces.d /etc/network/interfaces.d.save

# 禁用相关服务
sudo systemctl disable --now networking.service
# WiFi 相关
sudo systemctl disable --now wpa_supplicant.service

# 启用systemd-nowworkd 服务
sudo systemctl enable --now systemd-networkd
# 如果需要本地 DNS 解析服务可以启动 systemd-resolved 服务
sudo systemctl enable --now systemd-resolved

# WiFi 相关
sudo systemctl disable --now wpa_supplicant@<interface>.service
```

## 启动分析

```bash
# 服务启动分析
systemd-analyze

# 查看每个服务的启动耗时
systemd-analyze blame

# 查看服务的启动流程
systemd-analyze critical-chain <unit_name>
```

## 电源管理

```bash
#   reboot     重启
#   poweroff   关机
#   suspend    休眠（数据保存到内存）
#   hibernate  冬眠（数据保存到硬盘）
systemctl reboot
```

## 其他

* `hostnamectl` - 主机信息
* `localectl` - 本地化
* `timedatectl` - 时区
* `loginctl` - 用户管理

## 配置

### Unit 配置路径

> 优先级从高到低

1. `/etc/systemd/system` - 系统级别配置文件
2. `/run/systemd/system`
3. `/lib/systemd/system` - 包管理工具下载的服务配置文件

### 登录管理器配置路径

```bash
/etc/systemd/logind.conf
/etc/systemd/logind.conf.d/*.conf
/run/systemd/logind.conf.d/*.conf
/usr/lib/systemd/logind.conf.d/*.conf
```

部分配置项说明，参考[archwiki](https://man.archlinux.org/man/logind.conf.5.en)

* `HandlePowerKey` - 按下电源键操作
* `IdleAction` - 电脑空闲时的操作
* `IdleActionSec` - 电脑空闲多少时间后执行空闲操作
* `HandleLidSwitch` - 笔记本合盖操作

## 常见问题

### 切换 `systemctl edit` 命令的默认编辑器

```bash
# 添加编辑器
sudo update-alternatives --install "$(which editor)" editor "$(which 编辑器名称)" 15

# 配置
sudo update-alternatives --config editor
```

