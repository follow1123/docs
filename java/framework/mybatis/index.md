---
sidebar_position: 15
---

# Mybatis

## pojo工具类

```java
package com.yang.utils;

import org.apache.ibatis.session.SqlSession;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * @auther YF
 * @create 2020-07-30-20:48
 */
public class PojoUtils {

    private static String showTables = "show tables";

    private static String desTable = "describe ";

    private static String packageName;

    private static StringBuilder sb;

    private static ArrayList<String> fieldNames;

    private static ArrayList<String> fieldTypes;

    private static String empty = " ";

    private static String table = "\t";

    private static String nextLine = "\n";

    static {
        String name = PojoUtils.class.getPackage().getName();
        String substring = name.substring(0, name.lastIndexOf(".") + 1);
        packageName = substring + "pojo";
    }

    private static String getPath(){
        return packageName.replace(".", "/");
    }

    public static void initPojo(Connection connection, String packageN){
        if (packageN != null || !"".equals(packageN.trim())){
            packageName = packageN;
        }
        initPojo(connection);
    }

    public static void initPojo(SqlSession sqlSession, String packageN){
        if (packageN != null || !"".equals(packageN.trim())){
            packageName = packageN;
        }
        initPojo(sqlSession);
    }

    public static void initPojo(Connection connection) {
        try(PreparedStatement statement = connection.prepareStatement(showTables);
            ResultSet rs = statement.executeQuery()) {
            while (rs.next()){
                String tableName = rs.getString(1);
                initPOJOFields(connection ,tableName);
            }
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("pojo 初始化失败！");
        }
    }

    public static void initPojo(SqlSession sqlSession) {
        try {
            Connection connection = sqlSession.getConfiguration().getEnvironment().getDataSource().getConnection();
            initPojo(connection);
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            sqlSession.close();
        }
    }

    public static void deletePojo(){
        File file = new File("src/main/java/" + getPath());
        if (file.exists()) {
            File[] files = file.listFiles();
            for (File file1 : files) {
                file1.delete();
            }
            file.delete();
        }
    }

    public static void rebuildPojo(Connection connection){
        deletePojo();
        initPojo(connection);
    }
    public static void rebuildPojo(SqlSession sqlSession){
        deletePojo();
        initPojo(sqlSession);
    }

    private static void initPOJOFields(Connection connection,String tableName) {
        if (fieldNames == null){
            fieldNames = new ArrayList<>();
        }else {
            fieldNames.clear();
        }
        if (fieldTypes == null){
            fieldTypes = new ArrayList<>();
        }else {
            fieldTypes.clear();
        }
        try(PreparedStatement statement = connection.prepareStatement(desTable + tableName);
            ResultSet rs = statement.executeQuery()) {
            while (rs.next()){
                fieldNames.add(headToLower(rs.getString(1)));
                String fileType = rs.getString(2);
                if (fileType.startsWith("char") || fileType.startsWith("varchar")){
                    fieldTypes.add("String");
                }else if (fileType.startsWith("int")){
                    fieldTypes.add("int");
                }else if (fileType.startsWith("double")){
                    fieldTypes.add("double");
                }else if (fileType.startsWith("longblob")){
                    fieldTypes.add("byte[]");
                }else if (fileType.startsWith("timestamp")){
                    fieldTypes.add("java.util.Date");
                }
            }
            createPojo(tableName);

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    private static void createPojo(String tableName) {
        File file = new File("src/main/java/" + getPath());
        if (!file.exists()){
            file.mkdir();
        }
        String className = headToUpper(tableName);
        String path = file.getAbsolutePath() + "/" + className + ".java";
        try(BufferedWriter fos = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path)))){
            String classFile = getClassFile(className);
            fos.write(classFile);
            fos.flush();
        }catch (Exception e){
            e.printStackTrace();
        }
    }x
    /**
     * 建造类的核心方法
     * @param className
     * @return
     */
    private static String getClassFile(String className) {
        if (sb == null) {
            sb = new StringBuilder();
        }else {
            sb.delete(0, sb.length());
        }
        sb.append("package ").append(packageName).append(";").append(nextLine);
        sb.append("public class ").append(className).append(empty).append("implements java.io.Serializable")
            .append("{").append(nextLine);
        appendFields();
        appendEmptyConstructor(className);
        appendGetterAndSetter();
        appendToString(className);
        sb.append("}");
        return sb.toString();
    }
    /**
     * 生成属性
     */
    private static void appendFields(){
        for (int i = 0; i < fieldNames.size(); i++) {
            sb.append(table).append("private ").append(fieldTypes.get(i)).append(empty)
                .append(fieldNames.get(i)).append(";").append(nextLine);
        }
    }
    /**
     * 生成空参构造方法
     * @param className
     */
    private static void appendEmptyConstructor(String className){
        sb.append(table).append("public ").append(className).append("(){}").append(nextLine);
    }

    /**
     * 生成get和set方法
     */
    private static void appendGetterAndSetter(){
        for (int i = 0; i < fieldNames.size(); i++) {
            sb.append(table).append("public ").append(fieldTypes.get(i)).append(empty)
                .append("get").append(headToUpper(fieldNames.get(i))).append("(){").append(nextLine)
                .append(table).append(table).append("return this.").append(fieldNames.get(i))
                .append(";").append(nextLine).append(table).append("}").append(nextLine);
            sb.append(table).append("public void ").append("set").append(headToUpper(fieldNames.get(i)))
                .append("(").append(fieldTypes.get(i)).append(empty).append("value")
                .append("){").append(nextLine).append(table).append(table).append("this.")
                .append(fieldNames.get(i)).append(empty).append("=").append(empty)
                .append("value;").append(nextLine).append(table).append("}").append(nextLine);
        }
    }

    /**
     * 生成toString
     * @param className
     */
    private static void appendToString(String className){
        sb.append(table).append("@Override").append(nextLine);
        sb.append(table).append("public String toString() {").append(nextLine);
        sb.append(table).append(table).append("return ").append("\"")
            .append(className).append("{");
        for (int i = 0; i < fieldNames.size(); i++) {
            sb.append(i > 0 ? "\", " : "").append(fieldNames.get(i)).append("='\"+");
            sb.append(fieldNames.get(i)).append("+\"'")
                .append("\"+")
                .append(nextLine).append(table).append(table);
        }
        sb.append("\"}").append("\";").append(nextLine);

        sb.append(table).append("}").append(nextLine);
    }

    private static String headToUpper(String t){
        return t.substring(0, 1).toUpperCase() + t.substring(1);
    }
    private static String headToLower(String t){
        return t.substring(0, 1).toLowerCase() + t.substring(1);
    }
}
```



