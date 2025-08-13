'use client'
import { Container, Typography, Paper, Stack, Button, Box, Collapse, Fade } from "@mui/material";
import UpdateTag from "./updateTag";
import { useState } from "react";

export default function UpdatesPage({ blogs }) {
  const [limit, setLimit] = useState(true);
  return(
    <Container>
      <Typography variant="h1">Weekly Updates</Typography>
      <Paper elevation={3} sx={{
        p: 2,
        borderRadius: 2,
        my: 2,
      }}>
        <Stack 
          spacing={2}
          direction="column"
          sx={{
            mt: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* Always show first 3 blogs */}
          {blogs.slice(0, 3).map((blog, index) => (
            <UpdateTag key={index} blog={blog} />
          ))}
          
          {/* Additional blogs with Collapse transition */}
          <Collapse in={!limit} timeout={500}>
            <Stack spacing={2} direction="column" sx={{ alignItems: 'center' }}>
              {blogs.slice(3).map((blog, index) => (
                <Fade 
                  key={index + 3} 
                  in={!limit} 
                  timeout={300 + (index * 150)}
                >
                  <UpdateTag blog={blog} />
                </Fade>
              ))}
            </Stack>
          </Collapse>
        </Stack>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
          <Button onClick={() => setLimit(!limit)} variant="outlined">
              {limit ? "View All Updates" : "View Less Updates"}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
};