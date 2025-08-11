import { Container, Typography, Grow, CardContent, TextField } from "@mui/material"
import UpdateTag from "./updateTag"

export default async function Updates() {
  let updates = [
    { 
      week: 12, 
      title: "Suspension Testing Complete", 
      description: "Successfully tested rocker-bogle system on 45° inclines. All motors performing within specifications.",
      date: "2023-12-10"
    },
    {
      week: 10,
      title: "Robotic Arm Integration",
      description: "6-DOF robotic arm successfully integrated with main chassis. Beginning manipulation task programming.",
      date: "2023-11-26"
    },
    {
      week: 11,
      title: "Autonomous Navigation Breakthrough",
      description: "Implemented SLAM algorithm for mapping unknown terrain. Initial tests show 92% accuracy in obstacle detection.",
      date: "2023-12-3"
    },
  ];

  return (
    <Container>
      <Typography variant="h1">Weekly Updates</Typography>
      {updates
        .filter(update => new Date(update.date) <= new Date())
        .map((update, index) => (
        <UpdateTag key={index} update={update} />
      ))}
    </Container>
  )
}
