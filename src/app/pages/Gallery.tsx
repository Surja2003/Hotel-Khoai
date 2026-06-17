import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import ResponsiveMasonry from 'react-responsive-masonry';

type GalleryItem = { id: number; title: string; subtitle: string; category: 'indoor' | 'outdoor' | 'night'; gradient: string; height: number; accent: string; image?: string };

const items: GalleryItem[] = [
  { id: 1, title: 'The Bamboo Hall', subtitle: 'Hand-woven ceiling, warm lantern light', category: 'indoor', gradient: 'linear-gradient(160deg,#3D1E00,#8B4500,#2A1200)', height: 300, accent: '#E8B84B' },
  { id: 2, title: 'Fairy Lit Gazebo', subtitle: 'Hundreds of lights in the valley dark', category: 'outdoor', gradient: 'linear-gradient(150deg,#14002A,#5000A0,#0A0018)', height: 220, accent: '#9B59B6', image: '/assets/gazebo_night.png' },
  { id: 3, title: 'Folk Art Walls', subtitle: 'Santali-inspired tribal murals', category: 'indoor', gradient: 'linear-gradient(155deg,#002818,#008060,#001208)', height: 260, accent: '#00E5CC' },
  { id: 4, title: 'Open Kitchen', subtitle: 'Where flavours come to life', category: 'indoor', gradient: 'linear-gradient(160deg,#2D0800,#8B2800,#1A0400)', height: 200, accent: '#FF6B35' },
  { id: 5, title: 'Starlit Terrace', subtitle: 'Open-air under the Khoai sky', category: 'night', gradient: 'linear-gradient(150deg,#060810,#14183A,#030408)', height: 340, accent: '#00E5CC' },
  { id: 6, title: 'Riverside Corner', subtitle: 'A table with a view', category: 'outdoor', gradient: 'linear-gradient(155deg,#001522,#004468,#000810)', height: 250, accent: '#4BE8D4' },
  { id: 7, title: 'The Dining Room', subtitle: 'Classic warmth, rustic detail', category: 'indoor', gradient: 'linear-gradient(160deg,#1A1000,#5A3600,#100A00)', height: 210, accent: '#E8B84B' },
  { id: 8, title: 'Night Vibes', subtitle: 'The magic hour at Khoai', category: 'night', gradient: 'linear-gradient(150deg,#080412,#20103A,#040208)', height: 320, accent: '#9B59B6' },
  { id: 9, title: 'Bamboo Entrance', subtitle: 'First impressions that last', category: 'outdoor', gradient: 'linear-gradient(155deg,#1A1000,#6B4400,#100800)', height: 230, accent: '#E8B84B', image: '/assets/hotel_exterior.png' },
];

const filters = [
  { key: 'all', label: 'All Spaces' },
  { key: 'indoor', label: 'Indoor' },
  { key: 'outdoor', label: 'Outdoor' },
  { key: 'night', label: 'Night' },
];

function GalleryCard({ item }: { item: GalleryItem }) {
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
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        background: item.image ? `linear-gradient(to bottom, rgba(13,10,7,0.15) 0%, rgba(13,10,7,0.85) 100%), url("${item.image}") center/cover no-repeat` : item.gradient,
        height: `${item.height}px`,
        position: 'relative',
        border: hovered ? `1px solid ${item.accent}44` : '1px solid rgba(255,255,255,0.04)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        boxShadow: hovered ? `0 12px 48px ${item.accent}20, 0 0 0 1px ${item.accent}22` : '0 4px 20px rgba(0,0,0,0.4)',
        transform: hovered ? 'scale(1.015)' : 'scale(1)',
        cursor: 'pointer',
        marginBottom: '0',
      }}
    >
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

      {/* Hover shimmer overlay */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, ${item.accent}10 0%, transparent 70%)`, pointerEvents: 'none' }}
        />
      )}

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
  const filtered = active === 'all' ? items : items.filter(i => i.category === active);

  return (
    <div style={{ backgroundColor: '#0D0A07' }}>
      {/* Page hero */}
      <section style={{ padding: 'clamp(100px,14vw,160px) 24px clamp(40px,6vw,70px)', background: 'radial-gradient(ellipse at 30% 100%, #1A0D00 0%, #0D0A07 55%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ fontFamily: '"Tiro Bangla", serif', fontSize: 'clamp(120px,30vw,260px)', color: '#00E5CC', opacity: 0.025, lineHeight: 1 }}>দৃশ্য</div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Visual Journey</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px,7vw,72px)', color: '#F5ECD7', lineHeight: 1.15, marginBottom: '14px' }}>Gallery</h1>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#00E5CC', fontSize: 'clamp(18px,3vw,28px)', marginBottom: '20px', textShadow: '0 0 30px rgba(0,229,204,0.35)' }}>আমাদের গ্যালারি</div>
          <p style={{ color: '#9C8A6E', maxWidth: '480px', margin: '0 auto', lineHeight: 1.85, fontSize: 'clamp(13px,2vw,15px)' }}>
            Glimpses of our spaces — from bamboo interiors to fairy-lit gazebos under the Khoai Valley sky.
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

      {/* Masonry */}
      <section style={{ padding: 'clamp(32px,4vw,52px) 24px clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 600: 2, 1024: 3 }}>
                <Masonry gutter="14px">
                  {filtered.map(item => (
                    <GalleryCard key={item.id} item={item} />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#9C8A6E' }}>No spaces in this category yet.</div>
          )}
        </div>
      </section>

      {/* Pull quote */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 24px', borderTop: '1px solid rgba(232,184,75,0.08)', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(232,184,75,0.5),transparent)', margin: '0 auto 28px' }} />
          <blockquote style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(16px,2.5vw,24px)', color: '#F5ECD7', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '18px' }}>
            "Every corner of Hotel Khoai is a frame-worthy moment."
          </blockquote>
          <div style={{ color: '#4A3F30', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>A Guest Review</div>
          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(232,184,75,0.5),transparent)', margin: '28px auto 0' }} />
        </div>
      </section>
    </div>
  );
}
