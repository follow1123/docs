# Collection

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
