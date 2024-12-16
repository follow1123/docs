---
sidebar_position: 6
---

# GitHub

## GitHub Actions

### 自动构建项目

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

## 使用 token 推送到 github

* `git remote add origin https://oauth2:[token]@github.com/<user_name>/<repo_name>.git`

