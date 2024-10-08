import Link from "next/link";

export default function Headar() {
  return (
    <div className="flex justify-between bg-sky-700 text-zince-200 p-4">
      <div className="flex items-center">
        <h1 className="font-bold text-xl">XYZ Company</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            {" "}
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/career">Career</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