## xml文件骨架

## 核心配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value=""/>
                <property name="username" value="用户名"/>
                <property name="password" value="密码"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
    </mappers>
</configuration>
```

### mapper配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="dao接口的全限定名">
    <select id="对应的方法名" resultType="返回结果的全限定名">
    	sql语句
    </select>
</mapper>
```



## 简介

* MyBatis是一款优秀的持久层框架
* 它支持定制化SQL.存储过程以及高级映射。
* MyBatis避免了几乎所有的JDBC代码和手动设置参数以及获取结果集。
* MyBatis可以使用简单的XML或注解来配置和映射原生类型、接口和Java的POJO (Plain Old JavaObjects， 普通老式Java对象)为数据库中的记录。
* MyBatis本是apache的一一个开源项目iBatis, 2010年这个项目由apache software foundation迁移到了google code,并且改名为MyBatis 。
* 2013年11月迁移到Github。

### 获取

* maven仓库:

```xml
<!-- https ://mvnrepository. com/artifact/org. mybatis/mybatis -->
<dependency>
    <groupId>org. mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.2</version>
</dependency>
```

* Github : https://github.com/mybatis/mybatis-3/releases
* 中文文档: https://mybatis.org/mybatis-3/zh/index.html

### 持久化

数据持久化

* 持久化就是将程序的数据在持久状态和瞬时状态转化的过程

* 内存:断电即失

* 数据库(Jdbc), io文件持久化。

### 持久层

Dao层，Service层， Controller层……

* 完成持久化工作的代码块
* 层界限十分明显。

## Mybatis程序

> jdbc url

```properties
jdbc:mysql://localhost:3306/session1?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
```

* 编写配置：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value=""/>
                <property name="username" value="用户名"/>
                <property name="password" value="密码"/>
            </dataSource>
        </environment>
    </environments>
