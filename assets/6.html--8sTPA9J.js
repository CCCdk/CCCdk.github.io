import{_ as n,o as s,c as a,a as t}from"./app-y5y1bORC.js";const p={},e=t(`<h1 id="_6-computed-实现原理" tabindex="-1"><a class="header-anchor" href="#_6-computed-实现原理" aria-hidden="true">#</a> 6. Computed 实现原理</h1><p>接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 ref 对象。</p><ul><li>计算属性的 getter 只有当取值时才会执行。</li><li>计算属性是具备缓存的，如果依赖的值不发生变化，不会重新执行 getter。</li><li>计算属性也是一个 effect，内部也具备依赖收集的功能。</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> effect<span class="token punctuation">,</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./reactivity.js&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> flag<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">&#39;erxiao&#39;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">30</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> aliasName <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span>oldValue<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;computed-run&#39;</span><span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token string">&#39;**&#39;</span> <span class="token operator">+</span> state<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;**&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> runner <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect-run&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>aliasName<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>aliasName<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>aliasName<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	state<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;Handsome erxiao&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-增加-dirty-标识" tabindex="-1"><a class="header-anchor" href="#_1-增加-dirty-标识" aria-hidden="true">#</a> 1.增加 dirty 标识</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 将常量统一维护在一起</span>
<span class="token keyword">export</span> <span class="token keyword">enum</span> ReactiveFlags <span class="token punctuation">{</span>
	<span class="token constant">IS_REACTIVE</span> <span class="token operator">=</span> <span class="token string">&#39;__v_isReactive&#39;</span> <span class="token comment">// 基本上唯一</span>
<span class="token punctuation">}</span>

<span class="token comment">// dirty 等级</span>
<span class="token keyword">export</span> <span class="token keyword">enum</span> DirtyLevels <span class="token punctuation">{</span>
	NotDirty <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 不是脏值</span>
	Dirty <span class="token operator">=</span> <span class="token number">4</span> <span class="token comment">// 脏值</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ReactiveEffect</span> <span class="token punctuation">{</span>
	_depsLength <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 用于记录依赖的个数</span>
	_trackId <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 用于记录收集的次数</span>
	_runnings <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	_dirtyLevel <span class="token operator">=</span> DirtyLevels<span class="token punctuation">.</span>Dirty<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token keyword">get</span> <span class="token function">dirty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 是否是脏值</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_dirtyLevel <span class="token operator">===</span> DirtyLevels<span class="token punctuation">.</span>Dirty<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">set</span> <span class="token function">dirty</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>_dirtyLevel <span class="token operator">=</span> v <span class="token operator">?</span> DirtyLevels<span class="token punctuation">.</span>Dirty <span class="token operator">:</span> DirtyLevels<span class="token punctuation">.</span>NotDirty<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>_dirtyLevel <span class="token operator">=</span> DirtyLevels<span class="token punctuation">.</span>NotDirty<span class="token punctuation">;</span> <span class="token comment">// 运行一次后，脏值变为不脏</span>
		<span class="token comment">// ...</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-计算属性实现" tabindex="-1"><a class="header-anchor" href="#_2-计算属性实现" aria-hidden="true">#</a> 2.计算属性实现</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> isFunction <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/shared&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
	activeEffect<span class="token punctuation">,</span>
	ReactiveEffect<span class="token punctuation">,</span>
	trackEffects<span class="token punctuation">,</span>
	triggerEffects
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./effect&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">ComputedRefImpl</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> effect<span class="token punctuation">;</span>
	<span class="token keyword">public</span> _value<span class="token punctuation">;</span>
	<span class="token keyword">public</span> dep<span class="token punctuation">;</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token keyword">public</span> setter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>
			<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">getter</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 计算属性依赖的值会对计算属性effect进行收集</span>
			<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">triggerRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">// 计算属性依赖的值变化后会触发此函数</span>
		<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 脏值，并且值不相同才出发更新</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>effect<span class="token punctuation">.</span>dirty <span class="token operator">&amp;&amp;</span>
			<span class="token operator">!</span>Object<span class="token punctuation">.</span><span class="token keyword">is</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token function">trackRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 取值时进行依赖收集</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">set</span> <span class="token function">value</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setter</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span>getterOrOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">const</span> onlyGetter <span class="token operator">=</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>getterOrOptions<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 传入的是函数就是getter</span>
	<span class="token keyword">let</span> getter<span class="token punctuation">;</span>
	<span class="token keyword">let</span> setter<span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>onlyGetter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		getter <span class="token operator">=</span> getterOrOptions<span class="token punctuation">;</span>
		<span class="token function-variable function">setter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		getter <span class="token operator">=</span> getterOrOptions<span class="token punctuation">.</span>get<span class="token punctuation">;</span>
		setter <span class="token operator">=</span> getterOrOptions<span class="token punctuation">.</span>set<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 创建计算属性</span>
	<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ComputedRefImpl</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> setter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>创建 ReactiveEffect 时，传入<code>trigger</code>函数，稍后依赖的属性变化时调用此方法！(计算属性更新时只需要更新 dirty)，同时将<code>scheduler</code>参数作为第三个参数</p></blockquote><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> _effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>
	fn<span class="token punctuation">,</span>
	<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// trigger 函数</span>
	<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token comment">// scheduler</span>
		_effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">triggerEffects</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> effect <span class="token keyword">of</span> dep<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 计算属性，则将dirty变为true在</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>effect<span class="token punctuation">.</span>_dirtyLevel <span class="token operator">&lt;</span> DirtyLevels<span class="token punctuation">.</span>Dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			effect<span class="token punctuation">.</span>_dirtyLevel <span class="token operator">=</span> DirtyLevels<span class="token punctuation">.</span>Dirty<span class="token punctuation">;</span>
			<span class="token comment">// 需要差异化开，计算属性只需要修改dirty</span>
			effect<span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>effect<span class="token punctuation">.</span>_runnings<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 如果正在运行什么都不做</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>effect<span class="token punctuation">.</span>scheduler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				effect<span class="token punctuation">.</span><span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),c=[e];function o(i,l){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","6.html.vue"]]);export{k as default};
