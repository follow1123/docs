---
sidebar_position: 5
---

# Thread

Java语言的JVM可以运行多个线程，使用`java.lang.Thread`类代表**线程**，所有线程对象必须是`Thread`类或其子类的实例
* 每个线程都是通过某个特定`Thread`对象的`run()`方法来完成操作的，因此`run()`方法称为线程执行体
* 通过该`Thread`对象的`start()`方法来启动这个线程，而非直接调用`run()`

## 创建线程的几种方式

### 继承Thread类

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/creation_method/extends_thread/ExtendsThreadTest.java)

* 继承`Thread`类并重写`run()`方法，实例化后调用`start()`方法
    * 也可以创建`Thread`类的匿名子类对象使用
* 线程的`start()`方法不能重复调用，否则报错**IllegalThreadStateException**，必须重新创建线程对象再调用`start()`方法

<details>
    <summary>创建线程</summary>
```java
public class PrintNumber extends Thread{
    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0){
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }
    }
}
```
</details>

```java {2-2,8-17}
// 创建对象
PrintNumber printNumber = new PrintNumber();
printNumber.start();

System.out.println(Thread.currentThread().getName() + " main");

// 创建Thread类的匿名子类对象使用
new Thread(){
    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0){
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }
    }
}.start();
```

### 实现Runnable接口

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/creation_method/impl_runnable/ImplRunnableTest.java)

* 实现`Runnable`接口并实现`run()`方法，在`new Thread()`时传入该对象
    * 也可以创建`Runnalbe`接口的匿名实现类使用

<details>
    <summary>创建线程</summary>
```java
public class PrintNumber implements Runnable{
    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0){
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }
    }
}
```
</details>

```java {4, 9-18}
// 使用实现Runnable接口的类实现
PrintNumber printNumber = new PrintNumber();

new Thread(printNumber).start();

System.out.println(Thread.currentThread().getName() + "main thread");

// 提供Runnable接口的匿名实现类实现
new Thread(new Runnable() {
    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 != 0){
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }
    }
}).start();
```

### 实现Callable(jdk5新增)

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/creation_method/impl_callable/CallableTest.java)

* `call()`方法可以有返回值，可以使用泛型指定返回值类型
* `call()`方法可以抛出异常
* 可以使用`FutureTask`内的`get()`方法获取线程执行的结果，这个操作会阻塞当前线程

```java {2-11,14}
// 实现call方法
Callable callable = new Callable() {
    @Override
    public Object call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        return sum;
    }
};

// 创建FutureTask类包装Callable
FutureTask futureTask = new FutureTask(callable);

// 将futureTask传入Thread内
Thread thread = new Thread(futureTask);
thread.start();

try {
    // 获取线程内执行的结果，这个操作会阻塞当前线程
    Object o = futureTask.get();
    System.out.println(o);
} catch (InterruptedException e) {
    throw new RuntimeException(e);
} catch (ExecutionException e) {
    throw new RuntimeException(e);
}
```

### 使用线程池

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/creation_method/thread_pool/ThreadPoolTest.java)

* 如果并发的线程数量很多，并且每个线程都执行一个时间很短的任务就结束了，这样频繁的创建线程就会大大降低系统的效率，因为频繁创建线程和销毁线程需要时间
* 提前创建好多个线程，放入线程池中，使用时直接获取，使用完放回池中。可以避免频繁的创建销毁、实现重复利用



```java {30,40}
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName() + "---" + i);
        }
    }
};

Runnable runnable1 = new Runnable() {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName() + "---" + i);
        }
    }
};

// 创建线程池
ThreadPoolExecutor pool = (ThreadPoolExecutor) Executors.newFixedThreadPool(10);

// 提交任务，实现Runnable接口的任务
pool.execute(runnable);
pool.execute(runnable1);

// 提交任务，实现Callable接口的任务
// pool.submit(callable)

// 关闭线程池
pool.shutdown();
```

### 几种创建线程方式之间的区别

* 继承Thread类和实现Runnable接口的区别
    * 相同点：都是使用`Thread`对象的`start()`方法启动线程，创建的线程对象都是`Thread`类或其子类
    * 不同点：一个是继承类，一个是实现接口
        * 实现`Runnable`接口的好处：避免了java单基础的局限性，更适合处理共享数据问题
* `Thread`类其实实现了`Runnable`接口，并且`Thread`内部有一个`Runnable`类型的`target`属性，当使用继承的方式时，重写从`Runnable`接口内实现的`run()`方法，而当使用实现接口的方式时，`Thread`内部的`run()`方法就会调用`target`的`run()`方法，这种方法是代理模式

## Thread类

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_methods/ThreadMethodsTest.java)

* 构造器
    * `Thread(String name)`：创建线程并指定线程名
    * `Thread(Runnable target)`：创建线程并目标对象
    * `Thread(Runnable target, String name)`：创建线程并目标对象，并指定线程名
* 常用方法
    * `start()`：启动线程，调用线程的`run()`方法
    * `run()`：线程执行的操作声明处
    * `static currentThread()`：获取当前执行代码对应的线程
    * `getName()`：获取线程名
    * `setName()`：设置线程名
    * `static sleep(long millis)`：使当前线程睡指定毫秒
    * `static yield()`：主动释放CPU的执行权
    * `join()`：在a线程内调用`b.join()`后，a线程会等b线程执行完成后在继续执行，
    如果使用带时间参数的`join(long millis)`则会等待对应的时间
    * `isAlive()`：判断线程是否存活
