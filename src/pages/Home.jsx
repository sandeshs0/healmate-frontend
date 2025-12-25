import {
  ArrowRight,
  Brain,
  Clock,
  CreditCard,
  EyeOff,
  Flame,
  Lock,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Marquee from "../components/Marquee";
import Testimonials from "../components/Testimonials";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Home() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-white text-text selection:bg-accent/30 grain">
      <Header />
      <Hero />

      {/* Trust Marquee */}
      <Marquee />

      {/* Manifesto Section */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-fade-in">
              <h2 className="text-5xl md:text-7xl font-display font-black leading-tight mb-8">
                Dear Men,
                <br />
                <span className="text-accent underline decoration-white/20">
                  Stay Hard.
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                Not in the way the internet shouts about — but in the way that
                actually matters. Mentally steady. Emotionally grounded. Present
                under pressure.
              </p>

              <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                Stress, expectations, and constant performance demands don't
                just stay in your head. They show up in confidence, intimacy,
                and how connected you feel to yourself and others.
              </p>
            </div>

            {/* Image with offset effect */}
            <div className="scroll-fade-in relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-3xl transform rotate-3" />
              <img
                src="banana.png"
                className="relative rounded-2xl w-full h-[400px] md:h-[500px] object-cover shadow-2xl"
                alt="Confidence and strength"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Problem/Solution - Redesigned Feature Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="mb-16 scroll-fade-in">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
              What We Address
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              Performance Architecture
            </h2>
            <p className="text-gray-500 text-lg max-w-xl">
              Targeting the root causes, not just the symptoms.
            </p>
          </div>

          {/* Broken Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Large Feature Card */}
            <div className="lg:col-span-7 scroll-fade-in">
              <div className="group relative bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 lg:p-12 h-full overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-8">
                    <Clock size={32} className="text-accent" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                    Longevity Training
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                    Move from the sprint to the marathon. Learn cognitive
                    behavioral techniques that rewire your response patterns and
                    build lasting control.
                  </p>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all"
                  >
                    Start Training <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Stacked Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div
                className="scroll-fade-in group bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100"
                style={{ animationDelay: "100ms" }}
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Flame size={28} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-primary mb-3">
                  Drive & Libido
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Unlock the psychological barriers preventing natural desire.
                  Reconnect with your body's natural rhythms.
                </p>
              </div>

              <div
                className="scroll-fade-in group bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100"
                style={{ animationDelay: "200ms" }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <Brain size={28} className="text-accent" />
                </div>
                <h3 className="text-2xl font-display font-bold text-primary mb-3">
                  Anxiety Shield
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Stop the overthinking spiral. Master techniques to stay
                  present in the moment and out of your head.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Privacy First Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="scroll-fade-in bg-gradient-to-br from-gray-50 to-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <span className="inline-block px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-semibold mb-6">
                  Your Privacy, Protected
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8">
                  Privacy is our{" "}
                  <span className="text-accent">North Star.</span>
                </h2>
                <div className="grid gap-6">
                  {[
                    {
                      icon: <EyeOff size={22} />,
                      title: "Stealth Billing",
                      text: "Statements show 'HM Wellness' only. Nothing revealing.",
                    },
                    {
                      icon: <Lock size={22} />,
                      title: "End-to-End Encryption",
                      text: "Your conversations are mathematically private.",
                    },
                    {
                      icon: <CreditCard size={22} />,
                      title: "No Paper Trail",
                      text: "Digital first. Zero physical mail to your home.",
                    },
                    {
                      icon: <Shield size={22} />,
                      title: "Anonymous Profiles",
                      text: "Use any name. We never verify your identity.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 group"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 scroll-fade-in">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl transform -rotate-2" />
                  <img
                    src="https://images.unsplash.com/photo-1483706600674-e0c87d3fe85b?q=80&w=1207&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="relative rounded-3xl shadow-2xl"
                    alt="Secure and private"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center scroll-fade-in">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
            Ready to Begin?
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-black text-primary mb-6 leading-tight">
            The best version of you{" "}
            <span className="text-accent">starts here.</span>
          </h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            No judgment. No prescriptions. Just real guidance from qualified
            doctors who understand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-primary/30 inline-flex items-center justify-center gap-2"
            >
              Book Your First Session <ArrowRight size={20} />
            </Link>
            <Link
              to="/doctors"
              className="px-10 py-5 border-2 border-primary text-primary rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all"
            >
              Meet Our Doctors
            </Link>
          </div>
          <p className="mt-8 text-gray-400 font-medium">
            100% Confidential • No Subscriptions • MBBS Qualified
          </p>
        </div>

        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      </section>

      <Footer />
    </div>
  );
}
