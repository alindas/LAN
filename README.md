## 1. ​使用 pkg 打包
### 安装 pkg
```
npm install -g pkg
```

### 打包为可执行文件
+ app-win.exe（Windows）
+ app-macos（macOS）
+ app-linux（Linux）

```js
/**
 * 通过 --targets 参数指定目标平台和 Node.js 版本
 *  */
pkg socket.js --targets node16-win-x64,node16-macos-x64,node16-linux-x64
```
