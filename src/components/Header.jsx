import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Calendar,
  FileQuestion,
  History,
  MessageSquare,
  Video,
  DollarSign,
  FileText,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works", isAnchor: true },
  { label: "Take Quiz", href: "/healmate-quiz", isAnchor: false },
  { label: "Our Doctors", href: "/our-doctors", isAnchor: false },
  { label: "FAQ", href: "/#faq", isAnchor: true },
];

export default function Header() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
    setUserMenuOpen(false);
    setMenuOpen(false);
  };

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

  // Close user menu when clicking outside
  useEffect(() => {
    if (userMenuOpen) {
      const handleClickOutside = (e) => {
        const userMenu = document.querySelector('[data-user-menu]');
        const userButton = document.querySelector('[data-user-button]');
        if (
          userMenu &&
          userButton &&
          !userMenu.contains(e.target) &&
          !userButton.contains(e.target)
        ) {
          setUserMenuOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [userMenuOpen]);

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
            {token ? (
              <div className="relative">
                <button
                  data-user-button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-all"
                >
                  <User size={18} />
                  {user?.name?.split(" ")[0] || "Account"}
                </button>
                {userMenuOpen && (
                  <div
                    data-user-menu
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    {/* Admin Links */}
                    {user?.role === "admin" && (
                      <>
                        <Link
                          to="/admin"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard size={18} />
                          Admin Dashboard
                        </Link>
                        <div className="h-px bg-gray-100 my-1" />
                      </>
                    )}

                    {/* Doctor Links */}
                    {user?.role === "doctor" && (
                      <>
                        <Link
                          to="/doctor/dashboard"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard size={18} />
                          Doctor Dashboard
                        </Link>
                        <Link
                          to="/doctor/bookings"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Video size={18} />
                          Sessions
                        </Link>
                        <Link
                          to="/doctor/calendar"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Calendar size={18} />
                          Calendar
                        </Link>
                        <Link
                          to="/doctor/earnings"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <DollarSign size={18} />
                          Earnings
                        </Link>
                        <div className="h-px bg-gray-100 my-1" />
                      </>
                    )}

                    {/* User Links */}
                    {user?.role === "user" && (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard size={18} />
                          My Dashboard
                        </Link>
                        <Link
                          to="/dashboard/bookings"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Calendar size={18} />
                          My Bookings
                        </Link>
                        <Link
                          to="/dashboard/quizzes"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FileQuestion size={18} />
                          Quiz Responses
                        </Link>
                        <Link
                          to="/dashboard/profile"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User size={18} />
                          Profile
                        </Link>
                        <div className="h-px bg-gray-100 my-1" />
                      </>
                    )}

                    {/* Common Links for All Authenticated Users */}
                    <Link
                      to="/our-doctors"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User size={18} />
                      Browse Doctors
                    </Link>
                    <Link
                      to="/healmate-quiz"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FileQuestion size={18} />
                      Take Quiz
                    </Link>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/healmate-quiz"
                  className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  Take Quiz
                </Link>
              </>
            )}
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
            {token ? (
              <>
                {/* Admin Mobile Links */}
                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/admin"
                      className="py-3 text-center text-primary font-semibold"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <div className="h-px bg-gray-200" />
                  </>
                )}

                {/* Doctor Mobile Links */}
                {user?.role === "doctor" && (
                  <>
                    <Link
                      to="/doctor/dashboard"
                      className="py-3 text-center text-primary font-semibold"
                      onClick={() => setMenuOpen(false)}
                    >
                      Doctor Dashboard
                    </Link>
                    <Link
                      to="/doctor/bookings"
                      className="py-3 text-center text-gray-600 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sessions
                    </Link>
                    <Link
                      to="/doctor/calendar"
                      className="py-3 text-center text-gray-600 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Calendar
                    </Link>
                    <Link
                      to="/doctor/earnings"
                      className="py-3 text-center text-gray-600 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Earnings
                    </Link>
                    <div className="h-px bg-gray-200" />
                  </>
                )}

                {/* User Mobile Links */}
                {user?.role === "user" && (
                  <>
                    <Link
                      to="/dashboard"
                      className="py-3 text-center text-primary font-semibold"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Dashboard
                    </Link>
                    <Link
                      to="/dashboard/bookings"
                      className="py-3 text-center text-gray-600 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link
                      to="/dashboard/quizzes"
                      className="py-3 text-center text-gray-600 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Quiz Responses
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="py-3 text-center text-gray-600 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <div className="h-px bg-gray-200" />
                  </>
                )}

                {/* Common Mobile Links */}
                <Link
                  to="/our-doctors"
                  className="py-3 text-center text-gray-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Browse Doctors
                </Link>
                <Link
                  to="/healmate-quiz"
                  className="py-3 text-center text-gray-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Take Quiz
                </Link>
                <div className="h-px bg-gray-200" />
                <button
                  onClick={handleLogout}
                  className="py-3 bg-red-600 text-white rounded-full text-center font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-3 text-center text-primary font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/healmate-quiz"
                  className="py-3 bg-primary text-white rounded-full text-center font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Take Quiz
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

