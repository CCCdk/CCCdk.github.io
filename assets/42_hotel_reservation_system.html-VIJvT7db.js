import{_ as n,r as s,o,c as r,b as e,d as i,e as d,w as a,a as t}from"./app-y5y1bORC.js";const c="/assets/system-design-313-CtkN4ntk.png",p="/assets/system-design-314-tj9sSMga.png",u="/assets/system-design-315-B4c2lG6E.png",g="/assets/system-design-316-KlUdfDRA.png",m="/assets/system-design-317-OB7WhoRW.png",v="/assets/system-design-318-tBOOsLqO.png",h="/assets/system-design-319-qXm_C_PI.png",_="/assets/system-design-320-QkkEybBe.png",b="/assets/system-design-321-urw-VfJE.png",f="/assets/system-design-322-PRVw1US1.png",y="/assets/system-design-323-xyc4Anzg.png",x="/assets/system-design-324-BTAEVd3v.png",q="/assets/system-design-325-AD4yjeSB.png",D="/assets/system-design-326-TF7JhHdB.png",I="/assets/system-design-327-MbMkjHqI.png",T="/assets/system-design-328-YwZktpq_.png",E="/assets/system-design-329-hU12XtQ7.png",P={},A=t('<h1 id="_22-设计酒店预订系统" tabindex="-1"><a class="header-anchor" href="#_22-设计酒店预订系统" aria-hidden="true">#</a> 22. 设计酒店预订系统</h1><p>在本章中，我们将设计一个酒店预订系统，类似于万豪国际（Marriott International）。</p><p>此设计也适用于其他类型的系统，如 Airbnb、航班预订、电影票预订等。</p><h2 id="第一步-理解问题并确定设计范围" tabindex="-1"><a class="header-anchor" href="#第一步-理解问题并确定设计范围" aria-hidden="true">#</a> 第一步：理解问题并确定设计范围</h2><p>在开始设计系统之前，我们需要向面试官提出问题以明确设计的范围：</p><ul><li><strong>候选人</strong>: 系统的规模是多少？</li><li><strong>面试官</strong>: 我们正在为一个拥有 5000 家酒店和 100 万个房间的酒店连锁构建一个网站。</li><li><strong>候选人</strong>: 客户是在预订时付款还是在到达酒店时付款？</li><li><strong>面试官</strong>: 客户在预订时全额付款。</li><li><strong>候选人</strong>: 客户是通过网站预订酒店房间吗？我们是否需要支持其他预订方式，如电话？</li><li><strong>面试官</strong>: 客户仅通过网站或应用程序进行预订。</li><li><strong>候选人</strong>: 客户可以取消预订吗？</li><li><strong>面试官</strong>: 可以。</li><li><strong>候选人</strong>: 还需要考虑其他事项吗？</li><li><strong>面试官</strong>: 是的，我们允许超额预订 10%。酒店会销售比实际房间数更多的房间。这是因为酒店预期客户会取消预订。</li><li><strong>候选人</strong>: 由于时间有限，我们将重点关注：展示与酒店相关的页面、酒店房间详情页面、预订房间、管理面板，支持超额预订。</li><li><strong>面试官</strong>: 听起来不错。</li><li><strong>面试官</strong>: 还有一件事——酒店价格经常变化。假设酒店房间的价格每天都会变化。</li><li><strong>候选人</strong>: 好的。</li></ul><h3 id="非功能性需求" tabindex="-1"><a class="header-anchor" href="#非功能性需求" aria-hidden="true">#</a> 非功能性需求</h3><ul><li>支持高并发——在旅游旺季，可能有很多客户试图预订同一家酒店。</li><li>适度的延迟——当用户进行预订时，理想情况下系统应该具有较低的延迟，但如果系统处理需要几秒钟的时间也是可以接受的。</li></ul><h3 id="粗略估算" tabindex="-1"><a class="header-anchor" href="#粗略估算" aria-hidden="true">#</a> 粗略估算</h3><ul><li>总共有 5000 家酒店和 100 万个房间</li><li>假设 70% 的房间被占用，平均入住时长为 3 天</li><li>估算每日预订量 - 100 万 * 0.7 / 3 = ~24 万个预订/日</li><li>每秒预订量 - 24 万 / 10^5 秒 = ~3。平均每秒预订数（TPS）较低。</li></ul><p>让我们估算每秒查询量（QPS）。假设用户进入预订页面有三个步骤，每个页面的转换率是 10%， 我们可以估算，如果有 3 个预订，那么必须有 30 次预订页面的访问和 300 次酒店房间详情页面的访问。</p><figure><img src="'+c+`" alt="qps-estimation" tabindex="0" loading="lazy"><figcaption>qps-estimation</figcaption></figure><h2 id="第二步-提出高层设计并获得认可" tabindex="-1"><a class="header-anchor" href="#第二步-提出高层设计并获得认可" aria-hidden="true">#</a> 第二步：提出高层设计并获得认可</h2><p>我们将探讨：API 设计、数据模型和高层设计。</p><h3 id="api-设计" tabindex="-1"><a class="header-anchor" href="#api-设计" aria-hidden="true">#</a> API 设计</h3><p>这个 API 设计关注的是我们为了支持一个酒店预订系统所需的核心端点（使用 RESTful 实践）。</p><p>一个完善的系统需要一个更广泛的 API，支持根据多种标准搜索房间，但在这一节我们不会重点关注这些。 原因是这些并不是技术上有挑战性的内容，因此超出了本节的范围。</p><p>与酒店相关的 API：</p><ul><li><code>GET /v1/hotels/{id}</code> - 获取酒店的详细信息</li><li><code>POST /v1/hotels</code> - 添加一个新酒店，仅对运营人员可用</li><li><code>PUT /v1/hotels/{id}</code> - 更新酒店信息，仅对运营人员可用</li><li><code>DELETE /v1/hotels/{id}</code> - 删除酒店，仅对运营人员可用</li></ul><p>与房间相关的 API：</p><ul><li><code>GET /v1/hotels/{id}/rooms/{id}</code> - 获取房间的详细信息</li><li><code>POST /v1/hotels/{id}/rooms</code> - 添加房间，仅对运营人员可用</li><li><code>PUT /v1/hotels/{id}/rooms/{id}</code> - 更新房间信息，仅对运营人员可用</li><li><code>DELETE /v1/hotels/{id}/rooms/{id}</code> - 删除房间，仅对运营人员可用</li></ul><p>与预订相关的 API：</p><ul><li><code>GET /v1/reservations</code> - 获取当前用户的预订历史</li><li><code>GET /v1/reservations/{id}</code> - 获取某个预订的详细信息</li><li><code>POST /v1/reservations</code> - 创建一个新预订</li><li><code>DELETE /v1/reservations/{id}</code> - 取消一个预订</li></ul><p>这是一个示例请求，用于创建一个预订：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;startDate&quot;:&quot;2021-04-28&quot;,
  &quot;endDate&quot;:&quot;2021-04-30&quot;,
  &quot;hotelID&quot;:&quot;245&quot;,
  &quot;roomID&quot;:&quot;U12354673389&quot;,
  &quot;reservationID&quot;:&quot;13422445&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),S=e("code",null,"reservationID",-1),R=t('<h3 id="数据模型" tabindex="-1"><a class="header-anchor" href="#数据模型" aria-hidden="true">#</a> 数据模型</h3><p>在选择使用哪种数据库之前，让我们考虑一下我们的访问模式。</p><p>我们需要支持以下查询：</p><ul><li>查看酒店的详细信息</li><li>查找给定日期范围内可用的房间类型</li><li>记录一个预订</li><li>查找某个预订或过去的预订历史</li></ul><p>从我们的估算来看，系统的规模不大，但我们需要为流量激增做好准备。</p><p>基于这一点，我们选择了关系型数据库，因为：</p><ul><li>关系型数据库适用于读多写少的系统。</li><li>NoSQL 数据库通常针对写操作进行了优化，但我们知道我们不会有太多写操作，因为只有一小部分访问网站的用户会进行预订。</li><li>关系型数据库提供了 ACID 保证。这对于这种系统很重要，因为没有它们，我们无法防止诸如负余额、双重收费等问题。</li><li>关系型数据库可以轻松建模数据，因为结构非常清晰。</li></ul><p>以下是我们的架构设计：</p><figure><img src="'+p+'" alt="schema-design" tabindex="0" loading="lazy"><figcaption>schema-design</figcaption></figure><p>大多数字段不言自明。值得一提的是 <code>status</code> 字段，它表示某个房间的状态机：</p><figure><img src="'+u+'" alt="status-state-machine" tabindex="0" loading="lazy"><figcaption>status-state-machine</figcaption></figure><p>该数据模型适用于像 Airbnb 这样的系统，但不适用于酒店，因为用户并不是预订特定的房间，而是预订一种房型。 他们预订的是房型，房间号是在预订时确定的。</p>',12),k=t('<h3 id="高层设计" tabindex="-1"><a class="header-anchor" href="#高层设计" aria-hidden="true">#</a> 高层设计</h3><p>我们选择了微服务架构进行本设计，它在近年来得到了广泛的应用：</p><figure><img src="'+g+`" alt="high-level-design" tabindex="0" loading="lazy"><figcaption>high-level-design</figcaption></figure><ul><li>用户通过手机或电脑预订酒店房间</li><li>管理员执行诸如退款/取消支付等管理功能</li><li>CDN 缓存静态资源，如 JS 包、图片、视频等</li><li>公共 API 网关 - 完全托管的服务，支持限流、身份验证等</li><li>内部 API - 仅对授权人员可见，通常由 VPN 保护</li><li>酒店服务 - 提供酒店和房间的详细信息。酒店和房间的数据是静态的，因此可以进行积极的缓存</li><li>价格服务 - 提供不同未来日期的房价。关于这个领域的一个有趣点是，价格取决于某天酒店的入住率</li><li>预订服务 - 接收预订请求并预订酒店房间，同时跟踪房间库存的变动（如预订、取消等）</li><li>支付服务 - 处理支付，并在成功支付后更新预订状态</li><li>酒店管理服务 - 仅对授权人员可用，允许执行某些管理功能，如查看和管理预订、酒店等</li></ul><p>服务间的通信可以通过 RPC 框架（如 gRPC）来实现。</p><h2 id="第三步-设计深入探讨" tabindex="-1"><a class="header-anchor" href="#第三步-设计深入探讨" aria-hidden="true">#</a> 第三步：设计深入探讨</h2><p>我们将深入探讨：</p><ul><li>改进的数据模型</li><li>并发问题</li><li>可扩展性</li><li>解决微服务中的数据不一致问题</li></ul><h3 id="改进的数据模型" tabindex="-1"><a class="header-anchor" href="#改进的数据模型" aria-hidden="true">#</a> 改进的数据模型</h3><p>如前所述，我们需要修改我们的 API 和架构，以支持预订房型而非特定房间。</p><p>对于预订 API，我们不再预订 <code>roomID</code>，而是预订 <code>roomTypeID</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /v1/reservations
{
  &quot;startDate&quot;:&quot;2021-04-28&quot;,
  &quot;endDate&quot;:&quot;2021-04-30&quot;,
  &quot;hotelID&quot;:&quot;245&quot;,
  &quot;roomTypeID&quot;:&quot;12354673389&quot;,
  &quot;roomCount&quot;:&quot;3&quot;,
  &quot;reservationID&quot;:&quot;13422445&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是更新后的架构：</p><figure><img src="`+m+'" alt="updated-schema" tabindex="0" loading="lazy"><figcaption>updated-schema</figcaption></figure><ul><li>room - 包含有关房间的信息</li><li>room_type_rate - 包含给定房型的价格信息</li><li>reservation - 记录客人的预订数据</li><li>room_type_inventory - 存储关于酒店房间的库存数据</li></ul><p>让我们来看看 <code>room_type_inventory</code> 表的列，因为这个表更加有趣：</p><ul><li>hotel_id - 酒店的 ID</li><li>room_type_id - 房型的 ID</li><li>date - 某一天的日期</li><li>total_inventory - 总库存数，减去暂时从库存中移除的房间数</li><li>total</li></ul><p>_reserved - 给定日期（hotel_id, room_type_id, date）的已预订房间数</p><p>有许多方式可以设计这个表，但使用 (hotel_id, room_type_id, date) 来表示每个房间，能够简化预订管理和查询。</p><p>表中的行通过每日的 CRON 作业进行预填充。</p><p>示例数据：</p><table><thead><tr><th>hotel_id</th><th>room_type_id</th><th>date</th><th>total_inventory</th><th>total_reserved</th></tr></thead><tbody><tr><td>211</td><td>1001</td><td>2021-06-01</td><td>100</td><td>80</td></tr><tr><td>211</td><td>1001</td><td>2021-06-02</td><td>100</td><td>82</td></tr><tr><td>211</td><td>1001</td><td>2021-06-03</td><td>100</td><td>86</td></tr><tr><td>211</td><td>1001</td><td>...</td><td>...</td><td></td></tr><tr><td>211</td><td>1001</td><td>2023-05-31</td><td>100</td><td>0</td></tr><tr><td>211</td><td>1002</td><td>2021-06-01</td><td>200</td><td>16</td></tr><tr><td>2210</td><td>101</td><td>2021-06-01</td><td>30</td><td>23</td></tr><tr><td>2210</td><td>101</td><td>2021-06-02</td><td>30</td><td>25</td></tr></tbody></table><p>示例 SQL 查询，检查房型的可用性：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT date, total_inventory, total_reserved\nFROM room_type_inventory\nWHERE room_type_id = ${roomTypeId} AND hotel_id = ${hotelId}\nAND date between ${startDate} and ${endDate}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如何使用这些数据检查指定数量房间的可用性（请注意我们支持超额预订）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (total_reserved + ${numberOfRoomsToReserve}) &lt;= 110% * total_inventory\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来我们估算一下存储量。</p><ul><li>我们有 5000 家酒店</li><li>每家酒店有 20 种房型</li><li>5000 _ 20 _ 2（年）* 365（天）= 7300 万行</li></ul><p>7300 万行数据不算很多，单个数据库服务器就能处理。 然而，设置读复制（可能跨多个区域）以保证高可用性是有意义的。</p><p>后续问题——如果预订数据太大，无法存储在单个数据库中，该怎么办？</p><ul><li>只存储当前和未来的预订数据。预订历史可以移到冷存储中。</li><li>数据库分片——我们可以通过 <code>hash(hotel_id) % servers_cnt</code> 来分片，因为我们在查询中总是选择 <code>hotel_id</code>。</li></ul><h3 id="并发问题" tabindex="-1"><a class="header-anchor" href="#并发问题" aria-hidden="true">#</a> 并发问题</h3><p>另一个需要解决的重要问题是双重预订。</p><p>我们需要解决两个问题：</p><ul><li>同一用户点击了“预订”按钮两次</li><li>多个用户尝试同时预订同一个房间</li></ul><p>下面是第一个问题的可视化示例：</p><figure><img src="'+v+'" alt="double-booking-single-user" tabindex="0" loading="lazy"><figcaption>double-booking-single-user</figcaption></figure><p>解决这个问题有两种方法：</p><ul><li>客户端处理 - 前端可以在点击“预订”按钮后禁用该按钮。然而，如果用户禁用了 JavaScript，他们将无法看到按钮变灰。</li><li>幂等 API - 向 API 添加一个幂等性键，使用户能够无论多少次调用端点，都能只执行一次操作：</li></ul><figure><img src="'+h+'" alt="idempotency" tabindex="0" loading="lazy"><figcaption>idempotency</figcaption></figure><p>以下是此流程的工作原理：</p><ul><li>一旦你开始填写信息并进行预订，预订订单就会生成。该订单使用全局唯一标识符生成。</li><li>使用在前一步生成的<code>reservation_id</code>提交预订 1。</li><li>如果点击“完成预订”第二次，相同的<code>reservation_id</code>会被发送，后端检测到这是一个重复的预订。</li><li>通过对<code>reservation_id</code>列添加唯一约束来避免重复，这样就能防止在数据库中存储多个相同的记录。</li></ul><figure><img src="'+_+'" alt="unique-constraint-violation" tabindex="0" loading="lazy"><figcaption>unique-constraint-violation</figcaption></figure><p>如果多个用户进行相同的预订怎么办？</p><figure><img src="'+b+`" alt="double-booking-multiple-users" tabindex="0" loading="lazy"><figcaption>double-booking-multiple-users</figcaption></figure><ul><li>假设事务隔离级别不是可串行化的</li><li>用户 1 和用户 2 尝试同时预订同一个房间。</li><li>事务 1 检查是否有足够的房间——有</li><li>事务 2 检查是否有足够的房间——有</li><li>事务 2 预订房间并更新库存</li><li>事务 1 也预订了房间，因为它仍然看到有 99 个已预订房间，总共有 100 个房间。</li><li>两个事务都成功提交更改</li></ul><p>这个问题可以通过某种锁机制来解决：</p><ul><li>悲观锁</li><li>乐观锁</li><li>数据库约束</li></ul><p>以下是我们用来预订房间的 SQL：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 第一步：检查房间库存 {#step-1-check-room-inventory}
SELECT date, total_inventory, total_reserved
FROM room_type_inventory
WHERE room_type_id = \${roomTypeId} AND hotel_id = \${hotelId}
AND date between \${startDate} and \${endDate}

## 对于步骤 1 返回的每个条目 {#for-every-entry-returned-from-step-1}
if((total_reserved + \${numberOfRoomsToReserve}) &gt; 110% * total_inventory) {
  Rollback
}

## 第二步：预订房间 {#step-2-reserve-rooms}
UPDATE room_type_inventory
SET total_reserved = total_reserved + \${numberOfRoomsToReserve}
WHERE room_type_id = \${roomTypeId}
AND date between \${startDate} and \${endDate}

Commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="选项-1-悲观锁" tabindex="-1"><a class="header-anchor" href="#选项-1-悲观锁" aria-hidden="true">#</a> 选项 1：悲观锁</h3><p>悲观锁通过在更新记录时对其加锁，防止同时更新。</p><p>这可以通过 MySQL 中的 <code>SELECT... FOR UPDATE</code> 查询来实现，该查询会锁定查询中选择的行，直到事务提交。</p><figure><img src="`+f+'" alt="pessimistic-locking" tabindex="0" loading="lazy"><figcaption>pessimistic-locking</figcaption></figure><p>优点：</p><ul><li>防止应用程序更新正在更改的数据</li><li>易于实现，避免通过串行化更新冲突。当存在大量数据竞争时，这种方式非常有用。</li></ul><p>缺点：</p><ul><li>当多个资源被锁定时，可能会发生死锁。</li><li>这种方法不具可扩展性——如果事务被锁定太久，可能会影响所有尝试访问该资源的其他事务。</li><li>当查询选择了大量资源并且事务持续时间较长时，影响会很大。</li></ul><p>由于可扩展性问题，作者不推荐使用这种方法。</p><h3 id="选项-2-乐观锁" tabindex="-1"><a class="header-anchor" href="#选项-2-乐观锁" aria-hidden="true">#</a> 选项 2：乐观锁</h3><p>乐观锁允许多个用户同时尝试更新一条记录。</p><p>有两种常见的实现方式——版本号和时间戳。推荐使用版本号，因为服务器时钟可能不准确。</p><figure><img src="'+y+'" alt="optimistic-locking" tabindex="0" loading="lazy"><figcaption>optimistic-locking</figcaption></figure><ul><li>向数据库表中添加一个新的 <code>version</code> 列</li><li>在用户修改数据库行之前，读取版本号</li><li>当用户更新行时，将版本号加 1 并写回数据库</li><li>数据库验证在版本号没有超过前一个时，阻止插入</li></ul><p>乐观锁通常比悲观锁更快，因为我们并没有锁定数据库。 然而，当并发量很高时，它的性能往往会下降，因为这会导致大量回滚。</p><p>优点：</p><ul><li>防止应用程序编辑过时的数据</li><li>我们不需要在数据库中获取锁</li><li>当数据竞争较低时，这种方法是首选，即很少发生更新冲突</li></ul><p>缺点：</p><ul><li>当数据竞争较高时，性能较差</li></ul><p>乐观锁是我们系统的一个好选择，因为预订的 QPS 并不非常高。</p><h3 id="选项-3-数据库约束" tabindex="-1"><a class="header-anchor" href="#选项-3-数据库约束" aria-hidden="true">#</a> 选项 3：数据库约束</h3><p>这种方法与乐观锁非常相似，但保护机制是通过数据库约束实现的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CONSTRAINT `check_room_count` CHECK((`total_inventory - total_reserved` &gt;= 0))\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="'+x+'" alt="database-constraint" tabindex="0" loading="lazy"><figcaption>database-constraint</figcaption></figure><p>优点：</p><ul><li>易于实现</li><li>当数据竞争较小的时候效果很好</li></ul><p>缺点：</p><ul><li>类似于乐观锁，当数据竞争较高时，性能较差</li><li>数据库约束不像应用代码那样容易进行版本控制</li><li>不是所有数据库都支持约束</li></ul><p>由于实现简单，这是酒店预订系统的另一个好选择。</p><h3 id="可扩展性" tabindex="-1"><a class="header-anchor" href="#可扩展性" aria-hidden="true">#</a> 可扩展性</h3><p>通常，酒店预订系统的负载不是很高。</p><p>然而，面试官可能会问你如何处理系统被用于更大、更受欢迎的旅行网站（例如 booking.com）的情况。在这种情况下，QPS 可能会增加 1000 倍。</p><p>当出现这种情况时，了解我们的瓶颈在哪里非常重要。所有服务都是无状态的，因此可以通过复制轻松扩展。</p><p>然而，数据库是有状态的，如何扩展就不那么明显了。</p><p>一种扩展方法是实现数据库分片——我们可以将数据分散到多个数据库中，每个数据库存储部分数据。</p><p>我们可以基于 <code>hotel_id</code> 来进行分片，因为所有查询都基于该字段进行筛选。 假设 QPS 为 30,000，将数据库分为 16 个分片后，每个分片处理 1875 QPS，这在单个 MySQL 集群的负载能力范围内。</p><figure><img src="'+q+'" alt="database-sharding" tabindex="0" loading="lazy"><figcaption>database-sharding</figcaption></figure><p>我们还可以通过 Redis 利用缓存来存储房间库存和预订信息。我们可以设置 TTL，使得过期的数据会在过去的日期中过期。</p><figure><img src="'+D+`" alt="inventory-cache" tabindex="0" loading="lazy"><figcaption>inventory-cache</figcaption></figure><p>我们存储库存的方式是基于 <code>hotel_id</code>、<code>room_type_id</code> 和 <code>date</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>key: hotelID_roomTypeID_{date}
value: 给定酒店 ID、房型 ID 和日期的可用房间数。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>数据一致性是异步发生的，并通过使用 CDC 流机制进行管理——数据库的变化被读取并应用到一个单独的系统中。 Debezium 是一个流行的选项，用于将数据库变更同步到 Redis。</p><p>使用这种机制时，缓存和数据库可能在一段时间内不一致。 这对我们来说是可以接受的，因为数据库会防止我们进行无效的预订。</p><p>这可能会对 UI 产生一些问题，因为用户需要刷新页面才能看到“没有房间了”。 但是，如果一个人犹豫很久才做出预订决策，这种情况无论是否存在该问题都可能发生。</p><p>缓存的优点：</p><ul><li>减少数据库负载</li><li>高性能，因为 Redis 在内存中管理数据</li></ul><p>缓存的缺点：</p><ul><li>在缓存和数据库之间维护数据一致性很难。我们需要考虑不一致性对用户体验的影响。</li></ul><h3 id="服务间的数据一致性" tabindex="-1"><a class="header-anchor" href="#服务间的数据一致性" aria-hidden="true">#</a> 服务间的数据一致性</h3><p>单体应用程序使我们能够使用共享的关系数据库来确保数据一致性。</p><p>在我们的微服务设计中，我们采用了混合方法，其中一些服务是独立的，但预订和库存 API 由同一服务处理。</p><p>这样做是因为我们希望利用关系数据库的 ACID 保证来确保一致性。</p><p>然而，面试官可能会质疑这种方法，因为它不是纯粹的微服务架构，在这种架构中，每个服务都有自己的数据库：</p><figure><img src="`+I+'" alt="microservices-vs-monolith" tabindex="0" loading="lazy"><figcaption>microservices-vs-monolith</figcaption></figure><p>这可能会导致一致性问题。在单体服务器中，我们可以利用关系数据库的事务能力来实现原子操作：</p><figure><img src="'+T+'" alt="atomicity-monolith" tabindex="0" loading="lazy"><figcaption>atomicity-monolith</figcaption></figure><p>然而，当操作跨越多个服务时，保证这种原子性会变得更加困难：</p><figure><img src="'+E+'" alt="microservice-non-atomic-operation" tabindex="0" loading="lazy"><figcaption>microservice-non-atomic-operation</figcaption></figure><p>有一些著名的技术可以处理这些数据不一致问题：</p><ul><li>两阶段提交 - 一种数据库协议，保证在多个节点上提交原子事务。 但是，由于单个</li></ul><p>节点的延迟可能导致所有节点阻塞操作，因此它的性能不高。</p><ul><li>Saga - 一系列本地事务，当工作流中的任何步骤失败时触发补偿事务。这是一种最终一致性的方法。</li></ul><p>值得注意的是，解决微服务之间的数据不一致性是一个挑战性的问题，会增加系统的复杂性。 考虑到我们更务实的做法——将相关操作封装在同一个关系数据库中，是否值得付出这个代价，值得好好考虑。</p><h2 id="第-4-步-总结" tabindex="-1"><a class="header-anchor" href="#第-4-步-总结" aria-hidden="true">#</a> 第 4 步：总结</h2><p>我们展示了一个酒店预订系统的设计。</p><p>以下是我们经历的步骤：</p><ul><li>收集需求并进行初步计算，以了解系统的规模</li><li>在高层设计中展示了 API 设计、数据模型和系统架构</li><li>在深入探讨中，我们根据需求变化探讨了不同的数据库模式设计</li><li>我们讨论了竞态条件并提出了解决方案——悲观锁/乐观锁、数据库约束</li><li>讨论了通过数据库分片和缓存扩展系统的方法</li><li>最后，我们讨论了如何处理跨多个微服务的数据一致性问题</li></ul>',117);function C(z,N){const l=s("RouterLink");return o(),r("div",null,[A,e("p",null,[i("请注意，"),S,i(" 是一个幂等性键，用于避免双重预订。详细信息请见"),d(l,{to:"/system-design/42_hotel_reservation_system.html"},{default:a(()=>[i("并发部分")]),_:1}),i("。")]),R,e("p",null,[i("这个不足将在"),d(l,{to:"/system-design/42_hotel_reservation_system.html"},{default:a(()=>[i("改进的数据模型")]),_:1}),i("部分得到解决。")]),k])}const L=n(P,[["render",C],["__file","42_hotel_reservation_system.html.vue"]]);export{L as default};
