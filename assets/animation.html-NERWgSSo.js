import{_ as n,o as s,c as a,a as t}from"./app-y5y1bORC.js";const p={},e=t(`<h1 id="在-react-中组件间过渡动画如何实现" tabindex="-1"><a class="header-anchor" href="#在-react-中组件间过渡动画如何实现" aria-hidden="true">#</a> 在 react 中组件间过渡动画如何实现？</h1><h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2><p>在日常开发中，页面切换时的转场动画是比较基础的一个场景</p><p>当一个组件在显示与消失过程中存在过渡动画，可以很好的增加用户的体验</p><p>在<code>react</code>中实现过渡动画效果会有很多种选择，如<code>react-transition-group</code>，<code>react-motion</code>，<code>Animated</code>，以及原生的<code>CSS</code>都能完成切换动画</p><h2 id="二、如何实现" tabindex="-1"><a class="header-anchor" href="#二、如何实现" aria-hidden="true">#</a> 二、如何实现</h2><p>在<code>react</code>中，<code>react-transition-group</code>是一种很好的解决方案，其为元素添加<code>enter</code>，<code>enter-active</code>，<code>exit</code>，<code>exit-active</code>这一系列勾子</p><p>可以帮助我们方便的实现组件的入场和离场动画</p><p>其主要提供了三个主要的组件：</p><ul><li>CSSTransition：在前端开发中，结合 CSS 来完成过渡动画效果</li><li>SwitchTransition：两个组件显示和隐藏切换时，使用该组件</li><li>TransitionGroup：将多个动画组件包裹在其中，一般用于列表中元素的动画</li></ul><h3 id="csstransition" tabindex="-1"><a class="header-anchor" href="#csstransition" aria-hidden="true">#</a> CSSTransition</h3><p>其实现动画的原理在于，当<code>CSSTransition</code>的<code>in</code>属性置为<code>true</code>时，<code>CSSTransition</code>首先会给其子组件加上<code>xxx-enter</code>、<code>xxx-enter-active</code>的<code>class</code>执行动画</p><p>当动画执行结束后，会移除两个<code>class</code>，并且添加<code>-enter-done</code>的<code>class</code></p><p>所以可以利用这一点，通过<code>css</code>的<code>transition</code>属性，让元素在两个状态之间平滑过渡，从而得到相应的动画效果</p><p>当<code>in</code>属性置为<code>false</code>时，<code>CSSTransition</code>会给子组件加上<code>xxx-exit</code>和<code>xxx-exit-active</code>的<code>class</code>，然后开始执行动画，当动画结束后，移除两个<code>class</code>，然后添加<code>-enter-done</code>的<code>class</code></p><p>如下例子：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">App2</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>PureComponent</span> <span class="token punctuation">{</span>
	state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token function-variable function">onToggle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>show <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">const</span> <span class="token punctuation">{</span> show <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token punctuation">(</span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&#39;container&#39;</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&#39;square-wrapper&#39;</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
					</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">CSSTransition</span></span>
						<span class="token attr-name">in</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>show<span class="token punctuation">}</span></span>
						<span class="token attr-name">timeout</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">500</span><span class="token punctuation">}</span></span>
						<span class="token attr-name">classNames</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&#39;fade&#39;</span><span class="token punctuation">}</span></span>
						<span class="token attr-name">unmountOnExit</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">}</span></span>
					<span class="token punctuation">&gt;</span></span><span class="token plain-text">
						</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&#39;square&#39;</span><span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
					</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">CSSTransition</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onToggle<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">toggle</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
			</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
		<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应<code>css</code>样式如下：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.fade-enter</span> <span class="token punctuation">{</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>100%<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.fade-enter-active</span> <span class="token punctuation">{</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token property">transition</span><span class="token punctuation">:</span> all 500ms<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.fade-exit</span> <span class="token punctuation">{</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.fade-exit-active</span> <span class="token punctuation">{</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>-100%<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token property">transition</span><span class="token punctuation">:</span> all 500ms<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="switchtransition" tabindex="-1"><a class="header-anchor" href="#switchtransition" aria-hidden="true">#</a> SwitchTransition</h3><p><code>SwitchTransition</code>可以完成两个组件之间切换的炫酷动画</p><p>比如有一个按钮需要在<code>on</code>和<code>off</code>之间切换，我们希望看到<code>on</code>先从左侧退出，<code>off</code>再从右侧进入</p><p><code>SwitchTransition</code>中主要有一个属性<code>mode</code>，对应两个值：</p><ul><li>in-out：表示新组件先进入，旧组件再移除；</li><li>out-in：表示就组件先移除，新组建再进入</li></ul><p><code>SwitchTransition</code>组件里面要有<code>CSSTransition</code>，不能直接包裹你想要切换的组件</p><p>里面的<code>CSSTransition</code>组件不再像以前那样接受<code>in</code>属性来判断元素是何种状态，取而代之的是<code>key</code>属性</p><p>下面给出一个按钮入场和出场的示例，如下：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> SwitchTransition<span class="token punctuation">,</span> CSSTransition <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-transition-group&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">SwitchAnimation</span> <span class="token keyword">extends</span> <span class="token class-name">PureComponent</span> <span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">isOn</span><span class="token operator">:</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">const</span> <span class="token punctuation">{</span> isOn <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">;</span>

		<span class="token keyword">return</span> <span class="token punctuation">(</span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">SwitchTransition</span></span> <span class="token attr-name">mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>out-in<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">CSSTransition</span></span> <span class="token attr-name">classNames</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>btn<span class="token punctuation">&quot;</span></span> <span class="token attr-name">timeout</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">500</span><span class="token punctuation">}</span></span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>isOn <span class="token operator">?</span> <span class="token string">&#39;on&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
					</span><span class="token punctuation">{</span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">btnClick</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
							</span><span class="token punctuation">{</span>isOn <span class="token operator">?</span> <span class="token string">&#39;on&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">}</span><span class="token plain-text">
						</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
					<span class="token punctuation">}</span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">CSSTransition</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
			</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">SwitchTransition</span></span><span class="token punctuation">&gt;</span></span>
		<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">btnClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">isOn</span><span class="token operator">:</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>isOn <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>css</code>文件对应如下：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.btn-enter</span> <span class="token punctuation">{</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>100%<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.btn-enter-active</span> <span class="token punctuation">{</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
	<span class="token property">transition</span><span class="token punctuation">:</span> all 500ms<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.btn-exit</span> <span class="token punctuation">{</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.btn-exit-active</span> <span class="token punctuation">{</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-100%<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
	<span class="token property">transition</span><span class="token punctuation">:</span> all 500ms<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="transitiongroup" tabindex="-1"><a class="header-anchor" href="#transitiongroup" aria-hidden="true">#</a> TransitionGroup</h3><p>当有一组动画的时候，就可将这些<code>CSSTransition</code>放入到一个<code>TransitionGroup</code>中来完成动画</p><p>同样<code>CSSTransition</code>里面没有<code>in</code>属性，用到了<code>key</code>属性</p><p><code>TransitionGroup</code>在感知<code>children</code>发生变化的时候，先保存移除的节点，当动画结束后才真正移除</p><p>其处理方式如下：</p><ul><li><p>插入的节点，先渲染 dom，然后再做动画</p></li><li><p>删除的节点，先做动画，然后再删除 dom</p></li></ul><p>如下：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> PureComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CSSTransition<span class="token punctuation">,</span> TransitionGroup <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-transition-group&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">GroupAnimation</span> <span class="token keyword">extends</span> <span class="token class-name">PureComponent</span> <span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">friends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
		<span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">(</span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TransitionGroup</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
					</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>friends<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
						<span class="token keyword">return</span> <span class="token punctuation">(</span>
							<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">CSSTransition</span></span> <span class="token attr-name">classNames</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>friend<span class="token punctuation">&quot;</span></span> <span class="token attr-name">timeout</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">300</span><span class="token punctuation">}</span></span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>index<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
								</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>item<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
							</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">CSSTransition</span></span><span class="token punctuation">&gt;</span></span>
						<span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">TransitionGroup</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addFriend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">+friend</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
			</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
		<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">addFriend</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
			<span class="token literal-property property">friends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>friends<span class="token punctuation">,</span> <span class="token string">&#39;coderwhy&#39;</span><span class="token punctuation">]</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应<code>css</code>如下：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.friend-enter</span> <span class="token punctuation">{</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>100%<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.friend-enter-active</span> <span class="token punctuation">{</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
	<span class="token property">transition</span><span class="token punctuation">:</span> all 500ms<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.friend-exit</span> <span class="token punctuation">{</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.friend-exit-active</span> <span class="token punctuation">{</span>
	<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-100%<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
	<span class="token property">transition</span><span class="token punctuation">:</span> all 500ms<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><ul><li>https://segmentfault.com/a/1190000018861018</li><li>https://mp.weixin.qq.com/s/14HneI7SpfrRHKtqgosIiA</li></ul>`,42),c=[e];function o(i,l){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","animation.html.vue"]]);export{k as default};