</configuration>
```

* 编写获取SqlSession的工具类

```java
public class JDBCUtils {
    private static SqlSessionFactory sqlSessionFactory;
    static {
        try(InputStream is = JDBCUtils.class.getClassLoader().getResourceAsStream("mybatis-info.xml")){
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("connection failed!");
        }
    }
    public static SqlSession getSqlSession(){
        return sqlSessionFactory.openSession();
    }
}
```

* 编写代码

  * 编写实体类
  * 编写dao接口

  ```java
  public interface UserDao {
      List<Users> getUser();
  }
  ```

  * ~~编写dao接口实现类~~
  * 编写对应的mapper配置文件

  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
          "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <mapper namespace="dao接口的全限定名">
      <select id="对应的方法名" resultType="返回结果的全限定名">
      	sql语句
      </select>
  </mapper>
  ```

  * 测试

  ```java
  @Test
  public void testGetUser(){
      //获取sqlSession对象
      SqlSession sqlSession = JDBCUtils.getSqlSession();
      //获取对应的dao对象
      UserDao mapper = sqlSession.getMapper(UserDao.class);
      //执行得到结果
      List<Users> user = mapper.getUser();
      for (Users users : user) {
          System.out.println(users.getEmail());
      }
      //关闭连接
      sqlSession.close();
  }
  ```

## CRUD

* namespace

  * namespace中的包名要和Dao/mapper接口的包名一致

* **select**

  * id：就是对应的namespace中的方法名
  * resultType：sql语句执行的返回值
  * paramterType：参数类型
  * xml配置

  ```xml
  <select id="getUserById" parameterType="int" resultType="com.yang.pojo.Users">
      select * from users where users.userId = #{id}
  </select>
  ```

  * 代码

  ```java
  @Test
  public void testGetUser(){
      UserMapper mapper = sqlSession.getMapper(UserMapper.class);
      List<Users> user = mapper.getUser();
      for (Users users : user) {
          System.out.println(users.getEmail());
      }
      //关闭连接
      sqlSession.close();
  }
  ```

* **insert**

  * xml配置

  ```xml
  <insert id="insertUser" parameterType="com.yang.pojo.Users">
      insert into users (email, password) values (#{Email}, #{Password})
  </insert>
  ```

  * 代码

  ```java
  @Test
  public void testInsertUser(){
      UserMapper mapper = sqlSession.getMapper(UserMapper.class);
      HashMap<String, Object> hashMap = new HashMap<>();
      Users users = new Users();
      users.setEmail("fsafaefwea");
      users.setPassword("fdsfsse");
      int i = mapper.insertUser(users);
      //提交事务
      sqlSession.commit();
      sqlSession.close();
      System.out.println("修改"+(i > 0 ? "成功！" : "失败！"));
  }
  ```

* **delete**

  * xml配置

  ```xml
  <delete id="deleteUser" parameterType="int">
      delete from users where users.userId = #{id}
  </delete>
  ```

  * 代码

  ```java
  @Test
  public void testDeleteUser(){
      UserMapper mapper = sqlSession.getMapper(UserMapper.class);
      HashMap<String, Object> hashMap = new HashMap<>();
      int i = mapper.deleteUser(105);
      //提交事务
      sqlSession.commit();
      sqlSession.close();
      System.out.println("修改"+(i > 0 ? "成功！" : "失败！"));
  }
  ```

* **update**

  * xml配置

  ```xml
  <update id="updateUser" parameterType="java.util.Map">
      update users set users.password = #{pwd}, users.email = #{email}
      where users.userId = #{id}
  </update>
  ```

  * 代码

  ```java
  @Test
  public void testUpdateUser(){
      UserMapper mapper = sqlSession.getMapper(UserMapper.class);
      HashMap<String, Object> hashMap = new HashMap<>();
      hashMap.put("pwd", "123456");
      hashMap.put("email", "behappy@vip.sina.com");
      hashMap.put("id", 1);
      int i = mapper.updateUser(hashMap);
      //提交事务
      sqlSession.commit();
      sqlSession.close();
      System.out.println("修改"+(i > 0 ? "成功！" : "失败！"));
  }
  ```

* 注意：增删改需要提交事务

* 假设,我们的实体类，或者数据库中的表，字段或者参数过多,我们应当考虑使用Map

