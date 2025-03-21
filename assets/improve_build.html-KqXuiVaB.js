import{_ as n,o as s,c as a,a as e}from"./app-y5y1bORC.js";const t="/assets/interview-webpack-17-37jDBq7I.png",p={},o=e(`<h1 id="如何提高-webpack-的构建速度" tabindex="-1"><a class="header-anchor" href="#如何提高-webpack-的构建速度" aria-hidden="true">#</a> 如何提高 webpack 的构建速度？</h1><h2 id="一、背景" tabindex="-1"><a class="header-anchor" href="#一、背景" aria-hidden="true">#</a> 一、背景</h2><p>随着我们的项目涉及到页面越来越多，功能和业务代码也会随着越多，相应的 <code>webpack</code> 的构建时间也会越来越久</p><p>构建时间与我们日常开发效率密切相关，当我们本地开发启动 <code>devServer</code> 或者 <code>build</code> 的时候，如果时间过长，会大大降低我们的工作效率</p><p>所以，优化<code>webpack</code> 构建速度是十分重要的环节</p><h2 id="二、如何优化" tabindex="-1"><a class="header-anchor" href="#二、如何优化" aria-hidden="true">#</a> 二、如何优化</h2><p>常见的提升构建速度的手段有如下：</p><ul><li>优化 loader 配置</li><li>合理使用 resolve.extensions</li><li>优化 resolve.modules</li><li>优化 resolve.alias</li><li>使用 DLLPlugin 插件</li><li>使用 cache-loader</li><li>terser 启动多线程</li><li>合理使用 sourceMap</li></ul><h3 id="优化-loader-配置" tabindex="-1"><a class="header-anchor" href="#优化-loader-配置" aria-hidden="true">#</a> 优化 loader 配置</h3><p>在使用<code>loader</code>时，可以通过配置<code>include</code>、<code>exclude</code>、<code>test</code>属性来匹配文件，接触<code>include</code>、<code>exclude</code>规定哪些匹配应用<code>loader</code></p><p>如采用 ES6 的项目为例，在配置 <code>babel-loader </code>时，可以这样：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token punctuation">{</span>
				<span class="token comment">// 如果项目源码中只有 js 文件就不要写成 /\\.jsx?$/，提升正则表达式性能</span>
				<span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
				<span class="token comment">// babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启</span>
				<span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;babel-loader?cacheDirectory&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
				<span class="token comment">// 只对项目根目录下的 src 目录中的文件采用 babel-loader</span>
				<span class="token literal-property property">include</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="合理使用-resolve-extensions" tabindex="-1"><a class="header-anchor" href="#合理使用-resolve-extensions" aria-hidden="true">#</a> 合理使用 resolve.extensions</h3><p>在开发中我们会有各种各样的模块依赖，这些模块可能来自于自己编写的代码，也可能来自第三方库， <code>resolve</code>可以帮助<code>webpack</code>从每个 <code>require/import</code> 语句中，找到需要引入到合适的模块代码</p><p>通过<code>resolve.extensions</code>是解析到文件时自动添加拓展名，默认情况如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">extensions</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;.warm&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;.mjs&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;.js&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;.json&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们引入文件的时候，若没有文件后缀名，则会根据数组内的值依次查找</p><p>当我们配置的时候，则不要随便把所有后缀都写在里面，这会调用多次文件的查找，这样就会减慢打包速度</p><h3 id="优化-resolve-modules" tabindex="-1"><a class="header-anchor" href="#优化-resolve-modules" aria-hidden="true">#</a> 优化 resolve.modules</h3><p><code>resolve.modules</code> 用于配置 <code>webpack</code> 去哪些目录下寻找第三方模块。默认值为<code>[&#39;node_modules&#39;]</code>，所以默认会从<code>node_modules</code>中查找文件 当安装的第三方模块都放在项目根目录下的 <code>./node_modules </code>目录下时，所以可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, &#39;node_modules&#39;)]
  },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="优化-resolve-alias" tabindex="-1"><a class="header-anchor" href="#优化-resolve-alias" aria-hidden="true">#</a> 优化 resolve.alias</h3><p><code>alias</code>给一些常用的路径起一个别名，特别当我们的项目目录结构比较深的时候，一个文件的路径可能是<code>./../../</code>的形式</p><p>通过配置<code>alias</code>以减少查找过程</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">resolve</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">alias</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token string-property property">&quot;@&quot;</span><span class="token operator">:</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">&#39;./src&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-dllplugin-插件" tabindex="-1"><a class="header-anchor" href="#使用-dllplugin-插件" aria-hidden="true">#</a> 使用 DLLPlugin 插件</h3><p><code>DLL</code>全称是 动态链接库，是为软件在 winodw 种实现共享函数库的一种实现方式，而 Webpack 也内置了 DLL 的功能，为的就是可以共享，不经常改变的代码，抽成一个共享的库。这个库在之后的编译过程中，会被引入到其他项目的代码中</p><p>使用步骤分成两部分：</p><ul><li>打包一个 DLL 库</li><li>引入 DLL 库</li></ul><h4 id="打包一个-dll-库" tabindex="-1"><a class="header-anchor" href="#打包一个-dll-库" aria-hidden="true">#</a> 打包一个 DLL 库</h4><p><code>webpack</code>内置了一个<code>DllPlugin</code>可以帮助我们打包一个 DLL 的库文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DllPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;dll_[name]&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">&quot;./dll/[name].mainfest.json&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="引入-dll-库" tabindex="-1"><a class="header-anchor" href="#引入-dll-库" aria-hidden="true">#</a> 引入 DLL 库</h4><p>使用 <code>webpack</code> 自带的 <code>DllReferencePlugin</code> 插件对 <code>mainfest.json</code> 映射文件进行分析，获取要使用的<code>DLL</code>库</p><p>然后再通过<code>AddAssetHtmlPlugin</code>插件，将我们打包的<code>DLL</code>库引入到<code>Html</code>模块中</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DllReferencePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">context</span><span class="token operator">:</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">&quot;./dll/dll_react.js&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">mainfest</span><span class="token operator">:</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">&quot;./dll/react.mainfest.json&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">AddAssetHtmlPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">outputPath</span><span class="token operator">:</span><span class="token string">&quot;./auto&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">filepath</span><span class="token operator">:</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">&quot;./dll/dll_react.js&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-cache-loader" tabindex="-1"><a class="header-anchor" href="#使用-cache-loader" aria-hidden="true">#</a> 使用 cache-loader</h3><p>在一些性能开销较大的 <code>loader </code>之前添加 <code>cache-loader</code>，以将结果缓存到磁盘里，显著提升二次构建速度</p><p>保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 <code>loader</code> 使用此<code> loader</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token punctuation">{</span>
				<span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.ext$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
				<span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;cache-loader&#39;</span><span class="token punctuation">,</span> <span class="token operator">...</span>loaders<span class="token punctuation">]</span><span class="token punctuation">,</span>
				<span class="token literal-property property">include</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="terser-启动多线程" tabindex="-1"><a class="header-anchor" href="#terser-启动多线程" aria-hidden="true">#</a> terser 启动多线程</h3><p>使用多进程并行运行来提高构建速度</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
				<span class="token literal-property property">parallel</span><span class="token operator">:</span> <span class="token boolean">true</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="合理使用-sourcemap" tabindex="-1"><a class="header-anchor" href="#合理使用-sourcemap" aria-hidden="true">#</a> 合理使用 sourceMap</h3><p>打包生成 <code>sourceMap</code> 的时候，如果信息越详细，打包速度就会越慢。对应属性取值如下所示：</p><figure><img src="`+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h3><p>可以看到，优化<code>webpack</code>构建的方式有很多，主要可以从优化搜索时间、缩小文件搜索范围、减少不必要的编译等方面入手</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><ul><li>https://github.com/ly2011/blog/issues/44</li><li>https://xie.infoq.cn/article/541418eb82a674741a0ad8865</li><li>https://zhuanlan.zhihu.com/p/139498741</li><li>https://vue3js.cn/interview</li></ul>',50),l=[o];function c(i,r){return s(),a("div",null,l)}const u=n(p,[["render",c],["__file","improve_build.html.vue"]]);export{u as default};
