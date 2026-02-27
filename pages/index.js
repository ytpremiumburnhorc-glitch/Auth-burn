import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Welcome {session.user.name}</p>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }

  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn("github")}>
        Login with GitHub
      </button>
    </>
  );
}
