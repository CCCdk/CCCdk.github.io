import{_ as p,r as e,o as c,c as o,b as n,d as a,e as t,a as l}from"./app-y5y1bORC.js";const i={},u=l(`<h1 id="说说对-react-的理解-有哪些特性" tabindex="-1"><a class="header-anchor" href="#说说对-react-的理解-有哪些特性" aria-hidden="true">#</a> 说说对 React 的理解？有哪些特性？</h1><h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2><p>React，用于构建用户界面的 JavaScript 库，只提供了 UI 层面的解决方案</p><p>遵循组件设计模式、声明式编程范式和函数式编程概念，以使前端应用程序更高效</p><p>使用虚拟 <code>DOM</code> 来有效地操作 <code>DOM</code>，遵循从高阶组件到低阶组件的单向数据流</p><p>帮助我们将界面成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，构成整体页面</p><p><code>react</code> 类组件使用一个名为 <code>render()</code> 的方法或者函数组件<code>return</code>，接收输入的数据并返回需要展示的内容</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">HelloMessage</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
	<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Hello </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">HelloMessage</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Taylor<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token punctuation">,</span>
	document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;hello-example&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述这种类似 <code>XML</code> 形式就是 <code>JSX</code>，最终会被 <code>babel</code> 编译为合法的 <code>JS</code> 语句调用</p><p>被传入的数据可在组件中通过 <code>this.props</code> 在 <code>render()</code> 访问</p><h2 id="二、特性" tabindex="-1"><a class="header-anchor" href="#二、特性" aria-hidden="true">#</a> 二、特性</h2><p><code>React</code> 特性有很多，如：</p><ul><li>JSX 语法</li><li>单向数据绑定</li><li>虚拟 DOM</li><li>声明式编程</li><li>Component</li></ul><p>着重介绍下声明式编程及 Component</p><h3 id="声明式编程" tabindex="-1"><a class="header-anchor" href="#声明式编程" aria-hidden="true">#</a> 声明式编程</h3><p>声明式编程是一种编程范式，它关注的是你要做什么，而不是如何做</p><p>它表达逻辑而不显式地定义步骤。这意味着我们需要根据逻辑的计算来声明要显示的组件</p><p>如实现一个标记的地图：</p><p>通过命令式创建地图、创建标记、以及在地图上添加的标记的步骤如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建地图</span>
<span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token punctuation">.</span>map</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;map&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">zoom</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
	<span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">{</span> lat<span class="token punctuation">,</span> lng <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建标记</span>
<span class="token keyword">const</span> marker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token punctuation">.</span>marker</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token punctuation">{</span> lat<span class="token punctuation">,</span> lng <span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Hello Marker&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 地图上添加标记</span>
marker<span class="token punctuation">.</span><span class="token function">setMap</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而用 <code>React</code> 实现上述功能则如下：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span></span> <span class="token attr-name">zoom</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">}</span></span> <span class="token attr-name">center</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span>lat<span class="token punctuation">,</span> lng<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
	</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Marker</span></span> <span class="token attr-name">position</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span>lat<span class="token punctuation">,</span> lng<span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token attr-name">title</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&#39;Hello Marker&#39;</span><span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Map</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>声明式编程方式使得 <code>React</code> 组件很容易使用，最终的代码简单易于维护</p><h3 id="component" tabindex="-1"><a class="header-anchor" href="#component" aria-hidden="true">#</a> Component</h3><p>在 <code>React</code> 中，一切皆为组件。通常将应用程序的整个逻辑分解为小的单个部分。 我们将每个单独的部分称为组件</p><p>组件可以是一个函数或者是一个类，接受数据输入，处理它并返回在 <code>UI</code> 中呈现的 <code>React</code> 元素</p><p>函数式组件如下：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">const</span> <span class="token function-variable function">Header</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token punctuation">(</span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Jumbotron</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">backgroundColor</span><span class="token operator">:</span> <span class="token string">&#39;orange&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
			</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">TODO App</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
		</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Jumbotron</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类组件（有状态组件）如下：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">Dashboard</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">(</span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dashboard<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ToDoForm</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ToDolist</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
			</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
		<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个组件该有的特点如下：</p><ul><li>可组合：每个组件易于和其它组件一起使用，或者嵌套在另一个组件内部</li><li>可重用：每个组件都是具有独立功能的，它可以被使用在多个 UI 场景</li><li>可维护：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护</li></ul><h2 id="三、优势" tabindex="-1"><a class="header-anchor" href="#三、优势" aria-hidden="true">#</a> 三、优势</h2><p>通过上面的初步了解，可以感受到 <code>React</code> 存在的优势：</p><ul><li>高效灵活</li><li>声明式的设计，简单使用</li><li>组件式开发，提高代码复用率</li><li>单向响应的数据流会比双向绑定的更安全，速度更快</li></ul><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>`,36),r={href:"https://segmentfault.com/a/1190000015924762",target:"_blank",rel:"noopener noreferrer"},k={href:"https://react.docschina.org/",target:"_blank",rel:"noopener noreferrer"};function d(v,m){const s=e("ExternalLinkIcon");return c(),o("div",null,[u,n("ul",null,[n("li",null,[n("a",r,[a("https://segmentfault.com/a/1190000015924762"),t(s)])]),n("li",null,[n("a",k,[a("https://react.docschina.org/"),t(s)])])])])}const b=p(i,[["render",d],["__file","react.html.vue"]]);export{b as default};
