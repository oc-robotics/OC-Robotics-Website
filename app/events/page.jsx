import { getEventsInRange } from '@/lib/calendarData';
import EventsPageWithState from './eventsWithState';

export default async function EventsPage(){
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  let allRecentEvents = [];
  const date = new Date();
  const startDate = new Date(date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear(), date.getMonth() === 0 ? 11 : date.getMonth() - 1, 1);
  const endDate = new Date(date.getMonth() === 11? date.getFullYear() + 1 : date.getFullYear(), date.getMonth() === 11 ? 0 : date.getMonth() + 1, 0);

  if (apiKey){
    try{
      allRecentEvents = await getEventsInRange({
        calendarId,
        apiKey,
        startDate: startDate,
        endDate: endDate,
        maxResults: 50
      });
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
    }
  }

  return(
    <EventsPageWithState allRecentEvents={allRecentEvents} />
  )
}
