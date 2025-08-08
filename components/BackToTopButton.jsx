'use client'
import { Box, Tooltip } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';  

export default function BackToTopButton() {
	return (
		<Box sx={{
			width: "45px",
			height: "45px",
			position: "fixed",
			bottom: "32px",
			right: "32px",
			backgroundColor: "#0080ffff",
			borderRadius: "50%",
		}}>
			<Tooltip title="Back to top" arrow>
				<KeyboardArrowUp
					sx={{
						color: "white",
						fontSize: "45px",
						cursor: "pointer"
					}}
					onClick={() => {
						window.scrollTo({ top: 0, behavior: 'smooth' });
					}}
				/>
			</Tooltip>
		</Box>
	)
}
