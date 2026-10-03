import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import fs from "fs";
import path from "path";

// 防止 DeepSeek 响应慢时被 Vercel 网关超时断开
export const maxDuration = 60;

// 模块初始化时读取 AI 知识库（Edge Runtime 不支持 fs，必须保持 Node.js Runtime）
const knowledge = fs.readFileSync(
  path.join(process.cwd(), "public", "ai", "ai-knowledge.md"),
  "utf-8"
);

// DeepSeek 兼容 OpenAI /chat/completions 接口
const deepseek = createOpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: deepseek("deepseek-chat"),
      system: `你是「韩老师的品牌站」网站的 AI 客服，负责解答访客关于网站主人的问题。
请遵守以下规则：
1. 用友好、热情、简洁的中文回答，一般不超过 200 字。
2. 只依据下方知识库的内容回答，不要编造知识库里没有的信息。
3. 如果访客的问题超出知识库范围，礼貌说明你暂时无法回答，并建议对方通过网站底部「留下你的评价」表单留言联系。
4. 回答中提到图书时，可以直接附上购买链接。

以下是网站知识库：
${knowledge}`,
      messages,
    });

    // 数据流响应：前端用 useChat 逐字接收，形成打字机效果
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("AI 客服接口出错：", error);
    return Response.json(
      { error: "AI 客服暂时不可用，请稍后再试" },
      { status: 500 }
    );
  }
}
