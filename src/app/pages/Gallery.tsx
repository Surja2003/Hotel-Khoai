import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryItem = { id: number; title: string; subtitle: string; category: 'indoor' | 'outdoor' | 'night'; image: string; height: number; accent: string };

const items: GalleryItem[] = [
  { id: 15, title: 'Traditional Bengali Thali', subtitle: 'Steaming rice, curries, and sweets served in brass platters', category: 'indoor', image: '/assets/hotel_img_15.jpeg', height: 320, accent: '#E8B84B' },
  { id: 26, title: 'Bengali Thali Platter', subtitle: 'Authentic brass thali layout with fresh marigolds', category: 'indoor', image: '/assets/hotel_img_26.jpeg', height: 340, accent: '#00E5CC' },
  { id: 29, title: 'Traditional Thali Feast', subtitle: 'Multiple thalis laid out for a grand group feast', category: 'indoor', image: '/assets/hotel_img_29.jpeg', height: 260, accent: '#9B59B6' },
  { id: 6, title: 'Bamboo Dining Room', subtitle: 'Earthy wooden benches and hand-crafted table setups', category: 'indoor', image: '/assets/hotel_img_6.jpeg', height: 260, accent: '#00E5CC' },
  { id: 10, title: 'Bamboo Hall Seating', subtitle: 'Handmade bamboo structure illuminated with glowing lights', category: 'indoor', image: '/assets/hotel_img_10.jpeg', height: 340, accent: '#E8B84B' },
  { id: 11, title: 'Bamboo Ceiling Detail', subtitle: 'Cozy traditional bamboo weave pattern roofing', category: 'indoor', image: '/assets/hotel_img_11.jpeg', height: 220, accent: '#00E5CC' },
  { id: 12, title: 'Warm Dining Ambience', subtitle: 'Earthy wooden seating decorated for special events', category: 'indoor', image: '/assets/hotel_img_12.jpeg', height: 340, accent: '#E8B84B' },
  { id: 28, title: 'Bamboo Hall Table View', subtitle: 'Hand-woven roof and glowing lanterns in the main hall', category: 'indoor', image: '/assets/hotel_img_28.jpeg', height: 350, accent: '#9B59B6' },
  { id: 3, title: 'Rustic Gazebo Table', subtitle: 'Thatched roof outdoor gazebo dining table setup', category: 'outdoor', image: '/assets/hotel_img_3.jpeg', height: 320, accent: '#00E5CC' },
  { id: 8, title: 'Outdoor Seating View', subtitle: 'Scenic tables set in our lush landscaped gardens', category: 'outdoor', image: '/assets/hotel_img_8.jpeg', height: 200, accent: '#E8B84B' },
  { id: 9, title: 'Evening Gazebo Seating', subtitle: 'Palm trees and warm lights surrounding the gazebo', category: 'outdoor', image: '/assets/hotel_img_9.jpeg', height: 210, accent: '#00E5CC' },
  { id: 16, title: 'Garden Gazebo Dining', subtitle: 'Secluded outdoor dining spot within the valley gardens', category: 'outdoor', image: '/assets/hotel_img_16.jpeg', height: 230, accent: '#9B59B6' },
  { id: 19, title: 'Open Air Seating', subtitle: 'Earthy wooden tables in the garden with warm spotlights', category: 'outdoor', image: '/assets/hotel_img_19.jpeg', height: 215, accent: '#E8B84B' },
  { id: 36, title: 'Gazebo Lawn Dining', subtitle: 'A private thatched dining spot surrounded by palms', category: 'outdoor', image: '/assets/hotel_img_36.jpeg', height: 250, accent: '#00E5CC' },
  { id: 4, title: 'Lawn Entrance Pathway', subtitle: 'Red carpet event entrance decorated under the stars', category: 'night', image: '/assets/hotel_img_4.jpeg', height: 280, accent: '#9B59B6' },
  { id: 5, title: 'Anniversary Stage Backdrop', subtitle: 'Elegant anniversary celebration setup in the garden', category: 'night', image: '/assets/hotel_img_5.jpeg', height: 240, accent: '#E8B84B' },
  { id: 7, title: 'Lawn Event Celebration', subtitle: 'Anniversary party setup decorated at night', category: 'night', image: '/assets/hotel_img_7.jpeg', height: 250, accent: '#00E5CC' },
  { id: 24, title: 'Main Facade at Night', subtitle: 'Bamboo structure glowing warmly under the night sky', category: 'night', image: '/assets/hotel_img_24.jpeg', height: 270, accent: '#9B59B6' },
  { id: 30, title: 'Hotel Signboard Entrance', subtitle: 'Hanging decorative umbrellas and lights at the entrance', category: 'night', image: '/assets/hotel_img_30.jpeg', height: 330, accent: '#E8B84B' },
  { id: 31, title: 'Hanging Lights Entrance', subtitle: 'Vibrant glow of colorful umbrellas and fairy lights', category: 'night', image: '/assets/hotel_img_31.jpeg', height: 340, accent: '#00E5CC' },
];

