import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Navigation, Star, ExternalLink } from 'lucide-react';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } };

const hours = [
  { day: 'Monday – Friday', time: '11:00 AM – 11:00 PM', today: true },
  { day: 'Saturday', time: '10:00 AM – 11:30 PM', today: false },
  { day: 'Sunday', time: '10:00 AM – 11:30 PM', today: false },
  { day: 'Public Holidays', time: '10:00 AM – 11:30 PM', today: false },
];

const contactItems = [
  {
    icon: <MapPin size={18} color="#E8B84B" />,
    label: 'Location',
    content: (
      <>
        <div style={{ color: '#F5ECD7', fontSize: 'clamp(14px,2vw,15px)', marginBottom: '6px', fontFamily: '"Playfair Display", serif' }}>Hotel খোয়াই</div>
        <div style={{ color: '#9C8A6E', fontSize: '14px', lineHeight: 1.75 }}>
          National Highway 60, Khoai<br />Tripura, India
        </div>
      </>
    ),
  },
  {
    icon: <Clock size={18} color="#E8B84B" />,
    label: 'Opening Hours',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px', width: '100%' }}>
        {hours.map(h => (
          <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', borderBottom: '1px solid rgba(232,184,75,0.07)', paddingBottom: '10px' }}>
            <span style={{ color: '#9C8A6E', fontSize: '13px' }}>{h.day}</span>
            <span style={{ color: h.today ? '#E8B84B' : '#9C8A6E', fontSize: '13px', whiteSpace: 'nowrap', fontFamily: '"DM Sans", sans-serif' }}>{h.time}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <Phone size={18} color="#E8B84B" />,
    label: 'Contact',
    content: (
      <div style={{ color: '#9C8A6E', fontSize: '14px', lineHeight: 1.8 }}>
        Reservations & large group bookings<br />
        <span style={{ color: '#E8B84B', fontSize: '16px', fontFamily: '"Playfair Display", serif' }}>+91 XXXXX XXXXX</span>
      </div>
    ),
  },
  {
    icon: <Star size={18} color="#E8B84B" />,
    label: 'Google Rating',
    content: (
      <>
        <div style={{ display: 'flex', gap: '3px', marginBottom: '6px' }}>
          {[1,2,3,4,5].map(s => <Star key={s} size={15} color="#E8B84B" fill={s <= 4 ? '#E8B84B' : 'none'} />)}
        </div>
        <div style={{ color: '#9C8A6E', fontSize: '13px' }}>4.5 / 5 on Google Maps</div>
      </>
    ),
  },
];

function AnimatedMapPin() {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-65%)', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[1, 2, 3].map(i => (
        <motion.div key={i} className="khoai-pulse-ring" animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
          style={{ position: 'absolute', width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(232,184,75,0.5)' }}
        />
      ))}
      <div style={{ width: '48px', height: '48px', borderRadius: '50% 50% 50% 0', backgroundColor: '#E8B84B', transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(232,184,75,0.5)', position: 'relative', zIndex: 1 }}>
        <div style={{ transform: 'rotate(45deg)' }}><MapPin size={20} color="#0D0A07" /></div>
      </div>
    </div>
  );
}

function MapPlaceholder() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#080800,#101200,#081000,#060800)' }}>
      {/* Grid */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={'h'+i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 11}%`, height: '1px', backgroundColor: 'rgba(232,184,75,0.04)' }} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={'v'+i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 11}%`, width: '1px', backgroundColor: 'rgba(232,184,75,0.04)' }} />
      ))}

      {/* NH-60 Road */}
      <div style={{ position: 'absolute', top: '44%', left: '-5%', right: '-5%', height: '4px', background: 'linear-gradient(90deg,transparent,rgba(232,184,75,0.2),rgba(232,184,75,0.3),rgba(232,184,75,0.2),transparent)', transform: 'rotate(-3deg)' }}>
        <div style={{ position: 'absolute', top: '-18px', left: '55%', color: '#E8B84B', fontSize: '10px', letterSpacing: '2px', whiteSpace: 'nowrap', opacity: 0.7 }}>NH - 60</div>
      </div>

      {/* Khoai River */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,220 Q110,200 170,225 Q240,255 310,215 Q360,195 410,210" stroke="#00E5CC" strokeWidth="5" fill="none" strokeLinecap="round" />
        <text x="110" y="188" fill="#00E5CC" fontSize="9" fontFamily="sans-serif">Khoai River</text>
      </svg>

      {/* Green patches */}
      {[{ x:'15%',y:'20%',w:'18%',h:'15%' },{ x:'62%',y:'60%',w:'22%',h:'18%' }].map((g,i) => (
        <div key={i} style={{ position: 'absolute', left: g.x, top: g.y, width: g.w, height: g.h, backgroundColor: 'rgba(0,120,50,0.08)', borderRadius: '4px' }} />
      ))}

      <AnimatedMapPin />

      {/* Label */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(13,10,7,0.92)', border: '1px solid rgba(232,184,75,0.25)', borderRadius: '6px', padding: '10px 20px', textAlign: 'center', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}>
        <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '1.5px', marginBottom: '3px', fontWeight: 600 }}>HOTEL খোয়াই</div>
        <div style={{ color: '#9C8A6E', fontSize: '11px' }}>NH-60, Khoai Valley, Tripura</div>
      </div>
    </div>
  );
}

