import { Container, Typography, Stack } from "@mui/material"
import UpdateTag from "./updateTag"
import { blogs } from "@/lib/blogsData.js"

export default async function Updates() {
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
        {blogs.map((blog, index) => (
            <UpdateTag key={index} blog={blog} />
        ))}
      </Stack>
    </Container>
  )
}
