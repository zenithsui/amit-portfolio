import { motion } from 'framer-motion';

export default function Home() {
  const quote1 = "if they put a cross on you — carry it on your back,";
  const quote2 = "and silently bring it to the top.";
  
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl flex flex-col items-center">
        <motion.p 
          className="italic text-[22px] md:text-[24px] leading-[1.6] mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {quote1}<br />{quote2}
        </motion.p>
        
        <motion.p 
          className="text-[14px] tracking-[0.05em]"
          style={{ color: 'rgba(18, 18, 18, 0.4)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          [ max kalinsky ]
        </motion.p>
      </div>
    </div>
  );
}
