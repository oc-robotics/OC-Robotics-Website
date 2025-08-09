'use client';
import { Container, Card, CardContent, Typography, Box } from "@mui/material";
import BackToTopButton from "@/components/BackToTopButton";

function DefaultDocument({ documentList }) {
  return (
    <Container sx={{
        py: 4
    }}>
      <Box component="img" src='/oc-robotics-icon.png' alt="Documentation" sx={{
        mb: 2,
        maxWidth: '20%',
        height: 'auto'
      }} />
      <Typography variant="h2" gutterBottom>
        Documentations
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {documentList.map(doc => {
        const slug = doc.slug;
        return (
          <Card 
            key={slug} 
            onClick={() => window.location.href = `/pages/${slug}`}
            sx={{ 
                display: 'inline-block', 
                marginRight: 2,
                '&:hover': {
                  cursor: 'pointer',
                  transform: 'scale(1.05)',
                  boxShadow: 4,
                }
            }}
          >
            <CardContent>
              <Typography variant="h6">{doc.frontmatter.title || slug}</Typography>
            </CardContent>
          </Card>
        );
      })}
      </Box>
      <BackToTopButton />
    </Container>
  );
}

export default DefaultDocument;