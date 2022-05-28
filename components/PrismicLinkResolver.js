import Link from "next/link";

export default function PrismicLinkResolver({ link, children, style }, props) {
  console.log(props);
  switch (link.link_type) {
    case "Document":
      return (
        <Link href={`/${link.uid}`}>
          <a style={style}>{children}</a>
        </Link>
      );
    case "Web" || "Media":
      return (
        <a href={link.url} target="_blank" rel="noreferrer" style={style}>
          {children}
        </a>
      );
    default:
      return <code>link type not reconised</code>;
  }
}
