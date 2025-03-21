# 10. API 设计

API（应用程序接口）是现代软件系统中不同模块之间通信的桥梁。一个设计良好的 API 能显著提高系统的扩展性、可维护性和安全性。本文将讨论 API 设计的关键原则，并结合 **Twitter 核心 API** 的实例，介绍最佳实践。

---

## 使用 HTTPS 确保通信安全

为了防止数据在传输过程中被窃听或篡改，API 的通信应始终使用 **HTTPS** 协议。

**示例：**

```
https://api.twitter.com/2/tweets
```

HTTPS 能有效保护用户的敏感数据，例如身份认证令牌和用户隐私信息。

---

## 域名规范化

API 的域名应该反映其功能，确保清晰易读：

- **专用域名**：用于大型系统，例如 Twitter 的 API：
  ```
  https://api.twitter.com
  ```
- **子路径模式**：适用于简单系统：
  ```
  https://example.com/api/
  ```

使用专用域名可以更好地支持系统扩展和负载分离。

---

## 版本控制（Versioning）

为了兼容旧系统且支持新功能，API 需要进行版本管理，以确保在发布新功能或进行破坏性更改时，现有用户不受影响。推荐通过路径显示版本号：

**示例：**

```
https://api.twitter.com/2/tweets
```

这样能确保不同版本之间的调用互不干扰。

> 提示：虽然也可通过 HTTP 头部指定版本（如 `Accept`），但这不如路径模式直观。
>
> 如 GitHub API 的做法：
>
> ```
> Accept: application/vnd.github.v3+json
> ```

---

## RESTful 路径设计

遵循 RESTful 风格设计路径，使路径描述资源（名词，而非动词）。

**示例：**

- 获取推文：
  ```
  GET /tweets/{id}
  ```
- 发布新推文：
  ```
  POST /tweets
  ```
- 搜索推文：
  ```
  GET /tweets/search/recent?query=hello
  ```

路径应保持简洁，并遵循统一的命名规则（如复数形式）。

---

## 使用 HTTP 动词定义操作

HTTP 动词明确标识资源的操作类型：

- **GET**：获取资源
- **POST**：新建资源
- **PUT/PATCH**：更新资源
- **DELETE**：删除资源

**示例：**

- 删除推文：
  ```
  DELETE /tweets/{id}
  ```

这种直观的操作方式降低了开发者的学习成本。

---

## 过滤与分页（Filtering & Pagination）

API 返回的数据应支持灵活过滤，避免单次传输过多信息。

**常见模式：**

- **分页**：
  ```
  ?limit=20&offset=0
  ```
- **条件过滤**：
  ```
  ?query=from:elonmusk
  ```
- **排序**：
  ```
  ?sort=date&order=desc
  ```

Twitter 提供了基于游标的分页机制，通过 `next_cursor` 参数返回下一页数据，提高效率。

---

## 状态码与错误处理（Status Codes & Error Handling）

使用标准 HTTP 状态码简化客户端对响应的解析：

- **2xx**：成功
  - 200：成功
  - 201：资源创建成功
- **4xx**：客户端错误
  - 400：请求参数错误
  - 401：认证失败
  - 404：资源不存在
- **5xx**：服务器错误
  - 500：内部错误

良好的错误处理机制可以快速定位问题，提升开发体验，对于改善用户体验非常重要。

当出现问题时，API 应该返回标准的 HTTP 状态码，和一致且描述性的错误消息，帮助客户端理解问题所在。

**示例：Twitter 的错误响应**

```json
{
	"title": "Unauthorized",
	"detail": "Invalid authentication token.",
	"status": 401
}
```

---

## 返回结果的结构化

API 的返回结果应保持一致且易于解析。推荐格式为 JSON，常见结构包括：

- 列表查询：
  ```json
  {
  	"data": [
  		{ "id": "1", "text": "Hello, world!" },
  		{ "id": "2", "text": "Learning API design!" }
  	]
  }
  ```
- 单个资源查询：
  ```json
  {
  	"id": "1",
  	"text": "Hello, world!"
  }
  ```

明确的字段命名和规范的结构有助于客户端开发。

---

## 身份认证与授权

安全性是 API 设计中的重中之重。Twitter 使用 **OAuth 2.0** 授权机制，使第三方应用可以在不直接获取用户密码的情况下，访问用户数据或执行特定操作。

**示例：**

用户登录第三方应用后，该应用可通过令牌代表用户发布推文，而不会暴露敏感信息。

---

## 限流与请求优化

为了防止滥用，API 通常会限制调用频率。Twitter 使用了基于时间窗口的限流策略，并在响应头中返回限流信息：

```http
X-Rate-Limit-Limit: 15
X-Rate-Limit-Remaining: 0
X-Rate-Limit-Reset: 1632765600
```

当超过限制时，返回状态码 `429 Too Many Requests`，并提示何时可以重试。

---

## 文档化与开发者支持

API 的文档化对开发者体验至关重要。优秀的文档应包含以下内容：

- 每个端点的功能与示例
- 参数说明
- 状态码与错误信息
- 分页与限流机制

Twitter 提供了交互式开发者平台和 [API 文档](https://developer.x.com/en/docs/x-api)，帮助开发者快速理解并调用 API。

---

## 扩展支持：HATEOAS

通过在响应中嵌入链接，进一步增强 API 的可扩展性：  
**示例：**

```json
{
	"data": { "id": "1", "text": "Hello, world!" },
	"links": {
		"self": "/tweets/1",
		"author": "/users/123"
	}
}
```

这种方式能让客户端动态发现 API 的关联功能。
