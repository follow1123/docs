---
sidebar_position: 5
---

# 多线程

## 程序、进程和线程

* **程序（program）**：为完成特定的任务，用某种语言编写的一组指令的集合。及指**一段静态的代码**
* **进程（process）**：程序的一次执行过程，或是正在内存中运行的应用程序
    * 每个进程都有一个独立的内存空间，系统运行一个程序既是一个进程从创建、运行到消亡的过程（生命周期）
    * 程序时静态的，进程是动态的
    * 进程作为**操作系统调度和分配资源的最小单位**（系统运行程序的基本单位），
    系统在运行时会为每个进程分配不同的内存区域
* **线程（thread）**：进程可进一步细化为线程，是程序内部的一条执行路径，一个进程中至少有一个线程
    * 一个进程同一时间若**并行**执行多个线程，就是支持多线程的。
    * 线程作为**CPU调度和执行的最小单位**
    * 一个进程中多个线程共享相同的内存单元，但多个线程操作共享的系统资源可能就会带来安全隐患
    * JVM就是一个进程，JVM内部的**虚拟机栈**、**本地方法栈**、**程序计数器**每个线程各有一份，
    只有**方法区**和**堆**是线程共享的

### 线程调度

* **分时调度**：所有线程轮流使用CPU的使用权，并且平均分配每个线程占用CPU的时间
* **抢占式调度**：让**优先级高**的线程以较大的概率优先使用CPU。如果线程的优先级相同，
那么会随机选择一个（线程随机性），java使用的为抢占式调度

### 并行与并发

* **并行（parallel）**：指两个或多个事件在**同一时刻**发生（同时发生）。
有多条指令在多个CPU上同时执行。
* **并发（concurrency）**：指两个或多个时间在**同一时间段内**发生。
有多条指令在单个CPU上快速轮换、交替执行，使得在宏观上具有多个进程同时执行的效果

---

## Java内创建和使用线程

* java语言的JVM运行程序运行多个线程，使用`java.lang.Thread`类代表**线程**，
所有线程对象必须是`Thread`类或其子类的实例
* 每个线程都是通过某个特定`Thread`对象的`run()`方法来完成操作的，因此`run()`方法称为线程执行体
* 通过该`Thread`对象的`start()`方法来启动这个线程，而非直接调用`run()`

### 继承Thread类

* 继承`Thread`类并重写`run()`方法，实例化后调用`start()`方法
    * 也可以创建`Thread`类的匿名子类对象使用
* 线程的`start()`方法不能重复调用，否则报错**IllegalThreadStateException**，
必须重新创建线程对象再调用`start()`方法

#### 代码实例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/creation_method/extends_thread/ExtendsThreadTest.java)

* 创建线程

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

* 测试

```java
public static void main(String[] args) {
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

}
```

### 实现Runnable接口

* 实现`Runnable`接口并实现`run()`方法，在`new Thread()`时传入该对象
    * 也可以创建`Runnalbe`接口的匿名实现类使用

#### 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/creation_method/impl_runnable/ImplRunnableTest.java)

* 创建线程

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

* 测试

```java
public static void main(String[] args) {

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
}
```

### 实现Callable(jdk5新增)

* `call()`方法可以有返回值，可以使用泛型指定返回值类型
* `call()`方法可以抛出异常
* 可以使用`FutureTask`内的`get()`方法获取线程执行的结果，这个操作会阻塞当前线程

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/creation_method/impl_callable/CallableTest.java)

```java
public static void main(String[] args) {

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

}
```

### 使用线程池

* 如果并发的线程数量很多，并且每个线程都执行一个时间很短的任务就结束了，
这样频繁的创建线程就会大大降低系统的效率，因为频繁创建线程和销毁线程需要时间
* 提前创建好多个线程，放入线程池中，使用时直接获取，使用完放回池中。可以避免频繁的创建销毁、
实现重复利用


> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/creation_method/thread_pool/ThreadPoolTest.java)

```java
public static void main(String[] args) {
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
    // 设置线程池最大线程数量
    pool.setMaximumPoolSize(16);

    // 提交任务，实现Runnable接口的任务
    pool.execute(runnable);
    pool.execute(runnable1);

    // 提交任务，实现Callable接口的任务
    // pool.submit(callable)

    // 关闭线程池
    pool.shutdown();
}
```

### 几种创建线程方式之间的区别