* 过时方法
    * `stop()`：强行停止线程执行
    * `suspend()`：暂停线程
    * `resume()`：恢复线程
* 线程优先级
    * `getPriority()`：获取线程的优先级
    * `setPriority(int newPriority)`：设置线程的优先级，默认为5，设置范围1~10，可以用`Thread`类的三个常量配置
        * `Thread.MIN_PRIORITY` - 1
        * `Thread.NORM_PRIORITY` - 5
        * `Thread.MAX_PRIORITY` - 10

### 线程名称

```java
// 打印线程名
System.out.println(Thread.currentThread().getName());

// 修改线程名
Thread.currentThread().setName("主线程");

try {
    // 当前线程休眠1秒
    Thread.sleep(1000);
} catch (InterruptedException e) {
    throw new RuntimeException(e);
}

// 打印线程名
System.out.println(Thread.currentThread().getName());
```

### `yield()`

```java
// 子线程打印偶数
new Thread(new Runnable(){
    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + "==" + i);
            }
            // 当i为10的倍数是主动释放CPU的执行权
            if (i % 10 == 0){
                Thread.yield();
            }
        }
    }
}, "sub-thread").start();

// 主线程打印奇数
for (int i = 1; i <= 100; i++) {
    if (i % 2 != 0) {
        System.out.println(Thread.currentThread().getName() + "==" + i);
    }
}
```

### `join()`

```java
// 子线程打印偶数
Thread thread = new Thread(new Runnable() {
    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + "==" + i);
            }
        }
    }
}, "sub-thread");

thread.start();

System.out.println("子线程是否存活：" + thread.isAlive());
// 主线程打印奇数
for (int i = 1; i <= 100; i++) {
    if (i % 2 != 0) {
        System.out.println(Thread.currentThread().getName() + "==" + i);
    }
    // 当主线程打印到25时等待子线程完成后在执行
    if (i == 25){
        try {
            thread.join();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
System.out.println("子线程是否存活：" + thread.isAlive());
```

### `iaAlive()`

```java
// 子线程打印偶数
Thread thread = new Thread(new Runnable() {
    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + "==" + i);
            }
        }
    }
}, "sub-thread");

thread.start();

System.out.println("子线程是否存活：" + thread.isAlive());
// 主线程打印奇数
for (int i = 1; i <= 100; i++) {
    if (i % 2 != 0) {
        System.out.println(Thread.currentThread().getName() + "==" + i);
    }
    // 当主线程打印到25时等待子线程完成后在执行
    if (i == 25){
        try {
            thread.join();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
System.out.println("子线程是否存活：" + thread.isAlive());
```

### 线程优先级

```java
// 子线程打印偶数
Thread thread = new Thread(new Runnable() {
    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + "==" +
                        Thread.currentThread().getPriority() + "==" + i);
            }
        }
    }
}, "sub-thread");

// 设置子线程为最小优先级
thread.setPriority(Thread.MIN_PRIORITY);
thread.start();

// 设置主线程为最大优先级
Thread.currentThread().setPriority(Thread.MAX_PRIORITY);

// 主线程打印奇数
for (int i = 1; i <= 100; i++) {
    if (i % 2 != 0) {
        System.out.println(Thread.currentThread().getName() + "==" +
                Thread.currentThread().getPriority() + "==" + i);
    }
}
```

### interrupt

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/juc/thread_api/InterruptTest.java)

* `interrupt()` - 打断指定线程
* `isInterrupted()` - 判断指定线程是否被打断
* `static interrupted()` - 判断指定线程是否被打断，并清除打断标记
* 打断阻塞的线程

```java
Thread thread = new Thread(() -> {
    log.info("sleep");
    try {
        Thread.sleep(4000);
    } catch (InterruptedException e) {
        log.info("interrupt after exception: {}", Thread.currentThread().isInterrupted());
        e.printStackTrace();
    }
    log.info("done");
});
thread.start();

try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
log.info("interrupt");
thread.interrupt();
log.info("isInterrupted: {}", thread.isInterrupted());
```

* 打断正在运行的线程

```java
Thread thread = new Thread(() -> {
    while (true) {
        log.info("running");
        if (Thread.currentThread().isInterrupted()){
            log.info("break");
            break;
        }
    }
});
thread.start();

try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
log.info("interrupt");
thread.interrupt();
log.info("isInterrupted: {}", thread.isInterrupted());
```

* 打断使用park()方法阻塞的线程

```java
Thread thread = new Thread(() -> {
    log.info("step 1");
    LockSupport.park();
    // System.out.println(Thread.currentThread().isInterrupted());
    System.out.println(Thread.interrupted());
    log.info("step 2");

    /*
        只是线程不会阻塞，因为park方法判断如果打断标记为true时就不会执行
        上面可以使用Thread.interrupted()输出后清除打断标记
     */
    LockSupport.park();
    log.info("step 3");
});
thread.start();

try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
log.info("interrupt");
thread.interrupt();
```


### 守护线程

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/juc/thread_api/DaemonTest.java)

* 非守护线程

```java
Thread thread = new Thread(() -> {
    while (true) {
        try{Thread.sleep(100);}catch(InterruptedException e){e.printStackTrace();}
        log.info("execute");
    }
});

thread.start();
try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
log.info("done");
```

* 守护线程

```java
Thread thread = new Thread(() -> {
    while (true) {
        try{Thread.sleep(100);}catch(InterruptedException e){e.printStackTrace();}
        log.info("execute");
    }
});

thread.setDaemon(true);
thread.start();

try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
log.info("done");
```
