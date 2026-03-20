import Link from "next/link";

// Navigation Component
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-elevated border-b border-academic-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-academic-blue to-academic-blue-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="font-display text-lg text-white">GQ</span>
            </div>
            <span className="font-display text-lg font-semibold text-text-primary hidden sm:block group-hover:text-academic-blue transition-colors">
              Grammar Quest
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="nav-link active">Home</Link>
            <Link href="/grammar" className="nav-link">Grammar</Link>
            <Link href="/practice" className="nav-link">Practice</Link>
            <Link href="/game" className="nav-link">Game</Link>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            <div className="points-display hover-glow cursor-pointer">
              <span className="text-white">★</span>
              <span>1,250</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-academic-blue to-sky-light flex items-center justify-center text-white font-display text-sm cursor-pointer hover:scale-105 transition-transform shadow-md">
              JK
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Cards - Modern Style */}
        <div
          className="absolute top-32 left-10 w-16 h-24 glass-card rounded-lg border border-noun-brown/30 shadow-lg transform rotate-[-15deg] float"
          style={{ '--rotation': '-15deg' } as React.CSSProperties}
        />
        <div
          className="absolute top-48 right-20 w-16 h-24 glass-card rounded-lg border border-article-green/30 shadow-lg transform rotate-[12deg] float"
          style={{ '--rotation': '12deg' } as React.CSSProperties}
        />
        <div
          className="absolute bottom-40 left-1/4 w-16 h-24 glass-card rounded-lg border border-plural-blue/30 shadow-lg transform rotate-[8deg] float"
          style={{ '--rotation': '8deg' } as React.CSSProperties}
        />
        <div
          className="absolute bottom-32 right-1/4 w-16 h-24 glass-card rounded-lg border border-countable-purple/30 shadow-lg transform rotate-[-10deg] float"
          style={{ '--rotation': '-10deg' } as React.CSSProperties}
        />

        {/* Compass - Modern Gold */}
        <div className="absolute bottom-20 right-10 compass hidden lg:flex">
          <div className="compass-direction" />
        </div>

        {/* Animated Particles */}
        <div className="particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Title Badge - Modern Style */}
        <div className="inline-block mb-6">
          <span className="px-6 py-2.5 bg-academic-blue/10 rounded-full font-display text-sm text-academic-blue border border-academic-blue/30 backdrop-blur-sm">
            English Grammar Adventure Game
          </span>
        </div>

        {/* Main Title with Gradient */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="text-gradient">Grammar Quest</span>
        </h1>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-secondary mb-8">
          Adventure in Grammar
        </h2>

        {/* Subtitle */}
        <p className="font-body text-xl text-text-secondary/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Embark on an epic journey through the magical world of English grammar.
          Collect cards, conquer challenges, and become a Grammar Explorer!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/grammar" className="btn-adventure inline-flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Start Adventure
          </Link>
          <Link href="/practice" className="btn-secondary inline-flex items-center justify-center gap-2">
            Practice Mode
          </Link>
        </div>

        {/* Stats - Modern Colors */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-gradient-gold">3</div>
            <div className="font-body text-sm text-text-secondary/60">Stages</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-progress-green">50+</div>
            <div className="font-body text-sm text-text-secondary/60">Cards</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-sky-light">∞</div>
            <div className="font-body text-sm text-text-secondary/60">Adventures</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-academic-blue" fill="currentColor">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </div>
    </section>
  );
}

// Feature Cards
function FeatureCard({
  title,
  subtitle,
  description,
  icon,
  gradient,
  href
}: {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="glass-card-elevated p-6 rounded-xl h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-academic-blue/5">
        <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
          {icon}
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary mb-1">{title}</h3>
        <p className="font-display text-sm text-text-secondary mb-3">{subtitle}</p>
        <p className="font-body text-text-secondary/70">{description}</p>
      </div>
    </Link>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 px-4 gradient-adventure">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Three Realms to <span className="text-gradient">Explore</span>
          </h2>
          <p className="font-body text-lg text-text-secondary/70 max-w-2xl mx-auto">
            Master English grammar through adventure and discovery
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Noun Kingdom"
            subtitle="Noun Kingdom"
            description="Discover the foundations of English nouns. Learn about common, proper, countable, and uncountable nouns."
            icon={<span className="text-2xl">👑</span>}
            gradient="bg-gradient-to-br from-amber-100 to-amber-200"
            href="/grammar"
          />
          <FeatureCard
            title="Article Forest"
            subtitle="Article Forest"
            description="Navigate through a, an, and the. Understand when to use each article in your sentences."
            icon={<span className="text-2xl">🌲</span>}
            gradient="bg-gradient-to-br from-emerald-100 to-emerald-200"
            href="/grammar"
          />
          <FeatureCard
            title="Plural Mountains"
            subtitle="Plural Mountains"
            description="Climb the peaks of plural forms. Master regular and irregular plural transformations."
            icon={<span className="text-2xl">⛰️</span>}
            gradient="bg-gradient-to-br from-blue-100 to-blue-200"
            href="/grammar"
          />
        </div>
      </div>
    </section>
  );
}

