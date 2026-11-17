import { Link } from "react-router-dom";
import { Globe, Share2, Mail } from "lucide-react";
import { footerLinks } from "../../data/homeData";
import Logo from "../common/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/95 text-ink">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <Logo className="text-2xl" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Delivering culinary craft from the neighborhood's finest spots to your kitchen table in minutes. Fast,
              transparent, and always satisfying.
            </p>
            <div className="mt-4 flex gap-3 text-muted">
              <Globe className="size-5 cursor-pointer hover:text-primary" />
              <Share2 className="size-5 cursor-pointer hover:text-primary" />
              <Mail className="size-5 cursor-pointer hover:text-primary" />
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="!text-base text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted">
          <p>© 2026 Sofra. All rights reserved.</p>
          <div className="flex gap-5">
            <span>English (US)</span>
            <span>System Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
