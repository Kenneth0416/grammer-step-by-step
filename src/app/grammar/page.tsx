"use client";

import Link from "next/link";
import { useState } from "react";
import { lessons, getLessonProgress } from "@/data/lessons";

// Shared Navigation
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-elevated border-b border-academic-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-academic-blue to-academic-blue-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="font-display text-lg text-white">GQ</span>
            </div>
            <span className="font-display text-lg font-semibold text-text-primary hidden sm:block group-hover:text-academic-blue transition-colors">Grammar Quest</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/grammar" className="nav-link active">Grammar</Link>
            <Link href="/practice" className="nav-link">Practice</Link>
            <Link href="/game" className="nav-link">Game</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="points-display hover-glow cursor-pointer">
              <span className="text-white">★</span>
              <span>1,250</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-academic-blue to-sky-light flex items-center justify-center text-white font-display text-sm cursor-pointer hover:scale-105 transition-transform shadow-md">JK</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Lesson Card Component
function LessonCard({
  id,
  level,
  title,
  subtitle,
  description,
  status,
  color,
  cards,
  progress
}: {
  id: string;
  level: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'locked' | 'unlocked' | 'completed';
  color: string;
  cards: number;
  progress: number;
}) {
  const CardContent = (
    <div className="glass-card-elevated rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <div className={`h-2 ${color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="font-display text-sm text-text-secondary/50">{level}</span>
            <h3 className="font-display text-xl font-semibold text-text-primary">{title}</h3>
            <p className="font-display text-sm text-achievement-gold">{subtitle}</p>
          </div>
          <div className={`stage-marker ${status} w-12 h-12 text-base`}>
            {status === 'completed' ? '✓' : status === 'locked' ? '🔒' : level.split('.')[1] || level}
          </div>
        </div>

        <p className="font-body text-text-secondary/70 mb-4">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-achievement-gold">★</span>
            <span className="font-body text-sm text-text-secondary/70">{cards} Cards to Collect</span>
          </div>
          <span className="font-display text-sm text-achievement-gold">{progress}%</span>
        </div>

        <div className="progress-bar mb-4">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <button
          className={`w-full py-3 rounded-lg font-display font-semibold transition-all text-center ${
            status === 'locked'
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-academic-blue to-academic-blue-dark text-white hover:shadow-md'
          }`}
        >
          {status === 'completed' ? 'Review Lesson' : status === 'locked' ? 'Locked' : 'Start Learning'}
        </button>
      </div>
    </div>
  );

  if (status === 'locked') {
    return CardContent;
  }

  return (
    <Link href={`/grammar/${id}`}>
      {CardContent}
    </Link>
  );
}

