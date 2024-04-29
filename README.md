# 文档

一个使用[mdbook](https://github.com/rust-lang/mdBook)发布的GitHub Page

* 在源码分支内发布

```bash
# 保证当前在src分支下

cp README.md /tmp/mdbook_pages_README.md

git checkout main
cp -r book/* ./
cp /tmp/mdbook_pages_README.md ./README.md
```
