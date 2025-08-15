"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";

// Import your page components for preview
import Home from "../app/(home)/page";
import About from "../app/about/page";
import Contact from "../app/contact/page";

const navs = [
  { label: "Home", href: "/", component: Home },
  { label: "About", href: "/about", component: About },
  { label: "Contact", href: "/contact", component: Contact },
];

export function AppLayout({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const Page = () => {
    const Component = navs.find((nav) => nav.href === hoveredItem)?.component;
    return (
      <div className="h-full overflow-hidden">{Component && <Component />}</div>
    );
  };

  return (
    <div className="bg-blue-700 h-svh max-w-md mx-auto relative overflow-hidden">
      <aside>
        <nav className="absolute top-1/2 -translate-y-1/2 left-6">
          <ul className="flex flex-col gap-4">
            {navs.map((nav, index) => (
              <li
                key={index}
                className="bg-blue-200 rounded-md font-medium relative"
                onMouseEnter={() => {
                  setHoveredItem(nav.href);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                }}
              >
                <Link
                  href={nav.href}
                  className="px-4 py-2 inline-block"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <motion.div
        className={"bg-white absolute overflow-hidden transition-[color]"}
        custom={2}
        initial={{
          top: 0,
          left: 0,
          // x: 0,
          // y: 0,
          height: "100%",
          width: "100%",
        }}
        animate={{
          // y: isOpen ? "-50%" : 0,
          // y: 0,
          top: isOpen ? "12.5%" : 0,
          left: isOpen ? "50%" : 0,
          borderRadius: isOpen ? 20 : 0,
          height: isOpen ? "80%" : "100%",
          width: isOpen ? "80%" : "100%",
          // t
        }}
      >
        {children}

        {hoveredItem && (
          <div className="absolute inset-0 bg-white">
            <Page />
          </div>
        )}
      </motion.div>

      <button
        className="bg-blue-950 rounded-2xl h-16 w-16 text-white absolute top-6 left-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        menu
      </button>
    </div>
  );
}
