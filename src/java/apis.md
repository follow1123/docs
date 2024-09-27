# 常用类

## 目录

1. <a href="#string">String</a>
    1. <a href="#string-table">字符串常量存储的位置</a>
    2. <a href="#string-immutability">String的不可变性</a>
    3. <a href="#string-instance">String实例化的方式</a>
    4. <a href="#string-concat">String的连接方式</a>
    5. <a href="#string-constructor-methods">String的构造器和常用方法</a>
        1. <a href="#string-constructor">构造器</a>
        2. <a href="#string-methods">方法</a>
    6. <a href="#string-builder-buffer">StringBuilder和StringBuffer</a>
2. <a href="#date-time">日期时间</a>
    1. <a href="#date-time-before-jdk8">JDK8之前的日期时间相关类</a>
        1. <a href="#date-time-before-jdk8-system">System.currentTimeMillis()</a>
        2. <a href="#date-time-before-jdk8-util-sql-date">java.util.Date/java.sql.Date</a>
        3. <a href="#date-time-before-jdk8-simple-date-format">SimpleDateFormat</a>
        4. <a href="#date-time-before-jdk8-calendar">Calendar</a>
    2. <a href="#date-time-jdk8">JDK8的日期时间相关类</a>
        1. <a href="#date-time-jdk8-local-date-time">LocalDate/LocalTime/LocalDateTime</a>
        2. <a href="#date-time-jdk8-instant">Instant</a>
        3. <a href="#date-time-jdk8-duration-period">Duration/Period</a>
        4. <a href="#date-time-jdk8-date-time-formatter">DateTimeFormatter</a>
        5. <a href="#date-time-jdk8-old-new-api">和旧日期时间api之间的相互转换</a>
3. <a href="#compare">比较器</a>
    1. <a href="#compare-comparable">Comparable接口</a>
    2. <a href="#compare-comparator">Comparator</a>
4. <a href="#others">其他常用类</a>
    1. <a href="#others-system">System</a>
    2. <a href="#others-runtime">Runtime</a>
    3. <a href="#others-math">Math</a>
    4. <a href="#others-math-package">java.math包</a>
        1. <a href="#others-math-package-biginteger">BigInteger</a>
        2. <a href="#others-math-package-bigdecimal">BigDecimal</a>
    5. <a href="#others-ramdom">Random</a>


<a id="string"></a>
## String

* 使用`final`修饰，不可被继承
* 实现`Serializable`可序列化接口，表示可以通过网络或本地进行数据传输
* 实现`Comparable`接口，表示可以和其他对象比较大小
* jdk8使用`char`类型数组表示数据
* jdk9开始使用`byte`类型数组表示数据

<a id="string-table"></a>
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

<a id="string-immutability"></a>
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

<a id="string-instance"></a>
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

<a id="string-concat"></a>
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

<a id="string-constructor-methods"></a>
### String的构造器和常用方法

<a id="string-constructor"></a>
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

<a id="string-methods"></a>
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

<a id="string-builder-buffer"></a>
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

---

<a id="date-time"></a>
## 日期时间

* 计算机时间的主要时间标准有
    * UTC(Coordinated Universal Time)
    * GMT(Greenwich Mean Time)
    * CST(Central Standard Time)
* UTC和GMT相差不大，可以认为是一样的
* CST在不同的位置有不同的含义
    * 中国标准时间（China Standard Time）：即北京时间，UTC+8
    * 中央标准时间（Central Standard Time）：主要用于美国和加拿大的中部地区，UTC-6

<a id="date-time-before-jdk8"></a>
### JDK8之前的日期时间相关类

<a id="date-time-before-jdk8-system"></a>
#### System.currentTimeMillis()

```java
/*
获取当前时间对应的毫秒数，时间戳
当前时间与1970年1月1日0时0分0秒之间的毫秒数
 */
long currentTimeMillis = System.currentTimeMillis();
System.out.println(currentTimeMillis);
```

<a id="date-time-before-jdk8-util-sql-date"></a>
#### java.util.Date/java.sql.Date

* java.util.Date

```java
// 创建对象
Date date1 = new Date();
System.out.println(date1);

// 获取时间戳
long time = date1.getTime();
System.out.println(time);

// 基于时间戳创建对象
Date date2 = new Date(1727334456255L);
System.out.println(date2);
```

* java.sql.Date
    * java.sql.Date是java.util.Date的子类

```java
// 创建对象
java.sql.Date date = new java.sql.Date(1727334456255L);

// 打印时默认只显示年月日，方便数据库存储
System.out.println(date);
```

* 两者相互转换

