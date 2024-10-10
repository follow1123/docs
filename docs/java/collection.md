---
sidebar_position: 15
---

# 集合框架

## 集合框架类图

### java.util.Collection

```mermaid
classDiagram
direction BT
class AbstractCollection~E~
class AbstractList~E~
class ArrayList~E~
class Collection~E~ {
<<Interface>>

}
class HashSet~E~
class Iterable~T~ {
<<Interface>>

}
class LinkedHashSet~E~
class LinkedList~E~
class List~E~ {
<<Interface>>

}
class TreeSet~E~
class Vector~E~

AbstractCollection~E~  ..>  Collection~E~ 
AbstractList~E~  -->  AbstractCollection~E~ 
AbstractList~E~  ..>  List~E~ 
ArrayList~E~  -->  AbstractList~E~ 
ArrayList~E~  ..>  List~E~ 
Collection~E~  -->  Iterable~T~ 
HashSet~E~  -->  AbstractCollection~E~ 
HashSet~E~  ..>  Collection~E~ 
LinkedHashSet~E~  ..>  Collection~E~ 
LinkedHashSet~E~  -->  HashSet~E~ 
LinkedList~E~  -->  AbstractList~E~ 
LinkedList~E~  ..>  Collection~E~ 
LinkedList~E~  ..>  List~E~ 
List~E~  -->  Collection~E~ 
TreeSet~E~  -->  AbstractCollection~E~ 
TreeSet~E~  ..>  Collection~E~ 
Vector~E~  -->  AbstractList~E~ 
Vector~E~  ..>  List~E~ 
```

* List：存储有序、可重复的数据
* Set：存储无序、不可重复的数据

### java.util.Map

```mermaid
classDiagram
direction BT
class AbstractMap~K, V~
class HashMap~K, V~
class Hashtable~K, V~
class LinkedHashMap~K, V~
class Map~K, V~ {
<<Interface>>

}
class Properties
class TreeMap~K, V~

AbstractMap~K, V~  ..>  Map~K, V~ 
HashMap~K, V~  -->  AbstractMap~K, V~ 
HashMap~K, V~  ..>  Map~K, V~ 
Hashtable~K, V~  ..>  Map~K, V~ 
LinkedHashMap~K, V~  -->  HashMap~K, V~ 
LinkedHashMap~K, V~  ..>  Map~K, V~ 
Properties  -->  Hashtable~K, V~ 
TreeMap~K, V~  -->  AbstractMap~K, V~ 
TreeMap~K, V~  ..>  Map~K, V~ 
```

* Map：存储key-value键值对

---

## java.util.Collection

### 常用方法

* 添加

```java
// 添加元素
Collection c1 = new ArrayList();
c1.add("string");
c1.add(123);
c1.add(new Object());
System.out.println(c1);

Collection c2 = new ArrayList();
c2.add(1);
c2.add(2);

// 添加集合
c1.addAll(c2);
System.out.println(c1);
```

* 判断

```java
// 添加元素
Collection c1 = new ArrayList();
c1.add("string");
c1.add(123);
c1.add(new Object());
System.out.println(c1);

Collection c2 = new ArrayList();
c2.add(1);
c2.add(2);

// 添加集合
c1.addAll(c2);
System.out.println(c1);

// 获取集合内元素个数
System.out.println(c1.size()); // 5

// 判断集合是否为空
System.out.println(c1.isEmpty()); // false

// 判断集合内是否有指定的元素，如果要判断自定义类型，需要重写equals方法
System.out.println(c1.contains(1)); // true

// 判断集合内是否包含另一个集合内的所有元素
System.out.println(c1.containsAll(c2)); // true

// 判断两个集合是否相同
System.out.println(c1.equals(c2)); // false
```

* 删除

```java
// 添加元素
Collection c1 = new ArrayList();
c1.add("string");
c1.add(123);
c1.add(1.1);
c1.add(new Object());

// 删除指定元素，删除自定义元素时也需要重写equals方法
// 如果有多个相同的元素，只会删除一个
c1.remove(1.1);
System.out.println(c1);

// 清空集合，遍历将集合内的所有元素都删除
c1.clear();
System.out.println(c1.size());

// 删除当前集合内所有于另一个集合元素相同的元素
Collection c2 = new ArrayList();
c2.add(1);
c2.add(2);
c2.add(3);
c2.add(4);
Collection c3 = new ArrayList();
c3.add(2);
c3.add(3);

c2.removeAll(c3);
System.out.println(c2); // [1, 4]

// 取两个集合的交集
Collection c4 = new ArrayList();
c4.add(1);
c4.add(2);
c4.add(3);
c4.add(4);
Collection c5 = new ArrayList();
c5.add(3);
c5.add(4);
c5.add(5);
c5.add(6);

c4.retainAll(c5);
System.out.println(c4); // [3, 4]
```

