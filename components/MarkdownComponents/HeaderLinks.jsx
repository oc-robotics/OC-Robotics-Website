import { LinkRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import Link from "next/link";

export const h1Link = ({ id, ...rest }) => {
    const [copied, setCopied] = useState(false);
    if (id) {
        const handleCopy = () => {
            navigator.clipboard.writeText(window.location.origin + window.location.pathname + `#${id}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        };
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 2,
                '& a': {
                    textDecoration: 'none',
                    color: 'inherit',
                },
            }}>
                <Link href={`#${id}`} style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    marginRight: '10px', 
                    cursor: 'default'
                }}>
                    <Typography variant="h1" id={id} {...rest} sx={{width: 'auto', m: 0}}/>
                </Link>
                <Tooltip title={copied ? "Copied!" : "Copy link"} arrow>
                    <LinkRounded
                        onClick={handleCopy}
                        sx={{ cursor: 'pointer', color: 'text.secondary', m: "1.2rem 0 0.5rem" }}
                        fontSize="medium"
                    />
                </Tooltip>
            </Box>
        )
    }
    return <Typography variant="h1" {...rest} />;
}

export const h2Link = ({ id, ...rest }) => {
    const [copied, setCopied] = useState(false);
    if (id) {
        const handleCopy = () => {
            navigator.clipboard.writeText(window.location.origin + window.location.pathname + `#${id}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        };
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 2,
                '& a': {
                    textDecoration: 'none',
                    color: 'inherit',
                },
            }}>
                <Link href={`#${id}`} style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    marginRight: '10px',
                    cursor: 'default'
                }}>
                    <Typography variant="h2" id={id} {...rest} sx={{width: 'auto', margin: 0}}/>
                </Link>
                <Tooltip title={copied ? "Copied!" : "Copy link"} arrow>
                    <LinkRounded
                        onClick={handleCopy}
                        sx={{ cursor: 'pointer', color: 'text.secondary', m: "1.2rem 0 0.5rem" }}
                        fontSize="medium"
                    />
                </Tooltip>
            </Box>
        );
    }
    return <Typography variant="h2" {...rest} />;
}

export const h3Link = ({ id, ...rest }) => {
    const [copied, setCopied] = useState(false);
    if (id) {
        const handleCopy = () => {
            navigator.clipboard.writeText(window.location.origin + window.location.pathname + `#${id}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        };
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 2,
                '& a': {
                    textDecoration: 'none',
                    color: 'inherit',
                },
            }}>
                <Link href={`#${id}`} style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    marginRight: '10px', 
                    cursor: 'default'
                }}>
                    <Typography variant="h3" id={id} {...rest} sx={{width: 'auto', margin: 0}}>
                        <Tooltip title={copied ? "Copied!" : "Copy link"} arrow>
                            <LinkRounded
                                onClick={handleCopy}
                                sx={{ cursor: 'pointer', color: 'text.secondary', m: "1.2rem 0 0.5rem" }}
                                fontSize="small"
                            />
                        </Tooltip>
                    </Typography>
                </Link>
            </Box>
        );
    }
    return <Typography variant="h3" {...rest} />;
}