```java
// java.util.Date转java.sql.Date
Date utilDate = new Date();
java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

// java.sql.Date转java.util.Date
Date date = new Date(sqlDate.getTime());
```

<a id="date-time-before-jdk8-simple-date-format"></a>
#### SimpleDateFormat

* 用于日期格式化和解析
    * 格式化：日期 > 字符串
    * 解析：字符串 > 日期

```java
// 格式化日期
SimpleDateFormat sdf1 = new SimpleDateFormat();
Date date1 = new Date();
String dateStr1 = sdf1.format(date1);
System.out.println(dateStr1);

// 解析
Date date2 = sdf1.parse(dateStr1);
System.out.println(date2);


// 指定日期格式进行格式化
SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date date3 = new Date();
String dateStr2 = sdf2.format(date3);
System.out.println(dateStr2);

// 根据指定的日期格式进行解析
Date date4 = sdf2.parse(dateStr2);
System.out.println(date4);
```

<a id="date-time-before-jdk8-calendar"></a>
#### Calendar

* 日历，对日期进行修改

```java
// 创建对象
Calendar calendar = Calendar.getInstance();
System.out.println(calendar);

// 获取今天是这个月的第几天
int dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
System.out.println(dayOfMonth);

// 获取今天是这个星期的第几天
int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
System.out.println(dayOfWeek);

// 修改今天是这个月的第几天
calendar.set(Calendar.DAY_OF_MONTH, 11);
System.out.println(calendar.get(Calendar.DAY_OF_MONTH));

// 增加或修改今天是这个月的第几天
calendar.add(Calendar.DAY_OF_MONTH, 1);
System.out.println(calendar.get(Calendar.DAY_OF_MONTH));
calendar.add(Calendar.DAY_OF_MONTH, -1);
System.out.println(calendar.get(Calendar.DAY_OF_MONTH));

// 和java.util.Date相互转换
Date date1 = calendar.getTime();
System.out.println(date1);

Date date2 = new Date();
calendar.setTime(date2);
```

<a id="date-time-jdk8"></a>
### JDK8的日期时间相关类

* 之前日期设计的问题
    * 可变性：像日期和时间这样的类应该是不可变的
    * 偏移性：Date中的年份是从1900开始的，而月份都从0开始
    * 格式化：格式化只对Date有用，Calendar则不行
    * 它们也不是线程安全的，不能处理闰秒
* java8新日期api相关包
    * `java.time`：包含值对象的基础包
    * `java.time.chrono`：提供对不同的日历系统的访问
    * `java.time.format`：格式化和解析日期和时间
    * `java.time.temporal`：包括底层框架和扩展性
    * `java.time.zone`：包含时区支持的类

<a id="date-time-jdk8-local-date-time"></a>
#### LocalDate/LocalTime/LocalDateTime

* LocalDate：日期
* LocalTime：时间
* LocalDateTime：日期和时间

```java
// 创建对象
LocalDate localDate = LocalDate.now();
LocalTime localTime = LocalTime.now();
LocalDateTime localDateTime = LocalDateTime.now();

System.out.println(localDate);
System.out.println(localTime);
System.out.println(localDateTime);

// 指定日期时间并创建对象
LocalDate localDate1 = LocalDate.of(2022, 10, 11);
LocalDateTime localDateTime1 = LocalDateTime.of(2022, 10, 11, 12, 13, 14);

System.out.println(localDate1);
System.out.println(localDateTime1);

// 获取时间
LocalDateTime localDateTime2 = LocalDateTime.now();

// 获取这个月的第几天
int dayOfMonth = localDateTime2.getDayOfMonth();
System.out.println(dayOfMonth);

// 修改这个月的第几天
LocalDateTime localDateTime3 = localDateTime2.withDayOfMonth(1);
System.out.println(localDateTime2);
System.out.println(localDateTime3);

// 增加或减少天数
LocalDateTime localDateTime4 = localDateTime2.plusDays(3);
LocalDateTime localDateTime5 = localDateTime4.minusDays(4);
System.out.println(localDateTime4);
System.out.println(localDateTime5);
```

<a id="date-time-jdk8-instant"></a>
#### Instant

* 瞬时，时间戳
* 指格林维治时间1970年01月01日00时00分00秒起至现在的总秒数
* 和北京时间相差8小时

```java
// 实例化
Instant instant1 = Instant.now();
System.out.println(instant1);

// 指定当前时区并实例化
Instant instant2 = Instant.now(Clock.systemDefaultZone());
System.out.println(instant2);

// 获取毫秒数
long epochMilli = instant2.toEpochMilli();
System.out.println(epochMilli);
```

<a id="date-time-jdk8-duration-period"></a>
#### Duration/Period

