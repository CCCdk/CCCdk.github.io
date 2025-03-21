const e=JSON.parse('{"key":"v-a3175d64","path":"/system-design/10_caching.html","title":"11. 缓存","lang":"zh-CN","frontmatter":{"description":"11. 缓存 缓存的基本概念 什么是缓存？ 缓存是一种临时存储机制，旨在保存经常使用的数据以便快速访问。缓存可以部署在多个层级，包括客户端（如浏览器缓存）、应用服务器（如内存缓存）和数据库附近（如 Redis、Memcached）。通过缓存，可以在快速存储和访问频繁请求的数据的同时，减轻对底层服务的压力。","head":[["meta",{"property":"og:url","content":"https://CCCdk.github.io/system-design/10_caching.html"}],["meta",{"property":"og:site_name","content":"DK 酱"}],["meta",{"property":"og:title","content":"11. 缓存"}],["meta",{"property":"og:description","content":"11. 缓存 缓存的基本概念 什么是缓存？ 缓存是一种临时存储机制，旨在保存经常使用的数据以便快速访问。缓存可以部署在多个层级，包括客户端（如浏览器缓存）、应用服务器（如内存缓存）和数据库附近（如 Redis、Memcached）。通过缓存，可以在快速存储和访问频繁请求的数据的同时，减轻对底层服务的压力。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-21T14:03:27.000Z"}],["meta",{"property":"article:author","content":"DK 酱"}],["meta",{"property":"article:modified_time","content":"2025-03-21T14:03:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"11. 缓存\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-21T14:03:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DK 酱\\",\\"url\\":\\"https://github.com/CCCdk\\"}]}"]]},"headers":[{"level":2,"title":"缓存的基本概念","slug":"缓存的基本概念","link":"#缓存的基本概念","children":[{"level":3,"title":"什么是缓存？","slug":"什么是缓存","link":"#什么是缓存","children":[]},{"level":3,"title":"为什么需要缓存？","slug":"为什么需要缓存","link":"#为什么需要缓存","children":[]},{"level":3,"title":"核心指标","slug":"核心指标","link":"#核心指标","children":[]}]},{"level":2,"title":"缓存的类型与模式","slug":"缓存的类型与模式","link":"#缓存的类型与模式","children":[{"level":3,"title":"按位置分类","slug":"按位置分类","link":"#按位置分类","children":[]},{"level":3,"title":"按存储内容分类","slug":"按存储内容分类","link":"#按存储内容分类","children":[]}]},{"level":2,"title":"缓存的策略","slug":"缓存的策略","link":"#缓存的策略","children":[{"level":3,"title":"写入策略","slug":"写入策略","link":"#写入策略","children":[]},{"level":3,"title":"淘汰策略","slug":"淘汰策略","link":"#淘汰策略","children":[]}]},{"level":2,"title":"缓存的一致性问题","slug":"缓存的一致性问题","link":"#缓存的一致性问题","children":[{"level":3,"title":"一致性模型","slug":"一致性模型","link":"#一致性模型","children":[]},{"level":3,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]}]},{"level":2,"title":"缓存的最佳实践","slug":"缓存的最佳实践","link":"#缓存的最佳实践","children":[{"level":3,"title":"适用场景","slug":"适用场景","link":"#适用场景","children":[]},{"level":3,"title":"配置优化","slug":"配置优化","link":"#配置优化","children":[]},{"level":3,"title":"监控与调整","slug":"监控与调整","link":"#监控与调整","children":[]}]},{"level":2,"title":"缓存的典型应用","slug":"缓存的典型应用","link":"#缓存的典型应用","children":[]}],"git":{"createdTime":1742565807000,"updatedTime":1742565807000,"contributors":[{"name":"CCCdk","email":"chendongkai@cn.net.ntes","commits":1}]},"readingTime":{"minutes":3.76,"words":1128},"filePathRelative":"system-design/10_caching.md","localizedDate":"2025年3月21日","excerpt":"<h1> 11. 缓存</h1>\\n<h2> 缓存的基本概念</h2>\\n<h3> 什么是缓存？</h3>\\n<p>缓存是一种临时存储机制，旨在保存经常使用的数据以便快速访问。缓存可以部署在多个层级，包括客户端（如浏览器缓存）、应用服务器（如内存缓存）和数据库附近（如 Redis、Memcached）。通过缓存，可以在快速存储和访问频繁请求的数据的同时，减轻对底层服务的压力。</p>","autoDesc":true}');export{e as data};
