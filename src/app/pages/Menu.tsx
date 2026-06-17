import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type MenuItem = { name: string; price: string; special?: boolean };

const menuData: Record<string, MenuItem[]> = {
  starters: [
    { name: 'Chicken Pakora (6pcs)', price: '₹150' },
    { name: 'Crispy Chicken', price: '₹170' },
    { name: 'Chicken Oil Fry (6pcs)', price: '₹190' },
    { name: 'Smoke Chicken (6pcs)', price: '₹270' },
    { name: 'Dry Chilli Chicken', price: '₹190' },
    { name: 'Lemon Pepper Chicken (6pcs)', price: '₹210' },
    { name: 'Chicken Lollipop (4pcs)', price: '₹220' },
    { name: 'Fish Finger (4pcs)', price: '₹150' },
    { name: 'Fish Fry (2pcs)', price: '₹160' },
    { name: 'Dry Chilli Fish (6pcs)', price: '₹200' },
    { name: 'Honey Prawn (4pcs)', price: '₹280' },
    { name: 'Lemon Garlic Prawn (4pcs)', price: '₹280' },
    { name: 'Chicken Tandoori Half', price: '₹240' },
    { name: 'Chicken Tandoori Full', price: '₹410' },
    { name: 'Chicken Tangdi Kabab (2pcs)', price: '₹180' },
    { name: 'Chicken Angara Kabab (2pcs)', price: '₹230' },
    { name: 'Chicken Tikka (6pcs)', price: '₹200' },
    { name: 'Chicken Malai Kabab (6pcs)', price: '₹240' },
    { name: 'Chicken Kabab (6pcs)', price: '₹220' },
    { name: 'Chicken Rashmi Kabab (6pcs)', price: '₹260' },
    { name: 'Chicken Hariyali Kabab (6pcs)', price: '₹260' },
    { name: 'Honey Chicken (8pcs)', price: '₹280' },
    { name: 'Pomfret Tandoor (1pc)', price: '₹210' },
    { name: 'Pomfret Tandoor (2pcs)', price: '₹380' },
    { name: 'Chicken Gold Coin (6pcs)', price: '₹220' },
  ],
  mains: [
    { name: 'Chicken Curry (3pcs)', price: '₹180' },
    { name: 'Chicken Kosha (3pcs)', price: '₹190' },
    { name: 'Chicken Do-Piaza (3pcs)', price: '₹220' },
    { name: 'Kadai Chicken (3pcs)', price: '₹230' },
    { name: 'Chicken Masala (3pcs)', price: '₹250' },
    { name: 'Chicken Butter Masala (3pcs)', price: '₹260' },
    { name: 'Chicken Rashmi Butter Masala', price: '₹280' },
    { name: 'Lemon Chicken (3pcs)', price: '₹190' },
    { name: 'Afghani Chicken (3pcs)', price: '₹220' },
    { name: 'Chicken Bharta', price: '₹200' },
    { name: 'Khoai Special Chicken (4pcs)', price: '₹300', special: true },
    { name: 'Chicken Tarka', price: '₹110' },
    { name: 'Egg Tarka', price: '₹90' },
    { name: 'Egg Chicken Tarka', price: '₹120' },
    { name: 'Chilli Chicken (6pcs)', price: '₹180' },
    { name: 'Chicken Manchurian (6pcs)', price: '₹180' },
    { name: 'Chicken Tikka Masala (6pcs)', price: '₹220' },
    { name: 'Chicken Stew (4pcs)', price: '₹180' },
    { name: 'Malai Chicken (6pcs)', price: '₹250' },
    { name: 'Mutton Curry (3pcs)', price: '₹300' },
    { name: 'Mutton Masala (3pcs)', price: '₹310' },
    { name: 'Mutton Kosha (3pcs)', price: '₹320' },
    { name: 'Khoai Special Mutton (4pcs)', price: '₹400', special: true },
    { name: 'Handi Mutton (5pcs)', price: '₹500' },
    { name: 'Egg Curry (2pcs)', price: '₹70' },
    { name: 'Egg Masala (2pcs)', price: '₹80' },
  ],
  fish: [
    { name: 'Katla Fish Curry', price: '₹130' },
    { name: 'Katla Kalia', price: '₹140' },
    { name: 'Sorshe Katla', price: '₹150' },
    { name: 'Katla Posto', price: '₹160' },
    { name: 'Katla Fry', price: '₹120' },
    { name: 'Doi Katla', price: '₹150' },
    { name: 'Pomfret Fry', price: '₹180' },
    { name: 'Sorshe Pomfret', price: '₹180' },
    { name: 'Pabda Jhal', price: '₹140' },
    { name: 'Sorshe Ilish', price: '₹280', special: true },
    { name: 'Ilish Fry', price: '₹260' },
    { name: 'Ilish Paturi', price: '₹300' },
    { name: 'Mourola Jhal', price: '₹120' },
    { name: 'Bhetki Paturi', price: '₹200' },
    { name: 'Chingri Malai Curry (3pcs)', price: '₹210' },
    { name: 'Chingri Jhal Small', price: '₹150' },
    { name: 'Khoai Special Prawn Malai Curry (4pcs)', price: '₹300', special: true },
  ],
  rice: [
    { name: 'Basmati Rice', price: '₹60' },
    { name: 'Jeera Rice', price: '₹80' },
    { name: 'Pineapple Rice', price: '₹120' },
    { name: 'Fried Rice Veg', price: '₹130' },
    { name: 'Egg Chicken Fried Rice', price: '₹200' },
    { name: 'Kashmiri Pulao', price: '₹180' },
    { name: 'Basanti Pulao', price: '₹160' },
    { name: 'Greenpeas Pulao', price: '₹160' },
    { name: 'Mixed Fried Rice', price: '₹240' },
    { name: 'Chicken Fried Rice', price: '₹190' },
    { name: 'Egg Chicken Fried Rice', price: '₹210' },
    { name: 'Egg Fried Rice', price: '₹160' },
    { name: 'Paneer Fried Rice', price: '₹180' },
  ],
  lunch: [
    { name: 'Veg Thali', price: '₹160' },
    { name: 'Posto Bora', price: '₹100' },
    { name: 'Moong Dal', price: '₹60' },
    { name: 'Aloo Posto', price: '₹80' },
    { name: 'Aloo Bhaja', price: '₹30' },
    { name: 'Begun Bhaja', price: '₹40' },
    { name: 'Papad', price: '₹30' },
    { name: 'Roasted Papad', price: '₹20' },
  ],
};

