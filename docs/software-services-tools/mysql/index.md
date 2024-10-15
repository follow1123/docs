import CodeBlock from '@theme/CodeBlock';

# MySQL

* [官网](https://www.mysql.com/)


## 简介

* MySQL是一个**数据库管理系统**
* MySQL是一个**关系型数据库**

## 数据库相关概念

| 名称    | 全称    | 简称    |
|---------------- | --------------- | --------------- |
| 数据库    | 存储数据的仓库，对数据进行有组织的存储    | DataBase(DB)    |
| 数据库管理系统    | 操作和管理数据库的大型软件    | DataBase Management System(DBMS)    |
| SQL   | 操作关系型数据库的编程语言，定义了一套操作关系型数据库的统一标准  | Structured Query Language(SQL)   |

* 主流的关系型数据库管理系统：`Oracle`、`MySQL`、`Microsoft SQL Server`、`PostgreSQL`

### 关系型数据库（RDBMS）

* 建立在关系模型基础上，由多张相互连接的二维表组成的数据库
* 特点：
    * 使用表存储数据，格式统一，方便维护
    * 使用SQL语言操作，标准统一，使用方便

## 安装

> 以Windows下安装压缩包版MySQL为例

### 安装MySQL`5.7.30`

> 假如安装路径是D:\software

1. 解压zip文件到`D:\software\mysql`目录下，将目录重命名为版本号`5.7.30`
2. 配置MySQL环境变量
    * <kbd>Win</kbd>+<kbd>q</kbd>输入环境变量，进入**编辑系统环境变量**
    * 点击**环境变量**按钮
    * 在你的用户环境变量上新建`MYSQL_HOME`环境变量，值为`D:\software\mysql\5.7.30`
    * 编辑`Path`环境变量，新建一个`%MYSQL_HOME%\bin`的值
    * 依次点击确定
3. 在MySQL目录`D:\software\mysql\5.7.30`内新建一个`my.ini`文件，内容如下：

```ini
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[mysqld]
#设置3306端口
port=3306
# 设置mysql的安装目录
basedir=D:/software/mysql/5.7.30
# 设置mysql数据库的数据的存放目录
datadir=D:/software/mysql/5.7.30/data
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

4. 以管理员权限进入`cmd`并执行以下命令

```batch
rem 初始化mysql
rem 如果电脑上要安装多个版本的mysql，可以使用mysqld install "服务名" --defaults-file="D:\software\mysql\5.7.30\my.ini"
mysqld install 

rem 初始化mysql相关文件，这行命令执行完成后检查MySQL目录下有没有新建data目录
mysqld --initialize-insecure --user=mysql

rem 启动mysql服务
net start mysql

rem 进入mysql命令行，进入后提示要输入密码，直接回车
mysql -uroot -p

rem 修改密码
update mysql.user set authentication_string=password('密码') where user='root' and host='localhost';

rem 刷新权限
flush privileges;

rem 退出MySQL
exit

rem 重启服务，安装完成
net stop mysql
net start mysql
```

5. 安装成功

### 安装MySQL`8.0.33`

> 假如安装路径是D:\software

1. 解压zip文件到`D:\software\mysql`目录下，将目录重命名为版本号`8.0.33`
2. 配置MySQL环境变量
    * <kbd>Win</kbd>+<kbd>q</kbd>输入环境变量，进入**编辑系统环境变量**
    * 点击**环境变量**按钮
    * 在你的用户环境变量上新建`MYSQL_HOME`环境变量，值为`D:\software\mysql\8.0.33`
    * 编辑`Path`环境变量，新建一个`%MYSQL_HOME%\bin`的值
    * 依次点击确定
3. 在MySQL目录`D:\software\mysql\8.0.33`内新建一个`my.ini`文件，内容如下：

```ini
[mysqld]
#设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=D:/software/mysql/8.0.33
# 设置mysql数据库的数据的存放目录
datadir=D:/software/mysql/8.0.33/data
```

4. 以管理员权限进入`cmd`并执行以下命令

```batch
rem 初始化mysql
rem 如果电脑上要安装多个版本的mysql，可以使用mysqld install "服务名" --defaults-file="D:\software\mysql\8.0.33\my.ini"
mysqld install 

rem 初始化mysql相关文件，这行命令执行完成后检查MySQL目录下有没有新建data目录
mysqld --initialize-insecure --user=mysql

rem 启动mysql服务
net start mysql

rem 进入mysql命令行，进入后提示要输入密码，直接回车
mysql -uroot -p

rem 修改密码
use mysql;
alter user root@'localhost' identified by '密码';

rem 刷新权限
flush privileges;

rem 退出MySQL
exit

rem 重启服务，安装完成
net stop mysql
net start mysql
```

## SQL

### 通用语法

* SQL语句可以单行或多行书写，以分号结尾
* MySQL数据库的SQL语句不区分大小写
* SQL语句注释：
    * 单行注释：`--`或`#` (**MySQL特有**)
    * 多行注释：`/* 内容 */`
* 如果数据库名、表名或字段名与SQL关键字重名，可以使用<code>&#96;</code>包裹

### SQL分类

| 分类    | 全称    | 说明    |
|---------------- | --------------- | --------------- |
| DDL    | Data Definition Language    | 数据库定义语言，用来定义数据库对象（数据库、表、字段）    |
| DML    | Data Manipulation Language    | 数据库操作语言，用来对数据库表中的数据进行增删该    |
| DQL   | Data Query Language   | 数据库查询语言，用来查询数据库中表的记录   |
| DCL   | Data Control Language   | 数据库控制语言，用来创建数据库中的用户，控制数据库访问权限 |

### DDL

#### 操作数据库

```sql
-- 查看所有数据库
SHOW DATABASES;

-- 查看当前数据库
SELECT DATABASE();

-- 创建数据库
CREATE DATABASE [IF NOT EXISTS] 数据库名 [DEFAULT CHARSET 字符集][COLLATE 排序规则];

-- 删除数据库
DROP DATABASE [IF EXISTS] 数据库名;

-- 使用数据库
USE 数据库名;

-- 查看数据库创建的语句 
SHOW CREATE DATABASE 数据库名; 
```

#### 操作表结构

```sql
-- 查询数据库内的所有表，需要先使用USE 数据库;使用某个数据库
SHOW TABLES;

-- 查询表结构
DESC 表名;

-- 查询某个表的建表语句
SHOW CREATE TABLE 表名;
```

##### 创建表

* 数据库的字段属性
    * `unsigned`：无符号整型，声明该列不能为负数
    * `zerofill`：0填充，不足的位数用零填充
* 创建表时还需要配合[约束](#约束)

```sql
CREATE TABLE [IF NOT EXISTS] 表名(
    字段1 字段1类型 [COMMENT '字段1注释'],
    字段2 字段2类型 [COMMENT '字段2注释'],
    字段3 字段3类型 [COMMENT '字段3注释'],
    ...
    字段N 字段N类型 [COMMENT '字段N注释']
) [COMMENT '表注释'];
```

#### 数据类型

##### 数值类型

| 类型    | 大小    | 有符号（SIGNED）范围    | 无符号（UNSIGNED）范围    | 描述    |
|---------------- | --------------- | --------------- | --------------- | --------------- |
| TINYINT    | 1 byte    | -128~127    | 0~255    | 小整型数值   |
| SMALLINT   | 2 byte   | -32768~32767   | 0~65535   | 中整型数值   |
| MEDIUMINT   | 3 byte   | -8388608~8388607   | 0~16777215   | 中整型数值   |
| INT/INTEGER   | 4 byte   | -2147483648~2147483647   | 0~4294967295   | 大整型数值   |
| BIGINT  | 8 byte   | -2^63~2^63-1   | 0~2^64-1   | 极大整型数值   |
| FLOAT   | 4 byte   | |   | 单精度浮点数值   |
| DOUBLE   | 8 byte   |    |    | 双精度浮点数值   |
| DECIMAL   |   | M(精度)和D(标度)   | M(精度)和D(标度)   | 小数值(精确定点数)   |

* 示例

```sql
CREATE TABLE IF NOT EXISTS DATA_TYPE_TABLE(
    age UNSIGNED TINYINT COMMENT '年龄' -- 年龄字段，无符号
    score DOUBLE(4,1) COMMENT '分数' -- 分数字段，可以为小数，保留一位小数
) COMMENT '数据类型演示';
```
##### 字符串类型

| 类型    | 大小    | 描述    |
|---------------- | --------------- | --------------- |
| CHAR    | 0~255    | 定长字符串（性能好）    |
| VARCHAR    | 0~2^16-1 | 变长字符串（性能差）    |
| TINYBLOB   | 0~255   | 小二进制数据   |
| TINYTEXT   | 0~255   | 小文本字符串   |
| BLOB | 0~2^16-1 | 中二进制数据 | 
| TEXT | 0~2^16-1 | 中文本字符串 | 
| MEDIUMBLOB | 0~2^24-1 | 大二进制数据 | 
| MEDIUMTEXT | 0~2^24-1 | 大文本字符串 | 
| LONGBLOB | 0~2^32-1 | 极大二进制数据 | 
| LONGTEXT | 0~2^32-1 | 极大文本字符串 | 
    

##### 时间日期类型

| 类型    | 大小    | 范围    | 格式    | 描述    |
|---------------- | --------------- | --------------- | --------------- | --------------- |
| DATE    | 3    | 1000-01-01至9999-12-31    | YYYY-MM-DD    | 日期   |
| TIME   | 3   | -838:59:59至838:59:59   | HH:MM:SS   | 时间值或持续时间   |
| YEAR   | 1   | 1901至2155   | YYYY   | 年份   |
| DATETIME   | 8 | 1000-01-01 00:00:00至9999-12-31 23:59:59   | YYYY-MM-DD HH:MM:SS   | 日期和时间   |
| TIMESTAMP   | 4 | 1970-01-01 00:00:01至2038-01-19 23:14:07   | YYYY-MM-DD HH:MM:SS   | 日期和时间，时间戳   |

##### 空类型（null）

##### 修改表

* 修改表时也可以修改[约束](#约束)

```sql
-- 添加字段
ALTER TABLE 表名 ADD 字段名 类型(长度) [COMMENT '注释'] [约束];

-- 修改字段类型
ALTER TABLE 表名 MODIFY 字段名 新类型(长度);

-- 修改字段名和类型
ALTER TABLE 表名 CHANGE 字段名 新字段名 新类型(长度) [COMMENT '注释'] [约束];

-- 删除字段
ALTER TABLE 表名 DROP 字段名;

-- 重命名
ALTER TABLE 表名 RENAME TO 新表名;

-- 删除表（如果存在）
DROP TABLE [IF EXISTS] 表名;

-- 删除表，并重新创建该表
TRUNCATE TABLE 表名;
```

---

### DML

#### 添加数据

* 插入数据时，字段的顺序与值的顺序是一一对应的

```SQL
-- 给指定字段添加数据
INSERT INTO 表名 (字段1, 字段2, 字段3 ...) VALUES (值1, 值2, ...);

-- 给全部字段添加数据
INSERT INTO 表名 VALUES (值1, 值2, 值3, ...);

-- 批量添加数据
INSERT INTO 表名 (字段1, 字段2, 字段3 ...) VALUES
(值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...);

INSERT INTO VALUES
(值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...);

```

#### 修改数据

* 修改语句没有`WHERE`条件则会修改整张表的数据
* `WHERE 条件`参考[DQL的条件查询](#条件查询)

```SQL
UPDATE 表名 SET  字段名1=值1, [字段名2=值2, ...] [WHERE 条件];

-- 相当于删除字段
UPDATE 表名 SET  字段名=NULL [WHERE 条件];
```

#### 删除数据

* 删除语句没有`WHERE`条件则会删除整张表的数据

```sql
DELETE FORM 表名 [WHERE 条件];
```

---

### DQL

* 语法

```sql
SELECT [All | DISTINCT | * | 表名.* | [表名1.字段1 as 别名1, 表名2.字段2 as 别名2] -- 查询格式
FROM 表名 [AS 表名的别名]
[LEFT | RIGHT | INNER JOIN 表名2]   -- 连表查询
[WHERE]                             -- 指定结果徐满足的条件
[GROUP BY]                          -- 指定结果按那几个字段进行分组
[HAVING]                            --过滤分组记录必须满足的次要条件
[ORDER BY]                          -- 指定查询记录按一个或多个条件进行分组
[LIMIT {[offset,]row_count row_countOFFSET offset}]; --指定查询的记录从那条至哪条
```

#### 基本查询

```SQL
-- 查询多个字段
SELECT 字段1, 字段2, 字段3, ... FROM 表名;
SELECT * FROM 表名;

-- 设置别名
SELECT 字段1 [AS 别名1], 字段2 [AS 别名2], 字段3 [AS 别名3], ... FROM 表名;

-- 去除重复记录
SELECT DISTINCT 字段列表 FROM 表名;
```

#### 条件查询

* 语法

```sql
SELECT 字段列表 FROM 表名 WHERE 条件列表;
```

* 条件

| 比较运算符   | 功能    |
|--------------- | --------------- |
| >   | 大于   |
| >= | 大于等于 |
| &lt; | 小于 |
| *lt= | 小于等于 |
| = | 等于 |
| &lt;&gt;或!= | 不等于 |
| BETWEEN ... AND ... | 在某个范围内（包含最小值和最大值） |
| IN(...) | 在IN后面的列表中的值 |
| LIKE 占位符 | 模糊匹配（`_`匹配单个字符，`%`匹配多个字符） |
| IS NULL | 是NULL |


| 逻辑运算符   | 功能    |
|--------------- | --------------- |
| AND 或 &&   | 且   |
| OR 或 &#124;&#124; | 或 |
| NOT 或 ! | 非 |

#### 聚合函数

* 将一列数据作为一个整体，进行纵向计算
* null值不参与聚合函数运算
* 常见聚合函数

| 函数   | 功能    |
|--------------- | --------------- |
| COUNT   | 统计数量   |
| MAX | 最大值 |
| MIN | 最小值 |
| AVG | 平均值 |
| SUM | 求和 |

* 语法

```sql
SELECT 聚合函数(字段列表) FROM 表名;
```

#### 分组查询

* 语法

```sql
SELECT 字段列表 FROM 表名 [WHERE 条件列表] GROUP BY 分组字段名 [HAVING 分组后过滤条件];
```

* 分组后查询条件可以使用聚合函数列的别名

```sql
SELECT FIELD1, COUNT(FIELD2) COUNT_FILED2 FROM TABLE1 GROUP BY FIELD3 HAVING COUNT_FILED2 > 3;
```

* 分组后查询的字段只能是聚合函数和分组的字段

#### where和having的区别

* where是分组前进行过滤，不满足where条件，不参与分组；而having是分组之后对结果进行过滤
* where不能使用聚合函数作为条件，而having可以

#### 排序查询

* 语法

```sql
SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式1, 字段2 排序方式2;
```

* 排序方式：
    * `ASC`：升序（从小到大，默认）
    * `DESC`：降序（从大到小）
* 如果是多个字段排序，当第**前面的字段**有**多个相同的值**时才会根据**后面的字段**进行排序


#### 分页查询

* 语法

```sql
SELECT 字段列表 FROM 表名 LIMIT 起始索引, 查询记录数;
```

* 起始索引从0开始，**起始索引=(查询页码 - 1) * 每页显示记录数**
* **分页查询是数据库的方言，不同的数据库有不同的实现，MySQL中是LIMIT**
* 如果查询的是第一页的数据，可以直接使用`LIMIT 10`;

#### DQL语句执行顺序

```mermaid
flowchart LR
A(FROM) --> B(WHERE)
B --> C(GROUP BY和HAVING)
C --> D(SELECT)
D --> E(ORDER BY)
E --> F(LIMIT)
```

### DCL

* 管理数据库用户，控制数据库访问权限

#### 用户管理

```sql
-- 显示所有用户
USE MYSQL;
SELECT * FROM USER;

-- 创建用户，主机名使用%表示可以在任意主机上访问该数据库
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';

-- 重命名
RENAME USER '用户名' TO '新用户名';

-- 修改用户密码
ALTER USER '用户名'@'主机名' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY '新密码';

-- 删除用户
DROP USER '用户名'@'主机名';
```

#### 权限控制

* 常用权限

| 权限   | 说明    |
|--------------- | --------------- |
| ALL, ALL PRIVILEGES   | 所有权限   |
| SELECT | 查询数据 |
| INSERT | 插入数据 |
| UPDATE | 修改数据 |
| DELETE | 删除数据 |
| ALTER | 修改表 |
| DROP | 删除数据库、表、视图 |
| CREATTE | 创建数据库、表 |

```SQL
-- 查询权限
SHOW GRANTS FOR '用户名'@'主机名';

-- 授予权限，授予所有数据库的所有权限可以使用*.*
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';

-- 撤销权限
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
```

---

## 函数

### 字符串函数

| 函数   | 功能    |
|--------------- | --------------- |
| CONCAT(s1, s2, ...sn)   | 字符串拼接   |
| LOWER(str) | 将字符串内容转换为小写 |
| UPPER(str) | 将字符串内容转换为大写 |
| LPAD(str, n, pad) | 左填充，用字符串pad对str的左边进行填充，达到n个字符串长度 |
| RPAD(str, n, pad) | 右填充，用字符串pad对str的右边进行填充，达到n个字符串长度 |
| TRIM(str) | 去除字符串左右空格 |
| SUBSTRING(str, start, len) | 返回字符串str从start位置开始（包含start位置的字符）的len长度的字符串 |


### 数值函数

| 函数   | 功能    |
|--------------- | --------------- |
| CEIL(x)   | 向上取整   |
| FLOOR(x) | 向下取整 |
| MOD(x, y) | 返回x除y的模 |
| RAND() | 返回0~1内的随机数 |
| ROUND(x, y) | 求参数x的四舍五入的值，保留y位小数 |

### 日期函数

| 函数   | 功能    |
|--------------- | --------------- |
| CURDATE() | 返回当前日期 |
| CURTIME() | 返回当前时间 |
| NOW() | 返回当前日期和时间 |
| YEAR(date) | 获取指定date的年份 |
| MONTH(date) | 获取指定date的月份 |
| DAY(date) | 获取指定date的日期 |
| HOUR(date) | 获取指定date的小时 |
| MINUTE(date) | 获取指定date的分钟 |
| SECOND(date) | 获取指定date的秒数 |
| [DATE_ADD(date, interval expr type)](#date_add) | 返回一个日期或时间值加上一个时间间隔expr后的时间值 |
| [DATEDIFF(date1, date2)](#datediff) | 返回起始时间date1和结束时间date2之间的天数 |

#### 函数示例

##### DATE_ADD()

```SQL
-- 当前日期加1天
SELECT DATE_ADD(NOW(), INTERVAL 1 DAY);

-- 当前日期减2天
SELECT DATE_ADD(NOW(), INTERVAL -2 DAY);

-- 当前时间加5个小时
SELECT DATE_ADD(NOW(), INTERVAL 5 HOUR);

-- 当前时间加30分钟
SELECT DATE_ADD(NOW(), INTERVAL 30 MINUTE);

-- 当前时间减15分钟
SELECT DATE_ADD(NOW(), INTERVAL -15 MINUTE);
```

##### DATEDIFF()

```sql
-- 获取当前时间和5天后的天数差
SELECT DATEDIFF(NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY)) -- 结果为-5
```

### 流程控制函数

| 函数   | 功能    |
|--------------- | --------------- |
| IF(value, t, f) | 如果value为true，则返回t，否则返回f |
| IFNULL(value1, value2) | 如果value1不为空则返回value1，否则返回value2 |
| CASE WHEN [val1] THEN [res1] ...ELSE [defaultVal] END | 如果val1为true，返回res1，...否则返回defaultVal默认值 |
| CASE [expr] WHEN [val1] THEN [res1] ...ELSE [defaultVal] END | 如果expr的值等于val1，返回res1，...否则返回defaultVal默认值  |

#### 函数示例

##### CASE-WHEN-THEN-ELSE-END

```sql
-- 根据城市进行分类
SELECT name, 
(CASE address WHEN '北京' THEN '一线城市' WHEN '上海' THEN '一线城市' ELSE '二线城市' END) AS home_city 
FROM employee
```

### 其他函数

| 函数   | 功能    |
|--------------- | --------------- |
| USER() | 查看当前用户 |
| VERSION() | 查询MySQL版本 |
| MD5(str) | 返回str进行md5后的字符串 |
| UUID() | 获取uuid字符串 |


```sql
-- 查询自增的步长
select @@auto_increment_increment;
```
---

## 约束

* 约束是作用于表中字段上的规则，用于限制存储在表中的数据
* 保证数据库中数据的正确、有效性和完整性
* 可以在创建或修改表的时候添加约束

| 约束    | 描述    | 关键字    |
|---------------- | --------------- | --------------- |
| 非空约束    | 限制该字段的数据不能为NULL    | NOT NULL    |
| 唯一约束    | 保证该字段的所有数据都是唯一、不重复的    | UNIQUE    |
| 主键约束 | 主键是一行数据中为唯一表示，要求非空切唯一 | PRIMARY KEY |
| 默认约束 | 保存数据时，如果未指定该字段的值，则采用默认值 | DEFAULT |
| 检查约束（8.0.16版本后） | 保证字段满足某个条件 | CHECK |
| 外键约束 | 用来让两张表之间的数据建立连接，保证数据的一致性和完整性 | FOREIGN KEY |

```sql
CREATE TABLE IF NOT EXISTS user_table(
    id INT PRIMARY KEY AUTO_INCREMENT,                      -- 主键约束，自动递增
    name VARCHAR(10) NOT NULL UNIQUE COMMENT '姓名',        -- 非空约束，唯一约束
    age INT CHECK (age > 0 && age <= 120) COMMENT '年龄',   -- 检查约束
    status CHAR(1) DEFAULT 1 COMMENT '状态',                -- 默认约束
    gender CHAR(1) COMMENT '性别'
);
```


### 外键约束

* 语法

```sql
-- 创建表时添加外键
CREATE TABLE 表名(
    字段名 数据类型,
    ...
    CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表(主表列名)
)

-- 修改表时添加外键
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表(主表列明);

-- 删除外键
ALTER TABLE 表名 DROP FOREIGN KEY 外键名;
```

#### 示例

* 准备员工表和部门表，员工表内的`dept_id`外键关联部门表的`id`字段

```sql
-- 部门表
CREATE TABLE IF NOT EXISTS dept(
    id INT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    name VARCHAR(50) NOT NULL COMMENT '部门名'
)COMMENT '部门表';

INSERT INTO dept (id, name) VALUES
(1, '研发部'),(2, '市场部'), (3, '财务部'), (4, '销售部'), (5, '总经办');

CREATE TABLE IF NOT EXISTS emp(
    id INT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    age INT COMMENT '年龄',
    job VARCHAR(20) COMMENT '职位',
    dept_id INT COMMENT '部门id',
)COMMENT '员工表';

INSERT INTO emp(id, name, age, job, dept_id) VALUES
(1, '1', 66, '1', 5), (2, '2', 20, '2', 1), (3, '3', 33, '3', 1),
(4, '4', 48, '4', 1), (5, '5', 43, '5', 1), (6, '6', 19, '6', 1);

-- 添加外键关联
ALTER TABLE EMP ADD CONSTRAINT fk_emp_dept_id FOREIGN KEY(dept_id) REFERENCES dept(id);

-- 此时就无法删除部门表和员工表关联的数据
DELETE FROM dept WHERE id = 1; -- 无法删除
```

#### 外键约束的删除/更新行为

| 行为   | 说明    |
|--------------- | --------------- |
| NO ACTION   | 当在父表删除/更新对应记录时，首先检查该记录是否右对应的外键，如果有则不允许删除/更新。（与RESTRICT一致，默认）   |
| RESTRICT   | 当在父表删除/更新对应记录时，首先检查该记录是否右对应的外键，如果有则不允许删除/更新。（与NO ACTION一致）   |
| CASCADE | 当在父表删除/更新对应记录时，首先检查该记录是否右对应的外键，如果有，则也删除/更新外键在子表中的记录 |
| SET NULL | 当在父表删除对应记录时，首先检查该记录是否右对应的外键，如果有，则设置子表中该外键值为NULL（这就要求该外键允许取NULL） |
| SET DEFAULT | 父表有变更时，子表将外键设置成一个默认的值（innodb不支持） |

* 语法

```sql
-- 在添加外键时设置更新行为，指定更新时的行为或删除时的行为
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表(主表列明) ON UPDATE CASCADE ON DELETE CASCADE;
```

---

## 多表查询

* 项目开发中，在进行数据库表结构设计时，会根据业务需求及业务模块之间的关系，
分析并设计表结构，由于业务之间的相互关系，所有各个表结构之间也存在着各种关系，
基本上分为三种：
    * 一对多（多对一）
        * 部门与员工的关系：一个部门对应多个员工，一个员工对应一个部门
        * 在**多**的一方建立外键，关联**一**的一方的主键
    * 多对多
        * 学生与课程的关系：一个学生可以选修多门课程，一门课程也可以供多个学生选择
        * 建立中间表，中间表包含两个外键，分别关联两方的主键
    * 一对一
        * 用户可用户详细：用于单表拆分，将一张表的基础字段放在一张表中，其他详情字段放在另一种表中，提升效率
        * 在任意一方加入外键，关联另一方的主键，并且设置外键为唯一的（UNIQUE）

### 笛卡尔积

* 笛卡尔积是指在数学中，两个集合A集合和B集合的所有组合情况（在多表查询时，需要消除无效的笛卡尔积）

#### 示例

* 准备SQL

```sql
DROP TABLE IF EXISTS DEPT;
CREATE TABLE DEPT(
    ID INT AUTO_INCREMENT COMMENT 'ID' PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL COMMENT '部门名'
)COMMENT '部门表';

INSERT INTO DEPT (ID, NAME) VALUES
(1, '研发部'),(2, '市场部'), (3, '财务部'), (4, '销售部'), (5, '总经办');

DROP TABLE IF EXISTS EMP;
CREATE TABLE EMP(
    ID INT AUTO_INCREMENT COMMENT 'ID' PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL COMMENT '姓名',
    AGE INT COMMENT '年龄',
    JOB VARCHAR(20) COMMENT '职位',
    DEPT_ID INT COMMENT '部门ID',
)COMMENT '员工表';

INSERT INTO EMP(ID, NAME, AGE, JOB, DEPT_ID) VALUES
(1, '1', 66, '1', 5), (2, '2', 20, '2', 1), (3, '3', 33, '3', 1),
(4, '4', 48, '4', 1), (5, '5', 43, '5', 1), (6, '6', 19, '6', 1);

ALTER TABLE EMP ADD CONSTRAINT FK_EMP_DEPT_ID FOREIGN KEY(DEPT_ID) REFERENCES DEPT(ID);
```

* 使用`SELECT * FROM EMP, DEPT;`语句查询两个表就会出现笛卡尔积
* 只需要添加`WHERE`条件关联两个表的就可以消除笛卡尔积
* 如果不满足`WHERE`关联条件的数据就不会被查询到

```java
SELECT * FROM EMP, DEPT
WHERE EMP.DEPT_ID = DEPT.ID;
```

### 内连接

* 内连接查询的是两张表**交集**部分

```sql
-- 隐式内连接
SELECT 字段列表 FROM 表1, 表2 WHERE 条件;

-- 显示内连接
SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 连接条件;
```

### 外连接

* 外连接有分**左外连接**和**右外连接**，查询**左表或右表的全部数据**和两张表的**交集**部分

```sql
-- 左外连接，查询表1的全部数据和表1和表2的交集部分数据
SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 连接条件;

-- 右外连接，查询表2的全部数据和表1和表2的交集部分数据
SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 连接条件;
```

### 自连接

* 自连接就是**自己连接自己**，连接可以是内连接也可以是外连接

```sql
SELECT 字段列表 FROM 表A 别名A JOIN 表A 别名B ON 连接条件;
```

### 联合查询

* 把多次查询的结果合并起来，形成一个新的查询结果集，使用`union [all]`实现
* 联合查询中多个表的列数必须保持一致，列的字段类型也必须一致
* `union all`会将全部的数据直接合并在一起，`union`会对合并之后的数据去重

```sql
SELECT 字段列表 FROM 表1 ...;
UNION [ALL]
SELECT 字段列表 FROM 表2 ...;
```

### 子查询

* SQL语句中嵌套SELECT语句，称为**嵌套查询**，又称为**子查询**

```sql
SELECT * FROM T1 WHERE COLUMN1 = (SELECT COLUMN1 FROM T2)
```

* 子查询的外部语句可以是`INSERT`、`UPDATE`、`DELETE`、`SELECT`中的任意一个
* 子查询的位置可以在下面几个位置：
    * **WHERE**后：`SELECT * FROM T1 WHERE COLUMN1 = (SELECT COLUMN1 FROM T2)`
    * **FROM**后：`SELECT * FROM (SELECT 字段1, 字段2, ... FROM 表1) 别名 WHERE 查询条件`
    * **SELECT**后：`SELECT 字段1, (SELECT count(*) FORM 表2 WHERE 表2.字段2 = 表1.字段1) 求和字段 FROM 表1 WHERE 查询条件`

#### 标量子查询

* 子查询返回的结果为单个值（数字、字符串、日期等）
* 常用操作符：`=` `<>` `>` `>=` `<` `<=` 

#### 列子查询

* 子查询返回的结果是一列（可以是多行）
* 列子查询常用操作符：

| 操作符   | 描述    |
|--------------- | --------------- |
| IN   | 在指定集合范围之内，多选一   |
| NOT IN | 不在指定的集合范围之内 |
| ANY | 子查询返回的列表中，有任意一个满足即可 |
| SOME | 和ANY等同 |
| ALL | 子查询返回列表的所有值都必须满足 |


```sql
-- 字段1必须大于表2内所有的字段2
SELECT 字段列表 FROM 表1 WHERE 字段1 > ALL(SELECT 字段2 FROM 表2);

-- 字段1可以比表2内任意一个字段2大
SELECT 字段列表 FROM 表1 WHERE 字段1 > ANY(SELECT 字段2 FROM 表2);
```

#### 行子查询

* 子查询返回的结果是一行（可以是多列）
* 常用操作符：`=` `<>` `IN` `NOT IN`

```sql
-- 多个条件查询
SELECT 字段列表 FORM 表1 WHERE 字段1 = 值1 AND 字段2 = 值2;

-- 以上条件可以写成这种方式
SELECT 字段列表 FORM 表1 WHERE (字段1, 字段2) = (值1, 值2);

-- 如果子查询的返回结果刚好是一行两列，则直接可以使用以下写法
SELECT 字段列表 FORM 表1 WHERE (字段1, 字段2) = (SELECT 字段3, 字段4 FROM 表2 WHERE 查询条件);
```

#### 表子查询

* 子查询返回的结果是多行多列
* 常用操作符：`IN`

```sql
/* 
和行子查询类似
如果此时字段1，和字段2都需要匹配多个值，
那么可以使用IN接表子查询返回的多行两列的表结果
*/
SELECT 字段列表 FORM 表1 WHERE (字段1, 字段2) IN (SELECT 字段3, 字段4 FROM 表2 WHERE 查询条件);
```

---

## 事务

* **事务**是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，
即这些操作**要么同时成功，要么同时失败**
* **MySQL的事务默认是自动提交的**，也就是当执行一条DML语句，MySQL会立即隐式提交事务

### 事务操作


```sql
-- 查看默认事务提交方式
SELECT @@autocommit;

-- 修改默认事务提交方式
SET @@autocommit = 0;

-- 开启事务，或者使用BEGIN;
START TRANSACTION;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;

-- 其他事务操作

-- 保存存档点
SAVEPOINT 存档点名称;

-- 回滚到指定的存档点，此时事务还未完成
ROLLBACK TO 存档点名称;

-- 删除存档点
RELEASE SAVEPOINT 存档点名称;
```

#### 示例

* 准备SQL

```sql
CREATE TABLE account(
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    name VARCHAR(10) COMMENT '姓名',
    money INT COMMENT '余额'
) COMMENT '账户表';

INSERT INTO account VALUES (NULL, '张三', 2000), (NULL, '李四', 2000);
```

* 转账逻辑，张三向李四转账1000元

```sql
-- 开启事务
START TRANSACTION;

-- 张三扣除1000元
update account set money = money - 1000 where name = '张三';

-- 李四新增1000元
update account set money = money + 1000 where name = '李四';

-- 提交事务，如果SQL正常执行则提交事务
COMMIT;

-- 回滚，如果SQL执行过程出现异常，则回滚事务
ROLLBACK;
```


### 事务四大特性

* **原子性（Atomicity）**：事务是不可分割的最小单元，要么全部成功，要么全部失败
* **一致性（Consistency）**：事务完成时，必须使所有的数据都保持一致的状态
* **隔离性（Isolation）**：数据库提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行
* **持久性（Durability）**：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的

### 并发事务问题

| 问题   | 描述    |
|--------------- | --------------- |
| **脏读**   | 一个事务读取到另一个事务还没有提交的数据   |
| **不可重复读** | 一个事务先后读取同一条数据，但两次读取的数据不同，称为不可重复读 |
| **幻读** | 一个事务按照条件查询数据时，没有对应的数据，但是在插入数据时，又发现这行数据已经存在了，好像出现了“幻影” |

### 事务隔离级别

* MySQL数据库的默认隔离级别是**Repeatable Read**
* Oracle数据库的默认隔离级别是**Read Committed**

| 隔离级别    | 脏读    | 不可重复读    | 幻读    |
|---------------- | --------------- | --------------- | --------------- |
| **Read Uncommitted**    | √    | √    | √    |
| **Read Committed**    | ×   | √   | √   |
| **Repeatable Read(默认)**  | ×   | ×   | √   |
| **Serializable** | ×   | ×   | ×   |

```sql
-- 查看事务隔离级别
SELECT @@TRANSACTION_ISOLATION;

-- 设置事务隔离级别，SESSION当前会话内有效，GLOBAL全局有效
SET [SESSION|GLOBAL] TRANSACTION ISOLATION LEVEL { READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE };
```

#### 示例

* 准备SQL

```sql
CREATE TABLE account(
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    name VARCHAR(10) COMMENT '姓名',
    money INT COMMENT '余额'
) COMMENT '账户表';

INSERT INTO account VALUES (NULL, '张三', 2000), (NULL, '李四', 2000);
```

##### 脏读问题

* 准备[SQL](#示例-3)或重置数据：`UPDATE account SET money = 2000 WHERE name = '张三' OR name = '李四';`
* 将事务隔离级别设置为`READ UNCOMMITTED`
* 打开两个命令行窗口，使用`mysql -u 用户名 -p`登录两个session
* 以下左边为**session1**，右边为**session2**

<div className="v-codeblock-root">
    <CodeBlock className="v-codeblock-left" language="sql">{
`-- 使用指定的数据库
USE db_name;

-- 设置事务隔离级别为READ UNCOMMITTED
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- 以下操作按左右框内的序号执行

-- 1. 开启事务
START TRANSACTION;

-- 3. 查询账户表，此时张三的余额是2000
SELECT * FROM account;

-- 5. 此时再查询账户表，张三的余额为1000，这就出现了脏读
SELECT * FROM account;

-- 提交事务
COMMIT;`
        }</CodeBlock>
    <CodeBlock className="v-codeblock-right" language="sql">{
`-- 使用指定的数据库
USE db_name;

-- 以下操作按左右框内的序号执行

-- 2. 开启事务
START TRANSACTION;

-- 4. 张三余额扣除1000元
UPDATE account SET money = money - 1000 WHERE name = '张三';

-- 提交事务
COMMIT;`
        }</CodeBlock>
</div>

* 以上问题可以将事务隔离级别设置为`READ COMMITTED`及以上级别解决
    * `SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;`

##### 不可重复读问题

* 准备[SQL](#示例-3)或重置数据：`UPDATE account SET money = 2000 WHERE name = '张三' OR name = '李四';`
* 将事务隔离级别设置为`READ COMMITTED`
* 打开两个命令行窗口，使用`mysql -u 用户名 -p`登录两个session
* 以下左边为**session1**，右边为**session2**

<div className="v-codeblock-root">
    <CodeBlock className="v-codeblock-left" language="sql">{
`-- 使用指定的数据库
USE db_name;

-- 设置事务隔离级别为READ COMMITTED
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 以下操作按左右框内的序号执行

-- 1. 开启事务
START TRANSACTION;

-- 3. 查询账户表，此时张三的余额是2000
SELECT * FROM account;

-- 6. 此时再查询账户表，张三的余额为1000，这就出现了不可重复读
SELECT * FROM account;

-- 提交事务
COMMIT;`
        }</CodeBlock>
    <CodeBlock className="v-codeblock-right" language="sql">{
`-- 使用指定的数据库
USE db_name;

-- 以下操作按左右框内的序号执行

-- 2. 开启事务
START TRANSACTION;

-- 4. 张三余额扣除1000元
UPDATE account SET money = money - 1000 WHERE name = '张三';

-- 5. 提交事务
COMMIT;`
        }</CodeBlock>
</div>

* 以上问题可以将事务隔离级别设置为`REPEATABLE READ`及以上级别解决
    * `SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;`

##### 幻读问题

* 准备[SQL](#示例-3)或重置数据：`DELETE FROM account WHERE id <> 1 AND id <> 2;`
* 将事务隔离级别设置为`REPEATABLE READ`
* 打开两个命令行窗口，使用`mysql -u 用户名 -p`登录两个session
* 以下左边为**session1**，右边为**session2**
<div className="v-codeblock-root">
    <CodeBlock className="v-codeblock-left" language="sql">{
`-- 使用指定的数据库
use db_name;

-- 设置事务隔离级别为REPEATABLE READ
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- 以下操作按左右框内的序号执行

-- 1. 开启事务
START TRANSACTION;

-- 3. 查询账户表，此时表内没有id为3的账户
SELECT * FROM account WHERE id = 3;

-- 6. 此时新增一个id为3的账户就会出现id重复的错误
INSERT INTO account (id, name, money) VALUES (3, '王五1', 2000);

-- 7. 但是根据id为3的条件还是无法查询到数据，这就是幻读
SELECT * FROM account WHERE id = 3;

-- 提交事务
COMMIT;`
        }</CodeBlock>
    <CodeBlock className="v-codeblock-right" language="sql">{
`-- 使用指定的数据库
USE db_name;

-- 以下操作按左右框内的序号执行

-- 2. 开启事务
START TRANSACTION;

-- 4. 新增一条id为3的账户
INSERT INTO account (id, name, money) VALUES (3, '王五', 1000);

-- 5. 提交事务
COMMIT;`
        }</CodeBlock>
</div>

* 以上问题可以将事务隔离级别设置为`SERIALIZABLE`及以上级别解决
    * `SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;`
* `SERIALIZABLE`隔离级别下，**后开启的事务**会等**先开启的事务**执行完成后才能执行，
会出现执行SQL卡住的问题

---

## 视图/存储过程/触发器

#### 创建app_user测试表

```sql
-- 创建表
CREATE TABLE `app_user`(
    `id` INT  NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name` VARCHAR(50) DEFAULT '' COMMENT '用户名称',
    `email` VARCHAR(50) NOT NULL COMMENT '邮箱',
    `phone` VARCHAR(20) DEFAULT '' COMMENT '手机号',
    `gender` TINYINT DEFAULT '0' COMMENT '性别（0-男  ： 1-女）',
    `password` VARCHAR(100) NOT NULL COMMENT '密码',
    `age` TINYINT DEFAULT '0' COMMENT '年龄',
    `create_time` DATETIME DEFAULT NOW(),
    `update_time` DATETIME DEFAULT NOW(),
    PRIMARY KEY (`id`) 
)COMMENT='用户表';

INSERT INTO app_user (name,email,phone,gender,password,age,create_time,update_time) VALUES
     ('用户0','2737973569qq.com','1839405813',1,'0f1a1342-7b3f-11ef-a986-0242ac110002',63,'2024-09-25 13:07:03','2024-09-25 13:07:03'),
     ('用户1','2637298275qq.com','181494517358',1,'0f1a16df-7b3f-11ef-a986-0242ac110002',27,'2024-09-25 13:07:03','2024-09-25 13:07:03'),
     ('用户2','21117464564qq.com','18227598531',1,'0f1a18c5-7b3f-11ef-a986-0242ac110002',81,'2024-09-25 13:07:03','2024-09-25 13:07:03');
```

### 视图

* 视图（View）是一种虚拟存在的表。视图中的数据并不在数据库中实际存在，
行和列数据来自**定义视图的查询语句中使用的表**，并且是在使用视图时动态生成的
* 视图只保存了查询的SQL逻辑，不保存查询结果。所以我们在创建视图的时候，
主要编写的是SQL查询语句
* 语法

```sql
-- 创建
CREATE [OR REPLACE] VIEW 视图名称[(列名列表)] AS SELECT 语句 [WITH[CASCADED | LOCAL] CHECK OPTION];

-- 查看创建视图语句
SHOW CREATE VIEW 视图名称;
-- 查看视图数据
SELECT * FROM 视图名称 ...;

-- 修改
CREATE [OR REPLACE] VIEW 视图名称[(列名列表)] AS SELECT 语句 [WITH[CASCADED | LOCAL] CHECK OPTION];
ALTER VIEW 视图名称[(列名列表)] AS SELECT语句 [WITH[CASCADED | LOCAL] CHECK OPTION];

-- 删除
DROP VIEW [IF EXISTS] 视图名称 [,视图名称] ...;
```

#### 测试

> 测试表[app_user](#创建app_user测试表)

```sql
-- 创建视图，查询app_user表内前20条数据，只需要id,name,age这几个字段
CREATE OR REPLACE VIEW user_v_1 AS SELECT id, name, age FROM app_user WHERE id <= 20;

-- 查看创建视图语句
SHOW CREATE VIEW user_v_1;

-- 查询视图内数据
SELECT * FROM user_v_1;

-- 修改视图，添加email字段
ALTER VIEW user_v_1 AS SELECT id, name, age, email FROM app_user WHERE id <= 20;

-- 删除视图
DROP VIEW user_v_1;
```

#### 视图检查选项

* 当使用**WITH CHECK OPTION**子句创建视图时，MySQL会通过视图检查正在更改的每个行，
例如插入，更新，删除，以使其符合视图的定义
* MySQL允许基于另一个视图创建视图，它还会检查依赖视图中的规则以保持一致性。
为了确定检查的范围，MySQL提供了两个选项：**CASCADED**（默认）和**LOCAL**

##### CASCADED

* 级联，如果当前视图依赖了其他视图，不管依赖的视图有没有检查选项，递归进行检查，
一直查到没有依赖的视图处

```sql
-- 创建视图v1
CREATE OR REPLACE VIEW v1 AS SELECT id, name from table where id <= 20;

-- 插入成功
INSERT INTO v1 VALUES(5, 'a');

-- 插入成功，因为创建视图时没有指定检查选项，但当前视图无法查询到这个数据
INSERT INTO v1 VALUES(25, 'a');

-- 创建视图v2，依赖v1视图，加上级联检查选项
CREATE OR REPLACE VIEW v2 AS SELECT id, name from v1 where id >= 10 WITH CASCADED CHECK OPTION;

-- 插入失败，因为不满足当前视图v2的WHERE条件
INSERT INTO v2 VALUES(7, 'a');

-- 插入失败，由于添加了级联检查选项，即便v1视图没加检查选项，也会检查v1视图的WHERE条件，所以插入失败
INSERT INTO v2 VALUES(26, 'a');

-- 插入成功，既满足v2视图的WHERE条件也满足v1视图的WHERE条件
INSERT INTO v2 VALUES(15, 'a');

-- 创建视图v3，依赖v2视图，不加检查选项
CREATE OR REPLACE VIEW v3 AS SELECT id, name from v2 where id <= 15;

-- 插入成功
INSERT INTO v3 VALUES(11, 'a');

-- 插入成功，由于当前视图没加检查选项，所以不检查当前视图的WHERE条件
-- 但是当前视图依赖了v2视图，v2视图添加了级联检查条件，所以需要检查
-- 满足v1、v2视图的WHERE条件，所以插入成功
INSERT INTO v3 VALUES(17, 'a');

-- 插入失败，不满足视图v1的检查条件
INSERT INTO v3 VALUES(28, 'a');
```

##### LOCAL

* 只检查当前视图的WHERE条件，如果当前视图依赖了其他视图，则根据依赖视图的检查选项操作
    * 如果依赖的视图检查选项是CASCADED，则按级联的操作递归检查
    * 如果也是LOCAL，重读这块说明
    * 如果没加检查选项，则不检查

```sql
-- 创建视图v1，不加检查选项
CREATE OR REPLACE VIEW v1 AS SELECT id, name from table where id <= 15;

-- 插入成功
INSERT INTO v1 VALUES(5, 'a');

-- 插入成功，因为创建视图时没有指定检查选项，但当前视图无法查询到这个数据
INSERT INTO v1 VALUES(16, 'a');

-- 创建视图v2，依赖v1视图，加上LOCAL检查选项
CREATE OR REPLACE VIEW v2 AS SELECT id, name from v1 where id >= 10 WITH LOCAL CHECK OPTION;

-- 插入成功
INSERT INTO v2 VALUES(13, 'a');

-- 插入成功，满足当前视图的WHERE条件，由于依赖的视图v1没加检查选项，所以不检查
INSERT INTO v2 VALUES(17, 'a');

-- 创建视图v3，依赖v2视图，不加检查选项
CREATE OR REPLACE VIEW v3 AS SELECT id, name from v2 where id < 20;

-- 插入成功，按照规则，我们发现这次插入只在v2视图处进行了WHERE条件检查
INSERT INTO v3 VALUES(14, 'a');
```

#### 视图的更新

* 要使视图可更新，视图中的行与基础表中的行之间必须是一对一的关系。如果视图包含以下任何一项，
则视图不可更新：
    * 聚合函数或窗口函数（SUM()、MIN()、MAX()、COUNT()等）
    * DISTINCT
    * GROUP BY
    * HAVING
    * UNION或UNION ALL

#### 视图的作用

* **简单**：视图不仅可以简化用户对数据的理解，也可以简化操作。那些被经常使用的查询可以被定义为视图，
从而使用户不必为以后的操作每次指定全部的条件
* **安全**：数据库可以授权，但不能授权到数据库特定行和特定的列上。
通过视图用户只能查询和修改他们所能见到的数据
* **数据独立**：视图可以帮助用户屏蔽真实表结构变化带来的影响

---

### 存储过程

* 存储过程是事先经过编译并存储在数据库中的一段SQL语句的集合，调用存储过程可以简化应用开发人员的很多工作，
减少数据在数据库和应用服务器之间的传输，对于提高数据处理的效率是有好处的
* 存储过程就是数据库SQL语言层面的代码封装与重用。
* 在命令行中创建存储过程是，由于存储过程内部编写的语句包含`;`导致无法创建
    * 使用`delimiter 结束符号`修改结束符号后再创建

```sql
-- 创建
CREATE PROCEDURE name ([args])
BEGIN
    
    
END;

-- 调用
CALL name([args])

-- 查询数据库内所有的存储过程
SELECT * FROM information_schema.routines WHERE ROUTINE_SCHEMA = '数据库名';

-- 查询指定存储过程
SHOW CREATE PROCEDURE 存储过程名;

-- 删除
DROP PROCEDURE IF EXISTS 存储过程名;
```

#### 变量

##### 系统变量

* 系统变量是MySQL服务器提供，不是用户定义的，属于服务器层面。分为全局变量 (GLOBAL) 、会话变量 (SESSION) 
    * 会话变量，只在当前会话中有效（每一次新建的连接都是一个单独的会话）
    * 全局变量，在所有会话中有效，MySQL服务重启后就会失效，在`/etc/my.cnf`内永久修改

```sql
-- 搜索全局/会话系统变量
SHOW variables;
SHOW GLOBAL variables LIKE 'auto%';

-- 查看全局/会话系统变量
SELECT @@global.autocommit;
SELECT @@session.autocommit;

-- 设置全局/会话系统变量
SET SESSION autocommit = 1;
SET GLOBAL autocommit = 1;
```

##### 用户自定义变量

* 用户定义变量是用户根据需要自己定义的变量，用户变量不用提前声明，在用的时候直接用`@变量名`使用就可以。
其作用域为当前连接。
* 变量无需声明，使用未声明的变量时不会报错，只会获取到`NULL`

```sql
-- 定义
SET @varname1 = 'value1';
SET @varname2 = 2;
SET @varname3 := 'value3';
SET @varname4 := 'value4', @varname5 := 'value5';
SELECT @varname6 := 'value6', @varname7 := 'value7';
SELECT COUNT(*) INTO @varcount FROM app_user;

-- 使用
SELECT @varname1, @varname2, @varname3, @varname4, @varname5, @varname6, @varname7, @varcount;
```

##### 局部变量

* 局部变量是根据需要定义的在局部生效的变量，访问之前，需要`DECLARE`声明。可用作存储过程内的局部变量和输入参数，
局部变量的范围是在其内声明的`BEGIN … END`块。

```sql
CREATE PROCEDURE p2()
BEGIN
    -- 声明
    DECLARE user_count INT DEFAULT 0;

    -- 赋值
    SET user_count := 10;
    SELECT COUNT(*) INTO user_count FROM app_user;

    -- 使用
    SELECT user_count;
END;

-- 测试
CALL p2();
```

#### if判断

```sql
IF 条件1 THEN
    ...
ELSEIF 条件2 THEN
    ...
ELSE
    ...
END IF;
```

#### 参数

| 类型   | 含义    |
|--------------- | --------------- |
| IN   |   该类参数作为输入，也就是需要调用时传入值 |
| OUT | 该类参数作为输出，也就是该参数可以作为返回值 |
| INOUT | 既可以作为输入参数，也可以作为输出参数 |

```sql
CREATE PROCEDURE 存储过程名称([IN/OUT/INOUT 参数名 参数类型])
BEGIN
    -- SQL语句
END
```

* 使用

```sql
-- 创建存储过程接收2个输入参数，一个输出参数
CREATE PROCEDURE custom_add(IN a INT, IN b INT, OUT sum_num INT)
BEGIN
    SET sum_num := a + b;
END

-- 使用
CALL custom_add(1, 2, @sum_num);
SELECT @sum_num;

-- 创建存储过程接收1个参数作为输入和输出
CREATE PROCEDURE custom_abs(INOUT num INT)
BEGIN
    IF num < 0 THEN
        SET num = -num;
    END IF;
END

-- 使用
SET @num = -5;
CALL custom_abs(@num);
SELECT @num;
```

#### case

* 语法

```sql
-- 语法1
CASE case_value
    WHEN when_value1 THEN statement_list1
    [WHEN when_value2 THEN statement_list2]...
    [ELSE statement_list]
END CASE;

-- 语法2
CASE
    WHEN search_condition1 THEN statement_list1
    [WHEN search_condition2 THEN statement_list2]...
    [ELSE statement_list]
END CASE;
```

* 使用

```sql
-- 使用方式1定义
CREATE PROCEDURE get_wk(IN wk INT, OUT wkstr VARCHAR(10))
BEGIN
    CASE wk
        when 1 then set wkstr := '星期一';
        WHEN 2 THEN SET Wkstr := '星期二';
        WHEN 3 THEN SET Wkstr := '星期三';
        WHEN 4 THEN SET Wkstr := '星期四';
        WHEN 5 THEN SET Wkstr := '星期五';
        WHEN 6 THEN SET Wkstr := '星期六';
        WHEN 7 THEN SET Wkstr := '星期日';
        ELSE SET wkstr := '错误';
    END CASE;
END

CALL get_wk(-1, @wkstr);
SELECT @wkstr;

-- 使用方式2定义
CREATE PROCEDURE check_score(IN score INT, OUT msg VARCHAR(10))
BEGIN
    CASE
        WHEN score >= 60 THEN SET msg := '及格';
        WHEN score >= 90 THEN SET msg := 'Good';
        WHEN score >= 100 THEN SET msg := 'Very Good';
        ELSE SET msg := 'Not Good';
    END CASE;
END

CALL check_score(88, @msg);
SELECT @msg;
```

#### 循环

##### while

* while循环是有条件的循环控制语句。满足条件后，再执行循环体中的SQL

```sql
-- 先判定条件，如果条件为true，则执行逻辑，否则，不执行逻辑
WHILE 条件 DO
    --SQL
END WHILE;

```

* 使用

```sql
CREATE PROCEDURE accumulation(IN num INT)
BEGIN
    DECLARE total INT DEFAULT 0;
    WHILE num > 0 DO
        SET total := total + num;
        SET num := num - 1;
    END WHILE;
    SELECT total;
END

CALL accumulation(100);
```

##### repeat

* repeat是有条件的循环控制语句，当满足条件的时候退出循环

```sql
-- 先执行一次逻辑，然后判定逻辑是否满足，如果满足，则退出。如果不满足，则继续下一次循环
REPEAT
    -- SQL逻辑
    UNTIL 条件
END REPEAT;
```

##### loop

* LOOP实现简单的循环，如果不在SQL逻辑中增加退出循环的条件，可以用其来实现简单的死循环。LOOP可以配合以下两个语句使用：
    * `LEAVE` - 配合循环使用，退出循环
    * `ITERATE` - 必须用在循环中，作用是跳过当前循环剩下的语句，直接进入下一次循环

```sql
-- 定义
[begin_label:] LOOP
    -- SQL逻辑
END LOOP [end_lable];

-- 退出指定标记的循环体
LEAVE label;

-- 直接进入下一次循环体
ITERATE label;
```

* 使用

```sql
-- 只累加偶数
CREATE PROCEDURE accumulation1(IN num INT)
BEGIN
    DECLARE TOTAL INT DEFAULT 0;
    sum:LOOP
        -- 退出条件
        IF num < 0 THEN 
            LEAVE sum;
        END IF;
    
        -- 累加条件
        IF num % 2 = 1 THEN
            SET num := num - 1;
            ITERATE sum;
        END IF;
    
        SET total := total + num;
        SET num := num - 1;
    END LOOP sum;
    SELECT total;
END

CALL accumulation1(100);
```

#### 游标

* 游标（CURSOR）是用来存储查询结果集的数据类型，在存储过程和函数中可以使用游标对结果集进行循环的处理，
游标的使用包括游标的声明、OPEN、FETCH和CLOSE
* 游标必须在变量后面声明

```sql
-- 声明游标
DECLARE 游标名称 CURSOR FOR 查询语句;

-- 打开游标
OPEN 游标名称;

-- 获取游标记录
FETCH 游标名称 INTO 变量[, 变量];

-- 关闭游标
CLOSE 游标名称;
```

* 测试

> 测试表[app_user](#创建app_user测试表)

```sql
-- 创建储存过程，查询app_user表内年龄大于等于多少的用户并存入指定的表内
CREATE PROCEDURE users_by_age(IN user_age INT)
BEGIN
    DECLARE user_name VARCHAR(50);
    DECLARE user_email VARCHAR(50);
    -- 声明游标
    DECLARE u_cursor CURSOR FOR SELECT name, email FROM app_user WHERE age >= user_age LIMIT 10;

    DROP TABLE IF EXISTS t_user_age;
    CREATE TABLE IF NOT EXISTS t_user_age(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50),
        email VARCHAR(50)
    );

    -- 使用游标
    OPEN u_cursor;

    WHILE TRUE DO
        FETCH u_cursor INTO user_name, user_email;
        INSERT INTO t_user_age VALUES (null, user_name, user_email);
    END WHILE;
    CLOSE u_cursor;
END;

-- 执行，此时发现执行报错No data - zero rows fetched, select or procced，但是数据确实查询并导入到指定的表内了
-- 使用条件处理程序解决
CALL users_by_age(93); 
```

#### 条件处理程序（Handler）

* 可以用来定义在流程控制结构执行过程中遇到问题时相应的处理步骤
* MySQL错误码参考[官网文档](https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html)

```sql
/*
handler_action
    CONTINUE：继续当前程序
    EXIT：终止当前程序
condition_value
    SQLSTATE sqlstate_value：状态码，如02000
    SQLWARNING：所有以01开头的SQLSTATE代码的简写
    NOT FOUNT：所有以02开头的SQLSTATE代码的简写
    SQLEXCEPTION：所有没有被SQLWARNING或NOT FOUNT捕获的SQLSTATE代码的简写
*/
DECLARE handler_action HANDLER FOR condition_value [, condition_value]... statement;
```

* 修复上面存储过程报错问题

```sql {9-10}
-- 创建储存过程，查询app_user表内年龄大于等于多少的用户并存入指定的表内
CREATE PROCEDURE users_by_age1(IN user_age INT)
BEGIN
    DECLARE user_name VARCHAR(50);
    DECLARE user_email VARCHAR(50);
    -- 声明游标
    DECLARE u_cursor CURSOR FOR SELECT name, email FROM app_user WHERE age >= user_age LIMIT 10;

    -- 添加游标内没数据后的错误处理
    DECLARE EXIT HANDLER FOR SQLSTATE '02000' CLOSE u_cursor;

    DROP TABLE IF EXISTS t_user_age;
    CREATE TABLE IF NOT EXISTS t_user_age(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50),
        email VARCHAR(50)
    );

    -- 使用游标
    OPEN u_cursor;

    WHILE TRUE DO
        FETCH u_cursor INTO user_name, user_email;
        INSERT INTO t_user_age VALUES (null, user_name, user_email);
    END WHILE;
    CLOSE u_cursor;
END;

-- 执行，此时就没报错了
CALL users_by_age1(50); 
```

### 储存函数

* 存储函数是有返回值的存储过程，存储函数的参数只能是IN类型的（所有IN关键字可以不写）

```sql
/*
characteristic说明：
    DETERMINISTIC：相同的输入参数总是产生相同的结果
    NO SQL：不不包含SQL语句
    READS SQL DATA：包含读取数据的语句，但不包含写入数据的语句
*/
CREATE FUNCTION 存储函数名([参数列表])
RETURNS type [characteristic ...]
BEGIN
    -- SQL语句
    RETURN ...;
END
```

* 使用

```sql
-- 定义
CREATE FUNCTION fun1(num int)
RETURNS int DETERMINISTIC
BEGIN
    DECLARE total INT DEFAULT 0;
    WHILE num > 0 DO
        SET total := total + num;
        SET num := num - 1;
    END WHILE;
    RETURN total;
END

-- 使用
SELECT fun1(100);
```

### 触发器

* 触发器是与表有关的数据库对象，指在insert/update/delete之前或之后，触发并执行触发器中定义的SQL语句集合，
触发器的这种特性可以协助应用在数据库端确保数据的完整性，日志记录，数据校验等操作。
* 使用别名**OLD**和**NEW**来引用触发器中发生变化的记录内容，这与其他的数据库是相似的
* 现在触发器还只支持行级触发，不支持语句级触发。
    * **行级触发** - 语句影响了多少行数据就触发多少次
    * **语句级触发** - 不管语句影响了多少行数据，一条语句只触发一次

| 触发器类型   | NEW和OLD    |
|--------------- | --------------- |
| INSERT触发器   |  NEW表示将要或者已经新增的数据  |
| UPDATE触发器   | OLD表示修改之前的数据，NEW表示将要或已经修改后的数据   |
| DELETE触发器   |  OLD表示将要或者已经删除的数据  |

#### 语法

```sql
-- 创建
CREATE TRIGGER trigger_name
BEFORE/AFTER INSERT/UPDATE/DELETE
ON table_name FOR EACH ROW -- 行级触发
BEGIN
    trigger_stmt;
END;

-- 查看
SHOW TRIGGERS;

-- 删除，如果没有指定schema_name，默认为当前数据库
DROP TRIGGER [schema_name.]trigger_name;
```

#### 使用

* 创建`app_user_logs`日志表，测试对[app_user](#创建app_user测试表)表进行相关操作的触发器

```sql
CREATE table app_user_logs(
    id int(11) primary key not null auto_increment,
    operation varchar(20) not null comment '操作类型，insert/update/delete',
    operate_time datetime not null comment '操作时间',
    operate_id int(11) not null comment '操作的id',
    operate_params varchar(500) comment '操作参数'
)engine=innodb default charset=utf8;
```

##### 插入数据触发器

```sql
-- 创建向app_user表内插入数据时的触发器
CREATE TRIGGER app_user_insert_trigger
AFTER INSERT ON app_user FOR EACH ROW
BEGIN
    INSERT INTO app_user_logs VALUES 
    (null, 'insert', now(), new.id, concat('app_user{name=', new.name, ', age=', new.age, ', phone=', new.phone, '}'));
END;

-- 测试插入
INSERT INTO app_user (name, age, phone, email, password) VALUES ('test1', 11, '12453214732', '5341543342@qq.com', '');

-- 查看日志
SELECT * FROM app_user_logs;
```

##### 修改数据触发器

```sql
-- 创建修改数据触发器
CREATE TRIGGER app_user_update_trigger
AFTER UPDATE ON app_user FOR EACH ROW
BEGIN
    INSERT INTO app_user_logs VALUES 
    (null, 'update', now(), new.id, concat('app_user{name=', old.name, ', age=', old.age, ', phone=', old.phone, '}==>',
   'app_user{name=', new.name, ', age=', new.age, ', phone=', new.phone, '}'));
END;

-- 测试更新一条数据
UPDATE app_user SET phone = '1111111' WHERE id = 1;
SELECT * FROM app_user_logs;

-- 测试更新多条数据
UPDATE app_user SET phone = '222222222'  WHERE email LIKE '21188744%';
SELECT * FROM app_user_logs;
```

##### 删除数据触发器

```sql
-- 创建删除数据触发器
CREATE TRIGGER app_user_delete_trigger
AFTER DELETE ON app_user FOR EACH ROW
BEGIN
    INSERT INTO app_user_logs VALUES 
    (null, 'delete', now(), old.id, concat('app_user{id=', old.id, ', name=', old.name, ', age=', old.age, ', phone=', old.phone, '}'));
END;

-- 测试删除数据
DELETE FROM app_user WHERE id = 2;
SELECT * from app_user_logs;
```

---

## 其他

### 数据库设计规范

* **当数据库比较复杂的时候需要设计数据库了**
* 糟糕的数据库设计：
    * 数据冗余、浪费控件
    * 数据库删除和插入都会麻烦、异常（屏蔽物理外键）
    * 程序性能差
* 良好的数据库设计：
    * 节省内存空间
    * 保证数据库的完整性
    * 方便我们开发
* **软件开发中，关于数据库的设计**
    * 分析需求：分析业务和需要处理的数据库需求
    * 概要设计：设计关系ER图

### 三大范式

* **为什么需要数据规范化**
* 信息重复
* 更新异常
* 插入异常
    * 无法正常显示信息
* 删除异常
    * 丢失有效信息

#### 第一范式

* 原子性：保证每一列不可再分

#### 第二范式

* 前提：满足第一范式
* 每张表只描述一件事情

#### 第三范式

* 前提：满足第一范式、第二范式
* 要确保数据表中的每一列数据都和主键唯一相关，而不能简介相关

#### 规范数据库设计

* **规范性和性能问题**
* 关联查询的表不能超过三张表
* 考虑商业化的需求和目标，（成本、用户体验）数据库的性能更加重要
* 在规范性能问题的时候，需要适当考虑下规范性
* 故意给某些表增加一些冗余字段（从多表查询变为单表查询）
* 故意增加一些计算列（从大数据量变为小数据量的查询：索引）

### mysql data文件迁移

* mysql整个文件夹直接复制到迁移的目录，mysql data目录只保留所有文件夹和ibdata1文件，其它文件全删了
* 修改my.ini文件里面对应的路径
* 打开注册表输入`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\MySQL`最后的目录是自己的mysql服务名称，修改ImagePath为新的目录地址
* 已管理员启动cmd 输入`net start mysql` 启动成功
* 可以遇到`发生系统错误 2。找不到指定文件`报错，运行`mysqld --remove`和`mysqld --install`命令后再次重启

## 参考

* [黑马MySQL](https://www.bilibili.com/video/BV1Kr4y1i7ru/?spm_id_from=333.999.0.0&vd_source=c8dac761c9fcb8220ee9059d06ac692e)
* [Windows上同时安装两个不同版本MYSQL](https://blog.csdn.net/Mr_Chp/article/details/132047795)
