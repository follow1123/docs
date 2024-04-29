# Mysql

## 安装步骤
* 解压zip文件
* 配置mysql环境变量
* 在mysql文件夹里面新建一个my.ini文件
```mysql based
    [mysqlId]
    basedir=mysql安装目录\
    datadir=mysql安装目录\data\
    port=3306
    skip-grant-tables
```

* 在mysql目录下新建data文件夹

> 以下命令在管理员权限下运行

* `mysqld --initialize --console` 初始化mysql
* `mysqld -install` 安装mysql
* `net start mysql` 启动mysql服务
* 然后再次启动mysql输入 `mysql -uroot -p`进入mysql管理界面

    * 进入界面后更改密码，出现`You must reset your password using ALTER USER statement before executing this statement.` 也是需要重置密码

        * `SET PASSWORD = PASSWORD('密码');`

        * `ALTER USER 'root'@'localhost' PASSWORD EXPIRE NEVER;`

        * `flush privileges;`


~~`update mysql.user set authentication_string=password('密码') where user='root' and Host='hocalhost';`（最后输入`flush privileges;` 刷新权限）~~

* 修改my.ini文件，删除里面的skip-grant-tables即可

* 重启mysql
    * `net stop mysql`
    * `net start mysql`

## 简介
### mysql语言不区分大小写
* DDL 数据库定义语言
* DML 数据库操作语言
* DQL 数据库查询语言
* DCL 数据库控制语言
### **操作数据库**
如果数据库里面的数据库名、表名、字段名是一个关键字需要加上 **`** 这个符号
1.创建数据库
```sql
create database [if not exists] 数据库名;
```
2.删除数据库
```sql
drop database [if exists] 数据库名;
```
3.使用数据库
```sql
use 数据库名;
```
4.查看数据据库
```sql
show databases --查看所有数据库
```
### **数据库列的类型**
> 数值

|类型名称|大小|描述|
|----|---- |----|
|tinyint|1个字节|最小的数据|
|smallint|2个字节||
|mediumint|3个字节|中等大小的数据|
|int|4个字节|标准的整型（int的长度跟零填充有关不代表int的大小）|
|bigint|8个字节|较大的数据|
|float|4个字节|浮点型|
|double|8个字节|浮点型|
|decimal|字符串型浮点数|金融计算的时候使用|
> 字符串

|类型名称|大小|描述|
|----|---- |----|
|char|0~255|固定大小的字符串|
|varchar|0~65535|可边长的字符串（对应java里面的String）|
|tinytext|2^8 - 1|微型文本|
|text |2^16 - 1|文本串（保存大文本）|
> 时间、日期

|类型名称|描述|
|----|----|
|date|YYYY-MM-dd|
|time|hh-mm-ss|
|datetime|YYYY-MM-dd hh-mm-ss|
|timestamp|时间戳，1970年1月1日到现在的毫秒数|
|year|年份|
> null 空类型
### **数据库的字段属性**
* unsigned
    * 无符号整型
    * 声明类该列不能为负数
* zerofill
    * 0填充
    * 不足的位数用零填充
* auto_increment
    * 自动递增, 默认再上一条记录的基础上加一
    * 通常来设计唯一的主键， 必须是整数类型
    * 可以自定义增长的起始值和步长
* not null
    * 数据不能为空
* default
    * 设置默认值
    
---
每一个表都必须存在下面5个字段（之后使用）
```sql
    id --主键
    `version` --乐观锁
    is_delete --伪删除
    gmt_create --创建时间
    gmt_update --修改时间
