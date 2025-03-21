# ES6 中数组新增了哪些扩展？

## 一、扩展运算符的应用

**扩展运算符 (`...`)** 用于将数组转为参数序列：

```javascript
console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5
```

### 常见用途：

1. **函数调用**：

   ```javascript
   const numbers = [4, 38];
   const add = (x, y) => x + y;
   console.log(add(...numbers)); // 42
   ```

2. **复制数组**（浅拷贝）：

   ```javascript
   const a1 = [1, 2];
   const a2 = [...a1]; // [1, 2]
   ```

3. **合并数组**：

   ```javascript
   const arr1 = ['a', 'b'];
   const arr2 = ['c', 'd'];
   const arr3 = [...arr1, ...arr2]; // ['a', 'b', 'c', 'd']
   ```

4. **转换类数组对象**：

   ```javascript
   const divs = document.querySelectorAll('div');
   const array = [...divs]; // 将 NodeList 转为数组
   ```

5. **字符串转数组**：
   ```javascript
   console.log([...'hello']); // ['h', 'e', 'l', 'l', 'o']
   ```

> **注意**：扩展运算符生成的是浅拷贝，嵌套引用会共享地址。

## 二、构造函数新增方法

1. **`Array.from()`**  
   转换类数组对象或可遍历对象为数组：

   ```javascript
   const arrayLike = { 0: 'a', 1: 'b', length: 2 };
   console.log(Array.from(arrayLike)); // ['a', 'b']
   ```

2. **`Array.of()`**  
   将参数值生成数组：
   ```javascript
   console.log(Array.of(3, 11, 8)); // [3, 11, 8]
   ```

## 三、数组实例新增方法

### 1. **`copyWithin()`**

将数组指定位置的值复制到其他位置：

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3); // [4, 5, 3, 4, 5]
```

### 2. **`find()` 与 `findIndex()`**

- `find()` 返回第一个符合条件的元素：
  ```javascript
  [1, 5, 10].find((x) => x > 5); // 10
  ```
- `findIndex()` 返回第一个符合条件元素的位置：
  ```javascript
  [1, 5, 10].findIndex((x) => x > 5); // 2
  ```

### 3. **`fill()`**

用指定值填充数组：

```javascript
new Array(3).fill(7); // [7, 7, 7]
```

### 4. **`keys()`、`values()`、`entries()`**

- 遍历键、值、键值对：
  ```javascript
  for (const [index, value] of ['a', 'b'].entries()) {
  	console.log(index, value);
  }
  // 0 'a'
  // 1 'b'
  ```

### 5. **`includes()`**

检查数组是否包含某值：

```javascript
[1, 2, NaN].includes(NaN); // true
```

### 6. **`flat()` 和 `flatMap()`**

- **`flat()`**：将多层嵌套数组拍平成单层：
  ```javascript
  [1, [2, [3, 4]]].flat(2); // [1, 2, 3, 4]
  ```
- **`flatMap()`**：映射并展平：
  ```javascript
  [1, 2, 3].flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
  ```

## 四、数组空位处理

ES6 明确将空位视为 `undefined`：

```javascript
Array.from([, 1, ,]); // [undefined, 1, undefined]
```

## 五、排序稳定性

`sort()` 方法变为稳定排序：

```javascript
const arr = ['apple', 'banana', 'apple'];
arr.sort(); // 原有顺序的相对位置保持不变
```

---

更多内容可参考[阮一峰的 ES6 教程](https://es6.ruanyifeng.com/#docs/array)。
