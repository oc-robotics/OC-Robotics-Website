import { getUpcomingEvents } from '../lib/calendarData.js';

export default async function UpcomingEventsWidget({ 
  count = 3, 
  showDescription = false,
  className = "" 
}) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const shouldFetch = process.env.FETCH_CALENDAR_AT_BUILD === 'true';

  let events = [];
  
  if (shouldFetch && apiKey) {
    try {
      events = await getUpcomingEvents({
        calendarId,
        apiKey,
        count
      });
    } catch (error) {
      console.error('Error fetching events for widget:', error);
    }
  }

  if (events.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Events</h3>
        <p className="text-gray-600">No upcoming events.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
      
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium text-gray-900">{event.title}</h4>
            
            <div className="text-sm text-gray-600">
              <div>{formatDate(event.start)}</div>
              {!event.isAllDay && (
                <div>{formatTime(event.start)}</div>
              )}
              {event.location && (
                <div className="text-xs text-gray-500">{event.location}</div>
              )}
            </div>
            
            {showDescription && event.description && (
              <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                {event.description}
              </p>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <a 
          href="/events" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View all events →
        </a>
      </div>
    </div>
  );
}
