# 如何实现一个 bind ？

实现`bind`的步骤，我们可以分解成为三部分：

- 修改`this`指向
- 兼容`new`关键字
- 动态传递参数

```javascript
// 方式一：只在 bind 中传递函数参数
fn.bind(obj, 1, 2)();

// 方式二：在 bind 中传递函数参数，也在返回函数中传递参数
fn.bind(obj, 1)(2);
```

整体实现代码如下：

```javascript
Function.prototype.myBind = function (context) {
	// 判断调用对象是否为函数
	if (typeof this !== 'function') {
		throw new TypeError('Error');
	}

	// 获取参数
	const args = [...arguments].slice(1);
	const fn = this;

	return function Fn() {
		// 根据调用方式，传入不同绑定值
		return fn.apply(
			this instanceof Fn ? new fn(...arguments) : context,
			args.concat(...arguments)
		);
	};
};
```
