import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useEffect } from 'react';

interface WorkDetailProps {
  title: string;
  images: string[];
  nextTitle: string;
  nextLink: string;
}

export function WorkDetail({ title, images, nextTitle, nextLink }: WorkDetailProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center pb-32 bg-transparent">
      {/* Fixed Hero Title - Stays in background */}
      <div className="fixed inset-0 w-full h-[100dvh] flex flex-col items-center justify-center -z-10 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[100px] md:text-[150px] lg:text-[200px] font-bold tracking-tighter uppercase"
          style={{ color: 'rgba(236, 236, 236, 0.08)' }}
        >
          {title}
        </motion.h1>
      </div>

      {/* Project Images - Scroll over the fixed title */}
      <div className="w-full flex flex-col items-center mt-[100dvh] bg-[#121212] z-10">
        <div className="w-full max-w-5xl px-6 flex flex-col gap-12 md:gap-32 py-24 md:py-40">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <img src={img} alt={`${title} project shot ${i+1}`} className="w-full h-auto object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Next Project Footer */}
        <div className="w-full flex items-center justify-center py-24 border-t border-[rgba(236,236,236,0.05)]">
          <Link href={nextLink} className="group flex flex-col items-center gap-4">
            <span className="text-[11px] uppercase tracking-wider text-[rgba(236,236,236,0.4)]">next project</span>
            <span className="text-[32px] md:text-[48px] relative overflow-hidden text-[#ececec]">
              {nextTitle}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ececec] transform -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
