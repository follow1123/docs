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

