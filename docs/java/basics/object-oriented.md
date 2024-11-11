---
sidebar_position: 2
---

# 面向对象

* Java类及类的成员：属性、方法、构造器；代码块、内部类 
* 面向对象特性：封装、继承、多态、抽象
* 其他关键字使用：this、super、package、import、static、final、interface、abstract

## 类和对象

* **类**：具有相同特征的事物的抽象描述，是抽象的、概念上的定义
* **对象**：实际存在的该类事物的每个个体，是具体的，也称为**实例(instance)**

### 类的成员

* Java中用类class来描述事务，类是一组相关**属性**和**行为**的集合，这也是类最基本的两个成员
    * **属性**：该类事物的状态。对应类中的**成员变量(属性、Method)**
    * **行为**：该类事物要做什么操作，或者基于事物的状态能做什么。对应类中的**成员方法（函数、Field）**


#### 定义一个类并且使用

* 定义

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

* 使用

```java
public static void main(String[] args) {
    Phone phone = new Phone();
    phone.name = "hw";
    phone.price = 6999.0;

    phone.call();
    phone.playGame();
}
```

## 属性（成员变量）和局部变量

* 变量声明的格式相同：`数据类型 变量名 = 变量值`
* 变量都有其有效的作用域，出作用域就失效
* 变量必须先声明，后赋值，再使用

## 成员变量和局部变量的区别

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
* Java里的方法**不能独立存在**，所有方法必须定义在类中
* 方法内可以调用本类中的**其他**方法或属性
* 方法内不能定义方法

## 方法声明的格式说明

```java
权限修饰符 [其他修饰符] 返回值类型 方法名(形参列表) [throws 异常类型]{ // 方法头
    // 方法体
}
```
* 权限修饰符
    * 四种：private，缺省，protected，public
* 返回值类型：调用当前方法，是否需要一个结果
    * 无返回值，使用`void`
    * 有返回值，指明返回值的具体类型，可以是基本数据类型或引用数据类型
    在方法内部使用`return`+返回类型的变量
* 方法名：标识符，描述方法是干什么的
* 形参列表：属于局部变量，可以声明多个
    * 格式：`(形参1, 形参2, 形参3, 形参4, ...)`
    * 无形参直接使用`()`即可
* 方法体：方法的功能，真正执行的代码

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
## return关键字

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

## 方法调用内存解析

* 调用方法时，堆空间会新入栈一个栈帧
* 方法的形参和局部变量会保存在这个栈帧内
* 方法结束时，栈帧会弹出，对应的形参和局部变量会销毁

## 方法的重载(overload)

* **方法的重载**：在同一个类中，允许存在一个以上的同名方法，只要它们的形参列表不同即可
* **重载的特点**：与修饰符、返回值类型无关，只看参数列表，且参数列表必须不同，（参数个数或类型）
* **重载方法条用**：JVM通过方法的参数列表，调用匹配的方法
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

## 可变个数形参的方法(jdk5)

* 在调用方法时，可能会出现方法形参类型确定，但个数不确定，此时，我们可以使用可变个数形参的方法
* 格式`(参数类型... 参数名)`
* 同一个类中，可变形参方法可以与相同单个类型的方法构成重载
* 同一个类中，可变形参方不能与相同类型的数组构成重载
* 可变形参必须声明在形参列表的最后面
* 可变形参在一个方法内最多声明一次

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

## 方法的值传递机制

* 对于方法内声明的局部变量来说，如果出现赋值操作
    * 基本数据类型，将变量保存的数据值传递出去
    * 引用数据类型，将变量保存的地址值传递出去

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

## 递归方法

* 方法内自己调用自己的现象就成为递归
* **递归的分类**：直接递归，间距递归
* 递归方法包含了一种隐式的循环
* 递归方法一定要已知方向递归，否则这种递归就变成了无穷递归，停不下来，类似死循环，最终发生**栈溢出**
* 递归的问题
    * 递归调用会占用大量系统堆栈，内存耗用多，在递归调用层次多时速度要比循环慢，使用递归时要谨慎
    * 在要求高性能的情况下尽量避免使用递归，考虑循环迭代

### 代码示例

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

* 累加数组应用

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

## package和import

## package(包)

* 用于指明该文件中定义的类、接口等结构所在的包
* 语法：`package 顶层包名 子包名;`
* 说明
    * 一个源文件只能有一个声明包的package语句
    * package语句作为java源文件的第一条语句出现。若缺省该语句，则指定为无名包
    * 包名，属于标识符，满足标识符命名规则和规范（全部小写）、见名知意
        * 包通常使用所在公司域名的倒置
* 作用
    * 包可以包含类和子包，划分项目层次，便于管理
    * 帮助管理大型软件系统，将功能相近的类划分到同一个包内
    * 解决类命名冲突问题
    * 控制访问权限

## import关键字

* 为了使用定义在其他包内的java类，需要使用import语句显示引入指定包下的需要的类。
相当于import语句告诉编译器到哪里去找这个类
* 语法：`import 包名.类名;`
* 说明
    * import语句声明在包的声明和类的声明之间
    * 导入多个类或接口，直接写多个import语句
    * 一次性导入某个包下的所有类或接口可以使用`import a.*;`
    * 如果导入的类或接口是java.lang包下的，或者是当前包下的，则可以省略此import语句
    * 导入`java.a`包下的某个类后，如果需要导入`java.a.b`包下的某个类仍需要导入
    * 如果有两个同名的类在不同包下，都需要使用的话，需要将其中一个使用全类名方式声明`a.b.c.People people = new a.b.c.People()`
    * `import static`组合使用可以导入指定类下的静态属性或方法

