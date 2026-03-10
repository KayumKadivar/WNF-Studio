import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <span className="text-8xl font-display text-primary/20 mb-4">404</span>
      <h1 className="text-4xl font-display mb-4">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
        Back to Home
      </Link>
    </div>
  );
}