* 模糊查询

  * xml配置

  ```xml
  <select id="getUserByFirstName" parameterType="String" resultType="com.yang.pojo.Users">
      select * from users where users.firstName like '%' #{id} '%'
  </select>
  ```

  * 代码

  ```java
  @Test
  public void testGetUserByEmail(){
      UserMapper mapper = sqlSession.getMapper(UserMapper.class);
      List<Users> a = mapper.getUserByFirstName("ia");
      for (Users users : a) {
          System.out.println(users.getFirstName() + " " + users.getLastName());
      }
      sqlSession.close();
  }
  ```

## 配置解析

**核心配置文件**

* mybatis-config.xml
* MyBatis的配置文件包含了会深深影响MyBatis行为的设置和属性信息。

```xml
configuration (配置)
properties (属性)
settings (设置)
typeAliases (类型别名)
typeHandlers (类型处理器)
objectFactory (对象工厂)
plugins (插件)
environments (环境配置)
environment (环境变量)
transactionManager (事务管理器)
datasource (数据源)
```

### 环境配置(environments)

MyBatis可以配置成适应多种环境

尽管可以配置多个环境，但每个SqlSessionFactory实例只能选择一种环境

Mybatis默认的事务管理器就是JDBC，连接池: POOLED

### 属性. (properties)

我们可以通过properties属性来实现引用配置:文件

这些属性都是可外部配置且可动态替换的，既可以在典型的Java属性文件中配置,亦可通过properties元素的子元素来传递。[db.properties]

* 编写一个配置文件

```properties
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/session1?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
username=root
password=112358
```

* 在核心配置文件中引入
  * properties标签必须在configuration标签内的最前面

```xml
<properties resource="db.properties"/>
```

* 可以直接引入外部文件
* 可以在其中增加一-些属性配置
* 如果两个文件有同一个字段，优先使用外部配置文件的

### 类型别名(typeAliases)

* 类型别名是为Java类型设置一 个短的名字。
* 存在的意义仅在于用来减少类完全限定名的冗余。

```xml
<typeAliases>
    <typeAlias type="com.yang.pojo.Users" alias="user"/>
</typeAliases>
```

* 也可以指定一个包名， MyBatis 会在包名下面搜索需要的Java Bean
* 扫描实体类的包，它的默认别名就为这个类的类名，首字母小写

```xml
<typeAliases>
    <package name="com.yang.pojo"/>
</typeAliases>
```

* 在实体类比较少的时候，使用第一种方式。
* 如果实体类十分多,建议使用第二种。
* 第一种可以DIY别名，第二种则.不行，如果非要改，需要在实体.上增加注解

```xml
@Alias("别名")
public class Users {
}
```

### 设置

* 这是MyBatis中极为重要的调整设置，它们会改变MyBatis的运行时行为。

### 其他配置

*  typeHandlers (类型处理器)
* objectFactory_ (对象工厂)
* plugins插件
  * mybatis-generator-core
  * mybatis-plus
* 通用mapper

### 映射器（mappers）

MapperRegistry:注册绑定我们的Mapper文件;

* 方式一:

```xml
<mappers>
    <mapper resource=对应xml的路径/>
</mappers>
```

* 方式二:使用class文件绑定注册
  * 接口和他的Mapper配置文件必须同名
  * 接口和他的Mapper配置文件必须在同一一个包下

```xml
<mappers>
    <mapper class=对应类的全限定名/>
</mappers>
```

* 方式三:使用扫描包进行注入绑定
  * 和方式二需要注意的顶一样

```xml
<mappers>
    <package name=对应类的包名/>
</mappers>
```

## 生命周期和作用域

![mybatis生命周期](/img/java/mybatis生命周期.png)

**生命周期，和作用域，是至关重要的，因为错误的使用会导致非常严重的并发问题。**

* **SqlSessionFactorybuilder**
  * 一旦创建了SqlSessionFactory, 就不再需要它了
  * 局部变量

* **SqISessionFactory**
  * 可以想象为数据库连接池
  * SqlSessionFactory - -旦被创建就应该在应用的运行期间一直存在，没有任何理由丢弃它或重新创建另一个实例
  * 因此SqlSessionFactory的最佳作用域是应用作用域
  * 最简单的就是使用单例模式或者静态单例模式
* **SqlSession**
  * 连接到连接池的一一个请求
  * SqlSession的实例不是线程安全的，因此是不能被共享的，所以它的最佳的作用域是请求或方法作用域
  * 用完之后需要赶紧关闭，否则资源被占用

