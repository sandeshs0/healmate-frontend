import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Is this actually private? How can I trust you?",
    answer:
      "Absolutely. Your privacy is our top priority. All sessions are end-to-end encrypted, we use stealth billing (shows as 'HM Wellness'), and we never share your information with anyone. We don't even require your real name to get started. Our servers are HIPAA-compliant and we follow strict data protection protocols.",
  },
  {
    question: "What happens in a counseling session?",
    answer:
      "Sessions are 30-45 minute video calls with MBBS-qualified doctors who specialize in men's sexual health. You'll discuss your concerns in a judgment-free space, receive personalized guidance, and learn practical techniques. It's conversational, not clinical. Think of it as talking to a knowledgeable friend who actually has answers.",
  },
  {
    question: "Is this therapy or medical treatment?",
    answer:
      "HealMate provides counseling and guidance only. We don't prescribe medication, make diagnoses, or replace medical treatment. Our doctors help you understand the psychological and behavioral aspects of sexual health. If we identify something that needs medical attention, we'll recommend you see an appropriate specialist.",
  },
  {
    question: "Who are the doctors?",
    answer:
      "All our counselors are MBBS-qualified doctors with additional training in men's sexual health and psychology. They're selected not just for their qualifications, but for their ability to create a comfortable, non-judgmental space. Many have years of experience helping men work through similar challenges.",
  },
  {
    question: "What if someone finds out I'm using this?",
    answer:
      "We've designed every touchpoint with discretion in mind. Our billing shows as 'HM Wellness', not HealMate. We never send physical mail. Email communications are minimal and generic. The app icon and notifications are designed to be inconspicuous. Your secret is safe with us.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Sessions are priced affordably with transparent pricing. There are no subscriptions, no hidden fees, and no upsells. You pay per session, only when you book. Check our pricing page for current rates. We believe quality men's health support shouldn't break the bank.",
  },
  {
    question: "Can I cancel or reschedule?",
    answer:
      "Yes! Life happens. You can cancel or reschedule up to 4 hours before your session for a full refund or credit. We're flexible because we know booking a session like this takes courage, and sometimes timing just doesn't work out.",
  },
  {
    question: "What issues can HealMate help with?",
    answer:
      "We specialize in performance anxiety, premature concerns, libido and desire issues, erectile confidence, intimacy challenges, and the mental blocks that affect sexual wellness. If you're dealing with stress, pressure, or overthinking in the bedroom, we can help.",
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-primary group-hover:text-accent transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          size={24}
          className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed pr-12">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            Questions? <span className="text-accent">We've got answers.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Everything you need to know about HealMate. Can't find what you're
            looking for? Reach out to our support team.
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <a
            href="mailto:support@healmate.com"
            className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}
