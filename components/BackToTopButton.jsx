'use client'
import { Box, Tooltip } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';  
import React, { useEffect, useState } from 'react';

export default function BackToTopButton() {
	const [show, setShow] = useState(false);
	const [bottomOffset, setBottomOffset] = useState(16);

	useEffect(() => {
		const handleScroll = () => {
			setShow(window.scrollY > 10);
			
			// Check if footer is in viewport
			const footer = document.querySelector('footer');
			if (footer) {
				const footerRect = footer.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				
				// If footer is visible in viewport
				if (footerRect.top < viewportHeight) {
					// Calculate how much of footer is visible
					const footerVisibleHeight = Math.min(footerRect.height, viewportHeight - footerRect.top);
					// Add some padding (16px) above the footer
					setBottomOffset(footerVisibleHeight + 16);
				} else {
					// Footer not visible, use default offset
					setBottomOffset(32);
				}
			}
		};
		
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll);
		handleScroll(); // initial check
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, []);

	if (!show) return null;

	return (
		<Box sx={{
			width: "45px",
			height: "45px",
			position: "fixed",
			bottom: `${bottomOffset}px`,
			right: "10px",
			backgroundColor: "secondary.main",
			borderRadius: "50%",
			transition: "bottom 0.3s ease-in-out",
			zIndex: 1000,
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
	);
}