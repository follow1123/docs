---
sidebar_position: 6
---

# 重写历史

:::warning
以下操作都会修改 commit 的 hash 值，如果 commit 已经提交到远程仓库，谨慎使用
:::

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

---

## 交互式变基（rebase -i）

### commit 范围

```bash
# 选取 当前分支 所有提交
git rebase -i --root

# 选取 当前分支 最新一次提交 和 前两次提交
git rebase -i HEAD~3

# 选取 当前分支 执行提交 到最新提交的范围，不包含这个提交
git rebase -i <commit_hash>

# 选取 当前分支 执行提交 到最新提交的范围，包含这个提交
git rebase -i <commit_hash>^
```

:::info
建议选取所有未提交的历史进行操作

```bash
# 选取所有未提交的历史
git rebase -i $(git merge-base <remote_name>/<remote_branch_name> HEAD)
```
:::

---

### 重新排序并修改提交信息（reword）

![修改提交信息并重新排序](/img/git/git-rewrite-history-reword.drawio.png)

#### 准备仓库

```bash
mkdir example-rewrite-history
cd example-rewrite-history

git init
echo 'cabbage' >> vegetables.md
git add . && git commit -m 'A: add cabbage'
echo 'apple' >> fruits.md
git add . && git commit -m 'B: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'C: add banana'
echo 'tomato' >> vegetables.md
git add . && git commit -m 'D: add tomato'
echo 'orange' >> fruits.md
git add . && git commit -m 'E: add orange'
echo 'watermelon' >> fruits.md
git add . && git commit -m 'F: add watermelon'
```

#### 开始操作

```bash
# 修改当前分支所有提交，--root 表示所有提交
git rebase -i --root
```

#### 执行修改

执行以上命令后会打开默认编辑器，并修改以下行

```gitrebase {2-4}
pick 86b33f7 A: add cabbage
pick 6b2458d B: add apple
pick 39afa3c C: add banana
pick fb88b7c D: add tomato
pick c4b7caf E: add orange
pick 6775f5d F: add watermelon

# ...
```

```gitrebase {2-4}
pick 86b33f7 A: add cabbage
reword fb88b7c D: add tomato
reword 6b2458d B: add apple
reword 39afa3c C: add banana
pick c4b7caf E: add orange
pick 6775f5d F: add watermelon
```

此时保存退出后，git 会依次打开编辑器修改 **fb88b7c** **6b2458d** **39afa3c** 的提交信息

**fb88b7c** 提交信息修改为：`B: add tomato`  
**6b2458d** 提交信息修改为：`C: add apple`  
**39afa3c** 提交信息修改为：`D: add apple`  

此时使用 `git log --all --oneline --graph` 查看日志信息

---

### 删除提交（drop）

![删除提交](/img/git/git-rewrite-history-drop.drawio.png)

#### 准备仓库

测试仓库和[上面](#准备仓库)一样

#### 开始操作

```bash
# 修改当前分支所有提交，--root 表示所有提交
git rebase -i --root
```

#### 执行删除

```gitrebase {2,4}
pick 86b33f7 A: add cabbage
pick 6b2458d B: add apple
pick 39afa3c C: add banana
pick fb88b7c D: add tomato
pick c4b7caf E: add orange
pick 6775f5d F: add watermelon

# ...
```

```gitrebase {2,4}
pick 86b33f7 A: add cabbage
pick 6b2458d B: add apple
pick 39afa3c C: add banana
drop fb88b7c D: add tomato
pick c4b7caf E: add orange
drop 6775f5d F: add watermelon
```

此时 `fruits.md` 文件内的 `watermelon` 和 `vegetables.md` 文件内的 `tomato` 已经被删除

---

### 压缩提交（squash）

![压缩提交](/img/git/git-rewrite-history-squash.drawio.png)

#### 准备仓库

测试仓库和[上面](#准备仓库)一样

#### 开始操作

```bash
# 修改当前分支所有提交，--root 表示所有提交
git rebase -i --root
```

#### 执行压缩

```gitrebase
pick 86b33f7 A: add cabbage
pick 6b2458d B: add apple
pick 39afa3c C: add banana
pick fb88b7c D: add tomato
pick c4b7caf E: add orange
pick 6775f5d F: add watermelon

# ...
```

```gitrebase {2,4-6}
pick 86b33f7 A: add cabbage
squash fb88b7c D: add tomato
pick 6b2458d B: add apple
squash 39afa3c C: add banana
squash c4b7caf E: add orange
squash 6775f5d F: add watermelon
```

此时 git 会依次打开两次编辑器，用于处理压缩后的提交信息

第一次修改提交信息为：`A: add cabbage tomato`  
第二次修改提交信息为：`B: add apple banana orange watermelon`

使用 `git log --all --oneline --graph` 查看只有两次提交

---

### 拆分提交（edit）

![拆分提交](/img/git/git-rewrite-history-edit.drawio.png)

#### 准备仓库

```bash
mkdir example-rewrite-history-edit
cd example-rewrite-history-edit

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'
echo 'orange' >> fruits.md
git add . && git commit -m 'C: add orange'
echo 'cabbage' >> vegetables.md
echo 'tomato' >> vegetables.md
git add . && git commit -m 'D: add tomato'
```

#### 开始操作

```bash
# 修改当前分支所有提交，--root 表示所有提交
git rebase -i --root
```

#### 执行压缩

```gitrebase
pick 99662c1 A: add apple
pick ab3c217 B: add tomato
pick 855ca3f C: add orange
pick 0f25e39 D: add tomato

# ...
```

```gitrebase {4}
pick 99662c1 A: add apple
pick ab3c217 B: add tomato
pick 855ca3f C: add orange
edit 0f25e39 D: add tomato

# ...
```

此时会将标记 `edit` 的提交的分离出来，在临时分支进行操作

1. 编辑 `vegetables.md` 文件，删除 `cabbage` 所在行
2. 执行 `git add . && git commit --amend --no-edit` 命令，修正上次提交，将 `tomato` 内容单独作为一个提交
3. 执行 `git restore -s main .\vegetables.md` 命令，恢复 `vegetables.md` 文件内删除的内容，将 `cabbage` 内容恢复
4. 执行 `git add . && git commit -m 'E: add cabbage'` 命令，提交 `cabbage` 内容
5. 执行 `git rebase --continue` 命令，完成分离操作

---

### 其他操作

* `pick` - 保留当前提交不做任何修改，按照顺序保留该提交
* `fixup` - 类似于 squash，但不保留当前提交的提交信息。当前提交的内容将被合并到前一个提交中，且不会提示你编辑提交信息 