* 继承Thread类和实现Runnable接口的区别
    * 相同点：都是使用`Thread`对象的`start()`方法启动线程，创建的线程对象都是`Thread`类或其子类
    * 不同点：一个是继承类，一个是实现接口
        * 实现`Runnable`接口的好处：避免了java单基础的局限性，更适合处理共享数据问题
    * `Thread`类其实实现了`Runnable`接口，并且`Thread`内部有一个`Runnable`类型的`target`属性，
    当使用继承的方式时，重写从`Runnable`接口内实现的`run()`方法，而当使用实现接口的方式时，
    `Thread`内部的`run()`方法就会调用`target`的`run()`方法，这种方法是代理模式

## Thread类

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
    * `setPriority(int newPriority)`：设置线程的优先级，默认为5，设置范围1~10，
    可以用`Thread`类的三个常量配置
        * `Thread.MIN_PRIORITY`:1 `Thread.NORM_PRIORITY`:5 `Thread.MAX_PRIORITY`:10

### 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_methods/ThreadMethodsTest.java)

```java
public class ThreadMethodsTest {
    
    @Test
    public void testCurrentThread() {
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
    }
    
    
    @Test
    public void testYield() {
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
    }

    @Test
    public void testJoin() {
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
    }

    @Test
    public void testPriority() {
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
    }

}
```

---

## 线程的生命周期

### JDK1.5之前

* 线程的生命周期有5种状态：**新建（New）**、**就绪（Runnable）**、**运行（Running）**、
**阻塞（Blocked）**、**死亡（Dead）**。

![jdk1.5前的线程生命周期](/img/java/Snipaste_2024-09-19_16-46-46.png)

### JDK1.5及之后

* 六种状态，在`java.lang.Thread.State`的枚举类中定义
    * **NEW(新建)**：线程刚被创建，还没调用`start()`方法
    * **RUNNABLE(可运行)**：代替就绪和运行状态
    * **TERMINATED(被终止)**：表示此线程已经结束生命周期，终止运行
    * **BLOCKED(锁阻塞)**：一个正在阻塞、等待一个监视器锁的线程的状态
        * A，B两个线程抢同一把锁，A线程抢到那么A线程进入`RUNNABLE`状态，而B线程就进入了`BLOCKED`状态
    * **TIMED_WAITING(计时等待)**：一个正在有限时等待另一个线程执行唤醒动作的线程的状态
        * 当前线程使用`Thread.sleep(milliS)`睡眠时就进入了这个状态
        * 另一个线程在当前线程调用了`join(millis)`方法，当前线程进入了这个状态
        * 当前线程进入同步代码块内，并调用了锁对象的`wait(millis)`方法，就会进入这个状态
    * **WAITING(无限等待)**：一个无限期等待另一个线程执行唤醒动作的线程的状态
        * 另一个线程在当前线程调用了`join()`方法，当前线程进入了这个状态，必须等另一个线程执行完
        * 当前线程进入同步代码块内，并调用了锁对象的`wait()`方法，就会进入这个状态，
        必须调用锁对象的`notify()/notifyAll()`方法唤醒

![jdk1.5及之后的线程生命周期](/img/java/Snipaste_2024-09-20_17-04-30.png)

#### 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_lifecycle/ThreadLifecycleTest.java)

```java
/**
 * 线程生命周期测试，JDK1.5及之后
 */
public class ThreadLifecycleTest {

    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 测试线程创建，运行和终止
     */
    @Test
    public void testNewRunnableTerminated() {
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getState()); // RUNNABLE
            }
        });
        System.out.println(thread.getState()); // NEW
        thread.start();

        sleep(1000);

        System.out.println(thread.getState()); // TERMINATED
    }

    /**
     * 测试竞争锁等待
     */
    @Test
    public void testBlocked() {
        Object lock = new Object();
        Thread[] threads = new Thread[2];
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                synchronized (lock) {
                    System.out.println(Thread.currentThread().getName() + " get lock");
                    // 获取锁后打印所有线程的状态
                    System.out.println(threads[0].getName() + "---" + threads[0].getState());
                    System.out.println(threads[1].getName() + "---" + threads[1].getState());
                }
            }
        };

        Thread thread1 = new Thread(runnable);
        Thread thread2 = new Thread(runnable);
        threads[0] = thread1;
        threads[1] = thread2;

        thread1.start();
        thread2.start();

        sleep(1000);
    }

    /**
     * 测试有限期等待
     */
    @Test
    public void testTimedWaiting() {
        // 使用sleep方式
        Thread thread1 = new Thread(new Runnable() {
            @Override
            public void run() {
                sleep(1000);
            }
        });
        // 使用join方式
        Thread thread2 = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    thread1.join(500);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        });
        // 使用wait方式
        Object lock = new Object();
        Thread thread3 = new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (lock){
                    try {
                        lock.wait(800);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        });

        thread1.start();
        thread2.start();
        thread3.start();

        sleep(200);
        System.out.println(thread1.getState()); // TIMED_WAITING
        System.out.println(thread2.getState()); // TIMED_WAITING
        System.out.println(thread3.getState()); // TIMED_WAITING
    }

    /**
     * 测试无限期等待
     */
    @Test
    public void testWaiting() {
        // 使用wait方式
        Object lock = new Object();
        Thread thread1 = new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (lock){
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        });
        // 使用join方式
        Thread thread2 = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    thread1.join();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        });

        thread1.start();
        thread2.start();

        sleep(200);
        System.out.println(thread1.getState()); // WAITING
        System.out.println(thread2.getState()); // WAITING

        // 打印后唤醒thread2
        synchronized (lock){
            lock.notify();
        }

    }
}
```

