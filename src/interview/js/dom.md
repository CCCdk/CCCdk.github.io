# DOM 常见的操作有哪些？

## 1. DOM 基础

**DOM（Document Object Model）** 是 HTML 和 XML 文档的编程接口，允许开发者以编程方式操作文档结构、样式和内容。

DOM 的层级结构由 **节点（Node）** 构成，主要包括以下三类：

1. **元素节点**（`Element`）：如 `<div>`、`<p>`。
2. **文本节点**（`Text`）：元素中的文本内容。
3. **属性节点**（`Attribute`）：如 `id="example"`。

---

## 2. 常见 DOM 操作分类

### 创建节点

1. **`document.createElement(tagName)`**：创建元素节点。
   ```js
   const div = document.createElement('div');
   ```
2. **`document.createTextNode(data)`**：创建文本节点。
   ```js
   const text = document.createTextNode('Hello');
   ```
3. **`document.createDocumentFragment()`**：创建文档片段，用于批量插入节点。
   ```js
   const fragment = document.createDocumentFragment();
   ```

---

### 查询节点

1. **`document.querySelector(selector)`**：按 CSS 选择器返回第一个匹配的节点。
   ```js
   const div = document.querySelector('.class');
   ```
2. **`document.querySelectorAll(selector)`**：返回所有匹配的节点，生成静态 `NodeList`。
   ```js
   const divs = document.querySelectorAll('div');
   ```
3. 其他常见方法：
   - **`getElementById(id)`**：按 `id` 查询。
   - **`getElementsByClassName(className)`**：按类名查询，返回实时集合。
   - **`getElementsByTagName(tagName)`**：按标签名查询，返回实时集合。
   - **`parentNode`、`childNodes`、`nextSibling`、`previousSibling`**：节点关系遍历。

---

### 更新节点

1. **修改内容**
   - **`innerHTML`**：设置/获取节点的 HTML 内容（会解析 HTML）。
     ```js
     div.innerHTML = '<p>Hello</p>';
     ```
   - **`textContent` / `innerText`**：设置/获取纯文本内容（不解析 HTML）。
     ```js
     div.textContent = '<b>Hello</b>'; // 显示原样文本
     ```
2. **修改样式**
   - **`element.style.property`**：直接设置样式。
     ```js
     div.style.backgroundColor = 'red';
     ```
   - **`setAttribute(name, value)`**：设置属性值。
     ```js
     div.setAttribute('data-custom', 'value');
     ```

---

### 添加节点

1. **`appendChild(child)`**：将节点添加为父节点的最后一个子节点。
   ```js
   parent.appendChild(child);
   ```
2. **`insertBefore(newNode, referenceNode)`**：在指定节点前插入新节点。
   ```js
   parent.insertBefore(newNode, referenceNode);
   ```

---

### 删除节点

1. **`parentNode.removeChild(child)`**：删除子节点。
   ```js
   parent.removeChild(child);
   ```
2. **`element.remove()`**（现代浏览器支持）：直接删除节点。
   ```js
   element.remove();
   ```

---

## 3. 注意点

- **批量插入节点时使用文档片段**：减少 DOM 重绘与回流。
- **`innerHTML` 的性能问题**：直接修改 HTML 会造成页面重绘，影响性能；避免直接插入用户输入以防 XSS 攻击。
- **静态 vs 动态集合**：
  - `querySelectorAll` 返回静态列表（快照）。
  - `getElementsBy*` 返回动态集合（实时更新）。

---

## 4. 应用场景举例

### 动态添加列表项

```js
const ul = document.querySelector('#list');
const li = document.createElement('li');
li.textContent = 'New Item';
ul.appendChild(li);
```

### 替换节点

```js
const oldNode = document.querySelector('#old');
const newNode = document.createElement('div');
newNode.textContent = 'I am new';
oldNode.parentNode.replaceChild(newNode, oldNode);
```

### 删除节点

```js
const node = document.querySelector('#toDelete');
node.parentNode.removeChild(node);
```
