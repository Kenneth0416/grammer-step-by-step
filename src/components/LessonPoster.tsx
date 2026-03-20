"use client";

import { useState, useEffect, useRef } from "react";

interface PosterProps {
  characterAvatar: string;
  lessonId: string;
  lessonTitle: string;
  lessonTitleCn: string;
  lessonColor: string;
  lessonDescription: string;
  writingContent?: string;
  onPosterGenerated?: (imageUrl: string) => void;
}

export function LessonPoster({
  characterAvatar,
  lessonId,
  lessonTitle,
  lessonTitleCn,
  lessonColor,
  lessonDescription,
  writingContent = "",
  onPosterGenerated,
}: PosterProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const isAllowedPosterUrl = (value: unknown): boolean => {
    if (typeof value !== "string") return false;
    try {
      const parsed = new URL(value);
      return (
        parsed.protocol === "https:" &&
        parsed.hostname.endsWith(".fal.media")
      );
    } catch {
      return false;
    }
  };

  const parsePosterCache = (
    raw: string
  ): { url: string; timestamp: number } | null => {
    if (!raw) return null;

    if (raw.startsWith("{")) {
      try {
        const parsed = JSON.parse(raw) as {
          url?: unknown;
          timestamp?: unknown;
        };
        if (
          typeof parsed.url !== "string" ||
          typeof parsed.timestamp !== "number"
        )
          return null;
        if (!isAllowedPosterUrl(parsed.url)) return null;
        if (!Number.isFinite(parsed.timestamp) || parsed.timestamp <= 0)
          return null;
        return { url: parsed.url, timestamp: parsed.timestamp };
      } catch {
        return null;
      }
    }

    if (isAllowedPosterUrl(raw)) {
      return { url: raw, timestamp: 0 };
    }
    return null;
  };

  const generatePoster = async (signal: AbortSignal) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-poster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal,
        body: JSON.stringify({
          characterAvatar,
          lessonTitle: `${lessonTitle} - ${lessonTitleCn}`,
          lessonColor,
          lessonDescription,
          writingContent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate poster");
      }

      if (
        typeof data.imageUrl !== "string" ||
        !isAllowedPosterUrl(data.imageUrl)
      ) {
        throw new Error("Poster URL is invalid or untrusted.");
      }

      // Don't update state if this request was aborted
      if (signal.aborted) return;

      setPosterUrl(data.imageUrl);
      localStorage.setItem(
        `poster_${lessonId}`,
        JSON.stringify({ url: data.imageUrl, timestamp: Date.now() })
      );
      onPosterGenerated?.(data.imageUrl);
    } catch (err) {
      // Silently ignore aborted requests
      if (signal.aborted) return;

      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate poster";
      console.error("Poster generation failed:", errorMessage);
      setError(errorMessage);
    } finally {
      if (!signal.aborted) {
        setIsGenerating(false);
      }
    }
  };

  // Single effect: check cache or generate. AbortController scoped to this effect.
  useEffect(() => {
    const cachedData = localStorage.getItem(`poster_${lessonId}`);
    if (cachedData) {
      const parsed = parsePosterCache(cachedData);
      if (parsed && parsed.timestamp > 0) {
        const cacheAge = Date.now() - parsed.timestamp;
        if (cacheAge < 5 * 60 * 1000) {
          setPosterUrl(parsed.url);
          onPosterGenerated?.(parsed.url);
          return; // Fresh cache, no cleanup needed
        }
      }
      localStorage.removeItem(`poster_${lessonId}`);
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    generatePoster(controller.signal);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  const handleRetry = () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    generatePoster(controller.signal);
  };

  // Color mapping
  const colorMap: Record<string, string> = {
    noun: "from-amber-600 to-amber-800",
    article: "from-emerald-600 to-emerald-800",
    plural: "from-blue-600 to-blue-800",
    countable: "from-purple-600 to-purple-800",
    default: "from-academic-blue to-academic-blue-dark",
  };

  const gradientClass = colorMap[lessonColor] || colorMap.default;

  if (isGenerating) {
    return (
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-primary border-2 border-academic-blue/20">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 border-4 border-academic-blue border-t-transparent rounded-full animate-spin" />
          <div className="text-center">
            <p className="text-lg font-semibold text-text-primary">
              Generating Your Poster
            </p>
            <p className="text-sm text-text-secondary">
              Creating your celebration poster...
            </p>
          </div>
          <div className="text-4xl animate-pulse">{characterAvatar}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-primary border-2 border-academic-blue/20">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
          <div className="text-4xl">⚠️</div>
          <p className="text-center text-text-primary font-semibold">
            Poster Generation Failed
          </p>
          <p className="text-center text-sm text-text-secondary">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-academic-blue text-white rounded-full hover:bg-academic-blue-dark transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (posterUrl) {
    return (
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-academic-blue/30 shadow-xl glow-card">
        <img
          src={posterUrl}
          alt={`${lessonTitle} poster`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-achievement-gold to-amber-600 flex items-center justify-center shadow-lg border-2 border-white/50">
          <span className="text-xl">✨</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{characterAvatar}</span>
            <span className="text-white font-bold text-lg truncate">
              {lessonTitle}
            </span>
          </div>
          <p className="text-white/80 text-sm">{lessonTitleCn}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br ${gradientClass} border-2 border-white/20 shadow-xl`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
        <div className="text-6xl">{characterAvatar}</div>
        <div className="text-center">
          <p className="text-white font-bold text-xl mb-1">{lessonTitle}</p>
          <p className="text-white/90 text-lg">{lessonTitleCn}</p>
        </div>
        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
          <span className="text-white font-medium">Lesson Complete!</span>
        </div>
      </div>
    </div>
  );
}
