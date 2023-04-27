import { cookies } from "next/headers";
import Link from "next/link";
import { createGame } from "./functions/firebase";

export default function Home() {
  let gameID = createGame();

  const cookieStore = cookies();
  const user = cookieStore.get("user");
  console.log("USER", user);
  return (
    <main className="flex flex-col items-center m-10">
      <p className="text-center m-4">
        Can't decide what's for dinner? Welcome to the Restaurant Picker!
        <br /> Click 'Create Game' to begin
      </p>
      <Link href={`/picker/${gameID}`} className="btn btn-primary">
        Create Game
      </Link>
    </main>
  );
}
