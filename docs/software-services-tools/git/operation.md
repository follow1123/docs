---
sidebar_position: 2
---

# 操作仓库

## 第一次提交

1. 创建一个本地仓库

```bash
mkdir example-commit
cd example-commit

git init
```

2. 使用编辑器新建一个文件 `a.txt`，并添加以下内容

```txt
123456
```

3. 使用 `git add` 命令将文件添加到**暂存区**

```bash
git add a.txt

# 也可以使用这个命令将当前工作区内的所有文件都添加暂存区
git add .
```

4. 使用 `git status` 命令查看文件状态信息，如果添加成功，一般会显示绿色的 `new file: a.txt`

```bash
git status
```

5. 使用 `git commit` 命令将**暂存区**内的文件提交到本地仓库，使用 `-m` 选项添加提交信息

```bash
git commit -m 'A: add a.txt file'
```

6. 使用 `git log` 查看仓库内的提交记录，使用 `-p` 选项查看提交的文件内容

```bash
git log -p
```

---

## 文件的状态

Git 仓库内可以分为：**工作目录** **暂存区** **本地仓库** **远程仓库**这几个区域，其中的文件可以分为：**未跟踪** **已暂存** **未修改** **已修改**这几个状态

![文件的状态](/img/git/git-file-status.drawio.png) 

* **未跟踪** - 仓库内新建的文件
* **已暂存** - 使用 `git add` 命令添加的文件
* **未修改** - 提交到**本地仓库**的文件
* **已修改** - 修改**本地仓库**内文件后的状态

---

## 恢复文件（restore）

* **Working Tree** - 工作区（Working Directory，沙盒）
* **Index** - 暂存区（Staging Area，准备提交的文件）
* **HEAD** - 本地仓库最新的提交（上次提交的快照）

![恢复文件](/img/git/git-restore-file.drawio.png) 

### 准备仓库

```bash
mkdir example-restore
cd example-restore

git init
echo 'apple' > fruits.md
git add . && git commit -m 'A: add apple'
```

### 从 <u>暂存区</u> 内恢复 <u>工作区</u> 的文件

使用 `git restore` 配合 `-W` 或 `--worktree`选项（**默认选项**）

```bash
# 添加内容
echo 'banana' > fruits.md

# 发现文件被覆盖而不是修改
cat fruits.md

# 将暂存区内的文件副本恢复到工作区内
git restore fruits.md

# 重新添加
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'
```

### 从 <u>HEAD</u> 内恢复 <u>暂存区</u> 的文件

使用 `git restore` 配合 `-S` 或 `--staged` 选项

```bash
# 添加内容
echo 'oraege' >> fruits.md
git add .

# 发现单词写错了，但是文件已经提交到暂存区内了，使用-S选项恢复
git restore -S fruits.md

# 此时只是将文件从暂存区内移除，内容还没还原
# 需要修改后继续提交
git add . && git commit -m 'C: add orange'
```

### 从 <u>HEAD</u> 内恢复 <u>暂存区</u> 或 <u>工作区</u> 的文件

使用 `git restore` 配合 `-S` 和 `-W` 选项

```bash
# 添加西瓜
echo 'watermlon' >> fruits.md
git add .

# 发现单词又写错了，这次直接恢复到上次提交时的版本，使用-SW选项恢复
git restore -SW fruits.md

# 此时工作区内的这个文件已经被恢复了
# 需要重新添加后继续提交
echo 'watermelon' >> fruits.md
git add . && git commit -m 'D: add watermelon'
```
### 从 <u>指定提交</u> 内恢复 <u>暂存区</u> 或 <u>工作区</u> 的文件

使用 `git restore` 配合 `-s` 或 `--source` 选项

#### 从 <u>上次提交</u> 内恢复 <u>暂存区</u> 或 <u>工作区</u> 的文件

```bash
# 从上次提交内恢复工作区的这个文件
git restore -s HEAD~ fruits.md

# 从上次提交内恢复暂存区内的这个文件
# 此时HEAD内和工作区内的这个文件是最新版本，而暂存区内的这个文件是上次提交的版本
# 使用 git diff 和 git diff --cached 命令查看详细信息
git restore -s HEAD~ -S fruits.md

# 从上次提交内恢复工作区和暂存区内的这个文件
# 相当于将这个文件恢复到上一个版本并添加到暂存区
git restore -s HEAD~ -SW fruits.md
```

