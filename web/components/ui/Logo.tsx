import Link from "next/link";
import { Store } from "lucide-react";

interface Props {
  className?: string;
}

export default function Logo({ className = "" }: Props) {
  return (
    <Link href="/" className={`flex items-center gap-2 flex-shrink-0 ${className}`}>
      <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
        <Store className="w-4 h-4 text-navy-500" />
      </div>
      <span className="font-bold text-xl tracking-tight">ClickMarket</span>
    </Link>
  );
}