* 其他

```java
// 添加元素
Collection c1 = new ArrayList();
c1.add("string");
c1.add(123);
c1.add(1.1);
c1.add(new Object());

// 集合转换为数组
Object[] array = c1.toArray();

// 计算集合的hash值
System.out.println(c1.hashCode());

// 返回迭代器，用于遍历集合
c1.iterator();
```

### 集合和数组的相互转换

```java
// 添加元素
Collection c1 = new ArrayList();
c1.add("string");
c1.add(123);
c1.add(1.1);
c1.add(new Object());

// 集合转换为数组
Object[] array = c1.toArray();

// 数组转换为集合
Collection c2 = Arrays.asList(1, 2, 3, 4);
System.out.println(c2.size()); // 4

// asList方法内传入对象数组，才会作为数组，传入基本数据类型的引用只会作为一个元素
Collection c3 = Arrays.asList(new int[]{1, 2, 3});
System.out.println(c3.size()); // 1
```

### 集合使用说明

* 放入集合内的元素需要重写`equals()`方法，因为集合内的`contains()`方法和`remove()`等方法会使用到

---

## 迭代器（Iterator）

* 用来遍历集合内的元素

```java
Collection c1 = new ArrayList();
c1.add("string");
c1.add(123);
c1.add(1.1);
c1.add(new Object());

// 获取迭代器对象
Iterator iterator = c1.iterator();

// // 依次获取集合内的元素
// System.out.println(iterator.next());
// System.out.println(iterator.next());
// System.out.println(iterator.next());
// System.out.println(iterator.next());
// // 如果超出集合内元素的个数则会报错NoSuchElementException
// System.out.println(iterator.next());

// 获取迭代器具体实现
System.out.println(iterator.getClass());

// 使用迭代器遍历集合
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

// 遍历时删除指定元素
// while (iterator.hasNext()){
//     if (iterator.next().equals(1.1)){
//         iterator.remove();
//     }
// }
```

* foreach增强for循环（jdk5）
    * 底层使用的就是迭代器

```java
Collection c1 = new ArrayList();
c1.add("string");
c1.add(123);
c1.add(1.1);
c1.add(new Object());

for (Object o : c1) {
    System.out.println(o);
}
```

---

## java.util.List

* 用于存储有序可以重复的数据

### 常用方法

* 具体方法和java.util.Collection内的方法类似
* [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/collection/list/ListTest.java)

### 实现类

* `ArrayList` - 主要实现类，线程不安全、效率高，底层使用Object[]数组实现
    * 在添加数据、查找数据时，效率较高；在插入、删除数据时，效率较低
* `LinkedList` - 底层使用双向链表的方式进行存储
    * 在插入、删除数据时，效率较高；在添加数据、查找数据时，效率较低
* `Vector` - 旧实现类，jdk1.0就存在，List、ArrayList是在jdk1.2添加的，线程安全、效率低，底层使用Object[]数组实现

#### LinkedList

* 特有方法

```java
LinkedList list = new LinkedList();
// 从头部添加
list.addFirst(1);
list.addFirst(2);
// 从尾部添加
list.addLast(9);
list.addLast(8);
System.out.println(list);

// 获取头部的元素
System.out.println(list.getFirst());
// 获取尾部的元素
System.out.println(list.getLast());

// 删除头部的元素
list.removeFirst();

// 删除尾部的元素
list.removeLast();
System.out.println(list);
```

---

## java.util.Set

* 用于存储无序不可重复的数据

### 常用方法

* 具体方法参考java.util.Collection内的抽象方法，没有新增的方法

### 实现类

* `HashSet` - 主要实现类，主要实现类；底层使用的是HashMap，使用数组+单向链表+红黑树进行存储（jdk8），jdk8之前没有红黑树
* `LinkedHashSet` - 是HashSet的子类；在现有的数组+单向链表+红黑树结构的基础上，又添加了一组双向链表，用于记录添加元素的先后顺序。
可以按照添加元素的顺序实现遍历。便于频繁的查询操作。
* `TreeSet` - 底层使用红黑树储。可以按照添加的元素的指定的属性的大小顺序进行遍历。

