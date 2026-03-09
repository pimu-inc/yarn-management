import Link from "next/link";

type Props = {
  href: string;
};

export function Fab({ href }: Props) {
  return (
    <Link
      href={href}
      className="fixed bottom-20 right-4 w-14 h-14 bg-pink-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-pink-600 z-40"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </Link>
  );
}
