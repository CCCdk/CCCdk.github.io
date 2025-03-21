# == 和 === 的区别？

它们的主要区别在于是否进行**类型转换**。

## 一、相等操作符（`==`）

相等操作符 `==` 会在比较前进行**类型转换**，然后判断值是否相等。

### 类型转换规则

1. **布尔值**会转换为数字：

   ```javascript
   console.log(true == 1); // true
   ```

2. **字符串**会转换为数字：

   ```javascript
   console.log('55' == 55); // true
   ```

3. **对象**会调用 `valueOf()` 或 `toString()` 方法，取得其原始值再比较：

   ```javascript
   const obj = { valueOf: () => 1 };
   console.log(obj == 1); // true
   ```

4. **`null` 和 `undefined` 相等**：

   ```javascript
   console.log(null == undefined); // true
   ```

5. **`NaN` 与任何值都不相等，包括自身**：

   ```javascript
   console.log(NaN == NaN); // false
   ```

6. **两个引用类型比较时**，仅当它们指向同一对象时才相等：
   ```javascript
   const obj1 = {};
   const obj2 = {};
   console.log(obj1 == obj2); // false
   ```

### 总结规则

| 操作数类型            | 比较结果                                             |
| --------------------- | ---------------------------------------------------- |
| 简单类型              | 字符串和布尔值会转换为数字再比较                     |
| 简单 vs 引用类型      | 引用类型转换为原始值（调用 `valueOf` 或 `toString`） |
| 引用类型              | 比较是否指向同一对象                                 |
| `null` vs `undefined` | 总是相等                                             |
| 包含 `NaN`            | 总是返回 `false`                                     |

## 二、全等操作符（`===`）

全等操作符 `===` 不会进行类型转换，要求**值和类型完全相同**。

### 示例：

```javascript
console.log('55' === 55); // false，类型不同
console.log(55 === 55); // true，值和类型相同
console.log(null === null); // true
console.log(undefined === undefined); // true
```

### `null` 和 `undefined` 的全等比较

```javascript
console.log(null === undefined); // false，类型不同
console.log(null === null); // true
console.log(undefined === undefined); // true
```

## 三、`==` 和 `===` 的区别

| 操作符 | 类型转换 | 比较结果                 |
| ------ | -------- | ------------------------ |
| `==`   | 是       | 值相等即可，进行类型转换 |
| `===`  | 否       | 值和类型都必须相等       |

### 特殊情况对比

```javascript
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log('55' == 55); // true
console.log('55' === 55); // false
```

## 四、使用建议

1. **推荐优先使用 `===`：**  
   避免隐式类型转换导致的难以预料的结果。
2. **特殊场景下使用 `==`：**  
   在比较对象属性是否为 `null` 或 `undefined` 时，`==` 更加简洁：
   ```javascript
   const obj = {};
   if (obj.x == null) {
   	console.log('属性 x 为 null 或 undefined');
   }
   ```
   等价于：
   ```javascript
   if (obj.x === null || obj.x === undefined) {
   	console.log('属性 x 为 null 或 undefined');
   }
   ```

## 五、隐式转换可能带来的问题

使用 `==` 时，类型转换可能会产生不直观的结果：

```javascript
console.log('' == '0'); // false
console.log(0 == ''); // true
console.log(false == '0'); // true
console.log(null == false); // false
console.log(' \t\r\n' == 0); // true
```
