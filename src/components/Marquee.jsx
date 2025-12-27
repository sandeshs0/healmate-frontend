import { Lock, Shield, UserCheck, Video } from "lucide-react";

const items = [
  { icon: <Shield size={18} />, text: "Secure Private Sessions" },
  { icon: <Video size={18} />, text: "No Recordings Ever" },
  { icon: <UserCheck size={18} />, text: "MBBS Qualified Doctors" },
  { icon: <Lock size={18} />, text: "100% Confidential" },
];

export default function Marquee() {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-primary py-4 overflow-hidden relative">
      {/* Gradient masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary to-transparent z-10" />

      <div className="marquee-container">
        <div className="marquee-content">
          {duplicatedItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mx-8 text-white/90 whitespace-nowrap"
            >
              <span className="text-accent">{item.icon}</span>
              <span className="font-medium tracking-wide text-sm uppercase">
                {item.text}
              </span>
              <span className="mx-6 text-white/30">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



