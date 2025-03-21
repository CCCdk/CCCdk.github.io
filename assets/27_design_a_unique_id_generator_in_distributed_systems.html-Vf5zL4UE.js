const e=JSON.parse('{"key":"v-5036f8d0","path":"/system-design/27_design_a_unique_id_generator_in_distributed_systems.html","title":"7. 设计分布式唯一 ID 生成器","lang":"zh-CN","frontmatter":{"description":"7. 设计分布式唯一 ID 生成器 我们需要设计一个兼容分布式系统的唯一 ID 生成器。 使用具有 auto_increment 的主键在此场景下不可行，因为在多个数据库服务器之间生成 ID 会导致高延迟。","head":[["meta",{"property":"og:url","content":"https://CCCdk.github.io/system-design/27_design_a_unique_id_generator_in_distributed_systems.html"}],["meta",{"property":"og:site_name","content":"DK 酱"}],["meta",{"property":"og:title","content":"7. 设计分布式唯一 ID 生成器"}],["meta",{"property":"og:description","content":"7. 设计分布式唯一 ID 生成器 我们需要设计一个兼容分布式系统的唯一 ID 生成器。 使用具有 auto_increment 的主键在此场景下不可行，因为在多个数据库服务器之间生成 ID 会导致高延迟。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-21T14:03:27.000Z"}],["meta",{"property":"article:author","content":"DK 酱"}],["meta",{"property":"article:modified_time","content":"2025-03-21T14:03:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"7. 设计分布式唯一 ID 生成器\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-21T14:03:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DK 酱\\",\\"url\\":\\"https://github.com/CCCdk\\"}]}"]]},"headers":[{"level":2,"title":"第一步：理解问题并明确设计范围","slug":"第一步-理解问题并明确设计范围","link":"#第一步-理解问题并明确设计范围","children":[]},{"level":2,"title":"第二步：提出高层设计并获得认可","slug":"第二步-提出高层设计并获得认可","link":"#第二步-提出高层设计并获得认可","children":[{"level":3,"title":"多主复制","slug":"多主复制","link":"#多主复制","children":[]},{"level":3,"title":"UUID","slug":"uuid","link":"#uuid","children":[]},{"level":3,"title":"Ticket Server","slug":"ticket-server","link":"#ticket-server","children":[]},{"level":3,"title":"Twitter 的 Snowflake 方法","slug":"twitter-的-snowflake-方法","link":"#twitter-的-snowflake-方法","children":[]}]},{"level":2,"title":"第三步：深入设计","slug":"第三步-深入设计","link":"#第三步-深入设计","children":[{"level":3,"title":"系统架构","slug":"系统架构","link":"#系统架构","children":[]},{"level":3,"title":"扩展性（Scalability）","slug":"扩展性-scalability","link":"#扩展性-scalability","children":[]},{"level":3,"title":"高可用性（High Availability）","slug":"高可用性-high-availability","link":"#高可用性-high-availability","children":[]},{"level":3,"title":"技术细节和扩展","slug":"技术细节和扩展","link":"#技术细节和扩展","children":[]},{"level":3,"title":"具体最佳实践","slug":"具体最佳实践","link":"#具体最佳实践","children":[]}]},{"level":2,"title":"第四步：总结","slug":"第四步-总结","link":"#第四步-总结","children":[]}],"git":{"createdTime":1742565807000,"updatedTime":1742565807000,"contributors":[{"name":"CCCdk","email":"chendongkai@cn.net.ntes","commits":1}]},"readingTime":{"minutes":7.03,"words":2110},"filePathRelative":"system-design/27_design_a_unique_id_generator_in_distributed_systems.md","localizedDate":"2025年3月21日","excerpt":"<h1> 7. 设计分布式唯一 ID 生成器</h1>\\n<p>我们需要设计一个兼容分布式系统的唯一 ID 生成器。</p>\\n<p>使用具有 <code>auto_increment</code> 的主键在此场景下不可行，因为在多个数据库服务器之间生成 ID 会导致高延迟。</p>","autoDesc":true}');export{e as data};
