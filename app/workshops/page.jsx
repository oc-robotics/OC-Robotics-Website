import React from 'react'
import { getWorkshopsFromGoogleSheets } from '@/lib/googleSheetsApi.js'
import WorkshopsWithState from './WorkshopsWithState'

export default async function Workshops() {
  const apiKey = process.env.GOOGLE_API_KEY;

  let workshopsFromSheets = [];
  
  if (apiKey) {
    try {
      workshopsFromSheets = await getWorkshopsFromGoogleSheets();
    } catch (error) {
      console.error('Error fetching workshops:', error);
    }
  }

  return <WorkshopsWithState workshops={workshopsFromSheets} />;
}
