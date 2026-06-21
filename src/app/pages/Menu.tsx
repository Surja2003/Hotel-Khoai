import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, ChevronLeft, ChevronRight, BookOpen, List } from 'lucide-react';

type MenuItem = { name: string; price: string; special?: boolean };

const menuData: Record<string, MenuItem[]> = {
  breakfast: [
    { name: 'Veg. Sandwich', price: '₹100' },
    { name: 'Egg Sandwich', price: '₹120' },
    { name: 'Chicken Sandwich', price: '₹150' },
    { name: 'Veg. Cheese Sandwich', price: '₹130' },
    { name: 'Egg. Cheese Sandwich', price: '₹140' },
    { name: 'Chicken Cheese Sandwich', price: '₹160' },
    { name: 'Egg Toast (3pcs)', price: '₹80' },
    { name: 'Boiled Egg (2pcs)', price: '₹60' },
    { name: 'Water Egg Poached (2pcs)', price: '₹60' },
    { name: 'Luchi (3pcs) + Sabji', price: '₹60', special: true },
    { name: 'Motorshutir Kochuri + Sabji (2pcs)', price: '₹100', special: true },
    { name: 'Bread Butter Toast (4pcs)', price: '₹70' },
    { name: 'Jam Jelly Toast (4pcs)', price: '₹70' },
    { name: 'Plain Paratha (Dahi+Achar)', price: '₹70' },
    { name: 'Aloo Paratha (Dahi+Achar)', price: '₹90' },
    { name: 'Omelette (Double Egg)', price: '₹50' },
    { name: 'Masala Omelette (Double Egg)', price: '₹70' },
    { name: 'Egg Bhujia (Double Egg)', price: '₹70' },
  ],
  starters: [
    { name: 'Chicken Pakora (6pcs)', price: '₹150' },
    { name: 'Crispy Chicken', price: '₹180' },
    { name: 'Chicken Oil Fry (6pcs)', price: '₹200' },
    { name: 'Smoke Chicken (6pcs)', price: '₹320', special: true },
    { name: 'Dry Chilli Chicken', price: '₹210' },
    { name: 'Lemon Pepper Chicken (6pcs)', price: '₹220' },
    { name: 'Chicken Lollipop (4pcs)', price: '₹220' },
    { name: 'Chicken Lollipop (2pcs)', price: '₹140' },
    { name: 'Fish Finger (4pcs)', price: '₹160' },
    { name: 'Fish Fry (2pcs)', price: '₹160' },
    { name: 'Dry Chilli Fish (6pcs)', price: '₹250' },
    { name: 'Fish Oil Fry (6pcs)', price: '₹230' },
    { name: 'Fish Tikka (Vetki)', price: '₹280', special: true },
    { name: 'Lemon Garlic Prawn (4pcs)', price: '₹300' },
    { name: 'Golden Prawn Fry (4pcs)', price: '₹330' },
    { name: 'Honey Prawn (4pcs)', price: '₹320' },
    { name: 'Prawn Tandoor (4pcs)', price: '₹360' },
    { name: 'Chicken Tandoori (Half)', price: '₹270' },
    { name: 'Chicken Tandoori (Full)', price: '₹490' },
    { name: 'Chicken Tangdi Kabab (2pcs)', price: '₹190' },
    { name: 'Chicken Tangdi Kabab (4pcs)', price: '₹360' },
    { name: 'Chicken Angara Kabab (2pcs)', price: '₹230' },
    { name: 'Chicken Tikka (6pcs)', price: '₹220' },
    { name: 'Chicken Malai Kabab (6pcs)', price: '₹290' },
    { name: 'Chicken Rashmi Kabab (6pcs)', price: '₹280' },
    { name: 'Chicken Hariyali Kabab (6pcs)', price: '₹290' },
    { name: 'Honey Chicken (6pcs)', price: '₹290' },
    { name: 'Afghani Chicken (Half)', price: '₹320' },
    { name: 'Afghani Chicken (Full)', price: '₹580' },
    { name: 'Pomfret Tandoor (2pcs)', price: '₹400' },
    { name: 'Chicken Gold Coin (6pcs)', price: '₹220' },
    { name: 'Chicken 65 (6pcs)', price: '₹210' },
    { name: 'Crispy Baby Corn', price: '₹170' },
    { name: 'Sweet Corn Fry', price: '₹160' },
    { name: 'Paneer Pakora', price: '₹170' },
    { name: 'Paneer Finger (4pcs)', price: '₹160' },
    { name: 'French Fry', price: '₹100' },
    { name: 'Veg Flakes', price: '₹110' },
    { name: 'Dry Chilli Paneer', price: '₹210' },
    { name: 'Lemon Pepper Paneer', price: '₹220' },
    { name: 'Crispy Potato', price: '₹150' },
    { name: 'Chilli Mushroom Fry', price: '₹210' },
    { name: 'Boiled Veg', price: '₹190' },
    { name: 'Paneer Tikka (6pcs)', price: '₹240' },
    { name: 'Malai Paneer Tikka (6pcs)', price: '₹280' },
    { name: 'Lemon Paper Mushroom', price: '₹270' },
    { name: 'Kaju Fry', price: '₹140' },
  ],
  veg_gravy: [
    { name: 'Chana Masala', price: '₹160' },
    { name: 'Veg Tarka', price: '₹90' },
    { name: 'Dal Fry', price: '₹120' },
    { name: 'Kashmiri Aloo Dum', price: '₹160' },
    { name: 'Paneer Varta', price: '₹240', special: true },
    { name: 'Palang Paneer', price: '₹250' },
    { name: 'Chana Paneer', price: '₹200' },
    { name: 'Matar Paneer', price: '₹190' },
    { name: 'Matar Malai Paneer', price: '₹210' },
    { name: 'Kadai Paneer (6pcs)', price: '₹220' },
    { name: 'Chilli Paneer (6pcs)', price: '₹190' },
    { name: 'Paneer Butter Masala', price: '₹180' },
    { name: 'Paneer Tikka Masala (6pcs)', price: '₹270' },
    { name: 'Paneer Manchurian (6pcs)', price: '₹200' },
    { name: 'Paneer Malai Kopta (6pcs)', price: '₹200' },
    { name: 'Paneer Masala', price: '₹190' },
    { name: 'Paneer Do Pyaza', price: '₹210' },
    { name: 'Hot Garlic Paneer', price: '₹250' },
    { name: 'Mixed Veg', price: '₹170' },
    { name: 'Mushroom Butter Masala', price: '₹220' },
    { name: 'Malai Mushroom', price: '₹250' },
    { name: 'Chilli Mushroom', price: '₹230' },
    { name: 'Mushroom Masala', price: '₹250' },
    { name: 'Paneer Jalfrezi', price: '₹190' },
  ],
  nonveg_gravy: [
    { name: 'Chicken Curry (3pcs)', price: '₹180' },
    { name: 'Chicken Kosha (3pcs)', price: '₹190' },
    { name: 'Chicken Do-Piaza (3pcs)', price: '₹230' },
    { name: 'Kadai Chicken (3pcs)', price: '₹240' },
    { name: 'Chicken Masala (3pcs)', price: '₹250' },
    { name: 'Chicken Butter Masala (3pcs)', price: '₹280' },
    { name: 'Lemon Chicken (6pcs)', price: '₹220' },
    { name: 'Chicken Bharta', price: '₹250' },
    { name: 'Hotel খোয়াই Special Chicken (4pcs)', price: '₹330', special: true },
    { name: 'Handi Chicken (5pcs)', price: '₹420' },
    { name: 'Chicken Tarka', price: '₹140' },
    { name: 'Egg Tarka', price: '₹110' },
    { name: 'Egg Chicken Tarka', price: '₹160' },
    { name: 'Egg Do-Piaza (2pcs)', price: '₹150' },
    { name: 'Egg Curry (2pcs)', price: '₹70' },
    { name: 'Egg Masala (2pcs)', price: '₹90' },
    { name: 'Chilli Chicken (6pcs)', price: '₹180' },
    { name: 'Chicken Manchurian (6pcs)', price: '₹200' },
    { name: 'Chicken Tikka Masala (6pcs)', price: '₹260' },
    { name: 'Malai Chicken (6pcs)', price: '₹300' },
    { name: 'Mutton Curry (3pcs)', price: '₹300' },
    { name: 'Mutton Masala (3pcs)', price: '₹310' },
    { name: 'Mutton Kosha (3pcs)', price: '₹320' },
    { name: 'Hotel খোয়াই Special Mutton (4pcs)', price: '₹440', special: true },
    { name: 'Handi Mutton (5pcs)', price: '₹540' },
    { name: 'Handi Mutton (10pcs)', price: '₹960' },
    { name: 'Sweet Garlic Chicken (6pcs)', price: '₹220' },
    { name: 'Garlic Chicken', price: '₹200' },
    { name: 'Mutton Do Pyaza (3pcs)', price: '₹360' },
    { name: 'Chicken Dak Bungalow (3pcs)', price: '₹310' },
    { name: 'Mutton Dak Bungalow (3pcs)', price: '₹410' },
    { name: 'Rashmi Butter Masala (6pcs)', price: '₹290' },
    { name: 'Tengri Masala (2pcs)', price: '₹250' },
    { name: 'Afghani Chicken', price: '₹270' },
  ],
  fish_seafood: [
    { name: 'Katla Fish Curry', price: '₹130' },
    { name: 'Katla Kalia', price: '₹140' },
    { name: 'Sorshe Katla', price: '₹150' },
    { name: 'Katla Posto', price: '₹180' },
    { name: 'Katla Fry', price: '₹120' },
    { name: 'Katla Masala', price: '₹150' },
    { name: 'Doi Katla', price: '₹150' },
    { name: 'Masala Pomfret Fry', price: '₹210' },
    { name: 'Pomfret Fry', price: '₹180' },
    { name: 'Sorshe Pomfret', price: '₹190' },
    { name: 'Pabda Jhal', price: '₹150' },
    { name: 'Sorshe Ilish', price: '₹340', special: true },
    { name: 'Ilish Fry', price: '₹320' },
    { name: 'Mourola Jhal', price: '₹150' },
    { name: 'Mourola Fry', price: '₹140' },
    { name: 'Masala Bhetki (Time 30min)', price: '₹260' },
    { name: 'Golda Chingri Malai Curry', price: '₹250' },
    { name: 'Chingri Malai Curry (B/Less)(3pcs)', price: '₹250' },
    { name: 'Dab Chingri', price: '₹330', special: true },
    { name: 'Chingri Jhal Small', price: '₹150' },
  ],
  roti_rice: [
    { name: 'Rumali Roti', price: '₹20' },
    { name: 'Butter Naan', price: '₹50' },
    { name: 'Garlic Naan', price: '₹60' },
    { name: 'Masala Kulcha', price: '₹80' },
    { name: 'Tandoori Roti', price: '₹30' },
    { name: 'Tawa Roti', price: '₹10' },
    { name: 'Paneer Paratha', price: '₹80' },
    { name: 'Paneer Kulcha', price: '₹90' },
    { name: 'Basmati Rice', price: '₹90' },
    { name: 'Jeera Rice', price: '₹110' },
    { name: 'Fried Rice Veg', price: '₹140' },
    { name: 'Egg Fried Rice', price: '₹160' },
    { name: 'Chicken Fried Rice', price: '₹220' },
    { name: 'Egg Chicken Fried Rice', price: '₹230' },
    { name: 'Mixed Fried Rice', price: '₹270' },
    { name: 'Paneer Fried Rice', price: '₹200' },
    { name: 'Kashmiri Pulao', price: '₹220' },
    { name: 'Basanti Pulao', price: '₹180', special: true },
    { name: 'Greenpeas Pulao', price: '₹190' },
  ],
  noodles_chow: [
    { name: 'Veg Chowmein', price: '₹100' },
    { name: 'Egg Chowmein', price: '₹120' },
    { name: 'Chicken Chowmein', price: '₹140' },
    { name: 'Egg Chicken Chowmein', price: '₹160' },
    { name: 'Mixed Chowmein', price: '₹190' },
    { name: 'Veg. Maggi', price: '₹100' },
    { name: 'Egg Maggi', price: '₹120' },
    { name: 'Chicken Maggi', price: '₹150' },
  ],
  drinks_sweets: [
    { name: 'Mishti Doi', price: '₹50' },
    { name: 'Tok Doi', price: '₹40' },
    { name: 'Khirer Payesh', price: '₹50', special: true },
    { name: 'Keshor Rajbhog (1pc)', price: '₹30' },
    { name: 'Green Salad', price: '₹60' },
    { name: 'Onion Salad', price: '₹50' },
    { name: 'Sweet Corn Soup', price: '₹110' },
    { name: 'Chicken Hot & Sour Soup', price: '₹140' },
    { name: 'Chicken Manchow Soup', price: '₹160' },
    { name: 'Egg Veg Soup', price: '₹100' },
    { name: 'Chicken Stew', price: '₹190' },
    { name: 'Water (1ltr) / (2ltr)', price: '₹20 / ₹35' },
    { name: 'Masala Cold Drinks', price: '₹60' },
    { name: 'Mojito', price: '₹90' },
    { name: 'Lemon Soda', price: '₹50' },
    { name: 'Masala Soda', price: '₹50' },
    { name: 'Blackberry Drink', price: '₹70' },
    { name: 'Watermelon Drink', price: '₹60' },
    { name: 'Lassi', price: '₹70' },
    { name: 'Ice-Cream (Scoop)', price: '₹80' },
    { name: 'Bluelemon Drink', price: '₹80' },
    { name: 'Mango Panna', price: '₹70' },
    { name: 'Tea', price: '₹20 / ₹30' },
    { name: 'Liquor Tea', price: '₹20' },
    { name: 'Lemon Tea', price: '₹30' },
    { name: 'Coffee', price: '₹40' },
    { name: 'Black Coffee', price: '₹40' },
    { name: 'Cold Coffee', price: '₹120' },
  ],
  lunch: [
    { name: 'Veg Thali', price: '₹160', special: true },
    { name: 'Posto Bora', price: '₹110' },
    { name: 'Katla Fish Curry', price: '₹130' },
    { name: 'Katla Kalia', price: '₹140' },
    { name: 'Sorshe Katla', price: '₹150' },
    { name: 'Katla Posto', price: '₹180' },
    { name: 'Katla Fry', price: '₹120' },
    { name: 'Katla Masala', price: '₹150' },
    { name: 'Doi Katla', price: '₹150' },
    { name: 'Masala Pomfret Fry', price: '₹210' },
    { name: 'Pomfret Fry', price: '₹180' },
    { name: 'Sorshe Pomfret', price: '₹190' },
    { name: 'Pabda Jhal', price: '₹150' },
    { name: 'Sorshe Ilish', price: '₹340' },
    { name: 'Ilish Fry', price: '₹320' },
    { name: 'Mourola Jhal', price: '₹150' },
    { name: 'Mourola Fry', price: '₹140' },
    { name: 'Masala Bhetki (Time 30min)', price: '₹260' },
    { name: 'Golda Chingri Malai Curry', price: '₹250' },
    { name: 'Chingri Malai Curry (B/Less)(3pcs)', price: '₹250' },
    { name: 'Dab Chingri', price: '₹330' },
    { name: 'Chingri Jhal Small', price: '₹150' },
    { name: 'Moong Dal', price: '₹80' },
    { name: 'Aloo Posto', price: '₹120' },
    { name: 'Jhuri Aloo Bhaja', price: '₹100' },
    { name: 'Indian Aloo Bhaja', price: '₹130' },
    { name: 'Begun Bhaja (4pcs)', price: '₹80' },
    { name: 'Begni (4pcs)', price: '₹40' },
    { name: 'Seasonal Sabji', price: '₹100' },
    { name: 'Papad', price: '₹40' },
    { name: 'Rosted Papad', price: '₹30' },
  ],
};

