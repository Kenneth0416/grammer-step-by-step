"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PosterCard } from "@/components/PosterCard";
import { Navigation } from "@/components/Navigation";

// Shared Navigation

// Grammar Card Component for Collection
function GrammarCard({
  type,
  title,
  rule,
  example,
  collected,
  onClick
}: {
  type: 'noun' | 'article' | 'plural' | 'countable';
  title: string;
  rule: string;
  example: string;
  collected: boolean;
  onClick?: () => void;
}) {
  const colorMap = {
    noun: { border: 'border-noun-brown', bg: 'bg-noun-brown', text: 'text-noun-brown' },
    article: { border: 'border-article-green', bg: 'bg-article-green', text: 'text-article-green' },
    plural: { border: 'border-plural-blue', bg: 'bg-plural-blue', text: 'text-plural-blue' },
    countable: { border: 'border-countable-purple', bg: 'bg-countable-purple', text: 'text-countable-purple' }
  };

  const colors = colorMap[type];

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 hover:-translate-y-2 ${collected ? '' : 'opacity-40 grayscale'}`}
    >
      <div className={`bg-white rounded-xl border-2 ${colors.border} p-4 shadow-lg h-56 flex flex-col`}>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded text-xs font-display uppercase ${colors.bg}/20 ${colors.text}`}>
            {type}
          </span>
          {collected && <span className="text-achievement-gold text-xl sparkle">★</span>}
        </div>

        {/* Card Title */}
        <h4 className="font-display text-lg font-semibold text-text-primary mb-2">{title}</h4>

        {/* Card Content */}
        <div className="flex-1">
          <p className="font-body text-sm text-text-secondary/70 mb-2">{rule}</p>
          {collected && (
            <div className="mt-auto pt-2 border-t border-text-primary/10">
              <p className="font-body text-sm text-text-secondary/60 italic">"{example}"</p>
            </div>
          )}
        </div>

        {/* Collection Status */}
        <div className="mt-3 pt-2 border-t border-text-primary/10">
          {collected ? (
            <span className="font-display text-xs text-progress-green">✓ Collected</span>
          ) : (
            <span className="font-display text-xs text-text-secondary/40">🔒 Not Collected</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Leaderboard Component
function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'Emma W.', avatar: 'EW', points: 4520, cards: 48, streak: 15 },
    { rank: 2, name: 'David L.', avatar: 'DL', points: 3890, cards: 42, streak: 12 },
    { rank: 3, name: 'Sophie C.', avatar: 'SC', points: 3650, cards: 38, streak: 8 },
    { rank: 4, name: 'James K.', avatar: 'JK', points: 1250, cards: 15, streak: 7, isYou: true },
    { rank: 5, name: 'Olivia M.', avatar: 'OM', points: 1980, cards: 22, streak: 5 },
    { rank: 6, name: 'Lucas T.', avatar: 'LT', points: 1560, cards: 18, streak: 4 },
  ];

  return (
    <div className="glass-card-elevated rounded-lg overflow-hidden">
      <div className="p-6 border-b border-academic-blue/20">
        <h3 className="font-display text-xl font-bold text-text-primary">Leaderboard</h3>
      </div>

      <div className="divide-y divide-academic-blue/10">
        {leaders.map((leader) => (
          <div
            key={leader.rank}
            className={`flex items-center p-4 transition-all hover:bg-bg-secondary ${leader.isYou ? 'bg-academic-blue/10' : ''}`}
          >
            {/* Rank */}
            <div className="w-10 text-center">
              {leader.rank <= 3 ? (
                <span className="text-2xl">
                  {leader.rank === 1 ? '🥇' : leader.rank === 2 ? '🥈' : '🥉'}
                </span>
              ) : (
                <span className="font-display font-bold text-text-secondary/40">#{leader.rank}</span>
              )}
            </div>

            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-sm ${
              leader.isYou
                ? 'bg-gradient-to-br from-progress-green-light to-progress-green text-white'
                : 'bg-gradient-to-br from-achievement-gold-light to-achievement-gold text-text-primary'
            }`}>
              {leader.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 ml-3">
              <div className="flex items-center gap-2">
                <span className="font-body font-semibold text-text-primary">{leader.name}</span>
                {leader.isYou && (
                  <span className="px-2 py-0.5 bg-progress-green/20 text-progress-green text-xs font-display rounded">You</span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-body text-xs text-text-secondary/50">{leader.cards} cards</span>
                <span className="text-xs text-achievement-gold">🔥 {leader.streak} day streak</span>
              </div>
            </div>

            {/* Points */}
            <div className="text-right">
              <div className="font-display font-bold text-achievement-gold">{leader.points.toLocaleString()}</div>
              <div className="font-body text-xs text-text-secondary/40">points</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Achievement Badge Component
function AchievementBadge({
  title,
  description,
  icon,
  unlocked,
  progress,
  total
}: {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
}) {
  return (
    <div className={`relative group ${!unlocked ? 'opacity-50 grayscale' : ''}`}>
      <div className="flex flex-col items-center p-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 transition-all ${
          unlocked
            ? 'bg-gradient-to-br from-achievement-gold to-achievement-gold-dark glow-gold'
            : 'bg-gray-200'
        }`}>
          {unlocked ? icon : '🔒'}
        </div>
        <h4 className="font-display text-sm font-semibold text-text-primary text-center">{title}</h4>
        <p className="font-body text-xs text-text-secondary/60 text-center mt-1">{description}</p>

        {progress !== undefined && total !== undefined && (
          <div className="w-full mt-2">
            <div className="h-1 bg-text-primary/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-achievement-gold-light to-achievement-gold rounded-full"
                style={{ width: `${(progress / total) * 100}%` }}
              />
            </div>
            <span className="font-body text-xs text-text-secondary/40">{progress}/{total}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Character Creator Component
function CharacterCreator() {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [savedAvatar, setSavedAvatar] = useState<string | null>(null);

  const avatars = ['🧙‍♂️', '🧝‍♀️', '🦸‍♂️', '🦹‍♀️', '🧑‍🚀', '🧑‍🎨'];

  // Load saved character
  useEffect(() => {
    const saved = localStorage.getItem('characterAvatar');
    const savedName = localStorage.getItem('characterName');
    if (saved) {
      const index = avatars.indexOf(saved);
      if (index !== -1) setSelectedAvatar(index);
      setSavedAvatar(saved);
    }
    if (savedName) setName(savedName);
  }, []);

  const handleSave = () => {
    const avatar = avatars[selectedAvatar];
    localStorage.setItem('characterAvatar', avatar);
    localStorage.setItem('characterName', name);
    setSavedAvatar(avatar);
    // Trigger event to notify other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="glass-card-elevated rounded-lg p-6">
      <h3 className="font-display text-xl font-bold text-text-primary mb-4">Create Your Explorer</h3>

      <div className="space-y-6">
        {/* Avatar Selection */}
        <div>
          <label className="font-body text-sm text-text-secondary/70 mb-2 block">Choose Your Avatar</label>
          <div className="flex gap-3">
            {avatars.map((avatar, i) => (
              <button
                key={i}
                onClick={() => setSelectedAvatar(i)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
                  selectedAvatar === i
                    ? 'bg-gradient-to-br from-achievement-gold-light to-achievement-gold ring-2 ring-achievement-gold ring-offset-2'
                    : 'bg-bg-secondary hover:bg-academic-blue/20'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label className="font-body text-sm text-text-secondary/70 mb-2 block">Explorer Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full p-3 rounded-lg border-2 border-academic-blue/30 bg-bg-secondary font-body text-text-primary placeholder:text-text-secondary/30 focus:border-academic-blue focus:outline-none transition-colors"
          />
        </div>

        {/* Preview */}
        <div className="p-4 bg-bg-secondary rounded-lg">
          <p className="font-body text-xs text-text-secondary/50 mb-2">Preview</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-achievement-gold-light to-achievement-gold flex items-center justify-center text-xl">
              {avatars[selectedAvatar]}
            </div>
            <div>
              <p className="font-display font-semibold text-text-primary">{name || 'Your Name'}</p>
              <p className="font-body text-xs text-text-secondary/60">Grammar Explorer</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full btn-adventure"
        >
          {savedAvatar ? 'Update Character' : 'Save Character'}
        </button>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({
  icon,
  label,
  value,
  trend,
  trendUp
}: {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <div className="glass-card rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-achievement-gold-light/50 to-achievement-gold/50 flex items-center justify-center text-xl">
          {icon}
        </div>
        <div>
          <p className="font-body text-xs text-text-secondary/50">{label}</p>
          <p className="font-display text-2xl font-bold text-text-primary">{value}</p>
          {trend && (
            <p className={`font-body text-xs ${trendUp ? 'text-progress-green' : 'text-red-500'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Game Page
export default function GamePage() {
  const [activeTab, setActiveTab] = useState<'cards' | 'achievements' | 'leaderboard'>('cards');
  const [userAvatar, setUserAvatar] = useState('🧙‍♂️');

  // Load user avatar
  useEffect(() => {
    const saved = localStorage.getItem('characterAvatar');
    if (saved) setUserAvatar(saved);
  }, []);

  // Course lessons - only the last lesson of each chapter has a card
  // Chapter 1: 1a, 1b, 1c, 1d → only 1d has card
  // Chapter 2: only lesson 2 has card
  const courseLessons = [
    { lessonId: '1d', title: 'Writing Workshop', titleCn: 'Writing Workshop', color: 'writing-pink', collected: true },
    { lessonId: '2', title: 'Articles', titleCn: 'Articles', color: 'article-green', collected: true },
  ];

  const achievements = [
    { title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', unlocked: true },
    { title: 'Card Collector', description: 'Collect 10 grammar cards', icon: '🃏', unlocked: true, progress: 10, total: 10 },
    { title: 'Word Wizard', description: 'Collect 25 grammar cards', icon: '🧙', unlocked: false, progress: 10, total: 25 },
    { title: 'Streak Master', description: '7 day learning streak', icon: '🔥', unlocked: true },
    { title: 'Perfect Score', description: 'Get 100% on a quiz', icon: '💯', unlocked: false },
    { title: 'Grammar Guru', description: 'Complete all lessons', icon: '👑', unlocked: false, progress: 2, total: 6 },
  ];

  const completedCount = courseLessons.filter(l => l.collected).length;

  return (
    <div className="min-h-screen pt-16 pb-20 md:pb-0">
      <Navigation activeRoute="/game" />

      {/* Hero */}
      <section className="hero-bg py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* User Profile */}
            <div className="lg:col-span-1">
              <div className="glass-card-elevated rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-progress-green-light to-progress-green flex items-center justify-center text-4xl">
                    🧙‍♂️
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-text-primary">James K.</h2>
                    <p className="font-body text-text-secondary/60">Grammar Explorer</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-achievement-gold text-sm">★</span>
                      <span className="font-display text-sm text-achievement-gold">Level 5</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-body text-sm text-text-secondary/60">XP to Level 6</span>
                    <span className="font-display text-sm text-achievement-gold">750 / 1000</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '75%' }} />
                  </div>
                </div>

                <CharacterCreator />
              </div>
            </div>

            {/* Stats & Collection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCard icon="★" label="Total Points" value="1,250" trend="+150 this week" trendUp />
                <StatsCard icon="🃏" label="Lessons Completed" value={`${courseLessons.filter(l => l.collected).length}/${courseLessons.length}`} />
                <StatsCard icon="🔥" label="Day Streak" value="7" trend="Best: 12" trendUp />
                <StatsCard icon="⚡" label="Accuracy" value="85%" />
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 border-b border-academic-blue/20">
                {(['cards', 'achievements', 'leaderboard'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-display font-semibold transition-colors ${
                      activeTab === tab
                        ? 'text-academic-blue border-b-2 border-academic-blue'
                        : 'text-text-secondary/50 hover:text-text-primary'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'cards' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {courseLessons
                    .filter((lesson) => lesson.collected)
                    .map((lesson) => (
                      <PosterCard
                        key={lesson.lessonId}
                        lessonId={lesson.lessonId}
                        lessonTitle={lesson.title}
                        lessonTitleCn={lesson.titleCn}
                        characterAvatar={userAvatar}
                        lessonColor={lesson.color}
                        collected={lesson.collected}
                      />
                    ))}
                  {courseLessons.filter((lesson) => lesson.collected).length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <p className="font-body text-lg text-text-secondary/60">
                        No cards collected yet. Complete lessons to collect cards!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {achievements.map((achievement, i) => (
                    <AchievementBadge key={i} {...achievement} />
                  ))}
                </div>
              )}

              {activeTab === 'leaderboard' && (
                <Leaderboard />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Daily Challenges */}
      <section className="py-16 px-4 gradient-adventure">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">Daily Challenges</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">📝</span>
                <span className="px-3 py-1 bg-progress-green/20 text-progress-green font-display text-sm rounded">+20 pts</span>
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-2">Complete 5 Quizzes</h3>
              <div className="progress-bar mb-2">
                <div className="progress-bar-fill" style={{ width: '60%' }} />
              </div>
              <span className="font-body text-xs text-text-secondary/50">3/5 completed</span>
            </div>

            <div className="glass-card rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">🃏</span>
                <span className="px-3 py-1 bg-academic-blue/20 text-academic-blue font-display text-sm rounded">+30 pts</span>
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-2">Collect 2 New Cards</h3>
              <div className="progress-bar mb-2">
                <div className="progress-bar-fill" style={{ width: '50%' }} />
              </div>
              <span className="font-body text-xs text-text-secondary/50">1/2 collected</span>
            </div>

            <div className="glass-card rounded-lg p-6 opacity-60">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">🎯</span>
                <span className="px-3 py-1 bg-plural-blue/20 text-plural-blue font-display text-sm rounded">+50 pts</span>
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-2">Perfect Score Challenge</h3>
              <div className="flex items-center gap-2">
                <span className="text-text-secondary/40">🔒</span>
                <span className="font-body text-xs text-text-secondary/50">Unlock at Level 6</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}