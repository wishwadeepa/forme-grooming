import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found" aria-labelledby="not-found-title">
      <div className="not-found-content">
        <div className="not-found-code" aria-label="Error 404"><span /> <em>404</em> <span /></div>
        <h1 id="not-found-title"><span>Out of</span><span>Shape.</span></h1>
        <p className="not-found-message">The page you’re looking for<br />doesn’t exist.</p>
        <Link className="not-found-return" href="/">Return to the studio <span aria-hidden="true">↗︎</span></Link>
      </div>
    </main>
  );
}
