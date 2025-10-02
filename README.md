# SocialCom - Anxiety-Friendly Social Events Platform

A beautiful, fully functional mock UI for a social events platform designed to reduce social anxiety and foster genuine connections.

## 🎯 Features

### Core Features
- **Landing Page** with animated hero, search, featured events, and stats
- **Browse Events** with advanced filtering (categories, anxiety-friendly options, location)
- **Event Detail** with **three-tier attendee visibility**:
  - Not logged in: See only attendee count
  - Logged in (no RSVP): See mutual connections & attendee mix
  - RSVP'd: See full attendee list with profiles
- **Create Event** with comprehensive form validation
- **Dashboard** with 4 tabs: Upcoming, Hosting, Stats, Connections
- **Profile Page** with editable fields and privacy settings

### Design Highlights
- 🎨 Warm gradient backgrounds with soft shadows
- ✨ Smooth micro-animations with Framer Motion
- 🏷️ Beautiful badge system for event properties
- 📱 Responsive design (desktop-optimized, min 1024px)
- ♿ Accessible with proper ARIA labels and focus states

### Anxiety-Friendly Features
- Filter by noise level (quiet/moderate/lively)
- Filter by structure (structured/casual/mixed)
- Newcomer-friendly badges
- Ice breaker conversation starters
- Mutual connection visibility
- Clear event expectations upfront

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at **http://localhost:3000**

## 📁 Project Structure

```
/app
  /page.tsx                 # Landing page
  /events
    /page.tsx              # Browse events with filters
    /[id]/page.tsx         # Event detail (3-tier visibility)
    /create/page.tsx       # Create event form
  /dashboard/page.tsx      # User dashboard
  /profile/page.tsx        # Profile management
  /layout.tsx              # Root layout with navbar

/components
  /events
    /EventCard.tsx         # Reusable event card
    /EventFilters.tsx      # Filter sidebar
    /RSVPModal.tsx         # RSVP modal with status selection
  /ui                      # Base UI components (button, badge, input)
  /layout
    /Navbar.tsx            # Navigation bar

/lib
  /mockData.ts             # 50+ users, 12+ events, RSVPs, connections
  /utils.ts                # Helper functions (date formatting, etc.)

/store
  /useAppStore.ts          # Zustand global state

/types
  /index.ts                # TypeScript interfaces
```

## 🎭 Mock Data

The app includes realistic mock data:
- **50 users** with varied profiles, interests, and bios
- **12 events** across 10 categories
- **RSVPs** and **connections** pre-populated
- Current user: Sarah Chen (user-1)

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366f1 to #8b5cf6)
- **Secondary**: Coral (#fb7185)
- **Success**: Green (#10b981)
- **Background**: Warm gradient (slate-50 to white)

### Components
- Rounded corners: `rounded-xl` (cards), `rounded-lg` (buttons)
- Shadows: Soft, layered (`shadow-sm`, `shadow-md`)
- Hover states: Subtle scale (`hover:scale-102`) + color shifts
- Focus states: Ring with primary color

## 🔥 Key Features Explained

### Three-Tier Attendee Visibility

**State A: Not Logged In**
- Only see total attendee count
- Prompted to login to see more

**State B: Logged In (No RSVP)**
- See mutual connections attending
- See attendee mix (first-timers vs regulars)
- Prompted to RSVP to see full list

**State C: RSVP'd**
- Full attendee grid with avatars
- Bios and interests for each attendee
- Respects privacy settings (only shows users who opted in)

### State Management (Zustand)

Global state includes:
- Authentication (isLoggedIn, currentUser)
- Events & RSVPs
- Saved events
- Filters
- Connections

All state updates are instant (no backend) for smooth UX.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Dates**: date-fns

## 📝 Environment

This is a **mock UI with NO backend**. All data is stored in:
- `/lib/mockData.ts` - Static mock data
- Zustand store - Runtime state

Changes are not persisted between page refreshes.

## 🎯 Success Criteria

✅ All 6 pages fully functional
✅ Smooth page navigation
✅ RSVP flow works end-to-end
✅ Filters update UI with visual feedback
✅ Three-tier attendee visibility implemented
✅ Create event form with validation
✅ Dashboard shows user's events + stats
✅ Profile editing updates state
✅ Responsive design (desktop 1024px+)
✅ Polished animations & interactions
✅ No console errors
✅ Clean, maintainable code

## 🌟 Design Philosophy

**Warm & Inviting**: Soft gradients, rounded corners, friendly micro-interactions
**Trust Signals First**: Show mutual connections, verified badges, safety indicators
**Progressive Disclosure**: Don't overwhelm - reveal details as users engage
**Clear Expectations**: Visual badges for anxiety-friendly features

## 📄 License

This is a demo project. Feel free to use as reference or template.

---

Built with 🤍 by Claude Code
