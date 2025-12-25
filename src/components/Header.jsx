import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works", isAnchor: true },
  { label: "Our Doctors", href: "/doctors", isAnchor: false },
  { label: "Pricing", href: "/pricing", isAnchor: false },
  { label: "FAQ", href: "/#faq", isAnchor: true },
];

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle anchor link clicks
  const handleAnchorClick = (e, href) => {
    const targetId = href.split("#")[1];
    
    // If we're on the home page, scroll to section
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // If on another page, the href will navigate to /#section
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        scrollY > 50
          ? "bg-white/95 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/healmate.png"
            alt="HealMate Logo"
            className="h-10 w-auto"
          />
          <span className="text-2xl font-display font-black tracking-tight text-primary">
            HEALMATE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          
          <div className="flex items-center gap-3 ml-4">
            <Link
              to="/login"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              Book Session
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="py-3 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            )
          )}
          
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
            <Link
              to="/login"
              className="py-3 text-center text-primary font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="py-3 bg-primary text-white rounded-full text-center font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Book Session
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

