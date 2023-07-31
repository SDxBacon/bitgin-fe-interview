# Next.JS + Apollo + MUI TodoList App

這個範例是使用 Next.JS + Apollo + MUI 所做的 Todo List 範例程式。  
專案的 templates 使用 Next.JS 提供的 [Apollo Server and Client Example](https://github.com/vercel/next.js/tree/canary/examples/api-routes-apollo-server-and-client)

> 該模板有移植社群的 apollo-server-integration-next，所以可以同步 serve 一個 graphql server

```bash
yarn create next-app --example api-routes-apollo-server-and-client api-routes-apollo-server-and-client-app
```

## How to use

1. Clone the repo

```bash
git clone https://github.com/SDxBacon/nextjs-apollo-todo-list-example.git
```

2. 安裝 dependencies 與執行

```bash
yarn && yarn dev
```

## Standalone version server

專案裡面也有一個 standalone 版本供 debug 的 graphql 伺服器。  
可以參照以下設定快速換成 standalone 版本：

1. 執行 standalone 版本伺服器

```bash
cd ./server-standalone
yarn && yarn start
```

2. 修改 next.js 中的 graphql api url

```diff
function createIsomorphLink() {
  if (typeof window === "undefined") {
    return new SchemaLink({ schema });
  } else {
    return new HttpLink({
-      uri: "/api/graphql",
+      uri: "http://localhost:4000/graphql"
      credentials: "same-origin",
    });
  }
}
```

> NOTE: 這是 localhost 端 debug 用，沒處理 CORS...等其餘問題
