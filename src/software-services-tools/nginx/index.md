* [官网](http://nginx.org/en/)
* [下载地址](http://hg.nginx.org/nginx/branches)
* 解压
* 安装依赖包

```bash
apt install -y libpcre3 libpcre3-dev zlib1g-dev openssl libssl-dev
```

* 进入解压后的目录

```bash
./configure --prefix=nginx编译后文件存放的位置
```

* 编译

```bash
make && make install
```

* 进入编译好的conf文件夹内
* 使用[nginx.conf](./assets/nginx.conf)替换配置文件

* 关闭nginx
  * 进入nginx的安装目录`nginx/sbin`
  * 关闭nginx：`./nginx -s stop`



## 正向代理/反向代理

* 正向代理，代理客户端

* 反向代理，代理服务端
