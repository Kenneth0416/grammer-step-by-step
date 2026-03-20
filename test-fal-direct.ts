// 直接测试 FAL AI nano-banana-2 脚本
// 使用方法：npx tsx test-fal-direct.ts

import { fal } from "@fal-ai/client";

async function testDirectFAL() {
  console.log("🧪 直接测试 FAL AI nano-banana-2...\n");

  const apiKey = process.env.FAL_KEY;
  if (!apiKey) {
    console.error("❌ FAL_KEY 未设置!");
    console.error("💡 请在 .env.local 文件中设置: FAL_KEY=your_api_key_here");
    return;
  }

  fal.config({ credentials: apiKey });

  const prompt = `Create a celebratory educational poster for completing an English grammar lesson.

Style: Academic adventure theme, professional yet engaging, vibrant colors, clean typography.

Main Character: A friendly wizard character as the encouraging teacher/guide.

Lesson Topic: "Common & Proper Nouns - 普通名詞與專有名詞"

Design Requirements:
- Vertical poster format (3:4 aspect ratio)
- Character as the main visual focus
- Educational elements
- Celebrating text: "Lesson Complete!"
- Warm brown and gold tones
- Professional illustration style

Mood: Celebratory, motivational, achievement-oriented.`;

  console.log("📤 调用 fal-ai/nano-banana-2...");
  console.log("📝 Prompt:", prompt.substring(0, 100) + "...");

  try {
    const result = await fal.subscribe("fal-ai/nano-banana-2", {
      input: {
        prompt: prompt,
        aspect_ratio: "3:4",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((log) => log.message).forEach((msg) => console.log("  📝", msg));
        }
      },
    });

    console.log("\n✅ 成功!");
    console.log("📷 图片 URL:", result.data.images?.[0]?.url);
    console.log("📐 尺寸:", `${result.data.images?.[0]?.width}x${result.data.images?.[0]?.height}`);
    console.log("🔑 Request ID:", result.requestId);

  } catch (error) {
    console.error("\n❌ 调用失败:", error);
  }
}

testDirectFAL();
