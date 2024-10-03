# Vue

## 使用版本vue 2

* 使用vue 脚手架创建项目

```bash
vue create 项目名
```

* 使用@符号代替根目录
* 修改`vue.config.js`文件

```vue
module.exports = {
    ...
    // 添加
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    }
}
```

