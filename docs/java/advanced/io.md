---
sidebar_position: 1
---

# IO

## File类使用

* 在`java.io`包下
* 对应操作系统的**文件**或**目录/文件夹**

### 构造器

```java
/*
 相对路径创建File文件
 当前使用test方法创建File对象，相对路径就是当前模块下
 如果是使用main方法创建File对象，则相对路径就是当前工程下

 test方式
 project-name 项目名称
 │
 ├─module1 模块1
 │
 ├─module2 模块2
 │
 └─a.txt 文件

 main方式
 project-name 项目名称
 │
 ├─module1 模块1
 │  │
 │  └─a.txt 文件
 │
 └─module2 模块2
 */
File file = new File("a.txt");
System.out.println(file);


// 绝对路径创建目录
File file1 = new File("C:\\b");
System.out.println(file1);

/*
 绝对路径创建文件，使用指定子文件方式
 如果使用这种方式，第一个参数必须是目录，第二个参数可以是文件也可以是目录
 */
File file2 = new File("C:\\b", "a.txt");
System.out.println(file2);

// 和上面类似，只不过第一个参数是File对象
File file3 = new File(new File("C:\\b"), "b.txt");
System.out.println(file3);
```

### 方法

#### 获取文件或目录基本信息

```java
// 相对路径文件信息
File file = new File("a.txt");
// 获取名称
System.out.println(file.getName());
// 获取路径
System.out.println(file.getPath());
// 获取绝对路径，直接返回路径字符串
System.out.println(file.getAbsolutePath());
// 获取绝对路径对象，返回路径File对象
System.out.println(file.getAbsoluteFile());
// 获取上层文件或目录
System.out.println(file.getParent());
// 获取文件长度，只对文件有效
System.out.println(file.length());
// 获取上次修改时间
System.out.println(file.lastModified());

System.out.println("-----------------");

// 绝对路径目录信息
File dir = new File("C:\\b");
// 获取名称
System.out.println(dir.getName());
// 获取路径
System.out.println(dir.getPath());
// 获取绝对路径，直接返回路径字符串
System.out.println(dir.getAbsolutePath());
// 获取绝对路径对象，返回路径File对象
System.out.println(dir.getAbsoluteFile());
// 获取上层文件或目录
System.out.println(dir.getParent());
// 获取文件长度，只对文件有效
System.out.println(dir.length());
// 获取上次修改时间
System.out.println(dir.lastModified());
```

#### 列出目录的下一级

```java
// 获取用户目录
String home = System.getProperty("user.home");

File file = new File(home);

// 获取目录下一级所有文件或目录
String[] filePathList = file.list();
for (String filePath : filePathList) {
    System.out.println(filePath);
}

// 获取目录下一级所有文件或目录的File对象
File[] fileList = file.listFiles();
for (File f : fileList) {
    System.out.println(f);
}
```

#### 文件或目录重命名

* 相同路径下文件会重命名，不同路径下文件会移动
* 不同路径下如果目标路径不存在，则移动失败

```java
// 测试路径，用户桌面
String dir = System.getProperty("user.home") + File.separator + "Desktop";
// 原文件
String src = dir + "\\a.txt";

/*
 原文件存在，目标文件不存在
 路径相同，文件名称不同
 */
// 目标文件
String dest1 = dir + "\\b.txt";
File file1 = new File(src);
// 重命名成功
// System.out.println(file1.renameTo(new File(dest1)));

System.out.println("-----------------");
/*
 原文件存在，目标文件不存在
 路径不同，目标路径存在
 */
String dest2 = dir + "\\b\\a.txt";
File file2 = new File(src);
// 将文件移动到对应的路径上
// System.out.println(file2.renameTo(new File(dest2)));

System.out.println("-----------------");
/*
 原文件存在，目标文件不存在
 路径不同，目标路径不存在
 */
String dest3 = dir + "\\b\\a.txt";
File file3 = new File(src);
// 无法移动文件
// System.out.println(file3.renameTo(new File(dest3)));
```

