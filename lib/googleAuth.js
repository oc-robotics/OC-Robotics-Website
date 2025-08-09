/**
 * Google Calendar API utilities for static sites
 * Note: This is simplified for static generation - no OAuth flows
 */

/**
 * Get the Google API key from environment variables
 * Only use this in build-time functions, never expose in client code
 */
export function getGoogleApiKey() {
  return process.env.GOOGLE_API_KEY;
}

/**
 * Get the calendar ID from environment variables
 */
export function getCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID || 'primary';
}

/**
 * Check if calendar fetching is enabled
 */
export function isCalendarFetchEnabled() {
  return process.env.FETCH_CALENDAR_AT_BUILD === 'true';
}
