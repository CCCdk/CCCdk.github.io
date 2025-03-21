import{_ as n,o as s,c as a,a as t}from"./app-y5y1bORC.js";const e="/assets/interview-vue-64-o2bBblsK.png",p="/assets/interview-vue-65-zbC44vz0.png",o="/assets/interview-vue-66--1GdFBST.png",c="/assets/interview-vue-67-KHqRJP91.png",i={},u=t(`<h1 id="说说-vue-3-0-中-treeshaking-特性-举例说明一下" tabindex="-1"><a class="header-anchor" href="#说说-vue-3-0-中-treeshaking-特性-举例说明一下" aria-hidden="true">#</a> 说说 Vue 3.0 中 Treeshaking 特性？举例说明一下？</h1><h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2><p><code>Tree shaking</code> 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 <code>Dead code elimination</code></p><p>简单来讲，就是在保持代码运行结果不变的前提下，去除无用的代码</p><p>如果把代码打包比作制作蛋糕，传统的方式是把鸡蛋（带壳）全部丢进去搅拌，然后放入烤箱，最后把（没有用的）蛋壳全部挑选并剔除出去</p><p>而<code>treeshaking</code>则是一开始就把有用的蛋白蛋黄（import）放入搅拌，最后直接作出蛋糕</p><p>也就是说 ，<code>tree shaking</code> 其实是找出使用的代码</p><p>在<code>Vue2</code>中，无论我们使用什么功能，它们最终都会出现在生产代码中。主要原因是<code>Vue</code>实例在项目中是单例的，捆绑程序无法检测到该对象的哪些属性在代码中被使用到</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

Vue<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而<code>Vue3</code>源码引入<code>tree shaking</code>特性，将全局 API 进行分块。如果您不使用其某些功能，它们将不会包含在您的基础包中</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> nextTick<span class="token punctuation">,</span> observable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、如何做" tabindex="-1"><a class="header-anchor" href="#二、如何做" aria-hidden="true">#</a> 二、如何做</h2><p><code>Tree shaking</code>是基于<code>ES6</code>模板语法（<code>import</code>与<code>exports</code>），主要是借助<code>ES6</code>模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量</p><p><code>Tree shaking</code>无非就是做了两件事：</p><ul><li>编译阶段利用<code>ES6 Module</code>判断哪些模块已经加载</li><li>判断那些模块和变量未被使用或者引用，进而删除对应代码</li></ul><p>下面就来举个例子：</p><p>通过脚手架<code>vue-cli</code>安装<code>Vue2</code>与<code>Vue3</code>项目</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>vue create vue<span class="token operator">-</span>demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="vue2-项目" tabindex="-1"><a class="header-anchor" href="#vue2-项目" aria-hidden="true">#</a> Vue2 项目</h3><p>组件中使用<code>data</code>属性</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
	<span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
		<span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">1</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对项目进行打包，体积如下图</p><figure><img src="`+e+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>为组件设置其他属性（<code>compted</code>、<code>watch</code>）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">question</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">double</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">question</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">newQuestion<span class="token punctuation">,</span> oldQuestion</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>answer <span class="token operator">=</span> <span class="token string">&#39;xxxx&#39;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再一次打包，发现打包出来的体积并没有变化</p><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="vue3-项目" tabindex="-1"><a class="header-anchor" href="#vue3-项目" aria-hidden="true">#</a> Vue3 项目</h3><p>组件中简单使用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
			<span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">1</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token punctuation">{</span>
			state
		<span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将项目进行打包</p><figure><img src="`+o+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在组件中引入<code>computed</code>和<code>watch</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> defineComponent<span class="token punctuation">,</span> computed<span class="token punctuation">,</span> watch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
			<span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">1</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">const</span> double <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> state<span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token function">watch</span><span class="token punctuation">(</span>
			<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>count<span class="token punctuation">,</span>
			<span class="token punctuation">(</span><span class="token parameter">count<span class="token punctuation">,</span> preCount</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
				console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>preCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token punctuation">{</span>
			state<span class="token punctuation">,</span>
			double
		<span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次对项目进行打包，可以看到在引入<code>computer</code>和<code>watch</code>之后，项目整体体积变大了</p><figure><img src="`+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="三、作用" tabindex="-1"><a class="header-anchor" href="#三、作用" aria-hidden="true">#</a> 三、作用</h2><p>通过<code>Tree shaking</code>，<code>Vue3</code>给我们带来的好处是：</p><ul><li>减少程序体积（更小）</li><li>减少程序执行时间（更快）</li><li>便于将来对程序架构进行优化（更友好）</li></ul><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><ul><li>https://segmentfault.com/a/1190000038962700</li></ul>',41),l=[u];function r(d,k){return s(),a("div",null,l)}const m=n(i,[["render",r],["__file","treeshaking.html.vue"]]);export{m as default};