```
### 创建数据库表
```sql
-- 如果该表不存在则创建该表
CREATE TABLE IF NOT EXISTS `teacher` (
    `id` INT NOT NULL auto_increment COMMENT '工号', -- 自增
    `name` VARCHAR ( 20 ) NOT NULL DEFAULT '未命名' COMMENT '姓名',
    `password` VARCHAR ( 30 ) NOT NULL DEFAULT '1' COMMENT '密码',
    `sex` VARCHAR ( 2 ) NOT NULL DEFAULT '男' COMMENT '性别',
    `birthday` datetime DEFAULT NULL COMMENT '出生日期',
    `address` VARCHAR ( 50 ) DEFAULT NULL COMMENT '家庭住址',
    `email` VARCHAR ( 50 ) DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY ( `id` ) -- 主键
) ENGINE = INNODB DEFAULT CHARSET = 'utf8'; -- 数据库引擎和默认字符集
```
* 格式
```sql
create table [if not exists] `表名`(
    `字段名` 类型 [属性] [索引] [注释],
    `字段名` 类型 [属性] [索引] [注释],
    ...
    `字段名` 类型 [属性] [索引] [注释]
)[表类型] [字符集] [注释];
```
* 常用命令
```sql
    SHOW CREATE DATABASE `数据库名`; -- 查看数据库创建的语句 
    SHOW CREATE TABLE `表名`; -- 查看表的创建语句
    DESC(或DESCRIBE) `表名`; -- 查看表的具体结构
```
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

### 修改删除表
>修改

```sql
    -- 重命名
    ALTER TABLE `旧表名` RENAME `新表名`;
    -- 添加字段
    ALTER TABLE `表名` ADD `字段名` 类型 [属性] [索引] [注释];
    -- 修改字段约束
    ALTER TABLE tea MODIFY `字段名` 类型 [属性] [索引] [注释];
    -- 修改字段名
    ALTER TABLE tea CHANGE `旧字段名` `新字段名` 类型;
    -- 删除字段
    ALTER TABLE tea DROP `字段名`;
```

>删除

```sql
    -- 删除表（如果存在）
    DROP TABLE IF EXISTS `表名`;
```
**所有创建删除操作尽量加上判断，以免报错**


### Mysql数据管理
* #### 外键

> 方式一、创建表时添加好外键
```sql
    create table `subject`(
        `subject_id` int auto_increment not null comment '科目id',
        `subject_name` varchar(40) not null comment '科目名称',
        primary key(`subject_id`)
    )engine=innodb default charset=utf8;
    
    create table `student`(
        `id` int not null auto_increment comment '学生id',
        `name` varchar(20) not null comment '学生姓名',
        `subject_id` int not null comment '科目id',
        primary key(`id`),
        key `FK_subject_id` (`subject_id`), -- 外键语句
        constraint `FK_subject_id` foreign key(`subject_id`) references `subject`(`subject_id`)
    )engine=innodb default charset=utf8;
```
> 方式二、创建表后给需要添加外键的表添加外键

```sql
    create table `subject`(
        `subject_id` int auto_increment not null comment '科目id',
        `subject_name` varchar(40) not null comment '科目名称',
        primary key(`subject_id`)
    )engine=innodb default charset=utf8;
    
    create table `student`(
        `id` int not null auto_increment comment '学生id',
        `name` varchar(20) not null comment '学生姓名',
        `subject_id` int not null comment '科目id',
        primary key(`id`)
    )engine=innodb default charset=utf8;
    -- 添加外键
    alter table `student` 
    add constraint `FK_subject_id` foreign key(`subject_id`) references `subject`(`subject_id`);
```
**以上方式都是添加物理外键方式数据库内的表多了之后会造成表之间的关系混乱不建议是使用**


**注意：删除有外键关系的表时，需要先删除引用被人的表（从表），再删除被引用的表（主表）**

**实现方式**
* 数据库就是单纯的表，只用来存放数据，只有行（数据）和列（字段）
* 再程序里实现外键的方式

---
### DML语言
**数据库的意义**：存储数据，数据管理

**DML语言**：数据库操作语言
* insert
* update
* delete
#### 添加
> insert
```sql
    -- 因为id自增只用写一个列名
    insert into `表名` (`列名1`, `列名2`, `列名3`...) values ('值1','值2','值3'...);
    -- 如果不写列名则需要写所有列匹配的值
    insert into `表名` values ('值1','值2','值3'...);
    -- 一次可以插入多行数据
    insert into `表名` (`列名1`, `列名2`, `列名3`...) values
    ('值1','值2','值3'...),
    ('值1','值2','值3'...),
    ('值1','值2','值3'...),
    ('值1','值2','值3'...);
