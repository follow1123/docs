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

1. 解压zip文件
2. 配置MySQL环境变量
3. 在MySQL文件夹里面新建一个my.ini文件

```ini
[mysqlId]
basedir=mysql安装目录\
datadir=mysql安装目录\data\
port=3306
skip-grant-tables
```

4. 在MySQL目录下新建data文件夹
5. 以管理员权限进入`cmd`并执行以下命令
```cmd
REM 初始化mysql
mysqld --initialize --console

REM 安装mysql
mysqld -install

REM 启动mysql服务
net start mysql

REM 进入MySQL命令行
mysql -uroot -p

REM 修改密码
SET PASSWORD = PASSWORD('密码');`
ALTER USER 'root'@'localhost' PASSWORD EXPIRE NEVER;`

REM 刷新权限
flush privileges;`
```

6. 修改`my.ini`文件，删除里面的`skip-grant-tables`即可

7. 重启mysql

```cmd
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
* 创建表时还需要配合<a href="#constraint">约束</a>

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

* 修改表时也可以修改<a href="#constraint">约束</a>

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
* `WHERE 条件`参考<a href="#dql-conditional">DQL的条件查询</a>

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

<a id="dql-conditional"></a>
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
| < | 小于 |
| <= | 小于等于 |
| = | 等于 |
| <>或!= | 不等于 |
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

* `COUNT()`函数说明
    * `COUNT(字段)`：会忽略所有的null值
    * `COUNT(*)`：不会忽略所有的null值
    * `COUNT(1)`：不会忽略所有的null值
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
| <a href="#func-date-date-add">DATE_ADD(date, interval expr type)</a> | 返回一个日期或时间值加上一个时间间隔expr后的时间值 |
| <a href="#func-date-datediff">DATEDIFF(date1, date2)</a> | 返回起始时间date1和结束时间date2之间的天数 |

#### 函数示例

<a id="func-date-date-add"></a>
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

<a id="func-date-datediff"></a>
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

<a id="func-date-case-when"></a>
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

<a id="constraint"></a>
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

<a id="multi-table-query"></a>
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

<a id="transaction-isolation"></a>
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

<a id="transaction-isolation-demo-sql"></a>
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

* 准备<a href="#transaction-isolation-demo-sql">SQL</a>或重置数据：
`UPDATE account SET money = 2000 WHERE name = '张三' OR name = '李四';`
* 将事务隔离级别设置为`READ UNCOMMITTED`
* 打开两个命令行窗口，使用`mysql -u 用户名 -p`登录两个session
* 以下左边为**session1**，右边为**session2**

<div style="display: flex;">
    <pre style="flex: 1;margin: 0 2px 0 0;">
        <code>
-- 使用指定的数据库
USE db_name;</br>
-- 设置事务隔离级别为READ UNCOMMITTED
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;</br>
-- 以下操作按左右框内的序号执行</br>
-- 1.开启事务
START TRANSACTION;</br>
-- 3.查询账户表，此时张三的余额是2000
SELECT * FROM account;</br>
-- 5.此时再查询账户表，张三的余额为1000，这就出现了脏读
SELECT * FROM account;</br>
-- 提交事务
COMMIT;
        </code>
    </pre>
    <pre style="flex: 1;margin: 0 0 0 2px;">
        <code>
-- 使用指定的数据库
USE db_name;</br>
-- 以下操作按左右框内的序号执行</br>
-- 2.开启事务
START TRANSACTION;</br>
-- 4.张三余额扣除1000元
UPDATE account SET money = money - 1000 WHERE name = '张三';</br>
-- 提交事务
COMMIT;
        </code>
    </pre>
</div>

* 以上问题可以将事务隔离级别设置为`READ COMMITTED`及以上级别解决
    * `SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;`

##### 不可重复读问题

* 准备<a href="#transaction-isolation-demo-sql">SQL</a>或重置数据：
`UPDATE account SET money = 2000 WHERE name = '张三' OR name = '李四';`
* 将事务隔离级别设置为`READ COMMITTED`
* 打开两个命令行窗口，使用`mysql -u 用户名 -p`登录两个session
* 以下左边为**session1**，右边为**session2**

<div style="display: flex;">
    <pre style="flex: 1;margin: 0 2px 0 0;">
        <code>
-- 使用指定的数据库
USE db_name;</br>
-- 设置事务隔离级别为READ COMMITTED
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;</br>
-- 以下操作按左右框内的序号执行</br>
-- 1.开启事务
START TRANSACTION;</br>
-- 3.查询账户表，此时张三的余额是2000
SELECT * FROM account;</br>
-- 6.此时再查询账户表，张三的余额为1000，这就出现了不可重复读
SELECT * FROM account;</br>
-- 提交事务
COMMIT;
        </code>
    </pre>
    <pre style="flex: 1;margin: 0 0 0 2px;">
        <code>
-- 使用指定的数据库
USE db_name;</br>
-- 以下操作按左右框内的序号执行</br>
-- 2.开启事务
START TRANSACTION;</br>
-- 4.张三余额扣除1000元
UPDATE account SET money = money - 1000 WHERE name = '张三';</br>
-- 5.提交事务
COMMIT;
        </code>
    </pre>
</div>

* 以上问题可以将事务隔离级别设置为`REPEATABLE READ`及以上级别解决
    * `SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;`

##### 幻读问题

* 准备<a href="#transaction-isolation-demo-sql">SQL</a>或重置数据：
`DELETE FROM account WHERE id <> 1 AND id <> 2;`
* 将事务隔离级别设置为`REPEATABLE READ`
* 打开两个命令行窗口，使用`mysql -u 用户名 -p`登录两个session
* 以下左边为**session1**，右边为**session2**

