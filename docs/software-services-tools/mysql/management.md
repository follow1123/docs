---
sidebar_position: 3
---

# MySQL管理

## 系统数据库

* MySQL数据库安装完成后，自带了以下四个数据库：

| 数据库   | 含义    |
|--------------- | --------------- |
| `mysql`   |  存储MySQL服务器正常运行所需要的各种信息（时区、主从、用户、权限等）  |
| `information_schema` | 提供了访问数据库元数据的各种表和视图，包含数据库、表、字段类型及访问权限等 |
| `performance_schema` | 为MySQL服务器运行时状态供了一个底层监控功能，主要用于收集数据库服务器性能参数 |
| `sys` | 包含了一系列方便DBA和开发人员利用`performance_schema`性能数据库进行性能调优和诊断的视图 |

## 常用工具

| 命令 | 描述 |
| ---  | ---  |
| [mysql](#mysql) | MySQL客户端工具 |
| [mysqladmin](#mysqladmin) | MySQL管理客户端工具 |
| [mysqlbinlog](#mysqlbinlog) | MySQL日志管理工具 |
| [mysqlshow](#mysqlshow) | 对象查找工具 |
| [mysqldump](#mysqldump) | 数据迁移工具 |
| [mysqlimport](#mysqlimport) | 数据导入工具 |
| [source](#source) | 数据导入工具（mysql命令） |

### mysql

* `-u` - 指定用户名
* `-p` - 指定密码
* `-h` - 指定服务器IP或域名
* `-P` - 指定端口
* `-e` - 执行SQL语句并退出

```bash
# 使用用户名登录，-u -P等参数后面不要空格
mysql -u<username> -p -P<port>

# 直接执行SQL语句并退出
mysql -u<username> -p <dbname> -e "select * from <table_name>"
```

### mysqladmin

* 可以用它来检查服务器的配置和当前状态、创建并删除数据库等

```bash
# 查看版本
mysqladmin -u<username> -p version

# 查看系统变量信息
mysqladmin -u<username> -p variables
```

### mysqlbinlog

> 由于服务器生成的二进制日志文件以二进制格式保存，所以如果想要检查这些文本的文本格式，就会使用到mysqlbinlog日志管工具，日志文件在数据目录下的binlog.00000x

* `-d` - 指定数据库名称
* `-o` - 忽略日志中前n行
* `-r` - 输出到指定文件
* `-s` - 显示简洁样式
* `--start-datetime/stop-datetime` - 指定日期间隔内的所有日志
* `--start-position/stop-position` - 指定位置间隔内的所有日志

```bash
# 显示简单格式日志信息
mysqlbinlog -s .\binlog.000001

# 查看指定日期间隔内的所有日志
mysqlbinlog .\binlog.000003 --start-datetime="yyyy-MM-dd HH:mm:ss" --stop-datetime="yyyy-MM-dd HH:mm:ss"
```

### mysqlshow

> 查找存在哪些数据库、数据库中的表、表中的列或者索引

* `--count` - 显示数据库及表的统计信息（数据库，表均可以不指定）
* `-i` - 显示指定据库或者指走表的状态信息

```bash
# 查询每个数据库的表的数量及表中记录的数量
mysqlshow -u<username> -p --count

# 查询指定数据库内表的信息
mysqlshow -u<username> -p <db_name> --count

# 查询指定数据库指定表的信息
mysqlshow -u<username> -p <db_name> <table_name> --count
```

### mysqldump

* 包含`-u`、`-p`、`-h`、`-P`等选项
* `--add-drop-database` - 在每个数据库创建语句前加上`drop database`语句
* `--add-drop-table` - 在每个表创建语句前加上`drop table`语句，默认开启；不开启（--skip-add-drop-table）
* `-n` - 不包含据库的创建语句
* `-t` - 不包含数据表的创建语句
* `-d` - 不包含据
* `-T` - 自动生成两个文件：一个`.sql`文件，创建表结构的语句；一个`.txt`文件，数据文件

```bash
# 备份指定数据库
mysqldump -u<username> -p <db_name>
```

### mysqlimport

* 用来导入txt格式的数据文件

```bash
# 导入指定的数据
mysqlimport -u<username> -p <dbname> <filename>
```

### source

* 导入sql文件，需要连接MySQL后执行

```sql
-- 导入指定sql文件
source <filename>
```