**这里面的每一个Mapper, 就代表一个具体的业务 **

## ResultMap

**解决属性名和字段名不一致的问题**

解决方法：

* 起别名（在sql层面直接起别名）
* 使用resultMap
  * resu1tMap元素是MyBatis中最重要最强大的元素
  * ResultMap的设计思想是，对于简单的语句根本不需要配置显式的结果映射，而对于复杂-一点的语句只需要描述它们的关系就行了。
  * ResultMap最优秀的地方在于，虽然你已经对它相当了解了，但是根本就不需要显式地用到他们。

```xml
<resultMap id="mapId" type="对应的实体类">
    <!--        将实体类的字段名也数据库表的列名对应起来-->
    <result column="数据库内的列名" property="对应实体类的字段名"/>
</resultMap>
```

## 日志

### 日志工厂

如果一个数据库操作，出现了异常,我们需要排错。日志就是最好的助手!

曾经: sout、 debug

现在:日志工厂

* loglmpl（指定MyBatis所用日志的具体实现，未指定时将自动查找）
  * SLF4j
  * LOG4J
  * LOG4]2
  * JDK_ LOGGING
  * COMMONS_LOGGING
  * STDOUT_LOGGING
  * NO_LOGGING
* 在Mybatis中具体使用那个一日志实现，在设置中设定
* **STDOUT_ LOGGING标准日志输出**
* 在mybatis核心配置文件中，配置我们的日志
* 配置STDOUT_LOGGING为日志的实现

```xml
<settings>
    <setting name="logImpl" value="STDOUT_LOGGING"/>
</settings>
```

### LOG4J

* Log4j:
  * Log4j是Apache的-一个开源项目，通过使用Log4j,我们可以控制日志信息输送的目的地是控制台、文件、GUI组件
  * 我们也可以控制每一条日志的输出格式;
  * 通过定义每一条日志信息的级别，我们能够更加细致地控制日志的生成过程。
  * 通过一一个配置文件来灵活地进行配置，而不需要修改应用的代码。

* 导包

```xml
<!-- https://mvnrepository.com/artifact/log4j/log4j -->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

* log4j.properties

```properties
#将等级为DEBUG的日志信息输出到console和file这两个目的地，console 和file的定义在下面的代码
1og4j.rootLogger=DEBUG,console,file
#控制台输出的相关设置
1og4j.appender.console = org.apache.log4j.ConsoleAppender
1og4j.appender.console.Target = System.out
1og4j.appender.console.Threshold=DEBUG
1og4j.appender.console.layout=org.apache.1og4j.PatternLayout
1og4j.appender.console.layout.ConversionPattern=[%c]-%m%n
#文件输出的相关设置
1og4j.appender.file = org.apache.log4j.RollingFileAppender
1pg4j.appender.file.File=./log/yang.1og
1og4j.appender.file.iaxFileSize=10mb 
1og4j.appender.file.Threshold=DEBUG
1og4j.appender.file.layout=org.apache.log4j.PatternLayout
1og4j.appender.file.layout.ConversionPattern=[%p][%d{yy-MM-dd}][%c]%m%n
#日志输出级别
1og4j.logger.org.mybatis=DEBUG
1og4j.logger.java.sq1=DEBUG
1og4j.logger.java.sql.Statement=DEBUG
1og4j.logger.java.sq1.ResultSet=DEBUG
1og4j.logger.java.sq1.PreparedStatement=DEBUG
```

* 配置log4j为日志的实现

```xml
<settings>
    <setting name="logImpl" value="LOG4J"/>
</settings>
```

* 获取logger对象使用该对象实现手动打印日志

```java
Logger logger = Logger.getLogger(类名.class);
```

## 分页

### 使用Limit进行分页

* xml配置

```xml
<select id="getUserLimit" resultType="com.yang.pojo.Users">
    select * from users limit #{param1}, #{param2}
</select>
```

* 代码

```java
@Test
public void testGetUserLimit(){
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    List<Users> user = mapper.getUserLimit(5, 5);
    for (Users users : user) {
        System.out.println(users.getUserId() + "--"+  users.getEmail());
    }
    //关闭连接
    sqlSession.close();
}
```

### parameterType多个参数的解决方法

* 使用map封装

```xml
<select id="getUserLimit2" parameterType="map" resultType="com.yang.pojo.Users">
    select * from users limit #{startIndex}, #{pageSize}
