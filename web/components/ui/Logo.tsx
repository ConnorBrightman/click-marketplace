import Link from "next/link";

interface Props {
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}

export default function Logo({ size = "md", onDark = false }: Props) {
  const iconSize = size === "sm" ? "w-7 h-7" : size === "lg" ? "w-10 h-10" : "w-8 h-8";
  const textSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
      <div className={`${iconSize} flex-shrink-0`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="9" fill="#14b8a6" />
          <path d="M8 22 L13 14 H27 L32 22 Z" fill="white" />
          <rect x="5" y="22" width="30" height="7" rx="2" fill="white" />
          <path d="M14.5 21.5 L17 16 H23 L25.5 21.5 Z" fill="#14b8a6" fillOpacity="0.45" />
          <circle cx="13" cy="29" r="4.5" fill="#0d9488" stroke="white" strokeWidth="1.5" />
          <circle cx="13" cy="29" r="1.75" fill="white" />
          <circle cx="27" cy="29" r="4.5" fill="#0d9488" stroke="white" strokeWidth="1.5" />
          <circle cx="27" cy="29" r="1.75" fill="white" />
          <rect x="34" y="23.5" width="1.5" height="3.5" rx="0.75" fill="white" fillOpacity="0.6" />
          <rect x="4.5" y="23.5" width="1.5" height="3.5" rx="0.75" fill="#19215b" fillOpacity="0.4" />
        </svg>
      </div>
      <span className={`font-bold ${textSize} tracking-tight leading-none`}>
        <span className={onDark ? "text-white" : "text-gray-900"}>Click</span>
        <span className={onDark ? "text-teal-400" : "text-teal-500"}>Market</span>
      </span>
    </Link>
  );
}
