---
sidebar_position: 5
---

# 其他

## 忽略文件（.gitignore）

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

:::info[其他忽略文件方式]
将上面的条件添加到 `.git\info\exclude` 文件内

假设你有一个公共的仓库，需要在这个仓库内放一些不能提交到的文件，也不想放在 `.gitignore` 里面忽略，可以使用这种方式
:::

## 配置（config）

### 新版命令

```bash
# 查看所有配置信息
git config list

# 显示配置属于哪个作用域
#  system - 系统
#  global - 用户
#  local - 本仓库
git config list --show-scope

# 显示配置文件所在位置
git config list --show-scope --show-origin

# 查看指定作用域的配置
git config list --local
git config list --global
git config list --system

# 以下命令包含上面部分选项

# 查看某个配置
git config get <config_name>

# 设置配置
git config set <config_name> <value>

# 删除配置
git config unset <config_name> <value>

# 删除配置，删除整个项的配置
#
# [test]
#     a = aaa
#     b = bbb
#
# 使用 git config remove-section test 直接删除 test.a 和 test.b 两个配置
git config remove-section <section_name>

# 使用配置的编辑器打开本地仓库级、用户级、系统级配置文件
git config edit --local
git config edit --global
git config edit --system
```

### 旧版命令

```bash
# 查看所有配置信息
git config --list

# 查看某个配置，其他选项和上面类似
git config --get <config_name>

# 设置配置
git config --set <config_name> <value>

# 删除配置
git config --unset <config_name> <value>

# 删除配置，删除一整项配置
git config --remove-section <section_name>

# 打开本地仓库级、用户级、系统级配置文件
git config --edit --local/--global/--system
```


### 常用配置

| 配置 | 说明 |
| -------------- | --------------- |
| `user.name` | 用户名 |
| `user.email` | 用户邮箱 |
| `init.defaultBranch` | 修改 `git init` 创建分支时**主分支**的名称 |

#### 本地永久保存 Token

1. `git config set --global credential.helper store`
2. 下次拉取或推送时提示需要输入用户名和密码，用户名输入**账户名称**，密码就输入 Token
    * 凭证保存在 `~/.git-credentials`

---

## blame

```bash
# 查看指定文件每行的提交人和其他提交信息
git blame <file_path>
```

---

## 标签（tag）

```bash
# 查看所有 tag
git tag

# 给**本地仓库**内最新的一次提交打 tag
git tag -a '<tag_name>' -m '<message>'

# 给**本地仓库**内指定的提交打 tag
git tag -a '<tag_name>' -m '<message>' <commit_hash>

# 查看指定 tag 的详细信息
git show <tab_name>

# 删除本地的标签
git tag -d <tag_name>
```

### 操作远程仓库的 tag

```bash
# 将指定标签推送到远程仓库
git push origin <tab_name>

# 将远程仓库没用的标签推送到远程仓库
git push origin --tags

# 删除远程仓库上指定的标签，默认删除本地的标签不会删除远程的标签，需要单独执行这条命令删除
git push origin --delete <tag_name>
```

### 从指定 tag 创建一个新分支

```bash
git switch <tag_name> -c <new_branch_name>
```

---

## 贮藏（stash）

贮藏当前工作区的文件，（默认情况下只贮藏**已跟踪**的文件）

* `git stash`
    * `-S/--staged` - 只贮藏已经暂存的文件
    * `-u/--inculde-untracked` - 贮藏包含任何**未跟踪**文件
    * `-a/--all` - 包含忽略文件

```bash
# 贮藏当前工作区所有文件
git stash -u

# 列出贮藏列表
git stash list

# 将栈顶的一次贮藏应用到当前分支上
git stash apply

# 丢弃栈顶的贮藏
git stash drop

# apply + drop 弹出栈顶的贮藏，并应用到当前分支上
git stash pop
```

---

## Bisect

## 子模块（submodule）

参考：[官方文档](https://git-scm.com/book/zh/v2/Git-%e5%b7%a5%e5%85%b7-%e5%ad%90%e6%a8%a1%e5%9d%97)

```bash
# 初始化子模块
git submodule init 

# 添加子模块
git submodule add https://github.com/example/scripts.git scripts

# 删除所有子模块
git submodule deinit -f --all
```

仓库目录下新增 `.gitmodules` 文件

```txt title=".gitmodules"
[submodule "子模块名称"]
    path = "子模块名称"
    url = "子模块git url"
    active = true
    ignore = all
```
