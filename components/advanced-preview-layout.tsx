"use client";

import { PropsWithChildren, useState, useEffect } from "react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Import your page components for preview
import Home from "../app/(home)/page";
import About from "../app/about/page";
import Contact from "../app/contact/page";

const navs = [
  { label: "Home", href: "/", component: Home },
  { label: "About", href: "/about", component: About },
  { label: "Contact", href: "/contact", component: Contact },
];

export function AdvancedPreviewLayout({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();

  // Prefetch all pages on component mount for faster navigation
  useEffect(() => {
    navs.forEach(nav => {
      router.prefetch(nav.href);
    });
  }, [router]);

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
                  prefetch={true} // Prefetch on hover
                >
                  {nav.label}
                </Link>
                
                {/* Enhanced Preview with Animation */}
                {hoveredItem === nav.href && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20, y: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20, y: -10 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25,
                      duration: 0.2 
                    }}
                    className="absolute left-full ml-4 top-0 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50"
                    style={{ width: '320px', height: '220px' }}
                  >
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 text-sm text-gray-700 border-b flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-medium">Preview: {nav.label}</span>
                      </div>
                      <span className="text-xs text-gray-400">Click to navigate</span>
                    </div>
                    <div 
                      className="h-full overflow-hidden bg-gray-50" 
                      style={{ 
                        transform: 'scale(0.85)', 
                        transformOrigin: 'top left',
                        width: '118%',
                        height: '118%'
                      }}
                    >
                      <nav.component />
                    </div>
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
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>

      <button
        className="bg-blue-950 rounded-2xl h-16 w-16 text-white absolute top-6 left-6 hover:bg-blue-900 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        menu
      </button>
    </div>
  );
}
