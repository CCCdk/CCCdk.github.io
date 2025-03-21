# 8. WebSocket

在 web 开发的世界里，超文本传输协议（HTTP）一直是客户端与服务器之间通信的基石。然而，随着 Web 应用的发展，HTTP 的局限性变得越来越明显，尤其是在需要实时通信的场景中。本文将探讨这些局限性，并介绍 WebSocket，这一旨在解决 HTTP 缺陷的协议。

## HTTP 的局限性

HTTP 是一种无状态协议，主要用于传输超媒体文档，如 HTML。它基于请求-响应周期工作，即客户端向服务器发送请求，服务器返回请求的数据。虽然这种方式适用于大多数 Web 应用，但在需要持续、实时通信的场景中，如即时聊天应用，它的表现就显得不足了。

**HTTP 的主要局限性：**

- **无状态性：** 每个 HTTP 请求都是独立的，意味着服务器不会在请求之间保留信息。这使得持续通信变得非常困难。
- **轮询：** 为了模拟实时通信，HTTP 需要频繁的轮询，即客户端反复发送请求以检查是否有新数据。这种做法效率低下，并可能导致不必要的网络流量。
- **延迟：** 轮询间隔可能导致接收新数据时出现延迟，这在实时应用中是不可接受的。

## WebSocket：实时通信的解决方案

WebSocket 是建立在 **互联网协议（IP）** 和 **传输控制协议（TCP）** 之上的一种协议，提供全双工通信通道，通过一个单一的、长久保持的连接，允许数据双向流动。与 HTTP 不同，WebSocket 允许数据在两个方向上自由流动，而不需要客户端反复发送请求。

**WebSocket 的主要特点：**

- **持久连接：** 在初始握手完成后，WebSocket 连接保持打开状态，实现客户端与服务器之间的持续数据交换。
- **双向通信：** 数据可以同时发送和接收，这使得 WebSocket 非常适合实时应用，如聊天系统和实时动态信息流。
- **低延迟：** 由于连接是持久的，因此数据传输的延迟非常小，确保实时更新。

## 使用案例

为了理解 WebSocket 的优势，我们以聊天应用为例。在典型的基于 HTTP 的设置中，客户端需要定期向服务器轮询，以检查是否有新消息。这种做法不仅增加了延迟，还因为不断开关连接而消耗更多资源。

使用 WebSocket 后，流程变得更加简化：

1. **WebSocket 握手：** 客户端发起 HTTP 请求，建立 WebSocket 连接。如果成功，服务器响应状态码 `101 Switching Protocols`，将连接升级为 WebSocket。
2. **持久连接：** 一旦建立，WebSocket 连接将保持打开，允许服务器实时推送新消息到客户端。
3. **实时通信：** 客户端与服务器可以持续交换消息，无需反复建立连接。

```python
# WebSocket 连接示例（Python）
import asyncio
import websockets

async def chat():
    uri = "ws://localhost:8000"
    async with websockets.connect(uri) as websocket:
        # 发送消息
        await websocket.send("Hello, Server!")
        # 接收响应
        response = await websocket.recv()
        print(f"Received: {response}")

asyncio.get_event_loop().run_until_complete(chat())
```

## WebSocket 握手和通信流图示

```
+--------+       HTTP 请求       +--------+
|  客户端 | -------------------> | 服务器  |
+--------+                      +--------+
    |                                |
    |       HTTP 101 切换协议         |
    | <----------------------------- |
    |                                |
    |       WebSocket 连接建立        |
    | <----------------------------> |
    |           双向数据流             |
    |                                |
```

## 相关链接

- [MDN Web Docs 关于 WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [WebSocket 协议规范](https://tools.ietf.org/html/rfc6455)
