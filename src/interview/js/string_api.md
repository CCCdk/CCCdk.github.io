# JavaScript 字符串的常用方法有哪些？

JavaScript 中的字符串操作方法丰富，主要分为以下几类：**增、删、改、查、转换**和**正则匹配**。需要注意，**字符串是不可变的**，所有操作都会返回新的字符串，而不会修改原字符串。

---

## 一、增

在字符串中“增”的本质是创建新字符串，以下是常用方法：

### 1. 字符串拼接

- 使用 **`+`** 操作符或 **模板字符串 (`${}`)**。
- 使用 **`concat()`** 方法。

#### 示例：

```javascript
let str = 'hello ';
let result = str.concat('world');
console.log(result); // "hello world"
console.log(str); // "hello"
```

---

## 二、删

“删”的操作指创建字符串副本，截取或移除部分内容，常用方法包括：

- **`slice()`**
- **`substr()`**
- **`substring()`**

### 区别与用法：

```javascript
let str = 'hello world';

console.log(str.slice(3)); // "lo world" 从索引 3 截取到末尾
console.log(str.substring(3, 7)); // "lo w" 从索引 3 截取到索引 7（不含）
console.log(str.substr(3, 4)); // "lo w" 从索引 3 开始，截取 4 个字符
```

> **注意：** `substr` 已被废弃，建议使用 `slice` 或 `substring`。

---

## 三、改

修改字符串生成副本，常见操作包括去空格、重复、填充和大小写转换。

### 1. 去空格

- **`trim()`**：去除首尾空格。
- **`trimStart()` / `trimEnd()`**：去除头部或尾部空格。

#### 示例：

```javascript
let str = ' hello world ';
console.log(str.trim()); // "hello world"
console.log(str.trimStart()); // "hello world "
console.log(str.trimEnd()); // " hello world"
```

### 2. 字符串重复

- **`repeat()`**：重复字符串指定次数。

```javascript
let str = 'na ';
console.log(str.repeat(2)); // "na na"
```

### 3. 字符填充

- **`padStart()` / `padEnd()`**：填充字符串至指定长度。

```javascript
let str = 'foo';
console.log(str.padStart(6)); // "   foo"
console.log(str.padEnd(6, '.')); // "foo..."
```

### 4. 大小写转换

- **`toLowerCase()`**：转为小写。
- **`toUpperCase()`**：转为大写。

---

## 四、查

“查”指从字符串中获取某部分内容或判断是否包含特定字符。

- **`charAt()`**：返回指定索引处的字符。
- **`indexOf()`**：返回第一次出现的索引，未找到返回 -1。
- **`startsWith()` / `includes()`**：判断是否以指定字符开头或包含指定字符。

#### 示例：

```javascript
let str = 'foobarbaz';
console.log(str.charAt(2)); // "o"
console.log(str.indexOf('bar')); // 3
console.log(str.startsWith('foo')); // true
console.log(str.includes('baz')); // true
```

---

## 五、转换

### **`split()`**

将字符串按照指定分隔符拆分为数组。

#### 示例：

```javascript
let str = '12+23+34';
console.log(str.split('+')); // ["12", "23", "34"]
```

---

## 六、正则匹配

针对正则表达式的匹配，字符串提供以下方法：

### 1. **`match()`**

返回匹配结果的数组。

```javascript
let str = 'cat, bat, sat, fat';
console.log(str.match(/.at/)); // ["cat"]
```

### 2. **`search()`**

返回匹配项的索引，未找到返回 -1。

```javascript
let str = 'cat, bat, sat, fat';
console.log(str.search(/at/)); // 1
```

### 3. **`replace()`**

用指定内容替换匹配项，支持函数作为替换逻辑。

```javascript
let str = 'cat, bat, sat, fat';
console.log(str.replace('at', 'ond')); // "cond, bat, sat, fat"
```
