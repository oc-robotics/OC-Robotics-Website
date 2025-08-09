# Google Calendar Setup for Static Site

## Overview
Your static site is now configured to fetch calendar data at build time using the Google Calendar API. The calendar data is fetched during the build process and embedded into the static pages.

## Current Setup Status
✅ **API Key Configured**: `AIzaSyDlaT861NsxtTyr7Mx2jAnB5BGgWsyRm9I`
✅ **Build Configuration**: Static export enabled
✅ **Calendar Fetching**: Enabled at build time
❌ **Calendar Access**: Currently trying to access 'primary' which is private

## Next Steps

### Option 1: Create a Public Calendar (Recommended)

1. **Create a new Google Calendar**:
   - Go to [Google Calendar](https://calendar.google.com)
   - Click the "+" next to "Other calendars"
   - Select "Create new calendar"
   - Name it something like "OC Robotics Events"

2. **Make the calendar public**:
   - Go to calendar settings (click gear icon → Settings)
   - Find your new calendar in the left sidebar
   - Click on it to open settings
   - Scroll to "Access permissions for events"
   - Check "Make available to public"
   - Set visibility to "See all event details"

3. **Get the Calendar ID**:
   - In the same settings page, scroll to "Integrate calendar"
   - Copy the "Calendar ID" (looks like: `abcd1234@group.calendar.google.com`)
   - Update your `.env.local` file:
     ```bash
     GOOGLE_CALENDAR_ID=your-public-calendar-id@group.calendar.google.com
     ```

### Option 2: Use an Existing Public Calendar

If you want to use an existing public calendar (like a university or organization calendar), you can find public calendar IDs online or ask the organization for their public calendar ID.

### Option 3: Make Your Personal Calendar Public (Not Recommended)

Only do this if you want all your personal events to be public:
1. Go to Google Calendar settings
2. Find "Primary" calendar in the left sidebar
3. Make it public (same steps as Option 1)

## Testing Your Setup

1. **Update the Calendar ID** in `.env.local`
2. **Run a new build**:
   ```bash
   npm run build
   ```
3. **Check for errors** - you should see "Successfully fetched X calendar events" instead of 404 errors
4. **View your events page** at `/events`

## Calendar Features Available

- ✅ Upcoming events widget (for homepage)
- ✅ Full events page with this month's events
- ✅ Event details (title, date, time, location, description)
- ✅ Links back to Google Calendar
- ✅ Responsive design
- ✅ Build-time data fetching (fast loading)

## File Structure

```
lib/
  calendarData.js          # Calendar API functions
  googleAuth.js           # API key configuration
components/
  UpcomingEventsWidget.jsx # Reusable events widget
app/
  events/
    page.jsx              # Full events page
```

## Usage Examples

### Add Events Widget to Homepage

```jsx
import UpcomingEventsWidget from '../components/UpcomingEventsWidget';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to OC Robotics</h1>
      <UpcomingEventsWidget count={3} />
    </div>
  );
}
```

### Customize the Widget

```jsx
<UpcomingEventsWidget 
  count={5}                    // Number of events to show
  showDescription={true}       // Show event descriptions
  className="my-custom-class"  // Add custom CSS classes
/>
```

## Troubleshooting

- **404 Error**: Calendar ID is wrong or calendar is not public
- **403 Error**: API key is invalid or quota exceeded  
- **No events showing**: Calendar might be empty or date range is wrong
- **Build failing**: Check that all environment variables are set

## Security Notes

- ✅ API key is only used at build time, not exposed to browsers
- ✅ No client credentials needed for public calendars
- ✅ No user authentication required
- ✅ Calendar data is static and cached until next build
