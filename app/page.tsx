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
        <div className="w-full h-screen bg-green-300">
        <p className="text-lg">This is a developing web app. Feel free to roam around and enjoy some mini apps.</p>
        
          
            <h2 className="underline mt-4 ">Visit Widgets section for &quot;30-Days Challenge&quot; Apps.</h2>
          </div>
        <p>Lorem Ipsum is simply dummy text ...</p>
      </div>
    </>
  );
}
