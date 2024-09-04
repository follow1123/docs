# java各版本新特性

## 目录
1. <a href="#java9">java9</a>
    1. <a href="#module">模块机制</a>
    2. <a href="#collection-enhancement">集合类的工厂方法</a>
    3. <a href="#stream-enhancement">Stream增强</a>
    4. <a href="#others">其他</a>
2. <a href="#java10">java10</a>
3. <a href="#java11">java11</a>
    1. <a href="#var-keyword">var关键字</a>
    2. <a href="#stream-enhancement">字符串增强</a>
    3. <a href="#httpclient">HttpClient</a>
4. <a href="#java12-16">java12-16</a>
    1. <a href="#switch-expression">switch表达式</a>
    2. <a href="#text-block">文本块</a>
    3. <a href="#instanceof-enhancement">instanceof增强</a>
    4. <a href="#null-pointer-optimization">空指针优化</a>
    5. <a href="#record-class">Record类</a>
5. <a href="#java17">java17</a>
    1. <a href="#sealed-class">密封类型</a>
6. <a href="#java18">java18</a>
    1. <a href="#default-encode">默认使用UTF-8编码</a>
    2. <a href="#jwebserver-command">jwebserver命令</a>
    3. <a href="#javadoc-snippet">Java文档生成代码片段</a>
7. <a href="#java19">java19</a>
    1. <a href="#virtualThread">虚拟线程</a>
8. <a href="#java21">java21</a>
    1. <a href="#string-template">字符串模板</a>
    2. <a href="#scoped-values">隐藏方法参数</a>
    3. <a href="#record-pattern">RecordPattern</a>
    4. <a href="#switch-when-keyword">switch表达式when关键字</a>
    5. <a href="#simple-main">简化版main方法</a>
    6. <a href="#structured-task">结构化并发</a>
    

<a id="java9"></a>
## java9

<a id="module"></a>
### 模块机制

* 在项目目录下新建module-info.java文件

```java
module com.demo{
  requires java.se;
}
```

* `requires` 依赖模块
    
    * `requires transitive 模块名` 将依赖模块依赖的模块传递到当前模块，不用重复依赖

* `exports` 导出模块
    
    * `exports 包名 to 模块名` 到处模块到指定的模块

* 开放反射权限，标记`open`关键字

```java
// 开放整个模块的反射权限
open module com.demo{
  requires java.se;
}

// 开放部分包的反射权限
open module com.demo{
    opens 包名;
}

```

* 定义接口给其他模块实现

```java
// 模块a内有一个Test接口
module module.a{
    uses com.Test
}

// 模块b内实现了Test接口

module module.a{
    requires module.a;
    provides com.Test whit com.TestImpl;
}

```

### 接口内可以定义private方法

> 定义接口的的公共方法

<a id="collection-enhancement"></a>
### 集合类的工厂方法

> 快速创建集合，这种方法创建的集合都是只读的

```java
// Map
Map.of("key1", "value1", "key2", "value2")

// List
List.of("value1", "value2");

// Set
Set.of("value1", "value2");
```
<a id="stream-enhancement"></a>
### Stream增强

```java
// 创建Stream空指针判断方法
Stream.ofNullable(null);

// iterate创建Stream时添加limit条件，添加截断操作
Stream.iterate(0, i -> i < 10, i -> i = i + 1)
  .takeWhile(i -> i < 6) // i < 6 时截断
  .forEach(System.out::println);

// 丢弃

Stream.iterate(0, i -> i < 10, i -> i = i + 1)
  .dropWhile(i -> i < 6) // i < 6 时丢弃
  .forEach(System.out::println);
```

<a id="others"></a>
### 其他

* try-with-resource语法优化

```java
// try-with-resource语法不需要在括号内申明完整的语句
FileInputStream fileInputStream = new FileInputStream(new File("/path/to/aaa"));
try(fileInputStream){
    fileInputStream.read();
}
```

* Optional添加部分方法

