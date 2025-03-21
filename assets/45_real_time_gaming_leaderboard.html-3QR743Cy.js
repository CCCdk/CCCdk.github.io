import{_ as e,o as i,c as a,a as s}from"./app-y5y1bORC.js";const n="/assets/system-design-367-P-sRbWKS.png",d="/assets/system-design-368-q07s7iT-.png",r="/assets/system-design-369-CnKOkNRg.png",t="/assets/system-design-370-XVp86eUv.png",l="/assets/system-design-371-KbqgppQ9.png",o="/assets/system-design-372-cySvwj2r.png",c="/assets/system-design-373-2LtE2ciZ.png",p="/assets/system-design-374-SZbxU-4U.png",g="/assets/system-design-375-PmKYzRKq.png",u="/assets/system-design-376-XLUdTAUD.png",m="/assets/system-design-377-HzO4B0y_.png",b="/assets/system-design-378-5kpHQg6V.png",h="/assets/system-design-379-T12Q1i0v.png",v="/assets/system-design-380-MV_ap5g0.png",f="/assets/system-design-381-UwyVuV9h.png",x="/assets/system-design-382-DaB6493L.png",_="/assets/system-design-383-DBl0vW41.png",y="/assets/system-design-384-7rorKuqz.png",R="/assets/system-design-385-EcwILvkL.png",q="/assets/system-design-386-satC3HTT.png",S="/assets/system-design-387-juI5espH.png",E="/assets/system-design-389-89RAW2VS.png",A={},L=s('<h1 id="_25-设计实时游戏排行榜" tabindex="-1"><a class="header-anchor" href="#_25-设计实时游戏排行榜" aria-hidden="true">#</a> 25. 设计实时游戏排行榜</h1><p>我们将为一款在线手机游戏设计一个排行榜：</p><figure><img src="'+n+`" alt="leaderboard" tabindex="0" loading="lazy"><figcaption>leaderboard</figcaption></figure><h2 id="第一步-理解问题并确定设计范围" tabindex="-1"><a class="header-anchor" href="#第一步-理解问题并确定设计范围" aria-hidden="true">#</a> 第一步：理解问题并确定设计范围</h2><ul><li><strong>候选人</strong>: 排行榜的得分是如何计算的？</li><li><strong>面试官</strong>: 用户每赢得一场比赛就获得 1 分。</li><li><strong>候选人</strong>: 排行榜中是否包括所有玩家？</li><li><strong>面试官</strong>: 是的。</li><li><strong>候选人</strong>: 排行榜是否与时间段相关？</li><li><strong>面试官</strong>: 每个月都会启动一个新的锦标赛，从而启动一个新的排行榜。</li><li><strong>候选人</strong>: 我们可以假设只关心排名前 10 的用户吗？</li><li><strong>面试官</strong>: 我们希望展示前 10 名用户，并显示特定用户的位置。如果时间允许，我们可以讨论如何展示特定用户周围的其他用户。</li><li><strong>候选人</strong>: 每个锦标赛有多少玩家？</li><li><strong>面试官</strong>: 500 万日活跃用户（DAU）和 2500 万月活跃用户（MAU）。</li><li><strong>候选人</strong>: 每个锦标赛期间平均有多少场比赛？</li><li><strong>面试官</strong>: 每个玩家每天平均玩 10 场比赛。</li><li><strong>候选人</strong>: 如果两名玩家得分相同，如何确定排名？</li><li><strong>面试官</strong>: 在这种情况下，他们的排名是相同的。如果时间允许，我们可以讨论如何打破平局。</li><li><strong>候选人</strong>: 排行榜需要实时更新吗？</li><li><strong>面试官</strong>: 是的，我们希望呈现实时结果，或者尽可能接近实时。展示批量结果历史是不允许的。</li></ul><h3 id="功能需求" tabindex="-1"><a class="header-anchor" href="#功能需求" aria-hidden="true">#</a> 功能需求</h3><ul><li>显示排行榜前 10 名玩家</li><li>显示用户的具体排名</li><li>显示给定用户上下四名的玩家（附加功能）</li></ul><h3 id="非功能需求" tabindex="-1"><a class="header-anchor" href="#非功能需求" aria-hidden="true">#</a> 非功能需求</h3><ul><li>实时更新得分</li><li>得分更新实时反映在排行榜上</li><li>一般的可扩展性、可用性和可靠性</li></ul><h3 id="粗略估算" tabindex="-1"><a class="header-anchor" href="#粗略估算" aria-hidden="true">#</a> 粗略估算</h3><p>假设游戏的日活跃用户数为 5000 万，如果玩家在 24 小时内的分布均匀，那么每秒约有 50 个用户在线。 然而，由于分布通常不均匀，我们可以估算峰值在线用户为每秒 250 个用户。</p><p>每秒查询量（QPS）对于用户得分的请求：假设每个玩家每天玩 10 场比赛，那么每秒得分请求数为 50 用户/s * 10 = 500 QPS。峰值 QPS = 2500。</p><p>每秒查询量（QPS）用于获取前 10 名排行榜：假设用户平均每天查看一次排行榜，则 QPS 为 50。</p><h2 id="第二步-提出高层设计并获得认可" tabindex="-1"><a class="header-anchor" href="#第二步-提出高层设计并获得认可" aria-hidden="true">#</a> 第二步：提出高层设计并获得认可</h2><h3 id="api-设计" tabindex="-1"><a class="header-anchor" href="#api-设计" aria-hidden="true">#</a> API 设计</h3><p>我们需要的第一个 API 是更新用户得分的接口：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /v1/scores
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该 API 接受两个参数：<code>user_id</code> 和用户通过赢得比赛获得的 <code>points</code>。</p><p>此 API 仅对游戏服务器可访问，而非最终用户客户端。</p><p>接下来的 API 用于获取排行榜前 10 名玩家：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /v1/scores
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例响应：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;data&quot;: [
    {
      &quot;user_id&quot;: &quot;user_id1&quot;,
      &quot;user_name&quot;: &quot;alice&quot;,
      &quot;rank&quot;: 1,
      &quot;score&quot;: 12543
    },
    {
      &quot;user_id&quot;: &quot;user_id2&quot;,
      &quot;user_name&quot;: &quot;bob&quot;,
      &quot;rank&quot;: 2,
      &quot;score&quot;: 11500
    }
  ],
  ...
  &quot;total&quot;: 10
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你也可以获取特定用户的得分：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /v1/scores/{:user_id}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例响应：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;user_info&quot;: {
        &quot;user_id&quot;: &quot;user5&quot;,
        &quot;score&quot;: 1000,
        &quot;rank&quot;: 6,
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="高层架构" tabindex="-1"><a class="header-anchor" href="#高层架构" aria-hidden="true">#</a> 高层架构</h3><figure><img src="`+d+'" alt="high-level-architecture" tabindex="0" loading="lazy"><figcaption>high-level-architecture</figcaption></figure><ul><li>当玩家赢得比赛时，客户端向游戏服务发送请求</li><li>游戏服务验证胜利是否有效，并调用排行榜服务更新玩家的得分</li><li>排行榜服务更新用户在排行榜存储中的得分</li><li>玩家调用排行榜服务获取排行榜数据，例如前 10 名玩家和特定玩家的排名</li></ul><p>考虑的另一种设计是客户端直接在排行榜服务中更新他们的得分：</p><figure><img src="'+r+'" alt="alternative-design" tabindex="0" loading="lazy"><figcaption>alternative-design</figcaption></figure><p>这种方式不安全，因为它容易受到中间人攻击。玩家可以通过设置代理来修改他们的得分。</p><p>另一个需要注意的点是，在服务器管理游戏逻辑的游戏中，客户端不需要显式调用服务器来记录他们的胜利。 服务器会基于游戏逻辑自动为他们处理这一过程。</p><p>另一个需要考虑的问题是，是否应在游戏服务器和排行榜服务之间添加消息队列。如果其他服务也对游戏结果感兴趣，消息队列会很有用，但在面试中并没有明确要求，因此不在设计中包含此部分：</p><figure><img src="'+t+'" alt="message-queue-based-comm" tabindex="0" loading="lazy"><figcaption>message-queue-based-comm</figcaption></figure><h3 id="数据模型" tabindex="-1"><a class="header-anchor" href="#数据模型" aria-hidden="true">#</a> 数据模型</h3><p>我们来讨论一下存储排行榜数据的选项——关系型数据库、Redis 和 NoSQL。</p><p>NoSQL 解决方案将在深入探讨部分讨论。</p><h3 id="关系型数据库解决方案" tabindex="-1"><a class="header-anchor" href="#关系型数据库解决方案" aria-hidden="true">#</a> 关系型数据库解决方案</h3><p>如果规模不大，且用户不多，关系型数据库可以很好地满足需求。</p><p>我们可以从一个简单的排行榜表开始，为每个月创建一个表（个人备注：这种做法不太合理。你可以只添加一个 <code>month</code> 列，避免每个月都需要维护新表的麻烦）：</p><figure><img src="'+l+'" alt="leaderboard-table" tabindex="0" loading="lazy"><figcaption>leaderboard-table</figcaption></figure><p>这里有一些额外的数据可以包含，但与我们要执行的查询无关，因此省略了。</p><p>当用户赢得 1 分时会发生什么？</p><figure><img src="'+o+`" alt="user-wins-point" tabindex="0" loading="lazy"><figcaption>user-wins-point</figcaption></figure><p>如果用户尚未在表中存在，我们需要先插入他们：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>INSERT INTO leaderboard (user_id, score) VALUES (&#39;mary1934&#39;, 1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在后续调用中，我们只需更新他们的得分：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>UPDATE leaderboard set score=score + 1 where user_id=&#39;mary1934&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如何查找排行榜中的前几名玩家？</p><figure><img src="`+c+`" alt="find-leaderboard-position" tabindex="0" loading="lazy"><figcaption>find-leaderboard-position</figcaption></figure><p>我们可以运行以下查询：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT (@rownum := @rownum + 1) AS rank, user_id, score
FROM leaderboard
ORDER BY score DESC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，这种做法性能较差，因为它会进行全表扫描以按得分排序所有记录。</p><p>我们可以通过在 <code>score</code> 上添加索引，并使用 <code>LIMIT</code> 操作来避免扫描所有记录，从而进行优化：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT (@rownum := @rownum + 1) AS rank, user_id, score
FROM leaderboard
ORDER BY score DESC
LIMIT 10;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果用户不在排行榜的顶部，你想要找到他们的排名时，这种方法就不太适用了，扩展性较差。</p><h3 id="redis-解决方案" tabindex="-1"><a class="header-anchor" href="#redis-解决方案" aria-hidden="true">#</a> Redis 解决方案</h3><p>我们希望找到一种解决方案，即使在数百万玩家的情况下也能良好运行，而不必依赖复杂的数据库查询。</p><p>Redis 是一个内存数据存储，它的速度非常快，因为它在内存中工作，并且具有适合我们需求的数据结构——有序集合（Sorted Set）。</p><p>有序集合是一种类似于编程语言中的集合的数据结构，允许你根据给定的标准保持数据结构的排序。 内部，它使用哈希表来维护键（user_id）和值（score）之间的映射，并使用跳表（skip list）将分数映射到按顺序排列的用户：</p><figure><img src="`+p+'" alt="sorted-set" tabindex="0" loading="lazy"><figcaption>sorted-set</figcaption></figure><p>跳表是如何工作的？</p><ul><li>它是一个链表，允许快速查找</li><li>它由一个排序的链表和多级索引组成</li></ul><figure><img src="'+g+'" alt="skip-list" tabindex="0" loading="lazy"><figcaption>skip-list</figcaption></figure><p>这种结构使我们能够在数据集足够大时快速搜索特定值。在下面的示例中（64 个节点），它需要遍历基本链表中的 62 个节点才能找到给定的值，而在跳表的情况下，只需要遍历 11 个节点：</p><figure><img src="'+u+`" alt="skip-list-performance" tabindex="0" loading="lazy"><figcaption>skip-list-performance</figcaption></figure><p>有序集合比关系型数据库更高效，因为数据始终保持排序，代价是 O(logN)的添加和查找操作。</p><p>相比之下，以下是我们需要执行的嵌套查询，来查找给定用户在关系型数据库中的排名：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT *,(SELECT COUNT(*) FROM leaderboard lb2
WHERE lb2.score &gt;= lb1.score) RANK
FROM leaderboard lb1
WHERE lb1.user_id = {:user_id};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在-redis-中操作我们的排行榜需要哪些操作" tabindex="-1"><a class="header-anchor" href="#在-redis-中操作我们的排行榜需要哪些操作" aria-hidden="true">#</a> 在 Redis 中操作我们的排行榜需要哪些操作？</h3><ul><li><code>ZADD</code> - 如果用户不存在，则将其插入集合。否则，更新分数。时间复杂度为 O(logN)。</li><li><code>ZINCRBY</code> - 按给定的增量增加用户的分数。如果用户不存在，分数从零开始。时间复杂度为 O(logN)。</li><li><code>ZRANGE/ZREVRANGE</code> - 获取一范围内按分数排序的用户。可以指定排序顺序（ASC/DESC）、偏移量和结果大小。时间复杂度为 O(logN+M)，其中 M 是结果大小。</li><li><code>ZRANK/ZREVRANK</code> - 获取给定用户的排名（按升序/降序）。时间复杂度为 O(logN)。</li></ul><h3 id="用户得分时会发生什么" tabindex="-1"><a class="header-anchor" href="#用户得分时会发生什么" aria-hidden="true">#</a> 用户得分时会发生什么？</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ZINCRBY leaderboard_feb_2021 1 &#39;mary1934&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每个月都会创建一个新的排行榜，而旧的排行榜会被移到历史存储中。</p><h3 id="用户查看前-10-名玩家时会发生什么" tabindex="-1"><a class="header-anchor" href="#用户查看前-10-名玩家时会发生什么" aria-hidden="true">#</a> 用户查看前 10 名玩家时会发生什么？</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ZREVRANGE leaderboard_feb_2021 0 9 WITHSCORES
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[(user2,score2),(user1,score1),(user5,score5)...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="用户查看自己在排行榜中的位置时呢" tabindex="-1"><a class="header-anchor" href="#用户查看自己在排行榜中的位置时呢" aria-hidden="true">#</a> 用户查看自己在排行榜中的位置时呢？</h3><figure><img src="`+m+`" alt="leaderboard-position-of-user" tabindex="0" loading="lazy"><figcaption>leaderboard-position-of-user</figcaption></figure><p>可以通过以下查询轻松实现，假设我们知道用户的排行榜位置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ZREVRANGE leaderboard_feb_2021 357 365
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用户的位置可以使用 <code>ZREVRANK &lt;user-id&gt;</code> 获取。</p><h3 id="存储需求" tabindex="-1"><a class="header-anchor" href="#存储需求" aria-hidden="true">#</a> 存储需求</h3><p>让我们探讨一下存储需求：</p><ul><li>假设最坏情况是所有 2500 万 MAU 在给定月份都参与了游戏</li><li>用户 ID 是 24 个字符的字符串，分数是 16 位整数，我们需要 26 字节 * 2500 万 = ~650MB 的存储空间</li><li>即使由于跳表的开销我们将存储成本加倍，这仍然可以轻松适应现代 Redis 集群</li></ul><p>另一个非功能性需求是支持每秒 2500 次更新。这完全在单个 Redis 服务器的能力范围内。</p><h3 id="其他注意事项" tabindex="-1"><a class="header-anchor" href="#其他注意事项" aria-hidden="true">#</a> 其他注意事项：</h3><ul><li>我们可以启动 Redis 副本，以防 Redis 服务器崩溃时丢失数据</li><li>我们仍然可以利用 Redis 的持久化机制，在发生崩溃时不丢失数据</li><li>我们需要在 MySQL 中使用两个支持表，以获取用户详细信息（如用户名、显示名称等）以及记录何时某个用户赢得了比赛</li><li>MySQL 中的第二个表可以用于在发生基础设施故障时重建排行榜</li><li>作为小的性能优化，我们可以缓存前 10 名玩家的用户详细信息，因为这些信息将被频繁访问</li></ul><h2 id="第三步-设计深入探讨" tabindex="-1"><a class="header-anchor" href="#第三步-设计深入探讨" aria-hidden="true">#</a> 第三步：设计深入探讨</h2><h3 id="使用云服务提供商与否" tabindex="-1"><a class="header-anchor" href="#使用云服务提供商与否" aria-hidden="true">#</a> 使用云服务提供商与否</h3><p>我们可以选择自己部署和管理服务，或者使用云服务提供商来管理这些服务。</p><p>如果我们选择自己管理服务，我们将使用 Redis 存储排行榜数据，使用 MySQL 存储用户资料，并且如果希望扩展数据库，可能还需要为用户资料设置缓存：</p><figure><img src="`+b+'" alt="manage-services-ourselves" tabindex="0" loading="lazy"><figcaption>manage-services-ourselves</figcaption></figure><p>另外，我们可以使用云服务来管理许多服务。例如，我们可以使用 AWS API Gateway 将 API 请求路由到 AWS Lambda 函数：</p><figure><img src="'+h+'" alt="api-gateway-mapping" tabindex="0" loading="lazy"><figcaption>api-gateway-mapping</figcaption></figure><p>AWS Lambda 使我们能够在不管理或配置服务器的情况下运行代码。它只在需要时运行，并且可以自动扩展。</p><p>用户得分示例：</p><figure><img src="'+v+'" alt="user-scoring-point-lambda" tabindex="0" loading="lazy"><figcaption>user-scoring-point-lambda</figcaption></figure><p>用户检索排行榜示例：</p><figure><img src="'+f+'" alt="user-retrieve-leaderboard" tabindex="0" loading="lazy"><figcaption>user-retrieve-leaderboard</figcaption></figure><p>Lambda 是一种无服务器架构的实现。我们不需要管理扩展和环境设置。</p><p>作者建议，如果我们从零开始构建游戏，最好采用这种方法。</p><h3 id="扩展-redis" tabindex="-1"><a class="header-anchor" href="#扩展-redis" aria-hidden="true">#</a> 扩展 Redis</h3><p>对于 500 万 DAU 用户，我们从存储和 QPS 角度来看，单个 Redis 实例足以应对。</p><p>但是，如果我们假设用户基数增长 10 倍，达到 5 亿 DAU，那么我们将需要 65GB 的存储空间，QPS 则会增长到 25 万。</p><p>这种规模需要分片。</p><p>一种实现方法是按范围分区数据：</p><figure><img src="'+x+'" alt="range-partition" tabindex="0" loading="lazy"><figcaption>range-partition</figcaption></figure><p>在这个示例中，我们将根据用户的分数进行分片。我们将在应用程序代码中维护用户 ID 和分片之间的映射。 我们可以通过 MySQL 或其他缓存来管理映射。</p><p>为了获取前 10 名玩家，我们可以查询分数最高的分片（<code>[900-1000]</code>）。</p><p>为了获取用户的排名，我们需要计算该用户所在分片内的排名，并加上其他分片中所有分数更高的用户数量。 后者是 O(1) 操作，因为每个分片的总记录可以通过 info keyspace 命令快速访问。</p><p>另外，我们可以使用 Redis 集群进行哈希分区。它是一个代理，将数据根据类似一致性哈希的方式分布到 Redis 节点上，但并不完全相同：</p><figure><img src="'+_+'" alt="hash-partition" tabindex="0" loading="lazy"><figcaption>hash-partition</figcaption></figure><p>这种设置下，计算前 10 名玩家会比较复杂。我们需要获取每个分片的前 10 名玩家，并在应用程序中合并结果：</p><figure><img src="'+y+'" alt="top-10-players-calculation" tabindex="0" loading="lazy"><figcaption>top-10-players-calculation</figcaption></figure><p>哈希分区有一些限制：</p><ul><li>如果我们需要获取前 K 个用户，且 K 很大，延迟可能会增加，因为我们需要从所有分片获取大量数据</li><li>随着分区数量的增加，延迟也会增加</li><li>确定用户排名没有直接的办法</li></ul><p>由于这些原因，作者倾向于使用固定分区来解决这个问题。</p><h3 id="其他注意事项-1" tabindex="-1"><a class="header-anchor" href="#其他注意事项-1" aria-hidden="true">#</a> 其他注意事项：</h3><ul><li>最佳实践是为写密集型的 Redis 节点分配两倍于所需的内存，以适应快照（如果需要）</li><li>我们可以使用 Redis-benchmark 工具来跟踪 Redis 设置的性能，并做出数据驱动的决策</li></ul><h3 id="替代方案-nosql" tabindex="-1"><a class="header-anchor" href="#替代方案-nosql" aria-hidden="true">#</a> 替代方案：NoSQL</h3><p>另一个需要考虑的替代方案是使用适合的 NoSQL 数据库，优化以下方面：</p><ul><li>高写入负载</li><li>在同一分区内根据分数有效地排序项</li></ul><p>DynamoDB、Cassandra 或 MongoDB 都是不错的选择。</p><p>在本章中，作者选择了使用 DynamoDB。它是一个完全托管的 NoSQL 数据库，提供可靠的性能和很好的可扩展性。 它还允许使用全局二级索引，当我们需要查询非主键字段时非常有用。</p><figure><img src="'+R+'" alt="dynamo-db" tabindex="0" loading="lazy"><figcaption>dynamo-db</figcaption></figure><p>让我们从存储一个棋类游戏排行榜的表开始：</p><figure><img src="'+q+'" alt="chess-game-leaderboard-table-1" tabindex="0" loading="lazy"><figcaption>chess-game-leaderboard-table-1</figcaption></figure><p>这种设计很好，但如果我们需要按分数查询，它的扩展性就不好。因此，我们可以将分数作为排序键：</p><figure><img src="'+S+'" alt="chess-game-leaderboard-table-2" tabindex="0" loading="lazy"><figcaption>chess-game-leaderboard-table-2</figcaption></figure><p>这个设计的另一个问题是我们按月份进行分区。由于最新的月份将比其他月份访问频繁，这导致了热点分区。</p><p>我们可以使用一种称为写分片（write sharding）的技术，为每个键附加一个分区编号，计算方法为 <code>user_id % num_partitions</code>：</p><p>![</p><p>chess-game-leaderboard-table-3](../image/system-design-388.png)</p><p>一个重要的权衡是我们应该使用多少分区：</p><ul><li>分区越多，写入扩展性越高</li><li>但是，读取扩展性会受到影响，因为我们需要查询更多的分区来汇总结果</li></ul><p>使用这种方法需要我们使用之前看到的“scatter-gather”技术，随着分区数量的增加，时间复杂度会增长：</p><figure><img src="'+E+`" alt="scatter-gather-2" tabindex="0" loading="lazy"><figcaption>scatter-gather-2</figcaption></figure><p>为了做出关于分区数量的良好评估，我们需要进行一些基准测试。</p><p>这种 NoSQL 方法仍然有一个主要的缺点——很难计算用户的具体排名。</p><p>如果我们有足够的规模需要分片，那么我们可以告诉用户他们的“百分位数”分数。</p><p>一个定时任务可以定期运行，分析分数分布，并根据此确定用户的百分位数，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>第 10 百分位 = 分数 &lt; 100
第 20 百分位 = 分数 &lt; 500
...
第 90 百分位 = 分数 &lt; 6500
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第四步-总结" tabindex="-1"><a class="header-anchor" href="#第四步-总结" aria-hidden="true">#</a> 第四步：总结</h2><p>如果时间允许，还有其他一些讨论：</p><ul><li>更快的检索 - 我们可以通过 Redis 哈希缓存用户对象，映射 <code>user_id -&gt; user object</code>，这能加速检索，相比查询数据库更高效。</li><li>破除平局 - 当两名玩家的分数相同，我们可以通过他们的最后一场比赛来打破平局。</li><li>系统故障恢复 - 在大规模的 Redis 故障发生时，我们可以通过查看 MySQL 的 WAL 记录，并通过一个临时脚本重建排行榜。</li></ul>`,149),N=[L];function z(D,Q){return i(),a("div",null,N)}const T=e(A,[["render",z],["__file","45_real_time_gaming_leaderboard.html.vue"]]);export{T as default};
