import{_ as n,o as a,c as s,a as t}from"./app-y5y1bORC.js";const p={},e=t(`<h1 id="动态给-vue-的-data-添加一个新的属性时会发生什么-怎样解决" tabindex="-1"><a class="header-anchor" href="#动态给-vue-的-data-添加一个新的属性时会发生什么-怎样解决" aria-hidden="true">#</a> 动态给 vue 的 data 添加一个新的属性时会发生什么？怎样解决？</h1><h2 id="一、直接添加属性的问题" tabindex="-1"><a class="header-anchor" href="#一、直接添加属性的问题" aria-hidden="true">#</a> 一、直接添加属性的问题</h2><p>我们从一个例子开始</p><p>定义一个<code>p</code>标签，通过<code>v-for</code>指令进行遍历</p><p>然后给<code>botton</code>标签绑定点击事件，我们预期点击按钮时，数据新增一个属性，界面也 新增一行</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(value,key) in item<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>key<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ value }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>addProperty<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>动态添加新属性<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>实例化一个<code>vue</code>实例，定义<code>data</code>属性和<code>methods</code>方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
	<span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">oldProperty</span><span class="token operator">:</span> <span class="token string">&#39;旧属性&#39;</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token function">addProperty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span>newProperty <span class="token operator">=</span> <span class="token string">&#39;新属性&#39;</span><span class="token punctuation">;</span> <span class="token comment">// 为items添加新属性</span>
			console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出带有newProperty的items</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击按钮，发现结果不及预期，数据虽然更新了（<code>console</code>打印出了新属性），但页面并没有更新</p><h2 id="二、原理分析" tabindex="-1"><a class="header-anchor" href="#二、原理分析" aria-hidden="true">#</a> 二、原理分析</h2><p>为什么产生上面的情况呢？</p><p>下面来分析一下</p><p><code>vue2</code>是用过<code>Object.defineProperty</code>实现数据响应式</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">get foo:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>val<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> val
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">set</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>newVal <span class="token operator">!==</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">set foo:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>newVal<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                val <span class="token operator">=</span> newVal
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们访问<code>foo</code>属性或者设置<code>foo</code>值的时候都能够触发<code>setter</code>与<code>getter</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>obj<span class="token punctuation">.</span>foo<span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">&#39;new&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我们为<code>obj</code>添加新属性的时候，却无法触发事件属性的拦截</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>obj<span class="token punctuation">.</span>bar <span class="token operator">=</span> <span class="token string">&#39;新属性&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>原因是一开始<code>obj</code>的<code>foo</code>属性被设成了响应式数据，而<code>bar</code>是后面新增的属性，并没有通过<code>Object.defineProperty</code>设置成响应式数据</p><h2 id="三、解决方案" tabindex="-1"><a class="header-anchor" href="#三、解决方案" aria-hidden="true">#</a> 三、解决方案</h2><p><code>Vue</code> 不允许在已经创建的实例上动态添加新的响应式属性</p><p>若想实现数据与视图同步更新，可采取下面三种解决方案：</p><ul><li>Vue.set()</li><li>Object.assign()</li><li>$forcecUpdated()</li></ul><h3 id="vue-set" tabindex="-1"><a class="header-anchor" href="#vue-set" aria-hidden="true">#</a> Vue.set()</h3><p>Vue.set( target, propertyName/index, value )</p><p>参数</p><ul><li><code>{Object | Array} target</code></li><li><code>{string | number} propertyName/index</code></li><li><code>{any} value</code></li></ul><p>返回值：设置的值</p><p>通过<code>Vue.set</code>向响应式对象中添加一个<code>property</code>，并确保这个新 <code>property </code>同样是响应式的，且触发视图更新</p><p>关于<code>Vue.set</code>源码（省略了很多与本节不相关的代码）</p><p>源码位置：<code>src\\core\\observer\\index.js</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">set</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token operator">|</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span> any<span class="token punctuation">,</span> <span class="token literal-property property">val</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token function">defineReactive</span><span class="token punctuation">(</span>ob<span class="token punctuation">.</span>value<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
  ob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> val
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里无非再次调用<code>defineReactive</code>方法，实现新增属性的响应式</p><p>关于<code>defineReactive</code>方法，内部还是通过<code>Object.defineProperty</code>实现属性拦截</p><p>大致代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">defineReactive</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
		<span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">get </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>val<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span> val<span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">set</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>newVal <span class="token operator">!==</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">set </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>newVal<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				val <span class="token operator">=</span> newVal<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="object-assign" tabindex="-1"><a class="header-anchor" href="#object-assign" aria-hidden="true">#</a> Object.assign()</h3><p>直接使用<code>Object.assign()</code>添加到对象的新属性不会触发更新</p><p>应创建一个新的对象，合并原对象和混入对象的属性</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>someObject <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>someObject<span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">newProperty1</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token literal-property property">newProperty2</span><span class="token operator">:</span><span class="token number">2</span> <span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="forceupdate" tabindex="-1"><a class="header-anchor" href="#forceupdate" aria-hidden="true">#</a> $forceUpdate</h3><p>如果你发现你自己需要在 <code>Vue </code>中做一次强制更新，99.9% 的情况，是你在某个地方做错了事</p><p><code>$forceUpdate</code>迫使<code> Vue</code> 实例重新渲染</p><p>PS：仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。</p><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3><ul><li><p>如果为对象添加少量的新属性，可以直接采用<code>Vue.set()</code></p></li><li><p>如果需要为新对象添加大量的新属性，则通过<code>Object.assign()</code>创建新对象</p></li><li><p>如果你实在不知道怎么操作时，可采取<code>$forceUpdate()</code>进行强制刷新 (不建议)</p></li></ul><p>PS：<code>vue3</code>是用过<code>proxy</code>实现数据响应式的，直接动态添加新属性仍可以实现数据响应式</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><ul><li>https://cn.vuejs.org/v2/api/#Vue-set</li><li>https://vue3js.cn/docs/zh</li></ul>`,49),o=[e];function c(i,l){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","data_object_add_attrs.html.vue"]]);export{r as default};
