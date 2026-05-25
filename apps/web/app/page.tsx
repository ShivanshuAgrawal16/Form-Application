import { useUser } from "hooks/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/server";

export default async function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.id) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [user]);

  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">Streamyst - Stream in Style</h1>
        <h2>Server Status: </h2>
      </div>
    </main>
  );
}