</select>
```

```java
@Test
public void testGetUserLimit2(){
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    HashMap<String, Object> map = new HashMap<>();
    map.put("startIndex", 0);
    map.put("pageSize", 5);
    List<Users> user = mapper.getUserLimit2(map);
    for (Users users : user) {
        System.out.println(users.getUserId() + "--"+  users.getEmail());
    }
    //关闭连接
    sqlSession.close();
}
```

* 不写parameterType使用arg或param使用方式：
  * arg0，arg1，arg2 ……
  * param1，param2，param3 ……

```xml
<select id="getUserLimit" resultType="com.yang.pojo.Users">
    select * from users limit #{param1}, #{param2}
</select>
```

```java
@Test
public void testGetUserLimit(){
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    List<Users> user = mapper.getUserLimit(5, 5);
    for (Users users : user) {
        System.out.println(users.getUserId() + "--"+  users.getEmail());
    }
    //关闭连接
    sqlSession.close();
}
```

* xml转义字符

|  `&lt;`  |  &lt;   | 小于号 |
| :------: | :--: | :----: |
|  `&gt;`  |  >   | 大于号 |
| `&amp;`  |  &   |   和   |
| `&apos;` |  ’   | 单引号 |
| `&quot;` |  "   | 双引号 |

### 使用RowBounds实现分页

* xml配置

```xml
<select id="getUserByRowBounds" resultType="com.yang.pojo.Users">
    select * from users
</select>
```

* 代码

```java
@Test
public void getUserByRowBounds(){
    List<Users> users = sqlSession.selectList("com.yang.dao.UserMapper.getUserByRowBounds", null, new RowBounds(5, 5));
    for (Users user: users) {
        System.out.println(user.getUserId() + "--"+  user.getEmail());
    }
    //关闭连接
    sqlSession.close();
}
```

## 使用注解开发

### 面向接口编程

* 大家之前都学过面向对象编程，也学习过接口，但在真正的开发中，很多时候我们会选择面向接口编程
* 根本原因: 解耦 ,可拓展,提高复用，分层开发中,上层不用管具体的实现,大家都遵守共同的标准,使得开发变得容易，规范性更好
* 在一一个面向对象的系统中，系统的各种功能是由许许多多的不同对象协作完成的。在这种情况下，各个对象内部是如何实现自己的,对系统设计人员来讲就不那么重要了
* -各个对象之间的协作关系则成为系统设计的关键。小到不同类之间的通信，大到各模块之间的交互，在系统设计之初都是要着重考虑的,这也是系统设计的主要工作内容。面向接口编程就是指按照这种思想来编程
* 关于接口的理解
  * 接口从更深层次的理解，应是定义(规范，约束)与实现(名实分离的原则)的分离
  * 接口的本身反映了系统设计人员对系统的抽象理解
  * 接口应有两类:
    * 第一类是对一个个体的抽象，它可对应为-一个抽象体(abstract class)
    * 第二类是对一个个体某一-方 面的抽象，即形成一个抽象面(interface) 
  * 个体有可能有多个抽象面。抽象体与抽象面是有区别的

* 三个面向区别
  * 面向对象是指，我们考虑问题时，以对象为单位,考虑它的属性及方法.
  * 面向过程是指,我们考虑问题时，以一个具体的流程(事务过程)为单位，考虑它的实现.
  * 接口设计与非接口设计是针对复用技术而言的，与面向对象(过程)不是一个问题.更多的体现就是对系统整体的架构.

### 使用注解开发

* 编写Mapper接口

```java
public interface UserMapper {
    @Select("select * from users")
    List<Users> getUser();
}
```

* 在核心配置文件中绑定接口

```xml
<mappers>
    <mapper class="com.yang.mapper.UserMapper"/>
</mappers>
```

* 测试

```java
@Test
public void testGetUser(){
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    List<Users> user = mapper.getUser();
    for (Users users : user) {
        System.out.println(users.getUserId() + "--" + users.getEmail());
    }
}
```

* 缺点：
  * 无法使用ResultMap
  * 在sql参数较多时会很麻烦
* 插入：@Insert("sql语句")
* 修改：@Update("sql语句")
* 删除：@Delete("sql语句")
* 关于@Param()注解
  * 基本类型的参数或者String类型,需要加上
  * 引用类型不需要加
  * 如果只有一一个基本类型的话，可以忽略，但是建议大家都加上
  * 我们在SQL中弓|用的就是我们这里的@Param()中设定的属性名

* #{}和${}的区别就是Statement和PreparedStatement的区别

## 一对多和多对一的处理

### 多对一

* 按照查询嵌套处理

```xml
<resultMap id="tsMap" type="student">
<!--    将该属性与表中的tid关联起来-->
<!--    select 相当于查询跟tid关联的值赋给teacher属性-->
    <association property="teacher" javaType="teacher" column="tid" select="getTeacher"/>