```
#### 修改
> update
```sql
    update `表名` set  `字段名1`=值1, [`字段名2`=值2,...] where [条件];
```
条件：where子句 运算符 某列的等于或大于某个值，或再那个区间

|操作符|含义|
|----|----|
|=|等于|
|<>或!=|不等于|
|>||
|>=||
|<||
|<=||
|between...and...|在某个范围区间|
|and|与|
|or|或|

#### 删除

> delete

```sql
    delete form `表名` [where 条件];
```

> truncate

```sql
    truncate `subject`; -- 清空表
```
> delete和truncate的区别

* 相同点：都能删除数据，都不会删除表结构
* 不同：
    * truncate会重新设置自增列，自增计数器会归零
    * truncate不会影响事务
    
    

**delete的删除问题**：在重启数据库后自增列会从1开始（问题不确定）

---
### DQL数据查询
#### DQL
(Data Query Language)数据查询语言
* select 语法
```sql
SELECT [All | DISTINCT]
{* | 表名.* | [表名1.列名1[as 列名的别名][,表名2.列名2[as 列名的别名]][,...]]}
FROM 表名 [as 表名的别名]
        [left | right | inner join 表名2] -- 连表查询
        [WHERE] -- 指定结果徐满足的条件
        [GROUP BY] -- 指定结果按那几个字段进行分组
        [HAVING] --过滤分组记录必须满足的次要条件
        [ORDER BY] -- 指定查询记录按一个或多个条件进行分组
        [LIMIT {[offset,]row_count row_countOFFSET offset}]; --指定查询的记录从那条至哪条
```
```sql
    -- as关键字：可以给字段起别名也可以给表起别名    
    -- concat(s1, s2)函数 连接字符串
    select concat(字符串1, 字符串2, 字符串3...) from 表名;

    -- distinct 去除重复的数据只显示重复数据里面的一条
    select distinct 列名 from 表名;

    -- 查看mysql版本
    select version();

    -- 用于计算
    select 计算的式子例如: 1+100 as 显示的列名;

    -- 查询自增的步长
    select @@auto_increment_increment;

    -- 列名后面加上一个数字如果该列类型为数值类型则显示的结果为该列的数据加上那个数字的结果
    select 列名+1 from 表名;

    -- in 关键字 查询某条数据里的某个字段在一些具体的数据中
    select 列名 from 表名 where 列名 in (值1, 值2, 值3...);

    -- null is null 空 非空
    select 列名 from 表名 where 列名 is null; -- 查询该表的某个字段为空的记录
    select 列名 from 表名 where 列名 is not null; -- 查询该表的某个字段不为空的记录

```
* 链表查询 JOIN

|操作|描述|
|----|----|
|inner join|如果表中至少有一个匹配则返回该行|
|left join|会从左表中返回所有的值，即使右表中没有匹配|
|right join|会从右表中返回所有的值，即使左表中没有匹配|

* 自连接

* 排序
```sql
    -- ASC(默认)升序 DESC 降序
    order by 列名 ASC | DESC
```
* 分页
```sql
    -- 例如 limit 0, 5 页面大小为5 显示从第1条记录开始到第5条 表示第一页（偏移量从零开始）
            limit 5, 5 页面大小为5 显示从第6条记录开始到第5条 表示第二页
            limit 10, 5 页面大小为5 显示从第11条记录开始到第5条 表示第三页
            第n页为 limit (当前页数 - 1) * 页面大小, 页面大小
    limit 起始下标, 页面大小
