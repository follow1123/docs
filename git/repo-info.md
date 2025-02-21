---
sidebar_position: 3
---

# 查看仓库信息

## 对比文件信息（diff）

![对比文件信息](/img/git/git-diff-file.drawio.png) 

```bash
# 对比 工作区 和 暂存区 的文件内容
git diff

# 对比 暂存区 和 HEAD 内的文件内容
git diff --cached

# 对比 工作区 和 上次提交 的文件内容
git diff HEAD~

# 对比当前 HEAD 和 上上次提交 的文件内容
git diff HEAD HEAD~2 <file_path>
```

---

## 查看某次提交的信息（show）

```bash
# 查到当前 HEAD 信息
git show

# 查到当前 HEAD 内指定文件的信息
git show <file_path>

# 查到 上次提交 内指定文件的信息
git show HEAD~ -- <file_path>
```

---

## 提交历史（log）

```bash
# 查看当前分支提交历史信息
git log

# 查看指定分支的提交历史
git log <branch_name>

# 查看所有提交信息，包括其他所有分支的提交历史
git log --all

# 查看所有提交信息，并显示 每次提交 内每个文件修改的统计信息
git log --all --stat

# 只查看 上次提交 的信息，`-2` 表示前两次提交的信息
git log -1

# 查看 上次提交 的信息，并显示 diff 信息
git log -1 -p

# 一行内简要显示提交信息
git log --oneline

# 一行内简要显示提交信息，首行使用图像显示分支信息
git log --oneline --graph

# 一行内简要显示提交信息，首行使用图像显示分支信息，显示每个提交的父提交的 commit hash
git log --oneline --graph --parents

# 查看当前分支提交历史信息，只显示 commit hash
git log --pretty=format:%H
```

### 在提交历史内搜索内容

```bash
# 在当前提交历史内搜索指定字符串
git log -S '<string>'
```

---

## 操作日志（reflog）

```bash
# 查看当前仓库的操作日志
git reflog

# 查看当前仓库内指定分支的操作日志
git reflog <branch_name>
```

:::info[恢复仓库状态到指定操作记录]
使用 `git reflog` 查看操作日志时，每次操作都有一个 `HEAD@{n}` 的标识，使用 `git reset --hard HEAD@{n}` 或者 `git reset --hard <commit_hash>` 恢复到指定的操作处
:::

---

## 总结提交信息（shortlog）

```bash
# 显示当前仓库所有提交信息，和提交人，根据提交人分组
git shortlog
```
