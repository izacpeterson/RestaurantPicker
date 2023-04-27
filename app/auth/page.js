import { getUser, signOutUser } from "../functions/firebase";
import { cookies } from "next/headers";

export default async function Auth() {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  let userData = await getUser(user.value);

  return (
    <main>
      <div>{userData.name}</div>
      <div>{userData.email}</div>
    </main>
  );
}
