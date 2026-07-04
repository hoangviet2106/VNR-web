import { motion, useReducedMotion } from 'framer-motion';

/** Wrapper scroll-reveal: phần tử trượt lên + hiện dần khi cuộn tới. */
export default function Reveal({ children, delay = 0, className }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
