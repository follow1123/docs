---
sidebar_position: 2
---

# 类和对象

在Java中，类（Class）是对象的模板或蓝图，而对象（Object）是类的实例。类定义了对象的属性（成员变量）和行为（方法）

* Java类及类的成员：属性、方法、构造器；代码块、内部类 
* **类**：具有相同特征的事物的抽象描述，是抽象的、概念上的定义
* **对象**：实际存在的该类事物的每个个体，是具体的，也称为**实例(instance)**

## 类的成员

* Java中用类class来描述事物，类是一组相关**属性**和**行为**的集合，这也是类最基本的两个成员
* **属性**：该类事物的状态。对应类中的**成员变量(属性、Method)**
* **行为**：该类事物要做什么操作，或者基于事物的状态能做什么。对应类中的**成员方法（函数、Field）**

<details>
    <summary>示例</summary>
> 定义

```java
public class Phone {
    // 属性
    String name;
    double price;

    // 方法
    public void call(){
        System.out.println("打电话");
    }

    public void playGame(){
        System.out.println("玩游戏");
    }
}
```

> 使用

```java
Phone phone = new Phone();
phone.name = "hw";
phone.price = 6999.0;

phone.call();
phone.playGame();
```
</details>


## 属性（成员变量）和局部变量

变量声明的格式相同：`数据类型 变量名 = 变量值`

:::note
* 变量都有其有效的作用域，出作用域就失效
* 变量必须先声明，后赋值，再使用
:::

### 成员变量和局部变量的区别

| 不同点 | 属性（成员变量） | 局部变量 |
| --- | --- | --- |
| **类中声明的位置** | 声明在类内，方法外 | 声明在方法、构造器内 |
| **内存中分配的位置** | 随对象的创建存储在堆空间 | 存储在栈空间 |
| **生命周期** | 随着对象创建或消亡 | 方法入栈，局部变量在栈中分配，方法出栈，局部变量消亡|
| **作用域** | 整个类内部有效 | 在声明局部变量的方法、构造器、代码块中有效 |
| **权限修饰符** | 可以 | 不可以 |
| **默认值** | 有 | 没有 | 

```java
/**
 * 员工
 */
public class Employee {
    int id;
    String name;

    public void work(String workName){
        System.out.println("员工：" + name + "正在：" + workName);

    }
}
```

## 方法（Method）

* **方法**是类或对象行为特征的抽象，用来完成某个功能的操作。
在某些语言中也成为**函数**或**过程**
* 将功能封装为方法的目的是，可以实现代码重用，减少冗余，简化代码
:::note
* Java里的方法**不能独立存在**，所有方法必须定义在类中
* 方法内可以调用本类中的**其他**方法或属性
* 方法内不能定义方法
:::