## 封装性（Encapsulation）

* 面向对象的开发原则要遵循**高内聚**、**低耦合**
    * **高内聚**：类的内部数据操作细节自己完成，不允许外部干涉
    * **低耦合**：尽量暴露少量的方法给外部使用，尽量方便外部调用
* 封装就是把客观的事物抽象概念的类，并且类可以把自己的数据和方法只向可信的类或对象开放，向没必要开放的类或对象隐藏信息

## Java实现封装性

* 实现封装就是控制类或成员的可见性范围。需要访问控制修饰符，也称权限修饰符
* 权限修饰符：`public`、`protected`、`缺省`、`private`


| 修饰符    | 本类内部    | 本包内    | 其他包的子类    | 其他包的非子类    |
|---------------- | --------------- | --------------- | --------------- | --------------- |
| private    | √    | ×    | ×    | ×   |
| 缺省   | √   | √   | ×   | ×   |
| protected   | √   | √   | √   | ×   |
| public   | √   | √   | √   | √   |

* 修饰的结构
    * 外部类只能使用`public`和`缺省`两种权限修饰符
    * 成员变量、成员方法、构造器、成员内部类可以使用所有权限修饰符

### 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/encapsulation/A.java)

* 定义一个`A`类，定义4个属性，分别有4种不同的权限修饰符

```java
/**
 * 测试权限修饰符类
 */
public class A {
    /**
     * 私有属性
     */
    private int privateField;

    /**
     * 缺省属性
     */
    int defaultField;

    /**
     * protected数字
     */
    protected int protectedField;

    /**
     * 公开属性
     */
    public int publicField;
}
```

* 在`A`类相同包下定义一个`B`类，使用main方法访问`A`类的所有属性

```java
/**
 * 和A类处在相同的包下
 */
public class B {
    public static void main(String[] args) {
        A a = new A();
        // int privateField a.privateField; // 无法访问
        int defaultField = a.defaultField;
        int protectedField = a.protectedField;
        int publicField = a.publicField;
    }
}
```

* 在`A`类的子包下定义一个`packag1.C`类，并继承`A`类，使用方法访问`A`类的所有属性

```java
/**
 * 和A类处在不同的包下，但是是A类的子类
 */
public class C extends A {
    public void cMethod(){
        // int privateField super.privateField; // 无法访问
        // int defaultField = super.defaultField; // 不在相同包内，无法访问
        int protectedField = super.protectedField;
        int publicField = super.publicField;
    }
}
```

* 在`A`类的子包下定义一个`packag2.D`类，使用main方法访问`A`类的所有属性

```java
/**
 * 和A类处在不同的包下，不是A类的子类
 */
public class D {

    public static void main(String[] args) {
        A a = new A();
        // int privateField a.privateField; // 无法访问
        // int defaultField = a.defaultField; // 不在相同包内，无法访问
        // int protectedField = a.protectedField; // 不在相同包内并且不是子类，无法访问
        int publicField = a.publicField;
    }
}
```

## 构造器（constructor）

* 构造器搭配`new`关键字使用，用于创建类的对象
* 在创建对象的同时，可以给对象相关属性赋值
* 说明
    * 格式：`权限修饰符 类名(形参列表){}`
    * 创建类后，在没有显示提供任何构造器的情况下，系统会默认提供一个空参构造器，构造器权限修饰符与类声明的权限相同
    * 一旦类中显示声明了构造器，系统就不再提供默认的空参构造器
    * 一个类可以声明多个构造器，彼此之间构成重载

## 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/constructor)

* 默认构造器

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

* 自定义构造器

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

* 构造器重载

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

* 在类的属性中，给属性赋值的位置
    1. 默认赋值
    2. 显示赋值
    3. 构造器赋值
    4. `对象.方法`赋值
    5. `对象.属性`赋值
* 这些位置赋值的顺序：1，2，3，4/5
* 这些位置的执行次数
    * 1、2、3只能执行一次
    * 4、5可以执行多次

## 代码示例

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
* 符合以下标准的类
    * 类是公共的
    * 有一个无参的公共构造器
    * 有属性，且有对应的get，set方法

## this关键字

* 在方法中（非static方法）内部使用，表示调用该方法的对象
* 在构造器中，表示该构造器正在初始化的对象
* 使用`this(形参列表)`可以调用构造器
    * 使用这种方式调用构造器必须声明在构造器的首行

```java
/**
 * 测试this调用构造器
 */
public class ThisClass {

    private String name;

    private int age;

    public ThisClass(){
        System.out.println("初始化代码执行");
    }

    public ThisClass(String name) {
        this();
        this.name = name;
    }

    public ThisClass(String name, int age) {
        this();
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        // 下面三行都会输出 初始化代码执行
        ThisClass thisClass = new ThisClass();
        ThisClass thisClass1 = new ThisClass("zs");
        ThisClass thisClass2 = new ThisClass("zs", 11);
    }
}
```

## 继承（inheritance）

