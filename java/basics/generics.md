---
sidebar_position: 4
---

# 泛型

泛型 是一种允许在定义类、接口或方法时使用类型参数的机制，可以让代码在类型安全的前提下更加通用和灵活

在Java中，在声明方法时，当在完成方法功能时如果有未知的数据需要参与这些未知的数据需要在调用方法时才能确定，那么我们吧这样的数据通过形参表示。在方法体中，用这个形参名来代表那个未知的数据，而调用者在调用时，对应的传入实参就可以

在JDK5.0之前只能把元素类型设计为Object, JDK5.0时Java引入了<strong>参数化类型（Parameterized type）</strong>的概念，允许我们在创建集合时指定集合元素的类型

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

<details>
    <summary>继承Comparable接口并指定泛型</summary>
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
</details>

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

```java title="格式"
// 泛型类
class A<T> {

    // 使用泛型定义属性
    T genericField;
}

// 泛型接口
interface B<T> {

}
```

:::info
* 声明完自定义泛型类以后，可以在类的内部（属性、方法、构造器中）使用类的泛型
* 我们在创建自定义泛型类的对象时，可以指明泛型参数类型。一旦指明，内部凡是使用类的泛型参数的位置，都具体化为指定的类的泛型类型
* 如果在创建自定义泛型类的对象时，没有指明泛型参数类型，那么泛型将被除，泛型对应的类型均按照Object处理，但不等价于Object
* 泛型的指定中必须使用引用数据类型。不能使用**基本数据类型**，只能使用**包装类**替换
* 除创建泛型类对象外，子类继承泛型类时、实现类实现泛型接囗时，也可以确定泛型结构中的泛型参数
* 如果我们在给泛型类提供子类时，子类也不确定泛型的类型，则可以继续使用泛型参数，还可以在现有的父类的泛型参数的基础上，新增泛型参数
* 创建泛型类时，如果需要定义多个泛型参数，可以使用 `<E1, E2, E3>` 方式，使用逗号分割
:::
:::warning
* 不能使用 `new E[]` 创建泛型参数数组，但可以使用 `E[] elements = (E[]) new Object[capacity];` 这种方式创建
* 不能在静态方法中使用类的泛型属性
* 异常类不能带泛型
:::

#### 继承泛型类的情况

定义泛型类

```java
public class A<T> {
    T genericField;
}
```

继承泛型类时不指定父类泛型的类型

```java
public class A1 extends A{

    public A1() {
        // 在不指定泛型类型时，默认的泛型属性的类型是Object
        Object o = genericField;
    }
}
```

继承泛型类，指定父类的泛型类型

```java
public class A2 extends A<String>{

    public A2() {
        // 在指定父类泛型类型时，泛型属性就是指定的类型
        String str = genericField;
    }
}
```

继承泛型类，使用自己的泛型类型指定父类的泛型类型

```java
public class A3<T> extends A<T>{

}
```

指定父类的泛型类型，但自己也有泛型参数

```java
public class A4<T> extends A<Integer>{

    // 自己的泛型属性
    T subGenericField;
}
```

当前类有多个泛型参数，指定父类的泛型参数

```java
public class A5<T, E> extends A<T> {

    E element;
}
```

### 泛型方法

泛型方法在声明需要添加泛型参数 `<T>`，泛型方法可以是静态方法
:::warning
方法只使用了**泛型类**指定的**泛型参数**，这个方法不是泛型方法
:::

```java title="格式"
public <E> E method(E e){
}
```

```java
/**
 * 普通泛型方法
 */
public <E> List<E> add(E[] arr){
    List<E> list = new ArrayList<>();
    for (int i = 0; i < arr.length; i++) {
        list.add(arr[i]);
    }
    return list;
}

/**
 * 静态多个参数的泛型方法
 */
public static <K, V> Map<K, V> put(K k1, V v1, K k2, V v2){
    Map<K, V> map = new HashMap<>();
    map.put(k1, v1);
    map.put(k2, v2);

    return map;
}

@Test
public void test() {
    // 指定泛型参数为Integer
    List<Integer> list = add(new Integer[]{1, 3, 4, 43,});
    System.out.println(list);

    // 指定泛型参数为String和Integer
    Map<String, Integer> map = put("a", 1, "b", 2);
    System.out.println(map);
}
```

