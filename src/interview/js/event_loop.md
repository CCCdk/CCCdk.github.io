# 说说你对事件循环的理解

## 一、事件循环是什么？

**事件循环**（Event Loop）是 JavaScript 的一种机制，用于协调同步任务和异步任务的执行顺序，从而实现非阻塞的单线程运行。

### 单线程与任务分类

JavaScript 是**单线程语言**，只能在主线程上同时执行一项任务。但它通过事件循环实现了高效的异步处理。

任务分类：

1. **同步任务**：立即执行的任务，直接进入主线程执行。
2. **异步任务**：不会立即执行的任务，注册后进入任务队列，等待主线程空闲时处理。

**事件循环的过程**：

- 主线程从任务队列中取出一个任务执行。
- 如果该任务产生异步操作，将回调加入任务队列。
- 主线程空闲时检查任务队列，取出任务继续执行。
- 不断重复此过程，这就是事件循环。

---

## 二、宏任务与微任务

在 JavaScript 中，异步任务进一步细分为两类：

- **宏任务**（Macro-task）：大的任务，执行时通常需要调度，时间粒度较大。
- **微任务**（Micro-task）：较小的任务，执行时粒度小且优先级高。

### 常见的任务分类

#### 1. 宏任务

- 主代码块（整体脚本）
- `setTimeout`
- `setInterval`
- `setImmediate`（Node.js）
- I/O 操作
- UI 渲染

#### 2. 微任务

- `Promise.then` 或 `catch` / `finally`
- `MutationObserver`
- `queueMicrotask`
- `process.nextTick`（Node.js 专有）

### 执行顺序

1. 执行当前宏任务中的同步代码。
2. 清空微任务队列中的所有微任务。
3. 执行下一个宏任务。
4. 重复上述步骤。

---

## 三、执行示例

```javascript
console.log('script start');

setTimeout(() => {
	console.log('setTimeout');
}, 0);

Promise.resolve()
	.then(() => {
		console.log('Promise1');
	})
	.then(() => {
		console.log('Promise2');
	});

console.log('script end');
```

**分析流程**：

1. 同步代码开始执行：
   - 打印：`script start`。
2. 遇到 `setTimeout`：
   - 将回调加入**宏任务队列**。
3. 遇到 `Promise`：
   - 立即执行 `resolve` 的回调，将 `.then` 回调加入**微任务队列**。
4. 打印：`script end`。
5. 当前宏任务完成，执行微任务：
   - 打印：`Promise1`。
   - 执行第二个 `.then` 回调，打印：`Promise2`。
6. 执行宏任务队列的 `setTimeout` 回调：
   - 打印：`setTimeout`。

**最终输出**：

```
script start
script end
Promise1
Promise2
setTimeout
```

---

## 四、`async/await` 与事件循环

`async/await` 是对异步操作的语法糖。

- `async` 函数返回一个 `Promise`。
- `await` 会暂停 `async` 函数的执行，等待 `Promise` 解决后继续。

### 示例分析

```javascript
async function foo() {
	console.log('foo start');
	await bar();
	console.log('foo end');
}

async function bar() {
	console.log('bar');
}

console.log('script start');
foo();
console.log('script end');
```

#### 执行过程

1. 打印：`script start`。
2. 执行 `foo()`：
   - 打印：`foo start`。
   - 遇到 `await bar()`：
     - 执行 `bar()`，打印：`bar`。
     - `await` 暂停，`foo` 中的后续代码加入微任务队列。
3. 打印：`script end`。
4. 当前宏任务结束，执行微任务：
   - 打印：`foo end`。

#### 输出结果

```
script start
foo start
bar
script end
foo end
```

---

## 五、总结

### 1. 执行优先级

- **当前宏任务 → 微任务 → 下一个宏任务**。
- 微任务总是比下一次宏任务优先执行。

### 2. 使用场景

- **微任务**：适合需要快速响应的操作，例如 `Promise`。
- **宏任务**：适合定时操作或耗时任务，例如 `setTimeout`。

### 3. 注意事项

- 不同环境（浏览器、Node.js）的事件循环机制略有差异。
- 需要了解异步任务的细分，避免误判执行顺序。
