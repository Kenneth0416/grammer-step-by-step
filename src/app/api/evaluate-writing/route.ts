import { NextRequest, NextResponse } from 'next/server';

type LessonContext = {
  level?: string;
  title?: string;
  requirements?: string[];
};

type EvaluateWritingBody = {
  writingContent?: unknown;
  lessonContext?: unknown;
};

const RATE_LIMIT_WINDOW_MS = 10_000;
const RATE_LIMIT_MAX = 10;
const rateLimitStore = new Map<string, number[]>();
let apiKeyIndex = 0;

const EVALUATION_SYSTEM_PROMPT = `你是一位专业的英语语法评分老师。根据学生的写作内容，从以下四个维度进行评估：
1. Singular/Plural forms (单复数形式)
2. Countable/Uncountable nouns (可数不可数名词)
3. Articles (冠词 a/an/the)
4. Sentence structure (句子结构)

评分标准（Level 1-5）：
- Level 5 (Excellent Control): 完美运用所有语法点，几乎无错误
- Level 4 (Good Control): 基本正确，偶有小错误但不影响理解
- Level 3 (Fair Control): 有明显错误但基本意思清楚
- Level 2 (Limited Control): 频繁错误，影响理解
- Level 1 (Minimal Control): 基本无法正确运用语法点

请返回 JSON 格式的评估结果，包含：
{
  "level": 数字(1-5),
  "score": "Level X - 描述",
  "strengths": ["优点1", "优点2"],
  "improvements": ["改进建议1", "改进建议2"],
  "detailedFeedback": "详细的综合评语段落",
  "grammarAnalysis": {
    "singularPlural": "单复数使用的具体评价",
    "countableUncountable": "可数不可数使用的具体评价",
    "articles": "冠词使用的具体评价",
    "sentenceStructure": "句子结构的具体评价"
  }
}`;

class ApiError extends Error {
  public readonly status: number;
  public readonly details?: string;

  constructor(message: string, status: number, details?: string) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

/**
 * Extract client IP address for rate limiting.
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

/**
 * Enforce in-memory rate limits per IP.
 */
function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const timestamps = rateLimitStore.get(ip) || [];
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = timestamps.filter((t) => t > windowStart);
  recent.push(now);
  rateLimitStore.set(ip, recent);

  if (recent.length > RATE_LIMIT_MAX) {
    const oldest = Math.min(...recent);
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - oldest);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }

  return { allowed: true };
}

/**
 * Validate writing content length and type.
 */
function validateWritingContent(value: unknown): string {
  if (typeof value !== 'string') {
    throw new ApiError('Invalid request: writingContent must be a string.', 400);
  }
  const trimmed = value.trim();
  if (trimmed.length < 10 || trimmed.length > 2000) {
    throw new ApiError(
      'Invalid request: writingContent length must be between 10 and 2000 characters.',
      400,
      `Received length: ${trimmed.length}.`
    );
  }
  return value;
}

/**
 * Validate lesson context fields and types.
 */
function validateLessonContext(value: unknown): LessonContext {
  if (value === undefined || value === null) {
    return {};
  }
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new ApiError('Invalid request: lessonContext must be an object.', 400);
  }

  const lessonContext = value as LessonContext;
  const { level, title, requirements } = lessonContext;

  if (level !== undefined) {
    if (typeof level !== 'string' || level.trim().length === 0 || level.length > 20) {
      throw new ApiError('Invalid request: lessonContext.level must be a non-empty string (max 20 chars).', 400);
    }
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0 || title.length > 100) {
      throw new ApiError('Invalid request: lessonContext.title must be a non-empty string (max 100 chars).', 400);
    }
  }

  if (requirements !== undefined) {
    if (!Array.isArray(requirements) || requirements.length > 10) {
      throw new ApiError('Invalid request: lessonContext.requirements must be an array of up to 10 strings.', 400);
    }
    for (const req of requirements) {
      if (typeof req !== 'string' || req.trim().length === 0 || req.length > 200) {
        throw new ApiError('Invalid request: each requirement must be a non-empty string (max 200 chars).', 400);
      }
    }
  }

  return { level, title, requirements };
}

/**
 * Rotate DeepSeek API keys to distribute requests.
 */
function getNextApiKey(): string {
  const keys = [
    process.env.DEEPSEEK_API_KEY_1,
    process.env.DEEPSEEK_API_KEY_2,
    process.env.DEEPSEEK_API_KEY_3,
    process.env.DEEPSEEK_API_KEY,
  ].filter((key): key is string => Boolean(key));

  if (keys.length === 0) {
    throw new ApiError('Server configuration error: DeepSeek API key is missing.', 500);
  }

  apiKeyIndex = (apiKeyIndex + 1) % keys.length;
  return keys[apiKeyIndex];
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests.',
          details: `Rate limit exceeded. Please wait ${rateLimit.retryAfterSeconds}s and try again.`
        },
        {
          status: 429,
          headers: rateLimit.retryAfterSeconds
            ? { 'Retry-After': String(rateLimit.retryAfterSeconds) }
            : undefined
        }
      );
    }

    let body: EvaluateWritingBody;
    try {
      body = (await request.json()) as EvaluateWritingBody;
    } catch {
      throw new ApiError('Invalid request: JSON body is required.', 400);
    }

    const writingContent = validateWritingContent(body.writingContent);
    const lessonContext = validateLessonContext(body.lessonContext);

    const userPrompt = `课程信息：
- Level: ${lessonContext?.level || '1D'}
- Title: ${lessonContext?.title || 'Writing Workshop'}
- 写作要求：
${lessonContext?.requirements?.map((r: string, i: number) => `${i + 1}. ${r}`).join('\n') || '无具体要求'}

学生写作内容：
${writingContent}

请根据评分标准对这篇写作进行评估，返回 JSON 格式的结果。`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getNextApiKey()}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: EVALUATION_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      console.error('DeepSeek API error:', response.status, response.statusText, await response.text());
      throw new ApiError(
        `AI service error (status ${response.status}).`,
        502,
        'Please try again later.'
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new ApiError('AI service returned an empty response.', 502);
    }

    // Parse the JSON response
    let evaluationResult;
    try {
      evaluationResult = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse evaluation result:', content);
      throw new ApiError('AI service returned invalid JSON.', 502);
    }

    // Validate the result structure
    if (typeof evaluationResult.level !== 'number' ||
        !evaluationResult.score ||
        !Array.isArray(evaluationResult.strengths) ||
        !Array.isArray(evaluationResult.improvements)) {
      throw new ApiError('AI service returned an unexpected response format.', 502);
    }

    return NextResponse.json(evaluationResult);

  } catch (error) {
    const apiError = error as ApiError;
    if (apiError instanceof ApiError) {
      return NextResponse.json(
        { error: apiError.message, details: apiError.details },
        { status: apiError.status }
      );
    }

    console.error('Evaluation API error:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate writing.', details: 'Unexpected server error.' },
      { status: 500 }
    );
  }
}