### 无序性和不可重复性

* **无序性** - 无序性不是随机，与添加的元素的位置有关，是根据添加的元素的哈希值，计算的其在数组中的存储位置。此位置不是依次排列的，表现为无序性
* **不可重复性** - 比较的标准，需要判断`hashCode()`得到的哈希值以及`equals()`的结果。哈希值相同且`equals()`返回`true`，则认为元素是相同的
* 存入HashSet/LinkedHashSet内的自定义元素必须要重写两个方法：`equals()`和`hashCode()`，并要保证`equals()`和`hashCode()`的一致性
* [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/collection/set/SetTest.java)

### TreeSet

* 底层数据结构使用**红黑树**
* 可以按照添加的元素的指定的属性的大小顺序进行遍历
* 要求添加到TreeSet中的元素必须是同一个类型的对象，否则会报**ClassCastException**。添加的元素需要考虑排序
* 添加到TreeSet中的元素的类不需要重写`hashCode()`和`equals()`方法
* 判断数据是否相同的标准：排序方法`compareTo()`或`compare()`的返回值为`0`则两个元素相同
* [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/collection/set/TreeSetTest.java)

---

## java.util.Map

* 存储键值对（key-value）

### 实现类

* `HashMap` - 主要实现类，线程不安全，效率高，可以添加null的key和value值，
底层使用**数组**+**单向链表**+**红黑树**进行存储（jdk8），jdk8之前没有红黑树
* `LinkedHashMap` - 是HashMap的子类；在现有的数组+单向链表+红黑树结构的基础上，又添加了一组双向链表，用于记录添加元素的先后顺序
* `TreeMap` - 底层使用红黑树存储，可以按照key-value键值对里面的key进行排序
* `Hashtable` - 旧实现类，线程不安全，效率低，不可以添加null的key或value值
底层使用**数组**+**单向链表**进行存储
* `Properties` - 里面的key和value方法都是String类型，常用于处理配置文件

### key-value说明

* key在Map中是无序不可重复的可以理解为Set，key所在的类需要重写`equals()`和`hashCode()`方法
* value在map中是无序可重复的可以理解为Collection，value所在的类需要重写`equals()`方法
* Map中的key-value不是分开存放的，而是存放在`Entry`对象内，所有key-value键值对组成`EntrySet`

### 常用方法

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/collection/map/MapTest.java)
* 添加

```java
HashMap map = new HashMap();
map.put("aa", 1);
map.put("bb", 2);

System.out.println(map);

HashMap m = new HashMap();
m.put("cc", 3);
m.put("dd", 4);

map.putAll(m);
System.out.println(map);
```

* 删除

```java
HashMap map = new HashMap();
map.put("aa", 1);
map.put("bb", 2);
System.out.println(map);

Object removedValue = map.remove("aa");
System.out.println(removedValue);
System.out.println(map);
```

* 修改

```java
HashMap map = new HashMap();
map.put("aa", 1);
map.put("bb", 2);
map.put("cc", 3);
System.out.println(map);

// put方法在map内已经存在相同的key时就是修改这个key的值
map.put("bb", 10);
System.out.println(map);

HashMap m = new HashMap();
m.put("cc", 20);
m.put("dd", 4);

// putAll时如果存在相同的key则修改，不存在就添加
map.putAll(m);
System.out.println(map);
```

* 获取

```java
HashMap map = new HashMap();
map.put("aa", 1);
map.put("bb", 2);
map.put("cc", 3);

System.out.println(map.get("aa"));
System.out.println(map.get("cc"));
```

* 遍历

```java
HashMap map = new HashMap();
map.put("aa", 1);
map.put("bb", 2);
map.put("cc", 3);

// 使用增强for循环遍历map中所有的key
for (Object key : map.keySet()) {
    System.out.println(key);
}

System.out.println("-------------");
// 使用迭代器遍历map中的所有value
Collection values = map.values();
Iterator valIterator = values.iterator();
while (valIterator.hasNext()){
    System.out.println(valIterator.next());
}

System.out.println("-------------");
// 使用迭代器遍历map中的Entry并获取里面对应的key-value
Iterator iterator = map.entrySet().iterator();
while (iterator.hasNext()){
    Map.Entry next = (Map.Entry) iterator.next();
    System.out.println("next.getKey() = " + next.getKey());
    System.out.println("next.getValue() = " + next.getValue());
}

System.out.println("-------------");

// 根据keySet遍历所有的key-value
Set keySet = map.keySet();
for (Object key : keySet) {
    System.out.println("key = " + key);
    System.out.println("map.get(key) = " + map.get(key));
}
```

