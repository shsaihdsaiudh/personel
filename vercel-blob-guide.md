# Vercel Blob 图片上传 + LangGraph 集成指南

## 1. 概述

在 LangGraph Agent 中实现：**本地图片 → 上传 Vercel Blob → 拿到公网 URL → 传给 3D 模型 API**。

---

## 2. 安装 SDK

```bash
pnpm add @vercel/blob
```

---

## 3. 环境变量

`.env.local`（已存在，无需改）：

```env
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_khxmpChFHeCNaA1K_lh3iKNtEv2DDZbrmXwRtVhf7LIRHf8"
```

---

## 4. 工具类：上传图片到 Vercel Blob

```ts
// src/tools/blob-uploader.ts
import { put } from "@vercel/blob";
import { readFile } from "fs/promises";
import path from "path";

export class BlobUploader {
  /**
   * 上传本地图片到 Vercel Blob，返回公网 URL
   * @param localPath - 本地图片绝对路径
   * @param options.access - 固定 'public'
   * @returns 公网可访问的图片 URL
   */
  static async upload(localPath: string): Promise<string> {
    const fileName = path.basename(localPath);
    const fileBuffer = await readFile(localPath);

    const { url } = await put(fileName, fileBuffer, {
      access: "public",
    });

    return url;
  }

  /**
   * 上传 Buffer（比如 AI 生成的图片）
   */
  static async uploadBuffer(
    fileName: string,
    buffer: Buffer,
    contentType: string = "image/png"
  ): Promise<string> {
    const { url } = await put(fileName, buffer, {
      access: "public",
      contentType,
    });

    return url;
  }
}
```

---

## 5. 在 LangGraph 中作为 Tool

### 方式一：直接封装为 LangChain Tool

```ts
// src/tools/blob-tool.ts
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { BlobUploader } from "./blob-uploader";

export const uploadImageTool = tool(
  async ({ localPath }: { localPath: string }) => {
    const url = await BlobUploader.upload(localPath);
    return `图片已上传，公网 URL: ${url}`;
  },
  {
    name: "upload_image_to_blob",
    description: "将本地图片上传到 Vercel Blob，返回公网可访问的 URL。用于给 3D 生成模型提供图片输入。",
    schema: z.object({
      localPath: z.string().describe("本地图片的绝对路径"),
    }),
  }
);
```

### 方式二：在 Agent Graph 节点中调用

```ts
// src/graph/nodes/upload-node.ts
import { BlobUploader } from "../../tools/blob-uploader";

export async function uploadImageNode(state: AgentState) {
  const localPath = state.localImagePath;
  const publicUrl = await BlobUploader.upload(localPath);

  return {
    ...state,
    imageUrl: publicUrl,
    messages: [...state.messages, `图片已上传: ${publicUrl}`],
  };
}
```

### 完整 Graph 示例

```ts
// src/graph/image-to-3d.ts
import { StateGraph, Annotation } from "@langchain/langgraph";
import { BlobUploader } from "../tools/blob-uploader";

const State = Annotation.Root({
  localImagePath: Annotation<string>(),
  imageUrl: Annotation<string>(),
  model3dResult: Annotation<string>(),
});

async function uploadNode(state: typeof State.State) {
  const url = await BlobUploader.upload(state.localImagePath);
  return { imageUrl: url };
}

async function generate3DNode(state: typeof State.State) {
  // 调用 3D 生成 API，传入 imageUrl
  // const result = await fetch("https://你的3D模型API/...", {
  //   body: JSON.stringify({ imageUrl: state.imageUrl }),
  // });
  return {
    model3dResult: "3D 模型已生成",
  };
}

const graph = new StateGraph(State)
  .addNode("upload", uploadNode)
  .addNode("generate3D", generate3DNode)
  .addEdge("__start__", "upload")
  .addEdge("upload", "generate3D");

export const app = graph.compile();
```

---

## 6. 使用方式

```ts
import { BlobUploader } from "./tools/blob-uploader";

// 上传本地图片
const url = await BlobUploader.upload("C:/photos/my-input.png");
console.log(url);
// → https://khxmpchfhecnaa1k.public.blob.vercel-storage.com/my-input.png

// 之后把这个 URL 传给 3D 生成 API
const response = await fetch("https://3d-api.example.com/generate", {
  method: "POST",
  body: JSON.stringify({ image_url: url }),
});
```

---

## 7. CLI 备选（不上代码直接用）

```powershell
cd personel
$env:BLOB_READ_WRITE_TOKEN="vercel_blob_rw_khxmpchFHeCNaA1K_lh3iKNtEv2DDZbrmXwRtVhf7LIRHf8"
vercel blob put 图片路径.png --access public
```

---

## 8. 要点

| 项目 | 内容 |
|------|------|
| Store ID | `store_khxmpChFHeCNaA1K` |
| Token | `.env.local` 中 `BLOB_READ_WRITE_TOKEN` |
| SDK | `@vercel/blob` 的 `put()` 方法 |
| access | 必须传 `"public"` |
| 返回 | 直接得到 `https://xxx.public.blob.vercel-storage.com/xxx` |

---

## 9. 注意事项

- 图片大小限制：单文件 ≤ 500MB
- URL 永久有效（public store）
- 上传后的 URL 可直接用于任何模型的 image_url 参数
- 如果 LangGraph Agent 在服务端（Node.js），用 `BlobUploader` 类；如果在浏览器端，需要用 Blob API 配合文件上传接口
