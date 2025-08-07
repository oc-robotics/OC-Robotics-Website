import { LinkRounded } from "@mui/icons-material";
import Link from "next/link";

// Heading link component for anchor navigation and smooth scroll
function scrollToAnchor(e, id) {
    e.preventDefault();
    window.location.hash = id;
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

export const h1Link = ({id, ...rest}) => {
    if (id) {
        return (
            <a href={`#${id}`} onClick={e => scrollToAnchor(e, id)} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1 id={id} {...rest} />
            </a>
        )
    }
    return <h1 {...rest} />;
}

export const h2Link = ({id, ...rest}) => {
    if (id) {
        return (
            <a href={`#${id}`} onClick={e => scrollToAnchor(e, id)} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2 id={id} {...rest} />
            </a>
        );
    }
    return <h2 {...rest} />;
}

export const h3Link = ({id, ...rest}) => {
    if (id) {
        return (
            <a href={`#${id}`} onClick={e => scrollToAnchor(e, id)} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 id={id} {...rest} />
            </a>
        );
    }
    return <h3 {...rest} />;
}