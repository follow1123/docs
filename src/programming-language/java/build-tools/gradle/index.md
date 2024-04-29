# Gradle

## 添加镜像

* 在项目的build.gradle内添加以下代码

```groovy
repositories {
	maven{ url 'https://maven.aliyun.com/repository/central' }
	maven{ url 'https://maven.aliyun.com/repository/public' }
	maven{ url 'https://maven.aliyun.com/repository/gradle-plugin'}
}
```

## Gradle依赖配置

| 配置    | 参与编译    | 参与打包    | 依赖可传递    |
|---------------- | --------------- | --------------- | --------------- |
| implementation    | √    | √    | ×    |
| api    | √   | √   | √   |
| compileOnly   | √   | ×   | ×   |
| runtimeOnly   | ×   | √   | -   |

* `annotationProcessor` 注解处理器依赖
