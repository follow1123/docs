# 锁/InnoDB引擎

* 锁是计算机协调多个进程或线程并发访问某一资源的机制
* 在数据库中，除传统的计算资源（CPU、RAM、I/O）的争用以外，数据也是一种供许多用户共享的资源
* 如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据库并发访问性能的一个重要因素
* MySQL中的锁，按照锁的粒度分，分为以下三类：
    * **全局锁** - 锁定数据库中的所有表
    * **表级锁** - 每次操作锁住整张表
    * **行级锁** - 每次操作锁住对应的行数据

## 全局锁

* 全局锁就是对整个数据库实例加锁，加锁后整个实例就处于只读状态，后续的DML的写语句，DDL语句，
以及更新操作的事务提交语句都将被阻塞
* 其典型的使用场景是做全库的逻辑备份，对所有的表进行锁定，从而获取一致性视图，保证数据的完整性

### 测试使用全局锁后备份

* 打开两个命令行窗口
* 左边是使用`mysql -uusername -p`登录的session
* 右边是命令行终端

<div style={{display: 'flex'}}>
    <pre style={{flex: 1, margin: '0 2px 0 0'}}>
        <code>
-- 使用指定的数据库
use db_name;<br></br>
-- 以下操作按左右框内的序号执行<br></br>
-- 1. 开启全局锁
flush tables with read lock;<br></br>
-- 3. 释放锁
unlock tables;
        </code>
    </pre>
    <pre style={{flex: 1,margin: '0 0 0 2px'}}>
        <code>
-- 2. 使用mysqldump备份数据库，如果是备份远程的MySQL仓库，则加上-h参数指定ip
mysqldump -uusername -ppassword databasename > filename.sql
        </code>
    </pre>
</div>

* 在不加锁的情况下完成备份可以使用`mysqldump`命令时添加`--single-transaction`参数

```sql
mysqldump --single-transaction -uusername -ppassword databasename > filename.sql
```

### 全局锁问题

* 如果在主库上备份，那么在备份期间都不能执行更新，业务基本上就得停摆
* 如果在从库上备份，那么在备份期间从库不能执行主库同步过来的二进制日志（binlog） ，会导致主从延迟

## 表级锁

* 表级锁，每次操作锁住整张表。锁定粒度大，发生锁冲突的概率最高，并发度最低
* 应用在MyISAM、InnoDB、BDB等存储引擎中
* 表级锁主要分为三类：**表锁**、**元数据锁（meta data lock，MDL）**、**意向锁**

### 表锁

* 表锁分为：**表共享读锁（read lock）** **表独占写锁（write lock）**

```sql
-- 加锁
lock tables 表名... read/write;

-- 释放锁，可以执行以下SQL或客户端断开连接
unlock tables;
```

#### 表共享读锁

* 打开两个命令行窗口，使用`mysql -uusername -p`分别登录两个session

<div style={{display: 'flex'}}>
    <pre style={{flex: 1, margin: '0 2px 0 0'}}>
        <code>
-- 使用指定的数据库
use db_name;<br></br>
-- 给account表添加readlock
lock tables account read;<br></br>
-- 执行查询操作，可以正常查询
select * from account where id = 1;<br></br>
-- 执行修改操作，报错ERROR 1099 (HY000): Table 'account' was locked with a READ lock and can't be updated
update account set money = 1000 where id = 1;
        </code>
    </pre>
    <pre style={{flex: 1,margin: '0 0 0 2px'}}>
        <code>
-- 使用指定的数据库
use db_name;<br></br>
-- 执行查询操作，可以正常查询
select * from account where id = 1;<br></br>
-- 执行修改操作，阻塞，直到account的表锁被释放后执行
update account set money = 2000 where id = 1;
        </code>
    </pre>
</div>

* 测试发现给account表添加**表共享读锁**的session和其他session都只能对account表进行查询操作，无法进行修改操作

#### 表独占写锁

* 打开两个命令行窗口，使用`mysql -uusername -p`分别登录两个session

<div style={{display: 'flex'}}>
    <pre style={{flex: 1, margin: '0 2px 0 0'}}>
        <code>
-- 使用指定的数据库
use db_name;<br></br>
-- 给account表添加readlock
lock tables account write;<br></br>
-- 执行查询操作，可以正常查询
select * from account where id = 1;<br></br>
-- 执行修改操作，可以正常修改
update account set money = 1000 where id = 1;
        </code>
    </pre>
    <pre style={{flex: 1,margin: '0 0 0 2px'}}>
        <code>
-- 使用指定的数据库
use db_name;<br></br>
-- 执行查询操作，阻塞，直到account的表锁被释放后执行
select * from account where id = 1;<br></br>
-- 执行修改操作，阻塞，直到account的表锁被释放后执行
update account set money = 2000 where id = 1;
        </code>
    </pre>
</div>

* 测试发现给account表添加**表独占写锁**的session可以对account表进行读写操作，其他session不能对account表进行读写操作

### 元数据锁

### 意向锁

## 行级锁

