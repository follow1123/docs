# 文档

一个使用[mdbook](https://github.com/rust-lang/mdBook)发布的GitHub Page

## 在源码分支内发布

> 保证当前在src分支下，所有修改文件已经提交

* Linux

```bash
mdbook clean
mdbook build
cp README.md ./book

git checkout main
cp -r book/* ./
rm -rf ./book
```

* Windows

```powershell
# 使用powershell执行

mdbook clean
mdbook build
cp README.md ./book

git checkout main
cp -Recurse -Force book/* ./
rm -Force .\book
```
