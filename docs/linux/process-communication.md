---
sidebar_position: 6
---

# 进程通信

## 信号

### 生命周期

#### 产生

* 硬件终端
* 软件异常
* 用户自定义信号

#### 传递

信号可以从一个进程传递到另一个进程

#### 处理

默认处理方式

* 终止进程
* 忽略

用户自定义处理方式

#### 终止

进程被终止，或不执行任何操作，或执行用户自定义的操作

### 分类

Linux 一共有 64 种信号，编号 1~64

#### 不可靠信号

编号 1~31

信号传递的过程中可能被丢弃

#### 可靠信号

编号 32~64

系统保证该信号不会丢失

### 概念

* 信号递达（Delivery）- 执行信号处理的动作
* 信号未决（Pending）- 信号从产生到递达之间的状态
* 信号阻塞（Block）- 也叫信号屏蔽，信号保持在未决状态

### 注册信号

* `signal(signum, sighandler_t)` - 注册信号并指定该信号的处理函数
* `sigaction(signum, act, oldact)` - 注册信号并指定该信号的处理函数，支持指定处理方式，并阻塞其他信号

### 触发信号

#### 终端按键触发

* <kbd>ctrl</kbd>+<kbd>c</kbd> - 中断，触发 `SIGINT`
* <kbd>ctrl</kbd>+<kbd>\\</kbd> - 退出，触发 `SIGQUIT`
* <kbd>ctrl</kbd>+<kbd>z</kbd> - 停止，触发 `SIGSTP`

#### 系统调用触发

* `kill(pid, sig)` - 发送指定信号给指定进程
    * `pid` 参数说明：&gt;0：发送给指定 pid 的进程，=0：发送给同一进程组的所有进程，=-1：发送给除 pid 为 1 进程之外的所有进程，&lt;-1：发送给这个参数绝对值的指定进程组的所有进程
* `raise(sig)` - 给当前进程发送指定信号
* `sigqueue(pid, sig, value)` - 发送指定信号给指定进程，并携带参数

#### 硬件异常触发

TODO

### 阻塞信号

* `pause()` - 挂起当前进程，收到任意信号后恢复
* `sigsuspend(mask)` - 挂起当前进程，屏蔽 mask 参数指定的信号，收到除屏蔽信号外的信号后恢复
* `sigwait(set, sig)` - 挂起当前进程，收到 set 参数指定的信号后恢复，具体接受到的信号保存在提供的 sig 参数内
* `sigwaitinfo(set, info)` - 挂起当前进程，收到 set 参数指定的信号后恢复，接受信号携带的参数
* `sigtimedwait(set, info, timespec)` - 和 `sigwaitinfo()` 一样，限时等待

### 信号集操作

* `sigemptyset(set)` - 清空信号集内的所有信号
* `sigfillset(set)` - 设置信号集内所有信号
* `sigaddset(set, signum)` - 设置信号集指定信号
* `sigdelset(set, signum)` - 删除信号集指定信号
* `sigismember(set, signo)` - 判断指定信号是否在信号集内
* `sigprocmask(how, set, oldset)` - 操作信号屏蔽集合
    * `SIG_BLOCK` - 屏蔽 set 参数内所有的信号
    * `SIG_UNBLOCK` - 取消屏蔽 set 参数内所有的信号
    * `SIG_SETMASK` - 清空已经屏蔽的信号，只屏蔽新传入信号集内的信号
* `sigpending(set)` - 获取所有未决信号，保存在 set 参数内
* `alarm(seconds)` - 指定 seconds 秒后发送 `SIGALRM` 信号给当前进程
    * 调用这个方法前如果之前调用过这个方法还没触发信号，则取消上一个定时器并返回剩余的时间
* `abort()` - 发送 `SIGABRT` 信号给当前进程，并产生一个 core dump 文件
* `psignal(sig, s)` - 打印信号值对于的名称，s 参数是前缀

## 管道

二进制流读取或写入数据

### 匿名管道

* `pipe(pipefd)` - 创建管道，pipefd 参数是 长度为 2 的数组，用于存储读写文件描述符，`pipefd[0]` 为读，`pipefd[1]` 为写
* `pipe2(pipefd, flags)` - 创建管道，第一个参数和上面一样，flags 表示模式，`O_NONBLOCK`：非阻塞模式，`O_CLOEXEC`：执行 `execve()` 系统调用时关闭管道等

这个管道是往内核空间写入数据，尽量不要同时写入大量数据

### 有名管道

* `mkfifo(pathname, mode)` - 创建有名管道，pathname 是一个特殊的文件，用于读取和写入
    * pathname 文件需要手动创建，这个文件不会存储任何内容，只是标记这个管道，文件的类型是 `p`

## 共享内存

二进制流读取或写入数据

TODO

## 消息队列

以消息为单位读取或写入数据


