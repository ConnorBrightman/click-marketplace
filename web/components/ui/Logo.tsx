import Link from "next/link";
import { Store } from "lucide-react";

interface Props {
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}

export default function Logo({ size = "md", onDark = false }: Props) {
  const iconSize = size === "sm" ? 24 : size === "lg" ? 34 : 28;
  const textSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
      <Store size={iconSize} className="text-teal-500 flex-shrink-0" strokeWidth={1.75} />
      <span className={`font-bold ${textSize} tracking-tight leading-none`}>
        <span className={onDark ? "text-white" : "text-gray-900"}>Click</span>
        <span className={onDark ? "text-teal-400" : "text-teal-500"}>Market</span>
      </span>
    </Link>
  );
}