const tabs = [
  { key: 'lunch', label: 'Lunch Specials', bengali: 'লাঞ্চ স্পেশাল', color: '#E8B84B' },
  { key: 'breakfast', label: 'Breakfast', bengali: 'ব্রেকফাস্ট', color: '#8B4BE8' },
  { key: 'starters', label: 'Starters', bengali: 'স্টার্টার', color: '#E8764B' },
  { key: 'veg_gravy', label: 'Veg Mains', bengali: 'ভেজ মেইন', color: '#4BE8D4' },
  { key: 'nonveg_gravy', label: 'Non-Veg Mains', bengali: 'নন-ভেজ মেইন', color: '#E84B4B' },
  { key: 'fish_seafood', label: 'Fish & Seafood', bengali: 'মাছ ও সীফুড', color: '#00E5CC' },
  { key: 'roti_rice', label: 'Roti & Rice', bengali: 'রুটি ও ভাত', color: '#E8C84B' },
  { key: 'noodles_chow', label: 'Noodles & Chow', bengali: 'নুডলস ও চাও', color: '#E84B8B' },
  { key: 'drinks_sweets', label: 'Drinks & Sweets', bengali: 'পানীয় ও মিষ্টি', color: '#4BE876' },
];

const physicalMenuPages = [
  { page: 1, src: '/assets/menu/menu_6.jpeg', title: 'Breakfast & Veg Starter' },
  { page: 2, src: '/assets/menu/menu_3.jpeg', title: 'Starter Chicken & Fish' },
  { page: 3, src: '/assets/menu/menu_1.jpeg', title: 'Lunch Specials' },
  { page: 4, src: '/assets/menu/menu_4.jpeg', title: 'Non-Veg Gravy & Rice' },
  { page: 5, src: '/assets/menu/menu_5.jpeg', title: 'Roti, Veg Gravy & Chow' },
  { page: 6, src: '/assets/menu/menu_2.jpeg', title: 'Drinks, Soups & Desserts' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.03 } } };
