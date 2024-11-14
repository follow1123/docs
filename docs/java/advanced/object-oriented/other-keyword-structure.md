---
sidebar_position: 2
---

# 其他关键字和结构

## Object类

类 `java.lang.Object` 是类层次结构的根类，即所有其他类的父类。每个类都使用 `Object` 作为超类

Object类型的变量与除Object以外的任意引用数据类型的对象都存在多态引用

### `equals()`

在需要判断自定义类内的多个属性是否相同的情况下可以使用
:::note
自定义类在没有重写Object的 `equals()` 方法的情况下，调用的就是Object类中声明的 `equals()` 方法，比较两个对象的引用地址是否相同
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/object/equals/EqualsTest.java)

<details>
    <summary>定义类</summary>
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
</details>

```java
User user1 = new User("zs", 11);
User user2 = new User("zs", 11);

// 重写equals方法前，比较对象地址
System.out.println(user1.equals(user2)); // false

// 重写equals方法前后，比较对象内的属性
System.out.println(user1.equals(user2)); // true
```

### `toString()`

用于自定义输出类里面的信息

:::note
`toString()` 方法默认返回当前对象的类名加地址

`System.out.println()` 方法就是使用 `toString()` 打印
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/object/tostring/ToStringTest.java)

<details>
    <summary>定义类</summary>
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
</details>

```java
User zs = new User("zs", 11);
System.out.println(zs);
```

### `clone()`

要有拷贝对象，需要实现 `Cloneable` 接口

<details>
    <summary>定义类</summary>
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
</details>

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
### `finalize()`

gc回收该对象时会调用这个方法

:::warning
jdk9被废弃了，不推荐使用
:::

<details>
    <summary>定义类</summary>
```java
public class Person {

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
    protected void finalize() throws Throwable {
        System.out.println("释放对象" + this.name);
    }
}
```
</details>

```java
Person zs = new Person("zs");
zs = null; // 将引用指向为null表示这个对象是垃圾了，等待被回收，但时间不确定

System.gc(); // 强制释放空间
```

## static关键字

如果想让一个成员变量被类的所有实例所共享，就用 `static` 修饰即可，称为类变量（或类属性）

### static修饰属性

使用 `static` 修饰的成员变量也叫**静态变量**或**类变量**

|     | 静态变量    | 实例变量    |
|---------------- | --------------- | --------------- |
| **个数**    | 内存空间中只有一份，被多个对象共享    | 类的每一个实例都保存这自己的实例变量    |
| **内存位置**   | jdk6及之前存在方法区，jdk7及之后存在堆空间    | 存在堆空间的对象实体中    |
| **加载时机** | 随着类的加载而加载，由于类只会加载一次，所有静态变量只有一份 | 随着对象的创建而加载，每个对象拥有一份实例变量 |
| **调用者** | 可以被类之间调用，也可以被对象调用 | 只能被对象调用 |
| **消亡时机** | 随着类的卸载而消亡 | 随着对象的消亡而消亡 |

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/keywords/static_keyword/StaticTest.java)

<details>
    <summary>定义类</summary>

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
</details>

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

### static修饰方法

`static` 修饰的方法也叫**静态方法**或**类方法**
:::note
静态方法内不用调用对象的实例方法，但实例方法可以调用静态方法

静态方法内不能使用 `this` 或 `super` 关键字，因为静态方法调用时，对象可能没创建
:::

```java
Chinese.show_nation();

Chinese zs = new Chinese("zs", 11);

// 实例方法内调用静态方法
zs.show_info();
```

## 代码块

用来初始化类或对象的成员变量

:::info[静态代码块和非静态代码块]
* 静态代码块随着类的加载而执行，只会执行一次
* 非静态代码块随着对象的创建而执行，执行时机是在构造器的前面
* 多个静态代码块或非静态代码块之间的执行顺序是根据代码块声明的位置而定
* 静态代码块和非静态代码块调用属性和方法的规则与成员方法和静态方法规则相同
:::
:::note
父类的代码块加载时机永远在子类之前
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/block/BlockTest.java)

<details>
    <summary>定义类</summary>
```java title="父类"
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

```java title="子类"
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
</details>

```java
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
```

## final关键字

`final` 可以用来修饰：**类**、**方法**、**变量**
* 修饰**类**表示类不能被继承
* 修饰**方法**表示方法不能被重写
* 修饰变量
    * 可以修饰**成员变量**，**局部变量**，**形参**
    * 修饰这些变量之后都表示变量不能被修改了，也称为**常量**
    *  `final` 配合 `static` 修饰**成员变量**后称为**全局常量**

