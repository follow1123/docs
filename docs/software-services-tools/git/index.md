# Git

* [官网](https://git-scm.com/)
* [下载地址](https://git-scm.com/downloads)
* 推荐使用[Lazygit](https://github.com/jesseduffield/lazygit)工具

## 常用命令


| 命令   | 描述    |
|--------------- | --------------- |
| [git remote](#git-remote)   | 远程相关   |
| [git pull](#git-pull)   | 拉取相关   |
| [git push](#git-push)   | 推送相关   |
| [git clone](#git-clone)   | 克隆相关   |
| [git add](#git-add)   | 添加到暂存区   |
| [git commit](#git-commit)   | 提交代码到本地仓库   |
| [git rm](#git-rm)   | 删除相关   |
| [git log](#git-log)   | 日志相关   |
| [git reflog](#git-reflog)   | 操作日志相关   |
| [git branch](#git-branch)   | 分支相关   |
| [git merge](#git-merge)   | 分支合并相关   |
| [git diff](#git-diff)   | 版本对比相关   |
| [git checkout](#git-checkout)   | 切换分支或恢复文件   |
| [git reset](#git-reset)   | 重置相关   |
| [git config](#git-config)   | 配置相关   |
| [git submodule](#git-submodule)   | 子模块相关相关   |

### 命令详情

#### git remote

```bash
# 查看远程信息
git remote -v

# 删除远程地址
git remote rm 远程名

# 重命名远程
git remote rename 远程名 新远程名
```

#### git pull

```bash
# 直接从远程拉取文件
git pull

# 从远程拉取某个分支并新建这个分支
git checkout -b 本地分支名 远程分支名
```

#### git push

```bash
```

#### git clone

```bash
# 指定分支或tag拉取
git clone -b 分支名或tag名 url
```

#### git add

```bash
# 添加到暂存区
git add .
```

#### git commit

```bash
# 提交到本地仓库
git commit -m "备注"
```

#### git rm

```bash
# git停止跟踪一个文件
git rm --cached 文件名

# 从本地库中删除文件
git rm 文件名
```

#### git log

```bash
# 显示提交日志
git log

# 显示提交流程线
git log --graph 

# 显示简化日志
git log --oneline
```

#### git reflog

```bash
# 显示操作日志
git reflog
```

#### git branch

```bash
# 查看分支
git branch

# 修改分支名称
git branch -M 新名称

# 删除分支
git branch -d 分支名
```

#### git merge

```bash
# 合并分支，先切换到一个需要被合并的分支
git merge 分支名
```

#### git diff

```bash
# 查看版本差异
git diff commit_id1 commit_id1 file
```

#### git checkout

```bash
# 切换分支
git checkout 分支名

# 切换分支，没有则新建一个
git checkout -b 分支名

# 恢复删除的文件
git checkout -- 文件名
```

#### git reset

```bash
# 将当前工作区文件的版本还原到指定的版本，版本号使用git log可以获取
git reset 版本号 文件名

# 撤掉操作
git reset --hard reflog_id
```

#### git config

```bash
# 查看系统配置
git config --system --list

# 查看全局配置
git config --global --list

# 查看本地配置
git config --local --list

# 设置全局提交的用户信息
git config --global user.name ""
git config --global user.email ""
```

#### git reset

```bash
# 将当前工作区文件的版本还原到指定的版本，版本号使用git log可以获取
git reset 版本号 文件名

# 撤掉操作
git reset --hard reflog_id
```

#### git submodule

```bash
# 初始化子模块
git submodule init 

# 添加子模块
git submodule add https://github.com/example/scripts.git scripts

# 删除所有子模块
git submodule deinit -f --all
```

---

## 子模块

* 位于仓库下的`.gitmodules`文件
```txt
[submodule "子模块名称"]
    path = "子模块名称"
    url = "子模块git url"
    active = true
    ignore = all
```

## git操作示例

### 删除切换分支时后之前分支的空文件夹

* 使用`git clean -df`删除

### 将历史某一次提交删除

* 假如对分支A进行操作，需要删除提交m
* 先将基于当前分支创建一个新分支B
* 将分支A重置到m提交前一次提交`git reset --hard`
* 再将分支B内m提交后所有提交摘取到分支A上
  * `git cherry-pick 提交id`摘取一个提交
  * `git cherry-pick 提交idA..提交idB`摘取从A到B所有提交，不包括提交A
  * `git cherry-pick 提交idA^..提交idB`摘取从A到B所有提交，包括提交A

### 使用token推送到github

* `git remote add origin https://oauth2:[token]@github.com/<user_name>/<repo_name>.git`

### 删除远程仓库上的tag

* `git push origin --delete <tag_name>`

---

## commit规范参考


### commit组成部分

* header 是必要的
* body 也是必要的，除了类型为 docs 之外，body 的内容必须大于 20 个字符
* footer 是可选的，比如放置引用的 issue

```txt
<header>
<空一行>
<body>
<空一行>
<footer>
```

* 示例

```txt
fix: 简要说明
详细说明
关闭某个pr
```

### commit的header类型

| 类型 | 描述 |
| --- | :-- |
| build	| 影响构建系统或外部依赖的更改 (示例范围：gulp, broccoli, npm) |
| ci | 对CI配置文件和脚本的更改 (示例：CircleCi, SauceLabs, GitHub Workflow) |
| docs | 仅文档更改 |
| feat | 新功能 |
| fix | 错误修复 |
| perf | 改善性能的代码更改 |
| refactor | 既不修复错误也不添加功能的代码更改 |
| test | 添加缺失测试或更正现有测试 |


---

## 常见问题

### 设置git日志输出的编码格式

```bash
git config --global core.quotepath false          # 显示 status 编码 
git config --global gui.encoding utf-8            # 图形界面编码 
git config --global i18n.commit.encoding utf-8    # 处理提交信息编码 
git config --global i18n.logoutputencoding utf-8  # 输出 log 编码 
```

### 解除SSL验证

* `git config --global http.sslVerify false`

### 设置项目push时buffer的大小

* 本地仓库配置：`git config http.postBuffer 1024000000`
* 全局配置：`git config –global http.postBuffer 1024000000`

### 本地永久保存Token

* 配置凭证保存方式：`git config --global credential.helper store`
* 下次拉取或推送时提示需要输入用户名和密码
    * 用户名输入账户名称
    * 密码就输入Token
    * 凭证保存在`~/.git-credentials`

### GitHub Actions自动发布

1. 当前仓库下创建`.github/workflows/release.yml`文件

```yaml
name: Build Release

on:
  push:
    tags:
      - "v*.*.*" # 当推送版本号为v0.1.0类似的格式时进行构建

jobs:
  build:
    runs-on: windows-latest # 在windows上进行构建，可选ubuntu-latest的Linux环境
    steps: # 以下操作是构建软件包时的步骤
      - name: Checkout code
        uses: actions/checkout@v2  # 检出代码
      - name: Build
        run: <scripts> # 这里可以写需要执行的脚本
      - name: Release
        uses: softprops/action-gh-release@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          files: <package-name> # 软件包名
```

2. 打开仓库，进入`Settings`页面
3. 找到`Actions`点击下面的`General`进入
4. 找到`Workflow permissions`部分
5. 选择`Read and write permissions`，勾选`Allow GitHub Actions to create and approve pull requests`

---

## 参考

* [如何写出干净的 Git Commit](https://mp.weixin.qq.com/s?__biz=Mzg4MjY3NTk5OA==&mid=2247484976&idx=1&sn=63ef68b9eb8c76f048809026ee48ca44&chksm=cf525e41f825d7571d4aaefcf3595ce91e1d3268934340fabdc0118d7797da486495a44f041a&scene=90&subscene=245&sessionid=1714743143&clicktime=1051534&enterid=1051534&ascene=56&fasttmpl_type=0&fasttmpl_fullversion=7185892-zh_CN-zip&fasttmpl_flag=0&realreporttime=1714743485555&devicetype=android-30&version=28002c51&nettype=WIFI&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&countrycode=CN&exportkey=n_ChQIAhIQujZ49ALiz1b2lAHlSpFXHRLcAQIE97dBBAEAAAAAAMlhBc%2FBdTAAAAAOpnltbLcz9gKNyK89dVj0f0rgg4PuZXnCh6Cj4xkhWRbID1qy2a4q9hJh%2FmqGguBwNDK0CujFrUmRh9Rrdxrqv6F4LUcVfkoR6SD0f42%2FO7DqtiwXfeT7%2BkC96Oj2TFZygMcKEFpT%2BPkjDHlqTx%2BgcTGrgcUaKaJ9Ssspu8CWCIaWG7hJUaPYMCDZC3TGuX23uYg6qfE3K9BNNyrAbu5DPdjBGyZ0yai8yAdjyTjS9I9xvfsNnHPoA3P5CA48jKhWr8H31V8%3D&pass_ticket=au9gdHuUfoKzzjLeSGcY27eaxRYcdNltC%2FoyQc9revXol%2Fe%2BRvchc2yC1r3VcdABrODy5HQGUb5CSn5XS%2FfwOQ%3D%3D&wx_header=3)
