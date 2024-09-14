# Docker

* **系统平滑移植**，**容器虚拟化技术**
* docker可以通过镜像（image）将操作系统核心除外，运行程序所需要的系统环境，由下而上打包，达到跨平台无缝接轨运行，代替程序即应用的观念

## 目录

1. <a href="#install-docker">docker安装</a>
2. <a href="#docker-components">docker组成</a>
3. <a href="#docker-principle">docker工作原理</a>
4. <a href="#docker-image-source">添加镜像源</a>
5. <a href="#docker-commands">常用命令</a>
    1. <a href="#command-help">帮助启动相关</a>
    2. <a href="#command-images">镜像相关</a>
    3. <a href="#command-container">容器相关</a>
    4. <a href="#command-images">镜像相关</a>
    5. <a href="#command-container">容器相关</a>
    6. <a href="#command-volume">数据卷相关</a>
    7. <a href="#command-network">网络相关</a>
    8. <a href="#command-compose">容器编排相关</a>
6. <a href="#command-images-desc">docker镜像</a>
7. <a href="#dockerfile">Dockerfile</a>
    1. <a href="#dockerfile-instructions">Dockerfile指令</a>
    2. <a href="#dockerfile-dangling">虚悬镜像</a>
8. <a href="#docker-network-desc">Docker网络（network）</a>
    1. <a href="#docker-network-modes">Docker网络模式</a>
        1. <a href="#docker-network-bridge">bridge</a>
        2. <a href="#docker-network-host">host</a>
        3. <a href="#docker-network-none">none</a>
        4. <a href="#docker-network-container">container</a>
            1. <a href="#docker-network-container-demo">nginx代理tomcat</a>
        5. <a href="#docker-network-custom">自定义网络</a>
            1. <a href="#docker-network-custom-demo-before">nignx代理2个tomcat，不使用自定义网络</a>
            2. <a href="#docker-network-custom-demo-after">使用自定义网络</a>
9. <a href="#docker-compose">Docker-Compose（容器编排）</a>
    1. <a href="#docker-compose-demo">nignx代理2个tomcat，使用docker-compose进行容器编排</a>
10. <a href="#docker-tools">docker相关工具</a>
11. <a href="#docker-troubleshooting">常见问题</a>
    1. <a href="#docker-troubleshooting-1">docker虚悬镜像是什么</a>
    2. <a href="#docker-troubleshooting-2">docker挂载主机目录访问如果出现cannot open directory .: Permission denied</a>
    3. <a href="#docker-troubleshooting-3">没有ip或ifconfig等查看网络命令怎么查看linux的ip</a>

## 传统虚拟机与容器的对比

### 虚拟机

* 虚拟机架构

![虚拟机架构](./assets/Snipaste_2024-09-08_17-05-27.png)

* 缺点
    * 资源占用多
    * 冗余步骤多
    * 启动慢

### 容器

* Linux容器（Linux Containers或LXC）
* LInux软驱是云系统其他部分隔离开的一系列进程，从另一个镜像运行，并由该镜像提供支持进程所需的全部文件。
容器提供的镜像包含了应用的所有依赖项，因此在从开发到测试再到生产的整个过程中，它都具有可移植性和一致性。
* Linux容器不是模拟一个完整的操作系统而是堆进程进行隔离。有了容器，
就可以将软件运行所需的所有资源打包到一个隔离的容器中。容器与虚拟机不同，不需要捆绑一整套操作系统,
只需要软件工作所需的库资源和设置。系统因此变得高效轻量并保证部署任何环境中的软件都能始终如一地运行

* 容器化架构

![容器化架构](./assets/Snipaste_2024-09-08_17-22-25.png)

* Docker是在操作系统层面上实现虚拟化，直接复用本地主机操作系统，而传统虚拟机则是在硬件层面实现虚拟化。
与穿透虚拟机相比，Docker优势体现为启动速度快，占用体积小

### 对比