* Duration：时间段
* Period：日期段

```java
// 获取两个时间段相差的秒数
Duration duration = Duration.between(LocalTime.now(), LocalTime.now().plusHours(5));
System.out.println(duration.getSeconds());

Period period = Period.between(LocalDate.now(), LocalDate.now().minusDays(3));
// 获取两个日期段相差的天数
System.out.println(period.getDays());
```

<a id="date-time-jdk8-date-time-formatter"></a>
#### DateTimeFormatter

* 日期时间格式化

```java
// 格式化
DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String dateStr = dtf.format(LocalDateTime.now());
System.out.println(dateStr);

// 解析
TemporalAccessor ta = dtf.parse(dateStr);
LocalDateTime localDateTime = LocalDateTime.from(ta);
System.out.println(localDateTime);
```

<a id="date-time-jdk8-old-new-api"></a>
#### 和旧日期时间api之间的相互转换

```java
// java.time.Instant与java.util.Date
Instant instant1 = Instant.now();
Date date1 = Date.from(instant1);
Instant instant2 = date1.toInstant();

// java.time.Instant与java.sql.Timestamp
Instant instant3 = Instant.now();
Timestamp timestamp = Timestamp.from(instant3);
Instant instant4 = timestamp.toInstant();

// java.time.ZonedDateTime与java.util.GregorianCalendar
ZonedDateTime zonedDateTime1 = ZonedDateTime.now();
GregorianCalendar gregorianCalendar1 = GregorianCalendar.from(zonedDateTime1);
ZonedDateTime zonedDateTime2 = gregorianCalendar1.toZonedDateTime();

// java.time.LocalDate与java.sql.Date
LocalDate localDate1 = LocalDate.now();
java.sql.Date sqlDate1 = java.sql.Date.valueOf(localDate1);
LocalDate localDate2 = sqlDate1.toLocalDate();

// java.time.LocalTime与java.sql.Time
LocalTime localTime1 = LocalTime.now();
Time sqlTime1 = Time.valueOf(localTime1);
LocalTime localTime2 = sqlTime1.toLocalTime();

// java.time.LocalDateTime与java.sql.Timestamp
LocalDateTime localDateTime1 = LocalDateTime.now();
Timestamp timestamp1 = Timestamp.valueOf(localDateTime1);
LocalDateTime localDateTime2 = timestamp1.toLocalDateTime();

// java.time.ZoneId与java.util.TimeZone
ZoneId zoneId1 = ZoneId.systemDefault();
TimeZone timeZone1 = TimeZone.getTimeZone(zoneId1);
ZoneId zoneId2 = timeZone1.toZoneId();

// java.time.format.DateTimeFormatter与java.text.DateFormat，没有转回DateTimeFormatter的操作
DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
Format format = dateTimeFormatter.toFormat();
```

---

<a id="compare"></a>
## 比较器

<a id="compare-comparable"></a>
### Comparable接口

* 实现`Comparable`接口，并实现里面的`compareTo(Object o)`方法
* `compareTo(Object o)`方法返回一个int，比较规则如下：
    * 如果返回值是正数，当前对象大
    * 如果返回值是负数，当前对象小
    * 如果返回值是0，一样大

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/api/comparable/ComparableTest.java)

* 定义对象并实现`Comparable`接口

```java
public class Product implements Comparable {

    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }

    @Override
    public int compareTo(Object o) {
        if (this == o) return 0;
        if (o instanceof Product){
            Product p = (Product) o;
            int v = Double.compare(this.price, p.price);
            if (v != 0) return v;
            // 如果price相同，则比较name的大小
            return this.name.compareTo(p.name);
        }
        throw new RuntimeException("类型不匹配");
    }
}
```

* 测试

```java
public class ComparableTest {

    @Test
    public void testCompareString() {
        String[] strings = {"f", "g", "d", "e", "p"};

        Arrays.sort(strings);

        System.out.println(Arrays.toString(strings));
    }

    @Test
    public void testCompareObj() {
        Product[] products = new Product[3];

        products[0] = new Product("vde", 1000);
        products[1] = new Product("ads", 2000);
        products[2] = new Product("zdd", 1000);

        Arrays.sort(products);

        for (Product product : products) {
            System.out.println(product);
        }
    }
}
```

<a id="compare-comparator"></a>
### Comparator

* 使用场景
    * 当元素的类型没有实现`Comparable`接口，而又不方便修改代码时
    * 如果有一个类，实现了`Comparable`接口，指定了比较大小的规则，但我不想安装它预定义的方法比较大小，
    又不能随意修改类时
