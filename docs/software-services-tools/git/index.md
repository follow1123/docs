# Git

* [官网](https://git-scm.com/)
* [下载地址](https://git-scm.com/downloads)
* 推荐使用[Lazygit](https://github.com/jesseduffield/lazygit)工具

## 常用命令


| 命令   | 描述    |
|--------------- | --------------- |
| [git branch](#git-branch)   | 分支相关   |
| [git merge](#git-merge)   | 分支合并相关   |
| [git checkout](#git-checkout)   | 切换分支或恢复文件   |
| [git reset](#git-reset)   | 重置相关   |
| [git submodule](#git-submodule)   | 子模块相关相关   |

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

## 初始化

* `git init` - 初始化 git 本地仓库
* `git clone <url>` - 克隆远程仓库到本地
* `git clone -b <branch_name>/<tab_name> <url>` - 克隆远程仓库到本地，指定克隆的分支或 tag

## 提交（commit）

* `git status` - 查看**工作区**和**暂存区**状态信息
* `git status -s` - 查看**工作区**和**暂存区**简短的状态信息
* `git commit` - 提交**暂存区**内的所有文件。这个命令会打开一个编辑器用于编写提交信息（使用 `git config --global core.editor` 配置）
* `git commit -m '<message>'` - 提交**暂存区**内的所有文件，直接指定提交信息
* `git rm -f <file>` - 将**暂存区**和**工作区**的指定文件一起删除。`-f`：强制移除
* `git rm --cached <file>` - 将已经存放到**暂存区**的文件移除，不删除**工作区**内的这个文件
* `git mv <path_file> <to_path_file>` - 将**暂存区**内的文件移动或重命名
* `git diff` - 查看**工作区**内的这个文件和这个文件上一次提交的版本进行对比
* `git diff --staged/--cached` - 查看**暂存区**内的这个文件和这个文件上一次提交的版本进行对比
* `git commit --amend` - 修正提交，提交后发现有个文件忘改了，可以修改后使用这个命令直接怼进上一次提交里面，这个命令也会打开编辑器编写提交信息
* `git commit --amend --no-edit` - 修正提交，不指定提交信息
* `git restore <file>` - 将**工作区**内的指定文件恢复成上次提交的样子，撤消对文件的修改
* `git restore --staged <file>` - 将**暂存区**内的指定文件恢复成上次提交的样子

### 修正上次提交

将当前工作区内已经暂存的文件直接加入到上次的提交内

* `git commit -amend` - 打开编辑器并修改提交信息
* `git commit --amend --no-edit -m 'new commmit message'` - 直接修改提交信息

:::warning
这个操作会修改提交信息的 hash 值，如果 commit 已经提交到远程仓库，谨慎使用
:::

## 配置（config）

* `git config --list` - 查看所有配置信息
* `git config --list --local/--global` - 查看指定作用域配置信息，`local`：仓库内，`global`：当前用户，`system`：全局
* `git config --list --show-origin` - 查看所有配置信息，并显示配置来源

## 分支（branch）

### merge

### rebase

## 远程（remote）

* `git remote` - 查看远程仓库
* `git remote -v` - 查看远程仓库，和url
* `git remote show <remote_name>` - 查看指定远程详细信息
* `git remote add <remote_name> <url>` - 添加远程仓库
* `git fetch <remote_name>` - 将远程仓库的内容拉取到本地仓库，如果只有一个远程仓库，则不用指定 `<remote_name>`
* `git push <remote_name> <local_branch>` - 将本地的仓库的指定分支提交到指定的远程仓库
* `git remote rename <old_name> <new_name>` - 重命名远程仓库
* `git remote remove <remote_name>` - 删除远程仓库

## 日志（log）

* `git log` - 查看提交信息
* `git log -p -1` - 查看上一次提交的详细信息 `-p`：显示提交内所有文件对比的详细信息，`-1`：最近的一次提交
* `git log -1 --stat` - 查看上一次提交的内容的简短信息，只显示文件新增或修改的统计信息
* `git log --graph` - 查看提交信息，并以字符图像方式显示分支、合并信息
* `git log --oneline` - 每个提交只显示一行简单信息
* `git log --oneline --parents` - 显示提交的从哪次提交过来，方便查看分支合并信息

## 忽略文件

在当前仓库根目录添加 `.gitignore` 文件

```bash
# 忽略项目内所有名称包含 aaa 的文件
aaa

# 忽略所有的 html 文件
*.html

# 忽略 .gitignore 文件根目录下 bbb 目录内的所有文件
/bbb/*

# 在上面忽略条件的情况下排除 public.txt 文件，也就是不忽略 /bbb/public.txt 文件
!/bbb/public.txt

# 忽略 /ccc 目录及其子目录下的所有 class 文件
/ccc/**/*.class
```

:::info[不使用 `.gitignore` 忽略文件]
将上面的条件添加到 `.git\info\exclude` 文件内

假设你有一个公共的仓库，需要在这个仓库内放一些不能提交到的文件，也不想放在 `.gitignore` 里面忽略，可以使用这种方式
:::

## 分支冲突

## 重置/撤销

### reset

### revert

## 操作日志（reflog）

## 压缩（squash）

## 隐藏（stash）

## 标签（tags）

* `git tag` - 查看所有 tag
* `git tag -a '<tag_name>' -m '<message>'` - 给**本地仓库**内最新的一次提交打 tag
* `git tag -a '<tag_name>' -m '<message>' <commit_hash>` - 给**本地仓库**内指定的提交打 tag
* `git show <tab_name>` - 查看指定 tag 的详细信息
* `git tag -d <tag_name>` - 删除本地的标签
* `git push origin <tab_name>` - 将指定标签推送到远程仓库
* `git push origin --tags` - 将远程仓库没用的标签推送到远程仓库
* `git push origin --delete <tag_name>` - 删除远程仓库上指定的标签，默认删除本地的标签不会删除远程的标签，需要单独执行这条命令删除
* `git checkout -b <branch_name> <tab_name>` - 使用指定 tag 的提交创建一个分支。方便查看某个 tag 的时仓库的详细信息

## Cherry Pick

## Bisect

## 子模块

* 位于仓库下的`.gitmodules`文件
```txt
[submodule "子模块名称"]
    path = "子模块名称"
    url = "子模块git url"
    active = true
    ignore = all
```

---

## git操作示例

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

### 删除切换分支时后之前分支的空文件夹

* 使用`git clean -df`删除

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
