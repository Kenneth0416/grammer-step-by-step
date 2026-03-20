// 测试 nano-banana-2 API 脚本
// 使用方法：npx tsx test-poster-api.ts

async function testPosterAPI() {
  console.log("🧪 测试 FAL AI nano-banana-2 Poster API...\n");

  const testData = {
    characterAvatar: "🧙‍♂️",
    lessonTitle: "Common & Proper Nouns - 普通名詞與專有名詞",
    lessonTitleCn: "普通名詞與專有名詞",
    lessonColor: "noun-brown",
    lessonDescription: "Learn the difference between common nouns and proper nouns.",
  };

  try {
    console.log("📤 发送请求到 /api/generate-poster");
    console.log("请求数据:", JSON.stringify(testData, null, 2));

    const response = await fetch("http://localhost:3000/api/generate-poster", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${data.error || "Unknown error"}`);
    }

    console.log("\n✅ 成功生成 Poster!");
    console.log("📷 图片 URL:", data.imageUrl);
    console.log("📐 尺寸:", `${data.width}x${data.height}`);
    console.log("🔑 Request ID:", data.requestId);
    console.log("\n🌐 在浏览器中打开图片:", data.imageUrl);

  } catch (error) {
    console.error("\n❌ 测试失败:", error);
    if (error instanceof Error && error.message.includes("FAL_KEY")) {
      console.error("\n💡 请设置 .env.local 文件:");
      console.error("   FAL_KEY=your_fal_ai_api_key_here");
    }
  }
}

// 运行测试
testPosterAPI();
