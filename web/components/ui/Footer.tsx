import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="text-sm text-gray-500 mt-3 max-w-xs leading-relaxed">
              The trusted marketplace for used vehicles from ClickDealer network dealers across the UK.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Browse</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/search?vehicle_type=car" className="text-gray-600 hover:text-gray-900 transition-colors">Cars</Link></li>
              <li><Link href="/search?vehicle_type=van" className="text-gray-600 hover:text-gray-900 transition-colors">Vans</Link></li>
              <li><Link href="/search?vehicle_type=bike" className="text-gray-600 hover:text-gray-900 transition-colors">Bikes</Link></li>
              <li><Link href="/search?vehicle_type=motorhome" className="text-gray-600 hover:text-gray-900 transition-colors">Motorhomes</Link></li>
              <li><Link href="/search?vehicle_type=caravan" className="text-gray-600 hover:text-gray-900 transition-colors">Caravans</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Dealers</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/dealer" className="text-gray-600 hover:text-gray-900 transition-colors">Dealer sign in</Link></li>
              <li><Link href="/dealer/listings" className="text-gray-600 hover:text-gray-900 transition-colors">Manage listings</Link></li>
              <li><Link href="/dealer/enquiries" className="text-gray-600 hover:text-gray-900 transition-colors">Enquiries</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} ClickDealer Ltd. All rights reserved.</p>
          <a
            href="https://www.clickdealer.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
          >
            <span className="text-xs text-gray-400">Powered by</span>
            <span className="text-sm font-bold tracking-tight">
              <span className="text-dealer-400">Click</span>
              <span className="text-navy-400">Dealer</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
