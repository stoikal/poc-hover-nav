"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useState, useEffect } from "react";

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
  const pathname = usePathname();

  // Listen to route changes
  useEffect(() => {
    console.log('Route changed to:', pathname);
    
    // Reset any hover state when route changes
    setHoveredItem(null);
    
    // You can add other route change logic here:
    // - Close mobile menu
    // - Reset scroll position
    // - Track analytics
    // - etc.
    
  }, [pathname]);

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
              <motion.li
                key={index}
                className="bg-blue-200 rounded-md font-medium relative overflow-hidden"
                onMouseEnter={() => {
                  setHoveredItem(nav.href);
                }}
                onMouseLeave={() => {
                  // setHoveredItem(null);
                  // setTimeout(() => {
                  // }, 500);
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgb(219 234 254)", // blue-100
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.1, duration: 0.3 }
                }}
              >
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-blue-300 rounded-md"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: 1, 
                    opacity: 0.3,
                    transition: { duration: 0.2 }
                  }}
                />
                
                <Link
                  href={nav.href}
                  className="px-4 py-2 inline-block relative z-10 transition-colors duration-200"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <motion.span
                    whileHover={{ 
                      color: "rgb(30 64 175)", // blue-800
                      transition: { duration: 0.2 }
                    }}
                  >
                    {nav.label}
                  </motion.span>
                </Link>
              </motion.li>
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
          <motion.div 
            className="absolute inset-0 bg-white"
          >
            <Page />
          </motion.div>
        )}
      </motion.div>

      <motion.button
        className="bg-blue-950 rounded-2xl h-16 w-16 text-white absolute top-6 left-6 font-medium"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ 
          scale: 1.1,
          backgroundColor: "rgb(23 37 84)", // blue-900
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.9,
          transition: { duration: 0.1 }
        }}
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ 
          opacity: 1, 
          rotate: 0,
          transition: { duration: 0.5, delay: 0.2 }
        }}
      >
        <motion.span
          animate={{ 
            rotate: isOpen ? 45 : 0,
            transition: { duration: 0.3 }
          }}
        >
          menu
        </motion.span>
      </motion.button>
    </div>
  );
}
