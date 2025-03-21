# 说说你对 BOM 的理解

## 一、BOM 的定义

`BOM`（Browser Object Model，浏览器对象模型）提供了接口，使 JavaScript 能与浏览器对话。它主要用来操作浏览器窗口、地址栏、历史记录等，提供了一些方法和属性与浏览器的整体环境进行交互。

## 二、BOM 核心对象

### 1. `window` 对象

`window` 是 BOM 的核心对象，代表浏览器窗口，并且是全局对象（即全局作用域下定义的变量和函数会成为它的属性或方法）。

**常见的 `window` 方法：**

- **控制窗口大小和位置：**
  - `moveBy(x, y)` 和 `moveTo(x, y)`：移动窗口位置。
  - `resizeBy(w, h)` 和 `resizeTo(w, h)`：调整窗口大小。
- **滚动操作：**
  - `scrollTo(x, y)` 和 `scrollBy(x, y)`：滚动窗口。
- **打开和关闭窗口：**
  - `window.open(url, name, specs)`：打开新窗口。
  - `window.close()`：关闭通过 `open` 打开的窗口。
- **全局对象示例：**
  ```javascript
  var name = 'BOM';
  console.log(window.name); // BOM
  ```

### 2. `location` 对象

表示当前页面的地址（URL），可用于访问和修改 URL 信息。

**常见属性：**

- `hash`：`#` 后的内容。
- `host`：主机名 + 端口号。
- `pathname`：路径部分。
- `protocol`：协议部分。
- `search`：`?` 后的查询参数。
- `href`：完整的 URL。

**常见方法：**

- `location.assign(url)`：跳转到指定 URL。
- `location.reload()`：刷新当前页面，`true` 强制从服务器获取。
- `location.replace(url)`：跳转到新页面，但不会保存到历史记录。

### 3. `navigator` 对象

主要提供关于浏览器的信息，常用于浏览器检测。

**常见属性：**

- `userAgent`：客户端的用户代理字符串。
- `platform`：浏览器运行的系统平台。
- `language`：浏览器的语言。

### 4. `screen` 对象

提供有关用户屏幕的信息，通常用于调整布局。

**常见属性：**

- `width` 和 `height`：屏幕分辨率的宽和高。
- `availWidth` 和 `availHeight`：可用的屏幕宽高（扣除任务栏等）。
- `colorDepth`：屏幕颜色的位数。

### 5. `history` 对象

用于操作浏览器的历史记录。

**常见方法：**

- `history.back()`：返回上一页。
- `history.forward()`：前往下一页。
- `history.go(n)`：跳转到历史记录中相对位置为 `n` 的页面（正数向前，负数向后）。
- `history.length`：历史记录的数量。

## 三、BOM 和 DOM 的区别

| **区别**     | **BOM**                                | **DOM**                              |
| ------------ | -------------------------------------- | ------------------------------------ |
| **定义**     | 浏览器对象模型，与浏览器交互的接口。   | 文档对象模型，与网页内容交互的接口。 |
| **主要对象** | `window`、`location`、`navigator` 等。 | `document` 和 HTML 元素节点。        |
| **作用范围** | 操作整个浏览器环境。                   | 操作网页内容。                       |

## 四、使用 BOM 的典型场景

1. **页面跳转：**
   ```javascript
   location.href = 'https://example.com';
   ```
2. **检测浏览器信息：**
   ```javascript
   if (navigator.userAgent.includes('Chrome')) {
   	console.log('This is Chrome browser.');
   }
   ```
3. **窗口操作：**
   ```javascript
   const newWin = window.open('https://example.com', 'newWindow');
   newWin.close(); // 关闭新窗口
   ```
4. **滚动页面：**
   ```javascript
   window.scrollBy(0, 100); // 向下滚动 100 像素
   ```
