---
sidebar_position: 40
---

# 并发工具类

## Semaphore

* 信号量，用来限制能同时访问共享资源的线程上限
    * 类似理发店，同时只有固定的位置的人数可以理发
* 使用Semaphore限流，在访问高峰期时，让请求线程阻塞，高峰期过去再释放许可，当然它只适合限制单机线程数量，并且仅是限制线程数，而不是限制资源数（例如连接数，请对比Tomcat LimitLatch的实现）

```java
Semaphore semaphore = new Semaphore(5);
for (int i = 0; i < 50; i++) {
    int idx = i;
    new Thread(() -> {
        try {
            semaphore.acquire();
            log.info("acquire resource {}", idx);
            try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }finally {
            semaphore.release();
        }
    }).start();
}
```

## CountDownLatch

* 用来进行线程同步协作，等待所有线程完成倒计时
* 其中构造参数用来初始化等待计数值，`awalt()`用来等待计数归零，`countDown()`用来让计数减一

```java
int count = 10;
CountDownLatch countDownLatch = new CountDownLatch(count);
Random random = new Random();
for (int i = 0; i < count; i++) {
    new Thread(() -> {
        try{Thread.sleep(random.nextInt(0, 10) * 100);}catch(InterruptedException e){e.printStackTrace();}
        log.info("execute");
        countDownLatch.countDown();
    }).start();
}
try {countDownLatch.await();} catch (InterruptedException e) {throw new RuntimeException(e);}
log.info("other thing");
```

* 所有提交的任务完成后关闭线程池

```java
ExecutorService pool = Executors.newFixedThreadPool(3);
int count = 10;
CountDownLatch countDownLatch = new CountDownLatch(count);
for (int i = 0; i < count; i++) {
    pool.submit(() -> {
        log.info("run task");
        countDownLatch.countDown();
        log.info("task done");
    });
}

// 等待所有任务执行完成后关闭线程池
try {countDownLatch.await();} catch (InterruptedException e) {throw new RuntimeException(e);}
pool.shutdown();
```

## CyclicBarrier

* 循环栅栏，用来进行线程协作，等待线程满足某个计数。构造时设置**计数个数**，每个线程执行到某个需要**同步**的时刻调用`await()`方法进行等待，当等待的线程数满足了**计数个数**时，继续执行
* 如果需要严格限制同一批线程一起执行，需要将栅栏的参数和线程池的个数设置成一样，如果线程池的个数大于栅栏的参数时，由于每个任务执行耗时可能不一样，多出来的线程可能挤占上一批的线程运行

```java
int count = 5;
CyclicBarrier cyclicBarrier = new CyclicBarrier(count, () -> log.info("发车"));
ExecutorService pool = Executors.newFixedThreadPool(count);

int person = 20;
for (int i = 0; i < person; i++) {
    int personNo = i;
    pool.submit(() -> {
        log.info("person {} 上车", personNo);
        try {cyclicBarrier.await();} catch (InterruptedException | BrokenBarrierException e) {throw new RuntimeException(e);}
        log.info("person {} 睡觉", personNo);
    });
}
```

## CompletableFuture

* 并发编程工具，用于组合异步任务

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/juc/concurrent_utils/CompletableFutureTest.java)

* 创建方式

```java
ExecutorService pool = Executors.newFixedThreadPool(5);
CompletableFuture.runAsync(() -> log.info("runnable task 1"));
CompletableFuture.runAsync(() -> log.info("runnable task 2 use custom pool"), pool);
CompletableFuture.supplyAsync(() -> {
    log.info("supplier task 3");
    return 1;
});
CompletableFuture.supplyAsync(() -> {
    log.info("supplier task 4 use custom pool");
    return 1;
}, pool);
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

* 基础使用

```java
ExecutorService pool = Executors.newFixedThreadPool(5);
// 提交任务
CompletableFuture.supplyAsync(() -> {
            log.info("step 1");
            try {Thread.sleep(1000);} catch (InterruptedException e) {e.printStackTrace();}
            return "100";
        }, pool)
        // 处理上一步任务的结果
        .thenApply(v -> {
            log.info("step 2");
            return Integer.parseInt(v);
        })
        // 处理上一步任务的结果
        .thenApply(v -> {
            log.info("step 3");
            // return v / 0;
            return v / 10;
        })
        // 处理上面所有步骤的异常
        .exceptionally(e -> {
            log.error("error", e);
            return 1;
        })
        // 接收结果并使用
        .thenAccept(v -> log.info("step 4 get value: {}", v));