const filters = [
  { key: 'all', label: 'All Spaces' },
  { key: 'indoor', label: 'Indoor' },
  { key: 'outdoor', label: 'Outdoor' },
  { key: 'night', label: 'Night' },
];

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 800)}
      onClick={onClick}
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        height: `${item.height}px`,
        position: 'relative',
        border: hovered ? `1px solid ${item.accent}44` : '1px solid rgba(255,255,255,0.04)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        boxShadow: hovered ? `0 12px 48px ${item.accent}20, 0 0 0 1px ${item.accent}22` : '0 4px 20px rgba(0,0,0,0.4)',
        transform: hovered ? 'scale(1.015)' : 'scale(1)',
        cursor: 'pointer',
        backgroundColor: '#120E0A',
      }}
      className="khoai-gallery-item-inner"
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      
      {/* Dark gradient overlay for text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(13,10,7,0.15) 0%, rgba(13,10,7,0.4) 60%, rgba(5,3,2,0.95) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Folk-eye watermark */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.06, pointerEvents: 'none' }}>
        <svg width="70" height="50" viewBox="0 0 70 50">
          <ellipse cx="35" cy="25" rx="33" ry="22" fill="none" stroke={item.accent} strokeWidth="1.5" />
          <circle cx="35" cy="25" r="10" fill={item.accent} opacity="0.6" />
          <circle cx="35" cy="25" r="5" fill="white" />
        </svg>
      </div>

      {/* Category badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: `${item.accent}18`,
        border: `1px solid ${item.accent}30`,
        color: item.accent,
        fontSize: '9px',
        padding: '4px 10px',
        borderRadius: '100px',
        letterSpacing: '1.5px',
        backdropFilter: 'blur(8px)',
      }}>
        {item.category.toUpperCase()}
      </div>

      {/* Hover zoom icon indicator */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        background: 'rgba(13,10,7,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s ease',
        color: '#E8B84B',
      }}>
        <ZoomIn size={14} />
      </div>

      {/* Bottom caption */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '48px 16px 16px',
        background: 'linear-gradient(transparent,rgba(5,3,2,0.95))',
      }}>
        <div style={{ fontFamily: '"Playfair Display", serif', color: '#F5ECD7', fontSize: 'clamp(15px,2.2vw,18px)', marginBottom: '4px', transition: 'color 0.3s', lineHeight: 1.3 }}>
          {item.title}
        </div>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.25 }}
          style={{ color: '#9C8A6E', fontSize: '12px', lineHeight: 1.5 }}
        >
          {item.subtitle}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Gallery | Hotel খোয়াই — Bamboo Hall, Gazebo & Events | Orgram Bardhaman';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Take a visual tour of Hotel খোয়াই. Browse high-quality photos of our rustic Bamboo Dining Hall, fairy-lit outdoor Gazebos, and mouth-watering Bengali dishes.');
    }
  }, []);

  const filtered = active === 'all' ? items : items.filter(i => i.category === active);

  const openLightbox = (itemIndex: number) => {
    setLightboxIndex(itemIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filtered.length - 1 : (prev ?? 0) - 1));
    }
  };

  const showNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filtered.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  return (
    <div style={{ backgroundColor: '#0D0A07', minHeight: '100vh' }}>
      {/* Page hero */}
      <section style={{ padding: 'clamp(100px,14vw,160px) 24px clamp(40px,6vw,80px)', background: 'radial-gradient(ellipse at 30% 100%, #1A0D00 0%, #0D0A07 55%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ fontFamily: '"Tiro Bangla", serif', fontSize: 'clamp(120px,30vw,260px)', color: '#00E5CC', opacity: 0.025, lineHeight: 1 }}>দৃশ্য</div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Visual Journey</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px,7vw,72px)', color: '#F5ECD7', lineHeight: 1.15, marginBottom: '14px' }}>Gallery</h1>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#00E5CC', fontSize: 'clamp(18px,3vw,28px)', marginBottom: '20px', textShadow: '0 0 30px rgba(0,229,204,0.35)' }}>আমাদের গ্যালারি</div>
          <p style={{ color: '#9C8A6E', maxWidth: '480px', margin: '0 auto', lineHeight: 1.85, fontSize: 'clamp(13px,2vw,15px)' }}>
            Glimpses of our spaces — from bamboo interiors to fairy-lit gazebos and celebratory garden layouts under the Khoai Valley sky.
          </p>
        </motion.div>
      </section>

      {/* Filter */}
      <div style={{ borderBottom: '1px solid rgba(232,184,75,0.08)', padding: '0 24px' }}>
        <div className="khoai-tab-scroll" style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '8px', padding: '16px 0' }}>
          {filters.map(f => {
            const count = f.key === 'all' ? items.length : items.filter(i => i.category === f.key).length;
            return (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                style={{
                  flexShrink: 0,
                  padding: '10px 20px',
                  borderRadius: '100px',
                  border: active === f.key ? '1px solid #E8B84B' : '1px solid rgba(232,184,75,0.18)',
                  backgroundColor: active === f.key ? '#E8B84B' : 'transparent',
                  color: active === f.key ? '#0D0A07' : '#9C8A6E',
                  cursor: 'pointer',
                  fontSize: '13px',
                  letterSpacing: '0.3px',
                  fontWeight: active === f.key ? 700 : 400,
                  transition: 'all 0.25s',
                  fontFamily: '"DM Sans", sans-serif',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {f.label}
                <span style={{ opacity: 0.65, fontSize: '11px' }}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry Section */}
      <section style={{ padding: 'clamp(32px,4vw,52px) 24px clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="khoai-gallery-masonry"
            >
              {filtered.map((item, index) => (
                <div key={item.id} className="khoai-gallery-item-wrapper">
                  <GalleryCard item={item} onClick={() => openLightbox(index)} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#9C8A6E' }}>No spaces in this category yet.</div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5,3,2,0.98)',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            {/* Header / Controls */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#F5ECD7',
              zIndex: 2,
            }}>
              <div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(16px, 2.5vw, 22px)', color: '#F5ECD7', margin: 0, lineHeight: 1.25 }}>
                  {filtered[lightboxIndex].title}
                </h3>
                <span style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                  Image {lightboxIndex + 1} of {filtered.length} · {filtered[lightboxIndex].category.toUpperCase()}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#F5ECD7',
                  transition: 'background-color 0.2s',
                }}
                aria-label="Close zoomed view"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={showPrev}
              style={{
                position: 'absolute',
                left: '20px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#F5ECD7',
                zIndex: 2,
                userSelect: 'none',
              }}
              className="hidden md:flex"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={showNext}
              style={{
                position: 'absolute',
                right: '20px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#F5ECD7',
                zIndex: 2,
                userSelect: 'none',
              }}
              className="hidden md:flex"
            >
              <ChevronRight size={24} />
            </button>

            {/* Lightbox Content Area */}
            <div
              style={{
                width: '100%',
                maxWidth: '900px',
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={filtered[lightboxIndex].image}
                alt={filtered[lightboxIndex].title}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
                  touchAction: 'pan-y pinch-zoom',
                }}
              />
              <div style={{
                color: '#9C8A6E',
                fontSize: '13px',
                marginTop: '16px',
                textAlign: 'center',
                maxWidth: '600px',
                lineHeight: 1.6,
                padding: '0 10px',
              }}>
                {filtered[lightboxIndex].subtitle}
              </div>
            </div>

            {/* Bottom Mobile navigation indicator buttons */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px', zIndex: 2 }}>
              <button
                onClick={showPrev}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#F5ECD7',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
                className="flex md:hidden"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button
                onClick={showNext}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#F5ECD7',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
                className="flex md:hidden"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pull quote */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 24px', borderTop: '1px solid rgba(232,184,75,0.08)', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(232,184,75,0.5),transparent)', margin: '0 auto 28px' }} />
          <blockquote style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(16px,2.5vw,24px)', color: '#F5ECD7', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '18px' }}>
            "Every corner of Hotel খোয়াই is a frame-worthy moment."
          </blockquote>
          <div style={{ color: '#4A3F30', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>A Guest Review</div>
          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(232,184,75,0.5),transparent)', margin: '28px auto 0' }} />
        </div>
      </section>
    </div>
  );
}
