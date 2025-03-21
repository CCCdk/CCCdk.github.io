# 说说 JavaScript 中的数据类型与存储差异

JavaScript 的数据类型分为两大类：

1. **基本类型**：存储在**栈**内存中。
2. **引用类型**：存储在**堆**内存中，栈中存放的是堆内存的地址。

## 一、基本类型

基本类型包括以下 7 种：

- **Number**：数字类型
- **String**：字符串类型
- **Boolean**：布尔类型
- **Undefined**：未定义
- **Null**：空值
- **Symbol**：唯一值（ES6）
- **BigInt**：大整数类型（ES2020）

### Number

支持整数和浮点数，并允许使用八进制（`0` 开头）、十六进制（`0x` 开头）及科学计数法表示。

```js
let intNum = 55; // 十进制
let octNum = 070; // 八进制 -> 56
let hexNum = 0xa; // 十六进制 -> 10
let sciNum = 3.125e7; // 科学计数法 -> 31250000
```

特殊数值 `NaN` 表示非数值操作的结果。

```js
console.log(0 / 0); // NaN
console.log(isNaN('a')); // true
```

### String

字符串用单引号 (`'`)、双引号 (`"`) 或模板字符串（`` ` ``）包裹，且不可变。

```js
let str = 'Hello';
str += ' World'; // 新创建了字符串
console.log(str); // Hello World
```

### Boolean

只有两个值：`true` 和 `false`。以下规则用于其他类型转换为布尔值：

| 数据类型  | 转换为 `true` 的值        | 转换为 `false` 的值 |
| --------- | ------------------------- | ------------------- |
| String    | 非空字符串                | 空字符串 `""`       |
| Number    | 非零数值（含 `Infinity`） | `0`、`NaN`          |
| Object    | 任意对象                  | `null`              |
| Undefined | N/A                       | `undefined`         |

### Undefined 和 Null

- **Undefined**：变量已声明但未赋值时的默认值。
- **Null**：表示空对象指针或无效值。

```js
let message;
console.log(message); // undefined
let obj = null;
console.log(typeof obj); // "object"（历史遗留问题）
```

### Symbol

Symbol 是唯一且不可变的标识符，用于对象属性，避免命名冲突。

```js
let sym1 = Symbol('foo');
let sym2 = Symbol('foo');
console.log(sym1 === sym2); // false
```

### BigInt

支持大于 `Number.MAX_SAFE_INTEGER` 的整数，后缀为 `n`。

```js
let bigInt = 9007199254740991n + 1n;
console.log(bigInt); // 9007199254740992n
```

---

## 二、引用类型

引用类型（复杂类型）统称为 `Object`，包括：

1. **Object**：键值对集合。
2. **Array**：有序数据集合。
3. **Function**：可调用对象。

### Object

对象由键值对组成，键可以是字符串或 Symbol。

```js
let person = { name: 'Alice', age: 25 };
person.height = 170; // 动态添加属性
```

### Array

数组是动态大小的有序集合，元素可为任意类型。

```js
let arr = [1, 'hello', { key: 'value' }];
arr.push(42); // 添加元素
```

### Function

函数是特殊的对象，是 `Function` 构造函数的实例。

```js
function add(a, b) {
	return a + b;
}
let sum = (a, b) => a + b; // 箭头函数
```

---

## 三、存储差异

### 基本类型：存储在栈中

基本类型的数据直接存储在栈内存中，赋值时会复制值。

```js
let a = 10;
let b = a; // 复制值
b = 20;
console.log(a); // 10
```

赋值过程：

- `a` 和 `b` 各自存储独立的值，互不影响。

### 引用类型：堆中存储，栈中存放引用

引用类型的数据存储在堆内存中，变量保存的是指向堆内存的地址。

```js
let obj1 = { name: 'Alice' };
let obj2 = obj1; // 复制引用
obj2.age = 25;
console.log(obj1.age); // 25
```

赋值过程：

- `obj1` 和 `obj2` 指向同一个内存地址，因此修改其中一个会影响另一个。

---

## 小结

1. **存储位置**

   - 基本类型存储在栈中，值不可变。
   - 引用类型存储在堆中，栈中保存引用地址。

2. **赋值行为**
   - 基本类型赋值会复制值，两个变量互不影响。
   - 引用类型赋值会复制引用，多个变量共享同一对象。

通过区分这两类数据的存储特点，能更好地理解 JavaScript 的内存管理和行为特性。
