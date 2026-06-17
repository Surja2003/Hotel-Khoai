import { motion } from 'motion/react';

interface PreloaderProps {
  progress: number;
}

export function Preloader({ progress }: PreloaderProps) {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0D0A07',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
      }}
    >
      {/* Spinning rings */}
      <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Outer ring */}
        <div
          className="khoai-spin"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(232,184,75,0.12)',
            borderTop: '1.5px solid #E8B84B',
            borderRight: '1.5px solid rgba(232,184,75,0.4)',
          }}
        />
        {/* Inner ring */}
        <div
          className="khoai-spin-rev"
          style={{
            position: 'absolute',
            inset: '12px',
            borderRadius: '50%',
            border: '1px solid rgba(0,229,204,0.1)',
            borderBottom: '1.5px solid #00E5CC',
            borderLeft: '1.5px solid rgba(0,229,204,0.3)',
          }}
        />
        {/* Bengali খ center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="khoai-teal-glow"
          style={{
            fontFamily: '"Tiro Bangla", serif',
            fontSize: '44px',
            color: '#00E5CC',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          খ
        </motion.div>
      </div>

      {/* Brand name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#9C8A6E', fontSize: '16px', letterSpacing: '1px' }}>হোটেল খোয়াই</div>
        <div style={{ fontFamily: '"Playfair Display", serif', color: '#E8B84B', fontSize: '10px', letterSpacing: '5px' }}>KHOAI</div>
      </motion.div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: 'rgba(232,184,75,0.08)' }}>
        <motion.div
          style={{ height: '100%', background: 'linear-gradient(90deg, #E8B84B, #00E5CC)', borderRadius: '0 2px 2px 0' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.08, ease: 'linear' }}
        />
      </div>

      {/* Corner accents */}
      {[
        { top: '20px', left: '20px', borderTop: '1px solid rgba(232,184,75,0.3)', borderLeft: '1px solid rgba(232,184,75,0.3)' },
        { top: '20px', right: '20px', borderTop: '1px solid rgba(232,184,75,0.3)', borderRight: '1px solid rgba(232,184,75,0.3)' },
        { bottom: '20px', left: '20px', borderBottom: '1px solid rgba(232,184,75,0.3)', borderLeft: '1px solid rgba(232,184,75,0.3)' },
        { bottom: '20px', right: '20px', borderBottom: '1px solid rgba(232,184,75,0.3)', borderRight: '1px solid rgba(232,184,75,0.3)' },
      ].map((style, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
          style={{ position: 'absolute', width: '24px', height: '24px', ...style }}
        />
      ))}
    </motion.div>
  );
}
