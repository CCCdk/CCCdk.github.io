# 说说你对事件模型的理解

## 一、事件与事件流

在 **JavaScript** 中，**事件** 是用户与网页交互的方式，例如鼠标点击、键盘输入、页面加载等行为。为了处理这些事件，浏览器定义了**事件流**机制，用来确定事件在页面中传播的顺序。

**事件流的三个阶段**：

1. **捕获阶段**：事件从顶层对象（如 `document`）开始，沿着 DOM 树向目标元素传播。
2. **目标阶段**：事件到达目标元素并触发绑定在该元素上的事件处理器。
3. **冒泡阶段**：事件从目标元素开始，沿 DOM 树向上传播至顶层对象。

![事件流](../../image/interview-js-36.png)

---

## 二、事件模型

### 1. DOM0 级事件模型（原始事件模型）

DOM0 级事件模型通过将事件处理函数直接绑定到元素的事件属性实现。

#### 特性：

- 绑定简单，语法直观：
  ```html
  <button onclick="alert('Hello!')">Click Me</button>
  ```
- 只支持 **冒泡阶段**。
- **单一绑定**：同一事件只能绑定一个处理函数，后绑定的会覆盖先绑定的：
  ```javascript
  var btn = document.getElementById('btn');
  btn.onclick = function () {
  	console.log('First Handler');
  };
  btn.onclick = function () {
  	console.log('Second Handler'); // 覆盖前面的
  };
  ```
- 移除事件处理器：
  ```javascript
  btn.onclick = null;
  ```

---

### 2. DOM2 级事件模型（标准事件模型）

DOM2 事件模型通过 `addEventListener` 方法为元素绑定事件，支持事件捕获和冒泡阶段。

#### API 使用：

- **绑定事件**：
  ```javascript
  element.addEventListener(eventType, handler, useCapture);
  ```
  - `eventType`: 事件类型（如 `click`，不带 "on" 前缀）。
  - `handler`: 事件处理函数。
  - `useCapture`: `true` 表示在捕获阶段触发，`false` 表示在冒泡阶段触发（默认）。
- **移除事件**：
  ```javascript
  element.removeEventListener(eventType, handler, useCapture);
  ```

#### 特性：

- 支持 **捕获** 和 **冒泡**：
  ```javascript
  div.addEventListener('click', handler, true); // 捕获阶段
  div.addEventListener('click', handler, false); // 冒泡阶段
  ```
- 允许同一元素的同一事件绑定多个处理器，不会互相覆盖：
  ```javascript
  btn.addEventListener('click', handler1, false);
  btn.addEventListener('click', handler2, false);
  ```

#### 示例：

```html
<div id="parent">
	<button id="child">Click Me</button>
</div>
```

```javascript
var parent = document.getElementById('parent');
var child = document.getElementById('child');

parent.addEventListener('click', () => console.log('Parent Capturing'), true);
parent.addEventListener('click', () => console.log('Parent Bubbling'), false);

child.addEventListener('click', () => console.log('Child Capturing'), true);
child.addEventListener('click', () => console.log('Child Bubbling'), false);

// 点击按钮的输出顺序：
/*
Parent Capturing
Child Capturing
Child Bubbling
Parent Bubbling
*/
```

---

### 3. IE 事件模型（已过时）

IE 事件模型使用 `attachEvent` 方法绑定事件，但只支持冒泡阶段，不支持捕获。

#### API 使用：

- 绑定事件：
  ```javascript
  element.attachEvent('on' + eventType, handler);
  ```
- 移除事件：
  ```javascript
  element.detachEvent('on' + eventType, handler);
  ```

#### 特性：

- 事件处理函数的 `this` 指向 `window`，而非事件目标。
- 不支持事件捕获。

示例：

```javascript
var btn = document.getElementById('btn');
btn.attachEvent('onclick', function () {
	console.log(this === window); // true
});
```

---

## 三、事件委托

**事件委托** 是一种将事件绑定到父元素，从而管理多个子元素事件的技巧。由于事件冒泡特性，子元素的事件会传递到父元素上触发。

#### 优点：

- 减少内存消耗：避免为每个子元素单独绑定事件。
- 动态支持新增子元素：父元素的事件处理器可以响应新添加的子元素事件。

#### 示例：

```html
<ul id="list">
	<li>Item 1</li>
	<li>Item 2</li>
</ul>
```

```javascript
var list = document.getElementById('list');
list.addEventListener('click', function (event) {
	if (event.target.tagName === 'LI') {
		console.log('Clicked on', event.target.textContent);
	}
});
```

---

## 四、阻止默认行为和停止传播

1. **阻止默认行为**：
   使用 `event.preventDefault()` 阻止事件的默认动作，例如链接跳转或表单提交。

   ```javascript
   document.querySelector('a').addEventListener('click', (event) => {
   	event.preventDefault();
   	console.log('Link clicked, but not followed.');
   });
   ```

2. **停止事件传播**：
   使用 `event.stopPropagation()` 阻止事件在捕获或冒泡阶段的进一步传播。

   ```javascript
   document.getElementById('child').addEventListener('click', (event) => {
   	event.stopPropagation();
   	console.log('Event propagation stopped.');
   });
   ```

3. **同时阻止默认行为和传播**：
   使用 `event.stopImmediatePropagation()`。

---

## 五、总结

- **事件流**：由捕获到目标，再到冒泡。
- **事件模型**：DOM0 简单但限制多，DOM2 强大且灵活，IE 模型已淘汰。
- **事件委托**：利用冒泡机制优化事件处理。
- **事件控制**：通过 `preventDefault` 和 `stopPropagation` 精确管理事件行为。
