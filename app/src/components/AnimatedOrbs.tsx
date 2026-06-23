import { memo } from 'react';

const orbs = [
  {
    className: 'w-[600px] h-[600px] top-[-15%] left-[-10%]',
    gradient: 'from-gold/20 to-transparent',
    animation: 'animate-[orbFloat1_15s_ease-in-out_infinite]',
  },
  {
    className: 'w-[500px] h-[500px] bottom-[5%] right-[-10%]',
    gradient: 'from-gold-light/15 to-transparent',
    animation: 'animate-[orbFloat2_20s_ease-in-out_infinite]',
  },
  {
    className: 'w-[400px] h-[400px] top-[40%] left-[60%]',
    gradient: 'from-gold/10 to-transparent',
    animation: 'animate-[orbFloat3_18s_ease-in-out_infinite]',
  },
];

const AnimatedOrbs = memo(function AnimatedOrbs() {
  return (
    <>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`fixed rounded-full pointer-events-none z-0 opacity-50 ${orb.className} ${orb.animation}`}
          style={{
            background: `radial-gradient(circle, ${i === 0 ? 'rgba(212,175,55,0.2)' : i === 1 ? 'rgba(240,201,74,0.15)' : 'rgba(212,175,55,0.1)'}, transparent 70%)`,
            filter: 'blur(100px)',
          }}
        />
      ))}
      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 50px) scale(0.9); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 30px) scale(1.15); }
          66% { transform: translate(40px, -60px) scale(0.85); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 40px) scale(1.1); }
        }
      `}</style>
    </>
  );
});

export default AnimatedOrbs;
