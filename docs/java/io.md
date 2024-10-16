---
sidebar_position: 16
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
| 对象流 | **ObjectInputStream** | **ObjectOutputStream** | | |
| 过滤流 | FilterInputStream | FilterOutputStream | FilterReader | FilterWiter |
| 打印流 | | PrintStream | | PrintWriter |
| 推回输入流 | PushbackInputStream | | PushbackReader | |
| 特殊流 | DataInputStream | DataOutputStream | | |

### FileReader/FileWriter

> [详细代码](https://github.com/follow1123/java-basics/blob/main/src/main/java/cn/y/java/io/file_stream/FileReaderWriterTest.java)

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
