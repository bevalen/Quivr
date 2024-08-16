import Link from 'next/link';

export default function Header() {
    return (
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold cursor-pointer">Quivr</Link>
          {/* <nav className="space-x-4">
            <Link href="/about" className="hover:text-gray-400">How To Use Quivr</Link>
          </nav> */}
        </div>
      </header>
    );
}