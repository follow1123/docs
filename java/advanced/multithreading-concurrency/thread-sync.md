---
sidebar_position: 20
---

# 线程同步机制

线程同步机制主要用于处理多个线程在访问共享资源时，避免产生数据竞争和不一致的情况

## 同步方法

* 如果操作共享数据的代码完整的声明在一个方法中，那这个方法就可以声明为同步方法

```java title="格式"
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

## 同步代码块

* 需要被同步的代码就是需要操作共享数据的代码
* 需要被同步的代码，在被`synchronized`包裹后，就使得一个线程再操作这些代码的过程中，其他线程必须等待
* 同步监视器（锁）。哪个线程获得了锁，哪个线程就能执行需要被同步的代码
* 同步监视器可以使用任何一个类的对象来充当，但是多个线程必须共用一个同步监视器
* 在实现`Runnable`接口的方式中，同步监视器可以考虑使用`this`
* 在继承`Thread`类的方式中，慎用`this`作为同步监视器，可以使用`当前类.class`对象

```java title="格式"
synchronized(同步监视器){
    // 需要被同步的代码
}
```

* 实现Runnable接口，并使用内部的属性当作同步监视器

<details>
    <summary>实现Runnable接口的类</summary>
```java {1,4,10}
public class TicketWindowRunnable implements Runnable{

    private int tickets = 1000;
    private final Object lock = new Object();

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
}
```
</details>

```java
TicketWindowRunnable twr = new TicketWindowRunnable();

Thread window1 = new Thread(twr, "窗口1");
Thread window2 = new Thread(twr, "窗口2");
Thread window3 = new Thread(twr, "窗口3");

window1.start();
window2.start();
window3.start();
```

* 继承Thread类，用静态属性当作资源，并使用当前的Class当作同步监视器

<details>
    <summary>继承Thread的类</summary>
```java {1,3,14}
public class TicketWindowThread extends Thread{

    private static int tickets = 100;

    public TicketWindowThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        while(true){
            try {Thread.sleep(10);} catch (InterruptedException e) {throw new RuntimeException(e);}
            // 使用当前类的Class对象作为同步监视器
            synchronized (TicketWindowThread.class){
                if (tickets > 0){
                    System.out.println(Thread.currentThread().getName() + "售出一张票，剩余：" + tickets);
                    tickets--;
                }else {
                    break;
                }
            }
        }
    }
}
```
</details>

```java
System.out.println("继承Thread类方式");
TicketWindowThread w1 = new TicketWindowThread("窗口1");
TicketWindowThread w2 = new TicketWindowThread("窗口2");
TicketWindowThread w3 = new TicketWindowThread("窗口3");

w1.start();
w2.start();
w3.start();
```

## Lock（jdk5新增）

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/multithreading/thread_safe/lock/LockTest.java)

* 创建Lock实例
* 执行`lock()`方法，锁定对共享资源的调用
* `unlock()`方法，释放对共享资源的锁定
* 通常配合`try-finally`结构使用

```java {1,9,17}
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
```