</resultMap>
<select id="getStudent" resultMap="tsMap">
    select * from student
</select>
<select id="getTeacher" resultType="teacher">
    select * from teacher where id = #{id}
</select>
```

* 按照结果嵌套处理

```xml
<resultMap id="tsMap" type="student">
    <result property="id" column="sid"/>
    <result property="name" column="sname"/>
    <!--    将该引用属性里面的属性与链表查询的值关联起来-->
    <association property="teacher" javaType="teacher">
        <result property="name" column="tname"/>
        <result property="id" column="tid"/>
    </association>
</resultMap>
<select id="getStudent" resultMap="tsMap">
    select s.id sid, s.name sname, t.id tid, t.name tname
    from student s, teacher t where s.tid = t.id
</select>
```

### 一对多

* 按照查询嵌套处理

```xml
<resultMap id="tsMap" type="teacher">
    <result property="id" column="id"/>
    <!-- 将集合属性进行关联-->
    <collection property="students" javaType="java.util.ArrayList" ofType="student" column="id" select="getStudents"/>
</resultMap>
<select id="getTeacher" resultMap="tsMap">
    select * from teacher
</select>
<select id="getStudents" resultType="student">
    select * from student where tid = #{tid}
</select>
```



* 按照结果嵌套处理

```xml
<resultMap id="tsMap" type="teacher">
    <result property="id" column="tid"/>
    <result property="name" column="tname"/>
    <!-- 将集合属性进行关联-->
    <collection property="students" javaType="java.util.ArrayList" ofType="student">
        <result property="id" column="sid"/>
        <result property="name" column="sname"/>
    </collection>
</resultMap>
<select id="getTeacher" resultMap="tsMap">
    select t.id tid, t.name tname, s.id sid, s.name sname
    from teacher t, student s
    where t.id = s.tid
</select>
```

### 小结

* 关联- association[多对一]

* 集合- collection [一对多]

* javaType & ofType

  * JavaType用来指定实体类中属性的类型

  * ofType用来指定映射到List或者集合中的pojo类型,泛型中的约束类型!

## 动态sql

### if

```xml
<if test="arg0 != null">
    `Date` = #{arg0}
</if>
<if test="arg1 != null">
    and `EconomyPrice` = #{arg1}
</if>
<if test="arg2 != null">
    and `Gate` = #{arg2}
</if>
```

### choose，when，otherwise

* 就是switch，case，default

```xml
<choose>
    <when test="arg0 != null">
        `Date` = #{arg0}
    </when>
    <when test="arg1 != null">
        and `EconomyPrice` = #{arg1}
    </when>
    <when test="arg2 != null">
        and `Gate` = #{arg2}
    </when>
    <otherwise>

    </otherwise>
</choose>
```



### set，where

* 去除写动态sql时多余的符号或关键字

### foreach

```xml
<foreach collection="gates" item="gate"
         open="`Gate` in (" separator="," close=")">
    #{gate}
