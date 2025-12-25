import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 relative z-10">
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-primary leading-tight mb-8">
            Some things are easier to talk about
            <span className="italic text-accent"> in private.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed">
            HealMate offers confidential online counseling for men focused on
            understanding, not quick fixes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-base hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Book a Session <ChevronRight size={18} />
            </Link>

            <Link
              to="/pricing"
              className="px-8 py-4 border border-primary/30 text-primary rounded-full font-semibold text-base hover:bg-primary/5 transition-all text-center"
            >
              See Pricing
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
            <img
              src="hero.jpg"
              alt="Confidential counseling session"
              className=" object-cover"
            />
            {/* Subtle overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