```

* 获取结果

```java
CompletableFuture<Integer> cf = CompletableFuture.supplyAsync(() -> {
    log.info("run task");
    try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
    return 1;
});
Integer v = null;
// 阻塞获取结果，和Future一样
// try {v = cf.get();} catch (InterruptedException | ExecutionException e) {throw new RuntimeException(e);}

// 指定时间阻塞获取结果，超时就抛出异常，和Future一样
// try {v = cf.get(500, TimeUnit.MICROSECONDS);} catch (InterruptedException | TimeoutException | ExecutionException e) {throw new RuntimeException(e);}

// 等待获取结果，阻塞
// v = cf.join();

// 立即获取值，没有就返回默认值
// v = cf.getNow(0);

// log.info("result: {}", v);

try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
/*
    直接打断运行的任务给一个指定的返回值
    这个方法的返回值为true说明打断成功，使用时会获取指定的值
    如果返回false，说明任务已经完成，使用时会获取任务返回的值
 */
boolean complete = cf.complete(0);
v = cf.join();
log.info("is complete early: {}, value: {}", complete, v);
```

* 处理结果

```java
String result = CompletableFuture.supplyAsync(() -> {
            log.info("run task");
            int i = 1/0;
            return 1;
        })
        // 将结果转换为字符串，无法处理异常
        // .thenApply(v -> {
        //     log.info("apply result: {}", v);
        //     return v + "";
        // })
        // 可以处理异常
        .handle((v, e) -> {
            if (e != null) return "error str";
            return v + "";
        })
        .join();
log.info("get result: {}", result);
```

* 消费结果

```java
CompletableFuture.supplyAsync(() -> {
            log.info("run task");
            return 1;
        })
        // 将结果转换为字符串
        .thenApply(v -> {
            log.info("apply result: {}", v);
            return v + "";
        })
        // 消费结果
        // .thenAccept(v -> log.info("accept result: {}", v));
        // 消费结果并处理异常
        .whenComplete((v, e) -> {
            if (e != null){
                log.error("error", e);
            }else {
                log.info("accept result: {}", v);
            }
        });
try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
```

* 忽略结果

```java
System.out.println(CompletableFuture.supplyAsync(() -> {
            int person = 20;
            for (int i = 0; i < person; i++) {
                log.info("上车{}人", i + 1);
            }
            return person;
        })
        // 消费结果
        .thenRun(() -> log.info("发车")).join());
```

* 使用两个任务中执行最快的一个

```java
CompletableFuture.supplyAsync(() -> {
            log.info("run task 1");
            try{Thread.sleep(100);}catch(InterruptedException e){e.printStackTrace();}
            return 1;
        }).applyToEither(CompletableFuture.supplyAsync(() -> {
            log.info("run task 2");
            try{Thread.sleep(11);}catch(InterruptedException e){e.printStackTrace();}
            return 2;
        }), v -> v)
        .thenAccept(v -> log.info("get result: {}", v));
try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
```

* 组合两个任务的结果

```java
CompletableFuture.supplyAsync(() -> {
            log.info("run task 1");
            try {Thread.sleep(100);} catch (InterruptedException e) {e.printStackTrace();}
            return 1;
        }).thenCombine(CompletableFuture.supplyAsync(() -> {
            log.info("run task 2");
            try {Thread.sleep(100);} catch (InterruptedException e) {e.printStackTrace();}
            return 2;
        }), (result1, result2) -> result1 + "-" + result2)
        .thenAccept(v -> log.info("get result: {}", v));
try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
```

* 串联两个任务

```java
CompletableFuture.supplyAsync(() -> {
            log.info("run task 1");
            return 1;
        }).thenCompose(r -> CompletableFuture.supplyAsync(() -> r + 1))
        .thenAccept(v -> log.info("get result: {}", v));
