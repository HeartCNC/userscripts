# userscripts

## 快速开始

安装依赖

```bash
npm install
```

###开发

创建新的包，只需要拷贝`template`文件夹至`packages`里，进行重命名即可

```bash
npm run dev --scope=video
```

`--scope`: 指定`packages`中的包，必须指定

### 构建

```bash
npm run build --scope=video
```

`--scope`: 指定包，如果为空，则构建全部包
