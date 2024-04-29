# Redis

* [官网](https://redis.io/)

* [下载地址](https://redis.io/download/#redis-downloads)

## 安装redis

* 使用网络下载redis文件，这里以redis-6.2.4.tar.gz为例

* 解压

  * ```shell
    tar -zxvf redis-6.2.4.tar.gz -C 目标目录
    ```

* 进入到解压目录的redis-6.2.4文件夹下

* 编译并安装redis

  * 安装make工具

    * ```shell
      apt install gcc automake autoconf libtool make
      ```

  * 编译安装，会在对应目录下创建一个bin目录

    * ```shell
      make PREFIX=编译文件的目录 install
      ```

* 在编译redis的目录下创建data、logs文件夹，复制[redis.conf](./assets/redis.conf)文件到编译目录下

* 修改redis.conf内的信息

  * 修改dir路径信息，在456行左右，修改为刚创建的data文件夹目录
  * 修改logfile路径信息，在304行左右，修改为刚创建的logs文件夹目录
  * 修改密码（requirepass），在903行左右
  * 其他配置默认即可，防火墙开启6379端口即可外部访问

# 使用systemctl管理redis服务

* 复制当前文档下的[redis.service](./assets/redis.service)文件到/lib/systemd/system目录下

* 修改文件内ExecStart、ExecReload、ExecStop配置的路径信息为自己的路径即可

* 刷新systemctl配置

  * ```shell
    systemctl daemon-reload
    ```

* 将redis服务设置为开机启用

  * ```shell
    systemctl enable redis.service
    ```

    



