import { Container, Typography, Stack } from "@mui/material"
import UpdateTag from "./updateTag"
import { getBlogsFromGoogleSheets } from "@/lib/googleSheetsApi.js"

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
    <Container>
      <Typography variant="h1">Weekly Updates</Typography>
      <Stack 
        spacing={2}
        direction="column"
        sx={{
          mt: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {blogsFromSheets.map((blog, index) => (
            <UpdateTag key={index} blog={blog} />
        ))}
      </Stack>
    </Container>
  )
}
