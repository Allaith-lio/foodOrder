import { Link } from "react-router-dom";
import { Utensils, Globe, Share2, Mail } from "lucide-react";
import { footerLinks } from "../../data/homeData";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Utensils className="size-5 text-primary" />
              <span className="text-lg font-extrabold text-white">CraveDash</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Delivering culinary craft from the neighborhood's finest spots to your kitchen table in minutes. Fast,
              transparent, and always satisfying.
            </p>
            <div className="mt-4 flex gap-3 text-slate-400">
              <Globe className="size-5 cursor-pointer hover:text-white" />
              <Share2 className="size-5 cursor-pointer hover:text-white" />
              <Mail className="size-5 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="!text-base text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700 pt-6 text-xs text-slate-400">
          <p>© 2025 CraveDash Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <span>English (US)</span>
            <span>USD ($)</span>
            <span>System Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
