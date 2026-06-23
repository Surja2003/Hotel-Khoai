import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Navigation, Star, ExternalLink } from 'lucide-react';
import FloatingContact from '../components/FloatingContact';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } };

const hours = [
  { day: 'Monday – Sunday', time: '08:00 AM – 12:05 AM', today: true },
  { day: 'Public Holidays', time: '08:00 AM – 12:05 AM', today: false },
];

const contactItems = [
  {
    icon: <MapPin size={18} color="#E8B84B" />,
    label: 'Location',
    content: (
      <>
        <div style={{ color: '#F5ECD7', fontSize: 'clamp(14px,2vw,15px)', marginBottom: '6px', fontFamily: '"Playfair Display", serif' }}>Hotel খোয়াই</div>
        <div style={{ color: '#9C8A6E', fontSize: '14px', lineHeight: 1.75 }}>
          Orgram Jora Canal Bridge,<br />
          Shantiniketan Bolpur Road,<br />
          Orgram, Bardhaman,<br />
          West Bengal — 713128
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
        Reservations &amp; large group bookings<br />
        <a href="tel:+919732269939" style={{ color: '#E8B84B', fontSize: '16px', fontFamily: '"Playfair Display", serif', textDecoration: 'none' }}>+91 97322 69939</a>
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

function MapEmbed() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
      <iframe
        title="Hotel খোয়াই Location — Orgram, Bardhaman"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.1761826402317!2d87.76452027588986!3d23.418002001455058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f9cd633b72aeb7%3A0xa40d4a177ca1fe77!2sHotel%20khoai!5e0!3m2!1sen!2sus!4v1782034386566!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What type of cuisine does Hotel খোয়াই serve?",
      qBn: "হোটেল খোয়াই-এ কী ধরনের খাবার পাওয়া যায়?",
      a: "We specialize in authentic Bengali cuisine, famous for our Handi Mutton (হাঁড়ি মাংস), Sorshe Ilish (সর্ষে ইলিশ), and traditional Bengali Thalis. We also serve popular Tandoori and Chinese dishes.",
      aBn: "আমরা খাঁটি বাঙালি খাবার পরিবেশন করি। আমাদের হাঁড়ি মাংস, সর্ষে ইলিশ এবং ঐতিহ্যবাহী বাঙালি থালি খুবই জনপ্রিয়। এছাড়া এখানে মুখরোচক তন্দুরি এবং চাইনিজ খাবারও পাওয়া যায়।"
    },
    {
      q: "Where is Hotel খোয়াই located?",
      qBn: "হোটেল খোয়াই-এর সঠিক ঠিকানা কী?",
      a: "We are located at Orgram Jora Canal Bridge, Shantiniketan Bolpur Road, Bardhaman, West Bengal 713128. It is easily accessible with direct road connectivity.",
      aBn: "আমাদের রেস্তোরাঁটি ওড়গ্রাম জোড়া ক্যানেল ব্রিজ, শান্তিনিকেতন বোলপুর রোড, পূর্ব বর্ধমান, পশ্চিমবঙ্গ ৭১৩১২৮-এ অবস্থিত। শান্তিনিকেতন বোলপুর রোডের পাশেই হওয়ায় গাড়ি বা বাইকে সরাসরি আসা খুব সহজ।"
    },
    {
      q: "What are your opening and closing timings?",
      qBn: "আপনাদের রেস্তোরাঁ কখন খোলা এবং বন্ধ হয়?",
      a: "We are open everyday (Monday to Sunday) from 08:00 AM in the morning to 12:05 AM at night, serving breakfast, lunch, snacks, and dinner.",
      aBn: "আমরা প্রতিদিন (সোমবার থেকে রবিবার) সকাল ০৮:০০ টা থেকে রাত ১২:০৫ টা পর্যন্ত খোলা থাকি। এখানে সকালের জলখাবার, দুপুরের মধ্যাহ্নভোজ, বিকেলের স্ন্যাক্স এবং রাতের খাবার পাওয়া যায়।"
    },
    {
      q: "How can I book a table or order for large groups?",
      qBn: "আমি কীভাবে টেবিল বুকিং বা বড় গ্রুপের জন্য অর্ডার করতে পারি?",
      a: "You can easily reserve a table or coordinate for large groups by calling or messaging us on WhatsApp at +91 97322 69939. Walk-ins are also welcome!",
      aBn: "টেবিল বুকিং বা বড় কোনো অনুষ্ঠানের জন্য সরাসরি আমাদের ফোন করতে পারেন অথবা +91 97322 69939 নম্বরে WhatsApp করতে পারেন। কোনো বুকিং ছাড়াও সরাসরি রেস্তোরাঁয় চলে আসতে পারেন।"
    },
    {
      q: "Is there private dining or outdoor seating available?",
      qBn: "এখানে কি বসে খাওয়ার জন্য আলাদা কোনো স্পেস বা গেজেবো আছে?",
      a: "Yes! We feature a beautifully designed rustic Bamboo Hall for families and groups, as well as our popular fairy-lit outdoor Gazebos for a magical open-air dining experience.",
      aBn: "হ্যাঁ! আমাদের এখানে বড় পরিবার বা বন্ধুদের জন্য বাঁশ দিয়ে তৈরি ঐতিহ্যবাহী 'বাঁশের কেল্লা' ডাইনিং হল রয়েছে। পাশাপাশি খোলা বাতাসে খাওয়ার জন্য আমাদের সুন্দর আলো ঝলমলে গেজেবো (Gazebo) রয়েছে।"
    },
    {
      q: "Is parking space available at the restaurant?",
      qBn: "রেস্তোরাঁয় পার্কিং করার সুবিধা আছে কি?",
      a: "Yes, we provide free and spacious parking facilities for both two-wheelers and four-wheelers directly at our premises.",
      aBn: "হ্যাঁ, আমাদের নিজস্ব চত্বরেই দু-চাকা এবং চার-চাকার গাড়ি পার্ক করার জন্য বিনামূল্যে ও যথেষ্ট বড় পার্কিং স্পেস রয়েছে।"
    }
  ];

  return (
    <section style={{ padding: 'clamp(52px,7vw,88px) 24px', borderTop: '1px solid rgba(232,184,75,0.08)', backgroundColor: '#111009' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ color: '#E8B84B', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>Got Questions?</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', color: '#F5ECD7', fontSize: 'clamp(26px,4vw,38px)', marginBottom: '10px' }}>Frequently Asked Questions</h2>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#00E5CC', fontSize: '18px', textShadow: '0 0 20px rgba(0,229,204,0.2)' }}>সাধারণ জিজ্ঞাসা ও উত্তর</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                style={{ 
                  borderRadius: '8px', 
                  border: isOpen ? '1px solid rgba(232,184,75,0.25)' : '1px solid rgba(255,255,255,0.05)', 
                  background: isOpen ? 'rgba(26,18,8,0.65)' : 'rgba(26,18,8,0.3)', 
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: isOpen ? '#E8B84B' : '#F5ECD7',
                    transition: 'color 0.25s ease',
                  }}
                >
                  <div style={{ paddingRight: '16px' }}>
                    <h3 style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: 'clamp(15px, 2.2vw, 17px)', fontWeight: 600, lineHeight: 1.4 }}>{faq.q}</h3>
                    <div style={{ fontFamily: '"Tiro Bangla", serif', fontSize: '14px', color: 'rgba(156,138,110,0.85)', marginTop: '4px' }}>{faq.qBn}</div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ color: isOpen ? '#E8B84B' : '#9C8A6E', flexShrink: 0 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(232,184,75,0.08)' }}>
                    <p style={{ color: '#F5ECD7', fontSize: 'clamp(13px, 1.8vw, 14.5px)', lineHeight: 1.7, margin: '14px 0 0 0' }}>{faq.a}</p>
                    <p style={{ fontFamily: '"Tiro Bangla", serif', color: '#9C8A6E', fontSize: '15px', lineHeight: 1.7, margin: '10px 0 0 0' }}>{faq.aBn}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function FindUs() {
  useEffect(() => {
    document.title = 'Find Us | Hotel খোয়াই — Orgram, Bardhaman, West Bengal';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Find location, driving directions, phone numbers, and interactive map for Hotel খোয়াই at Orgram Jora Canal Bridge, Shantiniketan Bolpur Road, Bardhaman. Open daily 8 AM – 12:05 AM.');
    }
  }, []);
  return (
    <>
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
            Come find us at Orgram Jora Canal Bridge, Shantiniketan Bolpur Road, Bardhaman — open every day, lunch through late dinner.
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
                href="https://maps.app.goo.gl/XtiCX5m3pnj35Ktv8"
                target="_blank"
                rel="noopener noreferrer"
                className="khoai-btn-shimmer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px 28px', backgroundColor: '#E8B84B', color: '#0D0A07', borderRadius: '3px', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', fontWeight: 700, minHeight: '54px', textTransform: 'uppercase' }}
              >
                <Navigation size={15} /> Open in Google Maps <ExternalLink size={12} />
              </a>
              <a
                href="tel:+919732269939"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px 28px', border: '1px solid rgba(232,184,75,0.4)', color: '#E8B84B', borderRadius: '3px', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', minHeight: '54px' }}
              >
                <Phone size={14} /> Call to Reserve
              </a>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }} viewport={{ once: true }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(232,184,75,0.12)', height: 'clamp(320px,50vw,500px)', position: 'relative' }}>
              <MapEmbed />
            </div>

            {/* Directions note */}
            <div style={{ marginTop: '16px', padding: '18px 20px', background: 'rgba(26,18,8,0.5)', border: '1px solid rgba(232,184,75,0.08)', borderRadius: '8px', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Navigation size={13} color="#E8B84B" />
                <span style={{ color: '#E8B84B', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>Directions</span>
              </div>
              <p style={{ color: '#9C8A6E', fontSize: '13px', lineHeight: 1.8 }}>
               Located at Orgram Jora Canal Bridge, Shantiniketan Bolpur Road, Orgram, Bardhaman, West Bengal 713128. Look for the glowing signboard. Ample parking available.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQSection />

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
    <FloatingContact />
    </>
  );
}