* 创建一个实现了`Comparator`接口的类，实现`compare(Object o1, Object o2)`方法
* 将实现了排序方法逻辑的类传入`Arrays.sort(value, comparator)`方法内实现自定义排序

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/api/comparable/ComparatorTest.java)

```java
Product[] products = new Product[4];

products[0] = new Product("vde", 1000);
products[1] = new Product("ads", 2000);
products[2] = new Product("zdd", 1000);
products[3] = new Product("zdd", 5000);

Arrays.sort(products, new Comparator() {
    @Override
    public int compare(Object o1, Object o2) {
        if(o1 == o2) return 0;

        if(o1 instanceof Product && o2 instanceof Product){
            Product p1 = (Product) o1;
            Product p2 = (Product) o2;
            // 先按name从小到大的排序
            int v = p1.getName().compareTo(p2.getName());
            if (v != 0) return v;

            // name相同再按price从大到小排序
            return -Double.compare(p1.getPrice(), p2.getPrice());

        }
        throw new RuntimeException("类型不匹配");
    }
});

for (Product product : products) {
    System.out.println(product);
}
```

<a id="others"></a>
## 其他常用类

<a id="others-system"></a>
### System

```java
// 获取当前毫秒数
System.out.println(System.currentTimeMillis());

// 请求系统进行垃圾回收，看系统执行情况是否执行
System.gc();

// 获取系统属性
System.out.println(System.getProperty("java.version")); // java版本
System.out.println(System.getProperty("java.home")); // jdk路径
System.out.println(System.getProperty("os.name")); // 系统名称
System.out.println(System.getProperty("os.version")); // 系统版本
System.out.println(System.getProperty("user.name")); // 用户名
System.out.println(System.getProperty("user.home")); // 用户家目录
System.out.println(System.getProperty("user.dir")); // 当前项目路径
```

<a id="others-runtime"></a>
### Runtime

* 获取JVM运行时相关数据

```java
Runtime runtime = Runtime.getRuntime();

// 获取JVM运行时相关数据
System.out.println(runtime.totalMemory()); // 总内存，单位byte
System.out.println(runtime.maxMemory()); // 最大内存，单位byte
System.out.println(runtime.freeMemory()); // 可用内存，单位byte
```

<a id="others-math"></a>
### Math

* 数学运算操作

```java
// 数学运算操作
// 绝对值
System.out.println(Math.abs(-1));  // 1
// 向上取整
System.out.println(Math.ceil(1.3)); // 2
// 向下取整
System.out.println(Math.floor(1.9)); // 1
// 四舍五入
System.out.println(Math.round(1.4)); // 1
```

<a id="others-math-package"></a>
### java.math包

<a id="others-math-package-biginteger"></a>
#### BigInteger

* 不可变的任意精度整数

```java
// 不可变的任意精度整数
BigInteger bi = BigInteger.valueOf(15);
// 绝对值
System.out.println(bi.abs()); // 15
// 加
System.out.println(bi.add(BigInteger.valueOf(10))); // 25
// 减
System.out.println(bi.subtract(BigInteger.valueOf(10))); // 5
// 乘
System.out.println(bi.multiply(BigInteger.valueOf(10))); // 150
// 除
System.out.println(bi.divide(BigInteger.valueOf(5))); // 3
// 取余
System.out.println(bi.remainder(BigInteger.valueOf(4))); // 3
```

<a id="others-math-package-bigdecimal"></a>
#### BigDecimal

* 任意精度的浮点数

```java
// 任意精度的浮点数
BigInteger bi = new BigInteger("12433241123");
BigDecimal bd1 = new BigDecimal("12435.351");
BigDecimal bd2 = new BigDecimal("11");

System.out.println(bi);

// HALF_UP表示除不尽就四舍五入
System.out.println(bd1.divide(bd2, RoundingMode.HALF_UP));
// 保留小数点后10位
System.out.println(bd1.divide(bd2, 10, RoundingMode.HALF_UP));
```

<a id="others-ramdom"></a>
### Random

* 随机数

```java
// 随机数

Random random = new Random();
// 随机boolean
System.out.println(random.nextBoolean());

// 随机byte数组
byte[] bytes = new byte[10];
random.nextBytes(bytes);
System.out.println(Arrays.toString(bytes));

// 随机double
System.out.println(random.nextDouble());

// 随机float
System.out.println(random.nextFloat());

// 随机高斯（正态）分布，中间数据较多
System.out.println(random.nextGaussian());

// 随机int
System.out.println(random.nextInt());

// 随机int，0-10（不包含10）
System.out.println(random.nextInt(10));

// 随机long
System.out.println(random.nextLong());
```
