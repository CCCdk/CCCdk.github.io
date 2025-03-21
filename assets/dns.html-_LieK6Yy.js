import{_ as i,o as e,c as a,a as t}from"./app-y5y1bORC.js";const n="/assets/interview-http-31-hnR7lP4_.png",l="/assets/interview-http-32-_6rY1xEt.png",d="/assets/interview-http-33-B1hH2Tn6.png",r="/assets/interview-http-34-ZdnCNGDE.png",c="/assets/interview-http-35-D5eRuOVd.png",o="/assets/interview-http-36-KJFEr_TT.png",s={},p=t('<h1 id="dns-协议-是什么-说说-dns-完整的查询过程" tabindex="-1"><a class="header-anchor" href="#dns-协议-是什么-说说-dns-完整的查询过程" aria-hidden="true">#</a> DNS 协议 是什么？说说 DNS 完整的查询过程?</h1><h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2><p>DNS（Domain Names System），域名系统，是互联网一项服务，是进行域名和与之相对应的 IP 地址进行转换的服务器</p><p>简单来讲，<code>DNS</code>相当于一个翻译官，负责将域名翻译成<code>ip</code>地址</p><ul><li>IP 地址：一长串能够唯一地标记网络上的计算机的数字</li><li>域名：是由一串用点分隔的名字组成的 Internet 上某一台计算机或计算机组的名称，用于在数据传输时对计算机的定位标识</li></ul><figure><img src="'+n+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="二、域名" tabindex="-1"><a class="header-anchor" href="#二、域名" aria-hidden="true">#</a> 二、域名</h2><p>域名是一个具有层次的结构，从上到下一次为根域名、顶级域名、二级域名、三级域名...</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>例如<code>www.xxx.com</code>，<code>www</code>为三级域名、<code>xxx</code>为二级域名、<code>com</code>为顶级域名，系统为用户做了兼容，域名末尾的根域名<code>.</code>一般不需要输入</p><p>在域名的每一层都会有一个域名服务器，如下图：</p><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>除此之外，还有电脑默认的本地域名服务器</p><h2 id="三、查询方式" tabindex="-1"><a class="header-anchor" href="#三、查询方式" aria-hidden="true">#</a> 三、查询方式</h2><p>DNS 查询的方式有两种：</p><ul><li>递归查询：如果 A 请求 B，那么 B 作为请求的接收者一定要给 A 想要的答案</li></ul><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>迭代查询：如果接收者 B 没有请求者 A 所需要的准确内容，接收者 B 将告诉请求者 A，如何去获得这个内容，但是自己并不去发出请求</li></ul><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="四、域名缓存" tabindex="-1"><a class="header-anchor" href="#四、域名缓存" aria-hidden="true">#</a> 四、域名缓存</h2><p>在域名服务器解析的时候，使用缓存保存域名和<code>IP</code>地址的映射</p><p>计算机中<code>DNS</code>的记录也分成了两种缓存方式：</p><ul><li>浏览器缓存：浏览器在获取网站域名的实际 IP 地址后会对其进行缓存，减少网络请求的损耗</li><li>操作系统缓存：操作系统的缓存其实是用户自己配置的 <code>hosts</code> 文件</li></ul><h2 id="五、查询过程" tabindex="-1"><a class="header-anchor" href="#五、查询过程" aria-hidden="true">#</a> 五、查询过程</h2><p>解析域名的过程如下：</p><ul><li><p>首先搜索浏览器的 DNS 缓存，缓存中维护一张域名与 IP 地址的对应表</p></li><li><p>若没有命中，则继续搜索操作系统的 DNS 缓存</p></li><li><p>若仍然没有命中，则操作系统将域名发送至本地域名服务器，本地域名服务器采用递归查询自己的 DNS 缓存，查找成功则返回结果</p></li><li><p>若本地域名服务器的 DNS 缓存没有命中，则本地域名服务器向上级域名服务器进行迭代查询</p><ul><li>首先本地域名服务器向根域名服务器发起请求，根域名服务器返回顶级域名服务器的地址给本地服务器</li><li>本地域名服务器拿到这个顶级域名服务器的地址后，就向其发起请求，获取权限域名服务器的地址</li><li>本地域名服务器根据权限域名服务器的地址向其发起请求，最终得到该域名对应的 IP 地址</li></ul></li><li><p>本地域名服务器将得到的 IP 地址返回给操作系统，同时自己将 IP 地址缓存起来</p></li><li><p>操作系统将 IP 地址返回给浏览器，同时自己也将 IP 地址缓存起</p></li><li><p>至此，浏览器就得到了域名对应的 IP 地址，并将 IP 地址缓存起</p></li></ul><p>流程如下图所示：</p><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><ul><li>https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F</li><li>https://www.cnblogs.com/jmilkfan-fanguiju/p/12789677.html</li><li>https://segmentfault.com/a/1190000039039275</li><li>https://vue3js.cn/interview</li></ul>',30),h=[p];function g(u,f){return e(),a("div",null,h)}const m=i(s,[["render",g],["__file","dns.html.vue"]]);export{m as default};