```java
// 如果数据为空则提供另一个Optional
Optional.ofNullable(null)
  .or(() -> Optional.of(1));

// ifPresent添加为空分支
Optional.ofNullable(null)
  .ifPresentOrElse(v -> {
    System.out.println("value is: " + v);
  }, () -> {
    System.out.println("value is null");
  });
```

<a id="java10"></a>
## java10 

* 添加`var`关键字用于类型推断，只适用与局部变量

<a id="java11"></a>
## java11

<a id="var-keyword"></a>
* var 关键字可以用于lambda参数内

```java
// var 关键字可以用于lambda参数内
Consumer<String> consumer = (var s) -> {
    System.out.println(s);
};
consumer.accept("123");
```

<a id="string-enhancement"></a>
* String增强

```java
// 非空判断
String s = "";
String s1 = " ";

System.out.println(s.isEmpty()); // true
System.out.println(s.isBlank()); // true

System.out.println(s1.isEmpty()); // false
System.out.println(s1.isBlank()); // true

// 字符串重复

String s2 = "a";
System.out.println(s2.repeat(3)); // aaa


// 获取字符串内的每行组成一个Stream
String s3 = "a\nb\nc";
s3.lines().forEach(System.out::println);

// 去除字符串首位空格

String s4 = " a b c d ";
System.out.println(s4.strip().length()); // 7
System.out.println(s4.stripLeading().length()); // 8
System.out.println(s4.stripTrailing().length()); // 8
```

<a id="httpclient"></a>
* HttpClient 全新Http客户端

<a id="java12-16"></a>
## java12-16

<a id="switch-expression"></a>
* switch表达式

```java
int i = 0;
String a = switch (i){
  case 1, 2 -> "case 1";
  case 3, 4 -> "case 2";
  default -> {
    System.out.println("123");
    yield "case default";
  }
};
```

<a id="text-block"></a>
* 文本快

```java
String s = """
12321
123123ad
qweqwe
""";
System.out.println(s);
```

<a id="instanceof-enhancement"></a>
* instanceof增强

```java
Object s = "123";

if (s instanceof String str){
System.out.println(str);
}
```

<a id="null-pointer-optimization"></a>
* 空指针报错优化，异常信息更准确

<a id="record-class"></a>
* Record类，替换Lombok(jave16)

<a id="java17"></a>
## java17

<a id="sealed-class"></a>
### 密封类型

* 使用final关键字表示A类无法被其他类继承

```java
public final class A {

}
```

* 使用sealed关键字修饰并使用permits指定某些类，表示只允许指定的某些类继承

* 想要继承使用sealed修饰的类当前类必须使用`final` `sealed` `no-sealed`修饰
    * `final` 无法被其他类继承
    * `sealed` 当前类也变成密封类
    * `no-sealed` 当前类恢复为默认类，可以被其他任何类继承
    

```java
public sealed class A permits B {

}

public [final/sealed/no-sealed] class B extends A {

}
```

<a id="java18"></a>
## java18

<a id="default-encode"></a>
* 默认使用UTF-8编码

<a id="jwebserver-command"></a>
* `jwebserver`命令简单web服务器

<a id="javadoc-snippet"></a>
* `@snippet` 文档内的代码预览，使用`javadoc`命令生成文档

```java
public class Text {
    /**
     * {@snippet
     * int c = a + b;
     * }
     */
    public int add(int a, int b) {
        int c = a + b;
        return c;
    }
}
```

<a id="java19"></a>
## java19

<a id="virtualThread"></a>
### 虚拟线程

* 使用线程池方式

```java
public void ThreadTest() {
    ExecutorService executor = Executors.newCachedThreadPool();
    try(executor){
        IntStream.range(1, 10000).forEach(i -> executor.submit(() -> {
            try {
                Thread.sleep(1000);
                System.out.println("execute: " + i );
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

        }));
    }catch (Exception e){
        e.printStackTrace();
    }
}
```

* 使用虚拟线程方式，只需要将`newCachedThreadPool`修改为`newVirtualThreadPerTaskExecutor`，速度就会明显提升