#### 文件判断相关

```java
// 存在的目录，当前工程下的src目录肯定存在
File dir = new File("src");
// 文件或目录是否存在
System.out.println(dir.exists());
// 是否为目录
System.out.println(dir.isDirectory());
// 是否为文件
System.out.println(dir.isFile());
// 是否可读
System.out.println(dir.canRead());
// 是否可写
System.out.println(dir.canWrite());
// 是否是隐藏状态
System.out.println(dir.isHidden());

System.out.println("-----------------");
// 不存在的文件
File file = new File("abc.txt");
// 文件或目录是否存在
System.out.println(file.exists());
// 是否为目录
System.out.println(file.isDirectory());
// 是否为文件
System.out.println(file.isFile());
// 是否可读
System.out.println(file.canRead());
// 是否可写
System.out.println(file.canWrite());
// 是否是隐藏状态
System.out.println(file.isHidden());
```

#### 文件的创建或删除

```java
// 测试路径，用户桌面
String dir = System.getProperty("user.home") + File.separator + "Desktop";

// 创建新文件，如果文件存在就创建，返回true，如果不存在则不创建，返回false
File file = new File(dir, "a.txt");
System.out.println(file.createNewFile());


// 在测试路径下创建a\b目录，因为上层目录a不存在，所以无法创建b目录
File file1 = new File(dir, "a\\b");
System.out.println(file1.mkdir());

// 在测试路径下创建a\b目录，如果上层目录不存在则依次创建
File file2 = new File(dir, "a\\b");
System.out.println(file2.mkdirs());

// 删除文件
File file3 = new File(dir, "a.txt");
System.out.println(file3.delete());

// 删除目录，因为a，目录下已经有b目录，需要使用递归删除的方式
File file4 = new File(dir, "a");
System.out.println(file4.delete());
```

#### 递归打印文件

```java
private void recursionPrintFile(File file){
    if (!file.exists()) return;
    if (file.isFile()){
        System.out.println(file.getName());
    }else if (file.isDirectory()){
        System.out.println(file.getName() + "-----------");
        for (File listFile : file.listFiles()) {
            recursionPrintFile(listFile);
        }
    }
}
```

---

## Java IO

* I/O流（Input/Output），用于处理设备之间的数据传输。如读/写文件，网络通讯等
    * **input** - 读取外部数据（磁盘、光盘等存储设备的数据）到程序（内存）中
    * **output** - 将程序（内存）数据输出到磁盘、光盘等存储设备中

### 流的分类

* `java.io`包下提供了各种**流**类和接囗，用以获取不同种类的数据，并通过标准的方法输入或输出数据
* 按数据流向不同：
    * **输入流** - 把数据从**其他设备**上读取到**内存**中的流，以`InputStream`、`Reader`结尾
    * **输出流** - 把数据从**内存**中写出到**其他设备**上的流，以`OutputStream`、`Writer`结尾
* 操作数据的单位不同：
    * **字节流（8bit）** - 以字节为单位，读写数据的流，以`InputStream`、`OutputStream`结尾
    * **字符流（16bit）** - 以字符为单位，读写数据的流，以`Reader`、`Writer`结尾
* IO流的角色不同：
    * **节点流** - 直接从数据源或目的地读写数据
    * **处理流** - 不直接连接到数据源或目的地，而是**连接**在已存在的流（节点流或处理流）之上，通过对数据的处理为程序提供更为强大的读写功能

### 流的API

* Java的IO流共涉及40多个类，都是从如下4个抽象基类派生的

| 抽象类    | 输出流    | 输出流    |
|---------------- | --------------- | --------------- |
| 字节流    | InputStream    | OutputStream    |
| 字符流    | Reader    | Writer    |

* 由这四个类派生出来的子类名称都是以貝父类名作为子类名后缀

