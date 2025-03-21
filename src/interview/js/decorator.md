# 说说你对 ES6 中 Decorator 的理解？

## 一、Decorator 的基本概念

**Decorator（装饰器）** 是一种语法，用来增强类或类成员的功能。它本质上是一个函数，用于修饰类、类属性、方法或访问器。

装饰器与装饰者模式相似，旨在**动态地扩展功能**，而无需修改原始代码或使用继承。它通过清晰的语法增强代码的**可读性**和**模块化**。

### 使用示例

一个简单的装饰器可以为类添加新属性：

```javascript
function strong(target) {
	target.hasWeapon = true;
}

@strong
class Soldier {}

console.log(Soldier.hasWeapon); // true
```

在这个例子中：

- `@strong` 是装饰器。
- 它为 `Soldier` 类动态添加了 `hasWeapon` 属性。

---

## 二、Decorator 的使用场景

### 1. **类装饰器**

类装饰器的作用是增强类的功能，其核心是接受类作为参数，返回增强后的类。

**使用方式：**

```javascript
@decorator
class A {}

// 等价于：
class A {}
A = decorator(A) || A;
```

**示例：**
定义一个装饰器，为类添加静态属性：

```javascript
function testable(target) {
	target.isTestable = true;
}

@testable
class MyClass {}

console.log(MyClass.isTestable); // true
```

**支持参数的装饰器：**
通过闭包传递参数。

```javascript
function testable(isTestable) {
	return function (target) {
		target.isTestable = isTestable;
	};
}

@testable(true)
class MyClass {}
console.log(MyClass.isTestable); // true
```

---

### 2. **方法装饰器**

方法装饰器修饰类的方法，接收以下三个参数：

- `target`：方法所属的类的原型对象。
- `name`：方法的名称。
- `descriptor`：属性描述符，提供对方法的详细控制。

**示例：**

定义一个只读装饰器，防止方法被修改：

```javascript
function readonly(target, name, descriptor) {
	descriptor.writable = false;
	return descriptor;
}

class Person {
	@readonly
	greet() {
		return 'Hello!';
	}
}

const person = new Person();
person.greet = () => 'Hi!'; // 抛出错误，方法不可修改
```

---

### 3. **属性装饰器**

属性装饰器类似方法装饰器，但用于修饰类的属性。它同样可以操作描述符，从而控制属性的行为。

**示例：**
一个简单的装饰器，限制属性修改：

```javascript
function nonconfigurable(target, name, descriptor) {
	descriptor.configurable = false;
	return descriptor;
}

class Car {
	@nonconfigurable
	speed = 100;
}

// 无法删除或重新配置 `speed`
```

---

### 4. **多个装饰器**

多个装饰器的执行顺序是：**先从外到内依次进入，再由内到外依次执行**。

**示例：**

```javascript
function dec(id) {
	console.log('evaluated', id);
	return (target, name, descriptor) => console.log('executed', id);
}

class Example {
	@dec(1)
	@dec(2)
	method() {}
}

// 输出顺序：
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

---

## 三、限制与注意事项

### 1. Decorator 不能用在函数上

装饰器目前只能用于类及其成员，不能修饰函数：

```javascript
@decorator
function foo() {} // 报错
```

原因是函数声明无法像类一样接受装饰器的元信息。

### 2. 与 Babel 配置相关

由于装饰器是 ES6 的提案，实际开发中需要借助 Babel 插件（如 `@babel/plugin-proposal-decorators`）来启用。

---

## 四、常见场景

### 1. Redux 中的 connect

使用装饰器可以简化 React 组件与 Redux 的绑定：

```javascript
@connect(mapStateToProps, mapDispatchToProps)
export default class MyComponent extends React.Component {}
```

相比传统写法：

```javascript
class MyComponent extends React.Component {}
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

装饰器显得更直观。

---

### 2. Mixin 模式

装饰器可以用来实现 Mixin，动态添加多个功能：

```javascript
function mixins(...behaviors) {
	return function (target) {
		Object.assign(target.prototype, ...behaviors);
	};
}

const Flyable = {
	fly() {
		console.log('I can fly!');
	}
};

const Walkable = {
	walk() {
		console.log('I can walk!');
	}
};

@mixins(Flyable, Walkable)
class Person {}

const person = new Person();
person.fly(); // I can fly!
person.walk(); // I can walk!
```

---

## 五、基于库的常见装饰器

`core-decorators` 是一个流行的装饰器库，其中提供了常用的装饰器：

### 1. `@autobind`

绑定方法的 `this` 到当前实例：

```javascript
import { autobind } from 'core-decorators';

class Person {
	@autobind
	greet() {
		return this;
	}
}

const person = new Person();
const greet = person.greet;

console.log(greet() === person); // true
```

### 2. `@readonly`

使属性或方法变为只读：

```javascript
import { readonly } from 'core-decorators';

class Meal {
	@readonly
	entree = 'steak';
}

const dinner = new Meal();
dinner.entree = 'salmon'; // 抛出错误
```

### 3. `@deprecate`

标记方法为废弃：

```javascript
import { deprecate } from 'core-decorators';

class Person {
	@deprecate
	oldMethod() {}

	@deprecate('This method is deprecated, use newMethod instead.')
	newMethod() {}
}

const person = new Person();
person.oldMethod(); // 控制台警告：该方法已废弃
```

---

## 六、小结

- **本质**：装饰器是一个函数，作用是动态扩展类或类成员的功能。
- **优点**：
  1. 提高代码的可读性和可维护性。
  2. 避免直接修改原始代码。
- **限制**：仅支持类与类成员，需 Babel 支持。
- **应用场景**：Redux、Mixin 模式、方法绑定、代码注释等。

Decorator 是一种语法糖，背后的逻辑完全可以通过函数实现。熟练掌握它，不仅能简化代码，还能设计更优雅的程序结构。
