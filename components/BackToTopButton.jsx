'use client'
import { Box, Tooltip, Fade } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';  
import React, { useEffect, useState } from 'react';

export default function BackToTopButton() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShow(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll);
		handleScroll(); // initial check
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<Fade in={show}>
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
		</Fade>
	);
}
