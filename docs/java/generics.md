---
sidebar_position: 16
---

# 泛型

* 在Java中，在声明方法时，当在完成方法功能时如果有未知的数据需要参与这些未知的数据需要在调用方法时才能确定，
那么我们吧这样的数据通过形参表示。在方法体中，用这个形参名来代表那个未知的数据，而调用者在调用时，对应的传入实参就可以
* 在JDK5.0之前只能把元素类型设计为Object, JDK5.0时Java引入了<strong>参数化类型（Parameterized type）</strong>的概念，允许我们在创建集合时指定集合元素的类型

## Java内泛型的使用

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/generics/GenericsTest.java)

### List使用泛型

```java
ArrayList<String> list = new ArrayList<>();

// 添加
list.add("a");
list.add("b");

// 获取，直接获取指定类型对象，无需强转
String s = list.get(0);

// 遍历
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()){
    String str = iterator.next();
    System.out.println(str);
}

for (String string : list) {
    System.out.println(string);
}
```

### Map使用泛型

```java
HashMap<String, Integer> map = new HashMap<>();

// 添加
map.put("a", 1);
map.put("b", 2);

// 获取
Integer integer = map.get("a");

// 遍历
Set<Map.Entry<String, Integer>> entries = map.entrySet();
Iterator<Map.Entry<String, Integer>> iterator = entries.iterator();

while (iterator.hasNext()){
    Map.Entry<String, Integer> next = iterator.next();
    String key = next.getKey();
    Integer value = next.getValue();
    System.out.println("key = " + key);
    System.out.println("value = " + value);
}
```

### 排序使用泛型

#### 定制排序

* 对象内继承Comparable接口并指定泛型

```java
public class User implements Comparable<User> {
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
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public int compareTo(User o) {
        // 使用泛型后无需强转
        if (this == o) return 0;
        return Integer.compare(this.age, o.age);
    }
}
```

* 使用

```java
ArrayList<User> users = new ArrayList<>();

users.add(new User("zs", 11));
users.add(new User("ls", 21));
users.add(new User("ww", 15));
users.add(new User("zl", 32));

System.out.println(users);
// 默认根据年龄排序
Collections.sort(users);

System.out.println(users);
```


#### 定制排序

```java
ArrayList<User> users = new ArrayList<>();

users.add(new User("zs", 11));
users.add(new User("ls", 21));
users.add(new User("zw", 21));
users.add(new User("ww", 15));
users.add(new User("zl", 32));

System.out.println(users);

// 定制排序，先根据年龄降序排序，再根据姓名排序
Collections.sort(users, new Comparator<User>() {
    @Override
    public int compare(User o1, User o2) {
        if (o1 == o2) return 0;

        int compare = Integer.compare(o1.getAge(), o2.getAge());
        if (compare != 0){
            return -compare;
        }
        return o1.getName().compareTo(o2.getName());
    }
});

System.out.println(users);
```

## 自定义泛型

### 泛型类

* 格式

```java
// 泛型类
class A<T> {

    // 使用泛型定义属性
    T genericField;
}

// 泛型接口
interface B<T> {

}
```

#### 说明

* 声明完自定义泛型类以后，可以在类的内部（属性、方法、构造器中）使用类的泛型
* 我们在创建自定义泛型类的对象时，可以指明泛型参数类型。一旦指明，内部凡是使用类的泛型参数的位置，都具体化为指定的类的泛型类型
* 如果在创建自定义泛型类的对象时，没有指明泛型参数类型，那么泛型将被除，泛型对应的类型均按照Object处理，但不等价于Object
* 泛型的指定中必须使用引用数据类型。不能使用**基本数据类型**，只能使用**包装类**替换
* 除创建泛型类对象外，子类继承泛型类时、实现类实现泛型接囗时，也可以确定泛型结构中的泛型参数
* 如果我们在给泛型类提供子类时，子类也不确定泛型的类型，则可以继续使用泛型参数，还可以在现有的父类的泛型参数的基础上，新增泛型参数
* 创建泛型类时，如果需要定义多个泛型参数，可以使用`<E1, E2, E3>`方式，使用逗号分割
* 不能使用`new E[]`创建泛型参数数组，但可以使用`E[] elements = (E[]) new Object[capacity];`这种方式创建
* 不能在静态方法中使用类的泛型属性
* 异常类不能带泛型

#### 继承泛型类的情况

* 定义泛型类

```java
public class A<T> {
    T genericField;
}
```

* 继承泛型类时不指定父类泛型的类型

```java
public class A1 extends A{

    public A1() {
        // 在不指定泛型类型时，默认的泛型属性的类型是Object
        Object o = genericField;
    }
}
```

* 继承泛型类，指定父类的泛型类型

```java
public class A2 extends A<String>{

    public A2() {
        // 在指定父类泛型类型时，泛型属性就是指定的类型
        String str = genericField;
    }
}
```

* 继承泛型类，使用自己的泛型类型指定父类的泛型类型

```java
public class A3<T> extends A<T>{

}
```

* 指定父类的泛型类型，但自己也有泛型参数

```java
public class A4<T> extends A<Integer>{

    // 自己的泛型属性
    T subGenericField;
}
```

* 当前类有多个泛型参数，指定父类的泛型参数

```java
public class A5<T, E> extends A<T> {

    E element;
}
```

### 泛型方法