---

## 线程安全问题

* 当我们使用多个线程访问**同一资源**（可以是同一变量，同一个文件，同一条记录等）的时候，
若多个线程只有**读操作**，那么不会发生线程安全问题。但是如果多个线程对资源有**读和写**操作，
就容易出现线程安全问题

### 模拟三个窗口同时出售票

* 此时就会出现票重复出售的问题

```java
Runnable runnable = new Runnable() {
    private int tickets = 100;

    @Override
    public void run() {
        while(true){
            if (tickets > 0){
                System.out.println(Thread.currentThread().getName() + "售出一张票，剩余：" + tickets);
                tickets--;
            }else {
                break;
            }
        }
    }
};

Thread window1 = new Thread(runnable, "窗口1");
Thread window2 = new Thread(runnable, "窗口2");
Thread window3 = new Thread(runnable, "窗口3");

window1.start();
window2.start();
window3.start();
```

### synchronized同步代码块

* 格式

```java
synchronized(同步监视器){
    // 需要被同步的代码
}
```

* 需要被同步的代码就是需要操作共享数据的代码
* 需要被同步的代码，在被`synchronized`包裹后，就使得一个线程再操作这些代码的过程中，其他线程必须等待
* 同步监视器（锁）。哪个线程获得了锁，哪个线程就能执行需要被同步的代码
* 同步监视器可以使用任何一个类的对象来充当，但是多个线程必须共用一个同步监视器
* 在实现`Runnable`接口的方式中，同步监视器可以考虑使用`this`
* 在继承`Thread`类的方式中，慎用`this`作为同步监视器，可以使用`当前类.class`对象


> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_safe/synchronized_block/SynchronizedBlockTest.java)

```java
/**
 * 用实现Runnable接口的方式实现synchronized同步代码块解决重复卖票问题
 */
public static void testSynchronizedBlockWhitRunnable() {
    System.out.println("runnable接口方式");
    Runnable runnable = new Runnable() {
        private int tickets = 1000;

        private Object lock = new Object();

        @Override
        public void run() {
            while(true){
                // 这里可以使用this当同步监视器
                synchronized (lock){
                    if (tickets > 0){
                        System.out.println(Thread.currentThread().getName() + "售出一张票，剩余：" + tickets);
                        tickets--;
                    }else {
                        break;
                    }
                }
            }
        }
    };

    Thread window1 = new Thread(runnable, "窗口1");
    Thread window2 = new Thread(runnable, "窗口2");
    Thread window3 = new Thread(runnable, "窗口3");

    window1.start();
    window2.start();
    window3.start();

}
/**
 * 用继承Thread类的方式实现synchronized同步代码块解决重复卖票问题
 */
public static void testSynchronizedBlockWhitThread() {

    System.out.println("继承Thread类方式");
    TicketWindow w1 = new TicketWindow();
    TicketWindow w2 = new TicketWindow();
    TicketWindow w3 = new TicketWindow();
    w1.setName("窗口1");
    w2.setName("窗口2");
    w3.setName("窗口3");

    w1.start();
    w2.start();
    w3.start();
}
```

### 同步方法

* 如果操作共享数据的代码完整的声明在一个方法中，那这个方法就可以声明为同步方法
* 格式

```java
public synchronized void methodName(){
    // 需要被同步的代码
}
```

* 非静态的同步方法，默认的同步监视器是`this`
* 静态的同步方法，默认的同步监视器是`当前类.class`

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_safe/synchronized_method/SynchronizedMethodTest.java)

