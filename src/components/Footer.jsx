import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/healmate.png"
              alt="HealMate Logo"
              className="h-8 w-auto"
            />
            <span className="text-3xl font-display font-black tracking-tight">
              HEALMATE
            </span>
          </div>
          <p className="text-primary-light max-w-sm text-lg leading-relaxed">
            We are a specialized counseling platform focusing on male sexual
            wellbeing through psychological intervention and medical guidance.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-accent">Navigation</h4>
          <ul className="space-y-4 text-primary-light">
            <li>
              <Link to="/doctors" className="hover:text-white transition-colors">
                The Doctors
              </Link>
            </li>
            <li>
              <a href="#method" className="hover:text-white transition-colors">
                How it Works
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Ethics
              </a>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-accent">Legal</h4>
          <ul className="space-y-4 text-primary-light">
            <li>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/hipaa" className="hover:text-white transition-colors">
                HIPAA Compliance
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 mt-20 pt-10 text-center text-sm text-primary-light">
        © {new Date().getFullYear()} HealMate. This is not a pharmacy. We do
        not provide prescriptions.
      </div>
    </footer>
  );
}

