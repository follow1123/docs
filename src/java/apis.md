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

* 在utf-8字符集中，一个汉字占用3个字节，一个字母占用1个字节
* 在gbk字符集中，一个汉字占用2个字节，一个字母占用1个字节
* 将String转换成byte或char数组的过程叫编码
* 将byte或char数组转换成String的过程叫解码
* 解码时的字符集必须可编码时的字符集一致，否则会乱码

```java
System.out.println("字符串转charArray，再还原成字符串");
// 获取字符串内的char数组
String s1 = "hello";
char[] charArray = s1.toCharArray();
for (int i = 0; i < charArray.length; i++) {
    System.out.println(charArray[i]);
}
String s2 = new String(charArray);
System.out.println(s2);

System.out.println("字符串转byteArray，再还原成字符串");
// 获取字符串内的byte数组
String s3 = "abc测试";

System.out.println("使用默认utf-8编码");
byte[] bytes = s3.getBytes();
for (int i = 0; i < bytes.length; i++) {
    System.out.println(bytes[i]);
}

System.out.println("使用gbk编码");
// 获取字符串内的byte数组
byte[] gbkBytes = s3.getBytes(Charset.forName("gbk"));
for (int i = 0; i < gbkBytes.length; i++) {
    System.out.println(gbkBytes[i]);
}

System.out.println("使用gbk解码");
// 解码
System.out.println(new String(gbkBytes, Charset.forName("gbk")));
```

#### 方法

```java
// 是否为空字符串
String s1 = new String();
System.out.println(s1.isEmpty()); // true

// 获取字符串长度
String s2 = "hello";
System.out.println(s2.length()); // 5

// 拼接字符串
System.out.println(s2.concat(" world")); // hello world

String s3 = "Hello";

// 判断两个字符串是否相同，忽略大小写进行比较
System.out.println(s2.equals(s3)); // false
System.out.println(s2.equalsIgnoreCase(s3)); // true

// 比较字符串大小，忽略大小写进行比较
String s4 = "abc";
String s5 = "def";
String s6 = "aBc";
/*
abc和def
先比较第一位
a 的ASCII码是97
d 的ASCII码是100
97 - 100 = -3
 */
System.out.println(s4.compareTo(s5)); // -3
/*
abc和aBc
先比较第一位，两个一样
比较第二个
b 98
B 66
98 - 66 = 32
 */
System.out.println(s4.compareTo(s6)); // 32
System.out.println(s4.compareToIgnoreCase(s6)); // 0

// 大小写转换
String s7 = "ABC";
String s8 = s7.toLowerCase();
System.out.println(s8); // abc
String s9 = s8.toUpperCase();
System.out.println(s9); // ABC

// 去除前后空格
String s10 = "  abc ";
System.out.println(s10.length()); // 6
System.out.println(s10.trim().length()); // 3

// 获取常量池内的共享值
String s11 = "aaa";
String s12 = new String("aaa");
System.out.println(s11 == s12); // false
System.out.println(s11 == s12.intern()); // true

// 当前字符串是否包含某个字符串
String s13 = "abcdef";
System.out.println(s13.contains("de")); // true

// 在当前字符串中查找某个字符串，如果有则返回第一个匹配的下标
System.out.println(s13.indexOf("b")); // 1
System.out.println(s13.indexOf("b", 2)); // -1

// 和上面一样，只不过查找的方向相反
System.out.println(s13.lastIndexOf("e")); // 4
System.out.println(s13.lastIndexOf("e", 3)); // -1

// 截取字符串，包含起始下标，不包含结束下标
String s14 = "hello world!";
System.out.println(s14.substring(6)); // world!
System.out.println(s14.substring(4, 7)); // o w

// 获取指定下标的字符
String s15 = "helloworld";
System.out.println(s15.charAt(3)); // l

// 将charArray转换为字符串，valueOf和copyValueOf底层实现是一样的
char[] chars1 = {'h', 'e', 'l', 'l', 'o'};
String s16 = String.valueOf(chars1, 0, 3);
System.out.println(s16); // hel
String s17 = String.copyValueOf(chars1);
System.out.println(s17); // hello

// 判断字符串是否以某个字符串开头或结尾
String s18 = "abc";
System.out.println(s18.startsWith("a")); // true
System.out.println(s18.endsWith("a")); // false

// 替换字符串
String s19 = "hello world";
System.out.println(s19.replace('o', 'e')); // helle world
System.out.println(s19.replace("ll", "")); // heo world
System.out.println(s19.replaceAll("o", "1")); // hell1 w1rld
```

### StringBuilder和StringBuffer

* StringBuffer：可变字符序列，线程安全（jdk1）
* StringBuilder：可变字符序列（jdk5）
* jdk9及之后这两个类的value属性也从charArray改为了byteArray
* 这两个类的父类是AbstractStringBuilder，父类里定义具体操作的数据
* 默认初始化大小是16，如果初始化时指定字符串，则初始化大小为指定的字符串长度+16
* 在添加时如果数据满了，则需要进行扩容操作，扩容为原来数组长度的2倍+2
* 执行效率：StringBuilder > StringBuffer > String
* StringBuffer和StringBuilder在`append(null)`时，会添加null字符串

```java
StringBuilder sb = new StringBuilder("aaa");
// 添加
sb.append("bbb").append("ccc").append("ddd");
System.out.println(sb); // aaabbbcccddd

// 删除
sb.delete(3, 5);
System.out.println(sb); // aaabcccddd
sb.deleteCharAt(3); // aaacccddd
System.out.println(sb);

// 修改
sb.replace(3, 5, "bb");
System.out.println(sb); // aaabbcddd
sb.setCharAt(5, 'b');
System.out.println(sb); // aaabbbddd

// 查询
System.out.println(sb.charAt(4)); // b

// 插入
sb.insert(6, "ccc");
System.out.println(sb); // aaabbbcccddd

// 长度
System.out.println(sb.length()); // 12

// 翻转
sb.reverse();
System.out.println(sb); // dddcccbbbaaa

// 修改长度，后面的所有数据用0填充
sb.setLength(3);
System.out.println(sb); // ddd
```