<div style="display: flex;">
    <pre style="flex: 1;margin: 0 2px 0 0;">
        <code>
-- 使用指定的数据库
use db_name;</br>
-- 设置事务隔离级别为REPEATABLE READ
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;</br>
-- 以下操作按左右框内的序号执行</br>
-- 1.开启事务
START TRANSACTION;</br>
-- 3.查询账户表，此时表内没有id为3的账户
SELECT * FROM account WHERE id = 3;</br>
-- 6.此时新增一个id为3的账户就会出现id重复的错误
INSERT INTO account (id, name, money) VALUES (3, '王五1', 2000);</br>
-- 7.但是根据id为3的条件还是无法查询到数据，这就是幻读
SELECT * FROM account WHERE id = 3;</br>
-- 提交事务
COMMIT;
        </code>
    </pre>
    <pre style="flex: 1;margin: 0 0 0 2px;">
        <code>
-- 使用指定的数据库
USE db_name;</br>
-- 以下操作按左右框内的序号执行</br>
-- 2.开启事务
START TRANSACTION;</br>
-- 4.新增一条id为3的账户
INSERT INTO account (id, name, money) VALUES (3, '王五', 1000);</br>
-- 5.提交事务
COMMIT;
        </code>
    </pre>
</div>

* 以上问题可以将事务隔离级别设置为`SERIALIZABLE`及以上级别解决
    * `SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;`
* `SERIALIZABLE`隔离级别下，**后开启的事务**会等**先开启的事务**执行完成后才能执行，
会出现执行SQL卡住的问题

---


### 数据表的类型

* 关于数据表引擎
    * INNODB 默认使用
    * MYISAM 早些年使用

| |MYISAM|INNODB|
|----|----|----|
|事务支持|不支持|支持|
|数据行锁定|不支持(锁定表)|支持|
|外键约束|不支持|支持|
|全文索引|支持|不支持|
|表空间大小|较小|较小(约MYISAM的两倍)|

* 常规使用操作
    * MYISAM 节约空间、速度较快
    * INNODB 安全性高、事务的处理、多表都多用户操作

> 在数据库中存在的位置

**所有数据库文件都存储在mysql安装目录下的data文件夹下，本质上还是文件存储**

---
* INNODB和MYISAM引擎在屋里文件上的区别
    * INNODB 在数据库表中只有一个*.frm文件，以及上一级目录的ibdata1文件
    * MYISAM对应文件
        * *.frm 表结构定义文件
        * *.MYD 数据文件（data）
        * *.MYI 索引文件（index）
        
> 设置数据库表的字符集编码

`charset=utf8`

不设置的话创建的表就是mysql的默认编码，
mysql的默认编码是Latin1，可以在mysql目录下的my.ini文件里添加`character-set-server=utf8`
建议在创建表的时候加默认编码

### 索引
* mysql官方对索引的定义：索引（index）是帮助mysql高效获取数据的数据结构
* 提取句子的主干就可以得到索引的本质，索引就是数据结构
* 索引的分类
    * 主键索引（primary key）
        * 唯一的表示，主键不可重复，只有一列能作为主键
    * 唯一索引（unique key）
        * 避免重复的列出现，唯一索引可以重复，多个列都可以标识为唯一索引
    * 常规索引（key/index）
        * 默认的，index获key关键字来修饰
    * 全文索引（fulltext）
        * 在特定数据库引擎才有（MYSIAM）
        * 快速定位数据
* 基础语法

```sql
-- 索引的使用
-- 1、在创建表的时候给字段添加索引
-- 2、创建完毕后，再添加索引

-- 显示某个表内的所有的所有信息
SHOW INDEX FROM 表名;
-- 方式一
-- 增加一个全文索引
ALTER TABLE 表名 ADD FULLTEXT INDEX 索引名(列名);
-- EXPLAIN 分析sql执行的状况
EXPLAIN SELECT * FROM 表名;
-- 设置了全文索引的分析语句
EXPLAIN SELECT * FROM 表名 WHERE MATCH(列名) against(值);
-- 方式二
CREATE INDEX 索引名 ON 表名(列名);
```

* 测试索引

```sql
-- 查询航班预约表内电话号为767-867-1030的用户
-- 未添加索引 > 时间: 0.042s
SELECT * FROM flightreservation WHERE Phone = '767-867-1030';
-- 未添加索引 分析查询行数57960行
EXPLAIN SELECT * FROM flightreservation WHERE Phone = '767-867-1030';
-- 给该表内的phone字段添加索引
CREATE INDEX flightreservation_Phone ON flightreservation(Phone);
-- 添加索引后 > 时间: 0s
SELECT * FROM flightreservation WHERE Phone = '767-867-1030';
-- 添加索引后 分析查询行数6行
EXPLAIN SELECT * FROM flightreservation WHERE Phone =  '767-867-1030';
```

* 索引原则
    * 索引不是越多越好
    * 经常变动的数据不要加索引
    * 小数据量的表不需要加索引
    * 索引一般加在常用来查询的字段上

#### 索引的数据结构

* Hash 类型
* Btree INNODB 默认结构

### 备份

* 命令行操作

```bash 
# 导出 表名可不填 不填会到处该数据库的全部表
mysqldump -h主机 -u用户名 -p密码 数据库名 [表名1[表名2[表名3...]]] > 目标路径+文件名
# 导入 先登录
source 目标sql路径
```

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
