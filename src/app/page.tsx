import Image from "next/image";
import UserProfile from "@/components/UserProfile";

export default function Home() {
  return (
    <main className="text-black bg-white flex min-h-screen flex-col items-center p-24">
      <h1 className="h-12 font-bold">User Profile Component</h1>
      <UserProfile />
    </main>
  );
}
