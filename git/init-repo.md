---
sidebar_position: 1
---

# 仓库初始化

## `git init`

### 初始化本地仓库

```bash
# 创建仓库的文件夹，并进入
mkdir example-repo
cd example-repo

# 初始化仓库
git init
```

### 初始化裸仓库

用于作为服务器端仓库

```bash
# 创建仓库的文件夹，并进入
mkdir example-bare
cd example-bare

# 初始化裸仓库
git init --bare
```

## `git clone`

### 克隆远程仓库

```bash
# 克隆远程仓库到当前目录下，目录名称就是仓库名
git clone <remote_url>

# 克隆远程仓库到当前目录下，仓库名称为 example-clone
# 克隆下来的地址可以指定相对路径或绝对路径
git clone <remote_url> example-clone
```

### 克隆远程仓库的分支或 tag

如果需要克隆指定的分支或 tag 可以使用 `-b` 或 `--branch` 选项

```bash
# 克隆指定的分支
git clone -b <branch_name> <remote_url>

# 克隆指定的 tag
git clone -b <tag_name> <remote_url>
```

### 克隆远程仓库指定远程仓库名称

克隆下来的仓库对应的远程名称默认是 origin 可以使用 `--origin` 选项修改

```bash
git clone --origin <remote_name> <remote_url>
```

### 克隆远程仓库只克隆少量提交历史

如果只需要下载源码编译成软件，只需要添加 `--depth` 选项，指定只下载少量的提交历史，加快克隆速度

```bash
# 克隆指定仓库，只下载最近的一次历史和整个仓库的文件
git clone --depth 1 <remote_url>
```

