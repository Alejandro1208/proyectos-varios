
import React from 'react';

const SocialSidebar: React.FC = () => {
  const socials = [
    { icon: 'fa-tiktok', color: 'bg-[#000000]', href: '#' },
    { icon: 'fa-instagram', color: 'bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]', href: '#' },
    { icon: 'fa-facebook-f', color: 'bg-[#1877F2]', href: '#' },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2 p-3">
      {socials.map((social, idx) => (
        <a
          key={idx}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${social.color} w-12 h-12 flex items-center justify-center rounded-2xl text-white text-xl shadow-lg transition-all hover:-translate-x-2 hover:rounded-xl`}
        >
          <i className={`fab ${social.icon}`}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
