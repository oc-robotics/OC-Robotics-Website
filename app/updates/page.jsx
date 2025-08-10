import { Container, Typography, Grow, CardContent, TextField } from "@mui/material"
import UpdateTag from "./updateTag"

export default async function Updates() {
  let updates = [
    { week: 12, 
      title: "Suspension Testing Complete", 
      description: "Successfully tested rocker-bogle system on 45° inclines. All motors performing within specifications.",
      date: "2023-12-10"
    },
    {
      week: 11,
      title: "Autonomous Navigation Breakthrough",
      description: "Implemented SLAM algorithm for mapping unknown terrain. Initial tests show 92% accuracy in obstacle detection.",
      date: "2023-12-3"
    },
    {
      week: 10,
      title: "Robotic Arm Integration",
      description: "6-DOF robotic arm successfully integrated with main chassis. Beginning manipulation task programming.",
      date: "2023-11-26"
    }
  ];

  const addEvent = (update) => {
    updates.push(update);
  }

  const openAddEvent = () => {
    setPopup(true);
  }

  const handleAddUpdate = () => {
    const update = prompt("Enter update:");
    if (update) {
      addEvent(update);
    }
    closeAddEvent();
  }

  return (
    <Container>
      <Typography variant="h1">Weekly Updates</Typography>
      {updates.map((update, index) => (
        <UpdateTag key={index} update={update} />
      ))}
    </Container>
  )
}
