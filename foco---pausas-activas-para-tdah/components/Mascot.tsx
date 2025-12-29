
import React from 'react';

const COLORS = {
  fur1: "#F08A1A",
  fur2: "#E06E10",
  fur3: "#C85C0D",
  cream: "#F6E2CF",
  dark: "#2A1A14",
  nut1: "#7A4C2A",
  nut2: "#5F3A22",
  white: "#FFFFFF"
};

export const AngrySquirrelSvg: React.FC = () => (
  <svg viewBox="200 100 330 550" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {/* Cola */}
    <polygon points="440,240 560,310 540,520 420,520 360,360" fill={COLORS.fur3}/>
    <polygon points="420,260 520,320 505,500 420,500 375,360" fill={COLORS.fur2}/>
    {/* Orejas */}
    <polygon points="260,190 320,110 360,210" fill={COLORS.fur3}/>
    <polygon points="360,210 410,110 470,190" fill={COLORS.fur3}/>
    {/* Cabeza */}
    <polygon points="220,260 300,170 460,170 520,260 460,360 300,360" fill={COLORS.fur1}/>
    <polygon points="235,320 295,280 310,360 250,380" fill={COLORS.cream}/>
    <polygon points="485,320 425,280 410,360 470,380" fill={COLORS.cream}/>
    {/* Cuerpo */}
    <polygon points="260,360 460,360 520,520 430,590 290,590 210,520" fill={COLORS.fur2}/>
    <polygon points="300,420 420,420 450,560 330,590 260,540" fill={COLORS.cream}/>
    {/* Patas */}
    <polygon points="250,580 330,590 310,640 230,640" fill={COLORS.dark}/>
    <polygon points="390,590 470,580 490,640 410,640" fill={COLORS.dark}/>
    {/* Brazos */}
    <polygon points="235,450 315,440 335,515 260,535" fill={COLORS.fur3}/>
    <polygon points="485,450 405,440 385,515 460,535" fill={COLORS.fur3}/>
    {/* Nuez */}
    <polygon points="335,440 405,440 445,495 405,560 335,560 295,495" fill={COLORS.nut1}/>
    <polygon points="355,452 385,452 405,495 385,540 355,540 335,495" fill={COLORS.nut2} opacity=".55"/>
    <rect x="367" y="420" width="12" height="26" rx="6" fill={COLORS.nut2}/>
    {/* Ojos nerviosos */}
    <polygon points="285,290 335,275 345,320 295,330" fill={COLORS.white}/>
    <polygon points="405,275 455,290 445,330 395,320" fill={COLORS.white}/>
    <polygon points="305,292 330,284 336,312 312,320" fill={COLORS.dark}/>
    <polygon points="430,292 405,284 399,312 423,320" fill={COLORS.dark}/>
    {/* Cejas enojadas */}
    <polygon points="270,265 350,255 345,275 275,285" fill={COLORS.dark}/>
    <polygon points="470,265 390,255 395,275 465,285" fill={COLORS.dark}/>
    {/* Nariz */}
    <polygon points="358,332 382,332 370,352" fill={COLORS.dark}/>
    {/* Boca nerviosa */}
    <polygon points="325,365 370,350 415,365 405,400 335,400" fill="#4B1F1A"/>
    <polygon points="350,372 370,382 390,372 390,392 350,392" fill={COLORS.white} opacity=".9"/>
    {/* “Rayitos” de estrés */}
    <polygon points="320,70 340,35 360,75" fill={COLORS.dark} opacity=".75"/>
    <polygon points="380,85 410,50 420,95" fill={COLORS.dark} opacity=".75"/>
  </svg>
);

export const CalmSquirrelSvg: React.FC = () => (
  <svg viewBox="600 100 330 550" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {/* Cola */}
    <polygon points="760,230 890,290 930,510 810,540 700,420" fill={COLORS.fur3}/>
    <polygon points="770,250 870,300 900,500 810,520 720,410" fill={COLORS.fur2}/>
    {/* Orejas */}
    <polygon points="660,190 720,110 760,210" fill={COLORS.fur3}/>
    <polygon points="760,210 810,110 870,190" fill={COLORS.fur3}/>
    {/* Cabeza */}
    <polygon points="620,260 700,170 860,170 920,260 860,360 700,360" fill={COLORS.fur1}/>
    <polygon points="635,320 695,280 710,360 650,380" fill={COLORS.cream}/>
    <polygon points="885,320 825,280 810,360 870,380" fill={COLORS.cream}/>
    {/* Cuerpo */}
    <polygon points="660,360 860,360 920,520 830,590 690,590 610,520" fill={COLORS.fur2}/>
    <polygon points="700,420 820,420 850,560 730,590 660,540" fill={COLORS.cream}/>
    {/* Patas */}
    <polygon points="650,580 730,590 710,640 630,640" fill={COLORS.dark}/>
    <polygon points="790,590 870,580 890,640 810,640" fill={COLORS.dark}/>
    {/* Brazos */}
    <polygon points="635,450 715,440 735,515 660,535" fill={COLORS.fur3}/>
    <polygon points="885,450 805,440 785,515 860,535" fill={COLORS.fur3}/>
    {/* Nuez */}
    <polygon points="735,440 805,440 845,495 805,560 735,560 695,495" fill={COLORS.nut1}/>
    <polygon points="755,452 785,452 805,495 785,540 755,540 735,495" fill={COLORS.nut2} opacity=".55"/>
    <rect x="767" y="420" width="12" height="26" rx="6" fill={COLORS.nut2}/>
    {/* Ojos tranquilos */}
    <path d="M700 300 Q730 320 760 300" fill="none" stroke={COLORS.dark} strokeWidth="12" strokeLinecap="round"/>
    <path d="M780 300 Q810 320 840 300" fill="none" stroke={COLORS.dark} strokeWidth="12" strokeLinecap="round"/>
    {/* Sonrisa */}
    <path d="M735 360 Q770 390 805 360" fill="none" stroke={COLORS.dark} strokeWidth="12" strokeLinecap="round"/>
    {/* Nariz */}
    <polygon points="758,332 782,332 770,352" fill={COLORS.dark}/>
    {/* Brillitos */}
    <polygon points="930,150 950,175 925,190 905,165" fill={COLORS.white} opacity=".9"/>
  </svg>
);
