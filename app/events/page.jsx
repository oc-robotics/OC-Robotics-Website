import { getUpcomingEvents, getEventsInRange } from '../../lib/calendarData.js';

// This function runs at build time in a static export
export async function generateStaticParams() {
  return [{}]; // Return empty params since this is a static page
}

async function getEventsData() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const shouldFetch = process.env.FETCH_CALENDAR_AT_BUILD === 'true';

  if (!shouldFetch || !apiKey) {
    console.log('Calendar fetch disabled or no API key provided');
    return {
      upcomingEvents: [],
      thisMonthEvents: [],
      hasUpcomingEvents: false
    };
  }

  try {
    // Get upcoming events (or recent if no upcoming)
    const upcomingEvents = await getUpcomingEvents({
      calendarId,
      apiKey,
      count: 10
    });

    // Check if events are actually upcoming (future) or recent (past)
    const now = new Date();
    const hasUpcomingEvents = upcomingEvents.some(event => 
      new Date(event.start) > now
    );

    // Get events for this month and last month to show more activity
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    
    const thisMonthEvents = await getEventsInRange({
      calendarId,
      apiKey,
      startDate: startOfLastMonth,
      endDate: endOfNextMonth,
      maxResults: 50
    });

    return {
      upcomingEvents,
      thisMonthEvents,
      hasUpcomingEvents,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return {
      upcomingEvents: [],
      thisMonthEvents: [],
      hasUpcomingEvents: false,
      error: error.message
    };
  }
}

function EventCard({ event }) {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-blue-500">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {event.title}
      </h3>
      
      <div className="text-gray-600 mb-3">
        <div className="flex items-center mb-1">
          <span className="font-medium">Date:</span>
          <span className="ml-2">{formatDate(startDate)}</span>
        </div>
        
        {!event.isAllDay && (
          <div className="flex items-center mb-1">
            <span className="font-medium">Time:</span>
            <span className="ml-2">
              {formatTime(startDate)} - {formatTime(endDate)}
            </span>
          </div>
        )}
        
        {event.location && (
          <div className="flex items-center mb-1">
            <span className="font-medium">Location:</span>
            <span className="ml-2">{event.location}</span>
          </div>
        )}
      </div>
      
      {event.description && (
        <p className="text-gray-700 mb-3">
          {event.description}
        </p>
      )}
      
      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          View in Google Calendar
        </a>
      )}
    </div>
  );
}

export default async function EventsPage() {
  const { upcomingEvents, thisMonthEvents, hasUpcomingEvents, lastUpdated, error } = await getEventsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Events</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error loading events:</strong> {error}
        </div>
      )}
      
      {lastUpdated && (
        <p className="text-gray-600 mb-6">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </p>
      )}

      {/* Upcoming/Recent Events Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {hasUpcomingEvents ? 'Upcoming Events' : 'Recent Events'}
        </h2>
        
        {upcomingEvents.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <p className="text-gray-600">No events found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Events Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Recent Events</h2>
        
        {thisMonthEvents.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <p className="text-gray-600">No recent events found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {thisMonthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
