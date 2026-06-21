import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ChevronDown, Star, ArrowRight } from 'lucide-react';
import { Preloader } from '../components/Preloader';
import FloatingContact from '../components/FloatingContact';

/* ─── Particle Canvas ─────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    init();

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string; life: number };

    const make = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.9 - 0.2,
      size: Math.random() * 2.2 + 0.4,
      opacity: Math.random() * 0.55 + 0.25,
      color: Math.random() > 0.52 ? '#E8B84B' : '#00E5CC',
      life: 1,
    });

    const particles: Particle[] = Array.from({ length: 75 }, make);
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.004;
        if (p.life <= 0 || p.y < -10) particles[i] = make();

        ctx.save();
        ctx.globalAlpha = p.opacity * p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => init();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

/* ─── Animated Counter ────────────────────────────────────── */
function useCounter(target: number) {
  const [count, setCount] = useState(0);
  const el = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      let start: number;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1800, 1);
        setCount(Math.round(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    if (el.current) obs.observe(el.current);
    return () => obs.disconnect();
  }, [target]);
  return { count, el };
}

function StatItem({ value, label, suffix = '+', icon }: { value: number; label: string; suffix?: string; icon?: React.ReactNode }) {
  const { count, el } = useCounter(value);
  return (
    <div ref={el} style={{ textAlign: 'center', padding: '28px 16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: '"Playfair Display", serif', fontSize: 'clamp(34px,5vw,52px)', color: '#E8B84B', lineHeight: 1, marginBottom: '8px' }}>
        {icon}
        {count}{suffix}
      </div>
      <div style={{ color: '#9C8A6E', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

/* ─── Gazebo Visual ───────────────────────────────────────── */
function GazeboVisual() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '360px',
      aspectRatio: '1',
      margin: '0 auto',
      position: 'relative',
      borderRadius: '16px',
      padding: '12px',
      background: 'linear-gradient(135deg, rgba(232,184,75,0.15), rgba(0,229,204,0.05))',
      border: '1px solid rgba(232,184,75,0.18)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(232,184,75,0.05)',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img 
          src="/assets/gazebo_night.png" 
          alt="Fairy Lit Gazebo at Hotel খোয়াই" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(13,10,7,0.85) 0%, rgba(13,10,7,0.2) 50%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          textAlign: 'center',
          zIndex: 2,
        }}>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#F5ECD7', fontSize: '15px', marginBottom: '2px' }}>আমাদের গেজেবো</div>
          <div style={{ color: '#E8B84B', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>FAIRY LIT GAZEBO</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Data ────────────────────────────────────────────────── */
const dishes = [
  { name: 'Khoai Special Chicken', bengali: 'খোয়াই স্পেশাল চিকেন', price: '₹330', desc: '4-piece slow-cooked in a secret masala blend, simmered for hours to draw out deep, smoky layers.', grad: 'linear-gradient(140deg,#2D1000,#6B2800,#1A0800)', tag: 'Non-Veg Main' },
  { name: 'Sorshe Ilish', bengali: 'সর্ষে ইলিশ', price: '₹340', desc: 'The soul of Bengal. Hilsa steeped in golden mustard, wrapped in tradition and served warm.', grad: 'linear-gradient(140deg,#001528,#003D5A,#001020)', tag: 'Fish & Seafood' },
  { name: 'Handi Mutton', bengali: 'হান্ডি মাটন', price: '₹540', desc: '5-piece tender mutton, sealed and slow-simmered in a clay handi for rich, layered depth.', grad: 'linear-gradient(140deg,#180A00,#5A2000,#100500)', tag: 'Non-Veg Main' },
];

const galleryPreview = [
  { title: 'The Bamboo Hall', sub: 'Indoor Dining', grad: 'linear-gradient(150deg,#3D1E00,#7A4500)', h: '200px', img: '/assets/hotel_img_10.jpeg' },
  { title: 'Fairy Lit Gazebo', sub: 'Outdoor Night', grad: 'linear-gradient(150deg,#1A003A,#5A00B0)', h: '240px', img: '/assets/gazebo_night.png' },
  { title: 'Bengali Thali Platter', sub: 'Traditional Cuisine', grad: 'linear-gradient(150deg,#002818,#007050)', h: '180px', img: '/assets/hotel_img_26.jpeg' },
  { title: 'Vibrant Event Lawn', sub: 'Outdoor Night Events', grad: 'linear-gradient(150deg,#06080F,#181C3A)', h: '220px', img: '/assets/hotel_img_4.jpeg' },
];

/* ─── Stagger variants ─────────────────────────────────────── */
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } } };

/* ─── Page ─────────────────────────────────────────────────── */
const SESSION_KEY = 'khoai_preloader_shown';

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(() => typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY));
  const [progress, setProgress] = useState(0);
  const [heroReady, setHeroReady] = useState(!showPreloader);

  useEffect(() => {
    document.title = 'Hotel খোয়াই | Best Restaurant in Orgram Bardhaman | হোটেল খোয়াই';
  }, []);

  const finishPreloader = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setShowPreloader(false);
    setHeroReady(true);
  }, []);

  useEffect(() => {
    if (!showPreloader) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(finishPreloader, 350); return 100; }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [showPreloader, finishPreloader]);

  return (
    <>
    <div>
      <AnimatePresence>
        {showPreloader && <Preloader progress={progress} />}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="khoai-hero-section">
        {/* Background Image Layer with responsive blur */}
        <div className="khoai-hero-bg" />

        {/* Bamboo weave bg */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.032, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 0L60 60M-15 15L45 75M15-15L75 45' stroke='%23E8B84B' stroke-width='1' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: heroReady ? 1 : 0 }}
          transition={{ duration: 1.1, delay: 0.1 }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '100px 24px 80px', maxWidth: '880px', width: '100%' }}
        >
          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: heroReady ? 1 : 0, scale: heroReady ? 1 : 0.85 }} transition={{ delay: 0.3, duration: 0.7 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', padding: '8px 20px', border: '1px solid rgba(232,184,75,0.22)', borderRadius: '100px', color: '#9C8A6E', fontSize: '12px', letterSpacing: '1.5px', backdropFilter: 'blur(8px)', background: 'rgba(13,10,7,0.4)' }}
          >
            <MapPin size={11} color="#E8B84B" />
            EST. 2022 · ORGRAM, BARDHAMAN
          </motion.div>

          {/* combined bilingual heading on the same line */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 20 }}
            transition={{ delay: 0.6, duration: 1.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 'clamp(10px, 3vw, 24px)',
              margin: '0 auto 20px',
              lineHeight: 1.15,
            }}
          >
            <span style={{ 
              fontFamily: '"Playfair Display", serif', 
              color: '#E8B84B', 
              fontSize: 'clamp(38px, 8vw, 84px)',
              fontWeight: 600,
              textShadow: '0 0 30px rgba(232,184,75,0.2)'
            }}>
              Hotel
            </span>
            <span style={{ 
              fontFamily: '"Tiro Bangla", serif', 
              color: '#00E5CC', 
              fontSize: 'clamp(44px, 9vw, 96px)',
              textShadow: '0 0 30px rgba(0,229,204,0.3)'
            }}>
              খোয়াই
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: heroReady ? 1 : 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            style={{ color: '#9C8A6E', fontSize: 'clamp(14px,2.5vw,17px)', fontStyle: 'italic', marginBottom: '48px', letterSpacing: '1.5px' }}
          >
            Where Roots Meet Flavours
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 20 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/menu" className="khoai-btn-shimmer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', backgroundColor: '#E8B84B', color: '#0D0A07', borderRadius: '3px', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', fontWeight: 700, minHeight: '52px' }}>
              EXPLORE MENU <ArrowRight size={14} />
            </Link>
            <Link to="/our-story" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', border: '1px solid rgba(245,236,215,0.25)', color: '#F5ECD7', borderRadius: '3px', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', minHeight: '52px', backdropFilter: 'blur(8px)' }}>
              OUR STORY
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: heroReady ? 1 : 0 }} transition={{ delay: 2.2 }}
          style={{ position: 'absolute', bottom: '32px', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#4A3F30', fontSize: '10px', letterSpacing: '3px' }}
        >
          <div style={{ marginBottom: '8px' }}>DISCOVER</div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown size={16} color="#E8B84B" />
          </motion.div>
        </motion.div>

        {/* Wave divider */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 64" style={{ display: 'block', width: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#111009" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ backgroundColor: '#111009' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', borderBottom: '1px solid rgba(232,184,75,0.08)' }}
        >
          {[{ v: 15000, l: 'Monthly Guests', s: '+' }, { v: 40, l: 'Dishes on Menu', s: '+' }, { v: 3, l: 'Years of Heritage', s: '+' }].map(s => (
            <motion.div key={s.l} variants={fadeUp}>
              <StatItem value={s.v} label={s.l} suffix={s.s} />
            </motion.div>
          ))}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', padding: '28px 16px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: '"Playfair Display", serif', fontSize: 'clamp(34px,5vw,52px)', color: '#E8B84B', lineHeight: 1, marginBottom: '8px' }}>
              <Star size={24} fill="#E8B84B" color="#E8B84B" /> 4.5
            </div>
            <div style={{ color: '#9C8A6E', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>Google Rating</div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STORY TEASER ── */}
      <section style={{ backgroundColor: '#111009', padding: 'clamp(60px,8vw,120px) 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }} viewport={{ once: true }}>
            <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Our Heritage</div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px,4vw,46px)', color: '#F5ECD7', lineHeight: 1.25, marginBottom: '24px' }}>
              Born from the<br />Heart of Bengal
            </h2>
            {/* Decorative line */}
            <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,#E8B84B,transparent)', marginBottom: '24px' }} />
            <p style={{ color: '#9C8A6E', lineHeight: 1.9, fontSize: 'clamp(14px,2vw,15px)', marginBottom: '36px' }}>
              Located along the Shantiniketan Bolpur Road at Orgram Jora Canal Bridge, Bardhaman, Hotel খোয়াই was established in 2022 from an unwavering passion for authentic Bengali cuisine and a deep love for the region's cultural heritage. Every bamboo pillar, every hand-painted mural tells a story.
            </p>
            <Link to="/our-story" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#E8B84B', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: '1px solid rgba(232,184,75,0.4)', paddingBottom: '4px' }}>
              Read Our Story <ArrowRight size={13} />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }} viewport={{ once: true }}>
            <GazeboVisual />
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <div style={{ backgroundColor: '#111009', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 56" style={{ display: 'block', width: '100%' }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="#0D0A07" />
        </svg>
      </div>

      <section style={{ backgroundColor: '#0D0A07', padding: 'clamp(60px,8vw,100px) 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,60px)' }}>
            <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '14px', textTransform: 'uppercase' }}>The Ambience</div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px,4vw,44px)', color: '#F5ECD7' }}>The Khoai Experience</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px' }}
          >
            {galleryPreview.map(card => (
              <motion.div key={card.title} variants={fadeUp}>
                <Link to="/gallery" style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="khoai-shimmer" style={{ borderRadius: '10px', overflow: 'hidden', height: card.h, background: card.img ? `linear-gradient(to bottom, rgba(13,10,7,0.1) 0%, rgba(13,10,7,0.85) 100%), url("${card.img}") center/cover no-repeat` : card.grad, position: 'relative', border: '1px solid rgba(232,184,75,0.07)' }}>
                    <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(232,184,75,0.1)', color: '#E8B84B', fontSize: '9px', padding: '4px 10px', borderRadius: '100px', letterSpacing: '1.5px', border: '1px solid rgba(232,184,75,0.2)' }}>
                      {card.sub.toUpperCase()}
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px 16px', background: 'linear-gradient(transparent,rgba(13,10,7,0.95))', fontFamily: '"Playfair Display", serif', fontSize: '17px', color: '#F5ECD7' }}>
                      {card.title}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link to="/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '13px 32px', border: '1px solid rgba(232,184,75,0.4)', color: '#E8B84B', borderRadius: '3px', textDecoration: 'none', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', minHeight: '48px' }}>
              View Full Gallery <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SIGNATURE DISHES ── */}
      <section style={{ padding: 'clamp(60px,8vw,110px) 24px', background: 'linear-gradient(180deg,#0D0A07,#1A0D00)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '14px', textTransform: 'uppercase' }}>Chef's Picks</div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px,4vw,44px)', color: '#F5ECD7', marginBottom: '10px' }}>Signature Dishes</h2>
            <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#9C8A6E', fontSize: '18px' }}>রান্নাঘর</div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px' }}
          >
            {dishes.map(d => (
              <motion.div key={d.name} variants={fadeUp}>
                <div className="khoai-shimmer" style={{ background: d.grad, borderRadius: '12px', padding: 'clamp(28px,4vw,44px) clamp(20px,3vw,32px) clamp(24px,3.5vw,36px)', border: '1px solid rgba(232,184,75,0.14)', position: 'relative', overflow: 'hidden', height: '100%' }}>
                  {/* Chef pick ribbon */}
                  <div style={{ position: 'absolute', top: '18px', right: '-3px', backgroundColor: '#E8B84B', color: '#0D0A07', fontSize: '9px', padding: '5px 14px', fontWeight: 700, letterSpacing: '1.5px', borderRadius: '2px 0 0 2px' }}>
                    ★ CHEF'S PICK
                  </div>
                  <div style={{ color: '#9C8A6E', fontSize: '10px', letterSpacing: '2px', marginBottom: '10px', textTransform: 'uppercase' }}>{d.tag}</div>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px,2.5vw,22px)', color: '#F5ECD7', marginBottom: '6px', lineHeight: 1.3 }}>{d.name}</h3>
                  <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#6A5A46', fontSize: '13px', marginBottom: '16px' }}>{d.bengali}</div>
                  <p style={{ color: '#9C8A6E', lineHeight: 1.8, fontSize: '14px', marginBottom: '28px' }}>{d.desc}</p>
                  <div style={{ fontFamily: '"Playfair Display", serif', color: '#E8B84B', fontSize: '28px' }}>{d.price}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} style={{ textAlign: 'center', marginTop: '52px' }}>
            <Link to="/menu" className="khoai-btn-shimmer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 44px', backgroundColor: '#E8B84B', color: '#0D0A07', borderRadius: '3px', textDecoration: 'none', fontSize: '13px', letterSpacing: '2px', fontWeight: 700, minHeight: '54px', textTransform: 'uppercase' }}>
              View Full Menu <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── RESERVE BAND ── */}
      <section style={{ padding: 'clamp(60px,8vw,90px) 24px', background: '#0A0805', textAlign: 'center', borderTop: '1px solid rgba(232,184,75,0.1)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#00E5CC', fontSize: 'clamp(22px,4vw,32px)', marginBottom: '16px', textShadow: '0 0 30px rgba(0,229,204,0.3)' }}>আপনার আসন সংরক্ষণ করুন</div>
          <h3 style={{ fontFamily: '"Playfair Display", serif', color: '#F5ECD7', fontSize: 'clamp(18px,3vw,26px)', marginBottom: '14px' }}>Come Dine With Us</h3>
          <p style={{ color: '#9C8A6E', marginBottom: '36px', fontSize: 'clamp(13px,2vw,15px)', lineHeight: 1.9 }}>
            Open daily 11 AM – 11 PM at Orgram, Bardhaman. Walk-ins welcome — for groups of 10+, we recommend calling ahead.
          </p>
          <Link to="/find-us" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 36px', border: '1px solid rgba(232,184,75,0.5)', color: '#E8B84B', borderRadius: '3px', textDecoration: 'none', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', minHeight: '52px' }}>
            <MapPin size={14} /> Find Us & Reserve
          </Link>
        </motion.div>
      </section>
    </div>
    <FloatingContact />
    </>
  );
}
