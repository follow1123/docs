# systemd

> 管理linux进程

## 常用命令

### 服务相关

* `systemctl status 服务名` 查看服务运行状态
    * `start/stop/restart/reload` 服务启停相关

* `systemctl show 服务名` 显示服务的参数

* `systemctl daemon-reload` 重新加载服务配置文件(在修改服务配置文件后执行)

* `systemctl list-unit-files` 查看所有服务

* `systemctl list-dependencies 服务名` 查看服务的依赖关系

* `systemctl cat 服务名` 查看服务名的配置文件

* `systemctl edit 服务名` 编辑服务名的配置文件


### 性能分析相关

> systemd-analyze

* `systemd-analyze` 查看启动耗时

* `systemd-analyze blame` 查看每个服务的启动耗时

* `systemd-analyze critical-chain 服务名` 查看服务的启动流程

### 系统管理相关

* `systemctl reboot` 重启

* `systemctl poweroff` 关机

* `systemctl suspend` 休眠(数据保存到内存)

* `systemctl hibernate` 冬眠(数据保存到硬盘)

### 日志相关

> journalctl 

* `journalctl -u 服务名称` 查看某个服务的日志


### 主机信息相关

> hostnamectl

### 本地化相关

> localectl

### 时区相关

> timedatectl

### 登录相关

> loginctl

#### 登录管理器配置文件

* 默认路径

```bash
/etc/systemd/logind.conf
/etc/systemd/logind.conf.d/*.conf
/run/systemd/logind.conf.d/*.conf
/usr/lib/systemd/logind.conf.d/*.conf
```
## 常用配置项说明

> 参考[archwiki](https://man.archlinux.org/man/logind.conf.5.en)


* `HandlePowerKey` 按下电源键操作

* `IdleAction` 电脑空闲时的操作

* `IdleActionSec` 电脑空闲多少时间后执行空闲操作

* `HandleLidSwitch` 笔记本合盖操作

### Unit配置保存路径

* 优先级从高到低

1. `/etc/systemd/system` 系统级别配置文件
2. `/run/systemd/system`
3. `/lib/systemd/system` 包管理工具下载的服务配置文件

## 常见问题

### 切换 `systemctl edit` 命令的默认编辑器

```bash
# 添加编辑器
sudo update-alternatives --install "$(which editor)" editor "$(which 编辑器名称)" 15

# 配置
sudo update-alternatives --config editor
```

