import React from 'react';
import { Instagram, Music2 } from 'lucide-react';

interface Props {
  instagramUrl?: string;
  tiktokUrl?: string;
}

const FloatingSocial: React.FC<Props> = ({
  instagramUrl = 'https://www.instagram.com/growsestore/',
  tiktokUrl = 'https://www.tiktok.com/@growsestore',
}) => {
  const links = [
    { label: 'Instagram', href: instagramUrl, icon: <Instagram size={20} />, bg: 'bg-[#E4405F]' },
    { label: 'TikTok', href: tiktokUrl, icon: <Music2 size={20} />, bg: 'bg-[#000000]' },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[55] flex flex-col gap-3">
      {links.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={`${item.bg} text-white w-12 h-12 rounded-full shadow-lg shadow-black/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all`}
          aria-label={item.label}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default FloatingSocial;
