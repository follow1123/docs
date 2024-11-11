---
sidebar_position: 30
---

# JUC锁

## ReentrantLock

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/juc/locks/ReentrantLockTest.java)

* 可中断
* 可以设置超时时间
* 可以设置为公平锁
* 支持多个条件变量
* 可重入
    * 可重入是指同一个线程如果首次获得了这把锁，那么因为它是这把锁的拥有者，因此有权利再次获取这把锁
    * 如果是不可重入锁，那么第二次获得锁时，自己也会被锁挡住

```java
// 获取锁
lock.lock();
try {
    // 代码
    System.out.println(Thread.currentThread());
}finally {
    // 释放锁
    lock.unlock();
}
```

### 可重入

```java
private static void execute(int i) {
    // 获取锁
    lock.lock();
    try {
        if (i == 0) return;
        execute(i - 1);
        // 代码
        System.out.println(Thread.currentThread());
    } finally {
        // 释放锁
        lock.unlock();
    }
}

public static void testReentrant() {
    execute(5);
}
```

### 可打断

```java
Thread thread = new Thread(() -> {
    log.info("enter");
    try {
        lock.lockInterruptibly();
        log.info("get lock");
    } catch (InterruptedException e) {
        log.info("interrupted");
        e.printStackTrace();
        return;
    }
    try {
        log.info("execute");
    } finally {
        log.info("release lock");
        lock.unlock();
    }
});

// 主线程先获取锁
log.info("get lock");
lock.lock();
thread.start();
try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
log.info("interrupt");
thread.interrupt();
```

### 可以设置超时时间

```java
Thread thread = new Thread(() -> {
    log.info("enter");
    try {
        // 立即获取结果
        // boolean succeed = lock.tryLock();
        // 等待1秒，并获取最终的结果
        boolean succeed = lock.tryLock(1, TimeUnit.SECONDS);
        if (!succeed) {
            System.out.println("get lock failed");
            return;
        }
        log.info("get lock");
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    try {
        log.info("execute");
    } finally {
        log.info("release lock");
        lock.unlock();
    }
});

// 主线程先获取锁
log.info("get lock");
lock.lock();
thread.start();
try{Thread.sleep(2000);}catch(InterruptedException e){e.printStackTrace();}
```

### 可以设置为公平锁

```java
final ReentrantLock fairLock = new ReentrantLock(true);
for (int i = 0; i < 10; i++) {
    Thread thread = new Thread(() -> {
        log.info("enter");
        fairLock.lock();
        try {
            if ("thread 0".equals(Thread.currentThread().getName())) {
                try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
            }
            log.info("execute");
        } finally {
            fairLock.unlock();
        }
    });

    thread.setName("thread " + i);
    thread.start();
    if (i == 0) {
        try{Thread.sleep(100);}catch(InterruptedException e){e.printStackTrace();}
    }
}
```

### 支持多个条件变量

```java
Condition c1 = lock.newCondition();
Condition c2 = lock.newCondition();

for (int i = 0; i < 10; i++) {
    boolean flag = i % 2 == 0;
    Thread thread = new Thread(() -> {
        lock.lock();
        log.info("enter");
        try {
            if (flag) {
                try {c1.await();} catch (InterruptedException e) {throw new RuntimeException(e);}
            } else {
                try {c2.await();} catch (InterruptedException e) {throw new RuntimeException(e);}
            }
            log.info("done");
        } finally {
            lock.unlock();
        }
    });
    thread.setName(String.format("thread %d %s", i, flag ? "c1" : "c2"));
    thread.start();
}

// 两秒后唤醒第一批线程
try{Thread.sleep(2000);}catch(InterruptedException e){e.printStackTrace();}
log.info("notify c2");
lock.lock();
c2.signalAll();
lock.unlock();

// 4秒后唤醒第二批线程
try{Thread.sleep(2000);}catch(InterruptedException e){e.printStackTrace();}
log.info("notify c1");
lock.lock();
c1.signalAll();
lock.unlock();
```

