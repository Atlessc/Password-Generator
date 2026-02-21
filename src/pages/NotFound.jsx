import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-base-300 p-6 text-base-content">
      <section className="card w-full max-w-xl border border-base-content/15 bg-base-100/80 shadow-lg">
        <div className="card-body items-center text-center">
          <h1 className="card-title text-3xl">Page not found</h1>
          <p className="text-base-content/70">The page you requested does not exist.</p>
          <div className="card-actions">
            <Link className="btn btn-primary" to="/">
              Back to generator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
