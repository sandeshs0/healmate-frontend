import {
  Clock,
  CreditCard,
  EyeOff,
  Heart,
  Lock,
  ShieldCheck,
} from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-text selection:bg-accent/30">
      <Header />
      <Hero />

      {/* Manifesto Section */}
      <section className="py-24 bg-primary text-white overflow-hidden md:rounded-t-[6rem] rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-black leading-tight mb-8">
                Dear Men,
                <br />
                <span className="text-accent underline decoration-white/20">
                  Stay Hard.
                </span>
              </h2>
              <p className="text-lg md:text-xl text-primary-light leading-relaxed mb-6">
                Not in the way the internet shouts about but in the way that
                actually matters. Mentally steady. Emotionally grounded. Present
                under pressure.
              </p>

              <p className="text-lg md:text-xl text-primary-light leading-relaxed">
                Stress, expectations, and constant performance demands don't
                just stay in your head. They show up in confidence, intimacy,
                and how connected you feel to yourself and others.
              </p>
            </div>

            {/* Single Image */}
            <div className="pb-0">
              <img
                src="banana.png"
                className="bottom-0 w-full h-[400px] md:h-[500px] object-cover"
                alt="Confidence and strength"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution - Feature Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              Performance Architecture
            </h2>
            <p className="text-gray-500 text-lg">
              Targeting the root causes of sexual hurdles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Clock className="text-accent" />,
                title: "Longevity Training",
                desc: "Move from the sprint to the marathon with cognitive behavioral techniques.",
                img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400",
              },
              {
                icon: <Heart className="text-secondary" />,
                title: "Drive & Libido",
                desc: "Unlock the psychological barriers preventing natural desire and morning wood.",
                img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
              },
              {
                icon: <ShieldCheck className="text-primary" />,
                title: "Anxiety Shield",
                desc: "Stop overthinking. Learn to stay present in the moment and out of your head.",
                img: "https://images.unsplash.com/photo-1516534775068-ba3e84529519?auto=format&fit=crop&q=80&w=400",
              },
            ].map((card, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                  <img
                    src={card.img}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={card.title}
                  />
                  <div className="absolute top-4 left-4 bg-white p-3 rounded-2xl shadow-lg">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy First Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-xl flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-display font-bold text-primary mb-6">
                Privacy is our <span className="text-accent">North Star.</span>
              </h2>
              <div className="grid gap-6">
                {[
                  {
                    icon: <EyeOff size={20} />,
                    title: "Stealth Billing",
                    text: "Statements show 'HM Wellness' only.",
                  },
                  {
                    icon: <Lock size={20} />,
                    title: "End-to-End Encryption",
                    text: "Your conversations are mathematically private.",
                  },
                  {
                    icon: <CreditCard size={20} />,
                    title: "No Paper Trail",
                    text: "Digital first, zero physical mail to your home.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
                className="rounded-3xl shadow-2xl"
                alt="Partner connection"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-display font-black text-primary mb-10 leading-tight">
            The best version of you{" "}
            <span className="text-accent">starts here.</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-12 py-6 bg-primary text-white rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-primary/30">
              Book Session
            </button>
            <button className="px-12 py-6 border-2 border-primary text-primary rounded-full font-bold text-xl hover:bg-primary hover:text-white transition-all">
              Learn More
            </button>
          </div>
          <p className="mt-8 text-gray-400 font-medium">
            100% Confidential • No Subscriptions • MBBS Guided
          </p>
        </div>

        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      </section>

      <Footer />
    </div>
  );
}
