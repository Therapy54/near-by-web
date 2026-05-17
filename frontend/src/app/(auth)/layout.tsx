import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-center text-primary">
            Near-By
          </h2>
          <p className="text-center text-sm text-gray-600">
            Discover nearby opportunities
          </p>
        </div>
        <div className="w-full max-w-md space-y-6">{children}</div>
      </div>
    </div>
  );
}