## 通配符

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/generics/wildcards/WildcardsTest.java)

### 泛型和继承的关系

两个类相同的情况下，尽管这两个类的泛型参数是子父类关系，两个类也不能互相赋值

```java
// 容器相同，泛型参数是子父类的关系
ArrayList<Object> list1 = null;
ArrayList<String> list2 = new ArrayList<>();
/*
 无法将泛型参数为Object的数组赋值给泛型参数为String的数组，尽管String是Object的子类
 如果可以的话会出现以下情况
 list1 = list2;
 list2.add("a");
 list1.add(100);
 
 此时获取获取下标为1的数据时是一个整数，而list2是String类型的数组
 list2.get(1);
 */
// list1 = list2;

// 容器是子父类关系，泛型参数相同
HashSet<String> set1 = null;
LinkedHashSet<String> set2 = new LinkedHashSet<>();

// 可以赋值
set1 = set2;

set1.add("a");
set2.add("b");
System.out.println(set1);
```

### 通配符`?`

* `List<?>`可以作为`List<String>`的父类使用，但是只能读取数据，无法写入数据
* 由于无法确定类型，所有读取数据的类型都是`Object`
* 由于所有引用类型的值都可以是null，所以可以写入null值

```java
List<?> list = null;
List<String> list1 = new ArrayList<>();

list1.add("a");
list = list1;

// 可以读取数据
Object o = list.get(0);

// 无法写入数据
// list.add("b");

// 但是可以写入null值，因为所有引用类型的值都可以是null
list.add(null);
```

### 有限制条件的通配符

<details>
    <summary>定义一对父子类 `Son` 和 `Father`，其中 `Son` 继承 `Father`</summary>
```java
// 父类
public class Father { }

// 子类
public class Son extends Father{ }
```
</details>


#### `? extends Class`

测试 `extends` 条件的通配符赋值情况

```java
List<? extends Father> list = null;

List<Object> list1 = null;
List<Father> list2 = null;
List<Son> list3 = null;

// 无法赋值Father类型的父类
// list = list1;

// 可以赋值Father类型及其子类
list = list2;
list = list3;
```

测试 `extends` 条件的通配符操作情况

```java
List<? extends Father> list = null;
List<Father> list1 = new ArrayList<>();

list1.add(new Father());
list = list1;

// 可以获取数据，数据的类型确定为Father
Father father = list.get(0);

/*
 无法添加除null以外的所有数据
 从List<? extends Father>泛型参数无法看出运行时集合内元素的具体类型，
 因为Father的子类可以无限被其子类继承
 */
list.add(null);
// list.add(new Father());
// list.add(new Son());
```

#### `? super Class`

测试 `super` 条件的通配符赋值情况

```java
List<? super Father> list = null;

List<Object> list1 = null;
List<Father> list2 = null;
List<Son> list3 = null;

// 可以赋值为Father和它的父类
list = list1;
list = list2;

// 无法赋值Father的子类
// list = list3;
```

测试 `super` 条件的通配符操作情况

```java
List<? super Father> list = null;
List<Father> list1 = new ArrayList<>();

list1.add(new Father());
list = list1;

// 可以获取数据，但无法获取具体类型，所以返回类型是Object
Object o = list.get(0);

/*
 无法添加Father的父类，可以添加Father及其子类
 从List<? super Father>泛型参数可以看出运行时集合内元素至少是一个Father类型
 所以可以添加Father及其子类
 */
// list.add(new Object());
list.add(new Father());
list.add(new Son());
```
