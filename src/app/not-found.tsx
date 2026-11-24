import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="not-found"><span className="eyebrow">FORME / 404</span><p className="not-found-code">04 / 04</p><h1>That page<br /><em>isn’t here.</em></h1><p>Looks like this cut went a little too short. Let’s get you back to the studio.</p><Link className="button button-dark" href="/">Back to the home page <span>↗</span></Link></main>;
}
