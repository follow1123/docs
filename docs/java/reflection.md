---
sidebar_position: 17
---

# 反射

## 概念

* Java程序中，所有的对象都有两种类型：**编译时类型**和**运行时类型**，
* 很多时候对象的编译时类型和运行时类型不一致，例如：`Object str = new String("hello");`
* 此时如果要调用`str`的`indexOf()`方法就需要先使用`instanceof`关键字判断，再强转
* 使用反射就可以在运行时直接调用对应的方法
* Reflection（反射）是被视为**动态语言**的关键，反射机制允许程序在运行期间借助于Reflection API取得任何类的内部信息，并能直接操作任意对象的内部属性和方法
* 加载完类之后，在堆内存的方法区中就产生了一个Class类型的对象（一个类只有一个Class对象），这个对象就包含了完整的类的结构信息。我们可以诵过这个对象看到类的结构

### 基础使用

* 定义[Person](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/reflection/Person.java)类

```java
public class Person {

    public String name;
    private int age;

    public Person() {
        System.out.println("Person init");
    }

    public Person(String name) {
        this.name = name;
    }

    private Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat(){
        System.out.println("吃饭");
    }

    private String sleep(int hours){
        return "睡了" + hours + "个小时";
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

* 测试，[详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/reflection/ReflectionTest.java)

```java
@Test
public void testNormal() {
    // 创建对象
    Person person = new Person();

    // 调用属性
    person.name = "zs";
    System.out.println(person.name);

    // 调用方法
    person.eat();
}

@Test
public void testUseReflection() throws Exception {
    // 创建对象
    Class<Person> personClass = Person.class;
    Person person = personClass.newInstance();

    // 调用属性
    Field nameField = personClass.getField("name");
    nameField.set(person, "zs");
    System.out.println(nameField.get(person));

    // 调用方法
    Method eatMethod = personClass.getMethod("eat");
    eatMethod.invoke(person);
}

@Test
public void testAccessPrivateMembers() throws Exception {
    // 调用私有构造器
    Class<Person> personClass = Person.class;
    Constructor<Person> personConstructor = personClass.getDeclaredConstructor(String.class, int.class);
    // 调用私有构造器前需要设置构造器的访问权限
    personConstructor.setAccessible(true);
    Person person = personConstructor.newInstance("zs", 18);
    System.out.println(person);

    // 调用私有属性
    Field ageField = personClass.getDeclaredField("age");
    // 调用私有属性前需要设置属性的访问权限
    ageField.setAccessible(true);
    ageField.set(person, 20);
    System.out.println(ageField.get(person));

    // 调用私有方法
    Method sleepMethod = personClass.getDeclaredMethod("sleep", int.class);
    // 调用私有方法前需要设置方法的访问权限
    sleepMethod.setAccessible(true);
    String str = (String) sleepMethod.invoke(person, 8);
    System.out.println(str);
}
```

### 主要API

* `java.lang.Class` - 代表类
* `java.lang.reflect.Method` - 代表方法
* `java.lang.reflect.Field` - 代表成员变量
* `java.lang.reflect.Constructor` - 代表构造器

### java.lang.Class

* 在编写代码的时候，可以将业务逻辑封装为一个类，定义一个用户，里面有姓名、年龄等，使用对应的属性或方法访问
* java.lang.Class就是对**类**进行的封装，里面有属性、方法、构造器等部分

#### 获取Class的几种方式

```java
// 使用运行时静态属性获取
Class<Person> class1 = Person.class;

// 使用对象实例的getClass()方法获取
Person person = new Person();
Class<? extends Person> class2 = person.getClass();

// 使用Class.forName方法获取
Class<?> class3 = Class.forName("cn.y.java.reflection.Person");

// 使用类加载器获取
Class<?> class4 = ClassLoader.getSystemClassLoader().loadClass("cn.y.java.reflection.Person");

// Class在运行时只会创建一次
System.out.println(class1 == class2);
System.out.println(class1 == class3);
System.out.println(class1 == class4);
```

### 哪些类型可以有Class对象

* `class` - 外部类，成员（成员内部类，静态内部类），局部内部类，匿名内部类
* `interface` - 接口
* `[]` - 数组
* `enum` - 枚举
* `annotation` - 注解
* `primitive type` - 基本数据类型
* `void` - 空

```java
Class<Object> c1 = Object.class;
Class<Comparable> c2 = Comparable.class;
Class<String[]> c3 = String[].class;
Class<int[][]> c4 = int[][].class;
Class<ElementType> c5 = ElementType.class;
Class<Override> c6 = Override.class;
Class<Integer> c7 = int.class;
Class<Void> c8 = void.class;
Class<Class> c9 = Class.class;

int[] a = new int[10];
int[] b = new int[100];
Class<? extends int[]> aClass = a.getClass();
Class<? extends int[]> bClass = b.getClass();
// 只要类型一样，Class就是一样的，和类型的大小无关
System.out.println(aClass == bClass);
```

### 类的加载过程

* 参考[类加载子系统](./JVM.md#类加载过程)

### 类加载器

* 参考[类加载器](./JVM.md#类加载器)

```java
// jdk8和jdk17类加载器名称不同
ClassLoader systemClassLoader = ClassLoader.getSystemClassLoader();
System.out.println(systemClassLoader);
ClassLoader parent = systemClassLoader.getParent();
System.out.println(parent);
ClassLoader parent1 = parent.getParent();
System.out.println(parent1);

System.out.println("----------");

// 使用应用程序类加载器加载
System.out.println(Person.class.getClassLoader());

// java核心api使用引导类加载器加载
System.out.println(String.class.getClassLoader());
```

* 使用类加载器加载配置文件

```java
InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("config.properties");
Properties prop = new Properties();
prop.load(is);
System.out.println(prop.get("name"));
```
