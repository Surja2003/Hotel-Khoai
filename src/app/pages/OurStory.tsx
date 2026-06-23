import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Leaf, Award, Heart, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } } };

const milestones = [
  { year: 'Sept 2023', title: 'The Beginning', icon: '🌱', desc: 'Hotel খোয়াই opens at Orgram Jora Canal Bridge, Shantiniketan Bolpur Road, Bardhaman — serving home-style Bengali food to families and travellers.' },
  { year: 'Late 2023', title: 'The Bamboo Hall', icon: '🪵', desc: 'The iconic bamboo-framed dining hall is built — an architectural tribute to Bengal\'s heritage, with hand-woven ceilings and warm lantern light.' },
  { year: 'Early 2024', title: 'Folk Art Revival', icon: '🎨', desc: 'Local artisans paint the walls with Bengali folk art, transforming the restaurant into a living gallery of cultural expression.' },
  { year: 'Late 2024', title: 'The Fairy Gazebo', icon: '✨', desc: 'The beloved outdoor gazebo with fairy lights is unveiled — instantly becoming the most photographed spot in Orgram, Bardhaman.' },
  { year: '2025', title: 'Google Certified', icon: '⭐', desc: 'Hotel খোয়াই achieves 4.5 stars on Google with 15,000+ monthly guests — recognised as Bardhaman\'s premier dining destination.' },
];

const values = [
  { icon: <Leaf size={20} color="#E8B84B" />, title: 'Rooted in Nature', desc: 'Bamboo architecture, earthy textures, and ingredients sourced from local farmers and markets.' },
  { icon: <Heart size={20} color="#E8B84B" />, title: 'Cooked with Love', desc: 'Every dish follows recipes passed through generations of Bengali home kitchens — nothing is rushed.' },
  { icon: <Users size={20} color="#E8B84B" />, title: 'Community First', desc: 'We employ local artisans, cooks, and farmers — keeping the Khoai community thriving.' },
  { icon: <Award size={20} color="#E8B84B" />, title: 'Uncompromising Quality', desc: 'From the freshest Hilsa to hand-ground spices — quality is never negotiated at Khoai.' },
];

function StoryVisuals() {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '460px', 
      height: '420px', 
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Top Left: Hotel Exterior */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '68%',
        aspectRatio: '1.2',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(232,184,75,0.15)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
        zIndex: 1,
        background: '#1A1000',
      }}>
        <img 
          src="/assets/hotel_exterior.png" 
          alt="Hotel খোয়াই Exterior" 
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 16px 8px',
          background: 'linear-gradient(to top, rgba(13,10,7,0.95), transparent)',
          color: '#E8B84B',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '1px',
          fontFamily: '"Playfair Display", serif',
        }}>
          Hotel Frontage
        </div>
      </div>

      {/* Bottom Right: Gazebo */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        width: '68%',
        aspectRatio: '1.2',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(0,229,204,0.15)',
        boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
        zIndex: 2,
        background: '#0D0A07',
      }}>
        <img 
          src="/assets/gazebo_night.png" 
          alt="Fairy Lit Gazebo" 
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 16px 8px',
          background: 'linear-gradient(to top, rgba(13,10,7,0.95), transparent)',
          color: '#00E5CC',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '1px',
          fontFamily: '"Playfair Display", serif',
        }}>
          Fairy Lit Gazebo
        </div>
      </div>

      {/* Decorative center piece */}
      <div style={{
        position: 'absolute',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#0D0A07',
        border: '2px solid #E8B84B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#E8B84B',
        fontSize: '18px',
        zIndex: 3,
        boxShadow: '0 0 20px rgba(232,184,75,0.35)',
      }}>
        ✦
      </div>
    </div>
  );
}

