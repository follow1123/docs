# Git

* [官网](https://git-scm.com/)
* [下载地址](https://git-scm.com/downloads)
* 推荐使用 [Lazygit](https://github.com/jesseduffield/lazygit) 工具

## 概念

* 工作区
* 暂存区
* 本地仓库
* 远程仓库

---

## 仓库初始化

使用 `git init` 命令初始化一个本地仓库

```bash
# 创建仓库的文件夹，并进入
mkdir example-repo
cd example-repo

# 初始化仓库
git init
```

使用 `git clone` 克隆一个远程仓库到本地

```bash
# 克隆远程仓库到当前目录下，目录名称就是仓库名
git clone <remote_url>

# 克隆远程仓库到当前目录下，仓库名称为 example-clone
# 克隆下来的地址可以指定相对路径或绝对路径
git clone <remote_url> example-clone
```

如果需要克隆指定的分支或 tag 可以使用 `-b` 或 `--branch` 选项

```bash
# 克隆指定的分支
git clone -b <branch_name> <remote_url>

# 克隆指定的 tag
git clone -b <tag_name> <remote_url>
```

克隆下来的仓库对应的远程名称默认是 origin 可以使用 `--origin` 选项修改

```bash
git clone --origin <remote_name> <remote_url>
```

如果只需要下载源码编译成软件，只需要添加 `--depth` 选项，指定只下载少量的提交历史，加快克隆速度

```bash
# 克隆指定仓库，只下载最近的一次历史和整个仓库的文件
git clone --depth 1 <remote_url>
```

---

## 提交文件到仓库

创建一个本地仓库

```bash
mkdir example-commit
cd example-commit

git init
```

使用编辑器新建一个文件 `a.txt`，并添加以下内容

```txt
123456
```

使用 `git add` 命令将文件添加到**暂存区**

```bash
git add a.txt

# 也可以使用这个命令将当前工作区内的所有文件都添加暂存区
git add .
```

使用 `git status` 命令查看文件状态信息，如果添加成功，一般会显示绿色的 `new file: a.txt`

```bash
git status
```

使用 `git commit` 命令将**暂存区**内的文件提交到本地仓库，使用 `-m` 选项添加提交信息

```bash
git commit -m 'A: add a.txt file'
```

使用 `git log` 查看仓库内的提交记录，使用 `-p` 选项查看提交的文件内容

```bash
git log -p
```

---

### 文件的状态

Git 仓库内可以分为：**工作目录** **暂存区** **本地仓库** **远程仓库**这几个区域，其中的文件可以分为：**未跟踪** **已暂存** **未修改** **已修改**这几个状态

![文件的状态](/img/git/git-file-status.drawio.png) 

1. 在之前仓库的基础上，添加一个 `b.txt` 文件，添加以下内容，此时这个 `b.txt` 文件的状态就是**未跟踪**，使用 `git status` 命令查看状态，会显示 `Untracked files：` 等字样

```bash
abcdef
```

2. 使用 `git add .` 命令将 `b.txt` 添加进暂存区，此时这个文件的状态就是**已暂存**

3. 使用 `git commit -m 'B add b.txt file'` 将这个文件提交到本地仓库，此时这个文件的状态就是**未修改**

4. 使用 `echo gh >> b.txt` 修改 `b.txt` 此时这个文件的状态就是**已修改**，使用 `git status` 命令查看会显示 `modified: b.txt` 等字样

5. 使用 `git add . && git commit -m 'C update b.txt file'` 将修改后的 `b.txt` 文件提交后，使用 `git rm --cached b.txt` 命令将这个文件直接从本地仓库中删除，此时这个文件的状态从**未修改**直接变成了**未跟踪**

:::info
此时使用 `git status` 命令发现 `b.txt` 确实变成了**未跟踪**状态，但是显示了一个 `deleted: b.txt` 提示，这个是因为一旦提交到**本地仓库**时，就会创建一个永久的副本，即使将文件从**工作区**中删除，这个文件的副本也会在**本地仓库**的历史内保存，只会标记这个文件已删除，所以会出现一个 `b.txt` 文件已删除的标记
:::

---

### 恢复文件

* **Working Tree** - 工作区（Working Directory，沙盒）
* **Index** - 暂存区（Staging Area，准备提交的文件）
* **HEAD** - 本地仓库最新的提交（上次提交的快照）

![恢复文件](/img/git/git-restore-file.drawio.png) 

准备仓库

```bash
mkdir example-restore
cd example-restore

git init
echo 'apple' > fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' > fruits.md
```

使用 `git restore` 配合 `-W` 或 `--worktree`选项（默认选项），从**暂存区**副本内恢复**工作区**的文件

```bash
# 发现文件被覆盖而不是修改
cat fruits.md

# 将暂存区内的文件副本恢复到工作区内
git restore fruits.md

# 重新添加
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'
```

使用 `git restore` 配合 `-S` 或 `--staged` 选项，从**HEAD**副本内恢复**暂存区**的文件

```bash
# 添加orange
echo 'oraege' >> fruits.md
git add .

# 发现单词写错了，但是文件已经提交到暂存区内了，使用-S选项恢复
git restore -S fruits.md

# 修改后继续提交
git add . && git commit -m 'C: add orange'
```

使用 `git restore` 配合 `-S` 和 `-W` 选项，从**HEAD**副本内恢复**暂存区**和**工作区**的文件

```bash
# 添加西瓜
echo 'watermlon' >> fruits.md
git add .

# 发现单词又写错了，这次直接恢复到上次提交时的版本，使用-SW选项恢复
git restore -SW fruits.md

# 从新添加后继续提交
echo 'watermelon' >> fruits.md
git add . && git commit -m 'D: add watermelon'
```

使用 `git restore` 配合 `-s` 或 `--source` 选项，从**指定某次**提交的副本内恢复**暂存区**或**工作区**的文件

```bash
# 查询提交信息
git log --oneline

# 将文件fruits文件恢复到添加banana时的版本
git restore -s HEAD~2 -SW fruits.md
# 或查询到commit hash后直接指定
git restore -s <commit_hash> -SW fruits.md
```

:::note[实现单个文件的cherry-pick]
`git restore` 的 `-s` 或 `--source` 选项还可以指定**其他分支**的 commit hash，能将指定分支的**这个文件内不同的功能**添加进**当前分支**的这个文件内：`git restore -s <commit_hash> -SW <filename>`
:::

---

### 重置提交

和[恢复文件](#恢复文件)类似，`git reset` 可以恢复所有文件到指定的提交副本

![重置提交](/img/git/git-reset-commit.drawio.png) 

准备仓库

```bash
mkdir example-reset
cd example-reset

git init

echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'

echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

echo 'orange' >> fruits.md
git add . && git commit -m 'C: add orange'
```

使用 `git reset` 配合 `--soft` 选项将**HEAD副本**的文件恢复到上次提交，并保存**工作区**和**暂存区**内当前的文件

```bash
git reset --soft HEAD~
```

使用 `git reset` 配合 `--mixed` 选项（默认选项）将**HEAD副本**和**暂存区**处的文件恢复到上次提交，并保存**工作区**内当前的文件

```bash
git reset HEAD~
```

使用 `git reset` 配合 `--hard` 选项将**HEAD副本**，**暂存区**和**工作区**处的文件恢复到上次提交，所有文件都会丢弃

```bash
git reset --hard HEAD~
```

:::note[重置提交的位置]
* `git reset HEAD~` - 重置到上次提交
* `git reset HEAD~2` - 重置到上上次提交
* `git reset <commit_hash>` - 重置到指定的提交
:::

---

### 删除文件

使用 `git rm` 命令将**工作区**和**暂存区**内的这个文件删除

```bash
# 将文件从工作区和暂存区内的这个文件删除
git rm <filename>
# 这个命令就是下一操作的简化
rm <filename>
git add .
```

使用 `git rm --cached` 命令将和**暂存区**内的这个文件删除，保留**工作区**这个文件

---

### 清空工作区

清除工作区未跟踪的文件

* `git clean`
    * `-d` - 删除空目录
    * `-f` - 强制删除
    * `-x` - 将 `.gitignore` 内忽略的文件也删除
    * `-n` - 打印将要删除的文件，不进行删除操作
    * `-i` - 交互方式删除

```bash
# 强制清除当前工作区内未跟踪的文件和空目录
git clean -df

# 演示删除
git clean -dnf
```

### 修正提交

将当前工作区内已经暂存的文件直接加入到上次的提交内

* `git commit --amend` - 将**暂存区**内新添加的文件**修正**进上次提交内，打开一个编辑器修改提交信息
    * `--no-edit` - 不打开编辑器修改提交信息，只将修正上次提交
    * `-m <message>` - 直接编辑上次的提交信息

:::warning
这个操作会修改提交信息的 hash 值，如果 commit 已经提交到远程仓库，谨慎使用
:::

---

## 查看仓库信息

### 对比文件信息

![对比文件信息](/img/git/git-diff-file.drawio.png) 

* `git diff` - 对比**工作区**和**暂存区**的文件内容
    * `--cached` - 对比**暂存区**和**HEAD副本**内的文件内容
* `git diff HEAD~` - 对比**工作区**和上次提交的**HEAD副本**内的文件内容
* `git diff HEAD HEAD~2 <file_path>` - 对比当前**HEAD副本**和上上次提交的**HEAD副本**内的文件内容

---

### 查看单个提交的信息

* `git show` - 查到当前最新的**HEAD副本**的信息
* `git show HEAD~` - 查到上次提交的**HEAD副本**的信息
* `git show HEAD~ <file_path>` - 查到上次提交的**HEAD副本**内指定文件的信息

---

### 查看提交历史信息

* `git log` - 查看提交历史信息
    * `--all` - 查看所有提交信息，包括其他所有分支的提交历史
    * `-1` - 只查看上次提交的信息，`-2` 表示前两次提交的信息
    * `-p` - 查看提交的每个文件的信息 diff 信息
    * `--graph` - 已图像方式显示所有提交的路径
    * `--stat` - 显示每个文件修改的统计信息
    * `--oneline` - 一行内简要显示提交信息
    * `--parents` - 显示每个提交的父提交的 commit hash
    * `-S <string>` - 在所有提交内搜索指定字符串

---

### 查看操作日志

* `git reflog` - 查看操作日志
* `git reflog <branch_name>` - 查看指定分支的操作日志

:::note[恢复操作日志]
使用 `git reflog` 查看操作日志时，每次操作都有一个 `HEAD@{n}` 的标识，使用 `git reset --hard HEAD@{n}` 或者 `git reset --hard <commit_hash>` 恢复到指定的操作处
:::

---

## 仓库分支

创建分支

* `git branch`
    * `-l/--list` - 列出所有本地的分支
    * `-a/--all` - 列出所有的分支，包括远程分支
    * `-v/-vv/--verbose` - 显示分支详细信息，`-vv` 选项会显示改分支绑定的上游分支信息
    * `-d/--delete` - 删除分支
    * `-D` - 强制删除分支
    * `-m/--move` - 移动，重命名分支
    * `-M` - 强制移动，重命名分支
    * `-c/--copy` -  复制一个分支
    * `-C` -  强制复制一个分支
    * `-f/--force` - 强制执行某个操作，上面的大写命令就是组合这个选项
    * `-u <upstream>/--set-upstream-to=<upstream>` - 指定当前分支的上游分支，就是设置当前分支对应远程的哪个分支
    * `--unset-upstream` - 移除当前分支对应的远程分支信息

```bash
# 查看分支
git branch

# 修改当前分支名称
git branch -M <new_name>

# 删除分支
git branch -d <branch_name>

# 从当前分支复制一个新分支出来，不会切换到新分支
git branch -c <branch_name>

# 设置指定分支的上游分支
git branch -u <remote_name>/<remote_branch_name> <local_branch_name>
```

<a id="gitswitch"></a>
切换分支

* `git switch`
    * `-c/--create` - 以当前分支为基础创建一个分支并切换
    * `-C` - 强制创建并切换
    * `-d/--detach` - 从指定提交处分离一个临时分支并切换过去

```bash
# 切换到指定分支
git switch <branch_name>

# 创建新分支并切换
git switch -c <new_branch_name>

# 切换到指定提交的临时分支
git switch -d <commit_hash>

# 切换到指定tag处
git switch -d <tag_name>

# 切换到上次切换的分支处，如果是某次提交或某个tag，则需要添加-d参数切换过去
git switch -
```

---

### 分支合并（merge）

#### Fast-forward Merge

![Fast-forward Merge](/img/git/git-fast-forward-merge.drawio.png)

准备仓库

```bash
mkdir example-fast-forward-merge
cd example-fast-forward-merge

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

git switch -c featureA
echo 'orange' >> fruits.md
git add . && git commit -m 'C: add orange'
```

使用 `git merge` 将 `featureA` 分支的提交合并到主分支内

```bash
# 确保当前处于主分支，main或master
git switch main


# 将featureA分支的提交合并到主分支内
git merge featureA
```

:::note[Fast-forward Merge]
这种情况下，主分支在创建 `featureA` 分支后没有进行任何提交，执行 `git merge featureA` 命令执行的是一次 `Fast-forward` merge，相当于直接将**主分支**指向 `featureA` 分支的最新提交处
:::

#### 合并冲突

![合并冲突](/img/git/git-merge.drawio.png)

准备仓库

```bash
mkdir example-merge
cd example-merge

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

git switch -c featureA
echo 'orange' >> fruits.md
git add . && git commit -m 'C: add orange'

git switch main
echo 'watermelon' >> fruits.md
git add . && git commit -m 'D: add watermelon'
```

使用 `git merge` 将 `featureA` 分支的提交合并到主分支内

```bash
# 确保当前处于主分支，main或master
git switch main


# 将featureA分支的提交合并到主分支内
git merge featureA
```

此时会出现 `CONFLICT (content): ...` 等提示，说明合并出现了冲突，使用 `git status` 命令就会显示当前有冲突未合并，`cat fruits.md` 显示一下内容：

```markdown
apple
banana
<<<<<<< HEAD
watermelon
=======
orange
>>>>>>> featureA
```

因为在**主分支**和 `featureA` 分支内最新的一次提交都修改了第三行，所以会产生冲突

* `<<<<<<< HEAD` - 当前分支最新提交的内容
* `=======` - 分隔符
* `>>>>>>> featureA` - 合并分支的最新提交

只需要将这三个符号删除，并手动调整需要哪个分支的内容，这里只需要主分支的内容：

```txt
apple
banana
watermelon
```

完成合并

```bash
git add .

# 弹出指定编辑器编辑合并提交信息
git commit
```

:::note
如果不需要合并操作可以使用 `git merge --abort` 取消合并
:::

---

### 分支变基（rebase）

![分支变基](/img/git/git-rebase.drawio.png)

准备仓库

```bash
mkdir example-rebase
cd example-rebase

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

git switch -c featureA
echo 'orange' >> fruits.md
git add . && git commit -m 'C: add orange'

git switch main
echo 'watermelon' >> fruits.md
git add . && git commit -m 'D: add watermelon'
```

使用 `git merge-base` 查看**主分支**和 `featureA` 分支的**公共祖先**（`featureA` 分支是从**主分支**的哪次提交创建的）

```bash
git merge-base main featureA
```

使用 `git rebase` 将 `featureA` 分支和**主分支**的**公共祖先**修改成**主分支**内最新的一次提交

```bash
# 确保当前处于featureA分支内
git switch featureA

# 变基featureA的公共祖先到main分支的最新提交
git rebase main
```

和[合并冲突](#合并冲突)类似，这里也出现了冲突，手动修复冲突的方式和之前一样，只不过处理的方式有些不同：

```bash
# 修复完所有冲突后将所有文件添加到暂存区，相当于标记冲突已经解决
git add .

# 弹出编辑器修改提交信息
git rebase --continue
```

此时再使用 `git merge-base` 命令查看**主分支**和 `featureA` 分支的**公共祖先**，这时 `featureA` 的**公共祖先**变成了**主分支**的最新提交

```bash
git merge-base main featureA
```

:::note
如果不需要继续变基可以使用 `git rebase --abort` 取消变基
:::

:::info
变基操作时会创建一个临时分支，所有变基操作会在这个临时分支上操作

变基并不会将 `featureA` 分支的内容自动合并到**主分支**上，需要切换到**主分支**上执行 `git merge featureA` 进行一次 **Fast-Forward** Merge 才会合并到**主分支**上
:::

:::warning
变基操作会修改提交历史，如果分支已经提交到公共的远程仓库上，不建议使用这个操作
:::

---

### 远程分支

#### 操作分支

* `git remote` - 查看远程仓库
    * `-v` - 查看远程仓库，和 url
* `git remote show <remote_name>` - 查看指定远程详细信息
* `git remote add <remote_name> <url>` - 添加远程仓库
* `git remote rename <old_name> <new_name>` - 重命名远程仓库
* `git remote remove <remote_name>` - 删除远程仓库

#### 更新分支

![更新分支](/img/git/git-fetch-remote-branch.drawio.png)

准备仓库

```bash
mkdir example-remote
cd example-remote

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'

cd ../
# 这里使用本地的另一个仓库模拟远程仓库
git clone ./example-remote example-local
cd example-local
```

分别修改**远程仓库**和**本地仓库**的文件

```bash
# 进入模拟的远程仓库目录内
cd example-remote
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

# 进入本地仓库目录内
cd ../example-local
echo 'orange' >> fruits.md
git add . && git commit -m 'B: add orange'
```

使用 `git fetch` 命令将远程仓库的提交更新回本地仓库

```bash
# 更新远程仓库的提交到本次仓库，不影响本地仓库的提交
git fetch

# 查看远程仓库指定分支的信息
git log origin/main
```

:::note
`git fetch` 只是将远程的分支的提交拉取到本地，对本地分支没有任何影响
:::

#### 拉取分支

![拉取分支](/img/git/git-pull-remote.drawio.png)

准备仓库

```bash
mkdir example-remote
cd example-remote
git init --bare

cd ../
# 这里使用本地的另一个仓库模拟远程仓库
git clone ./example-remote example-local1
cd example-local1
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
git push

cd ../
git clone ./example-remote example-local2
cd example-local2
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

cd ../example-local1
echo 'orange' >> fruits.md
git add . && git commit -m 'B: add orange'
git push
```

拉取分支和[分支合并](#分支合并merge)类似，只不过要合并的分支在远程仓库

使用 `git pull` 命令拉取远程分支的提交并合并，默认时使用 `merge` 策略合并，使用 `-r` 选项进行 `rebase` 策略合并

```bash
# 切换到第二个仓库
cd ../example-local2

# 拉取分支
git pull
# 或者使用-r选项进行rebase合并
git pull -r
```

#### 推送分支

`git push` 默认将当前分支的提交推送到远程的指定分支，需要使用 `git branch -u <remote_name>/<branch_name> <local_branch_name>` 指定上游分支

如果没有设置上游分支，使用 `git push <remote_name>/<branch_name> <local_branch_name>` 将本地的指定分支提交到远程仓库的指定分支

---

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

---

## 仓库配置

### 新版命令

* `git config list` - 查看所有配置信息
    * `--show-scope` - 显示配置所属哪个作用域 `system`：系统 `global`：用户 `local`：本仓库
    * `--show-origin` - 显示配置文件位置
    * `--local/--global/--system` - 查看某个作用域的配置
* `git config get <config_name>` - 查看某个配置，其他选项和上面类似
* `git config set <config_name> <value>` - 设置配置
* `git config unset <config_name> <value>` - 删除配置
* `git config remove-section <section_name>` - 删除配置，删除一整项配置
* `git config edit --local/--global/--system` - 打开本地仓库级、用户级、系统级配置文件

### 旧版命令

* `git config --list` - 查看所有配置信息
* `git config --get <config_name>` - 查看某个配置，其他选项和上面类似
* `git config --set <config_name> <value>` - 设置配置
* `git config --unset <config_name> <value>` - 删除配置
* `git config --remove-section <section_name>` - 删除配置，删除一整项配置
* `git config --edit --local/--global/--system` - 打开本地仓库级、用户级、系统级配置文件

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

---

## git checkout 命令

如果需要使用切换分支功能，建议使用 [git switch](#gitswitch) 命令。如果要恢复文件，建议使用 [git restore](#恢复文件) 命令

当合并分支出现冲突时，使用以下命令应用哪边的内容

```bash
# 应用当前分支的内容
git checkout --ours <filename>

# 应用合并分支的内容
git checkout --theirs <filename>
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
## 压缩（squash）


## Cherry Pick

## Bisect

## 子模块

* 参考：[官方文档](https://git-scm.com/book/zh/v2/Git-%e5%b7%a5%e5%85%b7-%e5%ad%90%e6%a8%a1%e5%9d%97)

```bash
# 初始化子模块
git submodule init 

# 添加子模块
git submodule add https://github.com/example/scripts.git scripts

# 删除所有子模块
git submodule deinit -f --all
```

* 位于仓库下的`.gitmodules`文件
```txt
[submodule "子模块名称"]
    path = "子模块名称"
    url = "子模块git url"
    active = true
    ignore = all
```

---

## git 操作示例

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

## commit 规范参考

### commit 组成部分

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

### commit 的 header 类型

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

## GitHub

### GitHub Actions

#### 自动构建项目

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
* [git checkout/switch/restore的区别](https://webdeveloper.beehiiv.com/p/ditch-git-checkout-use-git-switch-and-git-restore-instead)