const card = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.div variants={card} className="khoai-shimmer" style={{
      borderRadius: '8px',
      padding: '16px 20px',
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
  const [viewMode, setViewMode] = useState<'digital' | 'cards'>('digital');
  const [activeTab, setActiveTab] = useState<keyof typeof menuData>('lunch');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Menu | Hotel খোয়াই — Bengali, Tandoori & Chinese Cuisine | Orgram Bardhaman';
  }, []);

  const activeColor = tabs.find(t => t.key === activeTab)?.color ?? '#E8B84B';

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? physicalMenuPages.length - 1 : (prev ?? 0) - 1));
    }
  };

  const showNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === physicalMenuPages.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  return (
    <div style={{ backgroundColor: '#0D0A07', minHeight: '100vh' }}>
      {/* Page hero */}
      <section style={{ padding: 'clamp(100px,14vw,160px) 24px clamp(30px,5vw,60px)', background: 'radial-gradient(ellipse at 50% 100%, #2D1400 0%, #0D0A07 55%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ fontFamily: '"Tiro Bangla", serif', fontSize: 'clamp(120px,30vw,260px)', color: '#E8B84B', opacity: 0.025, lineHeight: 1, whiteSpace: 'nowrap', userSelect: 'none' }}>রান্না</div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Our Culinary Soul</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px,7vw,72px)', color: '#F5ECD7', lineHeight: 1.15, marginBottom: '14px' }}>The Menu</h1>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#00E5CC', fontSize: 'clamp(18px,3vw,28px)', marginBottom: '20px', textShadow: '0 0 30px rgba(0,229,204,0.35)' }}>রান্নাঘর</div>
          <p style={{ color: '#9C8A6E', maxWidth: '480px', margin: '0 auto', lineHeight: 1.85, fontSize: 'clamp(13px,2vw,15px)' }}>
            Authentic Bengali, Tandoori and Chinese cuisine, cooked fresh daily with locally sourced ingredients.
          </p>
        </motion.div>
      </section>

      {/* View Mode Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', padding: '0 20px' }}>
        <div style={{ display: 'flex', background: 'rgba(26,18,8,0.7)', border: '1px solid rgba(232,184,75,0.15)', borderRadius: '100px', padding: '4px', backdropFilter: 'blur(8px)' }}>
          <button
            onClick={() => setViewMode('digital')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              borderRadius: '100px',
              padding: '10px 24px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: '"DM Sans", sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: viewMode === 'digital' ? '#E8B84B' : 'transparent',
              color: viewMode === 'digital' ? '#0D0A07' : '#9C8A6E',
            }}
          >
            <List size={14} /> Interactive Menu
          </button>
          <button
            onClick={() => setViewMode('cards')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              borderRadius: '100px',
              padding: '10px 24px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: '"DM Sans", sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: viewMode === 'cards' ? '#E8B84B' : 'transparent',
              color: viewMode === 'cards' ? '#0D0A07' : '#9C8A6E',
            }}
          >
            <BookOpen size={14} /> Original Menu Cards
          </button>
        </div>
      </div>

      {/* ── DIGITAL VIEW ── */}
      {viewMode === 'digital' && (
        <>
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
                    {menuData[activeTab]?.length || 0} items
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
                  {menuData[activeTab]?.map((item, i) => (
                    <MenuCard key={item.name + i} item={item} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </>
      )}

      {/* ── CARDS VIEW ── */}
      {viewMode === 'cards' && (
        <section style={{ padding: '0 24px clamp(60px,8vw,100px)', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '20px' }}>
            {physicalMenuPages.map((page, index) => (
              <motion.div
                key={page.page}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => openLightbox(index)}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(232,184,75,0.12)',
                  background: 'rgba(26,18,8,0.7)',
                  cursor: 'pointer',
                  aspectRatio: '0.72',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  group: 'true',
                }}
                className="khoai-shimmer-trigger"
              >
                <img
                  src={page.src}
                  alt={page.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.5s ease',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(13,10,7,0.9) 0%, rgba(13,10,7,0.2) 60%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'end',
                  padding: '24px 20px',
                  transition: 'opacity 0.3s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ color: '#E8B84B', fontSize: '10px', letterSpacing: '2px', fontWeight: 600 }}>PAGE {page.page}</span>
                      <h3 style={{ fontFamily: '"Playfair Display", serif', color: '#F5ECD7', fontSize: '18px', marginTop: '4px' }}>{page.title}</h3>
                    </div>
                    <div style={{
                      backgroundColor: 'rgba(232,184,75,0.15)',
                      border: '1px solid rgba(232,184,75,0.3)',
                      color: '#E8B84B',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <ZoomIn size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

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
              backgroundColor: 'rgba(5,3,2,0.97)',
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
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(16px, 2.5vw, 20px)', color: '#F5ECD7', margin: 0 }}>
                  {physicalMenuPages[lightboxIndex].title}
                </h3>
                <span style={{ color: '#E8B84B', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                  Page {physicalMenuPages[lightboxIndex].page} of {physicalMenuPages.length}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
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
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
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
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
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

            {/* Mobile swipe info / Swipe area */}
            <div
              style={{
                width: '100%',
                maxWidth: '650px',
                height: '80vh',
                display: 'flex',
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
                src={physicalMenuPages[lightboxIndex].src}
                alt={physicalMenuPages[lightboxIndex].title}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '6px',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
                  touchAction: 'pan-y pinch-zoom',
                }}
              />
            </div>

            {/* Bottom Mobile navigation indicator buttons */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', zIndex: 2 }}>
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

      {/* Footer note */}
      <section style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', padding: '24px', border: '1px solid rgba(232,184,75,0.08)', borderRadius: '8px', background: 'rgba(26,18,8,0.4)' }}>
            <div style={{ color: '#E8B84B', fontSize: '10px', letterSpacing: '3px', marginBottom: '10px', textTransform: 'uppercase' }}>Please Note</div>
            <p style={{ color: '#6A5A46', fontSize: '13px', lineHeight: 1.8 }}>
              Prices are inclusive of applicable taxes. Some items are subject to seasonal availability.<br />
              For large group bookings, private events, or custom platters, please call us directly.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