#### 从 <u>其他分支</u> 内恢复 <u>暂存区</u> 或 <u>工作区</u> 的文件

在[测试仓库](#准备仓库)内创建分支并提交内容

```bash
# 确保到测试仓库内，并清理工作区内的文件
cd example-restore

git switch -c b1

echo 'strawberry' >> fruits.md
git add . && git commit -m 'E: add strawberry'
```

将 **b1 分支**内的文件的新内容添加到**主分支**的工作区这个文件内

```bash
# 确保当前处于主分支
git switch main

# 从 b1 分支内获取最新一次提交的内容，添加到 fruits.md 文件内
git restore -s $(git log --pretty=format:%H -1 b1) fruits.md
```

#### 从 <u>指定提交</u> 内恢复 <u>暂存区</u> 或 <u>工作区</u> 内不存在的文件

在 b1 分支内添加新文件

```bash
# 确保当前处于 b1 分支
git switch b1

# 添加一个新文件
echo 'tomato' >> vegetables.md
git add . && git commit -m 'F: add tomato'
```

将 **b1 分支**内的新文件添加到**主分支**的工作区内

```bash
# 确保当前处于主分支
git switch main

# 添加其他分支的文件到当前分支内
git restore -s $(git log --pretty=format:%H -1 b1) vegetables.md
```

---

## 重置提交（reset）

和[恢复文件](#恢复文件)类似，`git reset` 可以恢复提交内的文件到指定的提交副本

![重置提交](/img/git/git-reset-commit.drawio.png) 

### 准备仓库

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

echo 'watermelon' >> fruits.md
git add . && git commit -m 'D: add watermelon'
```

### 将 <u>HEAD</u> 恢复到上次提交，<u>暂存区</u> 和 <u>工作区</u> 内保持不变

使用 `git reset` 配合 `--soft` 选项

```bash
# 重置到上次提交
git reset --soft HEAD~

# 提交记录重 3 个变成 2 个
git log

# 查看信息，相当于修改已经添加到暂存区，还没提交
git status
```

### 将 <u>HEAD</u> 和 <u>暂存区</u> 恢复到上次提交，<u>工作区</u> 内保持不变

使用 `git reset` 配合 `--mixed` 选项（**默认选项**）

```bash
git reset HEAD~

# 查看信息，相当于第已经修改完成，还未添加到暂存区
git status
```

### 将 <u>HEAD</u>，<u>暂存区</u> 和 <u>工作区</u> 恢复到上次提交

使用 `git reset` 配合 `--hard` 选项

```bash
git reset --hard HEAD~

# 查看信息，相当于还没修改
git status
```

:::note[重置提交的位置]
* `git reset HEAD~` - 重置到上次提交
* `git reset HEAD~2` - 重置到上上次提交
* `git reset <commit_hash>` - 重置到指定的提交
:::

:::info[重置记录操作]
* `git reflog` - 查看指定操作日志
* `git reset --hard 'HEAD@{1}'` - 将仓库恢复到上次操作处
:::

---

## 删除文件（rm）

使用 `git rm` 命令将**工作区**和**暂存区**内的这个文件删除

```bash
# 将文件从工作区和暂存区内的这个文件删除
git rm <filename>

# 这个命令就是以下操作的简化
rm <filename>
git add .

# 将 暂存区 内的这个文件删除，保留 工作区 内的这个文件
git rm --cached
```

---

## 清空工作区（clean）

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

# 显示需要删除的文件，不实际删除
git clean -dnf
```

---

## 修正提交（--amend）

将当前工作区内已经暂存的文件直接加入到上次的提交内

```bash
# 将 暂存区 内新添加的文件 修正 进上次提交内，打开一个编辑器修改提交信息
git commit --amend

# 不打开编辑器修改提交信息，只将修正上次提交
git commit --amend --no-edit

# 直接编辑上次的提交信息
git commit --amend --no-edit -m '<message>'
```

:::warning
这个操作会修改提交信息的 hash 值，如果 commit 已经提交到远程仓库，谨慎使用
:::
