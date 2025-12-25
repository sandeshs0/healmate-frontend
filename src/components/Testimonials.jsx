import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I was skeptical at first. But after just one session, I realized how much I'd been holding in. The doctor was genuinely understanding, not clinical at all.",
    author: "Anonymous",
    location: "Delhi",
    age: "32",
    highlight: "genuinely understanding",
  },
  {
    quote:
      "The privacy aspect sold me. No one knows, my wife doesn't know, and that's exactly what I needed to actually open up about this stuff.",
    author: "Anonymous",
    location: "Mumbai",
    age: "28",
    highlight: "No one knows",
  },
  {
    quote:
      "Thought I needed pills. Turns out I needed someone to actually listen and give me real techniques. Three sessions in and the difference is night and day.",
    author: "Anonymous",
    location: "Bangalore",
    age: "35",
    highlight: "real techniques",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 scroll-fade-in">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            Real Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            From men like you.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl">
            Anonymous feedback from real sessions. Names hidden, stories real.
          </p>
        </div>

        {/* Testimonial Cards - Staggered Layout */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`scroll-fade-in ${
                i === 1 ? "md:-translate-y-8" : ""
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="bg-white rounded-3xl p-8 h-full shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100 relative group">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-2 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Quote size={20} className="text-white" />
                </div>

                {/* Quote Text */}
                <p className="text-gray-600 leading-relaxed mt-6 mb-6 text-lg">
                  "
                  {t.quote.split(t.highlight).map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <span className="text-primary font-semibold bg-accent/10 px-1 rounded">
                          {t.highlight}
                        </span>
                      )}
                    </span>
                  ))}
                  "
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {t.age}
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{t.author}</p>
                    <p className="text-sm text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-sm text-gray-400 mt-12 scroll-fade-in">
          All testimonials are from verified sessions. Identities protected for
          privacy.
        </p>
      </div>
    </section>
  );
}

