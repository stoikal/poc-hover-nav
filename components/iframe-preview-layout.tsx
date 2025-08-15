"use client";

import { PropsWithChildren, useState } from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

const navs = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function IframePreviewLayout({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="bg-blue-700 h-svh max-w-md mx-auto relative overflow-hidden">
      <aside>
        <nav className="absolute top-1/2 -translate-y-1/2 left-6">
          <ul className="flex flex-col gap-4">
            {navs.map((nav, index) => (
              <li
                key={index}
                className="bg-blue-200 rounded-md font-medium relative"
                onMouseEnter={() => setHoveredItem(nav.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={nav.href}
                  className="px-4 py-2 inline-block"
                  onClick={() => setIsOpen(false)}
                >
                  {nav.label}
                </Link>
                
                {/* Iframe Preview */}
                {hoveredItem === nav.href && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="absolute left-full ml-4 top-0 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
                    style={{ width: '300px', height: '200px' }}
                  >
                    <div className="p-2 bg-gray-100 text-xs text-gray-600 border-b">
                      Preview: {nav.label}
                    </div>
                    <iframe
                      src={nav.href}
                      className="w-full h-full border-0"
                      style={{ transform: 'scale(0.8)', transformOrigin: 'top left' }}
                    />
                  </motion.div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <motion.div
        className="bg-white absolute overflow-hidden"
        initial={{
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        animate={{
          top: isOpen ? "12.5%" : 0,
          left: isOpen ? "50%" : 0,
          borderRadius: isOpen ? 20 : 0,
          height: isOpen ? "80%" : "100%",
          width: isOpen ? "80%" : "100%",
        }}
      >
        {children}
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
