---
sidebar_position: 3
---

# InnoDB引擎

## 存储引擎说明

* MySQL体系结构

![MySQL体系结构图](/img/software-services-tools/20210303232240506.png)

* **连接层**：最上层是一些客户端和链接服务，主要完成一些类似于连接处理、授权认证、及相关安全方案
* **服务层**：第二层主要完成大多数的核心服务功能，如SQL接口，并完成缓存的查询，
SQL的分析和优化，部分内置函数的执行。所有跨存储引擎的功能也在这一层实现，过程、函数等
* **引擎层**：存储引擎负责MySQL中数据的存储和提取，服务器通过API和存储引擎进行通信。
不同的存储引擎具有不同的功能，可以选择合适的存储引擎或自定义存储引擎
* **存储层**：主要将数据存储在文件系统上，并完成与存储引擎的交互

### 存储引擎简介

* 存储引擎就是存储数据、建立索引、更新/查询数据等技术的实现方式。存储引擎是基于表的，
而不是基于库的，所以存储引擎也可以称为表类型

```sql
-- 建表时指定存储引擎
CREATE TABLE 表名(
    字段1 字段1类型 [COMMENT '字段1注释'],
    字段2 字段2类型 [COMMENT '字段2注释'],
    字段3 字段3类型 [COMMENT '字段3注释'],
    ...
    字段N 字段N类型 [COMMENT '字段N注释']
) ENGINE=INNODB [COMMENT '表注释'];

-- 查看数据库支持的存储引擎
SHOW ENGINES;
```

### MyISAM存储引擎

* MyISAM是早期的默认存储引擎
* 不支持事务，不支持外键。支持表锁，不支持行锁。访问速度快
* 相关文件
    * **table_name.sdi**：存储表结构信息，就是json文件
    * **table_name.MYD**：存储数据
    * **table_name.MYI**：储存索引

### Memory存储引擎

* Memory引擎的表数据是存储在内存中的，由于受到硬件问题、或断电问题的影响，
只能将这些表作为作为临时表或缓存使用
* 内存存放，hash索引（默认）
* 只有**table_name.sdi**文件来存储表结构信息

### 存储引擎对比

| 特点    | InnoDB    | MyISAM    | Memory    |
|---------------- | --------------- | --------------- | --------------- |
| **存储限制**    | 64TB    | 有    | 有    |
| **事务安全**    | 支持   | -   | -   |
| **锁机制**   | 行锁   | 表锁   | 表锁   |
| **B+Tree索引** | 支持 | 支持 | 支持 |
| **Hash索引** | - | - | 支持 |
| **全文索引** | 支持（5.6版本后） | 支持 | - |
| **空间使用** | 高 | 低 | N/A |
| **内存使用** | 高 | 低 | 中等 |
| **批量插入速度** | 低 | 高 | 高 |
| **支持外键** | 支持 | - | - |

---

## InnoDB存储引擎

* InnoDB是一种兼顾高可靠和高性能的通用存储引擎，在MySQL5.5之后，InnoDB是默认的存储引擎
* InnoDB的**DML**操作遵循**ACID**模型，支持**事务**。
InnoDB支持**外键**FOREIGN KEY约束，保证数据的完整性和正确性。支持**行级锁**，提高并发访问性能
* **table_name.ibd**文件：InnoDB引擎的每张表都会对应这样一张表空间文件，存储该表的表结构（frm、sdi）、
    数据和索引，使用`SHOW VARIABLES LIKE 'innodb_file_per_table';`查看**每张表是否有单独的表空间文件**配置是否打开

### 逻辑存储结构

![InnoDB逻辑存储结构图](/img/software-services-tools/Snipaste_2024-09-20_22-01-28.png)

#### 表空间（TableSpace）

* 表空间（ibd文件），一个MySQL实例可以对应多个表空间，用于存储记录、索引等数据

#### 段（Segment）

* 段，分为数据段（Leaf node segment）、索引段（Non-leaf node segment）、回滚段（Rollback segment）
* InnoDB是索引组织表，数据段就是B+树的叶子节点，索引段即为B+树的非叶子节点。段用来管理多个Extent（区）

#### 区（Extent）

* 区，表空间的单元结构，每个区的大小为1M。默认情况下InnoDB存储引擎页大小为16K，即一个区中一共有64个连续的页

#### 页（Page）

* 页是InnoDB存储引擎磁盘管理的最小单元，每个页的大小默认为16KB，为了保证页的连续性，InnoDB存储引擎每次从磁盘申请4-5个区

##### 行（Row）

* 行，InnoDB存储引擎数据是按行进行存放的
    * `Trx_id` - 每次对某条记录进行改动时，都会把对应的事务id赋值给`trx_id`隐藏列
    * `Roll_pointer` - 每次对某条引记录进行改动时，都把旧的版本写入到undo日志中，然后个隐藏列就相当于一个指针，可以通过它来找到该记录修改前的信息

