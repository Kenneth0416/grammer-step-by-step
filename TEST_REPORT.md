# FAL AI Nano Banana 2 - Poster API 测试报告

## 测试结果

### ✅ API 调用成功

**测试时间**: 2026-03-02
**模型**: `fal-ai/nano-banana-2`
**Request ID**: `6119c724-51cf-4009-b40a-93734350e331`

---

## 测试请求

```json
POST /api/generate-poster

{
  "characterAvatar": "🧙‍♂️",
  "lessonTitle": "Common Nouns",
  "lessonTitleCn": "普通名詞",
  "lessonColor": "noun-brown",
  "lessonDescription": "Learn nouns"
}
```

## 测试响应

```json
{
  "success": true,
  "imageUrl": "https://v3b.fal.media/files/b/0a907371/XtOvKn7Bpr_rg_i_KQIZy_FAfdbSx0.png",
  "width": null,
  "height": null,
  "requestId": "6119c724-51cf-4009-b40a-93734350e331"
}
```

---

## 生成图片信息

| 属性 | 值 |
|------|-----|
| URL | https://v3b.fal.media/files/b/0a907371/XtOvKn7Bpr_rg_i_KQIZy_FAfdbSx0.png |
| 格式 | PNG |
| 尺寸 | 896 x 1200 像素 |
| 比例 | 3:4 (Portrait) |
| 颜色 | 8-bit RGB |

---

## 设置步骤

### 1. 环境变量配置

`.env.local` 文件已配置：
```bash
FAL_KEY=b3a71645-6390-4468-94d8-9cc31ed1ea94:8b4d19e584ecaa86b31b55a9b9315ca7
```

### 2. API 端点

- **路由**: `/api/generate-poster`
- **方法**: POST
- **模型**: `fal-ai/nano-banana-2`

### 3. 支持的参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| characterAvatar | string | ✓ | 角色 Emoji (🧙‍♂️🧝‍♀️🦸‍♂️🦹‍♀️🧑‍🚀🧑‍🎨) |
| lessonTitle | string | ✓ | 课程标题（英文） |
| lessonTitleCn | string | ✗ | 课程标题（中文） |
| lessonColor | string | ✗ | 颜色主题 (noun-brown/article-green/plural-blue/countable-purple) |
| lessonDescription | string | ✗ | 课程描述 |

---

## 使用方法

### 在浏览器中测试

```javascript
const response = await fetch('/api/generate-poster', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    characterAvatar: '🧙‍♂️',
    lessonTitle: 'Common & Proper Nouns',
    lessonTitleCn: '普通名詞與專有名詞',
    lessonColor: 'noun-brown',
    lessonDescription: 'Learn the difference'
  })
});

const data = await response.json();
console.log('Generated Poster:', data.imageUrl);
```

### 在组件中使用

```tsx
// 课程完成时调用
const handleLessonComplete = async () => {
  const response = await fetch('/api/generate-poster', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      characterAvatar: userAvatar,
      lessonTitle: lesson.title,
      lessonTitleCn: lesson.titleCn,
      lessonColor: lesson.color,
      lessonDescription: lesson.description
    })
  });

  const { imageUrl } = await response.json();
  setPosterUrl(imageUrl);
  // 存储到 localStorage 供卡片使用
  localStorage.setItem(`poster_${lessonId}`, imageUrl);
};
```

---

## 支持的角色

| Emoji | 说明 | 参考图片 |
|-------|------|----------|
| 🧙‍♂️ | 法师 | nano-banana-edit-input.png |
| 🧝‍♀️ | 精灵 | nano-banana-edit-input-2.png |
| 🦸‍♂️ | 超级英雄 | nano-banana-edit-input.png |
| 🦹‍♀️ | 反派角色 | nano-banana-edit-input-2.png |
| 🧑‍🚀 | 宇航员 | nano-banana-edit-input.png |
| 🧑‍🎨 | 艺术家 | nano-banana-edit-input-2.png |

---

## 课程颜色主题

| 课程类型 | 颜色变量 | 色调描述 |
|---------|---------|----------|
| 名词 | noun-brown | warm brown and gold tones |
| 冠词 | article-green | fresh green and emerald tones |
| 复数 | plural-blue | bright blue and sky tones |
| 可数性 | countable-purple | rich purple and violet tones |

---

## 文件列表

| 文件 | 说明 |
|------|------|
| `src/app/api/generate-poster/route.ts` | API 端点 |
| `src/components/LessonPoster.tsx` | Poster 展示组件 |
| `src/components/PosterCard.tsx` | 收藏卡片组件 |
| `.env.local` | 环境变量配置 |

---

## 下一步

1. ✅ API 设置完成
2. ✅ 测试调用成功
3. ⏭️ 在课程完成页面集成
4. ⏭️ 在收藏卡片页面展示

---

## 相关链接

- [FAL AI Documentation](https://fal.ai/docs)
- [Nano Banana 2 Model](https://fal.ai/models/fal-ai/nano-banana-2)
- [FAL Client Library](https://www.npmjs.com/package/@fal-ai/client)
