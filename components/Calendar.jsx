import { getEventsThisMonth } from "@/lib/calendarData";
import CalendarWithState from "./CalendarWithState";

export default async function Calendar() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const shouldFetch = process.env.FETCH_CALENDAR_AT_BUILD === 'true';

  let events = [];
  
  if (shouldFetch && apiKey) {
    try {
      events = await getEventsThisMonth({
        calendarId,
        apiKey,
      });
    } catch (error) {
      console.error('Error fetching events for widget:', error);
    }
  }

  return <CalendarWithState events={events} />;
}