## ReentrantReadWriteLock

* 读写锁
* 当读操作远远高于写操作时，这时候使用卖写锁让**读-读**可以并发，提高性能
* 读锁不支持条件变量，读锁的`newCondition`未实现，使用会抛出异常
* 重入时升级不支持：即持有读锁的情况下去获取写锁，会导致获取写锁永久等待
* 重入时降级支持：即持有写锁的情况下去获取读锁

```java
int count = 10;
for (int i = 0; i < count; i++) {
    boolean flag = i % 2 == 0;
    new Thread(() -> {
        if (flag){
            lock.readLock().lock();
            try {
                log.info("num: {}", num);
            }finally {
                lock.readLock().unlock();
            }
        }else {
            lock.writeLock().lock();
            try {
                num = num - 1;
                log.info("update num");
            }finally {
                lock.writeLock().unlock();
            }
        }
    }).start();
}
try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
log.info("num: {}", num);
```

* 测试锁升级，无法升级

```java
new Thread(() -> {
    lock.readLock().lock();
    try {
        log.info("num: {}", num);
        lock.writeLock().lock();
    }finally {
        lock.readLock().unlock();
    }
    try {
        log.info("get write lock");
    }finally {
        lock.writeLock().unlock();
    }
}).start();
```

* 测试锁降级，可以降级

```java
new Thread(() -> {
    lock.writeLock().lock();
    try {
        num = num - 1;
        log.info("update num");
        lock.readLock().lock();
    }finally {
        lock.writeLock().unlock();
    }
    try {
        log.info("get readlock");
    }finally {
        lock.readLock().unlock();
    }
}).start();
```

## StampedLock

* 该类自JDK8加入，是为了进一步优化读性能，它的特点是在使用读锁、写锁时都必须配合**戳**使用
* 加解读锁

```java
long stamp = lock.readLock();
lock.unlockRead(stamp);
```

* 加解写锁

```java
long stamp = lock.writeLock();
lock.unlockWrite(stamp);
```

* 乐观读，StampedLock支持`tryOptimisticRead()`方法（乐观读）读取完毕后需要做一次戳校验如果校验通过，表示这期间确实没有写操作，数据可以安全使用，如果校验没通过，需要重新获取读锁，保证数据安全。

```java
long stamp = lock.tryOptimisticRead();
// 验戳
if(lock.validate(stamp)){
    // 成功，读取数据
}
// 失败，升级为读锁
```

* 使用

```java
private static final StampedLock lock = new StampedLock();

private static int num = 50;

public static void main(String[] args) {
    int count = 100;
    for (int i = 0; i < count; i++) {
        boolean flag = i % 2 == 0;
        new Thread(() -> {
            if (flag){
                try{Thread.sleep(10);}catch(InterruptedException e){e.printStackTrace();}
                long stamp = lock.writeLock();
                log.info("write stamp: {}", stamp);
                try {
                    // try{Thread.sleep(300);}catch(InterruptedException e){e.printStackTrace();}
                    num = num - 1;
                    log.info("update num");
                }finally {
                    lock.unlockWrite(stamp);
                }
            }else {
                long stamp = lock.tryOptimisticRead();
                log.info("optimistic read stamp: {}", stamp);
                if (lock.validate(stamp)){
                    // try{Thread.sleep(100);}catch(InterruptedException e){e.printStackTrace();}
                    log.info("first time num: {}", num);
                    return;
                }
                log.info("update to read lock");
                stamp = lock.readLock();
                try{
                    // try{Thread.sleep(100);}catch(InterruptedException e){e.printStackTrace();}
                    log.info("num: {}", num);
                }finally {
                    lock.unlockRead(stamp);
                }
            }
        }).start();
    }

    try{Thread.sleep(4000);}catch(InterruptedException e){e.printStackTrace();}
    log.info("num: {}", num);
}
```
