import https from 'https';

async function fetchWithHttps(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        } catch (error) {
          reject(new Error(`JSON parse error: ${error.message}`));
        }
      });
      
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Fetch public calendar events using Google Calendar API
 * This runs at build time, not in the browser
 */
export async function fetchCalendarEvents({
  calendarId = 'primary',
  apiKey,
  maxResults = 10,
  timeMin = new Date().toISOString(),
  timeMax = null
} = {}) {
  if (!apiKey) {
    console.warn('Google API key not provided, skipping calendar fetch');
    return [];
  }

  try {
    // Properly encode the calendar ID for URL
    const encodedCalendarId = encodeURIComponent(calendarId);
    const baseUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodedCalendarId}/events`;
    
    const params = new URLSearchParams({
      key: apiKey,
      timeMin: timeMin,
      maxResults: maxResults.toString(),
      singleEvents: 'true',
      orderBy: 'startTime'
    });
    
    if (timeMax) {
      params.set('timeMax', timeMax);
    }

    const url = `${baseUrl}?${params.toString()}`;
    console.log('Fetching calendar events from:', calendarId);
    
    let data;
    
    // Try fetch first, fallback to https module
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'OC-Robotics-Website/1.0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }
      
      data = await response.json();
    } catch (fetchError) {
      console.log('Fetch failed, trying Node.js https module:', fetchError.message);
      data = await fetchWithHttps(url);
    }
    
    console.log(`Successfully fetched ${data.items?.length || 0} calendar events`);
    return data.items || [];
    
  } catch (error) {
    console.error('Error fetching calendar events:', error.message);
    
    // Don't throw error, just return empty array to allow build to continue
    return [];
  }
}

/**
 * Transform calendar events for display
 */
export function transformCalendarEvents(events) {
  return events.map(event => ({
    id: event.id,
    title: event.summary || 'Untitled Event',
    description: event.description || '',
    start: event.start?.dateTime || event.start?.date,
    end: event.end?.dateTime || event.end?.date,
    location: event.location || '',
    link: event.htmlLink,
    isAllDay: !event.start?.dateTime, // If no time, it's all day
    created: event.created,
    updated: event.updated,
    status: event.status,
    organizer: event.organizer,
    attendees: event.attendees || []
  }));
}

/**
 * Get upcoming events (next N events from today)
 * If no upcoming events, get recent past events as fallback
 */
export async function getUpcomingEvents({
  calendarId,
  apiKey,
  count = 5
} = {}) {
  const now = new Date();
  
  // First try to get upcoming events
  let events = await fetchCalendarEvents({
    calendarId,
    apiKey,
    maxResults: count,
    timeMin: now.toISOString()
  });
  
  // If no upcoming events, get recent events (past and future)
  if (!events || events.length === 0) {
    console.log('No upcoming events found, fetching recent events instead...');
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    events = await fetchCalendarEvents({
      calendarId,
      apiKey,
      maxResults: count * 2, // Get more to filter
      timeMin: thirtyDaysAgo.toISOString()
    });
    
    // Sort by date (most recent first) and take the requested count
    events = events
      .sort((a, b) => {
        const dateA = new Date(a.start?.dateTime || a.start?.date);
        const dateB = new Date(b.start?.dateTime || b.start?.date);
        return dateB - dateA; // Descending order (newest first)
      })
      .slice(0, count);
  }
  
  return transformCalendarEvents(events);
}

/**
 * Get events for a specific date range
 */
export async function getEventsInRange({
  calendarId,
  apiKey,
  startDate,
  endDate,
  maxResults = 50
} = {}) {
  const events = await fetchCalendarEvents({
    calendarId,
    apiKey,
    maxResults,
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString()
  });
  
  return transformCalendarEvents(events);
}