| 分类    | 字节输入流    | 字节输出流    | 字符输入流    | 字符输出流    |
|---------------- | --------------- | --------------- | --------------- | --------------- |
| 抽象基类    | **InputStream**    | **OutputStream**    | **Reader**    | **Writer**   |
| 访问文件   | **FileInputStream**   | **FileOutputStream**   | **FileReader**   | **FileWriter**   |
| 访问数组   | ByteArrayInputStream   | ByteArrayOutputStream   | CharArrayReader   | CharArrayWriter   |
| 访问管道   | PipedInputStream   | PipedOutputStream   | PipedReader   | PipedWriter   |
| 访问字符串 | | | StringReader | StringWriter |
| 缓冲流 | **BufferedInputStream** | **BufferedOutputStream** | **BufferedReader** | **BufferedWriter** |
| 转换流 | | | **InputStreamReader** | **OutputStreamWriter** |
| 对象流 | **ObjectInputStream** | **ObjectOutputStream** | | |
| 过滤流 | FilterInputStream | FilterOutputStream | FilterReader | FilterWiter |
| 打印流 | | PrintStream | | PrintWriter |
| 推回输入流 | PushbackInputStream | | PushbackReader | |
| 特殊流 | DataInputStream | DataOutputStream | | |

## 字符流

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/io/file_stream/FileReaderWriterTest.java)

### FileReader

* 使用`FileReader`将数据从文件内一个字符一个字符的读取