```java title="格式"
权限修饰符 [其他修饰符] 返回值类型 方法名(形参列表) [throws 异常类型]{ // 方法头
    // 方法体
}
```
* 权限修饰符 - `private` `缺省` `protected` `public`，详细说明参考[可见性范围](../advanced/object-oriented#java实现封装性)
* 返回值类型 - 调用当前方法，是否需要一个结果
    * **无返回值** - 使用 `void`
    * **有返回值** - 指明返回值的具体类型，可以是基本数据类型或引用数据类型在方法内部使用 `return + 返回类型的变量`
* 方法名 - 标识符，描述方法是干什么的
* 形参列表 - 属于局部变量，可以声明多个
    * 格式 - `(形参1, 形参2, 形参3, 形参4, ...)`
    * 无形参直接使用`()`即可
* 方法体 - 方法的功能，真正执行的代码

```java
/**
 * 人
 */
public class Person {

    String name;

    public void eat(){
        System.out.println(name + "吃饭");
    }

    public void sleep(int hour){
        System.out.println("先睡" + hour + "小时");
    }

    public boolean isHappy(){
        return true;
    }

}
```
### return关键字

* 结束一个方法
* 结束一个方法的同时可以返回数据给调用者

```java
for (int i = 0; i < 10; i++) {
    if (i == 5){
        return; // 提前返回
    }
}
System.out.println("方法结束"); // 未输出
```

### 方法调用内存解析

* 调用方法时，堆空间会新入栈一个栈帧
* 方法的形参和局部变量会保存在这个栈帧内
* 方法结束时，栈帧会弹出，对应的形参和局部变量会销毁

### 方法的重载(overload)

* **方法的重载** - 在同一个类中，允许存在一个以上的同名方法，只要它们的形参列表不同即可
* **重载的特点** - 与修饰符、返回值类型无关，只看参数列表，且参数列表必须不同，（参数个数或类型）
* **重载方法条用** - JVM通过方法的参数列表，调用匹配的方法
    * 先找个数、类型最匹配的
    * 再找个数和类型可以兼容的，如果同时多个方法可以兼容，将会报错

```java
/**
 * 无返回值
 */
public void add(int a, int b){
    System.out.println(a + b);
}

/**
 * 虽然返回值不同，但形参相同，编译不通过
 */
// public int add(int a, int b){
//     return a + b;
// }

/**
 * 有返回值
 */
public int add(int a, int b, int c){
    return a + b + c;
}

/**
 * 类型不同
 */
public double add(double a, double b){
    return a + b;
}

/**
 * 修饰符不同
 */
private double add(double a, double b, double c){
    return a + b + c;
}
```

### 可变个数形参的方法（jdk5）

* 在调用方法时，可能会出现方法形参类型确定，但个数不确定，此时，我们可以使用可变个数形参的方法
* 格式`(参数类型... 参数名)`

:::info
* 同一个类中，可变形参方法可以与相同单个类型的方法构成重载
* 同一个类中，可变形参方不能与相同类型的数组构成重载
* 可变形参必须声明在形参列表的最后面
* 可变形参在一个方法内最多声明一次
:::

```java
/**
 * 可变形参方法
 */
public int add(int... nums){
    int count = 0;
    for (int i = 0; i < nums.length; i++) {
        count += nums[i];
    }
    return count;
}

/**
 * 可变形参方法不能与相同类型的数组的方法存在同一个类中，编译不通过
 */
// public int add(int[] nums){
//     int count = 0;
//     for (int i = 0; i < nums.length; i++) {
//         count += nums[i];
//     }
//     return count;
// }

/**
 * 可变形参必须声明在形参列表的最后面
 */
public boolean equalsAll(long a, int... nums){
    return a ==  add(nums);
}

/**
 * 可变形参在方法内只能声明一次，编译不通过
 */
// public boolean equalsAll(long... a, int... nums){
//    return add(a) == add(nums);
// }
```

### 方法的值传递机制

* 对于方法内声明的局部变量来说，如果出现赋值操作
    * 基本数据类型 - 将变量保存的数据值传递出去
    * 引用数据类型 - 将变量保存的地址值传递出去

```java
public void addOne(int i){
    i = + 1;
}

/**
 * 基本数据类型
 */
@Test
public void testBasicDataType() {
    int i = 1;
    addOne(i);
    System.out.println(i); // 1
}

public void addOne(int[] arr){
    for (int i = 0; i < arr.length; i++) {
        arr[i] = arr[i] + 1;
    }
}

/**
 * 数组
 */
@Test
public void testArray(){
    int[] arr = new int[]{1, 1, 1, 1, 1};
    addOne(arr);
    System.out.println(Arrays.toString(arr)); // 2, 2, 2, 2, 2
}

public void growUp(People people){
    people.setAge(people.age + 1);
}

/**
 * 引用数据类型
 */
@Test
public void testReferenceDataType() {
    People people = new People();
    people.setName("zs");
    people.setAge(11);
    System.out.println(people.info()); // 我的名字是：zs, 11岁

    growUp(people);
    System.out.println(people.info()); // 我的名字是：zs, 12岁
}
```

### 递归方法

* 方法内自己调用自己的现象就成为递归
* **递归的分类**：直接递归，间距递归
* 递归方法包含了一种隐式的循环
:::warning
* 递归调用会占用大量系统堆栈，内存耗用多，在递归调用层次多时速度要比循环慢，使用递归时要谨慎
* 在要求高性能的情况下尽量避免使用递归，考虑循环迭代
:::
:::danger
递归方法一定要已知方向递归，否则这种递归就变成了无穷递归，停不下来，类似死循环，最终发生**栈溢出**
:::

* 直接递归

```java
/**
 * 直接递归
 */
public void a(){
    a();
}
```

* 间接递归

```java
/**
 * 间距递归
 */
public void b(){
    c();
}

public void c(){
    d();

}
public void d(){
    b();
}
```

<details>
    <summary>累加数字</summary>
```java
/**
 * 累加数字
 */
public int getSum(int num){
    if (num == 1){
        return 1;
    }
    return num + getSum(num - 1);
}

@Test
public void testSum() {

    System.out.println(getSum(100));
}
```
</details>

## 包（package）

* 用于指明该文件中定义的类、接口等结构所在的包
* 语法：`package 顶层包名 子包名;`

:::info
* 包可以包含类和子包，划分项目层次，便于管理
* 帮助管理大型软件系统，将功能相近的类划分到同一个包内
* 解决类命名冲突问题
* 控制访问权限
:::

:::note
* 一个源文件只能有一个声明包的 `package` 语句
* `package` 语句作为java源文件的第一条语句出现，若缺省该语句，则指定为无名包
* 包名，属于标识符，满足标识符命名规则和规范（全部小写）、见名知意，包通常使用所在公司域名的倒置
:::

## import

* 为了使用定义在其他包内的java类，需要使用import语句显示引入指定包下的需要的类，相当于import语句告诉编译器到哪里去找这个类
* 语法：`import 包名.类名;`

:::info
* `import` 语句声明在包的声明和类的声明之间
* 导入多个类或接口，直接写多个`import`语句
* 一次性导入某个包下的所有类或接口可以使用 `import a.*;`
* 如果导入的类或接口是java.lang包下的，或者是当前包下的，则可以省略此 `import` 语句
* 导入 `java.a` 包下的某个类后，如果需要导入 `java.a.b` 包下的某个类仍需要导入
* 如果有两个同名的类在不同包下，都需要使用的话，需要将其中一个使用全类名方式声明 `a.b.c.People people = new a.b.c.People()`
* `import static` 组合使用可以导入指定类下的静态属性或方法
:::

## 构造器（constructor）

* 构造器搭配 `new` 关键字使用，用于创建类的对象，在创建对象的同时，可以给对象相关属性赋值
* 格式：`权限修饰符 类名(形参列表){}`
:::info
* 创建类后，在没有显示提供任何构造器的情况下，系统会默认提供一个空参构造器，构造器权限修饰符与类声明的权限相同
* 一旦类中显示声明了构造器，系统就不再提供默认的空参构造器
* 一个类可以声明多个构造器，彼此之间构成重载
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/constructor)