* 在定义类时发现要定义的类与之前的类有相似点，可以考虑继承之前的类，或将相同点抽象出来一个类并继承
* 继承的好处
    * 继承的出现减少了代码的冗余，提高了代码的复用性
    * 继承的出现有利于功能的扩展
    * 继承的出现让类和类之间产生了`is-a`的关系，为多态的使用提供了前提。
        * 描述事物之间的所属关系，这种关系是`is-a`的关系，父类更通用，子类更具体

## 语法

* 通过`extends`关键字实现
* 描述
    * 类A：父类、superClass、超类、基类
    * 类B：子类、subClass、派生类

```java
[修饰符] class 类A {
    ...
}

[修饰符] class 类B extends 类A {
    ...
}
```

## 继承的功能

* 子类可以获取到父类中的属性和方法（受封装性影响）
* 子类继承父类之后，可以扩展自己特有的功能（添加属性或方法）

## Java继承体系

* Java中声明的类，如果没有显式的声明其父类时，默认继承与`java.lang.Object`
* 一个类可以同时拥有多个子类
* 一个类不可以同时继承多个父类（Java只支持单继承，不支持多继承）

## 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/inheritance/InheritanceTest.java)

* 定义一个父类

```java
/**
 * 人
 */
public class Person {

    String name;

    int age;

    public void eat(){
        System.out.println("吃饭");
    }
}
```

* 定义一个子类

```java
/**
 * 学生
 */
public class Student extends Person{

    public Student() {
    }

    public Student(String name, int age){
        this.name = name;
        this.age = age;
    }


    public void study(){
        System.out.println("学习");
    }
}
```

* 测试

```java
Student student = new Student("zs", 11);

// 调用父类中的属性
System.out.println(student.name);
System.out.println(student.age);

// 调用父类中的方法
student.eat();
// 调用自己的方法
student.study();
```

## 方法的重写（override）

* 子类对父类继承过来的方法进行覆写的操作，就称为方法的重写

## 方法重写的规则

* 子类重写父类的方法，方法的命令，形参列表必须相同
* 权限不能小于父类方法的修饰符
* 返回值
    * 父类的返回值时void，子类也必须是void
    * 返回值是基本数据类型，子类必须相同
    * 返回值是引用数据类型，子类可以相同，或是其子类
* 异常：子类重写方法抛出的异常必须和父类方法抛出的异常相同或则是其子类
* 方法体没有要求

## 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/override/OverrideTest.java)

* 定义父类

```java
/**
 * 人
 */
public class Person {

    String name;

    int age;

    public void eat(){
        System.out.println("吃饭");
    }

    public void read(String word){
        System.out.println("说话：" + word);
    }

    public void sleep(int hour){
        System.out.println("先睡" + hour + "小时");
    }

    public String info(){
        return name + ":" + age;
    }

}
```

* 定义子类

```java
/**
 * 学生
 */
public class Student extends Person {

    public Student() {
    }

    public Student(String name, int age){
        this.name = name;
        this.age = age;
    }


    @Override
    public void eat() {
        System.out.println(name + "正在吃饭");
    }

    @Override
    public void read(String word) {
        System.out.println(name + "读" + word);
    }

    @Override
    public void sleep(int hour) {
        System.out.println(name + "准备睡" + hour + "小时");
    }

    @Override
    public String info() {
        return "姓名：" + name + "\t年龄" + age + "岁";
    }

    public void study(){
        System.out.println("学习");
    }
}
```

* 测试

```java
// 调用父类的方法
Person person = new Person();
person.name = "人";
person.age = 11;
person.eat();
person.read("123");
person.sleep(21);
System.out.println(person.info());

System.out.println("---");
// 调用子类重写后的方法
Student student = new Student("sz", 12);
student.eat();
student.read("书");
student.sleep(6);
System.out.println(student.info());
```

## super关键字

* 子类继承父类后重写了父类的某个方法，但是需要调用这个被重写的方法，可以使用`super.方法`
* 子类继承父类后，定义了一个与父类重名的属性，需要使用父类的这个属性，可以使用`super.属性`
    * 子类出现父类相同的属性是不会覆盖父类的属性，两个属性同时存在
* 子类继承父类后，在初始化该对象时需要调用父类的构造器，可以使用`super(形参列表)`
    * `super(形参列表)`必须声明在构造器的首行
    * `super(形参列表)`和`this(形参列表)`只能二选一
    * 如果首行没有显示调用this或super构造器，则默认调用`super()`空参构造器

## super调用属性、方法

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/keywords/super_keyword/SuperTest.java)

* 定义父类

```java
/**
 * 人
 */
public class Person {

    int id;

    String name;

    int age;

    public Person() {
        System.out.println("初始化Person");
    }

    public Person(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public void eat(){
        System.out.println("吃饭");
    }

}
```

* 定义子类

```java
/**
 * 学生
 */
public class Student extends Person {

    int id;

    public Student() {
    }

    public Student(int id, String name, int age) {
        super(id, name, age);
        this.id = id + 1;
    }

    public void showId(){
        System.out.println(this.id);
        System.out.println(super.id);
    }

    @Override
    public void eat() {
        System.out.println(name + "正在吃饭");
        super.eat();
    }


    public void study(){
        System.out.println("学习");
    }
}
```

* 测试

```java
Student zs = new Student(1, "zs", 11);

// 子类重写方法后调用父类的方法
zs.eat();

// 子类打印属性后打印父类的同名属性
zs.showId();
```

## super调用构造器

* 测试（父类子类代码和上面一样）