export default function FindUs() {
  return (
    <div style={{ backgroundColor: '#0D0A07' }}>
      {/* Page hero */}
      <section style={{ padding: 'clamp(100px,14vw,160px) 24px clamp(40px,6vw,70px)', background: 'radial-gradient(ellipse at 70% 100%, #001A2D 0%, #0D0A07 55%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ fontFamily: '"Tiro Bangla", serif', fontSize: 'clamp(120px,30vw,260px)', color: '#00E5CC', opacity: 0.02, lineHeight: 1 }}>পথ</div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Location & Contact</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px,7vw,72px)', color: '#F5ECD7', lineHeight: 1.15, marginBottom: '14px' }}>Find Us</h1>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#00E5CC', fontSize: 'clamp(18px,3vw,28px)', marginBottom: '20px', textShadow: '0 0 30px rgba(0,229,204,0.35)' }}>আমাদের খুঁজুন</div>
          <p style={{ color: '#9C8A6E', maxWidth: '440px', margin: '0 auto', lineHeight: 1.9, fontSize: 'clamp(13px,2vw,15px)' }}>
            Come find us on the scenic NH-60, Khoai Valley — open every day, lunch through late dinner.
          </p>
        </motion.div>
      </section>

      {/* Main content */}
      <section style={{ padding: 'clamp(48px,7vw,90px) 24px clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(40px,5vw,64px)' }}>

          {/* Contact info */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp}>
              <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Get In Touch</div>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px,3.5vw,36px)', color: '#F5ECD7', lineHeight: 1.25, marginBottom: '40px' }}>
                We'd Love<br />to Have You
              </h2>
            </motion.div>

            {contactItems.map(item => (
              <motion.div key={item.label} variants={fadeUp} className="khoai-shimmer" style={{ display: 'flex', gap: '18px', marginBottom: '24px', padding: 'clamp(18px,2.5vw,24px)', background: 'rgba(26,18,8,0.5)', border: '1px solid rgba(232,184,75,0.08)', borderRadius: '10px', backdropFilter: 'blur(8px)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'rgba(232,184,75,0.08)', border: '1px solid rgba(232,184,75,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#E8B84B', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>{item.label}</div>
                  {item.content}
                </div>
              </motion.div>
            ))}

            {/* CTA buttons */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <a
                href="https://maps.app.goo.gl/CEsCxcVBaUrYY4vNA"
                target="_blank"
                rel="noopener noreferrer"
                className="khoai-btn-shimmer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px 28px', backgroundColor: '#E8B84B', color: '#0D0A07', borderRadius: '3px', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', fontWeight: 700, minHeight: '54px', textTransform: 'uppercase' }}
              >
                <Navigation size={15} /> Open in Google Maps <ExternalLink size={12} />
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px 28px', border: '1px solid rgba(232,184,75,0.4)', color: '#E8B84B', borderRadius: '3px', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', minHeight: '54px' }}
              >
                <Phone size={14} /> Call to Reserve
              </a>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }} viewport={{ once: true }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(232,184,75,0.12)', height: 'clamp(320px,50vw,500px)', position: 'relative' }}>
              <MapPlaceholder />
            </div>

            {/* Directions note */}
            <div style={{ marginTop: '16px', padding: '18px 20px', background: 'rgba(26,18,8,0.5)', border: '1px solid rgba(232,184,75,0.08)', borderRadius: '8px', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Navigation size={13} color="#E8B84B" />
                <span style={{ color: '#E8B84B', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>Directions</span>
              </div>
              <p style={{ color: '#9C8A6E', fontSize: '13px', lineHeight: 1.8 }}>
                Located on National Highway 60, Khoai, Tripura. Look for the bamboo-framed entrance and glowing signboard. Ample parking available on premises.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Walk-in CTA */}
      <section style={{ padding: 'clamp(52px,7vw,88px) 24px', borderTop: '1px solid rgba(232,184,75,0.08)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#00E5CC', fontSize: 'clamp(22px,4vw,30px)', marginBottom: '16px', textShadow: '0 0 24px rgba(0,229,204,0.3)' }}>আজই আসুন</div>
          <h3 style={{ fontFamily: '"Playfair Display", serif', color: '#F5ECD7', fontSize: 'clamp(20px,3vw,28px)', marginBottom: '14px' }}>Walk-ins Always Welcome</h3>
          <p style={{ color: '#9C8A6E', marginBottom: '36px', fontSize: 'clamp(13px,2vw,15px)', lineHeight: 1.9 }}>
            No reservation needed for individuals and couples. For groups of 10 or more, call ahead to ensure the perfect experience.
          </p>
          <a
            href="https://maps.app.goo.gl/CEsCxcVBaUrYY4vNA"
            target="_blank"
            rel="noopener noreferrer"
            className="khoai-btn-shimmer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 40px', backgroundColor: '#E8B84B', color: '#0D0A07', borderRadius: '3px', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', fontWeight: 700, minHeight: '52px', textTransform: 'uppercase' }}
          >
            <Navigation size={14} /> Get Directions
          </a>
        </motion.div>
      </section>
    </div>
  );
}
