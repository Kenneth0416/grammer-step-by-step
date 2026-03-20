"use client";

interface VideoUnitProps {
  unit: {
    id: string;
    title: string;
    titleCn: string;
    videoUrl?: string;
    videoDuration?: string;
    content?: {
      explanation: string;
    };
  };
}

export function VideoUnit({ unit }: VideoUnitProps) {
  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = unit.videoUrl ? getYouTubeId(unit.videoUrl) : null;

  return (
    <div className="glass-card-elevated rounded-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-light to-academic-blue flex items-center justify-center">
          <span className="text-lg">🎬</span>
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold text-text-primary">{unit.title}</h3>
          <p className="font-body text-sm text-text-secondary/60">{unit.titleCn}</p>
        </div>
      </div>

      {unit.content?.explanation && (
        <div className="bg-bg-secondary rounded-lg p-4 mb-4">
          <p className="font-body text-text-primary leading-relaxed">{unit.content.explanation}</p>
        </div>
      )}

      {videoId ? (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={unit.title}
          />
        </div>
      ) : (
        <div className="aspect-video rounded-lg bg-bg-secondary flex items-center justify-center">
          <p className="text-text-secondary/60">Video URL not available</p>
        </div>
      )}

      {unit.videoDuration && (
        <div className="mt-3 flex items-center gap-2 text-sm text-text-secondary/70">
          <span>⏱️</span>
          <span className="font-body">Duration: {unit.videoDuration}</span>
        </div>
      )}
    </div>
  );
}