// Grammar Card Component
function GrammarCard({
  type,
  title,
  rule,
  examples,
  collected
}: {
  type: 'noun' | 'article' | 'plural' | 'countable';
  title: string;
  rule: string;
  examples: string[];
  collected: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  const colorMap = {
    noun: 'border-noun-brown',
    article: 'border-article-green',
    plural: 'border-plural-blue',
    countable: 'border-countable-purple'
  };

  return (
    <div
      className={`grammar-card cursor-pointer ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`grammar-card-inner relative w-full h-64 border-2 ${colorMap[type]} rounded-xl bg-white shadow-lg`}>
        {/* Front */}
        <div className="grammar-card-front p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-display uppercase tracking-wider text-text-secondary/50">{type} card</span>
              {collected && <span className="text-achievement-gold text-xl">★</span>}
            </div>
            <h4 className="font-display text-xl font-semibold text-text-primary">{title}</h4>
          </div>
          <div className="text-center text-text-secondary/40 font-body text-sm">
            Click to flip
          </div>
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded text-xs font-display ${type === 'noun' ? 'bg-noun-brown/20 text-noun-brown' : type === 'article' ? 'bg-article-green/20 text-article-green' : type === 'plural' ? 'bg-plural-blue/20 text-plural-blue' : 'bg-countable-purple/20 text-countable-purple'}`}>
              {type}
            </span>
          </div>
        </div>

        {/* Back */}
        <div className="grammar-card-back p-5 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl">
          <div className="font-body text-sm text-text-primary mb-3">
            <span className="font-semibold">Rule:</span> {rule}
          </div>
          <div className="font-body text-sm text-text-secondary/80">
            <span className="font-semibold">Examples:</span>
            <ul className="mt-1 space-y-1">
              {examples.map((ex, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-academic-blue">•</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Knowledge Tree Node
function TreeNode({
  title,
  subtitle,
  status,
  position,
  onClick
}: {
  title: string;
  subtitle: string;
  status: 'locked' | 'unlocked' | 'completed' | 'current';
  position: { x: number; y: number };
  onClick?: () => void;
}) {
  return (
    <div
      className="absolute cursor-pointer group"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      onClick={onClick}
    >
      <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
        status === 'locked'
          ? 'bg-gray-300 text-gray-500'
          : status === 'completed'
          ? 'bg-gradient-to-br from-progress-green-light to-progress-green text-white glow-green'
          : status === 'current'
          ? 'bg-gradient-to-br from-achievement-gold-light to-achievement-gold text-text-primary glow-gold animate-pulse'
          : 'bg-white border-2 border-academic-blue/30 text-text-primary hover:scale-110'
      }`}>
        {status === 'completed' ? (
          <span className="text-2xl">✓</span>
        ) : status === 'locked' ? (
          <span className="text-xl">🔒</span>
        ) : (
          <>
            <span className="font-display text-xs">{title}</span>
          </>
        )}
      </div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap text-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="font-display text-sm font-semibold text-text-primary">{title}</span>
        <p className="font-body text-xs text-text-secondary/60">{subtitle}</p>
      </div>
    </div>
  );
}

// Main Grammar Page
export default function GrammarPage() {
  // Get lessons from data and calculate status based on progress
  const lessonsWithStatus = lessons.map((lesson) => {
    const progress = getLessonProgress(lesson.id);
    let status: 'locked' | 'unlocked' | 'completed' = 'locked';
    if (progress === 100) status = 'completed';
    else if (progress > 0 || lesson.id === '1a' || lesson.id === '1b' || lesson.id === '1c') status = 'unlocked';

    return {
      id: lesson.id,
      level: lesson.level,
      title: lesson.title,
      subtitle: lesson.titleCn,
      description: lesson.description,
      status,
      color: `bg-${lesson.color}`,
      cards: lesson.cards,
      progress
    };
  });

  const sampleCards = [
    { type: 'noun' as const, title: 'Common Noun', rule: 'Names general people, places, or things.', examples: ['The dog is sleeping.', 'I live in a city.'], collected: true },
    { type: 'noun' as const, title: 'Proper Noun', rule: 'Names specific people, places, or things. Always capitalize.', examples: ['Mary lives in Paris.', 'I love Christmas.'], collected: true },
    { type: 'article' as const, title: 'Indefinite Article: A', rule: 'Use "a" before consonant sounds.', examples: ['a dog', 'a university', 'a big apple'], collected: false },
    { type: 'article' as const, title: 'Indefinite Article: An', rule: 'Use "an" before vowel sounds.', examples: ['an apple', 'an hour', 'an interesting book'], collected: false },
    { type: 'plural' as const, title: 'Regular Plural', rule: 'Add -s or -es to make most nouns plural.', examples: ['cat → cats', 'box → boxes', 'baby → babies'], collected: false },
    { type: 'countable' as const, title: 'Uncountable Noun', rule: 'Cannot be counted individually. No plural form.', examples: ['water', 'rice', 'information', 'advice'], collected: false },
  ];

  return (
    <div className="min-h-screen pt-16 pb-20 md:pb-0">
      <Navigation />

      {/* Hero */}
      <section className="hero-bg py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Grammar Library
          </h1>
          <p className="font-body text-xl text-text-secondary/70 mb-8">
            Explore lessons, collect cards, and master English grammar
          </p>

          {/* Progress Overview */}
          <div className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-progress-green">2</div>
              <div className="font-body text-xs text-text-secondary/60">Completed</div>
            </div>
            <div className="w-px h-8 bg-academic-blue/30" />
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-achievement-gold">1</div>
              <div className="font-body text-xs text-text-secondary/60">In Progress</div>
            </div>
            <div className="w-px h-8 bg-academic-blue/30" />
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-sky-light">3</div>
              <div className="font-body text-xs text-text-secondary/60">Locked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-text-primary">Learning Path</h2>
            <span className="font-body text-text-secondary/60">4 Lessons</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {lessonsWithStatus.map((lesson, i) => (
              <LessonCard key={i} {...lesson} />
            ))}
          </div>
        </div>
      </section>

      {/* Card Collection Preview */}
      <section className="py-16 px-4 gradient-adventure">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-text-primary">Card Collection</h2>
              <p className="font-body text-text-secondary/60">Click cards to flip and learn</p>
            </div>
            <Link href="/game" className="font-display text-sm text-academic-blue hover:text-academic-blue-dark transition-colors">
              View All Cards →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sampleCards.map((card, i) => (
              <GrammarCard key={i} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Map */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-text-primary text-center mb-8">Knowledge Map</h2>

          <div className="relative h-96 glass-card-elevated rounded-lg overflow-hidden">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="20%" y1="30%" x2="40%" y2="50%" stroke="#4F46E5" strokeWidth="2" fill="none" />
              <line x1="40%" y1="50%" x2="60%" y2="30%" stroke="#4F46E5" strokeWidth="2" fill="none" />
              <line x1="60%" y1="30%" x2="80%" y2="50%" stroke="#4F46E5" strokeWidth="2" fill="none" />
              <line x1="40%" y1="50%" x2="60%" y2="70%" stroke="#4F46E5" strokeWidth="2" fill="none" />
            </svg>

            {/* Nodes */}
            <TreeNode title="Nouns" subtitle="Level 1A" status="completed" position={{ x: 15, y: 25 }} />
            <TreeNode title="Plural" subtitle="Level 1B" status="current" position={{ x: 35, y: 45 }} />
            <TreeNode title="Countable" subtitle="Level 1C" status="unlocked" position={{ x: 55, y: 25 }} />
            <TreeNode title="Articles" subtitle="Level 2" status="locked" position={{ x: 75, y: 45 }} />
            <TreeNode title="Practice" subtitle="Review" status="unlocked" position={{ x: 55, y: 65 }} />
          </div>
        </div>
      </section>
    </div>
  );
}