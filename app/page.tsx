"use client"
// import Link from "next/link";
// import image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Headar from "./components/header"

export default function Home() {
  const route = useRouter();
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-green-800 text-xl text-center font-bold">Welcome to MZS Dev Point</h1>
        <p className="w-full h-screen bg-green-300">This is a developing web app. Feel free to roam around and enjoy some mini apps.</p>
        <div className="w-full h-screen bg-green-300">
          
            <h2 className="underline mt-4 ">Visit Widgets section for "30-Days Challenge" Apps.</h2>
          </div>
        <p>Lorem Ipsum is simply dummy text ...</p>
      </div>
    </>
  );
}
