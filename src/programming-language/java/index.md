# Java

## 新特性

### java9

#### 模块机制

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
// 开放整个模块
open module com.demo{
  requires java.se;
}

// 开放部分包
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

#### 接口内可以定义private方法

> 定义接口的的公共方法

#### 集合类的工厂方法

> 快速创建集合，这种方法创建的集合都是只读的

```java
// Map
Map.of("key1", "value1", "key2", "value2")

// List
List.of("value1", "value2");

// Set
Set.of("value1", "value2");
```

#### Stream增强

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

#### 其他

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

### java10 

* 添加`var`关键字用于类型推断，只适用与局部变量

### java11

* var 关键字可以用于lambda参数内

```java
// var 关键字可以用于lambda参数内
Consumer<String> consumer = (var s) -> {
    System.out.println(s);
};
consumer.accept("123");
```

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
* HttpClient 全新Http客户端

### java12-16

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

* 文本快

```java
String s = """
12321
123123ad
qweqwe
""";
System.out.println(s);
```

* instanceof增强

```java
Object s = "123";

if (s instanceof String str){
System.out.println(str);
}
```

* 空指针报错优化

* Record类，替换Lombok

### java17

* 密封类型


### 后端解决跨域的三种方式

* 1. 方法上添加`@CrossOrigin`注解

```java
@PostMapping("/testCors")
@CrossOrigin
public Map<String, String> testCors(){
    return Map.of("name", "123", "age", "123");
}
```

* 2. 配置`CorFilter`滤器

```java
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(source);
    }
}
```

* 3. 实现`WebMvcConfigurer`接口的`addCorsMappings`方法进行配置

```java
@Configuration
public class CorsConfigure implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedHeaders("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
```

* 配合安全框架的情况下推荐使用`CorFilter`的方式，过滤器会最先执行
