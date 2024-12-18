---
sidebar_position: 7.1
---

# 搭建 Git 服务

## 本地 Git 服务

1. 创建 git 仓库文件夹

```bash
mkdir local-repo
cd local-repo
```

2. 初始化裸仓库

```bash
git init --bare
```

3. 克隆仓库

```bash
# 克隆本地仓库
git clone ./local-repo repo1

# 或者使用绝对路径

git clone file://<absolute_file_path> <repo_nam>
```
---

## SSH 协议 Git 服务

### 安装 ssh server

```bash
sudo apt install openssh-server
```

### ssh 密钥登录服务器

1. 生成密钥

```bash
ssh-keygen -t rsa -b 4096
```
2. 将本地的 `~/.ssh/id_rsa.pub` 文件内容追加到服务器上 `~/.ssh/authorized_keys` 文件内
3. 使用 `ssh <username>@<host>` 命令登录

### 在服务器上创建 git 裸仓库

1. 登录服务器
2. 创建 git 相关用户和组

```bash
sudo groupadd git
sudo useradd -g git gituser
```
3. 添加 ssh 密钥，免密登录，参考[ssh 密钥登录服务器](#ssh-密钥登录服务器)

4. 创建 git 仓库目录并初始化

```bash
sudo mkdir -p /srv/git/test-repo.git
cd /srv/git/test-repo.git
sudo git init --bare
```

5. 修改 git 仓库权限

```bash
sudo chown -R gituser:git /srv/git
```

6. 使用本机克隆远程仓库

```bash
git clone gituser@172.17.186.9:/srv/git/test-repo.git
```

---

## HTTP 协议 Git 服务

