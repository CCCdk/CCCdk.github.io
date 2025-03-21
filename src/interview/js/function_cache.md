# Javascript 中如何实现函数缓存？应用场景？

## 如何实现函数缓存？

在 JavaScript 中，函数缓存（Memoization）是一种优化技术，旨在将函数的计算结果缓存起来，避免重复计算。它常用于需要反复计算相同结果的函数，尤其是在高成本的计算过程中。

实现函数缓存的基本思想是：对于每一组输入参数，记录下它的计算结果，若下次调用时参数相同，就直接返回缓存的结果，而不是再次计算。

以下是三种常见的实现方式：

### 1. 使用对象和闭包实现缓存

最简单的一种方式是使用闭包，将函数计算的结果存储在一个对象中，通过对象的键值对来缓存计算结果。

```js
function memoize(func) {
	let cache = {}; // 使用对象缓存计算结果
	return function (...args) {
		const key = JSON.stringify(args); // 将参数序列化为字符串作为缓存键
		if (cache[key]) {
			return cache[key]; // 如果缓存中已有结果，直接返回
		}
		const result = func(...args); // 否则计算结果
		cache[key] = result; // 存入缓存
		return result;
	};
}

// 示例函数
const add = (a, b) => a + b;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(1, 2)); // 计算并缓存结果
console.log(memoizedAdd(1, 2)); // 从缓存中返回结果
```

### 2. 使用 Map 实现缓存

Map 是一种更高效的数据结构，尤其在处理较复杂的键时（如对象、数组等）。与对象不同，Map 允许任何数据类型作为键。

```js
function memoize(func) {
	const cache = new Map(); // 使用 Map 缓存计算结果
	return function (...args) {
		const key = args.join(','); // 将参数连接成字符串作为缓存键
		if (cache.has(key)) {
			return cache.get(key); // 如果缓存中已有结果，直接返回
		}
		const result = func(...args); // 否则计算结果
		cache.set(key, result); // 存入缓存
		return result;
	};
}

// 示例函数
const multiply = (a, b) => a * b;
const memoizedMultiply = memoize(multiply);

console.log(memoizedMultiply(2, 3)); // 计算并缓存结果
console.log(memoizedMultiply(2, 3)); // 从缓存中返回结果
```

### 3. 使用 WeakMap 实现缓存

`WeakMap` 是一种特殊的 Map，它的键是弱引用，意味着当键不再被引用时，缓存会被自动清理。这对于缓存对象尤其有用，避免了内存泄漏问题。

```js
function memoize(func) {
	const cache = new WeakMap(); // 使用 WeakMap 缓存对象结果
	return function (...args) {
		if (args.length === 1 && typeof args[0] === 'object') {
			if (cache.has(args[0])) {
				return cache.get(args[0]); // 如果缓存中已有结果，直接返回
			}
			const result = func(...args); // 否则计算结果
			cache.set(args[0], result); // 存入缓存
			return result;
		}
		return func(...args); // 对于非对象参数，直接计算
	};
}

// 示例函数
const deepClone = (obj) => JSON.parse(JSON.stringify(obj)); // 模拟深拷贝
const memoizedClone = memoize(deepClone);

const obj = { a: 1, b: 2 };
console.log(memoizedClone(obj)); // 计算并缓存结果
console.log(memoizedClone(obj)); // 从缓存中返回结果
```

## 函数缓存的应用场景

尽管函数缓存能够显著提高性能，但并不是所有情况下都需要使用。以下是一些适合使用函数缓存的场景：

### 1. 昂贵的计算函数

对于计算复杂、耗时的函数，缓存可以避免每次都重新计算。例如，涉及大数据运算、复杂数学计算等。

例如，计算斐波那契数列的递归版本：

```js
function fibonacci(n) {
	if (n <= 1) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);
```

通过缓存，避免了重复计算相同的斐波那契数值。

### 2. 具有有限且高度重复输入范围的函数

当函数的输入范围较小，并且很多调用会重复相同的输入时，函数缓存能够极大地提高效率。例如，UI 组件渲染过程中，某些函数可能会反复计算相同的数据。

### 3. 递归函数

对于递归函数，尤其是涉及重复子问题的递归，缓存可以显著减少计算次数，优化性能。例如，树或图遍历时，某些结果可能会被重复计算。

### 4. 纯函数

纯函数是指对于相同的输入总是返回相同的输出，这种函数特别适合使用缓存。因为它们的输出与输入一一对应，不受外部因素影响。

```js
function square(x) {
	return x * x;
}
const memoizedSquare = memoize(square);
```

## 不适合使用缓存的场景

尽管缓存具有优势，但并不是所有场景都适合使用缓存：

- **输入变化频繁**：如果输入值变化频繁，缓存的优势不明显，甚至可能会增加额外的存储和查找开销。
- **需要实时计算的场景**：对于需要实时计算的函数，如时钟、传感器数据处理等，缓存可能不适合。
- **不适合高并发的场景**：如果缓存的计算过程依赖于大量共享资源，可能会遇到并发问题。