</foreach>
```

**动态SQL就是在拼接SQL语句，我们只要保证SQL的正确性，按照SQL的格式，去排列组合就可以了**

**现在Mysq|中写出完整的SQL,再对应的去修改成为我们的动态SQL实现通用即可**

## 缓存

### 简介

* 什么是缓存[ Cache ]
  * 存在内存中的临时数据
  * 用户经常查询的数据放在缓存(内存)中，用户去查询数据就不用从磁盘上(关系型数据库数据文件)查询，从缓存中查询，从而提高查询效率，解决了高并发系统的性能问题
* 为什么使用缓存
  * 减少和数据库的交互次数,减少系统开销，提高系统效率
* 什么样的数据能使用缓存?
  * 经常查询并且不经常改变的数据

### Mybatis缓存

* MyBatis包含一个非常强大的查询缓存特性,它可以非常方便地定制和配置缓存。缓存可以极大的提升查询效率。

* MyBatis系统中默认定义了两级缓存: - -级缓存和二级缓存

  * 默认情况下，只有一 -级缓存开启。 (SqISession级别的缓存， 也称为本地缓存)
  * 二级缓存需要手动开启和配置， 他是基于namespace级别的缓存。

  * 为了提高扩展性，MyBatis定义了缓存接口Cache。 我们可以通过实现Cache接口来自定义二级缓存

### 一级缓存

* 一级缓存也叫本地缓存:
  * sqlSession从开启到关闭前得查询得属性会被缓存
  * 与数据库同一次会话期间查询到的数据会放在本地缓存中
  * 以后如果需要获取相同的数据，直接从缓存中拿，没必须再去查询数据库

![一级缓存java](/img/java/一级缓存java-1597374138185.png)

* 两次查询实际上只查询了一次第二次输出从缓存里取数

![一级缓存out](/img/java/一级缓存out-1597374084581.png)

* 缓存失效的情况: 
  * 查询不同的东西
  * 增删改操作，可能会改变原来的数据，所以必定会刷新缓存!
  * 查询不同的Mapper.xml
  * 手动清理缓存：
    * 在下一次查询时调用`sqlSession.clearCache()`方法

**一级缓存默认是开启的， 只在一次SqlSession中有效, 也就是拿到连接到关闭连接这个区间段**

**一级缓存就是一个map**

### 13.4、 二级缓存

* 二级缓存也叫全局缓存，一级缓存作用域太低了，所以诞生了二级缓存
* 基于namespace级别的缓存，一个名称空间，对应一个二级缓存;
* 工作机制
  * 一个会话查询一条数据，这个数据就会被放在当前会话的一级缓存中;
  * 如果当前会话关闭了，这个会话对应的一-级缓存就没了;但是我们想要的是，会话关闭了，- -级缓存中的数据被保存到二级缓存中;
  * 新的会话查询信息，就可以从二级缓存中获取内容;
  * 不同的mapper查出的数据会放在自己对应的缓存(map)中
* 在核心配置文件里显示开启二级缓存（默认已开启）

```xml
<setting name="cacheEnabled" value="true'"/>
```

* 在对应得mapper.xml文件内加入标签

```xml
<!--    默认方式-->
<cache/>
<!--    自定义方式-->
<cache eviction="FIFO"
       flushInterval="60000"
       size="512"
       readOnly="true"/>
```

![二级缓存java](/img/java/二级缓存java.png)

![二级缓存out](/img/java/二级缓存out-1597377652646.png)

* 注意：**开启二级缓存对使用注解完成的sql方法无效**
* **需要缓存的类必须实现序列化接口**
* 只要开启了二级缓存,在同一个Mapper下就有效
* 所有的数据都会先放在一级缓存中
* 只有当会话提交，或者关闭的时候，才会提交到二级缓冲中

## 缓存原理

![缓存原理](/img/java/缓存原理.png)

* 缓存顺序：
  1. 先看二级缓存中有没有
  2. 再看一级缓存中有没有
  3. 查询数据库

## 自定义缓存

Ehcache是一种广泛使用的开源Java分布式缓存。主要面向通用缓存

```xml
<dependency>
    <groupId>org.mybatis.caches</groupId>
    <artifactId>mybatis-ehcache</artifactId>
    <version>1.1.0< /version>
</dependency>
```

* 在对应得=的mapper.xml文件内指定缓存的实现方式

```xml
<cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
```

* 编写ehcache配置文件ehcache.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
         updateCheck="false">

    <diskStore path="./tmpdir/Tmp_EhCache"/>

    <defaultCache
                  eternal="false"
                  maxElementsInMemory="10000"
                  overflowToDisk="false"
                  diskPersistent="false"
                  timeToIdleSeconds="1800"
                  timeToLiveSeconds="259200"
                  memoryStoreEvictionPolicy="LRU"/>

    <cache
           name="cloud_user"
           eternal="false"
           maxElementsInMemory="5000"
           overflowToDisk="false"
           diskPersistent="false"
           timeToIdleSeconds="1800"
           timeToLiveSeconds="1800"
           memoryStoreEvictionPolicy="LRU"/>
</ehcache>
```

![ehcache配置说明](/img/java/ehcache配置说明.png)
