"use client";

import { signInWithGoogle } from "@/app/functions/firebase";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <main>
      <button
        onClick={async () => {
          let user = await signInWithGoogle();
          setCookie("user", user.uid, {
            path: "/",
            maxAge: 3600 * 24 * 7, // Expires after 1hr
          });
          router.push("/");
        }}
      >
        Login With Google
      </button>
    </main>
  );
}