```
* 子查询
where 的条件里面嵌套另一个查询语句
```sql
    -- 查询预订号小于4000，gate 为'G33'的乘客的姓名
    -- 联表查询方式
    SELECT distinct  u.UserId, CONCAT(u.FirstName,' ', u.LastName) AS 联表
    FROM users u
    JOIN flightreservation f
    ON u.UserId = f.UserId
    JOIN `schedule` s
    ON f.ScheduleId = s.ScheduleId
    WHERE f.ReservationId < 4000
    AND	s.Gate = 'G33'
    ORDER BY u.UserId;
    -- 子查询方式
    SELECT UserId, CONCAT(FirstName,' ', LastName) AS 子查询
    FROM users
    WHERE UserId IN	(
        SELECT UserId 
        FROM flightreservation
        WHERE ReservationId < 4000
        AND ScheduleId IN (
            SELECT ScheduleId
            FROM `schedule`
            WHERE Gate = 'G33'
        )
    )
    ORDER BY UserId
```

* 函数
    * 数学类函数
    * 字符串类函数
* 日期类函数
```sql
    SELECT current_time(); 
    SELECT CURRENT_DATE(); 
    SELECT CURRENT_TIMESTAMP();
    SELECT NOW();
    SELECT LOCALTIME();
    SELECT SYSDATE();
    -- 获取一个时间的年、月、日、时、分、秒
    SELECT YEAR(NOW());
    SELECT MONTH(NOW());
    SELECT DAY(NOW());
    SELECT HOUR(NOW());
    SELECT MINUTE(NOW());
    SELECT Second(NOW());
```

* 系统
```sql
    SELECT USER(); -- 系统用户
    SELECT SYSTEM_USER(); -- 系统用户
    SELECT VERSION(); -- 当前mysql的版本
```

* 聚合函数

|函数名|描述|
|----|----|
|COUNT()|计数|
|AVG()|平均值|
|MAX()|最大值|
|MIN()|最小值|
|SUM()|求和|
|...|...|

* COUNT() 函数
```sql
    COUNT(字段) 会忽略所有的null值
    COUNT(*)    不会忽略所有的null值
    COUNT(1)    不会忽略所有的null值
```
* 分组
```sql
    group by 列名 -- 根据那个列名进行分组
    having -- 分组后的过滤条件
```
* MD5() 函数 加密函数

### 事务
**要么都成功，要么都失败**
> 事务原则：ACID原则 原子性、一致性、隔离性、持久性 （脏读、幻读、不可重复读）

* 原子性（Atomicity）
    * 要么都成功，要么都失败
* 一致性（Consistency）
    * 事务前后的数据完整性要保证一致
* 持久性（Durability）
    * 事务一旦提交就不可逆，被持久化到数据库内
* 隔离性（Isolation）
    * 事务的隔离性是多个用户并发访问数据库时，数据库为每一个用户开启的事务，不能被其他事务操作数据所干扰，多个事务之间要相互隔离
    * 隔离所导致的问题‘
        * 脏读：指一个事务读取到了另一个事务未提交的数据
        * 不可重复读：在一个事务内读取表中的某一行数据，多次读取的结果不同。（这不是错误，只是某些场合不对）
        * 幻读：指一个事务读取到了另一个事务所插入的数据，导致前后读取不一致
        
```sql
    -- mysql时默认开启事务自动提交的
    SET autocommit=0 -- 关闭自动提交事务
    SET autocommit=1 -- 开启自动提交事务
    
    
    -- 手动处理事务
    SET autocommit=0 -- 关闭自动提交事务
    
    -- 开启事务 
    START TRANSACTION -- 标记一个事务的开启，从这之后的sql都在同一个事务内
    /*
    sql语句
    ...
    ...
    */
    -- 提交：持久化 (如果成功)
    COMMIT
    -- 回滚：回到最开始的位置 (如果失败)
    ROLLBACK
    
    -- 事务结束
    -- STOP TRANSACTION
    SET autocommit=1 -- 开启自动提交事务
    
    
    -- 其他
    
    SAVEPOINT 保存点名 -- 设置事务保存点
    
    ROLLBACK SAVEPOINT 保存点名 -- 回滚到设置好的事务保存点
    
    RELEASE SAVEPOINT 保存点名 -- 撤销事务保存点
