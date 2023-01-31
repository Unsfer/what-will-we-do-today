import SignOut from "@/components/sign-out";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <h1>U R LOGGED IN</h1>
        <SignOut />
      </div>
    </div>
  );
}