```java
// 调用子类无参构造器会默认调用父类无参构造器，打印里面的信息
Student student = new Student();


// 使用super(形参列表)会初始化父类里面的属性
Student zs = new Student(1, "zs", 11);
// 由于Student有一个同名的属性，只初始化了父类的属性，两个id属性的值不同
zs.showId();
```

## 多态性（Polymorphism）

* 对象的多态性：父类的引用指向子类对象
* 格式：`父类类型 变量名 = 子类对象`
* 前提
    * 要有类的继承关系
    * 要有方法的重写
* 多态只适用于方法，不适用于属性
* 好处：极大的减少了代码的冗余，不需要定义多个重载的方法
* 弊端：在多态的场景下，创建了子类的对象，也加载了子类特有的方法和属性，
由于声明的是父类的引用，无法直接调用子类的特有方法

## 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/polymorphism/PolymorphismTest.java)

* 定义一个父类

```java
/**
 * 人
 */
public class Person {

    int id = 1;

    public void eat() {
        System.out.println("吃饭");
    }

    public void doWork() {
        System.out.println("工作");
    }
}
```

* 定义一个子类

```java
/**
 * 男人
 */
public class Man extends Person{

    int id = 2;
    @Override
    public void eat() {
        System.out.println("吃一大碗");
    }

    @Override
    public void doWork() {
        super.doWork();
    }

    /**
     * 模拟子类特殊操作
     */
    public void a(){
        System.out.println("a");
    }
}
```
* 另一个子类

```java
/**
 * 女人
 */
public class Woman extends Person {
    int id = 3;
    @Override
    public void eat() {
        System.out.println("吃一碗");
    }


    @Override
    public void doWork() {
        super.doWork();
    }
}
```

* 测试

```java
public class PolymorphismTest {

    @Test
    public void testPolymorphism1() {
        Person person = new Person();

        Person woman = new Woman();

        Person man = new Man();


        person.eat();

        // 多态，实际调用子类方法，这种方式称为虚方法
        woman.eat();
        man.eat();

        // 属性不适用与多态

        System.out.println(person.id); // 1
        System.out.println(woman.id); // 1
        System.out.println(man.id); // 1
    }


    /**
     * 模拟招聘
     */
    private void recruitment(Person person){
        person.doWork();
    }

    /**
     * 多态的好处
     */
    @Test
    public void testPolymorphism2() {
        // 男人女人都能用
        recruitment(new Woman());
        recruitment(new Man());
    }

    /**
     * 多态的弊端
     */
    @Test
    public void testPolymorphism3() {
        Person man = new Man();
        // man.a(); // 无法调用子类的特殊操作
    }

}
```

## 向上转型和向下转型

* instanceof关键字：在类型强转前判断甚至是其子类，增加程序的健壮性

```java
@Test
public void testClassCast() {

    Person man = new Man();

    // 使用强转操作调用子类的特殊方法
    Man m = (Man) man;
    m.a();
}

@Test
public void testInstanceof() {
    Person man = new Man();

    // 错误的强转会报错
    Woman woman = (Woman) man;

    // 使用instanceof判断
    if (man instanceof Man){
        Man m = (Man) man;
    }

}
```

## Object类

* 类`java.lang.Object`是类层次结构的根类，即所有其他类的父类。每个类都使用`Object`作为超类
* Object类型的变量与除Object以外的任意引用数据类型的对象都存在多态引用

## Object类的方法

### equals()方法

* 自定义类在没有重写Object的equals()方法的情况下，调用的就是Object类中声明的equals()方法，
比较两个对象的引用地址是否相同
* 在需要判断自定义类内的多个属性是否相同的情况下可以使用

#### 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/object/equals/EqualsTest.java)

* 定义一个类

```java
public class User {

    private String name;

    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj instanceof User){
            User user = (User) obj;
            return this.age == user.age && this.name.equals(user.name);
        }
        return false;
    }
}
```

* 测试

```java
User user1 = new User("zs", 11);
User user2 = new User("zs", 11);

// 重写equals方法前，比较对象地址
System.out.println(user1.equals(user2)); // false

// 重写equals方法前后，比较对象内的属性
System.out.println(user1.equals(user2)); // true
```

### toString()方法

* toString()方法默认返回当前对象的类名加地址
* `System.out.println()`方法就是使用`toString()`打印
* 用于自定义输出类里面的信息

#### 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/object/tostring/ToStringTest.java)

* 定义一个类

