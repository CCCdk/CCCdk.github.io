import{_ as a,o as e,c as i,a as t}from"./app-y5y1bORC.js";const r="/assets/interview-http-11--BNX6def.png",d="/assets/interview-http-12-6i_DHDCx.png",n="/assets/interview-http-13-rVHbz2Kw.png",h={},c=t('<h1 id="说说-tcp-为什么需要三次握手和四次挥手" tabindex="-1"><a class="header-anchor" href="#说说-tcp-为什么需要三次握手和四次挥手" aria-hidden="true">#</a> 说说 TCP 为什么需要三次握手和四次挥手？</h1><h2 id="一、三次握手" tabindex="-1"><a class="header-anchor" href="#一、三次握手" aria-hidden="true">#</a> 一、三次握手</h2><p>三次握手（Three-way Handshake）其实就是指建立一个 TCP 连接时，需要客户端和服务器总共发送 3 个包</p><p>主要作用就是为了确认双方的接收能力和发送能力是否正常、指定自己的初始化序列号为后面的可靠性传送做准备</p><p>过程如下：</p><ul><li>第一次握手：客户端给服务端发一个 SYN 报文，并指明客户端的初始化序列号 ISN(c)，此时客户端处于 SYN_SENT 状态</li><li>第二次握手：服务器收到客户端的 SYN 报文之后，会以自己的 SYN 报文作为应答，为了确认客户端的 SYN，将客户端的 ISN+1 作为 ACK 的值，此时服务器处于 SYN_RCVD 的状态</li><li>第三次握手：客户端收到 SYN 报文之后，会发送一个 ACK 报文，值为服务器的 ISN+1。此时客户端处于 ESTABLISHED 状态。服务器收到 ACK 报文之后，也处于 ESTABLISHED 状态，此时，双方已建立起了连接</li></ul><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上述每一次握手的作用如下：</p><ul><li>第一次握手：客户端发送网络包，服务端收到了 这样服务端就能得出结论：客户端的发送能力、服务端的接收能力是正常的。</li><li>第二次握手：服务端发包，客户端收到了 这样客户端就能得出结论：服务端的接收、发送能力，客户端的接收、发送能力是正常的。不过此时服务器并不能确认客户端的接收能力是否正常</li><li>第三次握手：客户端发包，服务端收到了。 这样服务端就能得出结论：客户端的接收、发送能力正常，服务器自己的发送、接收能力也正常</li></ul><p>通过三次握手，就能确定双方的接收和发送能力是正常的。之后就可以正常通信了</p><h3 id="为什么不是两次握手" tabindex="-1"><a class="header-anchor" href="#为什么不是两次握手" aria-hidden="true">#</a> 为什么不是两次握手?</h3><p>如果是两次握手，发送端可以确定自己发送的信息能对方能收到，也能确定对方发的包自己能收到，但接收端只能确定对方发的包自己能收到 无法确定自己发的包对方能收到</p><p>并且两次握手的话, 客户端有可能因为网络阻塞等原因会发送多个请求报文，延时到达的请求又会与服务器建立连接，浪费掉许多服务器的资源</p><h2 id="二、四次挥手" tabindex="-1"><a class="header-anchor" href="#二、四次挥手" aria-hidden="true">#</a> 二、四次挥手</h2><p><code>tcp</code>终止一个连接，需要经过四次挥手</p><p>过程如下：</p><ul><li>第一次挥手：客户端发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于 FIN_WAIT1 状态，停止发送数据，等待服务端的确认</li><li>第二次挥手：服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序列号值 +1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于 CLOSE_WAIT 状态</li><li>第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给 FIN 报文，且指定一个序列号。此时服务端处于 <code>LAST_ACK</code> 的状态</li><li>第四次挥手：客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答，且把服务端的序列号值 +1 作为自己 ACK 报文的序列号值，此时客户端处于 TIME_WAIT 状态。需要过一阵子以确保服务端收到自己的 ACK 报文之后才会进入 CLOSED 状态，服务端收到 ACK 报文之后，就处于关闭连接了，处于 CLOSED 状态</li></ul><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="四次挥手原因" tabindex="-1"><a class="header-anchor" href="#四次挥手原因" aria-hidden="true">#</a> 四次挥手原因</h3><p>服务端在收到客户端断开连接<code>Fin</code>报文后，并不会立即关闭连接，而是先发送一个<code>ACK</code>包先告诉客户端收到关闭连接的请求，只有当服务器的所有报文发送完毕之后，才发送<code>FIN</code>报文断开连接，因此需要四次挥手</p><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2><p>一个完整的三次握手四次挥手如下图所示：</p><figure><img src="'+n+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><ul><li>https://zhuanlan.zhihu.com/p/53374516</li><li>https://segmentfault.com/a/1190000020610336</li></ul>',25),l=[c];function s(o,p){return e(),i("div",null,l)}const u=a(h,[["render",s],["__file","handshakes_waves.html.vue"]]);export{u as default};
