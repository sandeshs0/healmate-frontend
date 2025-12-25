import { Calendar, MessageCircle, Sparkles, UserPlus } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <UserPlus size={28} />,
    title: "Create Your Profile",
    description:
      "Sign up in under 2 minutes. No real name required. Just an email and you're in.",
    accent: "bg-accent/10 text-accent",
  },
  {
    number: "02",
    icon: <MessageCircle size={28} />,
    title: "Share Your Concerns",
    description:
      "Take a quick, private questionnaire. Helps us match you with the right specialist.",
    accent: "bg-secondary/10 text-secondary",
  },
  {
    number: "03",
    icon: <Calendar size={28} />,
    title: "Book Your Session",
    description:
      "Pick a doctor, choose a time that works. Flexible scheduling, no waiting rooms.",
    accent: "bg-primary/10 text-primary",
  },
  {
    number: "04",
    icon: <Sparkles size={28} />,
    title: "Start Your Journey",
    description:
      "Join your private video session. Get personalized guidance and actionable techniques.",
    accent: "bg-accent/10 text-accent",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20 scroll-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From signup to session in four simple steps. No complexity, no
            barriers.
          </p>
        </div>

        {/* Steps Grid - Broken Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`scroll-fade-in group relative ${
                i % 2 === 1 ? "md:translate-y-12" : ""
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 border border-transparent hover:border-gray-100">
                {/* Number */}
                <span className="text-7xl font-display font-black text-gray-100 absolute -top-4 -left-2 select-none group-hover:text-accent/20 transition-colors duration-500">
                  {step.number}
                </span>

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${step.accent} flex items-center justify-center mb-6`}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connecting line - desktop only */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
      </div>
    </section>
  );
}