```java
public class User {

    String name;

    int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

* 测试

```java
User zs = new User("zs", 11);
System.out.println(zs);
```

### clone()和finalize()方法

* clone()

* 定义一个类，实现Cloneable接口

```java
public class Person implements Cloneable{

    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

* 测试

```java
Person zs = new Person("zs");
Person zsCopy = (Person) zs.clone();

// 克隆后两个对象并不是同一个
System.out.println(zs == zsCopy);

// 克隆后修改原始对象内的基本数据类型的属性，不会改变克隆对象内的基本数据类型属性
zs.setName("zhangsan");
System.out.println(zs.getName());
System.out.println(zsCopy.getName());
```
* finalize()

```java
/**
 * 测试finalize方法，（jdk9被废弃了，不推荐使用）
 */
@Test
public void testFinalize() {
    Person zs = new Person("zs");
    zs = null; // 将引用指向为null表示这个对象是垃圾了，等待被回收，但时间不确定

    System.gc(); // 强制释放空间

}
```

## static关键字

* 如果想让一个成员变量被类的所有实例所共享，就用`static`修饰即可，称为类变量（或类属性）

## static修饰属性

* 使用static修饰的成员变量也叫静态变量或类变量
* 静态变量和实例变量的对比

|     | 静态变量    | 实例变量    |
|---------------- | --------------- | --------------- |
| **个数**    | 内存空间中只有一份，被多个对象共享    | 类的每一个实例都保存这自己的实例变量    |
| **内存位置**   | jdk6及之前存在方法区，jdk7及之后存在堆空间    | 存在堆空间的对象实体中    |
| **加载时机** | 随着类的加载而加载，由于类只会加载一次，所有静态变量只有一份 | 随着对象的创建而加载，每个对象拥有一份实例变量 |
| **调用者** | 可以被类之间调用，也可以被对象调用 | 只能被对象调用 |
| **消亡时机** | 随着类的卸载而消亡 | 随着对象的消亡而消亡 |

### 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/keywords/static_keyword/StaticTest.java)

* 定义类

```java
public class Chinese {
    String name;

    int age;

    public static String nation = "中国";

    public Chinese(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat(){
        System.out.println("吃饭");
    }

    public static void show_nation(){
        System.out.println("我的国际是：" + nation);

        // eat(); // 无法调用实例方法，编译不通过
    }

    public void show_info(){
        System.out.println("我的名字是：" + name);
        show_nation(); // 可以调用静态方法
    }

}
```

* 测试

```java
// 在对象创建之前就可以使用
System.out.println(Chinese.nation);

Chinese zs = new Chinese("zs", 11);
Chinese ls = new Chinese("ls", 12);

// 一个对象修改了实例变量，所有对象都生效
zs.nation = "china";
System.out.println(zs.nation); // china
System.out.println(ls.nation); // china
```

## static修饰方法

* static修饰的方法也叫静态方法或类方法
* 静态方法内不用调用对象的实例方法，但实例方法可以调用静态方法
* 静态方法内不能使用`this`或`super`关键字，因为静态方法调用时，对象可能没创建

```java
Chinese.show_nation();

Chinese zs = new Chinese("zs", 11);

// 实例方法内调用静态方法
zs.show_info();
```

## 代码块

* 用来初始化类或对象的成员变量
* 代码块又分为静态代码块和非静态代码块
    * 静态代码块随着类的加载而执行，只会执行一次
    * 非静态代码块随着对象的创建而执行，执行时机是在构造器的前面
    * 多个静态代码块或非静态代码块之间的执行顺序是根据代码块声明的位置而定
    * 静态代码块和非静态代码块调用属性和方法的规则与成员方法和静态方法规则相同
* 父类的代码块加载时机永远在子类之前

## 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/block/BlockTest.java)

* 定义父类

```java
public class Person {
    String name;

    static String info = "123";

    public Person(String name) {
        System.out.println("构造器执行");
        this.name = name;
    }

    public void eat(){
        System.out.println("吃饭");
    }

    {
        System.out.println("代码块执行2");
    }
    {
        System.out.println("代码块执行1");
    }

    static {
        System.out.println("静态代码块执行1");
    }
    static {
        System.out.println("静态代码块执行2");
    }
}
```

* 定义子类

```java
public class Man extends Person{

    {
        System.out.println("2 代码块执行");
    }

    static {
        System.out.println("2 静态代码块执行");
    }

    static int a;
    public Man(String name) {
        super(name);
    }
}
```

* 测试

```java
public class BlockTest {
    @Test
    public void testBlock() {
        System.out.println(Person.info);

        Person zs = new Person("zs");
    }

    @Test
    public void testBlockWithExtends() {
        // 加载子类，会先执行父类的静态代码块再执行子类的静态代码块
        System.out.println(Man.a);

        System.out.println("---");

        // 创建子类会先执行父类的代码块，再执行父类构造方法，最后执行子类代码块
        Man zs = new Man("zs");

    }
}
```

## final关键字

* `final`可以用来修饰：**类**、**方法**、**变量**
* 用`final`修饰**类**表示类不能被继承
* 用`final`修饰**方法**表示方法不能被重写
* 用`final`修饰变量
    * 可以修饰**成员变量**，**局部变量**，**形参**
    * 修饰这些变量之后都表示变量不能被修改了，也称为常量
    * `final`配合`static`修饰**成员变量**后称为全局常量

## abstract关键字（抽象类或抽象方法）

* 我们声明的一些几何图形类中：圆、矩形，三角形等，这些类之间都有共同特征，求面积、周长等，
这些共同的特征可以抽取到一个公共的父类中，但这些方法在父类中**无法给出具体的实现**，
而是交给子类各自自己实现。那么父类在声明这些方法时，**就只有方法签名，没有方法体**，
我们把没有方法体的方法称为**抽象方法**，Java语法规定，包含抽象方法的类必须时**抽象类**
* 格式
    * **抽象类**：被`abstract`修饰的类
    * **抽象方法**：被`abstract`修饰没有方法体的方法

```java
public abstract class AbstractClass {
    abstract void abstractMethod();
}
```
* 抽象类
    * 抽象类不能实例化
    * 抽象类可以没有抽象方法，但抽象方法声明所在的类必须是抽象类
* 抽象方法
    * 抽象方法只有方法声明，没有方法体
    * 子类继承抽象类后必须重写父类的所有抽象方法，否则子类也必须要使用`abstract`修饰（编译器会检查）
* `abstract`不能修饰属性、构造器、代码块等
* `abstract`不能与私有方法、静态方法、final方法、final类共用
    * 私有方法不能被子类访问到所以不能共用
    * 避免静态类调用静态方法，静态方法未实现
    * final方法不能被重写
    * final类不能被继承

## 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/abstract_class/AbstractTest.java)

* 定义几何图形抽象类

```java
/**
 * 几何图形类
 */
public abstract class Geometry {
    /**
     * 获取几何图形的面积
     */
    abstract double getArea();
}
```

* 定义圆形

```java
/**
 * 圆形
 */
public class Circle extends Geometry{
    int radius;
    @Override
    double getArea() {
        return Math.PI * (radius * radius);
    }
}
```

* 定义正方形

```java
/**
 * 正方形
 */
public class Square extends Geometry{
    int side;
    @Override
    double getArea() {
       return side * side;
    }
}
```

* 测试

```java
Circle circle = new Circle();
circle.radius = 5;
System.out.println(circle.getArea());

Square square = new Square();
square.side = 5;
System.out.println(square.getArea());
```

## interface（接口）

* 接口就是规范，定义的是一组规则，**继承**是一个“是不是”的`is-a`关系，而接口实现则是“能不能”的`has-a`关系
* 格式：
```java
public interface Interface{
    void abstractMethod();
}
```
* 接口结构说明：
    * 可以声明属性，但必须使用`public static final`修饰
    * 方法：
        * jdk8前只能声明抽象方法
        * jdk8后可以声明**静态方法**和**默认方法**
        * jdk9可以声明**私有方法**
    * 接口内不能又构造器、代码块等
* 接口与类的关系
    * B类继承A类，那么B为A类的子类
    * B类实现A类，那么B为A类的实现类
* 类可以实现多个接口
* 类必实现接口后必须将接口内的所有抽象方法都重写
* 接口与接口之间的关系：继承关系，接口之间可以多继承

## 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/interface_test/InterfaceTest.java)

* 测试

```java
public class InterfaceTest {
    @Test
    public void testInterface() {
        Plane plane = new Plane();
        plane.fly();
        plane.attack();

        Kite kite = new Kite();
        kite.fly();
    }

    @Test
    public void testInterfaceExtends() {

        Gunship gunship = new Gunship();
        // Gunship未实现Flyable接口，也可以调用fly方法，因为Hovering接口继承了Flyable接口
        gunship.fly();
        gunship.hover();
        gunship.attack();
    }

    private void fly(Flyable flyable){
        flyable.fly();
    }
    
    @Test
    public void testAnonymousInterface() {
       fly(new Kite());

        Flyable flyable = new Flyable() {
            @Override
            public void fly() {
                System.out.println("飞");
            }
        };

        fly(flyable);
    }
}
```

## 接口新特性

* **静态方法**（jdk8）
    * 实现类无法调用接口的静态方法
* **默认方法**（jdk8）
    * 如果一个**类**实现的两个**接口**都有**同名同参**的**默认方法**，那么这个实现类必须重写这个方法
        * 重写后想要调用其中一个接口的同名方法的话使用`接口名.super.方法`调用
    * 如果一个类**继承了一个父类**并**实现了一个接口**，这个**父类**和**接口**内都有同名同参的方法，
    则默认调用父类的同名同参方法，**类优先原则**
* **私有方法**（jdk9）
    * 供接口内的默认方法使用，抽出接口内默认方法内的公共逻辑


## 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/interface_test/new_methods/InterfaceTest.java)

* 测试静态方法默认方法

```java
/**
 * 测试接口
 *      静态方法默认方法（jdk8添加）
 *      私有方法（jkd9添加）
 */
public class InterfaceTest {

    /**
     * 测试静态方法
     */
    @Test
    public void testStaticMethod() {
        A.a1();
        // B.a1(); // 实现类无法调用接口的静态方法，编译不通过
    }

    /**
     * 测试默认方法
     */
    @Test
    public void testDefaultMethod() {

        B b = new B();
        b.a2(); // 调用A接口内的默认方法


        // B类实现了两个接口A、C，这两个接口都实现了同名同参的默认方法common1，实现类必须重写这个方法，否则会报错
        b.common1();

        // 子类或实现类继承了父类并实现类了接口，父类和接口内都声明了同名同参的方法，子类没重写这个方法的情况下默认调用的是父类的方法，类有优先则
        b.common2();
    }
}
```

* 测试调用多个接口内的同名同参方法

```java
public class B extends D implements A, C{

    public void b1(){
        System.out.println("b3");
    }

    @Override
    public void common1() {
        System.out.println("common1 in b");
    }


    public void b2(){
        common1(); // 调用自己的方法

        super.common2(); // 调用父类的同名同参方法

        common1(); // 调用自己类中的同名同参方法
        A.super.common1(); // 调用接口A的同名同参方法
        C.super.common1(); // 调用接口C的同名同参方法
    }

}
```

## 内部类（InnerClass）

* 将A类定义在B类里面，里面的A类就称为**内部类（InnerClass）**，类B则称为**外部类（OutClass）**
* 当事物A的内部，还有一个部分需要一个完整的结构B进行描述，而这个内部的完整的结构B又只为外部事物A提供服务，
不在其他地方单独使用，那么整个内部的完整结构B最好使用内部类
* 例子：
    * `Thread`内的`State`表示线程的生命周期
    * `HashMap`内的`Node`表示每个键值对的节点
* 内部类分类（和变量分类类似）
    * 成员内部类：静态成员内部类，非静态成员内部类
    * 局部内部类（声明在方法、构造器、代码块内部）：匿名局部内部类，非匿名局部内部类

## 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/innerclass/InnerClassTest.java)

* 定义一个类

```java
public class Person {

    String name = "person";
    int age;

    static class Dog{

    }

    class Bird{

        String name = "bird";
        
        public void show(String name){
            System.out.println("age = " + age); // 调用外部内的属性
            System.out.println("name = " + name); // 调用形参
            System.out.println("this.name = " + this.name); // 调用内部类的成员变量
            System.out.println("Person.this.name = " + Person.this.name); // 调用外部类的成员变量

        }

    }

    public void method(){
        class InnerClass1{

        }
    }

    public Person(){
        class InnerClass1{

        }
    }

    {
        class InnerClass1{

        }
    }
}
```

* 测试

```java
public class InnerClassTest {
    @Test
    public void testInnerClass() {

        // 创建静态成员内部类
        Person.Dog dog = new Person.Dog();

        // 创建非静态成员内部类
        Person.Bird bird = new Person().new Bird();
        // 或
        Person person = new Person();
        Person.Bird bird1 = person.new Bird();
    }

    /**
     * 测试内部内调用外部类属性
     */
    @Test
    public void testInnerClassFields() {
        Person.Bird bird = new Person().new Bird();
        bird.show("new bird");
    }

    @Test
    public void testLocalInnerClass() {
        class Task implements Runnable{
            @Override
            public void run() {
                System.out.println("run");
            }
        }

        Task task = new Task();
        task.run();
    }
}
```

## 枚举类

* 枚举类本质上也是一种对象，只不过这个类的对象是有限的、固定的几个，不能随意创建
* 比如**星期（7个）**，**月份（12个）**
* 在jdk5之后使用`enum`关键字定义枚举类
* 如果枚举类的实现只有一个，则可以看作单例的实现方式
* 使用`enum`关键字定义的枚举类默认父类是`java.lang.Enum`
    * Enum父类中的常用方法：`toString()`, `static values()`, `static valueOf()`, `name()`, `ordinal()`
* 枚举类可以继承接口，继承接口后所以实例共用定义时重写的方法，如果需要每个实例单独重写方法的逻辑，
则可以在定义枚举实例时重写


## 代码示例

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/enum_class/EnumTest.java)

