# Redis

* [官网](https://redis.io/)
* [下载地址](https://redis.io/downloads/)

## 安装


1. 使用网络下载redis文件，这里以redis-6.2.4.tar.gz为例
2. 解压：`tar -zxvf redis-6.2.4.tar.gz -C 目标目录`
3. 进入到解压目录的redis-6.2.4文件夹下
4. 编译并安装redis
5. 安装make工具：`apt install gcc automake autoconf libtool make`
6. 编译安装，会在对应目录下创建一个bin目录：`make PREFIX=编译文件的目录 install`
7. 修改`redis.conf`内的以下内容：

```bash
dir data文件夹

logfile 日志文件夹

requirepass 密码
```

8. 防火墙开启6379端口即可外部访问

### 使用systemctl管理redis服务

1. 在`lib/systemd/system`文件夹下添加`redis.service`文件

```systemd
[Unit]
Description=Redis
After=network.target
[Service]
Type=forking
ExecStart=/usr/local/depends/redis/bin/redis-server /usr/local/depends/redis/redis.conf
ExecReload=/usr/local/depends/redis/bin/redis-server -s reload
ExecStop=/usr/local/depends/redis/bin/redis-server -s stop
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```

2. 修改文件内`ExecStart`、`ExecReload`、`ExecStop`配置的路径信息为自己的路径即可
3. 刷新systemctl配置：`systemctl daemon-reload`
4. 将redis服务设置为开机启用：`systemctl enable redis.service`
