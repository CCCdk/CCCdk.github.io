# ES6 中函数新增了哪些扩展？

## 一、参数默认值

ES6 允许为函数的参数设置默认值，当调用函数时，如果某个参数没有传递值，将使用默认值。

```js
function log(x, y = 'World') {
	console.log(x, y);
}

console.log('Hello'); // Hello World
console.log('Hello', 'China'); // Hello China
console.log('Hello', ''); // Hello
```

- 默认值的参数不能再使用 `let` 或 `const` 重新声明。

```js
function foo(x = 5) {
	let x = 1; // error
	const x = 2; // error
}
```

- 默认值与解构赋值结合使用：

```js
function foo({ x, y = 5 }) {
	console.log(x, y);
}

foo({}); // undefined 5
foo({ x: 1 }); // 1 5
foo({ x: 1, y: 2 }); // 1 2
foo(); // TypeError: Cannot read property 'x' of undefined
```

- 默认值避免传递 `undefined` 时报错：

```js
function foo({ x, y = 5 } = {}) {
	console.log(x, y);
}

foo(); // undefined 5
```

- 需要注意，默认值参数应放在尾部，否则会导致参数无法省略。

```js
function f(x = 1, y) {
  return [x, y];
}

f(); // [1, undefined]
f(2); // [2, undefined]
f(, 1); // 报错
f(undefined, 1); // [1, 1]
```

## 二、属性

### 函数的 `length` 属性

ES6 中，`length` 属性返回的是没有默认值的参数个数。

```js
(function (a) {}).length; // 1
(function (a = 5) {}).length; // 0
(function (a, b, c = 5) {}).length; // 2
```

- `rest` 参数不会计入 `length` 属性：

```js
(function (...args) {}).length; // 0
```

- 如果有默认值的参数不是尾参数，`length` 不会计入后面的参数：

```js
(function (a = 0, b, c) {}).length; // 0
```

### `name` 属性

ES6 中的 `name` 属性返回该函数的函数名。

```js
var f = function () {};
console.log(f.name); // "f"
```

如果将具名函数赋值给变量，则返回该函数原本的名字：

```js
const bar = function baz() {};
console.log(bar.name); // "baz"
```

- 使用 `Function` 构造函数返回的函数，`name` 值为 `"anonymous"`。

```js
new Function().name; // "anonymous"
```

- `bind` 返回的函数，`name` 属性值会加上 `bound` 前缀：

```js
function foo() {}
console.log(foo.bind({}).name); // "bound foo"
```

## 三、作用域

当函数参数设置默认值时，函数的参数会形成一个独立的作用域，并在初始化时被赋值。如果没有传递值，它将使用默认值。

```js
let x = 1;

function f(y = x) {
	let x = 2;
	console.log(y);
}

f(); // 1
```

在这个例子中，`y` 会被赋值为全局变量 `x` 的值，因为 `x` 的值在函数作用域内被重新定义。

## 四、严格模式

当函数的参数使用了默认值、解构赋值或扩展运算符时，函数内部会默认启用严格模式。此时，不能显式地启用 `'use strict'`。

```js
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

## 五、箭头函数

ES6 中新增的箭头函数（`=>`）为函数定义提供了更简洁的语法。

```js
var f = (v) => v; // 等同于 function (v) { return v; }
```

- 箭头函数不需要参数时，可以省略圆括号：

```js
var f = () => 5; // 等同于 function () { return 5; }
```

- 箭头函数支持多参数：

```js
var sum = (num1, num2) => num1 + num2; // 等同于 function (num1, num2) { return num1 + num2; }
```

- 当函数体中有多个语句时，使用大括号，并显式返回值：

```js
var sum = (num1, num2) => {
	return num1 + num2;
};
```

- 返回对象时，必须加括号包裹对象：

```js
let getTempItem = (id) => ({ id: id, name: 'Temp' });
```

### 注意事项：

- `this` 的值由箭头函数定义时的作用域决定，而不是调用时的作用域。
- 不能作为构造函数，不能使用 `new` 调用箭头函数。
- 不支持 `arguments` 对象，若要使用参数，可以使用 `rest` 参数代替。
- 不能作为 Generator 函数使用，因为它不支持 `yield`。
