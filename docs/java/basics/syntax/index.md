---
sidebar_position: 1
---

# 语法

## Hello World

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

```bash
# 编译
javac HelloWorld.java

# 运行
java HelloWorld
```

## 注释

```java
/**
 * 文档注释
 * @author a
 * @version 1.0
 */
public class Comments {

    /*
    多行注释
    多行注释
    多行注释
    */
    public static void main(String[] args) {
        // 单行注释
        System.out.println("Hello World!");
    }
}
```

:::tip 
使用 `javadoc -encoding UTF-8 -author -version -d comment Comments.java` 生成对应文档
:::

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
