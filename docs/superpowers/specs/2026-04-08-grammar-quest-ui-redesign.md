# Grammar Quest - UI/UX Redesign Specification

**Date:** 2026-04-08
**Status:** Approved
**Style:** Light & Fresh / Playful Modern

---

## 1. Design Direction

### Target Audience
- **Primary:** K12 students (ages 6-18)
- **Secondary:** Adult learners

### Design Philosophy
Light, fresh, and playful — inspired by the Grammai Pen logo palette. Clean layouts with soft colors that feel approachable for young learners while maintaining professionalism.

### Visual Style
- **Overall:** Light & Fresh with Playful Modern accents
- **Background:** Warm cream gradient (#FDFDFC → #F5FAFD)
- **Cards:** White with subtle colored borders
- **Corners:** 14-18px rounded corners
- **Shadows:** Subtle, color-tinted (very light)

---

## 2. Color System

### Brand Colors (from Logo)
| Name | Hex | Usage |
|------|-----|-------|
| Primary Gold | #FCC30A | CTAs, highlights, active states |
| Deep Navy | #22497C | Headings, authoritative text |
| Cyan Blue | #33CAF5 | Secondary accents, links |
| Coral Red | #FC5B5B | Emphasis, alerts |
| Success Green | #10B981 | Correct answers, completion |

### Light Tint Palette (for backgrounds)
| Name | Hex | Usage |
|------|-----|-------|
| Gold Tint | #FEF9C3 | Gold card backgrounds |
| Cyan Tint | #E0F2FE | Blue card backgrounds |
| Coral Tint | #FCE7F3 | Red card backgrounds |
| Green Tint | #DCFCE7 | Green card backgrounds |
| Navy Tint | #EFF6FF | Navy card backgrounds |

### Neutral Colors
| Name | Hex | Usage |
|------|-----|-------|
| Background | #FDFDFC | Page background |
| Surface | #FFFFFF | Card surfaces |
| Text Primary | #1E293B | Body text |
| Text Secondary | #64748B | Muted text |
| Border | #E2E8F0 | Card borders |
| Disabled | #F1F5F9 | Disabled states |

---

## 3. Typography

### Font Stack
```
Primary Font: 'Nunito', system-ui, sans-serif
Chinese Fallback: 'Noto Sans SC', sans-serif
```

### Type Scale
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| H1 | 24-28px | 700 | #22497C |
| H2 | 18-20px | 600 | #22497C |
| H3 | 15-16px | 600 | #1E293B |
| Body | 13-14px | 400 | #64748B |
| Caption | 11-12px | 400 | #64748B |
| Button | 14-15px | 600 | varies |

---

## 4. Component Specifications

### 4.1 Cards

**Standard Card**
```css
background: white;
border-radius: 16px;
padding: 20px;
border: 1px solid #E2E8F0;
```

**Course Card (with tint)**
```css
background: white;
border-radius: 16px;
padding: 18-20px;
border: 1px solid [tint-color];
/* e.g., #DCFCE7 for green, #FEF9C3 for gold */
```

**Course Letter Badge**
```css
width: 44-56px;
height: 44-56px;
background: [tint-color];
border-radius: 12-14px;
display: flex;
align-items: center;
justify-content: center;
font-weight: 700;
font-size: 18-24px;
color: [accent-color];
```

### 4.2 Buttons

**Primary CTA (Gold Gradient)**
```css
background: linear-gradient(135deg, #FCC30A, #E6A800);
color: #1E293B;
border-radius: 50px; /* pill shape */
padding: 14px 28px;
font-weight: 600;
font-size: 14px;
border: none;
```

**Secondary (Outline)**
```css
background: white;
color: #22497C;
border: 1px solid #E2E8F0;
border-radius: 50px;
padding: 10px 20px;
font-weight: 500;
font-size: 13px;
```

### 4.3 Navigation

**Tab Navigation**
```css
/* Tab Container */
background: white;
border-radius: 14px;
padding: 4px;
border: 1px solid #E2E8F0;

/* Tab Item */
padding: 10px 12px;
border-radius: 10px;
margin: 2px;
font-size: 11px;

/* States */
Completed: background: #DCFCE7; color: #10B981;
Active: background: #FCC30A; color: white;
Upcoming: background: #F8FAFC; color: #94A3B8;
```

**Progress Stepper**
```css
/* Step Circle */
width: 28-32px;
height: 28-32px;
border-radius: 50%;

/* Connector Line */
height: 3px;
background: linear-gradient for progress;
```

### 4.4 Form Elements

**Quiz Option Card**
```css
/* Default */
background: white;
border: 2px solid #E2E8F0;
border-radius: 14px;
padding: 16px;

/* Selected/Correct */
background: #DCFCE7;
border-color: #10B981;

/* Letter Badge */
width: 36px;
height: 36px;
background: white;
border-radius: 10px;
```

### 4.5 Badges & Status

**Status Pill**
```css
padding: 5-8px 12-14px;
border-radius: 20px;
font-size: 11-12px;
font-weight: 600;

/* Variants */
Complete: background: #DCFCE7; color: #10B981;
In Progress: background: #FEF9C3; color: #D97706;
Locked: background: #F8FAFC; color: #94A3B8; border: dashed;
```

**Points Badge**
```css
background: #FEF9C3;
color: #D97706;
padding: 4px 10px;
border-radius: 12px;
font-size: 12px;
font-weight: 600;
```

---

## 5. Page Layouts

### 5.1 Homepage

```
┌─────────────────────────────────────┐
│ Logo      Nav Links      Avatar     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Hero Card (Gold Gradient) │   │
│  │  "Master English Grammar"   │   │
│  │  [Start Learning →]        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────┐  ┌─────┐  ┌─────┐       │
│  │ 280 │  │  12 │  │ #5  │       │
│  │Points│  │Badge│  │Rank │       │
│  └─────┘  └─────┘  └─────┘       │
│                                     │
│  My Courses                         │
│  ┌─────────────────────────────┐   │
│  │ [A] Nouns Basics     ✓ Done │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ [B] Singular & Plural →     │   │
│  │ ▓▓▓▓▓▓░░░░ 67%            │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ [C] Countable...      🔒    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ✏️ AI Grammar Tutor         │   │
│  │ "What is a noun?"           │   │
│  │ [Chat with AI Tutor →]      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 5.2 Course List

```
┌─────────────────────────────────────┐
│ ← Back        All Courses   Filter │
├─────────────────────────────────────┤
│ [All] [Nouns] [Verbs] [Adj]        │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ [A]  Nouns Basics       ✓     │ │
│ │      6 units · +60 pts         │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [B]  Singular & Plural  →      │ │
│ │      ▓▓▓▓▓░░░░░ 4/6          │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [C]  Countable...        🔒   │ │
│ │      Coming soon                │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 5.3 Course Detail

```
┌─────────────────────────────────────┐
│ ← Back              2 / 6 Progress │
├─────────────────────────────────────┤
│ [A]  Nouns Basics                  │
│       6 units                      │
├─────────────────────────────────────┤
│ ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐ │
│ │ ✓ ││ 2 ││ 3 ││ 4 ││ 5 ││ 6 │ │
│ │ ✓ ││ → ││   ││   ││   ││   │ │
│ └───┘└───┘└───┘└───┘└───┘└───┘ │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Unit 2: Presentation    +10pts │ │
│ │                                │ │
│ │ "Learn about four types..."    │ │
│ │                                │ │
│ │ ┌────────┐ ┌────────┐        │ │
│ │ │👤      │ │📍      │        │ │
│ │ │People  │ │Places  │        │ │
│ │ │teacher │ │school  │        │ │
│ │ └────────┘ └────────┘        │ │
│ │ ┌────────┐ ┌────────┐        │ │
│ │ │📦      │ │💡      │        │ │
│ │ │Things  │ │Ideas   │        │ │
│ │ └────────┘ └────────┘        │ │
│ │                                │ │
│ │ [ Start Unit → ]              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ✏️ AI Tutor         [Chat →]  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 5.4 AI Tutor Chat

```
┌─────────────────────────────────────┐
│ ←     ✏️ AI Tutor  Online  [Nouns] │
├─────────────────────────────────────┤
│                                     │
│  ✏️  Hi! I'm your AI grammar tutor  │
│      Ask me anything!               │
│                                     │
│              "What is a noun?" →   │
│                                     │
│  ✏️  A noun names a person,         │
│      place, thing, or idea.        │
│                                     │
│  ┌────────┐ ┌────────┐             │
│  │👤      │ │📍      │             │
│  │People  │ │Places  │             │
│  └────────┘ └────────┘             │
│                                     │
│  [Give me more examples →]          │
│                                     │
├─────────────────────────────────────┤
│ [ Ask about grammar...      → ]     │
└─────────────────────────────────────┘
```

### 5.5 Quiz Page

```
┌─────────────────────────────────────┐
│ Exit              3 / 5 ▓▓▓▓░░░░░  │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Multiple Choice         +10pts │ │
│ │                                │ │
│ │ Which word is a noun?          │ │
│ │                                │ │
│ │ ┌────────────────────────────┐ │ │
│ │ │ [A] teacher           ✓ │ │ │
│ │ └────────────────────────────┘ │ │
│ │ ┌────────────────────────────┐ │ │
│ │ │ [B] run                  │ │ │
│ │ └────────────────────────────┘ │ │
│ │ ┌────────────────────────────┐ │ │
│ │ │ [C] happy                │ │ │
│ │ └────────────────────────────┘ │ │
│ │ ┌────────────────────────────┐ │ │
│ │ │ [D] quickly              │ │ │
│ │ └────────────────────────────┘ │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🎉 Correct! +10 points        │ │
│ │ "Teacher" names a person.      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [ Next Question → ]                 │
└─────────────────────────────────────┘
```

---

## 6. Gamification System

### Points System
| Action | Points |
|--------|--------|
| Complete unit quiz | +10 |
| Score 80%+ on quiz | +5 bonus |
| Complete all units in course | +50 |
| First login of the day | +2 |

### Badge System
| Badge | Description |
|-------|-------------|
| 🏅 "Noun Novice" | Complete Nouns Basics |
| 🏅 "Verb Victor" | Complete Verbs unit |
| 🏅 "Grammar Master" | Complete all courses |
| ⭐ "Perfect Score" | 100% on any quiz |
| ⭐ "100 Questions" | Answer 100 questions |
| ⭐ "First Steps" | Complete first unit |

---

## 7. Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| < 640px | Single column, full-width cards |
| 640-1024px | 2-column grid for courses |
| > 1024px | 3-column grid, sidebar navigation |

---

## 8. Animation Guidelines

| Animation | Duration | Easing |
|-----------|----------|--------|
| Page transitions | 300ms | ease-out |
| Button hover | 200ms | ease |
| Card hover | 250ms | ease |
| Progress bar | 500ms | ease-in-out |
| Celebration | 400ms | spring |

---

## 9. Accessibility

- Minimum touch target: 44x44px
- Color contrast ratio: 4.5:1 minimum
- Focus indicators on all interactive elements
- Screen reader labels for icons and buttons
- Reduced motion support via `prefers-reduced-motion`
