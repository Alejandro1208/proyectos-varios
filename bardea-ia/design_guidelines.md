# BardeaIA Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern social media and communication apps like WhatsApp, Telegram, and Twitter for their clean, conversational interfaces that prioritize readability and quick interactions.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Light mode: 6 85% 45% (vibrant blue)
- Dark mode: 220 25% 15% (dark navy background)

**Accent Colors:**
- Success/Copy: 142 70% 45% (green)
- Warning: 25 85% 55% (orange)
- Text primary: 220 15% 95% (light gray for dark mode)
- Text secondary: 220 10% 70% (muted gray)

**Gradients:**
- Hero background: Subtle gradient from primary blue to deeper navy
- Card backgrounds: Soft gradient overlays for response cards

### Typography
**Font Families:**
- Primary: Inter (Google Fonts) - clean, modern sans-serif
- Secondary: JetBrains Mono for code/technical elements if needed

**Hierarchy:**
- Headings: Bold weights (600-700)
- Body text: Regular (400) and medium (500)
- Accent text: Medium (500) with color distinction

### Layout System
**Spacing Units:** Tailwind units of 3, 4, 6, and 8 (p-3, m-4, gap-6, h-8)
- Consistent 4-unit base for most spacing
- 3-unit for tight spacing within components
- 6-unit for section separation
- 8-unit for major layout divisions

### Component Library

**Core Components:**
- Input fields: Rounded corners (rounded-lg), subtle shadows, focus states with primary color
- Tone selector: Pill-shaped buttons with emoji icons, active state with primary background
- Response cards: Clean white/dark cards with subtle borders, copy button in top-right
- Navigation: Bottom tab bar for mobile, clean icons with labels

**Forms:**
- Large touch targets (min 44px)
- Clear visual feedback for interactions
- Floating labels or clear placeholder text

**Data Displays:**
- Response cards with generous padding
- Clear typography hierarchy
- Subtle dividers between responses

### Mobile-First Approach
- Touch-friendly interface with generous tap targets
- Swipe gestures for navigation between screens
- Fast loading with skeleton states
- Progressive enhancement for desktop

### Animations
**Minimal and Purposeful:**
- Subtle fade-ins for generated responses
- Smooth transitions between screens (300ms)
- Loading states with gentle pulsing animations
- Copy confirmation with brief success feedback

## Images
**No large hero image needed** - this is a utility-focused mobile app prioritizing function over visual storytelling. Focus on clean iconography and emoji integration within the tone selector interface.

**Icon Usage:**
- Heroicons for navigation and interface elements
- Native emoji for tone indicators (🔥 😏 😂 🤓)
- Copy icons for response cards

## Key Design Principles
1. **Conversational Flow**: Interface should feel like a natural extension of messaging apps
2. **Speed and Efficiency**: Quick input, fast generation, instant copying
3. **Argentine Context**: Subtle cultural touches without overwhelming the clean interface
4. **Accessibility**: High contrast ratios, clear touch targets, screen reader friendly