const tabs = [
  { key: 'starters', label: 'Starters', bengali: 'স্টার্টার', color: '#E8764B' },
  { key: 'mains', label: 'Non-Veg Mains', bengali: 'মেইন', color: '#E84B4B' },
  { key: 'fish', label: 'Fish & Seafood', bengali: 'মাছ', color: '#4BE8D4' },
  { key: 'rice', label: 'Rice & Pulao', bengali: 'ভাত', color: '#E8C84B' },
  { key: 'lunch', label: 'Lunch Specials', bengali: 'লাঞ্চ', color: '#8B4BE8' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const card = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.div variants={card} className="khoai-shimmer" style={{
      borderRadius: '8px',
      padding: '18px 20px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '16px',
      position: 'relative',
      background: item.special ? 'linear-gradient(135deg,rgba(26,18,8,0.9),rgba(45,24,0,0.9))' : 'rgba(26,18,8,0.7)',
      border: item.special ? '1px solid rgba(232,184,75,0.3)' : '1px solid rgba(255,255,255,0.05)',
      backdropFilter: 'blur(8px)',
      transition: 'border-color 0.3s',
    }}>
      {item.special && (
        <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: '#E8B84B', color: '#0D0A07', fontSize: '8.5px', padding: '4px 10px', borderRadius: '7px 0 7px 0', fontWeight: 700, letterSpacing: '1.5px' }}>
          ★ PICK
        </div>
      )}
      <div style={{ flex: 1, paddingTop: item.special ? '14px' : 0 }}>
        <div style={{ fontFamily: '"Playfair Display", serif', color: '#F5ECD7', fontSize: 'clamp(13px,2vw,15px)', lineHeight: 1.4 }}>{item.name}</div>
      </div>
      <div style={{ fontFamily: '"Playfair Display", serif', color: '#E8B84B', fontSize: 'clamp(14px,2vw,16px)', whiteSpace: 'nowrap', paddingTop: item.special ? '14px' : 0, flexShrink: 0 }}>
        {item.price}
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<keyof typeof menuData>('starters');
  const activeColor = tabs.find(t => t.key === activeTab)?.color ?? '#E8B84B';

  return (
    <div style={{ backgroundColor: '#0D0A07' }}>
      {/* Page hero */}
      <section style={{ padding: 'clamp(100px,14vw,160px) 24px clamp(40px,6vw,70px)', background: 'radial-gradient(ellipse at 50% 100%, #2D1400 0%, #0D0A07 55%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ fontFamily: '"Tiro Bangla", serif', fontSize: 'clamp(120px,30vw,260px)', color: '#E8B84B', opacity: 0.025, lineHeight: 1, whiteSpace: 'nowrap', userSelect: 'none' }}>রান্না</div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Our Culinary Soul</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px,7vw,72px)', color: '#F5ECD7', lineHeight: 1.15, marginBottom: '14px' }}>The Menu</h1>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#00E5CC', fontSize: 'clamp(18px,3vw,28px)', marginBottom: '20px', textShadow: '0 0 30px rgba(0,229,204,0.35)' }}>রান্নাঘর</div>
          <p style={{ color: '#9C8A6E', maxWidth: '480px', margin: '0 auto', lineHeight: 1.85, fontSize: 'clamp(13px,2vw,15px)' }}>
            Authentic Bengali and non-veg cuisine, cooked fresh daily with locally sourced ingredients.
          </p>
        </motion.div>
      </section>

      {/* Tab navigation — horizontal scroll on mobile */}
      <div style={{ position: 'sticky', top: '56px', zIndex: 100, backgroundColor: '#0D0A07', borderBottom: '1px solid rgba(232,184,75,0.08)', backdropFilter: 'blur(12px)' }}>
        <div className="khoai-tab-scroll" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '4px' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as keyof typeof menuData)}
              style={{
                flexShrink: 0,
                padding: '16px 20px 14px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.key ? `2px solid ${tab.color}` : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                transition: 'all 0.25s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                minWidth: '90px',
              }}
            >
              <span style={{ fontSize: '13px', color: activeTab === tab.key ? tab.color : '#9C8A6E', fontWeight: activeTab === tab.key ? 600 : 400, letterSpacing: '0.2px', transition: 'color 0.25s', whiteSpace: 'nowrap' }}>
                {tab.label}
              </span>
              <span style={{ fontFamily: '"Tiro Bangla", serif', fontSize: '11px', color: activeTab === tab.key ? tab.color + 'aa' : '#4A3F30', transition: 'color 0.25s' }}>
                {tab.bengali}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu content */}
      <section style={{ padding: 'clamp(32px,5vw,60px) 24px clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Category header */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab + '_head'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '3px', height: '36px', backgroundColor: activeColor, borderRadius: '2px', flexShrink: 0 }} />
              <div>
                <h2 style={{ fontFamily: '"Playfair Display", serif', color: '#F5ECD7', fontSize: 'clamp(20px,3vw,28px)', lineHeight: 1.2 }}>
                  {tabs.find(t => t.key === activeTab)?.label}
                </h2>
                <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#9C8A6E', fontSize: '14px' }}>
                  {tabs.find(t => t.key === activeTab)?.bengali}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', backgroundColor: 'rgba(232,184,75,0.08)', color: '#9C8A6E', fontSize: '12px', padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(232,184,75,0.12)' }}>
                {menuData[activeTab].length} items
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap: '10px' }}
            >
              {menuData[activeTab].map((item, i) => (
                <MenuCard key={item.name + i} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer note */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: '52px', textAlign: 'center', padding: '24px', border: '1px solid rgba(232,184,75,0.08)', borderRadius: '8px', background: 'rgba(26,18,8,0.4)' }}>
            <div style={{ color: '#E8B84B', fontSize: '10px', letterSpacing: '3px', marginBottom: '10px', textTransform: 'uppercase' }}>Please Note</div>
            <p style={{ color: '#6A5A46', fontSize: '13px', lineHeight: 1.8 }}>
              Prices are inclusive of applicable taxes. Menu varies seasonally based on ingredient availability.<br />
              For large group bookings or custom platters, call us directly.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
