import { getBlogsFromGoogleSheets } from "@/lib/googleSheetsApi.js"
import UpdatesPage from "./updatesPage";

export default async function Updates() {
  const apiKey = process.env.GOOGLE_API_KEY;

  let blogsFromSheets = [];

  if (apiKey) {
    try {
      blogsFromSheets = await getBlogsFromGoogleSheets();
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }
  

  return (
    <UpdatesPage blogs={blogsFromSheets} />
  )
}