* 需要同步代码块时尽量使用`ReentrantLock`替代`synchronized`

* 虚拟线程时守护线程，无法修改为未守护线程

* 虚拟线程默认优先级是5，无法修改

* 虚拟线程不支持`stop()`, `suspend()`, `resume()`方法

### 创建虚拟线程的方式

* 方式1

```java
Runnable task = () -> {
    System.out.println("run task");
};
Thread.startVirtualThread(task);
try {
    Thread.sleep(100);
} catch (InterruptedException e) {
    throw new RuntimeException(e);
}
```
* 方式2

```java
Runnable task = () -> {
    System.out.println("run task");
};
// Thread virtualThread = Thread.ofVirtual().name("virtualThreadName").start(task);
Thread virtualThread = Thread.ofVirtual().name("virtualThreadName").unstarted(task);
virtualThread.start();
try {
    Thread.sleep(100);
} catch (InterruptedException e) {
    throw new RuntimeException(e);
}
```
* 方式3 就是使用创建线程池

* 使用`Thread`对象内的`isVirtual()`方法判断是否为虚拟线程

<a id="java21"></a>
## java21

* 虚拟线程成为正式版

<a id="string-template"></a>
* 字符串模板（预览）

```java
String zs = "zs";
String str = STR."my name is \{zs}";
System.out.println(str);
```

<a id="scoped-values"></a>
### scoped values 隐藏的方法参数（预览）

    * 一般用于代替ThreadLocal


```java
public class ScopedValuesTest {

    public static void main(String[] args) {
         new ScopedValuesTest().set();
    }
    
    private ScopedValue<String> value = ScopedValue.newInstance();

    public void set(){
        ScopedValue.where(value, "111").run(() -> get());
    }

    public void get(){
        System.out.println(value.get());
    }
}
```
* 多线程方式

```java
public class ScopedValuesMultithreadTest {

    public static void main(String[] args) {
        ExecutorService pool = Executors.newCachedThreadPool();
        ScopedValuesMultithreadTest test = new ScopedValuesMultithreadTest();
        for (int i = 0; i < 10; i++) {
            pool.submit(() -> test.set());
        }
        pool.shutdown();

    }

    private ScopedValue<String> value = ScopedValue.newInstance();

    public void set(){
        ScopedValue.where(value, Thread.currentThread().getName()).run(() -> get());
    }

    public void get(){
        System.out.println(value.get());
    }
}
```

<a id="record-pattern"></a>
### Record Pattern（预览）

```java
public class RecordPatternTest {
    public static void main(String[] args) {
        Object o = new Person("zs", 18);
        printObj(o);
    }

    public static void printObj(Object o){
        if (o instanceof Person(String name, int age)){
            System.out.println("name = " + name);
            System.out.println("age = " + age);
        }
    }

}

record Person(String name, int age){}
```

### switch表达式

<a id="switch-temp-variables"></a>
* 临时变量

```java
public class SwitchTest1 {

    public static void main(String[] args) {
        int i = 100;
        System.out.println(getValue(i));
    }

    public static String getValue(Object o){
       return switch (o){
           case null -> "null object";
           case Integer i -> "integer: " + i;
           case String str -> "string: " + str;
           default -> o.toString();
       };
    }
}
```

<a id="switch-when-keyword"></a>
* `when`关键字

```java
public class SwitchTest2 {

    public static void main(String[] args) {
        int score = 10;
        test(score);
    }

    public static void test(Object o){
       switch (o){
           case Integer i when i <= 60 -> {
               System.out.println("not great");
           }
           case Integer i when i <= 100 -> {
               System.out.println("great");
           }
           default -> {
               System.out.println("error");
           }
       };

    }
}
```

<a id="simple-main"></a>
### 简化版main方法（预览）

```java
void main(){
    System.out.println("Hello world!");
}
```

<a id="structured-task"></a>
### 结构化并发，`StructuredTaskScope`类的使用
