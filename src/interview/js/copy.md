# 深拷贝浅拷贝的区别？如何实现一个深拷贝？

## 一、数据类型存储

在 JavaScript 中，数据类型分为两类：

- **基本类型**（Primitive Types）：包括 `string`、`number`、`boolean`、`undefined`、`symbol`、`bigint` 和 `null`。基本类型的数据存储在栈内存中，值直接保存在变量中。
- **引用类型**（Reference Types）：包括 `object`、`array`、`function` 等。引用类型的数据存储在堆内存中，变量中存储的是指向堆内存的引用。

## 二、浅拷贝

浅拷贝是对对象进行复制，但只会复制对象的第一层属性。如果对象的属性值是引用类型，拷贝的是引用，而不是对象本身。因此，浅拷贝后的对象和原对象共享对引用类型属性的修改。

浅拷贝常见的方法：

- `Object.assign()`
- `Array.prototype.slice()`
- 扩展运算符（`...`）

**示例：**

```js
function shallowClone(obj) {
	const newObj = {};
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			newObj[prop] = obj[prop];
		}
	}
	return newObj;
}

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = shallowClone(obj1);
obj2.b.c = 3;

console.log(obj1.b.c); // 3 (浅拷贝共享引用)
console.log(obj2.b.c); // 3
```

常见的浅拷贝方法：

- `Object.assign()`

```js
const obj = { a: 1, b: [2, 3] };
const clone = Object.assign({}, obj);
clone.b[0] = 4;
console.log(obj.b[0]); // 4
```

- 使用 `slice()` 或 `concat()` 对数组进行浅拷贝

```js
const arr = [1, 2, 3];
const shallowArr = arr.slice();
shallowArr[0] = 0;
console.log(arr[0]); // 1
console.log(shallowArr[0]); // 0
```

- 使用扩展运算符（`...`）

```js
const arr = [1, 2, 3];
const shallowArr = [...arr];
shallowArr[0] = 0;
console.log(arr[0]); // 1
console.log(shallowArr[0]); // 0
```

## 三、深拷贝

深拷贝是递归地复制对象的所有层级，包括引用类型的属性，使得原对象和新对象在内存中是完全独立的。深拷贝常见方法：

- 使用 `JSON.stringify()` 和 `JSON.parse()` 进行深拷贝
- 使用 `lodash.cloneDeep()`
- 手动递归实现深拷贝

**示例：**

```js
// 使用 JSON.stringify 和 JSON.parse 深拷贝
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = JSON.parse(JSON.stringify(obj1));
obj2.b.c = 3;

console.log(obj1.b.c); // 2 (深拷贝独立)
console.log(obj2.b.c); // 3
```

但 `JSON.stringify()` 和 `JSON.parse()` 方法有局限，无法处理 `undefined`、`symbol`、`函数`、`循环引用` 等。

### 手动实现深拷贝

```js
function deepClone(obj, hash = new WeakMap()) {
	if (obj === null) return obj; // 处理 null
	if (obj instanceof Date) return new Date(obj); // 处理 Date 对象
	if (obj instanceof RegExp) return new RegExp(obj); // 处理 RegExp 对象
	if (typeof obj !== 'object') return obj; // 基本类型直接返回

	if (hash.get(obj)) return hash.get(obj); // 防止循环引用

	let cloneObj = new obj.constructor(); // 创建新对象
	hash.set(obj, cloneObj); // 存储对象引用以避免循环引用
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			cloneObj[key] = deepClone(obj[key], hash); // 递归拷贝
		}
	}
	return cloneObj;
}

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = deepClone(obj1);
obj2.b.c = 3;

console.log(obj1.b.c); // 2 (深拷贝独立)
console.log(obj2.b.c); // 3
```

## 四、浅拷贝与深拷贝的区别

- **浅拷贝**：只拷贝对象的第一层，如果属性值是引用类型，拷贝的是地址（引用）。因此，修改引用类型的属性会影响原对象。

- **深拷贝**：递归拷贝对象的所有层级，即使属性是引用类型，也会创建一个新的对象副本，因此原对象和拷贝对象互不影响。

**浅拷贝示例：**

```js
const obj1 = { a: 1, arr: [1, 2, 3] };
const obj2 = shallowClone(obj1);
obj2.arr[0] = 9;
console.log(obj1.arr[0]); // 9 (浅拷贝共享引用)
```

**深拷贝示例：**

```js
const obj1 = { a: 1, arr: [1, 2, 3] };
const obj2 = deepClone(obj1);
obj2.arr[0] = 9;
console.log(obj1.arr[0]); // 1 (深拷贝独立)
```