```

* 模拟事务：李四给王五转账500元
```sql
    -- 创建表
    CREATE TABLE `accountInfo`(
            id int not null auto_increment comment '用户id',
            `name` varchar(30) not null comment '用户姓名',
            `password` varchar(50) default MD5('123456') comment '用户密码',
            amount int default 0 comment '用户金额',
            primary key(`id`)
          )engine=innodb default charset=utf8;
    -- 插入数据  
    insert into `accountInfo` (`name`, `password`, amount) values
    ('张三', MD5('zhangsan'), 2000),
    ('李四', MD5('lisi'), 8000),
    ('王五', MD5('wangwu'), 500);
    -- 模拟事务场景
    SET autocommit=0; -- 关闭自动提交事务
    START TRANSACTION;
    -- 李四给王五转账500元
    UPDATE accountInfo SET amount= amount-500 WHERE id = 2;
    UPDATE accountInfo SET amount= amount+500 WHERE id = 3;
    -- 提交事务
    COMMIT;
    -- 回滚
    ROLLBACK;
    set autocommit=1;  -- 开启自动提交事务
SELECT * FROM accountInfo;

```

### 索引
> mysql官方对索引的定义：索引（index）是帮助mysql高效获取数据的数据结构
>提取句子的主干就可以得到索引的本质，索引就是数据结构

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
> 索引的数据结构
* Hash 类型
* Btree INNODB 默认结构

### 用户管理
* 用户表：mysql.user 本质是对这张表进行增删改查
* 常用操作
```sql
    -- 创建用户
    CREATE USER 用户名 IDENTIFIED BY 密码;
    -- 修改密码（修改当前用户）
    SET PASSWORD = PASSWORD(新密码);
    -- 修改密码（修改指定用户）
    SET	PASSWORD FOR 用户名 = PASSWORD(新密码);
    -- 重命名
    RENAME USER 原用户名 TO 新用户名;
    -- 用户授权 ALL PRIVILEGES 全部权限 
    GRANT ALL PRIVILEGES ON 数据库名.表名 TO 用户名;
    -- 查看权限
    SHOW GRANTS FOR 用户名;
    -- 撤销权限
    REVOKE 那些权限 ON 那个库 FROM 谁;
    -- 删除用户
    DROP USER 用户名;
```
### 备份
* 命令行操作
```bash 
    # 导出 表名可不填 不填会到处该数据库的全部表
    mysqldump -h主机 -u用户名 -p密码 数据库名 [表名1[表名2[表名3...]]] > 目标路径+文件名
    # 导入 先登录
    source 目标sql路径
```

### 数据库设计规范
**当数据库比较复杂的时候需要设计数据库了**


* 糟糕的数据库设计：
    * 数据冗余、浪费控件
    * 数据库删除和插入都会麻烦、异常（屏蔽物理外键）
    * 程序性能差
* 良好的数据库设计：
    * 节省内存空间
    * 保证数据库的完整性
    * 方便我们开发
    

**软件开发中，关于数据库的设计**

* 分析需求：分析业务和需要处理的数据库需求
* 概要设计：设计关系ER图

### 三大范式
**为什么需要数据规范化**

* 信息重复
* 更新异常
* 插入异常
    * 无法正常显示信息
* 删除异常
    * 丢失有效信息
    
> 三大范式

**第一范式**

* 原子性：保证每一列不可再分

**第二范式**

* 前提：满足第一范式
* 每张表只描述一件事情

**第三范式**

* 前提：满足第一范式、第二范式
* 要确保数据表中的每一列数据都和主键唯一相关，而不能简介相关

规范数据库设计


**规范性和性能问题**

关联查询的表不能超过三张表

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
