import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <nav>
        <Link href="/auth/login" className="text-blue-500">
          Login
        </Link>
        <Link href="/auth/signup" className="text-blue-500">
          Signup
        </Link>
      </nav>
    </div>
  );
}
