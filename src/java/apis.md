# 常用类

## String

* 使用`final`修饰，不可被继承
* 实现`Serializable`可序列化接口，表示可以通过网络或本地进行数据传输
* 实现`Comparable`接口，表示可以和其他对象比较大小
* jdk8使用`char`类型数组表示数据
* jdk9开始使用`byte`类型数组表示数据

### 字符串常量存储的位置

* 字符串常量都存储在字符串常量池（StringTable）中
* 字符串常量池不允许存放两个相同的字符串常量
* 在不同的jdk版本中，字符串常量池存放的位置不同
    * jdk7之前：存放在方法区
    * jdk7及之后：存放在堆空间，由于方法区内GC不频繁，所以放在堆空间

```java
String s1 = "hello"; // 使用字面量声明
String s2 = "hello";

System.out.println(s1 == s2); // true
```

### String的不可变性

* 当对字符串变量重新赋值时，需要重新指定一个字符串常量的位置进行赋值，不能在原有的位置修改
* 当对字符串进行拼接或替换操作时，需要开辟空间保存修改后的字符串，不能在原有的位置修改

```java
@Test
public void testImmutable1() {
    String s1 = "hello";
    String s2 = "hello";
    s2 = "a";

    System.out.println(s1); // hello
}

@Test
public void testImmutable2() {
    String s1 = "hello";
    String s2 = "hello";
    s2 += "world";

    System.out.println(s1); // hello
}

@Test
public void testImmutable3() {
    String s1 = "hello";
    String s2 = "hello";
    String s3 = s1.replace("l", "w");


    System.out.println(s1); // hello
    System.out.println(s2); // hello
    System.out.println(s3); // hewwo
}
```

### String实例化的方式

```java
String s1 = "hello";
String s2 = new String("hello");
```
* 如果使用字面量声明，只会在创建一个对象
* 如果使用new声明，则会创建两个对象，一个是存在堆空间，一个在字符串常量池内

```java
String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");
String s4 = new String("hello");

System.out.println(s1 == s2); // true
System.out.println(s1 == s3); // false
System.out.println(s1 == s4); // false
System.out.println(s3 == s4); // false

System.out.println(s1.equals(s3)); // true
```

### String的连接方式

* String通过`+`与其他字符串进行连接
    * 常量 + 常量：结果还是在字符串常量池中
    * 常量 + 变量或变量 + 变量：会通过new方式新建一个字符串
* 调用字符串的`intern()`方法可以获取当前字符串在字符串常量池内的地址
* 调用字符串的`concat()`方法拼接字符串，会直接创建一个新对象

```language
String s1 = "hello";
String s2 = "world";

String s3 = "helloworld";
String s4 = "hello" + "world";
String s5 = s1 + "world";
String s6 = "hello" + s2;
String s7 = s1 + s2;

System.out.println(s3 == s4); // true
System.out.println(s3 == s5); // false
System.out.println(s3 == s6); // false
System.out.println(s3 == s7); // false
System.out.println(s5 == s6); // false
System.out.println(s5 == s7); // false

String s8 = s5.intern(); // intern方法返回字符串常量池内的字面量值
System.out.println(s3 == s8); // true

String s9 = s1.concat(s2);
System.out.println(s3 == s9); // false
```

### String的构造器和常用方法

#### 构造器

```java
// 新建空字符串
String s1 = new String();
System.out.println(s1); // ""

// 使用已有的字符串新建字符串
String s2 = new String(s1); // ""
System.out.println(s2); // ""

// 通过char数组新建字符串
String s3 = new String(new char[]{'h', 'e', 'l', 'l', 'o'});
System.out.println(s3); // hello

// 通过char数组新建字符串，并指定使用char数组的哪些部分创建
String s4 = new String(new char[]{'h', 'e', 'l', 'l', 'o'}, 0, 2);
System.out.println(s4); // he

// 通过byte数组新建字符串
String s5 = new String(new byte[]{97, 98, 99, 100, 101, 102});
System.out.println(s5); // abcdef

// 通过byte数组新建字符串，并指定字符集
String s6 = new String(new byte[]{97, 98, 99, 100, 101, 102}, Charset.defaultCharset());
System.out.println(s6); // abcdef
```
