# 文档

一个使用[Docusaurus](https://docusaurus.io/)构建的文档网站

## 相关命令

* `yarn run start`：开发模式启动项目
* `yarn run build`：构建项目
* `yarn run serve`：运行build目录下已经构建的项目

## 在源码分支内发布

> 保证当前在src分支下，所有修改文件已经提交

* Windows

> 使用powershell执行

```powershell
yarn run build
cp README.md ./build

git checkout main
cp -Recurse -Force build/* ./
rm -Recurse -Force .\build
```