// Card Preview Section
function CardPreview() {
  const cards = [
    { type: 'noun', title: 'Common Noun', example: 'dog, cat, book', gradient: 'from-amber-50 to-amber-100', border: 'border-amber-400' },
    { type: 'article', title: 'Indefinite Article', example: 'a, an', gradient: 'from-emerald-50 to-emerald-100', border: 'border-emerald-400' },
    { type: 'plural', title: 'Regular Plural', example: 'cat → cats', gradient: 'from-blue-50 to-blue-100', border: 'border-blue-400' },
    { type: 'countable', title: 'Countable', example: 'apple, car, idea', gradient: 'from-purple-50 to-purple-100', border: 'border-purple-400' },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Collect <span className="text-gradient-gold">Grammar Cards</span>
          </h2>
          <p className="font-body text-lg text-text-secondary/70">
            Build your collection as you learn
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`grammar-card bg-gradient-to-br ${card.gradient} rounded-xl border-2 ${card.border} p-4 shadow-lg cursor-pointer h-52 glow-card`}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-display uppercase tracking-wider text-text-secondary/50">{card.type}</span>
                  <h4 className="font-display text-lg font-semibold text-text-primary mt-1">{card.title}</h4>
                </div>
                <div className="font-body text-text-secondary/70 text-sm">
                  <span className="font-semibold">Example:</span> {card.example}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-achievement-gold text-xl badge-pulse">★</span>
                  <span className="text-xs font-display text-text-secondary/50">Collected</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/game" className="btn-adventure inline-flex items-center gap-2">
            View All Cards
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Leaderboard Preview
function LeaderboardSection() {
  const leaders = [
    { rank: 1, name: 'Emma W.', points: 4520, badge: 'gold' },
    { rank: 2, name: 'David L.', points: 3890, badge: 'silver' },
    { rank: 3, name: 'Sophie C.', points: 3650, badge: 'bronze' },
    { rank: 4, name: 'James K.', points: 2100, badge: '' },
    { rank: 5, name: 'Olivia M.', points: 1980, badge: '' },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card-elevated rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Top <span className="text-gradient-gold">Explorers</span>
            </h2>
            <Link href="/game" className="font-display text-sm text-academic-blue hover:text-academic-blue-dark transition-colors flex items-center gap-1">
              View All
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </Link>
          </div>

          <div className="space-y-2">
            {leaders.map((leader) => (
              <div key={leader.rank} className={`leaderboard-item rounded-lg ${leader.badge}`}>
                <div className="w-8 text-center font-display font-bold text-text-primary/60">
                  {leader.rank <= 3 ? (
                    <span className="text-lg">
                      {leader.rank === 1 ? '🥇' : leader.rank === 2 ? '🥈' : '🥉'}
                    </span>
                  ) : leader.rank}
                </div>
                <div className="flex-1 ml-4">
                  <span className="font-body font-semibold text-text-primary">{leader.name}</span>
                </div>
                <div className="font-display font-semibold text-achievement-gold">
                  {leader.points.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-academic-blue/10 bg-bg-secondary">
      <div className="max-w-6xl mx-auto text-center">
        <div className="font-display text-lg font-semibold text-text-primary mb-2">
          Grammar Quest
        </div>
        <p className="font-body text-sm text-text-secondary/60">
          English Grammar Step-by-Step Learning Adventure
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-academic-blue animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-sky-light animate-pulse" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 rounded-full bg-achievement-gold animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CardPreview />
        <LeaderboardSection />
      </main>
      <Footer />
    </div>
  );
}