export default function OurStory() {
  useEffect(() => {
    document.title = 'Our Story | Hotel খোয়াই — Orgram, Bardhaman | হোটেল খোয়াই';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Discover the journey of Hotel খোয়াই (Hotel Khoai), established in September 2023. Read about our passion for preserving traditional Bengali flavours and creating an immersive dining space in Bardhaman.');
    }
  }, []);
  return (
    <div style={{ backgroundColor: '#0D0A07' }}>
      {/* Page hero */}
      <section style={{ padding: 'clamp(100px,14vw,160px) 24px clamp(40px,6vw,80px)', background: 'radial-gradient(ellipse at 50% 100%, #1A0D00 0%, #0D0A07 55%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ fontFamily: '"Tiro Bangla", serif', fontSize: 'clamp(120px,30vw,280px)', color: '#E8B84B', opacity: 0.025, lineHeight: 1 }}>খোয়াই</div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Our Heritage</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px,7vw,72px)', color: '#F5ECD7', lineHeight: 1.15, marginBottom: '14px' }}>Our Story</h1>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#00E5CC', fontSize: 'clamp(18px,3vw,28px)', marginBottom: '20px', textShadow: '0 0 30px rgba(0,229,204,0.35)' }}>আমাদের গল্প</div>
          <p style={{ color: '#9C8A6E', maxWidth: '520px', margin: '0 auto', lineHeight: 1.9, fontSize: 'clamp(13px,2vw,15px)' }}>
            From a humble roadside eatery to a destination — the story of Hotel খোয়াই is one of roots, resilience, and flavour.
          </p>
        </motion.div>
      </section>

      {/* Main story */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px', backgroundColor: '#111009' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <svg width="56" height="40" viewBox="0 0 56 40"><ellipse cx="28" cy="20" rx="26" ry="18" fill="none" stroke="#E8B84B" strokeWidth="1.5" /><ellipse cx="28" cy="20" rx="26" ry="18" fill="rgba(232,184,75,0.04)" /><circle cx="28" cy="20" r="10" fill="#00E5CC" opacity="0.85" /><circle cx="28" cy="20" r="6" fill="#0D0A07" /><circle cx="28" cy="20" r="3.5" fill="#E8B84B" /><circle cx="26" cy="18" r="1.2" fill="white" opacity="0.8" /></svg>
              <div>
                <div style={{ color: '#E8B84B', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>Chapter One</div>
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(22px,3vw,32px)', color: '#F5ECD7', lineHeight: 1.25 }}>Where It All Began</h2>
              </div>
            </div>

            {[
              'Hotel খোয়াই was established in September 2023 near the Orgram Jora Canal Bridge in Bardhaman, West Bengal. Born from a single unwavering belief: that authentic Bengali food, cooked with honesty and served with warmth, can turn any meal into a memorable celebration. What began in September 2023 with a simple goal has blossomed into one of the region\'s most beloved culinary landmarks, nestled along the Shantiniketan Bolpur Road.',
              'The name \'খোয়াই\' (Khoai) is inspired by the red soil (লাল মাটি) and the uniquely beautiful, weather-worn canyons of Bolpur, immortalised in Rabindranath Tagore\'s poetry. In our kitchen, every dish is prepared with meticulous care—carefully balancing spices to bring out the scent of the soil (মাটির গন্ধ) and the true spirit of বাঙালিয়ানা (Bengaliness). From our slow-cooked Handi Mutton (হাঁড়ি মাংস) to the rich flavours of Sorshe Ilish (সর্ষে ইলিশ), each recipe is a piece of culinary heritage.',
              'Our walls are adorned with traditional আলপনা (Alpona) and folk paintings created by local artisans, making your visit a visual feast as well. Whether you sit inside our rustic Bamboo Hall (বাঁশের কেল্লা) or dine under the stars in our fairy-lit Gazebo, you will experience the genuine warmth of বাঙালি আতিথেয়তা (Bengali hospitality). At Hotel খোয়াই, you are always part of our family.'
            ].map((para, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.12 }} viewport={{ once: true }}
                style={{ color: '#9C8A6E', lineHeight: 1.95, fontSize: 'clamp(13px,2vw,15px)', marginBottom: '22px' }}
              >
                {para}
              </motion.p>
            ))}

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
              <Link to="/menu" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#E8B84B', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: '1px solid rgba(232,184,75,0.4)', paddingBottom: '4px' }}>
                See Our Menu <ArrowRight size={13} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }} viewport={{ once: true }}>
            <StoryVisuals />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px', backgroundColor: '#0D0A07' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '14px', textTransform: 'uppercase' }}>What We Stand For</div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px,4vw,44px)', color: '#F5ECD7' }}>Our Values</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}
          >
            {values.map(v => (
              <motion.div key={v.title} variants={fadeUp} className="khoai-shimmer" style={{ padding: 'clamp(24px,3vw,36px) clamp(20px,2.5vw,28px)', background: 'rgba(26,18,8,0.55)', border: '1px solid rgba(232,184,75,0.09)', borderRadius: '10px', backdropFilter: 'blur(8px)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'rgba(232,184,75,0.08)', border: '1px solid rgba(232,184,75,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>{v.icon}</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', color: '#F5ECD7', fontSize: 'clamp(16px,2.2vw,19px)', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ color: '#9C8A6E', fontSize: '14px', lineHeight: 1.8 }}>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px', backgroundColor: '#111009' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
            <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '14px', textTransform: 'uppercase' }}>Our Journey</div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px,4vw,44px)', color: '#F5ECD7' }}>Milestones</h2>
          </motion.div>

          <div style={{ position: 'relative', paddingLeft: '36px' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '15px', top: '8px', bottom: '8px', width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(232,184,75,0.3) 10%, rgba(232,184,75,0.3) 90%, transparent)' }} />

            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.08 * i }} viewport={{ once: true }}
                style={{ position: 'relative', marginBottom: i < milestones.length - 1 ? 'clamp(32px,5vw,52px)' : 0 }}
              >
                {/* Dot */}
                <div style={{ position: 'absolute', left: '-29px', top: '6px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#111009', border: '1.5px solid rgba(232,184,75,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                  {m.icon}
                </div>

                <div className="khoai-shimmer" style={{ padding: 'clamp(18px,2.5vw,26px) clamp(18px,2.5vw,28px)', background: 'rgba(26,18,8,0.5)', border: '1px solid rgba(232,184,75,0.08)', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <div style={{ fontFamily: '"Playfair Display", serif', color: '#E8B84B', fontSize: '13px', letterSpacing: '2px', flexShrink: 0 }}>{m.year}</div>
                    <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(232,184,75,0.25)', flexShrink: 0 }} />
                    <h3 style={{ fontFamily: '"Playfair Display", serif', color: '#F5ECD7', fontSize: 'clamp(16px,2.2vw,20px)' }}>{m.title}</h3>
                  </div>
                  <p style={{ color: '#9C8A6E', fontSize: 'clamp(13px,1.8vw,14px)', lineHeight: 1.85 }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section style={{ padding: 'clamp(60px,8vw,90px) 24px', background: 'linear-gradient(135deg,#0D0A07,#1A0D00)', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(232,184,75,0.5),transparent)', margin: '0 auto 32px' }} />
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#4A3F30', fontSize: '24px', marginBottom: '16px' }}>❝</div>
          <blockquote style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px,2.8vw,28px)', color: '#F5ECD7', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '24px' }}>
            "We didn't build a restaurant. We grew a place where people come to remember what home tastes like."
          </blockquote>
          <div style={{ color: '#6A5A46', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>The Khoai Kitchen</div>
          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(232,184,75,0.5),transparent)', margin: '32px auto 0' }} />
        </div>
      </section>
    </div>
  );
}
