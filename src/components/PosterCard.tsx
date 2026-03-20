"use client";

import { useState, useEffect } from "react";

interface PosterCardProps {
  lessonId: string;
  lessonTitle: string;
  lessonTitleCn: string;
  characterAvatar: string;
  lessonColor: string;
  collected?: boolean;
  onClick?: () => void;
}

export function PosterCard({
  lessonId,
  lessonTitle,
  lessonTitleCn,
  characterAvatar,
  lessonColor,
  collected = false,
  onClick,
}: PosterCardProps) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get saved poster from localStorage
    const savedPoster = localStorage.getItem(`poster_${lessonId}`);
    if (savedPoster) {
      setPosterUrl(savedPoster);
      setIsLoading(false);
    } else if (collected) {
      // Regenerate if collected but no poster exists
      generatePoster();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, collected]);

  const generatePoster = async () => {
    try {
      const response = await fetch("/api/generate-poster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          characterAvatar,
          lessonTitle: `${lessonTitle} - ${lessonTitleCn}`,
          lessonColor,
          lessonDescription: "",
        }),
      });

      const data = await response.json();
      if (data.imageUrl) {
        setPosterUrl(data.imageUrl);
        localStorage.setItem(`poster_${lessonId}`, data.imageUrl);
      }
    } catch (error) {
      console.error("Failed to generate poster:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Color mapping
  const colorMap: Record<string, string> = {
    "noun-brown": "from-amber-600 to-amber-800",
    "article-green": "from-emerald-600 to-emerald-800",
    "plural-blue": "from-blue-600 to-blue-800",
    "countable-purple": "from-purple-600 to-purple-800",
    "writing-pink": "from-pink-600 to-pink-800",
    default: "from-academic-blue to-academic-blue-dark",
  };

  const gradientClass = colorMap[lessonColor] || colorMap.default;

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        collected ? "" : "opacity-40 grayscale"
      }`}
    >
      <div className="bg-white rounded-xl border-2 border-gold-primary/30 p-3 shadow-lg h-64 flex flex-col overflow-hidden">
        {/* Poster Image Area */}
        <div className="relative flex-1 rounded-lg overflow-hidden mb-3">
          {isLoading ? (
            <div
              className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2 animate-pulse">
                  {characterAvatar}
                </div>
                <div className="text-white/80 text-xs">Generating...</div>
              </div>
            </div>
          ) : posterUrl ? (
            <>
              <img
                src={posterUrl}
                alt={`${lessonTitle} poster`}
                className="w-full h-full object-cover"
              />
              {/* Overlay - show lock when not collected */}
              {!collected && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-4xl">🔒</span>
                </div>
              )}
            </>
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{characterAvatar}</div>
                <div className="text-white/80 text-xs font-display">
                  {lessonTitle}
                </div>
              </div>
            </div>
          )}

          {/* Collection Status Badge */}
          {collected && posterUrl && (
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-gold-medal to-gold-dark flex items-center justify-center shadow-lg border-2 border-white/50">
              <span className="text-white text-sm">★</span>
            </div>
          )}
        </div>

        {/* Card Info Area */}
        <div className="text-center">
          <h4 className="font-display text-sm font-semibold text-ink-brown truncate">
            {lessonTitle}
          </h4>
          <p className="font-body text-xs text-ink-brown/60 truncate">
            {lessonTitleCn}
          </p>
        </div>

        {/* Collection Status */}
        <div className="mt-2 pt-2 border-t border-ink-brown/10 text-center">
          {collected ? (
            <span className="font-display text-xs text-forest-green">
              ✓ Collected
            </span>
          ) : (
            <span className="font-display text-xs text-ink-brown/40">
              🔒 Not Collected
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
