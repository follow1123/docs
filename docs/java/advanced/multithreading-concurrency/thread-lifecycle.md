---
sidebar_position: 10
---

# 线程生命周期

线程的生命周期分为两个版本

## JDK1.5之前

线程的生命周期有5种状态

* `New` - 新建
* `Runnable` - 就绪
* `Running` - 运行
* `Blocked` - 阻塞
* `Dead` - 死亡

```mdx-code-block
import PopupSvg from '@site/src/components/PopupSvg';
import LifecycleBeforeJDK5 from './assets/lifecycle_before_jdk5.drawio.svg';

<PopupSvg>
    <LifecycleBeforeJDK5 width="100%" height="100%" />
</PopupSvg>
```

## JDK1.5及之后

六种状态，在 `java.lang.Thread.State` 的枚举类中定义

* `NEW` - **新建**，线程刚被创建，还没调用`start()`方法
* `RUNNABLE` - **可运行**，代替就绪和运行状态
* `TERMINATED` - **被终止**，表示此线程已经结束生命周期，终止运行
* `BLOCKED` - **锁阻塞**，一个正在阻塞、等待一个监视器锁的线程的状态
* `TIMED_WAITING` - **计时等待**，一个正在有限时等待另一个线程执行唤醒动作的线程的状态
* `WAITING` - **无限等待**，一个无限期等待另一个线程执行唤醒动作的线程的状态

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_lifecycle/ThreadLifecycleTest.java)

```mdx-code-block
import LifecycleJDK5AndLater from './assets/lifecycle_jdk5_and_later.drawio.svg';

<PopupSvg>
    <LifecycleJDK5AndLater width="100%" height="100%" />
</PopupSvg>
```

### 新建/运行/终止

```java
Thread thread = new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getState()); // RUNNABLE
    }
});
System.out.println(thread.getState()); // NEW
thread.start();

try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}

System.out.println(thread.getState()); // TERMINATED
```

### 锁阻塞

A，B两个线程抢同一把锁，A线程抢到那么A线程进入 `RUNNABLE` 状态，而B线程就进入了 `BLOCKED` 状态

```java
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        synchronized (this) {
            System.out.println(Thread.currentThread().getName() + " get lock");
            try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
        }
    }
};

Thread thread1 = new Thread(runnable);
Thread thread2 = new Thread(runnable);
thread1.start();
thread2.start();

try{Thread.sleep(500);}catch(InterruptedException e){e.printStackTrace();}
// 以下有一个线程的状态是BLOCKED
System.out.println(thread1.getState());
System.out.println(thread2.getState());
```

### 计时等待

* 当前线程使用 `Thread.sleep(milliS)` 睡眠时就进入了这个状态
* 另一个线程在当前线程调用了 `join(millis)` 方法，当前线程进入了这个状态
* 当前线程进入同步代码块内，并调用了锁对象的 `wait(millis)` 方法，就会进入这个状态

```java
// 使用sleep方式
Thread thread1 = new Thread(new Runnable() {
    @Override
    public void run() {
        try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
    }
});
// 使用join方式
Thread thread2 = new Thread(new Runnable() {
    @Override
    public void run() {
        try {thread1.join(500);} catch (InterruptedException e) {throw new RuntimeException(e);}
    }
});
// 使用wait方式
Thread thread3 = new Thread(new Runnable() {
    @Override
    public void run() {
        synchronized (this){
            try {wait(800);} catch (InterruptedException e) {throw new RuntimeException(e);}
        }
    }
});

thread1.start();
thread2.start();
thread3.start();

try{Thread.sleep(200);}catch(InterruptedException e){e.printStackTrace();}
System.out.println(thread1.getState()); // TIMED_WAITING
System.out.println(thread2.getState()); // TIMED_WAITING
System.out.println(thread3.getState()); // TIMED_WAITING
```

### 无限等待

* 另一个线程在当前线程调用了 `join()` 方法，当前线程进入了这个状态，必须等另一个线程执行完
* 当前线程进入同步代码块内，并调用了锁对象的 `wait()` 方法，就会进入这个状态，必须调用锁对象的 `notify()/notifyAll()` 方法唤醒

```java
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        synchronized (this) {
            try {wait();} catch (InterruptedException e) {throw new RuntimeException(e);}
        }
    }
};
// 使用wait方式
Thread thread1 = new Thread(runnable);
// 使用join方式
Thread thread2 = new Thread(new Runnable() {
    @Override
    public void run() {
        try {thread1.join();} catch (InterruptedException e) {throw new RuntimeException(e);}
    }
});

thread1.start();
thread2.start();
try{Thread.sleep(200);}catch(InterruptedException e){e.printStackTrace();}
System.out.println(thread1.getState()); // WAITING
System.out.println(thread2.getState()); // WAITING
```