```java
/**
 * 用实现Runnable接口的方式实现同步方法解决重复卖票问题
 */
public static void testSynchronizedMethodWhitRunnable() {
    System.out.println("runnable接口方式");
    Runnable runnable = new Runnable() {
        private int tickets = 1000;

        public synchronized void sale(){
            if (tickets > 0){
                System.out.println(Thread.currentThread().getName() + "售出一张票，剩余：" + tickets);
                tickets--;
            }
        }

        @Override
        public void run() {
            while(true){
                this.sale();
            }
        }
    };

    Thread window1 = new Thread(runnable, "窗口1");
    Thread window2 = new Thread(runnable, "窗口2");
    Thread window3 = new Thread(runnable, "窗口3");

    window1.start();
    window2.start();
    window3.start();

}

/**
 * 用继承Thread类的方式实现方法解决重复卖票问题
 */
public static void testSynchronizedMethodWhitThread() {

    System.out.println("继承Thread类方式");
    TicketWindow w1 = new TicketWindow();
    TicketWindow w2 = new TicketWindow();
    TicketWindow w3 = new TicketWindow();
    w1.setName("窗口1");
    w2.setName("窗口2");
    w3.setName("窗口3");

    w1.start();
    w2.start();
    w3.start();
}
```

---

## 线程同步机制

### 单例模式的线程安全问题

* **饿汉式**不存在线程安全问题，主要说明**懒汉式**

#### 懒汉式线程安全问题

* 如果获取实例的方法内部有耗时操作，此时多个线程进入这个方法时都会进入为空判断，
卡在耗时操作处，最后创建多个实例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_safe/singleton/SingletonTest.java)

* 单例类

```java
public class SingletonObj {

    private SingletonObj(){}

    private static SingletonObj instance;

    public static SingletonObj getInstance(){
        if(instance == null){
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            instance = new SingletonObj();
        }

        return instance;
    }
}
```

* 测试

```java
/**
 * 测试懒汉式线程安全问题
 */
@Test
public void testSingletonNotSafe() {
    SingletonObj[] singletonObjs = new SingletonObj[2];

    Thread thread = new Thread(new Runnable() {
        @Override
        public void run() {
            singletonObjs[0] = SingletonObj.getInstance();
        }
    });
    thread.start();

    singletonObjs[1] = SingletonObj.getInstance();


    // 等待子线程执行完
    try {
        thread.join();
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    }
    // 判断子线程和主线程创建的两个对象是否相同
    System.out.println(Arrays.toString(singletonObjs));
    System.out.println(singletonObjs[0] == singletonObjs[1]);
}
```

#### 解决懒汉式线程安全问题的方式

##### 同步方法

* 直接将获取实例的方法声明为同步方法
* 这种方式效率较低

##### 双重检测锁

* 这种方式就是细化同步代码块，使同步代码块只包裹到需要同步的代码
* 进入方法时先判断实例是否为空，有则直接返回，没有才进入同步代码块
* 进入同步代码块内再判断一次实例是否为空，以防有线程已经过了第一道检测等在同步代码块外面
* 相比同步方法提高了效率
* 使用这种方式需要在实例属性上添加`volatile`关键字，防止**指令重排**
    * 创建对象时在JVM层面会执行多个步骤，有可能对象已经实例化，但没执行`init`方法，
    这样获取到的对象就有问题，所以需要添加`volatile`关键字将创建对象的步骤原子化

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_safe/singleton/SingletonTest.java)

* 单例类

```java
public class SingletonObjDCL {

    private SingletonObjDCL() {
    }

    /*
    这里需要加上volatile关键字
    创建对象时在JVM层面会执行多个步骤，有可能对象已经实例化，但没执行<init>方法
    这样获取到的对象就有问题，所以需要添加volatile关键字将创建对象的步骤原子化
     */
    private static volatile SingletonObjDCL instance;

    public static synchronized SingletonObjDCL getInstance() {
        if (instance == null) {
            synchronized (SingletonObjDCL.class) {
                if (instance == null) {
                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    instance = new SingletonObjDCL();
                }
            }
        }

        return instance;
    }
}
```

### 死锁

* 不同的线程分别占用对方需要的同步资源不放弃，都在等待对方放弃自己需要的同步资源，
就形成了线程的死锁
* 一旦出现了死锁，整个程序既不会发生异常，也不会给出任何提示，只是所有线程处于阻塞状态，无法继续

