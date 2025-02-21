---
sidebar_position: 4
---

# 分支

## 操作分支

```bash
# 显示所有分支命令，当前分支高亮显示
git branch

# 显示当前分支
git branch --show-current

# 列出所有本地的分支 -l 或 --list 选项
git branch --list
# 模糊搜索分支
#
# 查看所有 feat 开头的分支
# git branch --list 'feat*'
git branch --list '<pattern>'

# 列出所有的分支，包括远程分支，-a 或 --all 选项
git branch -a

# 显示分支详细信息
#
# -v/--verbose - 显示当前分支和最新一次提交信息
# -vv - 显示当前分支绑定的上游分支
git branch -v

# 删除分支
#
# -d/--delete - 删除指定分支
# -D - 强制删除分支
git branch -d <branch_name>

# 重命名当前分支
#
# -m/--move - 重命名当前分支
# -M - 强制重命名当前分支
git branch -m <new_branch_name>

# 在当前分支基础上复制分支，不会切换分支
#
# -c/--copy - 复制分支
# -C - 强制复制分支
git branch -c <new_branch_name>

# 设置当前分支对应远程的哪个分支
#
# -u/--set-upstream-to - 设置上游分支
git branch -u <remote_name>/<remote_branch_name> <local_branch_name>

# 移除分支对应的远程分支信息
# 不指定 local_branch_name 则移除当前分支的远程分支信息
git branch --unset-upstream <local_branch_name>
```

---

## 切换分支

```bash
# 切换到指定分支
git switch <branch_name>

# 在当前分支基础上创建新分支并切换过去
#
# -c/--create 选项
git switch -c <new_branch_name>

# 分离 HEAD 到指定 commit，相当于切换到指定 commit 的临时分支
#
# -d/--detach 选项
# 切换到指定提交的临时分支
git switch -d <commit_hash>

# 切换到指定tag处
git switch -d <tag_name>

# 切换到上次切换的分支处，
# 如果上次切换的分支是一个 commit 则需要配合 -d 选项
git switch -
```

---

## 分支合并（merge）

### Fast-forward Merge

![Fast-forward Merge](/img/git/git-fast-forward-merge.drawio.png)

#### 准备仓库

```bash
mkdir example-fast-forward-merge
cd example-fast-forward-merge

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

git switch -c b1

echo 'orange' >> fruits.md
git add . && git commit -m 'C: add orange'
echo 'watermelon' >> fruits.md
git add . && git commit -m 'D: add watermelon'
```

当两个分支的**公共祖先**就是当前分支的**最新提交**，就会出现**Fast-forward** Merge

```bash
# 查看两个分支 公共祖先，和当前分支最新一次提交的 commit hash
# HEAD 表示当前分支，可以使用分支名替换
git merge-base HEAD b1 && git log -1 --pretty=format:%H
```

使用 `git merge` 将 `b1` 分支的提交合并到主分支内

```bash
# 确保当前处于主分支
git switch main


# 将 b1分支 的提交合并到 主分支 内
#
# 此时出现 Fast-forward
# 就是将当前分支的 HEAD 指向 b1 分支的最新提交
git merge b1
```

---

### 分支合并

![合并冲突](/img/git/git-merge.drawio.png)

#### 准备仓库

```bash
mkdir example-merge
cd example-merge

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

git switch -c b1
echo 'cabbage' >> vegetables.md
git add . && git commit -m 'C: add cabbage'
echo 'tomato' >> vegetables.md
git add . && git commit -m 'D: add tomato'

git switch main
echo 'watermelon' >> fruits.md
git add . && git commit -m 'E: add watermelon'
```

此时查看两个分支的**公共祖先**和当前分支最新的提交，commit hash 不一样，不会进行 **Fast-forward** Merge

```bash
# 确保当前处于主分支
git switch main
git merge-base HEAD b1 && git log -1 --pretty=format:%H
```

使用 `git merge` 将 `b1` 分支的提交合并到主分支内

```bash
# 确保当前处于主分支
git switch main

# 此时会打开编辑器，提示修改合并的提交信息
git merge b1

# 查看合并后的提交历史
git log --all --oneline --graph
```

