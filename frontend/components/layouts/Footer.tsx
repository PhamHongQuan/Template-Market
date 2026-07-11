import { Check } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-base-200 border-t border-base-300 py-12 text-xs text-base-content/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
                {/* Brand col */}
                <div className="col-span-2">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-neutral text-neutral-content rounded flex items-center justify-center font-bold text-[10px]">
                            DC
                        </div>
                        <span className="font-semibold text-sm text-base-content font-sans">DevCraft</span>
                    </div>
                    <p className="mt-4 text-xs max-w-sm leading-relaxed text-base-content/50">
                        Premium, light-footprint code templates designed for professional engineers. Responsive layout grids, zero dependencies, and high Core Web Vital performance.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                        <a href="#" className="hover:text-base-content text-base-content/40">Github</a>
                        <span className="text-base-content/30">|</span>
                        <span className="font-mono text-[10px]">version 2.4.0</span>
                    </div>
                </div>

                {/* Links col 1 */}
                <div>
                    <h4 className="font-semibold text-base-content uppercase tracking-wider text-[10px] mb-4 font-mono">Catalog</h4>
                    <ul className="space-y-2">
                        <li><button className="hover:underline text-left cursor-pointer">SaaS Templates</button></li>
                        <li><button className="hover:underline text-left cursor-pointer">Admin Panels</button></li>
                        <li><button className="hover:underline text-left cursor-pointer">Documentation</button></li>
                        <li><button className="hover:underline text-left cursor-pointer">Clean Blogs</button></li>
                    </ul>
                </div>

                {/* Links col 2 */}
                <div>
                    <h4 className="font-semibold text-base-content uppercase tracking-wider text-[10px] mb-4 font-mono">Resources</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Documentation</a></li>
                        <li><a href="#" className="hover:underline">Support Desk</a></li>
                        <li><a href="#" className="hover:underline">Open Source</a></li>
                        <li><a href="#" className="hover:underline">License Terms</a></li>
                    </ul>
                </div>

                {/* Links col 3 */}
                <div>
                    <h4 className="font-semibold text-base-content uppercase tracking-wider text-[10px] mb-4 font-mono">Company</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Blog News</a></li>
                        <li><a href="#" className="hover:underline">Contact Sales</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-base-300 flex flex-col sm:flex-row justify-between items-center gap-4 text-base-content/40">
                <span>&copy; {new Date().getFullYear()} DevCraft Templates. All rights reserved.</span>
                <span className="flex items-center gap-1 text-[10px]">
                    Made by developers, for developers. <Check size={12} className="text-emerald-500" />
                </span>
            </div>
        </footer>
    )
}