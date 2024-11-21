---
sidebar_position: 1
---

# 面向对象三大特性

编程范式，它通过**对象**来组织代码和数据，提倡将现实世界中的事物抽象为程序中的对象

* 面向对象特性：**封装**、**继承**、**多态**、**抽象**
* 其他关键字使用：`this`、`super`、`package`、`import`、`static`、`final`、`interface`、`abstract`

## 封装性（Encapsulation）

面向对象的开发原则要遵循**高内聚**、**低耦合**
* **高内聚** - 类的内部数据操作细节自己完成，不允许外部干涉
* **低耦合** - 尽量暴露少量的方法给外部使用，尽量方便外部调用

封装就是把客观的事物抽象概念的类，并且类可以把自己的数据和方法只向可信的类或对象开放，向没必要开放的类或对象隐藏信息

### Java实现封装性

实现封装就是控制类或成员的可见性范围。需要访问控制修饰符，也称权限修饰符

权限修饰符：`public`、`protected`、`缺省`、`private`


| 修饰符    | 本类内部    | 本包内    | 其他包的子类    | 其他包的非子类    |
|---------------- | --------------- | --------------- | --------------- | --------------- |
| private    | √    | ×    | ×    | ×   |
| 缺省   | √   | √   | ×   | ×   |
| protected   | √   | √   | √   | ×   |
| public   | √   | √   | √   | √   |

:::note[修饰的结构]
**外部类**只能使用 `public` 和 `缺省` 两种权限修饰符

**成员变量**、**成员方法**、**构造器**、**成员内部类**可以使用所有权限修饰符
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/encapsulation/A.java)

定义一个 `A` 类，定义4个属性，分别有4种不同的权限修饰符

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

在 `A` 类相同包下定义一个 `B` 类，使用main方法访问 `A` 类的所有属性

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

在 `A` 类的子包下定义一个 `packag1.C` 类，并继承 `A` 类，使用方法访问 `A` 类的所有属性

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

在 `A` 类的子包下定义一个 `packag2.D` 类，使用main方法访问 `A` 类的所有属性

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


## this关键字

使用位置

* **方法**内 - 表示调用该方法的对象
* **构造器**内 - 表示该构造器正在初始化的对象

:::note[构造器内使用方式]
使用 `this(形参列表)` 可以调用构造器，使用这种方式调用构造器必须声明在**构造器的首行**
:::

:::warning
`static` 方法或代码块内无法使用 `this` 关键字
:::

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

在定义类时发现要定义的类与之前的类有相似点，可以考虑继承之前的类，或将相同点抽象出来一个类并继承

:::info
* 继承的出现减少了代码的冗余，提高了代码的复用性
* 继承的出现有利于功能的扩展
* 继承的出现让类和类之间产生了 `is-a` 的关系，为多态的使用提供了前提。
    * 描述事物之间的所属关系，这种关系是 `is-a` 的关系，父类更通用，子类更具体
:::

通过 `extends` 关键字实现
* 类A - **父类**、**superClass**、**超类**、**基类**
* 类B - **子类**、**subClass**、**派生类**

```java
[修饰符] class 类A {
    ...
}

[修饰符] class 类B extends 类A {
    ...
}
```

:::info[继承的功能]
子类可以获取到父类中的属性和方法（受封装性影响）

子类继承父类之后，可以扩展自己特有的功能（添加属性或方法）
:::

### Java继承体系

Java中声明的类，如果没有显式的声明其父类时，默认继承与 `java.lang.Object`
* 一个类可以**同时拥有**多个子类
* 一个类不可以**同时继承**多个父类（Java只支持单继承，不支持多继承）

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/inheritance/InheritanceTest.java)

<details>
    <summary>定义类</summary>
```java title="父类"
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

```java title="子类"
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
</details>

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

子类对父类继承过来的方法进行覆写的操作，就称为方法的重写

:::info[方法重写的规则]
* 子类重写父类的方法，方法的**名称**，**形参列表**必须相同
* 权限不能小于父类方法的权限修饰符
* 返回值
    * 父类的返回值时void，子类也必须是void
    * 返回值是基本数据类型，子类必须相同
    * 返回值是引用数据类型，子类可以相同，或是其子类
* 异常：子类重写方法抛出的异常必须和父类方法抛出的异常相同或则是其子类
* 方法体没有要求
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/override/OverrideTest.java)

<details>
    <summary>定义类</summary>
```java title="父类"
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

```java title="子类"
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
</details>

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

子类继承父类后重写了父类的某个方法，但是需要调用这个被重写的方法，可以使用 `super.方法`

子类继承父类后，定义了一个与父类重名的属性，需要使用父类的这个属性，可以使用 `super.属性`
:::note
子类出现父类相同的属性是不会覆盖父类的属性，两个属性同时存在
:::
子类继承父类后，在初始化该对象时需要调用父类的构造器，可以使用 `super(形参列表)`
:::note
`super(形参列表)` 必须声明在构造器的首行

`super(形参列表)` 和 `this(形参列表)` 只能二选一

如果首行没有显示调用this或super构造器，则默认调用 `super()` 空参构造器
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/keywords/super_keyword/SuperTest.java)

<details>
    <summary>定义类</summary>
```java title="父类"
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

```java title="子类"
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
</details>

### 调用属性、方法

```java
Student zs = new Student(1, "zs", 11);

// 子类重写方法后调用父类的方法
zs.eat();

// 子类打印属性后打印父类的同名属性
zs.showId();
```

### 调用构造器

```java
// 调用子类无参构造器会默认调用父类无参构造器，打印里面的信息
Student student = new Student();


// 使用super(形参列表)会初始化父类里面的属性
Student zs = new Student(1, "zs", 11);
// 由于Student有一个同名的属性，只初始化了父类的属性，两个id属性的值不同
zs.showId();
```

## 多态性（Polymorphism）

对象的多态性：父类的引用指向子类对象

格式：`父类类型 变量名 = 子类对象`

:::info
要有类的继承关系和方法的重写

多态只适用于方法，不适用于属性
:::
:::note
**好处** - 极大的减少了代码的冗余，不需要定义多个重载的方法

**弊端** - 在多态的场景下，创建了子类的对象，也加载了子类特有的方法和属性，由于声明的是父类的引用，无法直接调用子类的特有方法
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/polymorphism/PolymorphismTest.java)

<details>
    <summary>定义类</summary>
```java title="父类"
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

```java title="子类1"
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

```java title="子类2"
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
</details>

```java
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
```

## 向上转型和向下转型

`instanceof` 关键字，在类型强转前判断甚至是其子类，增加程序的健壮性

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
