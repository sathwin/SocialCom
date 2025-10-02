# Quick Start Guide

## Running the App

The development server is already running! Visit:

🌐 **http://localhost:3000**

## Test User

You're logged in as:
- **Name**: Sarah Chen
- **Role**: Regular user with connections and RSVPs
- **Location**: San Francisco

## 5-Minute Tour

### 1. Landing Page (/)
- Scroll through to see animated stats
- Click category pills to filter
- View featured events

### 2. Browse Events (/events)
- Use left sidebar to filter by:
  - Categories
  - Anxiety-friendly options
  - Location radius
- Try the search bar

### 3. Event Detail - Three-Tier Demo
Pick any event and observe:

**Without RSVP:**
- See "3 of your connections are going"
- See attendee mix stats
- Button says "RSVP to see full list"

**After RSVP:**
- Click "RSVP Now"
- Select status (Going/Maybe/Interested)
- Optional: Add a note
- Click "Confirm RSVP"
- **Watch the attendee section transform** to show full grid!

### 4. Dashboard (/dashboard)
- **Upcoming Tab**: See your RSVPd events with countdowns
- **Hosting Tab**: Events you've created (empty by default)
- **Stats Tab**: Your activity metrics
- **Connections Tab**: People you've met

### 5. Create Event (/events/create)
- Fill out the form
- Try the "Generate with AI" button for ice breakers
- Toggle between in-person and virtual
- Click "Publish Event" (mock - won't persist)

### 6. Profile (/profile)
- Click "Edit Profile"
- Change your bio
- Add/remove interests
- Modify privacy settings
- Click "Save Changes"

## Key Interactions to Test

### RSVP Flow
1. Go to any event without RSVP
2. Notice the limited attendee info
3. Click "RSVP Now"
4. Complete the modal
5. Watch attendee section expand!

### Filtering
1. Go to /events
2. Check "Newcomer friendly"
3. Watch events filter in real-time
4. Add a category filter
5. Try the search bar
6. Click "Clear" to reset

### Saving Events
1. Hover over any event card
2. Click the heart icon (top-right)
3. Heart fills red
4. Click again to unsave

### Dashboard Tabs
1. Go to /dashboard
2. Click through all 4 tabs
3. Notice different content in each
4. Try clicking "View Details" on an event

## Mock Data Details

### Events
- 12+ events across 10 categories
- Mix of in-person (Bay Area) and virtual
- Some are almost full to show urgency
- Various dates (2-10 days out)

### Users
- 50 users with realistic bios
- Sarah Chen (you) has 3 connections
- Most users have "show attendance" enabled
- Diverse interests and locations

### Connections
- You're connected to User 2 (Mike Johnson)
- You're connected to User 3 (Alex Rivera)
- You're connected to User 10 (Nina Patel)
- These show up as mutual connections on events

## What's NOT Implemented

Since this is a mock UI:
- No actual authentication (always logged in as Sarah)
- No backend API calls
- No data persistence (refresh resets state)
- No actual file uploads
- No real AI generation
- No email notifications
- No payment processing

## Pages Overview

```
/                     → Landing page
/events              → Browse with filters
/events/[id]         → Event detail (3-tier visibility!)
/events/create       → Create event form
/dashboard           → User dashboard (4 tabs)
/profile             → Profile management
```

## Design Philosophy

Every element is designed to reduce anxiety:
- **Warm colors** (purple/coral vs harsh blues)
- **Soft shadows** (not stark borders)
- **Clear expectations** (badges show structure, noise level)
- **Mutual connections** (social proof)
- **Ice breakers** (conversation help)
- **Flexible cancellation** (low commitment)

## Responsive Behavior

Optimized for desktop (1024px+). Mobile view exists but desktop is recommended for the full experience.

## Need Help?

1. Check the console for any errors
2. Try refreshing if something seems stuck
3. Remember: No data persists between refreshes
4. If server stops: `npm run dev` to restart

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint
```

## Next Steps

1. Explore all pages to see the full experience
2. Try different user flows (RSVP, create, filter)
3. Check out the code structure
4. Read PROJECT_OVERVIEW.md for technical details
5. Customize colors in tailwind.config.ts
6. Add more mock data in lib/mockData.ts

Enjoy exploring! 🎉
