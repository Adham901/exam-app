export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to the Auth Page</h1>
        <p className="text-gray-500">Please sign in to continue</p>
      </div>
      {children}
    </div>
  );
}