### 默认构造器

```java
/**
 * 默认构造器
 */
public class DefaultConstructorClass {

    public static void main(String[] args) {
        DefaultConstructorClass defaultConstructorClass = new DefaultConstructorClass();
    }
}
```

### 自定义构造器

```java
/**
 * 自定义构造器
 */
public class CustomConstructorClass {

    String name;

    int age;

    public CustomConstructorClass(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        CustomConstructorClass zs = new CustomConstructorClass("zs", 11);

        // CustomConstructorClass zs1 = new CustomConstructorClass() // 没有无参构造器，编译不通过

        // 给对象的属性赋值
        System.out.println(zs.name); // zs
        System.out.println(zs.age); // 11
    }
}
```

### 构造器重载

```java
/**
 * 构造器重载
 */
public class OverloadConstructorClass {

    String name;

    int age;

    /**
     * 只有age的构造器
     */
    public OverloadConstructorClass(int age) {
        this.age = age;
    }

    /**
     * 全部参数构造器
     */
    public OverloadConstructorClass(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        OverloadConstructorClass zs = new OverloadConstructorClass("zs", 11);
        System.out.println(zs.name); // zs
        System.out.println(zs.age); // 11
        OverloadConstructorClass zs1 = new OverloadConstructorClass(11);
        System.out.println(zs1.name); // null
        System.out.println(zs1.age); // 11
    }
}
```

## 类中属性赋值过程

:::note[在类的属性中，给属性赋值的位置]
1. 默认赋值
2. 显示赋值
3. 构造器赋值
4. `对象.方法`赋值
5. `对象.属性`赋值
* 这些位置赋值的顺序：`1`，`2`，`3`，`4/5`
* `1`、`2`、`3`只能执行一次，`4`、`5`可以执行多次
:::

```java
/**
 * 测试属性赋值顺序
 */
public class AssignmentOrder {

    // int integer; // 默认赋值
    int integer = 1; // 显示赋值

    public AssignmentOrder(){}

    public AssignmentOrder(int i){
        integer = i;
    }

    /**
     * 方法赋值
     */
    public void setInteger(int i){
        integer = i;
    }

    public static void main(String[] args) {
        AssignmentOrder assignmentOrder = new AssignmentOrder();
        // 打开默认赋值代码注释
        // System.out.println(assignmentOrder.integer); // 0

        // 打开显示赋值注释
        System.out.println(assignmentOrder.integer); // 1

        // 构造器赋值
        AssignmentOrder ao2 = new AssignmentOrder(2);
        System.out.println(ao2.integer); // 2

        // 对象.属性赋值可以赋值多次
        ao2.integer = 3;
        ao2.integer = 4;
        System.out.println(ao2.integer); // 4

        // 对象.方法赋值可以赋值多次
        ao2.setInteger(5);
        ao2.setInteger(6);
        System.out.println(ao2.integer); // 6
    }
}
```

## JavaBean

* JavaBean是一种java语言写的可重用组件
:::note[符合以下标准的类]
* 类是公共的
* 有一个无参的公共构造器
* 有属性，且有对应的get，set方法
:::
