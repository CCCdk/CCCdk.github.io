const e=JSON.parse('{"key":"v-38232381","path":"/system-design/13_consistent_hashing.html","title":"14. 一致性哈希","lang":"zh-CN","frontmatter":{"description":"14. 一致性哈希 一致性哈希(Consistent Hashing) 是一种分布式算法，主要用于解决节点数量变化（如扩容或缩容）时的高效负载均衡问题，同时尽量减少数据迁移。它广泛应用于分布式存储系统（如 HDFS、Amazon Dynamo）、分布式缓存（如 Redis 集群）、负载均衡系统以及其他需要动态扩展的分布式架构场景。","head":[["meta",{"property":"og:url","content":"https://CCCdk.github.io/system-design/13_consistent_hashing.html"}],["meta",{"property":"og:site_name","content":"DK 酱"}],["meta",{"property":"og:title","content":"14. 一致性哈希"}],["meta",{"property":"og:description","content":"14. 一致性哈希 一致性哈希(Consistent Hashing) 是一种分布式算法，主要用于解决节点数量变化（如扩容或缩容）时的高效负载均衡问题，同时尽量减少数据迁移。它广泛应用于分布式存储系统（如 HDFS、Amazon Dynamo）、分布式缓存（如 Redis 集群）、负载均衡系统以及其他需要动态扩展的分布式架构场景。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-21T14:03:27.000Z"}],["meta",{"property":"article:author","content":"DK 酱"}],["meta",{"property":"article:modified_time","content":"2025-03-21T14:03:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"14. 一致性哈希\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-21T14:03:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DK 酱\\",\\"url\\":\\"https://github.com/CCCdk\\"}]}"]]},"headers":[{"level":2,"title":"负载均衡算法","slug":"负载均衡算法","link":"#负载均衡算法","children":[]},{"level":2,"title":"哈希算法","slug":"哈希算法","link":"#哈希算法","children":[]},{"level":2,"title":"一致性哈希的基本思想","slug":"一致性哈希的基本思想","link":"#一致性哈希的基本思想","children":[{"level":3,"title":"添加服务器","slug":"添加服务器","link":"#添加服务器","children":[]},{"level":3,"title":"移除服务器","slug":"移除服务器","link":"#移除服务器","children":[]}]},{"level":2,"title":"虚拟节点的引入","slug":"虚拟节点的引入","link":"#虚拟节点的引入","children":[]},{"level":2,"title":"一致性哈希的优势","slug":"一致性哈希的优势","link":"#一致性哈希的优势","children":[]},{"level":2,"title":"一致性哈希的实际应用","slug":"一致性哈希的实际应用","link":"#一致性哈希的实际应用","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1742565807000,"updatedTime":1742565807000,"contributors":[{"name":"CCCdk","email":"chendongkai@cn.net.ntes","commits":1}]},"readingTime":{"minutes":7.4,"words":2219},"filePathRelative":"system-design/13_consistent_hashing.md","localizedDate":"2025年3月21日","excerpt":"<h1> 14. 一致性哈希</h1>\\n<p><strong>一致性哈希(Consistent Hashing)</strong> 是一种分布式算法，主要用于解决节点数量变化（如扩容或缩容）时的高效负载均衡问题，同时尽量减少数据迁移。它广泛应用于分布式存储系统（如 HDFS、Amazon Dynamo）、分布式缓存（如 Redis 集群）、负载均衡系统以及其他需要动态扩展的分布式架构场景。</p>","autoDesc":true}');export{e as data};