## abstract关键字（抽象类或抽象方法）

在声明的一些几何图形类中：圆、矩形，三角形等，这些类之间都有共同特征，求面积、周长等，这些共同的特征可以抽取到一个公共的父类中，但这些方法在父类中**无法给出具体的实现**，而是交给子类各自自己实现。那么父类在声明这些方法时，**就只有方法签名，没有方法体**，

没有方法体的方法称为**抽象方法**，Java语法规定，包含抽象方法的类必须时**抽象类**
* **抽象类** - 被 `abstract` 修饰的类
* **抽象方法** - 被 `abstract` 修饰没有方法体的方法

```java
public abstract class AbstractClass {
    abstract void abstractMethod();
}
```

:::info[抽象类]
抽象类不能实例化

抽象类可以没有抽象方法，但抽象方法声明所在的类必须是抽象类
:::
:::info[抽象方法]
抽象方法只有方法声明，没有方法体

子类继承抽象类后必须重写父类的所有抽象方法，否则子类也必须要使用`abstract`修饰（编译器会检查）
:::
:::note
`abstract` 不能修饰属性、构造器、代码块等

`abstract` 不能与私有方法、静态方法、final方法、final类共用
* 私有方法不能被子类访问到所以不能共用
* 避免静态类调用静态方法，静态方法未实现
* final方法不能被重写
* final类不能被继承
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/abstract_class/AbstractTest.java)

<details>
    <summary>定义几何图形抽象类</summary>
```java title="几何图形类"
public abstract class Geometry {
    /**
     * 获取几何图形的面积
     */
    abstract double getArea();
}
```

```java title="圆形"
public class Circle extends Geometry{
    int radius;
    @Override
    double getArea() {
        return Math.PI * (radius * radius);
    }
}
```

```java title="正方形"
public class Square extends Geometry{
    int side;
    @Override
    double getArea() {
       return side * side;
    }
}
```
</details>

```java
Circle circle = new Circle();
circle.radius = 5;
System.out.println(circle.getArea());

Square square = new Square();
square.side = 5;
System.out.println(square.getArea());
```

## interface（接口）

接口就是规范，定义的是一组规则，**继承**是一个**是不是**的 `is-a` 关系，而接口实现则是**能不能**的 `has-a` 关系

```java title="格式"
public interface Interface{
    void abstractMethod();
}
```

:::info[接口结构说明]
声明属性：必须使用 `public static final` 修饰

声明方法：
* jdk8前只能声明抽象方法
* jdk8后可以声明**静态方法**和**默认方法**
* jdk9可以声明**私有方法**

接口内不能有**构造器**、**代码块**
:::
:::info[接口与类的关系]
B类**继承**A类，那么B为A类的**子类**

B类**实现**A类，那么B为A类的**实现类**
:::
:::note
类可以实现多个接口

类必实现接口后必须将接口内的所有抽象方法都重写

接口与接口之间的关系：继承关系，接口之间可以多继承
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/interface_test/InterfaceTest.java)

```java
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
```

### 接口新特性

:::info[JDK8]
**静态方法**：实现类无法调用接口的静态方法

**默认方法**：
* 如果一个**类**实现的两个**接口**都有**同名同参**的**默认方法**，那么这个实现类必须重写这个方法
    * 重写后想要调用其中一个接口的同名方法的话使用 `接口名.super.方法` 调用
* 如果一个类**继承了一个父类**并**实现了一个接口**，这个**父类**和**接口**内都有同名同参的方法，则默认调用父类的同名同参方法，**类优先原则**
:::
:::info[JDK9]
**私有方法**：供接口内的默认方法使用，抽出接口内默认方法内的公共逻辑
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/interface_test/new_methods/InterfaceTest.java)

