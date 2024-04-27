# docker

## docker安装

* [安装文档](https://docs.docker.com/engine/install/debian/#installation-methods)

* 在文档内选择安装方式安装，我使用的apt安装方式


### 添加镜像

* 新建文件`/etc/docker/daemon.json`

```json
{
    "registry-mirrors": [
        "https://registry.docker-cn.com",
        "http://hub-mirror.c.163.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://cr.console.aliyun.com",
        "https://mirror.ccs.tencentyun.com"
    ]
}
```

## 容器&镜像

> 在[docker hub](https://hub.docker.com/)上搜索镜像

### 镜像

* `docker search image_name` 搜索镜像
* `docker pull [image_repo]image_name[:image_tag]` 下载镜像
* `docker images` 查看已有的镜像
* `docker rmi` 删除镜像

### 容器

* `docker ps -a` 查看所有容器
* `docker rm` 删除容器
    * 删除某个镜像对应的所有容器
    ```powershell
    docker rm $(docker ps -af ancestor=image_name -q)
    ``` 
* `docker run image_name` 运行容器
    * `-d` 后台运行
    * `-it` 交互式运行容器命令最后接需要执行的交互式命令，通常是bash

* `docker exec` 在容器内执行命令
    * `-it` 交互式

* `docker logs container_id` 查看容器的命令
    * `-f` 监听日志

* `docker cp container_id:path path` 复制容器内的文件到本地，反过来一样

* `docker stop container_id` 停止容器

* `docker start container_id` 启动容器

## 数据卷

* `docker volume`

## 网络

* `docker network`

`docker build -t 镜像名称:镜像标签 Dockerfile目录` 制作镜像   

## 其他

###
### docker gitlab备份

* `docker ps`获取 container id
* `docker exec -i -t （这里填container id） /bin/bash`

* `gitlab-rake gitlab:backup:create`
* 输出`Creating backup archive xxx_xxx.tar`备份成功
* 文件在创建容器的命令映射的gitlab数据路径下`data/backups`下

## 参考

* 参考https://blog.csdn.net/weixin_43961117/article/details/126125976教程
