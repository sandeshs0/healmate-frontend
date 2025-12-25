import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        scrollY > 50
          ? "bg-white/90 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
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

        <div className="hidden md:flex items-center gap-10 font-medium text-sm uppercase tracking-widest">
          <a href="#performance" className="hover:text-accent transition-colors">
            Performance
          </a>
          <a href="#method" className="hover:text-accent transition-colors">
            The Method
          </a>
          <a href="#privacy" className="hover:text-accent transition-colors">
            Privacy
          </a>
          <Link
            to="/login"
            className="px-6 py-2 border border-primary/20 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Login
          </Link>
        </div>

        <button
          className="md:hidden text-text"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4">
            <a
              href="#performance"
              className="text-text hover:text-accent transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Performance
            </a>
            <a
              href="#method"
              className="text-text hover:text-accent transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              The Method
            </a>
            <a
              href="#privacy"
              className="text-text hover:text-accent transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Privacy
            </a>
            <Link
              to="/login"
              className="px-6 py-2 border border-primary/20 rounded-full hover:bg-primary hover:text-white transition-all text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