try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
```

* 等待所有任务运行完成

```java
CompletableFuture.allOf(
        CompletableFuture.runAsync(() -> log.info("task 1")),
        CompletableFuture.runAsync(() -> log.info("task 2")),
        CompletableFuture.runAsync(() -> log.info("task 3")),
        CompletableFuture.runAsync(() -> log.info("task 4"))
).thenRun(() -> log.info("done"));
try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
```

* 等待任意一个任务运行完成

```java
CompletableFuture.anyOf(
        CompletableFuture.runAsync(() -> {
            try{Thread.sleep(10);}catch(InterruptedException e){e.printStackTrace();}
            log.info("task 1");
        }),
        CompletableFuture.runAsync(() -> {
            try{Thread.sleep(100);}catch(InterruptedException e){e.printStackTrace();}
            log.info("task 2");
        }),
        CompletableFuture.runAsync(() -> {
            try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
            log.info("task 3");
        }),
        CompletableFuture.runAsync(() -> log.info("task 4"))
).thenRun(() -> log.info("done"));
try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
```

### 使用指定线程池规则

* 使用以`Async`结尾的方法，如果不指定线程池，后面执行不带`Async`操作的任务都会使用默认的ForkJoinPool
* 使用以`Async`结尾的方法，指定自己的线程池，后面执行不带`Async`操作的任务都会使用指定的线程池
* 如果提交的任务执行过快，后面的操作可能直接让主线程运行

```java
ExecutorService pool = Executors.newFixedThreadPool(5);
// 启动时指定了线程池，当前任务包括后续不带Async的方法都会使用指定的线程池
CompletableFuture.supplyAsync(() -> {
            log.info("task 1");
            return 1;
        }, pool)
        // 如果提交的任务执行过快，后面的操作可能直接让主线程运行
        .thenRun(() -> {
            log.info("task 2");
        })
        /*
            使用带Async的方法没指定线程池的情况下
            当前任务及后续使用不带Async的方法都在默认的ForkJoinPool内运行
         */
        .thenRunAsync(() -> {
            log.info("task 3");
        }).thenRun(() -> {
            log.info("task 4");
        });
```

## LockSupport

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/juc/concurrent_utils/LockSupportTest.java)

* 和Object的`wait()/notify()`、Condition的`await()/signal()`类似，都是用来挂起和唤醒线程，用于线程协作
* LockSupport不需要在同步代码块中使用
* LockSupport不需要遵循先等待后唤醒的步骤
    * LockSupport的唤醒操作是给指定的线程颁发一个**凭证**，在挂起时判断有没有凭证，如果有就不用挂起，所以没有顺序
    * **凭证**只有一个，无法多次唤醒挂起多次的线程
* 使用 

```java
Thread thread = new Thread(() -> {
    log.info("enter");
    LockSupport.park();
    log.info("wake");
});

thread.start();

new Thread(() -> {
    log.info("start");
    try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
    LockSupport.unpark(thread);
    log.info("done");
}).start();
```

* 测试先唤醒后挂起

```java
Thread thread = new Thread(() -> {
    try{Thread.sleep(1000);}catch(InterruptedException e){e.printStackTrace();}
    log.info("enter");
    LockSupport.park();
    // 发放的凭证只能使用一次
    // LockSupport.park();
    log.info("wake");
});

thread.start();

new Thread(() -> {
    log.info("start");
    LockSupport.unpark(thread);
    // 凭证只有一个，无法多次发放
    // LockSupport.unpark(thread);
    log.info("done");
}).start();
```

* 实现交替打印数字

```java
private static int num = 0;
private static void testPrint() {
    Thread[] threads = new Thread[2];
    threads[0] = new Thread(() -> {
        while (true){
            if (num % 2 == 0){
                try{Thread.sleep(500);}catch(InterruptedException e){e.printStackTrace();}
                log.info("num: {}", num++);
                LockSupport.unpark(threads[1]);
            }else {
                LockSupport.park();
            }
        }
    });

    threads[1] = new Thread(() -> {
        while (true){
            if (num % 2 != 0){
                try{Thread.sleep(500);}catch(InterruptedException e){e.printStackTrace();}
                log.info("num: {}", num++);
                LockSupport.unpark(threads[0]);
            }else {
                LockSupport.park();
            }
        }
    });
    threads[0].start();
    threads[1].start();
}
```