* 其他

```java
HashMap map = new HashMap();
map.put("aa", 1);
map.put("bb", 2);
map.put("cc", 3);

System.out.println(map);

// map的大小，就是entrySet的长度
System.out.println(map.size());

// 判断map中key为aa的数据
System.out.println(map.containsKey("aa"));

// 判断map中是否存在value为4的数据
System.out.println(map.containsValue(4));

// 清空map
map.clear();

System.out.println(map);
```

## ArrayList

* 初始化

  * 初始化为一个空的Object数组
  
* 添加元素

  * 添加第一个元素时将elementData初始化为长度为10的object数组才加入元素
  
  * 在添加元素是会先判断数组的容量够不够，不够这会进行扩容
  
  * 方式
  
    * 当添加到数组最后一个位置前进行扩容
    * 新长度为旧长度+（旧长度右移一位）
    * 使用System.arrayCopy()进行操作
  
    ```java
    //旧数组
    int[] is = {1, 2, 3, 4, 5, 6, 7, 8, 9, 123, 321, 4324, 432, 34, 43, 3};
    //新数组
    int[] newIs = new int[is.length + (is.length >> 1)];
  //扩容操作
    System.arraycopy(is, 0, newIs, 0, is.length);
    ```
  
    
  
* 删除元素

  * 使用数组拷贝方式
  * 使用System.arrayCopy()进行操作

  ```java
  int[] is = {1, 2, 3, 4, 5, 6, 7, 8, 9, 123, 321, 4324, 432, 34, 43, 3};
  //拷贝操作
  System.arraycopy(is, 3 + 1, is, 3, is.length - 4);
  //数组最后一位置空
  is[is.length - 1] = 0;
  ```

## LinkedList

* 插入元素

  * 默认使用尾插法

  ```java
  void linkLast(E e) {
      //获取last对象的指针
      final Node<E> l = last;
      //创建一个新的节点对象
      //传入previous节点，赋值
      final Node<E> newNode = new Node<>(l, e, null);
      //last指针指向新的对象
      last = newNode;
      //判断l指针指向的对象是否为空
      if (l == null)
          //为空说明链表为空，将first指针指向这个新的对象
          first = newNode;
      else
          //否则将原last对象的last指针指向这个新的对象
          l.next = newNode;
      //链表的大小加一
      size++;
      modCount++;
  }
  ```

* 获取元素

  ```java
  //根据下标查找
  public E get(int index) {
      //	判断下标是否合法
      checkElementIndex(index);
      		//根据index查值
      return node(index).item;
  }
  //根据index查值
  Node<E> node(int index) {
  	//如果下标小于链表的大小除2则从前往后找
      if (index < (size >> 1)) {
          Node<E> x = first;
          for (int i = 0; i < index; i++)
              x = x.next;
          return x;
          //否则从后往前找
      } else {
          Node<E> x = last;
          for (int i = size - 1; i > index; i--)
              x = x.prev;
          return x;
      }
  }
  
  ```

* 删除元素

  ```java
  public E remove(int index) {
      //	判断下标是否合法
      checkElementIndex(index);
      //找到下表为index的节点并移除
      return unlink(node(index));
  }
  //移除
  E unlink(Node<E> x) {
      // assert x != null;
      final E element = x.item;
      final Node<E> next = x.next;
      final Node<E> prev = x.prev;
  	//该节点的prev节点为空说明该节点就是first节点
      if (prev == null) {
          //将first指针指向next节点
          first = next;
      } else {
          //否则将prev节点的next指针指向next对象
          prev.next = next;
          //该节点的prev对象置空
          x.prev = null;
      }
  	//该节点的prev节点为空说明该节点就是last节点
      if (next == null) {
          //将last指针指向prev节点
          last = prev;
      } else {
          //否则将next节点的prev指针指向prev对象
          next.prev = prev;
          该节点的next对象置空
          x.next = null;
      }
  	//该节点的数据置空
      x.item = null;
      //该链表的大小减一
      size--;
      modCount++;
      return element;
  }
  ```

## HashMap

* HashMap是由数组链表和红黑树（8加入）组成

* 初始化
  * 将默认负载因子初始化为0.75
* 添加元素
  * 方式一：
    * 获取key的hashcode将其%数组的长度旧可以得到对应的下标
    * 将元素存入数组对应下标的链表内，（7 使用的是头插法， 8 使用的是尾插法）
