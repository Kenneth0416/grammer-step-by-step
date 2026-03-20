# 课后 Celebratory Poster 生成系统

## 功能概述

在每个课程完成后，系统会自动生成一张专属的庆祝海报（poster），这张海报：
- 使用 **FAL AI Nano Banana** 模型生成
- 结合用户选择的角色外观（avatar）和课程内容
- 作为完成页面的鼓励元素
- 同时作为收藏卡片的封面图片
- 比例与卡片一致（3:4）

## 文件结构

```
src/
├── app/
│   ├── api/
│   │   └── generate-poster/
│   │       └── route.ts          # Poster 生成 API 端点
│   └── grammar/
│       └── [id]/
│           └── page.tsx          # 课程详情页（已集成 poster 展示）
├── components/
│   ├── LessonPoster.tsx          # 课程完成 Poster 组件
│   └── PosterCard.tsx            # 使用 poster 作为封面的收藏卡片
└── data/
    └── lessons.ts                # 课程数据
```

## 设置步骤

### 1. 获取 FAL AI API Key

1. 访问 [FAL AI](https://fal.ai) 并注册账号
2. 在 Dashboard 中获取 API Key
3. 复制 `.env.local.example` 为 `.env.local`

### 2. 设置环境变量

```bash
# 在项目根目录创建 .env.local 文件
FAL_KEY=your_fal_ai_api_key_here
```

### 3. 安装依赖

```bash
npm install @fal-ai/client
```

## 技术实现

### API 端点 (`/api/generate-poster`)

```typescript
POST /api/generate-poster

Body:
{
  characterAvatar: string;      // 用户选择的角色，如 '🧙‍♂️'
  lessonTitle: string;           // 课程标题
  lessonColor: string;           // 课程颜色主题
  lessonDescription: string;     // 课程描述
}

Response:
{
  success: boolean;
  imageUrl: string;              // 生成的图片 URL
  width: number;
  height: number;
}
```

### Poster 生成流程

1. **用户在课程中选择角色** → 存储在 localStorage
2. **完成课程 Quiz** → 触发 lessonComplete 状态
3. **自动调用 API** → 使用 nano-banana 生成 poster
4. **显示加载状态** → 带动画的 loading UI
5. **展示生成的海报** → 带有课程信息和下载链接
6. **存储到 localStorage** → 供收藏卡片使用

### Poster Card 组件

```tsx
<PosterCard
  lessonId="1a"
  lessonTitle="Common & Proper Nouns"
  lessonTitleCn="普通名詞與專有名詞"
  characterAvatar="🧙‍♂️"
  lessonColor="noun-brown"
  collected={true}
/>
```

## Prompt 设计

生成的 poster prompt 包含：

- **风格**：Academic adventure theme, professional yet engaging
- **主角**：用户选择的角色 avatar
- **主题**：课程标题和描述
- **颜色**：与课程主题色协调
- **格式**：Vertical 3:4 aspect ratio
- **文字**：鼓励性语句如 "Lesson Complete!"

## 颜色映射

| 课程类型 | 颜色变量 | 渐变 |
|---------|---------|------|
| noun | noun-brown | amber-600 → amber-800 |
| article | article-green | emerald-600 → emerald-800 |
| plural | plural-blue | blue-600 → blue-800 |
| countable | countable-purple | purple-600 → purple-800 |

## 使用方法

### 在课程完成页面显示

```tsx
// 在 lesson detail page 中
{lessonComplete && (
  <LessonPoster
    characterAvatar={characterAvatar}
    lessonId={lessonId}
    lessonTitle={lesson.title}
    lessonTitleCn={lesson.titleCn}
    lessonColor={lesson.color}
    lessonDescription={lesson.description}
    onPosterGenerated={handlePosterGenerated}
  />
)}
```

### 在收藏页面显示

```tsx
// 在 game page 卡片网格中
<PosterCard
  lessonId={lesson.id}
  lessonTitle={lesson.title}
  lessonTitleCn={lesson.titleCn}
  characterAvatar={avatar}
  lessonColor={lesson.color}
  collected={isCollected}
/>
```

## 错误处理

- **API Key 缺失** → 抛出明确错误信息
- **生成失败** → 显示重试按钮
- **网络超时** → 显示错误信息和建议

## 性能优化

1. **缓存机制**：生成的 poster 存储在 localStorage
2. **懒加载**：只有用户访问完成页面时才生成
3. **图片优化**：使用 FAL CDN 的优化图片

## 后续优化建议

1. **服务端缓存**：将生成的 poster 存储到服务端存储
2. **批量生成**：为所有课程预生成 poster
3. **自定义选项**：允许用户选择 poster 风格
4. **社交分享**：添加分享按钮到社交媒体

## API 参考

- [FAL AI Documentation](https://fal.ai/docs)
- [Nano Banana Model](https://fal.ai/models/fal-ai/nano-banana)
- [Client Library](https://www.npmjs.com/package/@fal-ai/client)
