import{_ as t}from"./system-5-pfiyBQ1F.js";import{_ as e,a as i,b as a,c as r,d as n,e as l,f as s,g as d}from"./system-12-zQgy50kR.js";import{_ as o,o as g,c,a as p}from"./app-y5y1bORC.js";const h="/assets/system-6-V_rr8-3p.png",f={},y=p('<h1 id="_14-一致性哈希" tabindex="-1"><a class="header-anchor" href="#_14-一致性哈希" aria-hidden="true">#</a> 14. 一致性哈希</h1><p><strong>一致性哈希(Consistent Hashing)</strong> 是一种分布式算法，主要用于解决节点数量变化（如扩容或缩容）时的高效负载均衡问题，同时尽量减少数据迁移。它广泛应用于分布式存储系统（如 HDFS、Amazon Dynamo）、分布式缓存（如 Redis 集群）、负载均衡系统以及其他需要动态扩展的分布式架构场景。</p><h2 id="负载均衡算法" tabindex="-1"><a class="header-anchor" href="#负载均衡算法" aria-hidden="true">#</a> 负载均衡算法</h2><p>在介绍一致性哈希之前，我们首先需要了解其背景及其所解决的问题。</p><p>在实际的分布式系统中，单台服务器的性能往往无法满足业务需求，因此通常采用多台服务器组成集群以对外提供服务。在这种架构下，如何高效地分配客户端请求至不同节点成为一个重要的问题。</p><p>这一问题本质上属于“负载均衡问题”。为解决这一问题，业界提出了多种负载均衡算法，不同算法对应不同的分配策略和业务场景。</p><p>例如，最简单的方式是通过<strong>轮询</strong>策略将外界的请求依次转发至各节点。例如，若集群包含三个节点，且有三个请求到达，则每个节点分别处理一个请求，从而实现请求分配。</p><figure><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>对于硬件配置存在差异的节点，可以引入<strong>加权轮询</strong>算法，通过设置权重值，使硬件性能更高的节点承担更多请求。这种方式适用于所有节点存储数据完全相同的场景，因为无论访问哪个节点，都能获得所需数据。</p><p>然而，在分布式系统中，由于数据通常是水平切分的，各节点存储的数据各不相同，此时上述算法不再适用。为了确保请求能够被路由至正确的节点，我们需要设计一种能够映射数据到特定节点的负载均衡算法。</p><h2 id="哈希算法" tabindex="-1"><a class="header-anchor" href="#哈希算法" aria-hidden="true">#</a> 哈希算法</h2><p>哈希算法是一种常见的选择，因为同一关键字经过哈希运算后总是生成相同的值，因此能够将特定数据映射至唯一节点。例如，使用公式 <code>hash(key) % N</code>，其中 <code>N</code> 为节点数，可以确定某个 <code>key</code> 应该存储到哪个节点。</p><p>假设我们有一个包含 A、B、C 三个节点的分布式 KV 缓存系统。通过 <code>hash(key) % 3</code> 公式，可以将 key-01、key-02 和 key-03 分别映射到节点 A、B 和 C。如：</p><table><thead><tr><th style="text-align:center;"></th><th style="text-align:center;">key</th><th style="text-align:center;">hash(key) % 3</th></tr></thead><tbody><tr><td style="text-align:center;">key-01</td><td style="text-align:center;">6</td><td style="text-align:center;">0</td></tr><tr><td style="text-align:center;">key-02</td><td style="text-align:center;">7</td><td style="text-align:center;">1</td></tr><tr><td style="text-align:center;">key-03</td><td style="text-align:center;">8</td><td style="text-align:center;">2</td></tr></tbody></table><p>这种方法可以使请求均匀分布到所有服务器。然而，当有新服务器加入或现有服务器移除时，上述公式的结果会发生很大变化，导致大量请求被重新分配到不同的服务器。</p><p>例如服务器从 3 个扩容到 4 个，取模运算中的基数发生改变，从而导致数据的大规模迁移。如下图所示，key-01 从节点 A 转移到节点 C，可能造成部分查询无法返回正确结果。</p><table><thead><tr><th style="text-align:center;"></th><th style="text-align:center;">key</th><th style="text-align:center;">hash(key) % 4</th></tr></thead><tbody><tr><td style="text-align:center;">key-01</td><td style="text-align:center;">6</td><td style="text-align:center;">2</td></tr><tr><td style="text-align:center;">key-02</td><td style="text-align:center;">7</td><td style="text-align:center;">3</td></tr><tr><td style="text-align:center;">key-03</td><td style="text-align:center;">8</td><td style="text-align:center;">0</td></tr></tbody></table><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在最坏情况下，所有数据都需要重新映射至新的节点，迁移规模可达 <code>O(M)</code>，其中 <code>M</code> 是数据总量。这种高昂的迁移成本使得简单的哈希算法难以满足分布式系统对动态扩容和缩容的需求。</p><h2 id="一致性哈希的基本思想" tabindex="-1"><a class="header-anchor" href="#一致性哈希的基本思想" aria-hidden="true">#</a> 一致性哈希的基本思想</h2><p>为了解决这个问题，一致性哈希应运而生。它在 1997 年由麻省理工学院的 Karger 等人在论文 <em>&quot;Consistent Hashing and Random Trees: Distributed Caching Protocols for Relieving Hot Spots on the World Wide Web&quot;</em> 中首次提出。</p><p>一致性哈希的核心思想是：固定哈希值的范围为 <code>2^32</code>，将哈希算法的所有可能键空间可视化为一个首尾相连的环，称为<strong>哈希环</strong>（Hash Ring）。</p><figure><img src="'+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>一致性哈希算法包括以下 3 步：</p><ol><li><strong>节点映射</strong></li></ol><p>通过相同的哈希函数，我们可以基于服务器的 IP 地址或名称，将服务器映射到哈希环上：</p><figure><img src="'+i+'" alt="服务器哈希" tabindex="0" loading="lazy"><figcaption>服务器哈希</figcaption></figure><ol start="2"><li><strong>数据映射</strong></li></ol><p>类似地，客户端请求的哈希值也会映射到哈希环上的某个位置：</p><figure><img src="'+a+'" alt="请求键哈希" tabindex="0" loading="lazy"><figcaption>请求键哈希</figcaption></figure><ol start="3"><li><strong>确定服务器</strong></li></ol><p>要确定某个请求由哪个服务器处理，我们从请求的哈希值出发，沿顺时针方向找到第一个服务器的哈希值： 要确定某个数据存放在哪个服务器上，数据将按顺时针方向定位到第一个大于或等于其哈希值的节点。例如，节点 k0 按顺时针方向映射至节点 s0。</p><figure><img src="'+r+'" alt="服务器查找" tabindex="0" loading="lazy"><figcaption>服务器查找</figcaption></figure><h3 id="添加服务器" tabindex="-1"><a class="header-anchor" href="#添加服务器" aria-hidden="true">#</a> 添加服务器</h3><p>当添加新服务器时，通过该方法，只有一部分请求会重新分配到新的服务器。</p><p>如图中，当新增节点 s4 时，只有顺时针方向上第一个节点 k0 的数据需要从 s0 搬移到 s4 ，而其他节点的数据映射关系保持不变。</p><figure><img src="'+n+'" alt="添加服务器场景" tabindex="0" loading="lazy"><figcaption>添加服务器场景</figcaption></figure><h3 id="移除服务器" tabindex="-1"><a class="header-anchor" href="#移除服务器" aria-hidden="true">#</a> 移除服务器</h3><p>同样地，当移除某个服务器时，也只有一部分请求会被重新分配到其他服务器。</p><p>如图中，当移除节点 s1 时，只有节点 k1 的数据需要从 s1 搬移到 s2 ，而其他节点的数据映射关系保持不变。</p><figure><img src="'+l+'" alt="移除服务器场景" tabindex="0" loading="lazy"><figcaption>移除服务器场景</figcaption></figure><p>通过这种方式，一致性哈希算法显著降低了扩容或缩容时的数据迁移量。</p><h2 id="虚拟节点的引入" tabindex="-1"><a class="header-anchor" href="#虚拟节点的引入" aria-hidden="true">#</a> 虚拟节点的引入</h2><ul><li>问题 1：使用基本方法，哈希分区可能在服务器之间分布不均；</li><li>问题 2：由于哈希分区不均，可能导致请求负载也分布不均；</li></ul><p>例如，若节点 A、B 和 C 的位置集中在哈希环的一侧，则大量请求会集中到节点 A。</p><figure><img src="'+s+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>为了解决上述问题，我们可以在哈希环上为每台服务器映射多个虚拟节点（Virtual Nodes），从而为每台服务器分配多个分区：</p><p>具体而言，每个真实节点对应多个虚拟节点，这些虚拟节点分布在哈希环上，并将虚拟节点映射到实际节点。例如，为每个真实节点生成 3 个虚拟节点：</p><ul><li>A-01、A-02、A-03 对应节点 A；</li><li>B-01、B-02、B-03 对应节点 B；</li><li>C-01、C-02、C-03 对应节点 C。</li></ul><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>引入虚拟节点后，原本哈希环上只有 3 个节点的情况，就会变成有 9 个虚拟节点映射到哈希环上，哈希环上的节点数量多了 3 倍。这时候，如果有访问请求寻址到「A-01」这个虚拟节点，接着再通过「A-01」虚拟节点找到真实节点 A，这样请求就能访问到真实节点 A 了。</p><p>通过虚拟节点的引入，节点在哈希环上的分布更加均匀，大大提高了系统的负载均衡能力。</p><p>虚拟节点的数量越多，请求的分布越均匀。</p><p>实验表明，创建 100-200 个虚拟节点时，标准偏差可以控制在 5-10% 的范围内。</p><p>此外，虚拟节点还提升了系统的稳定性。例如，当节点 A 被移除时，对应的虚拟节点被顺时针相邻的多个节点分担，避免了单点压力骤增。</p><h2 id="一致性哈希的优势" tabindex="-1"><a class="header-anchor" href="#一致性哈希的优势" aria-hidden="true">#</a> 一致性哈希的优势</h2><ul><li>在重新平衡（Rebalancing）时，只有极少数的键需要重新分配。</li><li>数据均匀分布，易于水平扩展。</li><li>热点问题得到缓解，例如对于名人相关数据的频繁访问，由于数据的均匀分布，负载不会集中到单一服务器。</li></ul><h2 id="一致性哈希的实际应用" tabindex="-1"><a class="header-anchor" href="#一致性哈希的实际应用" aria-hidden="true">#</a> 一致性哈希的实际应用</h2><p>以下是一些一致性哈希的真实案例：</p><ul><li><strong>Amazon DynamoDB</strong> 的分区组件</li><li><strong>Cassandra</strong> 的数据分区</li><li><strong>Discord</strong> 的聊天应用程序</li><li><strong>Akamai CDN</strong></li><li><strong>Maglev</strong> 网络负载均衡器</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>一致性哈希算法通过构建哈希环，实现了存储节点和数据的映射，相比传统哈希算法，其在节点扩容或缩容时的数据迁移量大大减少。然而，原始算法可能存在节点分布不均的问题，通过引入虚拟节点，不仅解决了负载不均问题，还增强了系统的稳定性，使其成为适用于动态分布式系统的理想负载均衡算法。</p>',62),u=[y];function x(_,m){return g(),c("div",null,u)}const C=o(f,[["render",x],["__file","13_consistent_hashing.html.vue"]]);export{C as default};
