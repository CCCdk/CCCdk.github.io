# 什么是事件代理？应用场景？

## 一、什么是事件代理？

事件代理（Event Delegation）是一种利用事件冒泡机制，将事件绑定到目标元素的祖先元素，而非目标元素自身的技术。
当事件发生时，由祖先元素捕获事件并通过事件目标属性判断执行对应逻辑。

事件流的都会经过三个阶段： 捕获阶段 -> 目标阶段 -> 冒泡阶段，而事件委托就是在冒泡阶段完成。

事件委托会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，而不是目标元素。

当事件在目标元素上触发后，会经历事件冒泡阶段，逐层传递到祖先元素，从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。通过捕获事件的冒泡，祖先元素可以代理子元素的事件处理逻辑。

## 二、应用场景

### 1. 动态元素的事件绑定

如果我们有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件

```js
<ul id="list">
	<li>item 1</li>
	<li>item 2</li>
	<li>item 3</li>
	......
	<li>item n</li>
</ul>
```

如果给每个列表项一一都绑定一个函数，那对于内存消耗是非常大的

```js
// 获取目标元素
const lis = document.getElementsByTagName('li');
// 循环遍历绑定事件
for (let i = 0; i < lis.length; i++) {
	lis[i].onclick = function (e) {
		console.log(e.target.innerHTML);
	};
}
```

这时候就可以事件委托，把点击事件绑定在父级元素`ul`上面，然后执行事件的时候再去匹配目标元素

```js
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
	// 兼容性处理
	var event = e || window.event;
	var target = event.target || event.srcElement;
	// 判断是否匹配目标元素
	if (target.nodeName.toLocaleLowerCase === 'li') {
		console.log('the content is: ', target.innerHTML);
	}
});
```

### 2. 简化事件绑定

还有一种场景是上述列表项并不多，我们给每个列表项都绑定了事件，但是如果用户能够随时动态的增加或者去除列表项元素，那么在每一次改变的时候都需要重新给新增的元素绑定事件，给即将删去的元素解绑事件。

如果用了事件委托就没有这种麻烦了，因为事件是绑定在父层的，和目标元素的增减是没有关系的，执行到目标元素是在真正响应执行事件函数的过程中去匹配的

举个例子：

下面`html`结构中，点击`input`可以动态添加元素

```html
<input type="button" name="" id="btn" value="添加" />
<ul id="ul1">
	<li>item 1</li>
	<li>item 2</li>
	<li>item 3</li>
	<li>item 4</li>
</ul>
```

使用事件委托

```js
const oBtn = document.getElementById('btn');
const oUl = document.getElementById('ul1');
const num = 4;

//事件委托，添加的子元素也有事件
oUl.onclick = function (ev) {
	ev = ev || window.event;
	const target = ev.target || ev.srcElement;
	if (target.nodeName.toLowerCase() == 'li') {
		console.log('the content is: ', target.innerHTML);
	}
};

//添加新节点
oBtn.onclick = function () {
	num++;
	const oLi = document.createElement('li');
	oLi.innerHTML = `item ${num}`;
	oUl.appendChild(oLi);
};
```

可以看到，使用事件委托，在动态绑定事件的情况下是可以减少很多重复工作的

## 三、总结

适合事件委托的事件有：`click`，`mousedown`，`mouseup`，`keydown`，`keyup`，`keypress`

从上面应用场景中，我们就可以看到使用事件委托的优点：

1. **减少内存占用**：只需绑定到祖先元素，避免为每个子元素单独绑定事件。
2. **动态处理元素**：新增或删除子元素时，无需重新绑定事件。
3. **逻辑集中**：事件处理逻辑集中于一处，代码更加清晰易维护。

但是使用事件委托也是存在局限性：

- `focus`、`blur `这些事件没有事件冒泡机制，所以无法进行委托绑定事件

- `mousemove`、`mouseout `这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的

如果把所有事件都用事件代理，可能会出现事件误判，即本不该被触发的事件被绑定上了事件