---

### 合并冲突处理

![合并冲突](/img/git/git-merge-conflicts.drawio.png)

#### 准备仓库

```bash
mkdir example-merge-conflicts
cd example-merge-conflicts

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

git switch -c b1
echo 'orange' >> fruits.md
git add . && git commit -m 'C: add orange'
echo 'strawberry' >> fruits.md
git add . && git commit -m 'D: add strawberry'

git switch main
echo 'watermelon' >> fruits.md
git add . && git commit -m 'E: add watermelon'
```

使用 `git merge` 将 `b1` 分支的提交合并到主分支内

```bash
# 确保当前处于主分支
git switch main


# 将 b1分支 的提交合并到 主分支 内
git merge b1
```

此时会出现 `CONFLICT (content): Merge conflict in fruits.md` 提示，说明合并出现了冲突

#### 冲突内容说明

使用 `git status` 命令就会显示当前有冲突未合并，`cat fruits.md` 显示以下内容：

```txt {3-8}
apple
banana
<<<<<<< HEAD
watermelon
=======
orange
strawberry
>>>>>>> b1
```

因为在**主分支**和 `b1` 分支内最新的一次提交都修改了第三行，所以会产生冲突

* `<<<<<<< HEAD` - 当前分支最新提交的内容
* `=======` - 分隔符
* `>>>>>>> b1` - 合并分支的最新提交

#### 使用 `git checkout` 命令应用指定分支的内容

如果需要在某个文件内应用指定分支的内容，可以使用 `git checkout` 配合 `--ours` 或 `--theirs` 选项

```bash
# 应用当前分支的内容
git checkout --ours <filename>

# 将所有产生冲突的文件都应用 当前分支 的内容
git checkout --ours .

# 应用合并分支的内容
git checkout --theirs <filename>

# 将所有产生冲突的文件都应用 合并分支 的内容
git checkout --theirs .
```

如果需要应用两个分支的内容，或需要手动调整，可以直接手动编辑，编辑完成后将特殊符号删除即可

```txt {3,5,8} title="修改后删除高亮的行"
apple
banana
<<<<<<< HEAD
watermelon
=======
orange
strawberry
>>>>>>> b1
```

:::info
如果想撤销，可以使用 `git merge --abort` 取消合并
:::

#### 完成合并

```bash
# 完成合并操作
git add .

# 打开编辑器，提示修改合并的提交信息
git commit

# 查看提交历史信息
git log --all --oneline --graph
```

---

## 分支变基（rebase）

### <u>其他分支</u> 变基到 <u>主分支</u>

![分支变基](/img/git/git-other-rebase-main.drawio.png)

#### 准备仓库

```bash
mkdir example-rebase
cd example-rebase

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

git switch -c b1
echo 'cabbage' >> vegetables.md
git add . && git commit -m 'C: add cabbage'
echo 'tomato' >> vegetables.md
git add . && git commit -m 'D: add tomato'

git switch main
echo 'watermelon' >> fruits.md
git add . && git commit -m 'E: add watermelon'
```

#### 检查两个分支的<u>公共祖先</u>的 **commit hash** 和<u>主分支</u>最新提交的 **commit hash** 是否相同

:::info
如果两个 **commit hash** 相同，则无法进行 rebase 操作，因为 rebase 操作就是将**当前分支**的**公共祖先**修改成被 rebase 分支最新的提交
:::

```bash
git merge-base main b1 && git log main -1 --pretty=format:%H
```

#### 使用 `git rebase` 将 <u>b1分支</u> 变基到 <u>主分支</u>

```bash
# 查看分支历史
git log --all --oneline --graph

# 确保当前处于b1分支内
git switch b1

# 变基b1的公共祖先到main分支的最新提交
git rebase main

# 查看两个分支 公共祖先 和主分支 最新提交 是否相同
git merge-base main b1 && git log main -1 --pretty=format:%H

# 查看分支历史
git log --all --oneline --graph
```

---

### <u>主分支</u> 变基到 <u>其他分支</u>