|     | Docker容器    | 虚拟机（VM）    |
|---------------- | --------------- | --------------- |
| 操作系统    | 与宿主机共享OS    | 宿主机上的OS运行虚拟机 |
| 存储大小    | 镜像小，便于存储与传输    | 镜像庞大（vmdk、vdi等） |
| 运行性能 | 几乎无性能损失（根据不同程序，不同运行状态损失不一样） | 操作系统额外的CPU、内存损耗 |
| 移植性 | 轻便、灵活，适应于Linux | 笨重，与虚拟化技术耦合高 |
| 部署速度 | 快速，秒级 | 较慢，10s以上 |


<a id="install-docker"></a>
## docker安装

> [官网](https://www.docker.com)</br>
> [官方镜像仓库](https://hub.docker.com/)</br>
> [Docker手册](https://docs.docker.com/manuals/)

* 在Docker手册上查找安装的方式


<a id="docker-components"></a>
## docker组成

* 镜像（image）
* 容器（container）
* 仓库（repository）

### 镜像

* docker镜像就是一个只读模板，镜像可以用来创建docker容器，一个镜像可以创建多个容器
* docker的镜像文件类似java的类模板，而docker容器实例类似java中new出来的实例对象

### 容器

* 可以把容器看作是一个简易版的Linux环境（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序

### 仓库

* 集中存放镜像文件的位置，类似Maven存放jar包

<a id="docker-principle"></a>
## docker工作原理

* docker是一个client-server结构的系统，docker守护进程运行在主机上，
通过socket连接客户端访问，守护进程从客户端接受命令并管理运行在主机上的容器

### docker run 流程

```mermaid
flowchart  TD
a(开始) --> b[docker在本机中寻找该镜像]
b --> c{本机是否有该镜像}
c --没有--> d[在docker hub上找该镜像]
c --有--> e[以该镜像为模板生成容器实例运行]
d --> f{docker hub上能否找到}
f --能--> g[下载该镜像到本地]
g --> h[以该镜像为模板生成容器实例运行]
f --不能--> i[返回失败错误,查不到该镜像]

```

<a id="docker-image-source"></a>
## 添加镜像源

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

* Docker Desktop可以在设置里的Docker Engine选项内添加

<a id="docker-commands"></a>
## 常用命令

<a id="command-help"></a>
### 帮助启动相关

| 命令   | 描述    |
|--------------- | --------------- |
| **systemctl start docker**   | 启动docker   |
| **systemctl stop docker** | 停止docker |
| **systemctl restart docker** | 重启docker |
| **systemctl status docker** | 查看docker状态 |
| **systemctl enable docker** | 开机启动docker |
| **docker info** | 查看docker该药信息 |
| **docker --help** | docker帮助文档 |
| **docker 具体命令 --help** | docker命令帮助文档 |

<a id="command-images"></a>
### 镜像相关

| 命令   | 描述    |
|--------------- | --------------- |
| <a href="#commands-images">docker images</a>   | 列出docker内的镜像   |
| <a href="#commands-search">docker search</a> | 搜索镜像 |
| <a href="#commands-pull">docker pull</a> | 从仓库拉取镜像 |
| **docker system df** | 查看镜像/容器/数据卷所占用空间 |
| <a href="#commands-rmi">docker rmi</a> | 删除镜像 |

<a id="command-container"></a>
### 容器相关

| 命令   | 描述    |
|--------------- | --------------- |
| <a href="#commands-run">docker run</a>   | 新建+启动容器   |
| <a href="#commands-ps">docker ps</a>   | 列出当前所有正在运行的容器 |
| **docker start** | 启动容器 |
| **docker restart** | 重启容器 |
| **docker stop** | 停止容器 |
| **docker kill** | 强制停止容器 |
| **docker stats** | 查看运行中容器的状态 |
| <a href="#commands-rm">docker rm</a>   | 删除已经停止的容器 |
| <a href="#commands-logs">docker logs</a>   | 查看容器日志信息 |
| **docker top** | 查看容器内部运行的进程 |
| **docker inspect** | 查看容器内部细节 |
| <a href="#commands-exec">docker exec</a>   | 进入正在运行的容器以命令行交互 |
| **docker attach** | 进入正在运行的容器以命令行交互，退出时会之间停止容器 |
| <a href="#commands-cp">docker cp</a>   | 将容器内文件复制到主机下 |
| <a href="#commands-export">docker export</a>   | 导出容器 |
| <a href="#commands-import">docker import</a>   | 导入镜像 |
| <a href="#commands-commit">docker commit</a>   | 将容器打包为镜像并提交到本地 |

<a id="command-volume"></a>
### 数据卷相关

| 命令   | 描述    |
|--------------- | --------------- |
| **docker volume ls**   | 列出数据卷   |
| **docker volume create**   | 新建数据卷   |
| **docker volume inspect**   | 显示数据卷详细信息   |
| **docker volume rm**   | 删除数据卷   |

<a id="command-network"></a>
### 网络相关

| 命令   | 描述    |
|--------------- | --------------- |
| **docker network ls**   | 列出网络   |
| **docker network create**   | 新建网络   |
| **docker network inspect**   | 显示网络详细信息   |
| **docker network rm**   | 删除网络   |
| **docker network connect**   | 将一个容器连接到某个网络上   |
| **docker network disconnect**   | 将一个容器从某个网络上断开   |
| **docker network prune**   | 删除未使用的网络   |

<a id="command-compose"></a>
### 容器编排相关

> docker compose 相关命令都需要在`docker-compose.yaml`文件同级目录下执行

| 命令   | 描述    |
|--------------- | --------------- |
| **docker compose up**   | 启动所有服务   |
| **docker compose down**   | 停止并删除容器、网络、数据卷、镜像   |
| **docker compose exec**   | 进入指定容器内部   |
| **docker compose ps**   | 显示所有编排的容器   |
| **docker compose top**   | 显示所有编排的容器内的进程   |
| **docker compose logs**   | 查看指定容器内日志   |
| **docker compose config**   | 查看配置   |
| **docker compose start**   | 启动服务   |
| **docker compose restart**   | 重启服务   |
| **docker compose stop**   | 停止服务   |

### 命令详情

<a id="commands-images"></a>
#### docker images

* 列出docker内所有镜像
* 列说明
    * `REPOSITORY`：镜像的仓库源
    * `TAG`：镜像标签版本号
    * `IMAGE ID`：镜像id
    * `CREATED`：镜像创建时间
    * `SIZE`：镜像大小
* 同一个仓库源可以有多个TAG版本，代表这个仓库源的不同版本
* 如果不指定镜像的版本标签，默认使用`镜像名:latest`镜像

```bash
docker images
# 列出本地所有的镜像
docker images -a
# 只显示镜像的id
docker images -q
```

<a id="commands-search"></a>
#### docker search

* 从[官方镜像仓库](https://hub.docker.com/)搜索镜像
* 列说明
    * `NAME`：镜像名称
    * `DESCRIPTION`：镜像说明
    * `STARS`：点赞数
    * `OFFICIAL`：是否官方
    * `AUTOMATED`：是否自动构建

```bash
# 只显示前5条搜索信息
docker search --limit 5 redis
```

<a id="commands-pull"></a>
#### docker pull

* 下载镜像
* 格式：`docker pull 镜像名:[TAG]`

```bash
# 下载最新版
docker pull redis
# 下载指定版本
docker pull redis:6.2
```

<a id="commands-rmi"></a>
#### docker rmi

* 删除镜像
* 格式：`docker rmi 镜像id`

```bash
# 根据镜像id删除镜像id使用docker images查看
docker rmi f7d0a5ed08a2

# 强制删除
docker rmi -f f7d0a5ed08a2

# 删除多个
docker rmi -f redis7.4.0 redis:6.2

# 删除所有镜像
docker rmi -f $(docker images -qa)
```
---

<a id="commands-run"></a>
#### docker run

* 格式：`docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`
* 选项说明
    * `--name='容器名称'`：为容器指定一个名称
    * `-d`：后台运行容器并返回一个容器id，也叫启动守护式容器（后台运行）
    * `-P`：随机端口映射，大写P
    * `-p`：指定端口映射，小写p
    * `-i`：以交互模式运行容器，通常与`-t`同时使用
    * `-t`：为容器重新分配一个伪终端，通常与`-i`同时使用
    * `-v`：指定目录映射
    * `--volumes-from`：继承某个容器的目录映射关系
    * `--network`：指定容器的网络模式
    * `--restart=always`：docker程序启动后自动启动这个容器

```bash
# 后台启动容器并指定一个名称（启动守护式容器）
docker run -d --name='debian1' debian

# 后台启动容器并将容器的/usr/share/nginx目录映射到主机的/usr/local/web目录
docker run -d -v /usr/local/web:/usr/share/nginx --name='nginx' nginx

# 后台启动名称为n2的nginx容器，目录关系继承至nginx容器
docker run -d -volumes-from nginx --name n2 nginx

# 启动容器并运行容器内的shell与容器进行交互
docker run -it debian /bin/bash
```
<a id="commands-ps"></a>
#### docker ps

* 选项说明
    * `-a`：列出当前所有正在运行的容器+之前运行过的容器
    * `-l`：显示最近创建的容器
    * `-n`：显示最近n个创建的容器
    * `-q`：只显示容器的编号

```bash
# 查看所有容器
docker ps -a

# 显示前3个创建的容器
docker ps -n 3

# 显示所有容器的编号
docker ps -q

# 查看所以从debian镜像启动的容器 
docker ps -af ancestor=debian -q
```

<a id="commands-rm"></a>
#### docker rm

```bash
# 删除指定容器，如果容器正在运行则无法删除
docker rm f7d0a5ed08a2

# 删除指定容器
docker rm -f f7d0a5ed08a2

# 强制删除所有容器
docker rm -f $(docker ps -a -q)
```
<a id="commands-logs"></a>
#### docker logs

```bash
# 查看指定id容器的日志
docker logs f7d0a5ed08a2

# 查看容器日志最后5行
docker logs -n 5 f7d0a5ed08a2 

# 类似linux的tail -f命令
docker logs -f f7d0a5ed08a2
```
<a id="commands-exec"></a>
#### docker exec

* 和`docker attach`的区别是：`docker exec`进入容器后退出不会关闭容器，而`docker attach`会

```bash
# 以交互式命令行进入容器内部
docker exec -it debian1 /bin/bash
```
<a id="commands-cp"></a>
#### docker cp

```bash
# 将debian容器内/tmp目录下的a.txt文件复制到当前目录下
docker cp debian1:/tmp/a.txt ./a.txt
```
<a id="commands-export"></a>
#### docker export

* 将运行中的容器导出为文件
* 可以保存容器内程序生产的内容

```bash
# 将这个容器导出为debian1.tar文件
docker export debian1 > debian1.tar
```

<a id="commands-import"></a>
#### docker import

* 配合`docker export`使用
* 导入后会生成一个新的镜像

```bash
# 导入镜像，导入的镜像名称custom/debian2版本为1.0
docker import debian1.tar custom/debian2:1.0
```
<a id="commands-commit"></a>
#### docker commit

```bash
# 将之间的镜像新加一个软件后提交到本地 
docker commit -m "add new software" -a "y" debian1 y/deb:1.1
```

<a id="command-images-desc"></a>
## docker镜像

* 镜像是一种轻量级、可执行的独立软件包，包含运行某个软件所需的所有内容，
我们把应用程序和配置依赖打包好形成一个可交付的运行环境（包括代码、运行时需要的库、
环境变量和配置文件等），这个打包好的运行环境就是image镜像文件

* docker镜像是由层级文件系统（UnionFS）组成
* docker最底层是由bootfs+rootfs组成，rootfs就是不同的Linux发行版，这些发行版都是最精简的
* 每一个应用程序镜像都是多个镜像组成，例如nginx是由**底层操作系统**+**nginx软件**组成
* docker镜像层都是只读的，容器层是可写的
    * 启动容器后，由于容器是基于镜像启动的，所有在镜像之上叫容器层
* 新建自己的镜像可以从底层开始构建也可以使用<a href="#commands-commit">docker commit</a>命令基于某个镜像构建

## 本地镜像发布到云端流程

* 和git类似先commit到本地再push到远程

### docker私有库

* 下载私有库服务`docker pull registry`后进行配置

## Docker容器数据卷

* 将docker容器内的数据保存进宿主机的磁盘中
* 运行一个带有容器数据卷功能的容器实例，参考<a href="#commands-run">docker run</a>
* 使用`-v`参数创建的目录映射关系默认是匿名的，使用<a href="#command-volume">数据卷</a>相关命令管理数据卷

<a id="dockerfile"></a>
## Dockerfile

* Dockerfile是用来构建docker镜像的文本文件，是由一条条构建镜像所需的指令和参数构成的脚本。

### Dockerfile指令

* 每个指令必须为大写
* 指令从上到下顺序执行
* `#`表示注释

<a id="dockerfile-instructions"></a>

| 指令   | 说明    |
|--------------- | --------------- |
| **FROM**   | 基础镜像，当前新镜像是基于哪个镜像构建的，指定一个已存在的镜像作为模板，第一条必须是FROM   |
| **MAINTAINER** | 镜像维护者的姓名和邮箱 |
| **RUN** | 容器构建时需要运行的命令 |
| **EXPOSE** | 当前容器对外暴露的端口 |
| **WORKDIR** | 指定容器创建后，终端默认登录进来的目录 |
| **USER** | 指定镜像以什么用户执行，默认root |
| **ENV** | 用来在构建镜像过程中设置环境变量 |
| **ADD** | 将宿主机下的文件拷贝进镜像内，如果是tar文件则会自动解压，支持URL地址下载文件 |
| **COPY** | 拷贝文件或目录到镜像内 |
| **VOLUME** | 容器数据卷 |
| <a href="#dockerfile-instruction-cmd">CMD</a> | 指定容器启动后执行的命令 |
| <a href="#dockerfile-instruction-entrypoint">ENTRYPOINT</a> | 也是用来指定容器启动后执行的命令 |

#### 指令详情

<a id="dockerfile-instruction-cmd"></a>
##### CMD

* 有两种格式：
    * shell格式：`CMD 命令 参数1 参数2`
    * exec格式：`CMD ["可执行文件" "参数1" "参数2"]`
* 配合<a href="#dockerfile-instruction-entrypoint">ENTRYPOINT</a>则CMD后接参数：`CMD ["参数1" "参数2"]`
* Dockerfile中只能有一条CMD指令。如果编写了多个CMD指令，则只有最后一个生效。
* CMD会被`docker run`命令最后一个命令参数覆盖
* CMD在`docker run`的时候执行，RUN是在`docker build`时执行

<a id="dockerfile-instruction-entrypoint"></a>
##### ENTRYPOINT

* 类似CMD指令，但是不会被`docker run`后面的命令覆盖，`docker run`后面的命令会被当作ENTRYPOINT执行可执行程序的参数
* ENTRYPOINT与CMD命令配合则ENTRYPOINT为指定**可执行命令**，而CMD指定**命令的参数**

#### 构建测试

* 基于ubuntu:24.0.4构建一个带jdk17的镜像
* 将jdk压缩包和Dockerfile放在同一个目录下

```Dockerfile
FROM ubuntu:24.04

WORKDIR /usr/local/jdk

ADD ./jdk-17.0.11_linux-x64_bin.tar.gz /usr/local/jdk

ENV JAVA_HOME /usr/local/jdk/jdk-17.0.11
ENV PATH $PATH:$JAVA_HOME/bin

RUN java -version

CMD /bin/bash
```

<a id="dockerfile-dangling"></a>
#### 虚悬镜像

* 测试构建一个虚悬镜像
* Dockerfile

```Dockerfile
FROM ubuntu:24.04
CMD echo 123
```

* 执行`docker build .`命令就会生成一个虚悬镜像
* 使用`docker images -f dangling=true`命令查询所以的虚悬镜像
* 使用`docker rmi $(docker images -qf dangling=true)`命令删除所有的虚悬镜像

<a id="docker-network-desc"></a>
## Docker网络（network）

> <a href="#command-network">docker网络命令参考</a>

* 进行容器之间的互联和通信以及端口映射
* 容器ip变动时可以通过服务名连接，通信不受影响 

<a id="docker-network-modes"></a>
### Docker网络模式

* docker会在宿主机虚拟一个网桥（docker0），启动一个容器时docker会根据这个虚拟网桥的网段分配给容器一个ip。
可以将虚拟网桥（docker0）理解为一个交换机，宿主机通过这个交换机连接到每一个容器

| 网络模式   | 简介    |
|--------------- | --------------- |
| bridge   | 为每一个容器都分配一个虚拟网络、设置ip等，并将容器连接到一个docker0。虚拟网桥，默认就是这个模式   |
| host | 使用宿主机的ip和端口 |
| none | 不进行任何网络设置 |
| container | 创建的容器和指定的容器共享ip、端口等 |

<a id="docker-network-bridge"></a>
#### bridge

* 将容器的网络连接到虚拟网桥（docker0）上，根据虚拟网桥的的网段分配一个ip给容器

```bash
# 模式就是bridge网络模式，使用宿主机ip+8080访问
docker run -d --name n3 --network bridge -p 8080:80 nginx
```

<a id="docker-network-host"></a>
#### host

> docker desktop在4.34之前无法支持host模式

```bash
# 使用宿主机ip+80访问
docker run -d --name n3 --network host nginx
```

* 直接使用宿主机的ip与外界通信

<a id="docker-network-none"></a>
#### none

* 禁用网络

```bash
# 宿主机无法通过网络访问容器
docker run -d --name n3 --network none nginx
```

<a id="docker-network-container"></a>
#### container

* 新建的容器和指定的容器共享ip配置
* **使用问题**
    * `docker run`时`--network container:容器名`参数无法和`-p`参数一起使用
    * 由于两个容器使用同一个网络配置，如果两个容器内服务默认端口相同，后启动的容器因为端口冲突无法启动

<a id="docker-network-container-demo"></a>
##### nginx代理tomcat

> 启动nginx和tomcat两个容器，tomcat共享nginx的网络，实现nginx代理tomcat服务

* 启动两个容器

```bash
# 启动nginx容器映射到宿主机的80端口
docker run -d --name n1 -p 80:80 nginx
# 启动tomcat容器并和nginx容器共享网络
docker run -d --name t1 --network container:n1 tomcat
```

* 测试两个容器是否可以互相访问

```bash
# 在nginx容器内执行curl命令访问tomcat服务
docker exec -it n1 curl http://localhost:8080

# 在tomcat容器内执行curl命令访问nginx服务
docker exec -it n1 curl http://localhost:80
```

* 添加自定义tomcat首页

```bash
# 进入tomcat容器内
docker exec -it t1 bash

# 由于容器默认就在tomcat相关目录下所以之间进入项目目录
cd webapps

# 创建文件夹并新建简单的html文件
mkdir myapp
cd myapp
touch index.html
tee index.html <<eof
<h1>Hello Tomcat!</h1>
eof
```

* 配置nginx代理tomcat地址

```bash
docker run -d --name n1 -p 80:80 nginx

# 进入容器内部
docker exec -it n1 bash

# 添加tomcat代理配置
sed -i '12i\
location /myapp/ {\
    proxy_pass http://localhost:8080;\
}' /etc/nginx/conf.d/default.conf

# 重新加载nginx配置
nignx -s reload
```

* 最后访问`localhost:80/myapp`即可
* 两个容器共享网络的情况下如果nginx容器重启了，tomcat容器必须也重启，不然无法访问

<a id="docker-network-custom"></a>
#### 自定义网络

<a id="docker-network-custom-demo-before"></a>
##### nignx代理2个tomcat，不使用自定义网络

* 启动并配置两个tomcat

```bash
# 配置第一个tomcat
docker run -d --name t1 -p 8081:8080 tomcat:9.0
docker exec -it t1 bash
mkdir webapps/app1 && touch webapps/app1/index.html && tee webapps/app1/index.html <<eof
<h1>Tomcat1</h1>
eof

# 退出容器
exit

# 配置第二个tomcat
docker run -d --name t2 -p 8082:8080 tomcat:9.0
docker exec -it t2 bash
mkdir webapps/app2 && touch webapps/app2/index.html && tee webapps/app2/index.html <<eof
<h1>Tomcat2</h1>
eof
```

* 启动并配置代理两个tomcat
* 使用`http://localhost/app1/`访问Tomcat1，使用`http://localhost/app2/`访问Tomcat2

```bash
docker run -d --name n1 -p 80:80 nginx
docker exec -it n1 bash
# 下面的ip根据自己容器内ip填写
sed -i '12i\
location /app1/ {\
    proxy_pass http://172.17.0.2:8080;\
}\
location /app2/ {\
    proxy_pass http://172.17.0.3:8080;\
}' /etc/nginx/conf.d/default.conf

nginx -s reload
```

* 如果此时将t2停止启动一个t3，t3访问地址和t2一样
* 此时访问`http://localhost/app2/`就会出现Tomcat3的内容

```bash
# 停止t2容器
docker stop t2

# 启动并配置t3容器
docker run -d --name t3 -p 8083:8080 tomcat:9.0
docker exec -it t3 bash
mkdir webapps/app2 && touch webapps/app2/index.html && tee webapps/app2/index.html <<eof
<h1>Tomcat3</h1>
eof
```

<a id="docker-network-custom-demo-after"></a>
##### 使用自定义网络

* 新建自定义网络

```bash
docker network create custom_network
```

* 使用自定义网络启动

```bash
# 断开之前的网络配置，也可以再容器创建时加上--network custom_network指定自定义网络
docker network disconnect bridge t1
docker network disconnect bridge t2
docker network disconnect bridge n1

# 连接自定义网络配置
docker network connect custom_network t1
docker network connect custom_network t2
docker network connect custom_network n1


# 进入nginx容器内并删除之前的配置
docker exec -it n1 bash
sed -i '12,17d' /etc/nginx/conf.d/default.conf

# 使用容器名替换ip
sed -i '12i\
location /app1/ {\
    proxy_pass http://t1:8080;\
}\
location /app2/ {\
    proxy_pass http://t2:8080;\
}' /etc/nginx/conf.d/default.conf

nginx -s reload
```

* 此时再关闭t2启动t3后，`http://localhost/app2/`就无法访问

<a id="docker-compose"></a>
## Docker-Compose（容器编排）

* docker-compose负责实现对容器集群的快速编排，通过定义`docker-compose.yaml`文件，
写好多个容器之间的调用关系，只需要一个命令就能同时启动或关闭这些容器

<a id="docker-compose-demo"></a>
### nignx代理2个tomcat，使用docker-compose进行容器编排

* 准备一个nginx镜像和tomcat镜像
* 按以下结构创建目录

```txt
docker-compose-demo
│
├─nginx-apps
│ │
│ └─Dockerfile
│
├─tomcat-app1
│ │
│ └─Dockerfile
│
├─tomcat-app2
│ │
│ └─Dockerfile
│
└─docker-compose.yaml
```

* `nignx-apps/Dockerfile`

```Dockerfile
FROM nginx

RUN sed -i '12i\
location /app1/ {\
    proxy_pass http://tomcat-app1:8080;\
}\
location /app2/ {\
    proxy_pass http://tomcat-app2:8080;\
}' /etc/nginx/conf.d/default.conf
```

* `tomcat-app1/Dockerfile`

```Dockerfile
FROM tomcat:9.0

RUN mkdir webapps/app1
RUN touch webapps/app1/index.html
RUN tee webapps/app1/index.html <<eof
<h1>Tomcat1</h1>
eof
```

* `tomcat-app2/Dockerfile`

```Dockerfile
FROM tomcat:9.0

RUN mkdir webapps/app2
RUN touch webapps/app2/index.html
RUN tee webapps/app2/index.html <<eof
<h1>Tomcat2</h1>
eof
```

* `docker-compose.yaml`

```yaml
version: "1"

services:
  nginx-apps:
    # image: nginx-apps
    build: ./nginx-apps
    container_name: nginx-apps
    ports:
      - "80:80"
    networks:
        - my_network
    depends_on:
      - tomcat-app1
      - tomcat-app2
  tomcat-app1:
    # image: tomcat-app1
    build: ./tomcat-app1
    container_name: tomcat-app1
    ports:
      - "8081:8080"
    networks:
        - my_network
  tomcat-app2:
    # image: tomcat-app2
    build: ./tomcat-app2
    container_name: tomcat-app2
    ports:
      - "8082:8080"
    networks:
        - my_network
networks:
  my_network:
    name: my_metwork
```

* `docker compose`相关命令都要在`docker-compose.yaml`文件同级目录下执行
* 执行`docker compose config -q`检查`docker-compose.yaml`文件格式
* 执行`docker compose up -d`，一键从镜像构建到容器启动


<a id="docker-tools"></a>
## docker相关工具

* 可视化工具[portainer](https://www.portainer.io/)
* 容器监控**cAdvisor**+**InfluxDB**+**Granfana**

<a id="docker-troubleshooting"></a>
## 常见问题

<a id="docker-troubleshooting-1"></a>
### docker虚悬镜像是什么

* 仓库名和标签都是`<none>`

<a id="docker-troubleshooting-2"></a>
### docker挂载主机目录访问如果出现cannot open directory .: Permission denied

* 在挂在目录后加`--privileged=true`参数即可

<a id="docker-troubleshooting-3"></a>
### 没有ip或ifconfig等查看网络命令怎么查看linux的ip

* 使用`cat /proc/net/fib_trie`查看
* 以下面文本为例，这个容器的ip为`127.17.0.2`，在Local内的倒数第四行

```txt
Main:
  +-- 0.0.0.0/0 3 0 5
     |-- 0.0.0.0
        /0 universe UNICAST
     +-- 127.0.0.0/8 2 0 2
        +-- 127.0.0.0/31 1 0 0
           |-- 127.0.0.0
              /8 host LOCAL
           |-- 127.0.0.1
              /32 host LOCAL
        |-- 127.255.255.255
           /32 link BROADCAST
     +-- 172.17.0.0/16 2 0 2
        +-- 172.17.0.0/30 2 0 2
           |-- 172.17.0.0
              /16 link UNICAST
           |-- 172.17.0.2
              /32 host LOCAL
        |-- 172.17.255.255
           /32 link BROADCAST
Local:
  +-- 0.0.0.0/0 3 0 5
     |-- 0.0.0.0
        /0 universe UNICAST
     +-- 127.0.0.0/8 2 0 2
        +-- 127.0.0.0/31 1 0 0
           |-- 127.0.0.0
              /8 host LOCAL
           |-- 127.0.0.1
              /32 host LOCAL
        |-- 127.255.255.255
           /32 link BROADCAST
     +-- 172.17.0.0/16 2 0 2
        +-- 172.17.0.0/30 2 0 2
           |-- 172.17.0.0
              /16 link UNICAST
           |-- 172.17.0.2
              /32 host LOCAL
        |-- 172.17.255.255
           /32 link BROADCAST
```