### 架构

* 左侧为内存结构，右侧为磁盘结构

![架构](/img/software-services-tools/innodb-architecture-8-0.png)

#### 内存结构

##### Buffer Pool

* 缓冲池是主内存中的一个区域，里面可以缓存磁盘上经常操作的真实数据，在执行增删改查操作时，先操作缓冲池中的数据（若缓冲池没有数据，则从磁盘加载并缓存），然后再以一定频率刷新到磁盘，从而减少磁盘IO，加快处理速度
* 缓冲池以页（Page）为单位，底层采用链表数据结构管理Page。根据状态，将Page分为三种类型：
    * `free page` - 空闲page，未被使用
    * `clean page`- 被使用page，数据没有被修改过
    * `dirty page` - 脏页，被使用page，数据被修改过，池中数据与磁盘的数据产生了不一致

##### Change Buffer

* 更改缓冲区（针对于非唯一二级索引页）在执行DML语句时，如果这些数据Page没有在**Buffer Pool**中，不会直接操作磁盘，而会将数据变更存在更改缓冲区**Change Buffer**中，在未来数据被读取时再将数据合并恢复到**Buffer Pool**中，再将合并后的数据刷新到磁盘中
* 与聚集索引不同，二级索引通常是非唯一的，并且以相对随机的顺序插入二级索引。同样，删除和更新可能会影响索引树中不相邻的二级索引页，如果每一次都操作磁盘，会造成大量的磁盘IO，有了**Change Buffer**之后，我们可以在缓冲池中进行合并处理，减少磁盘

##### Adaptive Hash Index

* 自适应hash索引，用于优化对**Buffer Pool**数据的查询。InnoDB存储引擎会监控对表上各索引页的查询，如果观察到hash索引可以提升速度，则建立hash索引，称之为自适应hash索引
* 自适应哈希索引，无需人工干预，是系统根据情况自动完成
* 参数：`show variables like '%adaptive_hash_index%';`

##### Log Buffer

* 日志缓冲区，用来保存要写入到磁盘中的log日志数据（redo log、undo log），默认大小为16M，日志缓冲区的日志会定期刷新到磁盘中。如果需要更新、插入或删除许多行的事务，增加日志缓冲区的大小可以节省磁盘I/O
* 参数：
    * `innodb_log_buffer_size` - 缓存区大小
    * `innodb_flush_log_at_trx_commit` - 日志刷新到磁盘的时机
        * `0` - 每秒将日志写入并刷新到磁盘一次
        * `1` - 日志在每次事务提交时写入并刷新到磁盘
        * `2` - 日志在每次事务提交后写入，并每秒刷新到磁盘

#### 磁盘结构

* MySQL默认文件存放在`/var/lib/mysql`目录下

##### System Tablespace

* 系统表空间是更改缓冲区的存储区域。如果表是在系统表空间而不是每个表文件或通用表空间中创建的，它也可能包含表和索引数据。（在MySQL5.x版本中还包含InnoDB数据字典、undolog等）
* 参数：`innodb_data_file_path`

##### File-Per-Table Tablespaces

* 每个表的文件表空间包含单个InnoDB表的数据和索引，并存储在文件系统上的单个数据文件中
* 参数：`innodb_file_per_table`

##### General Tablespaces

* 通用表空间，需要通过`CREATE TABLESPACE`语法创建通用表空间，在创建表时，可以指定该表空间

```sql
-- 创建表空间
create tablespace <ts_name> add datafile '<filename>.ibd' engine=innodb;

-- 创建表时指定存放在哪个表空间
create table ... tablespace <ts_name>;
```

##### Undo Tablespaces

* 撤销表空间，MySQL实例在初始化时会自动创建两个默认的undo表空间（初始大小16M ），用于存储undo log日志

##### Temporary Tablespaces

* InnoDB使用会话临时表空间和全局临时表空间。存储用户创建的临时表等数据

##### Doublewrite Buffer Files

* 双写缓冲区，InnoDB引擎将数据页从**Buffer Pool**刷新到磁盘前，先将数据页写入双写缓冲区文件中，便于系统异常时恢复数据
* 相关文件：`#ib_16384_0.dblwr`，`#ib_16384_1.dblwr`

##### Redo Log

* 重做日志，是用来实现事务的持久性。该日志文件由两部分组成：重做日志缓冲（redo log buffer）以及重做日志文件（redo log），前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都会存到该日志中，用于在刷新脏页到磁盘时，发生错误时，进行数据恢复使用
* 以循环方式写入重做日志文件

### 事务原理

### MVCC