![分支变基](/img/git/git-main-rebase-other.drawio.png)

#### 准备仓库

测试仓库和[上面](#准备仓库-3)一样

#### 使用 `git rebase` 将 <u>主分支</u> 变基到 <u>b1分支</u>

```bash
# 查看分支历史
git log --all --oneline --graph

# 确保当前处于main分支内
git switch main

# 变基main的公共祖先到b1分支的最新提交
git rebase b1

# 查看两个分支 公共祖先 和主分支 最新提交 是否相同
git merge-base main b1 && git log b1 -1 --pretty=format:%H

# 查看分支历史
git log --all --oneline --graph
```

### 变基冲突处理

![合并冲突](/img/git/git-rebase-conflicts.drawio.png)

#### 准备仓库

```bash
mkdir example-rebase-conflicts
cd example-rebase-conflicts

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

git switch -c b1
echo 'orange' >> fruits.md
git add . && git commit -m 'C: add orange'
echo 'strawberry' >> fruits.md
git add . && git commit -m 'D: add strawberry'

git switch main
echo 'watermelon' >> fruits.md
git add . && git commit -m 'E: add watermelon'
```

#### 使用 `git rebase` 将 <u>b1分支</u> 变基到 <u>主分支</u>

```bash
# 确保当前处于b1分支内
git switch b1

# 变基b1的公共祖先到main分支的最新提交
git rebase main
```

此时提交合并冲突

#### 冲突内容说明

:::info
rebase 合并冲突时会将**当前分支**的**公共祖先**之后的**所有提交**和被 rebase 分支的**公共祖先**之后**所有提交**进行合并

此时 **HEAD** 会将**当前分支**后所有提交单独分离出来进行合并操作
:::

```txt {3-8}
apple
banana
<<<<<<< HEAD
watermelon
=======
orange
>>>>>>> 69ecd8c (C: add orange)
```

#### 处理冲突

参考[合并冲突](#使用-git-checkout-命令应用指定分支的内容)时操作

:::info
取消变基：`git rebase --abort`
:::

#### 完成合并

```bash
# 修复完标记冲突已经解决
git add .

# 弹出编辑器修改提交信息
git rebase --continue
```

:::note
rebase 操作可能出现多次合并操作
:::

完成后，检查两个分支的**公共祖先**和**主分支** commit hash 是否相同

```bash
git merge-base main b1 && git log main -1 --pretty=format:%H
```

:::warning
变基操作会修改提交历史，如果分支已经提交到公共的远程仓库上，不建议使用这个操作
:::

---

## 远程分支

### 操作分支

```bash
# 查看所有远程分支名称
git remote

# 显示远程 URL
# -v/--verbose 选项
git remote -v

# 查看指定远程详细信息
git remote show <remote_name>

# 添加远程仓库
git remote add <remote_name> <url>

# 重命名远程仓库
git remote rename <old_name> <new_name>

# 删除远程仓库
git remote remove <remote_name>
```

---

### 更新分支

![更新分支](/img/git/git-fetch-remote-branch.drawio.png)

#### 准备仓库

```bash
mkdir example-remote
cd example-remote

git init
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

cd ..
# 使用本地分支模拟远程分支
git clone ./example-remote example-local
cd example-local
echo 'orange' >> fruits.md
git add . && git commit -m 'C: add orange'

cd ../example-remote
echo 'cabbage' >> vegetables.md
git add . && git commit -m 'X: add cabbage'
echo 'tomato' >> vegetables.md
git add . && git commit -m 'Y: add tomato'

cd ../example-local
```

#### 使用 `git fetch` 命令将 <u>远程仓库</u> 的提交更新回 <u>本地仓库</u>

```bash
# 查看所有提交历史
git log --all --oneline --graph

# 更新提交
git fetch

# 再次查看提交历史
git log --all --oneline --graph
```

:::note
`git fetch` 只是将远程的分支的提交拉取到本地，对本地分支没有任何影响
:::

---

### 拉取分支

#### 拉取分支并 merge

![拉取分支并 merge](/img/git/git-pull-merge-remote.drawio.png)

##### 准备仓库

测试仓库和[上面](#准备仓库-6)一样

##### 拉取并 merge

```bash
# 拉取分支默认进行 merge 操作
git pull

# 相当于以下操作
git fetch
git merge origin/main
```

---

#### 拉取分支并 rebase

![拉取分支并 rebase](/img/git/git-pull-rebase-remote.drawio.png)

##### 准备仓库

测试仓库和[上面](#准备仓库-6)一样

##### 拉取并 rebase

```bash
# 或者使用-r选项进行rebase合并
git pull -r

# 相当于以下操作
git fetch
git rebase origin/main
```

:::info
`git pull` 默认执行 merge 操作，配置 `pull.rebase` 默认执行 `rebase` 操作

```bash
git config set --local pull.rebase true
```
:::

:::info
如果遇到合并冲突，参考[合并冲突处理](#合并冲突处理)和[变基冲突处理](#变基冲突处理)
:::

---

### 推送分支

![推送分支](/img/git/git-push-remote.drawio.png)

#### 准备仓库

```bash
mkdir example-push-remote
cd example-push-remote

git init
git config set --local receive.denyCurrentBranch ignore
echo 'apple' >> fruits.md
git add . && git commit -m 'A: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'B: add banana'

cd ..
# 使用本地分支模拟远程分支
git clone ./example-push-remote example-push-local
cd example-push-local
echo 'orange' >> fruits.md
git add . && git commit -m 'C: add orange'
```

#### 推送

```bash
# 推送本地仓库最新提交到远程仓库
git push
```

:::info
如果**本地分支**未绑定**远程分支**，可以使用 `git push <remote_name>/<branch_name> <local_branch_name>` 将**当前分支**的所有最新提交推送到指定**远程仓库**的**指定分支**内

还可以使用 `git branch -u <remote_name>/<branch_name> <local_branch_name>` 绑定一个**远程仓库**的分支到**当前分支**，直接推送
:::

---

## Cherry Pick

### 准备仓库

```bash
mkdir example-cherry-pick
cd example-cherry-pick

git init
echo 'cabbage' >> vegetables.md
git add . && git commit -m 'A: add cabbage'

git switch -c b1
echo 'apple' >> fruits.md
git add . && git commit -m 'B: add apple'
echo 'banana' >> fruits.md
git add . && git commit -m 'C: add banana'
echo 'orange' >> fruits.md
git add . && git commit -m 'D: add orange'
echo 'watermelon' >> fruits.md
git add . && git commit -m 'E: add watermelon'

git switch main
```

---

### 将 <u>其他分支</u> 最新的一次提交 pick 到 <u>主分支</u>

![pick 最新提交](/img/git/git-cherry-pick-latest.drawio.png)

```bash
git cherry-pick b1
```

---

### 将 <u>其他分支</u> 某一次提交 pick 到 <u>主分支</u>

![pick 指定提交](/img/git/git-cherry-pick-specified-commit.drawio.png)

```bash
# 替换 commit hash 并 pick
git cherry-pick <commit_hash>
```

:::info[pick <u>公共祖先</u> 后面的一次提交的]
```bash
# 查看 b1 分支从 公共祖先 开始的所有分支，第一个就是
git log $(git merge-base main b1)..b1 --pretty=oneline --reverse
```
:::

---

### 将 <u>其他分支</u> 从 <u>公共祖先</u> 开始，所有的提交 pick 到 <u>主分支</u>

![pick 所有提交](/img/git/git-cherry-pick-all-commit.drawio.png)

```bash
git cherry-pick ..b1
```

:::note
这个操作和 fast-forward merge 的区别就是会创建新的提交
:::

---

### 将 <u>其他分支</u> 内 <u>某个范围</u> 的提交 pick 到 <u>主分支</u>

![pick 某个范围的提交](/img/git/git-cherry-range-commit-exclude-start.drawio.png)

```bash
git cherry-pick <commit_hash>..<commit_hash>
```

![pick 某个范围的提交](/img/git/git-cherry-range-commit-include-start.drawio.png)

```bash
git cherry-pick <commit_hash>^..<commit_hash>
```
