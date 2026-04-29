import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-navy-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h2>
        <p className="text-gray-500 mb-8">The vehicle or page you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary inline-block">
          Back to home
        </Link>
      </div>
    </div>
  );
}
