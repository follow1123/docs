---
sidebar_position: 5
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

## 使用

### 构造器

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/reflection/ConstructorTest.java)

* newInstance方法创建对象

```java
Class<User> userClass = User.class;
/*
    使用这种方式调用的是类的空参构造器，如果类没有空参构造器会报错
    空参构造器的权限必须是public的
 */
User user = userClass.newInstance();
System.out.println(user);
```

* 获取构造器方式

```java
Class<User> userClass = User.class;
Constructor<User> c1 = userClass.getDeclaredConstructor(String.class, int.class);
c1.setAccessible(true);
User user1 = c1.newInstance("zs", 18);
System.out.println(user1);
```

### 属性

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/reflection/FieldTest.java)

* 获取属性

```java
Class<User> userClass = User.class;
// 获取当前类以及父类所有的public修饰的属性
Field[] fields = userClass.getFields();
for (Field field : fields) {
    System.out.println(field);
}

System.out.println("---------------");
// 只获取当前类所有修饰符的属性，不包含父类的属性
Field[] declaredFields = userClass.getDeclaredFields();
for (Field declaredField : declaredFields) {
    System.out.println(declaredField);
}
```

* 获取属性内的信息

```java
Class<User> userClass = User.class;
Field[] declaredFields = userClass.getDeclaredFields();
for (Field f : declaredFields) {
    // 修饰符
    int modifiers = f.getModifiers();
    // 类型
    Class<?> type = f.getType();
    // 名称
    String name = f.getName();

    System.out.printf("field modifier: %s, field type: %s, field name: %s\n",
            Modifier.toString(modifiers), type.getName(), name);
}
```

* 修改或使用public属性

```java
Class<User> userClass = User.class;
User user = userClass.getConstructor().newInstance();

Field nameField = userClass.getField("name");

nameField.set(user, "zs");
System.out.println(nameField.get(user));
```

* 修改或使用非public属性

```java
Class<User> userClass = User.class;
User user = userClass.getConstructor().newInstance();

Field ageField = userClass.getDeclaredField("age");

ageField.setAccessible(true);

ageField.set(user, 18);
System.out.println(ageField.get(user));
```

* 修改或使用static属性

```java
Class<User> userClass = User.class;

Field uidField = userClass.getDeclaredField("uid");
uidField.setAccessible(true);

// 静态属性第一个参数可以填null
// uidField.set(null, 111);
// System.out.println(uidField.get(null));

uidField.set(userClass, 111);
System.out.println(uidField.get(userClass));
```

### 方法

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/reflection/MethodTest.java)

* 获取方法

```java
Class<User> userClass = User.class;

// 获取当前类以及父类所有的public修饰的方法
Method[] methods = userClass.getMethods();
for (Method method : methods) {
    System.out.println(method);
}

System.out.println("---------------");
// 只获取当前类所有修饰符的方法，不包含父类的方法
Method[] declaredMethods = userClass.getDeclaredMethods();
for (Method declaredMethod : declaredMethods) {
    System.out.println(declaredMethod);
}
```

* 获取方法内的信息

```java
Class<User> userClass = User.class;
Method[] methods = userClass.getDeclaredMethods();
for (Method m : methods) {
    System.out.printf("name\t\t\t%s\n", m.getName());
    /*
        获取方法上声明的注解，可以有多个
        注解必须使用@Retention(RetentionPolicy.RUNTIME)声明，保证运行时存在
     */
    Annotation[] annotations = m.getAnnotations();
    System.out.printf("annotations\t\t%d\n", annotations.length);
    for (Annotation annotation : annotations) {
        System.out.println(annotation);
    }

    // 修饰符
    System.out.printf("modifiers\t\t%s\n", Modifier.toString(m.getModifiers()));
    // 返回值类型
    System.out.printf("return type\t\t%s\n", m.getReturnType().getName());

    // 形参列表
    Class<?>[] parameterTypes = m.getParameterTypes();
    System.out.printf("params type\t\t%s\n", parameterTypes.length);
    for (Class<?> parameterType : parameterTypes) {
        System.out.println(parameterType.getName());
    }

    // 抛出的异常
    Class<?>[] exceptionTypes = m.getExceptionTypes();
    System.out.printf("exceptions type\t%s\n", exceptionTypes.length);
    for (Class<?> exceptionType : exceptionTypes) {
        System.out.println(exceptionType);
    }

    System.out.println("------------------------------------------------------------");
}
```

* 调用方法

```java
Class<User> userClass = User.class;
User user = userClass.getConstructor().newInstance();

// 调用带参数的方法
Method sleepMethod = userClass.getDeclaredMethod("sleep", int.class);
sleepMethod.setAccessible(true);

sleepMethod.invoke(user, 8);

// 调用有返回值的方法
Method workingMethod = userClass.getDeclaredMethod("working");
workingMethod.setAccessible(true);

System.out.println(workingMethod.invoke(user));
```

* 调用static方法

```java
Class<User> userClass = User.class;

// 调用静态方法
Method seeMethod = userClass.getDeclaredMethod("see");
seeMethod.setAccessible(true);
seeMethod.invoke(null);
```

### 注解

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/reflection/AnnotationTest.java)

* 获取类上的注解

```java
Class<User> userClass = User.class;
Deprecated d = userClass.getDeclaredAnnotation(Deprecated.class);
System.out.println(d);

System.out.println(d.forRemoval());
System.out.println(d.since());
```

* 获取方法上的注解

```java
Class<User> userClass = User.class;
Method eatMethod = userClass.getDeclaredMethod("eat");
Deprecated d = eatMethod.getDeclaredAnnotation(Deprecated.class);
System.out.println(d);
```

* 获取构造器上的注解

```java
Class<User> userClass = User.class;
Constructor<User> c = userClass.getDeclaredConstructor();
Deprecated d = c.getDeclaredAnnotation(Deprecated.class);
System.out.println(d);
```

### 其他

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/reflection/OtherTest.java)

* `getSuperclass()` - 获取运行时类的父类
* `getInterfaces()` - 获取运行时类实现的接口，返回数组
* `getPackage()` - 获取运行时类所在的包
* `getGenericSuperclass()` - 获取运行时类带泛型的父类
* 获取运行时类带泛型的父类的泛型参数

```java
Class<User> userClass = User.class;
// 获取运行时类带泛型的父类的泛型参数
ParameterizedType pt = (ParameterizedType)userClass.getGenericSuperclass();
Type[] typeArgs = pt.getActualTypeArguments();
for (Type typeArg : typeArgs) {
    System.out.println(typeArg);
}
```

* 获取运行时类带泛型的接口的泛型参数

```java
Class<User> userClass = User.class;
// 获取运行时类带泛型的接口的泛型参数
Type[] ts = userClass.getGenericInterfaces();
for (Type t : ts) {
    System.out.println(t.getTypeName());
    // 由于有些接口不带泛型，所以需要判断
    if (t instanceof ParameterizedType){
        ParameterizedType pt = (ParameterizedType) t;
        Type[] typeArgs = pt.getActualTypeArguments();
        for (Type typeArg : typeArgs) {
            System.out.println(typeArg);
        }
    }
}
```
