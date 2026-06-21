import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const PHONE = '919732269939'; // with country code, no leading 0
const PHONE_DISPLAY = '+91 97322 69939';

// Official WhatsApp SVG logo
function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#25D366"/>
      <path
        d="M34.6 13.4A14.85 14.85 0 0 0 24 9C16.27 9 10 15.27 10 23c0 2.47.65 4.88 1.88 7.01L10 39l9.21-1.85A14.93 14.93 0 0 0 24 38.99c7.73 0 14-6.27 14-14 0-3.74-1.46-7.26-3.4-11.59z"
        fill="#25D366"
      />
      <path
        d="M24 36.5a12.46 12.46 0 0 1-6.34-1.73l-.45-.27-4.7.95.99-4.57-.3-.47A12.42 12.42 0 0 1 11.5 23c0-6.9 5.6-12.5 12.5-12.5a12.5 12.5 0 0 1 12.5 12.5c0 6.9-5.6 12.5-12.5 12.5z"
        fill="white"
      />
      <path
        d="M30.07 25.89c-.33-.17-1.97-.97-2.28-1.08-.3-.11-.52-.17-.74.17-.22.33-.84 1.08-1.04 1.3-.19.22-.38.25-.71.08-.33-.17-1.4-.52-2.67-1.65-.99-.88-1.66-1.97-1.85-2.3-.19-.33-.02-.5.14-.67.15-.15.33-.38.5-.57.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.17-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.13 1.1-1.13 2.68 0 1.58 1.16 3.11 1.32 3.33.17.22 2.28 3.48 5.53 4.88.77.33 1.38.53 1.85.68.78.25 1.48.21 2.04.13.62-.09 1.97-.8 2.25-1.58.28-.77.28-1.43.2-1.57-.08-.14-.3-.22-.63-.39z"
        fill="#25D366"
      />
    </svg>
  );
}

function PhoneIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
      }}
    >
      {/* WhatsApp button */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            {/* Label */}
            <div style={{
              backgroundColor: 'rgba(13,10,7,0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(37,211,102,0.25)',
              borderRadius: '100px',
              padding: '7px 16px',
              color: '#fff',
              fontSize: '13px',
              fontFamily: '"DM Sans", sans-serif',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}>
              <span style={{ color: '#25D366', fontWeight: 600 }}>WhatsApp</span>
              <span style={{ color: '#9C8A6E', marginLeft: '6px' }}>{PHONE_DISPLAY}</span>
            </div>
            {/* Button */}
            <a
              href={`https://wa.me/${PHONE}?text=Hello%20Hotel%20Khoai!%20I%20would%20like%20to%20make%20a%20reservation.`}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 24px rgba(37,211,102,0.45)',
                flexShrink: 0,
                transition: 'transform 0.2s, box-shadow 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 32px rgba(37,211,102,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(37,211,102,0.45)';
              }}
            >
              <WhatsAppIcon size={56} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call button */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            transition={{ duration: 0.22, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            {/* Label */}
            <div style={{
              backgroundColor: 'rgba(13,10,7,0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(232,184,75,0.25)',
              borderRadius: '100px',
              padding: '7px 16px',
              color: '#fff',
              fontSize: '13px',
              fontFamily: '"DM Sans", sans-serif',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}>
              <span style={{ color: '#E8B84B', fontWeight: 600 }}>Call Us</span>
              <span style={{ color: '#9C8A6E', marginLeft: '6px' }}>{PHONE_DISPLAY}</span>
            </div>
            {/* Button */}
            <a
              href={`tel:+${PHONE}`}
              title="Call Hotel Khoai"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#E8B84B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0D0A07',
                boxShadow: '0 4px 24px rgba(232,184,75,0.45)',
                flexShrink: 0,
                transition: 'transform 0.2s, box-shadow 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 32px rgba(232,184,75,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(232,184,75,0.45)';
              }}
            >
              <PhoneIcon size={24} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setExpanded(prev => !prev)}
        whileTap={{ scale: 0.92 }}
        title={expanded ? 'Close' : 'Contact Us'}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: expanded ? 'rgba(26,18,8,0.95)' : '#E8B84B',
          border: expanded ? '2px solid rgba(232,184,75,0.4)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: expanded
            ? '0 4px 24px rgba(0,0,0,0.5)'
            : '0 4px 24px rgba(232,184,75,0.5)',
          transition: 'background-color 0.3s, box-shadow 0.3s, border 0.3s',
          flexShrink: 0,
        }}
      >
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {expanded ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke={expanded ? '#E8B84B' : '#0D0A07'} strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#0D0A07"/>
            </svg>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
