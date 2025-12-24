import React, { useEffect, useRef, useState } from 'react';
import './BannerMedio.css';
import defaultBanners, { loadBanners } from '../../data/banners';

function BannerMedio({ texto, backgroundImage, bannerKey }) {

  const bannerRef = useRef(null);
  const [images, setImages] = useState({ desktop_image: backgroundImage, mobile_image: backgroundImage });

  useEffect(() => {
    const banner = bannerRef.current;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            banner.classList.add("banner-visible");
            obs.unobserve(banner);
          }
        });
      },
      { threshold: 0.3 } // dispara cuando el 30% del banner está visible
    );

    observer.observe(banner);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        if (!bannerKey) return;
        const data = await loadBanners();
        const entry = data[bannerKey] || defaultBanners[bannerKey];
        if (active && entry) {
          setImages({
            desktop_image: entry.desktop_image || entry.mobile_image || backgroundImage,
            mobile_image: entry.mobile_image || entry.desktop_image || backgroundImage,
          });
        }
      } catch (e) {
        console.error('Error cargando banner medio', e);
      }
    };

    if (bannerKey) {
      load();
    } else {
      setImages({ desktop_image: backgroundImage, mobile_image: backgroundImage });
    }

    return () => {
      active = false;
    };
  }, [bannerKey, backgroundImage]);

  const bg = typeof window !== 'undefined' && window.innerWidth < 768
    ? (images.mobile_image || images.desktop_image)
    : (images.desktop_image || images.mobile_image);

  return (
    <div
      ref={bannerRef}
      className="banner-medio"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="banner-overlay"></div>

      <h1 className="banner-title">{texto}</h1>
    </div>
  );
}

export default BannerMedio;
