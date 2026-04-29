import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-navy-500 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo className="text-white" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              The trusted marketplace for used vehicles from ClickDealer network dealers across the UK.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search?vehicle_type=car" className="hover:text-white transition-colors">Cars</Link></li>
              <li><Link href="/search?vehicle_type=van" className="hover:text-white transition-colors">Vans</Link></li>
              <li><Link href="/search?vehicle_type=bike" className="hover:text-white transition-colors">Bikes</Link></li>
              <li><Link href="/search?vehicle_type=motorhome" className="hover:text-white transition-colors">Motorhomes</Link></li>
              <li><Link href="/search?vehicle_type=caravan" className="hover:text-white transition-colors">Caravans</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Dealers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dealer" className="hover:text-white transition-colors">Dealer Login</Link></li>
              <li><Link href="/dealer/listings" className="hover:text-white transition-colors">Manage Listings</Link></li>
              <li><Link href="/dealer/enquiries" className="hover:text-white transition-colors">Enquiries</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-600 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} ClickDealer Ltd. All rights reserved.</p>
          <a
            href="https://www.clickdealer.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            <span className="text-gray-500">Powered by</span>
            <Image
              src="https://www.kallenhard.co.uk/assets/images/themev2/theme/click_dealer_logo.1769685326.png"
              alt="ClickDealer"
              width={100}
              height={24}
              className="brightness-0 invert"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
