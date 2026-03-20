import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

// Set up FAL AI client - check at runtime
function getFalClient() {
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) {
    throw new Error("FAL_KEY is not set in environment variables. Please add your API key to .env.local");
  }
  fal.config({
    credentials: apiKey,
  });
  return fal;
}

// Character emoji to image URL mapping
const characterImageMap: Record<string, string> = {
  "🧙‍♂️": "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input.png",
  "🧝‍♀️": "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input-2.png",
  "🦸‍♂️": "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input.png",
  "🦹‍♀️": "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input-2.png",
  "🧑‍🚀": "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input.png",
  "🧑‍🎨": "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input-2.png",
};

// Lesson type to color description mapping
const colorDescriptions: Record<string, string> = {
  "noun-brown": "warm brown and gold tones",
  "article-green": "fresh green and emerald tones",
  "plural-blue": "bright blue and sky tones",
  "countable-purple": "rich purple and violet tones",
  "writing-pink": "warm pink and rose gold tones",
};

export async function POST(request: Request) {
  try {
    const fal = getFalClient();
    const { characterAvatar, lessonTitle, lessonTitleCn, lessonColor, lessonDescription, writingContent } =
      await request.json();

    if (!characterAvatar || !lessonTitle) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Get character reference image
    const characterImageUrl = characterImageMap[characterAvatar];

    // Get color description
    const colorDesc = colorDescriptions[lessonColor] || "academic blue and gold tones";

    // Build prompt - English only for image generation
    const prompt = `Create a celebratory educational poster for completing an English grammar lesson.
${writingContent ? `\nStudent's Writing Content: "${writingContent}"\n\nDisplay the student's writing prominently on the poster as a showcase of their achievement.` : ""}

Style: Academic adventure theme, professional yet engaging, vibrant colors, clean typography, educational app aesthetic.

Main Character: A friendly ${characterAvatar} character as the encouraging teacher guide, celebrating the student achievement.

Lesson Topic: ${lessonTitle}
${writingContent ? `\nFeatured Student Writing: "${writingContent}"\nMake the writing content a central visual element of the poster.` : ""}

Design Requirements:
- Vertical poster format, 3:4 aspect ratio
- Character as the main visual focus, friendly and encouraging
- Educational elements related to English grammar learning
- Large celebrating text: "Lesson Complete!" or "Congratulations!"
- Warm inviting colors with ${colorDesc}
${writingContent ? `- Feature the student's writing content prominently in the poster design\n- Show writing elements like paper, notebook, or scroll with the text displayed` : ""}
- Professional illustration style, suitable for educational mobile app
- High contrast, eye-catching design that motivates students
- Clean layout with space for lesson title
- No Chinese characters, English text only

Mood: Celebratory, motivational, achievement-oriented, encouraging learning journey.

Make it visually appealing to students and perfect for a learning achievement card cover.`;

    // Build image_urls array
    const imageUrls: string[] = [];
    if (characterImageUrl) {
      imageUrls.push(characterImageUrl);
    }

    // Generate using nano-banana-2
    const result = await fal.subscribe("fal-ai/nano-banana-2", {
      input: {
        prompt: prompt,
        aspect_ratio: "3:4",
        ...(imageUrls.length > 0 && { image_urls: imageUrls }),
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((log) => log.message).forEach(console.log);
        }
      },
    });

    console.log("Poster generated:", result.data);

    return NextResponse.json({
      success: true,
      imageUrl: result.data.images?.[0]?.url,
      width: result.data.images?.[0]?.width,
      height: result.data.images?.[0]?.height,
      requestId: result.requestId,
    });
  } catch (error) {
    console.error("Error generating poster:", error);
    return NextResponse.json(
      {
        error: "Failed to generate poster",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
