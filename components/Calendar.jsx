import { getEventsThisMonth } from "@/lib/calendarData";
import CalendarWithState from "./CalendarWithState";

export default async function Calendar() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  let events = [];
  
  if (apiKey) {
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