* jdk5前定义枚举类的方式

```java
public class SeasonBefore {

    private final String seasonName;

    private SeasonBefore(String seasonName){
        this.seasonName = seasonName;
    }

    public String getSeasonName() {
        return seasonName;
    }

    public static final SeasonBefore SPRING = new SeasonBefore("春天");
    public static final SeasonBefore SUMMER = new SeasonBefore("夏天");
    public static final SeasonBefore AUTUMN = new SeasonBefore("秋天");
    public static final SeasonBefore WINTER = new SeasonBefore("冬天");

    @Override
    public String toString() {
        return "SeasonBefore{" +
                "seasonName='" + seasonName + '\'' +
                '}';
    }
}
```

* jdk5后定义枚举的方式

```java
public enum Season {
    SPRING("春天"),
    SUMMER("夏天"),
    AUTUMN("秋天"),
    WINTER("冬天");


    private final String seasonName;

    private Season(String seasonName){
        this.seasonName = seasonName;
    }

    public String getSeasonName() {
        return seasonName;
    }

    @Override
    public String toString() {
        return "Season{" +
                "seasonName='" + seasonName + '\'' +
                '}';
    }
}
```

* 枚举类定义接口操作

```java
public enum SeasonWithInterface implements Runnable{
    // 枚举实例自己实现对应的逻辑
    SPRING("春天"){
        @Override
        public void run() {
            System.out.println("春天 run");
        }
    },
    SUMMER("夏天"),
    AUTUMN("秋天"){
        @Override
        public void run() {
            System.out.println("秋天 run");
        }
    },
    WINTER("冬天");


    private final String seasonName;

    private SeasonWithInterface(String seasonName){
        this.seasonName = seasonName;
    }

    public String getSeasonName() {
        return seasonName;
    }

    @Override
    public String toString() {
        return "Season{" +
                "seasonName='" + seasonName + '\'' +
                '}';
    }

    @Override
    public void run() {
        System.out.println("季节");
    }
}
```

