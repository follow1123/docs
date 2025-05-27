## 文档

使用 [Astro](https://astro.build/) 的 [starlight](https://starlight.astro.build/) 模板构建的文档网站

地址：[docs](https://follow1123.github.io/docs)

### 开发

- `pnpm dev` - 开发模式启动项目
- `pnpm build` - 构建项目
- `pnpm preview` - 运行build目录下已经构建的项目

#### Mermaid 集成

项目根路径下添加 `.env` 文件，用于代替无头浏览器生成 mermaid 的 svg

```bash
# 代替无头浏览器生成 mermaid 的 svg
CHROME_PATH=/bin/google-chrome
```

提交前手动在本地执行一下 `pnpm build` 命令，生成 mermaid svg 文件

#### 部署

指定网站 url 和 basename

```bash
pnpm build --site <your_site> --base <your_basename>
```