**静态方法**和**默认方法**

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


        /*
             B类实现了两个接口A、C
             这两个接口都实现了同名同参的默认方法common1
             实现类必须重写这个方法，否则会报错
         */
        b.common1();

        /*
             子类或实现类继承了父类并实现类了接口，父类和接口内都声明了同名同参的方法
             子类没重写这个方法的情况下默认调用的是父类的方法，类有优先则
         */
        b.common2();
    }
}
```

调用多个接口内的同名同参方法

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

将A类定义在B类里面，里面的A类就称为**内部类（InnerClass）**，类B则称为**外部类（OutClass）**

当事物A的内部，还有一个部分需要一个完整的结构B进行描述，而这个内部的完整的结构B又只为外部事物A提供服务，不在其他地方单独使用，那么整个内部的完整结构B最好使用内部类
* `Thread` 内的 `State` 表示线程的生命周期
* `HashMap` 内的 `Node` 表示每个键值对的节点

:::note[内部类分类（和变量分类类似）]
成员内部类：静态成员内部类，非静态成员内部类

局部内部类（声明在方法、构造器、代码块内部）：匿名局部内部类，非匿名局部内部类
:::

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/innerclass/InnerClassTest.java)

<details>
    <summary>定义类</summary>
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
</details>

```java
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
```

## 枚举类

枚举类本质上也是一种对象，只不过这个类的对象是有限的、固定的几个，不能随意创建，比如：**星期（7个）**，**月份（12个）**

在jdk5之后使用 `enum` 关键字定义枚举类

:::info
如果枚举类的实现只有一个，则可以看作单例的实现方式
使用 `enum` 关键字定义的枚举类默认父类是 `java.lang.Enum`
* Enum父类中的常用方法：`toString()`, `static values()`, `static valueOf()`, `name()`, `ordinal()`
* 枚举类可以继承接口，继承接口后所以实例共用定义时重写的方法，如果需要每个实例单独重写方法的逻辑，则可以在定义枚举实例时重写
:::


> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/oop/enum_class/EnumTest.java)

<details>
    <summary>JDK5前定义枚举类的方式</summary>
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
</details>

<details>
    <summary>JDK5后定义枚举类的方式</summary>
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
</details>

<details>
    <summary>枚举类定义接口操作</summary>
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
</details>

```java
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
```

## 注解（Annotation）

Annotation可以像修饰符一样使用，可以用于修饰包、类、构造器、方法、成员变量、参数、局部变量的声明

注解是JDK5引入，以 `@注解名` 存在与代码中，可以在**类编译**、**运行时**进行加载

:::note[注解与注释的区别]
**注释**：主要是给程序员看的
**注解**：可以给程序员看，可以被编译器读取，实现一些特定的功能
:::

java基础常见的注解：
* `@Override` - 限定重写父类的方法，该注解只能用于方法
* `@Deprecated` - 表示修饰的元素（类、方法等）以过时，不推荐使用或有更好的选择
* `@SuppressWarnings` - 抑制编译器警告

```java title="注解的定义"
public @interface MyAnnotation {
    String value() default "123";
}
```

### 元注解

对现有注解进行解释说明的注解

* `@Target` - 用于描述注解的使用范围，可以通过枚举类 `ElementType` 的对象来指定
* `@Retention` - 用于描述注解的声明周期，通过枚举类 `RetentionPolicy` 的对象来指定
    * 包含`SOURCE`、`CLASS`、`RUNTIME`，只用 `RUNTIME` 阶段才能被反射读取
* `@Documented` - 表示这个注解应该被 `javadoc` 工具记录
* `@Inherited` - 运行子类继承父类的注解

## 包装类

Java对八种基本数据类型定义了对应的引用类型：**包装类**

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

:::note
基本数据类型中，**数值类型**的父类都是`Number`
:::
### 基本数据类型与包装类型之间的转换

基本数据类型转包装类，**成员变量定义为包装类后默认值会变为null**

```java
int i = 1;
Integer integer = Integer.valueOf(i);

float f = 1.1F;
Float float_value = Float.valueOf(f);

boolean b = true;
Boolean.valueOf(b);
```

包装类转基本数据类型

```java
Integer i = Integer.valueOf(1);
int int_value = i.intValue();

Double d = Double.valueOf(1.1);
double double_value = d.doubleValue();

Boolean b = Boolean.valueOf(true);
boolean bool = b.booleanValue();
```

自动装箱和拆箱（jdk5）

```java
Integer i = 1;
Double d = 2.2;
Boolean b = false;

int i1 = i;
double d1 = d;
boolean b1 = b;
```

### String与基本和包装类型之间的转换

基本数据类型、包装类转String，**调用String.valueOf()及其重载方法**
 
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

String转基本数据类型、包装类，**调用各个包装类的parseXXX方法**

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

```java
Integer i1 = 1;
Integer i2 = 1;
System.out.println(i1 == i2); // true

Integer i3 = 128;
Integer i4 = 128;
// 为什么是false？
System.out.println(i3 == i4); // false
```
:::info
自动装箱底层调用的是 `valueOf` 方法，而方法内对应-128~127之间的数直接会在内部缓存中取，而超过这个范围后会直接new一个新对象，所以是false

因为实际开开发时使用的这个范围的数据很多，所以直接存放在缓存内
:::


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
