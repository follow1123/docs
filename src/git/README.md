# git

* [官网](https://git-scm.com/)
* [下载地址](https://git-scm.com/downloads)

## 远程

* 查看远程信息： `git remote -v`

* 删除远程：`git remote rm 远程名`
* 重命名远程：`git remote rename 远程名 新远程名`
* 使用token push 到github

```bash
git remote add origin https://oauth2:[token]@github.com/follow1123/ide_configs.git
```

### 拉取

* 直接从远程拉取文件：`git pull`
* 从远程拉取某个分支并新建这个分支：`git checkout -b 本地分支名 m/远程分支名`
* 指定分支或tag拉取 `git clone -b 分支名、tag名 url` 

### 提交

* 添加到暂存区 

```bash
git add .
```
* 提交

```bash
git commit -m "备注"
```
* git停止跟踪一个文件

```bash
git rm --cached 文件名
```

* 设置提交的用户信息

```bash
git config --global user.name ""
git config --global user.email ""
```

* 提交日志

```bash
git log
# 显示提交流程线
git log --graph 
# 简化日志
git log --oneline
```

删除

* 从本地库中删除文件

```bash
git rm 文件名
```
## 还原

* 恢复删除的文件

```bash
git checkout -- 文件名
```

* 还原文件版本

```bash
# 版本号 使用 git log名称可以获取，如果还原从本地库删除的文件还需要使用 git checkout -- 名称还原文件
git reset 版本号 文件名
```
## 分支

* 查看分支

```bash
git branch
```

* 修改分支名称

```bash
git branch -M 新名称
```

* 查看版本差异

```bash
git diff 版本号1 版本号2 文件名
```


* 删除分支

```bash
git branch -d 分支名
```

* 切换分支，没有则新建一个

```bash
git checkout -b 分支名
```

### 合并分支

*  合并分支
  * 先切换到一个需要被合并的分支
  * 输入 `git merge 合并的分支`

### 还原合并的分支

* 输入 `git reflog` 显示提交信息
* 输入 `git reset --hard [reflog里面的id]` 还原

## 日志

* 查看日志 `git log`、`git reflog`



* 设置 git 的日志输出的编码格式

```bash
git config --global core.quotepath false          # 显示 status 编码 
git config --global gui.encoding utf-8            # 图形界面编码 
git config --global i18n.commit.encoding utf-8    # 处理提交信息编码 
git config --global i18n.logoutputencoding utf-8  # 输出 log 编码 
# export LESSCHARSET=utf-8  
```

* 查看配置信息

```bash
# 系统
git config --system --list
# 全局
git config --global --list
# 本地
git config --local --list
```

* 解除SSL验证

```bash
git config --global http.sslVerify false
```

* 设置单独项目push buffer的大小

```bash
git config http.postBuffer 1024000000
```

* 设置全局项目push buffer的大小

```bash
git config –global http.postBuffer 1024000000
```

## 子模块

* ~~在git根目录下新建.gitmodules文件（和.gitignore同一个目录）~~

  ```
  [submodule "子模块名称"]
  	path = "子模块名称"
  	url = "子模块git url"
  	active = true
  	ignore = all
  ```

* ~~初始化子模块：`git submodule init`~~

* ~~更新子模块：`git submodule update`~~

* ~~初始化并更新子模块：`git submodule update --init`~~

* 以上方法添加子模块可能有问题

* 使用命令直接添加

  ```bash
  git submodule init --初始化子模块
  git submodule add https://github.com/example/scripts.git scripts --直接添加子模块
  ```

  * 删除所有子模块 `git submodule deinit -f --all`

# git相关操作

## 将历史某一次提交删除

* 假如对分支A进行操作，需要删除提交m
* 先将基于当前分支创建一个新分支B
* 将分支A重置到m提交前一次提交`git reset --hard`
* 再将分支B内m提交后所有提交摘取到分支A上
  * `git cherry-pick 提交id`摘取一个提交
  * `git cherry-pick 提交idA..提交idB`摘取从A到B所有提交，不包括提交A
  * `git cherry-pick 提交idA^..提交idB`摘取从A到B所有提交，包括提交A