```java
// 创建文件的file对象
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/test1.txt");
FileReader fileReader = null;
try {
    // 创建流
    fileReader = new FileReader(file);
    // 读取数据
    int data;
    while ((data = fileReader.read()) != -1){
        System.out.print((char) data);
    }
} catch (IOException e) {
    e.printStackTrace();
} finally {
    // 关闭流
    if (fileReader != null) {
        try {
            fileReader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

* 使用`try-with-resource`简化关闭流操作
    * 放入`try()`内的流会自动关闭

```java
// 创建文件的file对象
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/test1.txt");
// 创建流
try(FileReader fileReader = new FileReader(file)){
    // 读取数据
    int data;
    while ((data = fileReader.read()) != -1){
        System.out.print((char) data);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

* 使用`FileReader`通过添加临时char数组保存数据，减少对磁盘的访问，提高读取速度

```java
// 创建文件的file对象
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/test1.txt");
// 创建流
try(FileReader fileReader = new FileReader(file)){
    char[] chars = new char[4];
    // 读取数据，一次读取多个数据
    int len = 0;
    while ((len = fileReader.read(chars)) != -1){
        System.out.print(new String(chars, 0, len));
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

### FileWriter

* 使用`FileWriter`写出数据

```java
// 创建文件的file对象
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/test2.txt");
/*
 创建文件输出流
 文件不存在默认创建，文件存在默认覆盖
 创建输出流时第二个参数，表示文件存在就追加内容
 */
try (FileWriter fileWriter = new FileWriter(file)) {
    // 写出数据
    fileWriter.write("abc");
    System.out.println("完成");
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

## 字节流

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/io/file_stream/FileInputOutputStreamTest.java)

### FileInputStream/FileOutputStream

* 使用`FileReader`和`FileWriter`复制图片，图片会损坏

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/jjlight.jpg");
File destFile = new File(projectPath, "src/main/resources/jjlight_copy.jpg");

try (FileReader fileReader = new FileReader(file);
     FileWriter fileWriter = new FileWriter(destFile)) {
    char[] chars = new char[4];
    int len;
    while ((len = fileReader.read(chars)) != -1){
        fileWriter.write(chars, 0, len);
    }

    System.out.println("done");
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

* 使用`FileInputStream`和`FileOutputStream`复制图片

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/jjlight.jpg");
File destFile = new File(projectPath, "src/main/resources/jjlight_copy.jpg");


try (FileInputStream fis = new FileInputStream(file);
     FileOutputStream fos = new FileOutputStream(destFile)) {
    byte[] bytes = new byte[1024];
    int len;
    while ((len = fis.read(bytes)) != -1){
        fos.write(bytes, 0, len);
    }

    System.out.println("done");
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

* 使用`FileInputStream`读取文本文件到控制台上显示
    * 文本文件内有中文可能乱码
    * 因为中文编码内一个中文是由多个字节组成的
    * 在读取数据时，可能刚好读取中文的一半就输出了，所以导致乱码

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/test1.txt");

try (FileInputStream fis = new FileInputStream(file)) {
    byte[] bytes = new byte[4];
    int len;
    while ((len = fis.read(bytes)) != -1){
        String s = new String(bytes, 0, len);
        System.out.print(s);
    }

    System.out.println();
    System.out.println("done");
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

## 缓冲流

### 字符缓冲流

#### BufferedReader/BufferedWriter

> 对[FileReader](#filereader)和[FileWriter](#filewriter)的包装，
> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/io/buffered/BufferedReaderWriterTest.java)

* 读取utf8文件输出到控制台

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/file_utf8.txt");
try(BufferedReader br = new BufferedReader(new FileReader(file))) {
    char[] chars = new char[1024];
    int len;
    while ((len = br.read(chars)) != -1){
        System.out.println(new String(chars, 0, len));
    }
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

* 读取utf8文件输出到控制台，使用`readLine()`方法

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/file_utf8.txt");
try(BufferedReader br = new BufferedReader(new FileReader(file))) {
    String line;
    // 每次读取一行，不包括行尾的换行符
    while ((line = br.readLine()) != null){
        System.out.println(line);
    }
} catch (IOException e) {
    throw new RuntimeException(e);
}
```


* 复制文件，使用`flush()`方法
     * 使用`flush()`将内存的数据实时写出到磁盘
     * 调用`close()`方法关闭流时也会将数据写入到磁盘
     * 如果未调用`flush()`，结束时也未调用`close()`方法关闭流，可能出现数据丢失问题


```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/file_utf8.txt");
File dest = new File(projectPath, "src/main/resources/file_utf8_copy.txt");

try(BufferedReader br = new BufferedReader(new FileReader(file));
    BufferedWriter bw = new BufferedWriter(new FileWriter(dest))) {
    String line;
    while ((line = br.readLine()) != null){
        bw.write(line);
        bw.newLine();
        /*
         使用flush()将内存的数据实时写出到磁盘
         调用close()方法关闭流时也会将数据写入到磁盘
         如果未调用flush()，结束时也未调用close()方法关闭流，可能出现数据丢失问题
         */
        bw.flush();
    }
    System.out.println("done");
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

### 字节缓冲流

#### BufferedInputStream/BufferedOutputStream

> 对[FileInputStream/FileOutputStream](#fileinputstreamfileoutputstream)的包装，
> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/io/buffered/BufferedInputOutputStreamTest.java)

* 使用缓冲流复制大文件

```java
private void copyVideoWithBuffered(String file, String dest) {
    try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
         BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(dest))) {

        byte[] bytes = new byte[1024];
        int len;
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes, 0, len);
        }

        System.out.println("done");
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
```

## 转换流

* 编码和解码
    * **编码** - 将可以识别的内容转换为不能识别的内容
    * **解码** - 将不能识别的内容转换为可以识别的内容
* **字符集** - 编码和解码时对应的字典
* 解码时的字符集和编码时的字符集必须相同
* 大部分常用的字符集（UTF-8、GBK等）都兼容ASCII

| 字符集   | 描述    |
|--------------- | --------------- |
| ASCII   | 包含128个字符，基本的拉丁字母、数字和常用符号   |
| ISO-8859-1 | 包含西欧语言的字符，每个字符占1个字节，兼容ASCII |
| GBK | 存储中间简体繁体，中文占2个字节，兼容ASCII，如果是ASCII还是占用一个字节 |
| UTF-8 | 存储世界上所有字符，Unicode的实现，使用1~4个不等长的字节表示一个字符，中文占3个字节，兼容ASCII，占1个字节 |

### InputStreamReader/OutputStreamWriter

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/io/transform/EncodeDecodeTest.java)

* 读取UTF-8格式保存的文本并在控制台打印

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/file_utf8.txt");
try(InputStreamReader isr = new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8)){
    char[] chars = new char[1024];
    int len;
    while ((len = isr.read(chars)) != -1){
        System.out.println(new String(chars, 0, len));
    }
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

* 读取GBK格式保存的文本并在控制台打印

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/file_gbk.txt");
try(InputStreamReader isr = new InputStreamReader(new FileInputStream(file), Charset.forName("gbk"))){
    char[] chars = new char[1024];
    int len;
    while ((len = isr.read(chars)) != -1){
        System.out.println(new String(chars, 0, len));
    }
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

* 将UTF-8格式文本转换为GBK格式并保存

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/file_utf8.txt");
File file1 = new File(projectPath, "src/main/resources/file_gbk.txt");
try(InputStreamReader isr = new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8);
    OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(file1), Charset.forName("gbk"))) {
    char[] chars = new char[1024];
    int len;
    while ((len = isr.read(chars)) != -1){
        osw.write(chars, 0, len);
    }
    System.out.println("done");
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

## 对象流

* **数据流** - `DataInputStream/DataOutputStream` 8种基本数据类型和String类型的输入输出流操作
* **对象流** - `ObjectInputStream/ObjectOutputStream` 除了支持数据流所支持的类型，还支持对象

### 对象序列化机制

* 对象序列化机制允许把内存中的Java对象转换成平台无关的二进制流，从而允许把这种二进制流持久地保存在磁盘上，或通过网络将这种二进制流传输到另一个网络节点
* 当其它程序获取了这种二进制流，就可以恢复成原来的Java对象
* 序列化和反序列化过程：
    * **序列化** - 使用`ObjectOutputStream`将内存中的Java保存在文件或通过网络传输
    * **反序列化** - 使用`ObjectInputStream`将文件中的数据还原为内存中的Java对象
* 实现自定义类进行序列化相关说明：
    * 需要实现`Serializale`接口
    * 需要声明一个全局常量：`static final long serialVersionUID = 213432432L;`用来唯一标识这个类
        * 没加这个全局常量的情况下，系统后自动生成一个`serialVersionUID`，如果修改这个类后在进行反序列化，就会出现`InvalidClassException`异常
    * 如果对象内有自定义的属性，这个属性也需要实现`Serializale`接口
    * 类中的属性如果声明为`transient`或`static`，则不会实现序列化

### ObjectInputStream/ObjectOutputStream

#### 基本数据类型和String的操作

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/io/object_stream/DataObjectStreamTest.java)

* 序列化

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/data.txt");
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
    oos.writeInt(1);
    oos.writeFloat(1.1F);
    oos.writeChar('a');
    oos.writeBoolean(true);
    oos.writeUTF("测试");
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

* 反序列化

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/data.txt");
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
    // 读取的循序必须和写入的顺序一致
    System.out.println(ois.readInt());
    System.out.println(ois.readFloat());
    System.out.println(ois.readChar());
    System.out.println(ois.readBoolean());
    System.out.println(ois.readUTF());
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

#### 对象的序列化和反序列化

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/io/object_stream/object_serialization/ObjectStreamTest.java)

* 对没有实现Serializable接口的对象进行序列化
    * 报错NotSerializableException

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/object1.txt");
// 序列化对象
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
    ObjNonSerializable obj = new ObjNonSerializable("a", 1);
    oos.writeObject(obj);
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

* 测试实现Serializable接口的对象，但是没添加serialVersionUID属性

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/object2.txt");
// 序列化对象
// try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
//     ObjNoVersionUID obj = new ObjNoVersionUID("a", 1);
//     oos.writeObject(obj);
// } catch (IOException e) {
//     throw new RuntimeException(e);
// }

// 反序列化对象
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
    /*
     反序列化正常
     但如果在类中新加一个属性后就会报错InvalidClassException
     因为实现Serializable接口后默认自动生成一个serialVersionUID
     而修改类后这个serialVersionUID就和之前的不一样了，而文件内还是使用的之前的id，所以报错
     */
    ObjNoVersionUID obj = (ObjNoVersionUID) ois.readObject();
    System.out.println(obj);
} catch (IOException | ClassNotFoundException e) {
    throw new RuntimeException(e);
}
```

* 测试实现Serializable接口的对象，并添加serialVersionUID属性

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/object3.txt");
// 序列化对象
// try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
//     ObjSerializable obj = new ObjSerializable("a", 1);
//     oos.writeObject(obj);
// } catch (IOException e) {
//     throw new RuntimeException(e);
// }

// 反序列化对象
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
    /*
     反序列化正常，无论怎么修改类都正常
     */
    ObjSerializable obj = (ObjSerializable) ois.readObject();
    System.out.println(obj);
} catch (IOException | ClassNotFoundException e) {
    throw new RuntimeException(e);
}
```

* 测试实现Serializable接口的对象，但有个属性没有实现Serializable接口
    * 报错NotSerializableException

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/object4.txt");
// 序列化对象
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
    ObjHasNonSerializableField obj = new ObjHasNonSerializableField("a", 1, new ObjNonSerializable("b", 2));
    oos.writeObject(obj);
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

* 测试序列化实现Serializable接口的对象，有transient关键字标记的属性和静态属性

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/object5.txt");
// 序列化对象
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
    ObjHasSpecialField obj = new ObjHasSpecialField("a", 1, 1.1F);
    oos.writeObject(obj);
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

* 测试反序列化实现Serializable接口的对象，有transient关键字标记的属性和静态属性
    * 由于静态属性赋值后直到程序结束不会消失，所以反序列化需要单独测试

```java
String projectPath = System.getProperty("user.dir");
File file = new File(projectPath, "src/main/resources/object5.txt");
// 反序列化对象
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
    /*
     反序列化正常
     使用transient标记的属性和静态属性都未保存
     */
    ObjHasSpecialField obj = (ObjHasSpecialField) ois.readObject();
    System.out.println(obj);
} catch (IOException | ClassNotFoundException e) {
    throw new RuntimeException(e);
}
```

## 其他流

### 标准输入、输出流

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/io/other/StandStreamTest.java)

* `System.in` - 标准输入流，默认从键盘输入
* `System.out` - 标准输出流，默认输出到控制台
* 使用`setIn()/setOut()`修改输入输入流的位置，因为in和out两个属性是final标识的，在Java层面无法修改，所以底层调用`c/c++`代码实现

```java
String projectPath = System.getProperty("user.dir");
File fileA = new File(projectPath, "src/main/resources/a.txt");
File fileB = new File(projectPath, "src/main/resources/b.txt");
System.out.println("输入a开头的字符保存到a.txt文件内\n输入b开头的字符保存到b.txt文件内\n输入q退出");
try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
     PrintStream psA = new PrintStream(fileA);
     PrintStream psB = new PrintStream(fileB)) {
    PrintStream defaultPs = System.out;

    String line;

    while (!(line = br.readLine()).equals("q")){
        if (line.startsWith("a")){
            System.setOut(psA);
        }else if (line.startsWith("b")){
            System.setOut(psB);
        }else {
            System.setOut(defaultPs);
        }
        System.out.println(line);
    }
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

### 字节数组流

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/io/other/ByteArrayStreamTest.java)

* 对字节数组进行操作

```java
try {
    ByteArrayOutputStream baos = new ByteArrayOutputStream(5);
    baos.write(1);
    baos.write(new byte[]{2, 3, 4, 5});

    // 转换为byte数组
    byte[] byteArray = baos.toByteArray();
    ByteArrayInputStream bais = new ByteArrayInputStream(byteArray);

    System.out.println(bais.read());
    System.out.println(bais.read());
    System.out.println(bais.read());
    System.out.println(bais.read());
} catch (IOException e) {
    e.printStackTrace();
}
```