* 测试

```java
public class EnumTest {

    @Test
    public void testEnumBefore() {
        System.out.println(SeasonBefore.SPRING);
        System.out.println(SeasonBefore.SUMMER);
        System.out.println(SeasonBefore.AUTUMN);
        System.out.println(SeasonBefore.WINTER);
    }

    @Test
    public void testEnum() {
        // 由于* 使用`enum`关键字定义的枚举类默认父类是`java.lang.Enum`，toString方法默认会输出实例对象的命令
        System.out.println(Season.SPRING);
        System.out.println(Season.SUMMER);
        System.out.println(Season.AUTUMN);
        System.out.println(Season.WINTER);

        System.out.println("--");
        // Enum父类中的常用方法
        // name() 返回实例的名称
        System.out.println(Season.WINTER.name());

        // 静态方法values
        Season[] values = Season.values();
        for (int i = 0; i < values.length; i++) {
            System.out.println(values[i]);
        }

        // 静态方法valueOf
        System.out.println(Season.valueOf("SPRING")); // 根据命令获取枚举实例
        // System.out.println(Season.valueOf("SPRING1")); // 命令写错则会报错，IllegalArgumentException

        // ordinal返回当前枚举实例在枚举类中的位置索引
        System.out.println(Season.WINTER.ordinal());
    }

    @Test
    public void testEnumWithInterface() {
        // 继承至Runnable接口实现run方法
        // 未主动重写run方法，使用类重写的run方法
        SeasonWithInterface.SUMMER.run();
        SeasonWithInterface.WINTER.run();

        // 定义时重写自己的run方法
        SeasonWithInterface.SPRING.run();
        SeasonWithInterface.AUTUMN.run();
    }
}
```

