import{_ as n,o as s,c as a,a as t}from"./app-y5y1bORC.js";const p="/assets/interview-js-31-noAOhPGb.png",e={},o=t('<h1 id="大文件上传如何做断点续传" tabindex="-1"><a class="header-anchor" href="#大文件上传如何做断点续传" aria-hidden="true">#</a> 大文件上传如何做断点续传？</h1><p>上传大文件时，以下几个变量会影响我们的用户体验：</p><ul><li>服务器处理数据的能力</li><li>请求超时</li><li>网络波动</li></ul><p>上传时间会变长，高频次文件上传失败，失败后又需要重新上传等等。</p><p>为了解决上述问题，我们需要对大文件上传单独处理，这就涉及到分片上传及断点续传两个概念。</p><h2 id="一、基本概念" tabindex="-1"><a class="header-anchor" href="#一、基本概念" aria-hidden="true">#</a> 一、基本概念</h2><h3 id="分片上传" tabindex="-1"><a class="header-anchor" href="#分片上传" aria-hidden="true">#</a> 分片上传</h3><p>分片上传是指：将大文件拆分成多个小片段（如每片 10MB），逐个上传，这样能避免大文件一次性上传时可能遇到的超时问题，并可并行上传多个部分，上传完之后再由服务端对所有上传的文件进行汇总整合成原始的文件。</p><p>大致流程如下：</p><ol><li>将需要上传的文件按照一定的分割规则，分割成相同大小的数据块；</li><li>初始化一个分片上传任务，返回本次分片上传唯一标识；</li><li>按照一定的策略（串行或并行）发送各个分片数据块；</li><li>发送完成后，服务端根据判断数据上传是否完整，如果完整，则进行数据块合成得到原始文件</li></ol><h3 id="断点续传" tabindex="-1"><a class="header-anchor" href="#断点续传" aria-hidden="true">#</a> 断点续传</h3><p>断点续传是指：在下载或上传时，将下载或上传任务人为的划分为几个部分，每一个部分采用一个线程进行上传或下载，如果碰到网络故障，可以从已经上传或下载的部分开始继续上传下载未完成的部分，而没有必要从头开始上传下载。可以节省用户时间，提高速度。</p><p>一般实现方式有两种：</p><ul><li>服务器端返回，告知从哪开始</li><li>浏览器端自行处理</li></ul><p>上传过程中将文件在服务器写为临时文件，等全部写完了（文件上传完），将此临时文件重命名为正式文件即可。</p><p>如果中途上传中断过，下次上传的时候根据当前临时文件大小，作为在客户端读取文件的偏移量，从此位置继续读取文件数据块，上传到服务器从此偏移量继续写入文件即可。</p><h2 id="二、实现思路" tabindex="-1"><a class="header-anchor" href="#二、实现思路" aria-hidden="true">#</a> 二、实现思路</h2><p>整体思路比较简单，拿到文件，保存文件唯一性标识，切割文件，分段上传，每次上传一段，根据唯一性标识判断文件上传进度，直到文件的全部片段上传完毕（下面的内容都是伪代码）。</p><figure><img src="'+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>读取文件内容：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
input<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;change&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> file <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用<code>md5</code>实现文件的唯一性：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> md5code <span class="token operator">=</span> <span class="token function">md5</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后开始对文件进行分割：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
reader<span class="token punctuation">.</span><span class="token function">readAsArrayBuffer</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
reader<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//每10M切割一段,这里只做一个切割演示，实际切割需要循环切割，</span>
	<span class="token keyword">var</span> slice <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分片上传：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> formdata <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
formdata<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span> slice<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//这里是有一个坑的，部分设备无法获取文件名称，和文件类型，这个在最后给出解决方案</span>
formdata<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;filename&#39;</span><span class="token punctuation">,</span> file<span class="token punctuation">.</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//xhr.responseText</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;POST&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>formdata<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;progress&#39;</span><span class="token punctuation">,</span> updateProgress<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span>upload<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;progress&#39;</span><span class="token punctuation">,</span> updateProgress<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">updateProgress</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>lengthComputable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//进度条</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后端根据上传的文件 <code>md5</code> 值判断是否已经存在部分上传的文件，如果有，则返回已上传的片段信息，告知客户端从哪开始上传。</p><p>每上传一个片段，后端将该片段写入临时文件，直到所有片段上传完毕，才合并为完整文件。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 假设后端检查并返回未上传部分的文件片段</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>uploadedParts <span class="token operator">&lt;</span> totalParts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">continueFrom</span><span class="token operator">:</span> uploadedParts <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
	<span class="token comment">// 合并文件片段</span>
	<span class="token function">mergeFiles</span><span class="token punctuation">(</span>md5<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要暂停切片的上传，可以使用<code>XMLHttpRequest </code>的 <code>abort </code>方法。</p><h3 id="三、关键技术点" tabindex="-1"><a class="header-anchor" href="#三、关键技术点" aria-hidden="true">#</a> 三、关键技术点</h3><ul><li><strong>分片切割策略</strong>：切片的大小一般取决于服务器的处理能力和网络带宽。常见的大小为 5MB、10MB 等，但也可以动态决定。</li><li><strong>进度追踪</strong>：可以通过监听 <code>XMLHttpRequest</code> 或 <code>fetch</code> 的 <code>progress</code> 事件来更新上传进度。</li><li><strong>网络恢复</strong>：通过记录上传进度或已上传的片段信息，断点续传技术可以在网络恢复后继续上传。</li><li><strong>并行上传</strong>：可以通过同时上传多个片段（并行上传）来加速上传过程，减少整体上传时间。</li></ul><h3 id="四、常见问题与优化" tabindex="-1"><a class="header-anchor" href="#四、常见问题与优化" aria-hidden="true">#</a> 四、常见问题与优化</h3><ul><li><strong>上传失败重试机制</strong>：对于上传失败的片段可以设置重试机制，确保所有片段成功上传。</li><li><strong>页面刷新恢复</strong>：通过使用 <code>localStorage</code> 或 <code>sessionStorage</code> 保存上传进度，刷新页面后可以继续上传。</li><li><strong>多线程处理</strong>：通过 <code>Web Workers</code> 可以实现多线程处理大文件上传，避免阻塞主线程，提升上传效率。</li></ul><h3 id="五、使用场景" tabindex="-1"><a class="header-anchor" href="#五、使用场景" aria-hidden="true">#</a> 五、使用场景</h3><ul><li><strong>大文件上传</strong>：如视频、音频、高清图像等。</li><li><strong>不稳定的网络环境</strong>：断点续传可以避免因网络问题导致的文件上传中断，尤其是在移动端应用中。</li><li><strong>视频监控上传</strong>：实时视频上传中，通常使用流式上传和断点续传技术，以便持续传输监控数据。</li></ul>`,37),c=[o];function i(l,u){return s(),a("div",null,c)}const d=n(e,[["render",i],["__file","continue_to_upload.html.vue"]]);export{d as default};
