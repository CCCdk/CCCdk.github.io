# Javascript 本地存储的方式有哪些？

## 一、JavaScript 本地存储方式

JavaScript 提供多种方式来存储数据，以下是常见的四种本地存储方式：

1. **Cookie**
2. **sessionStorage**
3. **localStorage**
4. **IndexedDB**

## 二、各存储方式解析

### 1. Cookie

`Cookie` 是一种早期用于保存用户状态的小型文本数据。它最初是为了解决 HTTP 无状态协议问题。

**特点：**

- 数据大小：约 4KB。
- 生命周期：可以设置到期时间。
- 数据传输：每次 HTTP 请求都会附带到请求头中。
- 安全性：如果未加密，容易被窃取。

**适用场景：**

- 用户登录态标记。
- 跟踪用户行为。

**示例：**

```javascript
// 设置 Cookie
document.cookie =
	'username=John; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/';

// 读取 Cookie
console.log(document.cookie);

// 删除 Cookie（将其设置为过期时间）
document.cookie =
	'username=John; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
```

### 2. sessionStorage

`sessionStorage` 是 HTML5 提供的浏览器存储方式。数据仅在当前会话（窗口或标签页）中有效。

**特点：**

- 数据大小：约 5MB（视浏览器而定）。
- 生命周期：页面会话，关闭页面或标签后清除。
- 数据作用域：同源的窗口或标签页不共享。

**适用场景：**

- 页面临时数据（例如：表单数据、未提交的数据）。

**示例：**

```javascript
// 设置数据
sessionStorage.setItem('key', 'value');

// 获取数据
console.log(sessionStorage.getItem('key'));

// 删除数据
sessionStorage.removeItem('key');

// 清除所有数据
sessionStorage.clear();
```

### 3. localStorage

`localStorage` 是一种持久化的本地存储方式。数据不会因关闭浏览器而清除，除非用户主动删除。

**特点：**

- 数据大小：约 5MB。
- 生命周期：永久存储。
- 数据作用域：同源下所有页面共享。

**适用场景：**

- 保存长期使用的数据（如用户偏好、Token）。

**示例：**

```javascript
// 设置数据
localStorage.setItem('username', 'John');

// 获取数据
console.log(localStorage.getItem('username'));

// 删除数据
localStorage.removeItem('username');

// 清除所有数据
localStorage.clear();
```

### 4. IndexedDB

`IndexedDB` 是一种低级 API，用于存储大量结构化数据，是一个真正的浏览器端数据库。

**特点：**

- 数据大小：理论上无限制（实际由浏览器限制）。
- 数据类型：支持对象、文件等结构化数据。
- 操作：异步，性能高。
- 生命周期：永久存储，除非手动删除。

**适用场景：**

- 存储大数据，例如离线文档、文件缓存。

**示例：**

```javascript
// 打开或创建数据库
const request = indexedDB.open('MyDatabase', 1);

request.onsuccess = function (event) {
	const db = event.target.result;
	console.log('Database opened:', db);
};

request.onupgradeneeded = function (event) {
	const db = event.target.result;
	// 创建对象存储
	db.createObjectStore('MyStore', { keyPath: 'id' });
};
```

## 三、存储方式的区别

| **特性**       | **Cookie**               | **sessionStorage** | **localStorage** | **IndexedDB** |
| -------------- | ------------------------ | ------------------ | ---------------- | ------------- |
| **存储大小**   | ~4KB                     | ~5MB               | ~5MB             | 理论上无限制  |
| **生命周期**   | 设置过期时间             | 会话结束时清除     | 永久存储         | 永久存储      |
| **数据传输**   | 每次请求都会发送到服务器 | 不随请求发送       | 不随请求发送     | 不随请求发送  |
| **数据作用域** | 同源                     | 同源，同标签页     | 同源             | 同源          |
| **操作复杂性** | 简单                     | 简单               | 简单             | 较复杂        |

## 四、适用场景总结

- **Cookie**
  - 保存用户状态信息，如登录态。
  - 设置跨会话的小型标记。
- **sessionStorage**

  - 保存临时数据，如表单未提交的数据。
  - 页面切换间的数据临时存储。

- **localStorage**

  - 保存较长期、较小的用户偏好设置。
  - 保存 Token 或其他长期使用的数据。

- **IndexedDB**
  - 大量数据的存储，如离线应用、文件缓存。
  - 存储复杂结构化数据。

## 五、扩展链接

- [Web Storage API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [IndexedDB API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