## 注解（Annotation）

* 注解是jdk5引入，以`@注解名`存在与代码中
* Annotation可以像修饰符一样使用，可以用于修饰包、类、构造器、方法、成员变量、参数、局部变量的声明
* 注解可以在类编译、运行时进行加载，体现不同的功能
* 注解与注释的区别
    * **注释**主要是给程序员看的
    * **注解**可以给程序员看，可以被编译器读取，实现一些特定的功能
* java基础常见的注解：
    * `@Override`：限定重写父类的方法，该注解只能用于方法
    * `@Deprecated`：表示修饰的元素（类、方法等）以过时，不推荐使用或有更好的选择
    * `@SuppressWarnings`：抑制编译器警告

## 注解的定义

```java
public @interface MyAnnotation {
    String value() default "123";
}
```

## 元注解

* 对现有注解进行解释说明的注解
* 说明：
    * `@Target`：用于描述注解的使用范围，可以通过枚举类`ElementType`的对象来指定
    * `@Retention`：用于描述注解的声明周期，通过枚举类`RetentionPolicy`的对象来指定
        * `SOURCE`、`CLASS`、`RUNTIME`
        * 只用`RUNTIME`阶段才能被反射读取
    * `@Documented`：表示这个注解应该被`javadoc`工具记录
    * `@Inherited`：运行子类继承父类的注解

## 包装类

* Java对八种基本数据类型定义了对应的引用类型，**包装类**
* 基本数据类型中，数值类型的父类都是`Number`

| 基本数据类型   | 包装类    |
|--------------- | --------------- |
| byte   | Byte   |
| short   | Short   |
| int   | Integer   |
| long   | Long   |
| float   | Float   |
| double   | Double   |
| boolean   | Boolean   |
| char   | Character   |

### 基本数据类型与包装类型之间的转换

* 基本数据类型转包装类，**成员变量定义为包装类后默认值会变为null**

```java
int i = 1;
Integer integer = Integer.valueOf(i);

float f = 1.1F;
Float float_value = Float.valueOf(f);

boolean b = true;
Boolean.valueOf(b);
```

* 包装类转基本数据类型

```java
Integer i = Integer.valueOf(1);
int int_value = i.intValue();

Double d = Double.valueOf(1.1);
double double_value = d.doubleValue();

Boolean b = Boolean.valueOf(true);
boolean bool = b.booleanValue();
```

* 自动装箱和拆箱（jdk5）

```java
Integer i = 1;
Double d = 2.2;
Boolean b = false;

int i1 = i;
double d1 = d;
boolean b1 = b;
```

### String与基本数据类型和包装类型之间的转换

* 基本数据类型、包装类转String，**调用String.valueOf()及其重载方法**
 
```java
// 调用String.valueOf()方法
int i = 1;
String s1 = String.valueOf(i);

double d = 2.2;
String s2 = String.valueOf(d);

boolean b = true;
String s3 = String.valueOf(b);

// 或直接拼接空串
String s4 = i + "";
String s5 = d + "";
String s6 = b + "";
```

* String转基本数据类型、包装类，**调用各个包装类的parseXXX方法**

```java
String s1 = "132";
int i1 = Integer.parseInt(s1);
String s2 = "132abc";
// int i2 = Integer.parseInt(s2); // 不是数值无法转换，报错NumberFormatException

String s3 = "true";
Boolean b1 = Boolean.valueOf(s3);

String s4 = "TrUe";
Boolean b2 = Boolean.valueOf(s4); // boolean转换时可以无视大小写
```

### 自动装箱相关问题

* 以下两处自动装箱为什么结果不一样
* 因为自动装箱底层调用的是valueOf方法，而方法内对应-128~127之间的数直接会在内部缓存中取，
而超过这个范围后会直接new一个新对象，所以下面一对比较时为false
* 因为实际开开发时使用的这个范围的数据很多，所以直接存放在缓存内

```java
Integer i1 = 1;
Integer i2 = 1;
System.out.println(i1 == i2); // true

Integer i3 = 128;
Integer i4 = 128;
System.out.println(i3 == i4); // false
```

#### 包装类缓存对象

| 包装类   | 缓存对象    |
|--------------- | --------------- |
| Byte   | -128~127   |
| Short   | -128~127   |
| Integer   | -128~127   |
| Long   | -128~127   |
| Float   | 没有   |
| Double   | 没有  |
| Character| 0~127  |
| Boolean   | true和false  |
