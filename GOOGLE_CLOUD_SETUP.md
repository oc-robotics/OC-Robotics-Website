# Google Cloud API Configuration Checklist

## Current API Key
`AIzaSyDlaT861NsxtTyr7Mx2jAnB5BGgWsyRm9I`

## Things to Check in Google Cloud Console

### 1. API Key Configuration
Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials

**Check your API Key settings:**
- Click on your API key to edit it
- Under "API restrictions":
  - Should be set to "Restrict key" 
  - **Google Calendar API** must be selected in the list
  - If "Don't restrict key" is selected, that's also fine for testing

### 2. Enabled APIs
Go to APIs & Services → Enabled APIs & services

**Required APIs that MUST be enabled:**
- ✅ **Google Calendar API** - This is the critical one
- ✅ **Google Calendar API v3** (same as above, different naming)

**To enable Google Calendar API:**
1. Go to APIs & Services → Library
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

### 3. Application Restrictions (Optional but Recommended)
In your API key settings, under "Application restrictions":
- **None** (for testing) - allows any application
- **HTTP referrers** (for production) - restrict to your domain
- **IP addresses** (for build servers) - restrict to specific IPs

### 4. Project Selection
Make sure you're in the correct project:
- Current project ID: `ocr-website-468500`
- Check the project dropdown at the top of Google Cloud Console

### 5. Quota and Billing
Go to APIs & Services → Google Calendar API → Quotas
- Check if you have quota remaining
- Calendar API has free tier limits:
  - 1,000,000 requests per day
  - 100 requests per 100 seconds per user

## Common Issues and Solutions

### Issue: 403 Forbidden Error
**Causes:**
- API key doesn't have Calendar API enabled
- Quota exceeded
- Calendar is private and requires OAuth (not API key)

**Solutions:**
- Enable Google Calendar API
- Check quotas
- Make calendar public

### Issue: 404 Not Found Error  
**Causes:**
- Calendar ID is incorrect
- Calendar is not public
- Calendar doesn't exist

**Solutions:**
- Verify calendar ID in Google Calendar settings
- Make calendar public
- Test with a known public calendar

### Issue: 400 Bad Request
**Causes:**
- Invalid API key format
- Invalid parameters in request

**Solutions:**
- Regenerate API key
- Check request parameters

## Testing Steps

1. **Test API Key Directly:**
   ```bash
   # Test in browser or curl
   https://www.googleapis.com/calendar/v3/calendars/ocroboticsgroup@gmail.com/events?key=AIzaSyDlaT861NsxtTyr7Mx2jAnB5BGgWsyRm9I&maxResults=1
   ```

2. **Test with a Known Public Calendar:**
   ```bash
   # US Holidays calendar (always public)
   https://www.googleapis.com/calendar/v3/calendars/en.usa%23holiday%40group.v.calendar.google.com/events?key=YOUR_API_KEY&maxResults=1
   ```

## Quick Fixes to Try

### Option 1: Regenerate API Key
1. Go to Google Cloud Console → Credentials
2. Delete current API key
3. Create new API key
4. Enable Google Calendar API for the new key
5. Update your `.env.local` file

### Option 2: Create New Project
1. Create a new Google Cloud project
2. Enable Google Calendar API
3. Create new API key
4. Update your configuration

### Option 3: Test with Unrestricted Key
1. Edit your API key
2. Set "API restrictions" to "Don't restrict key"
3. Test if it works
4. If it works, then add Calendar API restriction back

## Calendar Settings to Verify

In Google Calendar (calendar.google.com):
1. Go to Settings (gear icon)
2. Find your calendar in the left sidebar
3. Click on the calendar name
4. Under "Access permissions for events":
   - ✅ "Make available to public" should be checked
   - ✅ "See all event details" should be selected
5. Under "Integrate calendar":
   - Copy the "Calendar ID" and verify it matches your config

## Expected Calendar ID Formats

- **Personal calendars:** `username@gmail.com` or `primary`
- **Group calendars:** `groupname@group.calendar.google.com`
- **Shared calendars:** Various formats ending in `@group.calendar.google.com`

Your calendar ID `ocroboticsgroup@gmail.com` looks like a personal Gmail calendar, which should work if it's made public.
