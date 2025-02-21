---
sidebar_position: 8
---

# 规范

## commit 规范参考

### 组成部分

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

```txt title="示例"
fix: 简要说明
详细说明
关闭某个pr
```

### header 类型

| 类型 | 描述 |
| --- | :-- |
| **build**    | 影响构建系统或外部依赖的更改 (示例范围：gulp, broccoli, npm) |
| **ci** | 对CI配置文件和脚本的更改 (示例：CircleCi, SauceLabs, GitHub Workflow) |
| **docs** | 仅文档更改 |
| **feat** | 新功能 |
| **fix** | 错误修复 |
| **perf** | 改善性能的代码更改 |
| **refactor** | 既不修复错误也不添加功能的代码更改 |
| **test** | 添加缺失测试或更正现有测试 |
| **chore** | 杂项 |