#### 诱发死锁的原因以及解决方式

* 这4个条件同时出现就会触发死锁：**互斥条件**，**占用且等待**，**不可抢夺**，**循环等待**
* 解决方式：
    * **互斥条件**：基本上无法破坏
    * **占用且等待**：考虑一次性申请所有需要的资源，就不用等待
    * **不可抢夺**：已经占用了部分资源再申请另一部分资源时，如果申请不到就主动释放已经占用的资源
    * **循环等待**：考虑将申请资源改为线性顺序

#### 死锁代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_safe/deadlock/DeadLockTest.java)

```java
public class DeadLockTest {

    private static void sleep(long millis){
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {

        Object[] locks = new Object[]{new Object(), new Object()};

        new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (locks[0]){
                    sleep(100); // 模拟耗时操作
                    synchronized (locks[1]){
                        System.out.println(Thread.currentThread().getName() + "执行");
                    }
                }
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (locks[1]){
                    sleep(100); // 模拟耗时操作
                    synchronized (locks[0]){
                        System.out.println(Thread.currentThread().getName() + "执行");
                    }
                }
            }
        }).start();

    }
}
```

### Lock使用（jdk5新增）

* 创建Lock实例
* 执行`lock()`方法，锁定对共享资源的调用
* `unlock()`方法，释放对共享资源的锁定
* 通常配合`try-finally`结构使用


> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_safe/lock/LockTest.java)

```java
public static void main(String[] args) {

    ReentrantLock lock = new ReentrantLock();
    Runnable runnable = new Runnable() {
        private int tickets = 100;

        @Override
        public void run() {
            while(true){
                try{
                    lock.lock();
                    if (tickets > 0){
                        System.out.println(Thread.currentThread().getName() + "售出一张票，剩余：" + tickets);
                        tickets--;
                    }else {
                        break;
                    }
                }finally {
                    lock.unlock();
                }
            }
        }
    };

    Thread window1 = new Thread(runnable, "窗口1");
    Thread window2 = new Thread(runnable, "窗口2");
    Thread window3 = new Thread(runnable, "窗口3");

    window1.start();
    window2.start();
    window3.start();
}
```

---

## 线程通信

当我们需要多个线程来共同完成一件任务，并且我们希望它们有规律的执行，那么多线程之间需要一些通信机制，
可以协调它们的工作，以此实现多线程共同操作一份数据


### 等待唤醒机制

* 在一个线程满足某个条件时，就会进入等待状态（`wait()/wait(time)`），
等待其它线程执行完它们指定代码过后再将其唤醒（`notify()`）；或可以指定等待的时间，
等时间到了自动唤醒；有多个线程进行等待时，如果需要，可以使用`notifyAll()`来唤醒所以的等待线程。
**wait/notify**就是线程间的一种协作机制
    * **wait()**：线程不再活动，不在参与调度，进入wait set中，因此不会浪费CPU资源，
    也不会去竞争锁了，这时的线程状态是**WAITING**或**TIMED_WAITING**。它还要等着别的线程执行一个特别的动作，
    即notify或等待时间到，在这个对象上等待的线程从wait set中释放出来，重新进入到调度队列ready queue中
    * **notify()**：选取wait set中的一个线程释放
    * **notifyAll()**：选取wait set中的所有线程释放
    * 这三个方法的使用必须在同步代码块中使用
    * 这三个方法的调用者必须是同步监视器（锁）
* `wait()`和`sleep()`的区别
    * `wait()`必须在同步代码块内使用，`sleep()`可以在任意位置使用
    * `wait()`等待后会释放同步监视器（锁），`sleep()`睡眠后不会释放

#### 两个线程依次打印数字

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_communication/ThreadCommunicationTest.java)

```java
public static void main(String[] args) {

    Runnable runnable = new Runnable() {
        private int number = 1;

        @Override
        public void run() {
            while(true){
                synchronized (this) {
                    notify(); //  唤醒等待中的线程
                    if (number <= 100){
                        try {
                            Thread.sleep(50);
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                        System.out.println(Thread.currentThread().getName() + "---" + number);
                        number++;
                        try {
                            wait(); // 释放同步监视器（锁）并进入WAITING状态
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                    }else {
                        break;
                    }
                }
            }
        }
    };

    Thread thread1 = new Thread(runnable, "线程1");
    Thread thread2 = new Thread(runnable, "线程2");
    thread1.start();
    thread2.start();
}
```

#### 生产者消费者

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_communication/producer_comsumer/ProducerConsumerTest.java)
